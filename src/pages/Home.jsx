import React from 'react';
import HeroSection from '@/components/mercy/HeroSection';
import TrustBar from '@/components/mercy/TrustBar';
import BestsellersSection from '@/components/mercy/BestsellersSection';
import NewArrivalsSection from '@/components/mercy/NewArrivalsSection';
import WhyMercySection from '@/components/mercy/WhyMercySection';
import AthletesSection from '@/components/mercy/AthletesSection';
import TestimonialsSection from '@/components/mercy/TestimonialsSection';
import EmailCaptureSection from '@/components/mercy/EmailCaptureSection';
import Seo from '@/components/mercy/Seo';
import { SITE } from '@/lib/site';

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MERCY',
  url: SITE.url,
  email: SITE.email,
  description: 'Rashguards, shorts y equipo de alto rendimiento para BJJ, MMA y No-Gi. Diseñado en México.',
};

export default function Home() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Seo
        title="MERCY — Equipo de Alto Rendimiento para Artes Marciales | Hecho en México"
        description="Rashguards y shorts de alto rendimiento para BJJ, MMA y No-Gi. Ediciones limitadas diseñadas en México. Envío gratis desde $1,200 MXN."
        path="/"
        jsonLd={homeJsonLd}
      />
      <HeroSection />
      <TrustBar />
      <BestsellersSection />
      <NewArrivalsSection />
      <WhyMercySection />
      <AthletesSection />
      <TestimonialsSection />
      <EmailCaptureSection />
    </div>
  );
}