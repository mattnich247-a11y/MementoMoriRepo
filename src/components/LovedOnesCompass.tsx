import React, { useState } from 'react';
import { LovedOne } from '../types';
import { Users, Plus, PhoneCall, Calendar, Heart, Trash2, Edit3, MessageSquareHeart } from 'lucide-react';



interface LovedOnesCompassProps {
  lovedOnes: LovedOne[];
  onUpdateLovedOnes: (updated: LovedOne[]) => void;
  isPremiumOrDev?: boolean;
  onToggleDevVip?: () => void;
}

export const LovedOnesCompass: React.FC<LovedOnesCompassProps> = ({
  lovedOnes,
  onUpdateLovedOnes,
  isPremiumOrDev = false,
  onToggleDevVip
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copiedNoteId, setCopiedNoteId] = useState<string | null>(null);
  const [showLimitNotice, setShowLimitNotice] = useState(false);

  // Form state supporting smooth string/number input
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState<LovedOne['relationship']>('Parent');
  const [currentAge, setCurrentAge] = useState<string | number>(65);
  const [expectedAge, setExpectedAge] = useState<string | number>(82);
  const [visitsPerYear, setVisitsPerYear] = useState<string | number>(3);
  const [daysPerVisit, setDaysPerVisit] = useState<string | number>(4);
  const [notes, setNotes] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

     // Prevent adding new entries past the cap (while still allowing edits)
    if (!editingId && isAtLovedOnesCap) {
      setShowLimitNotice(true);
      return;
    }

    const parsedCurrentAge = Number(currentAge) > 0 ? Number(currentAge) : 60;
    const parsedExpectedAge = Number(expectedAge) > 0 ? Number(expectedAge) : 82;
    const parsedVisits = Number(visitsPerYear) >= 0 ? Number(visitsPerYear) : 1;
    const parsedDays = Number(daysPerVisit) > 0 ? Number(daysPerVisit) : 1;

    if (editingId) {
      const updated = lovedOnes.map((l) =>
        l.id === editingId
          ? {
              ...l,
              name,
              relationship,
              currentAge: parsedCurrentAge,
              expectedAge: parsedExpectedAge,
              visitsPerYear: parsedVisits,
              daysPerVisit: parsedDays,
              notes
            }
          : l
      );
      onUpdateLovedOnes(updated);
      setEditingId(null);
    } else {
      const newPerson: LovedOne = {
        id: `loved-${Date.now()}`,
        name,
        relationship,
        currentAge: parsedCurrentAge,
        expectedAge: parsedExpectedAge,
        visitsPerYear: parsedVisits,
        daysPerVisit: parsedDays,
        notes,
        lastContactDate: new Date().toISOString().split('T')[0]
      };
      onUpdateLovedOnes([...lovedOnes, newPerson]);
    }

    setIsAdding(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setRelationship('Parent');
    setCurrentAge(65);
    setExpectedAge(82);
    setVisitsPerYear(3);
    setDaysPerVisit(4);
    setNotes('');
  };

  const handleStartEdit = (person: LovedOne) => {
    setName(person.name);
    setRelationship(person.relationship);
    setCurrentAge(person.currentAge);
    setExpectedAge(person.expectedAge);
    setVisitsPerYear(person.visitsPerYear);
    setDaysPerVisit(person.daysPerVisit);
    setNotes(person.notes || '');
    setEditingId(person.id);
    setIsAdding(true);
  };

  // Quick adjust visits directly from card
  const handleAdjustVisits = (id: string, delta: number) => {
    const updated = lovedOnes.map((l) => {
      if (l.id === id) {
        const nextVisits = Math.max(0.25, Math.round((l.visitsPerYear + delta) * 10) / 10);
        return { ...l, visitsPerYear: nextVisits };
      }
      return l;
    });
    onUpdateLovedOnes(updated);
  };

  const handleDelete = (id: string) => {
    onUpdateLovedOnes(lovedOnes.filter((l) => l.id !== id));
  };

  const handleQuickCall = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = lovedOnes.map((l) => (l.id === id ? { ...l, lastContactDate: today } : l));
    onUpdateLovedOnes(updated);
  };

  const handleCopyNote = (person: LovedOne) => {
    const text = `Hey ${person.name}, was just thinking about you today and wanted to say how grateful I am for you. Let's catch up soon!`;
    navigator.clipboard?.writeText(text);
    setCopiedNoteId(person.id);
    setTimeout(() => setCopiedNoteId(null), 2500);
  };

  return (
    <section id="loved-ones" className="w-full py-12 border-b border-neutral-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-2">
              The Relationship Compass (The Tail End)
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 tracking-tight">
              Remaining Time With Loved Ones
            </h2>
            <p className="text-sm text-neutral-400 max-w-2xl mt-1">
              By the time we finish high school, we have already spent over 90% of our lifetime in-person time with our parents. Calculate the real visits remaining so every gathering counts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-neutral-400">
              {isPremiumOrDev ? 'Unlimited (Premium Unlocked)' : `${lovedOnes.length}/2 Free Slots`}
            </span>
            <button
              onClick={() => {
                if (!isPremiumOrDev && lovedOnes.length >= 2 && !isAdding) {
                  setShowLimitNotice(true);
                  return;
                }
                setShowLimitNotice(false);
                resetForm();
                setEditingId(null);
                setIsAdding(!isAdding);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-rose-400 hover:bg-rose-300 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{isAdding ? 'Cancel' : 'Add Loved One'}</span>
            </button>
          </div>
        </div>

        {/* Free limit notice banner */}
        {showLimitNotice && !isPremiumOrDev && (
          <div className="p-4 mb-6 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
            <div>
              <div className="font-semibold text-amber-300 flex items-center gap-2">
                <span>Free Limit Reached (2/2 Relationships)</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Non-premium accounts are limited to 2 loved ones. Unlock unlimited relationships with Premium.
              </p>
            </div>
            {onToggleDevVip && (
              <button
                onClick={() => {
                  onToggleDevVip();
                  setShowLimitNotice(false);
                  setIsAdding(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-400 text-neutral-950 font-bold font-mono text-xs hover:bg-amber-300 transition-colors shrink-0 cursor-pointer"
              >
                ⚡ Enable Premium (Unlock)
              </button>
            )}
          </div>
        )}

        {/* Add / Edit Form Modal or Panel */}
        {isAdding && (
          <form onSubmit={handleSave} className="p-6 mb-8 bg-neutral-900/90 rounded-2xl border border-rose-500/30">
            <h3 className="font-serif text-lg text-neutral-100 mb-4">
              {editingId ? 'Edit Loved One Details' : 'Add a Cherished Person'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mom & Dad, Elena"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Relationship</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value as LovedOne['relationship'])}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-rose-400"
                >
                  <option value="Parent">Parent</option>
                  <option value="Partner">Partner</option>
                  <option value="Child">Child</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Grandparent">Grandparent</option>
                  <option value="Close Friend">Close Friend</option>
                  <option value="Mentor">Mentor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Their Current Age</label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={currentAge}
                  onFocus={() => { if (currentAge === 0 || currentAge === '0') setCurrentAge(''); }}
                  onBlur={() => { if (String(currentAge).trim() === '') setCurrentAge(0); }}
                  onChange={(e) => setCurrentAge(e.target.value)}
                  placeholder="e.g. 64"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-rose-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Estimated Lifespan (Years)</label>
                <input
                  type="number"
                  min="30"
                  max="120"
                  value={expectedAge}
                  onFocus={() => { if (expectedAge === 0 || expectedAge === '0') setExpectedAge(''); }}
                  onBlur={() => { if (String(expectedAge).trim() === '') setExpectedAge(0); }}
                  onChange={(e) => setExpectedAge(e.target.value)}
                  placeholder="e.g. 84"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-rose-400 font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-mono text-neutral-400">In-Person Visits Per Year</label>
                  <span className="text-[10px] text-neutral-500 font-mono">visits/yr</span>
                </div>
                {/* Number input with easy +/- Stepper */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setVisitsPerYear((prev) => {
                      const num = Number(prev) || 0;
                      if (num <= 0.5) return 0.25;
                      if (num <= 1) return 0.5;
                      return Math.max(0, num - 1);
                    })}
                    className="w-8 h-9 flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-neutral-200 font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    max="365"
                    value={visitsPerYear}
                    onFocus={() => { if (visitsPerYear === 0 || visitsPerYear === '0') setVisitsPerYear(''); }}
                    onBlur={() => { if (String(visitsPerYear).trim() === '') setVisitsPerYear(0); }}
                    onChange={(e) => setVisitsPerYear(e.target.value)}
                    placeholder="e.g. 3"
                    className="flex-1 px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 text-center font-mono focus:outline-none focus:border-rose-400"
                  />
                  <button
                    type="button"
                    onClick={() => setVisitsPerYear((prev) => {
                      const num = Number(prev) || 0;
                      if (num < 1) return num + 0.5;
                      return num + 1;
                    })}
                    className="w-8 h-9 flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-neutral-200 font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
                {/* Presets for visit frequency */}
                <div className="flex flex-wrap gap-1 mt-1.5 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setVisitsPerYear(0.5)}
                    className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Every 2 yrs (0.5)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisitsPerYear(1)}
                    className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Annual (1)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisitsPerYear(2)}
                    className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    2x/yr
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisitsPerYear(4)}
                    className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Quarterly (4)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisitsPerYear(12)}
                    className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Monthly (12)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisitsPerYear(52)}
                    className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Weekly (52)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisitsPerYear(365)}
                    className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Daily (365)
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-mono text-neutral-400">Average Days Per Visit</label>
                  <span className="text-[10px] text-neutral-500 font-mono">days/stay</span>
                </div>
                {/* Days input with Stepper */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setDaysPerVisit((prev) => Math.max(1, (Number(prev) || 1) - 1))}
                    className="w-8 h-9 flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-neutral-200 font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    max="365"
                    value={daysPerVisit}
                    onFocus={() => { if (daysPerVisit === 0 || daysPerVisit === '0') setDaysPerVisit(''); }}
                    onBlur={() => { if (String(daysPerVisit).trim() === '') setDaysPerVisit(1); }}
                    onChange={(e) => setDaysPerVisit(e.target.value)}
                    placeholder="e.g. 4"
                    className="flex-1 px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 text-center font-mono focus:outline-none focus:border-rose-400"
                  />
                  <button
                    type="button"
                    onClick={() => setDaysPerVisit((prev) => (Number(prev) || 0) + 1)}
                    className="w-8 h-9 flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-neutral-200 font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
                {/* Presets for stay duration */}
                <div className="flex flex-wrap gap-1 mt-1.5 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setDaysPerVisit(1)}
                    className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    1 Day
                  </button>
                  <button
                    type="button"
                    onClick={() => setDaysPerVisit(2)}
                    className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Weekend (2d)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDaysPerVisit(4)}
                    className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    4 Days
                  </button>
                  <button
                    type="button"
                    onClick={() => setDaysPerVisit(7)}
                    className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    1 Wk (7d)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDaysPerVisit(365)}
                    className="px-1.5 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    Co-living (365d)
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-mono text-neutral-400 mb-1">Personal Note / Living Context (Optional)</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Lives in Seattle; annual summer visit and holidays"
                className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-rose-400"
              />
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
                className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-rose-400 hover:bg-rose-300 rounded-lg transition-colors cursor-pointer"
              >
                {editingId ? 'Save Changes' : 'Add to Compass'}
              </button>
            </div>
          </form>
        )}

        {/* Loved Ones Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lovedOnes.map((person, index) => {
            const yearsLeft = Math.max(0, person.expectedAge - person.currentAge);
            const remainingVisits = Math.round(yearsLeft * person.visitsPerYear);
            const remainingDays = Math.round(remainingVisits * person.daysPerVisit);

            // CSS block styles from user focus selection
            const editBtnStyle: React.CSSProperties | undefined =
              index === 0
                ? { borderColor: '#ff0000', color: '#000000', backgroundColor: '#ffffff' }
                : index === 1
                ? { backgroundColor: '#ffffff', color: '#000000' }
                : undefined;

            const messageBtnStyle: React.CSSProperties | undefined =
              index === 0
                ? { backgroundColor: '#ffffff', color: '#000000' }
                : index === 1
                ? { borderColor: '#ffffff', backgroundColor: '#ffffff', color: '#000000' }
                : undefined;

            return (
              <div
                key={person.id}
                className="p-6 bg-neutral-900/40 rounded-2xl border border-neutral-800/80 hover:border-neutral-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  {/* Top line metadata */}
                  <div className="flex items-center justify-between mb-3 text-xs text-neutral-400 font-mono">
                    <span className="text-rose-300 font-medium">{person.relationship}</span>
                    <span>Age {person.currentAge} · Lifespan {person.expectedAge}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-neutral-100 mb-2">{person.name}</h3>
                  {person.notes && (
                    <p className="text-xs text-neutral-400 italic mb-4">{person.notes}</p>
                  )}

                  {/* Quantitative Reality Check */}
                  <div className="p-4 bg-neutral-950/70 rounded-xl border border-neutral-800/60 mb-4">
                    <div className="text-[11px] font-mono uppercase text-neutral-500 mb-1">
                      Estimated Remaining In-Person Time
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-3xl font-semibold text-rose-300 tabular-nums">
                        {remainingVisits.toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">visits left</span>
                      <span className="text-neutral-600">·</span>
                      <span className="font-mono text-lg font-medium text-neutral-200 tabular-nums">
                        {remainingDays.toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-400">days total</span>
                    </div>
                  </div>

                  {/* Pace breakdown & quick adjuster */}
                  <div className="flex items-center justify-between p-2.5 bg-neutral-950/70 rounded-xl border border-neutral-800 text-xs font-mono mb-3">
                    <div className="text-neutral-400">
                      <span className="text-neutral-200 font-semibold">{person.visitsPerYear} {person.visitsPerYear === 1 ? 'visit' : 'visits'} / yr</span>
                      <span className="text-neutral-500"> · {person.daysPerVisit}d each</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleAdjustVisits(person.id, person.visitsPerYear <= 1 ? -0.5 : -1)}
                        title="Reduce visits per year"
                        className="w-6 h-6 flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded text-neutral-300 font-bold hover:text-white cursor-pointer"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAdjustVisits(person.id, person.visitsPerYear < 1 ? 0.5 : 1)}
                        title="Increase visits per year"
                        className="w-6 h-6 flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded text-neutral-300 font-bold hover:text-white cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {person.lastContactDate && (
                    <div className="text-[11px] text-neutral-500 font-mono mb-4">
                      Last logged contact: {person.lastContactDate}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleQuickCall(person.id)}
                      title="Log a visit or call today"
                      className="p-1.5 text-neutral-400 hover:text-emerald-400 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCopyNote(person)}
                      title="Copy sweet message to clipboard"
                      style={messageBtnStyle}
                      className="p-1.5 text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer border border-transparent"
                    >
                      <MessageSquareHeart className="w-4 h-4" />
                    </button>
                    {copiedNoteId === person.id && (
                      <span className="text-[11px] text-rose-300 font-mono">Copied text!</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleStartEdit(person)}
                      title="Edit person"
                      style={editBtnStyle}
                      className="p-1.5 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer border border-transparent"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(person.id)}
                      title="Delete"
                      className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
