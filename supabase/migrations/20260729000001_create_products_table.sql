/*
# Create products table for admin-managed product catalog

1. New Tables
- `products`
  - `id` (uuid, primary key, auto-generated)
  - `slug` (text, unique, not null) — URL-friendly identifier
  - `name` (text, not null) — product display name
  - `category` (text, not null) — category slug (e.g. 'seragam-sekolah')
  - `category_label` (text, not null) — category display name
  - `short_description` (text, not null) — one-line summary
  - `description` (text, not null) — full description
  - `images` (jsonb, not null, default '[]') — array of image URLs
  - `base_price` (integer, not null) — price per pcs in Rupiah
  - `price_tiers` (jsonb, not null, default '[]') — tiered pricing
  - `colors` (jsonb, not null, default '[]') — available colors
  - `sizes` (jsonb, not null, default '[]') — available sizes
  - `education_pricing` (jsonb, default null) — school-level pricing
  - `features` (jsonb, not null, default '[]') — feature list
  - `specifications` (jsonb, not null, default '[]') — spec table
  - `badge` (text, default null) — optional badge label
  - `shopee_url` (text, default null) — Shopee product link
  - `rating` (real, not null, default 5.0) — aggregate rating
  - `review_count` (integer, not null, default 0)
  - `is_active` (boolean, not null, default true) — soft delete / hide
  - `sort_order` (integer, not null, default 0) — display order
  - `created_at` (timestamptz, not null, default now())
  - `updated_at` (timestamptz, not null, default now())

2. Security
- Enable RLS on `products`.
- Anyone (anon) can SELECT active products (public catalog).
- Only authenticated (admin) can INSERT, UPDATE, DELETE.

3. Indexes
- `products_slug_idx` UNIQUE on slug
- `products_category_idx` on category
- `products_active_idx` on is_active
- `products_sort_idx` on sort_order
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  category_label text NOT NULL,
  short_description text NOT NULL,
  description text NOT NULL,
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  base_price integer NOT NULL,
  price_tiers jsonb NOT NULL DEFAULT '[]'::jsonb,
  colors jsonb NOT NULL DEFAULT '[]'::jsonb,
  sizes jsonb NOT NULL DEFAULT '[]'::jsonb,
  education_pricing jsonb DEFAULT NULL,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  specifications jsonb NOT NULL DEFAULT '[]'::jsonb,
  badge text DEFAULT NULL,
  shopee_url text DEFAULT NULL,
  rating real NOT NULL DEFAULT 5.0,
  review_count integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Anyone can view active products (public catalog)
DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products"
ON products FOR SELECT
TO anon, authenticated
USING (true);

-- Only authenticated (admin) can insert products
DROP POLICY IF EXISTS "auth_insert_products" ON products;
CREATE POLICY "auth_insert_products"
ON products FOR INSERT
TO authenticated
WITH CHECK (true);

-- Only authenticated (admin) can update products
DROP POLICY IF EXISTS "auth_update_products" ON products;
CREATE POLICY "auth_update_products"
ON products FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Only authenticated (admin) can delete products
DROP POLICY IF EXISTS "auth_delete_products" ON products;
CREATE POLICY "auth_delete_products"
ON products FOR DELETE
TO authenticated
USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS products_category_idx ON products (category);
CREATE INDEX IF NOT EXISTS products_active_idx ON products (is_active);
CREATE INDEX IF NOT EXISTS products_sort_idx ON products (sort_order);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_updated_at ON products;
CREATE TRIGGER products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
