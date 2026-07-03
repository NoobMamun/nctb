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
  const wrapperSizes = {
    sm: 'w-24 h-32',
    md: 'w-44 h-60',
    lg: 'w-56 h-76'
  };

  const sizeClasses = {
    sm: 'w-full h-full text-xs',
    md: 'w-full h-full text-sm shadow-md',
    lg: 'w-full h-full text-base shadow-lg'
  };

  const textSizes = {
    sm: { title: 'text-[9px] leading-tight', class: 'text-[8px]', board: 'text-[7px]' },
    md: { title: 'text-sm font-semibold tracking-wide', class: 'text-xs', board: 'text-[10px]' },
    lg: { title: 'text-lg font-bold tracking-normal', class: 'text-sm', board: 'text-xs' }
  };

  const selectedTextSize = textSizes[size];

  // Pick vector illustration based on subject type
  const renderSubjectIllustration = (isWatermark = false) => {
    const s = book.id.toLowerCase();
    const strokeColor = isWatermark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.45)';
    const fillColor = isWatermark ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.1)';

    if (s.includes('math') || s.includes('গণিত')) {
      return (
        <svg viewBox="0 0 100 100" className={isWatermark ? "w-20 h-20 opacity-30" : "w-1/2 h-1/2 opacity-80"} stroke={strokeColor} strokeWidth="1.5" fill={fillColor}>
          {/* Compass, triangle, ruler */}
          <path d="M20 80 L80 80 L80 20 Z" />
          <circle cx="50" cy="50" r="15" />
          <line x1="20" y1="80" x2="50" y2="20" strokeDasharray="3,3" />
        </svg>
      );
    }
    if (s.includes('science') || s.includes('physics') || s.includes('chemistry') || s.includes('biology') || s.includes('বিজ্ঞান') || s.includes('পদার্থ') || s.includes('রসায়ন') || s.includes('জীববিজ্ঞান')) {
      return (
        <svg viewBox="0 0 100 100" className={isWatermark ? "w-20 h-20 opacity-30" : "w-1/2 h-1/2 opacity-80"} stroke={strokeColor} strokeWidth="1.5" fill={fillColor}>
          {/* Atoms, Beaker or Leaf */}
          <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(30, 50, 50)" />
          <ellipse cx="50" cy="50" rx="35" ry="12" transform="rotate(-30, 50, 50)" />
          <circle cx="50" cy="50" r="8" fill={isWatermark ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.7)"} />
          <path d="M30,30 C50,20 50,45 70,30" strokeDasharray="2,2" />
        </svg>
      );
    }
    if (s.includes('english') || s.includes('bangla') || s.includes('ইংরেজি') || s.includes('ভাষা') || s.includes('সাহিত্য')) {
      return (
        <svg viewBox="0 0 100 100" className={isWatermark ? "w-20 h-20 opacity-30" : "w-1/2 h-1/2 opacity-80"} stroke={strokeColor} strokeWidth="1.5" fill={fillColor}>
          {/* Open Book with rising stars */}
          <path d="M15 75 C 30 65, 45 65, 50 70 C 55 65, 70 65, 85 75 L 85 30 C 70 20, 55 20, 50 25 C 45 20, 30 20, 15 30 Z" />
          <line x1="50" y1="25" x2="50" y2="70" />
        </svg>
      );
    }
    if (s.includes('ict') || s.includes('digital') || s.includes('প্রযুক্তি')) {
      return (
        <svg viewBox="0 0 100 100" className={isWatermark ? "w-20 h-20 opacity-30" : "w-1/2 h-1/2 opacity-80"} stroke={strokeColor} strokeWidth="1.5" fill={fillColor}>
          {/* Computer / Circuit matrix */}
          <rect x="20" y="20" width="60" height="40" rx="4" />
          <path d="M40 60 L30 80 L70 80 L60 60 Z" />
          <circle cx="15" cy="15" r="3" fill={isWatermark ? "#10b981" : "#fff"} />
          <circle cx="85" cy="15" r="3" fill={isWatermark ? "#10b981" : "#fff"} />
        </svg>
      );
    }
    // Default: Traditional NCTB Leaf Emblem or Rising Sun
    return (
      <svg viewBox="0 0 100 100" className={isWatermark ? "w-20 h-20 opacity-30" : "w-1/2 h-1/2 opacity-80"} stroke={strokeColor} strokeWidth="1.5" fill={fillColor}>
        {/* Abstract leaf shape and rising sun arches */}
        <path d="M50 20 C20 40, 20 70, 50 85 C80 70, 80 40, 50 20 Z" />
        <path d="M50 20 L50 85" />
        <path d="M32 45 Q50 55 50 55" />
        <path d="M68 45 Q50 55 50 55" />
      </svg>
    );
  };

  return (
    <div
      id={`book-wrapper-${book.id}`}
      className={`group relative select-none cursor-pointer [perspective:1200px] ${wrapperSizes[size]}`}
    >
      {/* 1. Static Inner Textbook Page (Revealed behind the cover as it swings open) */}
      <div
        className="absolute inset-0 rounded-r-md bg-[#faf8f2] border border-stone-300 p-3 flex flex-col justify-between shadow-inner select-none transition-all duration-300 z-10"
        style={{
          boxShadow: 'inset 10px 0 15px rgba(0,0,0,0.06), inset -2px 0 5px rgba(0,0,0,0.03), 0 4px 8px rgba(0,0,0,0.1)'
        }}
      >
        {/* Central Watermark Illustration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {renderSubjectIllustration(true)}
        </div>

        {/* Content of the opened textbook page */}
        <div className="z-10 border-b border-stone-200/80 pb-1.5 text-center mt-0.5">
          <span className="text-[7px] font-mono uppercase tracking-widest text-emerald-700 font-bold block">
            {isBangla ? 'অধ্যায় ১: সূচনা' : 'CHAPTER 1: INTRODUCTION'}
          </span>
          <h4 className="font-display font-bold text-stone-800 text-[10px] sm:text-xs mt-0.5 truncate">
            {title}
          </h4>
        </div>

        {/* Lines representing printed textbook content */}
        <div className="z-10 flex-1 flex flex-col gap-1.5 justify-center py-2 px-1 text-left">
          <div className="h-1.5 w-11/12 bg-stone-300/60 rounded-sm" />
          <div className="h-1.5 w-5/6 bg-stone-300/60 rounded-sm" />
          <div className="h-1.5 w-full bg-stone-300/60 rounded-sm" />
          <div className="h-1.5 w-2/3 bg-stone-300/60 rounded-sm" />
          <div className="h-1.5 w-4/5 bg-stone-300/60 rounded-sm" />
          {size !== 'sm' && (
            <>
              <div className="h-1.5 w-11/12 bg-stone-300/60 rounded-sm" />
              <div className="h-1.5 w-3/4 bg-stone-300/60 rounded-sm" />
            </>
          )}
        </div>

        {/* Page Footer */}
        <div className="z-10 border-t border-stone-200/80 pt-1 flex justify-between items-center text-[7px] font-mono text-stone-400">
          <span>{isBangla ? 'পৃষ্ঠা ৩' : 'Page 3'}</span>
          <span className="text-stone-500 font-semibold">{isBangla ? 'এনসিটিবি' : 'NCTB'}</span>
        </div>
      </div>

      {/* 2. Front Cover Page (Flips wide open to the left on hover) */}
      <div
        id={`book-cover-${book.id}`}
        className={`absolute inset-0 flex flex-col justify-between p-3 select-none overflow-hidden rounded-r-md transition-all duration-500 ease-in-out border-l-[6px] border-r border-t border-b z-20 [transform-origin:left_center] group-hover:[transform:rotateY(-110deg)] group-hover:shadow-xl ${sizeClasses[size]}`}
        style={{
          backgroundColor: book.bgColor,
          borderColor: `${book.borderColor}dd`,
          boxShadow: 'inset 4px 0 12px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.15)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
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
    </div>
  );
}
