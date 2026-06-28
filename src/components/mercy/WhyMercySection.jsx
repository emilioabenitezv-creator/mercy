import React from 'react';
import { Layers, Palette, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const pillars = [
  {
    icon: Layers,
    title: 'MATERIAL PREMIUM',
    description: 'Tela de compresión 4-way stretch, secado rápido, UPF 50+. Tecnología textil de alto rendimiento para cada entrenamiento.',
  },
  {
    icon: Palette,
    title: 'ARTE ÚNICO',
    description: 'Cada diseño cuenta una historia. Ediciones limitadas para guerreros que destacan dentro y fuera del tatami.',
  },
  {
    icon: Zap,
    title: 'HECHO PARA RENDIR',
    description: 'Costuras reforzadas, ajuste anatómico, sin restricciones de movimiento. Probado por atletas reales.',
  },
];

export default function WhyMercySection() {
  return (
    <section className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-[0.05em] text-white uppercase">
            ¿Por Qué <span className="text-[#E8003A]">Mercy</span>?
          </h2>
          <div className="w-16 h-1 bg-[#E8003A] mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center p-8 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg hover:border-[#E8003A]/40 transition-all group"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-[#E8003A]/10 rounded-lg flex items-center justify-center group-hover:bg-[#E8003A]/20 transition-colors">
                <pillar.icon size={28} className="text-[#E8003A]" />
              </div>
              <h3 className="font-heading text-lg tracking-[0.1em] text-white mb-4">{pillar.title}</h3>
              <p className="text-[#A0A0A0] text-sm leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}