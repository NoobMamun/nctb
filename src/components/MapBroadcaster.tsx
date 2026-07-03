/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface MapBroadcasterProps {
  language: 'bn' | 'en';
}

export default function MapBroadcaster({ language }: MapBroadcasterProps) {
  const isBangla = language === 'bn';

  // Division coordinates relative to SVG viewBox (0 0 100 120)
  const divisions = [
    { nameBn: 'ঢাকা', nameEn: 'Dhaka', x: 48, y: 48, isCenter: true },
    { nameBn: 'রংপুর', nameEn: 'Rangpur', x: 30, y: 22 },
    { nameBn: 'রাজশাহী', nameEn: 'Rajshahi', x: 25, y: 45 },
    { nameBn: 'ময়মনসিংহ', nameEn: 'Mymensingh', x: 54, y: 30 },
    { nameBn: 'সিলেট', nameEn: 'Sylhet', x: 78, y: 32 },
    { nameBn: 'খুলনা', nameEn: 'Khulna', x: 26, y: 75 },
    { nameBn: 'বরিশাল', nameEn: 'Barisal', x: 48, y: 82 },
    { nameBn: 'চট্টগ্রাম', nameEn: 'Chittagong', x: 78, y: 92 },
  ];

  // Connection curves from Dhaka (48, 48) to divisions
  const paths = [
    { id: 'rangpur', d: 'M 48,48 Q 39,35 30,22' },
    { id: 'rajshahi', d: 'M 48,48 Q 36,46 25,45' },
    { id: 'mymensingh', d: 'M 48,48 Q 51,39 54,30' },
    { id: 'sylhet', d: 'M 48,48 Q 63,40 78,32' },
    { id: 'khulna', d: 'M 48,48 Q 37,61 26,75' },
    { id: 'barisal', d: 'M 48,48 Q 48,65 48,82' },
    { id: 'chittagong', d: 'M 48,48 Q 63,70 78,92' },
  ];

  return (
    <div
      id="nctb-map-broadcaster"
      className="hidden md:flex items-center gap-3 bg-green-950/40 border border-green-800/60 rounded-lg p-2 shadow-sm select-none max-w-[210px] h-[90px] backdrop-blur-sm overflow-hidden"
    >
      {/* Animated 2D Map SVG */}
      <div className="w-14 h-[74px] shrink-0 relative">
        <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
          {/* Defs for gradients, glow filters, and reusable book icon */}
          <defs>
            {/* Map Gradient */}
            <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0a5c42" />
              <stop offset="100%" stopColor="#023b29" />
            </linearGradient>

            {/* Glowing effect filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Pulse animation keyframe in pure SVG */}
            <style>
              {`
                @keyframes pulse {
                  0% { r: 2px; opacity: 1; }
                  100% { r: 6px; opacity: 0; }
                }
                .pulse-circle {
                  animation: pulse 2s infinite ease-out;
                  transform-origin: center;
                }
                .node-text {
                  font-family: 'Public Sans', 'Noto Sans Bengali', sans-serif;
                  font-size: 5px;
                  font-weight: 600;
                  fill: rgba(255, 255, 255, 0.85);
                }
              `}
            </style>
          </defs>

          {/* Bangladesh Boundary Map Path (Matching 1st Image) */}
          <path
            d="M 35,8 
               C 30,15 28,25 20,28 
               C 15,32 12,40 15,48 
               C 18,55 22,62 20,70 
               C 18,78 22,85 28,90 
               C 32,92 35,88 38,82 
               C 41,85 44,92 48,95 
               C 52,98 56,94 58,88 
               C 61,92 64,96 68,102 
               C 72,108 76,112 82,115 
               C 84,110 80,100 78,92 
               C 76,84 78,76 82,68 
               C 86,60 84,52 80,45 
               C 76,42 82,35 85,32 
               C 88,28 80,20 72,18 
               C 65,15 58,20 52,18 
               C 48,15 42,10 35,8 Z"
            fill="url(#mapGrad)"
            stroke="#10b981"
            strokeWidth="0.75"
            className="drop-shadow-sm"
          />

          {/* Bangladesh Flag Red Circle inside Map (Matching 1st Image) */}
          <circle cx="48" cy="48" r="14" fill="#d62728" opacity="0.9" />

          {/* Broadcast connection path curves */}
          {paths.map((p) => (
            <path
              key={p.id}
              d={p.d}
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          ))}

          {/* Flying/Broadcasting Book Icons along the curves */}
          {paths.map((p, idx) => (
            <g key={`book-group-${p.id}`}>
              {/* First book on path */}
              <g>
                <path
                  d="M-4,-3 C-2,-4.5 0,-3 0,-3 C0,-3 2,-4.5 4,-3 L4,3 C2,1.5 0,3 0,3 C0,3 -2,1.5 -4,3 Z"
                  fill="#f3e8d3"
                  stroke="#173430"
                  strokeWidth="0.5"
                />
                <path d="M0,-3 L0,3" stroke="#173430" strokeWidth="0.5" />
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path={p.d}
                  begin={`${idx * 0.4}s`}
                  rotate="auto"
                />
              </g>
              {/* Second staggered book on path */}
              <g>
                <path
                  d="M-4,-3 C-2,-4.5 0,-3 0,-3 C0,-3 2,-4.5 4,-3 L4,3 C2,1.5 0,3 0,3 C0,3 -2,1.5 -4,3 Z"
                  fill="#f3e8d3"
                  stroke="#173430"
                  strokeWidth="0.5"
                />
                <path d="M0,-3 L0,3" stroke="#173430" strokeWidth="0.5" />
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path={p.d}
                  begin={`${idx * 0.4 + 2}s`}
                  rotate="auto"
                />
              </g>
            </g>
          ))}

          {/* Division nodes (dots) */}
          {divisions.map((div) => (
            <g key={div.nameEn}>
              {/* Central beacon has extra glowing pulse ring */}
              {div.isCenter && (
                <circle
                  cx={div.x}
                  cy={div.y}
                  r="4"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1"
                  className="pulse-circle"
                />
              )}
              <circle
                cx={div.x}
                cy={div.y}
                r={div.isCenter ? 2.5 : 1.5}
                fill={div.isCenter ? '#f59e0b' : '#34d399'}
                filter={div.isCenter ? 'url(#glow)' : ''}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Broadcasting Meta Text panel */}
      <div className="flex flex-col justify-center text-left leading-tight">
        <span className="text-[10px] text-accent-gold font-bold tracking-widest uppercase">
          {isBangla ? 'অনলাইন বিতরণ' : 'Live Broadcast'}
        </span>
        <h4 className="text-[11px] font-display font-semibold text-white mt-0.5 leading-none">
          {isBangla ? 'কেন্দ্রীয় সংযোগ' : 'National Feed'}
        </h4>
        <p className="text-[9px] text-green-200 mt-1 leading-normal max-w-[120px] opacity-90">
          {isBangla
            ? 'ঢাকা কেন্দ্র থেকে দেশব্যাপী পাঠ্যপুস্তক বিতরণ পরিক্রমা।'
            : 'Broadcasting curriculum books to all divisions.'}
        </p>
      </div>
    </div>
  );
}
