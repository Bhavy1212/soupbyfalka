"use client";

import { RevealOnScroll } from './RevealOnScroll';

export function IntroStatement() {
  return (
    <section className="py-24 sm:py-36 px-[var(--gutter)] flex justify-center items-center text-center">
      <RevealOnScroll className="max-w-[760px] mx-auto">
        <p className="font-display italic text-[22px] sm:text-[32px] md:text-[36px] leading-[1.35] tracking-tight text-ink font-normal">
          A collective of considered storytellers, Soup is the conduit between your physical space, brand, product, and its digital reach.
        </p>
      </RevealOnScroll>
    </section>
  );
}
