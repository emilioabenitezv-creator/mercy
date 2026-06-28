import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ProductCard from './ProductCard';
import SectionHeading from './SectionHeading';

export default function BestsellersSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Product.filter({ is_bestseller: true }, '-sort_order', 4)
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-24 md:py-32 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-[#2A2A2A] border-t-[#E8003A] rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Los favoritos del tatami"
          title="Más"
          accent="Vendidos"
          subtitle="Las piezas que más confían los atletas. Edición limitada, rendimiento de competencia."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <Link to="/rashguards" className="btn-secondary group">
            Ver toda la colección
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}