"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronUp } from "lucide-react";

export default function TheLeelaPage() {
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
            src="/assets/images/the-leela/hero.jpg"
            alt="The Leela Palace Udaipur panoramic view"
            loading="eager"
          />
        </div>
      </section>

      {/* 3. Project Intro Statement */}
      <section className="mayfair-intro-section">
        <p className="mayfair-category-tag reveal-text">THE LEELA PALACE, UDAIPUR</p>
        <p className="mayfair-intro-statement reveal-text" data-parallax="0.02">
          Commissioned by The Leela Palace Udaipur, this visual series captures the royal grandeur of Lake Pichola, opulent Mewari palaces, grand boat arrivals, and majestic lakefront dining.
        </p>
      </section>

      {/* Main Content Container */}
      <main className="theleela-container">

        {/* 4. Featured Card with Title Overlay */}
        <section className="mayfair-featured-card theleela-featured-card reveal-item">
          <div className="mayfair-featured-media image-reveal">
            <img
              src="/assets/images/the-leela/featured.jpg"
              alt="The Leela Palace featured showcase"
              loading="lazy"
            />
          </div>
        </section>

        {/* 5. Two-Column Narrative & Services Grid */}
        <section className="mayfair-info-section">
          {/* Left Column: Narrative */}
          <div className="mayfair-info-story reveal-item">
            <p>
              With the shimmering lake and Aravalli mountain peaks as a backdrop, the stills showcase artisanal craftsmanship, gold-leaf accents, and quintessential Indian palace hospitality.
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
              Concept, Production Management, Creative Direction, Luxury Styling, Aerial Cinematography, Color Grading, Postproduction
            </p>
            <a
              href="https://theleela.com/the-leela-palace-udaipur"
              target="_blank"
              rel="noopener noreferrer"
              className="mayfair-services-link"
            >
              theleela.com/the-leela-palace-udaipur
            </a>
          </div>
        </section>

        {/* 6. Visual Gallery Showcase Flow */}
        <section className="mayfair-gallery-flow" aria-label="The Leela Palace Photo Gallery">

          {/* Row 1: 2-Column Royal Suites | Left Bigger (1.23fr : 1fr, 3:2) */}
          <div className="mayfair-gallery-row theleela-gallery-row1">
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/the-leela/row1_left.jpg"
                alt="The Leela Palace Udaipur luxury bedroom suite with gold accents"
                loading="lazy"
              />
            </div>
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/the-leela/row1_right.jpg"
                alt="The Leela Palace Udaipur suite living area with ornate mirror"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 2: Medium Inset Suite with Garden & Pool View | Centered Span: 72.91% */}
          <div className="mayfair-gallery-row theleela-gallery-row2">
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/the-leela/row2_inset.jpg"
                alt="The Leela Palace Udaipur bedroom suite opening to the private pool and gardens"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 3: Asymmetric Culinary Craft & Library Retreat | Portrait Left + Landscape Right */}
          <div className="mayfair-gallery-row theleela-gallery-row3">
            <div className="mayfair-image-card mayfair-card-portrait reveal-item image-reveal">
              <img
                src="/assets/images/the-leela/row3_portrait.jpg"
                alt="The Leela Palace chef plating artisanal delicacy"
                loading="lazy"
              />
            </div>
            <div className="mayfair-image-card mayfair-card-landscape reveal-item image-reveal">
              <img
                src="/assets/images/the-leela/row3_landscape.jpg"
                alt="Guest reading in The Leela Palace library lounge overlooking Lake Pichola"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 4: Centered Inset Lakeside Courtyard Showcase | Centered Span: 84% */}
          <div className="mayfair-gallery-row theleela-gallery-row4">
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/the-leela/row4_bleed.jpg"
                alt="The Leela Palace Udaipur lakeside courtyard and traditional swings with City Palace view"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 5: Asymmetric Lakeside Champagne Breakfast & Gourmet Cuisine | Landscape Left + Portrait Right */}
          <div className="mayfair-gallery-row theleela-gallery-row5">
            <div className="mayfair-image-card mayfair-card-landscape reveal-item image-reveal">
              <img
                src="/assets/images/the-leela/row5_landscape.jpg"
                alt="Romantic lakeside breakfast table with champagne overlooking Lake Pichola at sunset"
                loading="lazy"
              />
            </div>
            <div className="mayfair-image-card mayfair-card-portrait reveal-item image-reveal">
              <img
                src="/assets/images/the-leela/row5_portrait.jpg"
                alt="Artfully presented gourmet cuisine with fresh orchids"
                loading="lazy"
              />
            </div>
          </div>

          {/* Row 6: Medium Inset Blooming Bougainvillea Facade | Centered Span: 72.91% */}
          <div className="mayfair-gallery-row theleela-gallery-row6">
            <div className="mayfair-image-card reveal-item image-reveal">
              <img
                src="/assets/images/the-leela/row6_inset.jpg"
                alt="The Leela Palace Udaipur majestic palace facade draped in pink bougainvillea flowers"
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
