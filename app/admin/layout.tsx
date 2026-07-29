'use client';

import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function handleLogout() {
    const sb = createBrowserClient();
    await sb.auth.signOut();
    document.cookie = 'sb-access-token=; path=/; max-age=0';
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="bg-slate-900/80 backdrop-blur border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-white">Agus Collection</h1>
            <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-slate-400 hover:text-white text-sm transition-colors">
              Produk
            </a>
            <a href="/" className="text-slate-400 hover:text-white text-sm transition-colors" target="_blank">
              Lihat Website
            </a>
            <button
              onClick={handleLogout}
              className="text-sm text-slate-400 hover:text-red-400 transition-colors"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
