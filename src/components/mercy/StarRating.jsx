import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating, size = 14, showNumber = false, reviewCount }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star key={star} size={size}
          className={star <= Math.round(rating) ? 'fill-[#E8003A] text-[#E8003A]' : 'text-[#2A2A2A]'}
        />
      ))}
      {showNumber && <span className="text-sm font-mono text-[#A0A0A0] ml-1">{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && (
        <span className="text-xs text-[#A0A0A0] ml-1">({reviewCount})</span>
      )}
    </div>
  );
}