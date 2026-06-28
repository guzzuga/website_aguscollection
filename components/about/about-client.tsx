'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Factory,
  Users,
  Award,
  Heart,
  Target,
  Eye,
  Check,
} from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { StatsCounter } from '@/components/sections/stats-counter';
import { CTASection } from '@/components/sections/cta-section';
import { fadeUp, staggerContainer, viewportOnce } from '@/animations/variants';

const milestones = [
  { year: '2010', title: 'Awal Mula', description: 'Berdiri sebagai workshop kecil di Mojokerto, Jawa Timur dengan tekad kuat melayani kebutuhan seragam lokal.' },
  { year: '2014', title: 'Ekspansi Sekolah', description: 'Mulai melayani 20+ sekolah di Kabupaten Mojokerto dan sekitarnya.' },
  { year: '2018', title: 'Skala Produksi', description: 'Berkembang dengan kapasitas produksi 5000 pcs/bulan dan tim yang lebih besar.' },
  { year: '2021', title: 'Go Digital', description: 'Meluncurkan layanan online, membuka toko Shopee & Tokopedia, dan melayani pengiriman nasional.' },
  { year: '2024', title: '500+ Pelanggan', description: 'Dipercaya 500+ sekolah, perusahaan, dan instansi di seluruh Indonesia.' },
];

const values = [
  { icon: Target, title: 'Misi', description: 'Memberdayakan setiap klien dengan seragam berkualitas yang membangun identitas, kebanggaan, dan kepercayaan diri.' },
  { icon: Eye, title: 'Visi', description: 'Menjadi konveksi premium terpercaya di Indonesia yang dikenal atas kualitas, ketepatan waktu, dan pelayanan tulus.' },
  { icon: Heart, title: 'Nilai', description: 'Kualitas tanpa kompromi, integritas dalam setiap janji, dan pelayanan sepenuh hati dari konsultasi hingga pengiriman.' },
];

const team = [
  { name: 'Wahyudi', role: 'Founder & Owner', avatar: '/images/team/wahyudi.jpg' },
  { name: 'Umbar Wati', role: 'Head of Production', avatar: '/images/team/umbar-wati.jpg' },
  { name: 'Agus Efendi', role: 'Head of Design', avatar: '/images/team/agus-efendi.jpg' },
  { name: 'Siti Wiwik Susanti', role: 'Customer Success', avatar: '/images/team/siti-wiwik.jpg' },
];

const galleryImages = [
  '/images/gallery/galeri-1.jpg',
  '/images/gallery/galeri-2.jpg',
  '/images/gallery/galeri-3.jpg',
  '/images/gallery/galeri-4.jpg',
  '/images/gallery/galeri-5.jpg',
  '/images/gallery/galeri-6.jpg',
  '/images/gallery/galeri-7.jpg',
];

export function AboutClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-28 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]"
        />
        <div className="container-page relative pb-20 pt-10 lg:pb-28">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.span
              variants={fadeUp}
              className="label-eyebrow inline-flex items-center gap-2 text-gold-300"
            >
              <span className="h-px w-4 sm:w-6 bg-current opacity-60" />
              Tentang Kami
              <span className="h-px w-4 sm:w-6 bg-current opacity-60" />
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="mt-5 text-4xl font-extrabold tracking-tight text-white text-balance sm:text-5xl lg:text-6xl"
            >
              Tentang Agus Collection
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-base leading-[1.7] text-slate-300 text-pretty sm:text-lg"
            >
              Agus Collection adalah perusahaan konveksi yang berfokus pada produksi
              seragam berkualitas tinggi untuk sekolah, perusahaan, instansi
              pemerintah, komunitas, hingga kebutuhan custom apparel.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Workshop photo + story */}
      <section className="py-20 lg:py-28">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 shadow-soft-lg"
            >
              <Image
                src="/images/hero.jpg"
                alt="Workshop produksi Agus Collection"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            <div>
              <SectionHeading
                            eyebrow="Cerita Kami"
                            title="Dari Mojokerto untuk Seluruh Indonesia"
                            align="center"
                          />
              <div className="mt-6 space-y-4 text-base leading-[1.7] text-slate-600">
                <p>
                  Agus Collection berawal dari workshop kecil di Mojokerto, Jawa Timur
                  dengan tekad kuat untuk melayani kebutuhan seragam berkualitas. Berbekal
                  komitmen pada kualitas jahitan, bahan terbaik, dan pelayanan profesional,
                  kami tumbuh menjadi konveksi premium yang dipercaya di seluruh Indonesia.
                </p>
                <p>
                  Kami mengutamakan kualitas jahitan, bahan terbaik, harga kompetitif,
                  dan pelayanan profesional mulai dari konsultasi hingga pengiriman.
                  Setiap produk melewati quality control ketat sebelum sampai ke tangan
                  pelanggan.
                </p>
                <p>
                  Kini, kami melayani 500+ sekolah, perusahaan, dan instansi di seluruh
                  Indonesia. Dari seragam sekolah hingga wearpack industri — semua kami
                  kerjakan dengan standar yang sama: premium, tepat waktu, dan memuaskan.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { icon: Factory, value: '14+', label: 'Tahun Pengalaman' },
                  { icon: Users, value: '500+', label: 'Pelanggan Puas' },
                  { icon: Award, value: '4.9★', label: 'Rating' },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-soft">
                    <s.icon className="mx-auto h-6 w-6 text-gold-600" />
                    <p className="mt-2 text-xl font-extrabold text-navy">{s.value}</p>
                    <p className="text-xs text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsCounter />

      {/* Values */}
      <section className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Prinsip Kami"
            title="Yang Kami Pegang Teguh"
            description="Tiga pilar yang memandu setiap keputusan dan jahitan kami."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8"
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-soft transition-all hover:border-gold/40 hover:shadow-soft-xl"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold-300 transition-all group-hover:bg-gold-gradient group-hover:text-navy">
                  <v.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-navy">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-slate-50/50 py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Perjalanan Kami"
            title="Tumbuh Bersama Pelanggan"
            description="Setiap milestone adalah bukti komitmen kami pada kualitas dan pelayanan terbaik."
          />
          <div className="relative mt-16">
            <div className="pointer-events-none absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-gold-400 via-gold-500 to-transparent sm:left-1/2 sm:-translate-x-1/2" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12' : 'sm:ml-auto sm:pl-12'}`}
                >
                  <span
                    className="absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-gold-gradient text-xs font-bold text-navy shadow-gold-glow sm:left-auto sm:-right-4 sm:top-2"
                    style={i % 2 === 0 ? {} : { right: 'auto', left: '-1rem' }}
                  >
                    {i + 1}
                  </span>
                  <div className="ml-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:ml-0">
                    <span className="label-eyebrow text-gold-600">{m.year}</span>
                    <h3 className="mt-2 text-lg font-bold text-navy">{m.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{m.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Galeri"
            title="Cuplikan dari Workshop Kami"
            description="Proses produksi yang transparan, dari pemotongan kain hingga packing pengiriman."
          />
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200 shadow-soft ${i === 0 ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                <div className="aspect-square">
                  <Image
                    src={img}
                    alt={`Galeri produksi Agus Collection ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-slate-50/50 py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Tim Kami"
            title="Orang di Balik Setiap Jahitan"
            description="Tim berpengalaman yang berdedikasi memberikan hasil terbaik untuk setiap pelanggan."
          />
          <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition-all hover:border-gold/40 hover:shadow-soft-xl"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-bold text-navy">{member.name}</h3>
                  <p className="mt-0.5 text-sm text-gold-700">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
