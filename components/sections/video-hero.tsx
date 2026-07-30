"use client";

import { useRef } from "react";
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
            className="group relative inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-white/95 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            {ctaText}
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* === SCROLL INDICATOR === */}
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
    </section>
  );
}
