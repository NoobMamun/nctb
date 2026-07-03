/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Textbook, Notice, Curriculum } from '../types';

export const TEXTBOOKS: Textbook[] = [
  // Pre-Primary
  {
    id: 'pre-primary-amar-boi',
    titleBn: 'আমার বই (প্রাক-প্রাথমিক)',
    titleEn: 'Amar Boi (Pre-Primary)',
    class: 'pre-primary',
    classLabelBn: 'প্রাক-প্রাথমিক',
    classLabelEn: 'Pre-Primary',
    category: 'pre-primary',
    subjectBn: 'সমন্বিত শিক্ষাক্রম',
    subjectEn: 'Integrated Curriculum',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/7a7fa87d_8f04_46d9_879e_Amar_Boi_Pre_Primary_BN.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/7a7fa87d_8f04_46d9_879e_Amar_Boi_Pre_Primary_EN.pdf',
    bgColor: '#1E3A3A',
    borderColor: '#4C7C68',
    featured: true
  },
  {
    id: 'pre-primary-likhte-shikhi',
    titleBn: 'এসো লিখতে শিখি',
    titleEn: 'Esho Likhte Shikhi',
    class: 'pre-primary',
    classLabelBn: 'প্রাক-প্রাথমিক',
    classLabelEn: 'Pre-Primary',
    category: 'pre-primary',
    subjectBn: 'হাতের লেখা',
    subjectEn: 'Handwriting Guide',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/87ab93b7_Likhte_Shikhi_BN.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/87ab93b7_Likhte_Shikhi_EN.pdf',
    bgColor: '#0A2923',
    borderColor: '#B7D2C2'
  },

  // Primary - Class 1
  {
    id: 'class-1-bangla',
    titleBn: 'আমার বাংলা বই',
    titleEn: 'Amar Bangla Boi',
    class: 'class-1',
    classLabelBn: 'প্রথম শ্রেণী',
    classLabelEn: 'Class 1',
    category: 'primary',
    subjectBn: 'বাংলা',
    subjectEn: 'Bangla',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_1_Bangla_Full.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_1_Bangla_Full_EN.pdf',
    bgColor: '#2E6B4F',
    borderColor: '#D2E7D6',
    featured: true
  },
  {
    id: 'class-1-english',
    titleBn: 'English for Today',
    titleEn: 'English for Today',
    class: 'class-1',
    classLabelBn: 'প্রথম শ্রেণী',
    classLabelEn: 'Class 1',
    category: 'primary',
    subjectBn: 'ইংরেজি',
    subjectEn: 'English',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_1_English_For_Today.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_1_English_For_Today.pdf',
    bgColor: '#2C5C82',
    borderColor: '#EDF4EE'
  },
  {
    id: 'class-1-math',
    titleBn: 'প্রাথমিক গণিত',
    titleEn: 'Elementary Mathematics',
    class: 'class-1',
    classLabelBn: 'প্রথম শ্রেণী',
    classLabelEn: 'Class 1',
    category: 'primary',
    subjectBn: 'গণিত',
    subjectEn: 'Mathematics',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_1_Math_BN.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_1_Math_EN.pdf',
    bgColor: '#B4863C',
    borderColor: '#F3E8D3'
  },

  // Primary - Class 3
  {
    id: 'class-3-bangla',
    titleBn: 'আমার বাংলা বই',
    titleEn: 'Amar Bangla Boi',
    class: 'class-3',
    classLabelBn: 'তৃতীয় শ্রেণী',
    classLabelEn: 'Class 3',
    category: 'primary',
    subjectBn: 'বাংলা',
    subjectEn: 'Bangla',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_3_Bangla.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_3_Bangla_EN.pdf',
    bgColor: '#224E44',
    borderColor: '#B7D2C2'
  },
  {
    id: 'class-3-english',
    titleBn: 'English for Today',
    titleEn: 'English for Today',
    class: 'class-3',
    classLabelBn: 'তৃতীয় শ্রেণী',
    classLabelEn: 'Class 3',
    category: 'primary',
    subjectBn: 'ইংরেজি',
    subjectEn: 'English',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_3_English.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_3_English.pdf',
    bgColor: '#173430',
    borderColor: '#EDF4EE'
  },
  {
    id: 'class-3-math',
    titleBn: 'প্রাথমিক গণিত',
    titleEn: 'Elementary Mathematics',
    class: 'class-3',
    classLabelBn: 'তৃতীয় শ্রেণী',
    classLabelEn: 'Class 3',
    category: 'primary',
    subjectBn: 'গণিত',
    subjectEn: 'Mathematics',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_3_Math_BN.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_3_Math_EN.pdf',
    bgColor: '#4C7C68',
    borderColor: '#D2E7D6'
  },
  {
    id: 'class-3-science',
    titleBn: 'প্রাথমিক বিজ্ঞান',
    titleEn: 'Elementary Science',
    class: 'class-3',
    classLabelBn: 'তৃতীয় শ্রেণী',
    classLabelEn: 'Class 3',
    category: 'primary',
    subjectBn: 'বিজ্ঞান',
    subjectEn: 'Science',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_3_Science_BN.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_3_Science_EN.pdf',
    bgColor: '#2E6B4F',
    borderColor: '#B7D2C2',
    featured: true
  },
  {
    id: 'class-3-bgs',
    titleBn: 'বাংলাদেশ ও বিশ্বপরিচয়',
    titleEn: 'Bangladesh and Global Studies',
    class: 'class-3',
    classLabelBn: 'তৃতীয় শ্রেণী',
    classLabelEn: 'Class 3',
    category: 'primary',
    subjectBn: 'বাংলাদেশ ও বিশ্বপরিচয়',
    subjectEn: 'Bangladesh & Global Studies',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_3_BGS_BN.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_3_BGS_EN.pdf',
    bgColor: '#9C3A2E',
    borderColor: '#EDF4EE'
  },

  // Primary - Class 5
  {
    id: 'class-5-bangla',
    titleBn: 'আমার বাংলা বই',
    titleEn: 'Amar Bangla Boi',
    class: 'class-5',
    classLabelBn: 'পঞ্চম শ্রেণী',
    classLabelEn: 'Class 5',
    category: 'primary',
    subjectBn: 'বাংলা',
    subjectEn: 'Bangla',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_5_Bangla_BN.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_5_Bangla_EN.pdf',
    bgColor: '#173430',
    borderColor: '#D2E7D6'
  },
  {
    id: 'class-5-english',
    titleBn: 'English for Today',
    titleEn: 'English for Today',
    class: 'class-5',
    classLabelBn: 'পঞ্চম শ্রেণী',
    classLabelEn: 'Class 5',
    category: 'primary',
    subjectBn: 'ইংরেজি',
    subjectEn: 'English',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_5_English.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_5_English.pdf',
    bgColor: '#2C5C82',
    borderColor: '#EDF4EE'
  },
  {
    id: 'class-5-math',
    titleBn: 'প্রাথমিক গণিত',
    titleEn: 'Elementary Mathematics',
    class: 'class-5',
    classLabelBn: 'পঞ্চম শ্রেণী',
    classLabelEn: 'Class 5',
    category: 'primary',
    subjectBn: 'গণিত',
    subjectEn: 'Mathematics',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_5_Math_BN.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_5_Math_EN.pdf',
    bgColor: '#B4863C',
    borderColor: '#F3E8D3'
  },
  {
    id: 'class-5-science',
    titleBn: 'প্রাথমিক বিজ্ঞান',
    titleEn: 'Elementary Science',
    class: 'class-5',
    classLabelBn: 'পঞ্চম শ্রেণী',
    classLabelEn: 'Class 5',
    category: 'primary',
    subjectBn: 'বিজ্ঞান',
    subjectEn: 'Science',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_5_Science_BN.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_5_Science_EN.pdf',
    bgColor: '#224E44',
    borderColor: '#B7D2C2'
  },

  // Secondary - Class 6
  {
    id: 'class-6-bangla',
    titleBn: 'বাংলা',
    titleEn: 'Bangla',
    class: 'class-6',
    classLabelBn: 'ষষ্ঠ শ্রেণী',
    classLabelEn: 'Class 6',
    category: 'secondary',
    subjectBn: 'বাংলা',
    subjectEn: 'Bangla',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_6_Bangla.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_6_Bangla_EN.pdf',
    bgColor: '#1E3A3A',
    borderColor: '#87AB93'
  },
  {
    id: 'class-6-english',
    titleBn: 'English',
    titleEn: 'English',
    class: 'class-6',
    classLabelBn: 'ষষ্ঠ শ্রেণী',
    classLabelEn: 'Class 6',
    category: 'secondary',
    subjectBn: 'ইংরেজি',
    subjectEn: 'English',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_6_English.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_6_English.pdf',
    bgColor: '#2C5C82',
    borderColor: '#B7D2C2'
  },
  {
    id: 'class-6-math',
    titleBn: 'গণিত',
    titleEn: 'Mathematics',
    class: 'class-6',
    classLabelBn: 'ষষ্ঠ শ্রেণী',
    classLabelEn: 'Class 6',
    category: 'secondary',
    subjectBn: 'গণিত',
    subjectEn: 'Mathematics',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_6_Mathematics_BN.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_6_Mathematics_EN.pdf',
    bgColor: '#0A2923',
    borderColor: '#D2E7D6',
    featured: true
  },
  {
    id: 'class-6-science-inquiry',
    titleBn: 'বিজ্ঞান (অনুসন্ধানী পাঠ)',
    titleEn: 'Science (Inquiry-Based)',
    class: 'class-6',
    classLabelBn: 'ষষ্ঠ শ্রেণী',
    classLabelEn: 'Class 6',
    category: 'secondary',
    subjectBn: 'বিজ্ঞান',
    subjectEn: 'Science',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_6_Science_Inquiry_BN.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_6_Science_Inquiry_EN.pdf',
    bgColor: '#2E6B4F',
    borderColor: '#EDF4EE'
  },
  {
    id: 'class-6-science-exercise',
    titleBn: 'বিজ্ঞান (অনুশীলন বই)',
    titleEn: 'Science (Exercise Book)',
    class: 'class-6',
    classLabelBn: 'ষষ্ঠ শ্রেণী',
    classLabelEn: 'Class 6',
    category: 'secondary',
    subjectBn: 'বিজ্ঞান',
    subjectEn: 'Science Activity',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_6_Science_Exercise_BN.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_6_Science_Exercise_EN.pdf',
    bgColor: '#4C7C68',
    borderColor: '#B7D2C2'
  },
  {
    id: 'class-6-digital-tech',
    titleBn: 'ডিজিটাল প্রযুক্তি',
    titleEn: 'Digital Technology',
    class: 'class-6',
    classLabelBn: 'ষষ্ঠ শ্রেণী',
    classLabelEn: 'Class 6',
    category: 'secondary',
    subjectBn: 'ডিজিটাল প্রযুক্তি',
    subjectEn: 'Digital Technology',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_6_Digital_Tech_BN.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_6_Digital_Tech_EN.pdf',
    bgColor: '#051E1F',
    borderColor: '#B7D2C2'
  },

  // Secondary - Class 9
  {
    id: 'class-9-bangla',
    titleBn: 'বাংলা',
    titleEn: 'Bangla',
    class: 'class-9',
    classLabelBn: 'নবম শ্রেণী',
    classLabelEn: 'Class 9',
    category: 'secondary',
    subjectBn: 'বাংলা',
    subjectEn: 'Bangla',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_9_Bangla.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_9_Bangla_EN.pdf',
    bgColor: '#173430',
    borderColor: '#D2E7D6'
  },
  {
    id: 'class-9-english',
    titleBn: 'English',
    titleEn: 'English',
    class: 'class-9',
    classLabelBn: 'নবম শ্রেণী',
    classLabelEn: 'Class 9',
    category: 'secondary',
    subjectBn: 'ইংরেজি',
    subjectEn: 'English',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_9_English.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_9_English.pdf',
    bgColor: '#2C5C82',
    borderColor: '#EDF4EE'
  },
  {
    id: 'class-9-math',
    titleBn: 'গণিত',
    titleEn: 'Mathematics',
    class: 'class-9',
    classLabelBn: 'নবম শ্রেণী',
    classLabelEn: 'Class 9',
    category: 'secondary',
    subjectBn: 'গণিত',
    subjectEn: 'Mathematics',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_9_Math.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_9_Math_EN.pdf',
    bgColor: '#B4863C',
    borderColor: '#F3E8D3'
  },
  {
    id: 'class-9-physics',
    titleBn: 'পদার্থবিজ্ঞান',
    titleEn: 'Physics',
    class: 'class-9',
    classLabelBn: 'নবম শ্রেণী',
    classLabelEn: 'Class 9',
    category: 'secondary',
    subjectBn: 'পদার্থবিজ্ঞান',
    subjectEn: 'Physics',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_9_Physics_BN.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_9_Physics_EN.pdf',
    bgColor: '#9C3A2E',
    borderColor: '#EDF4EE',
    featured: true
  },
  {
    id: 'class-9-chemistry',
    titleBn: 'রসায়ন',
    titleEn: 'Chemistry',
    class: 'class-9',
    classLabelBn: 'নবম শ্রেণী',
    classLabelEn: 'Class 9',
    category: 'secondary',
    subjectBn: 'রসায়ন',
    subjectEn: 'Chemistry',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_9_Chemistry_BN.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_9_Chemistry_EN.pdf',
    bgColor: '#224E44',
    borderColor: '#B7D2C2'
  },
  {
    id: 'class-9-biology',
    titleBn: 'জীববিজ্ঞান',
    titleEn: 'Biology',
    class: 'class-9',
    classLabelBn: 'নবম শ্রেণী',
    classLabelEn: 'Class 9',
    category: 'secondary',
    subjectBn: 'জীববিজ্ঞান',
    subjectEn: 'Biology',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_9_Biology_BN.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Class_9_Biology_EN.pdf',
    bgColor: '#2E6B4F',
    borderColor: '#D2E7D6'
  },

  // Higher Secondary - Class 11-12
  {
    id: 'class-11-bangla',
    titleBn: 'সাহিত্যপাঠ (একাদশ-দ্বাদশ)',
    titleEn: 'Sahitya Path (Class 11-12)',
    class: 'class-11-12',
    classLabelBn: 'একাদশ-দ্বাদশ শ্রেণী',
    classLabelEn: 'Class 11-12',
    category: 'higher-secondary',
    subjectBn: 'বাংলা',
    subjectEn: 'Bangla',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/HSC_Bangla_Literature.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/HSC_Bangla_Literature.pdf',
    bgColor: '#173430',
    borderColor: '#87AB93',
    featured: true
  },
  {
    id: 'class-11-english',
    titleBn: 'English for Today (HSC)',
    titleEn: 'English for Today (HSC)',
    class: 'class-11-12',
    classLabelBn: 'একাদশ-দ্বাদশ শ্রেণী',
    classLabelEn: 'Class 11-12',
    category: 'higher-secondary',
    subjectBn: 'ইংরেজি',
    subjectEn: 'English',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/HSC_English_for_Today.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/HSC_English_for_Today.pdf',
    bgColor: '#2C5C82',
    borderColor: '#EDF4EE',
    featured: true
  },
  {
    id: 'class-11-ict',
    titleBn: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    titleEn: 'Information & Communication Tech',
    class: 'class-11-12',
    classLabelBn: 'একাদশ-দ্বাদশ শ্রেণী',
    classLabelEn: 'Class 11-12',
    category: 'higher-secondary',
    subjectBn: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    subjectEn: 'ICT',
    pdfUrlBangla: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/HSC_ICT_BN.pdf',
    pdfUrlEnglish: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/HSC_ICT_EN.pdf',
    bgColor: '#0A2923',
    borderColor: '#B7D2C2'
  }
];

export const NOTICES: Notice[] = [
  {
    id: 'notice-1',
    titleBn: '২০২৬ শিক্ষাবর্ষের সকল স্তরের পাঠ্যপুস্তক বিতরণ সংক্রান্ত নির্দেশনা',
    titleEn: 'Instructions on Textbook Distribution for the 2026 Academic Year',
    date: '2026-06-25',
    memoNo: 'NCTB/AD/37.06.0000.101.04.002.26-114',
    pdfUrl: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/notices/Textbook_Distribution_2026.pdf',
    category: 'textbook',
    isNew: true
  },
  {
    id: 'notice-2',
    titleBn: 'নতুন জাতীয় শিক্ষাক্রমের আলোকে শিক্ষক নির্দেশিকা এবং প্রশিক্ষণ সংক্রান্ত বিজ্ঞপ্তি',
    titleEn: 'Teacher Guide and Orientation Guidelines Under the New National Curriculum',
    date: '2026-06-18',
    memoNo: 'NCTB/Curr/37.06.0000.103.06.001.26-89',
    pdfUrl: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/notices/Teacher_Guide_Notice_2026.pdf',
    category: 'curriculum',
    isNew: true
  },
  {
    id: 'notice-3',
    titleBn: 'মাধ্যমিক স্তরের পাঠ্যপুস্তকের ভুল সংশোধন সংক্রান্ত জরুরি বিজ্ঞপ্তি',
    titleEn: 'Urgent Notice Regarding Textbook Correction for Secondary Level',
    date: '2026-05-12',
    memoNo: 'NCTB/Text/37.06.0000.105.11.004.26-45',
    pdfUrl: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/notices/Secondary_Correction_Notice.pdf',
    category: 'textbook'
  },
  {
    id: 'notice-4',
    titleBn: 'নতুন প্রকাশিত পাঠ্যপুস্তক মূল্যায়ন এবং গঠনমূলক মতামতের জন্য উন্মুক্ত আহ্বান',
    titleEn: 'Open Call for Evaluation and Feedback on Newly Published Textbooks',
    date: '2026-04-30',
    memoNo: 'NCTB/Curr/37.06.0000.102.08.012.26-72',
    pdfUrl: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/notices/Feedback_NCTB_Books.pdf',
    category: 'general'
  },
  {
    id: 'notice-5',
    titleBn: '২০২৭ শিক্ষাবর্ষের প্রাথমিক ও মাধ্যমিক স্তরের পাঠ্যপুস্তক মুদ্রণের আন্তর্জাতিক দরপত্র বিজ্ঞপ্তি',
    titleEn: 'International Tender Notice for Printing Primary and Secondary Textbooks for 2027',
    date: '2026-04-15',
    memoNo: 'NCTB/Tender/37.06.0000.111.02.008.26-102',
    pdfUrl: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/notices/International_Tender_2027.pdf',
    category: 'tender'
  }
];

export const CURRICULUM_INFO: Curriculum[] = [
  {
    id: 'curr-pre-primary',
    titleBn: 'প্রাক-প্রাথমিক শিক্ষাক্রম',
    titleEn: 'Pre-Primary Curriculum',
    descriptionBn: '৪-৫ বছর বয়সী শিশুদের জন্য খেলাভিত্তিক এবং সমন্বিত উন্নয়নমূলক শিক্ষাক্রম। শিশুর শারীরিক, মানসিক, সামাজিক ও আবেগিক বিকাশ নিশ্চিত করার জন্য এটি তৈরি করা হয়েছে।',
    descriptionEn: 'Play-based, integrated developmental curriculum for children aged 4-5 years. Formulated to ensure wholesome physical, mental, social, and emotional development of young learners.',
    levelBn: 'প্রাক-প্রাথমিক স্তর (বয়স ৪-৫)',
    levelEn: 'Pre-Primary Level (Age 4-5)',
    keyPointsBn: [
      'খেলাধুলা ও আনন্দের মাধ্যমে শিখন',
      'ভাষা ও যোগাযোগের বুনিয়াদি উন্নয়ন',
      'সহমর্মিতা ও সামাজিক মূল্যবোধ গঠন',
      'পরিবেশ ও চারপাশের জগত পর্যবেক্ষণ'
    ],
    keyPointsEn: [
      'Learning through play and joyous activities',
      'Foundational language and communication skills',
      'Nurturing empathy and basic social values',
      'Observation of nature and immediate surroundings'
    ],
    pdfUrl: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Curriculum_Pre_Primary.pdf'
  },
  {
    id: 'curr-primary',
    titleBn: 'প্রাথমিক শিক্ষাক্রম (শ্রেণী ১ - ৫)',
    titleEn: 'Primary Curriculum (Class 1-5)',
    descriptionBn: 'জাতীয় শিক্ষাক্রম ২০২১-এর আলোকে যোগ্যতা-ভিত্তিক প্রাথমিক শিক্ষাক্রম। এটি শিশুর মৌলিক সাক্ষরতা, সংখ্যাজ্ঞান এবং নৈতিক মূল্যবোধ সুদৃঢ় করতে সাহায্য করে।',
    descriptionEn: 'Competency-based primary curriculum in light of National Curriculum 2021. Designed to cement basic literacy, numeracy, critical thinking, and core moral values.',
    levelBn: 'প্রাথমিক স্তর (শ্রেণী ১ - ৫)',
    levelEn: 'Primary Level (Class 1-5)',
    keyPointsBn: [
      'যোগ্যতা ও বাস্তব জীবনভিত্তিক শিখন রূপরেখা',
      'সৃজনশীলতা ও সূক্ষ্ম চিন্তন ক্ষমতার উন্মেষ',
      'শতভাগ মৌলিক গণিত ও সাক্ষরতা যোগ্যতা অর্জন',
      'সহ-পাঠ্যক্রমিক কার্যক্রমের সাথে ভারসাম্যপূর্ণ সংযোগ'
    ],
    keyPointsEn: [
      'Competency-based and real-world applied learning',
      'Fostering creativity and critical analytical skills',
      'Achieving 100% foundational literacy and numeracy',
      'Balanced linkage with co-curricular activities'
    ],
    pdfUrl: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Curriculum_Primary_1_5.pdf'
  },
  {
    id: 'curr-secondary',
    titleBn: 'মাধ্যমিক শিক্ষাক্রম (শ্রেণী ৬ - ১০)',
    titleEn: 'Secondary Curriculum (Class 6-10)',
    descriptionBn: 'অভিজ্ঞতা-ভিত্তিক জাতীয় শিক্ষাক্রম রূপরেখা ২০২১। শিক্ষার্থীদের মুখস্থবিদ্যার নির্ভরতা দূর করে সক্রিয় অংশগ্রহণ ও বাস্তব অভিজ্ঞতা অর্জনের মাধ্যমে দক্ষতা বৃদ্ধিতে এটি প্রণীত।',
    descriptionEn: 'Experience-based National Curriculum Framework 2021. Crafted to transition from traditional memorization to active inquiry, hands-on experiences, and practical life-skill competency.',
    levelBn: 'মাধ্যমিক স্তর (শ্রেণী ৬ - ১০)',
    levelEn: 'Secondary Level (Class 6-10)',
    keyPointsBn: [
      'অভিজ্ঞতা-ভিত্তিক শিখন ও ধারাবাহিক মূল্যায়ন',
      'তথ্যপ্রযুক্তি ও জীবন-জীবিকার দক্ষতা অর্জন',
      'বিজ্ঞান অনুসন্ধানী মনন ও সামাজিক বিজ্ঞানের বাস্তব প্রয়োগ',
      'জেন্ডার সমতা ও নাগরিক দায়িত্ববোধ জাগ্রত করা'
    ],
    keyPointsEn: [
      'Experiential learning models with continuous assessment',
      'Acquisition of ICT literacy and life-career skills',
      'Inquiry-oriented scientific mindset and active social studies',
      'Instilling civic duties, gender equity, and global citizenship'
    ],
    pdfUrl: 'https://nctb.gov.bd/sites/default/files/files/nctb.gov.bd/page/Curriculum_Secondary_6_10.pdf'
  }
];

// Helper to get simulated Chapter PDFs or summary content for the visual reader mockup
export const getBookChapters = (bookId: string, language: 'bn' | 'en') => {
  const isBangla = language === 'bn';
  return [
    {
      chapterNo: 1,
      title: isBangla ? 'অধ্যায় ১: শুভ সূচনা ও প্রাথমিক ধারণা' : 'Chapter 1: Warm Beginnings & Core Concepts',
      summary: isBangla
        ? 'এই অধ্যায়ে বইটির মূল লক্ষ্য এবং শিখন ফল নিয়ে আলোচনা করা হয়েছে। শিক্ষার্থীরা বাস্তব জীবনের উদাহরণ এবং দলগত কাজের মাধ্যমে মৌলিক ধারণা অর্জন করবে।'
        : 'This chapter discusses the primary learning outcomes and core focus. Learners will acquire foundational concepts through real-life examples and teamwork activities.',
      pages: 15
    },
    {
      chapterNo: 2,
      title: isBangla ? 'অধ্যায় ২: বিষয়ের গভীরে ও অনুশীলন' : 'Chapter 2: Deep Dive & Practice Exercises',
      summary: isBangla
        ? 'এই অধ্যায়ে শিক্ষার্থীরা উন্নত সমাধান পদ্ধতি এবং বিশ্লেষণাত্মক সমস্যার অনুশীলন করবে। বিভিন্ন ছবির মাধ্যমে জটিল বিষয়গুলোকে সহজ করা হয়েছে।'
        : 'In this chapter, students practice advanced problem-solving and analytical reasoning. Complex topics are simplified with rich illustrations and visual charts.',
      pages: 24
    },
    {
      chapterNo: 3,
      title: isBangla ? 'অধ্যায় ৩: ধারাবাহিক মূল্যায়ন ও প্রজেক্ট' : 'Chapter 3: Continuous Assessment & Project Work',
      summary: isBangla
        ? 'শিক্ষার্থীরা এখানে বাস্তবধর্মী প্রজেক্ট ও কেইস স্টাডি করবে। সতীর্থ মূল্যায়ন এবং শিক্ষক মূল্যায়নের জন্য বিশেষ প্রশ্নপত্র অন্তর্ভুক্ত আছে।'
        : 'Learners engage in practical hands-on projects and case studies here. Self-assessment, peer feedback, and teacher evaluations are covered with detailed worksheets.',
      pages: 18
    }
  ];
};
