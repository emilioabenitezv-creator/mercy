import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useCart } from '@/lib/CartContext';
import StarRating from '@/components/mercy/StarRating';
import NotifyModal from '@/components/mercy/NotifyModal';
import ProductCard from '@/components/mercy/ProductCard';
import ReviewSection from '@/components/mercy/ReviewSection';
import Seo from '@/components/mercy/Seo';
import { SITE } from '@/lib/site';
import { Minus, Plus, ShoppingBag, Zap, ChevronRight, Truck, RotateCcw, ShieldCheck, CreditCard } from 'lucide-react';

const SIZE_CHART = {
  rashguard: [
    ['XS', '82-86', '66-70', '86-90'],
    ['S', '86-92', '70-76', '90-96'],
    ['M', '92-100', '76-84', '96-104'],
    ['L', '100-108', '84-92', '104-112'],
    ['XL', '108-116', '92-100', '112-120'],
    ['2XL', '116-124', '100-108', '120-128'],
  ],
  shorts: [
    ['S', '72-78', '88-94'],
    ['M', '78-86', '94-102'],
    ['L', '86-94', '102-110'],
    ['XL', '94-102', '110-118'],
  ],
};

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem, setIsCartOpen } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [notifyModal, setNotifyModal] = useState({ open: false, size: '' });

  useEffect(() => {
    setLoading(true);
    base44.entities.Product.filter({ slug })
      .then(products => {
        if (products.length > 0) {
          const p = products[0];
          setProduct(p);
          setSelectedSize('');
          setQuantity(1);
          setActiveTab('description');
          // Load related
          base44.entities.Product.filter({ category: p.category })
            .then(all => setRelated(all.filter(r => r.id !== p.id).slice(0, 4)));
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#0A0A0A] min-h-screen pt-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/[0.07] border-t-[#E8003A] rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#0A0A0A] min-h-screen pt-20 flex items-center justify-center">
        <p className="text-[#A0A0A0] font-heading tracking-wider">Producto no encontrado</p>
      </div>
    );
  }

  const outOfStockSizes = product.sizes_out_of_stock || [];
  const isSizeAvailable = (size) => !outOfStockSizes.includes(size);
  const allSoldOut = (product.sizes || []).every(s => outOfStockSizes.includes(s));
  const canAddToCart = selectedSize && isSizeAvailable(selectedSize) && !allSoldOut;
  const catLabel = product.category === 'rashguard' ? 'Rashguards' : 'Shorts';
  const catPath = product.category === 'rashguard' ? '/rashguards' : '/shorts';
  const sizeChart = SIZE_CHART[product.category] || SIZE_CHART.rashguard;

  function handleAddToCart() {
    if (!canAddToCart) return;
    addItem(product, selectedSize, quantity);
  }

  function handleBuyNow() {
    if (!canAddToCart) return;
    addItem(product, selectedSize, quantity);
    navigate('/checkout');
  }

  const msi = Math.round(product.price / 12);
  const lowStock = outOfStockSizes.length > 0 && !allSoldOut;
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [product.image_url, product.image_url_2].filter(Boolean),
    description: product.description || product.story || `${product.name} — equipo de alto rendimiento para artes marciales.`,
    brand: { '@type': 'Brand', name: 'MERCY' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'MXN',
      price: product.price,
      availability: allSoldOut ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      url: `${SITE.url}/producto/${product.slug}`,
    },
    ...(product.rating > 0 && product.review_count > 0
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.review_count } }
      : {}),
  };

  const tabs = [
    { key: 'description', label: 'Descripción' },
    { key: 'materials', label: 'Materiales' },
    { key: 'sizes', label: 'Guía de Tallas' },
    { key: 'reviews', label: 'Reseñas' },
  ];

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-6 pb-20 md:pb-0">
      <Seo
        title={`${product.name} — MERCY`}
        description={product.description || product.story || `${product.name}: ${catLabel} de alto rendimiento para BJJ, MMA y No-Gi. Diseñado en México.`}
        path={`/producto/${product.slug}`}
        image={product.image_url}
        jsonLd={productJsonLd}
      />
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-[#A0A0A0] hover:text-white transition-colors">Inicio</Link>
          <ChevronRight size={14} className="text-[#5A5A5A]" />
          <Link to={catPath} className="text-[#A0A0A0] hover:text-white transition-colors">{catLabel}</Link>
          <ChevronRight size={14} className="text-[#5A5A5A]" />
          <span className="text-white">{product.name}</span>
        </div>
      </div>

      {/* Product layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-[#111111] rounded-lg overflow-hidden border border-white/[0.07]">
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.image_url_2 && (
              <div className="aspect-[4/5] bg-[#111111] rounded-lg overflow-hidden border border-white/[0.07]">
                <img src={product.image_url_2} alt={product.name} className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="md:sticky md:top-24 md:self-start">
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-[0.05em] text-white uppercase">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-mono text-3xl font-bold text-white">${product.price.toLocaleString()}</span>
              <span className="font-mono text-sm text-[#7A7A7A]">MXN</span>
            </div>
            <p className="mt-1.5 text-sm text-[#A0A0A0] flex items-center gap-1.5">
              <CreditCard size={14} className="text-[#A0A0A0]" />
              o 12 pagos de <span className="text-white font-medium">${msi.toLocaleString()}</span> con Mercado Pago
            </p>

            {product.rating > 0 && (
              <div className="mt-3">
                <button onClick={() => setActiveTab('reviews')} className="flex items-center gap-2 hover:opacity-80">
                  <StarRating rating={product.rating} size={16} showNumber reviewCount={product.review_count} />
                </button>
              </div>
            )}

            {/* Size selector */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <p className="font-heading text-sm tracking-wider text-white">TALLA</p>
                <button onClick={() => setActiveTab('sizes')} className="text-xs text-[#A0A0A0] underline underline-offset-2 hover:text-white transition-colors">
                  Guía de tallas
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(product.sizes || []).map(size => {
                  const available = isSizeAvailable(size);
                  const selected = selectedSize === size;
                  return (
                    <button key={size}
                      onClick={() => available ? setSelectedSize(size) : setNotifyModal({ open: true, size })}
                      className={`relative w-14 h-12 rounded-lg border font-heading text-sm tracking-wider transition-all ${
                        !available
                          ? 'border-white/[0.06] text-[#5A5A5A] line-through cursor-pointer'
                          : selected
                            ? 'border-[#E8003A] bg-[#E8003A] text-white'
                            : 'border-white/[0.14] text-[#C5C5C5] hover:border-white hover:text-white'
                      }`}
                      title={!available ? 'Sin stock — click para notificación' : ''}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              {!selectedSize
                ? <p className="text-xs text-[#A0A0A0] mt-3">Selecciona tu talla</p>
                : lowStock && (
                    <p className="text-xs text-[#FF5F1F] mt-3 flex items-center gap-1.5">
                      <Zap size={12} /> Quedan pocas tallas
                    </p>
                  )}
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="font-heading text-sm tracking-wider text-white mb-3">CANTIDAD</p>
              <div className="flex items-center gap-3 bg-[#111111] border border-white/[0.07] rounded w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Disminuir cantidad"
                  className="p-3 text-[#A0A0A0] hover:text-white"><Minus size={16} /></button>
                <span className="font-mono text-white w-8 text-center" aria-live="polite">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} aria-label="Aumentar cantidad"
                  className="p-3 text-[#A0A0A0] hover:text-white"><Plus size={16} /></button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 space-y-3">
              <button onClick={handleAddToCart} disabled={!canAddToCart}
                className="w-full py-4 rounded-lg bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-[0.18em] uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <ShoppingBag size={18} />
                Agregar al carrito
              </button>
              <button onClick={handleBuyNow} disabled={!canAddToCart}
                className="w-full py-4 rounded-lg border border-white/25 text-white font-heading text-sm tracking-[0.18em] uppercase hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <Zap size={18} />
                Comprar ahora
              </button>
            </div>

            {/* Trust / reassurance block */}
            <div className="mt-6 grid grid-cols-2 gap-3 p-4 bg-[#111111] border border-white/[0.07] rounded-lg">
              <p className="text-xs text-[#A0A0A0] flex items-center gap-2"><Truck size={15} className="text-[#E8003A] flex-shrink-0" /> Envío gratis +${SITE.freeShippingThreshold.toLocaleString()}</p>
              <p className="text-xs text-[#A0A0A0] flex items-center gap-2"><Zap size={15} className="text-[#E8003A] flex-shrink-0" /> Entrega 3–5 días</p>
              <p className="text-xs text-[#A0A0A0] flex items-center gap-2"><RotateCcw size={15} className="text-[#E8003A] flex-shrink-0" /> 30 días de cambios</p>
              <p className="text-xs text-[#A0A0A0] flex items-center gap-2"><ShieldCheck size={15} className="text-[#E8003A] flex-shrink-0" /> Pago 100% seguro</p>
            </div>

            {/* Tabs */}
            <div className="mt-10">
              <div className="flex gap-0 border-b border-white/[0.07] overflow-x-auto">
                {tabs.map(tab => (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-3 font-heading text-xs tracking-wider whitespace-nowrap transition-all border-b-2 ${
                      activeTab === tab.key
                        ? 'text-[#E8003A] border-[#E8003A]'
                        : 'text-[#A0A0A0] border-transparent hover:text-white'
                    }`}>
                    {tab.label.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="py-6">
                {activeTab === 'description' && (
                  <div className="space-y-4">
                    <p className="text-[#F5F5F5] leading-relaxed">{product.story || product.description || 'Diseñado para atletas de alto rendimiento que exigen lo mejor del tatami.'}</p>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      {['Transpirable', 'Secado rápido', 'Anti-bacterial', 'UPF 50+'].map(feature => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-[#A0A0A0]">
                          <span className="text-[#E8003A]">✓</span> {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'materials' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-heading text-sm tracking-wider text-white mb-3">COMPOSICIÓN</h4>
                      <table className="w-full text-sm">
                        <tbody className="divide-y divide-white/[0.07]">
                          <tr><td className="py-2 text-[#A0A0A0]">Material</td><td className="py-2 text-white text-right">{product.materials || '80% Poliéster, 20% Spandex'}</td></tr>
                          <tr><td className="py-2 text-[#A0A0A0]">Tecnología</td><td className="py-2 text-white text-right">4-Way Stretch</td></tr>
                          <tr><td className="py-2 text-[#A0A0A0]">Protección UV</td><td className="py-2 text-white text-right">UPF 50+</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <h4 className="font-heading text-sm tracking-wider text-white mb-3">CUIDADOS</h4>
                      <p className="text-sm text-[#A0A0A0] leading-relaxed">{product.care_instructions || 'Lavar a máquina en agua fría. No usar blanqueador. Secar al aire libre. No planchar sobre el estampado.'}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'sizes' && (
                  <div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/[0.07]">
                          <th className="py-2 text-left font-heading text-xs tracking-wider text-[#A0A0A0]">TALLA</th>
                          <th className="py-2 text-center font-heading text-xs tracking-wider text-[#A0A0A0]">PECHO (cm)</th>
                          {product.category === 'rashguard' && <th className="py-2 text-center font-heading text-xs tracking-wider text-[#A0A0A0]">CINTURA (cm)</th>}
                          <th className="py-2 text-center font-heading text-xs tracking-wider text-[#A0A0A0]">{product.category === 'shorts' ? 'CADERA (cm)' : 'CADERA (cm)'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.07]">
                        {sizeChart.map(row => (
                          <tr key={row[0]}>
                            {row.map((cell, i) => (
                              <td key={i} className={`py-2 font-mono text-sm ${i === 0 ? 'text-white text-left' : 'text-[#A0A0A0] text-center'}`}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="mt-4 text-xs text-[#A0A0A0] italic">
                      ¿Entre dos tallas? Para rashguard elige la menor. Para shorts la mayor.
                    </p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <ReviewSection productId={product.id} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.05em] text-white uppercase mb-8">
              También Te Puede <span className="text-[#E8003A]">Gustar</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      {/* Sticky mobile add-to-cart bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/[0.07] px-4 py-3 flex items-center gap-3">
        <div className="flex flex-col leading-tight">
          <span className="font-mono text-lg font-bold text-white">${product.price.toLocaleString()}</span>
          {selectedSize
            ? <span className="text-[10px] text-[#A0A0A0]">Talla {selectedSize}</span>
            : <span className="text-[10px] text-[#E8003A]">↑ Elige tu talla</span>}
        </div>
        <button onClick={handleAddToCart} disabled={!canAddToCart}
          className="flex-1 py-3 rounded-lg bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-[0.18em] uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
          Agregar
        </button>
      </div>

      <NotifyModal isOpen={notifyModal.open}
        onClose={() => setNotifyModal({ open: false, size: '' })}
        productId={product.id} productName={product.name} size={notifyModal.size} />
    </div>
  );
}