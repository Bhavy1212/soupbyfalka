"use client";

import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import { VideoGridTile } from '@/data/videoGrid';

export function VideoTile({ tile, index }: { tile: VideoGridTile; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(() => {
        // Autoplay may be restricted by browser policies
      });
    } else {
      video.pause();
    }
  }, [isInView]);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className="media-frame aspect-[3/4] bg-neutral-900 group cursor-pointer"
    >
      <video
        ref={videoRef}
        src={tile.videoUrl}
        poster={tile.poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-900 ease-out-expo"
      />
      <Image
        src={tile.poster}
        alt={tile.title}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover pointer-events-none opacity-0 group-hover:opacity-0 transition-opacity"
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
        <span className="font-sans text-[10px] tracking-[0.14em] text-white uppercase font-medium">
          {tile.title}
        </span>
      </div>
    </div>
  );
}
