import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase';
import type { Product } from '@/types';

// GET /api/admin/products — list all products
export async function GET() {
  const sb = createSupabaseAdmin();
  const { data, error } = await sb
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Map DB rows back to Product type (snake_case → camelCase)
  const products: Product[] = (data || []).map(rowToProduct);
  return NextResponse.json({ products });
}

// POST /api/admin/products — create new product
export async function POST(request: NextRequest) {
  const body = await request.json();
  const sb = createSupabaseAdmin();

  const row = productToRow(body);

  const { data, error } = await sb
    .from('products')
    .insert(row)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ product: rowToProduct(data) });
}

// Helper: DB row → Product type
function rowToProduct(row: Record<string, unknown>): Product {
  return {
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
  };
}

// Helper: Product → DB row (snake_case, JSONB fields stringified)
function productToRow(p: Partial<Product>) {
  const row: Record<string, unknown> = {};

  if (p.slug !== undefined) row.slug = p.slug;
  if (p.name !== undefined) row.name = p.name;
  if (p.category !== undefined) row.category = p.category;
  if (p.categoryLabel !== undefined) row.category_label = p.categoryLabel;
  if (p.shortDescription !== undefined) row.short_description = p.shortDescription;
  if (p.description !== undefined) row.description = p.description;
  if (p.images !== undefined) row.images = JSON.stringify(p.images);
  if (p.basePrice !== undefined) row.base_price = p.basePrice;
  if (p.priceTiers !== undefined) row.price_tiers = JSON.stringify(p.priceTiers);
  if (p.colors !== undefined) row.colors = JSON.stringify(p.colors);
  if (p.sizes !== undefined) row.sizes = JSON.stringify(p.sizes);
  if (p.educationPricing !== undefined) {
    row.education_pricing = p.educationPricing ? JSON.stringify(p.educationPricing) : null;
  }
  if (p.features !== undefined) row.features = JSON.stringify(p.features);
  if (p.specifications !== undefined) row.specifications = JSON.stringify(p.specifications);
  if (p.badge !== undefined) row.badge = p.badge || null;
  if (p.shopeeUrl !== undefined) row.shopee_url = p.shopeeUrl || null;
  if (p.rating !== undefined) row.rating = p.rating;
  if (p.reviewCount !== undefined) row.review_count = p.reviewCount;

  return row;
}
