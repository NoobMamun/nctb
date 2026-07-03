/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Textbook {
  id: string;
  titleBn: string;
  titleEn: string;
  class: string; // e.g., 'pre-primary', 'class-1', 'class-3', 'class-5', 'class-6', 'class-9', 'class-11-12'
  classLabelBn: string;
  classLabelEn: string;
  category: 'pre-primary' | 'primary' | 'secondary' | 'higher-secondary';
  subjectBn: string;
  subjectEn: string;
  pdfUrlBangla: string;
  pdfUrlEnglish: string;
  bgColor: string; // Hex code or Tailwind color class for cover visualization
  borderColor: string;
  featured?: boolean;
}

export interface Notice {
  id: string;
  titleBn: string;
  titleEn: string;
  date: string; // YYYY-MM-DD
  memoNo: string;
  pdfUrl: string;
  category: 'general' | 'textbook' | 'curriculum' | 'tender';
  isNew?: boolean;
}

export interface Curriculum {
  id: string;
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  levelBn: string;
  levelEn: string;
  keyPointsBn: string[];
  keyPointsEn: string[];
  pdfUrl: string;
}

export interface Bookmark {
  bookId: string;
  bookmarkedAt: string;
}

export interface StudyProgress {
  bookId: string;
  chaptersCompleted: string[];
  notes: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
