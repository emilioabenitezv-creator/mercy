import React from 'react';
import Seo from '@/components/mercy/Seo';
import { SITE } from '@/lib/site';

export default function Privacy() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-[100px] md:pt-[116px]">
      <Seo
        title="Aviso de Privacidad — MERCY"
        description="Aviso de privacidad de MercyFit. Cómo recopilamos, usamos y protegemos tus datos personales."
        path="/privacidad"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <span className="eyebrow">Tu confianza</span>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-[0.02em] text-white uppercase mb-2">
          Aviso de <span className="text-[#E8003A]">Privacidad</span>
        </h1>
        <p className="text-xs text-[#A0A0A0] mb-10">Última actualización: junio 2026</p>

        <div className="space-y-8 text-[#A0A0A0] leading-relaxed text-sm">
          <p className="italic text-[#A0A0A0]/80">
            Este documento es una plantilla orientativa. Antes de publicar, revísalo con un asesor legal para
            asegurar el cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los
            Particulares (LFPDPPP).
          </p>
          <section>
            <h2 className="font-heading text-base tracking-wider text-white mb-2">1. Responsable</h2>
            <p>{SITE.legalName} (“MERCY”) es responsable del tratamiento de tus datos personales. Para cualquier asunto relacionado con este aviso puedes contactarnos en <a href={`mailto:${SITE.email}`} className="text-[#E8003A] hover:underline">{SITE.email}</a>.</p>
          </section>
          <section>
            <h2 className="font-heading text-base tracking-wider text-white mb-2">2. Datos que recopilamos</h2>
            <p>Nombre, correo electrónico, teléfono, domicilio de envío y datos necesarios para procesar tu compra. Los datos de pago son procesados directamente por nuestros proveedores de pago y no se almacenan en nuestros servidores.</p>
          </section>
          <section>
            <h2 className="font-heading text-base tracking-wider text-white mb-2">3. Finalidades</h2>
            <p>Utilizamos tus datos para procesar y enviar tus pedidos, brindar atención al cliente, gestionar cambios y devoluciones y —solo si lo autorizas— enviarte promociones y novedades. Puedes darte de baja del marketing en cualquier momento.</p>
          </section>
          <section>
            <h2 className="font-heading text-base tracking-wider text-white mb-2">4. Derechos ARCO</h2>
            <p>Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos, así como a revocar tu consentimiento. Envía tu solicitud a <a href={`mailto:${SITE.email}`} className="text-[#E8003A] hover:underline">{SITE.email}</a>.</p>
          </section>
          <section>
            <h2 className="font-heading text-base tracking-wider text-white mb-2">5. Cookies</h2>
            <p>Usamos cookies y tecnologías similares para recordar tu carrito, medir el desempeño del sitio y mejorar tu experiencia. Puedes deshabilitarlas desde tu navegador.</p>
          </section>
          <section>
            <h2 className="font-heading text-base tracking-wider text-white mb-2">6. Cambios</h2>
            <p>Podemos actualizar este aviso. La versión vigente siempre estará disponible en esta página.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
