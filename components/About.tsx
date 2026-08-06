"use client";

import Image from 'next/image';
import { RevealOnScroll } from './RevealOnScroll';

export function About() {
  return (
    <section id="about" className="py-20 sm:py-32 px-[var(--gutter)] border-t border-[var(--color-line)]">
      <div className="max-w-[var(--container-max)] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* Left Text Column */}
        <div className="lg:col-span-5 space-y-6">
          <RevealOnScroll delay={0.05}>
            <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-ink/70 block mb-4 font-semibold">
              ABOUT
            </span>
            <p className="font-sans text-[14px] sm:text-[15px] leading-[1.65] text-ink/80 mb-8 max-w-md">
              Storytelling in today&apos;s visually driven world requires more to cut through. Coupled with a unique visual narrative that reflects your brand&apos;s values and mission, every image, every frame needs to serve as an essential part in creating connection-worthy stories. Soup are seasoned storytellers.
            </p>
            <a href="#about-more" className="btn-outline">
              VIEW MORE
            </a>
          </RevealOnScroll>
        </div>

        {/* Right Moody Full-Bleed Image Column */}
        <div className="lg:col-span-7">
          <RevealOnScroll delay={0.15}>
            <div className="media-frame aspect-[16/10] sm:aspect-[16/9] w-full bg-black/5">
              <Image
                src="/media/1.png"
                alt="Dark moody rain on water ripples"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
          </RevealOnScroll>
        </div>

      </div>
    </section>
  );
}
