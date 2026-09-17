"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronUp } from "lucide-react";
import OtherProjectsSlider from "@/components/OtherProjectsSlider";

export default function PremKunjPage() {
  const [projectTab, setProjectTab] = useState<"stills" | "motion">("stills");

  // Read URL query parameter on initial mount or referrer
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "motion" || tab === "stills") {
        setProjectTab(tab);
      } else if (document.referrer.includes("/motion")) {
        setProjectTab("motion");
      }
    }
  }, []);

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
            src="/assets/images/prem-kunj/asset_02_1710x955.png"
            alt="Prem Kunj Udaipur hillside intimate retreat"
            loading="eager"
          />
        </div>
      </section>

      <section className="mayfair-intro-section">
        <p className="mayfair-category-tag reveal-text">Prem Kunj, Udaipur</p>
        <p className="mayfair-intro-statement reveal-text" data-parallax="0.02">
          Located amidst the <em>hills surrounding Udaipur</em>, Premkunj is an <em>intimate retreat</em> defined by privacy, nature and a slower, more <em>personal approach</em> to hospitality. Its smaller scale allows the experience to feel removed from the pace and spectacle of larger resorts.
        </p>
      </section>

      <main className="mayfair-container">
        <section className="mayfair-featured-card reveal-item">
          <div className="mayfair-featured-media image-reveal">
            <img
              src="/assets/images/prem-kunj/asset_10_1710x856.png"
              alt="Prem Kunj featured teaser showcase"
              loading="lazy"
            />
          </div>
        </section>

        <section className="mayfair-info-section">
          <div className="mayfair-info-story reveal-item">
            <p>
              Our approach to film focused on preserving this sense of intimacy.
            </p>
            <p>
              Through quiet moments, natural surroundings and carefully observed experiences, we explored the relationship between the property and its environment. The visual language was designed to feel unhurried and immersive—reflecting a stay shaped less by activity and more by the freedom to simply slow down.
            </p>
          </div>

          <div className="mayfair-services-panel reveal-item">
            <h4 className="mayfair-services-label">SERVICES PROVIDED</h4>
            <p className="mayfair-services-text">
              Concept, Moodboarding, Production Management, Creative Direction, Client Direction, Prop Styling, Post-production
            </p>
          </div>
        </section>

        <section className="mayfair-gallery-flow" aria-label="Prem Kunj Video Still Gallery">
          <div className="mayfair-gallery-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px, 2.5vw, 36px)', marginBottom: 'clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/prem-kunj/asset_03_1026x513.png" alt="Prem Kunj private cottage veranda" loading="lazy" />
            </div>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/prem-kunj/asset_04_1026x513.png" alt="Prem Kunj mountain vista pool" loading="lazy" />
            </div>
          </div>

          <div className="mayfair-gallery-row mayfair-gallery-bleed" style={{ margin: '0 -4vw clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/prem-kunj/asset_13_1710x853.png" alt="Prem Kunj panoramic sunrise over Udaipur valley" loading="lazy" />
            </div>
          </div>

          <div className="mayfair-gallery-row" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'clamp(16px, 2.5vw, 36px)', alignItems: 'center', marginBottom: 'clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/prem-kunj/asset_06_1026x574.png" alt="Prem Kunj bespoke bedroom suite" loading="lazy" />
            </div>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/prem-kunj/asset_07_1026x513.png" alt="Prem Kunj quiet garden patio" loading="lazy" />
            </div>
          </div>

          <div className="mayfair-gallery-row" style={{ maxWidth: '88%', margin: '0 auto clamp(48px, 6vw, 96px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/prem-kunj/asset_14_1710x856.png" alt="Prem Kunj twilight pool illumination" loading="lazy" />
            </div>
          </div>
        </section>

      </main>

      {/* Other Projects Slider Section */}
      <OtherProjectsSlider currentSlug="prem-kunj" type={projectTab} />

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
