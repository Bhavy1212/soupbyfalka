"use client";

import { useState } from "react";
import Link from "next/link";

export default function JournalIndexPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="projects-page-wrapper" style={{ backgroundColor: "#faf8f5", minHeight: "100vh" }}>
      {/* 1. Header */}
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

      {/* Main Journal Content Container */}
      <main style={{
        maxWidth: "1360px",
        margin: "0 auto",
        padding: "clamp(72px, 8vw, 108px) clamp(24px, 4vw, 56px) clamp(80px, 9vw, 130px)",
        boxSizing: "border-box"
      }}>

        {/* 1. TOP SECTION: Editorial Intro on Left + Card 1 on Right */}
        <section style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "clamp(32px, 5vw, 64px)",
          alignItems: "start"
        }}>
          {/* Left Editorial Intro Column */}
          <div style={{
            maxWidth: "320px",
            paddingTop: "clamp(18px, 2.5vw, 36px)"
          }}>
            <h1 style={{
              fontFamily: "var(--font-serif-primary)",
              fontSize: "clamp(18px, 1.6vw, 22px)",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#1a1917",
              marginBottom: "clamp(14px, 1.6vw, 20px)",
              lineHeight: 1.2
            }}>
              JOURNAL
            </h1>
            <p style={{
              fontFamily: "var(--font-sans-primary)",
              fontSize: "clamp(13px, 1.05vw, 14px)",
              lineHeight: 1.55,
              color: "#282624",
              margin: 0
            }}>
              Our work has a habit of taking us places.<br />
              And somewhere between the shoots, the<br />
              stays and the stories we&apos;re there to tell, we<br />
              often find a few of our own.<br />
              The people, places and experiences worth<br />
              remembering, all collected here.
            </p>
          </div>

          {/* Right Column: Card 1 - Chunda Shikar Oudi */}
          <div style={{ width: "100%" }}>
            <Link
              href="/journal/chunda-shikar-oudi"
              style={{ display: "block", textDecoration: "none", color: "inherit" }}
              className="group"
            >
              <div style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1042 / 695",
                overflow: "hidden",
                borderRadius: "2px",
                backgroundColor: "#eae5dc"
              }}>
                <img
                  src="/assets/images/feature-jeep-a.webp"
                  alt="Chunda Shikar Oudi - Where Wilderness Remains The Main Presence"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)"
                  }}
                  className="group-hover:scale-105"
                />
              </div>

              {/* Text Block Centered Below Image */}
              <div style={{
                textAlign: "center",
                paddingTop: "clamp(14px, 1.6vw, 20px)",
                paddingLeft: "12px",
                paddingRight: "12px"
              }}>
                <span style={{
                  display: "block",
                  fontFamily: "var(--font-sans-primary)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#1a1917",
                  marginBottom: "8px"
                }}>
                  FEATURE
                </span>
                <h2 style={{
                  fontFamily: "var(--font-serif-primary)",
                  fontSize: "clamp(18px, 1.7vw, 23px)",
                  fontWeight: 400,
                  color: "#1a1917",
                  lineHeight: 1.3,
                  margin: "0 0 8px 0"
                }}>
                  Chunda Shikar Oudi - Where Wilderness Remains The Main Presence
                </h2>
                <p style={{
                  fontFamily: "var(--font-sans-primary)",
                  fontSize: "clamp(12px, 0.95vw, 13px)",
                  fontWeight: 600,
                  color: "#3a3834",
                  lineHeight: 1.45,
                  maxWidth: "580px",
                  margin: "0 auto"
                }}>
                  &ldquo;Hospitality becomes more meaningful when the environment<br className="hidden md:inline" />{" "}
                  is treated as a presence rather than backdrop.&rdquo;
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* 2. MIDDLE SECTION: Card 2 - Mohangarh Fort (Shifted to Left/Center) */}
        <section style={{
          marginTop: "clamp(72px, 9vw, 130px)",
          display: "flex",
          justifyContent: "flex-start"
        }}>
          <div style={{
            width: "100%",
            maxWidth: "clamp(320px, 56vw, 780px)",
            marginLeft: "clamp(0px, 6vw, 90px)"
          }}>
            <Link
              href="/journal/mohangarh"
              style={{ display: "block", textDecoration: "none", color: "inherit" }}
              className="group"
            >
              <div style={{
                position: "relative",
                width: "100%",
                aspectRatio: "896 / 504",
                overflow: "hidden",
                borderRadius: "2px",
                backgroundColor: "#eae5dc"
              }}>
                <img
                  src="/assets/images/feature-fort-a.webp"
                  alt="Mohangarh Fort: The Last Standing Fort of India"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)"
                  }}
                  className="group-hover:scale-105"
                />
              </div>

              {/* Text Block Centered Below Image */}
              <div style={{
                textAlign: "center",
                paddingTop: "clamp(14px, 1.6vw, 20px)",
                paddingLeft: "12px",
                paddingRight: "12px"
              }}>
                <span style={{
                  display: "block",
                  fontFamily: "var(--font-sans-primary)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#1a1917",
                  marginBottom: "8px"
                }}>
                  FEATURE
                </span>
                <h2 style={{
                  fontFamily: "var(--font-serif-primary)",
                  fontSize: "clamp(18px, 1.7vw, 23px)",
                  fontWeight: 400,
                  color: "#1a1917",
                  lineHeight: 1.3,
                  margin: "0 0 8px 0"
                }}>
                  Mohangarh Fort: The <em>Last</em> Standing <em>Fort</em> of India
                </h2>
                <p style={{
                  fontFamily: "var(--font-sans-primary)",
                  fontSize: "clamp(12px, 0.95vw, 13px)",
                  fontWeight: 600,
                  color: "#3a3834",
                  lineHeight: 1.45,
                  maxWidth: "580px",
                  margin: "0 auto"
                }}>
                  &ldquo;The future of heritage hospitality may depend less on<br className="hidden md:inline" />{" "}
                  restoration and more on retaining emotional truth.&rdquo;
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* 3. LOWER SECTION: Card 3 - Mayfair (Shifted to Right) */}
        <section style={{
          marginTop: "clamp(72px, 9vw, 130px)",
          display: "flex",
          justifyContent: "flex-end"
        }}>
          <div style={{
            width: "100%",
            maxWidth: "clamp(320px, 68vw, 960px)"
          }}>
            <Link
              href="/journal/mayfair"
              style={{ display: "block", textDecoration: "none", color: "inherit" }}
              className="group"
            >
              <div style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1143 / 628",
                overflow: "hidden",
                borderRadius: "2px",
                backgroundColor: "#eae5dc"
              }}>
                <img
                  src="/assets/images/journal-mayfair-clean.jpg"
                  alt="Mayfair & The Invisible Architecture of Atmosphere"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)"
                  }}
                  className="group-hover:scale-105"
                />
              </div>

              {/* Text Block Centered Below Image */}
              <div style={{
                textAlign: "center",
                paddingTop: "clamp(14px, 1.6vw, 20px)",
                paddingLeft: "12px",
                paddingRight: "12px"
              }}>
                <span style={{
                  display: "block",
                  fontFamily: "var(--font-sans-primary)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#1a1917",
                  marginBottom: "8px"
                }}>
                  FEATURE
                </span>
                <h2 style={{
                  fontFamily: "var(--font-serif-primary)",
                  fontSize: "clamp(18px, 1.7vw, 23px)",
                  fontWeight: 400,
                  color: "#1a1917",
                  lineHeight: 1.3,
                  margin: "0 0 8px 0"
                }}>
                  Mayfair &amp; The Invisible Architecture of Atmosphere
                </h2>
                <p style={{
                  fontFamily: "var(--font-sans-primary)",
                  fontSize: "clamp(12px, 0.95vw, 13px)",
                  fontWeight: 600,
                  color: "#3a3834",
                  lineHeight: 1.45,
                  maxWidth: "580px",
                  margin: "0 auto"
                }}>
                  &ldquo;Atmosphere may be the most invisible form of hospitality design.&rdquo;
                </p>
              </div>
            </Link>
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <footer className="footer-simple" id="contact" style={{ borderTop: "1px solid rgba(26, 25, 23, 0.12)" }}>
        <div className="footer-simple__top">
          <p className="footer-simple__label">GET IN TOUCH</p>
          <p className="footer-simple__text">If you want to contribute, learn more or start a project.</p>
          <a className="footer-simple__btn" href="mailto:info@soup.co">
            INFO@SOUP.CO
          </a>
        </div>
        <div className="footer-simple__bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p>© Jagat Studio. All Rights Reserved</p>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
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
                width: "28px",
                height: "28px",
                backgroundColor: "#1a1917",
                color: "#faf8f5",
                border: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "12px",
                lineHeight: 1
              }}
            >
              ▲
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
