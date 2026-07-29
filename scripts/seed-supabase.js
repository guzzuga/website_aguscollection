const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxdmNhaXdxbmthc2JqZmh0dG1rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTMyODA2OCwiZXhwIjoyMTAwOTA0MDY4fQ.UZQJSUlo3MlbIrNh-KZUDhXbUFcu7WKvj-VVMaa4n44";
const SUPA_URL = "https://cqvcaiwqnkasbjfhttmk.supabase.co";

const sb = createClient(SUPA_URL, SERVICE_KEY);
const products = JSON.parse(fs.readFileSync("/tmp/products.json", "utf8"));

const rows = products.map((p, i) => ({
  slug: p.slug,
  name: p.name,
  category: p.category,
  category_label: p.categoryLabel,
  short_description: p.shortDescription,
  description: p.description,
  images: JSON.stringify(p.images),
  base_price: p.basePrice,
  price_tiers: JSON.stringify(p.priceTiers),
  colors: JSON.stringify(p.colors),
  sizes: JSON.stringify(p.sizes),
  education_pricing: p.educationPricing ? JSON.stringify(p.educationPricing) : null,
  features: JSON.stringify(p.features),
  specifications: JSON.stringify(p.specifications),
  badge: p.badge || null,
  shopee_url: p.shopeeUrl || null,
  rating: p.rating,
  review_count: p.reviewCount,
  is_active: true,
  sort_order: i
}));

sb.from("products").insert(rows).select("id, slug, name").then(r => {
  if (r.error) console.log("ERROR:", JSON.stringify(r.error));
  else console.log("Seeded", r.data.length, "products");
  r.data.forEach(p => console.log(" ", p.slug));
});
