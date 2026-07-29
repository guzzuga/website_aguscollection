import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products as staticProducts, getProductBySlug } from '@/constants/products';
import { siteConfig } from '@/constants/site';
import { ProductDetailClient } from '@/components/product/product-detail-client';
import { createSupabaseClient } from '@/lib/supabase';
import type { Product, EducationPricing, PriceTier, ProductColor, ProductSize } from '@/types';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
// Safe JSON parse that always returns an array (or undefined)
function safeArrayField<T>(val: unknown): T[] | undefined {
  if (val === null || val === undefined) return undefined;
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : undefined;
    } catch {
      return undefined;
    }
  }
  return Array.isArray(val) ? val : undefined;
}

function parseJSONField<T>(val: unknown): T | undefined {
  if (val === null || val === undefined) return undefined;
  if (typeof val === 'string') {
    try { return JSON.parse(val) as T; } catch { return val as T; }
  }
  return val as T;
}

async function fetchProduct(slug: string): Promise<Product | undefined> {
  try {
    const sb = createSupabaseClient();
    const { data, error } = await sb
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error || !data) return getProductBySlug(slug);

    const product: Product = {
      slug: data.slug,
      name: data.name,
      category: data.category,
      categoryLabel: data.category_label,
      shortDescription: data.short_description,
      description: data.description,
      images: safeArrayField<string>(data.images) || [],
      basePrice: data.base_price,
      priceTiers: safeArrayField<PriceTier>(data.price_tiers) || [],
      colors: safeArrayField<ProductColor>(data.colors) || [],
      sizes: safeArrayField<ProductSize>(data.sizes) || [],
      educationPricing: safeArrayField<EducationPricing>(data.education_pricing),
      features: safeArrayField<string>(data.features) || [],
      specifications: safeArrayField<{ label: string; value: string }>(data.specifications) || [],
      badge: data.badge || undefined,
      shopeeUrl: data.shopee_url || undefined,
      rating: data.rating,
      reviewCount: data.review_count,
      priceRange: undefined,
    };

    // Ensure all array fields are actual arrays
    if (!Array.isArray(product.priceTiers)) product.priceTiers = [];
    if (!Array.isArray(product.educationPricing)) product.educationPricing = [];
    if (!Array.isArray(product.features)) product.features = [];
    if (!Array.isArray(product.specifications)) product.specifications = [];
    if (!Array.isArray(product.colors)) product.colors = [];
    if (!Array.isArray(product.sizes)) product.sizes = [];
    if (!Array.isArray(product.images)) product.images = [];

    return product;
  } catch {
    return getProductBySlug(slug);
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await fetchProduct(params.slug);
  if (!product) return {};

  const title = `${product.name} — ${product.categoryLabel}`;
  const description = product.shortDescription;

  return {
    title,
    description,
    alternates: { canonical: `/produk/${product.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/produk/${product.slug}`,
      images: [{ url: product.images[0], width: 1200, height: 900, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await fetchProduct(params.slug);
  if (!product) notFound();

  const ep = product.educationPricing && product.educationPricing.length > 0
    ? product.educationPricing
    : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.slug,
    category: product.categoryLabel,
    brand: { '@type': 'Brand', name: siteConfig.name },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
      ...(ep
        ? {
            priceSpecification: ep.map(e => ({
              '@type': 'PriceSpecification',
              price: e.basePrice,
              name: e.label,
            })),
          }
        : {
            lowPrice: product.priceTiers[product.priceTiers.length - 1]?.price,
            highPrice: product.priceTiers[0]?.price,
          }),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
