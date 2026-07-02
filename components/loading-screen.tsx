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
    // Timeline: 2.5 detik total
    // 0-2.5s: Loading screen visible dengan animasi
    // 2.5-3.0s: Fade out
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2500);

    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      onFinish();
    }, 3000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-navy via-navy-800 to-navy-950 transition-opacity duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Animated Gold Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 animate-pulse rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute -left-32 -bottom-32 h-80 w-80 animate-pulse rounded-full bg-gold/15 blur-[100px]" style={{ animationDelay: '1s' }} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold-400"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 25}%`,
              opacity: 0.3 + (i % 3) * 0.2,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container with Glow */}
        <div className="relative mb-8">
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 animate-ping rounded-full bg-gold-gradient opacity-20 blur-xl" style={{ animationDuration: '2s' }} />
          
          {/* Middle Glow Ring */}
          <div className="absolute -inset-4 rounded-full bg-gold/10 blur-2xl" />

          {/* Logo Image Container */}
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-gold/30 bg-white/5 p-6 backdrop-blur-xl shadow-2xl shadow-gold/20">
            <Image
              src="/logo-loading.png"
              alt="AGUS COLLECTION Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Rotating Gold Ring */}
          <div className="absolute -inset-4 rounded-full border border-gold/20" />
          <div 
            className="absolute -inset-6 rounded-full border-2 border-transparent border-t-gold-400 border-r-gold-300"
            style={{
              animation: 'spin 1.5s linear infinite',
            }}
          />
          <div 
            className="absolute -inset-8 rounded-full border border-transparent border-b-gold-500 border-l-gold-400 opacity-50"
            style={{
              animation: 'spin 2s linear infinite reverse',
            }}
          />
        </div>

        {/* Brand Name */}
        <h1 
          className="mb-2 font-display text-3xl font-extrabold tracking-wide text-white text-balance opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          AGUS COLLECTION
        </h1>

        {/* Tagline */}
        <p 
          className="mb-8 text-sm font-medium tracking-wide text-gold-300/80 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          Konveksi Premium Berkualitas
        </p>

        {/* Loading Progress */}
        <div className="relative h-12 w-12">
          {/* Outer Ring */}
          <svg className="h-full w-full animate-spin" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              className="text-gold-900"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
            {/* Progress Circle */}
            <circle
              className="text-gold-gradient"
              strokeWidth="8"
              strokeDasharray="264"
              strokeDashoffset="66"
              strokeLinecap="round"
              stroke="url(#goldGradient)"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
              style={{
                animation: 'progress 2.5s ease-out forwards',
              }}
            />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#FFA500" />
                <stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
          </div>
        </div>

        {/* Loading Text */}
        <p 
          className="mt-4 text-xs font-medium tracking-widest text-slate-400 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
        >
          LOADING
        </p>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes progress {
          from {
            stroke-dashoffset: 264;
          }
          to {
            stroke-dashoffset: 66;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}