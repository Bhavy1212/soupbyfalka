"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Instagram, Youtube, Linkedin, Menu, X } from "lucide-react";

export default function ProjectsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="projects-page-wrapper">
      {/* 1. Header */}
      <header className={`nav ${scrolled ? "scrolled" : ""}`} aria-label="Projects Navigation">
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-2 p-2 hover:opacity-75 transition-opacity"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5 stroke-[1.5]" />
          <span className="hidden sm:inline font-sans text-[11px] tracking-[0.14em] uppercase">Menu</span>
        </button>

        <Link href="/" className="wordmark text-center group flex flex-col items-center justify-center py-1" aria-label="Soup by Falka – Home">
          <img
            src="/assets/images/soup-logo.png"
            alt="Soup by Falka"
            style={{ height: "36px", width: "auto", display: "block", mixBlendMode: "multiply" }}
          />
        </Link>

        <div className="flex items-center gap-4 text-ink">
          <a href="https://www.instagram.com/soupbyfalka/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="w-4 h-4 hover:opacity-70 transition-opacity" />
          </a>
          <a href="https://www.youtube.com/@SoupbyFalka" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <Youtube className="w-4 h-4 hover:opacity-70 transition-opacity" />
          </a>
          <a href="https://www.linkedin.com/company/soupbyfalka" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="w-4 h-4 hover:opacity-70 transition-opacity" />
          </a>
        </div>
      </header>

      {/* Navigation Menu Drawer Overlay */}
      <aside className={`menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="menu__panel">
          <div className="menu__header">
            <button className="menu__close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <span>Close</span>
              <X className="w-4 h-4 stroke-[1.5]" />
            </button>
            <div className="menu__brand">
              <img src="/assets/images/soup-logo.png" alt="Soup by Falka" style={{ height: "28px", width: "auto" }} />
            </div>
          </div>

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
          <img src="/assets/images/about-ripples.webp" alt="Luxury hotel interior with grand chandeliers and archways" />
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
                <img className="media-swap__primary" src="/assets/images/aman-a.webp" alt="AMAN" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/aman-b.webp" alt="AMAN hover" loading="lazy" />
              </div>
              <p className="project-grid-title">AMAN</p>
            </article>

            <article className="project-grid-card">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/puli-a.webp" alt="THE PULI" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/puli-b.webp" alt="THE PULI hover" loading="lazy" />
              </div>
              <p className="project-grid-title">THE PULI</p>
            </article>

            <article className="project-grid-card">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/nobu-a.webp" alt="NOBU RESIDENCES ABU DHABI" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/nobu-b.webp" alt="NOBU RESIDENCES ABU DHABI hover" loading="lazy" />
              </div>
              <p className="project-grid-title">NOBU RESIDENCES ABU DHABI</p>
            </article>
          </div>

          {/* ROW 2: 2 Columns Split (1/3 Medium + 2/3 Wide) */}
          <div className="projects-grid-row projects-grid-split">
            <article className="project-grid-card project-grid-card--medium">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/rosewood-a.webp" alt="ROSEWOOD" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/rosewood-b.webp" alt="ROSEWOOD hover" loading="lazy" />
              </div>
              <p className="project-grid-title">ROSEWOOD</p>
            </article>

            <article className="project-grid-card project-grid-card--wide">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/kokomo-a.webp" alt="KOKOMO" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/kokomo-b.webp" alt="KOKOMO hover" loading="lazy" />
              </div>
              <p className="project-grid-title">KOKOMO</p>
            </article>
          </div>

          {/* ROW 3: 3 Columns Grid */}
          <div className="projects-grid-row projects-grid-3col">
            <article className="project-grid-card">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/hyatt-a.webp" alt="PARK HYATT MALDIVES" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/hyatt-b.webp" alt="PARK HYATT MALDIVES hover" loading="lazy" />
              </div>
              <p className="project-grid-title">PARK HYATT MALDIVES</p>
            </article>

            <article className="project-grid-card">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/luxury-a.webp" alt="LUXURY LODGES OF AUSTRALIA" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/luxury-b.webp" alt="LUXURY LODGES OF AUSTRALIA hover" loading="lazy" />
              </div>
              <p className="project-grid-title">LUXURY LODGES OF AUSTRALIA</p>
            </article>

            <article className="project-grid-card">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/sujan-a.webp" alt="SUJAN" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/sujan-b.webp" alt="SUJAN hover" loading="lazy" />
              </div>
              <p className="project-grid-title">SUJAN</p>
            </article>
          </div>

          {/* ROW 4: 2 Columns Split (1/3 Medium + 2/3 Wide) */}
          <div className="projects-grid-row projects-grid-split">
            <article className="project-grid-card project-grid-card--medium">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/alila-a.webp" alt="ALILA OMAN" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/alila-b.webp" alt="ALILA OMAN hover" loading="lazy" />
              </div>
              <p className="project-grid-title">ALILA OMAN</p>
            </article>

            <article className="project-grid-card project-grid-card--wide">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/janu-a.webp" alt="JANU" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/janu-b.webp" alt="JANU hover" loading="lazy" />
              </div>
              <p className="project-grid-title">JANU</p>
            </article>
          </div>

          {/* ROW 5: 3 Columns Grid */}
          <div className="projects-grid-row projects-grid-3col">
            <article className="project-grid-card">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/ani-a.webp" alt="ANI PRIVATE RESORTS" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/feature-fort-a.webp" alt="ANI PRIVATE RESORTS hover" loading="lazy" />
              </div>
              <p className="project-grid-title">ANI PRIVATE RESORTS</p>
            </article>

            <article className="project-grid-card">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/fourseasons-a.webp" alt="FOUR SEASONS HOTELS AND RESORTS" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/hyatt-b.webp" alt="FOUR SEASONS HOTELS AND RESORTS hover" loading="lazy" />
              </div>
              <p className="project-grid-title">FOUR SEASONS HOTELS AND RESORTS</p>
            </article>

            <article className="project-grid-card">
              <div className="project-grid-media media-swap">
                <img className="media-swap__primary" src="/assets/images/sequoia-a.webp" alt="SEQUOIA" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/journal-road-b.webp" alt="SEQUOIA hover" loading="lazy" />
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
              <img src="/assets/images/feature-jeep-a.webp" alt="Safari jeep at golden sunset" loading="lazy" />
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
