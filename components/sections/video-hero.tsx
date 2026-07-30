"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";

interface VideoHeroProps {
  mobileVideo: string; // path untuk mobile (vertical 1080x1920)
  desktopVideo: string; // path untuk desktop (horizontal 1920x1080)
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
  const videoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  return (
    <section
      ref={videoRef}
      className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden bg-black"
    >
      {/* === VIDEO LAYER === */}
      <div className="absolute inset-0">
        {/* Desktop Video (horizontal 1920x1080) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
        >
          <source src={desktopVideo} type="video/mp4" />
        </video>

        {/* Mobile Video (vertical 1080x1920) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover md:hidden"
        >
          <source src={mobileVideo} type="video/mp4" />
        </video>
      </div>

      {/* === OVERLAY LAYER === */}
      {/* Gradient bottom fade (seperti PayBox) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[45%] bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Subtle dark overlay untuk readability */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-black/20" />

      {/* === CONTENT LAYER === */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        {/* Eyebrow label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-widest text-white/80 uppercase backdrop-blur-sm"
        >
          Konveksi Premium Nusantara
        </motion.span>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg md:max-w-2xl"
        >
          {subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
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
            {/* Animated sheen */}
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.35) 55%, transparent 75%)',
                backgroundSize: '200% 100%',
                animation: 'sheen 2s ease-in-out infinite',
              }}
            />
            {/* Inner border glow */}
            <span className="absolute inset-0 rounded-full border border-white/30 pointer-events-none" />
            
            <span className="relative z-10 flex items-center gap-2.5">
              {ctaText}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </a>
        </motion.div>

        {/* SCROLL INDICATOR */}
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

        <style jsx>{`
          @keyframes heroGradient {
            0%   { background-position: 0%   50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0%   50%; }
          }
          @keyframes sheen {
            0%   { background-position: 200% 0%; }
            100% { background-position: -200% 0%; }
          }
        `}</style>
      </motion.div>
    </section>
  );
}
