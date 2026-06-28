import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import ProductCard from '@/components/mercy/ProductCard';
import Seo from '@/components/mercy/Seo';
import { CATALOG_RASHGUARDS_IMAGE, CATALOG_SHORTS_IMAGE } from '@/lib/productImages';

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

export default function Catalog() {
  const location = useLocation();
  const category = location.pathname === '/shorts' ? 'shorts' : 'rashguards';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sizeFilter, setSizeFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('bestseller');

  const catKey = category === 'shorts' ? 'shorts' : 'rashguard';
  const title = category === 'shorts' ? 'SHORTS' : 'RASHGUARDS';
  const headerImage = category === 'shorts' ? CATALOG_SHORTS_IMAGE : CATALOG_RASHGUARDS_IMAGE;

  useEffect(() => {
    setLoading(true);
    base44.entities.Product.filter({ category: catKey })
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [catKey]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (sizeFilter) {
      result = result.filter(p => p.sizes?.includes(sizeFilter));
    }

    if (stockFilter === 'instock') {
      result = result.filter(p => {
        const available = (p.sizes || []).filter(s => !(p.sizes_out_of_stock || []).includes(s));
        return available.length > 0;
      });
    } else if (stockFilter === 'outofstock') {
      result = result.filter(p => {
        const available = (p.sizes || []).filter(s => !(p.sizes_out_of_stock || []).includes(s));
        return available.length === 0;
      });
    }

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'newest': result.sort((a, b) => new Date(b.created_date) - new Date(a.created_date)); break;
      default: result.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0)); break;
    }

    return result;
  }, [products, sizeFilter, stockFilter, sortBy]);

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-[100px] md:pt-[116px]">
      <Seo
        title={`${title} — MERCY | Alto rendimiento para artes marciales`}
        description={category === 'shorts'
          ? 'Shorts de MMA y grappling con ajuste anatómico y libertad total de movimiento. Diseñados en México. Envío gratis desde $1,200.'
          : 'Rashguards de compresión 4-way stretch, UPF 50+ y diseños de edición limitada para BJJ y No-Gi. Hechos en México. Envío gratis desde $1,200.'}
        path={category === 'shorts' ? '/shorts' : '/rashguards'}
        image={headerImage}
      />
      {/* Category header */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={headerImage} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0A0A0A]/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.1em] text-white">{title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-[#2A2A2A]">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSizeFilter('')}
              className={`px-3 py-1.5 text-xs font-heading tracking-wider border rounded transition-all ${
                !sizeFilter ? 'bg-white text-black border-white' : 'border-[#2A2A2A] text-[#A0A0A0] hover:border-white hover:text-white'
              }`}>TODAS</button>
            {ALL_SIZES.map(size => (
              <button key={size} onClick={() => setSizeFilter(sizeFilter === size ? '' : size)}
                className={`px-3 py-1.5 text-xs font-heading tracking-wider border rounded transition-all ${
                  sizeFilter === size ? 'bg-white text-black border-white' : 'border-[#2A2A2A] text-[#A0A0A0] hover:border-white hover:text-white'
                }`}>{size}</button>
            ))}
          </div>

          <div className="flex gap-2 ml-auto">
            <select value={stockFilter} onChange={e => setStockFilter(e.target.value)}
              className="px-3 py-1.5 text-xs font-heading tracking-wider bg-[#111111] border border-[#2A2A2A] rounded text-[#A0A0A0] focus:outline-none focus:border-[#E8003A]">
              <option value="all">Disponibilidad</option>
              <option value="instock">En Stock</option>
              <option value="outofstock">Agotado</option>
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="px-3 py-1.5 text-xs font-heading tracking-wider bg-[#111111] border border-[#2A2A2A] rounded text-[#A0A0A0] focus:outline-none focus:border-[#E8003A]">
              <option value="bestseller">Más Vendido</option>
              <option value="price-low">Precio Menor</option>
              <option value="price-high">Precio Mayor</option>
              <option value="newest">Nuevo</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#2A2A2A] border-t-[#E8003A] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#A0A0A0] font-heading tracking-wider">No se encontraron productos</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}