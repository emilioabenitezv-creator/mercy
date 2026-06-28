import React, { useState } from 'react';
import { X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { AnimatePresence, motion } from 'framer-motion';

export default function NotifyModal({ isOpen, onClose, productId, productName, size }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setStatus('loading');
    try {
      await base44.entities.StockNotification.create({ email, product_id: productId, product_name: productName, size });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-[#111111] border border-white/[0.07] rounded-lg p-6 max-w-sm w-full"
          onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading text-lg tracking-wider text-white">NOTIFICARME</h3>
            <button onClick={onClose} className="text-[#A0A0A0] hover:text-white"><X size={20} /></button>
          </div>
          <p className="text-sm text-[#A0A0A0] mb-4">
            Te avisaremos cuando <span className="text-white">{productName}</span> talla <span className="text-white">{size}</span> esté disponible.
          </p>
          {status === 'success' ? (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded text-center">
              <p className="text-green-400 text-sm">✓ ¡Registrado! Te notificaremos.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/[0.07] rounded text-white text-sm placeholder-[#A0A0A0] focus:outline-none focus:border-[#E8003A]" />
              <button type="submit" disabled={status === 'loading'}
                className="w-full py-3 bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-wider transition-colors disabled:opacity-50">
                {status === 'loading' ? 'ENVIANDO...' : 'NOTIFICARME'}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}