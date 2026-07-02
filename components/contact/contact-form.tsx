'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check, Send, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const productOptions = [
  'Seragam Sekolah',
  'Seragam Perusahaan',
  'Kaos Custom',
  'Polo Shirt',
  'Jaket',
  'Wearpack',
  'Bahan Kain',
  'Lainnya',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    nama: '',
    whatsapp: '',
    email: '',
    produk: '',
    jumlah: '',
    pesan: '',
  });

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: form.nama,
          whatsapp: form.whatsapp,
          email: form.email,
          produk: form.produk,
          jumlah: Number(form.jumlah) || 0,
          pesan: form.pesan,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Gagal mengirim pesan');
        setStatus('error');
        return;
      }

      setStatus('success');
      setForm({ nama: '', whatsapp: '', email: '', produk: '', jumlah: '', pesan: '' });
    } catch {
      setErrorMsg('Koneksi gagal. Silakan coba lagi.');
      setStatus('error');
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-gold/30 bg-gold/5 p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-gradient shadow-gold-glow-lg"
            >
              <Check className="h-10 w-10 text-navy" strokeWidth={3} />
            </motion.div>
            <h3 className="mt-6 font-display text-2xl font-bold text-navy">Pesan Terkirim!</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
              Terima kasih telah menghubungi kami. Tim kami akan menghubungi Anda
              via WhatsApp dalam 1×24 jam.
            </p>
            <Button
              onClick={() => setStatus('idle')}
              variant="outline"
              className="mt-6 rounded-full border-navy/20 text-navy hover:border-gold/40 hover:bg-gold/5"
            >
              Kirim Pesan Lain
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nama" className="text-sm font-semibold text-navy">
                  Nama Lengkap <span className="text-error">*</span>
                </Label>
                <Input
                  id="nama"
                  required
                  value={form.nama}
                  onChange={(e) => update('nama', e.target.value)}
                  placeholder="Nama Anda"
                  className="rounded-xl border-slate-200 focus-visible:ring-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-sm font-semibold text-navy">
                  WhatsApp <span className="text-error">*</span>
                </Label>
                <Input
                  id="whatsapp"
                  required
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => update('whatsapp', e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="rounded-xl border-slate-200 focus-visible:ring-gold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-navy">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="email@contoh.com"
                className="rounded-xl border-slate-200 focus-visible:ring-gold"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="produk" className="text-sm font-semibold text-navy">
                  Produk <span className="text-error">*</span>
                </Label>
                <Select
                  value={form.produk}
                  onValueChange={(v) => update('produk', v)}
                  required
                >
                  <SelectTrigger id="produk" className="rounded-xl border-slate-200 focus:ring-gold">
                    <SelectValue placeholder="Pilih produk" />
                  </SelectTrigger>
                  <SelectContent>
                    {productOptions.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="jumlah" className="text-sm font-semibold text-navy">
                  Jumlah (pcs) <span className="text-error">*</span>
                </Label>
                <Input
                  id="jumlah"
                  required
                  type="number"
                  min={1}
                  value={form.jumlah}
                  onChange={(e) => update('jumlah', e.target.value)}
                  placeholder="contoh: 100"
                  className="rounded-xl border-slate-200 focus-visible:ring-gold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pesan" className="text-sm font-semibold text-navy">
                Pesan
              </Label>
              <Textarea
                id="pesan"
                value={form.pesan}
                onChange={(e) => update('pesan', e.target.value)}
                placeholder="Ceritakan kebutuhan Anda..."
                rows={4}
                className="resize-none rounded-xl border-slate-200 focus-visible:ring-gold"
              />
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-full bg-gold-gradient py-6 text-base text-navy shadow-gold-glow hover:shadow-gold-glow-lg disabled:opacity-70"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Kirim Pesanan
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
