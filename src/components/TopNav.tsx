import React, { useState } from 'react';
import { Sliders, Palette, Crown, Calendar, Lock } from 'lucide-react';
import { ThemePalette } from '../types';

interface TopNavProps {
  activeSection: string;
  currentPalette: ThemePalette;
  onChangePalette: (palette: ThemePalette) => void;
  onNavigate: (sectionId: string) => void;
  onOpenProfile: () => void;
  isDevVipActive: boolean;
  onToggleDevVip: () => void;
  onOpenCalendarSync: () => void;
  activeCategory?: 'matrix' | 'health' | 'loved-ones' | 'goals';
  onSelectCategory?: (cat: 'matrix' | 'health' | 'loved-ones' | 'goals') => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentPalette,
  onChangePalette,
  onNavigate,
  onOpenProfile,
  isDevVipActive,
  onToggleDevVip,
  onOpenCalendarSync
}) => {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [themeNotice, setThemeNotice] = useState<string | null>(null);

  const palettes: { id: ThemePalette; label: string; desc: string; dot: string; requiresDev?: boolean }[] = [
    { id: 'dark', label: 'Dark Mode', desc: 'Deep obsidian & golden candlelight', dot: 'bg-neutral-900 border border-neutral-700', requiresDev: false },
    { id: 'light', label: 'Light Mode', desc: 'Warm linen & daytime clarity', dot: 'bg-stone-200 border border-stone-400', requiresDev: false },
    { id: 'ember', label: 'Ember Glow', desc: 'Dark red text on pure black', dot: 'bg-red-600', requiresDev: true },
    { id: 'nordic', label: 'Nordic Frost', desc: 'Arctic night & ice cyan', dot: 'bg-sky-400', requiresDev: true },
    { id: 'emerald', label: 'Aethelgard Emerald', desc: 'Woodland pine & forest jade', dot: 'bg-emerald-400', requiresDev: true },
    { id: 'amethyst', label: 'Amethyst Dusk', desc: 'Twilight plum & starlight violet', dot: 'bg-purple-400', requiresDev: true },
    { id: 'solaris', label: 'Solaris Ochre', desc: 'Terracotta bronze & solar brass', dot: 'bg-amber-500', requiresDev: true }
  ];

  const handleSelectPalette = (p: typeof palettes[0]) => {
    if (p.requiresDev && !isDevVipActive) {
      setThemeNotice(`"${p.label}" requires Premium to be active.`);
      setTimeout(() => setThemeNotice(null), 3500);
      return;
    }
    onChangePalette(p.id);
    setIsThemeMenuOpen(false);
    setThemeNotice(null);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/85 backdrop-blur-md border-b border-neutral-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        
        {/* Brand Wordmark & Premium Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('perspective')}
            className="text-left group cursor-pointer focus-visible:outline-none"
          >
            <span className="font-display text-xl tracking-wider uppercase text-neutral-100 group-hover:text-amber-300 transition-colors whitespace-nowrap flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              Memento Mori
            </span>
          </button>

          {/* Premium Badge & Toggle */}
          <button
            onClick={onToggleDevVip}
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold transition-all cursor-pointer ${
              isDevVipActive
                ? 'bg-amber-400 text-neutral-950 shadow-md ring-1 ring-amber-300'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 border border-neutral-800'
            }`}
            title="Toggle Premium Pass to test all features and themes"
          >
            <Crown className={`w-3.5 h-3.5 ${isDevVipActive ? 'text-neutral-950 fill-neutral-950' : 'text-amber-400'}`} />
            <span>{isDevVipActive ? '⚡ PREMIUM: ACTIVE' : '⚡ Premium'}</span>
          </button>
        </div>

        {/* Zone 3: Actions, Atmosphere Palette, and Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* Calendar Sync button */}
          <button
            onClick={onOpenCalendarSync}
            title="Sync daily mortality reminders with calendar"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline font-medium">Sync Calendar</span>
          </button>

          {/* Global Theme Selector (Dark, Light, + Premium Exclusives) */}
          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              title="Change theme palette"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 transition-colors cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline capitalize font-medium">{currentPalette}</span>
              <span className={`w-2 h-2 rounded-full ${palettes.find(p => p.id === currentPalette)?.dot || 'bg-amber-400'}`} />
            </button>

            {isThemeMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-72 p-2 bg-neutral-900/95 backdrop-blur-md rounded-xl border border-neutral-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider text-neutral-500 font-semibold border-b border-neutral-800/80 mb-1 flex items-center justify-between">
                  <span>Theme Selection</span>
                  <span className="text-amber-400">{isDevVipActive ? 'All Unlocked' : 'Dark & Light'}</span>
                </div>

                {themeNotice && (
                  <div className="p-2 mb-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-[11px] font-mono text-amber-300 flex items-center justify-between gap-2">
                    <span>{themeNotice}</span>
                    <button
                      onClick={onToggleDevVip}
                      className="px-2 py-0.5 rounded bg-amber-400 text-neutral-950 font-bold text-[10px] cursor-pointer"
                    >
                      Enable Premium
                    </button>
                  </div>
                )}

                <div className="space-y-1 max-h-72 overflow-y-auto">
                  {palettes.map((p) => {
                    const isLocked = p.requiresDev && !isDevVipActive;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleSelectPalette(p)}
                        className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          currentPalette === p.id
                            ? 'bg-neutral-800 text-amber-300 font-semibold'
                            : isLocked
                            ? 'text-neutral-400 hover:bg-neutral-800/40 opacity-75'
                            : 'text-neutral-300 hover:bg-neutral-800/60'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${p.dot}`} />
                            <span className="font-medium">{p.label}</span>
                            {p.requiresDev && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                Premium
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-neutral-400 block pl-4 font-mono">{p.desc}</span>
                        </div>
                        {currentPalette === p.id ? (
                          <span className="text-amber-400 text-xs font-bold">✓</span>
                        ) : isLocked ? (
                          <Lock className="w-3.5 h-3.5 text-neutral-500" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onOpenProfile}
            title="Adjust profile & lifespan calculation"
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
          >
            <Sliders className="w-3.5 h-3.5 text-neutral-950" />
            <span className="hidden sm:inline">Details</span>
          </button>
        </div>
      </div>
    </header>
  );
};
