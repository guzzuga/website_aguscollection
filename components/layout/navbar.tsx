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
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    let lastY = 0;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > 80 && !ticking) {
        setVisible(true);
        ticking = true;
      } else if (y <= 80) {
        setVisible(false);
      }
      lastY = y;
    };

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
        'fixed inset-x-0 top-0 z-50 transition-all duration-700 will-change-transform',
        visible ? 'translate-y-0' : '-translate-y-0',
        scrolled ? 'translate-y-0' : 'shadow-none'
      )}
    >
      {/* ── Noise texture overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}
      />

      {/* ── Navbar bar ── */}
      <div
        className={cn(
          'relative z-10 h-14 transition-all duration-500 lg:h-14',
          scrolled
            ? 'border-b border-white/[0.08] bg-[#0a0a0a]/80 shadow-[0_1px_0_0_rgba(255,255,255,0.05)] shadow-[0_4px_30px_rgba(0,0,0,0.15)] backdrop-blur-[24px] backdrop-saturate-[1.4]'
            : 'border-b border-white/[0.04] bg-[#0a0a0a]/60 backdrop-blur-[18px] backdrop-saturate-[1.2]'
        )}
      >
        {/* ── Active indicator line ── */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/[0.25] to-transparent transition-opacity duration-500',
            scrolled ? 'opacity-100' : 'opacity-0'
          )}
        />

        <nav className="container-page flex h-full items-center justify-between px-4">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label={siteConfig.name}
          >
            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.07]">
              <Image
                src="/images/logo.jpg"
                alt="Agus Collection"
                fill
                className="object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                sizes="32px"
              />
              {/* Subtle inner glow on hover */}
              <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </span>
            <span
              className={cn(
                'text-[13px] font-semibold tracking-[0.04em] transition-colors duration-300',
                scrolled ? 'text-white/90' : 'text-white/80'
              )}
            >
              Agus <span className="text-gold-400/90">Collection</span>
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
                        ? 'text-white'
                        : 'text-white/55 hover:text-white/85'
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
                        : 'scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-30 group-hover:bg-white/30'
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
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-all duration-200 hover:bg-white/[0.06] hover:text-white/80 active:scale-95"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
            </button>

            <WhatsAppButton
              variant="hero"
              message={`Halo ${siteConfig.name}, saya ingin konsultasi pemesanan.`}
              className="!rounded-full !bg-white/[0.08] !px-4 !py-1.5 !text-[13px] !font-medium !text-white !border !border-white/[0.1] hover:!bg-white/[0.14] hover:!border-white/[0.18] !shadow-none hover:!shadow-[0_0_20px_rgba(255,255,255,0.04)] !transition-all !duration-300"
            />
          </div>

          {/* ── Mobile Menu ── */}
          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/70 backdrop-blur-sm transition-all hover:bg-white/[0.08] hover:text-white active:scale-95"
                  aria-label="Buka menu"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full max-w-sm border-l-0 bg-[#0a0a0a]/95 p-0 text-white backdrop-blur-2xl"
              >
                <div className="flex h-full flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                    <span className="flex items-center gap-2.5 text-base font-semibold">
                      <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-white/[0.1] bg-white/[0.04]">
                        <Image
                          src="/images/logo.jpg"
                          alt="Agus Collection"
                          fill
                          className="object-contain p-0.5"
                          sizes="28px"
                        />
                      </span>
                      Agus <span className="text-gold-400/80">Collection</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      {/* Mobile theme toggle */}
                      <button
                        onClick={() => {
                          const root = document.documentElement;
                          root.classList.toggle('dark');
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-all hover:bg-white/[0.06] hover:text-white/80"
                        aria-label="Toggle theme"
                      >
                        <Sun className="h-4 w-4" />
                      </button>
                      <SheetClose asChild>
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-all hover:bg-white/[0.06] hover:text-white/80"
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
                            className="flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-white/60 transition-all hover:bg-white/[0.04] hover:text-white/90"
                          >
                            <span>{link.label}</span>
                            <span
                              className={cn(
                                'text-[10px] font-medium uppercase tracking-wider',
                                isActive ? 'text-gold-400/80' : 'text-white/20'
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
                  <div className="border-t border-white/[0.06] p-5">
                    <WhatsAppButton
                      variant="hero"
                      message={`Halo ${siteConfig.name}, saya ingin konsultasi pemesanan.`}
                      className="!w-full !rounded-full !bg-gold-gradient !text-navy !text-sm !font-semibold !shadow-[0_0_30px_rgba(251,191,36,0.15)] hover:!shadow-[0_0_40px_rgba(251,191,36,0.25)] !transition-all !duration-300"
                    />
                    <p className="mt-3 text-center text-[11px] text-white/30">
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
