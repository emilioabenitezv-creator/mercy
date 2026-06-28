import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import StarRating from './StarRating';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const { addItem, toggleWishlist, isInWishlist } = useCart();
  const [hovered, setHovered] = useState(false);

  const allSizesOut = product.sizes?.length > 0 && product.sizes_out_of_stock?.length >= product.sizes?.length;
  const availableSizes = (product.sizes || []).filter(s => !(product.sizes_out_of_stock || []).includes(s));

  return (
    <motion.div
      className="group relative bg-[#111111] rounded-lg overflow-hidden border border-[#2A2A2A] hover:border-[#E8003A]/40 transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {allSizesOut && (
          <span className="px-2 py-1 bg-[#2A2A2A] text-white text-[10px] font-heading tracking-wider">AGOTADO</span>
        )}
        {product.is_new && (
          <span className="px-2 py-1 bg-[#FF5F1F] text-white text-[10px] font-heading tracking-wider">NUEVO</span>
        )}
      </div>

      {/* Wishlist */}
      <button onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
        className="absolute top-3 right-3 z-10 p-2 bg-[#0A0A0A]/60 rounded-full hover:bg-[#0A0A0A] transition-all">
        <Heart size={16} className={isInWishlist(product.id) ? 'fill-[#E8003A] text-[#E8003A]' : 'text-white'} />
      </button>

      {/* Image */}
      <Link to={`/producto/${product.slug}`}>
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={hovered && product.image_url_2 ? product.image_url_2 : product.image_url}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${allSizesOut ? 'opacity-50 grayscale' : ''} group-hover:scale-105`}
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/producto/${product.slug}`}>
          <h3 className="font-heading text-sm tracking-wider text-white group-hover:text-[#E8003A] transition-colors line-clamp-1">
            {product.name.toUpperCase()}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-mono text-lg font-bold text-white">${product.price.toLocaleString()}</span>
          <span className="text-xs text-[#A0A0A0] font-mono">MXN</span>
        </div>
        {product.rating > 0 && (
          <div className="mt-2">
            <StarRating rating={product.rating} size={12} reviewCount={product.review_count} />
          </div>
        )}
        <div className="mt-3">
          {allSizesOut ? (
            <Link to={`/producto/${product.slug}`}
              className="block w-full py-2.5 border border-[#2A2A2A] text-[#A0A0A0] font-heading text-xs tracking-wider text-center hover:border-white hover:text-white transition-all">
              NOTIFICARME
            </Link>
          ) : (
            <Link to={`/producto/${product.slug}`}
              className="block w-full py-2.5 bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-xs tracking-wider text-center transition-colors">
              VER PRODUCTO
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}