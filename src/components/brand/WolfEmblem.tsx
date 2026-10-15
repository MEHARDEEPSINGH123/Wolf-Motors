'use client';

import React from 'react';

export interface WolfEmblemProps {
  className?: string;
  size?: number;
  variant?: 'silver' | 'green' | 'crimson' | 'monochrome' | 'dark' | 'white';
  withGlow?: boolean;
  eyeAccent?: boolean; // Accent the eyes with vibrant emerald or crimson
}

export function WolfEmblem({
  className = '',
  size = 40,
  variant = 'dark',
  withGlow = false,
  eyeAccent = false,
}: WolfEmblemProps) {
  // Symmetrical vector coordinates of authentic Wolf Motors emblem (Center X = 100 on 200x200 viewBox)
  const leftEarPath =
    'M 30 19 L 29 46 L 33 63 L 37 76 L 20 95 L 7 116 L 44 143 L 28 121 L 27 112 L 31 105 L 20 106 L 23 100 L 36 87 L 50 76 L 41 70 L 37 56 L 37 35 L 67 61 L 87 53 L 64 41 Z';

  const rightEarPath =
    'M 170 19 L 171 46 L 167 63 L 163 76 L 180 95 L 193 116 L 156 143 L 172 121 L 173 112 L 169 105 L 180 106 L 177 100 L 164 87 L 150 76 L 159 70 L 163 56 L 163 35 L 133 61 L 113 53 L 136 41 Z';

  const leftEyePath =
    'M 60 103 L 67 111 L 82 115 L 88 122 L 87 113 L 84 110 L 63 103 Z';

  const rightEyePath =
    'M 140 103 L 133 111 L 118 115 L 112 122 L 113 113 L 116 110 L 137 103 Z';

  const muzzlePath =
    'M 48 124 L 70 144 L 86 172 L 100 181 L 114 172 L 130 144 L 152 124 L 140 126 L 124 137 L 114 160 L 100 167 L 86 160 L 76 137 L 60 126 Z';

  // Fill logic
  const getFill = (isEye = false) => {
    if (isEye && eyeAccent) {
      return variant === 'crimson' ? '#E32119' : '#1E8265';
    }
    switch (variant) {
      case 'white':
        return '#FFFFFF';
      case 'green':
        return '#1E8265';
      case 'crimson':
        return '#E32119';
      case 'silver':
        return 'url(#wolfSilverGrad)';
      case 'monochrome':
        return 'currentColor';
      case 'dark':
      default:
        return '#0A0A0A';
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {withGlow && (
        <div
          className="absolute inset-0 rounded-full blur-md opacity-25 transition-all duration-500"
          style={{
            backgroundColor:
              variant === 'green'
                ? '#1E8265'
                : variant === 'crimson'
                ? '#E32119'
                : variant === 'white'
                ? '#FFFFFF'
                : '#1E8265',
          }}
        />
      )}

      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 transition-transform duration-300"
      >
        <defs>
          <linearGradient id="wolfSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>

        {/* Authentic Wolf Head Segments */}
        <path d={leftEarPath} fill={getFill()} />
        <path d={rightEarPath} fill={getFill()} />
        <path d={leftEyePath} fill={getFill(true)} />
        <path d={rightEyePath} fill={getFill(true)} />
        <path d={muzzlePath} fill={getFill()} />
      </svg>
    </div>
  );
}
