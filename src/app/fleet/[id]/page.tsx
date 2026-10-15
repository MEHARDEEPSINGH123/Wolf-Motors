'use client';

import React, { useState, useMemo, use } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { StorefrontNavbar } from '@/components/navigation/StorefrontNavbar';
import { StorefrontFooter } from '@/components/navigation/StorefrontFooter';
import { useWolfData } from '@/context/WolfDataContext';
import { getVehicleImage, getVehicleGallery } from '@/data/mediaAssets';
import { formatSGD, calculateQuote } from '@/data/dataset';
import {
  Users,
  Gauge,
  Fuel,
  ShieldCheck,
  Check,
  Calendar,
  MapPin,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { vehicles, categories, hubs, addOns } = useWolfData();

  const vehicle = vehicles.find((v) => v.id.toLowerCase() === resolvedParams.id.toLowerCase());

  if (!vehicle) {
    notFound();
  }

  const category = categories.find((c) => c.id === vehicle.category_id);
  const gallery = getVehicleGallery(vehicle.id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Quote Configuration Form State
  const todayStr = '2026-10-18';
  const tomorrowStr = '2026-10-20';

  const [pickupDate, setPickupDate] = useState<string>(todayStr);
  const [returnDate, setReturnDate] = useState<string>(tomorrowStr);
  const [pickupHubId, setPickupHubId] = useState<string>(vehicle.hub_id || 'HUB-01');
  const [returnHubId, setReturnHubId] = useState<string>(vehicle.hub_id || 'HUB-01');
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(['ADD-001']);

  // Calculate rental days
  const rentalDays = useMemo(() => {
    try {
      const p = new Date(pickupDate);
      const r = new Date(returnDate);
      const diffTime = r.getTime() - p.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(1, diffDays > 0 ? diffDays : 1);
    } catch {
      return 1;
    }
  }, [pickupDate, returnDate]);

  // Dynamic Quote Calculation
  const quote = useMemo(() => {
    return calculateQuote(vehicle, rentalDays, selectedAddOnIds, addOns);
  }, [vehicle, rentalDays, selectedAddOnIds, addOns]);

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]
    );
  };

  const handleProceedToBooking = () => {
    const query = new URLSearchParams({
      vehicleId: vehicle.id,
      pickupDate,
      returnDate,
      pickupHub: pickupHubId,
      returnHub: returnHubId,
      addOns: selectedAddOnIds.join(','),
    });
    router.push(`/booking?${query.toString()}`);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col text-gray-900 selection:bg-forest selection:text-white">
      <StorefrontNavbar />

      <main className="flex-1 pt-24 pb-20">
        {/* Breadcrumb & Navigation Top Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between text-xs font-mono text-gray-500">
            <Link
              href="/fleet"
              className="inline-flex items-center gap-1.5 hover:text-black transition-colors uppercase tracking-wider font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back To Fleet Range</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-gray-300">/</span>
              <span className="uppercase text-forest font-bold">
                {category?.name || vehicle.category_id}
              </span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-bold">{vehicle.display_name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Gallery & In-Depth Specs (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Main Featured Photo */}
              <div className="relative overflow-hidden border border-gray-200 bg-gray-100 shadow-ferrari-card h-80 sm:h-[460px] group rounded-none">
                <img
                  src={gallery[activeImageIndex] || getVehicleImage(vehicle.id)}
                  alt={vehicle.display_name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-[11px] uppercase font-mono tracking-widest text-gray-900 font-bold border border-gray-200">
                    {category?.name}
                  </span>
                  <span
                    className={`px-3 py-1 text-[11px] uppercase font-mono font-bold border ${
                      vehicle.status === 'Available'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : vehicle.status === 'Booked'
                        ? 'bg-amber-50 text-amber-700 border-amber-300'
                        : 'bg-red-50 text-red-700 border-red-300'
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 text-xs font-mono text-white bg-black/75 backdrop-blur-md px-3 py-1">
                  Registration: {vehicle.registration} • {vehicle.odometer_km.toLocaleString()} km
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-24 h-16 overflow-hidden border transition-all shrink-0 rounded-none ${
                        activeImageIndex === idx
                          ? 'border-forest ring-2 ring-forest/30 scale-105'
                          : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Vehicle Title & Model Header */}
              <div>
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-forest">
                  {vehicle.make} LUXURY DIVISION
                </span>
                <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-950 mt-1 font-sans">
                  {vehicle.display_name}
                </h1>
                <p className="text-xs font-mono text-gray-500 mt-1">
                  Model Year {vehicle.year} • Singapore Specification • Chassis ID: {vehicle.id}
                </p>
              </div>

              {/* Specification Grid */}
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-none">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-900 mb-4 font-sans">
                  Engineering Specifications
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3.5 bg-white border border-gray-200">
                    <span className="text-[10px] uppercase font-mono text-gray-500 block">Passenger Seats</span>
                    <div className="text-base font-bold text-gray-950 mt-1 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-forest" />
                      <span>{vehicle.seats} Persons</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white border border-gray-200">
                    <span className="text-[10px] uppercase font-mono text-gray-500 block">Transmission</span>
                    <div className="text-base font-bold text-gray-950 mt-1 flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-forest" />
                      <span>{vehicle.transmission}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white border border-gray-200">
                    <span className="text-[10px] uppercase font-mono text-gray-500 block">Powertrain</span>
                    <div className="text-base font-bold text-gray-950 mt-1 flex items-center gap-1.5">
                      <Fuel className="w-4 h-4 text-forest" />
                      <span>{vehicle.fuel_type}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white border border-gray-200">
                    <span className="text-[10px] uppercase font-mono text-gray-500 block">Assigned Hub</span>
                    <div className="text-base font-bold text-gray-950 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-forest" />
                      <span className="truncate">{hubs.find((h) => h.id === vehicle.hub_id)?.name || 'Central'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Factory Features & Equipment List */}
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-none">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-900 mb-4 font-sans">
                  Factory Package & Equipment
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vehicle.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-3 bg-white border border-gray-200 text-xs text-gray-700"
                    >
                      <Check className="w-4 h-4 text-forest shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability Disclosure Box */}
              <div className="p-5 bg-gray-50 border border-gray-200 text-xs font-mono text-gray-700 space-y-2 rounded-none">
                <div className="flex items-center gap-2 text-forest font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>DISCLOSURE & ELIGIBILITY PROTOCOL</span>
                </div>
                <p>
                  {vehicle.availability_note || 'Demo only; connect live booking availability before launch.'}
                </p>
                <p className="text-[11px] text-gray-500">
                  Minimum driver age: 25 years with at least 2 years valid Singapore driving license (or international equivalent with certified English translation).
                </p>
              </div>
            </div>

            {/* Right Column: Dynamic Quote Configurator & Direct Booking (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-gray-300 p-6 sm:p-8 shadow-ferrari-elevated sticky top-24 space-y-6 rounded-none">
                {/* Header Price */}
                <div className="border-b border-gray-200 pb-5 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block">
                      Daily Rental Rate
                    </span>
                    <div className="text-3xl font-black text-gray-950 font-mono">
                      {formatSGD(vehicle.daily_rate_sgd)}
                      <span className="text-xs font-normal text-gray-500"> / day</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block">
                      Security Deposit Hold
                    </span>
                    <span className="text-sm font-mono font-bold text-gray-900">
                      {formatSGD(vehicle.deposit_sgd)}
                    </span>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="space-y-3">
                  <span className="text-xs uppercase font-bold tracking-wider text-gray-950 flex items-center gap-2 font-sans">
                    <Calendar className="w-3.5 h-3.5 text-forest" />
                    <span>Rental Schedule ({rentalDays} {rentalDays === 1 ? 'Day' : 'Days'})</span>
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-gray-600 block mb-1 font-bold">
                        Pickup Date
                      </label>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 p-2.5 text-xs text-gray-900 font-mono focus:outline-none focus:border-forest rounded-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-gray-600 block mb-1 font-bold">
                        Return Date
                      </label>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 p-2.5 text-xs text-gray-900 font-mono focus:outline-none focus:border-forest rounded-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Hub Selection */}
                <div className="space-y-3">
                  <span className="text-xs uppercase font-bold tracking-wider text-gray-950 flex items-center gap-2 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-forest" />
                    <span>Handover Coordinates (12 Hubs)</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-gray-600 block mb-1 font-bold">
                        Pickup Hub
                      </label>
                      <select
                        value={pickupHubId}
                        onChange={(e) => setPickupHubId(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 p-2.5 text-xs text-gray-900 font-mono focus:outline-none focus:border-forest rounded-none"
                      >
                        {hubs.map((hub) => (
                          <option key={hub.id} value={hub.id}>
                            {hub.name} ({hub.region})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-gray-600 block mb-1 font-bold">
                        Return Hub
                      </label>
                      <select
                        value={returnHubId}
                        onChange={(e) => setReturnHubId(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 p-2.5 text-xs text-gray-900 font-mono focus:outline-none focus:border-forest rounded-none"
                      >
                        {hubs.map((hub) => (
                          <option key={hub.id} value={hub.id}>
                            {hub.name} ({hub.region})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Optional Add-Ons Selection */}
                <div className="space-y-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-gray-950 flex items-center justify-between font-sans">
                    <span>Optional Luxury Add-Ons</span>
                    <span className="text-[10px] font-mono text-gray-500">
                      {selectedAddOnIds.length} Selected
                    </span>
                  </span>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {addOns.slice(0, 6).map((addon) => {
                      const isChecked = selectedAddOnIds.includes(addon.id);
                      return (
                        <label
                          key={addon.id}
                          className={`flex items-center justify-between p-2.5 border cursor-pointer transition-all text-xs rounded-none ${
                            isChecked
                              ? 'bg-emerald-50 border-forest text-gray-950'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleAddOn(addon.id)}
                              className="accent-forest w-3.5 h-3.5"
                            />
                            <div className="truncate">
                              <span className="font-bold block truncate">{addon.name}</span>
                              <span className="text-[10px] text-gray-500 block">{addon.description}</span>
                            </div>
                          </div>
                          <span className="font-mono text-right shrink-0 ml-2 font-bold text-forest">
                            +{formatSGD(addon.price_sgd)}{' '}
                            <span className="text-[10px] text-gray-500 font-normal">/{addon.billing.replace('per ', '')}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Itemized Price Breakdown Quote */}
                <div className="p-4 bg-gray-50 border border-gray-200 space-y-2 text-xs font-mono rounded-none">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 pb-1 border-b border-gray-200">
                    Live Itemized Quote
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Vehicle Rate ({rentalDays}d × {formatSGD(vehicle.daily_rate_sgd)}):</span>
                    <span className="text-gray-950 font-bold">{formatSGD(quote.rentalSubtotal)}</span>
                  </div>

                  {quote.addOnDetails.map((add) => (
                    <div key={add.id} className="flex justify-between text-gray-600 text-[11px]">
                      <span className="truncate pr-2">+ {add.name} ({add.billing}):</span>
                      <span>{formatSGD(add.calculatedCost)}</span>
                    </div>
                  ))}

                  <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-bold text-gray-950">
                    <span>Estimated Rental Total:</span>
                    <span className="text-forest text-base font-black">
                      {formatSGD(quote.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-500">
                    <span>Refundable Deposit (Authorized at handover):</span>
                    <span>{formatSGD(quote.deposit)}</span>
                  </div>
                </div>

                {/* Primary Booking Request CTA - Ferrari Sharp Button */}
                <button
                  onClick={handleProceedToBooking}
                  className="w-full py-4 rounded-none bg-forest hover:bg-forest-dark text-white text-xs font-bold uppercase tracking-[0.25em] shadow-forest-glow transition-all flex items-center justify-center gap-2"
                >
                  <span>Request Booking Allocation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] font-mono text-center text-gray-500">
                  Demo Request only • No immediate charge or card required • Transparent terms
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <StorefrontFooter />
    </div>
  );
}
