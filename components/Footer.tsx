"use client";

import Link from 'next/link';
import { RevealOnScroll } from './RevealOnScroll';

export function Footer() {
  return (
    <footer id="contact" className="border-t border-[var(--color-line)] bg-[var(--color-bg)] pt-20 pb-12 px-[var(--gutter)]">
      <div className="max-w-[var(--container-max)] mx-auto space-y-16">
        
        {/* Contact CTA Section */}
        <RevealOnScroll className="space-y-6 max-w-xl">
          <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-ink/70 block font-semibold">
            GET IN TOUCH
          </span>
          <p className="font-sans text-[15px] leading-[1.6] text-ink/80">
            If you want to contribute, learn more or start a project.
          </p>
          <div>
            <a
              href="mailto:INFO@SOUP.CO"
              className="btn-outline font-semibold"
            >
              INFO@SOUP.CO
            </a>
          </div>
        </RevealOnScroll>

        {/* Bottom Row */}
        <div className="border-t border-[var(--color-line)] pt-8 flex flex-col sm:flex-row justify-between items-center gap-6 font-sans text-[11px] tracking-[0.14em] uppercase text-ink/70">
          <div>
            © SOUP STUDIO. ALL RIGHTS RESERVED.
          </div>

          <div className="flex flex-wrap gap-6 sm:gap-8 items-center justify-center">
            <Link href="#projects" className="hover:text-ink transition-colors">
              Projects
            </Link>
            <Link href="#journal" className="hover:text-ink transition-colors">
              Journal
            </Link>
            <Link href="#about" className="hover:text-ink transition-colors">
              About
            </Link>
            <Link href="#founders" className="hover:text-ink transition-colors">
              Contributors
            </Link>
            <a href="#terms" className="hover:text-ink transition-colors">
              Terms
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
