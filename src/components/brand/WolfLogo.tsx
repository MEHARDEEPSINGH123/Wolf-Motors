'use client';

import React from 'react';
import Link from 'next/link';
import { WolfEmblem } from './WolfEmblem';

export interface WolfLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'billboard';
  showTagline?: boolean;
  href?: string;
  className?: string;
  variant?: 'silver' | 'green' | 'crimson' | 'dark' | 'white';
  inverted?: boolean; // When placed on dark hero photography or banners
  layout?: 'horizontal' | 'stacked' | 'billboard';
}

export function WolfLogo({
  size = 'md',
  showTagline = true,
  href = '/',
  className = '',
  variant,
  inverted = false,
  layout = 'horizontal',
}: WolfLogoProps) {
  // Determine default emblem variant based on inverted state
  const emblemVariant = variant || (inverted ? 'white' : 'dark');

  // Emblem sizes
  const emblemSizes = {
    sm: 32,
    md: 42,
    lg: 56,
    hero: 76,
    billboard: 110,
  };

  // Stacked / Billboard layout matching the authentic user reference
  if (layout === 'stacked' || layout === 'billboard') {
    const isLarge = size === 'hero' || size === 'billboard';

    const billboardContent = (
      <div
        className={`inline-flex flex-col items-center justify-center text-center group cursor-pointer ${className}`}
      >
        {/* Authentic Wolf Head Emblem */}
        <WolfEmblem
          size={isLarge ? 110 : 70}
          variant={emblemVariant}
          withGlow={inverted}
          className="group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
        />

        {/* Brand Wordmark with Flanking Wings: — W O L F — */}
        <div className="flex items-center justify-center gap-3 w-full mt-3">
          <div
            className={`h-[1.5px] w-8 sm:w-12 bg-gradient-to-r from-transparent ${
              inverted ? 'to-white' : 'to-gray-900'
            } opacity-80`}
          />
          <span
            className={`font-black uppercase font-sans tracking-[0.38em] leading-none ${
              isLarge ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-2xl'
            } ${inverted ? 'text-white' : 'text-gray-950'}`}
          >
            W O L F
          </span>
          <div
            className={`h-[1.5px] w-8 sm:w-12 bg-gradient-to-l from-transparent ${
              inverted ? 'to-white' : 'to-gray-900'
            } opacity-80`}
          />
        </div>

        {/* MOTORS Subtitle with extended tracking */}
        <div
          className={`font-semibold uppercase tracking-[0.45em] ${
            isLarge ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-xs'
          } mt-1.5 ${inverted ? 'text-gray-300' : 'text-gray-600'}`}
        >
          M O T O R S
        </div>

        {/* BUILT TO DOMINATE Tagline with subtle divider */}
        {showTagline && (
          <div className="mt-3 pt-2.5 border-t border-current/20 w-full flex items-center justify-center">
            <span
              className={`font-mono uppercase font-bold tracking-[0.32em] ${
                isLarge ? 'text-xs' : 'text-[10px]'
              } ${inverted ? 'text-forest-light' : 'text-forest'}`}
            >
              BUILT TO DOMINATE
            </span>
          </div>
        )}
      </div>
    );

    if (href) {
      return (
        <Link href={href} className="inline-block" aria-label="WOLF MOTORS — Built to Dominate">
          {billboardContent}
        </Link>
      );
    }
    return billboardContent;
  }

  // Horizontal layout for navigation headers
  const titleSizes = {
    sm: 'text-sm tracking-[0.22em]',
    md: 'text-lg tracking-[0.25em]',
    lg: 'text-2xl tracking-[0.28em]',
    hero: 'text-4xl tracking-[0.32em]',
    billboard: 'text-4xl tracking-[0.32em]',
  };

  const taglineSizes = {
    sm: 'text-[9px] tracking-[0.28em]',
    md: 'text-[10px] tracking-[0.3em]',
    lg: 'text-[11px] tracking-[0.32em]',
    hero: 'text-xs tracking-[0.35em]',
    billboard: 'text-xs tracking-[0.35em]',
  };

  const horizontalContent = (
    <div className={`inline-flex items-center gap-3 group cursor-pointer ${className}`}>
      <WolfEmblem
        size={emblemSizes[size]}
        variant={emblemVariant}
        withGlow={inverted}
        className="group-hover:scale-105 transition-transform duration-300"
      />
      <div className="flex flex-col select-none">
        <span
          className={`font-black uppercase font-sans ${titleSizes[size]} leading-none flex items-center gap-1.5 ${
            inverted ? 'text-white' : 'text-gray-950 group-hover:text-black'
          }`}
        >
          <span>WOLF</span>
          <span className={inverted ? 'text-gray-300 font-light' : 'text-gray-500 font-light'}>
            MOTORS
          </span>
        </span>
        {showTagline && (
          <span
            className={`font-bold uppercase tracking-widest ${taglineSizes[size]} mt-1 flex items-center gap-1.5 text-forest`}
          >
            <span className="w-1.5 h-0.5 bg-crimson inline-block"></span>
            <span>BUILT TO DOMINATE</span>
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block" aria-label="WOLF MOTORS — Built to Dominate">
        {horizontalContent}
      </Link>
    );
  }

  return horizontalContent;
}
