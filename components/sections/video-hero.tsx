"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import LiquidGlassTitle from "@/components/ui/liquid-glass-title";

interface VideoHeroProps {
  mobileVideo: string;
  desktopVideo: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function VideoHero({
  mobileVideo,
  desktopVideo,
  title,
  subtitle,
  ctaText = "Lihat Katalog",
  ctaHref = "/produk",
}: VideoHeroProps) {
  /* ─── scroll fade — window-based (works on ALL viewports) ─── */
  const { scrollYProgress } = useScroll();
  const fade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /* ─── shared CTA buttons ─── */
  const PrimaryCTA = (
    <a
      href={ctaHref}
      className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-9 py-4 text-sm font-bold tracking-wide text-black transition-transform duration-300 hover:scale-105"
      style={{
        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FFEC8B 50%, #FFA500 75%, #FFD700 100%)',
        backgroundSize: '300% 300%',
        animation: 'heroGradient 4s ease-in-out infinite',
        boxShadow: '0 8px 32px rgba(251, 191, 36, 0.35), 0 0 0 1px rgba(255,255,255,0.1) inset',
      }}
    >
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.35) 55%, transparent 75%)',
          backgroundSize: '200% 100%',
          animation: 'sheen 2s ease-in-out infinite',
        }}
      />
      <span className="absolute inset-0 rounded-full border border-white/30 pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2.5">
        {ctaText}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
      </span>
    </a>
  );

  const SecondaryCTA = (
    <a
      href="/tentang"
      className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/20 bg-white/5 px-9 py-4 text-sm font-bold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white/35"
      style={{
        backgroundSize: '300% 300%',
      }}
    >
      <span
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(255,165,0,0.05) 50%, rgba(255,215,0,0.08) 100%)',
          backgroundSize: '200% 200%',
          animation: 'heroGradient 4s ease-in-out infinite',
        }}
      />
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 48%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 52%, transparent 70%)',
          backgroundSize: '200% 100%',
          animation: 'sheen 3s ease-in-out infinite',
        }}
      />
      <span className="absolute inset-0 rounded-full border border-gold-400/20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400/80 group-hover:bg-gold-300 transition-colors" />
        Tentang Kami
        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </span>
    </a>
  );

  /* ─── shared scroll indicator ─── */
  const ScrollIndicator = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
      className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest text-white/50 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-[1px] bg-gradient-to-b from-white/50 to-transparent"
        />
      </div>
    </motion.div>
  );

  /* ─── shared style tag ─── */
  const HeroStyles = (
    <style jsx global>{`
      @keyframes heroGradient {
        0%   { background-position: 0%   50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0%   50%; }
      }
      @keyframes sheen {
        0%   { background-position: 200% 0%; }
        100% { background-position: -200% 0%; }
      }
      @keyframes heroFadeUp {
        0%   { opacity: 0; transform: translateY(40px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  );

  /* ─────────────────────────────────────────────────────
   *  MOBILE HERO — simple flex, fade on scroll (window)
   * ───────────────────────────────────────────────────── */
  const MobileHero = (
    <section className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden bg-black md:hidden">
      {/* Mobile Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={mobileVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-black/20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[45%] bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content — always visible, fade on window scroll */}
      <motion.div style={{ opacity: fade }} className="relative z-20 flex h-full flex-col items-center justify-center gap-3 overflow-y-auto px-6 text-center py-20">
        <div className="mb-4 flex-shrink-0">
          <LiquidGlassTitle text="AGUS COLLECTION" />
        </div>
        <h1 className="mx-auto mb-2 w-full max-w-lg flex-shrink-0 font-display text-3xl font-bold leading-[1.1] tracking-[-0.03em] bg-gradient-to-br from-white via-white/95 to-white/70 bg-clip-text sm:text-4xl md:text-5xl">
          Konveksi Premium Berkualitas
        </h1>
        <p className="mx-auto mb-6 max-w-sm flex-shrink-0 text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
          {subtitle}
        </p>
        <div className="flex w-full flex-col items-center gap-4 flex-shrink-0">
          {PrimaryCTA}
          {SecondaryCTA}
        </div>
      </motion.div>

      {HeroStyles}
    </section>
  );

  /* ─────────────────────────────────────────────────────
   *  DESKTOP HERO — parallax fade on window scroll
   * ───────────────────────────────────────────────────── */
  const DesktopHero = (
    <section className="relative hidden h-screen max-h-[1000px] overflow-hidden bg-black md:block">
      {/* Desktop Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={desktopVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-black/20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[45%] bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* AGUS COLLECTION — fixed top area */}
      <div className="absolute left-0 top-0 z-30 w-full flex items-start justify-center pt-[16vh]">
        <div
          style={{
            animation: 'heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both',
          }}
        >
          <LiquidGlassTitle text="AGUS COLLECTION" />
        </div>
      </div>

      {/* Content — centered below AGUS COLLECTION */}
      <motion.div style={{ opacity: fade }} className="relative z-20 flex h-full flex-col items-center justify-center pt-[24vh] px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-4 w-full max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-center text-transparent bg-gradient-to-br from-white via-white/95 to-white/70 bg-clip-text sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Konveksi Premium Berkualitas
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg md:max-w-2xl"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
        >
          {PrimaryCTA}
          {SecondaryCTA}
        </motion.div>
        {ScrollIndicator}
      </motion.div>

      {HeroStyles}
    </section>
  );

  return (
    <>
      {MobileHero}
      {DesktopHero}
    </>
  );
}
