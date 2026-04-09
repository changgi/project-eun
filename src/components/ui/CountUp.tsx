'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/useInView';

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
}

export default function CountUp({
  end,
  duration = 2000,
  className = '',
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}
    </span>
  );
}
