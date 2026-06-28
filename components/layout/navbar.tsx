'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { navLinks, siteConfig } from '@/constants/site';
import { buildWhatsAppLink } from '@/utils/format';
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
          ? 'glass-nav border-white/15 bg-white/95 shadow-soft backdrop-blur-2xl'
          : 'border-white/10 bg-navy/90 backdrop-blur-2xl',
      )}
    >
      {/* Animated gradient border bottom */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent transition-opacity duration-500',
          scrolled ? 'opacity-100' : 'opacity-0',
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
              'relative flex h-9 w-9 items-center justify-center rounded-xl border-2 border-gold/40 bg-white/90 shadow-gold-glow transition-all duration-500 group-hover:scale-110 group-hover:shadow-gold-glow-lg',
            )}
          >
            {/* Shine effect */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 5 }}
              className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/60 via-transparent to-transparent"
            />
            <Image
              src="/images/logo.jpg"
              alt="Agus Collection Logo"
              fill
              className="object-contain p-0.5"
              sizes="36px"
            />
          </span>
          <span
            className={cn(
              'text-lg font-extrabold tracking-tight transition-colors',
              scrolled ? 'text-navy' : 'text-white',
            )}
          >
            Agus
            <span className="text-gold-600"> Collection</span>
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
                  scrolled
                    ? 'text-slate-700 hover:text-navy'
                    : 'text-slate-200 hover:text-white',
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
                  )}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button
            asChild
            size="sm"
            className="rounded-full bg-gold-gradient text-navy shadow-gold-glow hover:shadow-gold-glow-lg"
          >
            <a
              href={buildWhatsAppLink(
                `Halo ${siteConfig.name}, saya ingin konsultasi pemesanan.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-1.5 h-4 w-4" />
              Pesan Sekarang
            </a>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-navy backdrop-blur transition-colors hover:bg-slate-50"
                aria-label="Buka menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-sm border-l-0 bg-navy p-0 text-white"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                  <span className="flex items-center gap-2 text-lg font-extrabold">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gold/40 bg-white/90">
                                        <Image
                                          src="/images/logo.jpg"
                                          alt="Agus Collection Logo"
                                          fill
                                          className="object-contain p-0.5"
                                          sizes="32px"
                                        />
                                      </span>
                    Agus <span className="text-gold-400">Collection</span>
                  </span>
                  <SheetClose asChild>
                    <button
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/80 transition-colors hover:bg-white/10"
                      aria-label="Tutup menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </SheetClose>
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
                        className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        {link.label}
                        <span className="text-gold-400">→</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-white/10 p-6">
                  <Button
                    asChild
                    className="w-full rounded-full bg-gold-gradient text-navy shadow-gold-glow"
                  >
                    <a
                      href={buildWhatsAppLink(
                        `Halo ${siteConfig.name}, saya ingin konsultasi pemesanan.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Pesan Sekarang
                    </a>
                  </Button>
                  <p className="mt-4 text-center text-xs text-slate-400">
                    {siteConfig.hours}
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
