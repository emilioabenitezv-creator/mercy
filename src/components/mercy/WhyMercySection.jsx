import React from 'react';
import { Layers, Palette, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const pillars = [
  {
    icon: Layers,
    title: 'MATERIAL PREMIUM',
    spec: 'UPF 50+ · 4-way stretch',
    description: 'Tela 4-way stretch, secado rápido, resistente a raspones y rozaduras del tatami.',
  },
  {
    icon: Palette,
    title: 'DISEÑOS ÚNICOS',
    spec: 'Ediciones limitadas',
    description: 'Arte mexicano combinado con cultura marcial. Ediciones limitadas para quienes destacan.',
  },
  {
    icon: Zap,
    title: 'PROBADO EN EL TATAMI',
    spec: 'BJJ · MMA · Grappling',
    description: 'Cada pieza fue diseñada y probada por practicantes reales de BJJ, MMA y Grappling.',
  },
];

export default function WhyMercySection() {
  return (
    <section className="py-24 md:py-32 bg-[#0C0C0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading kicker="Por qué elegirnos" title="¿Por Qué" accent="Mercy?" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="group p-8 lg:p-10 surface rounded-xl hover:border-[#E8003A]/40 transition-colors duration-300"
            >
              <div className="w-14 h-14 mb-6 bg-[#E8003A]/10 rounded-xl flex items-center justify-center group-hover:bg-[#E8003A]/20 transition-colors duration-300">
                <pillar.icon size={26} strokeWidth={1.5} className="text-[#E8003A]" />
              </div>
              <p className="eyebrow mb-2">{pillar.spec}</p>
              <h3 className="font-heading text-lg tracking-[0.08em] text-white mb-3">{pillar.title}</h3>
              <p className="text-[#9A9A9A] text-sm leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
