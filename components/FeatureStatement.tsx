"use client";

import { RevealOnScroll } from './RevealOnScroll';

export function FeatureStatement() {
  return (
    <section className="py-20 sm:py-32 px-[var(--gutter)] flex justify-center items-center text-center border-t border-[var(--color-line)]">
      <RevealOnScroll className="max-w-[840px] mx-auto">
        <p className="font-display text-[22px] sm:text-[30px] md:text-[34px] leading-[1.4] tracking-tight text-ink font-light">
          Soup crafts <span className="italic font-normal">evocative</span> films that bring stories to{' '}
          <span className="italic font-normal">life</span>, seamlessly connecting your brand, space, and vision through cinematic{' '}
          <span className="italic font-normal">storytelling</span>. Explore some features below.
        </p>
      </RevealOnScroll>
    </section>
  );
}
