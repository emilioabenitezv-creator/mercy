import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import AddedToCartToast from './AddedToCartToast';

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/[0.1] border-t-[#E8003A] rounded-full animate-spin" />
    </div>
  );
}

export default function Layout() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
      <AddedToCartToast />
    </div>
  );
}