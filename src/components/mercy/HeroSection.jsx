import React from 'react';
import { Link } from 'react-router-dom';
import { HERO_IMAGE } from '@/lib/productImages';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="Atleta de artes marciales entrenando con equipo MERCY" fetchPriority="high" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[0.05em] text-white uppercase leading-none">
            Tu Compañero<br />
            <span className="text-[#E8003A]">En El Tatami</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#A0A0A0] max-w-lg leading-relaxed">
            Rashguards, shorts y equipo de alto rendimiento diseñados para atletas que exigen lo mejor. Hecho en México.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link to="/rashguards"
              className="px-8 py-4 bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-[0.15em] text-center transition-colors">
              COMPRA RASHGUARDS
            </Link>
            <Link to="/shorts"
              className="px-8 py-4 border border-white text-white font-heading text-sm tracking-[0.15em] text-center hover:bg-white hover:text-black transition-all">
              VER SHORTS
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}