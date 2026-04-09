'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import ParallaxImage from '@/components/ui/ParallaxImage';
import { overviewData } from '@/data/content';
import { IMAGES } from '@/data/images';

export default function OverviewSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!headerRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      // Header fade-up
      gsap.from(headerRef.current!.children, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Cards fade-up
      const cards = cardsRef.current!.querySelectorAll('.overview-card');
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="overview" className="bg-surface-soft">
      <div className="py-28 lg:py-40 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div ref={headerRef} className="mb-16 lg:mb-20">
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-brand-muted block mb-4">
              OVERVIEW
            </span>
            <h2 className="heading-serif text-[clamp(2rem,4vw,3.5rem)] text-brand">
              기관 개요
            </h2>
          </div>

          {/* Cards Grid 2x2 */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-surface-border"
          >
            {overviewData.map((item, i) => (
              <div
                key={i}
                className="overview-card bg-white p-10 border border-surface-border transition-colors duration-300 hover:bg-surface-soft"
              >
                <span className="text-2xl mb-6 block">{item.icon}</span>
                <h3 className="text-base font-medium text-brand mb-2">
                  {item.title}
                </h3>
                <p className="text-[14px] text-brand-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-bleed Image Interstitial */}
      <div className="full-bleed">
        <ParallaxImage
          src={IMAGES.facilities.poolExterior}
          alt="은평 수영장 외관"
          speed={0.2}
          className="h-[50vh] w-full"
          overlay
          overlayOpacity={0.45}
        >
          <div className="flex items-center justify-center h-[50vh]">
            <p className="heading-serif text-[clamp(1.5rem,4vw,2.5rem)] text-white/80 text-center px-6">
              은평구의 일상을 함께하는 20년
            </p>
          </div>
        </ParallaxImage>
      </div>
    </section>
  );
}
