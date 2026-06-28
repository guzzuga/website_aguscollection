'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { PriceTier } from '@/types';
import { formatRupiah } from '@/utils/format';
import { cn } from '@/lib/utils';

type PriceTierListProps = {
  tiers: PriceTier[];
  selectedQty: number;
  basePrice?: number;
  className?: string;
};

export function PriceTierList({ tiers, selectedQty, basePrice = 0, className }: PriceTierListProps) {
  const activeTier = tiers.find(
    (t) => selectedQty >= t.minQty && (t.maxQty === null || selectedQty <= t.maxQty),
  );

  return (
    <div className={cn('space-y-2', className)}>
      <p className="label-eyebrow text-slate-500">Tier Harga (semakin banyak, semakin hemat)</p>
      <div className="space-y-2">
        {tiers.map((tier, i) => {
          const isActive = activeTier === tier;
          const discount = tier.discount ?? 0;
          const displayPrice = tier.price ?? (basePrice - discount);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                'flex items-center justify-between rounded-xl border px-4 py-3 transition-all',
                isActive
                  ? 'border-gold bg-gold/5 shadow-gold-glow'
                  : 'border-slate-200 bg-white',
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors',
                    isActive ? 'border-gold bg-gold text-navy' : 'border-slate-300',
                  )}
                >
                  {isActive && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                <span className="text-sm font-medium text-slate-700">{tier.label}</span>
              </div>
              <span
                className={cn(
                  'text-sm font-bold',
                  isActive ? 'text-gold-700' : 'text-navy',
                )}
              >
                {formatRupiah(displayPrice)}
                <span className="text-xs font-normal text-slate-400">/pcs</span>
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
