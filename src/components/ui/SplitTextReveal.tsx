'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface SplitTextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  splitType?: 'words' | 'chars';
  stagger?: number;
  duration?: number;
  delay?: number;
  scrub?: boolean;
  start?: string;
}

export default function SplitTextReveal({
  text,
  as: Tag = 'div',
  className = '',
  splitType = 'words',
  stagger = 0.04,
  duration = 0.8,
  delay = 0,
  scrub = false,
  start = 'top 85%',
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = containerRef.current;
    const original = el.innerHTML;

    // Manual split (avoid GSAP SplitText license issues)
    const lines = text.split('\n');
    el.innerHTML = lines
      .map((line) => {
        if (splitType === 'chars') {
          const chars = line.split('').map(
            (ch) =>
              ch === ' '
                ? ' '
                : `<span class="split-char" style="opacity:0;transform:translateY(40px)">${ch}</span>`
          );
          return `<span class="split-line">${chars.join('')}</span>`;
        }
        const words = line.split(/\s+/).map(
          (w) =>
            `<span class="split-word" style="opacity:0;transform:translateY(40px)">${w}</span>`
        );
        return `<span class="split-line">${words.join(' ')}</span>`;
      })
      .join('<br/>');

    const targets = el.querySelectorAll(splitType === 'chars' ? '.split-char' : '.split-word');

    const tl = gsap.timeline({
      scrollTrigger: scrub
        ? { trigger: el, start, end: 'bottom 60%', scrub: 1 }
        : { trigger: el, start, toggleActions: 'play none none none' },
      delay,
    });

    tl.to(targets, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      el.innerHTML = original;
    };
  }, [text, splitType, stagger, duration, delay, scrub, start]);

  return <Tag ref={containerRef as React.RefObject<HTMLElement & HTMLDivElement>} className={className}>{text}</Tag>;
}
