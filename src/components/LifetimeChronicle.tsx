import React, { useState, useMemo } from 'react';
import { UserProfile, CountdownMetrics, LifetimeEvent } from '../types';
import { getEventsForUserLifetime } from '../data/lifetimeEvents';
import { Sparkles, History, Telescope, Globe, Plus, Trash2, Calendar, Clock } from 'lucide-react';

interface LifetimeChronicleProps {
  profile: UserProfile;
  metrics: CountdownMetrics;
}

export const LifetimeChronicle: React.FC<LifetimeChronicleProps> = ({ profile }) => {
  const [tab, setTab] = useState<'all' | 'past' | 'projected'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  // Custom user events from localStorage
  const [customEvents, setCustomEvents] = useState<LifetimeEvent[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('spark_life_custom_events');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Custom event form state
  const [customYear, setCustomYear] = useState<number>(2026);
  const [customTitle, setCustomTitle] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [customCategory, setCustomCategory] = useState<LifetimeEvent['category']>('Personal Milestone');

  const birthDate = useMemo(() => new Date(profile.birthDate), [profile.birthDate]);
  const birthYear = birthDate.getFullYear();
  const endYear = birthYear + Math.round(profile.expectedAge);
  const currentYear = 2026;

  const { pastEvents, projectedEvents } = useMemo(() => {
    const data = getEventsForUserLifetime(birthYear, endYear);

    // Merge custom events
    customEvents.forEach((ev) => {
      const isPast = ev.year <= currentYear;
      if (isPast && ev.year >= birthYear) {
        data.pastEvents.push({
          ...ev,
          timeSinceYears: currentYear - ev.year,
          ageAtEvent: ev.year - birthYear
        });
      } else if (!isPast && ev.year <= endYear) {
        data.projectedEvents.push({
          ...ev,
          timeUntilYears: ev.year - currentYear,
          ageAtEvent: ev.year - birthYear
        });
      }
    });

    data.pastEvents.sort((a, b) => b.year - a.year);
    data.projectedEvents.sort((a, b) => a.year - b.year);

    return data;
  }, [birthYear, endYear, customEvents]);

  const allDisplayEvents = useMemo(() => {
    if (tab === 'past') return pastEvents;
    if (tab === 'projected') return projectedEvents;
    return [...pastEvents, ...projectedEvents].sort((a, b) => a.year - b.year);
  }, [tab, pastEvents, projectedEvents]);

  const filteredEvents = useMemo(() => {
    if (categoryFilter === 'all') return allDisplayEvents;
    return allDisplayEvents.filter((e) => e.category === categoryFilter);
  }, [allDisplayEvents, categoryFilter]);

  const handleSaveCustomEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    const newEvent: LifetimeEvent = {
      id: `custom-evt-${Date.now()}`,
      year: Number(customYear),
      title: customTitle.trim(),
      description: customDescription.trim(),
      category: customCategory,
      isProjected: Number(customYear) > currentYear
    };

    const updated = [...customEvents, newEvent];
    setCustomEvents(updated);
    try {
      localStorage.setItem('spark_life_custom_events', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setCustomTitle('');
    setCustomDescription('');
    setIsAddingCustom(false);
  };

  const handleDeleteCustom = (id: string) => {
    const updated = customEvents.filter((e) => e.id !== id);
    setCustomEvents(updated);
    try {
      localStorage.setItem('spark_life_custom_events', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="clarity" className="w-full py-12 border-b border-neutral-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2">
              <History className="w-3.5 h-3.5" />
              <span>Philosophical Anchor · Lifetime Milestones & Horizons ({birthYear} – {endYear})</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 tracking-tight">
              Major Events & Milestones in Your Lifetime
            </h2>
            <p className="text-sm text-neutral-400 max-w-2xl mt-1">
              Facts about major breakthroughs and historical milestones that have occurred since you were born, alongside projected celestial and technological horizons awaiting in your lifetime.
            </p>
          </div>

          <button
            onClick={() => setIsAddingCustom(!isAddingCustom)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAddingCustom ? 'Cancel' : 'Add Personal Milestone'}</span>
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Main Scope Tabs */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto text-xs font-medium">
            <button
              onClick={() => setTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                tab === 'all' ? 'bg-neutral-800 text-amber-300 font-semibold shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Full Horizon ({pastEvents.length + projectedEvents.length})
            </button>
            <button
              onClick={() => setTab('past')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                tab === 'past' ? 'bg-neutral-800 text-amber-300 font-semibold shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Occurred in Your Life ({pastEvents.length})
            </button>
            <button
              onClick={() => setTab('projected')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                tab === 'projected' ? 'bg-neutral-800 text-amber-300 font-semibold shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Projected in Your Future ({projectedEvents.length})
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-x-auto text-xs font-mono">
            {['all', 'Space & Cosmos', 'Science & Tech', 'World & Humanity', 'Personal Milestone'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  categoryFilter === cat ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {cat === 'all' ? 'All Themes' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Event Creator Form */}
        {isAddingCustom && (
          <form onSubmit={handleSaveCustomEvent} className="p-6 mb-8 bg-neutral-900/90 rounded-2xl border border-amber-500/30">
            <h3 className="font-serif text-lg text-neutral-100 mb-4">Add Personal or Historical Milestone</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Year</label>
                <input
                  type="number"
                  min={birthYear}
                  max={endYear + 20}
                  value={customYear}
                  onChange={(e) => setCustomYear(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-neutral-400 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Bought first family home, Solar eclipse journey"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Theme</label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
                >
                  <option value="Personal Milestone">Personal Milestone</option>
                  <option value="Space & Cosmos">Space & Cosmos</option>
                  <option value="Science & Tech">Science & Tech</option>
                  <option value="World & Humanity">World & Humanity</option>
                </select>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-mono text-neutral-400 mb-1">Description / Notes</label>
                <input
                  type="text"
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  placeholder="Why this year or milestone was/will be unforgettable"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddingCustom(false)}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer transition-colors"
              >
                Save to My Lifetime
              </button>
            </div>
          </form>
        )}

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((item) => {
            const isPast = item.year <= currentYear;
            const timeSinceYears = currentYear - item.year;
            const timeUntilYears = item.year - currentYear;
            const ageAtEvent = item.year - birthYear;
            const isCustom = item.id.startsWith('custom-');

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl border transition-all flex flex-col justify-between bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700"
              >
                <div>
                  {/* Top Bar with Year timestamp and Time Since / Time Until */}
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="text-xl font-bold font-mono tracking-tight text-neutral-100">
                      {item.year}
                    </span>

                    <div className="text-right">
                      {isPast ? (
                        <span className="text-neutral-400 font-medium text-xs">
                          Time Since: <strong className="text-neutral-200">{timeSinceYears === 0 ? 'This year' : `${timeSinceYears} ${timeSinceYears === 1 ? 'year' : 'years'} ago`}</strong>
                        </span>
                      ) : (
                        <span className="text-amber-400 font-semibold text-xs">
                          Time Until: <strong>in {timeUntilYears} {timeUntilYears === 1 ? 'year' : 'years'}</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Age at Event Indicator */}
                  <div className="flex items-center gap-2 text-[11px] font-mono mb-2 text-neutral-400">
                    <span className="text-amber-300/90 font-medium">
                      Age {ageAtEvent >= 0 ? ageAtEvent : 0}
                    </span>
                    <span>·</span>
                    <span className="text-neutral-500 uppercase">{item.category}</span>
                  </div>

                  <h3 className="font-serif text-lg text-neutral-100 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer status & actions */}
                <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>
                    {isPast ? 'Occurred in your lifetime' : 'Projected in your lifetime'}
                  </span>

                  {isCustom && (
                    <button
                      onClick={() => handleDeleteCustom(item.id)}
                      title="Delete personal milestone"
                      className="text-neutral-600 hover:text-red-400 cursor-pointer p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
