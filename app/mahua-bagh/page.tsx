"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronUp } from "lucide-react";

export default function MahuaBaghPage() {
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
            src="/assets/images/mahua-bagh/asset_02_1709x786.png"
            alt="Mahua Bagh Kumbhalgarh panoramic Aravalli mountain view"
            loading="eager"
          />
        </div>
      </section>

      <section className="mayfair-intro-section">
        <p className="mayfair-category-tag reveal-text">Mahua Bagh, Kumbhalgarh</p>
        <p className="mayfair-intro-statement reveal-text" data-parallax="0.02">
          Surrounded by the <em>Aravalli ranges</em>, Mahua Bagh is shaped by <em>open landscapes</em>, mountain views and the slower pace of Kumbhalgarh. The property creates an experience where <em>architecture and hospitality</em> remain closely connected to the <em>natural environment</em>.
        </p>
      </section>

      <main className="mayfair-container">
        <section className="mayfair-featured-card reveal-item">
          <div className="mayfair-featured-media image-reveal">
            <img
              src="/assets/images/mahua-bagh/asset_27_1710x782.png"
              alt="Mahua Bagh featured teaser showcase"
              loading="lazy"
            />
          </div>
        </section>

        <section className="mayfair-info-section">
          <div className="mayfair-info-story reveal-item">
            <p>
              Our films focused on this relationship between the built and the natural.
            </p>
            <p>
              Through changing light, movement and the experiences that unfold across the property, we created a visual interpretation centred on escape, openness and stillness. The aim was to let the landscape lead the narrative while positioning Mahua Bagh as a retreat shaped by its surroundings.
            </p>
          </div>

          <div className="mayfair-services-panel reveal-item">
            <h4 className="mayfair-services-label">SERVICES PROVIDED</h4>
            <p className="mayfair-services-text">
              Concept, Moodboarding, Production Management, Creative Direction, Client Direction, Prop Styling, Post-production
            </p>
          </div>
        </section>

        <section className="mayfair-gallery-flow" aria-label="Mahua Bagh Video Still Gallery">
          <div className="mayfair-gallery-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px, 2.5vw, 36px)', marginBottom: 'clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/mahua-bagh/asset_03_1026x515.png" alt="Mahua Bagh hillside cottages" loading="lazy" />
            </div>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/mahua-bagh/asset_04_1026x514.png" alt="Mahua Bagh private balcony overlooking valley" loading="lazy" />
            </div>
          </div>

          <div className="mayfair-gallery-row mayfair-gallery-bleed" style={{ margin: '0 -4vw clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/mahua-bagh/asset_32_1710x783.png" alt="Mahua Bagh infinity pool facing the Aravallis" loading="lazy" />
            </div>
          </div>

          <div className="mayfair-gallery-row" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'clamp(16px, 2.5vw, 36px)', alignItems: 'center', marginBottom: 'clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/mahua-bagh/asset_05_1026x513.png" alt="Mahua Bagh mountain dawn light" loading="lazy" />
            </div>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/mahua-bagh/asset_06_1026x513.png" alt="Mahua Bagh organic garden pathway" loading="lazy" />
            </div>
          </div>

          <div className="mayfair-gallery-row" style={{ maxWidth: '88%', margin: '0 auto clamp(48px, 6vw, 96px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img src="/assets/images/mahua-bagh/asset_11_1368x687.png" alt="Mahua Bagh evening firepit under starlit sky" loading="lazy" />
            </div>
          </div>
        </section>

        <section className="mayfair-next-projects">
          <div className="mayfair-next-header">
            <span className="mayfair-next-title">EXPLORE MORE PROJECTS</span>
          </div>
          <div className="mayfair-next-grid">
            <Link href="/radisson" className="mayfair-next-card group">
              <div className="mayfair-next-media">
                <img src="/assets/images/DJI_0685.jpg" alt="Radisson Hotel Nathdwara" loading="lazy" />
              </div>
              <div className="mayfair-next-meta">
                <span className="mayfair-next-name">RADISSON HOTEL, NATHDWARA</span>
                <span className="mayfair-next-arrow">→</span>
              </div>
            </Link>
            <Link href="/prem-kunj" className="mayfair-next-card group">
              <div className="mayfair-next-media">
                <img src="/assets/images/prem-kunj/asset_02_1710x955.png" alt="Prem Kunj Udaipur" loading="lazy" />
              </div>
              <div className="mayfair-next-meta">
                <span className="mayfair-next-name">PREM KUNJ, UDAIPUR</span>
                <span className="mayfair-next-arrow">→</span>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <div className="mayfair-back-top-wrapper">
        <button onClick={scrollToTop} className="mayfair-back-top-btn" aria-label="Back to top">
          <ChevronUp className="w-5 h-5" />
          <span>BACK TO TOP</span>
        </button>
      </div>

      <footer className="mayfair-footer">
        <div className="mayfair-footer-content">
          <p className="mayfair-footer-brand">SOUP BY FALKA</p>
          <p className="mayfair-footer-copy">© {new Date().getFullYear()} ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </div>
  );
}
