import { UserProfile, LovedOne, Milestone, DailyReflection, ThemePalette, LifeChapter, HealthMetrics } from '../types';
import { calculateEstimatedLifespan } from '../data/actuarialData';

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Alex Vance',
  birthDate: '1996-08-14',
  birthTime: '09:30',
  expectedAge: calculateEstimatedLifespan('USA', 'male', {
    exercise: 'active',
    sleep: 'optimal',
    smoking: 'never',
    stress: 'moderate',
    diet: 'balanced'
  }),
  country: 'USA',
  gender: 'male',
  lifestyle: {
    exercise: 'active',
    sleep: 'optimal',
    smoking: 'never',
    stress: 'moderate',
    diet: 'balanced'
  },
  quotePreference: 'stoic'
};

export function generateComprehensiveMilestones(currentAge: number = 30): Milestone[] {
  const pastDefinitions = [
    { id: 'p-1', age: 1, title: 'First Steps & Words', category: 'Family', notes: 'The miraculous beginning of human autonomy' },
  ];

  const futureDefinitions = [
    { id: 'f-1', age: 32, title: 'Master Conversational Japanese & Calligraphy', category: 'Mastery', notes: 'Acquiring an entirely new cultural lens' },
    { id: 'f-2', age: 35, title: 'Publish Original Book', category: 'Creative', notes: 'Distilling personal philosophy into tangible print' },
   
  ];

  const pastMilestones: Milestone[] = pastDefinitions.map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    targetAge: p.age,
    status: (currentAge > p.age) ? 'achieved' : 'in_progress',
    achievedDate: (currentAge > p.age) ? `${Math.floor(2026 - (currentAge - p.age))}-06-01` : undefined,
    notes: p.notes
  }));

  const futureMilestones: Milestone[] = futureDefinitions.map(f => ({
    id: f.id,
    title: f.title,
    category: f.category,
    targetAge: f.age,
    status: (currentAge >= f.age) ? 'achieved' : (f.age === 32 ? 'in_progress' : 'planned'),
    notes: f.notes
  }));

  return [...pastMilestones, ...futureMilestones];
}

export const DEMO_PROFILES: Record<string, { profile: UserProfile; lovedOnes: LovedOne[]; milestones: Milestone[] }> = {
  vance: {
    profile: DEFAULT_PROFILE,
    lovedOnes: [
      {
        id: 'lo-1',
        name: 'Mom & Dad',
        relationship: 'Parent',
        currentAge: 64,
        expectedAge: 82,
        visitsPerYear: 3,
        daysPerVisit: 4,
        notes: 'They live two states away. Sunday calls every week.'
      },
      {
        id: 'lo-2',
        name: 'Maya (Partner)',
        relationship: 'Partner',
        currentAge: 29,
        expectedAge: 87,
        visitsPerYear: 365,
        daysPerVisit: 1,
        notes: 'Living together in the city.'
      }
    ],
    milestones: generateComprehensiveMilestones(29.8)
  },
  marcus: {
    profile: {
      name: 'Marcus Sterling',
      birthDate: '1981-04-20',
      birthTime: '14:15',
      expectedAge: calculateEstimatedLifespan('GBR', 'male', {
        exercise: 'moderate',
        sleep: 'fair',
        smoking: 'never',
        stress: 'high',
        diet: 'balanced'
      }),
      country: 'GBR',
      gender: 'male',
      lifestyle: {
        exercise: 'moderate',
        sleep: 'fair',
        smoking: 'never',
        stress: 'high',
        diet: 'balanced'
      },
      quotePreference: 'stoic'
    },
    lovedOnes: [
      {
        id: 'm-lo-1',
        name: 'Father (Arthur)',
        relationship: 'Parent',
        currentAge: 76,
        expectedAge: 84,
        visitsPerYear: 4,
        daysPerVisit: 2,
        notes: 'Lives in the Cotswolds.'
      },
      {
        id: 'm-lo-2',
        name: 'Sophie (Daughter)',
        relationship: 'Child',
        currentAge: 11,
        expectedAge: 90,
        visitsPerYear: 365,
        daysPerVisit: 1,
        notes: 'Only 7 years left under the same roof before university.'
      }
    ],
    milestones: [
      {
        id: 'm-ms-1',
        title: 'Transition to independent advisory practice',
        category: 'career',
        targetAge: 48,
        status: 'in_progress'
      },
      {
        id: 'm-ms-2',
        title: 'Build family timber cabin in the lakes',
        category: 'family',
        targetAge: 52,
        status: 'planned'
      }
    ]
  }
};

const STORAGE_KEYS = {
  PROFILE: 'spark_life_profile_v2',
  LOVED_ONES: 'spark_life_loved_ones_v2',
  MILESTONES: 'spark_life_milestones_v2',
  REFLECTIONS: 'spark_life_reflections_v2',
  THEME: 'spark_life_theme_v2',
  SETUP_COMPLETED: 'spark_life_setup_completed_v3'
};

export function hasUserCompletedSetup(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return localStorage.getItem(STORAGE_KEYS.SETUP_COMPLETED) === 'true';
  } catch (e) {
    return false;
  }
}

export function setUserCompletedSetup(completed: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SETUP_COMPLETED, completed ? 'true' : 'false');
  } catch (e) {
    console.error('Failed to set setup status', e);
  }
}

export function loadProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migrate US to USA if needed
      const countryCode = parsed.country === 'US' ? 'USA' : (parsed.country || 'USA');
      const dataYear = parsed.dataYear || 2024;
      const calculatedAge = calculateEstimatedLifespan(
        countryCode,
        parsed.gender || 'male',
        parsed.lifestyle || DEFAULT_PROFILE.lifestyle,
        dataYear
      );
      return {
        ...parsed,
        country: countryCode,
        dataYear,
        expectedAge: calculatedAge
      };
    }
  } catch (e) {
    console.error('Failed to load profile', e);
  }
  return DEFAULT_PROFILE;
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    const dataYear = profile.dataYear || 2024;
    // Recalculate based on World Bank data, year, and lifestyle before saving
    const calculatedAge = calculateEstimatedLifespan(
      profile.country || 'USA',
      profile.gender || 'male',
      profile.lifestyle,
      dataYear
    );
    const updated = {
      ...profile,
      dataYear,
      expectedAge: calculatedAge
    };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
}

export function loadLovedOnes(): LovedOne[] {
  if (typeof window === 'undefined') return DEMO_PROFILES.vance.lovedOnes;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOVED_ONES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load loved ones', e);
  }
  return DEMO_PROFILES.vance.lovedOnes;
}

export function saveLovedOnes(lovedOnes: LovedOne[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.LOVED_ONES, JSON.stringify(lovedOnes));
  } catch (e) {
    console.error('Failed to save loved ones', e);
  }
}

export function loadMilestones(): Milestone[] {
  if (typeof window === 'undefined') return DEMO_PROFILES.vance.milestones;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MILESTONES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load milestones', e);
  }
  return DEMO_PROFILES.vance.milestones;
}

export function saveMilestones(milestones: Milestone[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(milestones));
  } catch (e) {
    console.error('Failed to save milestones', e);
  }
}

export function loadReflections(): Record<string, DailyReflection> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REFLECTIONS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load reflections', e);
  }
  return {};
}

export function saveReflection(reflection: DailyReflection): void {
  if (typeof window === 'undefined') return;
  try {
    const map = loadReflections();
    map[reflection.date] = reflection;
    localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(map));
  } catch (e) {
    console.error('Failed to save reflection', e);
  }
}

export const DEFAULT_LIFE_CHAPTERS: LifeChapter[] = [
  {
    id: 'ch-childhood',
    name: 'Childhood & Wonder',
    startAge: 0,
    endAge: 18,
    color: 'sky',
    description: 'First steps, curiosity, early school, and discovering the world.'
  },
  {
    id: 'ch-exploration',
    name: 'Exploration & Independence',
    startAge: 18,
    endAge: 28,
    color: 'emerald',
    description: 'College, first career milestones, travel, and shaping identity.'
  },
  {
    id: 'ch-building',
    name: 'Deep Craft & Family Building',
    startAge: 28,
    endAge: 48,
    color: 'amber',
    description: 'Mastery in work, nurturing deep roots, partner, and parenting.'
  },
  {
    id: 'ch-harvest',
    name: 'Leadership & Generosity',
    startAge: 48,
    endAge: 68,
    color: 'purple',
    description: 'Mentorship, high wisdom, freedom, and stewardship.'
  },
  {
    id: 'ch-wisdom',
    name: 'Grand Wisdom & Legacy',
    startAge: 68,
    endAge: 88,
    color: 'rose',
    description: 'Looking back with gratitude, peace, and timeless perspective.'
  }
];

export const DEFAULT_HEALTH_METRICS: HealthMetrics = {
  heightCm: 178,
  weightKg: 73,
  restingHeartRate: 64,
  vo2Max: 42,
  dailyWaterLiters: 2.0,
  nutritionScore: 8,
  sleepHours: 7.5,
  exerciseMinutesPerWeek: 180,
  smoking: 'never',
  alcoholDrinksPerWeek: 2,
  bmi: 23.0,
  biologicalAge: 27.5,
  yearsGainedOrLost: 3.2,
  adjustedLifespan: 87,
  isEnabled: false
};

export const AUTHORIZED_DEV_EMAIL = 'TEST';
export const DEV_PASSCODES = ['mementodev2026', 'MEMENTODEV2026', 'apptester', 'APPTESTER'];

export function loadDevVipMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem('mementomori_dev_vip_unlocked') === 'true';
  } catch {
    return false;
  }
}

export function saveDevVipMode(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('mementomori_dev_vip_unlocked', enabled ? 'true' : 'false');
  } catch (e) {
    console.error('Failed to save dev VIP mode', e);
  }
}

export function loadLifeChapters(): LifeChapter[] {
  if (typeof window === 'undefined') return DEFAULT_LIFE_CHAPTERS;
  try {
    const raw = localStorage.getItem('mementomori_life_chapters');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load life chapters', e);
  }
  return DEFAULT_LIFE_CHAPTERS;
}

export function saveLifeChapters(chapters: LifeChapter[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('mementomori_life_chapters', JSON.stringify(chapters));
  } catch (e) {
    console.error('Failed to save life chapters', e);
  }
}

export function loadHealthMetrics(): HealthMetrics {
  if (typeof window === 'undefined') return DEFAULT_HEALTH_METRICS;
  try {
    const raw = localStorage.getItem('mementomori_health_metrics');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load health metrics', e);
  }
  return DEFAULT_HEALTH_METRICS;
}

export function saveHealthMetrics(health: HealthMetrics): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('mementomori_health_metrics', JSON.stringify(health));
  } catch (e) {
    console.error('Failed to save health metrics', e);
  }
}

export function loadPalette(): ThemePalette {
  if (typeof window === 'undefined') return 'obsidian';
  try {
    const val = localStorage.getItem(STORAGE_KEYS.THEME) as ThemePalette;
    if (val && ['obsidian', 'ember', 'parchment', 'nordic', 'emerald', 'amethyst', 'solaris'].includes(val)) {
      return val;
    }
  } catch (e) {
    console.error('Failed to load palette', e);
  }
  return 'obsidian';
}

export function savePalette(palette: ThemePalette): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, palette);
  } catch (e) {
    console.error('Failed to save palette', e);
  }
}


