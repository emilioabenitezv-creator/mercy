import React from 'react';

const items = [
  { icon: '🇲🇽', text: 'Diseñado en México' },
  { icon: '⚡', text: 'Envío en 3-5 días hábiles' },
  { icon: '🔒', text: 'Pago 100% Seguro' },
];

export default function TrustBar() {
  return (
    <div className="bg-[#111111] border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
          {items.map((it) => (
            <div key={it.text} className="flex items-center justify-center gap-3 py-5 sm:py-6">
              <span className="text-xl">{it.icon}</span>
              <span className="font-heading text-xs sm:text-sm tracking-[0.12em] text-[#A0A0A0] uppercase">{it.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
