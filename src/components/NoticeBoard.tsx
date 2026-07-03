/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Search, Download, FileText, Printer, CheckCircle } from 'lucide-react';
import { Notice } from '../types';

interface NoticeBoardProps {
  language: 'bn' | 'en';
}

export default function NoticeBoard({ language }: NoticeBoardProps) {
  const isBangla = language === 'bn';
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    async function fetchNotices() {
      try {
        const res = await fetch('/api/notices');
        const data = await res.json();
        if (data.notices) {
          setNotices(data.notices);
        }
      } catch (err) {
        console.error('Error fetching notices:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotices();
  }, []);

  const categories = [
    { id: 'all', labelBn: 'সকল নোটিশ', labelEn: 'All Notices' },
    { id: 'textbook', labelBn: 'পাঠ্যপুস্তক বিতরণ', labelEn: 'Textbook Distribution' },
    { id: 'curriculum', labelBn: 'শিক্ষাক্রম ও মূল্যায়ন', labelEn: 'Curriculum & Evaluation' },
    { id: 'general', labelBn: 'সাধারণ বিজ্ঞপ্তি', labelEn: 'General Notices' },
    { id: 'tender', labelBn: 'দরপত্র সংক্রান্ত', labelEn: 'Tenders & Procurements' }
  ];

  const filteredNotices = notices.filter((notice) => {
    const titleMatch =
      notice.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.memoNo.toLowerCase().includes(searchQuery.toLowerCase());

    const catMatch = selectedCategory === 'all' || notice.category === selectedCategory;

    return titleMatch && catMatch;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 select-none">
      
      {/* Notice Board Banner/Intro per Section 9 */}
      <div className="bg-white border-l-4 border-accent-gold bg-gradient-to-r from-bg-muted to-white p-6 rounded-r-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-green-950 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-green-800" />
              <span>{isBangla ? 'এনসিটিবি অফিশিয়াল নোটিশ বোর্ড' : 'NCTB Official Notice Board'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-ink-700 mt-1 max-w-2xl leading-relaxed">
              {isBangla
                ? 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড কর্তৃক প্রকাশিত সকল জরুরি বিজ্ঞপ্তি, নতুন পাঠ্যক্রম রূপরেখা, পাঠ্যপুস্তক বিতরণ এবং শিক্ষাক্রম সংশোধন সংক্রান্ত নির্দেশনা এখানে পাওয়া যাবে।'
                : 'Find all official announcements, instructions on textbook distribution, curricula reform instructions, and public procurement notices published by NCTB.'}
            </p>
          </div>
          
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-muted hover:bg-green-100 border border-border-custom text-green-950 rounded text-xs font-semibold shadow-sm transition-colors focus:outline-none"
          >
            <Printer className="w-4 h-4 text-accent-gold" />
            <span>{isBangla ? 'প্রিন্ট করুন' : 'Print Board'}</span>
          </button>
        </div>
      </div>

      {/* Control filters bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white border border-border-custom p-4 rounded-lg shadow-sm">
        
        {/* Search */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3.5 top-2.5 w-4.5 h-4.5 text-ink-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBangla ? 'স্মারক নম্বর বা বিজ্ঞপ্তি দিয়ে খুঁজুন...' : 'Search by memo reference or notice title...'}
            className="w-full pl-10 pr-4 py-2 border border-border-custom rounded-md bg-bg-canvas text-xs text-ink-900 focus:ring-1 focus:ring-green-700 focus:outline-none"
          />
        </div>

        {/* Categories select filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 border border-border-custom rounded-md bg-white text-ink-900 text-xs focus:ring-1 focus:ring-green-700 focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {isBangla ? cat.labelBn : cat.labelEn}
            </option>
          ))}
        </select>

      </div>

      {/* Main Table view of notices per Section 4 & 9 */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-8 h-8 border-3 border-green-200 border-t-green-800 rounded-full animate-spin" />
          <p className="text-sm text-ink-700 font-medium">{isBangla ? 'বিজ্ঞপ্তিসমূহ লোড হচ্ছে...' : 'Loading notices board...'}</p>
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="text-center py-16 bg-white border border-border-custom rounded-lg p-6">
          <p className="text-base text-ink-900 font-semibold">{isBangla ? 'কোনো নোটিশ খুঁজে পাওয়া যায়নি' : 'No notices match this filter'}</p>
          <p className="text-xs text-ink-500 mt-1">{isBangla ? 'ভিন্ন কোনো স্মারক নম্বর বা শিরোনাম ব্যবহার করে খুঁজুন।' : 'Try checking under a different notice category or typing a different memo number.'}</p>
        </div>
      ) : (
        <div className="bg-white border border-border-custom rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-muted border-b border-border-custom select-none text-[11px] sm:text-xs text-green-950 font-semibold font-sans">
                  <th className="px-5 py-4 w-28 text-center">{isBangla ? 'প্রকাশের তারিখ' : 'Publish Date'}</th>
                  <th className="px-5 py-4">{isBangla ? 'স্মারক নম্বর' : 'Memo Reference No.'}</th>
                  <th className="px-5 py-4">{isBangla ? 'বিজ্ঞপ্তির বিষয়' : 'Notice Subject'}</th>
                  <th className="px-5 py-4 w-32 text-center">{isBangla ? 'ডাউনলোড' : 'Download'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-custom text-xs sm:text-sm text-ink-700">
                {filteredNotices.map((notice) => (
                  <tr
                    key={notice.id}
                    className="hover:bg-bg-canvas/45 transition-colors group"
                  >
                    {/* Publish Date in IBM Plex Mono per Section 4 */}
                    <td className="px-5 py-4 whitespace-nowrap text-center font-mono text-xs text-ink-500">
                      {notice.date}
                    </td>

                    {/* Memo Number in IBM Plex Mono per Section 4 */}
                    <td className="px-5 py-4 whitespace-nowrap font-mono text-xs font-medium text-green-800 select-all">
                      {notice.memoNo}
                    </td>

                    {/* Notice Subject Title */}
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-2.5">
                        {notice.isNew && (
                          <span className="shrink-0 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide animate-pulse">
                            {isBangla ? 'নতুন' : 'New'}
                          </span>
                        )}
                        <div>
                          <p className="font-display font-semibold text-ink-900 group-hover:text-green-850 leading-relaxed text-sm">
                            {isBangla ? notice.titleBn : notice.titleEn}
                          </p>
                          <span className="inline-block text-[10px] text-accent-gold mt-1 uppercase tracking-wider font-semibold">
                            {notice.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Download Link */}
                    <td className="px-5 py-4 whitespace-nowrap text-center select-none">
                      <a
                        href={notice.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-900 rounded font-semibold text-xs border border-green-200 hover:border-green-300 transition-colors focus:outline-none"
                      >
                        <Download className="w-3.5 h-3.5 text-accent-gold" />
                        <span>PDF</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Anti-corruption compliance alert banner per Section 9 */}
      <div className="p-4 bg-green-900/5 border-l-4 border-green-800 rounded-r-lg flex gap-3 text-xs text-ink-700 select-none">
        <CheckCircle className="w-5 h-5 text-green-800 shrink-0" />
        <div>
          <h4 className="font-semibold text-green-950">{isBangla ? 'এনসিটিবি শুদ্ধাচার ও নৈতিকতা সেল' : 'NCTB Integrity & Transparency Guidelines'}</h4>
          <p className="mt-0.5 leading-relaxed opacity-95">
            {isBangla
              ? 'এনসিটিবি-র সকল পাঠ্যপুস্তক বিতরণ সম্পূর্ণ বিনামূল্যে এবং সরকারি উদ্যোগে পরিচালিত। পাঠ্যপুস্তক নিয়ে যেকোনো রূপ দুর্নীতি বা অনিয়ম লক্ষ্য করলে অবিলম্বে উপরে উল্লিখিত হটলাইনে বা সরাসরি বোর্ডে অভিযোগ দাখিল করুন।'
              : 'All textbook distributions by NCTB are completely free of charge and fully government-sponsored. To report any illegal trade, plagiarism, or bribery, contact the listed ministry channels immediately.'}
          </p>
        </div>
      </div>

    </div>
  );
}
