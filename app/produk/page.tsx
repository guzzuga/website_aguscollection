import type { Metadata } from 'next';
import { categories as staticCategories, products as staticProducts } from '@/constants/products';
import { siteConfig } from '@/constants/site';
import { ProductCatalogClient } from '@/components/product/product-catalog-client';
import { createSupabaseClient } from '@/lib/supabase';
import type { Product, Category } from '@/types';

export const metadata: Metadata = {
  title: 'Katalog Produk',
  description:
    'Katalog lengkap produk Agus Collection: seragam sekolah, seragam perusahaan, kaos custom, polo shirt, wearpack, jaket, bahan kain, dan atribut sekolah dengan kualitas premium dan harga langsung pabrik.',
  alternates: { canonical: '/produk' },
  openGraph: {
    title: 'Katalog Produk | Agus Collection',
    description:
      'Semua produk konveksi premium Agus Collection tersedia lengkap. Seragam sekolah, perusahaan, kaos custom, polo shirt, wearpack, jaket, dan bahan kain.',
    url: `${siteConfig.url}/produk`,
  },
};

// Force dynamic rendering so new products from admin appear immediately
export const dynamic = 'force-dynamic';

async function fetchProducts(): Promise<{ products: Product[]; categories: Category[] }> {
  try {
    const sb = createSupabaseClient();
    const { data, error } = await sb
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return { products: staticProducts, categories: staticCategories };
    }

    const products: Product[] = data.map((row: Record<string, unknown>) => ({
      slug: row.slug as string,
      name: row.name as string,
      category: row.category as Product['category'],
      categoryLabel: row.category_label as string,
      shortDescription: row.short_description as string,
      description: row.description as string,
      images: row.images as string[],
      basePrice: row.base_price as number,
      priceTiers: row.price_tiers as Product['priceTiers'],
      colors: row.colors as Product['colors'],
      sizes: row.sizes as Product['sizes'],
      educationPricing: row.education_pricing as Product['educationPricing'],
      features: row.features as string[],
      specifications: row.specifications as Product['specifications'],
      badge: (row.badge as string) || undefined,
      shopeeUrl: (row.shopee_url as string) || undefined,
      rating: row.rating as number,
      reviewCount: row.review_count as number,
      priceRange: undefined,
    }));

    return { products, categories: staticCategories };
  } catch {
    return { products: staticProducts, categories: staticCategories };
  }
}

export default async function ProdukPage({
  searchParams,
}: {
  searchParams: { kategori?: string };
}) {
  const activeCategory = searchParams.kategori ?? 'semua';
  const { products, categories } = await fetchProducts();

  return (
    <ProductCatalogClient
      categories={categories}
      products={products}
      activeCategory={activeCategory}
    />
  );
}
