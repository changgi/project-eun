'use client';

import { useRef, useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryData } from '@/data/content';

export default function GallerySection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!headerRef.current || !gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current!.children, {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
      const cards = gridRef.current!.querySelectorAll('.gallery-tile');
      gsap.from(cards, {
        opacity: 0, scale: 0.97, duration: 0.5, stagger: 0.04, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % galleryData.length);
  }, [lightboxIndex]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + galleryData.length) % galleryData.length);
  }, [lightboxIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, goNext, goPrev]);

  // 5열 x 2행 = 10칸, 빈 공간 없이 꽉 채움
  // 행 높이를 고정하여 모든 타일이 빈틈 없이 채워지도록 함
  return (
    <section id="gallery" className="py-28 lg:py-40 px-6 lg:px-12 bg-surface-soft">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-10 lg:mb-14">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-brand-muted block mb-4">
            GALLERY
          </span>
          <h2 className="heading-serif text-[clamp(2rem,4vw,3.5rem)] text-brand">
            시설 갤러리
          </h2>
        </div>

        {/* Dense Grid — no gaps, all cells filled */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[2px]"
        >
          {galleryData.map((item, i) => (
            <div
              key={i}
              className="gallery-tile relative overflow-hidden cursor-pointer group"
              style={{ aspectRatio: '4/3' }}
              onClick={() => openLightbox(i)}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                data-fallback=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.style.background = '#e8e5e1';
                  el.style.minHeight = '100%';
                }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                <div className="p-3 lg:p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[12px] font-medium text-white">
                    {item.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90" onClick={closeLightbox} />

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              className="relative z-10 max-w-[90vw] max-h-[85vh]"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={galleryData[lightboxIndex].src}
                alt={galleryData[lightboxIndex].alt}
                className="max-w-full max-h-[85vh] object-contain"
              />
              <p className="text-center text-sm text-white/70 mt-4">
                {galleryData[lightboxIndex].title}
                <span className="text-white/40 ml-3 text-xs">
                  {lightboxIndex + 1} / {galleryData.length}
                </span>
              </p>
            </motion.div>

            {/* Prev */}
            <button
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="이전"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Next */}
            <button
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="다음"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Close */}
            <button
              className="absolute top-4 lg:top-8 right-4 lg:right-8 z-20 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              onClick={closeLightbox}
              aria-label="닫기"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
