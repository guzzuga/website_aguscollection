import { siteConfig } from '@/constants/site';
import { HeroSection } from '@/components/sections/hero-section';
import { TrustBar } from '@/components/sections/trust-bar';
import dynamic from 'next/dynamic';

// Lazy load heavy sections with SSR disabled for client-only components
const ProductCategories = dynamic(() => import('@/components/sections/product-categories').then(mod => ({ default: mod.ProductCategories })), {
  ssr: true,
  loading: () => <div className="h-96 bg-slate-100 animate-pulse" />
});

const StatsCounter = dynamic(() => import('@/components/sections/stats-counter').then(mod => ({ default: mod.StatsCounter })), {
  ssr: true,
  loading: () => <div className="h-64 bg-slate-100 animate-pulse" />
});

const FeaturedProducts = dynamic(() => import('@/components/sections/featured-products').then(mod => ({ default: mod.FeaturedProducts })), {
  ssr: true,
  loading: () => <div className="h-96 bg-slate-100 animate-pulse" />
});

const WhyChooseUs = dynamic(() => import('@/components/sections/why-choose-us').then(mod => ({ default: mod.WhyChooseUs })), {
  ssr: true,
  loading: () => <div className="h-96 bg-slate-100 animate-pulse" />
});

const ProcessTimeline = dynamic(() => import('@/components/sections/process-timeline').then(mod => ({ default: mod.ProcessTimeline })), {
  ssr: true,
  loading: () => <div className="h-96 bg-slate-100 animate-pulse" />
});

const TestimonialCarousel = dynamic(() => import('@/components/sections/testimonial-carousel').then(mod => ({ default: mod.TestimonialCarousel })), {
  ssr: true,
  loading: () => <div className="h-96 bg-slate-100 animate-pulse" />
});

const CTASection = dynamic(() => import('@/components/sections/cta-section').then(mod => ({ default: mod.CTASection })), {
  ssr: true,
  loading: () => <div className="h-64 bg-slate-100 animate-pulse" />
});

const FaqSection = dynamic(() => import('@/components/sections/faq-section').then(mod => ({ default: mod.FaqSection })), {
  ssr: true,
  loading: () => <div className="h-96 bg-slate-100 animate-pulse" />
});

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}/og-image.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address,
      addressLocality: 'Mojokerto',
      addressRegion: 'Jawa Timur',
      addressCountry: 'ID',
    },
    openingHours: 'Mo-Sa 08:00-17:00',
    priceRange: 'Rp 32.000 - Rp 175.000',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <TrustBar />
      <ProductCategories />
      <StatsCounter />
      <FeaturedProducts />
      <WhyChooseUs />
      <ProcessTimeline />
      <TestimonialCarousel />
      <CTASection />
      <FaqSection />
    </>
  );
}