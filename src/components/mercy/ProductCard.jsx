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

  return (
    <motion.div
      className="group relative surface rounded-xl overflow-hidden hover:border-[#E8003A]/40 transition-colors duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {allSizesOut && (
          <span className="px-2.5 py-1 bg-[#1A1A1A]/90 backdrop-blur-sm text-[#A0A0A0] text-[10px] font-heading tracking-[0.12em] rounded">AGOTADO</span>
        )}
        {product.is_new && (
          <span className="px-2.5 py-1 bg-[#FF5F1F] text-white text-[10px] font-heading tracking-[0.12em] rounded">NUEVO</span>
        )}
        {product.is_bestseller && !allSizesOut && (
          <span className="px-2.5 py-1 bg-[#E8003A] text-white text-[10px] font-heading tracking-[0.12em] rounded">MÁS VENDIDO</span>
        )}
      </div>

      {/* Wishlist */}
      <button onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
        aria-label={isInWishlist(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        className="absolute top-3 right-3 z-10 p-2 bg-[#0A0A0A]/50 backdrop-blur-sm rounded-full hover:bg-[#0A0A0A] transition-all">
        <Heart size={16} className={isInWishlist(product.id) ? 'fill-[#E8003A] text-[#E8003A]' : 'text-white'} />
      </button>

      {/* Image */}
      <Link to={`/producto/${product.slug}`}>
        <div className="aspect-[4/5] overflow-hidden bg-[#0A0A0A]">
          <img
            src={hovered && product.image_url_2 ? product.image_url_2 : product.image_url}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover transition-transform duration-700 ${allSizesOut ? 'opacity-50 grayscale' : ''} group-hover:scale-[1.05]`}
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-5">
        <Link to={`/producto/${product.slug}`}>
          <h3 className="font-heading text-sm tracking-[0.08em] text-white group-hover:text-[#E8003A] transition-colors line-clamp-1">
            {product.name.toUpperCase()}
          </h3>
        </Link>
        {product.rating > 0 && (
          <div className="mt-2">
            <StarRating rating={product.rating} size={12} reviewCount={product.review_count} />
          </div>
        )}
        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="font-mono text-lg font-bold text-white">${product.price.toLocaleString()}</span>
          <span className="text-xs text-[#7A7A7A] font-mono">MXN</span>
        </div>
        <div className="mt-4">
          {allSizesOut ? (
            <Link to={`/producto/${product.slug}`}
              className="block w-full py-2.5 border border-white/15 text-[#A0A0A0] font-heading text-xs tracking-[0.12em] text-center rounded hover:border-white hover:text-white transition-all">
              NOTIFICARME
            </Link>
          ) : (
            <Link to={`/producto/${product.slug}`}
              className="block w-full py-2.5 border border-[#E8003A]/60 text-[#E8003A] font-heading text-xs tracking-[0.12em] text-center rounded group-hover:bg-[#E8003A] group-hover:text-white group-hover:border-[#E8003A] transition-all">
              VER PRODUCTO
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
