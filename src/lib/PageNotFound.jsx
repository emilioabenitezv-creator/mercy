import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0A0A0A]">
      <div className="max-w-md w-full text-center">
        <Link to="/" className="font-display text-3xl font-bold tracking-[0.18em] text-white">MERCY</Link>
        <p className="mt-10 font-display text-7xl font-bold text-[#E8003A]">404</p>
        <div className="h-0.5 w-16 bg-white/[0.1] mx-auto mt-4" />
        <h1 className="mt-6 font-display text-2xl font-bold tracking-[0.04em] text-white uppercase">Página no encontrada</h1>
        <p className="mt-3 text-[#A0A0A0] text-sm leading-relaxed">
          La página que buscas no existe o fue movida. Vuelve al inicio y sigue explorando.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="px-8 py-3 bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-[0.12em] uppercase rounded-lg transition-colors">
            Volver al inicio
          </Link>
          <Link to="/rashguards" className="px-8 py-3 border border-white/25 text-white font-heading text-sm tracking-[0.12em] uppercase rounded-lg hover:bg-white hover:text-black transition-all">
            Ver productos
          </Link>
        </div>
      </div>
    </div>
  );
}
