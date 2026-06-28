import React from 'react';
import HeroSection from '@/components/mercy/HeroSection';
import TrustBar from '@/components/mercy/TrustBar';
import BestsellersSection from '@/components/mercy/BestsellersSection';
import WhyMercySection from '@/components/mercy/WhyMercySection';
import AthletesSection from '@/components/mercy/AthletesSection';
import TestimonialsSection from '@/components/mercy/TestimonialsSection';
import EmailCaptureSection from '@/components/mercy/EmailCaptureSection';

export default function Home() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <HeroSection />
      <TrustBar />
      <BestsellersSection />
      <WhyMercySection />
      <AthletesSection />
      <TestimonialsSection />
      <EmailCaptureSection />
    </div>
  );
}