'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  children?: React.ReactNode;
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.2,
  className = '',
  overlay = false,
  overlayOpacity = 0.4,
  children,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !imgRef.current) return;
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -speed * 50 },
        {
          yPercent: speed * 50,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        data-fallback=""
        loading="lazy"
        decoding="async"
        className="w-full h-[120%] object-cover absolute inset-0"
        style={{ top: '-10%' }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      {overlay && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,${overlayOpacity * 0.3}), rgba(0,0,0,${overlayOpacity}))`,
          }}
        />
      )}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
