'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { StorefrontNavbar } from '@/components/navigation/StorefrontNavbar';
import { StorefrontFooter } from '@/components/navigation/StorefrontFooter';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { useWolfData } from '@/context/WolfDataContext';
import { formatSGD } from '@/data/dataset';
import {
  Search,
  X,
  RotateCcw,
  Car,
} from 'lucide-react';

function FleetCatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const { vehicles, categories } = useWolfData();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedFuel, setSelectedFuel] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(4000);
  const [sortBy, setSortBy] = useState<string>('featured');

  // Sync category if query param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Unique fuel types
  const fuelTypes = useMemo(() => {
    return Array.from(new Set(vehicles.map((v) => v.fuel_type)));
  }, [vehicles]);

  // Filtered and Sorted Vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        const matchesSearch =
          v.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory =
          selectedCategory === 'all' || v.category_id === selectedCategory;

        const matchesStatus =
          selectedStatus === 'all' || v.status === selectedStatus;

        const matchesFuel =
          selectedFuel === 'all' || v.fuel_type === selectedFuel;

        const matchesPrice = v.daily_rate_sgd <= maxPrice;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesStatus &&
          matchesFuel &&
          matchesPrice
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.daily_rate_sgd - b.daily_rate_sgd;
        if (sortBy === 'price-desc') return b.daily_rate_sgd - a.daily_rate_sgd;
        if (sortBy === 'year-desc') return b.year - a.year;
        if (sortBy === 'name-asc') return a.display_name.localeCompare(b.display_name);
        // Default featured: supercars first, then by rate
        if (a.category_id === 'supercar' && b.category_id !== 'supercar') return -1;
        if (b.category_id === 'supercar' && a.category_id !== 'supercar') return 1;
        return b.daily_rate_sgd - a.daily_rate_sgd;
      });
  }, [vehicles, searchQuery, selectedCategory, selectedStatus, selectedFuel, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedFuel('all');
    setMaxPrice(4000);
    setSortBy('featured');
  };

  const isFiltered =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedStatus !== 'all' ||
    selectedFuel !== 'all' ||
    maxPrice < 4000 ||
    sortBy !== 'featured';

  return (
    <div className="bg-white min-h-screen flex flex-col text-gray-900 selection:bg-forest selection:text-white">
      <StorefrontNavbar />

      <main className="flex-1 pt-24 pb-20">
        {/* Fleet Header Banner */}
        <section className="bg-gray-50 border-b border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-forest font-bold">
              SINGAPORE LUXURY FLEET CATALOGUE
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
              <div>
                <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-gray-950 font-sans">
                  The Fleet Range ({vehicles.length})
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-2xl">
                  Explore 24 luxury automotive masterpieces across all 8 vehicle classes. Fictional demo records with authentic Singapore rates (SGD).
                </p>
              </div>

              {/* Quick Summary Pill */}
              <div className="flex items-center gap-3 text-xs font-mono text-gray-600">
                <span className="px-3 py-1 bg-white border border-gray-300">
                  Matching: <strong className="text-forest font-bold">{filteredVehicles.length}</strong> vehicles
                </span>
                {isFiltered && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1.5 text-crimson hover:underline text-xs font-bold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All</span>
                  </button>
                )}
              </div>
            </div>

            {/* Category Navigation Tabs (All 8 Categories!) */}
            <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-gray-200 pt-4">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-none text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-forest text-white shadow-forest-glow'
                    : 'bg-white text-gray-700 hover:text-black border border-gray-300'
                }`}
              >
                All Categories ({vehicles.length})
              </button>
              {categories.map((cat) => {
                const count = vehicles.filter((v) => v.category_id === cat.id).length;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-none text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                      isActive
                        ? 'bg-forest text-white shadow-forest-glow'
                        : 'bg-white text-gray-700 hover:text-black border border-gray-300'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 font-mono ${
                        isActive ? 'bg-forest-dark text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Filter Toolbar & Main Fleet Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Search & Sort Controls Bar */}
          <div className="bg-gray-50 p-4 border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between rounded-none shadow-sm">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by make, model, feature (e.g. Porsche, V8, Panoramic)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-300 pl-10 pr-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-forest rounded-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Controls Cluster */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Fuel filter */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-gray-500 hidden sm:inline">Powertrain:</span>
                <select
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  className="bg-white border border-gray-300 px-2.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-forest rounded-none"
                >
                  <option value="all">All Powertrains</option>
                  {fuelTypes.map((fuel) => (
                    <option key={fuel} value={fuel}>
                      {fuel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status filter */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-gray-500 hidden sm:inline">Status:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-white border border-gray-300 px-2.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-forest rounded-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="Available">Available Only</option>
                  <option value="Booked">Booked</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-gray-500 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-300 px-2.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-forest rounded-none"
                >
                  <option value="featured">Featured (Top Hypercars)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="year-desc">Newest Model Year</option>
                  <option value="name-asc">Alphabetical (Make)</option>
                </select>
              </div>

              {/* Price Max Slider */}
              <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-gray-300 text-xs">
                <span className="text-gray-500 font-mono">Max Rate:</span>
                <input
                  type="range"
                  min="150"
                  max="4000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-24 accent-forest"
                />
                <span className="font-mono text-gray-900 font-bold">{formatSGD(maxPrice)}</span>
              </div>
            </div>
          </div>

          {/* Active Filter Tags */}
          {isFiltered && (
            <div className="flex items-center gap-2 flex-wrap mb-6 text-xs">
              <span className="text-gray-500 font-mono text-[11px]">Active Filters:</span>
              {selectedCategory !== 'all' && (
                <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-300 text-forest flex items-center gap-1 text-[11px] font-bold">
                  Category: {categories.find((c) => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory('all')}>
                    <X className="w-3 h-3 hover:text-black" />
                  </button>
                </span>
              )}
              {selectedStatus !== 'all' && (
                <span className="px-2.5 py-1 bg-gray-100 border border-gray-300 text-gray-800 flex items-center gap-1 text-[11px]">
                  Status: {selectedStatus}
                  <button onClick={() => setSelectedStatus('all')}>
                    <X className="w-3 h-3 hover:text-black" />
                  </button>
                </span>
              )}
              {selectedFuel !== 'all' && (
                <span className="px-2.5 py-1 bg-gray-100 border border-gray-300 text-gray-800 flex items-center gap-1 text-[11px]">
                  Fuel: {selectedFuel}
                  <button onClick={() => setSelectedFuel('all')}>
                    <X className="w-3 h-3 hover:text-black" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="px-2.5 py-1 bg-gray-100 border border-gray-300 text-gray-800 flex items-center gap-1 text-[11px]">
                  Keyword: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3 hover:text-black" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Fleet Grid */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => {
                const categoryName = categories.find((c) => c.id === vehicle.category_id)?.name;
                return (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    categoryName={categoryName}
                    variant="standard"
                  />
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="py-24 text-center bg-gray-50 border border-gray-200 p-8 max-w-xl mx-auto shadow-sm">
              <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold uppercase tracking-wider text-gray-950 font-sans">
                No Vehicles Match Your Criteria
              </h3>
              <p className="text-xs text-gray-600 mt-2 max-w-md mx-auto leading-relaxed">
                We could not find any vehicle matching the active search filters. Try widening your price bracket or selecting another category.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 px-6 py-2.5 bg-forest hover:bg-forest-dark text-white text-xs font-bold uppercase tracking-widest shadow-forest-glow transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </main>

      <StorefrontFooter />
    </div>
  );
}

export default function FleetCataloguePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white text-gray-900 p-20 text-center font-mono text-sm">Loading WOLF MOTORS Fleet...</div>}>
      <FleetCatalogueContent />
    </Suspense>
  );
}
