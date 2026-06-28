import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useCart } from '@/lib/CartContext';
import ProductCard from '@/components/mercy/ProductCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wishlist.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    base44.entities.Product.list()
      .then(all => setProducts(all.filter(p => wishlist.includes(p.id))))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [wishlist]);

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-4xl font-bold tracking-[0.05em] text-white uppercase text-center">
          Mis <span className="text-[#E8003A]">Favoritos</span>
        </h1>
        <div className="w-16 h-1 bg-[#E8003A] mx-auto mt-4 mb-12" />

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#2A2A2A] border-t-[#E8003A] rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="text-[#2A2A2A] mx-auto mb-4" />
            <p className="text-[#A0A0A0] font-heading tracking-wider mb-6">No tienes favoritos aún</p>
            <Link to="/rashguards"
              className="inline-block px-8 py-3 bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-wider transition-colors">
              EXPLORAR PRODUCTOS
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}