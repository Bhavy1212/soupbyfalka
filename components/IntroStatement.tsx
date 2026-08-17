"use client";

import { RevealOnScroll } from './RevealOnScroll';

export function IntroStatement() {
  return (
    <section className="py-24 sm:py-36 px-[var(--gutter)] flex justify-center items-center text-center">
      <RevealOnScroll className="max-w-[760px] mx-auto">
        <p className="font-cormorant text-[18px] sm:text-[24px] md:text-[28px] leading-[1.48] tracking-normal text-ink font-light">
          From the <em className="italic font-normal">grandeur</em> of your property, it&apos;s surrounding landscape, to the inviting poolside and the plush armchair by the window, every element <em className="italic font-normal">speaks</em> and we make sure it&apos;s <em className="italic font-normal">heard</em>.
        </p>
      </RevealOnScroll>
    </section>
  );
}
