'use client';

import React from 'react';
import Link from 'next/link';
import { Vehicle } from '@/types/dataset';
import { formatSGD } from '@/data/dataset';
import { getVehicleImage } from '@/data/mediaAssets';
import { Fuel, Users, Gauge, ArrowRight, Check } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  categoryName?: string;
  variant?: 'standard' | 'editorial' | 'compact';
}

export function VehicleCard({ vehicle, categoryName, variant = 'standard' }: VehicleCardProps) {
  const imageUrl = getVehicleImage(vehicle.id);

  const statusColors = {
    Available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Booked: 'bg-amber-50 text-amber-700 border-amber-200',
    Maintenance: 'bg-red-50 text-red-700 border-red-200',
  };

  if (variant === 'editorial') {
    return (
      <div className="group relative bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300 overflow-hidden shadow-ferrari-card hover:shadow-ferrari-elevated flex flex-col md:flex-row rounded-none">
        {/* Large Image Column */}
        <div className="relative md:w-3/5 h-72 md:h-auto min-h-[320px] overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={vehicle.display_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 via-transparent to-transparent opacity-60" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-md border border-gray-200 text-[10px] uppercase tracking-widest font-mono text-gray-900 font-bold">
              {categoryName || vehicle.category_id}
            </span>
            <span className={`px-2.5 py-0.5 text-[10px] uppercase font-mono font-bold border ${statusColors[vehicle.status]}`}>
              {vehicle.status}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 text-xs font-mono text-white bg-black/75 backdrop-blur-md px-3 py-1">
            Reg: {vehicle.registration}
          </div>
        </div>

        {/* Content Column - Ferrari White Editorial */}
        <div className="p-6 md:p-10 md:w-2/5 flex flex-col justify-between bg-white">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-forest font-bold mb-1">
              {vehicle.make}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-gray-950 font-sans group-hover:text-black transition-colors">
              {vehicle.model}
            </h3>
            <p className="text-xs text-gray-500 mt-2 font-mono">
              Model Year {vehicle.year} • Singapore Fleet Edition
            </p>

            {/* Spec Row */}
            <div className="grid grid-cols-3 gap-2 py-4 my-4 border-y border-gray-100 text-xs">
              <div className="flex items-center gap-1.5 text-gray-700">
                <Users className="w-3.5 h-3.5 text-forest shrink-0" />
                <span className="font-medium">{vehicle.seats} Seats</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-700">
                <Gauge className="w-3.5 h-3.5 text-forest shrink-0" />
                <span className="truncate font-medium">{vehicle.transmission}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-700">
                <Fuel className="w-3.5 h-3.5 text-forest shrink-0" />
                <span className="truncate font-medium">{vehicle.fuel_type}</span>
              </div>
            </div>

            {/* Key Features preview */}
            <div className="space-y-1.5">
              {vehicle.features.slice(0, 3).map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                  <Check className="w-3.5 h-3.5 text-forest shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 block font-mono">Daily Rate</span>
              <div className="text-2xl font-black text-gray-950 font-mono">
                {formatSGD(vehicle.daily_rate_sgd)}
                <span className="text-xs font-normal text-gray-500"> / day</span>
              </div>
            </div>

            <Link
              href={`/fleet/${vehicle.id}`}
              className="px-6 py-3 rounded-none bg-forest hover:bg-forest-dark text-white text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 shadow-forest-glow transition-all"
            >
              <span>Discover</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Standard Card - Ferrari style on white
  return (
    <div className="group bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-ferrari-card hover:shadow-ferrari-elevated rounded-none">
      <div>
        {/* Vehicle Image */}
        <div className="relative h-52 w-full overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={vehicle.display_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-2.5 py-0.5 bg-white/95 backdrop-blur-md text-[10px] uppercase font-mono tracking-wider text-gray-900 font-bold border border-gray-200">
              {categoryName || vehicle.category_id}
            </span>
            <span className={`px-2 py-0.5 text-[10px] uppercase font-mono font-bold border ${statusColors[vehicle.status]}`}>
              {vehicle.status}
            </span>
          </div>

          <div className="absolute bottom-2 right-3 text-[10px] font-mono text-white bg-black/60 px-2 py-0.5">
            MY {vehicle.year}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="text-[10px] uppercase tracking-[0.25em] text-forest font-bold">
            {vehicle.make}
          </div>
          <h4 className="text-lg font-bold uppercase tracking-wider text-gray-950 group-hover:text-black transition-colors line-clamp-1 mt-0.5">
            {vehicle.model}
          </h4>

          {/* Specs */}
          <div className="flex items-center gap-4 py-3 my-2 border-y border-gray-100 text-[11px] text-gray-600">
            <span className="flex items-center gap-1 font-medium">
              <Users className="w-3 h-3 text-forest" />
              {vehicle.seats} seats
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Gauge className="w-3 h-3 text-forest" />
              {vehicle.transmission}
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Fuel className="w-3 h-3 text-forest" />
              {vehicle.fuel_type}
            </span>
          </div>

          <p className="text-[11px] text-gray-500 line-clamp-2 min-h-[32px]">
            {vehicle.features.slice(0, 2).join(' • ')}
          </p>
        </div>
      </div>

      {/* Footer Rate and CTA */}
      <div className="px-5 pb-5 pt-2 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-[9px] uppercase tracking-widest text-gray-400 block font-mono">From</span>
          <div className="text-lg font-black text-gray-950 font-mono">
            {formatSGD(vehicle.daily_rate_sgd)}
            <span className="text-[10px] font-normal text-gray-500"> / day</span>
          </div>
        </div>

        <Link
          href={`/fleet/${vehicle.id}`}
          className="px-4 py-2 rounded-none bg-gray-900 hover:bg-forest text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
        >
          <span>View</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
