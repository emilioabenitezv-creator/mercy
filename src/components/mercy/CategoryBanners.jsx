import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATALOG_RASHGUARDS_IMAGE, CATALOG_SHORTS_IMAGE } from '@/lib/productImages';

const banners = [
  { title: 'RASHGUARDS', sub: 'BJJ · No-Gi', image: CATALOG_RASHGUARDS_IMAGE, path: '/rashguards' },
  { title: 'SHORTS', sub: 'MMA · Grappling', image: CATALOG_SHORTS_IMAGE, path: '/shorts' },
];

export default function CategoryBanners() {
  return (
    <section className="bg-[#0A0A0A]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {banners.map((b) => (
          <Link key={b.path} to={b.path} className="group relative h-[60vh] min-h-[380px] overflow-hidden">
            <img src={b.image} alt={b.title} loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/20 group-hover:via-[#0A0A0A]/30 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-end text-center pb-12 px-6">
              <span className="eyebrow mb-3">{b.sub}</span>
              <h3 className="font-display text-4xl sm:text-5xl font-bold tracking-[0.06em] text-white uppercase mb-5">{b.title}</h3>
              <span className="inline-flex items-center gap-2 px-7 py-3 border border-white/40 text-white font-heading text-xs tracking-[0.18em] uppercase rounded-lg group-hover:bg-white group-hover:text-black transition-all duration-300">
                Ver colección
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
