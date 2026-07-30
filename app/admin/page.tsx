'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { Product } from '@/types';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('semua');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/products');
    const data = await res.json();
    setProducts(data.products || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const categories = [...new Set(products.map(p => p.categoryLabel))];

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      || p.slug.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'semua' || p.categoryLabel === filterCategory;
    return matchSearch && matchCat;
  });

  async function handleDelete(slug: string, name: string) {
    if (!confirm(`Hapus produk "${name}"?`)) return;
    const res = await fetch(`/api/admin/products/${slug}`, { method: 'DELETE' });
    if (res.ok) {
      setProducts(prev => prev.filter(p => p.slug !== slug));
    } else {
      const data = await res.json();
      alert('Gagal menghapus: ' + data.error);
    }
  }

  function formatPrice(n: number) {
    return 'Rp ' + n.toLocaleString('id-ID');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Kelola Produk</h2>
          <p className="text-slate-400 text-sm mt-1">{products.length} produk total</p>
        </div>
        <Link
          href="/admin/produk/baru"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold to-amber-500 text-navy font-semibold rounded-lg hover:from-amber-500 hover:to-gold transition-all text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Produk
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold/50"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
        >
          <option value="semua">Semua Kategori</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Product Table */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">Memuat produk...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          {search ? 'Tidak ada produk yang cocok' : 'Belum ada produk'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left text-xs font-medium text-slate-400 uppercase py-3 px-4">Produk</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase py-3 px-4">Kategori</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase py-3 px-4">Harga</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase py-3 px-4">Gambar</th>
                <th className="text-center text-xs font-medium text-slate-400 uppercase py-3 px-4">Featured</th>
                <th className="text-right text-xs font-medium text-slate-400 uppercase py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filtered.map(product => (
                <tr key={product.slug} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm font-medium text-white">{product.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">/{product.slug}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">
                      {product.categoryLabel}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gold font-medium">
                    {formatPrice(product.basePrice)}
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-400">
                    {product.images?.length || 0} foto
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={async () => {
                        const res = await fetch(`/api/admin/products/${product.slug}`, {
                          method: 'PATCH',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ isFeatured: !product.isFeatured }),
                        });
                        if (res.ok) {
                          setProducts(prev => prev.map(p =>
                            p.slug === product.slug ? { ...p, isFeatured: !p.isFeatured } : p
                          ));
                        }
                      }}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        product.isFeatured
                          ? 'bg-gold-gradient text-navy'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill={product.isFeatured ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      {product.isFeatured ? 'Featured' : 'Featured'}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/admin/produk/${product.slug}`}
                        className="px-3 py-1.5 text-xs bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                      >
                        Edit
                      </a>
                      <a
                        href={`/produk/${product.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 text-xs bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                      >
                        Lihat
                      </a>
                      <button
                        onClick={() => handleDelete(product.slug, product.name)}
                        className="px-3 py-1.5 text-xs bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
