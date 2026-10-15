'use client';

import React, { useState } from 'react';
import { ShieldAlert, X, RefreshCw, FileText } from 'lucide-react';
import { useWolfData } from '@/context/WolfDataContext';

export function DemoNoticeBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { policies, resetAllData } = useWolfData();

  return (
    <>
      <div className="bg-gray-950 text-white border-b border-gray-800 py-1.5 px-4 text-xs font-mono flex items-center justify-between z-40 relative">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-forest animate-pulse inline-block shrink-0"></span>
          <span className="text-white font-semibold uppercase tracking-wider">
            SINGAPORE PROTOTYPE — DEMO ENVIRONMENT
          </span>
          <span className="hidden md:inline text-gray-500">|</span>
          <span className="hidden md:inline text-gray-300">
            Fictional luxury fleet & illustrative demo rates (SGD). No real payment or binding reservation occurs.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-300 hover:text-white underline text-[11px] uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            <FileText className="w-3 h-3" />
            <span>Review Disclaimers</span>
          </button>
          <button
            onClick={resetAllData}
            title="Reset demo data back to canonical JSON"
            className="text-gray-400 hover:text-crimson-light text-[11px] uppercase tracking-wider flex items-center gap-1 transition-colors border-l border-gray-700 pl-3"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset Demo Data</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-gray-200 rounded-none max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 text-gray-950 shadow-ferrari-elevated relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-gray-500 hover:text-black p-2 hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-forest/10 border border-forest/30 flex items-center justify-center text-forest">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-gray-950 font-sans">
                  Demo Disclosures & Singapore Compliance Review
                </h3>
                <p className="text-xs text-gray-500 tracking-wider uppercase">
                  WOLF MOTORS Architecture & Policy Reference
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-700 leading-relaxed my-6 border-y border-gray-200 py-5">
              <p>
                <strong className="text-gray-950">Illustrative Demo Data:</strong> All supplied customer records, bookings, rental rates, transactions, inventory counts, and business metrics are fictional demo records populated from the canonical dataset. No live business information or customer personal identifiable information is utilized.
              </p>
              <p>
                <strong className="text-gray-950">Payment & Reservation Safeguards:</strong> This platform performs client-side workflow simulation only. No payment gateway credentials or live financial transaction processing are connected. Submitting booking requests or orders logs interactive frontend demo records.
              </p>
              <div className="mt-4">
                <h4 className="text-xs uppercase tracking-widest text-gray-900 font-bold mb-3">
                  Singapore Operational & Legal Policies Pending Live Review:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {policies.map((pol) => (
                    <div key={pol.id} className="p-3 bg-gray-50 border border-gray-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-950">{pol.title}</span>
                        <span className="text-[10px] text-amber-700 uppercase px-1.5 py-0.5 bg-amber-100">
                          {pol.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 leading-tight">{pol.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-forest hover:bg-forest-dark text-white text-xs uppercase tracking-widest font-bold transition-all"
              >
                Acknowledge & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
