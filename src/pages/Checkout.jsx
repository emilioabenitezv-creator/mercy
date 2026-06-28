import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/lib/CartContext';
import Seo from '@/components/mercy/Seo';
import { SITE } from '@/lib/site';
import { ShoppingBag, Lock, CheckCircle2, Truck } from 'lucide-react';

const PAYMENT_METHODS = [
  { id: 'mercadopago', label: 'Tarjeta / Mercado Pago (hasta 12 MSI)' },
  { id: 'transferencia', label: 'Transferencia bancaria' },
  { id: 'oxxo', label: 'Efectivo en OXXO' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, hasFreeShipping, FREE_SHIPPING_THRESHOLD, clearCart } = useCart();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', street: '', neighborhood: '',
    city: '', state: '', zip: '', notes: '',
  });
  const [payment, setPayment] = useState('mercadopago');
  const [code, setCode] = useState('');
  const [appliedCode, setAppliedCode] = useState(null);
  const [codeError, setCodeError] = useState('');
  const [done, setDone] = useState(false);

  const discountPct = appliedCode ? SITE.discountCodes[appliedCode] : 0;
  const discount = Math.round((subtotal * discountPct) / 100);
  const discountedSubtotal = subtotal - discount;
  const shipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SITE.shippingFlat;
  const total = discountedSubtotal + shipping;

  const required = ['name', 'email', 'phone', 'street', 'city', 'state', 'zip'];
  const isValid = required.every((k) => form[k].trim().length > 0);

  function applyCode() {
    const key = code.trim().toUpperCase();
    if (SITE.discountCodes[key]) {
      setAppliedCode(key);
      setCodeError('');
    } else {
      setAppliedCode(null);
      setCodeError('Código no válido');
    }
  }

  function placeOrder(e) {
    e.preventDefault();
    if (!isValid || items.length === 0) return;
    const lines = items
      .map((i) => `• ${i.name} (Talla ${i.size}) x${i.quantity} — $${(i.price * i.quantity).toLocaleString()}`)
      .join('%0A');
    const method = PAYMENT_METHODS.find((m) => m.id === payment)?.label || payment;
    const msg =
      `*NUEVO PEDIDO MERCY*%0A%0A${lines}%0A%0A` +
      `Subtotal: $${subtotal.toLocaleString()}%0A` +
      (discount ? `Descuento (${appliedCode}): -$${discount.toLocaleString()}%0A` : '') +
      `Envío: ${shipping === 0 ? 'GRATIS' : '$' + shipping}%0A` +
      `*Total: $${total.toLocaleString()} MXN*%0A%0A` +
      `*Datos de envío*%0A${form.name}%0A${form.phone} · ${form.email}%0A` +
      `${form.street}, ${form.neighborhood}%0A${form.city}, ${form.state}, CP ${form.zip}%0A` +
      (form.notes ? `Notas: ${form.notes}%0A` : '') +
      `%0APago: ${method}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${msg}`, '_blank', 'noopener');
    clearCart();
    setDone(true);
  }

  if (done) {
    return (
      <div className="bg-[#0A0A0A] min-h-screen pt-[100px] md:pt-[116px] flex items-center justify-center px-4">
        <Seo title="Pedido confirmado — MERCY" description="Gracias por tu compra en MERCY." path="/checkout" />
        <div className="text-center max-w-md">
          <CheckCircle2 size={56} className="text-green-400 mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold tracking-[0.05em] text-white uppercase mb-3">¡Pedido recibido!</h1>
          <p className="text-[#A0A0A0] mb-8">
            Te abrimos WhatsApp para confirmar tu pedido y coordinar el pago. Si no se abrió,
            escríbenos a <a href={`https://wa.me/${SITE.whatsapp}`} className="text-[#E8003A] hover:underline">{SITE.whatsappDisplay}</a>.
          </p>
          <Link to="/" className="inline-block px-8 py-4 bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-[0.15em] transition-colors">
            VOLVER AL INICIO
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#0A0A0A] min-h-screen pt-[100px] md:pt-[116px] flex items-center justify-center px-4">
        <Seo title="Checkout — MERCY" description="Finaliza tu compra en MERCY." path="/checkout" />
        <div className="text-center">
          <ShoppingBag size={48} className="text-[#2A2A2A] mx-auto mb-4" />
          <p className="text-[#A0A0A0] font-heading tracking-wider mb-6">TU CARRITO ESTÁ VACÍO</p>
          <Link to="/rashguards" className="inline-block px-8 py-3 bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-wider transition-colors">
            EXPLORAR PRODUCTOS
          </Link>
        </div>
      </div>
    );
  }

  const field = (name, label, props = {}) => (
    <div>
      <label htmlFor={name} className="block text-xs font-heading tracking-wider text-[#A0A0A0] mb-1.5">{label}</label>
      <input id={name} value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        className="w-full px-4 py-3 bg-[#111111] border border-white/[0.07] rounded text-white text-sm placeholder-[#A0A0A0] focus:outline-none focus:border-[#E8003A]"
        {...props} />
    </div>
  );

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-[100px] md:pt-[116px]">
      <Seo title="Checkout — MERCY" description="Finaliza tu compra de forma segura en MERCY." path="/checkout" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <span className="eyebrow">Casi listo</span>
        <h1 className="mt-3 mb-8 font-display text-3xl sm:text-4xl font-bold tracking-[0.02em] text-white uppercase">Finalizar Compra</h1>

        <form onSubmit={placeOrder} className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Shipping + payment */}
          <div className="space-y-8">
            <section>
              <h2 className="font-heading text-sm tracking-[0.15em] text-white mb-4">DATOS DE ENVÍO</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field('name', 'Nombre completo *', { required: true, autoComplete: 'name' })}
                {field('phone', 'Teléfono / WhatsApp *', { required: true, type: 'tel', autoComplete: 'tel' })}
                {field('email', 'Correo *', { required: true, type: 'email', autoComplete: 'email' })}
                {field('zip', 'Código Postal *', { required: true, inputMode: 'numeric', autoComplete: 'postal-code' })}
                <div className="sm:col-span-2">{field('street', 'Calle y número *', { required: true, autoComplete: 'street-address' })}</div>
                {field('neighborhood', 'Colonia')}
                {field('city', 'Ciudad *', { required: true })}
                {field('state', 'Estado *', { required: true })}
                <div className="sm:col-span-2">{field('notes', 'Referencias / notas (opcional)')}</div>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-sm tracking-[0.15em] text-white mb-4">MÉTODO DE PAGO</h2>
              <div className="space-y-2">
                {PAYMENT_METHODS.map((m) => (
                  <label key={m.id}
                    className={`flex items-center gap-3 p-4 border rounded cursor-pointer transition-all ${payment === m.id ? 'border-[#E8003A] bg-[#E8003A]/5' : 'border-white/[0.07] hover:border-white/40'}`}>
                    <input type="radio" name="payment" value={m.id} checked={payment === m.id}
                      onChange={() => setPayment(m.id)} className="accent-[#E8003A]" />
                    <span className="text-sm text-white">{m.label}</span>
                  </label>
                ))}
              </div>
              <p className="mt-3 text-xs text-[#A0A0A0] flex items-center gap-2">
                <Lock size={12} /> Confirmamos tu pedido y coordinamos el pago seguro por WhatsApp.
              </p>
            </section>
          </div>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-[130px] lg:self-start">
            <div className="bg-[#111111] border border-white/[0.07] rounded-lg p-5 space-y-4">
              <h2 className="font-heading text-sm tracking-[0.15em] text-white">TU PEDIDO</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((i) => (
                  <div key={`${i.productId}-${i.size}`} className="flex gap-3">
                    <img src={i.image} alt={i.name} className="w-14 h-16 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white line-clamp-1">{i.name}</p>
                      <p className="text-xs text-[#A0A0A0]">Talla {i.size} · x{i.quantity}</p>
                    </div>
                    <span className="text-sm font-mono text-white">${(i.price * i.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Discount */}
              <div className="flex gap-2 pt-2 border-t border-white/[0.07]">
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Código de descuento"
                  className="flex-1 px-3 py-2 bg-[#0A0A0A] border border-white/[0.07] rounded text-white text-xs placeholder-[#A0A0A0] focus:outline-none focus:border-[#E8003A]" />
                <button type="button" onClick={applyCode}
                  className="px-4 py-2 border border-white text-white font-heading text-xs tracking-wider hover:bg-white hover:text-black transition-all">
                  APLICAR
                </button>
              </div>
              {codeError && <p className="text-xs text-[#E8003A]">{codeError}</p>}
              {appliedCode && <p className="text-xs text-green-400">✓ Código {appliedCode} aplicado (−{discountPct}%)</p>}

              <div className="space-y-2 pt-2 border-t border-white/[0.07] text-sm">
                <div className="flex justify-between text-[#A0A0A0]"><span>Subtotal</span><span className="font-mono text-white">${subtotal.toLocaleString()}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-400"><span>Descuento</span><span className="font-mono">−${discount.toLocaleString()}</span></div>}
                <div className="flex justify-between text-[#A0A0A0]">
                  <span>Envío</span>
                  <span className="font-mono text-white">{shipping === 0 ? 'GRATIS' : `$${shipping}`}</span>
                </div>
                {!hasFreeShipping && shipping > 0 && (
                  <p className="text-xs text-[#A0A0A0] flex items-center gap-1.5"><Truck size={12} /> Agrega ${(FREE_SHIPPING_THRESHOLD - discountedSubtotal).toLocaleString()} más para envío gratis</p>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-white/[0.07]">
                  <span className="font-heading tracking-wider text-white">TOTAL</span>
                  <span className="text-xl font-mono font-bold text-white">${total.toLocaleString()} <span className="text-xs text-[#A0A0A0]">MXN</span></span>
                </div>
              </div>

              <button type="submit" disabled={!isValid}
                className="w-full py-4 bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-[0.15em] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <Lock size={16} /> CONFIRMAR PEDIDO
              </button>
              <Link to="/" onClick={() => {}} className="block text-center text-xs text-[#A0A0A0] hover:text-white transition-colors">
                ← Seguir comprando
              </Link>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
