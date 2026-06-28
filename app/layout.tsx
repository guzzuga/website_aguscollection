import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFloatingButton } from '@/components/layout/whatsapp-floating-button';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = 'https://aguscollection.web.id';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Agus Collection | Konveksi Premium Indonesia',
    template: '%s | Agus Collection',
  },
  description:
    'Agus Collection melayani pembuatan seragam sekolah, seragam perusahaan, kaos custom, polo shirt, celana, rok, almamater, wearpack, dan bahan kain dengan kualitas premium dan harga langsung pabrik.',
  keywords: [
    'Konveksi Indonesia',
    'Seragam Sekolah',
    'Seragam Perusahaan',
    'Kaos Custom',
    'Polo Shirt',
    'Wearpack',
    'Jaket',
    'Bahan Kain',
    'Konveksi Mojokerto',
    'Almamater',
  ],
  authors: [{ name: 'Agus Collection' }],
  creator: 'Agus Collection',
  publisher: 'Agus Collection',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_URL,
    siteName: 'Agus Collection',
    title: 'Agus Collection | Konveksi Premium Indonesia',
    description:
      'Agus Collection melayani pembuatan seragam sekolah, seragam perusahaan, kaos custom, polo shirt, celana, rok, almamater, wearpack, dan bahan kain dengan kualitas premium dan harga langsung pabrik.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Agus Collection — Konveksi Premium Indonesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agus Collection | Konveksi Premium Indonesia',
    description:
      'Seragam berkualitas, harga pabrik langsung. Gratis desain, gratis konsultasi, pengiriman seluruh Indonesia.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  themeColor: '#0a0a2e',
  category: 'business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={cn(inter.variable)} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0a2e" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
