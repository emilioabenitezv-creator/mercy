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
    <section className="relative py-24 md:py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Soft red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8003A]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="eyebrow">Comunidad Mercy</span>
        <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.02em] text-white uppercase leading-[1.05]">
          Únete a la <span className="text-[#E8003A]">Familia</span>
        </h2>
        <p className="mt-5 text-[#9A9A9A] text-lg leading-relaxed">
          Recibe lanzamientos exclusivos, contenido para atletas y un <span className="text-white font-medium">10% de descuento</span> en tu primer pedido.
        </p>

        {status === 'success' ? (
          <div className="mt-9 inline-flex items-center gap-3 px-6 py-4 surface rounded-xl">
            <CheckCircle2 className="text-green-400 flex-shrink-0" size={22} />
            <p className="text-white text-sm text-left">
              ¡Bienvenido a la familia! Revisa tu correo para tu código de <span className="font-medium">10%</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-9 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com" aria-label="Correo electrónico"
              className="flex-1 px-5 py-4 bg-[#111111] border border-white/[0.12] rounded-lg text-white placeholder-[#7A7A7A] focus:outline-none focus:border-[#E8003A] transition-colors text-sm"
            />
            <button type="submit" disabled={status === 'loading'}
              className="px-7 py-4 bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-[0.15em] uppercase rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap">
              {status === 'loading' ? 'Enviando…' : 'Quiero mi 10%'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="mt-3 text-[#9A9A9A] text-sm">Hubo un error. Intenta de nuevo.</p>
        )}
        <p className="mt-4 text-xs text-[#6A6A6A]">Sin spam. Cancela cuando quieras.</p>
      </div>
    </section>
  );
}
