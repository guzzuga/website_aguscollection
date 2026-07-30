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
              {/* ── Animated background layers ── */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Deep base gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f23] via-[#0a0a18] to-[#050510]" />
                {/* Gold glow orbs — animated */}
                <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-amber-500/[0.06] blur-[100px]" style={{ animation: 'sidebarOrb1 6s ease-in-out infinite' }} />
                <div className="absolute -left-16 bottom-32 h-48 w-48 rounded-full bg-amber-400/[0.04] blur-[80px]" style={{ animation: 'sidebarOrb2 8s ease-in-out infinite' }} />
                <div className="absolute right-8 top-1/2 h-40 w-40 rounded-full bg-yellow-500/[0.03] blur-[70px]" style={{ animation: 'sidebarOrb3 7s ease-in-out infinite' }} />
                {/* Subtle gold line beams */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(251,191,36,0.03) 60px, rgba(251,191,36,0.03) 61px)' }} />
                {/* Gold dust particles */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-amber-400"
                    style={{
                      width: 1 + (i % 2),
                      height: 1 + (i % 2),
                      left: `${10 + (i * 7.3) % 75}%`,
                      top: `${10 + (i * 8.7) % 70}%`,
                      opacity: 0.15 + (i % 3) * 0.05,
                      animation: `sidebarParticle ${3 + (i % 3) * 0.5}s ease-in-out infinite`,
                      animationDelay: `${(i * 0.3).toFixed(1)}s`,
                    }}
                  />
                ))}
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.3))]" />
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
        @keyframes sidebarOrb3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
          50% { transform: translate(-15px, -20px) scale(1.08); opacity: 0.5; }
        }
        @keyframes sidebarParticle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.15; }
          25% { transform: translateY(-10px) translateX(5px); opacity: 0.3; }
          50% { transform: translateY(-5px) translateX(-5px); opacity: 0.2; }
          75% { transform: translateY(-12px) translateX(8px); opacity: 0.35; }
        }
      `}</style>
    </header>
  );
}
