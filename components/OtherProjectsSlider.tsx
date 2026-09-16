"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  STILLS_PROJECTS,
  MOTION_PROJECTS,
  ProjectSliderItem,
} from "@/data/otherProjectsData";

interface OtherProjectsSliderProps {
  currentSlug?: string;
  type?: "stills" | "motion";
}

export default function OtherProjectsSlider({
  currentSlug = "",
  type = "stills",
}: OtherProjectsSliderProps) {
  const allList = type === "motion" ? MOTION_PROJECTS : STILLS_PROJECTS;
  const filteredProjects: ProjectSliderItem[] = allList.filter(
    (p) => p.slug !== currentSlug
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse drag-to-scroll state
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  // Total dots to show (4 dots like in the reference mockup)
  const totalDots = 4;

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setActiveDot(0);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    const scrollRatio = Math.max(0, Math.min(1, el.scrollLeft / maxScroll));
    const dotIndex = Math.min(
      totalDots - 1,
      Math.floor(scrollRatio * totalDots)
    );
    setActiveDot(dotIndex);
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < maxScroll - 10);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateScrollState();
    const handleScroll = () => {
      updateScrollState();
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [filteredProjects]);

  const scrollToDot = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const targetScroll = (index / (totalDots - 1)) * maxScroll;
    el.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  const scrollByAmount = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isMouseDown.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - el.offsetLeft;
    startScrollLeft.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return;
    const el = trackRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }
    el.scrollLeft = startScrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isMouseDown.current = false;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
    }
  };

  const allProjectsLink = type === "motion" ? "/motion" : "/stills";

  return (
    <section className="other-projects-section" aria-label="Explore other projects">
      <div className="other-projects-layout">
        {/* Left Editorial Header & CTA */}
        <div className="other-projects-left">
          <h3 className="other-projects-heading">OTHER PROJECTS</h3>
          <p className="other-projects-sub">
            Uncover other stories from our curated selection of global brands.
          </p>
          <Link href={allProjectsLink} className="other-projects-btn">
            VIEW OTHER PROJECTS
          </Link>
        </div>

        {/* Right Horizontal Slider Track */}
        <div className="other-projects-right">
          {/* Controls Bar / Arrow Nav */}
          <div className="other-projects-slider-wrapper">
            {canScrollLeft && (
              <button
                type="button"
                className="other-projects-arrow other-projects-arrow--left"
                onClick={() => scrollByAmount("left")}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <div
              className="other-projects-slider-track"
              ref={trackRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
            >
              {filteredProjects.map((item) => (
                <article key={item.slug} className="other-projects-card">
                  <Link
                    href={item.link}
                    className="other-projects-card-link"
                    onClick={handleCardClick}
                  >
                    <div className="other-projects-media">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                    <h4 className="other-projects-title">{item.title}</h4>
                  </Link>
                </article>
              ))}
            </div>

            {canScrollRight && (
              <button
                type="button"
                className="other-projects-arrow other-projects-arrow--right"
                onClick={() => scrollByAmount("right")}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Pagination Dots */}
          <div className="other-projects-dots" role="tablist" aria-label="Projects pagination">
            {Array.from({ length: totalDots }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={activeDot === idx}
                aria-label={`Go to slide page ${idx + 1}`}
                className={`other-projects-dot ${
                  activeDot === idx ? "is-active" : ""
                }`}
                onClick={() => scrollToDot(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
