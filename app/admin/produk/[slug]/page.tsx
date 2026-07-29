import { notFound } from 'next/navigation';
import { createSupabaseAdmin } from '@/lib/supabase';
import { ProductForm } from '@/components/admin/product-form';
import type { Product } from '@/types';

export default async function EditProductPage({ params }: { params: { slug: string } }) {
  const sb = createSupabaseAdmin();
  const { data, error } = await sb
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !data) return notFound();

  const product: Product = {
    slug: data.slug,
    name: data.name,
    category: data.category,
    categoryLabel: data.category_label,
    shortDescription: data.short_description,
    description: data.description,
    images: data.images,
    basePrice: data.base_price,
    priceTiers: data.price_tiers,
    colors: data.colors,
    sizes: data.sizes,
    educationPricing: data.education_pricing,
    features: data.features,
    specifications: data.specifications,
    badge: data.badge || undefined,
    shopeeUrl: data.shopee_url || undefined,
    rating: data.rating,
    reviewCount: data.review_count,
    priceRange: undefined,
  };

  return <ProductForm mode="edit" initialData={product} />;
}
