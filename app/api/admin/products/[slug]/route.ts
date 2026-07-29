import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase';
import type { Product } from '@/types';

// GET /api/admin/products/[slug] — get single product
export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const sb = createSupabaseAdmin();
  const { data, error } = await sb
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json({ product: rowToProduct(data) });
}

// PUT /api/admin/products/[slug] — update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const body = await request.json();
  const sb = createSupabaseAdmin();

  const row = productToRow(body);

  const { data, error } = await sb
    .from('products')
    .update(row)
    .eq('slug', params.slug)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ product: rowToProduct(data) });
}

// DELETE /api/admin/products/[slug] — delete product
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const sb = createSupabaseAdmin();
  const { error } = await sb
    .from('products')
    .delete()
    .eq('slug', params.slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

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
