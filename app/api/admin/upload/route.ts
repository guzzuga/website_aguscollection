import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase';

const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// POST /api/admin/upload — upload product image to Supabase Storage
export async function POST(request: NextRequest) {
  const sb = createSupabaseAdmin();
  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const slug = formData.get('slug') as string | null;
  const index = formData.get('index') as string | null;

  if (!file) {
    return NextResponse.json({ error: 'File wajib diupload' }, { status: 400 });
  }
  if (!slug) {
    return NextResponse.json({ error: 'Slug wajib disertakan' }, { status: 400 });
  }

  const ext = file.name.split('.').pop() || 'jpg';
  const filename = `${slug}/foto-${index || '1'}.${ext}`;

  // Upload to Supabase Storage
  const { error } = await sb.storage
    .from('products')
    .upload(filename, file, {
      cacheControl: '31536000',
      upsert: true,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Get public URL
  const { data: urlData } = sb.storage
    .from('products')
    .getPublicUrl(filename);

  return NextResponse.json({
    url: urlData.publicUrl,
    filename,
  });
}

// DELETE /api/admin/upload — delete image from Supabase Storage
export async function DELETE(request: NextRequest) {
  const sb = createSupabaseAdmin();
  const { filename } = await request.json();

  if (!filename) {
    return NextResponse.json({ error: 'Filename wajib disertakan' }, { status: 400 });
  }

  const { error } = await sb.storage
    .from('products')
    .remove([filename]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// GET /api/admin/upload — list files for a product
export async function GET(request: NextRequest) {
  const sb = createSupabaseAdmin();
  const slug = request.nextUrl.searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug wajib disertakan' }, { status: 400 });
  }

  const { data, error } = await sb.storage
    .from('products')
    .list(slug);

  if (error) {
    return NextResponse.json({ files: [] });
  }

  const files = (data || []).map(f => ({
    name: f.name,
    url: `${SUPA_URL}/storage/v1/object/public/products/${slug}/${f.name}`,
  }));

  return NextResponse.json({ files });
}
