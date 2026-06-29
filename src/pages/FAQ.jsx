import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Seo from '@/components/mercy/Seo';

const faqs = [
  { q: '¿Cuánto tarda mi envío?', a: 'Procesamos tu pedido en 24–48 h hábiles y la entrega estimada es de 3 a 5 días hábiles a todo México. Recibirás un número de guía para rastrearlo.' },
  { q: '¿El envío es gratis?', a: 'Sí, en todos los pedidos superiores a $1,200 MXN. Por debajo, el envío nacional tiene un costo fijo de $99 MXN.' },
  { q: '¿Cómo sé qué talla elegir?', a: 'Consulta nuestra Guía de Tallas con medidas en cm. Si estás entre dos tallas: para rashguard elige la menor (ajuste de compresión) y para shorts la mayor (libertad de movimiento).' },
  { q: '¿Puedo cambiar mi talla?', a: 'Sí. Tienes 30 días para solicitar un cambio sin costo, siempre que la prenda esté sin uso, sin lavar y con sus etiquetas originales.' },
  { q: '¿Qué métodos de pago aceptan?', a: 'Tarjetas Visa, Mastercard y American Express, Mercado Pago (hasta 12 meses sin intereses), transferencia y pago en efectivo en OXXO.' },
  { q: '¿Los productos son de edición limitada?', a: 'Sí. Trabajamos con ediciones limitadas: cuando una pieza se agota, normalmente no vuelve. Suscríbete para enterarte de los lanzamientos antes que nadie.' },
];

function Item({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.07]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 py-5 text-left">
        <span className="font-heading text-sm sm:text-base tracking-[0.04em] text-white">{q}</span>
        <ChevronDown size={18} className={`text-[#A0A0A0] flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="pb-5 text-sm text-[#A0A0A0] leading-relaxed">{a}</p>}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-8 md:pt-10">
      <Seo title="Preguntas Frecuentes — MERCY" description="Resolvemos tus dudas sobre envíos, tallas, cambios y pagos en MERCY." path="/preguntas-frecuentes" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <span className="eyebrow">¿Dudas?</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-[0.02em] text-white uppercase">
            Preguntas <span className="text-[#E8003A]">Frecuentes</span>
          </h1>
        </div>
        <div className="surface rounded-xl px-6">
          {faqs.map((f) => <Item key={f.q} {...f} />)}
        </div>
        <p className="mt-8 text-center text-sm text-[#A0A0A0]">
          ¿No encuentras tu respuesta? <Link to="/contacto" className="text-[#E8003A] hover:underline">Contáctanos</Link>.
        </p>
      </div>
    </div>
  );
}
