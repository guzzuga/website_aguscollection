'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionHeading } from '@/components/shared/section-heading';
import { faqs } from '@/constants/site';

export function FaqSection() {
  return (
    <section id="faq" className="bg-slate-50/50 py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="FAQ"
          title="Pertanyaan yang Sering Diajukan"
          description="Jawaban untuk pertanyaan umum seputar pemesanan, produksi, dan pengiriman."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 shadow-soft data-[state=open]:border-gold/40"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-navy dark:text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-[1.7] text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
