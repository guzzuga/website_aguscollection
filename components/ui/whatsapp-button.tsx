'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, User, ArrowRight, Shield } from 'lucide-react';
import { siteConfig } from '@/constants/site';

interface AdminContact {
  name: string;
  number: string;
  label: string;
  badge: string;
}

interface WhatsAppButtonProps {
  variant?: 'hero' | 'cta' | 'contact';
  message?: string;
  className?: string;
}

export function WhatsAppButton({ variant = 'hero', message, className = '' }: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const admins: AdminContact[] = [
    {
      name: 'Admin 1',
      number: siteConfig.whatsappAdmin1,
      label: 'Fast Response',
      badge: 'Recommended',
    },
    {
      name: 'Admin 2',
      number: siteConfig.whatsappAdmin2,
      label: 'Backup',
      badge: 'Available',
    },
  ];

  const getWhatsAppLink = useCallback((number: string) => {
    const msg = message || `Halo ${siteConfig.name}, saya ingin bertanya tentang produk.`;
    const encoded = encodeURIComponent(msg);
    return `https://wa.me/${number}?text=${encoded}`;
  }, [message]);

  const buttonVariants = {
    hero: 'rounded-full bg-gold-gradient px-7 text-base text-navy shadow-gold-glow-lg transition-all hover:shadow-gold-glow',
    cta: 'rounded-full bg-gold-gradient px-8 text-base text-navy shadow-gold-glow-lg transition-all hover:shadow-gold-glow sm:w-auto',
    contact: 'group relative mt-6 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] py-4 text-base font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-all hover:shadow-xl hover:shadow-[#25D366]/40 sm:w-auto',
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${buttonVariants[variant]} ${className}`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <MessageCircle className="h-5 w-5" />
          {variant === 'hero' ? 'Pesan Sekarang' : variant === 'cta' ? 'Hubungi WhatsApp' : 'Chat via WhatsApp'}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-md rounded-3xl bg-white p-5 sm:p-6 shadow-2xl my-auto"
              >
                {/* Header */}
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-navy">Pilih Admin</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500">Silakan pilih admin yang ingin dihubungi</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-navy"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>

                {/* Admin Cards */}
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {admins.map((admin) => (
                    <a
                      key={admin.name}
                      href={getWhatsAppLink(admin.number)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 p-3 sm:p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#25D366]/40 hover:shadow-lg hover:shadow-[#25D366]/10"
                    >
                      {/* Hover gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      
                      <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                            <User className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                          </div>
                          {/* Online indicator */}
                          <div className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-green-500 border-2 border-white">
                            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white animate-pulse" />
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-navy group-hover:text-[#25D366] transition-colors text-sm sm:text-base">
                              {admin.name}
                            </h4>
                            <span className="rounded-full bg-[#25D366]/10 px-2 py-0.5 text-[10px] font-semibold text-[#25D366] whitespace-nowrap">
                              {admin.badge}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs sm:text-sm text-slate-600">{admin.label}</p>
                          <p className="mt-1 text-xs text-slate-400 font-mono">
                            +{admin.number.replace(/^62/, '62 ')}
                          </p>
                        </div>

                        {/* Arrow */}
                        <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-slate-50 p-2.5 sm:p-3">
                  <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#25D366] shrink-0" />
                  <p className="text-[10px] sm:text-xs text-slate-500 text-center">
                    Fast Response • Senin-Sabtu, 08.00-17.00 WIB
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}