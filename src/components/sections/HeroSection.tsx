'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { motion } from 'framer-motion';
import ParallaxImage from '@/components/ui/ParallaxImage';
import CountUp from '@/components/ui/CountUp';
import { IMAGES } from '@/data/images';
import { heroData } from '@/data/content';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      if (badgeRef.current) {
        tl.fromTo(badgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0);
      }
      if (titleRef.current) {
        tl.fromTo(titleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.2);
      }
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);
      }
      if (dividerRef.current) {
        tl.fromTo(dividerRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: 'power3.out' }, 0.9);
      }
      if (statsRef.current) {
        tl.fromTo(statsRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, 1.0);
      }
      if (scrollHintRef.current) {
        tl.fromTo(scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 }, 1.5);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden" id="hero">
      {/* Background */}
      <ParallaxImage
        src={IMAGES.hero.soccerField}
        alt="은평구립축구장"
        speed={0.15}
        className="absolute inset-0 w-full h-full"
        overlay
        overlayOpacity={0.6}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 lg:px-12 pt-16">
        <div className="text-center max-w-3xl mx-auto">
          {/* Label */}
          <span
            ref={badgeRef}
            className="inline-block text-[12px] tracking-[0.2em] uppercase text-white/50 mb-6 opacity-0"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {heroData.badge}
          </span>

          {/* Title */}
          <h1
            ref={titleRef}
            className="heading-serif text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.08] text-white mb-5 opacity-0"
          >
            은평구시설관리공단
            <br />
            <span className="text-white/60">기관변천사</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-[15px] sm:text-[17px] text-white/60 leading-relaxed max-w-[420px] mx-auto mb-12 opacity-0"
          >
            {heroData.subtitle}
          </p>

          {/* Divider */}
          <div
            ref={dividerRef}
            className="w-16 h-px bg-white/30 mx-auto mb-12 origin-center"
            style={{ transform: 'scaleX(0)' }}
          />

          {/* Stats */}
          <div ref={statsRef} className="flex flex-wrap justify-center gap-10 sm:gap-14">
            {heroData.stats.map((stat, i) => (
              <div key={i} className="text-center opacity-0">
                <div className="text-3xl sm:text-[2.5rem] font-light text-white tabular-nums leading-none">
                  <CountUp end={stat.value} />
                  <span className="text-base font-normal text-white/40 ml-0.5">
                    {stat.unit}
                  </span>
                </div>
                <p className="text-[10px] text-white/40 mt-2 tracking-[0.15em] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div ref={scrollHintRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">Scroll</span>
          <motion.div
            className="w-px h-10 bg-white/30"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </div>
      </div>
    </section>
  );
}
