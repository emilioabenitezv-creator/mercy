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
import {
  Minus, Plus, ShoppingBag, Zap, ChevronRight, ChevronDown, ChevronLeft,
  Truck, RotateCcw, ShieldCheck, CreditCard, Check, X,
} from 'lucide-react';

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

const FEATURES = ['Transpirable', 'Secado rápido', 'Anti-bacterial', 'UPF 50+', '4-way stretch', 'Costuras flatlock'];

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/[0.07]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 py-4 text-left">
        <span className="font-heading text-sm tracking-[0.1em] text-white">{title}</span>
        <ChevronDown size={18} className={`text-[#A0A0A0] flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-5">{children}</div>}
    </div>
  );
}

const SHARE_ICONS = {
  whatsapp: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884',
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  x: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
};

function ShareButton({ type, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Compartir en ${type}`}
      className="w-9 h-9 flex items-center justify-center border border-white/[0.1] rounded-lg text-[#A0A0A0] hover:text-white hover:border-[#E8003A] transition-all">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d={SHARE_ICONS[type]} /></svg>
    </a>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [addon, setAddon] = useState(null);
  const [addonChecked, setAddonChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [sizeModal, setSizeModal] = useState(false);
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
          setActiveImage(0);
          setAddonChecked(false);
          base44.entities.Product.filter({ category: p.category })
            .then(all => setRelated(all.filter(r => r.id !== p.id).slice(0, 4)));
          const otherCat = p.category === 'rashguard' ? 'shorts' : 'rashguard';
          base44.entities.Product.filter({ category: otherCat })
            .then(list => setAddon(list.find(x => x.id !== p.id) || null));
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#0A0A0A] min-h-screen pt-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/[0.1] border-t-[#E8003A] rounded-full animate-spin" />
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

  const images = [product.image_url, product.image_url_2].filter(Boolean);
  const outOfStockSizes = product.sizes_out_of_stock || [];
  const isSizeAvailable = (size) => !outOfStockSizes.includes(size);
  const allSoldOut = (product.sizes || []).every(s => outOfStockSizes.includes(s));
  const canAddToCart = selectedSize && isSizeAvailable(selectedSize) && !allSoldOut;
  const catLabel = product.category === 'rashguard' ? 'Rashguards' : 'Shorts';
  const catBadge = product.category === 'rashguard' ? 'RASHGUARD' : 'SHORT';
  const catPath = product.category === 'rashguard' ? '/rashguards' : '/shorts';
  const sizeChart = SIZE_CHART[product.category] || SIZE_CHART.rashguard;

  const onSale = product.compare_at_price && product.compare_at_price > product.price;
  const discountPct = onSale ? Math.round((1 - product.price / product.compare_at_price) * 100) : 0;
  const msi = Math.round(product.price / 12);
  const lowStock = outOfStockSizes.length > 0 && !allSoldOut;

  function handleAddToCart() {
    if (!canAddToCart) return;
    addItem(product, selectedSize, quantity);
    if (addonChecked && addon) {
      const addonSize = (addon.sizes || []).find(s => !(addon.sizes_out_of_stock || []).includes(s));
      if (addonSize) addItem(addon, addonSize, 1);
    }
  }

  function handleBuyNow() {
    if (!canAddToCart) return;
    handleAddToCart();
    navigate('/checkout');
  }

  function scrollToReviews() {
    document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
  }

  const shareUrl = `${SITE.url}/producto/${product.slug}`;
  const shareText = `Mira ${product.name} en MERCY`;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: images,
    description: product.description || product.story || `${product.name} — equipo de alto rendimiento para artes marciales.`,
    brand: { '@type': 'Brand', name: 'MERCY' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'MXN',
      price: product.price,
      availability: allSoldOut ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      url: shareUrl,
    },
    ...(product.rating > 0 && product.review_count > 0
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.review_count } }
      : {}),
  };

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
          <span className="text-white line-clamp-1">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Gallery */}
          <div className="flex flex-col-reverse sm:flex-row md:flex-row gap-4 md:sticky md:top-24 md:self-start">
            {images.length > 1 && (
              <div className="flex sm:flex-col gap-3">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)}
                    className={`w-16 h-20 rounded-lg overflow-hidden border transition-all ${activeImage === i ? 'border-[#E8003A]' : 'border-white/[0.1] hover:border-white/40'}`}>
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            <div className="relative flex-1 group aspect-[4/5] bg-[#111111] rounded-lg overflow-hidden border border-white/[0.07]">
              <img src={images[activeImage]} alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-zoom-in" />
              {images.length > 1 && (
                <>
                  <button onClick={() => setActiveImage((activeImage - 1 + images.length) % images.length)} aria-label="Imagen anterior"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0A0A0A]/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#0A0A0A] transition-all">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setActiveImage((activeImage + 1) % images.length)} aria-label="Imagen siguiente"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0A0A0A]/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#0A0A0A] transition-all">
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="inline-block px-2.5 py-1 bg-[#111111] border border-white/[0.08] rounded text-[10px] font-heading tracking-[0.15em] text-[#A0A0A0]">{catBadge}</span>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-[0.04em] text-white uppercase">
              {product.name}
            </h1>

            {product.rating > 0 && (
              <button onClick={scrollToReviews} className="mt-3 flex items-center gap-2 hover:opacity-80">
                <StarRating rating={product.rating} size={16} showNumber />
                <span className="text-sm text-[#A0A0A0] underline underline-offset-2">({product.review_count || 0} reseñas)</span>
              </button>
            )}

            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <span className={`font-mono text-3xl font-bold ${onSale ? 'text-[#E8003A]' : 'text-white'}`}>${product.price.toLocaleString()}</span>
              {onSale && <span className="font-mono text-lg text-[#7A7A7A] line-through">${product.compare_at_price.toLocaleString()}</span>}
              <span className="font-mono text-sm text-[#7A7A7A]">MXN</span>
              {onSale && <span className="px-2 py-1 bg-[#E8003A] text-white text-[11px] font-heading tracking-[0.1em] rounded">{discountPct}% OFF</span>}
            </div>
            <p className="mt-1.5 text-sm text-[#A0A0A0] flex items-center gap-1.5">
              <CreditCard size={14} /> o 12 pagos de <span className="text-white font-medium">${msi.toLocaleString()}</span> con Mercado Pago
            </p>

            {/* Size selector */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <p className="font-heading text-sm tracking-wider text-white">TALLA</p>
                <button onClick={() => setSizeModal(true)} className="text-xs text-[#A0A0A0] underline underline-offset-2 hover:text-white transition-colors">
                  ¿Cuál es mi talla?
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
                : lowStock && <p className="text-xs text-[#FF5F1F] mt-3 flex items-center gap-1.5"><Zap size={12} /> Quedan pocas tallas</p>}
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="font-heading text-sm tracking-wider text-white mb-3">CANTIDAD</p>
              <div className="flex items-center gap-3 bg-[#111111] border border-white/[0.07] rounded-lg w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Disminuir cantidad" className="p-3 text-[#A0A0A0] hover:text-white"><Minus size={16} /></button>
                <span className="font-mono text-white w-8 text-center" aria-live="polite">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} aria-label="Aumentar cantidad" className="p-3 text-[#A0A0A0] hover:text-white"><Plus size={16} /></button>
              </div>
            </div>

            {/* Add-on: completa tu look */}
            {addon && (
              <label className="mt-6 flex items-center gap-3 p-3 surface rounded-lg cursor-pointer">
                <input type="checkbox" checked={addonChecked} onChange={e => setAddonChecked(e.target.checked)} className="w-4 h-4 accent-[#E8003A]" />
                <img src={addon.image_url} alt={addon.name} className="w-12 h-14 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-[#A0A0A0] tracking-wider">COMPLETA TU LOOK</p>
                  <p className="text-sm text-white truncate">{addon.name}</p>
                </div>
                <span className="font-mono text-sm text-white">+${addon.price.toLocaleString()}</span>
              </label>
            )}

            {/* Buttons */}
            <div className="mt-6 space-y-3">
              <button onClick={handleAddToCart} disabled={!canAddToCart}
                className="w-full py-4 rounded-lg bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-[0.18em] uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <ShoppingBag size={18} /> Agregar al carrito
              </button>
              <button onClick={handleBuyNow} disabled={!canAddToCart}
                className="w-full py-4 rounded-lg border border-white/25 text-white font-heading text-sm tracking-[0.18em] uppercase hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <Zap size={18} /> Comprar ahora
              </button>
            </div>

            {/* Trust line */}
            <div className="mt-6 grid grid-cols-2 gap-3 p-4 surface rounded-lg">
              <p className="text-xs text-[#A0A0A0] flex items-center gap-2"><Truck size={15} className="text-[#E8003A] flex-shrink-0" /> Envío gratis +${SITE.freeShippingThreshold.toLocaleString()}</p>
              <p className="text-xs text-[#A0A0A0] flex items-center gap-2"><Zap size={15} className="text-[#E8003A] flex-shrink-0" /> Entrega 3–5 días</p>
              <p className="text-xs text-[#A0A0A0] flex items-center gap-2"><RotateCcw size={15} className="text-[#E8003A] flex-shrink-0" /> 30 días de cambios</p>
              <p className="text-xs text-[#A0A0A0] flex items-center gap-2"><ShieldCheck size={15} className="text-[#E8003A] flex-shrink-0" /> Pago 100% seguro</p>
            </div>

            {/* Share */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs text-[#7A7A7A] tracking-wider">COMPARTIR</span>
              <ShareButton type="whatsapp" href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`} />
              <ShareButton type="facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} />
              <ShareButton type="x" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} />
              <ShareButton type="instagram" href={SITE.instagram} />
            </div>

            {/* Accordions */}
            <div className="mt-8">
              <Accordion title="DESCRIPCIÓN DEL PRODUCTO" defaultOpen>
                <p className="text-[#D5D5D5] leading-relaxed text-sm">{product.story || product.description || 'Diseñado para atletas de alto rendimiento que exigen lo mejor del tatami.'}</p>
              </Accordion>
              <Accordion title="CARACTERÍSTICAS CLAVE">
                <div className="grid grid-cols-2 gap-3">
                  {FEATURES.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-[#A0A0A0]"><Check size={14} className="text-[#E8003A]" /> {f}</div>
                  ))}
                </div>
              </Accordion>
              <Accordion title="MATERIALES Y CUIDADOS">
                <table className="w-full text-sm mb-4">
                  <tbody className="divide-y divide-white/[0.07]">
                    <tr><td className="py-2 text-[#A0A0A0]">Material</td><td className="py-2 text-white text-right">{product.materials || '80% Poliéster, 20% Spandex'}</td></tr>
                    <tr><td className="py-2 text-[#A0A0A0]">Tecnología</td><td className="py-2 text-white text-right">4-Way Stretch</td></tr>
                    <tr><td className="py-2 text-[#A0A0A0]">Protección UV</td><td className="py-2 text-white text-right">UPF 50+</td></tr>
                  </tbody>
                </table>
                <p className="text-sm text-[#A0A0A0] leading-relaxed">{product.care_instructions || 'Lavar a máquina en agua fría. No usar blanqueador. Secar al aire libre. No planchar sobre el estampado.'}</p>
              </Accordion>
              <Accordion title="GUÍA DE TALLAS">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.07]">
                      <th className="py-2 text-left font-heading text-xs tracking-wider text-[#A0A0A0]">TALLA</th>
                      <th className="py-2 text-center font-heading text-xs tracking-wider text-[#A0A0A0]">PECHO</th>
                      {product.category === 'rashguard' && <th className="py-2 text-center font-heading text-xs tracking-wider text-[#A0A0A0]">CINTURA</th>}
                      <th className="py-2 text-center font-heading text-xs tracking-wider text-[#A0A0A0]">CADERA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.07]">
                    {sizeChart.map(row => (
                      <tr key={row[0]}>
                        {row.map((cell, i) => <td key={i} className={`py-2 font-mono text-sm ${i === 0 ? 'text-white text-left' : 'text-[#A0A0A0] text-center'}`}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Accordion>
              <Accordion title="PROMESA MERCY">
                <p className="text-sm text-[#A0A0A0] leading-relaxed">
                  Calidad de competencia garantizada. Si tu pieza presenta cualquier defecto de fábrica, la reponemos sin costo.
                  Cambios de talla gratis dentro de 30 días con la prenda sin uso y con etiquetas. Hecho por atletas, para atletas.
                </p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews (full width) */}
      <div id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 scroll-mt-24">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.05em] text-white uppercase mb-8">
          Reseñas de <span className="text-[#E8003A]">Guerreros</span>
        </h2>
        <ReviewSection productId={product.id} />
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.05em] text-white uppercase mb-8">
            También Te Puede <span className="text-[#E8003A]">Gustar</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}

      {/* Sticky mobile add-to-cart */}
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

      {/* Size modal */}
      {sizeModal && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSizeModal(false)}>
          <div className="surface rounded-xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg tracking-wider text-white">GUÍA DE TALLAS</h3>
              <button onClick={() => setSizeModal(false)} aria-label="Cerrar"><X size={20} className="text-[#A0A0A0] hover:text-white" /></button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  <th className="py-2 text-left font-heading text-xs tracking-wider text-[#A0A0A0]">TALLA</th>
                  <th className="py-2 text-center font-heading text-xs tracking-wider text-[#A0A0A0]">PECHO</th>
                  {product.category === 'rashguard' && <th className="py-2 text-center font-heading text-xs tracking-wider text-[#A0A0A0]">CINTURA</th>}
                  <th className="py-2 text-center font-heading text-xs tracking-wider text-[#A0A0A0]">CADERA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.07]">
                {sizeChart.map(row => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => <td key={i} className={`py-2 font-mono text-sm ${i === 0 ? 'text-white text-left' : 'text-[#A0A0A0] text-center'}`}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-[#A0A0A0] italic">¿Entre dos tallas? Para rashguard elige la menor, para shorts la mayor.</p>
          </div>
        </div>
      )}

      <NotifyModal isOpen={notifyModal.open}
        onClose={() => setNotifyModal({ open: false, size: '' })}
        productId={product.id} productName={product.name} size={notifyModal.size} />
    </div>
  );
}
