import React from 'react';
import { ATHLETE_IMAGES } from '@/lib/productImages';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const athletes = [
  { name: 'Carlos "El Demonio" Vega', discipline: 'Brazilian Jiu-Jitsu', image: ATHLETE_IMAGES.bjj },
  { name: 'Roberto "Knockout" Martínez', discipline: 'MMA', image: ATHLETE_IMAGES.mma },
  { name: 'Valentina "La Fiera" Ríos', discipline: 'Wrestling / No-Gi', image: ATHLETE_IMAGES.wrestling },
];

export default function AthletesSection() {
  return (
    <section className="py-24 md:py-32 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Equipo Mercy"
          title="Nuestros"
          accent="Atletas"
          subtitle="Competidores reales que confían su rendimiento a cada pieza."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {athletes.map((athlete, i) => (
            <motion.div key={athlete.name}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="group relative overflow-hidden rounded-xl border border-white/[0.07]"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img src={athlete.image} alt={athlete.name} loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="eyebrow mb-1.5">{athlete.discipline}</p>
                <h3 className="font-heading text-lg tracking-[0.06em] text-white">{athlete.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}