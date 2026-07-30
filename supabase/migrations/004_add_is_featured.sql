-- Add is_featured column to products table
-- This allows admin to control which products appear on the homepage featured section

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Optional: seed — mark some products as featured by default
UPDATE products SET is_featured = TRUE WHERE slug IN (
  'seragam-sekolah-standar',
  'seragam-olahraga-sekolah',
  'kaos-polo-shirt',
  'jaket-trophy'
);
