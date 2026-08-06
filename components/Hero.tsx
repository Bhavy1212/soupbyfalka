"use client";

import Image from 'next/image';

export function Hero() {
  return (
    <section className="hero relative w-full h-[calc(100vh-88px)] sm:h-[100vh] overflow-hidden" aria-label="Hero Showcase">
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src="/media/jagat-homepage-banner-update.jpg.jpeg"
          alt="Soup Luxury Hospitality Golden Hour Landscape Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}

