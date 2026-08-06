"use client";

import { VIDEO_GRID_TILES } from '@/data/videoGrid';
import { VideoTile } from './VideoTile';
import { RevealOnScroll } from './RevealOnScroll';

export function VideoGrid() {
  return (
    <section className="w-full bg-ink py-2" id="grid">
      <RevealOnScroll className="w-full">
        <div className="video-grid w-full">
          {VIDEO_GRID_TILES.map((tile, i) => (
            <VideoTile key={tile.id} tile={tile} index={i} />
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
