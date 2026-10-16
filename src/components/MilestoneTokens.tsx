import React, { useState, useMemo } from 'react';
import { UserProfile, MilestoneToken } from '../types';
import { Award, CheckCircle2, Lock, Sparkles, Clock, Calendar, Star, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

interface MilestoneTokensProps {
  profile: UserProfile;
}

export const MilestoneTokens: React.FC<MilestoneTokensProps> = ({ profile }) => {
  const [selectedToken, setSelectedToken] = useState<MilestoneToken | null>(null);

  const birthDate = useMemo(() => new Date(profile.birthDate), [profile.birthDate]);
  const now = new Date();
  const daysAlive = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

  const TOKENS_CONFIG = [
    {
      id: 'token_100_days',
      title: 'First Century of Days',
      subtitle: '100 Days Alive',
      targetDays: 100,
      category: 'infancy' as const,
      description: 'Your very first 100 mornings on planet Earth. Gaining strength, opening eyes to human faces and maternal warmth.',
      quote: 'From silence into form, the voyage begins.',
      icon: '🌱'
    },
    {
      id: 'token_1000_days',
      title: 'The Toddler Horizon',
      subtitle: '1,000 Days Alive (~2.7 Years)',
      targetDays: 1000,
      category: 'infancy' as const,
      description: 'Taking your first unassisted steps, speaking your first words, and realizing you are a distinct consciousness in the world.',
      quote: 'A thousand mornings of pure wonder and untamed discovery.',
      icon: '👣'
    },
    {
      id: 'token_5000_days',
      title: 'The Youthful Spark',
      subtitle: '5,000 Days Alive (~13.7 Years)',
      targetDays: 5000,
      category: 'youth' as const,
      description: 'Crossing the threshold of childhood into adolescence. The awakening of deep friendships, passions, and self-reflection.',
      quote: 'The world ceases to be small and becomes vast.',
      icon: '⚡'
    },
    {
      id: 'token_18_years',
      title: 'Coming of Age',
      subtitle: '18 Years Alive (6,574 Days)',
      targetDays: 6574,
      targetYears: 18,
      category: 'youth' as const,
      description: 'The formal transition to legal adulthood and self-sovereignty. The pen of your biography is now entirely in your own hand.',
      quote: 'You are no longer an apprentice to fate; you are its author.',
      icon: '🏛️'
    },
    {
      id: 'token_10000_days',
      title: 'The Ten-Thousand Sunrises',
      subtitle: '10,000 Days Alive (~27.4 Years)',
      targetDays: 10000,
      category: 'adulthood' as const,
      description: 'Ten thousand distinct rotations of planet Earth experienced in full adult vitality. Deepening career craft, love, and world awareness.',
      quote: 'Ten thousand days lived with courage makes an empire of memory.',
      icon: '☀️'
    },
    {
      id: 'token_15000_days',
      title: 'The Mid-Meridian Epoch',
      subtitle: '15,000 Days Alive (~41.1 Years)',
      targetDays: 15000,
      category: 'mastery' as const,
      description: 'The great midday of life. You have climbed high enough on the mountain to look back at the trail behind and forward to the peaks ahead.',
      quote: 'Midday brings the sharpest light. Cast off all that is trivial.',
      icon: '🧭'
    },
    {
      id: 'token_20000_days',
      title: 'The Sage’s Path',
      subtitle: '20,000 Days Alive (~54.8 Years)',
      targetDays: 20000,
      category: 'wisdom' as const,
      description: 'Twenty thousand days of human resilience. Knowledge has transmuted into wisdom; urgency gives way to presence and mentorship.',
      quote: 'To live twenty thousand days is to understand what truly endures.',
      icon: '🦉'
    },
    {
      id: 'token_25000_days',
      title: 'The Golden Arc',
      subtitle: '25,000 Days Alive (~68.4 Years)',
      targetDays: 25000,
      category: 'wisdom' as const,
      description: 'A quarter of a hundred thousand days. Seeing generations grow, possessing serenity that few can fathom in youth.',
      quote: 'The evening of life brings with it its own tranquil lamps.',
      icon: '👑'
    },
    {
      id: 'token_30000_days',
      title: 'The Century Walker',
      subtitle: '30,000 Days Alive (~82.1 Years)',
      targetDays: 30000,
      category: 'centennial' as const,
      description: 'The rare and majestic summit of human experience. Over 82 full revolutions around the sun.',
      quote: 'A life thoroughly lived leaves no debt to eternity.',
      icon: '✨'
    }
  ];

  const tokens: MilestoneToken[] = useMemo(() => {
    return TOKENS_CONFIG.map((t) => {
      const isUnlocked = daysAlive >= t.targetDays;
      const progressPercent = Math.min(100, Math.max(0, (daysAlive / t.targetDays) * 100));
      const daysRemaining = Math.max(0, t.targetDays - daysAlive);

      let achievedDate: string | undefined;
      if (isUnlocked) {
        const d = new Date(birthDate.getTime() + t.targetDays * 24 * 60 * 60 * 1000);
        achievedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }

      return {
        ...t,
        isUnlocked,
        achievedDate,
        progressPercent,
        daysRemaining
      };
    });
  }, [daysAlive, birthDate]);

  const unlockedCount = tokens.filter((t) => t.isUnlocked).length;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Tokens of Existence</span>
          </div>
          <h3 className="font-serif text-2xl text-neutral-100">
            Commemorative Milestones of Your Human Arc
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Collect sealed milestone medals for pivotal thresholds of your existence.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center">
          <div className="text-right font-mono">
            <div className="text-xs text-neutral-500 uppercase">Tokens Claimed</div>
            <div className="text-xl font-bold text-amber-300">
              {unlockedCount} / {tokens.length}
            </div>
          </div>
          <span className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-lg">
            🪙
          </span>
        </div>
      </div>

      {/* Grid of Tokens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tokens.map((token) => (
          <div
            key={token.id}
            onClick={() => setSelectedToken(token)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between group ${
              token.isUnlocked
                ? 'bg-gradient-to-b from-neutral-900 to-neutral-950 border-amber-500/40 hover:border-amber-400/80 shadow-md hover:shadow-amber-500/10'
                : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 opacity-80 hover:opacity-100'
            }`}
          >
            {token.isUnlocked && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 rounded-full blur-xl pointer-events-none" />
            )}

            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-3xl shrink-0 p-2.5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-inner group-hover:scale-110 transition-transform">
                  {token.icon}
                </span>

                {token.isUnlocked ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-semibold">
                    <CheckCircle2 className="w-3 h-3" /> Unlocked
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500 font-mono text-[10px]">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
              </div>

              <h4 className="font-serif text-base text-neutral-100 font-semibold group-hover:text-amber-200 transition-colors">
                {token.title}
              </h4>
              <div className="text-xs font-mono text-amber-400/90 font-medium mt-0.5">
                {token.subtitle}
              </div>

              <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                {token.description}
              </p>
            </div>

            {/* Bottom Status / Progress */}
            <div className="mt-4 pt-3 border-t border-neutral-800/60">
              {token.isUnlocked ? (
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Achieved on:</span>
                  <span className="text-amber-300 font-semibold">{token.achievedDate}</span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>Progress: {token.progressPercent.toFixed(1)}%</span>
                    <span>{token.daysRemaining.toLocaleString()} days to go</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                    <div
                      className="h-full bg-amber-400/80 rounded-full"
                      style={{ width: `${token.progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Token Details Modal */}
      {selectedToken && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedToken(null)}
        >
          <div 
            className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-neutral-950 border-2 border-amber-500/40 flex items-center justify-center text-4xl shadow-xl">
              {selectedToken.icon}
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
                {selectedToken.subtitle}
              </div>
              <h3 className="font-serif text-2xl text-neutral-100 font-bold mt-1">
                {selectedToken.title}
              </h3>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed px-2">
              {selectedToken.description}
            </p>

            <blockquote className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 font-serif italic text-amber-200 text-xs">
              "{selectedToken.quote}"
            </blockquote>

            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-400 flex items-center justify-between">
              <span>Status:</span>
              {selectedToken.isUnlocked ? (
                <span className="text-emerald-300 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Unlocked on {selectedToken.achievedDate}
                </span>
              ) : (
                <span className="text-amber-300">
                  {selectedToken.daysRemaining.toLocaleString()} days remaining
                </span>
              )}
            </div>

            <button
              onClick={() => setSelectedToken(null)}
              className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium rounded-xl text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
