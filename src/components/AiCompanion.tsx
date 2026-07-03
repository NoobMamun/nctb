/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, HelpCircle, User, Loader, ArrowRight } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiCompanionProps {
  language: 'bn' | 'en';
}

export default function AiCompanion({ language }: AiCompanionProps) {
  const isBangla = language === 'bn';
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: isBangla
        ? 'আসসালামু আলাইকুম! আমি এনসিটিবি শিক্ষা সহায়ক এআই সহকারী। আমি আপনাকে নতুন শিক্ষাক্রম, পাঠ্যপুস্তকের যেকোনো অধ্যায় বা বিষয় সম্পর্কে সাহায্য করতে পারি। যেমন: কোনো জটিল বিষয় সহজ করে বুঝিয়ে দেয়া, বা কোনো বিষয়ের লেসন প্ল্যান তৈরি করা। আপনি কী জানতে চান?'
        : 'Welcome! I am your NCTB Academic AI Assistant. I can help explain concepts from any textbook, provide curriculum insights, or help teachers generate custom lesson plans. How can I assist your studies today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Quick Prompt Cards suggestions
  const suggestedPrompts = [
    {
      labelBn: 'পদার্থবিজ্ঞান ৯ম শ্রেণী: মহাকর্ষ সূত্র বুঝিয়ে বলো',
      labelEn: 'Class 9 Physics: Explain Gravity and orbits simply',
      textBn: 'নবম শ্রেণীর পদার্থবিজ্ঞান বইয়ের মহাকর্ষ ও অভিকর্ষ বলের অধ্যায়টি সহজ উদাহরণসহ বুঝিয়ে বলো।',
      textEn: 'Explain Gravity and gravity formulas from NCTB Class 9 Physics book with a daily life example.'
    },
    {
      labelBn: 'প্রাথমিক বিজ্ঞান ৩য় শ্রেণী: উদ্ভিদের শ্রেণীবিভাগ',
      labelEn: 'Class 3 Science: Plant Classifications lesson',
      textBn: 'তৃতীয় শ্রেণীর প্রাথমিক বিজ্ঞান বই অনুযায়ী অপুষ্পক ও সপুষ্পক উদ্ভিদের শ্রেণীবিভাগের ওপর সংক্ষিপ্ত স্টাডি গাইড তৈরি করো।',
      textEn: 'Create a short study guide on plant classification (flowering vs non-flowering) based on Class 3 Elementary Science.'
    },
    {
      labelBn: 'নতুন মূল্যায়ন পদ্ধতি সম্পর্কে বলো',
      labelEn: 'Explain New Evaluation System (PST/PI)',
      textBn: 'নতুন জাতীয় শিক্ষাক্রমের ধারাবাহিক মূল্যায়ন (ধারাবাহিক মূল্যায়ন ও সামষ্টিক মূল্যায়ন) কীভাবে কাজ করে বুঝিয়ে বলো।',
      textEn: 'Explain how the continuous school assessment (Continuous Assessment & Year-end summative) works in the new NCTB curriculum.'
    }
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send message to our Express server Gemini endpoint
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-10) // Send recent message history for context
        })
      });

      const data = await response.json();

      if (response.ok) {
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: data.text,
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const errorMessage: ChatMessage = {
          id: `error-${Date.now()}`,
          sender: 'assistant',
          text: isBangla 
            ? 'দুঃখিত, এআই সহকারী সার্ভারে সংযোগ স্থাপন করা সম্ভব হচ্ছে না। আপনি যদি এটি স্ট্যাটিক হোস্টিংয়ে (যেমন: Vercel) রান করে থাকেন, তবে ব্যাকএন্ড এপিআই সক্রিয় না থাকায় চ্যাট সাময়িকভাবে নিষ্ক্রিয় থাকতে পারে। তবে আপনার পাঠ্যপুস্তক লাইব্রেরি, বুকমার্ক, নোটিশ বোর্ড এবং নোটপ্যাড কোনো বাধা ছাড়াই সম্পূর্ণ সচল রয়েছে!' 
            : 'Sorry, the AI Assistant server connection failed. If you are running this app on a static hosting platform (like Vercel), the server-side Gemini API is inactive. However, your textbook library, curriculum guides, bookmarks, and notepad remain 100% functional offline!',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'assistant',
        text: isBangla 
          ? 'দুঃখিত, এআই সহকারী সার্ভারে সংযোগ স্থাপন করা সম্ভব হচ্ছে না। আপনি যদি এটি স্ট্যাটিক হোস্টিংয়ে (যেমন: Vercel) রান করে থাকেন, তবে ব্যাকএন্ড এপিআই সক্রিয় না থাকায় চ্যাট সাময়িকভাবে নিষ্ক্রিয় থাকতে পারে। তবে আপনার পাঠ্যপুস্তক লাইব্রেরি, বুকমার্ক, নোটিশ বোর্ড এবং নোটপ্যাড কোনো বাধা ছাড়াই সম্পূর্ণ সচল রয়েছে!' 
          : 'Sorry, the AI Assistant server connection failed. If you are running this app on a static hosting platform (like Vercel), the server-side Gemini API is inactive. However, your textbook library, curriculum guides, bookmarks, and notepad remain 100% functional offline!',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 select-none h-[calc(100vh-280px)] min-h-[500px]">
      
      {/* Left panel: Quick instructions and prompt suggestions */}
      <div className="lg:col-span-1 bg-white border border-border-custom rounded-lg p-5 shadow-sm space-y-6 overflow-y-auto">
        <div>
          <h3 className="font-display font-bold text-xs sm:text-sm text-green-950 flex items-center gap-2 border-b border-border-custom pb-2">
            <Sparkles className="w-4.5 h-4.5 text-accent-gold" />
            <span>{isBangla ? 'শিক্ষা সহায়ক নির্দেশিকা' : 'Study Guide Companion'}</span>
          </h3>
          <p className="text-[11px] sm:text-xs text-ink-700 leading-relaxed mt-2.5">
            {isBangla
              ? 'এখানে আপনি এনসিটিবি বইয়ের যেকোনো কঠিন টপিক সহজ ভাষায় ব্যাখ্যা করার অনুরোধ জানাতে পারেন। এছাড়া শিক্ষকদের লেসন প্ল্যান তৈরির জন্য এটি দারুণ সাহায্যকারী।'
              : 'Our academic AI companion provides student guides, simplified textbook reviews, custom quizzes, and lesson blueprints tailored to the curriculum framework.'}
          </p>
        </div>

        {/* Prompt Suggestions */}
        <div className="space-y-2.5">
          <h4 className="text-[11px] font-semibold text-ink-900 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-accent-gold" />
            <span>{isBangla ? 'সহজ কিছু উদাহরণ' : 'Quick Suggestions'}</span>
          </h4>
          <ul className="space-y-2">
            {suggestedPrompts.map((p, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleSend(isBangla ? p.textBn : p.textEn)}
                  className="w-full text-left p-3 rounded bg-bg-canvas hover:bg-green-100 border border-border-custom/80 hover:border-green-300 transition-colors text-[11px] sm:text-xs text-ink-700 font-medium leading-relaxed flex justify-between items-center group focus:outline-none"
                >
                  <span className="line-clamp-2">{isBangla ? p.labelBn : p.labelEn}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right panel: Active Chat Thread */}
      <div className="lg:col-span-3 bg-white border border-border-custom rounded-lg shadow-sm flex flex-col justify-between overflow-hidden">
        
        {/* Chat Thread Header */}
        <div className="bg-green-900 text-white px-5 py-3 border-b border-accent-gold/40 flex justify-between items-center select-none">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-accent-gold" />
            <span className="font-display font-semibold text-xs sm:text-sm">
              {isBangla ? 'শিক্ষাক্রম ও বই সহায়িকা এআই' : 'NCTB Academic Guide AI'}
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-green-950 px-2.5 py-1 rounded text-green-200">
            {isBangla ? 'মডেল: জেমিনি ৩.৫ ফ্ল্যাশ' : 'Model: Gemini 3.5 Flash'}
          </span>
        </div>

        {/* Message window */}
        <div className="grow overflow-y-auto p-5 space-y-4 bg-bg-canvas">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-inner ${
                  isUser ? 'bg-green-800 text-white' : 'bg-white border border-border-custom text-accent-gold'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                </div>

                {/* Message body bubbles */}
                <div className="space-y-1">
                  <div className={`p-3.5 rounded-lg text-xs sm:text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-green-800 text-white rounded-tr-none border border-green-900'
                      : 'bg-white border border-border-custom rounded-tl-none text-ink-900'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`text-[10px] text-ink-500 font-mono ${isUser ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white border border-border-custom text-accent-gold shadow-inner">
                <Loader className="w-4 h-4 animate-spin" />
              </div>
              <div className="space-y-1">
                <div className="p-3 bg-white border border-border-custom rounded-lg rounded-tl-none text-xs sm:text-sm text-ink-500 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-800 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-green-850 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-green-900 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1">{isBangla ? 'সহায়ক উত্তর প্রস্তুত করছে...' : 'Assistant is writing...'}</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Footer Chat Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputValue);
          }}
          className="border-t border-border-custom p-4 flex gap-2 bg-white select-none"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isBangla ? 'এনসিটিবি শিক্ষাক্রমের যেকোনো বিষয় সম্পর্কে প্রশ্ন করুন...' : 'Ask about curriculum, lesson plans, or books...'}
            disabled={isLoading}
            className="grow px-4 py-3 border border-border-custom rounded-md text-sm text-ink-900 bg-bg-canvas focus:ring-1 focus:ring-green-700 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-5 py-3 bg-green-800 hover:bg-green-900 text-white rounded-md text-sm font-semibold transition-colors disabled:opacity-45 focus:outline-none flex items-center gap-2 shrink-0 shadow-sm"
          >
            <span>{isBangla ? 'বার্তা পাঠান' : 'Send'}</span>
            <Send className="w-4 h-4 text-accent-gold" />
          </button>
        </form>

      </div>

    </div>
  );
}
