import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StarRating from './StarRating';

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
    <section className="py-20 bg-[#111111]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-[0.05em] text-white uppercase">
            Lo Que Dicen <span className="text-[#E8003A]">Nuestros Clientes</span>
          </h2>
          <div className="w-16 h-1 bg-[#E8003A] mx-auto mt-4" />
        </div>

        <div className="relative bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg p-8 md:p-12 text-center">
          <div className="mb-4 flex justify-center">
            <StarRating rating={t.rating} size={20} />
          </div>
          <p className="text-lg text-[#F5F5F5] leading-relaxed italic mb-8">"{t.text}"</p>
          <p className="font-heading tracking-wider text-white">{t.name}</p>
          <p className="text-sm text-[#A0A0A0]">{t.city}</p>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prev} aria-label="Testimonio anterior"
              className="w-10 h-10 border border-[#2A2A2A] rounded flex items-center justify-center text-[#A0A0A0] hover:text-white hover:border-white transition-all">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-[#E8003A] w-6' : 'bg-[#2A2A2A]'}`} />
              ))}
            </div>
            <button onClick={next} aria-label="Siguiente testimonio"
              className="w-10 h-10 border border-[#2A2A2A] rounded flex items-center justify-center text-[#A0A0A0] hover:text-white hover:border-white transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}