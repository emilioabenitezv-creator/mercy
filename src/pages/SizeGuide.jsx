import React from 'react';
import { Ruler } from 'lucide-react';
import Seo from '@/components/mercy/Seo';

const rashguardSizes = [
  ['XS', '82-86', '66-70', '86-90'],
  ['S', '86-92', '70-76', '90-96'],
  ['M', '92-100', '76-84', '96-104'],
  ['L', '100-108', '84-92', '104-112'],
  ['XL', '108-116', '92-100', '112-120'],
  ['2XL', '116-124', '100-108', '120-128'],
];

const shortsSizes = [
  ['S', '72-78', '88-94'],
  ['M', '78-86', '94-102'],
  ['L', '86-94', '102-110'],
  ['XL', '94-102', '110-118'],
];

export default function SizeGuide() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-[100px] md:pt-[116px]">
      <Seo
        title="Guía de Tallas — MERCY"
        description="Encuentra tu talla perfecta de rashguard y short. Medidas en cm de pecho, cintura y cadera, y recomendaciones de ajuste."
        path="/guia-de-tallas"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-[0.05em] text-white uppercase text-center">
          Guía de <span className="text-[#E8003A]">Tallas</span>
        </h1>
        <div className="w-16 h-1 bg-[#E8003A] mx-auto mt-4" />

        {/* How to measure */}
        <div className="mt-12 p-6 bg-[#111111] border border-[#2A2A2A] rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Ruler className="text-[#E8003A]" size={24} />
            <h2 className="font-heading text-lg tracking-wider text-white">CÓMO MEDIRTE</h2>
          </div>
          <div className="space-y-3 text-sm text-[#A0A0A0] leading-relaxed">
            <p><span className="text-white font-medium">Pecho:</span> Mide la circunferencia más ancha de tu pecho, pasando por debajo de las axilas.</p>
            <p><span className="text-white font-medium">Cintura:</span> Mide la circunferencia natural de tu cintura, a la altura del ombligo.</p>
            <p><span className="text-white font-medium">Cadera:</span> Mide la circunferencia más ancha de tu cadera.</p>
            <p className="text-xs italic mt-4">Usa una cinta métrica flexible. No aprietes demasiado. Mide sobre ropa interior ligera.</p>
          </div>
        </div>

        {/* Rashguard table */}
        <div className="mt-10">
          <h2 className="font-heading text-lg tracking-wider text-white mb-4">RASHGUARDS</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2A2A2A]">
                  <th className="py-3 text-left font-heading text-xs tracking-wider text-[#A0A0A0]">TALLA</th>
                  <th className="py-3 text-center font-heading text-xs tracking-wider text-[#A0A0A0]">PECHO (cm)</th>
                  <th className="py-3 text-center font-heading text-xs tracking-wider text-[#A0A0A0]">CINTURA (cm)</th>
                  <th className="py-3 text-center font-heading text-xs tracking-wider text-[#A0A0A0]">CADERA (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A2A]">
                {rashguardSizes.map(row => (
                  <tr key={row[0]} className="hover:bg-[#111111] transition-colors">
                    <td className="py-3 text-white font-mono font-bold">{row[0]}</td>
                    <td className="py-3 text-center text-[#A0A0A0] font-mono">{row[1]}</td>
                    <td className="py-3 text-center text-[#A0A0A0] font-mono">{row[2]}</td>
                    <td className="py-3 text-center text-[#A0A0A0] font-mono">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shorts table */}
        <div className="mt-10">
          <h2 className="font-heading text-lg tracking-wider text-white mb-4">SHORTS</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2A2A2A]">
                  <th className="py-3 text-left font-heading text-xs tracking-wider text-[#A0A0A0]">TALLA</th>
                  <th className="py-3 text-center font-heading text-xs tracking-wider text-[#A0A0A0]">CINTURA (cm)</th>
                  <th className="py-3 text-center font-heading text-xs tracking-wider text-[#A0A0A0]">CADERA (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A2A]">
                {shortsSizes.map(row => (
                  <tr key={row[0]} className="hover:bg-[#111111] transition-colors">
                    <td className="py-3 text-white font-mono font-bold">{row[0]}</td>
                    <td className="py-3 text-center text-[#A0A0A0] font-mono">{row[1]}</td>
                    <td className="py-3 text-center text-[#A0A0A0] font-mono">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendation */}
        <div className="mt-10 p-6 bg-[#E8003A]/10 border border-[#E8003A]/30 rounded-lg">
          <p className="text-sm text-white leading-relaxed">
            <span className="font-heading tracking-wider">¿ENTRE DOS TALLAS?</span><br />
            Para <span className="font-bold">rashguard</span> elige la talla menor para un ajuste de compresión óptimo.<br />
            Para <span className="font-bold">shorts</span> elige la talla mayor para libertad de movimiento.
          </p>
        </div>
      </div>
    </div>
  );
}