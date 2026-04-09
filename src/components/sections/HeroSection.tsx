'use client';

import { motion } from 'framer-motion';
import ParallaxImage from '@/components/ui/ParallaxImage';
import CountUp from '@/components/ui/CountUp';
import { IMAGES } from '@/data/images';
import { heroData } from '@/data/content';

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden" id="hero">
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
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="inline-block text-[12px] tracking-[0.2em] uppercase text-white/50 mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {heroData.badge}
          </motion.span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="heading-serif text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.08] text-white mb-5"
          >
            은평구시설관리공단
            <br />
            <span className="text-white/60">기관변천사</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="text-[15px] sm:text-[17px] text-white/60 leading-relaxed max-w-[420px] mx-auto mb-12 whitespace-pre-line"
          >
            {heroData.subtitle}
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="w-16 h-px bg-white/30 mx-auto mb-12 origin-center"
          />

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 sm:gap-14">
            {heroData.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.0 + i * 0.1, ease }}
                className="text-center"
              >
                <div className="text-3xl sm:text-[2.5rem] font-light text-white tabular-nums leading-none">
                  <CountUp end={stat.value} />
                  <span className="text-base font-normal text-white/40 ml-0.5">
                    {stat.unit}
                  </span>
                </div>
                <p className="text-[10px] text-white/40 mt-2 tracking-[0.15em] uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">Scroll</span>
          <motion.div
            className="w-px h-10 bg-white/30"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
