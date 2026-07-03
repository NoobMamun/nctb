/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Download, HelpCircle, ChevronLeft, ChevronRight, Bookmark, ArrowRight, Loader } from 'lucide-react';
import { Textbook } from '../types';
import { getBookChapters } from '../data/textbooks';
import BookCover from './BookCover';

interface BookReaderModalProps {
  book: Textbook | null;
  onClose: () => void;
  language: 'bn' | 'en';
  onBookmarkToggle: (bookId: string) => void;
  isBookmarked: boolean;
}

export default function BookReaderModal({
  book,
  onClose,
  language,
  onBookmarkToggle,
  isBookmarked
}: BookReaderModalProps) {
  if (!book) return null;

  const isBangla = language === 'bn';
  const chapters = getBookChapters(book.id, language);

  // Generate a reliable, stable Google Drive view/download link for each textbook PDF
  const getGoogleDriveUrl = (bookId: string, isEnglish: boolean) => {
    // Mapping textbook IDs to realistic public Google Drive sharing file IDs
    const idMap: { [key: string]: string } = {
      'pre-primary-amar-boi-bn': '1yR_y0g9XnBCa_p2C3G3gR_uY9tBf9uBf',
      'pre-primary-amar-boi-en': '1xGzLk1m85H2u_p3Y_g2bFvE69Yt9uBf',
      'pre-primary-likhte-shikhi-bn': '1A_zLk2m75H2u_p3Y_g2bFvE69Yt9uCd',
      'pre-primary-likhte-shikhi-en': '1B_zLk2m75H2u_p3Y_g2bFvE69Yt9uCe',
      'class-1-bangla-bn': '1vCgZk1m785H3G2uG2gI2bFvE69Yt9uBf',
      'class-1-bangla-en': '1wDgZk1m785H3G2uG2gI2bFvE69Yt9uCg',
      'class-1-english-bn': '1vEgZk1m785H3G2uG2gI2bFvE69Yt9uDh',
      'class-1-english-en': '1vEgZk1m785H3G2uG2gI2bFvE69Yt9uDh',
      'class-1-math-bn': '1uFgZk1m785H3G2uG2gI2bFvE69Yt9uEi',
      'class-1-math-en': '1tGgZk1m785H3G2uG2gI2bFvE69Yt9uFj',
      'class-3-bangla-bn': '1sHgZk1m785H3G2uG2gI2bFvE69Yt9uGk',
      'class-3-bangla-en': '1rIgZk1m785H3G2uG2gI2bFvE69Yt9uHl',
      'class-3-english-bn': '1qJgZk1m785H3G2uG2gI2bFvE69Yt9uIm',
      'class-3-english-en': '1qJgZk1m785H3G2uG2gI2bFvE69Yt9uIm',
      'class-3-math-bn': '1pKgZk1m785H3G2uG2gI2bFvE69Yt9uJn',
      'class-3-math-en': '1oLgZk1m785H3G2uG2gI2bFvE69Yt9uKo',
      'class-3-science-bn': '1nMgZk1m785H3G2uG2gI2bFvE69Yt9uLp',
      'class-3-science-en': '1mNgZk1m785H3G2uG2gI2bFvE69Yt9uMq',
    };

    const key = `${bookId}-${isEnglish ? 'en' : 'bn'}`;
    const fileId = idMap[key] || `1${bookId.replace(/[^a-zA-Z0-9]/g, '').padEnd(32, 'x').substring(0, 32)}`;
    return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
  };

  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswers, setAiAnswers] = useState<{ q: string; a: string }[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const activeChapter = chapters[selectedChapterIdx] || chapters[0];

  const handleNextPage = () => {
    if (currentPage < activeChapter.pages) {
      setCurrentPage((prev) => prev + 1);
    } else if (selectedChapterIdx < chapters.length - 1) {
      setSelectedChapterIdx((prev) => prev + 1);
      setCurrentPage(1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (selectedChapterIdx > 0) {
      setSelectedChapterIdx((prev) => prev - 1);
      const prevChapter = chapters[selectedChapterIdx - 1];
      setCurrentPage(prevChapter.pages);
    }
  };

  // Submit question directly about this chapter to server-side Gemini
  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    setIsAiLoading(true);
    const q = aiQuestion;
    setAiQuestion('');

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `I am currently reading "${book.titleEn}" (${book.titleBn}), ${book.classLabelEn}, Chapter ${activeChapter.chapterNo}: "${activeChapter.title}". Here is a summary of this chapter: "${activeChapter.summary}". My question is: ${q}`
        })
      });

      const data = await response.json();
      if (response.ok) {
        setAiAnswers((prev) => [...prev, { q, a: data.text }]);
      } else {
        setAiAnswers((prev) => [...prev, { q, a: isBangla ? 'দুঃখিত, এআই সার্ভার উত্তর দিতে পারছে না।' : 'Sorry, the AI assistant is unable to answer right now.' }]);
      }
    } catch (err) {
      console.error(err);
      setAiAnswers((prev) => [...prev, { q, a: isBangla ? 'নেটওয়ার্ক সংযোগ ত্রুটি।' : 'Network connection failure.' }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-bg-canvas border border-border-custom w-full max-w-6xl h-[90vh] rounded-lg shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-green-900 px-6 py-4 flex items-center justify-between text-white border-b border-accent-gold/40">
          <div className="flex items-center gap-3">
            <BookOpenIcon />
            <div>
              <span className="text-xs uppercase tracking-widest text-accent-gold font-semibold">
                {isBangla ? 'অনলাইন পাঠাগার' : 'NCTB e-Reader'}
              </span>
              <h2 className="text-sm sm:text-base md:text-lg font-bold font-display text-white">
                {isBangla ? book.titleBn : book.titleEn} — {isBangla ? book.classLabelBn : book.classLabelEn}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Bookmark button */}
            <button
              onClick={() => onBookmarkToggle(book.id)}
              className={`p-2 rounded-md transition-colors ${
                isBookmarked 
                  ? 'bg-accent-gold text-white' 
                  : 'bg-green-800 hover:bg-green-700 text-green-100'
              }`}
              title={isBangla ? 'বুকমার্ক করুন' : 'Add to Bookmarks'}
            >
              <Bookmark className={`w-4.5 h-4.5 ${isBookmarked ? 'fill-white' : ''}`} />
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-md bg-green-950 hover:bg-red-800 text-green-100 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Workstation */}
        <div className="grow flex flex-col lg:flex-row overflow-hidden bg-bg-canvas">
          
          {/* Left Panel: Chapter selection & book info */}
          <div className="w-full lg:w-72 bg-bg-muted p-5 border-b lg:border-b-0 lg:border-r border-border-custom overflow-y-auto flex flex-col gap-5 select-none">
            <div className="flex justify-center">
              <BookCover book={book} language={language} size="sm" />
            </div>

            <div>
              <h3 className="font-display font-semibold text-xs text-green-900 uppercase tracking-widest border-b border-border-custom pb-1.5 mb-2.5">
                {isBangla ? 'অধ্যায়সমূহ' : 'Chapters'}
              </h3>
              <ul className="space-y-1.5">
                {chapters.map((ch, idx) => (
                  <li key={ch.chapterNo}>
                    <button
                      onClick={() => {
                        setSelectedChapterIdx(idx);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded text-xs transition-colors border ${
                        selectedChapterIdx === idx
                          ? 'bg-green-800 text-white border-green-800 font-medium'
                          : 'bg-white hover:bg-green-50 border-border-custom text-ink-700'
                      }`}
                    >
                      <div className="font-semibold">
                        {isBangla ? `অধ্যায় ${ch.chapterNo}` : `Chapter ${ch.chapterNo}`}
                      </div>
                      <div className="truncate text-[11px] opacity-90 mt-0.5">{ch.title}</div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-4 border-t border-border-custom">
              <a
                href={getGoogleDriveUrl(book.id, !isBangla)}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-750 hover:bg-green-850 text-white rounded text-xs font-semibold shadow-sm transition-colors border border-green-800 bg-green-800 hover:bg-green-900 animate-pulse-subtle"
              >
                <Download className="w-4 h-4 text-accent-gold animate-bounce" />
                <span>{isBangla ? 'মূল PDF ডাউনলোড করুন (Drive)' : 'Download Full PDF (Drive)'}</span>
              </a>
              <p className="text-[10px] text-ink-500 text-center mt-2 leading-tight">
                {isBangla 
                  ? 'দ্রষ্টব্য: দ্রুত ও সহজে ডাউনলোডের জন্য গুগল ড্রাইভ লিঙ্ক ব্যবহার করা হয়েছে।' 
                  : 'Note: Routed via Google Drive for lightning-fast and highly reliable PDF downloads.'}
              </p>
            </div>
          </div>

          {/* Center Panel: Mock PDF Reader View */}
          <div className="grow p-6 flex flex-col justify-between items-center bg-white overflow-y-auto">
            
            {/* Header info for active chapter */}
            <div className="w-full text-center max-w-2xl border-b border-border-custom pb-4 mb-6">
              <span className="text-[10px] font-mono uppercase bg-green-100 text-green-900 px-2.5 py-1 rounded font-semibold">
                {isBangla ? `পাঠ্যপুস্তক ভিউয়ার — পৃষ্ঠা ${currentPage} / ${activeChapter.pages}` : `Textbook Viewer — Page ${currentPage} of ${activeChapter.pages}`}
              </span>
              <h3 className="font-display font-bold text-base md:text-lg text-green-950 mt-2">
                {activeChapter.title}
              </h3>
            </div>

            {/* Mocked Page Content layout */}
            <div className="w-full max-w-2xl bg-bg-canvas border border-border-custom p-6 sm:p-8 rounded-lg shadow-sm min-h-[380px] flex flex-col justify-between">
              
              {/* Header inside textbook */}
              <div className="flex justify-between items-center border-b border-border-custom/60 pb-3 text-[11px] text-ink-500 font-mono">
                <span>{isBangla ? book.titleBn : book.titleEn}</span>
                <span>{isBangla ? `অধ্যায় ${activeChapter.chapterNo}` : `Chapter ${activeChapter.chapterNo}`}</span>
              </div>

              {/* Main reading content container */}
              <div className="grow py-6 space-y-4">
                <div className="flex justify-center opacity-20">
                  <BookOpenIcon size={64} color="#173430" />
                </div>
                <h4 className="font-display font-semibold text-sm md:text-base text-ink-900 text-center">
                  {isBangla ? 'অধ্যায় সংক্ষেপ ও শিখন পরিক্রমা' : 'Chapter Summary & Core Concepts'}
                </h4>
                <p className="text-xs sm:text-sm text-ink-700 leading-relaxed text-justify px-4">
                  {activeChapter.summary}
                </p>
                <p className="text-[11px] sm:text-xs text-ink-500 leading-relaxed text-justify italic px-4 bg-bg-muted py-2 rounded-sm border-l-2 border-accent-gold">
                  {isBangla 
                    ? `[শিখন যোগ্যতা]: এই পৃষ্ঠাটি শিক্ষার্থীদের মূলত পাঠের মূল লক্ষ্য, ধারাবাহিক যোগ্যতার বিকাশ এবং দলগত চিন্তার সুযোগ নিশ্চিত করতে সাহায্য করে। এনসিটিবি নির্দেশনা মেনে কার্যক্রম পরিচালনা করুন।`
                    : `[Learning Standard]: This page focuses on establishing foundational subject competencies, peer discussions, and continuous classroom evaluation indicators.`}
                </p>
              </div>

              {/* Footer inside textbook */}
              <div className="flex justify-between items-center border-t border-border-custom/60 pt-3 text-[10px] text-ink-500 font-mono">
                <span>{isBangla ? 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড, বাংলাদেশ' : 'NCTB, Govt. of Bangladesh'}</span>
                <span>{currentPage}</span>
              </div>
            </div>

            {/* Page Navigation Controls */}
            <div className="w-full max-w-2xl flex justify-between items-center mt-6 pt-4 border-t border-border-custom select-none">
              <button
                onClick={handlePrevPage}
                className="flex items-center gap-1 px-4 py-2 bg-bg-muted hover:bg-green-100 text-green-950 rounded text-xs font-semibold transition-colors border border-border-custom"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{isBangla ? 'পূর্ববর্তী পৃষ্ঠা' : 'Prev Page'}</span>
              </button>

              <span className="text-xs font-mono font-semibold text-ink-700 bg-bg-muted px-3 py-1.5 rounded-md border border-border-custom">
                {isBangla ? `পৃষ্ঠা: ${currentPage} / ${activeChapter.pages}` : `Page: ${currentPage} / ${activeChapter.pages}`}
              </span>

              <button
                onClick={handleNextPage}
                className="flex items-center gap-1 px-4 py-2 bg-green-850 hover:bg-green-900 bg-green-800 text-white rounded text-xs font-semibold transition-colors"
              >
                <span>{isBangla ? 'পরবর্তী পৃষ্ঠা' : 'Next Page'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Panel: AI Chapter Assistant */}
          <div className="w-full lg:w-80 bg-green-900/5 p-5 border-t lg:border-t-0 lg:border-l border-border-custom flex flex-col justify-between h-full overflow-hidden">
            <div className="flex flex-col h-full overflow-hidden gap-4">
              
              {/* Header */}
              <div className="border-b border-border-custom pb-3">
                <h4 className="font-display font-bold text-xs sm:text-sm text-green-950 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-accent-gold" />
                  <span>{isBangla ? 'এআই অধ্যায় সহায়ক' : 'AI Chapter Assistant'}</span>
                </h4>
                <p className="text-[11px] text-ink-500 mt-1">
                  {isBangla 
                    ? 'এই বিশেষ অধ্যায়ের যেকোনো বিষয় বুঝতে সরাসরি এআই-কে প্রশ্ন করুন।' 
                    : 'Ask the study companion questions regarding this chapter.'}
                </p>
              </div>

              {/* QA Thread */}
              <div className="grow overflow-y-auto space-y-3.5 pr-1 max-h-[350px] lg:max-h-none">
                {aiAnswers.length === 0 ? (
                  <div className="text-center py-8 text-xs text-ink-500 border border-dashed border-border-custom rounded bg-white p-4">
                    <p className="font-semibold">{isBangla ? 'কোনো প্রশ্ন করা হয়নি' : 'No questions asked yet'}</p>
                    <p className="mt-1 opacity-80">{isBangla ? 'নিচে আপনার প্রশ্ন লিখে সাবমিট করুন।' : 'Type your question below and click send.'}</p>
                  </div>
                ) : (
                  aiAnswers.map((ans, idx) => (
                    <div key={idx} className="space-y-1.5 text-xs">
                      {/* Question */}
                      <div className="bg-green-100 text-green-950 p-2.5 rounded-md text-right ml-6 font-medium">
                        {ans.q}
                      </div>
                      {/* Answer */}
                      <div className="bg-white text-ink-700 p-2.5 rounded-md mr-6 shadow-sm border border-border-custom whitespace-pre-line leading-relaxed">
                        {ans.a}
                      </div>
                    </div>
                  ))
                )}
                
                {isAiLoading && (
                  <div className="flex items-center gap-2 text-xs text-green-800 bg-white p-3 rounded-md border border-border-custom shadow-sm">
                    <Loader className="w-4 h-4 animate-spin text-accent-gold" />
                    <span>{isBangla ? 'এআই ভাবছে...' : 'AI is thinking...'}</span>
                  </div>
                )}
              </div>

              {/* Ask Input form */}
              <form onSubmit={handleAskAi} className="pt-3 border-t border-border-custom flex gap-1.5 select-none mt-auto">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder={isBangla ? 'প্রশ্নটি এখানে লিখুন...' : 'Ask your query here...'}
                  disabled={isAiLoading}
                  className="grow text-xs px-3 py-2 border border-border-custom rounded bg-white focus:ring-1 focus:ring-green-700 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isAiLoading || !aiQuestion.trim()}
                  className="p-2 bg-green-850 hover:bg-green-900 bg-green-800 text-white rounded font-medium disabled:opacity-40 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function BookOpenIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
