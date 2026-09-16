"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";

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
                <Link href="/stills" className="menu__nav-link" onClick={() => setMenuOpen(false)}>PROJECTS</Link>
                <div className="menu__sub-nav">
                  <Link
                    href="/stills"
                    className="menu__sub-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    STILLS
                  </Link>
                  <Link
                    href="/motion"
                    className="menu__sub-link"
                    onClick={() => setMenuOpen(false)}
                  >
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

      {/* 6. Main Landing Page */}
      <main id="main">
        {/* Hero Section */}
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__media">
            <img
              className="hero__fallback"
              src="/assets/images/hero-poster.jpg"
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
              From the <em>grandeur</em> of your property, its surrounding <em>landscape</em>, to the inviting <em>poolside</em> and the plush armchair by the <em>window</em>, every element <em>speaks</em> and we make sure it&apos;s <em>heard</em>.
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
                className={`projects-filter-btn ${projectCategory === "stills" || projectCategory === null ? "is-active" : ""}`}
                onClick={() => setProjectCategory("stills")}
              >
                STILLS
              </button>
              <span className="projects-filter-divider" aria-hidden="true" />
              <button
                type="button"
                className={`projects-filter-btn ${projectCategory === "motion" ? "is-active" : ""}`}
                onClick={() => setProjectCategory("motion")}
              >
                MOTION
              </button>
            </div>

            <p className="section-intro__body">
              Every property has a character. We capture it through Brand Films and Hospitality Photography, bringing together architecture, landscape, people and experience to create visual communication that makes audiences want to be there.
            </p>
            <Link
              className="btn-outline"
              href={projectCategory === "motion" ? "/motion" : "/stills"}
              onMouseEnter={() => handleMouseEnter("Explore", false)}
              onMouseLeave={handleMouseLeave}
            >
              VIEW ALL PROJECTS
            </Link>
          </div>

          <div className="project-feed">
            {/* Project 1 */}
            <article className="project-card project-card--hero reveal-item">
              <Link
                href={projectCategory === "motion" ? "/mayfair/motion" : "/mayfair"}
                className="project-card__button block cursor-pointer"
                onMouseEnter={() => handleMouseEnter("View project", false)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="media-swap image-reveal">
                  <img className="media-swap__primary" src={projectCategory === "motion" ? "/assets/images/motion_pdf/mayfair-manor.png" : "/assets/images/aman-a.webp"} alt="Mayfair Manor, Jungapana" loading="lazy" />
                  <img className="media-swap__secondary" src="/assets/images/aman-b.webp" alt="Mayfair Manor, Jungapana retreat glowing in evening light" loading="lazy" />
                </span>
                <span className="project-card__caption"><strong>Mayfair Manor, Jungapana</strong></span>
              </Link>
            </article>

            {/* Project 2 & 3 Split */}
            <div className="project-row project-row--split">
              <article className="project-card project-card--portrait reveal-item">
                <Link
                  href={projectCategory === "motion" ? "/parallel" : "/manuscript"}
                  className="project-card__button block cursor-pointer"
                  data-parallax="0.04"
                  onMouseEnter={() => handleMouseEnter("View project", false)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="media-swap image-reveal">
                    <img className="media-swap__primary" src={projectCategory === "motion" ? "/assets/images/motion_pdf/parallel-hotel.png" : "/assets/images/nobu-a.webp"} alt={projectCategory === "motion" ? "Parallel Hotel, Udaipur" : "Manuscript, Udaipur"} loading="lazy" />
                    <img className="media-swap__secondary" src={projectCategory === "motion" ? "/assets/images/parallel/parallel-bedroom.jpg" : "/assets/images/nobu-b.webp"} alt={projectCategory === "motion" ? "Parallel Hotel, Udaipur interior" : "Manuscript, Udaipur architecture"} loading="lazy" />
                  </span>
                  <span className="project-card__caption">
                    <strong>{projectCategory === "motion" ? "Parallel Hotel, Udaipur" : "Manuscript, Udaipur"}</strong>
                  </span>
                </Link>
              </article>

              <article className="project-card project-card--landscape project-card--lower reveal-item">
                <Link
                  href="/mohangarh"
                  className="project-card__button block cursor-pointer"
                  data-parallax="0.16"
                  onMouseEnter={() => handleMouseEnter("View project", false)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="media-swap image-reveal">
                    <img className="media-swap__primary" src={projectCategory === "motion" ? "/assets/images/motion_pdf/mohangarh-fort.png" : "/assets/images/hyatt-a.webp"} alt="Mohangarh Fort, Jaisalmer" loading="lazy" />
                    <img className="media-swap__secondary" src="/assets/images/hyatt-b.webp" alt="Mohangarh Fort, Jaisalmer palace beneath twilight clouds" loading="lazy" />
                  </span>
                  <span className="project-card__caption"><strong>Mohangarh Fort, Jaisalmer</strong></span>
                </Link>
              </article>
            </div>

            {/* Project 4 */}
            <article className="project-card project-card--hero project-card--right reveal-item">
              <Link
                href={projectCategory === "motion" ? "/mayfair-gopalpur" : "/ihcl-seleqtions"}
                className="project-card__button block cursor-pointer"
                data-parallax="0.09"
                onMouseEnter={() => handleMouseEnter("View project", false)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="media-swap image-reveal">
                  <img className="media-swap__primary" src={projectCategory === "motion" ? "/assets/images/motion_pdf/mayfair-gopalpur.png" : "/assets/images/janu-a.webp"} alt={projectCategory === "motion" ? "Mayfair Palm Beach Resort, Gopalpur" : "IHCL Himalayan Woodcroft, Sirmour"} loading="lazy" />
                  <img className="media-swap__secondary" src={projectCategory === "motion" ? "/assets/images/kokomo-b.webp" : "/assets/images/janu-b.webp"} alt={projectCategory === "motion" ? "Mayfair Palm Beach Resort, Gopalpur grounds" : "IHCL Himalayan Woodcroft, Sirmour mountain retreat at golden hour"} loading="lazy" />
                </span>
                <span className="project-card__caption">
                  <strong>{projectCategory === "motion" ? "Mayfair Palm Beach Resort, Gopalpur" : "IHCL Himalayan Woodcroft, Sirmour"}</strong>
                </span>
              </Link>
            </article>

            {/* Project 5 */}
            <article className="project-card project-card--hero reveal-item">
              <Link
                href={projectCategory === "motion" ? "/the-leela" : "/nemesia"}
                className="project-card__button block cursor-pointer"
                data-parallax="0.09"
                onMouseEnter={() => handleMouseEnter("View project", false)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="media-swap image-reveal">
                  <img className="media-swap__primary" src={projectCategory === "motion" ? "/assets/images/motion_pdf/the-leela-palace.png" : "/assets/images/luxury-a.webp"} alt={projectCategory === "motion" ? "The Leela Palace, Udaipur" : "Nemesia Resort & Spa, Rishikesh"} loading="lazy" />
                  <img className="media-swap__secondary" src={projectCategory === "motion" ? "/assets/images/rosewood-b.webp" : "/assets/images/luxury-b.webp"} alt={projectCategory === "motion" ? "The Leela Palace, Udaipur courtyard" : "Nemesia Resort & Spa, Rishikesh suite"} loading="lazy" />
                </span>
                <span className="project-card__caption">
                  <strong>{projectCategory === "motion" ? "The Leela Palace, Udaipur" : "Nemesia Resort & Spa, Rishikesh"}</strong>
                </span>
              </Link>
            </article>

            {/* Project 6 & 7 Split (Reverse) */}
            <div className="project-row project-row--split">
              <article className="project-card project-card--portrait reveal-item">
                {projectCategory === "motion" ? (
                  <Link
                    href="/manuscript"
                    className="project-card__button block cursor-pointer"
                    data-parallax="0.04"
                    onMouseEnter={() => handleMouseEnter("View project", false)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="media-swap image-reveal">
                      <img className="media-swap__primary" src="/assets/images/motion_pdf/manuscript-udaipur.png" alt="Manuscript, Udaipur" loading="lazy" />
                      <img className="media-swap__secondary" src="/assets/images/nobu-b.webp" alt="Manuscript, Udaipur architecture" loading="lazy" />
                    </span>
                    <span className="project-card__caption"><strong>Manuscript, Udaipur</strong></span>
                  </Link>
                ) : (
                  <div
                    className="project-card__button"
                    data-parallax="0.04"
                    onMouseEnter={() => handleMouseEnter("View project", false)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="media-swap image-reveal">
                      <img className="media-swap__primary" src="/assets/images/sujan-a.webp" alt="Rawla Narlai, Narlai" loading="lazy" />
                      <img className="media-swap__secondary" src="/assets/images/sujan-b.webp" alt="Rawla Narlai, Narlai candlelit evening" loading="lazy" />
                    </span>
                    <span className="project-card__caption"><strong>Rawla Narlai, Narlai</strong></span>
                  </div>
                )}
              </article>

              <article className="project-card project-card--landscape project-card--lower reveal-item">
                <Link
                  href={projectCategory === "motion" ? "/mayfair-puri" : "/the-leela"}
                  className="project-card__button block cursor-pointer"
                  data-parallax="0.16"
                  onMouseEnter={() => handleMouseEnter("View project", false)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="media-swap image-reveal">
                    <img className="media-swap__primary" src={projectCategory === "motion" ? "/assets/images/motion_pdf/mayfair-waves-puri.png" : "/assets/images/rosewood-a.webp"} alt={projectCategory === "motion" ? "Mayfair Heritage & Waves Resort, Puri" : "The Leela Palace, Udaipur"} loading="lazy" />
                    <img className="media-swap__secondary" src={projectCategory === "motion" ? "/assets/images/mayfair-puri/asset_03_1026x473.png" : "/assets/images/rosewood-b.webp"} alt={projectCategory === "motion" ? "Mayfair Heritage & Waves Resort, Puri hover" : "The Leela Palace, Udaipur courtyard"} loading="lazy" />
                  </span>
                  <span className="project-card__caption">
                    <strong>{projectCategory === "motion" ? "Mayfair Heritage & Waves Resort, Puri" : "The Leela Palace, Udaipur"}</strong>
                  </span>
                </Link>
              </article>
            </div>

            {/* Project 8 */}
            <article className="project-card project-card--hero reveal-item">
              <Link
                href={projectCategory === "motion" ? "/radisson" : "/mayfair-gopalpur"}
                className="project-card__button block cursor-pointer"
                data-parallax="0.09"
                onMouseEnter={() => handleMouseEnter("View project", false)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="media-swap image-reveal">
                  <img className="media-swap__primary" src={projectCategory === "motion" ? "/assets/images/motion_pdf/radisson-nathdwara.png" : "/assets/images/kokomo-a.webp"} alt={projectCategory === "motion" ? "Radisson, Nathdwara" : "Mayfair Palm Beach Resort, Gopalpur"} loading="lazy" />
                  <img className="media-swap__secondary" src={projectCategory === "motion" ? "/assets/images/fourseasons-a.webp" : "/assets/images/kokomo-b.webp"} alt={projectCategory === "motion" ? "Radisson, Nathdwara hover" : "Mayfair Palm Beach Resort, Gopalpur grounds"} loading="lazy" />
                </span>
                <span className="project-card__caption">
                  <strong>{projectCategory === "motion" ? "Radisson, Nathdwara" : "Mayfair Palm Beach Resort, Gopalpur"}</strong>
                </span>
              </Link>
            </article>
          </div>
        </section>

        {/* Film Section Intro Text */}
        <div style={{ textAlign: 'center', padding: '64px var(--gutter) 36px', background: 'var(--paper)' }}>
          <p style={{
            maxWidth: '1060px',
            margin: '0 auto',
            fontFamily: "var(--font-serif-primary)",
            fontSize: 'clamp(15px, 1.55vw, 21px)',
            lineHeight: '1.65',
            letterSpacing: '-0.005em',
            fontWeight: '400',
            color: '#2b2927'
          }}>
            Hospitality has a <em>language</em> of its own. SOUP has spent <em>years</em> around the people who <em>speak</em> it best,<br className="hidden md:inline" />
            seeing what they see, understanding what they <em>value</em>, and creating alongside them.<br className="hidden md:inline" />
            Some <em>names</em> are better left to speak for <em>themselves</em>.
          </p>
        </div>

        {/* 12-Image Thumbnail Grid Bar */}
        <section className="films section" id="films" aria-label="Visual Stills Grid" style={{ padding: '20px var(--gutter)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px' }}>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="/assets/images/nobu-b.webp" alt="Stills grid 1" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="/assets/images/about-ripples.webp" alt="Stills grid 2" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="/assets/images/hyatt-b.webp" alt="Stills grid 3" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="/assets/images/founder-jackson.webp" alt="Stills grid 4" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="/assets/images/janu-b.webp" alt="Stills grid 5" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="/assets/images/rosewood-b.webp" alt="Stills grid 6" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="/assets/images/sujan-b.webp" alt="Stills grid 7" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="/assets/images/luxury-b.webp" alt="Stills grid 8" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="/assets/images/founder-lauren.webp" alt="Stills grid 9" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="/assets/images/feature-fort-b.webp" alt="Stills grid 10" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="/assets/images/kokomo-a.webp" alt="Stills grid 11" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/6.8' }}>
              <img src="/assets/images/feature-rabari-b.webp" alt="Stills grid 12" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Journal Section */}
        <section className="journal section" id="journal" aria-labelledby="journal-heading">
          <div className="section-intro journal__intro">
            <div className="journal__lead-image media-swap image-reveal reveal-item">
              <img className="media-swap__primary" src="/assets/images/journal-road-a.webp" alt="Winding forest road" loading="lazy" />
              <img className="media-swap__secondary" src="/assets/images/journal-road-b.webp" alt="Safari vehicle at sunset" loading="lazy" />
            </div>
            <p className="micro" id="journal-heading">JOURNAL</p>
            <p className="section-intro__body">
              As specialists in storytelling, there is more to the tale than the destination. Our experiences, the musings and people found along the way, are all worth writing home about.
            </p>
            <Link
              className="btn-outline magnetic"
              href="/journal"
              onMouseEnter={() => handleMouseEnter("Explore Journal", false)}
              onMouseLeave={handleMouseLeave}
            >
              VIEW MORE
            </Link>
          </div>

          <div className="story-feed">
            {/* Story 1: Chunda Shikar Oudi */}
            <article className="story story--wide reveal-item">
              <Link
                href="/journal/chunda-shikar-oudi"
                className="story__media media-swap image-reveal block"
                onMouseEnter={() => handleMouseEnter("Read essay", false)}
                onMouseLeave={handleMouseLeave}
              >
                <img className="media-swap__primary" src="/assets/images/feature-jeep-a.webp" alt="Chunda Shikar Oudi safari sunset" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/kokomo-b.webp" alt="Chunda Shikar Oudi landscape" loading="lazy" />
              </Link>
              <div className="story__copy">
                <p className="micro">FEATURE</p>
                <Link href="/journal/chunda-shikar-oudi">
                  <h2>Chunda Shikar Oudi - Where Wilderness Remains The Main Presence</h2>
                </Link>
                <p>&ldquo;Hospitality becomes more meaningful when the environment is treated as a presence rather than backdrop.&rdquo;</p>
              </div>
            </article>

            {/* Story 2: Mohangarh Fort */}
            <article className="story story--wide story--reverse reveal-item">
              <Link
                href="/journal/mohangarh"
                className="story__media media-swap image-reveal block"
                onMouseEnter={() => handleMouseEnter("Read essay", false)}
                onMouseLeave={handleMouseLeave}
              >
                <img className="media-swap__primary" src="/assets/images/feature-fort-a.webp" alt="Historic Mohangarh Fort beneath dramatic clouds" loading="lazy" />
                <img className="media-swap__secondary" src="/assets/images/feature-fort-b.webp" alt="Mohangarh Fort at twilight" loading="lazy" />
              </Link>
              <div className="story__copy">
                <p className="micro">FEATURE</p>
                <Link href="/journal/mohangarh">
                  <h2>Mohangarh Fort: The Last Standing Fort of India</h2>
                </Link>
                <p>&ldquo;The future of heritage hospitality may depend less on restoration and more on retaining emotional truth.&rdquo;</p>
              </div>
            </article>

          </div>
        </section>

        {/* About Section */}
        <section className="about section" id="about" aria-labelledby="about-heading">
          <div className="about__copy section-intro">
            <p className="micro" id="about-heading">ABOUT</p>
            <p className="section-intro__body">
              Storytelling in a visually driven world needs more than beautiful frames. Every image and every movement must serve a clear narrative and create a reason to feel connected.
            </p>
            <Link
              className="btn-outline magnetic"
              href="/about"
              onMouseEnter={() => handleMouseEnter("About Soup", false)}
              onMouseLeave={handleMouseLeave}
            >
              VIEW MORE
            </Link>
          </div>
          <div
            className="about__media image-reveal reveal-item"
            data-parallax="0.06"
            onMouseEnter={() => handleMouseEnter("About Us", false)}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/assets/images/about-ripples.webp" alt="Rain ripples across dark water" loading="lazy" />
            <span className="about__word">Story / Atmosphere / Detail</span>
          </div>
        </section>

        {/* Page Breaker Divider Line */}
        <div className="page-breaker"></div>

        {/* Section: A Little Bit of Us & Featured In (Reference Image 2) */}
        <section className="about-us-section section" aria-label="A Little Bit of Us" style={{ padding: "clamp(80px, 9vw, 130px) var(--gutter) clamp(64px, 8vw, 100px)", textAlign: "center", background: "var(--paper)" }}>
          {/* Top Kicker */}
          <p style={{
            fontFamily: "var(--font-serif-primary)",
            fontSize: "clamp(11px, 0.95vw, 13px)",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#1a1917",
            marginBottom: "18px",
            textAlign: "center"
          }}>
            A LITTLE BIT OF US
          </p>

          {/* Paragraph */}
          <p style={{
            fontFamily: "var(--font-sans-primary)",
            fontSize: "clamp(14px, 1.25vw, 16.5px)",
            lineHeight: 1.65,
            color: "#4a4641",
            maxWidth: "760px",
            margin: "0 auto clamp(28px, 3.5vw, 40px)",
            textAlign: "center"
          }}>
            From the grandeur of your property, it&apos;s surrounding landscape, to the inviting poolside and<br className="hidden md:inline" />{" "}
            the plush armchair by the window, every element speaks and we make sure it&apos;s heard.
          </p>

          {/* 4 Social Circle Buttons */}
          <div className="about-us__socials" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            marginBottom: "clamp(48px, 6vw, 72px)"
          }}>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="social-circle-btn"
              onMouseEnter={() => handleMouseEnter("Facebook", true)}
              onMouseLeave={handleMouseLeave}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/soupbyfalka/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-circle-btn"
              onMouseEnter={() => handleMouseEnter("Instagram", true)}
              onMouseLeave={handleMouseLeave}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://wa.me/919462703961?text=Hii"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="social-circle-btn"
              onMouseEnter={() => handleMouseEnter("WhatsApp", true)}
              onMouseLeave={handleMouseLeave}
            >
              <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.494 2.031 7.8L0 32l8.456-2.004A15.937 15.937 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.267 13.267 0 01-6.771-1.854l-.485-.29-5.02 1.317 1.338-4.887-.317-.502A13.225 13.225 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.815c-.398-.199-2.354-1.162-2.719-1.294-.365-.133-.631-.199-.896.199-.266.398-1.029 1.294-1.261 1.56-.232.265-.464.298-.862.099-.398-.199-1.681-.62-3.201-1.977-1.183-1.056-1.981-2.36-2.213-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.464.597-.696.199-.232.265-.398.398-.664.133-.265.066-.497-.033-.696-.099-.199-.896-2.16-1.228-2.957-.323-.776-.651-.671-.896-.683l-.763-.013c-.265 0-.696.1-1.062.497-.365.398-1.394 1.361-1.394 3.32s1.427 3.85 1.626 4.116c.199.265 2.808 4.286 6.803 6.012.951.41 1.693.655 2.271.838.954.303 1.823.26 2.51.158.766-.114 2.354-.963 2.686-1.893.332-.93.332-1.727.232-1.893-.1-.165-.365-.265-.763-.464z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@SoupbyFalka"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="social-circle-btn"
              onMouseEnter={() => handleMouseEnter("YouTube", true)}
              onMouseLeave={handleMouseLeave}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

          {/* Featured In Heading */}
          <div className="featured-in" style={{ width: "100%", marginBottom: "clamp(24px, 3.5vw, 36px)" }}>
            <h3 style={{
              fontFamily: "var(--font-serif-primary)",
              fontStyle: "italic",
              fontSize: "clamp(26px, 2.8vw, 36px)",
              fontWeight: 400,
              color: "#1a1917",
              textAlign: "center",
              margin: "0 0 14px"
            }}>
              Featured In
            </h3>

            {/* Slider / Dot Divider */}
            <div style={{
              position: "relative",
              width: "120px",
              height: "1px",
              backgroundColor: "rgba(26, 25, 23, 0.35)",
              margin: "0 auto clamp(36px, 4.5vw, 56px)"
            }}>
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                backgroundColor: "#1a1917"
              }} />
            </div>

            {/* Press Logos Row (Exact 5 logos from reference: Grazia, Elle Decor, Architect's Diary, Condé Nast, Femina) */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "clamp(28px, 5vw, 68px)",
              maxWidth: "1160px",
              margin: "0 auto"
            }}>
              {/* 1. Grazia */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "54px" }}>
                <img
                  src="/assets/images/press/hotel-interior-videographer.svg"
                  alt="Grazia"
                  style={{ maxHeight: "44px", width: "auto", objectFit: "contain", filter: "brightness(0)", display: "block" }}
                />
              </div>

              {/* 2. Elle Decor */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "54px" }}>
                <img
                  src="/assets/images/press/Professional-Hotel-Photography.svg"
                  alt="Elle Decor"
                  style={{ maxHeight: "38px", width: "auto", objectFit: "contain", filter: "brightness(0)", display: "block" }}
                />
              </div>

              {/* 3. The Architect's Diary */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "54px" }}>
                <img
                  src="/assets/images/press/Resorts-Hotel-photography-Agency-in-India.svg"
                  alt="The Architect's Diary"
                  style={{ maxHeight: "52px", width: "auto", objectFit: "contain", filter: "brightness(0)", display: "block" }}
                />
              </div>

              {/* 4. Condé Nast Traveler */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "54px" }}>
                <img
                  src="/assets/images/press/Best-hotel-photography-in-India.svg"
                  alt="Condé Nast Traveler"
                  style={{ maxHeight: "46px", width: "auto", objectFit: "contain", filter: "brightness(0)", display: "block" }}
                />
              </div>

              {/* 5. Femina */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "54px" }}>
                <img
                  src="/assets/images/press/Hotel-Interior-Photographer.svg"
                  alt="Femina"
                  style={{ maxHeight: "32px", width: "auto", objectFit: "contain", filter: "brightness(0)", display: "block" }}
                />
              </div>
            </div>
          </div>

          {/* Essence Quote Section */}
          <div className="essence-quote" style={{ marginTop: "clamp(36px, 4.5vw, 56px)" }}>
            <div style={{
              width: "60px",
              height: "1px",
              backgroundColor: "rgba(26, 25, 23, 0.35)",
              margin: "0 auto clamp(20px, 2.5vw, 28px)"
            }} />
            <p style={{
              fontFamily: "var(--font-serif-primary)",
              fontStyle: "italic",
              fontSize: "clamp(16px, 1.55vw, 21px)",
              color: "#282624",
              maxWidth: "740px",
              margin: "0 auto clamp(20px, 2.5vw, 28px)",
              lineHeight: 1.55
            }}>
              &ldquo;The true essence of a meal is revealed in the very first sip of its soup.&rdquo;
            </p>
            <div style={{
              width: "60px",
              height: "1px",
              backgroundColor: "rgba(26, 25, 23, 0.35)",
              margin: "0 auto"
            }} />
          </div>
        </section>
      </main>

      {/* 7. Footer Section */}
      <footer className="footer-simple" id="contact">
        <div className="footer-simple__top">
          <p className="footer-simple__label">INQUIRIES &amp; COMMISSIONS</p>
          <p className="footer-simple__text">India &amp; International Hospitality Commissions</p>
          <a
            className="footer-simple__btn"
            href="mailto:falka@soupbyfalka.com"
            onMouseEnter={() => handleMouseEnter("Email", true)}
            onMouseLeave={handleMouseLeave}
          >
            FALKA@SOUPBYFALKA.COM
          </a>
        </div>
        <div className="footer-simple__bottom">
          <p>© {new Date().getFullYear()} SOUP BY FALKA. ALL RIGHTS RESERVED.</p>
          <nav className="footer-simple__nav" aria-label="Footer navigation">
            <Link href="/stills">Projects</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>


    </>
  );
}
