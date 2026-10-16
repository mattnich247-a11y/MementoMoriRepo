import React, { useState, useEffect } from 'react';
import { QUOTES, QuoteItem } from '../data/stoicWisdom';
import { DailyReflection } from '../types';
import { loadReflections, saveReflection } from '../utils/storage';
import { sound } from '../utils/audio';
import { BookOpen, RefreshCw, Feather, Check, Sparkles } from 'lucide-react';

export const DailyClarity: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(() => {
    const now = new Date();
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    return (dayOfYear * 13 + Math.floor(Math.random() * QUOTES.length)) % QUOTES.length;
  });
  const [activeDate] = useState(() => new Date().toISOString().split('T')[0]);
  
  const [intention, setIntention] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load reflection for today if already entered
  useEffect(() => {
    const reflections = loadReflections();
    if (reflections[activeDate]) {
      setIntention(reflections[activeDate].morningIntention || '');
      setGratitude(reflections[activeDate].eveningGratitude || '');
    }
  }, [activeDate]);

  const currentQuote: QuoteItem = QUOTES[quoteIndex % QUOTES.length];

  const handleNextQuote = () => {
    setQuoteIndex((prev) => {
      let next = Math.floor(Math.random() * QUOTES.length);
      if (next === prev) next = (next + 1) % QUOTES.length;
      return next;
    });
    sound.playGentleTick();
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: DailyReflection = {
      date: activeDate,
      morningIntention: intention,
      eveningGratitude: gratitude,
      clarityScore: 5
    };
    saveReflection(entry);
    setSavedSuccess(true);
    sound.playGentleTick();
    setTimeout(() => setSavedSuccess(false), 2200);
  };

  return (
    <section id="clarity" className="w-full py-12 border-b border-neutral-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              Philosophical Anchor
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 tracking-tight">
              Daily Wisdom & Essential Reflection
            </h2>
            <p className="text-sm text-neutral-400 max-w-2xl mt-1">
              Ancient Stoics practiced the <em>Morning Preparation</em> and <em>Evening Review</em> to prevent life from slipping away unexamined.
            </p>
          </div>

          <button
            onClick={handleNextQuote}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors cursor-pointer shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Another Reading</span>
          </button>
        </div>

        {/* 2-Column Split: Quote of the Day on Left, Essential Journaling on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Quote Card */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-neutral-900/40 rounded-2xl border border-neutral-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-6">
                <span className="uppercase text-amber-400/90">{currentQuote.theme} philosophy</span>
                <span>{currentQuote.source}</span>
              </div>

              <blockquote className="font-serif text-xl sm:text-2xl text-neutral-100 leading-relaxed mb-6">
                "{currentQuote.quote}"
              </blockquote>

              <div className="text-sm text-amber-300 font-medium font-sans">
                — {currentQuote.author}
              </div>
            </div>

            {/* Daily Prompt Callout */}
            <div className="mt-8 pt-6 border-t border-neutral-800/60">
              <div className="text-[11px] font-mono uppercase text-neutral-400 mb-1">
                Contemplation for Today
              </div>
              <p className="text-sm text-neutral-300 font-serif italic">
                {currentQuote.dailyPrompt}
              </p>
            </div>
          </div>

          {/* Micro-Journaling Container */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-neutral-900/40 rounded-2xl border border-neutral-800/80 flex flex-col justify-between">
            <form onSubmit={handleSaveReflection} className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4">
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <Feather className="w-3.5 h-3.5" />
                    <span>Today's Clarity Micro-Log</span>
                  </span>
                  <span>{activeDate}</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Morning Focus: What is the one non-negotiable thing that matters today?
                    </label>
                    <textarea
                      rows={2}
                      value={intention}
                      onChange={(e) => setIntention(e.target.value)}
                      placeholder="e.g. Finish writing the keynote outline with full presence, then cook dinner with Maya without checking work email."
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Evening Grounding: What irreplaceable moment gave you deep gratitude?
                    </label>
                    <textarea
                      rows={2}
                      value={gratitude}
                      onChange={(e) => setGratitude(e.target.value)}
                      placeholder="e.g. The late afternoon sunlight shining through the trees during my walk home."
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-mono">
                  Saved securely in private browser storage.
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                >
                  {savedSuccess ? <Check className="w-4 h-4 text-emerald-950" /> : <Feather className="w-4 h-4" />}
                  <span>{savedSuccess ? 'Logged!' : 'Record Intention'}</span>
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
