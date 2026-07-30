'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { Product, ProductCategory, PriceTier, ProductColor } from '@/types';

const CATEGORY_OPTIONS: { value: ProductCategory; label: string }[] = [
  { value: 'seragam-sekolah', label: 'Seragam Sekolah' },
  { value: 'seragam-perusahaan', label: 'Seragam Perusahaan' },
  { value: 'kaos-custom', label: 'Kaos Custom' },
  { value: 'fashion-stylish', label: 'Fashion Stylish' },
  { value: 'polo-shirt', label: 'Polo Shirt' },
  { value: 'wearpack', label: 'Wearpack' },
  { value: 'almamater', label: 'Almamater & Jaz' },
  { value: 'bahan-kain', label: 'Bahan Kain' },
  { value: 'atribut-sekolah', label: 'Atribut Sekolah' },
];

const EMPTY_PRODUCT: Product = {
  slug: '',
  name: '',
  category: 'seragam-sekolah',
  categoryLabel: 'Seragam Sekolah',
  shortDescription: '',
  description: '',
  images: [],
  basePrice: 0,
  priceTiers: [
    { minQty: 1, maxQty: 49, label: 'Retail', price: 0 },
    { minQty: 50, maxQty: 99, label: 'Grosir', price: 0 },
    { minQty: 100, maxQty: null, label: 'Partai Besar', price: 0 },
  ],
  colors: [],
  sizes: [],
  rating: 5,
  reviewCount: 0,
  features: [],
  specifications: [],
};

interface ProductFormProps {
  mode: 'create' | 'edit';
  initialData?: Product;
}

export function ProductForm({ mode, initialData }: ProductFormProps) {
  const router = useRouter();
  const initialized = useRef(false);
  const [product, setProduct] = useState<Product>(() => {
    if (initialData) {
      // Ensure all arrays exist on initialData
      return {
        ...initialData,
        features: initialData.features || [],
        specifications: initialData.specifications || [],
        colors: initialData.colors || [],
        sizes: initialData.sizes || [],
        images: initialData.images || [],
        priceTiers: initialData.priceTiers || EMPTY_PRODUCT.priceTiers,
      };
    }
    return EMPTY_PRODUCT;
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newSpecLabel, setNewSpecLabel] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#1e3a5f');
  const [newSize, setNewSize] = useState('');

  // Auto-generate slug from name (create mode only)
  useEffect(() => {
    if (mode !== 'create' || !product.name) return;
    if (initialized.current) return;
    initialized.current = true;
    const slug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    setProduct(prev => ({ ...prev, slug }));
  }, [product.name, mode]);

  // Image upload
  const uploadImage = useCallback(async (file: File, index: number) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('slug', product.slug || 'temp-' + Date.now());
    formData.append('index', String(index));

    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.url as string;
  }, [product.slug]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      const urls = await Promise.all(
        files.map((file, i) => uploadImage(file, (product.images?.length || 0) + i + 1))
      );
      setProduct(prev => ({
        ...prev,
        images: [...(prev.images || []), ...urls],
      }));
    } catch (err) {
      setError('Gagal upload gambar: ' + (err as Error).message);
    }
  }

  function removeImage(index: number) {
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }

  // Features
  function addFeature() {
    if (!newFeature.trim()) return;
    setProduct(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }));
    setNewFeature('');
  }
  function removeFeature(i: number) {
    setProduct(prev => ({ ...prev, features: prev.features.filter((_, idx) => idx !== i) }));
  }

  // Specifications
  function addSpec() {
    if (!newSpecLabel.trim() || !newSpecValue.trim()) return;
    setProduct(prev => ({
      ...prev,
      specifications: [...prev.specifications, { label: newSpecLabel.trim(), value: newSpecValue.trim() }],
    }));
    setNewSpecLabel('');
    setNewSpecValue('');
  }
  function removeSpec(i: number) {
    setProduct(prev => ({ ...prev, specifications: prev.specifications.filter((_, idx) => idx !== i) }));
  }

  // Colors
  function addColor() {
    if (!newColorName.trim()) return;
    const color: ProductColor = { name: newColorName.trim(), hex: newColorHex };
    setProduct(prev => ({ ...prev, colors: [...prev.colors, color] }));
    setNewColorName('');
  }
  function removeColor(i: number) {
    setProduct(prev => ({ ...prev, colors: prev.colors.filter((_, idx) => idx !== i) }));
  }

  // Sizes
  function addSize() {
    if (!newSize.trim()) return;
    setProduct(prev => ({ ...prev, sizes: [...prev.sizes, newSize.trim()] }));
    setNewSize('');
  }
  function removeSize(i: number) {
    setProduct(prev => ({ ...prev, sizes: prev.sizes.filter((_, idx) => idx !== i) }));
  }

  // Price tiers
  function updateTier(i: number, field: keyof PriceTier, value: string | number | null) {
    setProduct(prev => ({
      ...prev,
      priceTiers: prev.priceTiers.map((tier, idx) => {
        if (idx !== i) return tier;
        const updated = { ...tier };
        if (field === 'price' || field === 'minQty' || field === 'maxQty') {
          (updated as Record<string, unknown>)[field] = value === '' ? null : Number(value);
        } else {
          (updated as Record<string, unknown>)[field] = value;
        }
        return updated;
      }),
    }));
  }
  function addTier() {
    setProduct(prev => ({
      ...prev,
      priceTiers: [...prev.priceTiers, { minQty: 1, maxQty: null, label: 'Tier Baru', price: 0 }],
    }));
  }
  function removeTier(i: number) {
    setProduct(prev => ({ ...prev, priceTiers: prev.priceTiers.filter((_, idx) => idx !== i) }));
  }

  // Save
  async function handleSave() {
    setSaving(true);
    setError('');

    if (!product.name || !product.slug || !product.shortDescription || !product.description) {
      setError('Nama, slug, deskripsi singkat, dan deskripsi wajib diisi');
      setSaving(false);
      return;
    }

    const url = mode === 'create'
      ? '/api/admin/products'
      : `/api/admin/products/${initialData?.slug}`;
    const method = mode === 'create' ? 'POST' : 'PUT';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    const data = await res.json();
    if (data.error) {
      setError(data.error);
      setSaving(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  const inputClass = 'w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold/50';
  const labelClass = 'block text-sm font-medium text-slate-300 mb-1.5';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {mode === 'create' ? 'Tambah Produk Baru' : 'Edit Produk'}
          </h2>
          <p className="text-slate-400 text-sm mt-1">{product.name || 'Produk tanpa nama'}</p>
        </div>
        <button
          onClick={() => router.push('/admin')}
          className="text-sm text-slate-400 hover:text-white"
        >
          ← Kembali
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Basic Info */}
        <section className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
          <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">Informasi Dasar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Nama Produk *</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                className={inputClass}
                placeholder="Contoh: Seragam Sekolah Standar"
              />
            </div>
            <div>
              <label className={labelClass}>Slug (URL) *</label>
              <input
                type="text"
                value={product.slug}
                onChange={(e) => setProduct({ ...product, slug: e.target.value })}
                className={inputClass}
                placeholder="seragam-sekolah-standar"
                disabled={mode === 'edit'}
              />
            </div>
            <div>
              <label className={labelClass}>Kategori *</label>
              <select
                value={product.category}
                onChange={(e) => {
                  const val = e.target.value as ProductCategory;
                  const cat = CATEGORY_OPTIONS.find(c => c.value === val);
                  setProduct({ ...product, category: val, categoryLabel: cat?.label || '' });
                }}
                className={inputClass}
              >
                {CATEGORY_OPTIONS.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Deskripsi Singkat *</label>
              <input
                type="text"
                value={product.shortDescription}
                onChange={(e) => setProduct({ ...product, shortDescription: e.target.value })}
                className={inputClass}
                placeholder="Satu kalimat ringkas tentang produk"
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Deskripsi Lengkap *</label>
              <textarea
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                rows={4}
                className={inputClass}
                placeholder="Deskripsi detail produk, bahan, keunggulan, dll."
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
          <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">Harga</h3>

          {product.category === 'seragam-sekolah' ? (
            <>
              <p className="text-xs text-slate-500 mb-4">Kategori Seragam Sekolah — gunakan harga per level SD/SMP/SMA</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-slate-300">Tier Harga (Grosir)</label>
                  <button onClick={addTier} className="text-xs text-gold hover:text-amber-400">+ Tambah Tier</button>
                </div>
                {product.priceTiers.map((tier, i) => (
                  <div key={i} className="grid grid-cols-2 md:grid-cols-5 gap-2 items-center bg-slate-800/50 p-3 rounded-lg">
                    <input
                      type="text"
                      value={tier.label}
                      onChange={(e) => updateTier(i, 'label', e.target.value)}
                      className={inputClass}
                      placeholder="Label"
                    />
                    <input
                      type="number"
                      value={tier.minQty}
                      onChange={(e) => updateTier(i, 'minQty', e.target.value)}
                      className={inputClass}
                      placeholder="Min Qty"
                    />
                    <input
                      type="number"
                      value={tier.maxQty ?? ''}
                      onChange={(e) => updateTier(i, 'maxQty', e.target.value)}
                      className={inputClass}
                      placeholder="Max Qty"
                    />
                    <div className="relative">
                      <input
                        type="number"
                        value={tier.discount ?? 0}
                        onChange={(e) => updateTier(i, 'discount', e.target.value)}
                        className={inputClass}
                        placeholder="Diskon"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">/pcs</span>
                    </div>
                    <button
                      onClick={() => removeTier(i)}
                      className="text-xs text-red-400 hover:text-red-300 px-2"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>

              {/* Auto-calc preview */}
              {product.educationPricing && product.educationPricing.length > 0 && product.priceTiers.length > 0 && (
                <div className="mt-4 bg-slate-800/30 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-2 font-semibold">CONTOH HARGA SETELAH DISKON:</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
                    <div className="text-slate-500">Tier:</div>
                    <div className="text-slate-500">Level:</div>
                    <div className="text-slate-500">Harga Awal:</div>
                    <div className="text-slate-500">Setelah Diskon:</div>
                    {product.educationPricing.map(ep => (
                      <div key={ep.level} className="grid grid-cols-4 gap-2 py-1 border-t border-slate-700">
                        <span className="text-slate-500">{ep.label}</span>
                        {product.priceTiers.filter(t => (t.discount ?? 0) > 0).map(tier => {
                          const original = ep.basePrice;
                          const discounted = Math.max(0, original - (tier.discount ?? 0));
                          return (
                            <span key={tier.label} className="text-slate-300">
                              {tier.label}: {original} → {discounted}
                            </span>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-xs text-slate-500 mb-4">Kategori non-seragam sekolah — gunakan harga dasar per produk</p>
              <div className="mb-4">
                <label className={labelClass}>Harga Dasar (per pcs, Rp) *</label>
                <input
                  type="number"
                  value={product.basePrice}
                  onChange={(e) => setProduct({ ...product, basePrice: Number(e.target.value) })}
                  className={inputClass}
                  placeholder="50000"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-slate-300">Tier Harga (Grosir)</label>
                  <button onClick={addTier} className="text-xs text-gold hover:text-amber-400">+ Tambah Tier</button>
                </div>
                {product.priceTiers.map((tier, i) => (
                  <div key={i} className="grid grid-cols-2 md:grid-cols-5 gap-2 items-center bg-slate-800/50 p-3 rounded-lg">
                    <input
                      type="text"
                      value={tier.label}
                      onChange={(e) => updateTier(i, 'label', e.target.value)}
                      className={inputClass}
                      placeholder="Label"
                    />
                    <input
                      type="number"
                      value={tier.minQty}
                      onChange={(e) => updateTier(i, 'minQty', e.target.value)}
                      className={inputClass}
                      placeholder="Min Qty"
                    />
                    <input
                      type="number"
                      value={tier.maxQty ?? ''}
                      onChange={(e) => updateTier(i, 'maxQty', e.target.value)}
                      className={inputClass}
                      placeholder="Max Qty"
                    />
                    <div className="relative">
                      <input
                        type="number"
                        value={tier.discount ?? 0}
                        onChange={(e) => updateTier(i, 'discount', e.target.value)}
                        className={inputClass}
                        placeholder="Diskon"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">/pcs</span>
                    </div>
                    <button
                      onClick={() => removeTier(i)}
                      className="text-xs text-red-400 hover:text-red-300 px-2"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
              {/* Preview diskon dari harga dasar */}
              {product.priceTiers.filter(t => (t.discount ?? 0) > 0).length > 0 && (
                <div className="mt-4 bg-slate-800/30 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-2 font-semibold">CONTOH HARGA SETELAH DISKON:</p>
                  <div className="space-y-1 text-xs">
                    {product.priceTiers.filter(t => (t.discount ?? 0) > 0).map((tier, i) => {
                      const discounted = Math.max(0, product.basePrice - (tier.discount ?? 0));
                      return (
                        <div key={i} className="flex justify-between text-slate-300 py-1 border-t border-slate-700">
                          <span className="text-gold">{tier.label}</span>
                          <span>{product.basePrice} → {discounted}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        {/* Images */}
        <section className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
          <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">Gambar Produk</h3>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gold/20 file:text-gold file:font-medium file:cursor-pointer hover:file:bg-gold/30"
          />
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {product.images.map((img, i) => (
                <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-red-500/80 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Colors & Sizes */}
        <section className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
          <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">Warna & Ukuran</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Colors */}
            <div>
              <label className={labelClass}>Warna Tersedia</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newColorName}
                  onChange={(e) => setNewColorName(e.target.value)}
                  className={inputClass}
                  placeholder="Nama warna"
                />
                <input
                  type="color"
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                  className="w-12 h-10 bg-slate-900 border border-slate-700 rounded-lg cursor-pointer"
                />
                <button onClick={addColor} className="px-3 bg-slate-800 text-slate-300 rounded-lg text-sm hover:bg-slate-700">+</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, i) => (
                  <div key={i} className="flex items-center gap-2 bg-slate-800 px-2 py-1 rounded-lg text-sm">
                    <span className="w-4 h-4 rounded-full" style={{ background: color.hex }} />
                    <span className="text-slate-300">{color.name}</span>
                    <button onClick={() => removeColor(i)} className="text-red-400 hover:text-red-300">×</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className={labelClass}>Ukuran Tersedia</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSize())}
                  className={inputClass}
                  placeholder="Contoh: S, M, L, 26, 27..."
                />
                <button onClick={addSize} className="px-3 bg-slate-800 text-slate-300 rounded-lg text-sm hover:bg-slate-700">+</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, i) => (
                  <div key={i} className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg text-sm">
                    <span className="text-slate-300">{size}</span>
                    <button onClick={() => removeSize(i)} className="text-red-400 hover:text-red-300">×</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
          <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">Keunggulan Produk</h3>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              className={inputClass}
              placeholder="Contoh: Bahan katun combed 30s"
            />
            <button onClick={addFeature} className="px-3 bg-slate-800 text-slate-300 rounded-lg text-sm hover:bg-slate-700">+</button>
          </div>
          <ul className="space-y-1">
            {product.features.map((f, i) => (
              <li key={i} className="flex items-center justify-between bg-slate-800/50 px-3 py-2 rounded-lg text-sm text-slate-300">
                {f}
                <button onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-300">×</button>
              </li>
            ))}
          </ul>
        </section>

        {/* Specifications */}
        <section className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
          <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">Spesifikasi</h3>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 mb-3">
            <input
              type="text"
              value={newSpecLabel}
              onChange={(e) => setNewSpecLabel(e.target.value)}
              className={inputClass}
              placeholder="Label (contoh: Bahan)"
            />
            <input
              type="text"
              value={newSpecValue}
              onChange={(e) => setNewSpecValue(e.target.value)}
              className={inputClass}
              placeholder="Nilai (contoh: Katun Combed 30s)"
            />
            <button onClick={addSpec} className="px-3 bg-slate-800 text-slate-300 rounded-lg text-sm hover:bg-slate-700">+</button>
          </div>
          <div className="space-y-1">
            {product.specifications.map((spec, i) => (
              <div key={i} className="flex items-center justify-between bg-slate-800/50 px-3 py-2 rounded-lg text-sm">
                <span className="text-slate-400">{spec.label}</span>
                <span className="text-slate-200">{spec.value}</span>
                <button onClick={() => removeSpec(i)} className="text-red-400 hover:text-red-300">×</button>
              </div>
            ))}
          </div>
        </section>

        {/* Education Pricing — for seragam sekolah */}
        <section className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
          <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">Harga Per Level Pendidikan</h3>
          <p className="text-xs text-slate-500 mb-4">Untuk produk seragam sekolah — harga berbeda tiap level SD/SMP/SMA</p>
          <div className="space-y-3">
            {['SD', 'SMP', 'SMA'].map((level) => {
              const existing = product.educationPricing?.find(ep => ep.level === level);
              const label = existing?.label || level;
              const price = existing?.basePrice || 0;
              return (
                <div key={level} className="grid grid-cols-2 md:grid-cols-4 gap-3 items-center bg-slate-800/50 p-3 rounded-lg">
                  <div className="bg-navy px-3 py-2 rounded text-sm font-semibold text-gold text-center">
                    {level}
                  </div>
                  <input
                    type="text"
                    value={label}
                    onChange={(e) => {
                      const ep = (product.educationPricing || []).map(ep =>
                        ep.level === level ? { ...ep, label: e.target.value } : ep
                      );
                      const found = ep.find(x => x.level === level);
                      if (!found) ep.push({ level, label: e.target.value, basePrice: price });
                      setProduct({ ...product, educationPricing: ep });
                    }}
                    className={inputClass}
                    placeholder="Label (misal: Seragam SD)"
                  />
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => {
                      const ep = (product.educationPricing || []).map(ep =>
                        ep.level === level ? { ...ep, basePrice: Number(e.target.value) } : ep
                      );
                      const found = ep.find(x => x.level === level);
                      if (!found) ep.push({ level, label, basePrice: Number(e.target.value) });
                      setProduct({ ...product, educationPricing: ep });
                    }}
                    className={inputClass}
                    placeholder="Harga (misal: 105000)"
                  />
                  <button
                    onClick={() => {
                      setProduct({
                        ...product,
                        educationPricing: product.educationPricing?.filter(ep => ep.level !== level) || [],
                      });
                    }}
                    className="text-xs text-red-400 hover:text-red-300 px-2"
                  >
                    {product.educationPricing?.find(ep => ep.level === level) ? 'Hapus' : 'Kosong'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Additional */}
        <section className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
          <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">Pengaturan Tambahan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Featured Toggle */}
            <div className="flex items-center justify-between bg-slate-800/50 rounded-lg px-4 py-3">
              <div>
                <label className="text-sm font-medium text-white">Tampilkan di Home Page</label>
                <p className="text-xs text-slate-500 mt-0.5">Produk ini akan muncul di bagian "Produk Unggulan"</p>
              </div>
              <button
                type="button"
                onClick={() => setProduct({ ...product, isFeatured: !product.isFeatured })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  product.isFeatured ? 'bg-gold-gradient' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    product.isFeatured ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className={labelClass}>Badge (opsional)</label>
              <input
                type="text"
                value={product.badge || ''}
                onChange={(e) => setProduct({ ...product, badge: e.target.value })}
                className={inputClass}
                placeholder="Contoh: Best Seller, New"
              />
            </div>
            <div>
              <label className={labelClass}>URL Shopee (opsional)</label>
              <input
                type="text"
                value={product.shopeeUrl || ''}
                onChange={(e) => setProduct({ ...product, shopeeUrl: e.target.value })}
                className={inputClass}
                placeholder="https://shopee.co.id/..."
              />
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pb-8">
          <button
            onClick={() => router.push('/admin')}
            className="px-5 py-2.5 text-sm text-slate-400 hover:text-white"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-gold to-amber-500 text-navy font-semibold rounded-lg hover:from-amber-500 hover:to-gold transition-all text-sm disabled:opacity-50"
          >
            {saving ? 'Menyimpan...' : mode === 'create' ? 'Publikasikan Produk' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>
    </div>
  );
}
