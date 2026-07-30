'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import FeaturedProductsServer from '@/components/sections/featured-products-server';

export function FeaturedProducts() {
  return (
    <section id="produk" className="scroll-mt-20 bg-slate-50/50 dark:bg-black py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col items-center gap-6">
          <SectionHeading
            eyebrow="Produk Unggulan"
            title="Pilihan Produk Terlaris"
            description="Produk dengan kualitas premium yang sudah dipercaya ratusan pelanggan di seluruh Indonesia."
          />
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <FeaturedProductsServer />
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-navy/20 bg-white px-7 text-navy hover:border-gold/40 hover:bg-gold/5 hover:text-gold-700"
          >
            <Link href="/produk">
              Lihat Semua Produk
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
