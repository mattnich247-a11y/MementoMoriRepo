import { ThemePalette } from '../types';

export interface ThemeConfig {
  id: ThemePalette;
  name: string;
  description: string;
  badge: string;
  appClass: string;
  cardClass: string;
  cardSolidClass: string;
  headerClass: string;
  navClass: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  tagClass: string;
  candleWaxGradient: string;
}

export const THEMES: Record<ThemePalette, ThemeConfig> = {
  dark: {
    id: 'dark',
    name: 'Dark Mode',
    description: 'Deep obsidian slate with golden candlelight',
    badge: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
    appClass: 'bg-neutral-950 text-neutral-100',
    cardClass: 'bg-neutral-900/40 border-neutral-800/80 text-neutral-100',
    cardSolidClass: 'bg-neutral-950/80 border-neutral-800 text-neutral-100',
    headerClass: 'bg-neutral-950/85 border-neutral-900/80',
    navClass: 'text-neutral-400 hover:text-neutral-200',
    textPrimary: 'text-neutral-100',
    textSecondary: 'text-neutral-300',
    textMuted: 'text-neutral-400',
    accentText: 'text-amber-400',
    accentBg: 'bg-amber-400 hover:bg-amber-300 text-neutral-950',
    accentBorder: 'border-amber-400/50',
    tagClass: 'bg-amber-400/10 text-amber-300 border border-amber-400/30',
    candleWaxGradient: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 18%, #d97706 85%, #92400e 100%)'
  },
  light: {
    id: 'light',
    name: 'Light Mode',
    description: 'Warm linen parchment and crisp daytime clarity',
    badge: 'bg-amber-100 text-amber-800 border-amber-300',
    appClass: 'bg-stone-50 text-stone-900',
    cardClass: 'bg-white border-stone-200 text-stone-900',
    cardSolidClass: 'bg-stone-100 border-stone-300 text-stone-900',
    headerClass: 'bg-stone-50/90 border-stone-200',
    navClass: 'text-stone-600 hover:text-stone-900',
    textPrimary: 'text-stone-900',
    textSecondary: 'text-stone-700',
    textMuted: 'text-stone-500',
    accentText: 'text-amber-600',
    accentBg: 'bg-amber-500 hover:bg-amber-600 text-white',
    accentBorder: 'border-amber-500',
    tagClass: 'bg-amber-50 text-amber-700 border border-amber-200',
    candleWaxGradient: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 18%, #d97706 85%, #92400e 100%)'
  },
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Dusk',
    description: 'Deep obsidian slate with golden candlelight',
    badge: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
    appClass: 'bg-neutral-950 text-neutral-100',
    cardClass: 'bg-neutral-900/40 border-neutral-800/80 text-neutral-100',
    cardSolidClass: 'bg-neutral-950/80 border-neutral-800 text-neutral-100',
    headerClass: 'bg-neutral-950/85 border-neutral-900/80',
    navClass: 'text-neutral-400 hover:text-neutral-200',
    textPrimary: 'text-neutral-100',
    textSecondary: 'text-neutral-300',
    textMuted: 'text-neutral-400',
    accentText: 'text-amber-400',
    accentBg: 'bg-amber-400 hover:bg-amber-300 text-neutral-950',
    accentBorder: 'border-amber-400/50',
    tagClass: 'bg-amber-400/10 text-amber-300 border border-amber-400/30',
    candleWaxGradient: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 18%, #d97706 85%, #92400e 100%)'
  },
  ember: {
    id: 'ember',
    name: 'Ember Glow',
    description: 'Black background with darker red text and fiery embers',
    badge: 'bg-red-950/60 text-red-400 border-red-900/40',
    appClass: 'bg-black text-red-500',
    cardClass: 'bg-neutral-950/80 border-red-950/70 text-red-400',
    cardSolidClass: 'bg-black/95 border-red-900/40 text-red-400',
    headerClass: 'bg-black/90 border-red-950/60',
    navClass: 'text-red-600 hover:text-red-400',
    textPrimary: 'text-red-400',
    textSecondary: 'text-red-500',
    textMuted: 'text-red-600/90',
    accentText: 'text-red-400',
    accentBg: 'bg-red-700 hover:bg-red-600 text-neutral-100',
    accentBorder: 'border-red-700/50',
    tagClass: 'bg-red-950/40 text-red-400 border border-red-900/40',
    candleWaxGradient: 'linear-gradient(180deg, #fecaca 0%, #f87171 20%, #b91c1c 85%, #450a0a 100%)'
  },
  parchment: {
    id: 'parchment',
    name: 'Parchment Warmth',
    description: 'Antique stone and warm linen paper',
    badge: 'bg-stone-800/80 text-amber-300 border-stone-700',
    appClass: 'bg-stone-950 text-stone-200',
    cardClass: 'bg-stone-900/40 border-stone-800/80 text-stone-200',
    cardSolidClass: 'bg-stone-950/85 border-stone-800 text-stone-200',
    headerClass: 'bg-stone-950/85 border-stone-900',
    navClass: 'text-stone-400 hover:text-stone-200',
    textPrimary: 'text-stone-100',
    textSecondary: 'text-stone-300',
    textMuted: 'text-stone-400',
    accentText: 'text-amber-300',
    accentBg: 'bg-amber-500 hover:bg-amber-400 text-neutral-950',
    accentBorder: 'border-amber-500/50',
    tagClass: 'bg-amber-900/20 text-amber-200 border border-amber-700/30',
    candleWaxGradient: 'linear-gradient(180deg, #fef9c3 0%, #fef08a 20%, #ca8a04 85%, #713f12 100%)'
  },
  nordic: {
    id: 'nordic',
    name: 'Nordic Frost',
    description: 'Arctic midnight with glacier blue accents',
    badge: 'bg-sky-950/60 text-sky-300 border-sky-800/40',
    appClass: 'bg-slate-950 text-slate-100',
    cardClass: 'bg-slate-900/40 border-slate-800/80 text-slate-100',
    cardSolidClass: 'bg-slate-950/85 border-slate-800 text-slate-100',
    headerClass: 'bg-slate-950/85 border-slate-900/80',
    navClass: 'text-slate-400 hover:text-slate-200',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',
    accentText: 'text-sky-300',
    accentBg: 'bg-sky-400 hover:bg-sky-300 text-slate-950',
    accentBorder: 'border-sky-400/50',
    tagClass: 'bg-sky-950/40 text-sky-300 border border-sky-800/40',
    candleWaxGradient: 'linear-gradient(180deg, #e0f2fe 0%, #bae6fd 20%, #0284c7 85%, #082f49 100%)'
  },
  emerald: {
    id: 'emerald',
    name: 'Aethelgard Emerald',
    description: 'Deep woodland moss and rejuvenating jade',
    badge: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40',
    appClass: 'bg-neutral-950 text-emerald-100',
    cardClass: 'bg-neutral-900/40 border-emerald-900/40 text-emerald-100',
    cardSolidClass: 'bg-neutral-950/85 border-emerald-800/50 text-emerald-100',
    headerClass: 'bg-neutral-950/85 border-emerald-950/80',
    navClass: 'text-emerald-400 hover:text-emerald-200',
    textPrimary: 'text-emerald-100',
    textSecondary: 'text-emerald-300',
    textMuted: 'text-emerald-500/80',
    accentText: 'text-emerald-400',
    accentBg: 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950',
    accentBorder: 'border-emerald-500/50',
    tagClass: 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40',
    candleWaxGradient: 'linear-gradient(180deg, #d1fae5 0%, #6ee7b7 20%, #059669 85%, #064e3b 100%)'
  },
  amethyst: {
    id: 'amethyst',
    name: 'Amethyst Dusk',
    description: 'Twilight purple with starlight violet glow',
    badge: 'bg-purple-950/60 text-purple-300 border-purple-800/40',
    appClass: 'bg-neutral-950 text-purple-100',
    cardClass: 'bg-neutral-900/40 border-purple-900/40 text-purple-100',
    cardSolidClass: 'bg-neutral-950/85 border-purple-800/50 text-purple-100',
    headerClass: 'bg-neutral-950/85 border-purple-950/80',
    navClass: 'text-purple-400 hover:text-purple-200',
    textPrimary: 'text-purple-100',
    textSecondary: 'text-purple-300',
    textMuted: 'text-purple-400/80',
    accentText: 'text-purple-300',
    accentBg: 'bg-purple-500 hover:bg-purple-400 text-neutral-950',
    accentBorder: 'border-purple-500/50',
    tagClass: 'bg-purple-950/40 text-purple-300 border border-purple-800/40',
    candleWaxGradient: 'linear-gradient(180deg, #f3e8ff 0%, #c084fc 20%, #7e22ce 85%, #3b0764 100%)'
  },
  solaris: {
    id: 'solaris',
    name: 'Solaris Ochre',
    description: 'Solar brass, desert sandstone and ancient bronze',
    badge: 'bg-amber-950/60 text-amber-300 border-amber-800/40',
    appClass: 'bg-stone-950 text-amber-100',
    cardClass: 'bg-stone-900/40 border-amber-900/40 text-amber-100',
    cardSolidClass: 'bg-stone-950/85 border-amber-800/50 text-amber-100',
    headerClass: 'bg-stone-950/85 border-amber-950/80',
    navClass: 'text-amber-400 hover:text-amber-200',
    textPrimary: 'text-amber-100',
    textSecondary: 'text-amber-300',
    textMuted: 'text-amber-500/80',
    accentText: 'text-amber-400',
    accentBg: 'bg-amber-500 hover:bg-amber-400 text-neutral-950',
    accentBorder: 'border-amber-500/50',
    tagClass: 'bg-amber-950/40 text-amber-300 border border-amber-800/40',
    candleWaxGradient: 'linear-gradient(180deg, #fef3c7 0%, #f59e0b 20%, #b45309 85%, #78350f 100%)'
  }
};
