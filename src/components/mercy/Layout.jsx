import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import AddedToCartToast from './AddedToCartToast';

export default function Layout() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <AddedToCartToast />
    </div>
  );
}