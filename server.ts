/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { TEXTBOOKS, NOTICES } from './src/data/textbooks.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.get('/api/textbooks', (req: Request, res: Response) => {
  res.json({ textbooks: TEXTBOOKS });
});

app.get('/api/notices', (req: Request, res: Response) => {
  res.json({ notices: NOTICES });
});

// AI Chat endpoint using @google/genai
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message) {
       res.status(400).json({ error: 'Message is required' });
       return;
    }

    const nctbSystemInstruction = `You are "NCTB Shikkha Shohayok" (NCTB Academic AI Assistant), an expert education companion specialized in the National Curriculum and Textbook Board (NCTB) of Bangladesh.
Your goal is to assist students, teachers, and guardians in both Bangla and English.

Here are your core responsibilities:
1. Explain concepts from NCTB textbooks (Class 1 to Class 12, Pre-primary) in simple, accessible, and friendly language.
2. Provide suggestions, study guides, and test questions based on NCTB subjects (Mathematics, Science, Bangla, English, Physics, ICT, etc.).
3. Explain the "New National Curriculum" (initiated in 2021/2022 for Classes 6, 7, 8, 9), emphasizing experiential learning, competency-based continuous assessments (ধারাবাহিক মূল্যায়ন), and practical projects instead of rot-learning or traditional exams.
4. Promote trust and authority. Use a polite, humble, encouraging, and official voice (matching government standards). Always be constructive and gentle in your answers.
5. If the question is in Bangla, answer primarily in Bangla (or formal Bengali), occasionally using technical terms in brackets. If in English, answer in English.
6. Make sure your explanations are accurate, split with clear formatting (bold terms, bullet points, or numbering). Do not make up facts. If a text book content is unknown, offer a general academic explanation.

Context on NCTB:
- Class 1 to 5 books: Primary Education (Bangla version and English version exist).
- Class 6 to 10 books: Secondary Education. The New Curriculum focuses on "Inquiry" and "Exercise" books for science, and continuous school assessment.
- Class 11 & 12 books: Higher Secondary (HSC). Standard core subjects like Higher Math, ICT, Physics, Chemistry, Biology.`;

    // Construct contents in the format expected by the SDK
    const contents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });
    }

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: nctbSystemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text || "Sorry, I am unable to generate a response at this time.";
    res.json({ text: reply });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate response from AI Assistant.',
      details: error.message || String(error)
    });
  }
});

// Vite Middleware & Static Serving Setup
async function configureServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NCTB Server] Running at http://localhost:${PORT}`);
  });
}

configureServer().catch((err) => {
  console.error('Failed to configure server:', err);
});
