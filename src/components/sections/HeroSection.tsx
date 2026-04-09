'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { motion } from 'framer-motion';
import ParallaxImage from '@/components/ui/ParallaxImage';
import SplitTextReveal from '@/components/ui/SplitTextReveal';
import CountUp from '@/components/ui/CountUp';
import { IMAGES } from '@/data/images';
import { heroData } from '@/data/content';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          0
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          0.8
        );
      }

      if (statsRef.current) {
        tl.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
          1.0
        );
      }

      if (scrollHintRef.current) {
        tl.fromTo(
          scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          1.6
        );
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
        overlayOpacity={0.45}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 lg:px-12 pt-16">
        <div className="text-center max-w-3xl mx-auto">
          {/* Label */}
          <span
            ref={badgeRef}
            className="inline-block heading-serif text-[13px] tracking-[0.15em] text-white/60 mb-8 opacity-0"
          >
            {heroData.badge}
          </span>

          {/* Title */}
          <SplitTextReveal
            text={heroData.title}
            as="h1"
            className="heading-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] text-white mb-6"
            splitType="words"
            stagger={0.06}
            duration={0.9}
            delay={0.4}
            start="top 100%"
          />

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-[16px] text-white/70 leading-relaxed max-w-[400px] mx-auto mb-16 opacity-0"
          >
            {heroData.subtitle}
          </p>

          {/* Stats */}
          <div ref={statsRef} className="flex flex-wrap justify-center gap-12 sm:gap-16">
            {heroData.stats.map((stat, i) => (
              <div key={i} className="text-center opacity-0">
                <div className="text-3xl sm:text-4xl font-light text-white tabular-nums">
                  <CountUp end={stat.value} />
                  <span className="text-lg font-normal text-white/50 ml-0.5">
                    {stat.unit}
                  </span>
                </div>
                <p className="text-[11px] text-white/50 mt-1.5 tracking-[0.1em] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint line */}
        <div ref={scrollHintRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0">
          <motion.div
            className="w-px h-12 bg-white/40"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </div>
      </div>
    </section>
  );
}
