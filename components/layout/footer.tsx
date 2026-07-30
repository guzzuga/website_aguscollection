'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
} from 'lucide-react';
import { siteConfig, navLinks } from '@/constants/site';
import { cn } from '@/lib/utils';

const productLinks = [
  { label: 'Seragam Sekolah', href: '/produk?kategori=seragam-sekolah' },
  { label: 'Seragam Perusahaan', href: '/produk?kategori=seragam-perusahaan' },
  { label: 'Kaos Custom', href: '/produk?kategori=kaos-custom' },
  { label: 'Almamater & Jaz', href: '/produk?kategori=almamater' },
  { label: 'Polo Shirt', href: '/produk?kategori=polo-shirt' },
  { label: 'Wearpack', href: '/produk?kategori=wearpack' },
  { label: 'Bahan Kain', href: '/produk?kategori=bahan-kain' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy dark:bg-gradient-to-b dark:from-[#2a2a2a] dark:via-[#252525] dark:to-[#1a1a1a] text-slate-300 dark:text-neutral-400">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

      <div className="container-page relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white shadow-gold-glow">
                <Image
                  src="/logo-loading.png"
                  alt="AGUS COLLECTION Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="font-display text-xl font-extrabold text-white">
                Agus <span className="text-gold-400">Collection</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-[1.7] text-slate-400 dark:text-neutral-500">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
                { icon: Facebook, href: siteConfig.social.facebook, label: 'Facebook' },
                { icon: Youtube, href: siteConfig.social.youtube, label: 'Youtube' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:border-gold/40 hover:bg-gold/10 hover:text-gold-300"
                >
                  <s.icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div className="lg:col-span-2">
            <h3 className="label-eyebrow text-gold-300">Navigasi</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 dark:text-neutral-500 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <h3 className="label-eyebrow text-gold-300">Produk</h3>
            <ul className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 dark:text-neutral-500 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="label-eyebrow text-gold-300">Kontak</h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400 dark:text-neutral-500">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400 dark:text-neutral-500">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400 dark:text-neutral-500">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400 dark:text-neutral-500">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>{siteConfig.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-divider mt-14" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-500 dark:text-neutral-600">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Hak cipta dilindungi.
          </p>
          <p className="text-xs text-slate-500 dark:text-neutral-600">
            Dibuat dengan presisi &mdash; seperti jahitan kami.
          </p>
        </div>
      </div>
    </footer>
  );
}
