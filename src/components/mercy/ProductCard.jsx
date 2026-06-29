import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import StarRating from './StarRating';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useCart();
  const [hovered, setHovered] = useState(false);

  const allSizesOut = product.sizes?.length > 0 && product.sizes_out_of_stock?.length >= product.sizes?.length;

  // Show a single badge (priority order) to avoid clutter.
  const badge = allSizesOut
    ? { label: 'AGOTADO', cls: 'bg-[#1A1A1A]/90 text-[#A0A0A0]' }
    : product.is_new
      ? { label: 'NUEVO', cls: 'bg-white text-black' }
      : product.is_bestseller
        ? { label: 'MÁS VENDIDO', cls: 'bg-[#E8003A] text-white' }
        : null;

  return (
    <motion.div
      className="group relative surface rounded-xl overflow-hidden hover:border-white/[0.15] transition-colors duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {/* Whole-card click target */}
      <Link to={`/producto/${product.slug}`} className="absolute inset-0 z-[1]" aria-label={product.name} />

      {/* Single badge */}
      {badge && (
        <span className={`absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] font-heading tracking-[0.12em] rounded ${badge.cls} backdrop-blur-sm`}>
          {badge.label}
        </span>
      )}

      {/* Wishlist */}
      <button onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
        aria-label={isInWishlist(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        className="absolute top-3 right-3 z-10 p-2 bg-[#0A0A0A]/40 backdrop-blur-sm rounded-full hover:bg-[#0A0A0A] transition-all">
        <Heart size={16} className={isInWishlist(product.id) ? 'fill-[#E8003A] text-[#E8003A]' : 'text-white'} />
      </button>

      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden bg-[#0A0A0A]">
        <img
          src={hovered && product.image_url_2 ? product.image_url_2 : product.image_url}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-transform duration-700 ${allSizesOut ? 'opacity-50 grayscale' : ''} group-hover:scale-[1.05]`}
        />
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-heading text-sm tracking-[0.08em] text-white group-hover:text-[#E8003A] transition-colors line-clamp-1">
          {product.name.toUpperCase()}
        </h3>
        {product.rating > 0 && (
          <div className="mt-2">
            <StarRating rating={product.rating} size={12} reviewCount={product.review_count} />
          </div>
        )}
        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="font-mono text-lg font-bold text-white">${product.price.toLocaleString()}</span>
          <span className="text-xs text-[#7A7A7A] font-mono">MXN</span>
        </div>
      </div>
    </motion.div>
  );
}
