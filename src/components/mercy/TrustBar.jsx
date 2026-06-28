import React from 'react';

const badges = [
  { icon: '🇲🇽', text: 'Diseñado en México' },
  { icon: '⚡', text: 'Envío Express en 48h' },
  { icon: '🔒', text: 'Pago 100% Seguro' },
];

export default function TrustBar() {
  return (
    <div className="bg-[#111111] border-y border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 overflow-hidden">
        <div className="flex animate-[marquee_20s_linear_infinite] md:animate-none md:justify-center md:gap-16 gap-12 py-4">
          {[...badges, ...badges].map((badge, i) => (
            <div key={i} className="flex items-center gap-3 flex-shrink-0">
              <span className="text-xl">{badge.icon}</span>
              <span className="text-sm font-heading tracking-wider text-[#A0A0A0] whitespace-nowrap">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}