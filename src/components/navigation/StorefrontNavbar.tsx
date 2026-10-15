'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WolfLogo } from '@/components/brand/WolfLogo';
import {
  ShoppingBag,
  MapPin,
  Calendar,
  Users,
  BarChart3,
  Car,
  Package,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail,
  X,
} from 'lucide-react';
import { useWolfData } from '@/context/WolfDataContext';

export function StorefrontNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cart, categories } = useWolfData();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Close menu automatically on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu overlay is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm'
            : 'bg-white/90 backdrop-blur-sm border-b border-gray-200/80 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* LEFT: Subtle Market Pill for balance */}
            <div className="flex-1 flex items-center justify-start">
              <div className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-700 border border-gray-200 px-2.5 py-1 bg-gray-50/80 rounded-none">
                <MapPin className="w-3 h-3 text-forest" />
                <span>SG • SGD</span>
              </div>
            </div>

            {/* CENTER: WOLF MOTORS Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <WolfLogo size="md" showTagline={true} />
            </div>

            {/* RIGHT: Cart + Three Lines Menu Toggle */}
            <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4">
              {/* Merchandise Cart Quick Link */}
              <Link
                href="/store/cart"
                className="relative p-2 text-gray-800 hover:text-black transition-colors"
                aria-label={`Shopping Cart with ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-crimson text-white text-[10px] font-bold flex items-center justify-center animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* THREE LINES MENU BUTTON */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 sm:px-3 sm:py-2 flex items-center gap-2.5 text-gray-950 hover:text-black border border-gray-300 hover:border-gray-900 bg-white transition-all shadow-sm rounded-none group cursor-pointer"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
              >
                <span className="hidden sm:inline-block text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-gray-800 group-hover:text-black select-none">
                  {menuOpen ? 'CLOSE' : 'MENU'}
                </span>

                {/* Animated Three Lines */}
                <div className="w-5 h-3.5 relative flex flex-col justify-between items-end">
                  <span
                    className={`h-[2px] bg-gray-950 transition-all duration-300 ${
                      menuOpen ? 'w-5 translate-y-[6px] rotate-45' : 'w-5'
                    }`}
                  />
                  <span
                    className={`h-[2px] bg-gray-950 transition-all duration-200 ${
                      menuOpen ? 'opacity-0' : 'w-3.5 group-hover:w-5'
                    }`}
                  />
                  <span
                    className={`h-[2px] bg-gray-950 transition-all duration-300 ${
                      menuOpen ? 'w-5 -translate-y-[6px] -rotate-45' : 'w-5'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN LUXURY DRAWER OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in fade-in duration-300 overflow-y-auto">
          {/* Top Bar inside Overlay */}
          <div className="border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-10 py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex-1 flex items-center justify-start text-[11px] font-mono text-gray-500 uppercase tracking-widest hidden sm:flex">
                <span>WOLF MOTORS DIRECTORY</span>
              </div>

              {/* Centered Brand Logo */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <WolfLogo size="md" showTagline={true} />
              </div>

              {/* Close Button */}
              <div className="flex-1 flex items-center justify-end">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 sm:px-3 sm:py-2 flex items-center gap-2 text-gray-950 hover:text-black border border-gray-300 hover:border-gray-900 bg-white transition-all rounded-none cursor-pointer group"
                  aria-label="Close menu"
                >
                  <span className="hidden sm:inline-block text-[11px] font-mono font-bold uppercase tracking-[0.25em]">
                    CLOSE
                  </span>
                  <X className="w-5 h-5 text-gray-900 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Matrix Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
              {/* COLUMN 1: THE FLEET & CATEGORIES (5 cols) */}
              <div className="md:col-span-5 space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-forest font-bold block mb-1">
                    01 • AUTOMOTIVE FLEET
                  </span>
                  <Link
                    href="/fleet"
                    className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-gray-950 hover:text-forest transition-colors flex items-center gap-2 group font-sans"
                  >
                    <span>The Fleet (24 Models)</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">
                    Explore Singapore’s most formidable curated luxury and supercar collection.
                  </p>
                </div>

                {/* 8 Categories Grid */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono uppercase font-bold tracking-widest text-gray-600 block">
                    Browse By Category
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/fleet?category=${cat.id}`}
                        className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all group flex flex-col justify-between"
                      >
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-900 group-hover:text-forest">
                          {cat.name}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400 group-hover:text-gray-700 mt-1">
                          Explore Range →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Direct Booking CTA */}
                <div className="pt-4">
                  <Link
                    href="/booking"
                    className="w-full py-4 px-6 bg-forest hover:bg-forest-dark text-white font-bold uppercase tracking-[0.25em] text-xs flex items-center justify-center gap-3 transition-colors shadow-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Direct Vehicle Reservation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* COLUMN 2: THE ATELIER & BRAND EXPERIENCE (4 cols) */}
              <div className="md:col-span-4 space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-forest font-bold block mb-1">
                    02 • BRAND & LIFESTYLE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-950 font-sans">
                    The Wolf Experience
                  </h3>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/#experience"
                    className="p-3.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 block transition-all group"
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-950 group-hover:text-forest">
                      Brand Philosophy
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      The six pillars: Powerful, Aggressive, Premium, Confident, Exclusive, Sophisticated.
                    </p>
                  </Link>

                  <Link
                    href="/store"
                    className="p-3.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 block transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-950 group-hover:text-forest">
                      <span>Official Merchandise Atelier</span>
                      <ShoppingBag className="w-4 h-4 text-forest" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Bespoke track apparel, carbon accessories, and luxury lifestyle goods.
                    </p>
                  </Link>

                  <Link
                    href="/store/cart"
                    className="p-3.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 block transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-950 group-hover:text-forest">
                      <span>Shopping Bag & Checkout</span>
                      <span className="px-2 py-0.5 bg-forest text-white text-[10px] font-mono font-bold">
                        {cartCount} Items
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Complimentary Singapore courier on orders over SGD 150.
                    </p>
                  </Link>

                  <Link
                    href="/store/orders"
                    className="p-3.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 block transition-all group"
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-950 group-hover:text-forest">
                      Merchandise Orders Registry
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Track fulfillment and courier status for boutique deliveries.
                    </p>
                  </Link>

                  <Link
                    href="/#faqs"
                    className="p-3.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 block transition-all group"
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-950 group-hover:text-forest">
                      Policies & FAQs
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Licensing eligibility, insurance protection, deposits, and cancellation terms.
                    </p>
                  </Link>
                </div>
              </div>

              {/* COLUMN 3: ENTERPRISE PORTALS & CONCIERGE (3 cols) */}
              <div className="md:col-span-3 space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-crimson font-bold block mb-1">
                    03 • BUSINESS WORKSPACES
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-950 font-sans">
                    Portals
                  </h3>
                </div>

                <div className="space-y-2">
                  <Link
                    href="/crm"
                    className="p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center gap-3 transition-all group"
                  >
                    <Users className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-950 group-hover:text-forest">
                        CRM Pipeline
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono">Patrons & leads</div>
                    </div>
                  </Link>

                  <Link
                    href="/analytics"
                    className="p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center gap-3 transition-all group"
                  >
                    <BarChart3 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-950 group-hover:text-forest">
                        Business Analytics
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono">Revenue & fleet metrics</div>
                    </div>
                  </Link>

                  <Link
                    href="/operations"
                    className="p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center gap-3 transition-all group"
                  >
                    <Car className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-950 group-hover:text-forest">
                        Fleet Operations
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono">Maintenance & hubs</div>
                    </div>
                  </Link>

                  <Link
                    href="/inventory"
                    className="p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center gap-3 transition-all group"
                  >
                    <Package className="w-4 h-4 text-purple-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-950 group-hover:text-forest">
                        Parts Inventory
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono">Stock & suppliers</div>
                    </div>
                  </Link>
                </div>

                {/* VIP Concierge Box */}
                <div className="p-4 bg-gray-950 text-white border border-gray-900 rounded-none space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-forest font-bold block">
                    24/7 VIP CONCIERGE
                  </span>
                  <div className="text-xs font-mono space-y-1 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-forest shrink-0" />
                      <span>+65 6800 9653</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-forest shrink-0" />
                      <span className="truncate">concierge@wolfmotors.sg</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 pt-1">
                      <MapPin className="w-3 h-3 text-forest shrink-0" />
                      <span>Marina Bay Financial Centre</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar inside Overlay */}
          <div className="border-t border-gray-200 py-4 px-4 sm:px-6 lg:px-8 bg-gray-50 text-xs font-mono text-gray-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>© 2026 WOLF MOTORS SINGAPORE • BUILT TO DOMINATE</div>
              <div className="text-[11px]">All rates in Singapore Dollars (SGD)</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
