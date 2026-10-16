export interface LifestyleFactors {
  exercise: 'sedentary' | 'moderate' | 'active' | 'athlete';
  sleep: 'poor' | 'fair' | 'optimal';
  smoking: 'never' | 'former' | 'current';
  stress: 'low' | 'moderate' | 'high';
  diet: 'standard' | 'balanced' | 'exceptional';
}

export interface UserProfile {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime?: string; // HH:mm
  expectedAge: number; // e.g. 84
  country: string;
  dataYear?: number; // e.g. 1960 to 2024
  gender: 'female' | 'male' | 'other';
  lifestyle: LifestyleFactors;
  quotePreference: 'stoic' | 'existential' | 'poetic' | 'mindfulness';
}

export interface LovedOne {
  id: string;
  name: string;
  relationship: 'Parent' | 'Child' | 'Partner' | 'Sibling' | 'Grandparent' | 'Close Friend' | 'Mentor';
  currentAge: number;
  expectedAge: number;
  visitsPerYear: number;
  daysPerVisit: number;
  notes?: string;
  lastContactDate?: string;
}

export type MilestoneCategory = string;
export type MilestoneStatus = 'planned' | 'in_progress' | 'achieved';

export interface MilestoneTimeframe {
  value: number;
  unit: 'days' | 'weeks' | 'months' | 'years';
}

export interface Milestone {
  id: string;
  title: string;
  category: string;
  targetAge?: number;
  targetTimeframe?: MilestoneTimeframe;
  targetDate?: string;
  status: MilestoneStatus;
  achievedDate?: string;
  notes?: string;
}

export type ThemePalette = 'dark' | 'light' | 'obsidian' | 'ember' | 'parchment' | 'nordic' | 'emerald' | 'amethyst' | 'solaris';

export interface LifetimeEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  category: 'Space & Cosmos' | 'Science & Tech' | 'World & Humanity' | 'Personal Milestone';
  isProjected: boolean;
}

export interface DailyReflection {
  date: string; // YYYY-MM-DD
  morningIntention: string;
  eveningGratitude: string;
  clarityScore: number; // 1-5
}

export interface LifeChapter {
  id: string;
  name: string;
  startAge: number;
  endAge: number;
  unit?: 'years' | 'months' | 'weeks';
  startVal?: number;
  endVal?: number;
  startWeek?: number;
  endWeek?: number;
  color: 'emerald' | 'sky' | 'amber' | 'rose' | 'purple' | 'indigo' | 'orange' | 'teal';
  description?: string;
}

export interface HealthMetrics {
  heightCm: number;
  weightKg: number;
  restingHeartRate: number; // BPM (45 - 110)
  vo2Max?: number | null; // ml/kg/min (optional, 20 - 70)
  dailyWaterLiters: number; // (0.5 - 5.0)
  nutritionScore: number; // 1 - 10 Mediterranean / Whole-foods Index
  sleepHours: number; // (4 - 11)
  exerciseMinutesPerWeek: number; // (0 - 600)
  smoking: 'never' | 'former' | 'current';
  alcoholDrinksPerWeek: number; // (0 - 30)
  
  // Computed values
  bmi: number;
  biologicalAge: number;
  yearsGainedOrLost: number;
  adjustedLifespan: number;
  isEnabled: boolean; // whether applied to primary countdown & matrix
}

export interface MilestoneToken {
  id: string;
  title: string;
  subtitle: string;
  targetDays: number;
  targetYears?: number;
  category: 'infancy' | 'youth' | 'adulthood' | 'mastery' | 'wisdom' | 'centennial';
  description: string;
  quote: string;
  isUnlocked: boolean;
  achievedDate?: string;
  progressPercent: number;
  daysRemaining: number;
  icon?: string;
}

export interface CountdownMetrics {
  totalLifespanDays: number;
  elapsedDays: number;
  remainingDays: number;
  percentElapsed: number;
  percentRemaining: number;
  
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  
  heartbeatsRemaining: number;
  breathsRemaining: number;
  sunrisesRemaining: number;
  weekendsRemaining: number;
  
  // New vitality moving metrics
  kissesRemaining: number;
  sharedMealsRemaining: number;
  
  nextDawnHours: number;
  nextDawnMinutes: number;
  nextDawnSeconds: number;
  nextWeekendDays: number;
  nextWeekendHours: number;
  nextWeekendMinutes: number;
  nextWeekendSeconds: number;

  yearProgressPercent: number;
  seasonName: string;
  seasonDaysRemaining: number;
  
  // New seasons metrics
  daysToNextEquinox: number;
  hoursToNextEquinox: number;
  minutesToNextEquinox: number;
  nextEquinoxName: string;
  nextEquinoxDate: string;
  fullMoonsRemaining: number;
  seasonsRemaining: {
    spring: number;
    summer: number;
    autumn: number;
    winter: number;
  };
}
