'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { processSteps } from '@/constants/site';
import { cn } from '@/lib/utils';

export function ProcessTimeline() {
  return (
    <section id="proses" className="relative overflow-hidden bg-slate-50/50 py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Alur Pemesanan"
          title="6 Langkah Mudah Pesan Seragam"
          description="Proses yang jelas dan transparan dari konsultasi hingga produk tiba di tangan Anda."
        />

        <div className="relative mt-16">
          {/* Horizontal progress line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-0.5 bg-slate-200 lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="h-full origin-left bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600"
            />
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {processSteps.map((step, i) => {
              const Icon = (Icons[step.icon as keyof typeof Icons] as LucideIcon) ?? Icons.Circle;
              return (
                <motion.div
                  key={step.no}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                  {/* Node */}
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white shadow-soft transition-all duration-300 hover:border-gold hover:shadow-gold-glow">
                    <Icon className="h-6 w-6 text-navy" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold-gradient text-[10px] font-bold text-navy shadow-gold-glow">
                      {step.no}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {step.description}
                  </p>

                  {/* Vertical connector (mobile) */}
                  {i < processSteps.length - 1 && (
                    <span className="absolute left-1/2 top-14 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-gold/40 to-transparent lg:hidden" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
