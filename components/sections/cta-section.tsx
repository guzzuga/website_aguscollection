'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { siteConfig } from '@/constants/site';
import { WhatsAppButton } from '@/components/ui/whatsapp-button';
import { Button } from '@/components/ui/button';
import { fadeUp, staggerContainer } from '@/animations/variants';

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="pointer-events-none absolute -bottom-20 right-10 h-72 w-72 rounded-full bg-gold/10 blur-[100px]"
      />

      <div className="container-page relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="label-eyebrow inline-flex items-center gap-2 text-gold-300"
          >
            <span className="h-px w-6 bg-current opacity-60" />
            Mulai Sekarang
            <span className="h-px w-6 bg-current opacity-60" />
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-5 text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl"
          >
            Siap Membantu Membuat
            <br />
            <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent">
              Seragam Berkualitas?
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-base leading-[1.7] text-slate-300 text-pretty sm:text-lg"
          >
            Konsultasikan kebutuhan seragam Anda sekarang juga. Tim kami siap
            membantu dari desain hingga produksi — gratis!
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <WhatsAppButton variant="cta" message={`Halo ${siteConfig.name}, saya ingin konsultasi gratis.`} />
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-white/5 px-8 text-base text-white backdrop-blur hover:border-gold/40 hover:bg-white/10 hover:text-gold-300 sm:w-auto"
            >
              <a href={`tel:+${siteConfig.whatsappAdmin1}`}>
                <Phone className="mr-2 h-5 w-5" />
                Telepon Kami
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
