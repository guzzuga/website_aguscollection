import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import type { InquiryInput } from '@/types';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const RECIPIENT = process.env.EMAIL_RECIPIENT || 'aguscollectionmjk@gmail.com';
const SITE_URL = process.env.SITE_URL || 'https://aguscollection.web.id';

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

function formatOrderEmail(body: Partial<InquiryInput>): string {
  const now = new Date().toLocaleString('id-ID', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Jakarta',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f1f5f9; margin: 0; padding: 20px; }
    .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #0a0a2e 0%, #1a1a4e 100%); color: #fff; padding: 28px 32px; }
    .header h1 { margin: 0 0 6px; font-size: 22px; color: #d4a853; }
    .header p { margin: 0; font-size: 13px; opacity: 0.8; }
    .badge { display: inline-block; background: #d4a853; color: #0a0a2e; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; margin-top: 12px; }
    .body { padding: 28px 32px; }
    .row { display: flex; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
    .row:last-child { border-bottom: none; }
    .label { width: 120px; font-size: 13px; color: #64748b; font-weight: 600; flex-shrink: 0; }
    .value { font-size: 14px; color: #0f172a; word-break: break-word; }
    .message { background: #f8fafc; border-left: 3px solid #d4a853; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-top: 8px; font-size: 14px; color: #334155; white-space: pre-wrap; }
    .wa-btn { display: inline-block; background: #25D366; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-weight: 600; font-size: 14px; margin-top: 16px; }
    .wa-btn:hover { background: #22c55e; }
    .footer { background: #f8fafc; padding: 20px 32px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
    .timestamp { font-size: 12px; color: #94a3b8; margin-top: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>AGUS COLLECTION</h1>
      <p>Konveksi Premium Berkualitas</p>
      <span class="badge">PESANAN BARU</span>
    </div>
    <div class="body">
      <div class="row">
        <span class="label">Nama</span>
        <span class="value">${body.nama}</span>
      </div>
      <div class="row">
        <span class="label">WhatsApp</span>
        <span class="value">${body.whatsapp}</span>
      </div>
      ${body.email ? `
      <div class="row">
        <span class="label">Email</span>
        <span class="value">${body.email}</span>
      </div>` : ''}
      <div class="row">
        <span class="label">Produk</span>
        <span class="value">${body.produk}</span>
      </div>
      <div class="row">
        <span class="label">Jumlah</span>
        <span class="value">${body.jumlah?.toLocaleString('id-ID')} pcs</span>
      </div>
      ${body.pesan ? `
      <div class="row">
        <span class="label">Pesan</span>
        <div class="value">
          <div class="message">${body.pesan}</div>
        </div>
      </div>` : ''}
      <a href="https://wa.me/${body.whatsapp?.replace(/\D/g, '')}" target="_blank" class="wa-btn">
        💬 Balas via WhatsApp
      </a>
      <div class="timestamp">📅 ${now} WIB</div>
    </div>
    <div class="footer">
      Notifikasi otomatis dari ${SITE_URL}<br>
      AGUS COLLECTION — Konveksi Premium Berkualitas
    </div>
  </div>
</body>
</html>
  `.trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<InquiryInput>;
    const error = validateInput(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    // Send email via Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: 'AGUS Collection <no-reply@aguscollection.web.id>',
          to: [RECIPIENT],
          subject: `Pesanan Baru — ${body.nama} | ${body.produk} (${body.jumlah} pcs)`,
          html: formatOrderEmail(body),
          replyTo: body.email || undefined,
        });
        console.log(`✅ Order email sent to ${RECIPIENT}`);
      } catch (emailErr: any) {
        console.error('Resend email error:', emailErr);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Inquiry API error:', err);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server. Silakan coba lagi.' },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST /api/inquiries to submit an order.',
    status: 'email_mode',
  }, { status: 200 });
}