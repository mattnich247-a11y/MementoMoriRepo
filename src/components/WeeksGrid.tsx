import React, { useState, useMemo } from 'react';
import { UserProfile, Milestone, LifeChapter } from '../types';
import { Sparkles, Info, Layers, Plus, Trash2, Edit3, Check, X, Shield, Eye, Flame, Compass } from 'lucide-react';

interface WeeksGridProps {
  profile: UserProfile;
  milestones: Milestone[];
  lifeChapters: LifeChapter[];
  onUpdateLifeChapters: (chapters: LifeChapter[]) => void;
  isPremiumOrDev: boolean;
  onOpenHealthAdjuster?: () => void;
}

export const WeeksGrid: React.FC<WeeksGridProps> = ({
  profile,
  milestones,
  lifeChapters,
  onUpdateLifeChapters,
  isPremiumOrDev,
  onOpenHealthAdjuster
}) => {
  const [selectedDecade, setSelectedDecade] = useState<number | 'all'>('all');
  const [hoveredWeek, setHoveredWeek] = useState<{
    age: number;
    week: number;
    calendarYear: number;
    isPast: boolean;
    isCurrent: boolean;
    chapter?: LifeChapter;
  } | null>(null);

  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [chapterForm, setChapterForm] = useState<{
    name: string;
    unit: 'years' | 'months' | 'weeks';
    startVal: string;
    endVal: string;
    color: LifeChapter['color'];
    description: string;
  }>({
    name: '',
    unit: 'years',
    startVal: '0',
    endVal: '18',
    color: 'emerald',
    description: ''
  });

  const birthDate = useMemo(() => new Date(profile.birthDate), [profile.birthDate]);
  const now = new Date();

  // Total weeks lived calculation
  const diffTime = now.getTime() - birthDate.getTime();
  const currentTotalWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
  const currentAge = Math.floor(currentTotalWeeks / 52);
  const currentWeekInYear = currentTotalWeeks % 52;

  const totalYears = profile.expectedAge;
  const totalWeeks = totalYears * 52;
  const remainingWeeks = Math.max(0, totalWeeks - currentTotalWeeks);
  const livedPercent = Math.min(100, Math.max(0, (currentTotalWeeks / totalWeeks) * 100));
  const remainingPercent = Math.max(0, 100 - livedPercent);

  // Milestone lookup by age
  const milestoneMap = useMemo(() => {
    const map = new Map<number, Milestone[]>();
    milestones.forEach((m) => {
      if (m.targetAge !== undefined) {
        const list = map.get(m.targetAge) || [];
        list.push(m);
        map.set(m.targetAge, list);
      }
    });
    return map;
  }, [milestones]);

  const yearsToRender = useMemo(() => {
    const list = [];
    const startYear = selectedDecade === 'all' ? 0 : selectedDecade * 10;
    const endYear = selectedDecade === 'all' ? totalYears : Math.min(totalYears, startYear + 10);

    for (let age = startYear; age < endYear; age++) {
      list.push(age);
    }
    return list;
  }, [selectedDecade, totalYears]);

  // Color mapper for chapter shading
  const getChapterColorClass = (color: LifeChapter['color'], isPast: boolean) => {
    switch (color) {
      case 'emerald':
        return isPast ? 'bg-emerald-700/80 border-emerald-500/80 text-emerald-200' : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300';
      case 'sky':
        return isPast ? 'bg-sky-700/80 border-sky-500/80 text-sky-200' : 'bg-sky-950/40 border-sky-500/40 text-sky-300';
      case 'amber':
        return isPast ? 'bg-amber-700/80 border-amber-500/80 text-amber-200' : 'bg-amber-950/40 border-amber-500/40 text-amber-300';
      case 'rose':
        return isPast ? 'bg-rose-700/80 border-rose-500/80 text-rose-200' : 'bg-rose-950/40 border-rose-500/40 text-rose-300';
      case 'purple':
        return isPast ? 'bg-purple-700/80 border-purple-500/80 text-purple-200' : 'bg-purple-950/40 border-purple-500/40 text-purple-300';
      case 'indigo':
        return isPast ? 'bg-indigo-700/80 border-indigo-500/80 text-indigo-200' : 'bg-indigo-950/40 border-indigo-500/40 text-indigo-300';
      case 'orange':
        return isPast ? 'bg-orange-700/80 border-orange-500/80 text-orange-200' : 'bg-orange-950/40 border-orange-500/40 text-orange-300';
      case 'teal':
        return isPast ? 'bg-teal-700/80 border-teal-500/80 text-teal-200' : 'bg-teal-950/40 border-teal-500/40 text-teal-300';
      default:
        return isPast ? 'bg-neutral-300 border-neutral-400' : 'border-neutral-700/60';
    }
  };

  const getChapterDotColor = (color: LifeChapter['color']) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-400';
      case 'sky': return 'bg-sky-400';
      case 'amber': return 'bg-amber-400';
      case 'rose': return 'bg-rose-400';
      case 'purple': return 'bg-purple-400';
      case 'indigo': return 'bg-indigo-400';
      case 'orange': return 'bg-orange-400';
      case 'teal': return 'bg-teal-400';
      default: return 'bg-amber-400';
    }
  };

  const handleSaveChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapterForm.name.trim()) return;

    const s = parseFloat(chapterForm.startVal) || 0;
    const eVal = parseFloat(chapterForm.endVal) || (s + 1);

    let startAge = s;
    let endAge = eVal;
    let startWeek = Math.round(s * 52);
    let endWeek = Math.round(eVal * 52);

    if (chapterForm.unit === 'months') {
      startAge = parseFloat((s / 12).toFixed(2));
      endAge = parseFloat((eVal / 12).toFixed(2));
      startWeek = Math.round(startAge * 52);
      endWeek = Math.round(endAge * 52);
    } else if (chapterForm.unit === 'weeks') {
      startWeek = Math.round(s);
      endWeek = Math.round(eVal);
      startAge = parseFloat((startWeek / 52).toFixed(2));
      endAge = parseFloat((endWeek / 52).toFixed(2));
    }

    if (editingChapterId) {
      const updated = lifeChapters.map((c) =>
        c.id === editingChapterId
          ? {
              ...c,
              name: chapterForm.name.trim(),
              unit: chapterForm.unit,
              startVal: s,
              endVal: eVal,
              startAge,
              endAge,
              startWeek,
              endWeek,
              color: chapterForm.color,
              description: chapterForm.description.trim()
            }
          : c
      );
      onUpdateLifeChapters(updated);
    } else {
      const newChapter: LifeChapter = {
        id: `ch-${Date.now()}`,
        name: chapterForm.name.trim(),
        unit: chapterForm.unit,
        startVal: s,
        endVal: eVal,
        startAge,
        endAge,
        startWeek,
        endWeek,
        color: chapterForm.color,
        description: chapterForm.description.trim()
      };
      onUpdateLifeChapters([...lifeChapters, newChapter]);
    }

    setEditingChapterId(null);
    setChapterForm({ name: '', unit: 'years', startVal: '0', endVal: '18', color: 'emerald', description: '' });
    setIsChapterModalOpen(false);
  };

  const handleDeleteChapter = (id: string) => {
    onUpdateLifeChapters(lifeChapters.filter((c) => c.id !== id));
  };

  const handleEditChapter = (chapter: LifeChapter) => {
    setEditingChapterId(chapter.id);
    const unit = chapter.unit || 'years';
    let startVal = String(chapter.startVal ?? chapter.startAge);
    let endVal = String(chapter.endVal ?? chapter.endAge);

    if (!chapter.startVal && !chapter.endVal) {
      if (unit === 'months') {
        startVal = String(Math.round(chapter.startAge * 12));
        endVal = String(Math.round(chapter.endAge * 12));
      } else if (unit === 'weeks') {
        startVal = String(chapter.startWeek ?? Math.round(chapter.startAge * 52));
        endVal = String(chapter.endWeek ?? Math.round(chapter.endAge * 52));
      } else {
        startVal = String(chapter.startAge);
        endVal = String(chapter.endAge);
      }
    }

    setChapterForm({
      name: chapter.name,
      unit,
      startVal,
      endVal,
      color: chapter.color,
      description: chapter.description || ''
    });
    setIsChapterModalOpen(true);
  };

  return (
    <section id="grid" className="w-full max-w-full py-12 border-b border-neutral-900/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        
        {/* Section Header */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 sm:gap-4">
            <div className="min-w-0">
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>The Weekly Matrix</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                <h2 className="font-serif text-2xl sm:text-3xl text-neutral-100 font-bold tracking-tight shrink-0">
                  The Weekly Matrix
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 sm:border-l sm:border-neutral-800 sm:pl-4 max-w-xl leading-relaxed">
                  Every square represents one full week (7 days) of your life. 52 columns per year, one row per year.
                </p>
              </div>
            </div>

            {/* Prominent Weeks Left Badge & Action Buttons (Cleanly positioned across mobile, tablet, and desktop) */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-500/15 to-amber-500/5 border border-amber-500/30 rounded-xl shadow-lg shadow-amber-500/5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping inline-block" />
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">Weeks Left:</span>
                  <span className="text-xl sm:text-2xl font-serif text-amber-200 font-bold tabular-nums">
                    {remainingWeeks.toLocaleString()}
                  </span>
                  <span className="text-[11px] font-mono text-amber-400/70">/ {totalWeeks.toLocaleString()}</span>
                </div>
              </div>

              {/* Action button: Shade Life Chapters (Premium only) */}
              {isPremiumOrDev && (
                <button
                  onClick={() => {
                    setEditingChapterId(null);
                    setChapterForm({
                      name: '',
                      unit: 'years',
                      startVal: String(Math.floor(currentAge)),
                      endVal: String(Math.min(totalYears, Math.floor(currentAge) + 10)),
                      color: 'amber',
                      description: ''
                    });
                    setIsChapterModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-neutral-200 text-xs font-medium rounded-xl transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Shade Chapters ({lifeChapters.length}) [Premium]</span>
                </button>
              )}
            </div>
          </div>

          {/* Decade Filters Bar cleanly on its own row */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-900/90 border border-neutral-800 rounded-xl overflow-x-auto max-w-full">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 px-2 shrink-0">
              Decade View:
            </span>
            <button
              onClick={() => setSelectedDecade('all')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedDecade === 'all' ? 'bg-neutral-800 text-amber-300 font-semibold shadow-sm' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              All {totalYears} Years
            </button>
            {Array.from({ length: Math.ceil(totalYears / 10) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedDecade(i)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedDecade === i ? 'bg-neutral-800 text-amber-300 font-semibold shadow-sm' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Ages {i * 10}–{Math.min(totalYears, (i + 1) * 10)}
              </button>
            ))}
          </div>
        </div>

        {/* REVISED HIGH-CLARITY SUMMARY SECTION: Past Pieces, Current Piece, and Next Pieces */}
        <div className="p-5 sm:p-6 mb-6 bg-gradient-to-b from-neutral-900/90 to-neutral-950 border border-neutral-800 rounded-2xl shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800/80">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400" />
                <span>Life Journey Breakdown & Orientation</span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Understand exactly where you stand across your {totalWeeks.toLocaleString()} total human weeks.
              </p>
            </div>
            
            {/* Lifespan Calibration Badge */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300">
                Baseline Horizon: <strong>{totalYears} Years</strong>
              </span>
              {onOpenHealthAdjuster && (
                <button
                  onClick={onOpenHealthAdjuster}
                  className="text-[11px] font-mono px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-colors cursor-pointer"
                >
                  Health Adjusted Lifespan →
                </button>
              )}
            </div>
          </div>

          {/* Three Distinct Pieces Cards with Maximum Clarity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 1. PAST PIECES (LIVED WEEKS) */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 flex flex-col justify-between space-y-3 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-neutral-400" />
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-neutral-400 uppercase font-semibold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-neutral-300 border border-white inline-block" />
                    Past Pieces (Lived)
                  </span>
                  <span className="text-neutral-400 font-bold">{livedPercent.toFixed(1)}%</span>
                </div>
                <div className="text-2xl sm:text-3xl font-serif text-neutral-100 font-semibold tracking-tight mt-1">
                  {currentTotalWeeks.toLocaleString()} <span className="text-sm font-sans font-normal text-neutral-400">weeks</span>
                </div>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                  These weeks are permanently woven into history. They hold every experience, heartbreak, laughter, and triumph you have lived so far.
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-900 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
                <span>{currentAge} full years lived</span>
                <span>{(currentTotalWeeks * 7).toLocaleString()} days</span>
              </div>
            </div>

            {/* 2. THE CURRENT PIECE (THIS VERY WEEK) */}
            <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500/50 flex flex-col justify-between space-y-3 relative overflow-hidden ring-2 ring-amber-400/20 shadow-lg shadow-amber-500/5">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400 animate-pulse" />
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-amber-400 uppercase font-semibold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-amber-400 ring-2 ring-amber-300 shadow-[0_0_8px_rgba(251,191,36,1)] animate-ping inline-block" />
                    The Current Piece (Now)
                  </span>
                  <span className="text-amber-300 font-bold">Week #{currentWeekInYear + 1}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-serif text-amber-200 font-semibold tracking-tight mt-1 flex items-baseline gap-2">
                  <span>Age {currentAge}</span>
                  <span className="text-xs font-mono text-amber-400/80 font-normal">Week {currentWeekInYear + 1} of 52</span>
                </div>
                <p className="text-xs text-amber-200/90 mt-1.5 leading-relaxed">
                  The only piece you can touch, influence, and inhabit. Once the upcoming Sunday night passes, this square turns to solid history forever.
                </p>
              </div>

              <div className="pt-2 border-t border-amber-500/20 text-[11px] font-mono text-amber-300/80 flex items-center justify-between font-semibold">
                <span>Glowing beacon on grid</span>
                <span className="animate-pulse">Active Present</span>
              </div>
            </div>

            {/* 3. NEXT PIECES (WEEKS LEFT) */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 flex flex-col justify-between space-y-3 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-neutral-700" />
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-neutral-400 uppercase font-semibold flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs border border-dashed border-neutral-500 inline-block" />
                    Next Pieces (Weeks Left)
                  </span>
                  <span className="text-neutral-400 font-bold">{remainingPercent.toFixed(1)}%</span>
                </div>
                <div className="text-2xl sm:text-3xl font-serif text-neutral-100 font-semibold tracking-tight mt-1 flex items-baseline gap-1.5 flex-wrap">
                  <span>{remainingWeeks.toLocaleString()}</span>
                  <span className="text-sm font-sans font-normal text-amber-300">weeks left</span>
                </div>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                  Your remaining canvas. Clean, hollow squares representing the mornings, conversations, and endeavors waiting for you to shape them.
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-900 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
                <span>{(totalYears - currentAge)} potential years</span>
                <span>{(remainingWeeks * 7).toLocaleString()} days</span>
              </div>
            </div>

          </div>

          {/* Master Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-300" />
                <span>{currentTotalWeeks.toLocaleString()} Weeks Completed</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-semibold text-amber-300">{remainingWeeks.toLocaleString()} Weeks Left</span>
              </span>
            </div>
            <div className="w-full h-3 bg-neutral-950 rounded-full border border-neutral-800 overflow-hidden flex">
              <div 
                className="h-full bg-neutral-300 transition-all duration-500" 
                style={{ width: `${livedPercent}%` }} 
                title={`${livedPercent.toFixed(1)}% Lived`}
              />
              <div 
                className="h-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.8)]" 
                style={{ width: `${Math.max(0.5, (1 / totalWeeks) * 100)}%` }} 
                title="This Week (Present)"
              />
              <div 
                className="h-full bg-neutral-800/80 transition-all duration-500" 
                style={{ width: `${remainingPercent}%` }} 
                title={`${remainingPercent.toFixed(1)}% Future Unwritten`}
              />
            </div>
          </div>

          {/* Active Life Chapters Shading Legend (Premium Only) */}
          {isPremiumOrDev && lifeChapters.length > 0 && (
            <div className="pt-3 border-t border-neutral-800/80">
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2 flex items-center justify-between">
                <span>Custom Shaded Life Chapters ({lifeChapters.length}) [Premium]:</span>
                <button
                  onClick={() => setIsChapterModalOpen(true)}
                  className="text-amber-400 hover:underline cursor-pointer"
                >
                  Edit Chapters →
                </button>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {lifeChapters.map((ch) => (
                  <div
                    key={ch.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300"
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${getChapterDotColor(ch.color)}`} />
                    <span className="font-semibold">{ch.name}</span>
                    <span className="text-neutral-500 text-[10px]">
                      (Ages {ch.startAge}–{ch.endAge})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* The Grid Canvas Container */}
        <div className="p-4 sm:p-6 bg-neutral-950 rounded-2xl border border-neutral-800 overflow-x-auto shadow-2xl max-w-full">
          
          {/* Week column headers (1 to 52) */}
          <div className="flex items-center gap-1 mb-2 text-[10px] text-neutral-600 font-mono select-none pl-12 min-w-[700px]">
            <span className="w-8">Wk 1</span>
            <div className="flex-1 flex justify-around">
              <span>Wk 13 (Spring)</span>
              <span>Wk 26 (Mid-year)</span>
              <span>Wk 39 (Autumn)</span>
              <span>Wk 52 (Winter)</span>
            </div>
          </div>

          {/* Rows by Age */}
          <div className="space-y-1 min-w-[700px]">
            {yearsToRender.map((age) => {
              const birthYear = birthDate.getFullYear();
              const calendarYear = birthYear + age;
              const hasMilestone = milestoneMap.has(age);
              const milestoneList = milestoneMap.get(age);

              return (
                <div key={age} className="flex items-center gap-1 group/row hover:bg-neutral-900/30 rounded py-0.5 px-1 transition-colors">
                  {/* Left Label: Age & Year */}
                  <div className="w-11 shrink-0 flex items-center justify-between text-[11px] font-mono text-neutral-500 group-hover/row:text-neutral-300">
                    <span className="w-5 text-right font-medium">{age}</span>
                    <span className="text-[9px] text-neutral-600 group-hover/row:text-neutral-400">'{String(calendarYear).slice(-2)}</span>
                  </div>

                  {/* 52 Week squares */}
                  <div className="flex-1 flex items-center gap-[2.5px] sm:gap-[3px]">
                    {Array.from({ length: 52 }).map((_, weekIdx) => {
                      const absoluteWeek = age * 52 + weekIdx;
                      const isPast = absoluteWeek < currentTotalWeeks;
                      const isCurrent = absoluteWeek === currentTotalWeeks;
                      const isFuture = absoluteWeek > currentTotalWeeks;

                      // Check if week falls in any user life chapter (by week or age)
                      const chapter = isPremiumOrDev
                        ? lifeChapters.find((c) => {
                            if (c.startWeek !== undefined && c.endWeek !== undefined) {
                              return absoluteWeek >= c.startWeek && absoluteWeek <= c.endWeek;
                            }
                            return age >= c.startAge && age < c.endAge;
                          })
                        : undefined;

                      let squareClasses = 'w-[8px] sm:w-[9px] md:w-[10px] h-[8px] sm:h-[9px] md:h-[10px] rounded-[1.5px] transition-all cursor-pointer relative ';

                      if (isCurrent) {
                        // The Current Piece: Pulsating bright beacon
                        squareClasses += 'bg-amber-400 border-2 border-white ring-4 ring-amber-400/70 shadow-[0_0_16px_rgba(251,191,36,1)] scale-150 z-30 animate-pulse';
                      } else if (isPast) {
                        // Past pieces: if shaded by a chapter, apply subtle tint, otherwise clean solid lived
                        if (chapter) {
                          squareClasses += `${getChapterColorClass(chapter.color, true)} shadow-xs hover:brightness-125`;
                        } else {
                          squareClasses += 'bg-neutral-300 hover:bg-white border border-neutral-400/80 shadow-xs opacity-90';
                        }
                      } else {
                        if (chapter) {
                          // Shaded future chapter
                          squareClasses += `${getChapterColorClass(chapter.color, false)} border hover:brightness-125`;
                        } else {
                          // Clean uniform hollow square
                          squareClasses += 'bg-transparent hover:bg-neutral-800 border border-neutral-700/60 hover:border-neutral-500';
                        }
                      }

                      return (
                        <div
                          key={weekIdx}
                          onMouseEnter={() =>
                            setHoveredWeek({
                              age,
                              week: weekIdx + 1,
                              calendarYear,
                              isPast,
                              isCurrent,
                              chapter
                            })
                          }
                          className={squareClasses}
                        />
                      );
                    })}
                  </div>

                  {/* Right indicator if this age has milestones */}
                  <div className="w-6 shrink-0 flex justify-center text-xs">
                    {hasMilestone && (
                      <span
                        title={milestoneList?.map((m) => m.title).join(', ')}
                        className="text-amber-400 hover:scale-125 transition-transform cursor-pointer"
                      >
                        ★
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Inspector Footer */}
          <div className="mt-6 pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-400 font-mono gap-2">
            <div>
              {hoveredWeek ? (
                <span className="text-amber-300">
                  Inspecting: Age {hoveredWeek.age} · Year {hoveredWeek.calendarYear} · Week {hoveredWeek.week} of 52{' '}
                  {hoveredWeek.isCurrent ? '(CURRENT WEEK NOW)' : hoveredWeek.isPast ? '(Completed)' : '(Unwritten Future)'}
                  {hoveredWeek.chapter && (
                    <span className="ml-2 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-200">
                      Era: {hoveredWeek.chapter.name}
                    </span>
                  )}
                </span>
              ) : (
                <span>Hover over any week to inspect its coordinates and season.</span>
              )}
            </div>

            <div className="text-neutral-500">
              Each row = 1 year · 52 chances to begin anew
            </div>
          </div>

        </div>

        {/* Life Chapter Shading Modal */}
        {isChapterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70">
                <div className="flex items-center gap-2.5">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <h3 className="font-semibold text-neutral-100 text-base">
                    Shade Life Chapters & Eras
                  </h3>
                </div>
                <button
                  onClick={() => setIsChapterModalOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6 text-xs text-neutral-300">
                {/* Add / Edit Form */}
                <form onSubmit={handleSaveChapter} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                  <h4 className="font-semibold text-neutral-200 text-xs uppercase font-mono tracking-wider">
                    {editingChapterId ? 'Edit Chapter' : 'Add New Life Chapter'}
                  </h4>

                  <div>
                    <label className="block text-[11px] text-neutral-400 font-mono mb-1">Chapter Name</label>
                    <input
                      type="text"
                      required
                      value={chapterForm.name}
                      onChange={(e) => setChapterForm({ ...chapterForm, name: e.target.value })}
                      placeholder="e.g. Childhood, College Years, First Startup, Parenthood"
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-100 text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Unit Selection: Years vs Months vs Weeks */}
                  <div>
                    <label className="block text-[11px] text-neutral-400 font-mono mb-1.5">
                      Highlighting Range Unit
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setChapterForm(prev => ({
                            ...prev,
                            unit: 'years',
                            startVal: prev.unit === 'years' ? prev.startVal : '18',
                            endVal: prev.unit === 'years' ? prev.endVal : '25'
                          }));
                        }}
                        className={`py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                          chapterForm.unit === 'years'
                            ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                            : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                        }`}
                      >
                        Years (Age)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setChapterForm(prev => ({
                            ...prev,
                            unit: 'months',
                            startVal: prev.unit === 'months' ? prev.startVal : '216',
                            endVal: prev.unit === 'months' ? prev.endVal : '300'
                          }));
                        }}
                        className={`py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                          chapterForm.unit === 'months'
                            ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                            : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                        }`}
                      >
                        Months
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setChapterForm(prev => ({
                            ...prev,
                            unit: 'weeks',
                            startVal: prev.unit === 'weeks' ? prev.startVal : '936',
                            endVal: prev.unit === 'weeks' ? prev.endVal : '1300'
                          }));
                        }}
                        className={`py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                          chapterForm.unit === 'weeks'
                            ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                            : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                        }`}
                      >
                        Weeks
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-neutral-400 font-mono mb-1">
                        {chapterForm.unit === 'years'
                          ? 'Start Age (Years)'
                          : chapterForm.unit === 'months'
                          ? 'Start Month (0–Total)'
                          : 'Start Week (0–Total)'}
                      </label>
                      <input
                        type="number"
                        min="0"
                        step={chapterForm.unit === 'years' ? '0.1' : '1'}
                        value={chapterForm.startVal}
                        onFocus={() => {
                          if (chapterForm.startVal === '0') {
                            setChapterForm(prev => ({ ...prev, startVal: '' }));
                          }
                        }}
                        onBlur={() => {
                          if (chapterForm.startVal.trim() === '') {
                            setChapterForm(prev => ({ ...prev, startVal: '0' }));
                          }
                        }}
                        onChange={(e) => setChapterForm({ ...chapterForm, startVal: e.target.value })}
                        placeholder="e.g. 18"
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-100 text-xs focus:border-amber-400 focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-neutral-400 font-mono mb-1">
                        {chapterForm.unit === 'years'
                          ? 'End Age (Years)'
                          : chapterForm.unit === 'months'
                          ? 'End Month'
                          : 'End Week'}
                      </label>
                      <input
                        type="number"
                        min="0"
                        step={chapterForm.unit === 'years' ? '0.1' : '1'}
                        value={chapterForm.endVal}
                        onFocus={() => {
                          if (chapterForm.endVal === '0') {
                            setChapterForm(prev => ({ ...prev, endVal: '' }));
                          }
                        }}
                        onBlur={() => {
                          if (chapterForm.endVal.trim() === '') {
                            const fallback = String((Number(chapterForm.startVal) || 0) + (chapterForm.unit === 'years' ? 1 : chapterForm.unit === 'months' ? 12 : 52));
                            setChapterForm(prev => ({ ...prev, endVal: fallback }));
                          }
                        }}
                        onChange={(e) => setChapterForm({ ...chapterForm, endVal: e.target.value })}
                        placeholder="e.g. 25"
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-100 text-xs focus:border-amber-400 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Equivalent preview */}
                  <div className="text-[11px] font-mono text-neutral-400 bg-neutral-900/60 p-2 rounded-lg border border-neutral-800/80">
                    {chapterForm.unit === 'months' ? (
                      <span>
                        Equivalent to Age ~{(Number(chapterForm.startVal || 0) / 12).toFixed(1)} to ~{(Number(chapterForm.endVal || 0) / 12).toFixed(1)} (Total {Math.max(0, Number(chapterForm.endVal || 0) - Number(chapterForm.startVal || 0))} months)
                      </span>
                    ) : chapterForm.unit === 'weeks' ? (
                      <span>
                        Equivalent to Age ~{(Number(chapterForm.startVal || 0) / 52).toFixed(1)} to ~{(Number(chapterForm.endVal || 0) / 52).toFixed(1)} (Total {Math.max(0, Number(chapterForm.endVal || 0) - Number(chapterForm.startVal || 0))} weeks)
                      </span>
                    ) : (
                      <span>
                        Total {Math.max(0, Number(chapterForm.endVal || 0) - Number(chapterForm.startVal || 0)).toFixed(1)} years ({Math.round(Math.max(0, Number(chapterForm.endVal || 0) - Number(chapterForm.startVal || 0)) * 52)} weeks)
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-400 font-mono mb-1.5">Shading Accent Color</label>
                    <div className="flex flex-wrap gap-2">
                      {(['emerald', 'sky', 'amber', 'rose', 'purple', 'indigo', 'orange', 'teal'] as LifeChapter['color'][]).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setChapterForm({ ...chapterForm, color: c })}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-all ${
                            getChapterDotColor(c)
                          } ${chapterForm.color === c ? 'ring-2 ring-white scale-110 shadow-md' : 'opacity-70 hover:opacity-100'}`}
                        >
                          {chapterForm.color === c && <Check className="w-3.5 h-3.5 text-neutral-950 font-bold" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-400 font-mono mb-1">Short Reflection (Optional)</label>
                    <input
                      type="text"
                      value={chapterForm.description}
                      onChange={(e) => setChapterForm({ ...chapterForm, description: e.target.value })}
                      placeholder="e.g. A time of boundless exploration and risk-taking"
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-100 text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    {editingChapterId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingChapterId(null);
                          setChapterForm({ name: '', unit: 'years', startVal: '0', endVal: '18', color: 'emerald', description: '' });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold rounded-lg text-xs cursor-pointer shadow-sm"
                    >
                      {editingChapterId ? 'Save Changes' : 'Add Chapter'}
                    </button>
                  </div>
                </form>

                {/* Existing Chapters List */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-neutral-200 text-xs uppercase font-mono tracking-wider">
                    Current Configured Chapters ({lifeChapters.length})
                  </h4>

                  {lifeChapters.length === 0 ? (
                    <p className="text-neutral-500 italic py-2">No custom chapters yet. Add one above to shade the matrix.</p>
                  ) : (
                    lifeChapters.map((ch) => (
                      <div
                        key={ch.id}
                        className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-3.5 h-3.5 rounded-full shrink-0 ${getChapterDotColor(ch.color)}`} />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-neutral-100 text-xs">{ch.name}</span>
                              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                                {ch.unit || 'years'}
                              </span>
                            </div>
                            <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                              {ch.unit === 'weeks' ? (
                                <span>Weeks {ch.startWeek ?? ch.startVal} – {ch.endWeek ?? ch.endVal} (Ages {ch.startAge} – {ch.endAge})</span>
                              ) : ch.unit === 'months' ? (
                                <span>Months {ch.startVal ?? Math.round(ch.startAge * 12)} – {ch.endVal ?? Math.round(ch.endAge * 12)} (Ages {ch.startAge} – {ch.endAge})</span>
                              ) : (
                                <span>Ages {ch.startAge} – {ch.endAge} ({((ch.endAge - ch.startAge)).toFixed(1)} yrs · {Math.round((ch.endAge - ch.startAge) * 52)} wks)</span>
                              )}
                            </div>
                            {ch.description && (
                              <div className="text-[10px] text-neutral-500 italic mt-0.5">{ch.description}</div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleEditChapter(ch)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors cursor-pointer"
                            title="Edit Chapter"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteChapter(ch.id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors cursor-pointer"
                            title="Delete Chapter"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-neutral-800 bg-neutral-950/70 flex justify-end">
                <button
                  onClick={() => setIsChapterModalOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
