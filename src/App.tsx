/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TextbookList from './components/TextbookList';
import CurriculumGuide from './components/CurriculumGuide';
import NoticeBoard from './components/NoticeBoard';
import AiCompanion from './components/AiCompanion';
import UserDashboard from './components/UserDashboard';
import BookReaderModal from './components/BookReaderModal';
import { Textbook } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('library');
  const [language, setLanguage] = useState<'bn' | 'en'>(() => {
    return (localStorage.getItem('nctb_portal_lang') as 'bn' | 'en') || 'bn';
  });
  
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('nctb_bookmarked_ids');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedBook, setSelectedBook] = useState<Textbook | null>(null);

  // Sync language selection to localStorage
  useEffect(() => {
    localStorage.setItem('nctb_portal_lang', language);
  }, [language]);

  // Sync bookmarked IDs to localStorage
  const handleBookmarkToggle = (bookId: string) => {
    setBookmarkedIds((prev) => {
      const updated = prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId];
      localStorage.setItem('nctb_bookmarked_ids', JSON.stringify(updated));
      return updated;
    });
  };

  const isBangla = language === 'bn';

  // Return active component panel
  const renderTabContent = () => {
    switch (activeTab) {
      case 'library':
        return (
          <TextbookList
            language={language}
            onBookSelect={setSelectedBook}
            bookmarkedIds={bookmarkedIds}
            onBookmarkToggle={handleBookmarkToggle}
          />
        );
      case 'curriculum':
        return <CurriculumGuide language={language} />;
      case 'notices':
        return <NoticeBoard language={language} />;
      case 'ai-companion':
        return <AiCompanion language={language} />;
      case 'dashboard':
        return (
          <UserDashboard
            language={language}
            onBookSelect={setSelectedBook}
            bookmarkedIds={bookmarkedIds}
            onBookmarkToggle={handleBookmarkToggle}
          />
        );
      default:
        return (
          <TextbookList
            language={language}
            onBookSelect={setSelectedBook}
            bookmarkedIds={bookmarkedIds}
            onBookmarkToggle={handleBookmarkToggle}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-canvas font-sans selection:bg-green-200 selection:text-green-950">
      
      {/* Redesigned Navigation bar per Section 9 */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Container Workspace */}
      <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Interactive PDF Book study platform Modal Popup */}
      <AnimatePresence>
        {selectedBook && (
          <BookReaderModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            language={language}
            isBookmarked={bookmarkedIds.includes(selectedBook.id)}
            onBookmarkToggle={handleBookmarkToggle}
          />
        )}
      </AnimatePresence>

      {/* Formal compliance Footer per Section 3 & 14 */}
      <Footer language={language} />

    </div>
  );
}
