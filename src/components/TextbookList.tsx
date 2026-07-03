/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, Download, Bookmark, Layers, RefreshCw } from 'lucide-react';
import { Textbook } from '../types';
import BookCover from './BookCover';

interface TextbookListProps {
  language: 'bn' | 'en';
  onBookSelect: (book: Textbook) => void;
  bookmarkedIds: string[];
  onBookmarkToggle: (bookId: string) => void;
}

export default function TextbookList({
  language,
  onBookSelect,
  bookmarkedIds,
  onBookmarkToggle
}: TextbookListProps) {
  const isBangla = language === 'bn';
  const [textbooks, setTextbooks] = useState<Textbook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filters states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedVersion, setSelectedVersion] = useState<'all' | 'bn' | 'en'>('all');

  useEffect(() => {
    async function fetchTextbooks() {
      try {
        const res = await fetch('/api/textbooks');
        const data = await res.json();
        if (data.textbooks) {
          setTextbooks(data.textbooks);
        }
      } catch (err) {
        console.error('Error fetching textbooks:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTextbooks();
  }, []);

  // Filter Categories list
  const categories = [
    { id: 'all', labelBn: 'সকল স্তর', labelEn: 'All Levels' },
    { id: 'pre-primary', labelBn: 'প্রাক-প্রাথমিক', labelEn: 'Pre-Primary' },
    { id: 'primary', labelBn: 'প্রাথমিক বিদ্যালয়', labelEn: 'Primary School' },
    { id: 'secondary', labelBn: 'মাধ্যমিক বিদ্যালয়', labelEn: 'Secondary School' },
    { id: 'higher-secondary', labelBn: 'উচ্চ মাধ্যমিক (এইচএসসি)', labelEn: 'Higher Secondary (HSC)' }
  ];

  // Class selection list
  const classes = [
    { id: 'all', labelBn: 'সব শ্রেণী', labelEn: 'All Classes' },
    { id: 'pre-primary', labelBn: 'প্রাক-প্রাথমিক', labelEn: 'Pre-Primary' },
    { id: 'class-1', labelBn: 'প্রথম শ্রেণী (Class 1)', labelEn: 'Class 1' },
    { id: 'class-3', labelBn: 'তৃতীয় শ্রেণী (Class 3)', labelEn: 'Class 3' },
    { id: 'class-5', labelBn: 'পঞ্চম শ্রেণী (Class 5)', labelEn: 'Class 5' },
    { id: 'class-6', labelBn: 'ষষ্ঠ শ্রেণী (Class 6)', labelEn: 'Class 6' },
    { id: 'class-9', labelBn: 'নবম শ্রেণী (Class 9)', labelEn: 'Class 9' },
    { id: 'class-11-12', labelBn: 'একাদশ-দ্বাদশ শ্রেণী (Class 11-12)', labelEn: 'Class 11-12' }
  ];

  const filteredBooks = textbooks.filter((book) => {
    const titleMatch =
      book.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.subjectBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.subjectEn.toLowerCase().includes(searchQuery.toLowerCase());

    const categoryMatch = selectedCategory === 'all' || book.category === selectedCategory;
    const classMatch = selectedClass === 'all' || book.class === selectedClass;
    
    // Check version match
    let versionMatch = true;
    if (selectedVersion === 'bn') {
      versionMatch = !!book.pdfUrlBangla;
    } else if (selectedVersion === 'en') {
      versionMatch = !!book.pdfUrlEnglish;
    }

    return titleMatch && categoryMatch && classMatch && versionMatch;
  });

  return (
    <div className="space-y-8 select-none">
      
      {/* Search and Filters Section per Section 8 & 9 */}
      <div className="bg-white border border-border-custom p-6 rounded-lg shadow-sm">
        <div className="flex flex-col gap-5">
          
          {/* Main search input bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-ink-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBangla ? 'বই বা বিষয়ের নাম দিয়ে খুঁজুন...' : 'Search by book title or subject...'}
              className="w-full pl-11 pr-4 py-3 border border-border-custom rounded-md bg-bg-canvas text-sm text-ink-900 focus:ring-1 focus:ring-green-700 focus:outline-none"
            />
          </div>

          {/* Quick Filters grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Level selector */}
            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-ink-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-accent-gold" />
                <span>{isBangla ? 'শিক্ষার স্তর' : 'Education Level'}</span>
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedClass('all'); // Reset specific class
                }}
                className="w-full px-3 py-2 border border-border-custom rounded-md bg-white text-ink-900 text-xs focus:ring-1 focus:ring-green-700 focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {isBangla ? cat.labelBn : cat.labelEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Class selector */}
            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-ink-700 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-accent-gold" />
                <span>{isBangla ? 'নির্দিষ্ট শ্রেণী' : 'Specific Class'}</span>
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-border-custom rounded-md bg-white text-ink-900 text-xs focus:ring-1 focus:ring-green-700 focus:outline-none"
              >
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {isBangla ? cls.labelBn : cls.labelEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Version selection */}
            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-ink-700 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-accent-gold" />
                <span>{isBangla ? 'ভাষা সংস্করণ' : 'Book Version'}</span>
              </label>
              <div className="grid grid-cols-3 gap-1 bg-bg-canvas p-1 rounded-md border border-border-custom">
                {(['all', 'bn', 'en'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVersion(v)}
                    className={`py-1 rounded text-[11px] font-semibold transition-all focus:outline-none ${
                      selectedVersion === v
                        ? 'bg-green-800 text-white shadow-sm'
                        : 'text-ink-700 hover:bg-white/55'
                    }`}
                  >
                    {v === 'all' ? (isBangla ? 'সব' : 'All') : v === 'bn' ? (isBangla ? 'বাংলা' : 'Bangla') : (isBangla ? 'ইংরেজি' : 'English')}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Grid count stats and active status */}
      <div className="flex justify-between items-center px-2">
        <p className="text-xs sm:text-sm text-ink-700 font-medium">
          {isBangla 
            ? `সর্বমোট ${filteredBooks.length}টি পাঠ্যপুস্তক খুঁজে পাওয়া গেছে` 
            : `Showing ${filteredBooks.length} educational textbooks`}
        </p>
        
        {/* Reset Filters Option */}
        {(searchQuery || selectedCategory !== 'all' || selectedClass !== 'all' || selectedVersion !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedClass('all');
              setSelectedVersion('all');
            }}
            className="text-xs text-accent-gold hover:underline font-semibold focus:outline-none"
          >
            {isBangla ? 'সব ফিল্টার মুছুন' : 'Reset Filters'}
          </button>
        )}
      </div>

      {/* Main Grid View */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-800 rounded-full animate-spin" />
          <p className="text-sm text-ink-700 font-medium">{isBangla ? 'পাঠ্যপুস্তক লাইব্রেরি লোড হচ্ছে...' : 'Loading textbooks library...'}</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-16 bg-white border border-border-custom rounded-lg p-6">
          <p className="text-base text-ink-900 font-semibold">{isBangla ? 'কোনো বই খুঁজে পাওয়া যায়নি' : 'No textbooks found'}</p>
          <p className="text-xs text-ink-500 mt-1">{isBangla ? 'ভিন্ন কোনো নাম বা কি-ওয়ার্ড দিয়ে পুনরায় চেষ্টা করুন।' : 'Try refining your search text or changing level filters.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => {
            const isBookmarked = bookmarkedIds.includes(book.id);
            return (
              <div
                key={book.id}
                className="bg-white border border-border-custom rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-green-400/50 transition-all duration-300 group"
              >
                {/* Book cover visual header */}
                <div className="bg-bg-muted p-5 flex justify-center items-center relative overflow-hidden h-64 border-b border-border-custom">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none" />
                  <div className="transition-transform duration-300 group-hover:scale-102">
                    <BookCover book={book} language={language} size="md" />
                  </div>
                </div>

                {/* Info and action parameters */}
                <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="inline-block text-[10px] font-semibold text-green-950 bg-green-100 px-2 py-0.5 rounded-sm uppercase tracking-wide">
                      {isBangla ? book.classLabelBn : book.classLabelEn}
                    </span>
                    <h4 className="font-display font-bold text-sm sm:text-base text-ink-900 mt-1 line-clamp-1 group-hover:text-green-950">
                      {isBangla ? book.titleBn : book.titleEn}
                    </h4>
                    <p className="text-xs text-ink-500 mt-0.5 font-medium">
                      {isBangla ? book.subjectBn : book.subjectEn}
                    </p>
                  </div>

                  {/* Operational utility action triggers */}
                  <div className="grid grid-cols-4 gap-1.5 select-none pt-2">
                    
                    {/* Read action trigger */}
                    <button
                      onClick={() => onBookSelect(book)}
                      className="col-span-3 flex items-center justify-center gap-1.5 px-3 py-2 bg-green-800 hover:bg-green-900 text-white text-xs font-semibold rounded transition-colors focus:outline-none"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-accent-gold" />
                      <span>{isBangla ? 'পড়ুন (e-Book)' : 'Read e-Book'}</span>
                    </button>

                    {/* Bookmark action toggle */}
                    <button
                      onClick={() => onBookmarkToggle(book.id)}
                      className={`flex items-center justify-center border rounded transition-colors focus:outline-none ${
                        isBookmarked
                          ? 'bg-accent-gold border-accent-gold text-white'
                          : 'bg-white hover:bg-green-50 border-border-custom text-ink-700'
                      }`}
                      title={isBangla ? 'বুকমার্ক করুন' : 'Add to bookmarks'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
                    </button>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
