/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Textbook } from '../types';

interface BookCoverProps {
  book: Textbook;
  language: 'bn' | 'en';
  size?: 'sm' | 'md' | 'lg';
}

export default function BookCover({ book, language, size = 'md' }: BookCoverProps) {
  const isBangla = language === 'bn';
  const title = isBangla ? book.titleBn : book.titleEn;
  const classLabel = isBangla ? book.classLabelBn : book.classLabelEn;
  const subject = isBangla ? book.subjectBn : book.subjectEn;

  // Sizing styles
  const sizeClasses = {
    sm: 'w-24 h-32 text-xs',
    md: 'w-44 h-60 text-sm shadow-md',
    lg: 'w-56 h-76 text-base shadow-lg'
  };

  const textSizes = {
    sm: { title: 'text-[9px] leading-tight', class: 'text-[8px]', board: 'text-[7px]' },
    md: { title: 'text-sm font-semibold tracking-wide', class: 'text-xs', board: 'text-[10px]' },
    lg: { title: 'text-lg font-bold tracking-normal', class: 'text-sm', board: 'text-xs' }
  };

  const selectedTextSize = textSizes[size];

  // Pick vector illustration based on subject type
  const renderSubjectIllustration = () => {
    const s = book.id.toLowerCase();
    const strokeColor = 'rgba(255, 255, 255, 0.45)';
    const fillColor = 'rgba(255, 255, 255, 0.1)';

    if (s.includes('math') || s.includes('গণিত')) {
      return (
        <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 opacity-80" stroke={strokeColor} strokeWidth="1.5" fill={fillColor}>
          {/* Compass, triangle, ruler */}
          <path d="M20 80 L80 80 L80 20 Z" />
          <circle cx="50" cy="50" r="15" />
          <line x1="20" y1="80" x2="50" y2="20" strokeDasharray="3,3" />
        </svg>
      );
    }
    if (s.includes('science') || s.includes('physics') || s.includes('chemistry') || s.includes('biology') || s.includes('বিজ্ঞান') || s.includes('পদার্থ') || s.includes('রসায়ন') || s.includes('জীববিজ্ঞান')) {
      return (
        <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 opacity-80" stroke={strokeColor} strokeWidth="1.5" fill={fillColor}>
          {/* Atoms, Beaker or Leaf */}
          <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(30, 50, 50)" />
          <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(-30, 50, 50)" />
          <circle cx="50" cy="50" r="8" fill="rgba(255,255,255,0.7)" />
          <path d="M30,30 C50,20 50,45 70,30" strokeDasharray="2,2" />
        </svg>
      );
    }
    if (s.includes('english') || s.includes('bangla') || s.includes('ইংরেজি') || s.includes('ভাষা') || s.includes('সাহিত্য')) {
      return (
        <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 opacity-80" stroke={strokeColor} strokeWidth="1.5" fill={fillColor}>
          {/* Open Book with rising stars */}
          <path d="M15 75 C 30 65, 45 65, 50 70 C 55 65, 70 65, 85 75 L 85 30 C 70 20, 55 20, 50 25 C 45 20, 30 20, 15 30 Z" />
          <line x1="50" y1="25" x2="50" y2="70" />
          <circle cx="28" cy="40" r="1" fill="#fff" />
          <circle cx="34" cy="52" r="1.5" fill="#fff" />
          <circle cx="66" cy="45" r="1" fill="#fff" />
          <circle cx="72" cy="58" r="1.5" fill="#fff" />
        </svg>
      );
    }
    if (s.includes('ict') || s.includes('digital') || s.includes('প্রযুক্তি')) {
      return (
        <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 opacity-80" stroke={strokeColor} strokeWidth="1.5" fill={fillColor}>
          {/* Computer / Circuit matrix */}
          <rect x="20" y="20" width="60" height="40" rx="4" />
          <path d="M40 60 L30 80 L70 80 L60 60 Z" />
          <line x1="15" y1="15" x2="30" y2="30" />
          <line x1="85" y1="15" x2="70" y2="30" />
          <circle cx="15" cy="15" r="3" fill="#fff" />
          <circle cx="85" cy="15" r="3" fill="#fff" />
        </svg>
      );
    }
    // Default: Traditional NCTB Leaf Emblem or Rising Sun
    return (
      <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 opacity-80" stroke={strokeColor} strokeWidth="1.5" fill={fillColor}>
        {/* Abstract leaf shape and rising sun arches */}
        <path d="M50 20 C20 40, 20 70, 50 85 C80 70, 80 40, 50 20 Z" />
        <path d="M50 20 L50 85" />
        <path d="M32 45 Q50 55 50 55" />
        <path d="M68 45 Q50 55 50 55" />
        <path d="M30 60 Q50 68 50 68" />
        <path d="M70 60 Q50 68 50 68" />
      </svg>
    );
  };

  return (
    <div
      id={`book-cover-${book.id}`}
      className={`relative flex flex-col justify-between p-3 select-none overflow-hidden rounded-md transition-all duration-300 border-l-[6px] border-r border-t border-b ${sizeClasses[size]}`}
      style={{
        backgroundColor: book.bgColor,
        borderColor: `${book.borderColor}dd`,
        boxShadow: 'inset 4px 0 12px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.15)'
      }}
    >
      {/* Glossy Overlay for a beautiful physical-book look */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-white/5 to-white/10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />

      {/* Traditional NCTB Border Outline */}
      <div className="absolute inset-2 border border-white/10 rounded-sm pointer-events-none" />

      {/* Top Header: Class & Board */}
      <div className="z-10 text-center text-white/90 font-display">
        <span className={`block uppercase font-semibold text-[8px] tracking-widest text-accent-gold`}>
          {isBangla ? 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড' : 'NATIONAL CURRICULUM & TEXTBOOK BOARD'}
        </span>
        <div className={`mt-1 font-sans ${selectedTextSize.class} font-medium border-b border-white/20 pb-1`}>
          {classLabel}
        </div>
      </div>

      {/* Middle: Subject Vector Illustration */}
      <div className="z-10 flex justify-center items-center my-1 grow h-16">
        {renderSubjectIllustration()}
      </div>

      {/* Bottom Information: Title, Subject and Board */}
      <div className="z-10 text-center text-white font-display mt-auto pt-2 border-t border-white/15">
        <h3 className={`${selectedTextSize.title} font-bold text-white drop-shadow-md`}>
          {title}
        </h3>
        {size !== 'sm' && (
          <p className="text-[10px] text-white/70 font-sans mt-0.5 italic">
            {subject}
          </p>
        )}
        <div className="mt-1 flex items-center justify-center gap-1">
          {/* Circular NCTB Emblem Graphic */}
          <div className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center bg-white/10 text-[6px]">
            🇧🇩
          </div>
          <span className={`text-[8px] font-sans text-white/60 tracking-tighter`}>
            {isBangla ? 'গণপ্রজাতন্ত্রী বাংলাদেশ' : 'Govt. of Bangladesh'}
          </span>
        </div>
      </div>
    </div>
  );
}
