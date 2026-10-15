'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { StorefrontNavbar } from '@/components/navigation/StorefrontNavbar';
import { StorefrontFooter } from '@/components/navigation/StorefrontFooter';
import { useWolfData } from '@/context/WolfDataContext';
import { formatSGD, calculateQuote } from '@/data/dataset';
import { getVehicleImage } from '@/data/mediaAssets';
import { Booking } from '@/types/dataset';
import {
  Calendar,
  MapPin,
  CheckCircle2,
  ArrowRight,
  History,
} from 'lucide-react';

function BookingFlowContent() {
  const searchParams = useSearchParams();
  const { vehicles, hubs, addOns, bookings, addBooking } = useWolfData();

  // Initial params
  const initialVehicleId = searchParams.get('vehicleId') || vehicles[0]?.id || 'WOLF-001';
  const initialPickupDate = searchParams.get('pickupDate') || '2026-10-18';
  const initialReturnDate = searchParams.get('returnDate') || '2026-10-20';
  const initialPickupHub = searchParams.get('pickupHub') || 'HUB-01';
  const initialReturnHub = searchParams.get('returnHub') || 'HUB-01';
  const initialAddOns = searchParams.get('addOns') ? searchParams.get('addOns')!.split(',') : ['ADD-001'];

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(initialVehicleId);
  const [pickupDate, setPickupDate] = useState<string>(initialPickupDate);
  const [returnDate, setReturnDate] = useState<string>(initialReturnDate);
  const [pickupHubId, setPickupHubId] = useState<string>(initialPickupHub);
  const [returnHubId, setReturnHubId] = useState<string>(initialReturnHub);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(initialAddOns);

  // Customer details
  const [customerName, setCustomerName] = useState('Marcus Goh');
  const [customerEmail, setCustomerEmail] = useState('marcus.vip@example.com');
  const [customerPhone, setCustomerPhone] = useState('+65 9123 4567');
  const [licenseTenure, setLicenseTenure] = useState('5+ Years');
  const [specialRequests, setSpecialRequests] = useState('Deliver with chilled sparkling water and pre-conditioned cabin.');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Validation errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);
  const [showHistoryTab, setShowHistoryTab] = useState(false);

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  // Calculate rental duration
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

  // Quote calculation
  const quote = useMemo(() => {
    return calculateQuote(selectedVehicle, rentalDays, selectedAddOnIds, addOns);
  }, [selectedVehicle, rentalDays, selectedAddOnIds, addOns]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    if (step === 1) {
      if (!selectedVehicleId) errors.vehicle = 'Please select a fleet vehicle.';
      if (!pickupDate) errors.pickupDate = 'Pickup date is required.';
      if (!returnDate) errors.returnDate = 'Return date is required.';
      if (new Date(returnDate) <= new Date(pickupDate)) {
        errors.returnDate = 'Return date must be after pickup date.';
      }
    } else if (step === 3) {
      if (!customerName.trim()) errors.name = 'Full legal name is required.';
      if (!customerEmail.trim() || !customerEmail.includes('@')) {
        errors.email = 'Valid email address is required.';
      }
      if (!customerPhone.trim() || customerPhone.length < 8) {
        errors.phone = 'Valid phone contact is required.';
      }
      if (!agreeTerms) {
        errors.terms = 'You must acknowledge the demo terms.';
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    const newBooking = addBooking({
      customer_id: 'CUS-0003',
      vehicle_id: selectedVehicle.id,
      pickup_hub_id: pickupHubId,
      return_hub_id: returnHubId,
      pickup_date: pickupDate,
      return_date: returnDate,
      rental_days: rentalDays,
      daily_rate_sgd: selectedVehicle.daily_rate_sgd,
      add_on_ids: selectedAddOnIds,
      subtotal_sgd: quote.subtotal,
      deposit_sgd: quote.deposit,
      status: 'Confirmed',
      payment_status: 'Paid',
      source: 'Website',
    });

    setCompletedBooking(newBooking);
    setCurrentStep(4);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col text-gray-900 selection:bg-forest selection:text-white">
      <StorefrontNavbar />

      <main className="flex-1 pt-24 pb-24 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-forest font-bold">
              SINGAPORE PRESTIGE RESERVATION
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-gray-950 mt-1 font-sans">
              Vehicle Booking Request
            </h1>
            <p className="text-xs text-gray-600 mt-2">
              Bespoke allocation workflow with instant SGD itemized quotes. Connect with your dedicated personal concierge.
            </p>

            <div className="flex justify-center gap-3 mt-5">
              <button
                onClick={() => setShowHistoryTab(false)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded-none ${
                  !showHistoryTab
                    ? 'bg-forest text-white shadow-forest-glow'
                    : 'bg-white text-gray-700 hover:text-black border border-gray-300'
                }`}
              >
                New Reservation
              </button>
              <button
                onClick={() => setShowHistoryTab(true)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-none ${
                  showHistoryTab
                    ? 'bg-forest text-white shadow-forest-glow'
                    : 'bg-white text-gray-700 hover:text-black border border-gray-300'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Existing Demo Bookings ({bookings.length})</span>
              </button>
            </div>
          </div>

          {showHistoryTab ? (
            /* Booking History View */
            <div className="bg-white border border-gray-200 p-6 shadow-ferrari-card rounded-none">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wider text-gray-950 font-sans">
                    Demo Booking Records (Dataset + Active Session)
                  </h3>
                  <p className="text-xs text-gray-500">
                    Showing {bookings.length} reservations populated from canonical JSON dataset.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 uppercase">
                      <th className="py-3 px-3">Booking ID</th>
                      <th className="py-3 px-3">Vehicle</th>
                      <th className="py-3 px-3">Dates</th>
                      <th className="py-3 px-3">Days</th>
                      <th className="py-3 px-3">Amount (SGD)</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Payment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((bk) => {
                      const veh = vehicles.find((v) => v.id === bk.vehicle_id);
                      return (
                        <tr key={bk.id} className="hover:bg-gray-50">
                          <td className="py-3 px-3 font-bold text-forest">{bk.id}</td>
                          <td className="py-3 px-3 text-gray-950 font-bold">
                            {veh?.display_name || bk.vehicle_id}
                          </td>
                          <td className="py-3 px-3 text-gray-600">
                            {bk.pickup_date} → {bk.return_date}
                          </td>
                          <td className="py-3 px-3 text-gray-600">{bk.rental_days}d</td>
                          <td className="py-3 px-3 font-bold text-gray-950">
                            {formatSGD(bk.subtotal_sgd)}
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-none text-[10px] uppercase font-bold ${
                                bk.status === 'Confirmed' || bk.status === 'Completed'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : bk.status === 'In Progress'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : bk.status === 'Cancelled'
                                  ? 'bg-red-50 text-red-700 border border-red-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {bk.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-gray-600">{bk.payment_status}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Multi-Step Booking Flow */
            <div className="bg-white border border-gray-200 shadow-ferrari-card overflow-hidden rounded-none">
              {/* Step Tracker - Ferrari Sharp Style */}
              <div className="grid grid-cols-4 border-b border-gray-200 text-center text-xs font-mono">
                {[
                  { step: 1, label: '1. Fleet & Dates' },
                  { step: 2, label: '2. Add-Ons' },
                  { step: 3, label: '3. Guest Info' },
                  { step: 4, label: '4. Confirmation' },
                ].map((s) => (
                  <div
                    key={s.step}
                    className={`py-3.5 px-2 border-r last:border-r-0 border-gray-200 transition-colors ${
                      currentStep === s.step
                        ? 'bg-emerald-50 text-forest font-bold border-b-2 border-b-forest'
                        : currentStep > s.step
                        ? 'bg-gray-50 text-forest'
                        : 'text-gray-400'
                    }`}
                  >
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 sm:p-10">
                {/* STEP 1: VEHICLE & DATES */}
                {currentStep === 1 && (
                  <div className="space-y-8 animate-in fade-in">
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-wider text-gray-950 font-sans">
                        Select Vehicle & Reservation Schedule
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Choose your preferred motorcar and Singapore handover coordinates.
                      </p>
                    </div>

                    {/* Selected Vehicle Preview Banner */}
                    <div className="p-5 bg-gray-50 border border-gray-200 flex flex-col md:flex-row items-center gap-6 rounded-none">
                      <div className="w-full md:w-56 h-36 overflow-hidden relative shrink-0 border border-gray-200">
                        <img
                          src={getVehicleImage(selectedVehicle.id)}
                          alt={selectedVehicle.display_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono uppercase text-forest font-bold">
                            {selectedVehicle.make}
                          </span>
                          <span className="text-sm font-mono font-bold text-gray-950">
                            {formatSGD(selectedVehicle.daily_rate_sgd)} / day
                          </span>
                        </div>
                        <h4 className="text-xl font-bold uppercase text-gray-950 font-sans">
                          {selectedVehicle.display_name}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {selectedVehicle.seats} Seats • {selectedVehicle.transmission} • {selectedVehicle.fuel_type} • Reg: {selectedVehicle.registration}
                        </p>

                        <div className="pt-2">
                          <label className="text-[10px] font-mono uppercase text-gray-500 block mb-1 font-bold">
                            Switch Vehicle Selection:
                          </label>
                          <select
                            value={selectedVehicleId}
                            onChange={(e) => setSelectedVehicleId(e.target.value)}
                            className="w-full bg-white border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-forest rounded-none"
                          >
                            {vehicles.map((v) => (
                              <option key={v.id} value={v.id}>
                                {v.display_name} — {formatSGD(v.daily_rate_sgd)}/day ({v.status})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Dates & Hubs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4 p-5 bg-gray-50 border border-gray-200">
                        <h4 className="text-xs uppercase font-bold tracking-wider text-gray-950 flex items-center gap-2 font-sans">
                          <Calendar className="w-4 h-4 text-forest" />
                          <span>Dates & Duration</span>
                        </h4>
                        <div>
                          <label className="text-[11px] font-mono uppercase text-gray-700 block mb-1 font-bold">
                            Pickup Date
                          </label>
                          <input
                            type="date"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="w-full bg-white border border-gray-300 p-2.5 text-xs text-gray-900 font-mono rounded-none"
                          />
                          {formErrors.pickupDate && (
                            <span className="text-xs text-crimson mt-1 block">{formErrors.pickupDate}</span>
                          )}
                        </div>
                        <div>
                          <label className="text-[11px] font-mono uppercase text-gray-700 block mb-1 font-bold">
                            Return Date
                          </label>
                          <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="w-full bg-white border border-gray-300 p-2.5 text-xs text-gray-900 font-mono rounded-none"
                          />
                          {formErrors.returnDate && (
                            <span className="text-xs text-crimson mt-1 block">{formErrors.returnDate}</span>
                          )}
                        </div>
                        <div className="pt-2 text-xs font-mono text-gray-700">
                          Total Rental Duration: <strong className="text-gray-950 font-bold">{rentalDays} Days</strong>
                        </div>
                      </div>

                      <div className="space-y-4 p-5 bg-gray-50 border border-gray-200">
                        <h4 className="text-xs uppercase font-bold tracking-wider text-gray-950 flex items-center gap-2 font-sans">
                          <MapPin className="w-4 h-4 text-forest" />
                          <span>Handover Hub Locations</span>
                        </h4>
                        <div>
                          <label className="text-[11px] font-mono uppercase text-gray-700 block mb-1 font-bold">
                            Pickup Location
                          </label>
                          <select
                            value={pickupHubId}
                            onChange={(e) => setPickupHubId(e.target.value)}
                            className="w-full bg-white border border-gray-300 p-2.5 text-xs text-gray-900 font-mono rounded-none"
                          >
                            {hubs.map((h) => (
                              <option key={h.id} value={h.id}>
                                {h.name} — {h.region} Singapore
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-mono uppercase text-gray-700 block mb-1 font-bold">
                            Return Location
                          </label>
                          <select
                            value={returnHubId}
                            onChange={(e) => setReturnHubId(e.target.value)}
                            className="w-full bg-white border border-gray-300 p-2.5 text-xs text-gray-900 font-mono rounded-none"
                          >
                            {hubs.map((h) => (
                              <option key={h.id} value={h.id}>
                                {h.name} — {h.region} Singapore
                              </option>
                            ))}
                          </select>
                        </div>
                        <p className="text-[11px] text-gray-500 pt-2">
                          Inter-hub one-way transfers are fully coordinated by our operations team.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        onClick={handleNextStep}
                        className="px-8 py-3.5 bg-forest hover:bg-forest-dark text-white text-xs font-bold uppercase tracking-[0.2em] shadow-forest-glow transition-all flex items-center gap-2 rounded-none"
                      >
                        <span>Configure Add-Ons</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: ADD-ONS & QUOTE REVIEW */}
                {currentStep === 2 && (
                  <div className="space-y-8 animate-in fade-in">
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-wider text-gray-950 font-sans">
                        Curated Add-Ons & Itemized Quote
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Enhance your journey with airport meet-and-greets, chauffeur services, or extended protection.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {addOns.map((add) => {
                        const isChecked = selectedAddOnIds.includes(add.id);
                        return (
                          <label
                            key={add.id}
                            className={`p-4 border cursor-pointer transition-all flex items-start gap-3.5 rounded-none ${
                              isChecked
                                ? 'bg-emerald-50 border-forest text-gray-950'
                                : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleAddOn(add.id)}
                              className="accent-forest mt-0.5 w-4 h-4 shrink-0"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs uppercase text-gray-950">{add.name}</span>
                                <span className="text-xs font-mono font-bold text-forest">
                                  +{formatSGD(add.price_sgd)}{' '}
                                  <span className="text-[10px] text-gray-500 font-normal">/{add.billing.replace('per ', '')}</span>
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-600 mt-1 leading-snug">{add.description}</p>
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    {/* Detailed Itemized Quote Box */}
                    <div className="p-6 bg-gray-50 border border-gray-200 space-y-3 font-mono text-xs rounded-none">
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-950 border-b border-gray-200 pb-2">
                        Itemized Pricing Summary (Singapore Dollars)
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Vehicle: {selectedVehicle.display_name} ({rentalDays} Days @ {formatSGD(selectedVehicle.daily_rate_sgd)}):</span>
                        <span className="text-gray-950 font-bold">{formatSGD(quote.rentalSubtotal)}</span>
                      </div>
                      {quote.addOnDetails.map((add) => (
                        <div key={add.id} className="flex justify-between text-gray-600 text-[11px]">
                          <span>+ {add.name} ({add.billing}):</span>
                          <span>{formatSGD(add.calculatedCost)}</span>
                        </div>
                      ))}
                      <div className="pt-3 border-t border-gray-200 flex justify-between text-base font-bold text-gray-950">
                        <span>Total Rental Amount:</span>
                        <span className="text-forest text-lg font-black">{formatSGD(quote.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-gray-500">
                        <span>Refundable Security Deposit (Hold at Handover):</span>
                        <span>{formatSGD(quote.deposit)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 hover:text-black text-xs font-bold uppercase tracking-wider rounded-none"
                      >
                        ← Back to Vehicle
                      </button>
                      <button
                        onClick={handleNextStep}
                        className="px-8 py-3.5 bg-forest hover:bg-forest-dark text-white text-xs font-bold uppercase tracking-[0.2em] shadow-forest-glow transition-all flex items-center gap-2 rounded-none"
                      >
                        <span>Guest Information</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: GUEST INFORMATION & VALIDATION */}
                {currentStep === 3 && (
                  <form onSubmit={handleSubmitBooking} className="space-y-8 animate-in fade-in">
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-wider text-gray-950 font-sans">
                        Guest Information & Handover Protocol
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Please provide primary driver documentation and contact details for concierge dispatch.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[11px] font-mono uppercase text-gray-700 block mb-1 font-bold">
                          Full Legal Name (as per Passport / NRIC) *
                        </label>
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-white border border-gray-300 p-3 text-xs text-gray-900 focus:outline-none focus:border-forest rounded-none"
                          placeholder="e.g. Marcus Goh"
                        />
                        {formErrors.name && (
                          <span className="text-xs text-crimson mt-1 block">{formErrors.name}</span>
                        )}
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase text-gray-700 block mb-1 font-bold">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          className="w-full bg-white border border-gray-300 p-3 text-xs text-gray-900 focus:outline-none focus:border-forest rounded-none"
                          placeholder="e.g. marcus@example.com"
                        />
                        {formErrors.email && (
                          <span className="text-xs text-crimson mt-1 block">{formErrors.email}</span>
                        )}
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase text-gray-700 block mb-1 font-bold">
                          Phone Contact (WhatsApp enabled) *
                        </label>
                        <input
                          type="text"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full bg-white border border-gray-300 p-3 text-xs text-gray-900 focus:outline-none focus:border-forest rounded-none"
                          placeholder="+65 8000 0000"
                        />
                        {formErrors.phone && (
                          <span className="text-xs text-crimson mt-1 block">{formErrors.phone}</span>
                        )}
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase text-gray-700 block mb-1 font-bold">
                          Driver License Tenure
                        </label>
                        <select
                          value={licenseTenure}
                          onChange={(e) => setLicenseTenure(e.target.value)}
                          className="w-full bg-white border border-gray-300 p-3 text-xs text-gray-900 focus:outline-none focus:border-forest rounded-none"
                        >
                          <option>2 - 4 Years</option>
                          <option>5+ Years</option>
                          <option>10+ Years (Master)</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="text-[11px] font-mono uppercase text-gray-700 block mb-1 font-bold">
                          Special Concierge Requests & Flight / Terminal Details
                        </label>
                        <textarea
                          rows={3}
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          className="w-full bg-white border border-gray-300 p-3 text-xs text-gray-900 focus:outline-none focus:border-forest rounded-none"
                          placeholder="Provide flight number, terminal, hotel suite, or preferred handover time."
                        />
                      </div>
                    </div>

                    {/* Demo Transparency Checkbox */}
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-none">
                      <label className="flex items-start gap-3 text-xs text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="accent-forest mt-0.5 w-4 h-4 shrink-0"
                        />
                        <span>
                          I acknowledge that this is an <strong>illustrative demonstration request</strong>. No live credit card transaction occurs, and real deployment requires approved Singapore vehicle eligibility and formal contract signing.
                        </span>
                      </label>
                      {formErrors.terms && (
                        <span className="text-xs text-crimson mt-1 block">{formErrors.terms}</span>
                      )}
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 hover:text-black text-xs font-bold uppercase tracking-wider rounded-none"
                      >
                        ← Back to Add-Ons
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-3.5 bg-forest hover:bg-forest-dark text-white text-xs font-bold uppercase tracking-[0.2em] shadow-forest-glow transition-all flex items-center gap-2 rounded-none"
                      >
                        <span>Confirm Demo Reservation</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 4: DEMO CONFIRMATION DISPLAY */}
                {currentStep === 4 && completedBooking && (
                  <div className="text-center py-8 space-y-6 animate-in zoom-in-95">
                    <div className="w-16 h-16 bg-emerald-50 border border-emerald-300 flex items-center justify-center text-forest mx-auto shadow-forest-glow">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-[0.25em] text-forest font-bold">
                        DEMO RESERVATION LOGGED
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black uppercase text-gray-950 mt-1 font-sans">
                        Booking Request #{completedBooking.id}
                      </h3>
                      <p className="text-xs text-gray-500 mt-2 max-w-lg mx-auto">
                        Your test reservation has been registered into the WOLF MOTORS demo database.
                      </p>
                    </div>

                    {/* Card Summary */}
                    <div className="max-w-md mx-auto p-6 bg-gray-50 border border-gray-200 text-left font-mono text-xs space-y-2.5 rounded-none">
                      <div className="flex justify-between text-gray-600">
                        <span>Vehicle:</span>
                        <span className="text-gray-950 font-bold">{selectedVehicle.display_name}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Pickup:</span>
                        <span className="text-gray-950 font-bold">{completedBooking.pickup_date} ({hubs.find((h) => h.id === completedBooking.pickup_hub_id)?.name})</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Return:</span>
                        <span className="text-gray-950 font-bold">{completedBooking.return_date} ({hubs.find((h) => h.id === completedBooking.return_hub_id)?.name})</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Total Quote:</span>
                        <span className="text-forest font-black text-sm">{formatSGD(completedBooking.subtotal_sgd)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Deposit Security:</span>
                        <span className="text-gray-800">{formatSGD(completedBooking.deposit_sgd)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Demo Status:</span>
                        <span className="text-emerald-700 font-bold uppercase">{completedBooking.status}</span>
                      </div>
                    </div>

                    {/* Notice Disclaimer */}
                    <div className="max-w-lg mx-auto p-4 bg-amber-50 border border-amber-200 text-[11px] text-amber-800 leading-relaxed text-left rounded-none">
                      <strong>Demo Environment Notice:</strong> No real payment was collected and no vehicle was physically dispatched. The record is persisted locally and visible in your booking history and Fleet Operations workspace.
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                      <button
                        onClick={() => setShowHistoryTab(true)}
                        className="px-6 py-3 bg-forest hover:bg-forest-dark text-white text-xs font-bold uppercase tracking-wider shadow-forest-glow rounded-none"
                      >
                        View All Bookings ({bookings.length})
                      </button>
                      <button
                        onClick={() => {
                          setCurrentStep(1);
                          setCompletedBooking(null);
                        }}
                        className="px-6 py-3 border border-gray-300 text-gray-700 hover:text-black text-xs font-bold uppercase tracking-wider rounded-none"
                      >
                        Create Another Booking
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <StorefrontFooter />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white text-gray-900 p-20 text-center font-mono text-sm">Loading Reservation Workflow...</div>}>
      <BookingFlowContent />
    </Suspense>
  );
}
