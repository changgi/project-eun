'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import ParallaxImage from '@/components/ui/ParallaxImage';
import { overviewData } from '@/data/content';
import { IMAGES } from '@/data/images';

// 각 개요 카드에 매핑할 배경 이미지
const cardImages = [
  IMAGES.facilities.gymExterior,
  IMAGES.facilities.poolExterior,
  IMAGES.hero.soccerField,
  IMAGES.facilities.climbingWall,
];

export default function OverviewSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!headerRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current!.children, {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      const cards = cardsRef.current!.querySelectorAll('.overview-card');
      gsap.from(cards, {
        opacity: 0, y: 50, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none none' },
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

          {/* Image Cards Grid — 2 large + 2 small */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {overviewData.map((item, i) => (
              <div
                key={i}
                className={`overview-card group relative overflow-hidden cursor-default ${
                  i < 2 ? 'aspect-[16/9]' : 'aspect-[16/7]'
                }`}
              >
                {/* Background image */}
                <img
                  src={cardImages[i]}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.background = '#e8e5e1';
                  }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 group-hover:from-black/80 transition-all duration-500" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-end h-full p-7 lg:p-9">
                  <span className="text-2xl mb-3">{item.icon}</span>
                  <h3 className="text-lg font-medium text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-white/70 leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-bleed Image Interstitial */}
      <div className="full-bleed">
        <ParallaxImage
          src={IMAGES.facilities.poolInterior}
          alt="은평 수영장 내부"
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
