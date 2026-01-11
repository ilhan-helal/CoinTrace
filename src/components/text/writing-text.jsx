'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function WritingText({
  text,
  spacing = '0.5rem',
  inView = true,
  className = '',
  transition = { type: 'spring', bounce: 0, duration: 0.5, delay: 0.1 },
}) {
  const words = text.split(' ');

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...transition, delay: transition.delay + index * 0.2 }}
          style={{ marginRight: spacing }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
