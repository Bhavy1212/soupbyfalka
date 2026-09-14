"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AboutPage() {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="projects-page-wrapper" style={{ backgroundColor: "#EFECE6" }}>
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
            src={
              headerState === "transparent" || headerState === "black"
                ? "/assets/images/soup-logo-white.png"
                : "/assets/images/soup-logo.png"
            }
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
              <Link href="/journal" className="menu__nav-link" onClick={() => setMenuOpen(false)}>JOURNAL</Link>
              <Link href="/about" className="menu__nav-link" onClick={() => setMenuOpen(false)}>ABOUT</Link>
              <Link href="/contact" className="menu__nav-link" onClick={() => setMenuOpen(false)}>CONTACT</Link>
            </nav>
          </div>
        </div>
      </aside>

      {/* 2. Hero Panoramic Image Banner (Page 42 Design) */}
      <section className="projects-hero-banner" style={{ width: "100%", overflow: "hidden", position: "relative" }}>
        <div className="projects-hero-media" data-parallax="0.06" style={{ width: "100%", height: "clamp(340px, 42vw, 680px)", overflow: "hidden" }}>
          <img
            src="/assets/images/about/about-hero-face.jpg"
            alt="SOUP Visual Communication Studio - Atmosphere and Light"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
          />
        </div>
      </section>

      {/* 3. About Statement Section (PDF Page 42) */}
      <section className="projects-statement-quote" style={{ padding: "clamp(28px, 3.2vw, 44px) var(--gutter) clamp(24px, 2.8vw, 38px)" }}>
        <p style={{
          fontFamily: "var(--font-sans-primary)",
          fontSize: "clamp(12px, 1.05vw, 13.5px)",
          fontWeight: 600,
          color: "#1a1917",
          letterSpacing: "0.02em",
          marginBottom: "clamp(16px, 1.8vw, 22px)",
          textAlign: "center"
        }}>
          About Us
        </p>
        <p className="projects-statement-text reveal-text" data-parallax="0.02" style={{
          fontFamily: "var(--font-serif-primary)",
          fontSize: "clamp(18px, 1.95vw, 26px)",
          lineHeight: 1.45,
          color: "#1a1917",
          maxWidth: "880px",
          margin: "0 auto",
          textAlign: "center"
        }}>
          SOUP is a <em>visual</em> communication studio specialising in hospitality <em>films</em> and<br className="hidden md:inline" />{" "}
          <em>photography</em>, helping <em>hoteliers</em> and <em>architects</em> communicate experiences<br className="hidden md:inline" />{" "}
          with <em>clarity</em> and <em>intention</em>.
        </p>
      </section>

      {/* 4. Two Photo Columns Grid (PDF Page 42: Exact Vertical Format) */}
      <section style={{
        maxWidth: "1320px",
        margin: "0 auto clamp(28px, 3.5vw, 44px)",
        padding: "0 clamp(16px, 2.5vw, 36px)",
        boxSizing: "border-box"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "clamp(24px, 4vw, 56px)"
        }}>
          <div style={{
            position: "relative",
            width: "100%",
            aspectRatio: "679 / 780",
            overflow: "hidden",
            borderRadius: "2px",
            backgroundColor: "#eae5dc"
          }} className="reveal-item">
            <img
              src="/assets/images/about/about-facade-exact.jpg"
              alt="Luxury hotel architecture with floral balconies and dome"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              loading="lazy"
            />
          </div>
          <div style={{
            position: "relative",
            width: "100%",
            aspectRatio: "679 / 780",
            overflow: "hidden",
            borderRadius: "2px",
            backgroundColor: "#eae5dc"
          }} className="reveal-item">
            <img
              src="/assets/images/about/about-window-exact.jpg"
              alt="Guest enjoying quiet moment reading in armchair by window"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 5. Two Narrative Text Columns (PDF Page 42: Directly below the photos) */}
      <section style={{
        maxWidth: "1320px",
        margin: "0 auto clamp(64px, 8vw, 120px)",
        padding: "0 clamp(16px, 2.5vw, 36px)",
        boxSizing: "border-box"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "clamp(24px, 4vw, 56px)",
          fontFamily: "var(--font-sans-primary)",
          fontWeight: 400,
          fontSize: "clamp(13.5px, 1.05vw, 15px)",
          lineHeight: 1.7,
          color: "#383531"
        }}>
          {/* Left text column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }} className="reveal-text">
            <p style={{ margin: 0 }}>
              Hospitality is more than buildings and services; it is atmosphere, design, culture and the emotions that shape a guest&apos;s experience. It takes years of vision, planning and dedication to shape a meaningful hospitality experience, and every property ultimately reflects and speaks to the heart of its creators.
            </p>
            <p style={{ margin: 0 }}>
              We believe that essence should come through clearly in its visual communication.
            </p>
          </div>

          {/* Right text column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }} className="reveal-text">
            <p style={{ margin: 0 }}>
              At SOUP, we create hospitality films and photography that communicate the true character of a space with clarity and intention. Inspired by architecture, design and the spirit of hospitality, we focus on capturing experiences the way they are meant to be felt and remembered.
            </p>
            <p style={{ margin: 0 }}>
              Having worked with brands like Taj, The Leela, MAYFAIR, Radisson and ITC, we understand how to bring these experiences to life through thoughtful visual communication. We work with hoteliers, hospitality leadership teams and architects who believe hospitality should not only be seen, but genuinely experienced.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Other Projects Section (PDF Page 42) */}
      <section style={{
        maxWidth: "1320px",
        margin: "0 auto clamp(64px, 8vw, 110px)",
        padding: "0 clamp(16px, 2.5vw, 36px)",
        boxSizing: "border-box"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: "clamp(32px, 5vw, 64px)",
          alignItems: "start"
        }}>
          {/* Left info column */}
          <div>
            <h2 style={{
              fontFamily: "var(--font-sans-primary)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#1a1917",
              marginBottom: "14px"
            }}>
              OTHER PROJECTS
            </h2>
            <p style={{
              fontFamily: "var(--font-sans-primary)",
              fontSize: "13px",
              fontWeight: 400,
              lineHeight: 1.55,
              color: "#55524e",
              marginBottom: "24px",
              maxWidth: "230px"
            }}>
              Uncover other stories from our curated selection of global brands.
            </p>
            <Link
              href="/stills"
              style={{
                display: "inline-block",
                padding: "8px 16px",
                border: "1px solid #1a1917",
                borderRadius: "1px",
                fontFamily: "var(--font-sans-primary)",
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#1a1917",
                textDecoration: "none"
              }}
              className="projects-journal-btn"
            >
              VIEW OTHER PROJECTS
            </Link>
          </div>

          {/* Right project showcase cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "clamp(20px, 3vw, 36px)"
          }}>
            {/* Card 1: Manuscript */}
            <div>
              <Link href="/manuscript" style={{ textDecoration: "none" }}>
                <div style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  overflow: "hidden",
                  borderRadius: "2px",
                  backgroundColor: "#eae5dc"
                }}>
                  <img
                    src="/assets/images/about/about-manuscript-card.png"
                    alt="Manuscript hospitality project showcase"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    loading="lazy"
                  />
                </div>
                <p style={{
                  fontFamily: "var(--font-sans-primary)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#1a1917",
                  marginTop: "14px",
                  marginBottom: "12px"
                }}>
                  Manuscript
                </p>
              </Link>
              {/* Carousel indicator dots */}
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#1a1917", display: "inline-block" }}></span>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#b5b0a8", display: "inline-block" }}></span>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#b5b0a8", display: "inline-block" }}></span>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#b5b0a8", display: "inline-block" }}></span>
              </div>
            </div>

            {/* Card 2: Parallel Udaipur */}
            <div>
              <Link href="/parallel" style={{ textDecoration: "none" }}>
                <div style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  overflow: "hidden",
                  borderRadius: "2px",
                  backgroundColor: "#eae5dc"
                }}>
                  <img
                    src="/assets/images/about/about-parallel-card.png"
                    alt="Parallel Udaipur hospitality project showcase"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    loading="lazy"
                  />
                </div>
                <p style={{
                  fontFamily: "var(--font-sans-primary)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#1a1917",
                  marginTop: "14px",
                  marginBottom: "12px"
                }}>
                  Parallel Udaipur
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
            <Link href="/journal">Journal</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contributors</Link>
            <Link href="/contact">Terms</Link>
          </nav>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            style={{
              background: "#1a1917",
              color: "#ffffff",
              border: "none",
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "14px",
              marginLeft: "auto"
            }}
          >
            &#9650;
          </button>
        </div>
      </footer>
    </div>
  );
}
