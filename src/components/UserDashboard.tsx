/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Bookmark, ClipboardList, PenTool, BookOpen, Trash2, Calendar, FileText, CheckCircle } from 'lucide-react';
import { Textbook } from '../types';
import BookCover from './BookCover';
import { TEXTBOOKS } from '../data/textbooks';

interface UserDashboardProps {
  language: 'bn' | 'en';
  onBookSelect: (book: Textbook) => void;
  bookmarkedIds: string[];
  onBookmarkToggle: (bookId: string) => void;
}

export default function UserDashboard({
  language,
  onBookSelect,
  bookmarkedIds,
  onBookmarkToggle
}: UserDashboardProps) {
  const isBangla = language === 'bn';
  const [textbooks, setTextbooks] = useState<Textbook[]>(TEXTBOOKS);
  const [notepadText, setNotepadText] = useState(() => {
    return localStorage.getItem('nctb_study_notes') || '';
  });

  // Load textbooks to cross-reference bookmarks
  useEffect(() => {
    async function loadBooks() {
      try {
        const res = await fetch('/api/textbooks');
        const data = await res.json();
        if (data.textbooks) {
          setTextbooks(data.textbooks);
        }
      } catch (err) {
        console.warn('API fetch textbooks failed in Dashboard, falling back to static TEXTBOOKS data:', err);
      }
    }
    loadBooks();
  }, []);

  // Save notes to localStorage
  const handleSaveNotes = (val: string) => {
    setNotepadText(val);
    localStorage.setItem('nctb_study_notes', val);
  };

  const bookmarkedBooks = textbooks.filter((b) => bookmarkedIds.includes(b.id));

  // Simulated study targets progress
  const [studyTargets, setStudyTargets] = useState(() => {
    const saved = localStorage.getItem('nctb_study_targets');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'target-1', titleBn: '৯ম শ্রেণীর পদার্থবিজ্ঞান ১ম অধ্যায় রিভিশন', titleEn: 'Class 9 Physics Chapter 1 revision', done: true },
      { id: 'target-2', titleBn: '৬ষ্ঠ শ্রেণীর গণিত অনুশীলনী ২.৩ সমাধান', titleEn: 'Class 6 Math Exercise 2.3 solving', done: false },
      { id: 'target-3', titleBn: 'এআই সহকারী ব্যবহার করে ইংরেজি লেসন প্ল্যান তৈরি', titleEn: 'Generate English lesson plan using AI Companion', done: false }
    ];
  });

  const toggleTarget = (id: string) => {
    const updated = studyTargets.map((t: any) => t.id === id ? { ...t, done: !t.done } : t);
    setStudyTargets(updated);
    localStorage.setItem('nctb_study_targets', JSON.stringify(updated));
  };

  const [newTargetText, setNewTargetText] = useState('');

  const handleAddTarget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTargetText.trim()) return;

    const newTarget = {
      id: `target-${Date.now()}`,
      titleBn: newTargetText,
      titleEn: newTargetText,
      done: false
    };

    const updated = [...studyTargets, newTarget];
    setStudyTargets(updated);
    localStorage.setItem('nctb_study_targets', JSON.stringify(updated));
    setNewTargetText('');
  };

  const handleRemoveTarget = (id: string) => {
    const updated = studyTargets.filter((t: any) => t.id !== id);
    setStudyTargets(updated);
    localStorage.setItem('nctb_study_targets', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8 select-none">
      
      {/* Page Header banner per Section 9 */}
      <div className="bg-white border border-border-custom p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-green-950 flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-green-850" />
              <span>{isBangla ? 'আমার ডিজিটাল স্টাডি রুম' : 'My Personal Study Room'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-ink-700 mt-1">
              {isBangla
                ? 'আপনার বুকমার্ক করা পাঠ্যপুস্তক, অধ্যায় ভিত্তিক নোটখাতা এবং দৈনিক পড়া বা লেসন প্ল্যানের লক্ষ্যমাত্রা এক নজরে এখানে পরিচালনা করুন।'
                : 'Manage your bookmarked textbooks, digital note scribbler, and custom daily lessons or teaching checkmarks.'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Center Columns: Bookmarks & notepad split */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Bookmarks Section */}
          <div className="bg-white border border-border-custom rounded-lg p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base sm:text-lg text-green-950 flex items-center gap-2 border-b border-border-custom pb-3">
              <Bookmark className="w-5 h-5 text-accent-gold fill-accent-gold" />
              <span>{isBangla ? 'বুকমার্ক করা পাঠ্যপুস্তকসমূহ' : 'My Saved Textbooks'}</span>
            </h3>

            {bookmarkedBooks.length === 0 ? (
              <div className="text-center py-12 text-xs sm:text-sm text-ink-500 border border-dashed border-border-custom rounded-md p-4">
                <p className="font-semibold">{isBangla ? 'কোনো বই বুকমার্ক করা হয়নি' : 'No saved books yet'}</p>
                <p className="mt-1 opacity-80">
                  {isBangla 
                    ? 'পাঠ্যপুস্তক লাইব্রেরি থেকে আপনার প্রয়োজনীয় বইগুলোর পাশে থাকা বুকমার্ক আইকনে ক্লিক করুন।' 
                    : 'Click on the bookmark icon next to any book in the library to save it here for fast retrieval.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {bookmarkedBooks.map((book) => (
                  <div
                    key={book.id}
                    className="border border-border-custom rounded-md overflow-hidden bg-bg-canvas flex flex-col justify-between hover:shadow-md transition-shadow group"
                  >
                    <div className="p-4 flex justify-center items-center bg-bg-muted border-b border-border-custom">
                      <BookCover book={book} language={language} size="sm" />
                    </div>
                    <div className="p-3.5 space-y-2">
                      <div className="truncate">
                        <h4 className="font-display font-bold text-xs sm:text-sm text-ink-900 line-clamp-1">
                          {isBangla ? book.titleBn : book.titleEn}
                        </h4>
                        <span className="text-[10px] text-ink-500 block">{isBangla ? book.classLabelBn : book.classLabelEn}</span>
                      </div>
                      
                      <div className="flex gap-1">
                        <button
                          onClick={() => onBookSelect(book)}
                          className="grow flex items-center justify-center gap-1 py-1.5 bg-green-800 hover:bg-green-900 text-white rounded text-[11px] font-semibold transition-colors focus:outline-none"
                        >
                          <BookOpen className="w-3 h-3 text-accent-gold" />
                          <span>{isBangla ? 'বইটি পড়ুন' : 'Read book'}</span>
                        </button>
                        <button
                          onClick={() => onBookmarkToggle(book.id)}
                          className="p-1.5 bg-white border border-border-custom hover:bg-red-50 hover:text-red-600 rounded text-ink-500 transition-colors focus:outline-none"
                          title={isBangla ? 'বুকমার্ক থেকে মুছুন' : 'Remove bookmark'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Scribe Note Notepad Scratchpad */}
          <div className="bg-white border border-border-custom rounded-lg p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base sm:text-lg text-green-950 flex items-center gap-2 border-b border-border-custom pb-3">
              <PenTool className="w-5 h-5 text-accent-gold" />
              <span>{isBangla ? 'আমার শিক্ষা নোটপ্যাড' : 'My Study Notepad & Scribbler'}</span>
            </h3>
            <p className="text-xs text-ink-500">
              {isBangla 
                ? 'আপনার অধ্যয়নের নোট বা শিক্ষক পরিকল্পনা এখানে লিখে রাখুন। এটি আপনার ব্রাউজারে স্বয়ংক্রিয়ভাবে সংরক্ষিত থাকবে।' 
                : 'Scribble down curriculum summaries, teaching notes, or school exam reminders. Saved automatically on this browser.'}
            </p>
            <textarea
              value={notepadText}
              onChange={(e) => handleSaveNotes(e.target.value)}
              placeholder={isBangla ? 'এখানে আপনার নোট লিখতে শুরু করুন...' : 'Scribble your educational drafts here...'}
              className="w-full min-h-[160px] p-4 text-xs sm:text-sm text-ink-900 border border-border-custom rounded bg-bg-canvas font-sans focus:ring-1 focus:ring-green-700 focus:outline-none whitespace-pre-wrap leading-relaxed"
            />
            <div className="flex justify-between items-center text-[10px] text-ink-500 select-none">
              <span>{notepadText.length} {isBangla ? 'বর্ণ' : 'characters'}</span>
              <span>{isBangla ? 'স্বয়ংক্রিয়ভাবে সংরক্ষিত' : 'Auto-saved locally'}</span>
            </div>
          </div>

        </div>

        {/* Right Column: Daily checkpoints checkmark planner */}
        <div className="bg-white border border-border-custom rounded-lg p-6 shadow-sm flex flex-col justify-between h-fit space-y-4">
          <div className="space-y-4">
            <h3 className="font-display font-bold text-base sm:text-lg text-green-950 flex items-center gap-2 border-b border-border-custom pb-3">
              <Calendar className="w-5 h-5 text-accent-gold" />
              <span>{isBangla ? 'দৈনিক লক্ষ্য ও পাঠপরিকল্পনা' : 'Daily Study Checkmarks'}</span>
            </h3>

            {/* Checklist Item Adding Form */}
            <form onSubmit={handleAddTarget} className="flex gap-1.5 select-none">
              <input
                type="text"
                value={newTargetText}
                onChange={(e) => setNewTargetText(e.target.value)}
                placeholder={isBangla ? 'নতুন কাজ যোগ করুন...' : 'Add new target...'}
                className="grow text-xs px-3 py-2 border border-border-custom rounded bg-bg-canvas focus:ring-1 focus:ring-green-700 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!newTargetText.trim()}
                className="px-3 py-2 bg-green-800 hover:bg-green-900 text-white rounded text-xs font-semibold disabled:opacity-40 transition-colors focus:outline-none"
              >
                {isBangla ? 'যোগ করুন' : 'Add'}
              </button>
            </form>

            {/* Checkmark planner scroll list */}
            <ul className="space-y-2 pt-2">
              {studyTargets.map((target: any) => (
                <li
                  key={target.id}
                  className="flex items-center justify-between p-3 border border-border-custom rounded bg-bg-canvas hover:border-green-300 transition-colors gap-2"
                >
                  <label className="flex items-center gap-2.5 cursor-pointer grow text-xs text-ink-700 font-medium">
                    <input
                      type="checkbox"
                      checked={target.done}
                      onChange={() => toggleTarget(target.id)}
                      className="w-4 h-4 text-green-850 border-border-custom rounded focus:ring-green-700 accent-green-800"
                    />
                    <span className={target.done ? 'line-through text-ink-500 opacity-70' : 'text-ink-900'}>
                      {isBangla ? target.titleBn : target.titleEn}
                    </span>
                  </label>
                  
                  <button
                    onClick={() => handleRemoveTarget(target.id)}
                    className="p-1 text-ink-500 hover:text-red-600 transition-colors focus:outline-none"
                    title={isBangla ? 'কাজটি মুছুন' : 'Delete checkmark'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-border-custom bg-green-100 p-3 rounded-md text-[11px] text-green-950 flex items-start gap-2 select-none">
            <CheckCircle className="w-4 h-4 shrink-0 text-green-800 mt-0.5" />
            <div>
              <p className="font-semibold">{isBangla ? 'শিক্ষা সেশন ট্র্যাকিং' : 'Study Room guidelines'}</p>
              <p className="mt-0.5 opacity-90 leading-relaxed">
                {isBangla 
                  ? 'আপনার স্টাডি রুমের বুকমার্ক করা বইগুলো সহজে ব্যবহার করুন এবং এনসিটিবি এআই সহকারীকে সাথে নিয়ে সুন্দর সেশন পরিচালনা করুন।' 
                  : 'Maintain structured checklist schedules to finish classes textbook curricula on time.'}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
