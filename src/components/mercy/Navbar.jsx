import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Heart, Search, User, ChevronDown, Instagram, Facebook } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { SITE } from '@/lib/site';
import SearchOverlay from './SearchOverlay';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'RASHGUARDS', path: '/rashguards' },
  { label: 'SHORTS', path: '/shorts' },
  { label: 'GUANTES', path: '/accesorios' },
  { label: 'NOSOTROS', path: '/nosotros' },
  { label: 'GUÍA DE TALLAS', path: '/guia-de-tallas' },
];

function TikTokIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export default function Navbar() {
  const { itemCount, setIsCartOpen, wishlist } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* Utility bar (desktop) */}
      <div className="hidden md:block bg-[#0A0A0A] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9 text-xs">
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="text-[#A0A0A0] hover:text-white transition-colors">
              WhatsApp: {SITE.whatsappDisplay}
            </a>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#A0A0A0] hover:text-white transition-colors"><Instagram size={15} /></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#A0A0A0] hover:text-white transition-colors"><Facebook size={15} /></a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-[#A0A0A0] hover:text-white transition-colors"><TikTokIcon /></a>
              </div>
              <span className="w-px h-4 bg-white/[0.1]" />
              <button className="flex items-center gap-1 text-[#A0A0A0] hover:text-white transition-colors" aria-label="Moneda">
                MXN <ChevronDown size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav (sticky) */}
      <nav className={`sticky top-0 z-50 bg-[#0A0A0A] transition-shadow duration-300 ${
        scrolled ? 'shadow-lg shadow-black/40 border-b border-white/[0.07]' : 'border-b border-white/[0.06]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center">
              <span className="font-display text-2xl md:text-3xl font-bold tracking-[0.15em] text-white">MERCY</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {links.map(link => (
                <Link key={link.path} to={link.path}
                  className="font-heading text-sm tracking-[0.1em] text-[#A0A0A0] hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button onClick={() => setSearchOpen(true)} aria-label="Buscar"
                className="p-2 text-[#A0A0A0] hover:text-white transition-colors">
                <Search size={20} />
              </button>
              <Link to="/wishlist" aria-label="Favoritos" className="relative p-2 text-[#A0A0A0] hover:text-white transition-colors">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#E8003A] rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsCartOpen(true)} aria-label={`Carrito${itemCount > 0 ? ` (${itemCount})` : ''}`}
                className="relative p-2 text-[#A0A0A0] hover:text-white transition-colors">
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#E8003A] rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                    {itemCount}
                  </span>
                )}
              </button>
              <Link to="/login" aria-label="Iniciar sesión"
                className="hidden md:flex items-center gap-2 ml-2 px-4 py-2 border border-white/15 rounded-lg text-xs font-heading tracking-[0.12em] text-white hover:bg-white hover:text-black transition-all">
                <User size={15} /> LOGIN
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menú" aria-expanded={mobileOpen} className="md:hidden p-2 text-white">
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 z-[56] w-[80%] max-w-xs bg-[#0A0A0A] border-l border-white/[0.07] md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/[0.07]">
                <span className="font-display text-2xl font-bold tracking-[0.15em] text-white">MERCY</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú" className="text-[#A0A0A0] hover:text-white"><X size={22} /></button>
              </div>
              <div className="flex flex-col p-5 gap-1">
                {links.map(link => (
                  <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                    className="font-heading text-lg tracking-[0.1em] text-white hover:text-[#E8003A] transition-colors py-3 border-b border-white/[0.05]">
                    {link.label}
                  </Link>
                ))}
                <Link to="/login" onClick={() => setMobileOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-[0.12em] rounded-lg transition-colors">
                  <User size={16} /> INICIAR SESIÓN
                </Link>
              </div>
              <div className="mt-auto p-5 border-t border-white/[0.07]">
                <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[#A0A0A0] hover:text-white block">WhatsApp: {SITE.whatsappDisplay}</a>
                <div className="flex items-center gap-4 mt-4">
                  <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#A0A0A0] hover:text-white"><Instagram size={18} /></a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#A0A0A0] hover:text-white"><Facebook size={18} /></a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-[#A0A0A0] hover:text-white"><TikTokIcon size={18} /></a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}