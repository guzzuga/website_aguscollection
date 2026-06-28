'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/constants/site';
import { buildWhatsAppLink } from '@/utils/format';

export function WhatsAppFloatingButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={buildWhatsAppLink(
            `Halo ${siteConfig.name}, saya ingin bertanya tentang produk.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat WhatsApp"
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
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-lg sm:bottom-6 sm:right-6"
        >
          {/* Outer pulse ring */}
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
          {/* Inner glow */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
          <MessageCircle className="relative h-7 w-7 text-white" strokeWidth={2.5} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
