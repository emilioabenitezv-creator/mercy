import React from 'react';
import { Link } from 'react-router-dom';
import { HERO_IMAGE } from '@/lib/productImages';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Atleta de artes marciales entrenando con equipo MERCY"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/75 to-[#0A0A0A]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-2xl"
        >
          <span className="eyebrow">Hecho en México · BJJ · MMA · No-Gi</span>

          <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-[0.02em] text-white uppercase leading-[0.92]">
            Tu Compañero<br />
            <span className="text-[#E8003A]">En El Tatami</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#B5B5B5] max-w-lg leading-relaxed">
            Rashguards, shorts y equipo de alto rendimiento diseñados para atletas que exigen lo mejor.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <Link to="/rashguards" className="btn-primary group">
              Comprar Rashguards
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link to="/shorts" className="btn-secondary">
              Ver Shorts
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#8A8A8A]">
            <span className="flex items-center gap-1.5">
              <Star size={13} className="fill-[#E8003A] text-[#E8003A]" /> 4.8/5 valoración media
            </span>
            <span className="hidden sm:inline text-white/15">|</span>
            <span>+2,000 atletas equipados</span>
            <span className="hidden sm:inline text-white/15">|</span>
            <span>Envío gratis +$1,200</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#8A8A8A]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#E8003A] to-transparent" />
      </motion.div>
    </section>
  );
}
