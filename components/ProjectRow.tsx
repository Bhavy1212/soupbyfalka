"use client";

import Image from 'next/image';
import { RevealOnScroll } from './RevealOnScroll';
import { ProjectItem } from '@/data/projects';

export function ProjectRow({ project, index }: { project: ProjectItem; index: number }) {
  const isReverse = index % 2 === 1;

  return (
    <section className="py-12 sm:py-20 px-[var(--gutter)] border-t border-[var(--color-line)] first:border-t-0">
      <div className="max-w-[var(--container-max)] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* Text Column */}
        <div
          className={`lg:col-span-4 flex flex-col justify-between space-y-6 lg:sticky lg:top-32 ${
            isReverse ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <RevealOnScroll delay={0.05}>
            <span className="font-sans text-[11px] tracking-[0.14em] uppercase text-ink/70 block mb-3 font-semibold">
              PROJECTS
            </span>
            <p className="font-sans text-[14px] sm:text-[15px] leading-[1.6] text-ink/80 mb-8 max-w-md">
              {project.description}
            </p>
            <a href={`#project-${project.slug}`} className="btn-outline">
              VIEW ALL PROJECTS
            </a>
          </RevealOnScroll>
        </div>

        {/* Media Column */}
        <div
          className={`lg:col-span-8 ${
            isReverse ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          {project.secondaryMedia ? (
            /* Multi-media side-by-side grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <RevealOnScroll delay={0.1}>
                <div className="media-swap image-reveal aspect-[4/5] w-full bg-black/5" data-parallax={index % 2 === 0 ? "0.05" : "-0.05"}>
                  <Image
                    src={project.media.src}
                    alt={project.media.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <p className="caption">{project.client}</p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <div className="media-swap image-reveal aspect-[16/10] w-full bg-black/5" data-parallax={index % 2 === 0 ? "0.04" : "-0.04"}>
                  <Image
                    src={project.secondaryMedia.src}
                    alt={project.secondaryMedia.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <p className="caption">{project.secondaryMedia.caption}</p>
              </RevealOnScroll>
            </div>
          ) : (
            /* Single large media card */
            <RevealOnScroll delay={0.1}>
              <div className="media-frame aspect-[16/9] sm:aspect-[16/10] w-full bg-black/5">
                <Image
                  src={project.media.src}
                  alt={project.media.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 65vw"
                  className="object-cover"
                />
              </div>
              <p className="caption">{project.client}</p>
            </RevealOnScroll>
          )}
        </div>

      </div>
    </section>
  );
}
