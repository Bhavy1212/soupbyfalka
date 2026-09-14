"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="projects-page-wrapper">
      {/* 1. Sticky Navigation Header */}
      <header className="site-header is-past-hero" data-header>
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
              <Link href="/journal" className="menu__nav-link" onClick={() => setMenuOpen(false)}>JOURNAL</Link>
              <Link href="/about" className="menu__nav-link" onClick={() => setMenuOpen(false)}>ABOUT</Link>
              <Link href="/contact" className="menu__nav-link" onClick={() => setMenuOpen(false)}>CONTACT</Link>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Contact Content */}
      <main className="projects-container" style={{ paddingTop: "clamp(120px, 14vw, 180px)", paddingBottom: "clamp(80px, 10vw, 120px)" }}>
        <div style={{ maxWidth: "920px", marginBottom: "clamp(48px, 6vw, 72px)" }}>
          <span style={{
            display: "block",
            fontFamily: "var(--font-sans-primary)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#777777",
            marginBottom: "16px"
          }}>
            COMMISSIONS &amp; INQUIRIES
          </span>
          <h1 style={{
            fontFamily: "var(--font-serif-primary)",
            fontSize: "clamp(36px, 5.2vw, 68px)",
            fontWeight: 400,
            color: "#1a1917",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            marginBottom: "24px"
          }}>
            Let&apos;s talk about your space.
          </h1>
          <p style={{
            fontFamily: "var(--font-serif-primary)",
            fontSize: "clamp(18px, 1.8vw, 24px)",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "#4a4641"
          }}>
            Whether for upcoming architecture, hotel launches, editorial stories or full visual direction, we collaborate worldwide.
          </p>
        </div>

        <div style={{
          borderTop: "1px solid #d9d4cc",
          paddingTop: "clamp(40px, 5vw, 64px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(40px, 6vw, 80px)"
        }}>
          <div>
            <span style={{
              display: "block",
              fontFamily: "var(--font-sans-primary)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#888888",
              marginBottom: "14px"
            }}>
              DIRECT EMAIL
            </span>
            <a
              href="mailto:falka@soupbyfalka.com"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-serif-primary)",
                fontSize: "clamp(24px, 2.8vw, 38px)",
                fontWeight: 400,
                color: "#1a1917",
                marginBottom: "16px",
                textDecoration: "none"
              }}
            >
              falka@soupbyfalka.com
            </a>
            <p style={{
              fontFamily: "var(--font-sans-primary)",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: 1.65,
              color: "#55524e",
              maxWidth: "420px"
            }}>
              We review every commission inquiry personally. Please share property details, timing, and project scope.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "36px"
          }}>
            <div>
              <span style={{
                display: "block",
                fontFamily: "var(--font-sans-primary)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#888888",
                marginBottom: "14px"
              }}>
                STUDIO LOCATIONS
              </span>
              <p style={{
                fontFamily: "var(--font-serif-primary)",
                fontSize: "19px",
                fontWeight: 400,
                color: "#1a1917",
                marginBottom: "8px"
              }}>
                Udaipur &amp; New Delhi
              </p>
              <p style={{
                fontFamily: "var(--font-sans-primary)",
                fontSize: "13px",
                fontWeight: 400,
                color: "#77726b"
              }}>
                Available globally for commissioned hospitality assignments.
              </p>
            </div>

            <div>
              <span style={{
                display: "block",
                fontFamily: "var(--font-sans-primary)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#888888",
                marginBottom: "14px"
              }}>
                FOLLOW ALONG
              </span>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontFamily: "var(--font-sans-primary)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase"
              }}>
                <a href="https://www.instagram.com/soupbyfalka/" target="_blank" rel="noopener noreferrer" style={{ color: "#222", textDecoration: "none" }}>
                  Instagram &rarr;
                </a>
                <a href="https://www.youtube.com/@SoupbyFalka" target="_blank" rel="noopener noreferrer" style={{ color: "#222", textDecoration: "none" }}>
                  YouTube &rarr;
                </a>
                <a href="https://www.linkedin.com/company/soupbyfalka" target="_blank" rel="noopener noreferrer" style={{ color: "#222", textDecoration: "none" }}>
                  LinkedIn &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
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
        </div>
      </footer>
    </div>
  );
}
