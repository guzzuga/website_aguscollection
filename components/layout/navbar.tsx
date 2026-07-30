'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { navLinks, siteConfig } from '@/constants/site';
import { WhatsAppButton } from '@/components/ui/whatsapp-button';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 border-b',
        // Light theme: original styling
        scrolled
          ? 'bg-white/95 shadow-soft backdrop-blur-2xl border-white/15'
          : 'bg-navy/90 backdrop-blur-2xl border-white/10',
        // Dark theme: glass abu gelap → abu terang
        'dark:bg-[#1a1a1a]/80 dark:backdrop-blur-xl dark:border-white/[0.06]',
        scrolled
          ? 'dark:bg-[#2a2a2a]/90 dark:border-white/[0.1] dark:shadow-[0_1px_0_rgba(255,255,255,0.04)]'
          : 'dark:shadow-none',
      )}
    >
      {/* Active indicator line — dark mode only */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500',
          'dark:bg-gradient-to-r dark:from-transparent dark:via-gold-400/25 dark:to-transparent dark:opacity-100',
          'bg-gradient-to-r from-transparent via-gold-400/40 to-transparent',
          scrolled
            ? 'opacity-100'
            : 'opacity-0 dark:opacity-100',
        )}
      />
      <nav className="container-page flex h-16 items-center justify-between lg:h-20">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={siteConfig.name}
        >
          <span
            className={cn(
              'relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110',
              // Light theme: original
              'border-2 border-gold/40 bg-white/90 shadow-gold-glow group-hover:shadow-gold-glow-lg',
              // Dark theme: glass abu
              'dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:group-hover:bg-white/[0.08]',
            )}
          >
            {/* Shine effect — dark mode only */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 5 }}
              className="dark:hidden"
            />
            <Image
              src="/logo-loading.png"
              alt="Agus Collection Logo"
              fill
              className="object-contain p-0.5"
              sizes="36px"
            />
          </span>
          <span
            className={cn(
              'font-display text-lg font-extrabold tracking-tight transition-colors',
              // Light theme
              scrolled ? 'text-navy' : 'text-white',
              // Dark theme
              'dark:text-white',
              scrolled ? 'dark:text-white' : '',
            )}
          >
            Agus
            <span className={cn('text-gold-600', 'dark:text-amber-400/90')}> Collection</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href.replace('/#', '/'));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'group relative px-4 py-2 text-sm font-medium transition-all duration-300',
                  // Light theme
                  scrolled
                    ? 'text-slate-700 hover:text-navy'
                    : 'text-slate-200 hover:text-white',
                  // Dark theme
                  'dark:text-white/60 dark:hover:text-white dark:hover:bg-white/[0.04]',
                )}
              >
                {link.label}
                <motion.span
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: isActive ? 1 : 0,
                    opacity: isActive || scrolled ? 1 : 0.6,
                  }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full',
                    'bg-gradient-to-r from-gold-400 to-gold-600',
                    // Dark theme: subtle gold underline
                    'dark:bg-gradient-to-r dark:from-gold-400/60 dark:to-gold-400/40',
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <WhatsAppButton 
            variant="hero" 
            message={`Halo ${siteConfig.name}, saya ingin konsultasi pemesanan.`}
            className="!rounded-full !bg-gold-gradient !px-4 !py-2 !text-sm !text-navy !shadow-gold-glow hover:!shadow-gold-glow-lg"
          />
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl border transition-colors backdrop-blur hover:bg-slate-50',
                  // Light theme
                  'border-slate-200 bg-white/80 text-navy',
                  // Dark theme
                  'dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]',
                )}
                aria-label="Buka menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-sm border-l-0 p-0 text-white sm:max-w-[85vw]"
            >
              {/* ── Premium animated background ── */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Deep base gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f23] via-[#0a0a18] to-[#050510]" />
                {/* Gold glow orbs */}
                <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-amber-500/[0.06] blur-[100px]" style={{ animation: 'sidebarOrb1 6s ease-in-out infinite' }} />
                <div className="absolute -left-16 bottom-32 h-48 w-48 rounded-full bg-amber-400/[0.04] blur-[80px]" style={{ animation: 'sidebarOrb2 8s ease-in-out infinite' }} />
                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.3))]" />
              </div>

              {/* ── Floating fashion icons (garment + scissors) ── */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Large AC monogram watermark — left side, very faint */}
                <span
                  className="absolute left-[-20px] top-1/2 -translate-y-1/2 font-display text-[140px] font-black leading-none opacity-[0.015] text-amber-400 select-none"
                  style={{ animation: 'sidebarMonogram 8s ease-in-out infinite' }}
                >
                  AC
                </span>

                {/* Shirt icon — top right, drifting */}
                <svg
                  className="absolute top-[18%] right-[-8px] w-24 h-24 text-amber-400/[0.08]"
                  style={{ animation: 'sidebarFloat1 8s ease-in-out infinite' }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 2l4 4-2.5 2.5L16 6 16 19a2 2 0 0 1-4 0l0-13-1.5 2.5L8 6 4 2l4 4L7.5 2H16z"/>
                </svg>

                {/* Scissors icon — mid right, counter-drift */}
                <svg
                  className="absolute top-[42%] right-[4px] w-20 h-20 text-amber-400/[0.065]"
                  style={{ animation: 'sidebarFloat2 10s ease-in-out infinite' }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 2c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4c0-1.1-.9-2-2-2zm6.5-5.5l-1.4 1.4c-.4-.3-.8-.5-1.3-.5-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5c.5 0 .9-.2 1.3-.5l1.4 1.4c-.8.6-1.7 1-2.7 1-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5c1 0 1.9.4 2.7 1zM13 4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2V4zm0 14c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2v-4z"/>
                </svg>

                {/* Shirt icon — lower, slower drift */}
                <svg
                  className="absolute bottom-[25%] left-[8px] w-16 h-16 text-amber-300/[0.055]"
                  style={{ animation: 'sidebarFloat3 12s ease-in-out infinite' }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 2l4 4-2.5 2.5L16 6 16 19a2 2 0 0 1-4 0l0-13-1.5 2.5L8 6 4 2l4 4L7.5 2H16z"/>
                </svg>

                {/* Scissors icon — bottom left, counter */}
                <svg
                  className="absolute bottom-[38%] left-[24px] w-14 h-14 text-amber-400/[0.06]"
                  style={{ animation: 'sidebarFloat4 9s ease-in-out infinite' }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 2c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4c0-1.1-.9-2-2-2zm6.5-5.5l-1.4 1.4c-.4-.3-.8-.5-1.3-.5-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5c.5 0 .9-.2 1.3-.5l1.4 1.4c-.8.6-1.7 1-2.7 1-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5c1 0 1.9.4 2.7 1zM13 4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2V4zm0 14c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2v-4z"/>
                </svg>

                {/* Shimmer sweep — stronger diagonal */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    background: 'linear-gradient(105deg, transparent 35%, rgba(251,191,36,0.7) 48%, rgba(255,255,255,0.85) 50%, rgba(251,191,36,0.7) 52%, transparent 65%)',
                    backgroundSize: '300% 100%',
                    animation: 'sidebarShimmer 5s ease-in-out infinite',
                  }}
                />
                <div
                  className="absolute inset-0 opacity-[0.025]"
                  style={{
                    background: 'linear-gradient(105deg, transparent 35%, rgba(251,191,36,0.7) 48%, rgba(255,255,255,0.85) 50%, rgba(251,191,36,0.7) 52%, transparent 65%)',
                    backgroundSize: '300% 100%',
                    animation: 'sidebarShimmer 5s ease-in-out infinite',
                    animationDelay: '2.5s',
                  }}
                />
                {/* Vertical gold haze streaks */}
                <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-amber-400/[0.03] to-transparent" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-400/[0.02] to-transparent" />
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <div className={cn(
                  'flex items-center justify-between px-6 py-5 border-b',
                  'border-white/10',
                  'dark:border-white/[0.06]',
                )}>
                  <span className="flex items-center gap-2 text-lg font-extrabold">
                    <span className={cn(
                      'relative flex h-8 w-8 items-center justify-center rounded-lg p-0.5',
                      // Light theme
                      'border-2 border-gold/40 bg-white/90',
                      // Dark theme
                      'dark:border-white/10 dark:bg-white/[0.04]',
                    )}>
                      <Image
                        src="/logo-loading.png"
                        alt="Agus Collection Logo"
                        fill
                        className="object-contain"
                        sizes="32px"
                      />
                    </span>
                    Agus <span className={cn('text-gold-400', 'dark:text-amber-400')}>Collection</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <SheetClose asChild>
                      <button
                        className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-lg border transition-colors',
                          'border-white/10 text-white/80 hover:bg-white/10',
                          'dark:border-white/[0.08] dark:hover:bg-white/[0.08]',
                        )}
                        aria-label="Tutup menu"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </SheetClose>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-1 px-4 py-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i + 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          'flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors',
                          // Light theme
                          'text-slate-200 hover:bg-white/5 hover:text-white',
                          // Dark theme
                          'dark:text-white/60 dark:hover:bg-white/[0.04] dark:hover:text-white',
                        )}
                      >
                        {link.label}
                        <span className={cn('text-gold-400', 'dark:text-amber-400')}>→</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className={cn('p-6 border-t',
                  'border-white/10',
                  'dark:border-white/[0.06]',
                )}>
                  <WhatsAppButton 
                    variant="hero" 
                    message={`Halo ${siteConfig.name}, saya ingin konsultasi pemesanan.`}
                    className="!w-full !rounded-full !bg-gold-gradient !text-navy !shadow-gold-glow"
                  />
                  <p className={cn(
                    'mt-4 text-center text-xs',
                    'text-slate-400',
                    'dark:text-white/40',
                  )}>
                    {siteConfig.hours}
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ── Sidebar mobile animations ── */}
      <style jsx global>{`
        @keyframes sidebarOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
          50% { transform: translate(-20px, 30px) scale(1.1); opacity: 0.7; }
        }
        @keyframes sidebarOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
          50% { transform: translate(25px, -25px) scale(1.15); opacity: 0.6; }
        }
        @keyframes sidebarFloat1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-8px, 12px) rotate(5deg); }
          50% { transform: translate(4px, -8px) rotate(-3deg); }
          75% { transform: translate(-5px, 5px) rotate(2deg); }
        }
        @keyframes sidebarFloat2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(-4deg); }
          50% { transform: translate(-6px, 8px) rotate(3deg); }
          75% { transform: translate(8px, -4px) rotate(-2deg); }
        }
        @keyframes sidebarFloat3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          33% { transform: translate(6px, -14px) rotate(8deg) scale(1.05); }
          66% { transform: translate(-8px, 6px) rotate(-5deg) scale(0.98); }
        }
        @keyframes sidebarFloat4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-10px, -8px) rotate(-6deg); }
          66% { transform: translate(7px, 10px) rotate(4deg); }
        }
        @keyframes sidebarShimmer {
          0% { background-position: 300% 0; }
          100% { background-position: -300% 0; }
        }
        @keyframes sidebarMonogram {
          0%, 100% { transform: translateY(-50%) scale(1); opacity: 0.015; }
          50% { transform: translateY(-50%) scale(1.03); opacity: 0.025; }
        }
      `}</style>
    </header>
  );
}
