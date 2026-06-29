import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_IMAGES } from '@/lib/productImages';
import {
  Minus, Plus, ShoppingBag, Zap, ChevronRight, ChevronDown, ChevronLeft,
  Truck, RotateCcw, ShieldCheck, CreditCard, Check, Star, Search, Heart, User,
} from 'lucide-react';

/**
 * LIGHT-theme mockup of the product page (PDP) for side-by-side comparison
 * against the live dark version. Self-contained with sample data — not wired
 * to the cart or backend. Route: /preview/pdp-claro
 */

const sample = {
  name: 'Rashguard Sacred Arts',
  category: 'RASHGUARD',
  price: 890,
  compare_at_price: 1090,
  rating: 4.8,
  review_count: 124,
  images: [PRODUCT_IMAGES['sacred-arts'], PRODUCT_IMAGES['oni-rashguard']],
  sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
  out: ['XS'],
};

const FEATURES = ['Transpirable', 'Secado rápido', 'Anti-bacterial', 'UPF 50+', '4-way stretch', 'Costuras flatlock'];

function Stars({ rating, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} size={size} className={s <= Math.round(rating) ? 'fill-[#E8003A] text-[#E8003A]' : 'fill-[#E2E2E2] text-[#E2E2E2]'} />
      ))}
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-black/[0.08]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 py-4 text-left">
        <span className="font-heading text-sm tracking-[0.1em] text-[#111]">{title}</span>
        <ChevronDown size={18} className={`text-[#6B6B6B] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-5">{children}</div>}
    </div>
  );
}

export default function PdpLightPreview() {
  const p = sample;
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const onSale = p.compare_at_price > p.price;
  const discountPct = onSale ? Math.round((1 - p.price / p.compare_at_price) * 100) : 0;
  const msi = Math.round(p.price / 12);

  return (
    <div className="min-h-screen bg-[#F5F5F4] text-[#111]">
      {/* Preview banner */}
      <div className="bg-[#E8003A] text-white text-center text-xs py-2 px-4">
        VISTA PREVIA · Variante <b>CLARA</b> del PDP (solo para comparar) ·{' '}
        <Link to="/rashguards" className="underline">ver versión oscura →</Link>
      </div>

      {/* Light mini navbar */}
      <header className="bg-white border-b border-black/[0.08] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <span className="font-display text-2xl font-bold tracking-[0.15em] text-[#111]">MERCY</span>
          <nav className="hidden md:flex items-center gap-8 font-heading text-sm tracking-[0.1em] text-[#555]">
            <span className="hover:text-[#111] cursor-pointer">RASHGUARDS</span>
            <span className="hover:text-[#111] cursor-pointer">SHORTS</span>
            <span className="hover:text-[#111] cursor-pointer">NOSOTROS</span>
          </nav>
          <div className="flex items-center gap-3 text-[#555]">
            <Search size={20} /><Heart size={20} /><ShoppingBag size={20} />
            <span className="hidden md:flex items-center gap-2 ml-2 px-4 py-2 border border-black/15 rounded-lg text-xs font-heading tracking-[0.12em] text-[#111]"><User size={15} /> LOGIN</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm py-4 text-[#6B6B6B]">
          <span className="hover:text-[#111] cursor-pointer">Inicio</span>
          <ChevronRight size={14} className="text-[#B5B5B5]" />
          <span className="hover:text-[#111] cursor-pointer">Rashguards</span>
          <ChevronRight size={14} className="text-[#B5B5B5]" />
          <span className="text-[#111]">{p.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Gallery */}
          <div className="flex flex-col-reverse sm:flex-row gap-4 md:sticky md:top-24 md:self-start">
            <div className="flex sm:flex-col gap-3">
              {p.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)}
                  className={`w-16 h-20 rounded-lg overflow-hidden border transition-all ${activeImage === i ? 'border-[#E8003A]' : 'border-black/[0.1] hover:border-black/40'}`}>
                  <img src={img} alt={`${p.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="relative flex-1 group aspect-[4/5] bg-white rounded-lg overflow-hidden border border-black/[0.08]">
              <img src={p.images[activeImage]} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-zoom-in" />
              <button onClick={() => setActiveImage((activeImage - 1 + p.images.length) % p.images.length)} aria-label="Anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#111] shadow hover:bg-white transition-all"><ChevronLeft size={18} /></button>
              <button onClick={() => setActiveImage((activeImage + 1) % p.images.length)} aria-label="Siguiente"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#111] shadow hover:bg-white transition-all"><ChevronRight size={18} /></button>
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="inline-block px-2.5 py-1 bg-[#F0F0EF] border border-black/[0.08] rounded text-[10px] font-heading tracking-[0.15em] text-[#6B6B6B]">{p.category}</span>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-[0.04em] text-[#111] uppercase">{p.name}</h1>

            <button className="mt-3 flex items-center gap-2">
              <Stars rating={p.rating} />
              <span className="text-sm text-[#6B6B6B]">{p.rating} · ({p.review_count} reseñas)</span>
            </button>

            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <span className="font-mono text-3xl font-bold text-[#E8003A]">${p.price.toLocaleString()}</span>
              <span className="font-mono text-lg text-[#9A9A9A] line-through">${p.compare_at_price.toLocaleString()}</span>
              <span className="font-mono text-sm text-[#9A9A9A]">MXN</span>
              <span className="px-2 py-1 bg-[#E8003A] text-white text-[11px] font-heading tracking-[0.1em] rounded">{discountPct}% OFF</span>
            </div>
            <p className="mt-1.5 text-sm text-[#6B6B6B] flex items-center gap-1.5">
              <CreditCard size={14} /> o 12 pagos de <span className="text-[#111] font-medium">${msi.toLocaleString()}</span> con Mercado Pago
            </p>

            {/* Size */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <p className="font-heading text-sm tracking-wider text-[#111]">TALLA</p>
                <button className="text-xs text-[#6B6B6B] underline underline-offset-2 hover:text-[#111]">¿Cuál es mi talla?</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.sizes.map(size => {
                  const available = !p.out.includes(size);
                  const selected = selectedSize === size;
                  return (
                    <button key={size} onClick={() => available && setSelectedSize(size)}
                      className={`w-14 h-12 rounded-lg border font-heading text-sm tracking-wider transition-all ${
                        !available ? 'border-black/[0.06] text-[#C9C9C9] line-through cursor-not-allowed'
                          : selected ? 'border-[#E8003A] bg-[#E8003A] text-white'
                            : 'border-black/[0.18] text-[#333] hover:border-[#111]'
                      }`}>{size}</button>
                  );
                })}
              </div>
              {!selectedSize && <p className="text-xs text-[#6B6B6B] mt-3">Selecciona tu talla</p>}
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="font-heading text-sm tracking-wider text-[#111] mb-3">CANTIDAD</p>
              <div className="flex items-center gap-3 bg-white border border-black/[0.12] rounded-lg w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-[#6B6B6B] hover:text-[#111]"><Minus size={16} /></button>
                <span className="font-mono text-[#111] w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-[#6B6B6B] hover:text-[#111]"><Plus size={16} /></button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 space-y-3">
              <button className="w-full py-4 rounded-lg bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2">
                <ShoppingBag size={18} /> Agregar al carrito
              </button>
              <button className="w-full py-4 rounded-lg border border-[#111]/25 text-[#111] font-heading text-sm tracking-[0.18em] uppercase hover:bg-[#111] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                <Zap size={18} /> Comprar ahora
              </button>
            </div>

            {/* Trust */}
            <div className="mt-6 grid grid-cols-2 gap-3 p-4 bg-white border border-black/[0.08] rounded-lg">
              <p className="text-xs text-[#555] flex items-center gap-2"><Truck size={15} className="text-[#E8003A]" /> Envío gratis +$1,200</p>
              <p className="text-xs text-[#555] flex items-center gap-2"><Zap size={15} className="text-[#E8003A]" /> Entrega 3–5 días</p>
              <p className="text-xs text-[#555] flex items-center gap-2"><RotateCcw size={15} className="text-[#E8003A]" /> 30 días de cambios</p>
              <p className="text-xs text-[#555] flex items-center gap-2"><ShieldCheck size={15} className="text-[#E8003A]" /> Pago 100% seguro</p>
            </div>

            {/* Accordions */}
            <div className="mt-8">
              <Accordion title="DESCRIPCIÓN DEL PRODUCTO" defaultOpen>
                <p className="text-[#444] leading-relaxed text-sm">Rashguard de compresión con arte mexicano de edición limitada. Diseñado y probado en el tatami para BJJ y No-Gi: sujeta sin cortar el movimiento y aguanta el entrenamiento diario.</p>
              </Accordion>
              <Accordion title="CARACTERÍSTICAS CLAVE">
                <div className="grid grid-cols-2 gap-3">
                  {FEATURES.map(f => <div key={f} className="flex items-center gap-2 text-sm text-[#555]"><Check size={14} className="text-[#E8003A]" /> {f}</div>)}
                </div>
              </Accordion>
              <Accordion title="MATERIALES Y CUIDADOS">
                <p className="text-sm text-[#555] leading-relaxed">80% Poliéster, 20% Spandex · 4-Way Stretch · UPF 50+. Lavar en frío, secar al aire, no planchar sobre el estampado.</p>
              </Accordion>
              <Accordion title="PROMESA MERCY">
                <p className="text-sm text-[#555] leading-relaxed">Calidad de competencia garantizada. Cambios de talla gratis dentro de 30 días con la prenda sin uso y con etiquetas.</p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Light footer hint */}
      <footer className="bg-white border-t border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <span className="font-display text-2xl font-bold tracking-[0.15em] text-[#111]">MERCY</span>
          <p className="mt-2 text-sm text-[#6B6B6B]">Variante clara de demostración · Para volver al sitio oscuro: <Link to="/" className="text-[#E8003A] hover:underline">inicio</Link></p>
        </div>
      </footer>
    </div>
  );
}
