# 🎬 Upload Video ke AGUS Collection

## Langkah 1: Upload Video ke Server

### Video 1: Vertical (1080×1920) — untuk MOBILE
```bash
# Upload via SCP/SFTP/FTP ke server:
# /home/ubuntu/websiteAS/public/videos/hero-mobile.mp4
```

### Video 2: Horizontal (1920×1080) — untuk DESKTOP
```bash
# Upload via SCP/SFTP/FTP ke server:
# /home/ubuntu/websiteAS/public/videos/hero-desktop.mp4
```

## Langkah 2: Setelah video ter-upload

Edit file `/home/ubuntu/websiteAS/app/page.tsx`:

**Ganti:**
```tsx
import { HeroSection } from '@/components/sections/hero-section';
```

**Menjadi:**
```tsx
import { HeroSection } from '@/components/sections/hero-section';
import VideoHero from '@/components/sections/video-hero';
```

**Dan ganti baris `<HeroSection />` menjadi:**
```tsx
<VideoHero
  mobileVideo="/videos/hero-mobile.mp4"
  desktopVideo="/videos/hero-desktop.mp4"
  title="Konveksi Premium Berkualitas"
  subtitle="Jasa pembuatan seragam sekolah, perusahaan, dan custom apparel dengan kualitas premium langsung dari pabrik."
  ctaText="Lihat Katalog"
  ctaHref="/produk"
/>
```

**Hapus atau comment baris `<TrustBar />`** (karena VideoHero sudah punya CTA & overlay).

## Langkah 3: Build & Deploy
```bash
cd /home/ubuntu/websiteAS
git add -A && git commit -m "feat: hero video background dengan smooth scroll"
git push origin main
```

## Catatan Penting

- **Video harus MP4 format** (H.264 codec untuk kompatibilitas max)
- **Rekomendasi ukuran:** max 15-20MB per video (untuk loading cepat)
- **Video akan autoplay muted loop** — tidak ada audio
- **Mobile**: pakai vertical (1080×1920) — full screen portrait
- **Desktop**: pakai horizontal (1920×1080) — full screen landscape
- **Video akan auto-hide** saat user scroll (parallax fade + scale effect)
- **Scroll indicator** muncul di bawah (animasi bounce)

## Fitur yang Aktif

1. ✅ **Smooth scrolling** (Lenis) — scroll terasa "berat" & premium
2. ✅ **Video hero responsive** — vertical mobile, horizontal desktop
3. ✅ **Scroll reveal animations** — Framer Motion + custom easing
4. ✅ **Parallax effect** — video fade out + scale saat scroll
5. ✅ **Gradient overlay** — bottom fade (seperti PayBox)
6. ✅ **Glassmorphism CTA** — backdrop-blur buttons
7. ✅ **Micro-interactions** — hover scale, arrow slide, scroll bounce
