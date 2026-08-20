"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronUp } from "lucide-react";

export default function MayfairGopalpurPage() {
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
            src="/assets/images/mayfair-gopalpur/hero.jpg"
            alt="Mayfair Palm Beach Resort Gopalpur-on-Sea panoramic view"
            loading="eager"
          />
        </div>
      </section>

      {/* 3. Project Intro Statement */}
      <section className="mayfair-intro-section">
        <p className="mayfair-category-tag reveal-text">MAYFAIR PALM BEACH RESORT / GOPALPUR</p>
        <p className="mayfair-intro-statement reveal-text" data-parallax="0.02">
          Commissioned by Mayfair Palm Beach Resort Gopalpur-on-Sea, this collection captures the tranquil coastal charm of the Bay of Bengal, lush palm groves, and colonial heritage architecture.
        </p>
      </section>

      {/* Main Content Container */}
      <main className="mayfair-container">

        {/* 4. Featured Card with Title Overlay */}
        <section className="mayfair-featured-card reveal-item">
          <div className="mayfair-featured-media image-reveal">
            <img
              src="/assets/images/mayfair-gopalpur/featured.jpg"
              alt="Mayfair Palm Beach Resort featured showcase"
              loading="lazy"
            />
          </div>
        </section>

        {/* 5. Two-Column Narrative & Services Grid */}
        <section className="mayfair-info-section">
          {/* Left Column: Narrative */}
          <div className="mayfair-info-story reveal-item">
            <p>
              Immersed in gentle ocean breezes, sun-drenched private beaches, and historic veranda gardens, the visual story evokes relaxed seaside luxury and deep rejuvenation.
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
              Concept, Production Management, Creative Direction, Coastal Styling, Drone Cinematography, Color Grading, Postproduction
            </p>
            <a
              href="https://mayfairhotels.com/palm-beach-resort-gopalpur"
              target="_blank"
              rel="noopener noreferrer"
              className="mayfair-services-link"
            >
              mayfairhotels.com/palm-beach-resort-gopalpur
            </a>
          </div>
        </section>

        {/* 6. Visual Gallery Showcase Flow */}
        <section className="mayfair-gallery-flow" aria-label="Mayfair Palm Beach Resort Photo Gallery">

          {/* Row 1: 2-Column Luxury Guest Rooms */}
          <div className="mayfair-gallery-row mayfair-gallery-2col">
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/mayfair-gopalpur/row1_left.jpg"
                alt="Mayfair Gopalpur bright luxury suite with direct garden access"
                loading="lazy"
              />
            </div>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/mayfair-gopalpur/row1_right.jpg"
                alt="Mayfair Gopalpur suite with ornate headboard and mirror detailing"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 2: Medium Inset Oceanfront Palm Lawn */}
          <div className="mayfair-gallery-row mayfair-gallery-medium">
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/mayfair-gopalpur/row2_inset.jpg"
                alt="Mayfair Gopalpur lush oceanfront lawns and swaying palm trees"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 3: Asymmetric Poolside & Aerial View */}
          <div className="mayfair-gallery-row mayfair-gallery-asymmetric">
            <div className="mayfair-image-card mayfair-card-portrait reveal-item image-reveal">
              <img
                src="/assets/images/mayfair-gopalpur/row3_portrait.jpg"
                alt="Mayfair Gopalpur swimming pool daybeds framed by tropical greenery"
                loading="lazy"
              />
            </div>
            <div className="mayfair-image-card mayfair-card-landscape reveal-item image-reveal">
              <img
                src="/assets/images/mayfair-gopalpur/row3_landscape.jpg"
                alt="Mayfair Gopalpur top-down aerial of the crystal blue pool"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 4: Full Bleed Colonial Courtyard Panorama */}
          <div className="mayfair-gallery-row mayfair-gallery-bleed">
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/mayfair-gopalpur/row4_bleed.jpg"
                alt="Mayfair Gopalpur grand courtyard and water features"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 5: 2-Column Seaside Terrace & Swan Pathway */}
          <div className="mayfair-gallery-row mayfair-gallery-2col">
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/mayfair-gopalpur/row5_left.jpg"
                alt="Mayfair Gopalpur seaside dining terrace overlooking palm trees"
                loading="lazy"
              />
            </div>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/mayfair-gopalpur/row5_right.jpg"
                alt="Mayfair Gopalpur garden pathway with swan sculptures and resort facade"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 6: Medium Inset Twilight Resort Aerial */}
          <div className="mayfair-gallery-row mayfair-gallery-medium">
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/mayfair-gopalpur/row6_inset.jpg"
                alt="Mayfair Gopalpur twilight aerial of the grand illuminated resort"
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
