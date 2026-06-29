import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/constants/site';
import { ContactForm } from '@/components/contact/contact-form';
import { buildWhatsAppLink } from '@/utils/format';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Kontak',
  description:
    'Hubungi Agus Collection untuk konsultasi gratis pemesanan seragam sekolah, seragam perusahaan, kaos custom, polo shirt, almamater, wearpack, dan bahan kain.',
  alternates: { canonical: '/kontak' },
};

export default function ContactPage() {
  const contactItems = [
    {
      icon: MapPin,
      label: 'Alamat',
      value: siteConfig.address,
    },
    {
      icon: Phone,
      label: 'Telepon',
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: Clock,
      label: 'Jam Operasional',
      value: siteConfig.hours,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    image: `${siteConfig.url}/og-image.png`,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address,
      addressLocality: 'Mojokerto',
      addressRegion: 'Jawa Timur',
      addressCountry: 'ID',
    },
    openingHours: 'Mo-Sa 08:00-17:00',
    priceRange: 'Rp 32.000 - Rp 175.000',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-24 lg:pt-28">
        {/* Header */}
        <section className="relative overflow-hidden bg-navy py-16 lg:py-20">
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/15 blur-[100px]" />
          <div className="container-page relative text-center">
            <span className="label-eyebrow inline-flex items-center gap-2 text-gold-300">
              <span className="h-px w-6 bg-current opacity-60" />
              Hubungi Kami
              <span className="h-px w-6 bg-current opacity-60" />
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white text-balance sm:text-5xl">
              Mari Mulai Proyek Anda
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-[1.7] text-slate-300 text-pretty">
              Tim kami siap membantu dari konsultasi hingga pengiriman. Kirim
              pesan Anda dan dapatkan respons dalam 1×24 jam.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="container-page">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left — contact info + map */}
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold tracking-tight text-navy">
                  Informasi Kontak
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Hubungi kami melalui channel berikut atau kunjungi workshop kami
                  langsung.
                </p>

                <div className="mt-8 space-y-4">
                  {contactItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-all hover:border-gold/30 hover:shadow-soft-lg"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-gold-300">
                        <item.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="label-eyebrow text-slate-500">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="mt-1 block font-semibold text-navy transition-colors hover:text-gold-700"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-1 font-semibold text-navy">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* WhatsApp Admins */}
                  <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white">
                      <MessageCircle className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <p className="label-eyebrow text-slate-500">WhatsApp</p>
                      <div className="mt-2 space-y-2">
                        <a
                          href={`https://wa.me/${siteConfig.whatsappAdmin1}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg bg-[#25D366]/10 px-3 py-2.5 transition-all hover:bg-[#25D366]/20"
                        >
                          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="font-semibold text-navy">Admin 1</span>
                          <span className="text-sm text-slate-600">+62 857-3031-6263</span>
                          <span className="ml-auto text-xs text-[#25D366] font-medium">Fast Response</span>
                        </a>
                        <a
                          href={`https://wa.me/${siteConfig.whatsappAdmin2}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg bg-[#25D366]/10 px-3 py-2.5 transition-all hover:bg-[#25D366]/20"
                        >
                          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="font-semibold text-navy">Admin 2</span>
                          <span className="text-sm text-slate-600">+62 878-7472-2632</span>
                          <span className="ml-auto text-xs text-[#25D366] font-medium">Backup</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  asChild
                  className="mt-6 w-full rounded-full bg-[#25D366] py-6 text-base text-white shadow-lg shadow-[#25D366]/30 hover:bg-[#1da851] sm:w-auto"
                >
                  <a
                    href={buildWhatsAppLink(
                      `Halo ${siteConfig.name}, saya ingin bertanya.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat via WhatsApp
                  </a>
                </Button>

                {/* Map */}
                <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-soft">
                  <iframe
                    title="Lokasi Agus Collection"
                    src="https://www.google.com/maps?q=-7.4063689,112.4104139&z=18&output=embed"
                    width="100%"
                    height="400"
                    style={{ border: 0, borderRadius: '20px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
                    <a
                      href="https://maps.app.goo.gl/Lovh7wxdbk6cg3248"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-gold-700"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Buka di Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Right — form */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft-lg sm:p-8 lg:p-10">
                <h2 className="text-2xl font-bold tracking-tight text-navy">
                  Kirim Pesanan
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Isi form di bawah ini. Semua field bertanda <span className="text-error">*</span> wajib diisi.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
