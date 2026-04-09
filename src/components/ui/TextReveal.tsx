'use client';

import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function TextReveal({
  text,
  className = '',
  delay = 0,
}: TextRevealProps) {
  const lines = text.split('\n');

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delayChildren: delay }}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split(' ').map((word, wordIndex) => (
            <motion.span
              key={`${lineIndex}-${wordIndex}`}
              variants={wordVariants}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}
