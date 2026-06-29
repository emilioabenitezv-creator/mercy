import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { PRODUCT_IMAGES } from '@/lib/productImages';
import { AnimatePresence, motion } from 'framer-motion';

const STORAGE_KEY = 'mercy_email_popup_v1';
const POPUP_IMAGE = PRODUCT_IMAGES['sacred-arts'];

export default function EmailPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    let dismissed = false;
    try { dismissed = localStorage.getItem(STORAGE_KEY) === '1'; } catch { /* ignore */ }
    if (dismissed) return;
    const t = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(t);
  }, []);

  function persistDismiss() {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
  }

  function dismiss() {
    persistDismiss();
    setOpen(false);
  }

  async function submit(e) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setStatus('loading');
    try {
      await base44.entities.EmailSubscriber.create({ email, source: 'popup' });
      setStatus('success');
      persistDismiss();
      setTimeout(() => setOpen(false), 2500);
    } catch {
      setStatus('error');
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="relative surface rounded-2xl overflow-hidden max-w-3xl w-full grid grid-cols-1 sm:grid-cols-2"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={dismiss} aria-label="Cerrar" className="absolute top-3 right-3 z-10 p-1.5 text-white/70 hover:text-white bg-black/30 rounded-full">
              <X size={18} />
            </button>

            {/* Left: copy + form */}
            <div className="p-8 sm:p-10 flex flex-col justify-center">
              <span className="font-display text-2xl font-bold tracking-[0.15em] text-white">MERCY</span>
              {status === 'success' ? (
                <p className="mt-6 text-white text-sm">✓ ¡Listo! Revisa tu correo para tu código de <span className="font-bold">10%</span>.</p>
              ) : (
                <>
                  <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-[0.02em] text-white uppercase leading-tight">
                    ¿Quieres un regalo? 🎁
                  </h2>
                  <p className="mt-3 text-sm text-[#A0A0A0]">
                    Suscríbete y obtén <span className="text-white font-medium">10% OFF</span> en tu primer pedido.
                  </p>
                  <form onSubmit={submit} className="mt-6 space-y-3">
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" aria-label="Nombre"
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/[0.1] rounded-lg text-white text-sm placeholder-[#7A7A7A] focus:outline-none focus:border-[#E8003A] transition-colors" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" aria-label="Correo"
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/[0.1] rounded-lg text-white text-sm placeholder-[#7A7A7A] focus:outline-none focus:border-[#E8003A] transition-colors" />
                    <button type="submit" disabled={status === 'loading'}
                      className="w-full py-3 bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-[0.12em] uppercase rounded-lg transition-colors disabled:opacity-50">
                      {status === 'loading' ? 'Enviando…' : 'Sí, lo quiero'}
                    </button>
                  </form>
                  {status === 'error' && <p className="mt-2 text-xs text-[#E8003A]">Hubo un error. Intenta de nuevo.</p>}
                  <button onClick={dismiss} className="mt-3 text-xs text-[#7A7A7A] hover:text-white transition-colors self-start">No, gracias</button>
                </>
              )}
            </div>

            {/* Right: product image */}
            <div className="hidden sm:block relative bg-[#0A0A0A] min-h-[320px]">
              <img src={POPUP_IMAGE} alt="Producto destacado Mercy" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
