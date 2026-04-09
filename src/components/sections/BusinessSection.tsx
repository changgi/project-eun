'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { businessTabs } from '@/data/content';

export default function BusinessSection() {
  const [activeTab, setActiveTab] = useState('parking');
  const headerRef = useRef<HTMLDivElement>(null);

  const currentTab = businessTabs.find((tab) => tab.id === activeTab);

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

        {/* Tab Buttons — text tab style */}
        <div className="flex flex-wrap gap-6 mb-14 border-b border-surface-border">
          {businessTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative pb-3 text-[13px] font-medium transition-colors duration-200"
                style={{
                  color: isActive ? '#222222' : '#999999',
                }}
              >
                {tab.label}
                <span
                  className="absolute bottom-0 left-0 right-0 transition-opacity duration-200"
                  style={{
                    height: '2px',
                    backgroundColor: '#222222',
                    opacity: isActive ? 1 : 0,
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {currentTab && (
            <motion.div
              key={currentTab.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {currentTab.items.map((item, i) => (
                <motion.div
                  key={`${currentTab.id}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 bg-white px-5 py-4 border border-surface-border transition-all duration-200 hover:border-brand-muted cursor-default"
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span className="text-sm font-medium text-brand-light">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
