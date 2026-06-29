'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, User } from 'lucide-react';
import { siteConfig } from '@/constants/site';

interface AdminContact {
  name: string;
  number: string;
  label: string;
}

export function WhatsAppFloatingButton() {
  const [visible, setVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const admins: AdminContact[] = [
    {
      name: 'Admin 1',
      number: siteConfig.whatsappAdmin1,
      label: 'Fast Response',
    },
    {
      name: 'Admin 2',
      number: siteConfig.whatsappAdmin2,
      label: 'Backup',
    },
  ];

  const getWhatsAppLink = (number: string) => {
    const message = `Halo ${siteConfig.name}, saya ingin bertanya tentang produk.`;
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${number}?text=${encoded}`;
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
          {/* Admin Options Popup */}
          <AnimatePresence>
            {showOptions && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="absolute bottom-full right-0 mb-4 w-64 rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 py-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold text-sm">Hubungi Kami</h3>
                    <button
                      onClick={() => setShowOptions(false)}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-white/90 text-xs mt-1">Pilih admin yang tersedia</p>
                </div>

                {/* Admin List */}
                <div className="p-3 space-y-2">
                  {admins.map((admin) => (
                    <a
                      key={admin.name}
                      href={getWhatsAppLink(admin.number)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group border border-transparent hover:border-[#25D366]/20"
                    >
                      {/* Avatar */}
                      <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                        <User className="h-5 w-5 text-white" />
                        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <p className="text-gray-900 font-semibold text-sm group-hover:text-[#25D366] transition-colors">
                          {admin.name}
                        </p>
                        <p className="text-gray-500 text-xs">{admin.label}</p>
                      </div>

                      {/* Arrow */}
                      <MessageCircle className="h-4 w-4 text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
                  <p className="text-gray-500 text-xs text-center">
                    ⚡ Fast Response • Senin-Sabtu, 08.00-17.00 WIB
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.button
            onClick={() => setShowOptions(!showOptions)}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              boxShadow: [
                '0 0 20px rgba(37, 211, 102, 0.4), 0 0 60px rgba(37, 211, 102, 0.2)',
                '0 0 30px rgba(37, 211, 102, 0.6), 0 0 80px rgba(37, 211, 102, 0.3)',
                '0 0 20px rgba(37, 211, 102, 0.4), 0 0 60px rgba(37, 211, 102, 0.2)',
              ]
            }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-lg"
            aria-label="Chat WhatsApp"
          >
            {/* Outer pulse ring */}
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
            {/* Inner glow */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
            
            {/* Icon with badge */}
            <div className="relative">
              <MessageCircle className="h-7 w-7 text-white" strokeWidth={2.5} />
              {showOptions && (
                <X className="absolute inset-0 h-7 w-7 text-white m-auto" strokeWidth={2.5} />
              )}
            </div>

            {/* Notification badge */}
            {!showOptions && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 border-2 border-white flex items-center justify-center">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              </span>
            )}
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}