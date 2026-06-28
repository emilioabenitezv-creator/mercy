import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import StarRating from './StarRating';
import { Star } from 'lucide-react';
import moment from 'moment';

export default function ReviewSection({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ author_name: '', rating: 5, text: '', size_purchased: '', author_city: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    base44.entities.Review.filter({ product_id: productId }, '-created_date')
      .then(setReviews)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [productId]);

  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const distribution = [5, 4, 3, 2, 1].map(star => ({
    star, count: reviews.filter(r => r.rating === star).length
  }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.author_name || !form.text) return;
    setSubmitting(true);
    try {
      const newReview = await base44.entities.Review.create({ ...form, product_id: productId });
      setReviews(prev => [newReview, ...prev]);
      setShowForm(false);
      setForm({ author_name: '', rating: 5, text: '', size_purchased: '', author_city: '' });
    } catch {}
    setSubmitting(false);
  }

  if (loading) return <div className="w-6 h-6 border-2 border-[#2A2A2A] border-t-[#E8003A] rounded-full animate-spin mx-auto" />;

  return (
    <div>
      {/* Summary */}
      <div className="flex flex-col sm:flex-row gap-8 mb-8">
        <div className="text-center">
          <p className="font-mono text-5xl font-bold text-white">{avgRating.toFixed(1)}</p>
          <StarRating rating={avgRating} size={18} />
          <p className="text-sm text-[#A0A0A0] mt-1">{reviews.length} reseñas</p>
        </div>
        <div className="flex-1 space-y-2">
          {distribution.map(d => (
            <div key={d.star} className="flex items-center gap-3">
              <span className="text-xs text-[#A0A0A0] font-mono w-4">{d.star}</span>
              <Star size={12} className="text-[#E8003A] fill-[#E8003A]" />
              <div className="flex-1 h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                <div className="h-full bg-[#E8003A] rounded-full"
                  style={{ width: reviews.length > 0 ? `${(d.count / reviews.length) * 100}%` : '0%' }} />
              </div>
              <span className="text-xs text-[#A0A0A0] font-mono w-6">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => setShowForm(!showForm)}
        className="mb-6 px-6 py-3 border border-[#E8003A] text-[#E8003A] font-heading text-xs tracking-wider hover:bg-[#E8003A] hover:text-white transition-all">
        ESCRIBIR RESEÑA
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-[#111111] border border-[#2A2A2A] rounded-lg space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input value={form.author_name} onChange={e => setForm({ ...form, author_name: e.target.value })}
              placeholder="Tu nombre *" required
              className="px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded text-white text-sm placeholder-[#A0A0A0] focus:outline-none focus:border-[#E8003A]" />
            <input value={form.author_city} onChange={e => setForm({ ...form, author_city: e.target.value })}
              placeholder="Ciudad"
              className="px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded text-white text-sm placeholder-[#A0A0A0] focus:outline-none focus:border-[#E8003A]" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#A0A0A0]">Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} type="button" onClick={() => setForm({ ...form, rating: star })}>
                  <Star size={20} className={star <= form.rating ? 'fill-[#E8003A] text-[#E8003A]' : 'text-[#2A2A2A]'} />
                </button>
              ))}
            </div>
          </div>
          <input value={form.size_purchased} onChange={e => setForm({ ...form, size_purchased: e.target.value })}
            placeholder="Talla comprada (ej: M)"
            className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded text-white text-sm placeholder-[#A0A0A0] focus:outline-none focus:border-[#E8003A]" />
          <textarea value={form.text} onChange={e => setForm({ ...form, text: e.target.value })}
            placeholder="Tu reseña *" required rows={3}
            className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded text-white text-sm placeholder-[#A0A0A0] focus:outline-none focus:border-[#E8003A] resize-none" />
          <button type="submit" disabled={submitting}
            className="px-8 py-3 bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-xs tracking-wider transition-colors disabled:opacity-50">
            {submitting ? 'ENVIANDO...' : 'ENVIAR RESEÑA'}
          </button>
        </form>
      )}

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="p-4 bg-[#111111] border border-[#2A2A2A] rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-heading text-sm tracking-wider text-white">{review.author_name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={review.rating} size={12} />
                  {review.size_purchased && <span className="text-xs text-[#A0A0A0]">Talla: {review.size_purchased}</span>}
                </div>
              </div>
              <span className="text-xs text-[#A0A0A0] font-mono">{moment(review.created_date).format('DD/MM/YY')}</span>
            </div>
            <p className="mt-3 text-sm text-[#A0A0A0] leading-relaxed">{review.text}</p>
            {review.author_city && <p className="mt-2 text-xs text-[#2A2A2A]">{review.author_city}</p>}
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="text-center text-[#A0A0A0] text-sm py-4">Sé el primero en dejar una reseña</p>
        )}
      </div>
    </div>
  );
}