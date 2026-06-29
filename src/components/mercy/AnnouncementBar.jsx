import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const STORAGE_KEY = 'mercy_announcement_dismissed_v1';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') setVisible(false);
    } catch { /* ignore */ }
  }, []);

  function dismiss() {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="relative bg-[#E8003A] text-white">
      <div className="max-w-7xl mx-auto px-10 sm:px-12">
        <Link
          to="/rashguards"
          className="block text-center text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.05em] py-2.5 hover:opacity-90 transition-opacity"
        >
          🇲🇽 ENVÍO GRATIS EN PEDIDOS MAYORES A $1,200 MXN — COMPRA AHORA →
        </Link>
      </div>
      <button
        onClick={dismiss}
        aria-label="Cerrar aviso"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 text-white/80 hover:text-white transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}
