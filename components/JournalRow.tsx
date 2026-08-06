"use client";

import Image from 'next/image';
import { RevealOnScroll } from './RevealOnScroll';
import { JOURNAL_ITEMS } from '@/data/journal';

export function JournalRow() {
  const item1 = JOURNAL_ITEMS[0];
  const item2 = JOURNAL_ITEMS[1];
  const item3 = JOURNAL_ITEMS[2];
  const item4 = JOURNAL_ITEMS[3];

  return (
    <div id="journal" className="divide-y divide-[var(--color-line)]">
      
      {/* Section 1: Journal Left / Rugged Beauty Right */}
      <section className="py-16 sm:py-24 px-[var(--gutter)]">
        <div className="max-w-[var(--container-max)] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Journal Card */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <RevealOnScroll delay={0.05}>
              <div className="media-frame aspect-[4/5] w-full bg-black/5 mb-6">
                <Image
                  src="/media/DJI0275.jpg"
                  alt="Winding mountain road aerial"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
              <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-ink/70 block mb-3 font-semibold">
                JOURNAL
              </span>
              <p className="font-sans text-[14px] leading-[1.6] text-ink/80 mb-6 max-w-sm">
                As specialists in storytelling, there is more to the tale than the destination. Our experiences, the musings and people found along the way, are all worth writing home about.
              </p>
              <a href="#journal-more" className="btn-outline">
                VIEW MORE
              </a>
            </RevealOnScroll>
          </div>

          {/* Right Feature Card 1 */}
          <div className="lg:col-span-8 space-y-6">
            <RevealOnScroll delay={0.1}>
              <div className="media-frame aspect-[16/10] w-full bg-black/5">
                <Image
                  src={item1.image || '/media/DSC8865.jpg'}
                  alt={item1.title || 'Feature Story'}
                  fill
                  sizes="(max-width: 768px) 100vw, 65vw"
                  className="object-cover"
                />
              </div>
              <div className="pt-6 text-center max-w-xl mx-auto space-y-3">
                <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-ink/70 font-semibold block">
                  FEATURE
                </span>
                <h3 className="font-display text-[26px] sm:text-[32px] text-ink leading-tight">
                  {item1.title}
                </h3>
                <p className="font-sans text-[14px] leading-[1.6] text-ink/75">
                  {item1.excerpt}
                </p>
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </section>

      {/* Section 2: Journal Left / Into the Wild Right */}
      <section className="py-16 sm:py-24 px-[var(--gutter)]">
        <div className="max-w-[var(--container-max)] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <RevealOnScroll delay={0.05}>
              <div className="media-frame aspect-[4/5] w-full bg-black/5 mb-6">
                <Image
                  src="/media/DJI0275.jpg"
                  alt="Winding mountain road aerial"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
              <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-ink/70 block mb-3 font-semibold">
                JOURNAL
              </span>
              <p className="font-sans text-[14px] leading-[1.6] text-ink/80 mb-6 max-w-sm">
                As specialists in storytelling, there is more to the tale than the destination. Our experiences, the musings and people found along the way, are all worth writing home about.
              </p>
              <a href="#journal-more" className="btn-outline">
                VIEW MORE
              </a>
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <RevealOnScroll delay={0.1}>
              <div className="media-frame aspect-[16/10] w-full bg-black/5">
                <Image
                  src={item2.image || '/media/DSC2197-HDR.jpg'}
                  alt={item2.title || 'Shiro Tsujimura'}
                  fill
                  sizes="(max-width: 768px) 100vw, 65vw"
                  className="object-cover"
                />
              </div>
              <div className="pt-6 text-center max-w-xl mx-auto space-y-3">
                <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-ink/70 font-semibold block">
                  FEATURE
                </span>
                <h3 className="font-display text-[26px] sm:text-[32px] text-ink leading-tight">
                  {item2.title}
                </h3>
                <p className="font-sans text-[14px] leading-[1.6] text-ink/75">
                  {item2.excerpt}
                </p>
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </section>

      {/* Section 3: Journal Left / 2-Up Feature Cards Right */}
      <section className="py-16 sm:py-24 px-[var(--gutter)]">
        <div className="max-w-[var(--container-max)] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <RevealOnScroll delay={0.05}>
              <div className="media-frame aspect-[4/5] w-full bg-black/5 mb-6">
                <Image
                  src="/media/DJI0275.jpg"
                  alt="Winding mountain road aerial"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
              <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-ink/70 block mb-3 font-semibold">
                JOURNAL
              </span>
              <p className="font-sans text-[14px] leading-[1.6] text-ink/80 mb-6 max-w-sm">
                As specialists in storytelling, there is more to the tale than the destination. Our experiences, the musings and people found along the way, are all worth writing home about.
              </p>
              <a href="#journal-more" className="btn-outline">
                VIEW MORE
              </a>
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Card 1: Rabari */}
            <RevealOnScroll delay={0.1}>
              <div className="media-frame aspect-[4/5] w-full bg-black/5">
                <Image
                  src={item3.image || '/media/DSC08130.jpg'}
                  alt={item3.title || 'Rabari'}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="pt-6 space-y-2">
                <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-ink/70 font-semibold block">
                  FEATURE
                </span>
                <h4 className="font-display text-[22px] text-ink leading-tight">
                  {item3.title}
                </h4>
                <p className="font-sans text-[13px] leading-[1.6] text-ink/75">
                  {item3.excerpt}
                </p>
              </div>
            </RevealOnScroll>

            {/* Card 2: Canopy Suite */}
            <RevealOnScroll delay={0.2}>
              <div className="media-frame aspect-[4/5] w-full bg-black/5">
                <Image
                  src={item4.image || '/media/02-IHCL1867.jpg'}
                  alt={item4.title || 'Journey of Discovery'}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="pt-6 space-y-2">
                <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-ink/70 font-semibold block">
                  FEATURE
                </span>
                <h4 className="font-display text-[22px] text-ink leading-tight">
                  {item4.title}
                </h4>
                <p className="font-sans text-[13px] leading-[1.6] text-ink/75">
                  {item4.excerpt}
                </p>
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </section>

    </div>
  );
}
