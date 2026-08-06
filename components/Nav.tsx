"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Instagram, Video, Linkedin, X, Menu } from 'lucide-react';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'People', href: '#founders' },
    { label: 'Journal', href: '#journal' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        aria-label="Main Navigation"
      >
        {/* Left: Hamburger menu toggle */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-2 p-2 hover:opacity-75 transition-opacity"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5 stroke-[1.5]" />
          <span className="hidden sm:inline font-sans text-[11px] tracking-[0.14em] uppercase">Menu</span>
        </button>

        {/* Center: Soup wordmark */}
        <Link href="/" className="wordmark text-center group flex flex-col items-center justify-center py-1" aria-label="Soup by Falka – Home">
          <img
            src="assets/images/soup-logo.png"
            alt="Soup by Falka"
            style={{ height: '32px', width: 'auto', display: 'block', mixBlendMode: 'multiply' }}
          />
        </Link>

        {/* Right: Social links */}
        <div className="flex items-center gap-4 text-ink">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity p-1"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4 stroke-[1.5]" />
          </a>
          <a
            href="https://vimeo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity p-1"
            aria-label="Vimeo"
          >
            <Video className="w-4 h-4 stroke-[1.5]" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity p-1"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4 stroke-[1.5]" />
          </a>
        </div>
      </header>

      {/* Full-screen Circular Clip-Path Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 32px 32px)', opacity: 0 }}
            animate={{ clipPath: 'circle(150% at 32px 32px)', opacity: 1 }}
            exit={{ clipPath: 'circle(0% at 32px 32px)', opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-ink text-bg flex flex-col justify-between p-[var(--gutter)]"
          >
            {/* Overlay Header */}
            <div className="flex justify-between items-center w-full">
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 p-2 hover:opacity-75 transition-opacity text-bg"
                aria-label="Close Navigation Menu"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
                <span className="font-sans text-[11px] tracking-[0.14em] uppercase">Close</span>
              </button>

              <div className="text-center">
                <span className="font-display italic text-[24px] text-bg">soup</span>
                <small className="block font-sans text-[8px] tracking-[0.25em] uppercase text-bg/60">
                  STUDIO
                </small>
              </div>

              <div className="text-right text-[11px] font-sans tracking-label uppercase opacity-60 hidden sm:block">
                LUXURY HOSPITALITY FILM STUDIO
              </div>
            </div>

            {/* Menu Links */}
            <nav className="my-auto max-w-4xl mx-auto w-full text-center space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display italic text-[36px] sm:text-[56px] lg:text-[64px] hover:opacity-60 transition-opacity text-bg block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Menu Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] font-sans tracking-label uppercase text-bg/70 border-t border-bg/20 pt-6 gap-4">
              <div>INFO@SOUP.CO</div>
              <div>© SOUP STUDIO. ALL RIGHTS RESERVED.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
