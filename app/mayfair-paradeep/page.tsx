"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronUp } from "lucide-react";
import OtherProjectsSlider from "@/components/OtherProjectsSlider";

export default function MayfairParadeepPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerState, setHeaderState] = useState<"transparent" | "black" | "white">("transparent");

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
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
      );
      revealTargets.forEach((el) => revealObserver.observe(el));
    }
    return () => {
      revealTargets.forEach((el) => el.classList.remove("is-visible"));
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId: number;
    const heroEl = document.querySelector(".mayfair-hero-section") as HTMLElement | null;
    const parallaxItems = Array.from(document.querySelectorAll("[data-parallax]")) as HTMLElement[];

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
          const clamped = Math.min(Math.max(distance, -50), 50);
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mayfair-page-wrapper">
      <header
        className={`mayfair-header-bar ${
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
            style={{ height: "26px", width: "auto", display: "block" }}
          />
        </Link>

        <nav className="header-social" aria-label="Social links">
          <a href="https://www.instagram.com/soupbyfalka/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.youtube.com/@SoupbyFalka" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://www.linkedin.com/company/soupbyfalka" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
      </header>

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
                  <Link href="/stills" className="menu__sub-link" onClick={() => setMenuOpen(false)}>STILLS</Link>
                  <Link href="/motion" className="menu__sub-link" onClick={() => setMenuOpen(false)}>MOTION</Link>
                </div>
              </div>
              <Link href="/#journal" className="menu__nav-link" onClick={() => setMenuOpen(false)}>JOURNAL</Link>
              <Link href="/#about" className="menu__nav-link" onClick={() => setMenuOpen(false)}>ABOUT</Link>
              <Link href="/#contact" className="menu__nav-link" onClick={() => setMenuOpen(false)}>CONTACT</Link>
            </nav>
          </div>
        </div>
      </aside>

      <section className="mayfair-hero-section">
        <div className="mayfair-hero-media" data-parallax="0.08">
          <img
            src="/assets/images/mayfair-paradeep/asset_02_1666x769.png"
            alt="MAYFAIR Bay Resort Paradeep coastal view"
            loading="eager"
          />
        </div>
      </section>

      <section className="mayfair-intro-section">
        <p className="mayfair-category-tag reveal-text">Mayfair Bay Resort, Paradeep</p>
        <p className="mayfair-intro-statement reveal-text" data-parallax="0.02">
          Located along Odisha&apos;s eastern coast, MAYFAIR Bay Resort presents a <em>contemporary interpretation</em> of hospitality within the port city of Paradeep. Designed for leisure, celebrations and business travellers alike, the property balances <em>modern spaces</em> with a relaxed connection to its <em>coastal surroundings</em>.
        </p>
      </section>

      <main className="mayfair-container">
        <section className="mayfair-featured-card reveal-item">
          <div className="mayfair-featured-media image-reveal">
            <img
              src="/assets/images/mayfair-paradeep/asset_11_1709x780.png"
              alt="MAYFAIR Bay Resort Paradeep featured teaser showcase"
              loading="lazy"
            />
          </div>
        </section>

        <section className="mayfair-info-section">
          <div className="mayfair-info-story reveal-item">
            <p>
              Our creative approach focused on giving the property a visual identity that felt refined, contemporary and experience-led.
            </p>
            <p>
              Through film, we explored the movement between spaces, guest interactions and the atmosphere that changes throughout the day—creating a body of work designed to position MAYFAIR Bay Resort beyond a conventional coastal stay.
            </p>
          </div>

          <div className="mayfair-services-panel reveal-item">
            <h4 className="mayfair-services-label">SERVICES PROVIDED</h4>
            <p className="mayfair-services-text">
              Concept, Moodboarding, Production Management, Creative Direction, Client Direction, Casting, Wardrobe &amp; Styling, Prop Styling, Make-up &amp; Grooming, Post-production, Voice-over Script &amp; Talent
            </p>
          </div>
        </section>

        <section className="mayfair-gallery-flow" aria-label="Mayfair Paradeep Video Still Gallery">
          <div className="mayfair-gallery-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px, 2.5vw, 36px)', marginBottom: 'clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/mayfair-paradeep/asset_03_1026x470.png" alt="MAYFAIR Paradeep grand entrance" loading="lazy" />
            </div>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/mayfair-paradeep/asset_04_1026x470.png" alt="MAYFAIR Paradeep coastal dining" loading="lazy" />
            </div>
          </div>

          <div className="mayfair-gallery-row mayfair-gallery-bleed" style={{ margin: '0 -4vw clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/mayfair-paradeep/asset_14_1710x857.png" alt="MAYFAIR Paradeep twilight poolside view" loading="lazy" />
            </div>
          </div>

          <div className="mayfair-gallery-row" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'clamp(16px, 2.5vw, 36px)', alignItems: 'center', marginBottom: 'clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/mayfair-paradeep/asset_05_1026x468.png" alt="MAYFAIR Paradeep executive suite" loading="lazy" />
            </div>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/mayfair-paradeep/asset_06_1026x468.png" alt="MAYFAIR Paradeep lounge details" loading="lazy" />
            </div>
          </div>

          <div className="mayfair-gallery-row" style={{ maxWidth: '88%', margin: '0 auto clamp(48px, 6vw, 96px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/mayfair-paradeep/asset_15_1710x785.png" alt="MAYFAIR Paradeep coastal sunset" loading="lazy" />
            </div>
          </div>
        </section>

      </main>

      {/* Other Projects Slider Section */}
      <OtherProjectsSlider currentSlug="mayfair-paradeep" type="motion" />

      {/* Footer Section */}
      <footer className="footer-simple" id="contact">
        <div className="footer-simple__top-flex">
          <div>
            <p className="footer-simple__label">GET IN TOUCH</p>
            <p className="footer-simple__text">If you want to contribute, learn more or start a project.</p>
            <a className="footer-simple__btn" href="mailto:info@soupbyfalka.com">
              INFO@SOUPBYFALKA.COM
            </a>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="footer-simple__back-top"
            aria-label="Back to top"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
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
