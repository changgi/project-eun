'use client';

import ParallaxImage from '@/components/ui/ParallaxImage';
import SplitTextReveal from '@/components/ui/SplitTextReveal';
import { IMAGES } from '@/data/images';

export default function VideoSection() {
  return (
    <section className="relative">
      <ParallaxImage
        src={IMAGES.facilities.climbingWall}
        alt="은평 인공암벽장"
        speed={0.2}
        className="h-screen w-full"
        overlay
        overlayOpacity={0.5}
      >
        <div className="flex flex-col items-center justify-center h-screen px-6 text-center">
          <SplitTextReveal
            text="도전과 성장의 20년"
            as="h2"
            className="heading-serif text-[clamp(2.5rem,7vw,5rem)] leading-[1.1] text-white mb-6"
            splitType="words"
            stagger={0.08}
            duration={1}
          />
          <p className="heading-serif text-base sm:text-lg italic text-white/60 tracking-wide">
            Challenge &amp; Growth
          </p>
        </div>
      </ParallaxImage>
    </section>
  );
}
