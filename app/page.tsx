"use client";

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const previewImgRef = useRef<HTMLImageElement>(null);

  const [loaderValue, setLoaderValue] = useState(0);
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [cursorText, setCursorText] = useState("View");
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorLight, setCursorLight] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

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
    const heroMediaEl = document.querySelector(".hero__media");
    const footerEl = document.querySelector(".footer");
    const parallaxItems = document.querySelectorAll("[data-parallax]") as NodeListOf<HTMLElement>;

    const updateScrollUI = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = Math.max(document.documentElement.scrollHeight - vh, 1);
      if (progressEl) {
        progressEl.style.transform = `scaleX(${Math.min(Math.max(y / max, 0), 1)})`;
      }

      if (headerEl) {
        headerEl.classList.remove("is-hidden");
        const heroRect = heroMediaEl ? heroMediaEl.getBoundingClientRect() : null;
        const overHero = heroRect && heroRect.top <= 8 && heroRect.bottom >= 8;
        const overFooter = footerEl && footerEl.getBoundingClientRect().top <= 8;
        headerEl.classList.toggle("is-over-dark", Boolean(overHero || overFooter));
        headerEl.classList.toggle("is-scrolled", y > 50);
      }
      lastScroll = y;

      if (!reduceMotion) {
        for (let i = 0; i < parallaxItems.length; i++) {
          const item = parallaxItems[i];
          const rect = item.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > vh + 200) continue;
          const speed = Number(item.dataset.parallax || 0.04);
          const distance = (vh / 2 - (rect.top + rect.height / 2)) * speed;
          const clamped = Math.min(Math.max(distance, -90), 90);
          item.style.transform = `translateY(${clamped}px)`;
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
        <div className="loader__top"><span>Soup Studio</span><span>Loading films</span></div>
        <div className="loader__mark"><span>soup</span><small>by Kshitij</small></div>
        <div className="loader__bottom">
          <div className="loader__track"><span style={{ transform: `scaleX(${loaderValue / 100})` }}></span></div>
          <span className="loader__count">{String(loaderValue).padStart(2, "0")}</span>
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
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen(true)}
          onMouseEnter={() => handleMouseEnter("Menu", false)}
          onMouseLeave={handleMouseLeave}
        >
          <span className="menu-toggle__icon"><i></i><i></i></span>
          <span className="menu-toggle__label">Menu</span>
        </button>

        <a
          className="wordmark magnetic"
          href="#top"
          aria-label="Soup home"
          onClick={handleHashLink}
          onMouseEnter={() => handleMouseEnter("Home", false)}
          onMouseLeave={handleMouseLeave}
        >
          <strong>soup</strong><small>by Kshitij</small>
        </a>

        <nav className="header-social" aria-label="Social links">
          <a
            href="#contact"
            onClick={handleHashLink}
            onMouseEnter={() => handleMouseEnter("Contact", false)}
            onMouseLeave={handleMouseLeave}
          >
            Contact
          </a>
          <a
            href="#films"
            onClick={handleHashLink}
            onMouseEnter={() => handleMouseEnter("Films", false)}
            onMouseLeave={handleMouseLeave}
          >
            Films
          </a>
        </nav>
      </header>

      {/* 5. Navigation Menu Drawer */}
      <aside className={`menu ${menuOpen ? "is-open" : ""}`} id="site-menu" aria-hidden={!menuOpen}>
        <div className="menu__veil" onClick={() => setMenuOpen(false)}></div>
        <div className="menu__panel">
          <div className="menu__top">
            <span className="micro">Navigation / 2026</span>
            <button
              className="menu__close magnetic"
              type="button"
              aria-label="Close navigation"
              onClick={() => setMenuOpen(false)}
              onMouseEnter={() => handleMouseEnter("Close", false)}
              onMouseLeave={handleMouseLeave}
            >
              Close
            </button>
          </div>

          <div className="menu__body">
            <nav className="menu__links" aria-label="Primary navigation">
              <a
                href="#projects"
                onClick={handleHashLink}
                onMouseEnter={() => handleMenuLinkHover("assets/images/aman-a.webp")}
              >
                <small>01</small><span>Projects</span>
              </a>
              <a
                href="#films"
                onClick={handleHashLink}
                onMouseEnter={() => handleMenuLinkHover("assets/images/kokomo-a.webp")}
              >
                <small>02</small><span>Films</span>
              </a>
              <a
                href="#journal"
                onClick={handleHashLink}
                onMouseEnter={() => handleMenuLinkHover("assets/images/feature-jeep-a.webp")}
              >
                <small>03</small><span>Journal</span>
              </a>
              <a
                href="#about"
                onClick={handleHashLink}
                onMouseEnter={() => handleMenuLinkHover("assets/images/about-ripples.webp")}
              >
                <small>04</small><span>About</span>
              </a>
              <a
                href="#contact"
                onClick={handleHashLink}
                onMouseEnter={() => handleMenuLinkHover("assets/images/hero-poster.jpg")}
              >
                <small>05</small><span>Contact</span>
              </a>
            </nav>

            <div className="menu__preview" aria-hidden="true">
              <img src="assets/images/aman-a.webp" alt="" ref={previewImgRef} />
            </div>
          </div>

          <div className="menu__bottom">
            <p>Considered films and stills shaped by place, atmosphere and human detail.</p>
            <a href="mailto:hello@soup.studio">hello@soup.studio</a>
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
            <p className="micro reveal-item">Independent visual studio / India</p>
            <h1 id="hero-title" className="display reveal-text">
              A <em>collective</em> of considered storytellers, Soup is the <em>conduit</em> between your physical space, brand, product, and its digital reach.
            </h1>
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects section" id="projects" aria-labelledby="projects-heading">
          <div className="section-intro section-intro--sticky">
            <p className="micro" id="projects-heading">PROJECTS</p>
            <p className="section-intro__body">
              JAGAT provides a complete, end-to-end visual content solution. We have the resources, skills and industry-specific experience necessary to produce, create and deliver projects of any scale, in any part of the world.
            </p>
            <a
              className="btn-outline magnetic"
              href="#projects"
              onClick={handleHashLink}
              onMouseEnter={() => handleMouseEnter("Explore", false)}
              onMouseLeave={handleMouseLeave}
            >
              VIEW ALL PROJECTS
            </a>
          </div>

          <div className="project-feed">
            {/* Project 1 */}
            <article className="project-card project-card--hero reveal-item">
              <div
                className="project-card__button"
                onMouseEnter={() => handleMouseEnter("View project", false)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="media-swap image-reveal" data-parallax="0.09">
                  <img className="media-swap__primary" src="assets/images/aman-a.webp" alt="Aman hillside resort" loading="lazy" />
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
                  onMouseEnter={() => handleMouseEnter("View project", false)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="media-swap image-reveal" data-parallax="0.04">
                    <img className="media-swap__primary" src="assets/images/nobu-a.webp" alt="Terracotta arched interior" loading="lazy" />
                    <img className="media-swap__secondary" src="assets/images/nobu-b.webp" alt="Warm modern reception interior" loading="lazy" />
                  </span>
                  <span className="project-card__caption"><strong>NOBU RESIDENCES ABU DHABI</strong></span>
                </div>
              </article>

              <article className="project-card project-card--landscape project-card--lower reveal-item">
                <div
                  className="project-card__button"
                  onMouseEnter={() => handleMouseEnter("View project", false)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="media-swap image-reveal" data-parallax="0.16">
                    <img className="media-swap__primary" src="assets/images/hyatt-a.webp" alt="Luxury resort courtyard at dusk" loading="lazy" />
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
                onMouseEnter={() => handleMouseEnter("View project", false)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="media-swap image-reveal" data-parallax="0.09">
                  <img className="media-swap__primary" src="assets/images/janu-a.webp" alt="A forest lodge at dusk" loading="lazy" />
                  <img className="media-swap__secondary" src="assets/images/janu-b.webp" alt="Mountain retreat at golden hour" loading="lazy" />
                </span>
                <span className="project-card__caption"><strong>JANU</strong></span>
              </div>
            </article>

            {/* Project 5 */}
            <article className="project-card project-card--hero reveal-item">
              <div
                className="project-card__button"
                onMouseEnter={() => handleMouseEnter("View project", false)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="media-swap image-reveal" data-parallax="0.09">
                  <img className="media-swap__primary" src="assets/images/luxury-a.webp" alt="Luxury bedroom overlooking mountains" loading="lazy" />
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
                  onMouseEnter={() => handleMouseEnter("View project", false)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="media-swap image-reveal" data-parallax="0.04">
                    <img className="media-swap__primary" src="assets/images/sujan-a.webp" alt="Candlelit path beneath trees" loading="lazy" />
                    <img className="media-swap__secondary" src="assets/images/sujan-b.webp" alt="A local storyteller at sunset" loading="lazy" />
                  </span>
                  <span className="project-card__caption"><strong>SUJAN</strong></span>
                </div>
              </article>

              <article className="project-card project-card--landscape project-card--lower reveal-item">
                <div
                  className="project-card__button"
                  onMouseEnter={() => handleMouseEnter("View project", false)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="media-swap image-reveal" data-parallax="0.16">
                    <img className="media-swap__primary" src="assets/images/rosewood-a.webp" alt="Grand hotel with a domed pavilion" loading="lazy" />
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
                onMouseEnter={() => handleMouseEnter("View project", false)}
                onMouseLeave={handleMouseLeave}
              >
                <span className="media-swap image-reveal" data-parallax="0.09">
                  <img className="media-swap__primary" src="assets/images/kokomo-a.webp" alt="Tropical gardens above the ocean" loading="lazy" />
                  <img className="media-swap__secondary" src="assets/images/kokomo-b.webp" alt="Resort grounds across a green valley" loading="lazy" />
                </span>
                <span className="project-card__caption"><strong>KOKOMO</strong></span>
              </div>
            </article>
          </div>
        </section>

        {/* 12-Image Thumbnail Grid Bar */}
        <section className="films section" id="films" aria-label="Visual Stills Grid" style={{ padding: '40px var(--gutter)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/8' }}>
              <img src="assets/images/nobu-b.webp" alt="Stills grid 1" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/8' }}>
              <img src="assets/images/about-ripples.webp" alt="Stills grid 2" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/8' }}>
              <img src="assets/images/hyatt-b.webp" alt="Stills grid 3" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/8' }}>
              <img src="assets/images/founder-jackson.webp" alt="Stills grid 4" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/8' }}>
              <img src="assets/images/janu-b.webp" alt="Stills grid 5" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/8' }}>
              <img src="assets/images/rosewood-b.webp" alt="Stills grid 6" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/8' }}>
              <img src="assets/images/sujan-b.webp" alt="Stills grid 7" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/8' }}>
              <img src="assets/images/luxury-b.webp" alt="Stills grid 8" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/8' }}>
              <img src="assets/images/founder-lauren.webp" alt="Stills grid 9" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/8' }}>
              <img src="assets/images/feature-fort-b.webp" alt="Stills grid 10" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/8' }}>
              <img src="assets/images/kokomo-a.webp" alt="Stills grid 11" loading="lazy" />
            </div>
            <div className="media-swap image-reveal" style={{ aspectRatio: '16/8' }}>
              <img src="assets/images/feature-rabari-b.webp" alt="Stills grid 12" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Journal Section */}
        <section className="journal section" id="journal" aria-labelledby="journal-heading">
          <div className="section-intro journal__intro">
            <div className="journal__lead-image media-swap image-reveal reveal-item" data-parallax="0.05">
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
                  <p className="micro">Feature / Community</p>
                  <h2>Where People and Wildlife Coexist</h2>
                  <p>A quiet relationship between community, land and the animals moving through it.</p>
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
                  <p className="micro">Feature / Design</p>
                  <h2>A Journey of Discovery</h2>
                  <p>Atmosphere, heritage and the small details that let a room belong to its setting.</p>
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

        {/* Founders Section */}
        <section className="founders section" aria-labelledby="founders-heading">
          <div className="founders__intro reveal-item">
            <p className="micro" id="founders-heading">Soup Co-Founders</p>
            <p>
              For over a decade, our founders have shaped visual narratives across travel, hospitality and lifestyle. The work does not simply show a destination; it defines how the destination is remembered.
            </p>
          </div>
          <div className="founders__grid">
            <article className="founder reveal-item">
              <div
                className="founder__portrait image-reveal"
                onMouseEnter={() => handleMouseEnter("Profile", false)}
                onMouseLeave={handleMouseLeave}
              >
                <img src="assets/images/founder-jackson.webp" alt="Black and white portrait of a cinematographer" loading="lazy" />
              </div>
              <p className="micro">Co-Founder / Director / Cinematographer</p>
              <h2>Jackson England</h2>
            </article>

            <article className="founder reveal-item">
              <div
                className="founder__portrait image-reveal"
                onMouseEnter={() => handleMouseEnter("Profile", false)}
                onMouseLeave={handleMouseLeave}
              >
                <img src="assets/images/founder-lauren.webp" alt="Black and white portrait of a producer" loading="lazy" />
              </div>
              <p className="micro">Co-Founder / Head of Production</p>
              <h2>Lauren James</h2>
            </article>
          </div>
        </section>
      </main>

      {/* 7. Footer Section */}
      <footer className="footer" id="contact" onMouseEnter={() => handleMouseEnter("Email", true)} onMouseLeave={handleMouseLeave}>
        <div className="footer__main reveal-item">
          <p className="micro">Get in touch / Start a project</p>
          <h2>Let’s make something<br /><em>worth remembering.</em></h2>
          <a
            className="footer__email magnetic"
            href="mailto:hello@soup.studio"
            onMouseEnter={() => handleMouseEnter("Email", true)}
            onMouseLeave={handleMouseLeave}
          >
            hello@soup.studio <i>↗</i>
          </a>
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Soup Studio</p>
          <nav aria-label="Footer navigation">
            <a href="#projects" onClick={handleHashLink}>Projects</a>
            <a href="#films" onClick={handleHashLink}>Films</a>
            <a href="#journal" onClick={handleHashLink}>Journal</a>
            <a href="#about" onClick={handleHashLink}>About</a>
          </nav>
          <a href="#top" onClick={handleHashLink}>Back to top ↑</a>
        </div>
      </footer>


    </>
  );
}
