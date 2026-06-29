import React, { useState } from 'react';
import { Mail, MessageCircle, Instagram, Clock } from 'lucide-react';
import Seo from '@/components/mercy/Seo';
import { SITE } from '@/lib/site';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function openWhatsApp(e) {
    e.preventDefault();
    const text = `Hola MERCY 👋%0A%0ASoy ${form.name || '(nombre)'} (${form.email || 'correo'}).%0A%0A${form.message || 'Tengo una pregunta...'}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${text}`, '_blank', 'noopener');
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-8 md:pt-10">
      <Seo
        title="Contacto — MERCY"
        description="¿Dudas sobre tallas, envíos o tu pedido? Escríbenos por WhatsApp o correo. Respondemos en menos de 24 h hábiles."
        path="/contacto"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <span className="eyebrow">Estamos para ayudarte</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-[0.02em] text-white uppercase">
            Hablemos
          </h1>
        </div>
        <p className="text-center text-[#A0A0A0] mb-12 max-w-lg mx-auto">
          Estamos para ayudarte con tallas, envíos o cualquier duda. Respondemos en menos de 24 h hábiles.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Direct channels */}
          <div className="space-y-4">
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 surface rounded-xl hover:border-[#E8003A]/50 transition-all">
              <MessageCircle className="text-[#E8003A]" size={24} />
              <div>
                <p className="font-heading text-sm tracking-wider text-white">WHATSAPP</p>
                <p className="text-sm text-[#A0A0A0]">{SITE.whatsappDisplay}</p>
              </div>
            </a>
            <a href={`mailto:${SITE.email}`}
              className="flex items-center gap-4 p-5 surface rounded-xl hover:border-[#E8003A]/50 transition-all">
              <Mail className="text-[#E8003A]" size={24} />
              <div>
                <p className="font-heading text-sm tracking-wider text-white">CORREO</p>
                <p className="text-sm text-[#A0A0A0]">{SITE.email}</p>
              </div>
            </a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 surface rounded-xl hover:border-[#E8003A]/50 transition-all">
              <Instagram className="text-[#E8003A]" size={24} />
              <div>
                <p className="font-heading text-sm tracking-wider text-white">INSTAGRAM</p>
                <p className="text-sm text-[#A0A0A0]">@mercyfit</p>
              </div>
            </a>
            <div className="flex items-center gap-4 p-5 surface rounded-xl">
              <Clock className="text-[#A0A0A0]" size={24} />
              <div>
                <p className="font-heading text-sm tracking-wider text-white">HORARIO</p>
                <p className="text-sm text-[#A0A0A0]">Lun–Vie 9:00–18:00 (CDMX)</p>
              </div>
            </div>
          </div>

          {/* Form -> WhatsApp */}
          <form onSubmit={openWhatsApp} className="space-y-4">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Tu nombre" required
              className="w-full px-4 py-3 bg-[#111111] border border-white/[0.07] rounded text-white text-sm placeholder-[#A0A0A0] focus:outline-none focus:border-[#E8003A]" />
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Tu correo" required
              className="w-full px-4 py-3 bg-[#111111] border border-white/[0.07] rounded text-white text-sm placeholder-[#A0A0A0] focus:outline-none focus:border-[#E8003A]" />
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="¿En qué te ayudamos?" rows={5} required
              className="w-full px-4 py-3 bg-[#111111] border border-white/[0.07] rounded text-white text-sm placeholder-[#A0A0A0] focus:outline-none focus:border-[#E8003A] resize-none" />
            <button type="submit"
              className="w-full py-4 bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-[0.15em] transition-colors">
              ENVIAR POR WHATSAPP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
