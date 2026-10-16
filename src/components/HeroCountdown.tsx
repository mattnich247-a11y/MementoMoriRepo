import React, { useState, useEffect } from 'react';
import { CountdownMetrics, UserProfile } from '../types';
import { formatNumber } from '../utils/timeCalculations';
import { sound } from '../utils/audio';
import { getRandomLifeDeathQuote } from '../data/stoicWisdom';
import { getZodiacSign } from '../utils/astrology';
import { 
  Bell, 
  Clock, 
  Heart, 
  Calendar, 
  Sparkles, 
  Pause, 
  Play, 
  RefreshCw, 
  Activity, 
  Wind, 
  Sun, 
  Smile, 
  Utensils, 
  Compass,
  Moon,
  Compass as Globe,
  Users,
  Target,
  Sparkle,
  Flame,
  Star,
  Lock,
  X,
  Sliders,
  RotateCcw,
  Edit3,
  Check,
  Minus,
  Plus,
  ChevronDown,
} from 'lucide-react';

interface HeroCountdownProps {
  profile: UserProfile;
  metrics: CountdownMetrics;
  isPaused: boolean;
  onTogglePause: () => void;
  onOpenProfile: () => void;
  onOpenHealthAdjuster?: () => void;
  isAdjustedActive?: boolean;
  activeCategory: 'matrix' | 'health' | 'loved-ones' | 'goals';
  onSelectCategory: (cat: 'matrix' | 'health' | 'loved-ones' | 'goals') => void;
  lovedOnesCount?: number;
  milestonesCount?: number;
  isDevVipActive?: boolean;
  isNewUser?: boolean;
  onDismissNewUserGuide?: () => void;
}

export const HeroCountdown: React.FC<HeroCountdownProps> = ({
  profile,
  metrics,
  isPaused,
  onTogglePause,
  onOpenProfile,
  onOpenHealthAdjuster,
  isAdjustedActive = false,
  activeCategory,
  onSelectCategory,
  lovedOnesCount = 2,
  milestonesCount = 3,
  isDevVipActive = false,
  isNewUser = false,
  onDismissNewUserGuide
}) => {
  const [lens, setLens] = useState<'temporal' | 'vitality' | 'year'>('temporal');
  const [mementoQuote, setMementoQuote] = useState(() => getRandomLifeDeathQuote());

 const [showScrollCue, setShowScrollCue] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem('memento_scroll_cue_seen') !== 'true';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!showScrollCue && !isNewUser) return;

    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowScrollCue(false);
        try {
          localStorage.setItem('memento_scroll_cue_seen', 'true');
        } catch {}
        if (onDismissNewUserGuide) onDismissNewUserGuide();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showScrollCue, isNewUser, onDismissNewUserGuide]);
  const handleRefreshQuote = () => {
    setMementoQuote(getRandomLifeDeathQuote());
    sound.playGentleTick();
  };

  // Celestial horoscope calculated for user's birthdate
  const zodiac = getZodiacSign(profile.birthDate);

  // User-customizable relational cadences for hugs/kisses and shared meals
  const [hugsRate, setHugsRate] = useState<number>(() => {
    if (typeof window === 'undefined') return 0.8;
    try {
      const saved = localStorage.getItem('spark_cadence_hugs');
      if (saved) return parseFloat(saved);
    } catch (e) {
      console.error(e);
    }
    return 0.8;
  });

  const [customHugsTotal, setCustomHugsTotal] = useState<number | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem('spark_custom_hugs_total');
      if (saved) return parseInt(saved, 10);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const [mealsRate, setMealsRate] = useState<number>(() => {
    if (typeof window === 'undefined') return 1.2;
    try {
      const saved = localStorage.getItem('spark_cadence_meals');
      if (saved) return parseFloat(saved);
    } catch (e) {
      console.error(e);
    }
    return 1.2;
  });

  const [customMealsTotal, setCustomMealsTotal] = useState<number | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem('spark_custom_meals_total');
      if (saved) return parseInt(saved, 10);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  // UI toggle states for editing/adjusting
  const [showHugsAdjuster, setShowHugsAdjuster] = useState(false);
  const [showMealsAdjuster, setShowMealsAdjuster] = useState(false);
  const [customHugsInput, setCustomHugsInput] = useState('');
  const [customMealsInput, setCustomMealsInput] = useState('');

  const handleAdjustHugsRate = (delta: number) => {
    setCustomHugsTotal(null);
    try { localStorage.removeItem('spark_custom_hugs_total'); } catch (e) {}
    setHugsRate((prev) => {
      const next = Math.max(0.1, Math.min(25, parseFloat((prev + delta).toFixed(1))));
      try {
        localStorage.setItem('spark_cadence_hugs', String(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
    sound.playGentleTick();
  };

  const handleSetHugsRate = (rate: number) => {
    const validRate = Math.max(0.1, Math.min(30, rate));
    setCustomHugsTotal(null);
    try { localStorage.removeItem('spark_custom_hugs_total'); } catch (e) {}
    setHugsRate(validRate);
    try {
      localStorage.setItem('spark_cadence_hugs', String(validRate));
    } catch (e) {
      console.error(e);
    }
    sound.playGentleTick();
  };

  const handleSetCustomHugsTotal = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customHugsInput, 10);
    if (!isNaN(val) && val >= 0) {
      setCustomHugsTotal(val);
      try {
        localStorage.setItem('spark_custom_hugs_total', String(val));
      } catch (e) {
        console.error(e);
      }
      setShowHugsAdjuster(false);
      setCustomHugsInput('');
      sound.playGentleTick();
    }
  };

  const handleResetHugs = () => {
    setCustomHugsTotal(null);
    setHugsRate(0.8);
    try {
      localStorage.removeItem('spark_custom_hugs_total');
      localStorage.setItem('spark_cadence_hugs', '0.8');
    } catch (e) {}
    setShowHugsAdjuster(false);
    sound.playGentleTick();
  };

  const handleAdjustMealsRate = (delta: number) => {
    setCustomMealsTotal(null);
    try { localStorage.removeItem('spark_custom_meals_total'); } catch (e) {}
    setMealsRate((prev) => {
      const next = Math.max(0.1, Math.min(15, parseFloat((prev + delta).toFixed(1))));
      try {
        localStorage.setItem('spark_cadence_meals', String(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
    sound.playGentleTick();
  };

  const handleSetMealsRate = (rate: number) => {
    const validRate = Math.max(0.1, Math.min(15, rate));
    setCustomMealsTotal(null);
    try { localStorage.removeItem('spark_custom_meals_total'); } catch (e) {}
    setMealsRate(validRate);
    try {
      localStorage.setItem('spark_cadence_meals', String(validRate));
    } catch (e) {
      console.error(e);
    }
    sound.playGentleTick();
  };

  const handleSetCustomMealsTotal = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customMealsInput, 10);
    if (!isNaN(val) && val >= 0) {
      setCustomMealsTotal(val);
      try {
        localStorage.setItem('spark_custom_meals_total', String(val));
      } catch (e) {
        console.error(e);
      }
      setShowMealsAdjuster(false);
      setCustomMealsInput('');
      sound.playGentleTick();
    }
  };

  const handleResetMeals = () => {
    setCustomMealsTotal(null);
    setMealsRate(1.2);
    try {
      localStorage.removeItem('spark_custom_meals_total');
      localStorage.setItem('spark_cadence_meals', '1.2');
    } catch (e) {}
    setShowMealsAdjuster(false);
    sound.playGentleTick();
  };

  const displayKissesRemaining = customHugsTotal !== null 
    ? customHugsTotal 
    : Math.max(0, Math.round(metrics.remainingDays * hugsRate));

  const displayMealsRemaining = customMealsTotal !== null
    ? customMealsTotal
    : Math.max(0, Math.round(metrics.remainingDays * mealsRate));

  return (
    <section id="perspective" className="w-full py-8 md:py-12 border-b border-neutral-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Kicker and Personal Orientation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              <span className="text-neutral-200 font-semibold">{profile.name}</span>
              <span aria-hidden="true">·</span>
              <span>{metrics.percentElapsed.toFixed(1)}% Lived</span>
              <span aria-hidden="true">·</span>
              <span>{metrics.years} Years Remaining</span>
              {isAdjustedActive && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-[10px]">
                  ✨ Health Adjusted Active
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-100 tracking-tight leading-tight">
              Every second is a spark that will never burn again.
            </h1>
          </div>

          {/* Quick utility controls */}
          <div className="flex items-center gap-2 shrink-0">
            {onOpenHealthAdjuster && (
              <button
                onClick={onOpenHealthAdjuster}
                title="Adjust lifespan with biological health data"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Health Adjuster</span>
              </button>
            )}

            <button
              onClick={onTogglePause}
              title={isPaused ? "Resume real-time flow" : "Pause countdown to reflect"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isPaused ? 'Resume Time' : 'Freeze Time'}</span>
            </button>
          </div>
        </div>

          {/* View Mode Tabs (Compact & Unobtrusive - Shrunk by 40%) */}
        <div className="inline-flex flex-wrap sm:flex-nowrap items-center gap-1.5 p-1 mb-6 bg-neutral-900/90 border border-neutral-800 rounded-xl max-w-fit shadow-md">
          <button
            onClick={() => {
              setLens('temporal');
              sound.playGentleTick();
            }}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 active:scale-98 ${
              lens === 'temporal'
                ? 'bg-neutral-800 text-amber-300 ring-1 ring-amber-400/50 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Precise Countdown</span>
          </button>
          <button
            onClick={() => {
              setLens('vitality');
              sound.playGentleTick();
            }}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 active:scale-98 ${
              lens === 'vitality'
                ? 'bg-neutral-800 text-rose-300 ring-1 ring-rose-400/50 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Vitality Pulse</span>
          </button>
          <button
            onClick={() => {
              setLens('year');
              sound.playGentleTick();
            }}
            className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 active:scale-98 ${
              lens === 'year'
                ? 'bg-neutral-800 text-amber-300 ring-1 ring-amber-400/50 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Seasons & Celestial Clock</span>
          </button>
        </div>


        {/* LENS CONTENT CONTAINER */}
        <div className="space-y-8">
          
            {/* LENS 1: CLASSIC PRECISE COUNTDOWN (RESTORED TO FULL HERO SIZE) */}
          {lens === 'temporal' && (
            <div className="p-6 sm:p-8 bg-neutral-900/40 rounded-2xl border border-neutral-800/80 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono uppercase tracking-wider mb-4">
                <span>Exact Time Remaining Horizon</span>
                <span className="text-amber-400 font-semibold">Target Lifespan: {profile.expectedAge} Years</span>
              </div>

              {/* Full Countdown Units Grid: Years, Months, Days, Hours, Minutes, Seconds */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 my-5">
                
                {/* Years */}
                <div className="p-4 sm:p-5 rounded-xl bg-neutral-950/85 border border-neutral-800/90 flex flex-col justify-center text-center group hover:border-amber-500/35 transition-colors shadow-sm">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Years</span>
                  <span className="text-3xl sm:text-4xl font-serif text-neutral-100 font-bold tabular-nums my-1.5">
                    {metrics.years}
                  </span>
                </div>

                {/* Months */}
                <div className="p-4 sm:p-5 rounded-xl bg-neutral-950/85 border border-neutral-800/90 flex flex-col justify-center text-center group hover:border-amber-500/35 transition-colors shadow-sm">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Months</span>
                  <span className="text-3xl sm:text-4xl font-serif text-neutral-100 font-bold tabular-nums my-1.5">
                    {metrics.months}
                  </span>
                  
                </div>

                {/* Days */}
                <div className="p-4 sm:p-5 rounded-xl bg-neutral-950/85 border border-neutral-800/90 flex flex-col justify-center text-center group hover:border-amber-500/35 transition-colors shadow-sm">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Days</span>
                  <span className="text-3xl sm:text-4xl font-serif text-neutral-100 font-bold tabular-nums my-1.5">
                    {metrics.days.toLocaleString()}
                  </span>
                 
                </div>

                {/* Hours */}
                <div className="p-4 sm:p-5 rounded-xl bg-neutral-950/85 border border-neutral-800/90 flex flex-col justify-center text-center group hover:border-amber-500/35 transition-colors shadow-sm">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Hours</span>
                  <span className="text-3xl sm:text-4xl font-serif text-neutral-100 font-bold tabular-nums my-1.5">
                    {String(metrics.hours).padStart(2, '0')}
                  </span>
                  
                </div>

                {/* Minutes */}
                <div className="p-4 sm:p-5 rounded-xl bg-neutral-950/85 border border-neutral-800/90 flex flex-col justify-center text-center group hover:border-amber-500/35 transition-colors shadow-sm">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Minutes</span>
                  <span className="text-3xl sm:text-4xl font-serif text-neutral-100 font-bold tabular-nums my-1.5">
                    {String(metrics.minutes).padStart(2, '0')}
                  </span>
                  
                </div>

                {/* Seconds & Milliseconds */}
                <div className="p-4 sm:p-5 rounded-xl bg-neutral-950/85 border border-neutral-800/90 flex flex-col justify-center text-center group hover:border-amber-500/35 transition-colors relative overflow-hidden shadow-sm">
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">Seconds</span>
                  <div className="my-1.5 flex items-baseline justify-center gap-0.5">
                    <span className="text-3xl sm:text-4xl font-serif text-amber-300 font-bold tabular-nums">
                      {String(metrics.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-mono text-amber-400/90 tabular-nums">
                     
                    </span>
                  </div>
                 
                </div>

              </div>

              {/* Total Lifespan Progression Bar */}
              <div className="mt-5 pt-4 border-t border-neutral-800/60">
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-2">
                  <span className="font-medium">Total Human Lifespan Progression</span>
                  <span className="font-mono text-amber-300 font-semibold tabular-nums text-sm">
                    {metrics.percentElapsed.toFixed(3)}% Lived
                  </span>
                </div>
                <div className="w-full h-3 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800/80 flex">
                  <div
                    className="h-full bg-neutral-300 transition-all duration-300"
                    style={{ width: `${metrics.percentElapsed}%` }}
                  />
                  <div
                    className="h-full bg-amber-400 animate-pulse shadow-[0_0_12px_rgba(251,191,36,0.9)]"
                    style={{ width: `${Math.max(0.4, (1 / (profile.expectedAge * 52)) * 100)}%` }}
                  />
                  <div
                    className="h-full bg-neutral-800/80"
                    style={{ width: `${100 - metrics.percentElapsed}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-neutral-500 font-mono mt-2">
                  <span>{metrics.elapsedDays.toLocaleString()} days lived</span>
                  <span>{metrics.remainingDays.toLocaleString()} days remaining (~{(100 - metrics.percentElapsed).toFixed(1)}%)</span>
                </div>
              </div>
            </div>
          )}


          {/* LENS 2: VITALITY & RELATIONAL PULSE WITH CUSTOMIZABLE HUGS & SHARED MEALS (SHRUNK BY 40% - SLEEK & COMPACT) */}
          {lens === 'vitality' && (
            <div className="p-3.5 sm:p-4 bg-neutral-900/40 rounded-xl border border-neutral-800/80 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <div className="text-[11px] text-neutral-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-rose-400" />
                  <span>Vitality & Relational Cadence</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-[10px] font-mono text-rose-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  <span>LIVE VITALITY PULSE</span>
                </div>
              </div>
              <h3 className="text-sm sm:text-base font-serif text-neutral-200 mb-3">
                What your remaining days translate to in living human connection:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                {/* 1. Heartbeats */}
                <div className="p-3 sm:p-3.5 bg-neutral-950/80 rounded-lg border border-neutral-800 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium mb-1">
                      <div className="flex items-center gap-1.5 text-rose-400">
                        <Heart className="w-3.5 h-3.5 fill-rose-500/30 text-rose-400 animate-pulse" />
                        <span className="font-semibold text-xs sm:text-sm">Heartbeats Left</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-950/60 text-rose-300">~72 BPM</span>
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-rose-100 tabular-nums my-1">
                      {formatNumber(metrics.heartbeatsRemaining)}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 mt-1.5 pt-1.5 border-t border-neutral-900">
                    -1 beat every 0.83s
                  </div>
                </div>

                {/* 2. Breaths */}
                <div className="p-3 sm:p-3.5 bg-neutral-950/80 rounded-lg border border-neutral-800 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium mb-1">
                      <div className="flex items-center gap-1.5 text-sky-400">
                        <Wind className="w-3.5 h-3.5 text-sky-400" />
                        <span className="font-semibold text-xs sm:text-sm">Breaths of Air</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-950/60 text-sky-300">~16 BPM</span>
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-sky-100 tabular-nums my-1">
                      {formatNumber(metrics.breathsRemaining)}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 mt-1.5 pt-1.5 border-t border-neutral-900">
                    -1 breath every ~3.75s
                  </div>
                </div>

                {/* 3. Kisses & Hugs Left (FULLY USER-ADJUSTABLE) */}
                <div className="p-3 sm:p-3.5 bg-gradient-to-b from-rose-950/30 to-neutral-950 rounded-lg border border-rose-500/40 flex flex-col justify-between shadow-sm relative">
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium mb-1">
                      <div className="flex items-center gap-1.5 text-rose-300">
                        <Smile className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                        <span className="font-semibold text-xs sm:text-sm">Kisses & Hugs Left</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleAdjustHugsRate(-0.2)}
                          title="Decrease hugs/day"
                          className="w-4.5 h-4.5 flex items-center justify-center rounded bg-rose-950/80 hover:bg-rose-900 text-rose-300 text-xs font-bold border border-rose-800/60 cursor-pointer"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-200">
                          {customHugsTotal !== null ? 'Custom' : `~${hugsRate}/d`}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAdjustHugsRate(0.2)}
                          title="Increase hugs/day"
                          className="w-4.5 h-4.5 flex items-center justify-center rounded bg-rose-950/80 hover:bg-rose-900 text-rose-300 text-xs font-bold border border-rose-800/60 cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowHugsAdjuster(!showHugsAdjuster)}
                          title="Adjust hugs and kisses left"
                          className={`ml-0.5 p-1 rounded transition-colors cursor-pointer ${
                            showHugsAdjuster
                              ? 'bg-rose-500 text-neutral-950 font-bold'
                              : 'bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/60'
                          }`}
                        >
                          <Sliders className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-rose-100 tabular-nums my-1">
                      {formatNumber(displayKissesRemaining)}
                    </div>
                  </div>

                  {/* Hugs & Kisses Adjuster Drawer */}
                  {showHugsAdjuster && (
                    <div className="my-1.5 p-2.5 rounded-lg bg-neutral-950 border border-rose-500/50 space-y-2 animate-in fade-in">
                      <div className="flex items-center justify-between text-xs text-rose-300 font-mono">
                        <span className="font-semibold text-[11px]">Adjust Hugs & Kisses</span>
                        <button
                          type="button"
                          onClick={handleResetHugs}
                          className="text-[10px] text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                          <span>Reset (~0.8/d)</span>
                        </button>
                      </div>

                      {/* Daily frequency presets */}
                      <div>
                        <span className="text-[10px] text-neutral-400 block mb-1 font-mono">Daily Embrace Frequency:</span>
                        <div className="grid grid-cols-4 gap-1">
                          {[
                            { label: '0.3/d', val: 0.3 },
                            { label: '0.8/d', val: 0.8 },
                            { label: '1.5/d', val: 1.5 },
                            { label: '3.0/d', val: 3.0 }
                          ].map((p) => (
                            <button
                              key={p.val}
                              type="button"
                              onClick={() => handleSetHugsRate(p.val)}
                              className={`py-0.5 text-[10px] font-mono rounded border transition-colors cursor-pointer ${
                                customHugsTotal === null && hugsRate === p.val
                                  ? 'bg-rose-500/30 border-rose-400 text-rose-200 font-bold'
                                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                              }`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Direct exact total remaining input */}
                      <form onSubmit={handleSetCustomHugsTotal} className="flex gap-1.5">
                        <input
                          type="number"
                          min="0"
                          max="1000000"
                          placeholder="Or set exact total hugs"
                          value={customHugsInput}
                          onChange={(e) => setCustomHugsInput(e.target.value)}
                          className="flex-1 px-2 py-0.5 text-xs font-mono bg-neutral-900 border border-neutral-800 rounded text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-rose-400"
                        />
                        <button
                          type="submit"
                          disabled={!customHugsInput}
                          className="px-2 py-0.5 text-xs font-mono bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white rounded font-medium cursor-pointer"
                        >
                          Set
                        </button>
                      </form>

                      <div className="text-[9px] text-neutral-400 font-mono flex items-center justify-between pt-1 border-t border-neutral-900">
                        <span>{customHugsTotal !== null ? 'Custom total override active' : `${hugsRate} hugs/day × ${metrics.remainingDays.toLocaleString()} days`}</span>
                        <button
                          type="button"
                          onClick={() => setShowHugsAdjuster(false)}
                          className="text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="text-[10px] font-mono text-rose-300/80 mt-1.5 pt-1.5 border-t border-rose-900/40 flex items-center justify-between">
                    <span>Warm physical embraces with loved ones</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                  </div>
                </div>

                {/* 4. Shared Meals & Conversations (FULLY USER-ADJUSTABLE) */}
                <div className="p-3 sm:p-3.5 bg-gradient-to-b from-amber-950/30 to-neutral-950 rounded-lg border border-amber-500/40 flex flex-col justify-between shadow-sm relative">
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium mb-1">
                      <div className="flex items-center gap-1.5 text-amber-300">
                        <Utensils className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-semibold text-xs sm:text-sm">Shared Meals & Talks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleAdjustMealsRate(-0.2)}
                          title="Decrease meals/day"
                          className="w-4.5 h-4.5 flex items-center justify-center rounded bg-amber-950/80 hover:bg-amber-900 text-amber-300 text-xs font-bold border border-amber-800/60 cursor-pointer"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-200">
                          {customMealsTotal !== null ? 'Custom' : `~${mealsRate}/d`}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAdjustMealsRate(0.2)}
                          title="Increase meals/day"
                          className="w-4.5 h-4.5 flex items-center justify-center rounded bg-amber-950/80 hover:bg-amber-900 text-amber-300 text-xs font-bold border border-amber-800/60 cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowMealsAdjuster(!showMealsAdjuster)}
                          title="Adjust shared meals and talks left"
                          className={`ml-0.5 p-1 rounded transition-colors cursor-pointer ${
                            showMealsAdjuster
                              ? 'bg-amber-500 text-neutral-950 font-bold'
                              : 'bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-800/60'
                          }`}
                        >
                          <Sliders className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-amber-100 tabular-nums my-1">
                      {formatNumber(displayMealsRemaining)}
                    </div>
                  </div>

                  {/* Shared Meals Adjuster Drawer */}
                  {showMealsAdjuster && (
                    <div className="my-1.5 p-2.5 rounded-lg bg-neutral-950 border border-amber-500/50 space-y-2 animate-in fade-in">
                      <div className="flex items-center justify-between text-xs text-amber-300 font-mono">
                        <span className="font-semibold text-[11px]">Adjust Shared Meals</span>
                        <button
                          type="button"
                          onClick={handleResetMeals}
                          className="text-[10px] text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                          <span>Reset (~1.2/d)</span>
                        </button>
                      </div>

                      {/* Daily frequency presets */}
                      <div>
                        <span className="text-[10px] text-neutral-400 block mb-1 font-mono">Daily Shared Meals Frequency:</span>
                        <div className="grid grid-cols-4 gap-1">
                          {[
                            { label: '0.5/d', val: 0.5 },
                            { label: '1.2/d', val: 1.2 },
                            { label: '2.0/d', val: 2.0 },
                            { label: '3.0/d', val: 3.0 }
                          ].map((p) => (
                            <button
                              key={p.val}
                              type="button"
                              onClick={() => handleSetMealsRate(p.val)}
                              className={`py-0.5 text-[10px] font-mono rounded border transition-colors cursor-pointer ${
                                customMealsTotal === null && mealsRate === p.val
                                  ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold'
                                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                              }`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Direct exact total remaining input */}
                      <form onSubmit={handleSetCustomMealsTotal} className="flex gap-1.5">
                        <input
                          type="number"
                          min="0"
                          max="1000000"
                          placeholder="Or set exact total meals"
                          value={customMealsInput}
                          onChange={(e) => setCustomMealsInput(e.target.value)}
                          className="flex-1 px-2 py-0.5 text-xs font-mono bg-neutral-900 border border-neutral-800 rounded text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-amber-400"
                        />
                        <button
                          type="submit"
                          disabled={!customMealsInput}
                          className="px-2 py-0.5 text-xs font-mono bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-neutral-950 rounded font-medium cursor-pointer"
                        >
                          Set
                        </button>
                      </form>

                      <div className="text-[9px] text-neutral-400 font-mono flex items-center justify-between pt-1 border-t border-neutral-900">
                        <span>{customMealsTotal !== null ? 'Custom total override active' : `${mealsRate} meals/day × ${metrics.remainingDays.toLocaleString()} days`}</span>
                        <button
                          type="button"
                          onClick={() => setShowMealsAdjuster(false)}
                          className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="text-[10px] font-mono text-amber-300/80 mt-1.5 pt-1.5 border-t border-amber-900/40 flex items-center justify-between">
                    <span>Breaks over food with family & friends</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  </div>
                </div>

                {/* 5. Sunrises Left */}
                <div className="p-3 sm:p-3.5 bg-neutral-950/80 rounded-lg border border-neutral-800 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium mb-1">
                      <div className="flex items-center gap-1.5 text-amber-400">
                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-semibold text-xs sm:text-sm">Sunrises to See</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300">Dawn</span>
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-amber-100 tabular-nums my-1">
                      {formatNumber(metrics.sunrisesRemaining)}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 mt-1.5 pt-1.5 border-t border-neutral-900">
                    Next dawn in {String(metrics.nextDawnHours).padStart(2, '0')}:{String(metrics.nextDawnMinutes).padStart(2, '0')}:{String(metrics.nextDawnSeconds).padStart(2, '0')}
                  </div>
                </div>

                {/* 6. Weekends Left */}
                <div className="p-3 sm:p-3.5 bg-neutral-950/80 rounded-lg border border-neutral-800 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium mb-1">
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-semibold text-xs sm:text-sm">Weekends Left</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300">Sat & Sun</span>
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-100 tabular-nums my-1">
                      {formatNumber(metrics.weekendsRemaining)}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 mt-1.5 pt-1.5 border-t border-neutral-900">
                    Next in {metrics.nextWeekendDays}d {String(metrics.nextWeekendHours).padStart(2, '0')}h
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LENS 3: SEASONS & CELESTIAL CLOCK (SHRUNK BY 40% - SLEEK & COMPACT) */}
          {lens === 'year' && (
            <div className="p-3.5 sm:p-4 bg-neutral-900/40 rounded-xl border border-neutral-800/80 backdrop-blur-sm space-y-3.5">
              <div>
                <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono uppercase tracking-wider mb-1.5">
                  <span>The Astronomical Horizon</span>
                  <span className="text-amber-400 font-semibold">{new Date().getFullYear()} Solar Orbit</span>
                </div>
                <h3 className="text-sm sm:text-base font-serif text-neutral-200 mb-2">
                  Aligning your human days with celestial equinoxes & seasons:
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                
                {/* Time Till Next Equinox / Solstice */}
                <div className="p-3.5 sm:p-4 rounded-lg bg-gradient-to-b from-amber-500/10 to-neutral-950 border border-amber-500/30 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium mb-1">
                      <span className="font-semibold text-amber-300 flex items-center gap-1.5 text-xs sm:text-sm">
                        <Globe className="w-3.5 h-3.5 text-amber-400" />
                        Next Equinox / Solstice
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-200 font-semibold">
                        {metrics.nextEquinoxDate}
                      </span>
                    </div>
                    <div className="text-sm sm:text-base font-serif text-neutral-100 mt-0.5 font-semibold">
                      {metrics.nextEquinoxName}
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-amber-300 tabular-nums my-1.5">
                      {metrics.daysToNextEquinox}d {String(metrics.hoursToNextEquinox).padStart(2, '0')}h {String(metrics.minutesToNextEquinox).padStart(2, '0')}m
                    </div>
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-2 pt-1.5 border-t border-neutral-800/80">
                    The astronomical moment the sun crosses the celestial equator.
                  </p>
                </div>

                {/* Current Season Progress */}
                <div className="p-3.5 sm:p-4 rounded-lg bg-neutral-950 border border-neutral-800 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium mb-1">
                      <span className="text-neutral-400 uppercase font-mono text-[10px]">Current Earth Season</span>
                      <span className="font-mono text-amber-300 font-semibold text-[11px]">{metrics.seasonDaysRemaining} days remaining</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-serif text-neutral-100 my-1">{metrics.seasonName}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5 font-mono">
                      Year Progress: {metrics.yearProgressPercent.toFixed(1)}% of {new Date().getFullYear()} completed
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full border border-neutral-800 overflow-hidden mt-2">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-300 rounded-full transition-all duration-500"
                      style={{ width: `${metrics.yearProgressPercent}%` }}
                    />
                  </div>
                </div>

              </div>

              {/* Remaining Seasons in Your Lifetime & Lunar Full Moons */}
              <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                  <span className="font-semibold text-neutral-200 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5 text-sky-400" />
                    Personal Earth Seasons Left in Lifetime:
                  </span>
                  <span className="text-[10px] font-mono text-sky-300">
                    ~{metrics.fullMoonsRemaining.toLocaleString()} Full Moons left
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded bg-neutral-900/90 border border-emerald-900/40">
                    <div className="text-[10px] font-mono text-emerald-400 font-semibold">Springs Left</div>
                    <div className="text-base sm:text-lg font-serif text-neutral-100 font-bold mt-0.5">{metrics.seasonsRemaining.spring}</div>
                    <div className="text-[9px] text-neutral-500">Blossoms to smell</div>
                  </div>

                  <div className="p-2 rounded bg-neutral-900/90 border border-amber-900/40">
                    <div className="text-[10px] font-mono text-amber-400 font-semibold">Summers Left</div>
                    <div className="text-base sm:text-lg font-serif text-neutral-100 font-bold mt-0.5">{metrics.seasonsRemaining.summer}</div>
                    <div className="text-[9px] text-neutral-500">Warm twilight nights</div>
                  </div>

                  <div className="p-2 rounded bg-neutral-900/90 border border-orange-900/40">
                    <div className="text-[10px] font-mono text-orange-400 font-semibold">Autumns Left</div>
                    <div className="text-base sm:text-lg font-serif text-neutral-100 font-bold mt-0.5">{metrics.seasonsRemaining.autumn}</div>
                    <div className="text-[9px] text-neutral-500">Golden falling leaves</div>
                  </div>

                  <div className="p-2 rounded bg-neutral-900/90 border border-blue-900/40">
                    <div className="text-[10px] font-mono text-sky-400 font-semibold">Winters Left</div>
                    <div className="text-base sm:text-lg font-serif text-neutral-100 font-bold mt-0.5">{metrics.seasonsRemaining.winter}</div>
                    <div className="text-[9px] text-neutral-500">Gatherings by hearth</div>
                  </div>
                </div>
              </div>

              {/* CELESTIAL HOROSCOPE & STAR SIGN FEATURE (AT THE BOTTOM OF THE PAGE) */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-indigo-950/30 via-neutral-950 to-neutral-900 border border-indigo-500/30 shadow-md space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-lg text-indigo-300 font-serif">
                      {zodiac.symbol}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-sm sm:text-base text-neutral-100 font-semibold">
                          Celestial Sign: {zodiac.name} {zodiac.symbol}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-800/60">
                          {zodiac.dateRange}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {zodiac.essence}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-indigo-300">
                      Element: <strong>{zodiac.element}</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-amber-300">
                      Ruler: <strong>{zodiac.rulingPlanet}</strong>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-neutral-950/90 border border-neutral-800/80">
                    <div className="font-mono text-neutral-500 uppercase text-[9px] mb-0.5">Celestial Modality & Motto</div>
                    <div className="text-neutral-200 font-medium text-xs">{zodiac.modality} Modality</div>
                    <div className="text-indigo-300 italic mt-0.5 font-serif text-[11px]">"{zodiac.motto}"</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-neutral-950/90 border border-neutral-800/80 md:col-span-2">
                    <div className="font-mono text-amber-400 uppercase text-[9px] mb-0.5 flex items-center gap-1.5">
                      <Star className="w-3 h-3 text-amber-400" />
                      <span>Memento Mori Astrological Alignment</span>
                    </div>
                    <p className="text-neutral-300 leading-relaxed font-sans text-xs">
                      {zodiac.mementoMoriWisdom}
                    </p>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-neutral-500 flex items-center justify-between pt-0.5">
                  <span>Star Sign Virtue: <strong className="text-neutral-300">{zodiac.celestialVirtue}</strong></span>
                  <span>Calibrated to birth date: {profile.birthDate}</span>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* PROMPT RIGHT BELOW THE COUNTDOWN FOR NEW USERS */}
        {isNewUser && (
          <div className="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-neutral-900 to-amber-500/15 border-2 border-amber-400/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-neutral-950 flex items-center justify-center font-bold text-2xl shrink-0 shadow-md">
                ↓
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-base text-neutral-100">
                    Welcome! Scroll Down to Explore Everything
                  </h4>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold">
                    New User Guide
                  </span>
                </div>
                <p className="text-xs text-neutral-300 mt-1 max-w-xl leading-relaxed">
                  The countdown is only the beginning. Scroll down past the initial countdown to experience the <strong>Weekly Life Matrix</strong>, <strong>Vitality & Health Lab</strong>, <strong>Loved Ones Compass</strong>, and <strong>Milestone Odyssey</strong> below!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  document.getElementById('category-content')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Scroll Down & Explore</span>
                <span className="text-sm font-bold">↓</span>
              </button>
              {onDismissNewUserGuide && (
                <button
                  type="button"
                  onClick={onDismissNewUserGuide}
                  className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer text-xs"
                  title="Dismiss guide"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="space-y-8">
          {/* QUOTE OF THE DAY (MEMENTO MORI PRINCIPLE) */}
          <div className="p-6 sm:p-8 bg-neutral-900/60 rounded-2xl border border-neutral-800/80 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-4">
              <span className="flex items-center gap-2">
                <Sparkle className="w-3.5 h-3.5 text-amber-400" />
                Quote of the Day · Memento Mori Reflection
              </span>
              <button
                onClick={handleRefreshQuote}
                title="Load another life & death reflection"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-neutral-400 hover:text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg border border-neutral-800 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Next Quote</span>
              </button>
            </div>

            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-100 mb-4 leading-relaxed italic">
              "{mementoQuote.quote}"
            </blockquote>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-800/60">
              <div className="text-sm font-semibold text-amber-300 font-sans">
                — {mementoQuote.author} <span className="text-xs font-mono text-neutral-500 font-normal">({mementoQuote.source})</span>
              </div>
              <span className="text-xs text-neutral-500 font-mono">Presence over urgency. Every breath counts.</span>
            </div>
          </div>

          {/* 4 CATEGORY SWITCH BUTTONS IN A 2x2 GRID (DIRECTLY UNDER THE QUOTE OF THE DAY) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-400 px-1">
              <span>Select Category Experience:</span>
              <span className="text-amber-400 font-semibold">Active: {activeCategory.toUpperCase()}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Category A: The Weekly Matrix */}
              <button
                onClick={() => onSelectCategory('matrix')}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex items-start gap-4 group ${
                  activeCategory === 'matrix'
                    ? 'bg-gradient-to-r from-amber-500/15 via-neutral-900 to-neutral-900 border-amber-400 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/50'
                    : 'bg-neutral-900/60 hover:bg-neutral-900 border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                <div className={`p-3 rounded-xl shrink-0 transition-colors ${
                  activeCategory === 'matrix' ? 'bg-amber-400 text-neutral-950' : 'bg-neutral-950 text-amber-400 border border-neutral-800'
                }`}>
                  <Compass className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: '0px' }} className="flex items-center justify-between gap-2">
                    <span style={{ fontSize: '0px' }} className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                      Section A
                    </span>
                    {activeCategory === 'matrix' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '20px' }} className="font-serif text-lg text-neutral-100 font-semibold mt-0.5 group-hover:text-amber-200 transition-colors">
                    The Weekly Matrix
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                    Four thousand weeks visualized. Past, current, and unwritten pieces.
                  </p>
                </div>
              </button>

              {/* Category B: Health Section */}
              <button
                onClick={() => onSelectCategory('health')}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex items-start gap-4 group ${
                  activeCategory === 'health'
                    ? 'bg-gradient-to-r from-emerald-500/15 via-neutral-900 to-neutral-900 border-emerald-400 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-400/50'
                    : 'bg-neutral-900/60 hover:bg-neutral-900 border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                <div className={`p-3 rounded-xl shrink-0 transition-colors ${
                  activeCategory === 'health' ? 'bg-emerald-400 text-neutral-950' : 'bg-neutral-950 text-emerald-400 border border-neutral-800'
                }`}>
                  <Activity className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span style={{ fontSize: '0px' }} className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                      Section B
                    </span>
                    {activeCategory === 'health' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '20px' }} className="font-serif text-lg text-neutral-100 font-semibold mt-0.5 group-hover:text-emerald-200 transition-colors flex items-center gap-2">
                    <span>Health Section</span>
                    {!isDevVipActive && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-normal">
                        <Lock className="w-3 h-3 text-amber-400" /> Premium
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                    {!isDevVipActive ? 'Requires Premium. Biological age, nutrition & water logging.' : 'Biological age, nutrition & water logging, and lifestyle longevity impact.'}
                  </p>
                </div>
              </button>

              {/* Category C: Loved Ones */}
              <button
                onClick={() => onSelectCategory('loved-ones')}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex items-start gap-4 group ${
                  activeCategory === 'loved-ones'
                    ? 'bg-gradient-to-r from-rose-500/15 via-neutral-900 to-neutral-900 border-rose-400 shadow-lg shadow-rose-500/10 ring-1 ring-rose-400/50'
                    : 'bg-neutral-900/60 hover:bg-neutral-900 border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                <div className={`p-3 rounded-xl shrink-0 transition-colors ${
                  activeCategory === 'loved-ones' ? 'bg-rose-400 text-neutral-950' : 'bg-neutral-950 text-rose-400 border border-neutral-800'
                }`}>
                  <Users className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span style={{ fontSize: '0px' }} className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">
                      Section C ({lovedOnesCount} People)
                    </span>
                    {activeCategory === 'loved-ones' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-400/20 text-rose-300 font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '20px' }} className="font-serif text-lg text-neutral-100 font-semibold mt-0.5 group-hover:text-rose-200 transition-colors">
                    Loved Ones
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                    The Relationship Compass. Finite remaining visits with cherished people.
                  </p>
                </div>
              </button>

              {/* Category D: Goals */}
              <button
                onClick={() => onSelectCategory('goals')}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex items-start gap-4 group ${
                  activeCategory === 'goals'
                    ? 'bg-gradient-to-r from-amber-500/15 via-neutral-900 to-neutral-900 border-amber-400 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/50'
                    : 'bg-neutral-900/60 hover:bg-neutral-900 border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                <div className={`p-3 rounded-xl shrink-0 transition-colors ${
                  activeCategory === 'goals' ? 'bg-amber-400 text-neutral-950' : 'bg-neutral-950 text-amber-400 border border-neutral-800'
                }`}>
                  <Target className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span style={{ fontSize: '0px' }} className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                      Section D ({milestonesCount} Goals)
                    </span>
                    {activeCategory === 'goals' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '20px' }} className="font-serif text-lg text-neutral-100 font-semibold mt-0.5 group-hover:text-amber-200 transition-colors">
                    Goals
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                    Milestone Odyssey & Life Chapter bucket list objectives.
                  </p>
                </div>
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
