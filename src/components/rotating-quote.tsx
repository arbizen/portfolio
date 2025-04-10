'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quotes } from '@/data/quotes';
import { cn } from '@/lib/utils';

type RotatingQuoteProps = {
  interval?: number;
  className?: string;
};

export default function RotatingQuote({
  interval = 5000,
  className = '',
}: RotatingQuoteProps) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
      setCurrentQuoteIndex((prevIndex) => 
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className={cn("relative", className)}>      
      <AnimatePresence mode="wait">
        <motion.p
          key={key}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ 
            duration: 0.5,
            ease: "easeInOut"
          }}
          className={cn("italic", className)}
        >
          {quotes[currentQuoteIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
} 