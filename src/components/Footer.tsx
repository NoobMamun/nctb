/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface FooterProps {
  language: 'bn' | 'en';
}

export default function Footer({ language }: FooterProps) {
  const isBangla = language === 'bn';

  return (
    <footer className="w-full bg-green-950 text-white mt-16 border-t border-accent-gold/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-green-900 pb-8">
          
          {/* Col 1: About NCTB */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-display text-base sm:text-lg font-bold text-accent-gold">
              {isBangla ? 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (এনসিটিবি)' : 'National Curriculum & Textbook Board (NCTB)'}
            </h3>
            <p className="text-xs sm:text-sm text-green-200 leading-relaxed max-w-md">
              {isBangla
                ? 'এনসিটিবি হলো শিক্ষা মন্ত্রণালয়ের অধীন একটি স্বায়ত্তশাসিত প্রতিষ্ঠান যা প্রাথমিক, মাধ্যমিক ও উচ্চ মাধ্যমিক স্তরের শিক্ষাক্রম উন্নয়ন এবং পাঠ্যপুস্তক প্রণয়ন, প্রকাশ ও বিতরণের কাজ করে থাকে।'
                : 'NCTB is an autonomous body under the Ministry of Education responsible for developing curricula, and formulating, publishing, and distributing textbooks for primary, secondary, and higher secondary levels.'}
            </p>
            <div className="text-xs text-green-300">
              <span className="font-semibold">{isBangla ? 'ঠিকানা: ' : 'Address: '}</span>
              {isBangla ? '৬৯-৭০, মতিঝিল বাণিজ্যিক এলাকা, ঢাকা-১০০০' : '69-70, Motijheel Commercial Area, Dhaka-1000'}
            </div>
          </div>

          {/* Col 2: Useful Links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold text-accent-gold tracking-wide">
              {isBangla ? 'গুরুত্বপূর্ণ সংযোগ' : 'Important Links'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-green-200">
              <li>
                <a href="https://moedu.gov.bd/" target="_blank" rel="noreferrer" className="hover:text-accent-gold hover:underline">
                  {isBangla ? 'শিক্ষা মন্ত্রণালয় (MoEdu)' : 'Ministry of Education'}
                </a>
              </li>
              <li>
                <a href="https://dpe.gov.bd/" target="_blank" rel="noreferrer" className="hover:text-accent-gold hover:underline">
                  {isBangla ? 'প্রাথমিক শিক্ষা অধিদপ্তর (DPE)' : 'Directorate of Primary Education'}
                </a>
              </li>
              <li>
                <a href="https://dshe.gov.bd/" target="_blank" rel="noreferrer" className="hover:text-accent-gold hover:underline">
                  {isBangla ? 'মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর' : 'Directorate of Secondary & Higher Education'}
                </a>
              </li>
              <li>
                <a href="https://bangladesh.gov.bd/" target="_blank" rel="noreferrer" className="hover:text-accent-gold hover:underline">
                  {isBangla ? 'জাতীয় তথ্য বাতায়ন' : 'Bangladesh National Portal'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Government Hotlines */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold text-accent-gold tracking-wide">
              {isBangla ? 'সরকারি সেবা হটলাইন' : 'National Hotlines'}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-red-700 text-white font-mono text-xs font-bold px-2 py-1 rounded">
                  ৩৩৩
                </span>
                <span className="text-xs text-green-200">
                  {isBangla ? 'জাতীয় তথ্য ও সেবা' : 'National Service Portal'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-700 text-white font-mono text-xs font-bold px-2 py-1 rounded">
                  ৯৯৯
                </span>
                <span className="text-xs text-green-200">
                  {isBangla ? 'জরুরি সেবা' : 'National Emergency Service'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-700 text-white font-mono text-xs font-bold px-2 py-1 rounded">
                  ১৬২২২
                </span>
                <span className="text-xs text-green-200">
                  {isBangla ? 'শিক্ষা তথ্য হটলাইন' : 'Education Information'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright and warning details */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-green-300">
          <p>
            &copy; 2026 {isBangla ? 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড।' : 'National Curriculum & Textbook Board (NCTB).'} {isBangla ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}
          </p>
          <p className="flex items-center gap-1">
            <span>{isBangla ? 'কারিগরি সহায়তায়: ' : 'Powered by: '}</span>
            <span className="text-accent-gold hover:underline cursor-pointer">
              {isBangla ? 'এনসিটিবি এআই ইউনিট' : 'NCTB AI Unit'}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
