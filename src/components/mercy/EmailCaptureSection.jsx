import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { CheckCircle2 } from 'lucide-react';

export default function EmailCaptureSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setStatus('loading');
    try {
      await base44.entities.EmailSubscriber.create({ email, source: 'homepage' });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="py-20 md:py-24 bg-[#E8003A]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.03em] text-white uppercase leading-[1.05]">
          Únete a la Familia Mercy
        </h2>
        <p className="mt-4 text-white/85 text-lg leading-relaxed">
          Recibe lanzamientos exclusivos, descuentos y contenido para atletas directo a tu correo.
        </p>

        {status === 'success' ? (
          <div className="mt-8 inline-flex items-center gap-3 px-6 py-4 bg-black/20 rounded-lg">
            <CheckCircle2 className="text-white flex-shrink-0" size={22} />
            <p className="text-white text-sm text-left font-medium">
              ¡Bienvenido a la familia! Revisa tu correo para tu 10% de descuento.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com" aria-label="Correo electrónico"
              className="flex-1 px-5 py-4 bg-white/15 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-all text-sm"
            />
            <button type="submit" disabled={status === 'loading'}
              className="px-7 py-4 bg-[#0A0A0A] hover:bg-black text-white font-heading text-sm tracking-[0.12em] uppercase rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap">
              {status === 'loading' ? 'Enviando…' : 'Obtener 10% de descuento'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="mt-3 text-white/85 text-sm">Hubo un error. Intenta de nuevo.</p>
        )}
        <p className="mt-4 text-xs text-white/70">Sin spam. Solo lo bueno. Cancela cuando quieras.</p>
      </div>
    </section>
  );
}
