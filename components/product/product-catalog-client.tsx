'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronRight } from 'lucide-react';
import type { Category, Product } from '@/types';
import { ProductCard } from '@/components/product/product-card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { staggerContainer, fadeUp, viewportOnce } from '@/animations/variants';

type Props = {
  categories: Category[];
  products: Product[];
  activeCategory: string;
};

const ALL_SLUG = 'semua';

export function ProductCatalogClient({ categories, products, activeCategory: initialCategory }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(initialCategory);
  const [query, setQuery] = useState('');
  const tabsRef = useRef<HTMLDivElement>(null);

  // Sync URL → state when browser back/forward is used
  useEffect(() => {
    const cat = searchParams.get('kategori') ?? ALL_SLUG;
    setActive(cat);
  }, [searchParams]);

  const selectCategory = useCallback(
    (slug: string) => {
      setActive(slug);
      setQuery('');
      const url = slug === ALL_SLUG ? '/produk' : `/produk?kategori=${slug}`;
      router.push(url, { scroll: false });
    },
    [router],
  );

  const filtered = products.filter((p) => {
    const matchCat = active === ALL_SLUG || p.category === active;
    const matchQ =
      query === '' ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const activeCategoryData = categories.find((c) => c.slug === active);

  return (
    <div className="pt-24 lg:pt-28">
      {/* Hero header */}
      <section className="relative overflow-hidden bg-navy py-14 lg:py-20">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-gold/15 blur-[100px]"
        />
        <div className="container-page relative">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-slate-400">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Produk</span>
            {activeCategoryData && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-gold-300">{activeCategoryData.name}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="label-eyebrow text-gold-300">
                {active === ALL_SLUG ? 'Semua Produk' : activeCategoryData?.name}
              </span>
              <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {active === ALL_SLUG
                  ? 'Katalog Lengkap'
                  : activeCategoryData?.name ?? 'Produk'}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-[1.7] text-slate-300 sm:text-base">
                {active === ALL_SLUG
                  ? 'Temukan semua produk konveksi premium Agus Collection — seragam, kaos custom, polo shirt, jaket, wearpack, bahan kain, dan atribut sekolah.'
                  : activeCategoryData?.description}
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari produk..."
                className="rounded-xl border-white/15 bg-white/10 pl-10 text-white placeholder:text-slate-400 focus-visible:ring-gold"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label="Hapus pencarian"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky category tabs */}
      <div className="sticky top-16 z-40 border-b border-slate-200 bg-white/95 shadow-soft backdrop-blur lg:top-20">
        <div className="container-page">
          <div
            ref={tabsRef}
            className="scrollbar-hide -mx-5 flex items-center gap-2 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
          >
            {/* All tab */}
            <CategoryTab
              label="Semua"
              icon="Grid3X3"
              isActive={active === ALL_SLUG}
              onClick={() => selectCategory(ALL_SLUG)}
            />
            {categories.map((cat) => (
              <CategoryTab
                key={cat.slug}
                label={cat.name}
                icon={cat.icon}
                isActive={active === cat.slug}
                onClick={() => selectCategory(cat.slug)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <section className="py-12 lg:py-16">
        <div className="container-page">
          {/* Result count + active filter info */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              Menampilkan{' '}
              <span className="font-semibold text-navy">{filtered.length}</span>{' '}
              produk
              {active !== ALL_SLUG && activeCategoryData && (
                <> dalam <span className="font-semibold text-gold-700">{activeCategoryData.name}</span></>
              )}
              {query && (
                <> untuk &ldquo;<span className="font-semibold text-navy">{query}</span>&rdquo;</>
              )}
            </p>
            {(active !== ALL_SLUG || query) && (
              <button
                onClick={() => { selectCategory(ALL_SLUG); setQuery(''); }}
                className="flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-navy"
              >
                <X className="h-3.5 w-3.5" />
                Hapus filter
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                  <SlidersHorizontal className="h-10 w-10" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-navy">Produk Tidak Ditemukan</h3>
                <p className="mt-2 max-w-sm text-sm text-slate-500">
                  Tidak ada produk yang cocok dengan pencarian Anda. Coba kata kunci lain atau hapus filter.
                </p>
                <button
                  onClick={() => { selectCategory(ALL_SLUG); setQuery(''); }}
                  className="mt-5 text-sm font-semibold text-gold-700 underline-offset-2 hover:underline"
                >
                  Lihat semua produk
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`${active}-${query}`}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filtered.map((product, i) => (
                  <ProductCard key={product.slug} product={product} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Category showcase — only on "semua" without query */}
      {active === ALL_SLUG && !query && (
        <section className="border-t border-slate-200 bg-slate-50/50 py-16 lg:py-20">
          <div className="container-page">
            <h2 className="mb-10 font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              Jelajahi per Kategori
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
              {categories.map((cat, i) => {
                const Icon = (Icons[cat.icon as keyof typeof Icons] as LucideIcon) ?? Icons.Shirt;
                return (
                  <motion.button
                    key={cat.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    onClick={() => selectCategory(cat.slug)}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-soft transition-all hover:border-gold/40 hover:shadow-soft-lg"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold-300 transition-all group-hover:bg-gold-gradient group-hover:text-navy">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-sm font-bold leading-tight text-navy">{cat.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">{cat.productCount}+ produk</p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function CategoryTab({
  label,
  icon,
  isActive,
  onClick,
}: {
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = (Icons[icon as keyof typeof Icons] as LucideIcon) ?? Icons.Shirt;
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-4 py-4 text-sm font-semibold transition-all duration-200',
        isActive
          ? 'border-gold-500 text-navy'
          : 'border-transparent text-slate-500 hover:text-navy',
      )}
    >
      <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-gold-600' : 'text-slate-400')} />
      {label}
      {isActive && (
        <motion.span
          layoutId="tab-underline"
          className="absolute inset-x-0 bottom-0 h-0.5 bg-gold-gradient"
        />
      )}
    </button>
  );
}
