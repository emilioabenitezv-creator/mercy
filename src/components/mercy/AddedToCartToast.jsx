import React from 'react';
import { useCart } from '@/lib/CartContext';
import { Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function AddedToCartToast() {
  const { justAdded, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {justAdded && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          className="fixed top-24 right-4 z-50 bg-[#111111] border border-[#2A2A2A] rounded-lg p-4 shadow-2xl flex items-center gap-3 max-w-sm"
        >
          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Check size={16} className="text-green-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-white font-medium truncate">{justAdded.name}</p>
            <p className="text-xs text-[#A0A0A0]">Talla {justAdded.size} agregado al carrito</p>
          </div>
          <button onClick={() => setIsCartOpen(true)}
            className="text-xs text-[#E8003A] font-heading tracking-wider whitespace-nowrap hover:underline">
            VER
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}