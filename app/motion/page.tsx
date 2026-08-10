"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MotionPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerState, setHeaderState] = useState<"transparent" | "black" | "white">("transparent");

  // Handle Intersection Observer for reveal items
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealTargets = document.querySelectorAll(".reveal-item, .reveal-text, .image-reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach((el) => el.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
      );
      revealTargets.forEach((el) => revealObserver.observe(el));
    }

    return () => {
      revealTargets.forEach((el) => el.classList.remove("is-visible"));
    };
  }, []);

  // Handle Parallax & Scroll UI Header State
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId: number;

    const headerEl = document.querySelector(".site-header");
    const heroEl = document.querySelector(".projects-hero-banner") as HTMLElement | null;
    const parallaxItems = Array.from(
      document.querySelectorAll("[data-parallax]")
    ) as HTMLElement[];

    // Cache: { el, speed, cachedTop, cachedHeight }
    type CachedItem = { el: HTMLElement; speed: number; top: number; h: number };
    let cached: CachedItem[] = [];
    let heroHeight = heroEl ? heroEl.offsetHeight - 60 : 400;
    let vh = window.innerHeight;

    const buildCache = () => {
      vh = window.innerHeight;
      heroHeight = heroEl ? heroEl.offsetHeight - 60 : 400;
      cached = parallaxItems.map((el) => ({
        el,
        speed: Number(el.dataset.parallax || 0.04),
        top: el.getBoundingClientRect().top + window.scrollY,
        h: el.offsetHeight,
      }));
    };

    let lastHeaderState = "transparent";

    const updateScrollUI = () => {
      const y = window.scrollY;

      // Only update React state when zone actually changes
      let nextHeaderState: "transparent" | "black" | "white";
      if (y <= 20) {
        nextHeaderState = "transparent";
      } else if (y <= heroHeight) {
        nextHeaderState = "black";
      } else {
        nextHeaderState = "white";
      }
      if (nextHeaderState !== lastHeaderState) {
        lastHeaderState = nextHeaderState;
        setHeaderState(nextHeaderState);
      }

      if (!reduceMotion) {
        for (let i = 0; i < cached.length; i++) {
          const { el, speed, top, h } = cached[i];
          const elCenter = top + h / 2 - y;
          // Skip if far off screen
          if (elCenter < -vh - 200 || elCenter > vh + h + 200) continue;
          const distance = (vh / 2 - elCenter) * speed;
          const clamped = Math.min(Math.max(distance, -60), 60);
          el.style.transform = `translateY(${clamped.toFixed(2)}px)`;
        }
      }
      rafId = 0;
    };

    const requestScrollUI = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(updateScrollUI);
    };

    // Rebuild cache on resize (debounced)
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildCache();
        requestScrollUI();
      }, 120);
    };

    buildCache();
    updateScrollUI();
    window.addEventListener("scroll", requestScrollUI, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestScrollUI);
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div className="projects-page-wrapper">
      {/* 1. Header Navigation Bar */}
      <header
        className={`site-header ${
          headerState === "transparent"
            ? "is-transparent-hero"
            : headerState === "black"
            ? "is-scrolled-hero"
            : "is-past-hero"
        }`}
      >
        <button
          className="menu-toggle magnetic"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`menu-toggle__icon ${menuOpen ? "is-active" : ""}`}>
            <i></i><i></i><i></i>
          </span>
        </button>

        <Link className="wordmark" href="/">
          <img
            src="/assets/images/soup-logo.png"
            alt="Soup by Falka"
            style={{ height: "20px", width: "auto", display: "block" }}
          />
        </Link>

        <nav className="header-social" aria-label="Social links">
          <a href="https://www.instagram.com/soupbyfalka/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.youtube.com/@SoupbyFalka" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://www.linkedin.com/company/soupbyfalka" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
      </header>

      {/* Navigation Menu Overlay Drawer */}
      <aside className={`menu ${menuOpen ? "is-open" : ""}`} id="site-menu" aria-hidden={!menuOpen}>
        <div className="menu__veil" onClick={() => setMenuOpen(false)}></div>
        <div className="menu__panel">
          <div className="menu__top">
            <button
              className="menu-toggle magnetic"
              type="button"
              aria-label="Close navigation"
              onClick={() => setMenuOpen(false)}
            >
              <span className="menu-toggle__icon is-active">
                <i></i><i></i><i></i>
              </span>
            </button>

            <Link className="wordmark" href="/" onClick={() => setMenuOpen(false)}>
              <img src="/assets/images/soup-logo.png" alt="Soup by Falka" style={{ height: "20px", width: "auto", display: "block" }} />
            </Link>

            <div className="header-social">
              <a href="https://www.instagram.com/soupbyfalka/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.youtube.com/@SoupbyFalka" target="_blank" rel="noopener noreferrer">YouTube</a>
              <a href="https://www.linkedin.com/company/soupbyfalka" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>

          <div className="menu__body">
            <nav className="menu__nav-links" aria-label="Primary navigation">
              <div className="menu__item-group">
                <Link href="/stills" className="menu__nav-link" onClick={() => setMenuOpen(false)}>PROJECTS</Link>
                <div className="menu__sub-nav">
                  <Link href="/stills" className="menu__sub-link" onClick={() => setMenuOpen(false)}>
                    STILLS
                  </Link>
                  <Link href="/motion" className="menu__sub-link" onClick={() => setMenuOpen(false)}>
                    MOTION
                  </Link>
                </div>
              </div>
              <Link href="/#journal" className="menu__nav-link" onClick={() => setMenuOpen(false)}>JOURNAL</Link>
              <Link href="/#about" className="menu__nav-link" onClick={() => setMenuOpen(false)}>ABOUT</Link>
              <Link href="/#contact" className="menu__nav-link" onClick={() => setMenuOpen(false)}>CONTACT</Link>
            </nav>
          </div>
        </div>
      </aside>

      {/* 2. Motion Hero Banner Image */}
      <section className="projects-hero-banner">
        <div className="projects-hero-media" data-parallax="0.08">
          <img src="/assets/images/motion-banner.jpg" alt="Cinematic motion banner — silhouette against sky" />
        </div>
      </section>

      {/* Fixed low-opacity floating Pause button in bottom-left corner — switch to STILLS */}
      <Link href="/stills" className="page-tab-switcher" aria-label="Switch to Stills" title="Switch to Stills">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      </Link>

      {/* 3. Authenticity Statement Quote */}
      <section className="projects-statement-quote">
        <p className="projects-statement-text reveal-text" data-parallax="0.03">
          With a sense of <em>authenticity</em> present in every frame, our team specialise in a content solution tailor made to stand out.
        </p>
      </section>

      {/* 4. Projects Main Grid Section (Motion Page) */}
      <section className="projects-grid-section">
        <div className="projects-grid-container">

          {/* ROW 1: 3 Columns Grid */}
          <div className="projects-grid-row projects-grid-3col">
            <article className="project-grid-card reveal-item">
              <div className="project-grid-media media-swap image-reveal">
                <img className="media-swap__primary" src="/assets/images/motion/aman-motion.png" alt="AMAN" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/aman-b.webp" alt="AMAN hover" loading="lazy" />
              </div>
              <p className="project-grid-title">AMAN</p>
            </article>

            <article className="project-grid-card reveal-item">
              <div className="project-grid-media media-swap image-reveal">
                <img className="media-swap__primary" src="/assets/images/motion/puli-motion.png" alt="THE PULI" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/puli-b.webp" alt="THE PULI hover" loading="lazy" />
              </div>
              <p className="project-grid-title">THE PULI</p>
            </article>

            <article className="project-grid-card reveal-item">
              <div className="project-grid-media media-swap image-reveal">
                <img className="media-swap__primary" src="/assets/images/motion/nobu-motion.png" alt="NOBU RESIDENCES ABU DHABI" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/nobu-b.webp" alt="NOBU hover" loading="lazy" />
              </div>
              <p className="project-grid-title">NOBU RESIDENCES ABU DHABI</p>
            </article>
          </div>

          {/* ROW 2: Split 2 Columns (1fr : 2.11fr) Grid */}
          <div className="projects-grid-row projects-grid-split">
            <article className="project-grid-card project-grid-card--medium reveal-item">
              <div className="project-grid-media media-swap image-reveal">
                <img className="media-swap__primary" src="/assets/images/motion/janu-motion.png" alt="ROSEWOOD" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/rosewood-b.webp" alt="ROSEWOOD hover" loading="lazy" />
              </div>
              <p className="project-grid-title">ROSEWOOD</p>
            </article>

            <article className="project-grid-card project-grid-card--wide reveal-item">
              <div className="project-grid-media media-swap image-reveal">
                <img className="media-swap__primary" src="/assets/images/motion/sujan-motion.png" alt="KOKOMO" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/kokomo-b.webp" alt="KOKOMO hover" loading="lazy" />
              </div>
              <p className="project-grid-title">KOKOMO</p>
            </article>
          </div>

          {/* ROW 3: 3 Columns Grid */}
          <div className="projects-grid-row projects-grid-3col">
            <article className="project-grid-card reveal-item">
              <div className="project-grid-media media-swap image-reveal">
                <img className="media-swap__primary" src="/assets/images/motion/puli-motion.png" alt="PARK HYATT MALDIVES" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/hyatt-b.webp" alt="PARK HYATT MALDIVES hover" loading="lazy" />
              </div>
              <p className="project-grid-title">PARK HYATT MALDIVES</p>
            </article>

            <article className="project-grid-card reveal-item">
              <div className="project-grid-media media-swap image-reveal">
                <img className="media-swap__primary" src="/assets/images/motion/rosewood-motion.png" alt="LUXURY LODGES OF AUSTRALIA" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/luxury-b.webp" alt="LUXURY LODGES OF AUSTRALIA hover" loading="lazy" />
              </div>
              <p className="project-grid-title">LUXURY LODGES OF AUSTRALIA</p>
            </article>

            <article className="project-grid-card reveal-item">
              <div className="project-grid-media media-swap image-reveal">
                <img className="media-swap__primary" src="/assets/images/motion/fourseasons-motion.png" alt="SUJAN" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/sujan-b.webp" alt="SUJAN hover" loading="lazy" />
              </div>
              <p className="project-grid-title">SUJAN</p>
            </article>
          </div>

          {/* ROW 4: Split 2 Columns (1fr : 2.11fr) Grid */}
          <div className="projects-grid-row projects-grid-split">
            <article className="project-grid-card project-grid-card--medium reveal-item">
              <div className="project-grid-media media-swap image-reveal">
                <img className="media-swap__primary" src="/assets/images/motion/alila-motion.png" alt="ALILA OMAN" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/alila-b.webp" alt="ALILA OMAN hover" loading="lazy" />
              </div>
              <p className="project-grid-title">ALILA OMAN</p>
            </article>

            <article className="project-grid-card project-grid-card--wide reveal-item">
              <div className="project-grid-media media-swap image-reveal">
                <img className="media-swap__primary" src="/assets/images/motion/kokomo-motion.png" alt="JANU" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/janu-b.webp" alt="JANU hover" loading="lazy" />
              </div>
              <p className="project-grid-title">JANU</p>
            </article>
          </div>

          {/* ROW 5: 3 Columns Grid */}
          <div className="projects-grid-row projects-grid-3col">
            <article className="project-grid-card reveal-item">
              <div className="project-grid-media media-swap image-reveal">
                <img className="media-swap__primary" src="/assets/images/motion/ani-motion.png" alt="ANI PRIVATE RESORTS" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/ani-a.webp" alt="ANI PRIVATE RESORTS hover" loading="lazy" />
              </div>
              <p className="project-grid-title">ANI PRIVATE RESORTS</p>
            </article>

            <article className="project-grid-card reveal-item">
              <div className="project-grid-media media-swap image-reveal">
                <img className="media-swap__primary" src="/assets/images/motion/fourseasons-motion.png" alt="FOUR SEASONS HOTELS AND RESORTS" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/fourseasons-a.webp" alt="FOUR SEASONS hover" loading="lazy" />
              </div>
              <p className="project-grid-title">FOUR SEASONS HOTELS AND RESORTS</p>
            </article>

            <article className="project-grid-card reveal-item">
              <div className="project-grid-media media-swap image-reveal">
                <img className="media-swap__primary" src="/assets/images/motion/sequoia-motion.png" alt="SEQUOIA" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/sequoia-a.webp" alt="SEQUOIA hover" loading="lazy" />
              </div>
              <p className="project-grid-title">SEQUOIA</p>
            </article>
          </div>

        </div>
      </section>

      {/* 5. Journal Teaser Section */}
      <section className="projects-journal-section">
        <div className="projects-journal-container">
          <div className="projects-journal-left">
            <div className="journal__lead-image media-swap image-reveal reveal-item" style={{ width: "100%", maxWidth: "260px", aspectRatio: "4/5.2", marginBottom: "24px", overflow: "hidden", position: "relative" }}>
              <img className="media-swap__primary" src="/assets/images/journal-road-a.webp" alt="Winding forest road" loading="lazy" data-parallax="0.06" style={{ transform: "scale(1.15)" }} />
              <img className="media-swap__secondary" src="/assets/images/journal-road-b.webp" alt="Safari vehicle at sunset" loading="lazy" data-parallax="0.06" style={{ transform: "scale(1.15)" }} />
            </div>
            <p className="projects-journal-heading reveal-text">JOURNAL</p>
            <p className="projects-journal-desc reveal-text">
              As specialists in storytelling, there is more to the tale than the destination. Our experiences, the musings and people found along the way, are all worth writing home about.
            </p>
            <Link className="projects-journal-btn reveal-text" href="/#journal">
              VIEW MORE
            </Link>
          </div>

          <div className="projects-journal-right image-reveal reveal-item">
            <img
              src="/assets/images/motion/journal-motion.png"
              alt="Journal featured safari jeep at sunset"
              loading="lazy"
              data-parallax="0.08"
            />
          </div>
        </div>
      </section>

      {/* 6. Footer Section — matches main site GET IN TOUCH footer */}
      <footer className="footer-simple" id="contact">
        <div className="footer-simple__top">
          <p className="footer-simple__label">GET IN TOUCH</p>
          <p className="footer-simple__text">If you want to contribute, learn more or start a project.</p>
          <a className="footer-simple__btn" href="mailto:info@soupbyfalka.com">
            INFO@SOUPBYFALKA.COM
          </a>
        </div>
        <div className="footer-simple__bottom">
          <p>© Soup Studio. All Rights Reserved</p>
          <nav className="footer-simple__nav" aria-label="Footer navigation">
            <Link href="/motion">Projects</Link>
            <Link href="/#journal">Journal</Link>
            <Link href="/#about">About</Link>
            <Link href="/#contact">Contributors</Link>
            <Link href="/#contact">Terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
