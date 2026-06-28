'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { Category } from '@/types';
import { cn } from '@/lib/utils';

type CategoryCardProps = {
  category: Category;
  index?: number;
  className?: string;
};

export function CategoryCard({ category, index = 0, className }: CategoryCardProps) {
  const Icon = (Icons[category.icon as keyof typeof Icons] as LucideIcon) ?? Icons.Shirt;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition-all duration-500 hover:border-gold/40 hover:shadow-soft-xl hover:dual-glow shimmer',
        'gradient-border-animated',
        className,
      )}
    >
      <Link href={`/produk?kategori=${category.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="eager"
            decoding="async"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

          {/* Icon badge with enhanced glow */}
          <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 backdrop-blur transition-all duration-500 group-hover:bg-gold-gradient group-hover:shadow-lg group-hover:shadow-gold-400/30">
            <Icon className="h-5 w-5 text-navy transition-all duration-300 group-hover:scale-110 group-hover:text-navy-900" />
          </div>

          {/* Content overlay */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="flex items-end justify-between">
              <div>
                <span className="label-eyebrow text-gold-300">
                  {category.productCount} Produk
                </span>
                <h3 className="mt-1.5 text-xl font-bold tracking-tight text-white">
                  {category.name}
                </h3>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all duration-500 group-hover:bg-gold-gradient group-hover:text-navy group-hover:rotate-45 group-hover:scale-110">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="p-5 text-sm leading-relaxed text-slate-500">
          {category.description}
        </p>
      </Link>
    </motion.div>
  );
}
