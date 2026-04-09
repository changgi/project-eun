'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { featuresData } from '@/data/content';

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header fade-up
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
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
      }

      const totalItems = featuresData.length;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const idx = Math.min(
            Math.floor(progress * totalItems),
            totalItems - 1
          );
          setActiveIndex(idx);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentFeature = featuresData[activeIndex];

  return (
    <section ref={sectionRef} id="features" className="h-screen relative overflow-hidden bg-white">
      <div className="flex flex-col justify-center h-full px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto w-full relative">
          {/* Section label */}
          <div ref={headerRef} className="mb-12">
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-brand-muted block mb-4">
              INSIGHTS
            </span>
            <h2 className="heading-serif text-[clamp(2rem,4vw,3.5rem)] text-brand">
              기관변천 특징
            </h2>
          </div>

          {/* Watermark Number */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none">
            <span
              className="text-[clamp(10rem,25vw,20rem)] font-bold leading-none text-warm-200 transition-all duration-500"
              key={activeIndex}
            >
              {currentFeature.num}
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-xl">
            <div className="mb-8">
              <span className="text-sm font-mono text-brand font-medium">
                {currentFeature.num}
              </span>
              <span className="text-sm text-brand-muted font-mono mx-2">/</span>
              <span className="text-sm font-mono text-brand-muted">
                0{featuresData.length}
              </span>
            </div>

            <div key={activeIndex} className="transition-opacity duration-500">
              <h3 className="heading-serif text-2xl sm:text-3xl text-brand mb-4 leading-snug">
                {currentFeature.title}
              </h3>
              <p className="text-base text-brand-light leading-relaxed">
                {currentFeature.desc}
              </p>
            </div>

            {/* Progress bars */}
            <div className="flex gap-2 mt-12">
              {featuresData.map((_, i) => (
                <div
                  key={i}
                  className="h-1 transition-all duration-300"
                  style={{
                    width: i === activeIndex ? '32px' : '8px',
                    backgroundColor: i === activeIndex ? '#222222' : '#e0ddd8',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
