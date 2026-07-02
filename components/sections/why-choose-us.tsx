'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { features } from '@/constants/site';
import { fadeUp, staggerContainer, viewportOnce } from '@/animations/variants';

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Keunggulan Kami"
          title="Mengapa Memilih Agus Collection?"
          description="Kami tidak hanya menjahit pakaian. Kami membangun kepercayaan dengan standar kualitas yang konsisten di setiap produk."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {features.map((feature) => {
            const Icon = (Icons[feature.icon as keyof typeof Icons] as LucideIcon) ?? Icons.Star;
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-soft transition-all duration-300 hover:border-gold/40 hover:shadow-soft-xl"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-gold/10" />
                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold-300 transition-all duration-300 group-hover:bg-gold-gradient group-hover:text-navy">
                    <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-navy">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
