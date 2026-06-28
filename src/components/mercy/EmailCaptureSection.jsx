import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

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
    <section className="py-20 bg-[#E8003A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[0.05em] text-white uppercase">
          Únete a la Familia Mercy
        </h2>
        <p className="mt-4 text-white/80 text-lg">
          Recibe lanzamientos exclusivos, descuentos y contenido para atletas.
        </p>

        {status === 'success' ? (
          <div className="mt-8 p-6 bg-white/10 rounded-lg">
            <p className="text-white font-heading tracking-wider text-lg">
              ✓ ¡BIENVENIDO A LA FAMILIA! REVISA TU EMAIL PARA TU DESCUENTO DEL 10%
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 px-5 py-4 bg-white/10 border border-white/30 rounded text-white placeholder-white/50 focus:outline-none focus:border-white text-sm"
            />
            <button type="submit" disabled={status === 'loading'}
              className="px-8 py-4 bg-[#0A0A0A] text-white font-heading text-sm tracking-[0.15em] hover:bg-[#111111] transition-colors disabled:opacity-50 whitespace-nowrap">
              {status === 'loading' ? 'ENVIANDO...' : 'QUIERO DESCUENTO DEL 10%'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="mt-3 text-white/80 text-sm">Hubo un error. Intenta de nuevo.</p>
        )}
      </div>
    </section>
  );
}