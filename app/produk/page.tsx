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
      images: Array.isArray(row.images)
        ? row.images as string[]
        : typeof row.images === 'string'
          ? JSON.parse(row.images)
          : [],
      basePrice: row.base_price as number,
      priceTiers: Array.isArray(row.price_tiers) ? row.price_tiers : (typeof row.price_tiers === 'string' ? JSON.parse(row.price_tiers) : []),
      colors: Array.isArray(row.colors) ? row.colors : (typeof row.colors === 'string' ? JSON.parse(row.colors) : []),
      sizes: Array.isArray(row.sizes) ? row.sizes : (typeof row.sizes === 'string' ? JSON.parse(row.sizes) : []),
      educationPricing: Array.isArray(row.education_pricing) ? row.education_pricing : (typeof row.education_pricing === 'string' ? JSON.parse(row.education_pricing) : []),
      features: Array.isArray(row.features) ? row.features : (typeof row.features === 'string' ? JSON.parse(row.features) : []),
      specifications: Array.isArray(row.specifications) ? row.specifications : (typeof row.specifications === 'string' ? JSON.parse(row.specifications) : []),
      badge: (row.badge as string) || undefined,
      shopeeUrl: (row.shopee_url as string) || undefined,
      rating: row.rating as number,
      reviewCount: row.review_count as number,
      priceRange: undefined,
    }));

    // Ensure all array fields are actual arrays
    products.forEach(p => {
      if (!Array.isArray(p.priceTiers)) p.priceTiers = [];
      if (!Array.isArray(p.educationPricing)) p.educationPricing = [];
      if (!Array.isArray(p.features)) p.features = [];
      if (!Array.isArray(p.specifications)) p.specifications = [];
      if (!Array.isArray(p.colors)) p.colors = [];
      if (!Array.isArray(p.sizes)) p.sizes = [];
      if (!Array.isArray(p.images)) p.images = [];
    });

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
