import React, { useState } from 'react';
import { Milestone, MilestoneStatus, UserProfile } from '../types';
import { generateComprehensiveMilestones } from '../utils/storage';
import { Plus, CheckCircle2, Circle, Trash2, Tag, Calendar, Clock, X, Edit3 } from 'lucide-react';

interface MilestoneOdysseyProps {
  profile: UserProfile;
  milestones: Milestone[];
  onUpdateMilestones: (updated: Milestone[]) => void;
  isPremiumOrDev?: boolean;
  onToggleDevVip?: () => void;
}

const DEFAULT_CATEGORIES = ['Creative', 'Adventure', 'Career', 'Family', 'Mastery', 'Legacy', 'Health'];

export const MilestoneOdyssey: React.FC<MilestoneOdysseyProps> = ({
  profile,
  milestones,
  onUpdateMilestones,
  isPremiumOrDev = false,
  onToggleDevVip
}) => {
  const [showLimitNotice, setShowLimitNotice] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Category management state
  const [categories, setCategories] = useState<string[]>(() => {
    if (typeof window === 'undefined') return DEFAULT_CATEGORIES;
    try {
      const saved = localStorage.getItem('spark_life_categories');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_CATEGORIES;
  });

  const [isManagingCategories, setIsManagingCategories] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [filterCategory, setFilterCategory] = useState<string | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<MilestoneStatus | 'all'>('all');
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>(categories[0] || 'Creative');
  
  // Target Option: 'age' or 'timeframe'
  const [targetType, setTargetType] = useState<'age' | 'timeframe'>('age');
  const [targetAgeStr, setTargetAgeStr] = useState<string>('35');
  const [timeframeValueStr, setTimeframeValueStr] = useState<string>('4');
  const [timeframeUnit, setTimeframeUnit] = useState<'days' | 'weeks' | 'months' | 'years'>('months');
  const [notes, setNotes] = useState('');

  const birthDate = new Date(profile.birthDate);
  const now = new Date();
  const currentAge = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  const maxGoals = isPremiumOrDev ? 100 : 3;
  const isAtGoalCap = milestones.length >= maxGoals;

  const saveCategories = (updatedCats: string[]) => {
    setCategories(updatedCats);
    try {
      localStorage.setItem('spark_life_categories', JSON.stringify(updatedCats));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newCategoryName.trim();
    if (!clean) return;
    if (categories.some((c) => c.toLowerCase() === clean.toLowerCase())) {
      setNewCategoryName('');
      return;
    }
    const updated = [...categories, clean];
    saveCategories(updated);
    setNewCategoryName('');
  };

  const handleDeleteCategory = (catToDelete: string) => {
    if (categories.length <= 1) return;
    const updated = categories.filter((c) => c !== catToDelete);
    saveCategories(updated);
    if (filterCategory === catToDelete) setFilterCategory('all');
    if (category === catToDelete) setCategory(updated[0] || 'Personal');
    
    // Automatically reassign existing milestones from deleted category
    const updatedMilestones = milestones.map((m) =>
      m.category === catToDelete ? { ...m, category: updated[0] || 'Personal' } : m
    );
    onUpdateMilestones(updatedMilestones);
  };

  const handleStartEdit = (m: Milestone) => {
    setEditingId(m.id);
    setTitle(m.title);
    setCategory(m.category);
    if (m.targetTimeframe) {
      setTargetType('timeframe');
      setTimeframeValueStr(String(m.targetTimeframe.value));
      setTimeframeUnit(m.targetTimeframe.unit);
    } else {
      setTargetType('age');
      setTargetAgeStr(String(m.targetAge || 35));
    }
    setNotes(m.notes || '');
    setIsAdding(true);
    // Smooth scroll to form
    const elem = document.getElementById('milestone-form');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
      if (!editingId && isAtGoalCap) {
      setShowLimitNotice(true);
      return;
    }


    let computedTargetAge = Number(targetAgeStr) || 35;
    let timeframeData = undefined;

    if (targetType === 'timeframe') {
      const val = Number(timeframeValueStr) || 1;
      let durationInYears = val;
      if (timeframeUnit === 'days') durationInYears = val / 365.25;
      else if (timeframeUnit === 'weeks') durationInYears = val / 52.14;
      else if (timeframeUnit === 'months') durationInYears = val / 12;
      else if (timeframeUnit === 'years') durationInYears = val;

      computedTargetAge = Math.round((currentAge + durationInYears) * 10) / 10;
      timeframeData = {
        value: val,
        unit: timeframeUnit
      };
    }

    if (editingId) {
      const updated = milestones.map((m) =>
        m.id === editingId
          ? {
              ...m,
              title: title.trim(),
              category: category || categories[0] || 'Personal',
              targetAge: computedTargetAge,
              targetTimeframe: timeframeData,
              notes: notes.trim()
            }
          : m
      );
      onUpdateMilestones(updated);
      setEditingId(null);
    } else {
      const newMilestone: Milestone = {
        id: `ms-${Date.now()}`,
        title: title.trim(),
        category: category || categories[0] || 'Personal',
        targetAge: computedTargetAge,
        targetTimeframe: timeframeData,
        status: 'in_progress',
        notes: notes.trim()
      };
      onUpdateMilestones([...milestones, newMilestone]);
    }

    setTitle('');
    setNotes('');
    setIsAdding(false);
  };

  const handleToggleStatus = (id: string) => {
    const updated = milestones.map((m) => {
      if (m.id === id) {
        const nextStatus: MilestoneStatus =
          m.status === 'achieved' ? 'in_progress' : 'achieved';
        return {
          ...m,
          status: nextStatus,
          achievedDate: nextStatus === 'achieved' ? new Date().toISOString().split('T')[0] : undefined
        };
      }
      return m;
    });
    onUpdateMilestones(updated);
  };

  const handleDelete = (id: string) => {
    onUpdateMilestones(milestones.filter((m) => m.id !== id));
  };

  const filtered = milestones.filter((m) => {
    const matchCat = filterCategory === 'all' || m.category === filterCategory;
    const matchStatus = filterStatus === 'all' || m.status === filterStatus;
    return matchCat && matchStatus;
  });

  return (
    <section id="milestones" className="w-full py-12 border-b border-neutral-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              Life Chapter Objectives
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 tracking-tight">
              Milestone Odyssey & Bucket List
            </h2>
            <p className="text-sm text-neutral-400 max-w-2xl mt-1">
              Anchor your aspirations to specific ages or relative timeframes. Don't leave dreams in the abstract someday.
            </p>
          </div>

           <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 font-semibold">
              {milestones.length} / {maxGoals} Goals
            </span>
            {isPremiumOrDev && (
              <button
                onClick={() => {
                  const generated = generateComprehensiveMilestones(currentAge).slice(0, 100);
                  onUpdateMilestones(generated);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-300 border border-neutral-800 transition-colors cursor-pointer"
                title="Coder Error"
              >
                <span> </span>
              </button>
            )}
            <button
              onClick={() => setIsManagingCategories(!isManagingCategories)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition-colors cursor-pointer"
            >
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span>{isManagingCategories ? 'Done Managing' : 'Categories'}</span>
            </button>

            <button
              onClick={() => {
                if (isAdding) {
                  setIsAdding(false);
                  setEditingId(null);
                  return;
                }
                if (isAtGoalCap) {
                  setShowLimitNotice(true);
                  return;
                }
                setShowLimitNotice(false);
                setIsAdding(true);
              }}
              disabled={!isAdding && isPremiumOrDev && isAtGoalCap}
              title={isAtGoalCap ? `Maximum of ${maxGoals} goals reached` : 'Add a new goal'}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>
                {isAdding
                  ? 'Cancel'
                  : isAtGoalCap
                  ? `Cap Reached (${maxGoals}/${maxGoals})`
                  : 'Add Milestone'}
              </span>
            </button>
          </div>
        </div>

        {/* Cap / Limit Notice Banner */}
        {(showLimitNotice || (isPremiumOrDev && isAtGoalCap)) && (
          <div className="p-4 mb-6 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
            <div>
              <div className="font-semibold text-amber-300 flex items-center gap-2">
                <span>
                  {isPremiumOrDev
                    ? 'Maximum Cap Reached (100 / 100 Goals)'
                    : 'Free Limit Reached (3 / 3 Goals)'}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                {isPremiumOrDev
                  ? 'Premium accounts can store up to 100 goals to keep your compass focused. Delete or consolidate an existing goal to add a new one.'
                  : 'Free accounts can track up to 3 custom goals. Upgrade to Premium to track up to 100 goals.'}
              </p>
            </div>
            {!isPremiumOrDev && onToggleDevVip && (
              <button
                onClick={() => {
                  onToggleDevVip();
                  setShowLimitNotice(false);
                  setIsAdding(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-400 text-neutral-950 font-bold font-mono text-xs hover:bg-amber-300 transition-colors shrink-0 cursor-pointer"
              >
                ⚡ Enable Premium (Up to 100 Goals)
              </button>
            )}
          </div>
        )}
        {/* Manage Categories Panel */}
        {isManagingCategories && (
          <div className="p-5 mb-6 bg-neutral-900/70 rounded-2xl border border-neutral-800 text-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono uppercase text-amber-400 text-xs font-semibold">
                Manage Categories (Add & Delete)
              </span>
              <button
                onClick={() => setIsManagingCategories(false)}
                className="text-neutral-500 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200"
                >
                  <span>{cat}</span>
                  {categories.length > 1 && (
                    <button
                      onClick={() => handleDeleteCategory(cat)}
                      title={`Delete category "${cat}"`}
                      className="text-neutral-500 hover:text-red-400 cursor-pointer p-0.5 ml-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleAddCategory} className="flex gap-2 max-w-sm">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="New category name (e.g. Travel, Financial)"
                className="flex-1 px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-100 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold rounded-lg cursor-pointer"
              >
                Add Category
              </button>
            </form>
          </div>
        )}

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filterCategory === 'all' ? 'bg-neutral-800 text-amber-300' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  filterCategory === cat ? 'bg-neutral-800 text-amber-300' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-mono">
            {(['all', 'in_progress', 'planned', 'achieved'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 rounded-lg transition-colors capitalize cursor-pointer ${
                  filterStatus === st ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Add / Edit Form */}
        {isAdding && (
          <form id="milestone-form" onSubmit={handleAdd} className="p-6 mb-8 bg-neutral-900/90 rounded-2xl border border-amber-500/30">
            <h3 className="font-serif text-lg text-neutral-100 mb-4">
              {editingId ? 'Edit Milestone / Goal' : 'Define a Milestone or Horizon'}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-neutral-400 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Publish first book, Climb Kilimanjaro, Buy vineyard"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Target Type Selector: Target Age vs Target Timeframe */}
              <div className="sm:col-span-3 p-4 bg-neutral-950/70 rounded-xl border border-neutral-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    Target Timing Mode
                  </span>
                  <div className="flex gap-1 p-0.5 bg-neutral-900 rounded-lg border border-neutral-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setTargetType('age')}
                      className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                        targetType === 'age' ? 'bg-neutral-800 text-amber-300 font-semibold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Target Age
                    </button>
                    <button
                      type="button"
                      onClick={() => setTargetType('timeframe')}
                      className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                        targetType === 'timeframe' ? 'bg-neutral-800 text-amber-300 font-semibold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Target Timeframe (Relative)
                    </button>
                  </div>
                </div>

                {targetType === 'age' ? (
                  <div className="max-w-xs">
                    <label className="block text-xs font-mono text-neutral-400 mb-1">Target Age (Years)</label>
                    <input
                      type="number"
                      min={Math.floor(currentAge)}
                      max={profile.expectedAge + 10}
                      value={targetAgeStr}
                      onBlur={() => {
                        if (targetAgeStr.trim() === '') {
                          setTargetAgeStr(String(Math.floor(currentAge) + 5));
                        }
                      }}
                      onChange={(e) => setTargetAgeStr(e.target.value)}
                      placeholder="e.g. 35"
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-amber-400 font-mono"
                    />
                    <span className="text-[11px] text-neutral-500 mt-1 block">
                      Target will map to Age {targetAgeStr} (in ~{(Number(targetAgeStr || 35) - currentAge).toFixed(1)} years)
                    </span>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1">Timeframe Horizon</label>
                    <div className="flex gap-2 max-w-sm">
                      <input
                        type="number"
                        min="1"
                        value={timeframeValueStr}
                        onBlur={() => {
                          if (timeframeValueStr.trim() === '') {
                            setTimeframeValueStr('1');
                          }
                        }}
                        onChange={(e) => setTimeframeValueStr(e.target.value)}
                        placeholder="e.g. 4"
                        className="w-24 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-amber-400 font-mono"
                      />
                      <select
                        value={timeframeUnit}
                        onChange={(e) => setTimeframeUnit(e.target.value as any)}
                        className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
                      >
                        <option value="days">Days (e.g. 1 day, 30 days)</option>
                        <option value="weeks">Weeks (e.g. 2 weeks, 8 weeks)</option>
                        <option value="months">Months (e.g. 4 months, 18 months)</option>
                        <option value="years">Years (e.g. 1 year, 5 years)</option>
                      </select>
                    </div>
                    <span className="text-[11px] text-neutral-500 mt-1 block">
                      e.g. "Target: {timeframeValueStr} {timeframeUnit} from today"
                    </span>
                  </div>
                )}
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-mono text-neutral-400 mb-1">Notes / Why it matters (Optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. With college friends; research route during spring"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                }}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                {editingId ? 'Save Changes' : 'Save Milestone'}
              </button>
            </div>
          </form>
        )}

        {/* Milestones List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="p-8 text-center bg-neutral-900/30 rounded-2xl border border-neutral-800 text-neutral-400">
              <p className="font-serif text-lg mb-2">No milestones match your filter.</p>
              <p className="text-xs font-mono text-neutral-500">Add an aspirational goal or reset filters.</p>
            </div>
          ) : (
            filtered.map((item) => {
              const yearsUntil = item.targetAge ? item.targetAge - currentAge : 0;
              const isAchieved = item.status === 'achieved';

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isAchieved
                      ? 'bg-neutral-950/40 border-neutral-800/60 opacity-80'
                      : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleToggleStatus(item.id)}
                      className="mt-0.5 text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer shrink-0"
                    >
                      {isAchieved ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-neutral-600 hover:text-amber-400" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono mb-0.5">
                        <span className="capitalize text-amber-300/80 font-medium">{item.category}</span>
                        <span aria-hidden="true">·</span>
                        {item.targetTimeframe ? (
                          <span className="text-neutral-300">
                            Target: {item.targetTimeframe.value} {item.targetTimeframe.unit}
                          </span>
                        ) : item.targetAge ? (
                          <span>Target Age {item.targetAge}</span>
                        ) : null}
                      </div>

                      <h3
                        className={`text-base font-medium ${
                          isAchieved ? 'line-through text-neutral-400' : 'text-neutral-100'
                        }`}
                      >
                        {item.title}
                      </h3>

                      {item.notes && (
                        <p className="text-xs text-neutral-400 mt-0.5">{item.notes}</p>
                      )}
                    </div>
                  </div>

                  {/* Right side countdown or status */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-8 sm:pl-0">
                    {isAchieved ? (
                      <span className="text-xs font-mono text-emerald-400/90">
                        Achieved {item.achievedDate || ''}
                      </span>
                    ) : (
                      item.targetAge && (
                        <div className="text-right">
                          <span className="text-xs font-mono text-amber-400 block tabular-nums">
                            {yearsUntil > 0 ? `~${yearsUntil.toFixed(1)} yrs to target` : 'Due soon'}
                          </span>
                          <span className="text-[10px] text-neutral-500 uppercase font-mono">
                            Horizon Countdown
                          </span>
                        </div>
                      )
                    )}

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleStartEdit(item)}
                        title="Edit goal"
                        className="p-1.5 text-neutral-400 hover:text-amber-400 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        title="Delete milestone"
                        className="p-1.5 text-neutral-600 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
