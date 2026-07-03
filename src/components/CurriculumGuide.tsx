/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Shield, Download, Star, Info, HelpCircle } from 'lucide-react';
import { CURRICULUM_INFO } from '../data/textbooks';

interface CurriculumGuideProps {
  language: 'bn' | 'en';
}

export default function CurriculumGuide({ language }: CurriculumGuideProps) {
  const isBangla = language === 'bn';
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const activeCurr = CURRICULUM_INFO[activeTabIdx] || CURRICULUM_INFO[0];

  return (
    <div className="space-y-8 select-none">
      
      {/* Introduction Hero per Section 3 & 9 */}
      <div className="bg-green-900 text-white rounded-lg p-6 sm:p-8 shadow-md relative overflow-hidden border-b border-accent-gold/40">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
        <div className="z-10 relative space-y-3 max-w-3xl">
          <span className="inline-block text-[10px] sm:text-xs font-semibold text-accent-gold uppercase tracking-widest bg-green-950 px-3 py-1 rounded">
            {isBangla ? 'জাতীয় শিক্ষাক্রম রূপরেখা ২০২১' : 'National Curriculum Framework 2021'}
          </span>
          <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-white">
            {isBangla ? 'যোগ্যতা ও অভিজ্ঞতা-ভিত্তিক নতুন শিক্ষাক্রম' : 'Competency & Experience-Based Curriculum Reform'}
          </h2>
          <p className="text-xs sm:text-sm text-green-100 leading-relaxed">
            {isBangla
              ? 'ঐতিহ্যগত মুখস্থবিদ্যা নির্ভর শিক্ষার বদলে শিক্ষার্থীদের সক্রিয় অংশগ্রহণ, বাস্তব জীবন পরিক্রমা এবং অভিজ্ঞতা অর্জনের মাধ্যমে শিখন পদ্ধতি চালুর লক্ষ্যে এই শিক্ষাক্রম রূপরেখা প্রণয়ন করা হয়েছে।'
              : 'Our revised academic guidelines foster inquiry, creative execution, life-competencies, and active participation. Memoring is replaced with hands-on continuous indicators (PST/PI).'}
          </p>
        </div>
      </div>

      {/* Curriculum tabs selector and detail split pane */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Category selector tabs */}
        <div className="space-y-3">
          <h3 className="font-display text-xs sm:text-sm font-bold text-green-950 uppercase tracking-widest border-b border-border-custom pb-2">
            {isBangla ? 'শিক্ষার স্তর নির্বাচন করুন' : 'Select Education Level'}
          </h3>
          <div className="flex flex-col gap-2">
            {CURRICULUM_INFO.map((curr, idx) => (
              <button
                key={curr.id}
                onClick={() => setActiveTabIdx(idx)}
                className={`w-full text-left px-4 py-3.5 rounded-lg border text-xs sm:text-sm transition-all duration-200 flex items-center justify-between focus:outline-none ${
                  activeTabIdx === idx
                    ? 'bg-green-800 text-white border-green-800 shadow-md font-semibold'
                    : 'bg-white hover:bg-green-50 border-border-custom text-ink-700'
                }`}
              >
                <span>{isBangla ? curr.titleBn : curr.titleEn}</span>
                <Shield className={`w-4 h-4 shrink-0 ${activeTabIdx === idx ? 'text-accent-gold' : 'text-green-350 opacity-60'}`} />
              </button>
            ))}
          </div>

          <div className="bg-white border border-border-custom p-4 rounded-lg shadow-sm mt-6">
            <h4 className="text-xs font-semibold text-ink-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Info className="w-3.5 h-3.5 text-accent-gold" />
              <span>{isBangla ? 'মূল্যায়ন সূচক' : 'Evaluation Metrics'}</span>
            </h4>
            <p className="text-[11px] text-ink-700 leading-relaxed leading-relaxed">
              {isBangla
                ? 'নতুন শিক্ষাক্রমে পরীক্ষার খাতার পরিবর্তে ধারাবাহিক মূল্যায়ন (পিআই - পারফরম্যান্স ইন্ডিকেটর) এবং সামষ্টিক মূল্যায়নের উপর বিশেষ গুরুত্বারোপ করা হয়েছে।'
                : 'In the new framework, continuous school assessment (PI - Performance Indicators) is combined with year-end evaluations to rank multi-dimensional students.'}
            </p>
          </div>
        </div>

        {/* Right Side: Tab details preview */}
        <div className="lg:col-span-2 bg-white border border-border-custom rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Title and Level Banner */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border-custom pb-4 gap-3">
            <div>
              <span className="text-[10px] font-mono font-semibold uppercase bg-green-100 text-green-950 px-2 py-0.5 rounded-sm">
                {isBangla ? activeCurr.levelBn : activeCurr.levelEn}
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-green-950 mt-1.5">
                {isBangla ? activeCurr.titleBn : activeCurr.titleEn}
              </h3>
            </div>

            <a
              href={activeCurr.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-green-800 hover:bg-green-900 text-white rounded font-semibold text-xs transition-colors shadow-sm focus:outline-none"
            >
              <Download className="w-4 h-4 text-accent-gold" />
              <span>{isBangla ? 'সম্পূর্ণ নির্দেশিকা PDF' : 'Download Guide PDF'}</span>
            </a>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-ink-900 uppercase tracking-wider">
              {isBangla ? 'রূপরেখার বিবরণ' : 'Framework Overview'}
            </h4>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed text-justify">
              {isBangla ? activeCurr.descriptionBn : activeCurr.descriptionEn}
            </p>
          </div>

          {/* Key Competencies / Pillars list */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-semibold text-ink-900 uppercase tracking-wider flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-accent-gold fill-accent-gold" />
              <span>{isBangla ? 'শিখনের মূল চার স্তম্ভ ও যোগ্যতা' : 'Core Learning Pillars & Competencies'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {(isBangla ? activeCurr.keyPointsBn : activeCurr.keyPointsEn).map((point, index) => (
                <div
                  key={index}
                  className="p-3.5 bg-bg-canvas border border-border-custom/80 rounded-md hover:border-green-300 transition-colors flex gap-2.5 items-start text-xs text-ink-700"
                >
                  <span className="w-5 h-5 rounded-full bg-green-900 text-white flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Corner guidelines */}
          <div className="p-4 bg-accent-gold-tint/40 border border-accent-gold/25 rounded-md text-xs text-ink-700 space-y-1 select-none">
            <h4 className="font-semibold text-accent-gold flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-accent-gold" />
              <span>{isBangla ? 'শিক্ষক ও অভিভাবকদের জন্য তথ্য' : 'Information for Educators & Guardians'}</span>
            </h4>
            <p className="leading-relaxed opacity-95">
              {isBangla
                ? 'শিক্ষক সংস্করণ (টিজি - টিচার গাইড) অনুযায়ী প্রতিটি সেশন পরিচালনা করা বাধ্যতামূলক। শিক্ষাদান প্রক্রিয়ায় কোনো চাপ বা ভীতি প্রদর্শনের বদলে শিক্ষার্থীদের স্বাধীন চিন্তার সুযোগ দিন।'
                : 'Following the Teacher Guide (TG) curriculum protocols is mandatory for all registered schools. Classroom activities should inspire cooperative coordination and child-first safety.'}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
