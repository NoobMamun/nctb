/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Megaphone, ExternalLink, Calendar } from 'lucide-react';
import { NOTICES } from '../data/textbooks';

interface NoticeTickerProps {
  language: 'bn' | 'en';
}

export default function NoticeTicker({ language }: NoticeTickerProps) {
  const isBangla = language === 'bn';

  // Format date helper
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    if (isBangla) {
      // Bangla digits conversion
      const banglaDigits: { [key: string]: string } = {
        '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
        '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
      };
      return dateStr.replace(/\d/g, (d) => banglaDigits[d] || d);
    }
    return dateStr;
  };

  // Double the notices array to make the infinite scroll perfectly seamless
  const duplicatedNotices = [...NOTICES, ...NOTICES];

  return (
    <div 
      id="nctb-notice-ticker-container" 
      className="w-full bg-red-950/90 border-y border-red-800/80 shadow-md backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center h-11 overflow-hidden relative">
        
        {/* Style block for smooth hardware-accelerated infinite marquee scrolling from left to right */}
        <style>
          {`
            @keyframes marqueeScroll {
              0% {
                transform: translateX(-50%);
              }
              100% {
                transform: translateX(0%);
              }
            }
            .animate-marquee {
              display: flex;
              width: max-content;
              animation: marqueeScroll 40s linear infinite;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}
        </style>

        {/* TV Style static banner on the left side - Beautiful dark green and crimson red combo */}
        <div className="h-full bg-red-600 px-4 sm:px-6 flex items-center gap-2 text-white font-bold tracking-wider shrink-0 z-20 shadow-[6px_0_12px_rgba(0,0,0,0.3)] select-none relative">
          {/* Glowing live flash dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          
          <Megaphone className="w-4 h-4 shrink-0 text-amber-200 animate-bounce" />
          
          <span className="font-display text-xs sm:text-sm uppercase whitespace-nowrap">
            {isBangla ? 'সর্বশেষ নোটিশ' : 'LATEST NOTICES'}
          </span>
          
          {/* Triangular TV border cut accent */}
          <div className="absolute right-[-10px] top-0 bottom-0 w-0 h-0 border-t-[22px] border-t-transparent border-b-[22px] border-b-transparent border-l-[10px] border-l-red-600"></div>
        </div>

        {/* The Auto Scrolling Marquee Section */}
        <div className="flex-1 h-full relative overflow-hidden flex items-center z-10 pl-6 bg-green-950/40 border-y border-green-900/40">
          <div className="animate-marquee">
            {duplicatedNotices.map((notice, index) => {
              const title = isBangla ? notice.titleBn : notice.titleEn;
              return (
                <a
                  key={`${notice.id}-${index}`}
                  href={notice.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-green-50 hover:text-accent-gold font-sans text-xs md:text-sm transition-colors mx-8 shrink-0 hover:underline cursor-pointer group"
                >
                  {/* Category Pill Tag */}
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-green-900/80 border border-green-700 font-semibold uppercase tracking-wider text-accent-gold shrink-0">
                    {notice.category === 'textbook' 
                      ? (isBangla ? 'পাঠ্যপুস্তক' : 'Textbook') 
                      : notice.category === 'curriculum'
                        ? (isBangla ? 'শিক্ষাক্রম' : 'Curriculum')
                        : notice.category === 'tender'
                          ? (isBangla ? 'দরপত্র' : 'Tender')
                          : (isBangla ? 'সাধারণ' : 'General')
                    }
                  </span>

                  {/* Calendar / Date Tag */}
                  <span className="flex items-center gap-1 text-[11px] text-green-300 group-hover:text-accent-gold font-medium shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-green-400" />
                    {formatDate(notice.date)}
                  </span>

                  {/* Divider line */}
                  <span className="text-green-700">|</span>

                  {/* Notice Title Text */}
                  <span className="font-semibold tracking-tight truncate max-w-md sm:max-w-lg lg:max-w-xl text-stone-100 group-hover:text-white">
                    {title}
                  </span>

                  {/* External target arrow indicator */}
                  <ExternalLink className="w-3 h-3 text-green-400 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                  
                  {/* Interactive Spacer Icon */}
                  <span className="ml-2 text-accent-gold font-bold">★</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Gradient shadow overlay on the rightmost edge of scrolling area for realistic broadcast look */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#051e14] via-[#051e14]/40 to-transparent pointer-events-none z-20" />
      </div>
    </div>
  );
}
