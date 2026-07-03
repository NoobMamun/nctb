/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Calendar, HelpCircle, LayoutDashboard, Languages, Shield } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
}

export default function Navbar({ activeTab, setActiveTab, language, setLanguage }: NavbarProps) {
  const isBangla = language === 'bn';

  const navItems = [
    { id: 'library', labelBn: 'পাঠ্যপুস্তক লাইব্রেরি', labelEn: 'Textbook Library', icon: BookOpen },
    { id: 'curriculum', labelBn: 'শিক্ষাক্রম ও রূপরেখা', labelEn: 'Curriculum & Guides', icon: Shield },
    { id: 'notices', labelBn: 'নোটিশ বোর্ড', labelEn: 'Notice Board', icon: Calendar },
    { id: 'ai-companion', labelBn: 'এআই শিক্ষা সহায়ক', labelEn: 'AI Study Assistant', icon: HelpCircle },
    { id: 'dashboard', labelBn: 'আমার স্টাডি রুম', labelEn: 'My Study Room', icon: LayoutDashboard }
  ];

  return (
    <header className="w-full bg-green-900 text-white shadow-md">
      {/* Top Bangladesh National Flag Color Accent Ribbon */}
      <div className="w-full h-1.5 flex">
        <div className="w-1/3 h-full bg-red-600" />
        <div className="w-2/3 h-full bg-green-700" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative">
        <div className="flex flex-col items-center justify-center gap-4">
          
          {/* Logo Brand Lockup */}
          <div className="flex items-center gap-3 select-none">
            {/* NCTB Government Seal Graphic Placeholder (Clean SVG emblem) */}
            <div className="w-12 h-12 rounded-full border-2 border-accent-gold flex items-center justify-center bg-white p-1 shadow-inner">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Bangladesh Red Sun */}
                <circle cx="50" cy="50" r="30" fill="#D62728" />
                {/* Map contour placeholder */}
                <path d="M42 35 C45 38 43 45 48 48 C51 45 54 48 56 42 C58 45 61 40 60 48 Q55 58 50 68 C45 60 40 55 42 35 Z" fill="#2CA02C" />
                {/* Golden Circular Text path border */}
                <circle cx="50" cy="50" r="46" stroke="#B4863C" strokeWidth="3" fill="none" />
              </svg>
            </div>

            <div className="text-left">
              <h1 className="font-display text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                {isBangla ? 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (এনসিটিবি)' : 'National Curriculum & Textbook Board (NCTB)'}
              </h1>
              <p className="text-xs text-green-200 font-sans tracking-wide">
                {isBangla ? 'শিক্ষা মন্ত্রণালয়, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার' : 'Ministry of Education, People\'s Republic of Bangladesh'}
              </p>
            </div>
          </div>

          {/* Controls: Language and Quick Links */}
          <div className="flex items-center gap-4 md:absolute md:right-4 lg:right-8 md:top-1/2 md:-translate-y-1/2">
            {/* Language Switch Toggle per Section 3.5 & 4 */}
            <button
              id="language-toggle"
              onClick={() => setLanguage(isBangla ? 'en' : 'bn')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-md border border-green-400 bg-green-800/60 hover:bg-green-700 hover:border-accent-gold text-sm font-medium transition-all text-white focus:outline-none"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4 text-accent-gold" />
              <span>{isBangla ? 'ENGLISH' : 'বাংলা'}</span>
            </button>

            {/* Emergency Support Indicator */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-green-100 bg-green-800 border border-green-700 px-3 py-1.5 rounded-md">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span>{isBangla ? 'হেল্পলাইন: ৩৩৩ / ১৬২২২' : 'Helpline: 333 / 16222'}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs bar per Section 8 & 9 */}
        <nav className="mt-6 border-t border-green-800/80 pt-4" aria-label="Main Navigation">
          <ul className="flex flex-wrap items-center gap-1.5 sm:gap-3" id="main-nav-tabs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 border-b-2 focus:outline-none ${
                      isActive
                        ? 'bg-green-100 text-green-900 border-accent-gold shadow-sm font-semibold'
                        : 'text-green-100 hover:text-white hover:bg-green-800 border-transparent hover:border-green-400'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-green-950' : 'text-green-300'}`} />
                    <span>{isBangla ? item.labelBn : item.labelEn}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
