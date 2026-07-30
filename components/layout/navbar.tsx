'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
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
        scrolled
          ? 'bg-white/95 shadow-soft backdrop-blur-2xl backdrop-saturate-[1.2]'
          : 'bg-navy/90 backdrop-blur-2xl backdrop-saturate-[1.0]'
      )}
    >
      {/* ── Navbar bar ── */}
      <div
        className={cn(
          'relative z-10 h-14 transition-all duration-500 lg:h-14',
          scrolled
            ? 'border-b border-white/15 bg-white/95 shadow-soft backdrop-blur-2xl backdrop-saturate-[1.2]'
            : 'border-b border-white/10 bg-navy/90 backdrop-blur-2xl backdrop-saturate-[1.0]'
        )}
      >
        {/* ── Active indicator line ── */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500',
            scrolled
              ? 'bg-gradient-to-r from-transparent via-gold-400/40 to-transparent opacity-100'
              : 'bg-gradient-to-r from-transparent via-gold-400/40 to-transparent opacity-0'
          )}
        />

        <nav className="container-page flex h-full items-center justify-between px-4">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label={siteConfig.name}
          >
            <span
              className={cn(
                'relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border p-1 transition-all duration-300 group-hover:scale-105',
                scrolled
                  ? 'border-slate-200 bg-white'
                  : 'border-white/10 bg-white/[0.04] group-hover:border-white/20 group-hover:bg-white/[0.07]'
              )}
            >
              <Image
                src="/images/logo.jpg"
                alt="Agus Collection"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                sizes="32px"
              />
              {/* Subtle inner glow on hover — only in dark */}
              {!scrolled && (
                <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </span>
            <span
              className={cn(
                'text-[13px] font-semibold tracking-[0.04em] transition-colors duration-300',
                scrolled ? 'text-slate-800' : 'text-white'
              )}
            >
              Agus <span className={scrolled ? 'text-gold-600' : 'text-gold-400/90'}>Collection</span>
            </span>
          </Link>

          {/* ── Desktop Menu ── */}
          <div className="hidden items-center gap-0.5 lg:flex">
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
                    'relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300',
                    scrolled
                      ? isActive
                        ? 'text-slate-900'
                        : 'text-slate-600 hover:text-slate-900'
                      : isActive
                        ? 'text-white'
                        : 'text-white/65 hover:text-white'
                  )}
                >
                  {link.label}
                  {/* Active indicator — pill underline */}
                  <span
                    className={cn(
                      'absolute inset-x-2.5 -bottom-[1px] h-[2px] rounded-full origin-center transition-all duration-300 ease-out',
                      isActive
                        ? 'scale-x-100 bg-gradient-to-r from-gold-400/60 via-gold-400 to-gold-400/60 opacity-80'
                        : 'scale-x-0 opacity-0'
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* ── Desktop CTA ── */}
          <div className="hidden items-center gap-2.5 lg:flex">
            {/* Theme toggle — macOS style minimal */}
            <button
              onClick={() => {
                const root = document.documentElement;
                const isDark = root.classList.contains('dark');
                root.classList.toggle('dark', !isDark);
              }}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-all duration-200 hover:bg-white/[0.06] hover:text-white/80 active:scale-95',
                scrolled && 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              )}
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
            </button>

            <WhatsAppButton
              variant="hero"
              message={`Halo ${siteConfig.name}, saya ingin konsultasi pemesanan.`}
              className="!rounded-full !bg-gold-gradient !px-4 !py-1.5 !text-[13px] !font-medium !text-navy !shadow-gold-glow hover:!shadow-gold-glow-lg"
            />
          </div>

          {/* ── Mobile Menu ── */}
          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-neutral-600 bg-white/80 dark:bg-neutral-700/80 text-navy dark:text-white backdrop-blur transition-colors hover:bg-slate-50 dark:hover:bg-neutral-600"
                  aria-label="Buka menu"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className={cn(
                  'w-full max-w-sm border-l-0 p-0 text-white backdrop-blur-2xl',
                  scrolled
                    ? 'bg-white/95'
                    : 'bg-navy dark:bg-gradient-to-b dark:from-[#3a3a3a] dark:to-[#2a2a2a]'
                )}
              >
                <div className="flex h-full flex-col">
                  {/* Header */}
                  <div className={cn('flex items-center justify-between border-b px-5 py-4', scrolled ? 'border-slate-200' : 'border-white/[0.06]')}>
                    <span className="flex items-center gap-2.5 text-base font-semibold">
                      <span className={cn(
                        'relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border p-0.5',
                        scrolled
                          ? 'border-slate-200 bg-white'
                          : 'border-white/[0.1] bg-white/[0.04]'
                      )}>
                        <Image
                          src="/images/logo.jpg"
                          alt="Agus Collection"
                          fill
                          className="object-contain"
                          sizes="28px"
                        />
                      </span>
                      <span className={scrolled ? 'text-slate-800' : ''}>
                        Agus <span className={scrolled ? 'text-gold-600' : 'text-gold-400/80'}>Collection</span>
                      </span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      {/* Mobile theme toggle */}
                      <button
                        onClick={() => {
                          const root = document.documentElement;
                          root.classList.toggle('dark');
                        }}
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-full transition-all hover:text-white/80',
                          scrolled
                            ? 'text-slate-500 hover:bg-slate-100'
                            : 'text-white/40 hover:bg-white/[0.06] hover:text-white/80'
                        )}
                        aria-label="Toggle theme"
                      >
                        <Sun className="h-4 w-4" />
                      </button>
                      <SheetClose asChild>
                        <button
                          className={cn(
                            'flex h-8 w-8 items-center justify-center rounded-full transition-all hover:text-white/80',
                            scrolled
                              ? 'text-slate-500 hover:bg-slate-100'
                              : 'text-white/50 hover:bg-white/[0.06] hover:text-white/80'
                          )}
                          aria-label="Tutup menu"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </SheetClose>
                    </div>
                  </div>

                  {/* Nav links */}
                  <div className="flex flex-1 flex-col gap-0.5 px-3 py-5">
                    {navLinks.map((link, i) => {
                      const isActive =
                        link.href === '/'
                          ? pathname === '/'
                          : pathname.startsWith(link.href.replace('/#', '/'));

                      return (
                        <SheetClose key={link.href} asChild>
                          <Link
                            href={link.href}
                            className="flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-all hover:bg-slate-100"
                          >
                            <span className={scrolled ? 'text-slate-700' : 'text-white/60'}>
                              {link.label}
                            </span>
                            <span
                              className={cn(
                                'text-[10px] font-medium uppercase tracking-wider',
                                scrolled
                                  ? isActive ? 'text-gold-600' : 'text-slate-400'
                                  : isActive ? 'text-gold-400/80' : 'text-white/20'
                              )}
                            >
                              {isActive ? '●' : '○'}
                            </span>
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className={cn('border-t p-5', scrolled ? 'border-slate-200' : 'border-white/[0.06]')}>
                    <WhatsAppButton
                      variant="hero"
                      message={`Halo ${siteConfig.name}, saya ingin konsultasi pemesanan.`}
                      className="!w-full !rounded-full !bg-gold-gradient !text-navy !text-sm !font-semibold !shadow-[0_0_30px_rgba(251,191,36,0.15)] hover:!shadow-[0_0_40px_rgba(251,191,36,0.25)] !transition-all !duration-300"
                    />
                    <p className={cn('mt-3 text-center text-[11px]', scrolled ? 'text-slate-500' : 'text-white/30')}>
                      {siteConfig.hours}
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
