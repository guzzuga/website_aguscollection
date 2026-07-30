// Server component: fetch featured products from Supabase
import { createSupabaseClient } from '@/lib/supabase';
import { ProductCard } from '@/components/product/product-card';

export default async function FeaturedProductsServer() {
  try {
    const sb = createSupabaseClient();
    const { data, error } = await sb
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .limit(8);

    if (!error && data && data.length > 0) {
      const products = data.map((row: Record<string, unknown>) => ({
        slug: row.slug as string,
        name: row.name as string,
        category: row.category as string,
        categoryLabel: (row.category_label as string) || '',
        shortDescription: (row.short_description as string) || '',
        description: (row.description as string) || '',
        images: Array.isArray(row.images)
          ? (row.images as string[])
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
        isFeatured: !!row.is_featured,
      }));

      return (
        <>
          {products.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </>
      );
    }
  } catch {
    // Supabase not configured or query failed — show nothing
  }

  // No featured products found
  return null;
}
