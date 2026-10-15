'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { StorefrontNavbar } from '@/components/navigation/StorefrontNavbar';
import { StorefrontFooter } from '@/components/navigation/StorefrontFooter';
import { WolfLogo } from '@/components/brand/WolfLogo';
import { WolfEmblem } from '@/components/brand/WolfEmblem';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { useWolfData } from '@/context/WolfDataContext';
import { HERO_MEDIA, CATEGORY_MEDIA } from '@/data/mediaAssets';
import { formatSGD } from '@/data/dataset';
import {
  ArrowRight,
  Shield,
  Gauge,
  KeyRound,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const { vehicles, categories, hubs, faqs } = useWolfData();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Featured flagship vehicles
  const featuredSupercar = vehicles.find((v) => v.id === 'WOLF-019') || vehicles[0]; // Ferrari 296 GTB
  const featuredConvertible = vehicles.find((v) => v.id === 'WOLF-016') || vehicles[1]; // Porsche 911 Cabriolet
  const featuredElectric = vehicles.find((v) => v.id === 'WOLF-021') || vehicles[2]; // Porsche Taycan 4S
  const featuredExecutive = vehicles.find((v) => v.id === 'WOLF-004') || vehicles[3]; // Mercedes S-Class

  // Quick reservation selector state
  const [selectedQuickCategory, setSelectedQuickCategory] = useState<string>('supercar');
  const [selectedQuickHub, setSelectedQuickHub] = useState<string>('HUB-01');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col text-gray-900 selection:bg-forest selection:text-white">
      {/* Storefront Navigation Header */}
      <StorefrontNavbar />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. CINEMATIC HERO SECTION (FERRARI FULL-BLEED COMPOSITION) */}
        {/* ========================================================================= */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-16 bg-black">
          {/* Full-bleed cinematic background image */}
          <div className="absolute inset-0 z-0">
            <img
              src={HERO_MEDIA.mainHero}
              alt="WOLF MOTORS Flagship Hypercar in Singapore"
              className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08] scale-100"
            />
            {/* Dramatic Luxury Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          </div>

          {/* Hero Content Grid */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full text-white">
            <div className="max-w-3xl">
              {/* Brand Crest & Tagline Pill */}
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-none bg-black/60 border border-white/20 backdrop-blur-md mb-8">
                <WolfEmblem size={22} variant="green" />
                <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-gray-200 font-bold">
                  WOLF MOTORS • SINGAPORE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-crimson"></span>
                <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-forest font-bold">
                  BUILT TO DOMINATE
                </span>
              </div>

              {/* Strong Editorial Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[0.95] text-white font-sans">
                UNBRIDLED POWER.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-forest">
                  ARCHITECTURAL
                </span>{' '}
                LUXURY.
              </h1>

              {/* Supporting Statement */}
              <p className="mt-6 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed font-normal">
                Engineered for the discerning driver who commands the road. Experience Singapore’s most formidable luxury fleet—from roaring mid-engine supercars to bespoke executive saloons, delivered directly across 12 prestige island hubs.
              </p>

              {/* Primary Call to Action Buttons - Ferrari Sharp Rectangles */}
              <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/fleet"
                  className="px-8 py-4 rounded-none bg-forest hover:bg-forest-dark text-white text-xs font-bold uppercase tracking-[0.25em] shadow-forest-glow transition-all flex items-center justify-center gap-3 group"
                >
                  <span>Explore The Fleet</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/booking"
                  className="px-8 py-4 rounded-none bg-white text-gray-950 hover:bg-gray-100 text-xs font-bold uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-forest" />
                  <span>Reserve Direct</span>
                </Link>

                <Link
                  href="/#experience"
                  className="px-6 py-4 text-xs font-bold uppercase tracking-[0.25em] text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Discover Range ↓</span>
                </Link>
              </div>

              {/* Quick Fleet Metrics Ticker */}
              <div className="mt-16 pt-8 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
                    24
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5 font-mono">
                    Curated Vehicles
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-forest">
                    8
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5 font-mono">
                    Vehicle Classes
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
                    12
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5 font-mono">
                    Singapore Hubs
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-gray-200">
                    100%
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5 font-mono">
                    Pristine Concierge
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. BRAND INTRODUCTION & PHILOSOPHY (CLEAN WHITE EDITORIAL) */}
        {/* ========================================================================= */}
        <section id="experience" className="py-24 sm:py-32 bg-white relative border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Brand Statement */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-forest font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest"></span>
                  <span>The Wolf Philosophy</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-gray-950 leading-tight font-sans">
                  Where Pure Ferocity Meets Aristocratic Precision.
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  WOLF MOTORS was forged to disrupt the mundane luxury mobility market. Built for visionaries, industry titans, and uncompromising automotive connoisseurs in Singapore, our fleet embodies six unbreakable brand pillars:
                </p>

                {/* Pillars Grid */}
                <div className="grid grid-cols-2 gap-3.5 pt-2">
                  {[
                    { title: 'POWERFUL', desc: 'High-displacement torque and instantaneous track throttle response.' },
                    { title: 'AGGRESSIVE', desc: 'Sharp geometric aerodynamic stance that commands respect.' },
                    { title: 'PREMIUM', desc: 'Bespoke hand-stitched leather and carbon-weave cockpits.' },
                    { title: 'CONFIDENT', desc: 'Dynamic adaptive chassis calibrated for Singapore tarmac.' },
                    { title: 'EXCLUSIVE', desc: 'Restricted allocation fleet reserved for verified patrons.' },
                    { title: 'SOPHISTICATED', desc: 'Discreet white-glove delivery to private residences.' },
                  ].map((pillar, i) => (
                    <div key={i} className="p-3.5 bg-gray-50 border border-gray-200 rounded-none">
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-950 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-forest"></span>
                        <span>{pillar.title}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1 leading-snug">{pillar.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href="/fleet"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-forest hover:text-black transition-colors"
                  >
                    <span>Read The Singapore Operational Manifesto</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Composition with Multiple Tiers */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative overflow-hidden border border-gray-200 h-80 group shadow-ferrari-card rounded-none">
                    <img
                      src={HERO_MEDIA.singaporeMarina}
                      alt="Singapore Skyline at Twilight"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-forest font-bold block">
                        Strategic Presence
                      </span>
                      <h4 className="text-sm font-bold uppercase text-white">
                        Marina Bay & Orchard Road
                      </h4>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 border border-gray-200 rounded-none">
                    <span className="text-2xl font-black text-gray-950 font-mono">12 HUBS</span>
                    <p className="text-xs text-gray-600 mt-1">
                      From Sentosa Cove to Changi Airport VIP Terminals, handovers occur at your exact coordinates.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 sm:pt-8">
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-none">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-forest font-bold">
                      Fleet Standards
                    </span>
                    <h4 className="text-base font-bold uppercase text-gray-950 mt-1">
                      Zero Tolerance Imperfection
                    </h4>
                    <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                      Every car undergoes 64-point ultrasonic inspection, ceramic sanitization, and tire recalibration prior to client dispatch.
                    </p>
                  </div>

                  <div className="relative overflow-hidden border border-gray-200 h-80 group shadow-ferrari-card rounded-none">
                    <img
                      src={HERO_MEDIA.cockpitLuxury}
                      alt="Hand-Finished Luxury Cockpit"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gray-300 block">
                        Craftsmanship
                      </span>
                      <h4 className="text-sm font-bold uppercase text-white">
                        Bespoke Alcantara & Carbon
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. FEATURED FLEET (FERRARI-INSPIRED EDITORIAL SHOWCASE) */}
        {/* ========================================================================= */}
        <section className="py-24 bg-gray-50 relative border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-forest font-bold">
                  THE PINNACLE OF ENGINEERING
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-gray-950 mt-1 font-sans">
                  Featured Fleet Icons
                </h2>
                <p className="text-xs text-gray-600 mt-1 max-w-xl">
                  Handpicked crown jewels ready for immediate booking verification. Experience visceral sound and peerless elegance.
                </p>
              </div>

              <Link
                href="/fleet"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gray-900 hover:text-forest transition-colors"
              >
                <span>View Complete 24 Fleet Vehicles</span>
                <ArrowRight className="w-4 h-4 text-forest" />
              </Link>
            </div>

            {/* Featured Hero Editorial Card: Ferrari 296 GTB */}
            <div className="mb-8">
              <VehicleCard vehicle={featuredSupercar} categoryName="Supercar Flagship" variant="editorial" />
            </div>

            {/* 3 Secondary Featured Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <VehicleCard vehicle={featuredConvertible} categoryName="Convertible" variant="standard" />
              <VehicleCard vehicle={featuredElectric} categoryName="Electric GT" variant="standard" />
              <VehicleCard vehicle={featuredExecutive} categoryName="Executive Saloon" variant="standard" />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. VEHICLE CATEGORY DISCOVERY (ALL 8 CATEGORIES ON WHITE CANVAS) */}
        {/* ========================================================================= */}
        <section className="py-24 bg-white border-b border-gray-200 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-forest font-bold">
                FULL SPECTRUM MOTORING
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-gray-950 mt-1 font-sans">
                Explore All 8 Vehicle Categories
              </h2>
              <p className="text-xs text-gray-600 mt-2">
                Whether commanding a diplomatic arrival at Marina Bay Sands or carving coastal expressways in a mid-engine supercar, select your class.
              </p>
            </div>

            {/* 8 Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => {
                const media = CATEGORY_MEDIA[category.id] || {
                  image: HERO_MEDIA.mainHero,
                  tag: 'Luxury Mobility',
                  description: 'Premium automotive engineering.',
                };
                const categoryVehicles = vehicles.filter((v) => v.category_id === category.id);
                const minPrice = Math.min(...categoryVehicles.map((v) => v.daily_rate_sgd));

                return (
                  <Link
                    key={category.id}
                    href={`/fleet?category=${category.id}`}
                    className="group relative overflow-hidden border border-gray-200 hover:border-gray-900 transition-all duration-300 bg-white flex flex-col justify-between shadow-ferrari-card hover:shadow-ferrari-elevated rounded-none"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <img
                        src={media.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.02]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 bg-white/95 backdrop-blur-md text-[10px] uppercase font-mono tracking-widest text-gray-900 font-bold border border-gray-200">
                          {media.tag}
                        </span>
                      </div>

                      <div className="absolute bottom-2 right-3 text-[10px] font-mono text-white bg-black/60 px-2 py-0.5">
                        {categoryVehicles.length} Vehicles
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-950 group-hover:text-black transition-colors font-sans">
                          {category.name}
                        </h3>
                        <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                          {media.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-gray-400 block font-mono">From</span>
                          <span className="font-bold text-gray-950 font-mono">
                            {formatSGD(minPrice)} <span className="text-[10px] text-gray-500 font-normal">/ day</span>
                          </span>
                        </div>
                        <span className="text-xs uppercase font-bold text-forest group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          View Fleet →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. VEHICLE DETAIL HIGHLIGHTS (CRAFTSMANSHIP & TECHNOLOGY) */}
        {/* ========================================================================= */}
        <section className="py-24 bg-gray-50 relative border-b border-gray-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative overflow-hidden border border-gray-200 group shadow-ferrari-elevated h-96 sm:h-[480px] rounded-none">
                <img
                  src={HERO_MEDIA.brandHeritage}
                  alt="WOLF MOTORS High Velocity Dynamics"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="px-3 py-1 bg-white text-gray-950 inline-block mb-2 font-bold">
                    <span className="text-xs font-mono uppercase tracking-widest">
                      AERODYNAMIC INTEGRITY
                    </span>
                  </div>
                  <h3 className="text-xl font-bold uppercase text-white font-sans">
                    Carbon Aero Strakes & Active Wing Calibrations
                  </h3>
                </div>
              </div>

              <div className="space-y-6">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-forest font-bold">
                  UNCOMPROMISING PRECISION
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-gray-950 leading-tight font-sans">
                  Calibrated For Supreme Dynamic Performance
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                  Every vehicle in the WOLF MOTORS stable is tuned to deliver an unadulterated bond between asphalt and driver. We maintain exacting manufacturer telemetry standards, certified tire pressures, and pristine interior finishes.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3.5 p-4 bg-white border border-gray-200">
                    <div className="p-2 bg-emerald-50 text-forest border border-emerald-200 shrink-0">
                      <Gauge className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase text-gray-950">
                        Full-Throttle Powertrain Readiness
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        Twin-turbo V8, electrified plug-in hybrid boost, and ultra-high-output naturally aspirated engines ready on demand.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 bg-white border border-gray-200">
                    <div className="p-2 bg-emerald-50 text-forest border border-emerald-200 shrink-0">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase text-gray-950">
                        Comprehensive Protection & Clean Records
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        Every registration is fully licensed with Singapore LTA compliances, verified logbooks, and optional premium protection tiers.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-4 bg-white border border-gray-200">
                    <div className="p-2 bg-emerald-50 text-forest border border-emerald-200 shrink-0">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase text-gray-950">
                        Bespoke Keyless Handover or Chauffeur
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        Direct delivery to five-star hotel valet bays, private residences, or seamless private terminal plane-side meet-and-greet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. WOLF MOTORS EXPERIENCE */}
        {/* ========================================================================= */}
        <section className="py-24 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-forest font-bold">
                CURATED ADVENTURES
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-gray-950 mt-1 font-sans">
                The Signature WOLF Experiences
              </h2>
              <p className="text-xs text-gray-600 mt-2">
                More than mere car rental. Immerse yourself in curated driving protocols crafted for Singapore and regional escapes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'THE MARINA MIDNIGHT SPRINT',
                  badge: 'Supercar & Coupe',
                  desc: 'Experience Singapore’s iconic Formula 1 night race street sector. Glide through illuminated tunnels with roaring exhausts echoing off steel and glass.',
                  image: HERO_MEDIA.supercarNight,
                },
                {
                  title: 'ISLAND DIPLOMAT PROTOCOL',
                  badge: 'Sedan & Luxury MPV',
                  desc: 'Presidential discretion for dignitaries, corporate delegations, and high-net-worth families. Includes dedicated chauffeur options and airport tarmac pickup.',
                  image: HERO_MEDIA.vipConcierge,
                },
                {
                  title: 'SENTOSA COASTAL SUNSET TOUR',
                  badge: 'Convertible Series',
                  desc: 'Drop the soft-top roof and savor coastal ocean breezes along Sentosa Cove. Curated routes with guaranteed reserved valet dining access.',
                  image: CATEGORY_MEDIA.convertible.image,
                },
              ].map((exp, i) => (
                <div
                  key={i}
                  className="group bg-white border border-gray-200 hover:border-gray-900 transition-all duration-300 flex flex-col justify-between shadow-ferrari-card hover:shadow-ferrari-elevated rounded-none"
                >
                  <div className="relative h-60 overflow-hidden bg-gray-100">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-white text-[10px] font-mono uppercase tracking-widest text-forest font-bold">
                      {exp.badge}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold uppercase tracking-wider text-gray-950 group-hover:text-black transition-colors font-sans">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                        {exp.desc}
                      </p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-gray-100">
                      <Link
                        href="/booking"
                        className="text-xs uppercase font-bold tracking-widest text-forest hover:text-black flex items-center justify-between transition-colors"
                      >
                        <span>Request Custom Itinerary</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. FAST BOOKING QUICK-PICKER CALL TO ACTION */}
        {/* ========================================================================= */}
        <section className="py-24 bg-gray-50 border-b border-gray-200 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-gray-300 p-8 sm:p-12 shadow-ferrari-elevated relative overflow-hidden rounded-none">
              <div className="relative z-10">
                <div className="text-center max-w-xl mx-auto mb-8">
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-forest font-bold">
                    FAST CONCIERGE ALLOCATION
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-gray-950 mt-1 font-sans">
                    Reserve Your Fleet Vehicle
                  </h2>
                  <p className="text-xs text-gray-600 mt-2">
                    Select your preferred category and hub to instantly enter the booking quote flow.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {/* Category select */}
                  <div>
                    <label className="text-[11px] font-mono uppercase text-gray-700 tracking-wider block mb-1.5 font-bold">
                      1. Fleet Category
                    </label>
                    <select
                      value={selectedQuickCategory}
                      onChange={(e) => setSelectedQuickCategory(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 px-3.5 py-3 text-xs text-gray-900 focus:outline-none focus:border-forest rounded-none"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Hub select */}
                  <div>
                    <label className="text-[11px] font-mono uppercase text-gray-700 tracking-wider block mb-1.5 font-bold">
                      2. Handover Hub
                    </label>
                    <select
                      value={selectedQuickHub}
                      onChange={(e) => setSelectedQuickHub(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 px-3.5 py-3 text-xs text-gray-900 focus:outline-none focus:border-forest rounded-none"
                    >
                      {hubs.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.name} ({h.region})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Direct Action */}
                  <div className="flex flex-col justify-end">
                    <Link
                      href={`/booking?category=${selectedQuickCategory}&hub=${selectedQuickHub}`}
                      className="w-full py-3.5 px-6 bg-forest hover:bg-forest-dark text-white text-xs font-bold uppercase tracking-[0.2em] shadow-forest-glow transition-all flex items-center justify-center gap-2 rounded-none"
                    >
                      <span>Proceed To Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="text-center text-[11px] font-mono text-gray-500">
                  <p>
                    Interactive demonstration environment • No payment card processed • Singapore Dollar (SGD) quotes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. FREQUENTLY ASKED QUESTIONS */}
        {/* ========================================================================= */}
        <section id="faqs" className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-forest font-bold">
                TRANSPARENCY & POLICIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-gray-950 mt-1 font-sans">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-gray-600 mt-2">
                Key insights into reservation mechanics, deposits, driver requirements, and demo boundaries.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-gray-200 bg-white overflow-hidden transition-colors rounded-none"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-5 text-left flex items-center justify-between text-sm font-bold uppercase tracking-wider text-gray-950 hover:text-forest transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-forest shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 ml-4" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100 font-normal">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Storefront Footer */}
      <StorefrontFooter />
    </div>
  );
}
