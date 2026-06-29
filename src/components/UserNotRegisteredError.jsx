import React from 'react';
import { AlertTriangle } from 'lucide-react';

const UserNotRegisteredError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0A] px-4">
      <a href="/" className="font-display text-3xl font-bold tracking-[0.18em] text-white mb-8">MERCY</a>
      <div className="max-w-md w-full p-8 surface rounded-2xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-[#E8003A]/10">
            <AlertTriangle className="w-8 h-8 text-[#E8003A]" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-[0.04em] text-white uppercase mb-4">Acceso restringido</h1>
          <p className="text-[#A0A0A0] mb-8 text-sm leading-relaxed">
            No estás registrado para usar esta aplicación. Contacta al administrador para solicitar acceso.
          </p>
          <div className="p-4 bg-[#0A0A0A] border border-white/[0.07] rounded-lg text-sm text-[#A0A0A0] text-left">
            <p>Si crees que es un error, puedes:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Verificar que iniciaste sesión con la cuenta correcta</li>
              <li>Contactar al administrador para obtener acceso</li>
              <li>Cerrar sesión y volver a entrar</li>
            </ul>
          </div>
          <a href="/" className="inline-block mt-8 px-8 py-3 bg-[#E8003A] hover:bg-[#C0002E] text-white font-heading text-sm tracking-[0.12em] uppercase rounded-lg transition-colors">
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserNotRegisteredError;
