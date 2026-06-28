'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import type { Product } from '@/types';
import { formatRupiah } from '@/utils/format';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type ProductCardProps = {
  product: Product;
  className?: string;
  index?: number;
};

export function ProductCard({ product, className, index = 0 }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition-all duration-300 hover:border-gold/40 hover:shadow-soft-xl',
        className,
      )}
    >
      <Link href={`/produk/${product.slug}`} className="flex h-full flex-col">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {product.badge && (
            <Badge className="absolute left-4 top-4 rounded-full bg-gold-gradient text-navy shadow-gold-glow">
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <span className="label-eyebrow text-gold-600">{product.categoryLabel}</span>
          <h3 className="mt-2 text-lg font-bold tracking-tight text-navy transition-colors group-hover:text-gold-700">
            {product.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-500">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-1.5">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3.5 w-3.5',
                    i < Math.floor(product.rating)
                      ? 'fill-gold-400 text-gold-400'
                      : 'fill-slate-200 text-slate-200',
                  )}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-slate-500">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price + CTA */}
          <div className="mt-auto flex items-end justify-between pt-5">
            <div>
              <span className="block text-xs text-slate-400">Mulai dari</span>
              <span className="text-xl font-extrabold text-navy">
                {(() => {
                  // Calculate lowest price (highest discount tier)
                  const lowestTier = product.priceTiers[product.priceTiers.length - 1];
                  const basePrice = product.educationPricing 
                    ? product.educationPricing[0].basePrice 
                    : product.basePrice;
                  const discount = lowestTier.discount ?? 0;
                  const lowestPrice = product.priceTiers[0].price 
                    ? lowestTier.price! 
                    : basePrice - discount;
                  return formatRupiah(lowestPrice);
                })()}
              </span>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white transition-all duration-300 group-hover:bg-gold-gradient group-hover:text-navy">
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
