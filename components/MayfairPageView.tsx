"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronUp } from "lucide-react";
import OtherProjectsSlider from "@/components/OtherProjectsSlider";
import ProjectFloatingSwitcher from "@/components/ProjectFloatingSwitcher";

export default function MayfairPageView({ initialTab = "stills" }: { initialTab?: "stills" | "motion" } = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerState, setHeaderState] = useState<"transparent" | "black" | "white">("transparent");
  const [projectTab, setProjectTab] = useState<"stills" | "motion">(initialTab);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Read URL query parameter on initial mount or referrer
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "motion" || tab === "stills") {
        setProjectTab(tab);
      } else if (document.referrer.includes("/motion")) {
        setProjectTab("motion");
      }
    }
  }, []);

  const toggleProjectTab = () => {
    const nextTab = projectTab === "stills" ? "motion" : "stills";
    setProjectTab(nextTab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", nextTab);
      window.history.replaceState({}, "", url.toString());
    }
  };

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
  }, [projectTab]);

  // Handle Parallax & Scroll UI Header State
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId: number;

    const heroEl = (document.querySelector(".motion-hero-teaser") ||
      document.querySelector(".mayfair-hero-section")) as HTMLElement | null;
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

    let resizeTimer: any;
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
  }, [projectTab]);

  // Handle Escape key for video modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVideoModalOpen(false);
      }
    };
    if (videoModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [videoModalOpen]);

  return (
    <div className={`mayfair-page-wrapper ${projectTab === "motion" ? "mayfair-motion-wrapper" : ""}`}>
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

      {/* =========================================================================
          CONDITIONAL RENDER: MOTION VS STILLS
          ========================================================================= */}
      {projectTab === "motion" ? (
        /* ======================== MOTION VIEW ======================== */
        <>
          {/* 1. Motion Top Hero Teaser Banner */}
          <section className="motion-hero-teaser">
            <div className="motion-hero-teaser-media" data-parallax="0.08">
              <img
                src="/assets/images/mayfair/motion/hero_teaser_clean.jpg"
                alt="Mayfair Manor, Jungpana mountain landscape teaser"
                loading="eager"
              />
            </div>
            <div className="motion-hero-teaser-overlay">
              <h1 className="motion-hero-teaser-title reveal-text">Teaser</h1>
            </div>
          </section>

          {/* 2. Motion Intro Section */}
          <section className="mayfair-intro-section">
            <p className="mayfair-category-tag reveal-text">Mayfair Manor, Jungpana</p>
            <p className="mayfair-intro-statement reveal-text" data-parallax="0.02">
              Set within the Jungpana Tea Estate in the <em>Himalayan foothills</em>, MAYFAIR Manor offers an intimate<br className="hidden md:inline" />{" "}
              retreat shaped by <em>colonial architecture</em>, tea gardens and the slower rhythm of <em>mountain life</em>. Its<br className="hidden md:inline" />{" "}
              <em>identity</em> lies as much in the journey through the <em>landscape</em> as in the property itself.
            </p>
          </section>

          {/* Main Content Container */}
          <main className="motion-container">
            {/* 3. Row 1: 2 Columns Side by Side (Garden Lawn + Curtain Man) */}
            <div className="motion-row-1">
              <div className="motion-image-card reveal-item image-reveal">
                <img
                  src="/assets/images/mayfair/motion/row1_garden_lawn.jpg"
                  alt="Mayfair Manor lawn estate and colonial architecture"
                  loading="lazy"
                />
              </div>
              <div className="motion-image-card reveal-item image-reveal">
                <img
                  src="/assets/images/mayfair/motion/row1_curtain_man.jpg"
                  alt="Man looking out through the sheer drapery into the mountain breeze"
                  loading="lazy"
                />
              </div>
            </div>

            {/* 4. Row 2: Asymmetric (Left Narrow Road + Right Wide Living Room Salon) */}
            <div className="motion-row-2">
              <div className="motion-image-card motion-card-road reveal-item image-reveal">
                <img
                  src="/assets/images/mayfair/motion/row2_winding_road.jpg"
                  alt="Winding hairpin mountain road journey to Mayfair Jungpana"
                  loading="lazy"
                />
              </div>
              <div className="motion-image-card motion-card-salon reveal-item image-reveal">
                <img
                  src="/assets/images/mayfair/motion/row2_living_room_lady.jpg"
                  alt="Colonial salon with chandelier, turquoise doors and elegant guest"
                  loading="lazy"
                />
              </div>
            </div>

            {/* 5. Middle Narrative & Services Block */}
            <section className="motion-narrative-section">
              <div className="motion-narrative-text reveal-item is-visible">
                <p>
                  Our approach focused on translating this sense of place into film—exploring the changing atmospheres, heritage character and experiences that define a stay here.
                </p>
                <p>
                  Through carefully directed moments and an immersive visual language, five films were created to reflect the property&apos;s relationship with nature, history and quiet escape.
                </p>
              </div>

              <div className="motion-services-panel reveal-item is-visible">
                <h4 className="motion-services-heading">Services Provided</h4>
                <p className="motion-services-content">
                  Concept, Moodboarding, Production Management, Creative Direction, Client Direction, Casting, Wardrobe &amp; Styling, Prop Styling, Make-up &amp; Grooming, Post-production, Voice-over Script &amp; Talent
                </p>
              </div>
            </section>

            {/* 6. Row 3: 2 Columns (Waterfall + Tea Picker) */}
            <div className="motion-row-3">
              <div className="motion-image-card motion-card-waterfall reveal-item image-reveal">
                <img
                  src="/assets/images/mayfair/motion/row3_waterfall.jpg"
                  alt="Cascading mountain waterfall nestled in lush rainforest greenery"
                  loading="lazy"
                />
              </div>
              <div className="motion-image-card motion-card-teapicker reveal-item image-reveal">
                <img
                  src="/assets/images/mayfair/motion/row3_tea_picker.jpg"
                  alt="Tea picker harvesting delicate leaves on the Jungpana slopes"
                  loading="lazy"
                />
              </div>
            </div>

            {/* 7. Full-Bleed Second Featured Video Banner (Brand Film with Play Button) */}
            <section className="motion-video-banner-section reveal-item">
              <div className="motion-video-banner-media" data-parallax="0.05">
                <img
                  src="/assets/images/mayfair/motion/video_featured_clean.jpg"
                  alt="Mayfair Jungpana resort perched along the emerald mountain ridge at golden sunset"
                  loading="lazy"
                />
              </div>
              <div className="motion-video-play-overlay">
                <button
                  className="motion-play-button"
                  type="button"
                  aria-label="Play Mayfair Jungpana Brand Film"
                  onClick={() => setVideoModalOpen(true)}
                >
                  <svg className="motion-play-icon" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </section>

            {/* 8. Row 4: 2 Columns (Tea Smelling + Dining Courtyard) */}
            <div className="motion-row-4">
              <div className="motion-image-card motion-card-smelling reveal-item image-reveal">
                <img
                  src="/assets/images/mayfair/motion/row4_smelling_tea.jpg"
                  alt="Guests experiencing the aroma of freshly plucked tea leaves"
                  loading="lazy"
                />
              </div>
              <div className="motion-image-card motion-card-dining reveal-item image-reveal">
                <img
                  src="/assets/images/mayfair/motion/row4_dining_courtyard.jpg"
                  alt="Symmetrical dining courtyard with intricate teal screens and attentive hospitality"
                  loading="lazy"
                />
              </div>
            </div>

            {/* 9. Row 5: Master Bedroom Suite Wide */}
            <div className="motion-row-5">
              <div className="motion-image-card motion-card-bedroom reveal-item image-reveal">
                <img
                  src="/assets/images/mayfair/motion/row5_master_bedroom.jpg"
                  alt="Grand master bedroom suite with four-poster canopy bed, wood paneling, and marble fireplace"
                />
              </div>
            </div>
          </main>
        </>
      ) : (
        /* ======================== STILLS VIEW ======================== */
        <>
          {/* 2. Hero Panoramic Image Banner */}
          <section className="mayfair-hero-section">
            <div className="mayfair-hero-media" data-parallax="0.08">
              <img
                src="/assets/images/mayfair/mayfair-hero.jpg"
                alt="Mayfair Jungpana luxury resort pool at sunset overlooking the Himalayan mountains"
                loading="eager"
              />
            </div>
          </section>

          {/* 3. Project Intro Statement */}
          <section className="mayfair-intro-section">
            <p className="mayfair-category-tag reveal-text">Mayfair Manor, Jungapana</p>
            <p className="mayfair-intro-statement reveal-text" data-parallax="0.02">
              Set within the Jungpana Tea Estate in the <em>Himalayan foothills</em>, MAYFAIR Manor offers an intimate<br className="hidden md:inline" />{" "}
              retreat shaped by <em>colonial architecture</em>, tea gardens and the slower rhythm of <em>mountain life</em>. Its<br className="hidden md:inline" />{" "}
              <em>identity</em> lies as much in the journey through the <em>landscape</em> as in the property itself.
            </p>
          </section>

          {/* Main Content Container */}
          <main className="mayfair-container">
            {/* 4. Featured Card with Title Overlay */}
            <section className="mayfair-featured-card reveal-item">
              <div className="mayfair-featured-media image-reveal">
                <img
                  src="/assets/images/mayfair/mayfair-featured.jpg"
                  alt="Mayfair Jungpana resort perched on the misty mountain hill ridge at sunset"
                  loading="lazy"
                />
              </div>
            </section>

            {/* 5. Two-Column Narrative & Services Grid */}
            <section className="mayfair-info-section">
              <div className="mayfair-info-story reveal-item is-visible">
                <p>
                  Our photographic approach focused on observing this relationship between heritage and nature through composition, light and detail.
                </p>
                <p>
                  From the character of the interiors to the surrounding tea gardens and landscape, the imagery was created to build a visual language that feels atmospheric, intimate and rooted in the distinct identity of Jungpana.
                </p>
              </div>

              <div className="mayfair-services-panel reveal-item is-visible">
                <h4 className="mayfair-services-label">Services Provided</h4>
                <p className="mayfair-services-text">
                  Concept, Pre-production Planning, Moodboarding, Creative Direction, Art Direction, Production Management, Casting, Wardrobe &amp; Styling, Prop Styling, Make-up &amp; Grooming, Lighting, Architectural &amp; Lifestyle Photography, Post-production
                </p>
              </div>
            </section>

            {/* 6. Visual Gallery Showcase Flow */}
            <section className="mayfair-gallery-flow" aria-label="Mayfair Photo Gallery">
              {/* Row 1: 2-Column Side-by-Side (Patio + Dining Room) */}
              <div className="mayfair-gallery-row mayfair-gallery-2col mayfair-gallery-row1">
                <div className="mayfair-image-card reveal-item image-reveal">
                  <img
                    src="/assets/images/mayfair/mayfair-patio.jpg"
                    alt="Poolside patio with checkered tile terrace and mountain sunset"
                    loading="lazy"
                  />
                </div>
                <div className="mayfair-image-card reveal-item image-reveal">
                  <img
                    src="/assets/images/mayfair/mayfair-dining.jpg"
                    alt="Indoor-outdoor dining pavilion with ornate lattice screens and mountain views"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Row 2: Medium Inset Panorama (Garden & Heritage Resort Estate) */}
              <div className="mayfair-gallery-row mayfair-gallery-medium">
                <div className="mayfair-image-card reveal-item image-reveal">
                  <img
                    src="/assets/images/mayfair/mayfair-garden.jpg"
                    alt="Mayfair Jungpana garden lawn and colonial heritage architecture"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Row 3: Asymmetric Split Row (Couple in Tea Estate + Courtyard Architecture) */}
              <div className="mayfair-gallery-row mayfair-gallery-asymmetric">
                <div className="mayfair-image-card mayfair-card-portrait reveal-item image-reveal">
                  <img
                    src="/assets/images/mayfair/mayfair-couple.jpg"
                    alt="Couple walking through the verdant forest and tea garden estate"
                    loading="lazy"
                  />
                </div>
                <div className="mayfair-image-card mayfair-card-landscape reveal-item image-reveal">
                  <img
                    src="/assets/images/mayfair/mayfair-courtyard.jpg"
                    alt="Resort exterior courtyard with yellow cottages and lush mountain hills"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Row 4: Full-Width Panorama (Heritage Corridor with Teal Doors & Mirror) */}
              <div className="mayfair-gallery-row mayfair-gallery-bleed">
                <div className="mayfair-image-card reveal-item image-reveal">
                  <img
                    src="/assets/images/mayfair/mayfair-corridor.jpg"
                    alt="Colonial heritage veranda corridor with turquoise doors, antique mirror, and porcelain vases"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Row 5: Medium Inset Panorama (Balcony View over Mist-Covered Hills) */}
              <div className="mayfair-gallery-row mayfair-gallery-medium">
                <div className="mayfair-image-card reveal-item image-reveal">
                  <img
                    src="/assets/images/mayfair/mayfair-balcony.jpg"
                    alt="Private suite balcony with wrought-iron railing overlooking the emerald tea valley"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Row 6: Full-Width Panorama (Master Bedroom Suite with Four-Poster Bed) */}
              <div className="mayfair-gallery-row mayfair-gallery-bleed">
                <div className="mayfair-image-card reveal-item image-reveal">
                  <img
                    src="/assets/images/mayfair/mayfair-suite-wide.jpg"
                    alt="Grand master bedroom suite with four-poster canopy bed, wood-paneled walls, and marble fireplace"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Row 7: 2-Column Side-by-Side (Left Suite Living Area Smaller + Right Bed Detail Bigger) */}
              <div className="mayfair-gallery-row mayfair-gallery-2col--right-bigger">
                <div className="mayfair-image-card reveal-item image-reveal">
                  <img
                    src="/assets/images/mayfair/mayfair-suite-corner.jpg"
                    alt="Suite living room corner with crimson curtains, ornate desk, and mountain vistas"
                    loading="lazy"
                  />
                </div>
                <div className="mayfair-image-card reveal-item image-reveal">
                  <img
                    src="/assets/images/mayfair/mayfair-bed-detail.jpg"
                    alt="Four-poster canopied bed with luxurious linen and embroidered runner"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Row 8: Bottom Medium Inset Panorama (Twilight Ridge Aerial View) */}
              <div className="mayfair-gallery-row mayfair-gallery-medium">
                <div className="mayfair-image-card mayfair-card-twilight reveal-item image-reveal">
                  <img
                    src="/assets/images/mayfair/mayfair-twilight.jpg"
                    alt="Aerial night view of Mayfair Jungpana illuminated atop the mountain ridge against twilight sunset"
                    loading="lazy"
                  />
                </div>
              </div>
            </section>
          </main>
        </>
      )}

      {/* Floating Stills / Motion Switcher */}
      <ProjectFloatingSwitcher currentTab={projectTab} onToggle={toggleProjectTab} />

      {/* Other Projects Slider Section */}
      <OtherProjectsSlider currentSlug="mayfair" type={projectTab} />

      {/* Footer Section */}
      <footer className="footer-simple" id="contact">
        <div className="footer-simple__top-flex">
          <div>
            <p className="footer-simple__label">GET IN TOUCH</p>
            <p className="footer-simple__text">If you want to contribute, learn more or start a project.</p>
            <a className="footer-simple__btn" href="mailto:info@soupbyfalka.com">
              INFO@SOUPBYFALKA.COM
            </a>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="footer-simple__back-top"
            aria-label="Back to top"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
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
    </div>
  );
}
