import { trustLogos } from '@/constants/site';

export function TrustBar() {
  const logos = [...trustLogos, ...trustLogos];

  return (
    <section className="border-y border-slate-200 bg-slate-50/50 py-10">
      <div className="container-page">
        <p className="mb-7 text-center text-xs font-semibold uppercase tracking-ultra-wide text-slate-500">
          Dipercaya oleh 500+ sekolah, perusahaan &amp; instansi
        </p>
        <div className="mask-fade-x relative overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-12">
            {logos.map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="whitespace-nowrap text-lg font-bold tracking-tight text-slate-400 grayscale transition-all duration-300 hover:text-slate-700"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
