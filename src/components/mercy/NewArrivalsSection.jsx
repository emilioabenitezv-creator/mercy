import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import ProductCard from './ProductCard';
import SectionHeading from './SectionHeading';

export default function NewArrivalsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Product.filter({ is_new: true }, '-created_date', 4)
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Hide the whole section if there are no new products (avoids an empty block).
  if (loading || products.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Recién llegado"
          title="Novedades"
          subtitle="Lo último que sale del tatami. Ediciones limitadas: cuando se agotan, no vuelven."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <Link to="/rashguards" className="btn-secondary group">
            Ver todo lo nuevo
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
