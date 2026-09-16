"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronUp } from "lucide-react";
import OtherProjectsSlider from "@/components/OtherProjectsSlider";

export default function ChundaPalacePage() {
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
            src="/assets/images/chunda-palace/asset_02_1920x1080.png"
            alt="Chunda Palace Udaipur grand heritage facade"
            loading="eager"
          />
        </div>
      </section>

      {/* 3. Project Intro Statement */}
      <section className="mayfair-intro-section">
        <p className="mayfair-category-tag reveal-text">Chunda Palace, Udaipur</p>
        <p className="mayfair-intro-statement reveal-text" data-parallax="0.02">
          Chunda Palace is deeply rooted in the <em>visual traditions of Rajasthan</em>, bringing together <em>ornate architecture</em>, detailed interiors and a hospitality experience shaped by the <em>cultural character</em> of Udaipur. Every space carries layers of craftsmanship, colour and historical reference.
        </p>
      </section>

      <main className="mayfair-container">
        <section className="mayfair-featured-card reveal-item">
          <div className="mayfair-featured-media image-reveal">
            <img
              src="/assets/images/chunda-palace/asset_14_1920x1080.png"
              alt="Chunda Palace Udaipur featured teaser showcase"
              loading="lazy"
            />
          </div>
        </section>

        <section className="mayfair-info-section">
          <div className="mayfair-info-story reveal-item">
            <p>
              For the films, our focus was on finding movement within this richness.
            </p>
            <p>
              Through light, composition and carefully considered moments, we explored the palace beyond its decorative details—bringing together its architecture, atmosphere and hospitality into a visual experience that reflects the property&apos;s distinctly Rajasthani identity.
            </p>
          </div>

          <div className="mayfair-services-panel reveal-item">
            <h4 className="mayfair-services-label">SERVICES PROVIDED</h4>
            <p className="mayfair-services-text">
              Concept, Moodboarding, Production Management, Creative Direction, Client Direction, Prop Styling, Post-production
            </p>
          </div>
        </section>

        <section className="mayfair-gallery-flow" aria-label="Chunda Palace Video Still Gallery">
          <div className="mayfair-gallery-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px, 2.5vw, 36px)', marginBottom: 'clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/chunda-palace/asset_03_1026x515.png" alt="Chunda Palace hand-painted frescoes" loading="lazy" />
            </div>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/chunda-palace/asset_04_1026x514.png" alt="Chunda Palace royal jharokhas" loading="lazy" />
            </div>
          </div>

          <div className="mayfair-gallery-row mayfair-gallery-bleed" style={{ margin: '0 -4vw clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/chunda-palace/asset_15_1920x1080.png" alt="Chunda Palace rooftop terrace overlooking Lake Pichola" loading="lazy" />
            </div>
          </div>

          <div className="mayfair-gallery-row" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'clamp(16px, 2.5vw, 36px)', alignItems: 'center', marginBottom: 'clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/chunda-palace/asset_05_1026x513.png" alt="Chunda Palace courtyard fountain" loading="lazy" />
            </div>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/chunda-palace/asset_07_1368x687.png" alt="Chunda Palace lantern-lit corridor" loading="lazy" />
            </div>
          </div>

          <div className="mayfair-gallery-row" style={{ maxWidth: '88%', margin: '0 auto clamp(48px, 6vw, 96px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/chunda-palace/asset_19_1710x855.png" alt="Chunda Palace evening palace illumination" loading="lazy" />
            </div>
          </div>
        </section>

      </main>

      {/* Other Projects Slider Section */}
      <OtherProjectsSlider currentSlug="chunda-palace" type="motion" />

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
