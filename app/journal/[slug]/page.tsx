"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { JOURNAL_ARTICLES } from "@/data/journalData";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function JournalArticlePage({ params }: PageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const article = JOURNAL_ARTICLES[params.slug];

  if (!article) {
    notFound();
  }

  const allSlugs = Object.keys(JOURNAL_ARTICLES);
  const currentIndex = allSlugs.indexOf(params.slug);
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : allSlugs[allSlugs.length - 1];
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : allSlugs[0];

  const prevArticle = JOURNAL_ARTICLES[prevSlug];
  const nextArticle = JOURNAL_ARTICLES[nextSlug];

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

      {/* Main Content */}
      <main className="projects-container" style={{ paddingTop: "clamp(120px, 14vw, 170px)", paddingBottom: "clamp(80px, 10vw, 120px)" }}>
        {/* Back link */}
        <div style={{ marginBottom: "28px" }}>
          <Link
            href="/journal"
            style={{
              fontFamily: "var(--font-sans-primary)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#777777",
              textDecoration: "none"
            }}
          >
            &larr; BACK TO JOURNAL
          </Link>
        </div>

        {/* Editorial Header */}
        <div style={{ maxWidth: "840px", margin: "0 auto clamp(40px, 5vw, 64px)", textAlign: "center" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "var(--font-sans-primary)",
            fontWeight: 600,
            color: "#777777",
            marginBottom: "20px"
          }}>
            <span>{article.tag}</span>
            <span>&bull;</span>
            <span>{article.location}</span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-serif-primary)",
            fontSize: "clamp(32px, 4.5vw, 56px)",
            fontWeight: 400,
            color: "#1a1917",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            marginBottom: "24px"
          }}>
            {article.title}
          </h1>

          <blockquote style={{
            fontFamily: "var(--font-sans-primary)",
            fontSize: "clamp(16px, 1.4vw, 20px)",
            fontWeight: 600,
            lineHeight: 1.6,
            color: "#282624",
            paddingTop: "20px",
            borderTop: "1px solid #d9d4cc",
            margin: "0 auto"
          }}>
            &ldquo;{article.pullQuote}&rdquo;
          </blockquote>
        </div>

        {/* Hero Article Image */}
        <div style={{
          position: "relative",
          aspectRatio: "16/10",
          width: "100%",
          maxWidth: "1120px",
          margin: "0 auto clamp(48px, 6vw, 80px)",
          borderRadius: "2px",
          overflow: "hidden",
          background: "#eae5dc"
        }}>
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            priority
            style={{ objectFit: "cover" }}
            sizes="(max-width: 1240px) 100vw, 1120px"
          />
        </div>

        {/* Narrative Section 1 */}
        <div style={{
          maxWidth: "720px",
          margin: "0 auto clamp(40px, 5vw, 64px)",
          fontFamily: "var(--font-sans-primary)",
          fontSize: "clamp(15px, 1.15vw, 17px)",
          fontWeight: 400,
          lineHeight: 1.7,
          color: "#3b3732",
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}>
          {article.paragraphs.slice(0, 2).map((p, i) => (
            <p key={i} style={{ margin: 0 }}>{p}</p>
          ))}
        </div>

        {/* Mid-Article 2-Image Grid */}
        {article.images.length >= 2 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(20px, 3vw, 40px)",
            maxWidth: "1120px",
            margin: "0 auto clamp(40px, 5vw, 64px)"
          }}>
            {article.images.slice(0, 2).map((img, i) => (
              <div key={i} style={{ position: "relative", aspectRatio: "4/5", width: "100%", borderRadius: "2px", overflow: "hidden", background: "#eae5dc" }}>
                <Image
                  src={img}
                  alt={`${article.title} gallery photograph ${i + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>
            ))}
          </div>
        )}

        {/* Narrative Section 2 */}
        {article.paragraphs.length > 2 && (
          <div style={{
            maxWidth: "720px",
            margin: "0 auto clamp(40px, 5vw, 64px)",
            fontFamily: "var(--font-sans-primary)",
            fontSize: "clamp(15px, 1.15vw, 17px)",
            fontWeight: 400,
            lineHeight: 1.7,
            color: "#3b3732",
            display: "flex",
            flexDirection: "column",
            gap: "24px"
          }}>
            {article.paragraphs.slice(2).map((p, i) => (
              <p key={i} style={{ margin: 0 }}>{p}</p>
            ))}
          </div>
        )}

        {/* Closing Full-Bleed Image */}
        {article.images.length >= 3 && (
          <div style={{
            position: "relative",
            aspectRatio: "16/9",
            width: "100%",
            maxWidth: "1120px",
            margin: "0 auto clamp(48px, 6vw, 80px)",
            borderRadius: "2px",
            overflow: "hidden",
            background: "#eae5dc"
          }}>
            <Image
              src={article.images[article.images.length - 1]}
              alt={`${article.title} architectural view`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 1240px) 100vw, 1120px"
            />
          </div>
        )}

        {/* Article Pagination */}
        <div style={{
          borderTop: "1px solid #d9d4cc",
          paddingTop: "clamp(32px, 4vw, 56px)",
          marginTop: "48px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "24px"
        }}>
          <Link href={`/journal/${prevSlug}`} style={{ textDecoration: "none", maxWidth: "340px" }}>
            <span style={{
              display: "block",
              fontFamily: "var(--font-sans-primary)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#777777",
              marginBottom: "8px"
            }}>
              &larr; PREVIOUS ESSAY
            </span>
            <span style={{
              display: "block",
              fontFamily: "var(--font-serif-primary)",
              fontSize: "clamp(16px, 1.4vw, 20px)",
              color: "#1a1917",
              fontWeight: 400
            }}>
              {prevArticle.title}
            </span>
          </Link>

          <Link href={`/journal/${nextSlug}`} style={{ textDecoration: "none", maxWidth: "340px", textAlign: "right" }}>
            <span style={{
              display: "block",
              fontFamily: "var(--font-sans-primary)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#777777",
              marginBottom: "8px"
            }}>
              NEXT ESSAY &rarr;
            </span>
            <span style={{
              display: "block",
              fontFamily: "var(--font-serif-primary)",
              fontSize: "clamp(16px, 1.4vw, 20px)",
              color: "#1a1917",
              fontWeight: 400
            }}>
              {nextArticle.title}
            </span>
          </Link>
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
