"use client";

import { useEffect, useState, useRef } from "react";
import { Instagram, Linkedin, Facebook, Youtube, MessageCircle } from "lucide-react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const previewImgRef = useRef<HTMLImageElement>(null);

  const [loaderValue, setLoaderValue] = useState(0);
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [cursorText, setCursorText] = useState("View");
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorLight, setCursorLight] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [projectCategory, setProjectCategory] = useState<"stills" | "motion" | null>(null);

  // Handle Loader Animation
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setLoaderFinished(true);
      return;
    }
    const started = performance.now();
    const duration = 1450;
    let rafId: number;

    const tick = (now: number) => {
      const progress = Math.min(Math.max((now - started) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * 100);
      setLoaderValue(value);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setLoaderFinished(true), 180);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Handle Cursor Tracking
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number;

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setCursorVisible(true);
    };

    const handlePointerLeave = () => {
      setCursorVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);

    const move = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      document.documentElement.style.setProperty("--cursor-x", `${currentX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${currentY}px`);
      rafId = requestAnimationFrame(move);
    };
    move();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Handle Body Scroll Locking for menuOpen
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("is-locked");
    } else {
      document.body.classList.remove("is-locked");
    }
    return () => {
      document.body.classList.remove("is-locked");
    };
  }, [menuOpen]);

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
        { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
      );
      revealTargets.forEach((el) => revealObserver.observe(el));
    }

    return () => {
      revealTargets.forEach((el) => el.classList.remove("is-visible"));
    };
  }, []);

  // Handle Parallax & Scroll UI Progress Bar & Header Hide/Show
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastScroll = window.scrollY;
    let rafId: number;

    const headerEl = document.querySelector("[data-header]");
    const progressEl = document.querySelector("[data-scroll-progress]") as HTMLElement;
    const heroMediaEl = document.querySelector(".hero__media") as HTMLElement | null;
    const footerEl = document.querySelector(".footer");
    const parallaxItems = Array.from(
      document.querySelectorAll("[data-parallax]")
    ) as HTMLElement[];

    type CachedItem = { el: HTMLElement; speed: number; top: number; h: number };
    let cached: CachedItem[] = [];
    let heroHeight = heroMediaEl ? heroMediaEl.offsetHeight : window.innerHeight;
    let vh = window.innerHeight;

    const buildCache = () => {
      vh = window.innerHeight;
      heroHeight = heroMediaEl ? heroMediaEl.offsetHeight : vh;
      cached = parallaxItems.map((el) => ({
        el,
        speed: Number(el.dataset.parallax || 0.04),
        top: el.getBoundingClientRect().top + window.scrollY,
        h: el.offsetHeight,
      }));
    };

    const updateScrollUI = () => {
      const y = window.scrollY;
      const max = Math.max(document.documentElement.scrollHeight - vh, 1);
      if (progressEl) {
        progressEl.style.transform = `scaleX(${Math.min(Math.max(y / max, 0), 1)})`;
      }

      if (headerEl) {
        headerEl.classList.remove("is-hidden");

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
      lastScroll = y;

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

  // Handle Touch Swaps for mobile
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (finePointer || reduceMotion) return;

    const visible = new Set<Element>();
    const swaps = document.querySelectorAll(".media-swap");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else {
            visible.delete(entry.target);
            entry.target.classList.remove("is-alt");
          }
        });
      },
      { threshold: 0.45 }
    );

    swaps.forEach((swap) => observer.observe(swap));

    let alternate = false;
    const intervalId = setInterval(() => {
      alternate = !alternate;
      visible.forEach((swap) => swap.classList.toggle("is-alt", alternate));
    }, 2800);

    return () => {
      swaps.forEach((swap) => observer.unobserve(swap));
      clearInterval(intervalId);
    };
  }, []);

  // Custom Cursor Hover Logic
  const handleMouseEnter = (cursorLabel: string, darkContext: boolean) => {
    setCursorActive(true);
    setCursorText(cursorLabel);
    setCursorLight(darkContext);
  };

  const handleMouseLeave = () => {
    setCursorActive(false);
    setCursorText("View");
    setCursorLight(false);
  };

  // Menu Preview Hover
  const handleMenuLinkHover = (previewSrc: string) => {
    if (!previewImgRef.current || previewImgRef.current.src.endsWith(previewSrc)) return;
    previewImgRef.current.classList.add("is-changing");
    setTimeout(() => {
      if (previewImgRef.current) {
        previewImgRef.current.src = previewSrc;
        previewImgRef.current.onload = () => {
          previewImgRef.current?.classList.remove("is-changing");
        };
      }
    }, 160);
  };

  // Smooth hash scrolling
  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href || href === "#" || !href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    setMenuOpen(false);
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      {/* 1. Loader Screen */}
      <div className={`loader ${loaderFinished ? "is-finished" : ""}`} aria-hidden="true">
        <div className="loader__top"></div>
        <div className="loader__mark">
          <img
            src="/assets/images/soup-logo.png"
            alt="Soup by Falka"
            style={{ height: "60px", width: "auto", display: "block", filter: "brightness(0) invert(1)" }}
          />
        </div>
        <div className="loader__bottom">
          <div className="loader__track"><span style={{ transform: `scaleX(${loaderValue / 100})` }}></span></div>
        </div>
      </div>

      {/* 2. Custom Cursor */}
      <div
        className={`cursor ${cursorVisible ? "is-visible" : ""} ${cursorActive ? "is-active" : ""} ${cursorLight ? "is-light" : ""}`}
        aria-hidden="true"
      >
        <span>{cursorText}</span>
      </div>

      {/* 3. Scroll Progress Indicator */}
      <div className="scroll-progress" aria-hidden="true">
        <span data-scroll-progress></span>
      </div>

      {/* 4. Header Bar */}
      <header className="site-header" data-header>
        <button
          className="menu-toggle magnetic"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          onMouseEnter={() => handleMouseEnter(menuOpen ? "Close" : "Menu", false)}
          onMouseLeave={handleMouseLeave}
        >
          <span className={`menu-toggle__icon ${menuOpen ? "is-active" : ""}`}>
            <i></i><i></i><i></i>
          </span>
        </button>

        <a
          className="wordmark"
          href="#top"
          aria-label="Soup home"
          onClick={handleHashLink}
        >
          <img
            src="/assets/images/soup-logo.png"
            alt="Soup by Falka"
          />
        </a>

        <nav className="header-social" aria-label="Social links">
          <a
            href="https://www.instagram.com/soupbyfalka/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => handleMouseEnter("Instagram", false)}
            onMouseLeave={handleMouseLeave}
          >
            Instagram
          </a>
          <a
            href="https://www.youtube.com/@SoupbyFalka"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => handleMouseEnter("YouTube", false)}
            onMouseLeave={handleMouseLeave}
          >
            YouTube
          </a>
          <a
            href="https://www.linkedin.com/company/soupbyfalka"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => handleMouseEnter("LinkedIn", false)}
            onMouseLeave={handleMouseLeave}
          >
            LinkedIn
          </a>
        </nav>
      </header>

      {/* 5. Navigation Menu Overlay Drawer */}
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

            <a className="wordmark" href="#top" onClick={(e) => { handleHashLink(e); setMenuOpen(false); }}>
              <img src="/assets/images/soup-logo.png" alt="Soup by Falka" style={{ height: "26px", width: "auto", display: "block" }} />
            </a>

            <div className="header-social">
              <a href="https://www.instagram.com/soupbyfalka/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.youtube.com/@SoupbyFalka" target="_blank" rel="noopener noreferrer">YouTube</a>
              <a href="https://www.linkedin.com/company/soupbyfalka" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>

          {/* Menu Main Content Body */}
          <div className="menu__body">
            <nav className="menu__nav-links" aria-label="Primary navigation">
              <div className="menu__item-group">
                <a href="/stills" className="menu__nav-link" onClick={() => setMenuOpen(false)}>PROJECTS</a>
                <div className="menu__sub-nav">
                  <a
                    href="/stills"
                    className="menu__sub-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    STILLS
                  </a>
                  <a
                    href="/motion"
                    className="menu__sub-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    MOTION
                  </a>
                </div>
              </div>
              <a href="#journal" className="menu__nav-link" onClick={handleHashLink}>JOURNAL</a>
              <a href="#about" className="menu__nav-link" onClick={handleHashLink}>ABOUT</a>
              <a href="#contact" className="menu__nav-link" onClick={handleHashLink}>CONTACT</a>
            </nav>
          </div>
        </div>
      </aside>

      {/* 6. Main Landing Page */}
      <main id="main">
        {/* Hero Section */}
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__media">
            <img
              className="hero__fallback"
              src="assets/images/hero-poster.jpg"
              alt="Aerial view across a warm mountain landscape"
              fetchPriority="high"
              decoding="async"
            />
            <div className="hero__shade"></div>
            <div className="hero__meta">
              <span>Rajasthan, India</span>
            </div>
          </div>

          <div className="hero__copy">
            <h1 id="hero-title" className="reveal-text">
              From the <em>grandeur</em> of your property, it&apos;s surrounding landscape, to the inviting poolside and the plush armchair by the window, every element <em>speaks</em> and we make sure it&apos;s <em>heard</em>.
            </h1>
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects section" id="projects" aria-labelledby="projects-heading">
          <div className="section-intro section-intro--sticky">
            <p className="micro" id="projects-heading">PROJECTS</p>

            {/* Enclosed Category Toggle Box */}
            <div className="projects-filter-box">
              <button
                type="button"
                className={`projects-filter-btn ${projectCategory === "stills" ? "is-active" : ""}`}
                onClick={() => setProjectCategory(projectCategory === "stills" ? null : "stills")}
              >
                STILLS
              </button>
              <span className="projects-filter-divider" aria-hidden="true" />
              <button
                type="button"
                className={`projects-filter-btn ${projectCategory === "motion" ? "is-active" : ""}`}
                onClick={() => setProjectCategory(projectCategory === "motion" ? null : "motion")}
              >
                MOTION
              </button>
            </div>

            <p className="section-intro__body">
              SOUP provides a complete, end-to-end visual content solution. We have the resources, skills and industry-specific experience necessary to produce, create and deliver projects of any scale, in any part of the world.
            </p>
            {projectCategory && (
              <a
                className="btn-outline"
                href={projectCategory === "motion" ? "/motion" : "/stills"}
                onMouseEnter={() => handleMouseEnter("Explore", false)}
                onMouseLeave={handleMouseLeave}
                style={{
                  animation: 'fadeIn 0.35s ease-out forwards',
                }}
              >
                VIEW ALL PROJECTS
              </a>
            )}
          </div>

          <div className="project-feed">
            {/* Project 1 */}
            <article className="project-card project-card--hero reveal-item">
              <div
                className="project-card__button"
                onMouseEnter={() => handleMouseEnter("View project", false)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="media-swap image-reveal">
                  <img className="media-swap__primary" src={projectCategory === "motion" ? "/assets/images/motion/aman-motion.png" : "assets/images/aman-a.webp"} alt="Aman hillside resort" loading="lazy" />
                  <img className="media-swap__secondary" src="assets/images/aman-b.webp" alt="Aman retreat glowing in evening light" loading="lazy" />
                </span>
                <span className="project-card__caption"><strong>AMAN</strong></span>
              </div>
            </article>

            {/* Project 2 & 3 Split */}
            <div className="project-row project-row--split">
              <article className="project-card project-card--portrait reveal-item">
                <div
                  className="project-card__button"
                  data-parallax="0.04"
                  onMouseEnter={() => handleMouseEnter("View project", false)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="media-swap image-reveal">
                    <img className="media-swap__primary" src={projectCategory === "motion" ? "/assets/images/motion/nobu-motion.png" : "assets/images/nobu-a.webp"} alt="Terracotta arched interior" loading="lazy" />
                    <img className="media-swap__secondary" src="assets/images/nobu-b.webp" alt="Warm modern reception interior" loading="lazy" />
                  </span>
                  <span className="project-card__caption"><strong>NOBU RESIDENCES ABU DHABI</strong></span>
                </div>
              </article>

              <article className="project-card project-card--landscape project-card--lower reveal-item">
                <div
                  className="project-card__button"
                  data-parallax="0.16"
                  onMouseEnter={() => handleMouseEnter("View project", false)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="media-swap image-reveal">
                    <img className="media-swap__primary" src={projectCategory === "motion" ? "/assets/images/motion/puli-motion.png" : "assets/images/hyatt-a.webp"} alt="Luxury resort courtyard at dusk" loading="lazy" />
                    <img className="media-swap__secondary" src="assets/images/hyatt-b.webp" alt="Historic stone resort beneath blue clouds" loading="lazy" />
                  </span>
                  <span className="project-card__caption"><strong>PARK HYATT MALDIVES</strong></span>
                </div>
              </article>
            </div>

            {/* Project 4 */}
            <article className="project-card project-card--hero project-card--right reveal-item">
              <div
                className="project-card__button"
                data-parallax="0.09"
                onMouseEnter={() => handleMouseEnter("View project", false)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="media-swap image-reveal">
                  <img className="media-swap__primary" src={projectCategory === "motion" ? "/assets/images/motion/kokomo-motion.png" : "assets/images/janu-a.webp"} alt="A forest lodge at dusk" loading="lazy" />
                  <img className="media-swap__secondary" src="assets/images/janu-b.webp" alt="Mountain retreat at golden hour" loading="lazy" />
                </span>
                <span className="project-card__caption"><strong>JANU</strong></span>
              </div>
            </article>

            {/* Project 5 */}
            <article className="project-card project-card--hero reveal-item">
              <div
                className="project-card__button"
                data-parallax="0.09"
                onMouseEnter={() => handleMouseEnter("View project", false)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="media-swap image-reveal">
                  <img className="media-swap__primary" src={projectCategory === "motion" ? "/assets/images/motion/rosewood-motion.png" : "assets/images/luxury-a.webp"} alt="Luxury bedroom overlooking mountains" loading="lazy" />
                  <img className="media-swap__secondary" src="assets/images/luxury-b.webp" alt="Traditional luxury suite" loading="lazy" />
                </span>
                <span className="project-card__caption"><strong>LUXURY LODGES OF AUSTRALIA</strong></span>
              </div>
            </article>

            {/* Project 6 & 7 Split (Reverse) */}
            <div className="project-row project-row--split">
              <article className="project-card project-card--portrait reveal-item">
                <div
                  className="project-card__button"
                  data-parallax="0.04"
                  onMouseEnter={() => handleMouseEnter("View project", false)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="media-swap image-reveal">
                    <img className="media-swap__primary" src={projectCategory === "motion" ? "/assets/images/motion/fourseasons-motion.png" : "assets/images/sujan-a.webp"} alt="Candlelit path beneath trees" loading="lazy" />
                    <img className="media-swap__secondary" src="assets/images/sujan-b.webp" alt="A local storyteller at sunset" loading="lazy" />
                  </span>
                  <span className="project-card__caption"><strong>SUJAN</strong></span>
                </div>
              </article>

              <article className="project-card project-card--landscape project-card--lower reveal-item">
                <div
                  className="project-card__button"
                  data-parallax="0.16"
                  onMouseEnter={() => handleMouseEnter("View project", false)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="media-swap image-reveal">
                    <img className="media-swap__primary" src={projectCategory === "motion" ? "/assets/images/motion/janu-motion.png" : "assets/images/rosewood-a.webp"} alt="Grand hotel with a domed pavilion" loading="lazy" />
                    <img className="media-swap__secondary" src="assets/images/rosewood-b.webp" alt="Garden pool at twilight" loading="lazy" />
                  </span>
                  <span className="project-card__caption"><strong>ROSEWOOD</strong></span>
                </div>
              </article>
            </div>

            {/* Project 8 */}
            <article className="project-card project-card--hero reveal-item">
              <div
                className="project-card__button"
                data-parallax="0.09"
                onMouseEnter={() => handleMouseEnter("View project", false)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="media-swap image-reveal">
                  <img className="media-swap__primary" src={projectCategory === "motion" ? "/assets/images/motion/sujan-motion.png" : "assets/images/kokomo-a.webp"} alt="Tropical gardens above the ocean" loading="lazy" />
                  <img className="media-swap__secondary" src="assets/images/kokomo-b.webp" alt="Resort grounds across a green valley" loading="lazy" />
                </span>
                <span className="project-card__caption"><strong>KOKOMO</strong></span>
              </div>
            </article>
          </div>
        </section>

        {/* Film Section Intro Text */}
        <div style={{ textAlign: 'center', padding: '36px var(--gutter) 16px', background: 'var(--paper)' }}>
          <p style={{
            maxWidth: '1060px',
            margin: '0 auto',
            fontFamily: "'The Seasons', 'Seasons', 'Cormorant Garamond', var(--font-bodoni), Georgia, 'Times New Roman', serif",
            fontSize: 'clamp(15px, 1.55vw, 21px)',
            lineHeight: '1.5',
            letterSpacing: '-0.01em',
            fontWeight: '400',
            fontStyle: 'italic',
            color: '#2b2927'
          }}>
            <em>Soup crafts evocative films that bring stories to life, seamlessly connecting your brand, space, and vision through cinematic storytelling. Explore some features below.</em>
          </p>
        </div>

        {/* 12-Image Thumbnail Grid Bar */}
        <section className="films section" id="films" aria-label="Visual Stills Grid" style={{ padding: '20px var(--gutter)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px' }}>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="assets/images/nobu-b.webp" alt="Stills grid 1" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="assets/images/about-ripples.webp" alt="Stills grid 2" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="assets/images/hyatt-b.webp" alt="Stills grid 3" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="assets/images/founder-jackson.webp" alt="Stills grid 4" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="assets/images/janu-b.webp" alt="Stills grid 5" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="assets/images/rosewood-b.webp" alt="Stills grid 6" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="assets/images/sujan-b.webp" alt="Stills grid 7" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="assets/images/luxury-b.webp" alt="Stills grid 8" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="assets/images/founder-lauren.webp" alt="Stills grid 9" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="assets/images/feature-fort-b.webp" alt="Stills grid 10" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="assets/images/kokomo-a.webp" alt="Stills grid 11" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="assets/images/feature-rabari-b.webp" alt="Stills grid 12" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Journal Section */}
        <section className="journal section" id="journal" aria-labelledby="journal-heading">
          <div className="section-intro journal__intro">
            <div className="journal__lead-image media-swap image-reveal reveal-item">
              <img className="media-swap__primary" src="assets/images/journal-road-a.webp" alt="Winding forest road" loading="lazy" />
              <img className="media-swap__secondary" src="assets/images/journal-road-b.webp" alt="Safari vehicle at sunset" loading="lazy" />
            </div>
            <p className="micro" id="journal-heading">JOURNAL</p>
            <p className="section-intro__body">
              As specialists in storytelling, there is more to the tale than the destination. Our experiences, the musings and people found along the way, are all worth writing home about.
            </p>
            <a
              className="btn-outline magnetic"
              href="#contact"
              onClick={handleHashLink}
              onMouseEnter={() => handleMouseEnter("Read", false)}
              onMouseLeave={handleMouseLeave}
            >
              VIEW MORE
            </a>
          </div>

          <div className="story-feed">
            <article className="story story--wide reveal-item">
              <a
                href="#contact"
                className="story__media media-swap image-reveal"
                onClick={handleHashLink}
                onMouseEnter={() => handleMouseEnter("Read story", false)}
                onMouseLeave={handleMouseLeave}
              >
                <img className="media-swap__primary" src="assets/images/feature-jeep-a.webp" alt="Safari vehicle at sunset" loading="lazy" />
                <img className="media-swap__secondary" src="assets/images/kokomo-b.webp" alt="A resort landscape surrounded by tropical gardens" loading="lazy" />
              </a>
              <div className="story__copy">
                <p className="micro">FEATURE</p>
                <h2 style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 'normal' }}>Rugged Beauty, Quiet Luxury</h2>
                <p>Few places linger long after you leave. Enter Rosewood Cape Kidnappers. From our arrival to the final frame, this shoot was a celebration of contrasts: rugged cliffs, working farmland and curated elegance. What unfolded was a story of place, purpose, and presence.</p>
              </div>
            </article>

            <article className="story story--wide story--reverse reveal-item">
              <a
                href="#contact"
                className="story__media media-swap image-reveal"
                onClick={handleHashLink}
                onMouseEnter={() => handleMouseEnter("Read story", false)}
                onMouseLeave={handleMouseLeave}
              >
                <img className="media-swap__primary" src="assets/images/feature-fort-a.webp" alt="Historic desert fort beneath dramatic clouds" loading="lazy" />
                <img className="media-swap__secondary" src="assets/images/feature-fort-b.webp" alt="Fort-like luxury property at twilight" loading="lazy" />
              </a>
              <div className="story__copy">
                <p className="micro">Feature / Encounter</p>
                <h2>Into the Wild with an Artist</h2>
                <p>One unhurried day shaped by conversation, craft and the changing light around a remote home.</p>
              </div>
            </article>

            <div className="story-pair">
              <article className="story story--portrait reveal-item">
                <a
                  href="#contact"
                  className="story__media media-swap image-reveal"
                  onClick={handleHashLink}
                  onMouseEnter={() => handleMouseEnter("Read story", false)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img className="media-swap__primary" src="assets/images/feature-rabari-a.webp" alt="Local man preparing tea at sunset" loading="lazy" />
                  <img className="media-swap__secondary" src="assets/images/feature-rabari-b.webp" alt="Candlelit path through the trees" loading="lazy" />
                </a>
                <div className="story__copy">
                  <p className="micro">FEATURE</p>
                  <h2>Where Rabari &amp; Leopards Coexist</h2>
                  <p>Placing Jawai on the truly remarkable map, for centuries the local Rabari Tribal Communities have lived in complete harmony with the leopards of the area. We explore this connection that's as spiritual as it is familial.</p>
                </div>
              </article>

              <article className="story story--portrait reveal-item">
                <a
                  href="#contact"
                  className="story__media media-swap image-reveal"
                  onClick={handleHashLink}
                  onMouseEnter={() => handleMouseEnter("Read story", false)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img className="media-swap__primary" src="assets/images/feature-room-a.webp" alt="Traditional timber bedroom" loading="lazy" />
                  <img className="media-swap__secondary" src="assets/images/feature-room-b.webp" alt="Modern luxury suite overlooking the landscape" loading="lazy" />
                </a>
                <div className="story__copy">
                  <p className="micro">FEATURE</p>
                  <h2>A Journey of Discovery</h2>
                  <p>Uncovering remote landscapes and hidden architectural gems, where heritage seamlessly blends with quiet luxury and thoughtful craftsmanship.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about section" id="about" aria-labelledby="about-heading">
          <div className="about__copy section-intro">
            <p className="micro" id="about-heading">About</p>
            <p className="section-intro__body">
              Storytelling in a visually driven world needs more than beautiful frames. Every image and every movement must serve a clear narrative and create a reason to feel connected.
            </p>
            <a
              className="line-link magnetic"
              href="#contact"
              onClick={handleHashLink}
              onMouseEnter={() => handleMouseEnter("Discover", false)}
              onMouseLeave={handleMouseLeave}
            >
              <span>About Soup</span><i>↘</i>
            </a>
          </div>
          <div
            className="about__media image-reveal reveal-item"
            onMouseEnter={() => handleMouseEnter("Discover", false)}
            onMouseLeave={handleMouseLeave}
          >
            <img src="assets/images/about-ripples.webp" alt="Rain ripples across dark water" loading="lazy" data-parallax="0.08" />
            <span className="about__word">Story / Atmosphere / Detail</span>
          </div>
        </section>

        {/* Page Breaker Divider Line */}
        <div className="page-breaker"></div>

        {/* Section: A Little Bit of Us & Featured In */}
        <section className="about-us-section section" aria-label="A little bit of us">
          <div className="about-us__container">
            <h2 className="about-us__title font-seasons">A little bit of us</h2>
            <p className="about-us__subtitle">
              From the grandeur of your property, it&apos;s surrounding landscape, to the inviting poolside and the plush armchair by the window, every element speaks and we make sure it&apos;s heard.
            </p>

            <div className="about-us__socials">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-circle-btn">
                <Facebook className="w-5 h-5 fill-current stroke-none" />
              </a>
              <a href="https://www.instagram.com/soupbyfalka/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-circle-btn">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/919462703961?text=Hii" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-circle-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.494 2.031 7.8L0 32l8.456-2.004A15.937 15.937 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.267 13.267 0 01-6.771-1.854l-.485-.29-5.02 1.317 1.338-4.887-.317-.502A13.225 13.225 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.815c-.398-.199-2.354-1.162-2.719-1.294-.365-.133-.631-.199-.896.199-.266.398-1.029 1.294-1.261 1.56-.232.265-.464.298-.862.099-.398-.199-1.681-.62-3.201-1.977-1.183-1.056-1.981-2.36-2.213-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.464.597-.696.199-.232.265-.398.398-.664.133-.265.066-.497-.033-.696-.099-.199-.896-2.16-1.228-2.957-.323-.776-.651-.671-.896-.683l-.763-.013c-.265 0-.696.1-1.062.497-.365.398-1.394 1.361-1.394 3.32s1.427 3.85 1.626 4.116c.199.265 2.808 4.286 6.803 6.012.951.41 1.693.655 2.271.838.954.303 1.823.26 2.51.158.766-.114 2.354-.963 2.686-1.893.332-.93.332-1.727.232-1.893-.1-.165-.365-.265-.763-.464z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@SoupbyFalka" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-circle-btn">
                <Youtube className="w-5 h-5 fill-current stroke-none" />
              </a>
            </div>

            <div className="featured-in">
              <h3 className="featured-in__title">Featured In</h3>
              <div className="featured-in__divider"></div>

              <div className="logo-marquee" aria-label="Featured publications marquee">
                <div className="logo-marquee__track">
                  {/* Set 1 */}
                  <img src="/assets/images/press/Best-hotel-photography-in-India.svg" alt="Best Hotel Photography in India" className="marquee-logo-img" />
                  <img src="/assets/images/press/Hotel-Interior-Photographer.svg" alt="Hotel Interior Photographer" className="marquee-logo-img" />
                  <img src="/assets/images/press/hotel-interior-videographer.svg" alt="Hotel Interior Videographer" className="marquee-logo-img" />
                  <img src="/assets/images/press/Professional-Hotel-Photography.svg" alt="Professional Hotel Photography" className="marquee-logo-img" />
                  <img src="/assets/images/press/Resorts-Hotel-photography-Agency-in-India.svg" alt="Resorts Hotel Photography Agency" className="marquee-logo-img" />

                  {/* Set 2 (Duplicate for Seamless Loop) */}
                  <img src="/assets/images/press/Best-hotel-photography-in-India.svg" alt="" aria-hidden="true" className="marquee-logo-img" />
                  <img src="/assets/images/press/Hotel-Interior-Photographer.svg" alt="" aria-hidden="true" className="marquee-logo-img" />
                  <img src="/assets/images/press/hotel-interior-videographer.svg" alt="" aria-hidden="true" className="marquee-logo-img" />
                  <img src="/assets/images/press/Professional-Hotel-Photography.svg" alt="" aria-hidden="true" className="marquee-logo-img" />
                  <img src="/assets/images/press/Resorts-Hotel-photography-Agency-in-India.svg" alt="" aria-hidden="true" className="marquee-logo-img" />

                  {/* Set 3 (Triple for Smooth Wide Infinite Loop) */}
                  <img src="/assets/images/press/Best-hotel-photography-in-India.svg" alt="" aria-hidden="true" className="marquee-logo-img" />
                  <img src="/assets/images/press/Hotel-Interior-Photographer.svg" alt="" aria-hidden="true" className="marquee-logo-img" />
                  <img src="/assets/images/press/hotel-interior-videographer.svg" alt="" aria-hidden="true" className="marquee-logo-img" />
                  <img src="/assets/images/press/Professional-Hotel-Photography.svg" alt="" aria-hidden="true" className="marquee-logo-img" />
                  <img src="/assets/images/press/Resorts-Hotel-photography-Agency-in-India.svg" alt="" aria-hidden="true" className="marquee-logo-img" />
                </div>
              </div>
            </div>

            <div className="essence-quote">
              <div className="featured-in__divider"></div>
              <p className="essence-quote__text">
                &ldquo;The true essence of a meal is revealed in the very first sip of its soup.&rdquo;
              </p>
              <div className="featured-in__divider"></div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. Footer Section */}
      <footer className="footer-simple" id="contact">
        <div className="footer-simple__top">
          <p className="footer-simple__label">GET IN TOUCH</p>
          <p className="footer-simple__text">If you want to contribute, learn more or start a project.</p>
          <a
            className="footer-simple__btn"
            href="mailto:info@soupbyfalka.com"
            onMouseEnter={() => handleMouseEnter("Email", true)}
            onMouseLeave={handleMouseLeave}
          >
            INFO@SOUPBYFALKA.COM
          </a>
        </div>
        <div className="footer-simple__bottom">
          <p>© Soup Studio. All Rights Reserved</p>
          <nav className="footer-simple__nav" aria-label="Footer navigation">
            <a href="#projects" onClick={handleHashLink}>Projects</a>
            <a href="#journal" onClick={handleHashLink}>Journal</a>
            <a href="#about" onClick={handleHashLink}>About</a>
            <a href="#contact" onClick={handleHashLink}>Contributors</a>
            <a href="#contact" onClick={handleHashLink}>Terms</a>
          </nav>
        </div>
      </footer>


    </>
  );
}
