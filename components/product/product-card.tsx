'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { once: true, threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:bg-neutral-800 dark:border-neutral-700 shadow-soft transition-all duration-300 hover:border-gold/40 hover:shadow-soft-xl',
        'transition-all duration-700 ease-out will-change-transform opacity',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className,
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-8px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <Link href={`/produk/${product.slug}`} className="flex h-full flex-col">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-neutral-700">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="eager"
            decoding="async"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-white/10" />
          {product.badge && (
            <Badge className="absolute left-4 top-4 rounded-full bg-gold-gradient text-navy shadow-gold-glow">
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <span className="label-eyebrow text-gold-600 dark:text-gold-300">{product.categoryLabel}</span>
          <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-gold-700 dark:group-hover:text-gold-300">
            {product.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-neutral-400">
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
                      : 'fill-slate-200 text-slate-200 dark:fill-neutral-600 dark:text-neutral-600',
                  )}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-neutral-400">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price + CTA */}
          <div className="mt-auto flex items-end justify-between pt-5">
            <div className="flex-1">
              {product.educationPricing && Array.isArray(product.educationPricing) && product.educationPricing.length > 0 ? (
                <div>
                  {product.educationPricing.map((ep) => (
                    <div key={ep.level} className="flex justify-between items-center">
                      <span className="text-xs text-slate-500 dark:text-neutral-400">{ep.label}</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{formatRupiah(ep.basePrice)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <span className="block text-xs text-slate-500 dark:text-neutral-500">Mulai dari</span>
                  <span className="font-display text-xl font-extrabold text-slate-900 dark:text-white">
                    {formatRupiah(product.basePrice)}
                  </span>
                </div>
              )}
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy dark:bg-neutral-600 text-white dark:text-white transition-all duration-300 group-hover:bg-gold-gradient group-hover:text-slate-900">
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
