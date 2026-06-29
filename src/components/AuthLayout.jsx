import React from "react";
import { Link } from "react-router-dom";

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] px-4 py-12">
      <Link to="/" className="font-display text-3xl font-bold tracking-[0.18em] text-white mb-8">
        MERCY
      </Link>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {Icon && (
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E8003A] mb-4">
              <Icon className="w-7 h-7 text-white" aria-hidden="true" />
            </div>
          )}
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.04em] text-white uppercase">{title}</h1>
          {subtitle && <p className="text-[#A0A0A0] mt-2 text-sm">{subtitle}</p>}
        </div>
        <div className="surface rounded-2xl p-8">{children}</div>
        {footer && <p className="text-center text-sm text-[#A0A0A0] mt-6">{footer}</p>}
        <Link to="/" className="block text-center text-xs text-[#7A7A7A] hover:text-white transition-colors mt-6">
          ← Volver a la tienda
        </Link>
      </div>
    </div>
  );
}
