"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronUp } from "lucide-react";

export default function RadissonPage() {
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
            src="/assets/images/radisson/hero.jpg"
            alt="Radisson Luxury Collection panoramic view"
            loading="eager"
          />
        </div>
      </section>

      {/* 3. Project Intro Statement */}
      <section className="mayfair-intro-section">
        <p className="mayfair-category-tag reveal-text">RADDISION, NATHWARA</p>
        <p className="mayfair-intro-statement reveal-text" data-parallax="0.02">
          Commissioned by Radisson, this project highlights contemporary luxury hospitality, elevated gastronomy, and sophisticated architecture across vibrant social spaces and private retreats.
        </p>
      </section>

      {/* Main Content Container */}
      <main className="radisson-container">

        {/* 4. Featured Card with Title Overlay */}
        <section className="mayfair-featured-card radisson-featured-card reveal-item">
          <div className="mayfair-featured-media image-reveal">
            <img
              src="/assets/images/radisson/featured.jpg"
              alt="Radisson featured showcase"
              loading="lazy"
            />
          </div>
        </section>

        {/* 5. Two-Column Narrative & Services Grid */}
        <section className="mayfair-info-section">
          {/* Left Column: Narrative */}
          <div className="mayfair-info-story reveal-item">
            <p>
              Through dramatic architectural lighting, rich interior textures, and refined culinary presentations, the photography conveys a narrative of modern elegance and genuine guest hospitality.
            </p>

            <h3 className="mayfair-films-heading">The Three Films:</h3>
            <ol className="mayfair-films-list">
              <li>
                A couple's journey, narrated by the ocean itself as they embrace the rhythm of the sea, doubled as a brand film for the property.
              </li>
              <li>
                An intergenerational family film, told through the voice of a local custodian reflected on the island's deep significance.
              </li>
              <li>
                A story centred on an Asian couple, this film was guided by the island as it revealed the secluded beauty and wisdom of Hadahaa.
              </li>
            </ol>
          </div>

          {/* Right Column: Services & Links */}
          <div className="mayfair-services-panel reveal-item">
            <h4 className="mayfair-services-label">SERVICES PROVIDED</h4>
            <p className="mayfair-services-text">
              Concept, Production Management, Creative Direction, Food & Beverage Curation, Styling, Postproduction
            </p>
            <a
              href="https://radissonhotels.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mayfair-services-link"
            >
              radissonhotels.com
            </a>
          </div>
        </section>

        {/* 6. Visual Gallery Showcase Flow */}
        <section className="mayfair-gallery-flow" aria-label="Radisson Photo Gallery">

          {/* Row 1: 2-Column Hotel Entrance & Modern Suite */}
          <div className="mayfair-gallery-row radisson-gallery-row1">
            <div className="mayfair-image-card radisson-card-r1-left reveal-item image-reveal">
              <img
                src="/assets/images/radisson/row1_left.jpg"
                alt="Radisson grand entrance facade with illuminated branding"
                loading="lazy"
              />
            </div>
            <div className="mayfair-image-card radisson-card-r1-right reveal-item image-reveal">
              <img
                src="/assets/images/radisson/row1_right.jpg"
                alt="Radisson modern guest bedroom with wood panelling and work desk"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 2: Medium Inset Signature Buffet Restaurant */}
          <div className="mayfair-gallery-row radisson-gallery-row2">
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/radisson/row2_inset.jpg"
                alt="Radisson dining hall with bespoke gold rod chandelier"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 3: 2-Column Suralaya Bar & Grand Lobby Lounge */}
          <div className="mayfair-gallery-row radisson-gallery-row3">
            <div className="mayfair-image-card radisson-card-r3-left reveal-item image-reveal">
              <img
                src="/assets/images/radisson/row3_left.jpg"
                alt="Radisson Suralaya cocktail bar and lounge"
                loading="lazy"
              />
            </div>
            <div className="mayfair-image-card radisson-card-r3-right reveal-item image-reveal">
              <img
                src="/assets/images/radisson/row3_right.jpg"
                alt="Radisson grand lobby lounge with plush seating and artwork"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 4: Full Bleed 360-Degree Revolving Restaurant */}
          <div className="mayfair-gallery-row mayfair-gallery-bleed">
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/radisson/row4_bleed.jpg"
                alt="Radisson revolving rooftop restaurant with panoramic 360-degree city views"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 5: 2-Column Suite View & Rooftop Terrace */}
          <div className="mayfair-gallery-row radisson-gallery-row5">
            <div className="mayfair-image-card radisson-card-r5-left reveal-item image-reveal">
              <img
                src="/assets/images/radisson/row5_left.jpg"
                alt="Radisson executive suite with bright panoramic window"
                loading="lazy"
              />
            </div>
            <div className="mayfair-image-card radisson-card-r5-right reveal-item image-reveal">
              <img
                src="/assets/images/radisson/row5_right.jpg"
                alt="Radisson rooftop gravel terrace with tea setup"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 6: Medium Inset Tower Aerial */}
          <div className="mayfair-gallery-row radisson-gallery-row6">
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/radisson/row6_inset.jpg"
                alt="Radisson hotel building and rooftop observatory tower aerial view"
                loading="lazy"
              />
            </div>
          </div>

        </section>

      </main>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="mayfair-back-to-top"
        aria-label="Scroll back to top"
        title="Scroll to top"
      >
        <ChevronUp className="w-4 h-4 stroke-[2]" />
      </button>

      {/* 7. Footer Section */}
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
            <Link href="/stills">Projects</Link>
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
