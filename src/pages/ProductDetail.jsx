import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useCart } from '@/lib/CartContext';
import StarRating from '@/components/mercy/StarRating';
import NotifyModal from '@/components/mercy/NotifyModal';
import ProductCard from '@/components/mercy/ProductCard';
import ReviewSection from '@/components/mercy/ReviewSection';
import { Minus, Plus, ShoppingBag, Zap, ChevronRight } from 'lucide-react';

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
        <div className="w-8 h-8 border-2 border-[#2A2A2A] border-t-[#E8003A] rounded-full animate-spin" />
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
    setIsCartOpen(true);
  }

  const tabs = [
    { key: 'description', label: 'Descripción' },
    { key: 'materials', label: 'Materiales' },
    { key: 'sizes', label: 'Guía de Tallas' },
    { key: 'reviews', label: 'Reseñas' },
  ];

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-16 md:pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-[#A0A0A0] hover:text-white transition-colors">Inicio</Link>
          <ChevronRight size={14} className="text-[#2A2A2A]" />
          <Link to={catPath} className="text-[#A0A0A0] hover:text-white transition-colors">{catLabel}</Link>
          <ChevronRight size={14} className="text-[#2A2A2A]" />
          <span className="text-white">{product.name}</span>
        </div>
      </div>

      {/* Product layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-[#111111] rounded-lg overflow-hidden border border-[#2A2A2A]">
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.image_url_2 && (
              <div className="aspect-[4/5] bg-[#111111] rounded-lg overflow-hidden border border-[#2A2A2A]">
                <img src={product.image_url_2} alt={product.name} className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="md:sticky md:top-24 md:self-start">
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-[0.05em] text-white uppercase">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <span className="font-mono text-3xl font-bold text-[#E8003A]">${product.price.toLocaleString()}</span>
              <span className="font-mono text-sm text-[#A0A0A0]">MXN</span>
            </div>

            {product.rating > 0 && (
              <div className="mt-3">
                <button onClick={() => setActiveTab('reviews')} className="flex items-center gap-2 hover:opacity-80">
                  <StarRating rating={product.rating} size={16} showNumber reviewCount={product.review_count} />
                </button>
              </div>
            )}

            {/* Size selector */}
            <div className="mt-8">
              <p className="font-heading text-sm tracking-wider text-white mb-3">TALLA</p>
              <div className="flex flex-wrap gap-2">
                {(product.sizes || []).map(size => {
                  const available = isSizeAvailable(size);
                  const selected = selectedSize === size;
                  return (
                    <button key={size}
                      onClick={() => available ? setSelectedSize(size) : setNotifyModal({ open: true, size })}
                      className={`relative w-14 h-12 border font-heading text-sm tracking-wider transition-all ${
                        !available
                          ? 'border-[#2A2A2A] text-[#2A2A2A] line-through cursor-pointer'
                          : selected
                            ? 'border-[#E8003A] bg-[#E8003A] text-white'
                            : 'border-[#2A2A2A] text-[#A0A0A0] hover:border-white hover:text-white'
                      }`}
                      title={!available ? 'Sin stock — click para notificación' : ''}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              {!selectedSize && <p className="text-xs text-[#A0A0A0] mt-2">Selecciona una talla</p>}
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="font-heading text-sm tracking-wider text-white mb-3">CANTIDAD</p>
              <div className="flex items-center gap-3 bg-[#111111] border border-[#2A2A2A] rounded w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-[#A0A0A0] hover:text-white"><Minus size={16} /></button>
                <span className="font-mono text-white w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-[#A0A0A0] hover:text-white"><Plus size={16} /></button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 space-y-3">
              <button onClick={handleAddToCart} disabled={!canAddToCart}
                className="w-full py-4 bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-[0.15em] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <ShoppingBag size={18} />
                AGREGAR AL CARRITO
              </button>
              <button onClick={handleBuyNow} disabled={!canAddToCart}
                className="w-full py-4 border border-white text-white font-heading text-sm tracking-[0.15em] hover:bg-white hover:text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <Zap size={18} />
                COMPRAR AHORA
              </button>
            </div>

            {/* Shipping info */}
            <div className="mt-6 space-y-2 p-4 bg-[#111111] border border-[#2A2A2A] rounded-lg">
              <p className="text-sm text-[#A0A0A0]">✓ Envío gratis en pedidos +$1,200 MXN</p>
              <p className="text-sm text-[#A0A0A0]">✓ Entrega en 3-5 días hábiles</p>
            </div>

            {/* Tabs */}
            <div className="mt-10">
              <div className="flex gap-0 border-b border-[#2A2A2A] overflow-x-auto">
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
                        <tbody className="divide-y divide-[#2A2A2A]">
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
                        <tr className="border-b border-[#2A2A2A]">
                          <th className="py-2 text-left font-heading text-xs tracking-wider text-[#A0A0A0]">TALLA</th>
                          <th className="py-2 text-center font-heading text-xs tracking-wider text-[#A0A0A0]">PECHO (cm)</th>
                          {product.category === 'rashguard' && <th className="py-2 text-center font-heading text-xs tracking-wider text-[#A0A0A0]">CINTURA (cm)</th>}
                          <th className="py-2 text-center font-heading text-xs tracking-wider text-[#A0A0A0]">{product.category === 'shorts' ? 'CADERA (cm)' : 'CADERA (cm)'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2A2A2A]">
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

      <NotifyModal isOpen={notifyModal.open}
        onClose={() => setNotifyModal({ open: false, size: '' })}
        productId={product.id} productName={product.name} size={notifyModal.size} />
    </div>
  );
}