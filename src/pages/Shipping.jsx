import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, RotateCcw, Clock, ShieldCheck } from 'lucide-react';
import Seo from '@/components/mercy/Seo';
import { SITE } from '@/lib/site';

const cards = [
  { icon: Truck, title: 'ENVÍO GRATIS', text: `En todos los pedidos superiores a $${SITE.freeShippingThreshold.toLocaleString()} MXN. Por debajo, envío nacional de $${SITE.shippingFlat} MXN.` },
  { icon: Clock, title: 'ENTREGA 3–5 DÍAS', text: 'Procesamos tu pedido en 24–48 h hábiles. Entrega estimada de 3 a 5 días hábiles a todo México.' },
  { icon: RotateCcw, title: '30 DÍAS DE CAMBIOS', text: 'Cambia tu talla sin costo dentro de los 30 días, siempre que la prenda esté sin uso y con etiquetas.' },
  { icon: ShieldCheck, title: 'COMPRA PROTEGIDA', text: 'Pago 100% seguro. Si tu pedido llega dañado o equivocado, lo reponemos sin costo.' },
];

export default function Shipping() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-[100px] md:pt-[116px]">
      <Seo
        title="Envíos y Devoluciones — MERCY"
        description="Envío gratis desde $1,200 MXN, entrega en 3–5 días y 30 días para cambios de talla. Compra protegida en MERCY."
        path="/envios-y-devoluciones"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <span className="eyebrow">Compra sin riesgo</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-[0.02em] text-white uppercase">
            Envíos y <span className="text-[#E8003A]">Devoluciones</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {cards.map((c) => (
            <div key={c.title} className="p-6 surface rounded-xl">
              <div className="w-12 h-12 mb-4 bg-[#E8003A]/10 rounded-xl flex items-center justify-center">
                <c.icon size={22} className="text-[#E8003A]" />
              </div>
              <h3 className="font-heading text-sm tracking-[0.15em] text-white mb-2">{c.title}</h3>
              <p className="text-sm text-[#A0A0A0] leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="space-y-8 text-[#A0A0A0] leading-relaxed">
          <section>
            <h2 className="font-heading text-lg tracking-wider text-white mb-3">TIEMPOS Y COBERTURA</h2>
            <p>Realizamos envíos a toda la República Mexicana a través de paqueterías de cobertura nacional. Una vez que tu pedido es despachado recibirás un número de guía para rastrearlo. Los tiempos pueden variar en temporadas de alta demanda y en zonas extendidas.</p>
          </section>
          <section>
            <h2 className="font-heading text-lg tracking-wider text-white mb-3">CAMBIOS DE TALLA</h2>
            <p>Sabemos que el ajuste lo es todo en el tatami. Si tu talla no quedó como esperabas, tienes <span className="text-white">30 días</span> para solicitar un cambio. La prenda debe estar sin uso, sin lavar y con sus etiquetas originales. El primer cambio de talla por pedido no tiene costo de envío.</p>
          </section>
          <section>
            <h2 className="font-heading text-lg tracking-wider text-white mb-3">DEVOLUCIONES Y REEMBOLSOS</h2>
            <p>Si deseas devolver un producto en las mismas condiciones (sin uso y con etiquetas), procesamos el reembolso al método de pago original una vez recibido y revisado el artículo. Los productos en oferta de liquidación o ediciones agotadas pueden estar sujetos a condiciones especiales que se indican en su ficha.</p>
          </section>
          <section>
            <h2 className="font-heading text-lg tracking-wider text-white mb-3">¿CÓMO INICIO UN CAMBIO?</h2>
            <p>Escríbenos a <a href={`mailto:${SITE.email}`} className="text-[#E8003A] hover:underline">{SITE.email}</a> o por WhatsApp con tu número de pedido y te guiamos en el proceso en menos de 24 h hábiles.</p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link to="/rashguards" className="inline-block px-8 py-4 bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-[0.15em] transition-colors">
            SEGUIR COMPRANDO
          </Link>
        </div>
      </div>
    </div>
  );
}
