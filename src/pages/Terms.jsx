import React from 'react';
import Seo from '@/components/mercy/Seo';
import { SITE } from '@/lib/site';

export default function Terms() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-[100px] md:pt-[116px]">
      <Seo
        title="Términos y Condiciones — MERCY"
        description="Términos y condiciones de compra en MercyFit: precios, pagos, envíos, cambios y propiedad intelectual."
        path="/terminos"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <span className="eyebrow">Reglas claras</span>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-[0.02em] text-white uppercase mb-2">
          Términos y <span className="text-[#E8003A]">Condiciones</span>
        </h1>
        <p className="text-xs text-[#A0A0A0] mb-10">Última actualización: junio 2026</p>

        <div className="space-y-8 text-[#A0A0A0] leading-relaxed text-sm">
          <p className="italic text-[#A0A0A0]/80">
            Plantilla orientativa. Revísala con un asesor legal antes de publicar.
          </p>
          <section>
            <h2 className="font-heading text-base tracking-wider text-white mb-2">1. Generales</h2>
            <p>Al realizar una compra en {SITE.url} aceptas estos términos. {SITE.legalName} se reserva el derecho de modificarlos en cualquier momento; la versión vigente es la publicada en esta página.</p>
          </section>
          <section>
            <h2 className="font-heading text-base tracking-wider text-white mb-2">2. Precios y pagos</h2>
            <p>Todos los precios están expresados en pesos mexicanos (MXN) e incluyen IVA. Aceptamos los métodos de pago indicados durante el proceso de compra. El pedido se confirma una vez validado el pago.</p>
          </section>
          <section>
            <h2 className="font-heading text-base tracking-wider text-white mb-2">3. Disponibilidad</h2>
            <p>Nuestros productos son ediciones limitadas y están sujetos a disponibilidad. Si un artículo se agota tras tu compra, te contactaremos para ofrecerte un cambio o el reembolso correspondiente.</p>
          </section>
          <section>
            <h2 className="font-heading text-base tracking-wider text-white mb-2">4. Envíos, cambios y devoluciones</h2>
            <p>Se rigen por nuestra política de <a href="/envios-y-devoluciones" className="text-[#E8003A] hover:underline">Envíos y Devoluciones</a>, que forma parte de estos términos.</p>
          </section>
          <section>
            <h2 className="font-heading text-base tracking-wider text-white mb-2">5. Propiedad intelectual</h2>
            <p>Los diseños, marcas, textos e imágenes de MERCY son propiedad de {SITE.legalName} y no pueden reproducirse sin autorización por escrito.</p>
          </section>
          <section>
            <h2 className="font-heading text-base tracking-wider text-white mb-2">6. Contacto</h2>
            <p>Para cualquier aclaración escríbenos a <a href={`mailto:${SITE.email}`} className="text-[#E8003A] hover:underline">{SITE.email}</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
