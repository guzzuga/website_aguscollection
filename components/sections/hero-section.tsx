'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Star, ShieldCheck, Sparkles } from 'lucide-react';
import { siteConfig } from '@/constants/site';
import { buildWhatsAppLink } from '@/utils/format';
import { Button } from '@/components/ui/button';
import { fadeUp, staggerContainer, viewportOnce } from '@/animations/variants';

const heroHighlights = [
  { icon: ShieldCheck, label: 'Gratis Konsultasi' },
  { icon: Sparkles, label: 'Gratis Desain' },
  { icon: Star, label: 'Pengiriman Seluruh Indonesia' },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy pt-24 lg:pt-28">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy via-navy-700 to-navy" />
      
      {/* Animated gold orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-20 top-10 h-96 w-96 rounded-full bg-gold/20 blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-gold/15 blur-[100px]"
      />
      
      {/* Floating particles - optimized for performance */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * 800,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [0, Math.random() * 0.5 + 0.3, 0],
              scale: [0, Math.random() * 0.5 + 0.5, 0],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
            className="absolute h-1 w-1 rounded-full bg-gold-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container-page relative pb-20 pt-10 lg:pb-28 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
              </span>
              <span className="label-eyebrow text-gold-300">Konveksi Premium Terpercaya</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Seragam Berkualitas,
              <br />
              <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent">
                Harga Pabrik Langsung
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-[1.7] text-slate-300 text-pretty sm:text-lg"
            >
              Melayani pembuatan seragam sekolah, seragam perusahaan, kaos custom,
              polo shirt, celana, almamater, wearpack, hingga bahan kain dengan
              kualitas premium dan pengerjaan tepat waktu.
            </motion.p>

            {/* Highlights */}
            <motion.ul
              variants={fadeUp}
              className="mt-7 flex flex-wrap gap-x-6 gap-y-3"
            >
              {heroHighlights.map((h) => (
                <li key={h.label} className="flex items-center gap-2 text-sm text-slate-200">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold/15 text-gold-300">
                    <h.icon className="h-4 w-4" />
                  </span>
                  {h.label}
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full bg-gold-gradient px-7 text-base text-navy shadow-gold-glow-lg transition-all hover:shadow-gold-glow"
              >
                <a
                  href={buildWhatsAppLink(
                    `Halo ${siteConfig.name}, saya ingin pesan sekarang.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Pesan Sekarang
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/20 bg-white/5 px-7 text-base text-white backdrop-blur hover:border-gold/40 hover:bg-white/10 hover:text-gold-300"
              >
                <a href="/produk">
                  Lihat Katalog
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>

            {/* Mini rating */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[
                  '/images/testimonials/budi-santoso.jpg',
                  '/images/testimonials/siti-rahayu.jpg',
                  '/images/testimonials/andi-wijaya.jpg',
                  '/images/testimonials/dewi-lestari.jpg',
                ].map((src, i) => (
                  <span
                    key={i}
                    className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-navy"
                  >
                    <Image
                      src={src}
                      alt="Klien"
                      fill
                      sizes="36px"
                      className="object-cover"
                      loading="eager"
                      decoding="async"
                      quality={75}
                    />
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="mt-0.5 text-xs text-slate-400">
                  <span className="font-semibold text-white">4.9/5</span> dari 500+ pelanggan puas
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — floating product image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
            >
              <Image
                src="/images/hero.jpg"
                alt="Produksi seragam premium Agus Collection"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                decoding="async"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
            </motion.div>

            {/* Floating badge cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -left-4 top-12 hidden rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl sm:block lg:-left-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient">
                  <ShieldCheck className="h-5 w-5 text-navy" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Gratis Konsultasi</p>
                  <p className="text-xs text-slate-300">& Gratis Desain</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute -right-4 bottom-16 hidden rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl sm:block lg:-right-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient">
                  <Sparkles className="h-5 w-5 text-navy" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Tepat Waktu</p>
                  <p className="text-xs text-slate-300">Quality Control</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
