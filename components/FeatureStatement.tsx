"use client";

import { RevealOnScroll } from './RevealOnScroll';

export function FeatureStatement() {
  return (
    <section className="py-20 sm:py-32 px-[var(--gutter)] flex justify-center items-center text-center border-t border-[var(--color-line)]">
      <RevealOnScroll className="max-w-[840px] mx-auto">
        <p className="font-display text-[20px] sm:text-[26px] md:text-[30px] leading-[1.6] tracking-tight text-ink font-normal">
          Hospitality has a <em>language</em> of its own. SOUP has spent <em>years</em> around the people who <em>speak</em> it best,<br className="hidden sm:inline" />
          seeing what they see, understanding what they <em>value</em>, and creating alongside them.<br className="hidden sm:inline" />
          Some <em>names</em> are better left to speak for <em>themselves</em>.
        </p>
      </RevealOnScroll>
    </section>
  );
}
