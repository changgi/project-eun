'use client';

import { useState, useRef, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface Card3DProps {
  children: ReactNode;
  className?: string;
}

export default function Card3D({ children, className = '' }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl transition-colors duration-300 ${className}`}
      style={{
        perspective: '1000px',
        backgroundColor: 'var(--color-surface-card)',
        border: '1px solid rgba(59, 130, 246, 0.15)',
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        translateY: isHovered ? -4 : 0,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-300"
        style={{
          background: 'linear-gradient(90deg, #3b82f6, #06d6a0)',
          opacity: isHovered ? 1 : 0,
        }}
      />
      <div className="p-8">{children}</div>
    </motion.div>
  );
}
