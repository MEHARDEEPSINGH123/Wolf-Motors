'use client';

import React from 'react';
import Link from 'next/link';
import { WolfLogo } from '@/components/brand/WolfLogo';
import { WolfEmblem } from '@/components/brand/WolfEmblem';
import { useWolfData } from '@/context/WolfDataContext';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export function StorefrontFooter() {
  const { categories, hubs } = useWolfData();

  return (
    <footer className="bg-gray-950 text-white border-t border-gray-800 relative overflow-hidden">
      {/* Subtle background crest watermark */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-[0.03] translate-x-1/4 translate-y-1/4">
        <WolfEmblem size={600} variant="silver" />
      </div>

      {/* Heroic Statement Banner - Ferrari style */}
      <div className="border-b border-gray-800 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-forest">
              SINGAPORE LUXURY MOBILITY
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-white mt-1">
              Command The Asphalt. Dominate The Horizon.
            </h3>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Experience the pinnacle of automotive engineering across Singapore's most prestigious avenues. Hand-delivered across 12 strategic island hubs.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/fleet"
              className="px-6 py-3 rounded-none bg-forest hover:bg-forest-dark border border-forest text-white text-xs font-bold uppercase tracking-[0.25em] transition-all shadow-forest-glow text-center"
            >
              Explore 24 Vehicles
            </Link>
            <Link
              href="/booking"
              className="px-6 py-3 rounded-none bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 hover:text-white text-xs font-bold uppercase tracking-[0.25em] transition-all text-center"
            >
              Direct Reservation
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <WolfLogo size="lg" showTagline={true} inverted={true} />
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              WOLF MOTORS is Singapore’s definitive luxury automotive and mobility portal. Built for individuals who refuse compromise, combining rare hypercars, sculpted grand tourers, and executive saloons.
            </p>
            <div className="pt-2 text-xs font-mono text-gray-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-forest shrink-0" />
                <span>Marina Bay Financial Centre, Tower 2, Singapore 018983</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-forest shrink-0" />
                <span>+65 6800 9653 (24/7 VIP Concierge)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-forest shrink-0" />
                <span>concierge@wolfmotors.sg</span>
              </div>
            </div>
          </div>

          {/* Fleet Categories */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-[0.25em] text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-forest"></span>
              <span>Fleet Categories</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/fleet?category=${cat.id}`}
                    className="text-gray-400 hover:text-white hover:underline transition-colors flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-gray-600 font-mono">SGD</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Singapore Flagship Hubs */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-[0.25em] text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-forest"></span>
              <span>12 Island Hubs</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              {hubs.slice(0, 8).map((hub) => (
                <li key={hub.id} className="flex items-center justify-between">
                  <span className="text-gray-300">{hub.name}</span>
                  <span className="text-[10px] text-gray-500 font-mono">{hub.region}</span>
                </li>
              ))}
              <li>
                <Link href="/booking" className="text-forest text-[11px] hover:underline font-semibold">
                  + 4 Additional Locations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Governance */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-[0.25em] text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson"></span>
              <span>Enterprise Portals</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/crm" className="text-gray-400 hover:text-white transition-colors">
                  CRM & Lead Pipeline
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-gray-400 hover:text-white transition-colors">
                  Business Intelligence Analytics
                </Link>
              </li>
              <li>
                <Link href="/operations" className="text-gray-400 hover:text-white transition-colors">
                  Fleet & Maintenance Operations
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="text-gray-400 hover:text-white transition-colors">
                  Parts & Inventory Warehouse
                </Link>
              </li>
              <li>
                <Link href="/store/orders" className="text-gray-400 hover:text-white transition-colors">
                  Merchandise Order Management
                </Link>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-gray-800">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">
                Security & Currency
              </span>
              <p className="text-[11px] text-gray-400">
                All quotes calculated in Singapore Dollars (SGD). Demo records only.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Compliance Bar */}
      <div className="border-t border-gray-800 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span>© 2026 WOLF MOTORS SINGAPORE. All rights reserved.</span>
            <span>•</span>
            <span className="text-forest font-semibold">BUILT TO DOMINATE</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Illustrative Demo Architecture</span>
            <span>•</span>
            <span>Singapore LTA Policies Compliant</span>
            <span>•</span>
            <Link href="/#faqs" className="hover:text-white underline">
              Policies & FAQs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
