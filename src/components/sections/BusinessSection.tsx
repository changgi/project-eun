'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from '@/lib/gsap';
import { businessTabs } from '@/data/content';
import { IMAGES } from '@/data/images';

// 각 탭의 대표 이미지
const tabImages: Record<string, string> = {
  parking: IMAGES.parking.resident,
  sports: IMAGES.facilities.soccerField,
  facility: IMAGES.facilities.gymExterior,
};

export default function BusinessSection() {
  const [activeTab, setActiveTab] = useState('parking');
  const headerRef = useRef<HTMLDivElement>(null);

  const currentTab = businessTabs.find((tab) => tab.id === activeTab);

  useLayoutEffect(() => {
    if (!headerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current!.children, {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
    }, headerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="business" className="py-28 lg:py-40 px-6 lg:px-12 bg-surface-soft">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 lg:mb-20">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-brand-muted block mb-4">
            BUSINESS
          </span>
          <h2 className="heading-serif text-[clamp(2rem,4vw,3.5rem)] text-brand">
            사업현황
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-6 mb-10 border-b border-surface-border">
          {businessTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative pb-3 text-[14px] font-medium transition-colors duration-200"
                style={{ color: isActive ? '#222222' : '#999999' }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = '#555555'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = '#999999'; }}
              >
                {tab.label}
                <span
                  className="absolute bottom-0 left-0 right-0 transition-opacity duration-200"
                  style={{ height: '2px', backgroundColor: '#222222', opacity: isActive ? 1 : 0 }}
                />
              </button>
            );
          })}
        </div>

        {/* Tab Content — Image + List Layout */}
        <AnimatePresence mode="wait">
          {currentTab && (
            <motion.div
              key={currentTab.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden"
              style={{ minHeight: '400px' }}
            >
              {/* Left: Image */}
              <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto">
                <img
                  src={tabImages[currentTab.id]}
                  alt={currentTab.label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.background = '#e8e5e1';
                  }}
                />
                {/* Subtle overlay with tab name */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6 lg:p-8">
                  <h3 className="heading-serif text-xl lg:text-2xl text-white">
                    {currentTab.label}
                  </h3>
                </div>
              </div>

              {/* Right: Items list */}
              <div className="bg-white flex flex-col justify-center p-6 lg:p-10">
                <div className="space-y-0 divide-y divide-surface-border">
                  {currentTab.items.map((item, i) => (
                    <motion.div
                      key={`${currentTab.id}-${i}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      <span className="text-xl flex-shrink-0 w-8 text-center">{item.icon}</span>
                      <span className="text-[15px] font-medium text-brand">
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
