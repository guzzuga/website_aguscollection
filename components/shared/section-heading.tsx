'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeUp, viewportOnce } from '@/animations/variants';
import { Sparkles } from 'lucide-react';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
  dark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  titleClassName,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={cn(
            'label-eyebrow inline-flex items-center gap-2',
            dark ? 'text-gold-300' : 'text-gold-600',
          )}
        >
          <span className="h-px w-4 sm:w-6 bg-current opacity-60" />
          {eyebrow}
          <span className="h-px w-4 sm:w-6 bg-current opacity-60" />
        </motion.span>
      )}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative"
      >
        <h2
          className={cn(
            'font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl',
            dark ? 'text-white' : 'heading-gradient',
            titleClassName,
          )}
        >
          {title}
        </h2>
        {/* Animated underline - Perfectly centered decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 flex justify-center"
        >
          <div
            className={cn(
              'h-[4px] w-[100px] rounded-full',
              'bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300',
              'opacity-80',
            )}
          />
        </motion.div>
      </motion.div>
      {description && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={cn(
            'max-w-2xl text-pretty text-base leading-[1.7] sm:text-lg',
            dark ? 'text-slate-300' : 'text-slate-600',
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
