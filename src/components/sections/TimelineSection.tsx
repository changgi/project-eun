'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { phases, timelineData } from '@/data/content';

export default function TimelineSection() {
  const [activePhase, setActivePhase] = useState(1);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const filteredItems = timelineData.filter((item) => item.phase === activePhase);

  useLayoutEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
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
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!timelineRef.current) return;

    const ctx = gsap.context(() => {
      const items = timelineRef.current!.querySelectorAll('.timeline-item');
      if (items.length === 0) return;

      gsap.from(items, {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, timelineRef);

    return () => ctx.revert();
  }, [activePhase]);

  return (
    <section id="timeline" className="py-28 lg:py-40 px-6 lg:px-12 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 lg:mb-20">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-brand-muted block mb-4">
            HISTORY
          </span>
          <h2 className="heading-serif text-[clamp(2rem,4vw,3.5rem)] text-brand">
            연혁
          </h2>
        </div>

        {/* Phase Filters — text tab style */}
        <div className="flex flex-wrap gap-6 mb-14 border-b border-surface-border">
          {phases.map((phase) => {
            const isActive = activePhase === phase.id;
            return (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className="relative pb-3 text-[13px] font-medium transition-colors duration-200"
                style={{
                  color: isActive ? '#222222' : '#999999',
                }}
              >
                {phase.label}
                {/* Active underline */}
                <span
                  className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-200"
                  style={{
                    backgroundColor: '#222222',
                    opacity: isActive ? 1 : 0,
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-surface-border" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div ref={timelineRef}>
                {filteredItems.map((item, i) => (
                  <div
                    key={`${item.phase}-${i}`}
                    className="timeline-item relative pl-8 pb-10 last:pb-0"
                  >
                    {/* Dot */}
                    <div
                      className="absolute left-0 top-1.5 -translate-x-1/2 rounded-full"
                      style={{
                        width: item.highlight ? '8px' : '6px',
                        height: item.highlight ? '8px' : '6px',
                        backgroundColor: item.highlight ? '#222222' : '#d4d0cb',
                      }}
                    />

                    <span className="text-[11px] font-medium text-brand-muted tracking-wide block mb-1">
                      {item.date}
                    </span>
                    <h4 className="text-base font-medium text-brand mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[14px] text-brand-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
