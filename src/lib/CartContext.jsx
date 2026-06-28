import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const FREE_SHIPPING_THRESHOLD = 1200;

function loadCart() {
  try {
    const saved = localStorage.getItem('mercy_cart');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function loadWishlist() {
  try {
    const saved = localStorage.getItem('mercy_wishlist');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [wishlist, setWishlist] = useState(loadWishlist);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(null);

  useEffect(() => { localStorage.setItem('mercy_cart', JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem('mercy_wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  function addItem(product, size, quantity = 1) {
    setItems(prev => {
      const existing = prev.find(i => i.productId === product.id && i.size === size);
      if (existing) {
        return prev.map(i => i.productId === product.id && i.size === size
          ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, {
        productId: product.id, name: product.name, slug: product.slug,
        price: product.price, size, quantity, image: product.image_url
      }];
    });
    setJustAdded({ name: product.name, size });
    setTimeout(() => setJustAdded(null), 3000);
  }

  function updateQuantity(productId, size, quantity) {
    if (quantity <= 0) return removeItem(productId, size);
    setItems(prev => prev.map(i => i.productId === productId && i.size === size
      ? { ...i, quantity } : i));
  }

  function removeItem(productId, size) {
    setItems(prev => prev.filter(i => !(i.productId === productId && i.size === size)));
  }

  function clearCart() { setItems([]); }

  function toggleWishlist(productId) {
    setWishlist(prev => prev.includes(productId) 
      ? prev.filter(id => id !== productId) 
      : [...prev, productId]);
  }

  function isInWishlist(productId) { return wishlist.includes(productId); }

  return (
    <CartContext.Provider value={{
      items, itemCount, subtotal, freeShippingRemaining, hasFreeShipping,
      addItem, updateQuantity, removeItem, clearCart,
      isCartOpen, setIsCartOpen, justAdded,
      wishlist, toggleWishlist, isInWishlist,
      FREE_SHIPPING_THRESHOLD
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() { return useContext(CartContext); }