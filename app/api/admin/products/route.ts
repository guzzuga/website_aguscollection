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
function parseJSON<T>(val: T): T {
  if (typeof val === 'string') {
    try { return JSON.parse(val) as T; } catch { return val; }
  }
  return val;
}

function rowToProduct(row: Record<string, unknown>): Product {
  return {
    slug: row.slug as string,
    name: row.name as string,
    category: row.category as Product['category'],
    categoryLabel: row.category_label as string,
    shortDescription: row.short_description as string,
    description: row.description as string,
    images: parseJSON(row.images) || [],
    basePrice: row.base_price as number,
    priceTiers: parseJSON(row.price_tiers) || [],
    colors: parseJSON(row.colors) || [],
    sizes: parseJSON(row.sizes) || [],
    educationPricing: parseJSON(row.education_pricing),
    features: parseJSON(row.features) || [],
    specifications: parseJSON(row.specifications) || [],
    badge: (row.badge as string) || undefined,
    shopeeUrl: (row.shopee_url as string) || undefined,
    rating: row.rating as number,
    reviewCount: row.review_count as number,
    priceRange: undefined,
  };
}

// Helper: Product → DB row (snake_case, JSONB fields sent as arrays)
function productToRow(p: Partial<Product>) {
  const row: Record<string, unknown> = {};

  if (p.slug !== undefined) row.slug = p.slug;
  if (p.name !== undefined) row.name = p.name;
  if (p.category !== undefined) row.category = p.category;
  if (p.categoryLabel !== undefined) row.category_label = p.categoryLabel;
  if (p.shortDescription !== undefined) row.short_description = p.shortDescription;
  if (p.description !== undefined) row.description = p.description;
  if (p.images !== undefined) row.images = p.images;       // JSONB — array directly
  if (p.basePrice !== undefined) row.base_price = p.basePrice;
  if (p.priceTiers !== undefined) row.price_tiers = p.priceTiers;
  if (p.colors !== undefined) row.colors = p.colors;
  if (p.sizes !== undefined) row.sizes = p.sizes;
  if (p.educationPricing !== undefined) {
    row.education_pricing = p.educationPricing || null;
  }
  if (p.features !== undefined) row.features = p.features;
  if (p.specifications !== undefined) row.specifications = p.specifications;
  if (p.badge !== undefined) row.badge = p.badge || null;
  if (p.shopeeUrl !== undefined) row.shopee_url = p.shopeeUrl || null;
  if (p.rating !== undefined) row.rating = p.rating;
  if (p.reviewCount !== undefined) row.review_count = p.reviewCount;

  return row;
}
