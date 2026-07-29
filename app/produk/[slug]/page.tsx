import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products as staticProducts, getProductBySlug } from '@/constants/products';
import { siteConfig } from '@/constants/site';
import { ProductDetailClient } from '@/components/product/product-detail-client';
import { createSupabaseClient } from '@/lib/supabase';
import type { Product } from '@/types';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

function parseJSONField<T>(val: T): T {
  if (typeof val === 'string') {
    try { return JSON.parse(val) as T; } catch { return val; }
  }
  return val;
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

    return {
      slug: data.slug,
      name: data.name,
      category: data.category,
      categoryLabel: data.category_label,
      shortDescription: data.short_description,
      description: data.description,
      images: parseJSONField(data.images) || [],
      basePrice: data.base_price,
      priceTiers: parseJSONField(data.price_tiers) || [],
      colors: parseJSONField(data.colors) || [],
      sizes: parseJSONField(data.sizes) || [],
      educationPricing: parseJSONField(data.education_pricing),
      features: parseJSONField(data.features) || [],
      specifications: parseJSONField(data.specifications) || [],
      badge: data.badge || undefined,
      shopeeUrl: data.shopee_url || undefined,
      rating: data.rating,
      reviewCount: data.review_count,
      priceRange: undefined,
    };
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
      '@type': 'AggregateOffer',
      lowPrice: product.priceTiers[product.priceTiers.length - 1].price,
      highPrice: product.priceTiers[0].price,
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
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
