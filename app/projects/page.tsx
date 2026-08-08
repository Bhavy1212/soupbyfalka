"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProjectsPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle Scroll Progress & Header UI (matching main landing page)
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId: number;

    const headerEl = document.querySelector("[data-header]");
    const progressEl = document.querySelector("[data-scroll-progress]") as HTMLElement;
    const heroMediaEl = document.querySelector(".projects-hero-banner") || document.querySelector(".projects-hero-media");

    const updateScrollUI = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = Math.max(document.documentElement.scrollHeight - vh, 1);
      if (progressEl) {
        progressEl.style.transform = `scaleX(${Math.min(Math.max(y / max, 0), 1)})`;
      }

      if (headerEl) {
        headerEl.classList.remove("is-hidden");
        const heroHeight = heroMediaEl ? (heroMediaEl as HTMLElement).offsetHeight : vh;

        if (y > heroHeight - 60) {
          headerEl.classList.add("is-past-hero");
          headerEl.classList.remove("is-scrolled-hero");
        } else if (y > 40) {
          headerEl.classList.add("is-scrolled-hero");
          headerEl.classList.remove("is-past-hero");
        } else {
          headerEl.classList.remove("is-scrolled-hero");
          headerEl.classList.remove("is-past-hero");
        }
      }
      rafId = 0;
    };

    const requestScrollUI = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(updateScrollUI);
    };

    updateScrollUI();
    window.addEventListener("scroll", requestScrollUI, { passive: true });
    window.addEventListener("resize", requestScrollUI, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestScrollUI);
      window.removeEventListener("resize", requestScrollUI);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [menuOpen]);

  // Handle Magnetic Buttons
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer || reduceMotion) return;

    const magneticElements = document.querySelectorAll(".magnetic") as NodeListOf<HTMLElement>;
    const handleMove = (e: MouseEvent, el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.17;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.22;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };

    const handleLeave = (el: HTMLElement) => {
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
    };

    const cleanups: (() => void)[] = [];
    magneticElements.forEach((el) => {
      const onMove = (e: MouseEvent) => handleMove(e, el);
      const onLeave = () => handleLeave(el);
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <div className="projects-page-wrapper">
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress" aria-hidden="true">
        <span data-scroll-progress></span>
      </div>

      {/* Header Bar */}
      <header className="site-header" data-header>
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
          <img src="/assets/images/soup-logo.png" alt="Soup by Falka" />
        </Link>

        <nav className="header-social" aria-label="Social links">
          <a href="https://www.instagram.com/soupbyfalka/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://www.youtube.com/@SoupbyFalka" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href="https://www.linkedin.com/company/soupbyfalka" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </nav>
      </header>

      {/* Navigation Menu Overlay Drawer */}
      <aside className={`menu ${menuOpen ? "is-open" : ""}`} id="site-menu" aria-hidden={!menuOpen}>
        <div className="menu__veil" onClick={() => setMenuOpen(false)}></div>
        <div className="menu__panel">
          {/* Top Bar inside Menu */}
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
              <img src="/assets/images/soup-logo.png" alt="Soup by Falka" style={{ height: "20px", width: "auto", display: "block" }} />
            </Link>

            <div className="header-social">
              <a href="https://www.instagram.com/soupbyfalka/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.youtube.com/@SoupbyFalka" target="_blank" rel="noopener noreferrer">YouTube</a>
              <a href="https://www.linkedin.com/company/soupbyfalka" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>

          {/* Menu Main Content Body */}
          <div className="menu__body">
            <nav className="menu__nav-links" aria-label="Primary navigation">
              <Link href="/projects" className="menu__nav-link" onClick={() => setMenuOpen(false)}>PROJECTS</Link>
              <Link href="/#journal" className="menu__nav-link" onClick={() => setMenuOpen(false)}>JOURNAL</Link>
              <Link href="/#about" className="menu__nav-link" onClick={() => setMenuOpen(false)}>ABOUT</Link>
              <Link href="/#contact" className="menu__nav-link" onClick={() => setMenuOpen(false)}>CONTACT</Link>
            </nav>
          </div>
        </div>
      </aside>

      {/* 2. Hero Interior Banner Image */}
      <section className="projects-hero-banner">
        <div className="projects-hero-media">
          <img src="/assets/images/AAA00809.jpg" alt="Luxury hotel interior with grand chandeliers and archways" />
        </div>
      </section>

      {/* 3. Authenticity Statement Quote */}
      <section className="projects-statement-quote">
        <p className="projects-statement-text">
          With a sense of <em>authenticity</em> present in every frame, our team specialise in a content solution tailor made to stand out.
        </p>
      </section>

      {/* 4. Projects Main Grid Section */}
      <section className="projects-grid-section">
        <div className="projects-grid-container">
          
          {/* ROW 1: 3 Columns Grid */}
          <div className="projects-grid-row projects-grid-3col">
            <article className="project-grid-card">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/DJI0275.jpg" alt="AMAN" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/aman-b.webp" alt="AMAN hover" loading="lazy" />
              </div>
              <p className="project-grid-title">AMAN</p>
            </article>

            <article className="project-grid-card">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/DJI_0008.jpg" alt="THE PULI" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/puli-b.webp" alt="THE PULI hover" loading="lazy" />
              </div>
              <p className="project-grid-title">THE PULI</p>
            </article>

            <article className="project-grid-card">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/Untitled3.jpg" alt="NOBU RESIDENCES ABU DHABI" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/nobu-b.webp" alt="NOBU RESIDENCES ABU DHABI hover" loading="lazy" />
              </div>
              <p className="project-grid-title">NOBU RESIDENCES ABU DHABI</p>
            </article>
          </div>

          {/* ROW 2: 2 Columns Split (1/3 Medium + 2/3 Wide) */}
          <div className="projects-grid-row projects-grid-split">
            <article className="project-grid-card project-grid-card--medium">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/DSC08130.jpg" alt="ROSEWOOD" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/rosewood-b.webp" alt="ROSEWOOD hover" loading="lazy" />
              </div>
              <p className="project-grid-title">ROSEWOOD</p>
            </article>

            <article className="project-grid-card project-grid-card--wide">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/02-IHCL1867.jpg" alt="KOKOMO" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/kokomo-b.webp" alt="KOKOMO hover" loading="lazy" />
              </div>
              <p className="project-grid-title">KOKOMO</p>
            </article>
          </div>

          {/* ROW 3: 3 Columns Grid */}
          <div className="projects-grid-row projects-grid-3col">
            <article className="project-grid-card">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/4.jpg" alt="PARK HYATT MALDIVES" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/hyatt-b.webp" alt="PARK HYATT MALDIVES hover" loading="lazy" />
              </div>
              <p className="project-grid-title">PARK HYATT MALDIVES</p>
            </article>

            <article className="project-grid-card">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/Dsc2795.jpg" alt="LUXURY LODGES OF AUSTRALIA" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/luxury-b.webp" alt="LUXURY LODGES OF AUSTRALIA hover" loading="lazy" />
              </div>
              <p className="project-grid-title">LUXURY LODGES OF AUSTRALIA</p>
            </article>

            <article className="project-grid-card">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/02-DJI_20260409224244_0522_D.jpg" alt="SUJAN" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/sujan-b.webp" alt="SUJAN hover" loading="lazy" />
              </div>
              <p className="project-grid-title">SUJAN</p>
            </article>
          </div>

          {/* ROW 4: 2 Columns Split (1/3 Medium + 2/3 Wide) */}
          <div className="projects-grid-row projects-grid-split">
            <article className="project-grid-card project-grid-card--medium">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/DJI0398.jpg" alt="ALILA OMAN" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/alila-b.webp" alt="ALILA OMAN hover" loading="lazy" />
              </div>
              <p className="project-grid-title">ALILA OMAN</p>
            </article>

            <article className="project-grid-card project-grid-card--wide">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/01-AAA03524.jpg" alt="JANU" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/janu-b.webp" alt="JANU hover" loading="lazy" />
              </div>
              <p className="project-grid-title">JANU</p>
            </article>
          </div>

          {/* ROW 5: 3 Columns Grid */}
          <div className="projects-grid-row projects-grid-3col">
            <article className="project-grid-card">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/01.jpg" alt="ANI PRIVATE RESORTS" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/feature-fort-a.webp" alt="ANI PRIVATE RESORTS hover" loading="lazy" />
              </div>
              <p className="project-grid-title">ANI PRIVATE RESORTS</p>
            </article>

            <article className="project-grid-card">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/DJI_0685.jpg" alt="FOUR SEASONS HOTELS AND RESORTS" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/fourseasons-a.webp" alt="FOUR SEASONS HOTELS AND RESORTS hover" loading="lazy" />
              </div>
              <p className="project-grid-title">FOUR SEASONS HOTELS AND RESORTS</p>
            </article>

            <article className="project-grid-card">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/DJI_20250312004955_0254_D-HDR-3.jpg" alt="SEQUOIA" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/sequoia-a.webp" alt="SEQUOIA hover" loading="lazy" />
              </div>
              <p className="project-grid-title">SEQUOIA</p>
            </article>
          </div>

        </div>
      </section>

      {/* 5. Journal Teaser Section */}
      <section className="projects-journal-section">
        <div className="projects-journal-container">
          <div className="projects-journal-left">
            <p className="micro" style={{ marginBottom: "16px", fontWeight: "700", letterSpacing: "0.16em", textTransform: "uppercase" }}>JOURNAL</p>
            <p className="projects-journal-text">
              As specialists in storytelling, there is more to the tale than the destination. Our experiences, the musings and people found along the way, are all worth writing home about.
            </p>
            <Link href="/#journal" className="btn-outline" style={{ marginTop: "24px" }}>
              VIEW MORE
            </Link>
          </div>

          <div className="projects-journal-right">
            <div className="media-swap" style={{ width: "100%", aspectRatio: "16/9.5" }}>
              <img src="/assets/images/14.jpg" alt="Safari jeep at golden sunset" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer Section */}
      <footer className="footer-simple">
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
            <Link href="/projects">Projects</Link>
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
