"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import OtherProjectsSlider from "@/components/OtherProjectsSlider";

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
      {/* 1. Sticky Navigation Header */}
      <header
        className={`site-header ${
          headerState === "transparent"
            ? "is-transparent-hero"
            : headerState === "black"
            ? "is-scrolled-hero"
            : "is-past-hero"
        }`}
        data-header
      >
        <button
          className="menu-toggle magnetic"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`menu-toggle__icon ${menuOpen ? "is-active" : ""}`}>
            <i></i><i></i><i></i>
          </span>
        </button>

        <Link className="wordmark" href="/" aria-label="Soup home">
          <img
            src="/assets/images/soup-logo.png"
            alt="Soup by Falka"
            style={{ height: "26px", width: "auto", display: "block" }}
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
              <img src="/assets/images/soup-logo.png" alt="Soup by Falka" style={{ height: "26px", width: "auto", display: "block" }} />
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
                    MOTION / VIDEOGRAPHY
                  </Link>
                </div>
              </div>
              <Link href="/journal" className="menu__nav-link" onClick={() => setMenuOpen(false)}>JOURNAL</Link>
              <Link href="/about" className="menu__nav-link" onClick={() => setMenuOpen(false)}>ABOUT</Link>
              <Link href="/contact" className="menu__nav-link" onClick={() => setMenuOpen(false)}>CONTACT</Link>
            </nav>
          </div>
        </div>
      </aside>

      {/* 2. Motion Hero Banner Image */}
      <section className="projects-hero-banner">
        <div className="projects-hero-media" data-parallax="0.08">
          <img src="/assets/images/motion_pdf/motion-hero-banner.png" alt="Cinematic motion banner — silhouette against sky" />
        </div>
      </section>

      {/* Fixed floating Pause button in bottom-right corner — switch to STILLS */}
      <Link href="/stills" className="page-tab-switcher" aria-label="Switch to Stills" title="Switch to Stills">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      </Link>



      {/* 3. Authenticity Statement Quote (PDF Page 8) */}
      <section className="projects-statement-quote">
        <p className="projects-statement-text reveal-text" data-parallax="0.03">
          Some experiences <em>need</em> more than a <em>still</em> frame. Through <em>film</em>, we capture the movement, emotion and atmosphere that bring a property to <em>life</em>, turning spaces into <em>experiences</em> audiences can actually <em>feel</em>. A few stories from <em>behind</em> our cameras.
        </p>
      </section>

      {/* 4. Projects Main Grid Section */}
      <section className="projects-grid-section">
        <div className="projects-grid-container">

          {/* ROW 1: 3 Columns Grid */}
          <div className="projects-grid-row projects-grid-3col">
            <article className="project-grid-card reveal-item">
              <Link href="/mayfair?tab=motion" className="block text-inherit no-underline">
                <div className="project-grid-media media-swap image-reveal">
                  <img className="media-swap__primary" src="/assets/images/motion_pdf/mayfair-manor.png" alt="Mayfair Manor, Jungapana" loading="lazy" />
                  <img className="media-swap__secondary" src="/assets/images/aman-b.webp" alt="Mayfair Manor, Jungapana hover" loading="lazy" />
                </div>
                <p className="project-grid-title">Mayfair Manor, Jungapana</p>
              </Link>
            </article>

            <article className="project-grid-card reveal-item">
              <Link href="/mohangarh?tab=motion" className="block text-inherit no-underline">
                <div className="project-grid-media media-swap image-reveal">
                  <img className="media-swap__primary" src="/assets/images/motion_pdf/mohangarh-fort.png" alt="Mohangarh Fort, Jaisalmer" loading="lazy" />
                  <img className="media-swap__secondary" src="/assets/images/nobu-b.webp" alt="Mohangarh Fort hover" loading="lazy" />
                </div>
                <p className="project-grid-title">Mohangarh Fort, Jaisalmer</p>
              </Link>
            </article>

            <article className="project-grid-card reveal-item">
              <Link href="/parallel?tab=motion" className="block text-inherit no-underline">
                <div className="project-grid-media media-swap image-reveal">
                  <img className="media-swap__primary" src="/assets/images/motion_pdf/parallel-hotel.png" alt="Parallel Hotel, Udaipur" loading="lazy" />
                  <img className="media-swap__secondary" src="/assets/images/puli-b.webp" alt="Parallel Hotel hover" loading="lazy" />
                </div>
                <p className="project-grid-title">Parallel Hotel, Udaipur</p>
              </Link>
            </article>
          </div>

          {/* ROW 2: Split 2 Columns (1fr : 2.11fr) Grid */}
          <div className="projects-grid-row projects-grid-split">
            <article className="project-grid-card project-grid-card--medium reveal-item">
              <Link href="/the-leela?tab=motion" className="block text-inherit no-underline">
                <div className="project-grid-media media-swap image-reveal">
                  <img className="media-swap__primary" src="/assets/images/motion_pdf/the-leela-palace.png" alt="The Leela Palace, Udaipur" loading="lazy" />
                  <img className="media-swap__secondary" src="/assets/images/hyatt-b.webp" alt="The Leela Palace hover" loading="lazy" />
                </div>
                <p className="project-grid-title">The Leela Palace, Udaipur</p>
              </Link>
            </article>

            <article className="project-grid-card project-grid-card--wide reveal-item">
              <Link href="/mayfair-gopalpur?tab=motion" className="block text-inherit no-underline">
                <div className="project-grid-media media-swap image-reveal">
                  <img className="media-swap__primary" src="/assets/images/motion_pdf/mayfair-gopalpur.png" alt="Mayfair Palm Beach Resort, Gopalpur" loading="lazy" />
                  <img className="media-swap__secondary" src="/assets/images/alila-b.webp" alt="Mayfair Palm Beach Resort hover" loading="lazy" />
                </div>
                <p className="project-grid-title">Mayfair Palm Beach Resort, Gopalpur</p>
              </Link>
            </article>
          </div>

          {/* ROW 3: 3 Columns Grid */}
          <div className="projects-grid-row projects-grid-3col">
            <article className="project-grid-card reveal-item">
              <Link href="/chunda-palace?tab=motion" className="block text-inherit no-underline">
                <div className="project-grid-media media-swap image-reveal">
                  <img className="media-swap__primary" src="/assets/images/motion_pdf/chunda-palace.png" alt="Chunda Palace, Udaipur" loading="lazy" />
                  <img className="media-swap__secondary" src="/assets/images/chunda-palace/asset_03_1026x515.png" alt="Chunda Palace hover" loading="lazy" />
                </div>
                <p className="project-grid-title">Chunda Palace, Udaipur</p>
              </Link>
            </article>

            <article className="project-grid-card reveal-item">
              <Link href="/chunda-shikar-oudi?tab=motion" className="block text-inherit no-underline">
                <div className="project-grid-media media-swap image-reveal">
                  <img className="media-swap__primary" src="/assets/images/motion_pdf/chunda-shikar-oudi.png" alt="Chunda Shikar Oudi, Udaipur" loading="lazy" />
                  <img className="media-swap__secondary" src="/assets/images/ani-a.webp" alt="Chunda Shikar Oudi hover" loading="lazy" />
                </div>
                <p className="project-grid-title">Chunda Shikar Oudi, Udaipur</p>
              </Link>
            </article>

            <article className="project-grid-card reveal-item">
              <Link href="/radisson?tab=motion" className="block text-inherit no-underline">
                <div className="project-grid-media media-swap image-reveal">
                  <img className="media-swap__primary" src="/assets/images/motion_pdf/radisson-nathdwara.png" alt="Radisson, Nathdwara" loading="lazy" />
                  <img className="media-swap__secondary" src="/assets/images/fourseasons-a.webp" alt="Radisson hover" loading="lazy" />
                </div>
                <p className="project-grid-title">Radisson, Nathdwara</p>
              </Link>
            </article>
          </div>

          {/* ROW 4: Split 2 Columns (1fr : 2.11fr) Grid */}
          <div className="projects-grid-row projects-grid-split">
            <article className="project-grid-card project-grid-card--medium reveal-item">
              <Link href="/mahua-bagh?tab=motion" className="block text-inherit no-underline">
                <div className="project-grid-media media-swap image-reveal">
                  <img className="media-swap__primary" src="/assets/images/motion_pdf/mahua-bagh.png" alt="Mahua Bagh, Kumbhalgarh" loading="lazy" />
                  <img className="media-swap__secondary" src="/assets/images/mahua-bagh/asset_03_1026x515.png" alt="Mahua Bagh hover" loading="lazy" />
                </div>
                <p className="project-grid-title">Mahua Bagh, Kumbhalgarh</p>
              </Link>
            </article>

            <article className="project-grid-card project-grid-card--wide reveal-item">
              <Link href="/mayfair-puri?tab=motion" className="block text-inherit no-underline">
                <div className="project-grid-media media-swap image-reveal">
                  <img className="media-swap__primary" src="/assets/images/motion_pdf/mayfair-waves-puri.png" alt="Mayfair Heritage & Waves Resort, Puri" loading="lazy" />
                  <img className="media-swap__secondary" src="/assets/images/mayfair-puri/asset_03_1026x473.png" alt="Mayfair Puri hover" loading="lazy" />
                </div>
                <p className="project-grid-title">Mayfair Heritage &amp; Waves Resort, Puri</p>
              </Link>
            </article>
          </div>

          {/* ROW 5: 3 Columns Grid */}
          <div className="projects-grid-row projects-grid-3col">
            <article className="project-grid-card reveal-item">
              <Link href="/prem-kunj?tab=motion" className="block text-inherit no-underline">
                <div className="project-grid-media media-swap image-reveal">
                  <img className="media-swap__primary" src="/assets/images/motion_pdf/prem-kunj.png" alt="Prem Kunj, Udaipur" loading="lazy" />
                  <img className="media-swap__secondary" src="/assets/images/prem-kunj/asset_03_1026x513.png" alt="Prem Kunj hover" loading="lazy" />
                </div>
                <p className="project-grid-title">Prem Kunj, Udaipur</p>
              </Link>
            </article>

            <article className="project-grid-card reveal-item">
              <Link href="/manuscript?tab=motion" className="block text-inherit no-underline">
                <div className="project-grid-media media-swap image-reveal">
                  <img className="media-swap__primary" src="/assets/images/motion_pdf/manuscript-udaipur.png" alt="Manuscript, Udaipur" loading="lazy" />
                  <img className="media-swap__secondary" src="/assets/images/luxury-b.webp" alt="Manuscript hover" loading="lazy" />
                </div>
                <p className="project-grid-title">Manuscript, Udaipur</p>
              </Link>
            </article>

            <article className="project-grid-card reveal-item">
              <Link href="/mayfair-paradeep?tab=motion" className="block text-inherit no-underline">
                <div className="project-grid-media media-swap image-reveal">
                  <img className="media-swap__primary" src="/assets/images/motion_pdf/mayfair-paradeep.png" alt="Mayfair Bay Resort, Paradeep" loading="lazy" />
                  <img className="media-swap__secondary" src="/assets/images/mayfair-paradeep/asset_03_1026x470.png" alt="Mayfair Paradeep hover" loading="lazy" />
                </div>
                <p className="project-grid-title">Mayfair Bay Resort, Paradeep</p>
              </Link>
            </article>
          </div>

        </div>
      </section>

      {/* 5. Journal Teaser Section */}
      <section className="projects-journal-section">
        <div className="projects-journal-container">
          <div className="projects-journal-left">
            <Link href="/journal" className="block text-inherit no-underline group">
              <div className="projects-journal-left-media media-swap image-reveal reveal-item">
                <img className="media-swap__primary" src="/assets/images/journal-road-a.webp" alt="Winding forest road" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/journal-road-b.webp" alt="Safari vehicle at sunset" loading="lazy" />
              </div>
              <h2 className="projects-journal-heading reveal-text">JOURNAL</h2>
              <p className="projects-journal-desc reveal-text">
                Our work has a habit of taking us places. And somewhere between the shoots, the stays and the stories we&apos;re there to tell, we often find a few of our own. The people, places and experiences worth remembering, all collected here.
              </p>
              <span className="projects-journal-btn">VIEW MORE</span>
            </Link>
          </div>

          <div className="projects-journal-right">
            <Link href="/journal/mohangarh" className="block text-inherit no-underline group">
              <div className="projects-journal-feature-media image-reveal reveal-item">
                <img
                  src="/assets/images/motion_pdf/motion-journal-feature.png"
                  alt="Mohangarh Fort: The Last Standing Fort of India"
                  loading="lazy"
                />
              </div>
              <div className="projects-journal-feature-meta reveal-text">
                <p className="projects-journal-feature-tag">FEATURE</p>
                <h3 className="projects-journal-feature-title">
                  Mohangarh Fort: The Last Standing Fort of India
                </h3>
                <p className="projects-journal-feature-quote">
                  &ldquo;The future of heritage hospitality may depend less on restoration<br className="hidden sm:inline" />
                  and more on retaining emotional truth.&rdquo;
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Other Projects Slider Section */}
      <OtherProjectsSlider type="motion" />

      {/* 7. Footer */}
      <footer className="footer-simple" id="contact">
        <div className="footer-simple__top">
          <p className="footer-simple__label">INQUIRIES &amp; COMMISSIONS</p>
          <p className="footer-simple__text">India &amp; International Hospitality Commissions</p>
          <a className="footer-simple__btn" href="mailto:falka@soupbyfalka.com">
            FALKA@SOUPBYFALKA.COM
          </a>
        </div>
        <div className="footer-simple__bottom">
          <p>© {new Date().getFullYear()} SOUP BY FALKA. ALL RIGHTS RESERVED.</p>
          <nav className="footer-simple__nav" aria-label="Footer navigation">
            <Link href="/stills">Projects</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
