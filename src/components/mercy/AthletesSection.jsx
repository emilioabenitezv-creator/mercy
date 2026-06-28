import React from 'react';
import { ATHLETE_IMAGES } from '@/lib/productImages';
import { motion } from 'framer-motion';

const athletes = [
  { name: 'Carlos "El Demonio" Vega', discipline: 'Brazilian Jiu-Jitsu', image: ATHLETE_IMAGES.bjj },
  { name: 'Roberto "Knockout" Martínez', discipline: 'MMA', image: ATHLETE_IMAGES.mma },
  { name: 'Valentina "La Fiera" Ríos', discipline: 'Wrestling / No-Gi', image: ATHLETE_IMAGES.wrestling },
];

export default function AthletesSection() {
  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-[0.05em] text-white uppercase">
            Nuestros <span className="text-[#E8003A]">Atletas</span>
          </h2>
          <div className="w-16 h-1 bg-[#E8003A] mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {athletes.map((athlete, i) => (
            <motion.div key={athlete.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img src={athlete.image} alt={athlete.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-lg tracking-wider text-white">{athlete.name}</h3>
                <p className="text-sm text-[#E8003A] font-heading tracking-wider mt-1">{athlete.discipline}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}