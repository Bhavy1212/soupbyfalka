"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import OtherProjectsSlider from "@/components/OtherProjectsSlider";
import ProjectFloatingSwitcher from "@/components/ProjectFloatingSwitcher";
import { ChevronUp } from "lucide-react";

export default function NemesiaPage() {
  const [projectTab, setProjectTab] = useState<"stills" | "motion">("stills");

  const toggleProjectTab = () => {
    setProjectTab((prev) => (prev === "stills" ? "motion" : "stills"));
  };

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
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
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

    const heroEl = document.querySelector(".mayfair-hero-section") as HTMLElement | null;
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="mayfair-page-wrapper">
      {/* 1. Sticky Navigation Header */}
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

      {/* 2. Hero Panoramic Image Banner */}
      <section className="mayfair-hero-section">
        <div className="mayfair-hero-media" data-parallax="0.08">
          <img
            src="/assets/images/nemesia/hero.png"
            alt="Nemesia Resort & Spa Rishikesh panoramic landscape view"
            loading="eager"
          />
        </div>
      </section>

      {/* 3. Project Intro Statement */}
      <section className="mayfair-intro-section">
        <p className="mayfair-category-tag reveal-text">Nemesia Resort & Spa, Rishikesh</p>
        <p className="mayfair-intro-statement reveal-text" data-parallax="0.02">
          Located within the <em>natural landscape</em> surrounding Rishikesh, Nemesia Resort &amp; Spa is centred around wellness, <em>restoration</em> and a more <em>mindful</em> approach to hospitality. The property brings together contemporary spaces with experiences designed around <em>rest</em> and <em>renewal</em>.
        </p>
      </section>

      {/* Main Content Container */}
      <main className="mayfair-container">

        {/* 4. Featured Card */}
        <section className="mayfair-featured-card reveal-item">
          <div className="mayfair-featured-media image-reveal">
            <img
              src="/assets/images/nemesia/featured.png"
              alt="Nemesia Resort & Spa featured architecture showcase"
              loading="lazy"
            />
          </div>
        </section>

        {/* 5. Two-Column Narrative & Services Grid */}
        <section className="mayfair-info-section">
          {/* Left Column: Narrative */}
          <div className="mayfair-info-story reveal-item">
            <p>
              Our photographic approach focused on translating this sense of calm through light, composition and spatial detail.
            </p>
            <p>
              Rather than simply documenting the property, the imagery explored its atmosphere from interiors and architecture to the quieter details that shape the guest experience, creating a visual identity that feels refined, restorative and connected to its natural surroundings.
            </p>
          </div>

          {/* Right Column: Services & Links */}
          <div className="mayfair-services-panel reveal-item">
            <h4 className="mayfair-services-label">SERVICES PROVIDED</h4>
            <p className="mayfair-services-text">
              Concept, Pre-production Planning, Creative Direction, Art Direction, Styling, Lighting, Interior &amp; Exterior Photography, Architectural Detail Photography, Post-production
            </p>
          </div>
        </section>

        {/* 6. Curated Visual Gallery Flow matching PDF Page 11 */}
        <section className="nemesia-gallery-flow" aria-label="Nemesia Resort & Spa Photo Gallery">

          {/* Row 1: Asymmetrical 2 Columns (Left: 475px, Right: 387px) */}
          <div className="mayfair-gallery-row" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'clamp(16px, 2.5vw, 36px)', alignItems: 'center', marginBottom: 'clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/nemesia/gallery-01.png"
                alt="Nemesia Resort bedroom interior with natural daylight"
                loading="lazy"
              />
            </div>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/nemesia/gallery-02.png"
                alt="Nemesia architectural detail and textured stone surfaces"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 2: Inset Centered Wide Frame */}
          <div className="mayfair-gallery-row" style={{ maxWidth: '85%', margin: '0 auto clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/nemesia/gallery-03.png"
                alt="Nemesia Resort open courtyard pool overlooking mountain ridge"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 3: 2 Balanced Columns */}
          <div className="mayfair-gallery-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px, 2.5vw, 36px)', marginBottom: 'clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/nemesia/gallery-04.png"
                alt="Nemesia dining lounge and natural wood finishes"
                loading="lazy"
              />
            </div>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/nemesia/gallery-05.png"
                alt="Nemesia tranquil outdoor walkway"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 4: Full Bleed Panoramic Horizon */}
          <div className="mayfair-gallery-row mayfair-gallery-bleed" style={{ margin: '0 -4vw clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/nemesia/gallery-06.png"
                alt="Nemesia panoramic mountain vista and surrounding Rishikesh valley"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 5: 2 Columns */}
          <div className="mayfair-gallery-row" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'clamp(16px, 2.5vw, 36px)', alignItems: 'center', marginBottom: 'clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/nemesia/gallery-07.png"
                alt="Nemesia spa treatment lounge and warm amber ambience"
                loading="lazy"
              />
            </div>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/nemesia/gallery-08.png"
                alt="Nemesia minimalist stone and ceramic styling"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 6: Centered Signature Frame */}
          <div className="mayfair-gallery-row" style={{ maxWidth: '88%', margin: '0 auto clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/nemesia/gallery-09.png"
                alt="Nemesia luxury guest suite with private mountain deck"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 7: 2 Columns */}
          <div className="mayfair-gallery-row" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 'clamp(16px, 2.5vw, 36px)', alignItems: 'center', marginBottom: 'clamp(32px, 5vw, 72px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/nemesia/gallery-10.png"
                alt="Nemesia poolside relaxation cabanas at dusk"
                loading="lazy"
              />
            </div>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/nemesia/gallery-11.png"
                alt="Nemesia twilight architectural lighting"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 8: Wide Frame */}
          <div className="mayfair-gallery-row" style={{ maxWidth: '85%', margin: '0 auto clamp(48px, 6vw, 96px)' }}>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/nemesia/gallery-12.png"
                alt="Nemesia Resort & Spa secluded retreat amidst the Himalayan foothills"
                loading="lazy"
              />
            </div>
          </div>

        </section>

        

      </main>

      {/* Floating Stills / Motion Switcher */}
      <ProjectFloatingSwitcher currentTab={projectTab} onToggle={toggleProjectTab} />

      {/* Other Projects Slider Section */}
      <OtherProjectsSlider currentSlug="nemesia" type={projectTab} />

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
