import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import ProductCard from './ProductCard';

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
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-[#2A2A2A] border-t-[#E8003A] rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-[0.05em] text-white uppercase">
            Más <span className="text-[#E8003A]">Vendidos</span>
          </h2>
          <div className="w-16 h-1 bg-[#E8003A] mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}