import React from 'react';
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';

const items = [
  { icon: Truck, title: 'Envío gratis', sub: 'En pedidos +$1,200 MXN' },
  { icon: RotateCcw, title: '30 días de cambios', sub: 'Cambia tu talla sin costo' },
  { icon: ShieldCheck, title: 'Pago 100% seguro', sub: 'Compra protegida' },
];

export default function TrustBar() {
  return (
    <div className="bg-[#0A0A0A] border-y border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.07]">
          {items.map((it) => (
            <div key={it.title} className="flex items-center justify-center gap-3.5 py-6">
              <it.icon size={22} strokeWidth={1.5} className="text-[#E8003A] flex-shrink-0" />
              <div className="leading-tight">
                <p className="font-heading text-[13px] tracking-[0.12em] text-white uppercase">{it.title}</p>
                <p className="text-xs text-[#7A7A7A] mt-0.5">{it.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
