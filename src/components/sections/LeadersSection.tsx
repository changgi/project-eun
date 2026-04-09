'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { leadersData } from '@/data/content';

export default function LeadersSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!headerRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current!.children, {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      const cards = gridRef.current!.querySelectorAll('.leader-card');
      ScrollTrigger.batch(cards, {
        start: 'top 88%',
        onEnter: (batch) => {
          gsap.from(batch, { opacity: 0, y: 30, duration: 0.6, stagger: 0.08, ease: 'power3.out' });
        },
        once: true,
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="leaders" className="py-28 lg:py-40 px-6 lg:px-12 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 lg:mb-20">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-brand-muted block mb-4">
            LEADERSHIP
          </span>
          <h2 className="heading-serif text-[clamp(2rem,4vw,3.5rem)] text-brand">
            역대 이사장
          </h2>
        </div>

        {/* Leaders — Horizontal Timeline Style */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-0 border-t border-surface-border">
          {leadersData.map((leader, i) => {
            const isCurrent = leader.current;
            return (
              <div
                key={i}
                className={`leader-card border-b border-r border-surface-border py-8 px-4 text-center transition-colors duration-300 ${
                  isCurrent ? 'bg-surface-dark' : 'bg-white hover:bg-surface-soft'
                }`}
              >
                {/* 기수 */}
                <p
                  className="text-[10px] font-medium tracking-[0.12em] uppercase mb-4"
                  style={{ color: isCurrent ? 'rgba(255,255,255,0.45)' : '#999999' }}
                >
                  {leader.gen}
                </p>

                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center heading-serif text-lg"
                  style={{
                    backgroundColor: isCurrent ? 'rgba(255,255,255,0.12)' : '#f5f3f0',
                    color: isCurrent ? '#ffffff' : '#222222',
                  }}
                >
                  {leader.initial}
                </div>

                {/* Name */}
                <h3
                  className="text-[15px] font-medium mb-1"
                  style={{ color: isCurrent ? '#ffffff' : '#222222' }}
                >
                  {leader.name}
                </h3>

                {/* Period */}
                <p
                  className="text-[11px] leading-snug"
                  style={{ color: isCurrent ? 'rgba(255,255,255,0.4)' : '#999999' }}
                >
                  {leader.period}
                </p>

                {/* Current badge */}
                {isCurrent && (
                  <span className="inline-block mt-3 text-[9px] font-medium tracking-[0.12em] uppercase px-2.5 py-0.5 border border-white/20 text-white/70">
                    현직
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
