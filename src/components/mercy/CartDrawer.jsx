import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import PaymentMethods from './PaymentMethods';

export default function CartDrawer() {
  const navigate = useNavigate();
  const { items, subtotal, isCartOpen, setIsCartOpen, updateQuantity, removeItem,
    freeShippingRemaining, hasFreeShipping, FREE_SHIPPING_THRESHOLD } = useCart();

  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  function goToCheckout() {
    setIsCartOpen(false);
    navigate('/checkout');
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)} />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#0A0A0A] border-l border-white/[0.07] flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/[0.07]">
              <h2 className="font-heading text-xl tracking-wider text-white">TU CARRITO</h2>
              <button onClick={() => setIsCartOpen(false)} aria-label="Cerrar carrito" className="text-[#A0A0A0] hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* Free shipping bar */}
            <div className="px-5 py-3 border-b border-white/[0.07]">
              {hasFreeShipping ? (
                <p className="text-sm text-green-400 font-medium">✓ ¡Tienes envío gratis!</p>
              ) : (
                <p className="text-sm text-[#A0A0A0]">
                  Te faltan <span className="text-[#E8003A] font-bold font-mono">${freeShippingRemaining.toLocaleString()}</span> para envío gratis
                </p>
              )}
              <div className="mt-2 h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: hasFreeShipping ? '#22c55e' : '#E8003A' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${shippingProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-[#2A2A2A] mb-4" />
                  <p className="text-[#A0A0A0] font-heading tracking-wider">TU CARRITO ESTÁ VACÍO</p>
                  <button onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-6 py-3 border border-white text-white font-heading tracking-wider text-sm hover:bg-white hover:text-black transition-all">
                    SEGUIR COMPRANDO
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={`${item.productId}-${item.size}`} className="flex gap-4 bg-[#111111] rounded-lg p-3">
                      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <Link to={`/producto/${item.slug}`} onClick={() => setIsCartOpen(false)}
                          className="font-heading text-sm tracking-wider text-white hover:text-[#E8003A] transition-colors line-clamp-1">
                          {item.name}
                        </Link>
                        <p className="text-xs text-[#A0A0A0] mt-1">Talla: {item.size}</p>
                        <p className="text-sm font-mono text-[#E8003A] mt-1">${item.price.toLocaleString()} MXN</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-[#0A0A0A] rounded">
                            <button onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                              className="p-1.5 text-[#A0A0A0] hover:text-white"><Minus size={14} /></button>
                            <span className="text-sm font-mono text-white w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                              className="p-1.5 text-[#A0A0A0] hover:text-white"><Plus size={14} /></button>
                          </div>
                          <button onClick={() => removeItem(item.productId, item.size)}
                            className="p-1.5 text-[#A0A0A0] hover:text-[#E8003A]"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/[0.07] p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-heading tracking-wider text-[#A0A0A0]">SUBTOTAL</span>
                  <span className="text-xl font-mono font-bold text-white">${subtotal.toLocaleString()} MXN</span>
                </div>
                <button onClick={goToCheckout} className="w-full py-4 rounded-lg bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-[0.18em] uppercase transition-all duration-300">
                  Proceder al pago
                </button>
                <button onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 rounded-lg border border-white/25 text-white font-heading text-sm tracking-[0.18em] uppercase hover:bg-white hover:text-black transition-all duration-300">
                  Seguir comprando
                </button>
                <p className="text-center text-[11px] text-[#7A7A7A]">Impuestos incluidos · Envío calculado en el checkout</p>
                <div className="flex justify-center"><PaymentMethods compact /></div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}