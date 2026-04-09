'use client';

import CountUp from '@/components/ui/CountUp';
import { IMAGES } from '@/data/images';
import { heroData } from '@/data/content';

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden bg-neutral-800" id="hero">
      {/* Background image — CSS only, no ParallaxImage */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero.soccerField}
          alt="은평구립축구장"
          loading="eager"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.65))' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 lg:px-12 pt-16">
        <div className="text-center max-w-3xl mx-auto">
          {/* Label */}
          <span
            className="hero-anim inline-block text-[12px] tracking-[0.2em] uppercase text-white/50 mb-6"
            style={{ animationDelay: '0.2s', fontFamily: 'var(--font-serif)' }}
          >
            {heroData.badge}
          </span>

          {/* Title */}
          <h1
            className="hero-anim heading-serif text-[clamp(2.8rem,7vw,5.5rem)] leading-[1.08] text-white mb-5"
            style={{ animationDelay: '0.4s' }}
          >
            은평구시설관리공단
            <br />
            <span className="text-white/60">기관변천사</span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-anim text-[15px] sm:text-[17px] text-white/60 leading-relaxed max-w-[420px] mx-auto mb-12 whitespace-pre-line"
            style={{ animationDelay: '0.6s' }}
          >
            {heroData.subtitle}
          </p>

          {/* Divider */}
          <div
            className="hero-anim-scale w-16 h-px bg-white/30 mx-auto mb-12 origin-center"
            style={{ animationDelay: '0.8s' }}
          />

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 sm:gap-14">
            {heroData.stats.map((stat, i) => (
              <div
                key={i}
                className="hero-anim text-center"
                style={{ animationDelay: `${1.0 + i * 0.1}s` }}
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
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="hero-anim-fade absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{ animationDelay: '1.6s' }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">Scroll</span>
          <div className="w-px h-10 bg-white/30 scroll-line-anim" />
        </div>
      </div>
    </section>
  );
}
