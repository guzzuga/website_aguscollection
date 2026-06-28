'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Star,
  Minus,
  Plus,
  MessageCircle,
  ShoppingBag,
  Check,
  ChevronRight,
  ShieldCheck,
  Truck,
  Palette,
} from 'lucide-react';
import type { Product, EducationLevel } from '@/types';
import { ProductGallery } from '@/components/product/product-gallery';
import { PriceTierList } from '@/components/product/price-tier';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatRupiah, buildWhatsAppOrderLink } from '@/utils/format';
import { cn } from '@/lib/utils';

type ProductDetailClientProps = {
  product: Product;
};

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [qty, setQty] = useState(10);
  const [size, setSize] = useState<string>(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [educationLevel, setEducationLevel] = useState<EducationLevel | null>(
    product.educationPricing ? product.educationPricing[0].level : null
  );

  // Calculate active tier based on quantity
  const activeTier = useMemo(() => {
    return (
      product.priceTiers.find(
        (t) => qty >= t.minQty && (t.maxQty === null || qty <= t.maxQty),
      ) ?? product.priceTiers[0]
    );
  }, [qty, product.priceTiers]);

  // Calculate base price based on education level or fallback to basePrice
  const basePrice = useMemo(() => {
    if (product.educationPricing && educationLevel) {
      const eduPricing = product.educationPricing.find(ep => ep.level === educationLevel);
      return eduPricing ? eduPricing.basePrice : product.basePrice;
    }
    return product.basePrice;
  }, [product.educationPricing, product.basePrice, educationLevel]);

  // Calculate final price with discount
  const finalPrice = useMemo(() => {
    return activeTier.price ?? (basePrice - (activeTier.discount ?? 0));
  }, [basePrice, activeTier]);

  const total = finalPrice * qty;

  return (
    <div className="pt-24 lg:pt-28">
      <div className="container-page py-10 lg:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <a href="/" className="transition-colors hover:text-navy">Home</a>
          <ChevronRight className="h-3.5 w-3.5" />
          <a href="/#produk" className="transition-colors hover:text-navy">Produk</a>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-navy">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery images={product.images} alt={product.name} />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="label-eyebrow text-gold-600">{product.categoryLabel}</span>
              {product.badge && (
                <Badge className="rounded-full bg-gold-gradient text-navy">
                  {product.badge}
                </Badge>
              )}
            </div>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-4 w-4',
                      i < Math.floor(product.rating)
                        ? 'fill-gold-400 text-gold-400'
                        : 'fill-slate-200 text-slate-200',
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-600">
                {product.rating} ({product.reviewCount} ulasan)
              </span>
            </div>

            <p className="mt-5 text-base leading-[1.7] text-slate-600">
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs text-slate-500">Harga per pcs (qty {qty})</span>
                  <p className="text-3xl font-extrabold text-navy">
                    {formatRupiah(finalPrice)}
                  </p>
                  {educationLevel && (
                    <span className="text-xs text-slate-500">
                      Tingkat: {educationLevel} | Diskon: {formatRupiah(activeTier.discount || 0)}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Estimasi Total</span>
                  <p className="text-2xl font-extrabold text-gold-700">
                    {formatRupiah(total)}
                  </p>
                </div>
              </div>
            </div>

            {/* Price tiers */}
            <PriceTierList
              tiers={product.priceTiers}
              selectedQty={qty}
              basePrice={basePrice}
              className="mt-5"
            />

            {/* Color */}
            <div className="mt-6">
              <p className="label-eyebrow text-slate-500">Warna: <span className="text-navy normal-case tracking-normal">{color}</span></p>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-label={`Pilih warna ${c.name}`}
                    className={cn(
                      'flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-sm font-medium transition-all',
                      color === c.name
                        ? 'border-gold bg-gold/5 text-navy'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300',
                    )}
                  >
                    <span
                      className="h-5 w-5 rounded-full border border-slate-200"
                      style={{ backgroundColor: c.hex }}
                    />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Education Level */}
            {product.educationPricing && (
              <div className="mt-6">
                <p className="label-eyebrow text-slate-500">Tingkat Sekolah:</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.educationPricing.map((edu) => (
                    <button
                      key={edu.level}
                      onClick={() => setEducationLevel(edu.level)}
                      className={cn(
                        'flex h-11 items-center gap-2 rounded-xl border-2 px-4 text-sm font-semibold transition-all',
                        educationLevel === edu.level
                          ? 'border-navy bg-navy text-white'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300',
                      )}
                    >
                      <span className="font-bold">{edu.level}</span>
                      <span className="text-xs opacity-80">({formatRupiah(edu.basePrice)})</span>
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Pilih tingkat sekolah untuk melihat harga yang sesuai
                </p>
              </div>
            )}

            {/* Size */}
            <div className="mt-6">
              <p className="label-eyebrow text-slate-500">Ukuran: <span className="text-navy normal-case tracking-normal">{size}</span></p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      'flex h-11 min-w-11 items-center justify-center rounded-xl border-2 px-3 text-sm font-semibold transition-all',
                      size === s
                        ? 'border-navy bg-navy text-white'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="label-eyebrow text-slate-500">Jumlah (pcs)</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center rounded-xl border border-slate-200">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-11 w-11 items-center justify-center text-slate-600 transition-colors hover:text-navy"
                    aria-label="Kurangi"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    value={qty}
                    min={1}
                    onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                    className="h-11 w-16 border-x border-slate-200 text-center text-sm font-semibold text-navy outline-none"
                  />
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="flex h-11 w-11 items-center justify-center text-slate-600 transition-colors hover:text-navy"
                    aria-label="Tambah"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-slate-500">
                  Total: <span className="font-bold text-navy">{formatRupiah(total)}</span>
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="flex-1 rounded-full bg-gold-gradient text-navy shadow-gold-glow hover:shadow-gold-glow-lg"
              >
                <a
                  href={buildWhatsAppOrderLink({
                    productName: product.name,
                    quantity: qty,
                    size,
                    color,
                    total,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Pesan via WhatsApp
                </a>
              </Button>
              {product.shopeeUrl && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="flex-1 rounded-full border-navy/20 text-navy hover:border-gold/40 hover:bg-gold/5 hover:text-gold-700"
                >
                  <a href={product.shopeeUrl} target="_blank" rel="noopener noreferrer">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Beli di Shopee
                  </a>
                </Button>
              )}
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-200 pt-6">
              {[
                { icon: ShieldCheck, label: 'Garansi Jahitan' },
                { icon: Palette, label: 'Free Desain' },
                { icon: Truck, label: 'Kirim Nasional' },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-2 text-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-gold-300">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-medium text-slate-600">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features + Specs */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-navy">Keunggulan Produk</h2>
            <ul className="mt-5 space-y-3">
              {product.features.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-700">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-relaxed text-slate-700">{f}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-navy">Spesifikasi</h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr
                      key={i}
                      className={cn(i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50')}
                    >
                      <td className="border-b border-slate-100 px-5 py-3.5 font-medium text-slate-500">
                        {spec.label}
                      </td>
                      <td className="border-b border-slate-100 px-5 py-3.5 font-semibold text-navy">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
