'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { testimonials } from '@/constants/site';
import { cn } from '@/lib/utils';

const AUTO_SLIDE_MS = 6000;

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const id = setInterval(() => paginate(1), AUTO_SLIDE_MS);
    return () => clearInterval(id);
  }, [paginate]);

  const active = testimonials[index];

  return (
    <section id="testimoni" className="py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimoni"
          title="Apa Kata Pelanggan Kami"
          description="Lebih dari 500 pelanggan telah mempercayakan kebutuhan seragam mereka kepada Agus Collection."
          dark
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="relative min-h-[20rem] overflow-hidden rounded-3xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-soft-lg sm:p-12 lg:min-h-[18rem]">
            <Quote className="absolute right-8 top-8 h-16 w-16 text-slate-100 dark:text-neutral-800" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-5 w-5',
                        i < active.rating
                          ? 'fill-gold-400 text-gold-400'
                          : 'fill-slate-200 text-slate-200 dark:fill-neutral-800 dark:text-neutral-800',
                      )}
                    />
                  ))}
                </div>

                <p className="mt-6 text-lg leading-[1.7] text-slate-700 dark:text-neutral-300 text-pretty sm:text-xl">
                  &ldquo;{active.review}&rdquo;
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <span className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-gold/30">
                    <Image src={active.avatar} alt={active.name} fill sizes="48px" className="object-cover" />
                  </span>
                  <div>
                    <p className="font-bold text-navy dark:text-white">{active.name}</p>
                    <p className="text-sm text-slate-500 dark:text-neutral-500">{active.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => paginate(-1)}
              aria-label="Sebelumnya"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-navy dark:text-white transition-all hover:border-gold hover:bg-gold/5 dark:hover:bg-gold/10 hover:text-gold-700 dark:hover:text-gold"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Testimoni ${i + 1}`}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    i === index ? 'w-8 bg-gold-gradient dark:bg-gold' : 'w-2 bg-slate-300 dark:bg-neutral-700 hover:bg-slate-400 dark:hover:bg-neutral-600',
                  )}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              aria-label="Berikutnya"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-navy dark:text-white transition-all hover:border-gold hover:bg-gold/5 dark:hover:bg-gold/10 hover:text-gold-700 dark:hover:text-gold"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
