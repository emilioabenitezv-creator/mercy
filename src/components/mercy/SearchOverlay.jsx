import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { AnimatePresence, motion } from 'framer-motion';

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [all, setAll] = useState([]);

  useEffect(() => {
    if (open && all.length === 0) {
      base44.entities.Product.list().then(setAll).catch(() => {});
    }
    if (!open) setQuery('');
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const results = query.trim()
    ? all.filter(p => p.name?.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6)
    : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
            className="max-w-2xl mx-auto mt-24 px-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="surface rounded-xl p-4 shadow-2xl">
              <div className="flex items-center gap-3 border-b border-white/[0.07] pb-3">
                <Search size={18} className="text-[#A0A0A0] flex-shrink-0" />
                <input
                  autoFocus value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Buscar rashguards, shorts..."
                  className="flex-1 bg-transparent text-white placeholder-[#7A7A7A] focus:outline-none text-sm"
                />
                <button onClick={onClose} aria-label="Cerrar búsqueda">
                  <X size={18} className="text-[#A0A0A0] hover:text-white transition-colors" />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                {results.map(p => (
                  <Link
                    key={p.id} to={`/producto/${p.slug}`} onClick={onClose}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    <img src={p.image_url} alt={p.name} className="w-12 h-14 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{p.name}</p>
                      <p className="text-xs text-[#7A7A7A] font-mono">${p.price?.toLocaleString()} MXN</p>
                    </div>
                  </Link>
                ))}
                {query.trim() && results.length === 0 && (
                  <p className="text-sm text-[#7A7A7A] p-2">Sin resultados para “{query}”.</p>
                )}
                {!query.trim() && (
                  <p className="text-xs text-[#7A7A7A] p-2">Escribe para buscar en el catálogo.</p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
