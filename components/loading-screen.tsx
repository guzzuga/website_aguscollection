'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onFinish: () => void;
}

export function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2800);

    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      onFinish();
    }, 3200);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* ── Background ── */}
      {/* Deep radial gradient instead of transparent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black" />

      {/* Animated gold glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -right-48 -top-48 h-[32rem] w-[32rem] animate-pulse rounded-full bg-amber-500/[0.07] blur-[140px]"
          style={{ animationDuration: '3.2s' }}
        />
        <div
          className="absolute -left-40 -bottom-40 h-[28rem] w-[28rem] animate-pulse rounded-full bg-amber-400/[0.05] blur-[120px]"
          style={{ animationDuration: '4s', animationDelay: '1.2s' }}
        />
        {/* Subtle moving light beam */}
        <div
          className="absolute inset-0 animate-[shimmer_6s_ease-in-out_infinite]"
          style={{
            background: 'linear-gradient(120deg, transparent 30%, rgba(251,191,36,0.04) 50%, transparent 70%)',
          }}
        />
      </div>

      {/* Floating gold dust particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => {
          const size = 1 + (i % 3);
          const delay = (i * 0.22).toFixed(2);
          const duration = (3.5 + (i % 4) * 0.8).toFixed(1);
          return (
            <div
              key={i}
              className="absolute rounded-full bg-amber-400"
              style={{
                width: size,
                height: size,
                left: `${8 + (i * 4.4) % 84}%`,
                top: `${12 + (i * 6.1) % 76}%`,
                opacity: 0.15 + (i % 4) * 0.1,
                animation: `floatParticle ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                boxShadow: '0 0 6px 1px rgba(251,191,36,0.4)',
              }}
            />
          );
        })}
      </div>

      {/* ── Logo & Brand ── */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo container */}
        <div className="relative mb-6">
          {/* Outer ambient glow */}
          <div
            className="absolute -inset-6 rounded-full bg-amber-500/5 blur-3xl animate-pulse"
            style={{ animationDuration: '2.8s' }}
          />

          {/* Spinning double-ring */}
          <div className="absolute -inset-5 rounded-full border border-amber-500/10" />
          <div
            className="absolute -inset-7 rounded-full border border-transparent border-t-amber-400/40 border-r-amber-300/30"
            style={{ animation: 'spin 2s linear infinite' }}
          />
          <div
            className="absolute -inset-9 rounded-full border border-transparent border-b-amber-500/25 border-l-amber-400/20"
            style={{ animation: 'spin 3s linear infinite reverse' }}
          />

          {/* Inner ring glow */}
          <div className="absolute inset-0 rounded-full bg-amber-500/5 blur-xl" />

          {/* Logo circle */}
          <div className="relative h-44 w-44 overflow-hidden rounded-full border border-amber-500/20 bg-white/[0.03] p-7 shadow-2xl shadow-amber-500/10 backdrop-blur-xl">
            <Image
              src="/logo-loading.png"
              alt="AGUS COLLECTION"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* ── Brand Name + Subtitle side-by-side ── */}
        <div className="mb-10 flex flex-col items-center gap-3 text-center md:flex-row md:gap-8 md:justify-center">
          {/* Brand name */}
          <h1
            className="font-display text-3xl font-extrabold tracking-[0.15em] uppercase md:text-4xl opacity-0 animate-[brandReveal_1s_ease-out_0.4s_forwards]"
            style={{
              background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 25%, #FFEC8B 50%, #FFA500 75%, #FFD700 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'brandShimmer 3s ease-in-out infinite, brandReveal 1s ease-out 0.4s forwards',
            }}
          >
            AGUS COLLECTION
          </h1>

          {/* Vertical separator — hidden on mobile */}
          <div
            className="hidden h-8 w-px bg-gradient-to-b from-transparent via-amber-400/50 to-transparent md:block"
          />

          {/* Subtitle */}
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-300 md:text-sm opacity-0 animate-[brandReveal_1s_ease-out_0.65s_forwards]"
            style={{
              background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 30%, #fde68a 60%, #f59e0b 100%)',
              backgroundSize: '250% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'subtitleShimmer 4s ease-in-out infinite, brandReveal 1s ease-out 0.65s forwards',
            }}
          >
            Konveksi Premium Mojokerto
          </p>
        </div>

        {/* ── Elegant divider ── */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-500/40" />
          <div className="h-1 w-1 rounded-full bg-amber-500/50" />
          <div className="h-px w-24 bg-gradient-to-r from-amber-500/40 via-amber-400/20 to-transparent" />
          <div className="h-1 w-1 rounded-full bg-amber-500/50" />
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-500/40" />
        </div>

        {/* ── Progress Ring ── */}
        <div className="relative h-14 w-14">
          <svg className="h-full w-full animate-spin" viewBox="0 0 100 100">
            <circle
              className="text-zinc-800"
              strokeWidth="5"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
            <circle
              strokeWidth="5"
              strokeDasharray="264"
              strokeDashoffset="66"
              strokeLinecap="round"
              stroke="url(#goldGradient2)"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
              style={{ animation: 'progress 2.8s ease-out forwards' }}
            />
            <defs>
              <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#FFA500" />
                <stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center glow dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_2px_rgba(251,191,36,0.5)]" />
          </div>
        </div>

        {/* ── Loading Label ── */}
        <p
          className="mt-5 text-[10px] font-semibold tracking-[0.35em] uppercase opacity-0 animate-[brandReveal_1s_ease-out_0.9s_forwards]"
          style={{ color: '#d4a853' }}
        >
          Loading
        </p>
      </div>

      {/* ── Keyframe CSS ── */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes progress {
          from { stroke-dashoffset: 264; }
          to { stroke-dashoffset: 66; }
        }

        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.15;
          }
          50% {
            transform: translateY(-24px) translateX(8px);
            opacity: 0.7;
          }
        }

        @keyframes brandReveal {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Animated gradient shift for brand name */
        @keyframes brandShimmer {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }

        /* Slower shimmer for subtitle */
        @keyframes subtitleShimmer {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }

        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
