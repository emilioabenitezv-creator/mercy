import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import StarRating from './StarRating';
import SectionHeading from './SectionHeading';

const testimonials = [
  {
    name: 'Diego Hernández',
    city: 'CDMX',
    rating: 5,
    text: 'El mejor rashguard que he usado. La tela se siente increíble y después de 6 meses de entrenamiento diario sigue como nuevo. Los diseños son únicos, siempre recibo cumplidos en el tatami.',
  },
  {
    name: 'Andrea López',
    city: 'Guadalajara',
    rating: 5,
    text: 'Pedí el Mexicano y el Oni. Llegaron en 2 días. El ajuste es perfecto para No-Gi, no se mueve nada durante los rolls. Ya soy cliente frecuente.',
  },
  {
    name: 'Luis Torres',
    city: 'Monterrey',
    rating: 4,
    text: 'Excelente calidad de compresión. Se nota que están diseñados por gente que entrena de verdad. El diseño Sacred Arts es una obra de arte. Solo quisiera más colores.',
  },
  {
    name: 'Sofía Ramírez',
    city: 'Querétaro',
    rating: 5,
    text: 'Los shorts GOAT son perfectos para MMA. El corte permite patadas sin restricción y el material aguanta todo. Mejor marca mexicana de ropa de pelea sin duda.',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => c === 0 ? testimonials.length - 1 : c - 1);
  const next = () => setCurrent(c => c === testimonials.length - 1 ? 0 : c + 1);

  const t = testimonials[current];

  return (
    <section className="py-24 md:py-32 bg-[#0C0C0C]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading kicker="Reseñas verificadas" title="Lo Que Dicen" accent="Nuestros Clientes" />

        <div className="relative surface rounded-2xl p-8 md:p-14 text-center">
          <Quote size={40} className="text-[#E8003A]/25 mx-auto mb-6" />
          <div className="mb-5 flex justify-center">
            <StarRating rating={t.rating} size={20} />
          </div>
          <p className="text-xl md:text-2xl text-[#F0F0F0] leading-relaxed font-light mb-8">"{t.text}"</p>
          <p className="font-heading tracking-[0.08em] text-white">{t.name}</p>
          <p className="text-sm text-[#8A8A8A] mt-0.5">{t.city}</p>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prev} aria-label="Testimonio anterior"
              className="w-10 h-10 border border-white/[0.12] rounded-lg flex items-center justify-center text-[#A0A0A0] hover:text-white hover:border-white transition-all">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-[#E8003A] w-6' : 'bg-white/[0.18]'}`} />
              ))}
            </div>
            <button onClick={next} aria-label="Siguiente testimonio"
              className="w-10 h-10 border border-white/[0.12] rounded-lg flex items-center justify-center text-[#A0A0A0] hover:text-white hover:border-white transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}