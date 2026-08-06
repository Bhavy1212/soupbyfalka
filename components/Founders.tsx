"use client";

import Image from 'next/image';
import { RevealOnScroll } from './RevealOnScroll';
import { TEAM_MEMBERS } from '@/data/team';

export function Founders() {
  const founders = TEAM_MEMBERS.filter((m) => m.isFounder);
  const contributors = TEAM_MEMBERS.filter((m) => !m.isFounder);

  return (
    <section id="founders" className="py-20 sm:py-32 px-[var(--gutter)] border-t border-[var(--color-line)]">
      <div className="max-w-[var(--container-max)] mx-auto space-y-20">
        
        {/* Founders Overview Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Text Column */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-32">
            <RevealOnScroll delay={0.05}>
              <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-ink/70 block mb-3 font-semibold">
                SOUP CO-FOUNDERS
              </span>
              <p className="font-sans text-[14px] leading-[1.65] text-ink/80 max-w-md">
                For over a decade, Soup Co-Founders Jackson England and Lauren James have been the creative force behind some of the most striking campaigns in the luxury hospitality space, shaping the visual narratives of brands such as AMAN, Soneva, Rosewood, Suján, Four Seasons, Tourism Australia, Luxury Lodges of Australia and others. Their work doesn&apos;t just promote destinations; it defines them, setting a new benchmark for storytelling in the world of high-end travel.
              </p>
            </RevealOnScroll>
          </div>

          {/* Right Founders 2-Up Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {founders.map((founder, i) => (
              <RevealOnScroll key={founder.name} delay={0.1 + i * 0.1}>
                <div className="media-frame aspect-[4/5] w-full bg-black/5 mb-4 grayscale hover:grayscale-0 transition-all duration-700">
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink/60 font-semibold block">
                    {founder.role}
                  </span>
                  <h3 className="font-display text-[22px] sm:text-[24px] text-ink font-light">
                    {founder.name}
                  </h3>
                </div>
              </RevealOnScroll>
            ))}
          </div>

        </div>

        {/* Extended Contributors Grid */}
        <div className="border-t border-[var(--color-line)] pt-16">
          <RevealOnScroll delay={0.05} className="mb-10">
            <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-ink/70 block font-semibold">
              CREATIVE CONTRIBUTORS & TEAM
            </span>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {contributors.map((member, i) => (
              <RevealOnScroll key={member.name} delay={0.1 + i * 0.08}>
                <div className="media-frame aspect-[3/4] w-full bg-black/5 mb-4 grayscale hover:grayscale-0 transition-all duration-700">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink/60 font-semibold block">
                    {member.role}
                  </span>
                  <h4 className="font-display text-[18px] text-ink font-light">
                    {member.name}
                  </h4>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
