import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { itemCount, setIsCartOpen, wishlist } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: 'RASHGUARDS', path: '/rashguards' },
    { label: 'SHORTS', path: '/shorts' },
    { label: 'NOSOTROS', path: '/nosotros' },
    { label: 'GUÍA DE TALLAS', path: '/guia-de-tallas' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#2A2A2A]' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center">
              <span className="font-display text-2xl md:text-3xl font-bold tracking-[0.15em] text-white">
                MERCY
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {links.map(link => (
                <Link key={link.path} to={link.path}
                  className="font-heading text-sm tracking-[0.1em] text-[#A0A0A0] hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link to="/wishlist" className="relative p-2 text-[#A0A0A0] hover:text-white transition-colors">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#E8003A] rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#A0A0A0] hover:text-white transition-colors">
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#E8003A] rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                    {itemCount}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-white">
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-lg pt-20"
          >
            <div className="flex flex-col items-center gap-8 pt-12">
              {links.map(link => (
                <Link key={link.path} to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="font-heading text-2xl tracking-[0.15em] text-white hover:text-[#E8003A] transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}