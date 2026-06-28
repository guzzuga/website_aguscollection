import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { InquiryInput } from '@/types';

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

function validateInput(data: Partial<InquiryInput>): string | null {
  if (!data.nama || data.nama.trim().length < 2) {
    return 'Nama harus diisi minimal 2 karakter';
  }
  if (!data.whatsapp || data.whatsapp.replace(/\D/g, '').length < 8) {
    return 'Nomor WhatsApp tidak valid';
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Format email tidak valid';
  }
  if (!data.produk || !productOptions.includes(data.produk)) {
    return 'Pilih produk yang tersedia';
  }
  if (data.jumlah === undefined || data.jumlah < 1 || data.jumlah > 100000) {
    return 'Jumlah harus antara 1 dan 100.000';
  }
  if (data.pesan && data.pesan.length > 2000) {
    return 'Pesan terlalu panjang (maks 2000 karakter)';
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      console.warn('Supabase not configured - inquiries will not be saved');
      // Return success anyway - customer can still contact via WhatsApp
      return NextResponse.json({ 
        success: true, 
        message: 'Please contact us via WhatsApp for inquiries',
        whatsapp: '087874722632'
      }, { status: 200 });
    }

    const body = (await req.json()) as Partial<InquiryInput>;
    const error = validateInput(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const { data, error: dbError } = await supabase
      .from('inquiries')
      .insert({
        nama: body.nama!.trim(),
        whatsapp: body.whatsapp!.trim(),
        email: body.email?.trim() || null,
        produk: body.produk!,
        jumlah: body.jumlah!,
        pesan: body.pesan?.trim() || null,
      })
      .select('id, created_at')
      .single();

    if (dbError) {
      console.error('Inquiry insert error:', dbError);
      return NextResponse.json(
        { error: 'Gagal menyimpan pesanan. Silakan coba lagi.' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, id: data.id, created_at: data.created_at },
      { status: 201 },
    );
  } catch (err) {
    console.error('Inquiry API error:', err);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server. Silakan coba lagi.' },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      return NextResponse.json({ 
        data: [],
        message: 'Supabase not configured'
      }, { status: 200 });
    }

    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Inquiry fetch error:', error);
      return NextResponse.json(
        { error: 'Gagal mengambil data pesanan.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error('Inquiry API error:', err);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server.' },
      { status: 500 },
    );
  }
}
