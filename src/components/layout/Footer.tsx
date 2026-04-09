'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import Marquee from '@/components/ui/Marquee';
import { footerData } from '@/data/content';

export default function Footer() {
  const brandRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!brandRef.current || !infoRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(brandRef.current!, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: brandRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(infoRef.current!.children, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }, infoRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-surface-dark">
      {/* Top Marquee */}
      <Marquee
        text="EUNPYEONG FACILITY MANAGEMENT CORPORATION"
        className="text-sm font-medium text-white/10 py-4 tracking-wider uppercase"
        speed={40}
      />

      <div className="py-16 lg:py-20 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Brand name */}
          <div ref={brandRef} className="mb-10">
            <h3 className="heading-serif text-2xl sm:text-3xl text-white">
              {footerData.brand}
            </h3>
          </div>

          {/* Info */}
          <div ref={infoRef} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-xs text-white/50 leading-relaxed">
              {footerData.address}
            </p>
            <p className="text-xs text-white/50">
              {footerData.date}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
