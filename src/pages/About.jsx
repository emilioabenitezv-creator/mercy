import React from 'react';
import { Link } from 'react-router-dom';
import { ABOUT_IMAGE } from '@/lib/productImages';
import { Shield, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Seo from '@/components/mercy/Seo';

const values = [
  { icon: Shield, title: 'DISCIPLINA', text: 'Cada pieza se diseña con la misma disciplina que un atleta aplica a su entrenamiento. Sin atajos, sin compromisos.' },
  { icon: Heart, title: 'IDENTIDAD', text: 'Somos orgullosamente mexicanos. Nuestros diseños honran nuestra cultura, nuestra historia y nuestra garra.' },
  { icon: Zap, title: 'RENDIMIENTO', text: 'Materiales de competencia, tecnología textil avanzada y pruebas reales por atletas activos. Hecho para la guerra.' },
];

export default function About() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Seo
        title="Nosotros — MERCY | Nacidos del tatami mexicano"
        description="Creada por atletas activos de BJJ, MMA y No-Gi en México. Conoce la historia, los pilares y el propósito detrás de MERCY."
        path="/nosotros"
        image={ABOUT_IMAGE}
      />
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={ABOUT_IMAGE} alt="Mercy tatami" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/55 to-[#0A0A0A]/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="eyebrow mb-3">Nacidos del tatami mexicano</span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.08em] text-white uppercase">NOSOTROS</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl font-bold tracking-[0.05em] text-white uppercase mb-6">
            Nacimos Del <span className="text-[#E8003A]">Tatami Mexicano</span>
          </h2>
          <div className="space-y-4 text-[#A0A0A0] leading-relaxed">
            <p>
              Mercy nació de la frustración de no encontrar equipo de artes marciales que combinara calidad de competencia 
              con diseños que representen nuestra identidad. Creada por atletas activos de BJJ, MMA y No-Gi Grappling en México, 
              entendemos lo que necesitas porque lo vivimos cada día en el tatami.
            </p>
            <p>
              Cada rashguard, cada short, cada pieza de Mercy está diseñada con un propósito: darte la confianza y el rendimiento 
              que necesitas para dar lo mejor de ti. No somos una marca de moda que vende ropa deportiva. Somos atletas que 
              diseñan equipo de combate.
            </p>
            <p>
              Nuestros diseños cuentan historias de guerreros, de arte sagrado, de la fuerza que define al espíritu mexicano. 
              Ediciones limitadas porque creemos que cada pieza debe ser especial, no masiva.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <div className="mt-16">
          <h2 className="font-display text-3xl font-bold tracking-[0.05em] text-white uppercase mb-10 text-center">
            Nuestros <span className="text-[#E8003A]">Pilares</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center p-8 surface rounded-xl"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-[#E8003A]/10 rounded-xl flex items-center justify-center">
                  <v.icon size={24} className="text-[#E8003A]" />
                </div>
                <h3 className="font-heading text-sm tracking-[0.15em] text-white mb-3">{v.title}</h3>
                <p className="text-sm text-[#A0A0A0] leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="font-display text-2xl font-bold tracking-[0.05em] text-white uppercase mb-6">
            ¿Listo Para Entrenar Con Mercy?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/rashguards" className="btn-primary">Ver Rashguards</Link>
            <Link to="/shorts" className="btn-secondary">Ver Shorts</Link>
          </div>
        </div>
      </div>
    </div>
  );
}