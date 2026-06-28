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
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex items-center justify-center"
          >
            <Sparkles className="h-4 w-4" />
          </motion.span>
          <span className="h-px w-6 bg-current opacity-60" />
          {eyebrow}
          <span className="h-px w-6 bg-current opacity-60" />
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
            'text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl',
            dark ? 'text-white' : 'heading-gradient',
            titleClassName,
          )}
        >
          {title}
        </h2>
        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'absolute -bottom-2 left-1/2 h-0.5 w-48 -translate-x-1/2',
            'bg-gradient-to-r from-transparent via-gold-400 to-transparent',
            'opacity-60',
          )}
        />
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
