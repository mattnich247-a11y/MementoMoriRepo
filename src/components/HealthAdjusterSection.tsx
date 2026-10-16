import React, { useState, useMemo, useEffect } from 'react';
import { UserProfile, HealthMetrics } from '../types';
import { calculateAdjustedHealth } from '../utils/timeCalculations';
import { 
  Activity, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Droplet, 
  Apple, 
  CheckCircle2, 
  Crown,
  Plus,
  Trash2,
  Utensils,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Minus,
  RefreshCw,
  Scale,
  Wine,
  Info
} from 'lucide-react';

export interface MealNutrition {
  calories?: number;
  proteinGrams?: number;
  fiberGrams?: number;
  carbsGrams?: number;
  fatGrams?: number;
  notes?: string;
}

export interface MealEntry {
  id: string;
  name: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  score: number; // 1 to 10
  timestamp: string;
  nutrition?: MealNutrition;
}

interface HealthAdjusterSectionProps {
  profile: UserProfile;
  healthMetrics: HealthMetrics;
  onUpdateHealthMetrics: (metrics: HealthMetrics) => void;
  isPremiumOrDev: boolean;
  onToggleDevVip: () => void;
  isDevVipActive: boolean;
}

export const HealthAdjusterSection: React.FC<HealthAdjusterSectionProps> = ({
  profile,
  healthMetrics,
  onUpdateHealthMetrics,
  isPremiumOrDev,
  onToggleDevVip,
  isDevVipActive
}) => {
  const [formData, setFormData] = useState({
    heightCm: healthMetrics.heightCm,
    weightKg: healthMetrics.weightKg,
    restingHeartRate: healthMetrics.restingHeartRate,
    vo2Max: healthMetrics.vo2Max,
    dailyWaterLiters: healthMetrics.dailyWaterLiters,
    nutritionScore: healthMetrics.nutritionScore,
    sleepHours: healthMetrics.sleepHours,
    exerciseMinutesPerWeek: healthMetrics.exerciseMinutesPerWeek,
    smoking: healthMetrics.smoking,
    alcoholDrinksPerWeek: healthMetrics.alcoholDrinksPerWeek
  });

  // Keep formData in sync if healthMetrics change externally (e.g. from ProfileModal)
  useEffect(() => {
    setFormData({
      heightCm: healthMetrics.heightCm,
      weightKg: healthMetrics.weightKg,
      restingHeartRate: healthMetrics.restingHeartRate,
      vo2Max: healthMetrics.vo2Max,
      dailyWaterLiters: healthMetrics.dailyWaterLiters,
      nutritionScore: healthMetrics.nutritionScore,
      sleepHours: healthMetrics.sleepHours,
      exerciseMinutesPerWeek: healthMetrics.exerciseMinutesPerWeek,
      smoking: healthMetrics.smoking,
      alcoholDrinksPerWeek: healthMetrics.alcoholDrinksPerWeek
    });
  }, [
    healthMetrics.heightCm,
    healthMetrics.weightKg,
    healthMetrics.restingHeartRate,
    healthMetrics.vo2Max,
    healthMetrics.dailyWaterLiters,
    healthMetrics.nutritionScore,
    healthMetrics.sleepHours,
    healthMetrics.exerciseMinutesPerWeek,
    healthMetrics.smoking,
    healthMetrics.alcoholDrinksPerWeek
  ]);

  // Persistent Meals Log
  const [meals, setMeals] = useState<MealEntry[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem('mementomori_logged_meals');
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error(e);
    }
    return [
      { 
        id: 'm1', 
        name: 'Greek yogurt with berries & walnuts', 
        type: 'Breakfast', 
        score: 9, 
        timestamp: 'Today, 8:15 AM',
        nutrition: { calories: 340, proteinGrams: 24, fiberGrams: 6 } 
      },
      { 
        id: 'm2', 
        name: 'Mediterranean quinoa bowl & wild salmon', 
        type: 'Lunch', 
        score: 9, 
        timestamp: 'Today, 12:45 PM',
        nutrition: { calories: 580, proteinGrams: 42, fiberGrams: 9, notes: 'Wild salmon, avocado, olive oil' } 
      },
      { 
        id: 'm3', 
        name: 'Green tea & roasted almonds', 
        type: 'Snack', 
        score: 8, 
        timestamp: 'Today, 3:30 PM',
        nutrition: { calories: 160, proteinGrams: 6, fiberGrams: 3 } 
      }
    ];
  });

  // Persistent Water Log for today (in ml)
  const [todayWaterMl, setTodayWaterMl] = useState<number>(() => {
    return Math.round(healthMetrics.dailyWaterLiters * 1000);
  });

  // Persistent Individual Water Logs
  const [waterLogs, setWaterLogs] = useState<{ id: string; amountMl: number; glasses: number; type: string; timestamp: string; notes?: string }[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem('mementomori_logged_water');
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error(e);
    }
    return [
      { id: 'w1', amountMl: 500, glasses: 2, type: 'Filtered Water', timestamp: 'Today, 8:30 AM' },
      { id: 'w2', amountMl: 250, glasses: 1, type: 'Green Tea', timestamp: 'Today, 11:15 AM' }
    ];
  });

  const [isAddingWater, setIsAddingWater] = useState(false);
  const [waterLogGlasses, setWaterLogGlasses] = useState<string>('1');
  const [waterLogType, setWaterLogType] = useState<string>('Filtered Water');
  const [waterLogNotes, setWaterLogNotes] = useState<string>('');

  // Manual exact water input state for correcting mistakes
  const [exactWaterInput, setExactWaterInput] = useState<string>('');

  // New Meal Form State
  const [newMealName, setNewMealName] = useState('');
  const [newMealType, setNewMealType] = useState<MealEntry['type']>('Dinner');
  const [newMealScore, setNewMealScore] = useState<number>(8);
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [isConfirmingClearMeals, setIsConfirmingClearMeals] = useState(false);
  const [showAdvancedNutrition, setShowAdvancedNutrition] = useState(false);
  const [nutritionForm, setNutritionForm] = useState<MealNutrition>({
    calories: undefined,
    proteinGrams: undefined,
    fiberGrams: undefined,
    carbsGrams: undefined,
    fatGrams: undefined,
    notes: ''
  });

  const birthDate = useMemo(() => new Date(profile.birthDate), [profile.birthDate]);
  const now = new Date();
  const chronologicalAge = parseFloat(((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1));

  // Compute live calculation
  const computed = useMemo(() => {
    return calculateAdjustedHealth(profile.expectedAge, chronologicalAge, formData);
  }, [profile.expectedAge, chronologicalAge, formData]);

  // Derived clinical data
  const bmr = useMemo(() => {
    const base = 10 * formData.weightKg + 6.25 * formData.heightCm - 5 * chronologicalAge;
    return profile.gender === 'female' ? Math.round(base - 161) : Math.round(base + 5);
  }, [formData.weightKg, formData.heightCm, chronologicalAge, profile.gender]);

  const tdee = useMemo(() => {
    const activityMult = formData.exerciseMinutesPerWeek >= 300 ? 1.6 : formData.exerciseMinutesPerWeek >= 150 ? 1.45 : 1.25;
    return Math.round(bmr * activityMult);
  }, [bmr, formData.exerciseMinutesPerWeek]);

  // Factor by factor breakdown
  const factorBreakdown = useMemo(() => {
    const vo2Impact = (formData.vo2Max !== undefined && formData.vo2Max !== null) ? (formData.vo2Max - 35) * 0.08 : 0;
    const rhrImpact = (70 - formData.restingHeartRate) * 0.06;
    const waterImpact = (formData.dailyWaterLiters - 1.8) * 0.4;
    const nutritionImpact = (formData.nutritionScore - 5) * 0.35;
    const sleepImpact = (formData.sleepHours - 6.5) * 0.45;
    const exerciseImpact = (formData.exerciseMinutesPerWeek - 90) * 0.007;
    const smokingImpact = formData.smoking === 'never' ? 3.5 : formData.smoking === 'former' ? 1.0 : -4.5;
    const alcoholImpact = formData.alcoholDrinksPerWeek <= 2 ? 0.4 : formData.alcoholDrinksPerWeek <= 7 ? 0 : -0.2 * (formData.alcoholDrinksPerWeek - 7);

    return [
      { name: 'Cardiorespiratory (VO2 Max)', value: `${formData.vo2Max} ml/kg/min`, impact: vo2Impact, description: 'Oxygen delivery & heart longevity reserve' },
      { name: 'Resting Heart Rate', value: `${formData.restingHeartRate} BPM`, impact: rhrImpact, description: 'Lower resting beats conserve lifetime heartbeats' },
      { name: 'Hydration Level', value: `${formData.dailyWaterLiters.toFixed(2)} L/day`, impact: waterImpact, description: 'Cellular volume and renal waste clearance' },
      { name: 'Nutrition Index (Meals)', value: `${formData.nutritionScore}/10`, impact: nutritionImpact, description: 'Anti-inflammatory whole-foods ratio' },
      { name: 'Sleep Consistency', value: `${formData.sleepHours} hrs/night`, impact: sleepImpact, description: 'Neurovascular and cellular DNA repair' },
      { name: 'Active Exercise', value: `${formData.exerciseMinutesPerWeek} mins/wk`, impact: exerciseImpact, description: 'Mitochondrial density and arterial elasticity' },
      { name: 'Smoking Status', value: formData.smoking.toUpperCase(), impact: smokingImpact, description: 'Cardiovascular and oncological protection' },
      { name: 'Alcohol Moderation', value: `${formData.alcoholDrinksPerWeek} drinks/wk`, impact: alcoholImpact, description: 'Hepatic and metabolic preservation' }
    ];
  }, [formData]);

  const handleChange = (field: string, value: any) => {
    const updatedForm = { ...formData, [field]: value };
    setFormData(updatedForm);

    const result = calculateAdjustedHealth(profile.expectedAge, chronologicalAge, updatedForm);
    onUpdateHealthMetrics({
      ...updatedForm,
      ...result,
      isEnabled: healthMetrics.isEnabled
    });
  };

  const handleToggleApply = () => {
    if (!isDevVipActive) return;
    onUpdateHealthMetrics({
      ...healthMetrics,
      ...formData,
      ...computed,
      isEnabled: !healthMetrics.isEnabled
    });
  };

  // Water quick log & mistake correction
  const handleAddWater = (ml: number) => {
    const updatedTotal = Math.max(0, todayWaterMl + ml);
    setTodayWaterMl(updatedTotal);
    const inLiters = parseFloat((updatedTotal / 1000).toFixed(2));
    handleChange('dailyWaterLiters', inLiters);
    if (ml > 0) {
      const glasses = parseFloat((ml / 250).toFixed(1));
      const entry = {
        id: `w-${Date.now()}`,
        amountMl: ml,
        glasses,
        type: 'Quick Log',
        timestamp: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      };
      const updatedLogs = [entry, ...waterLogs];
      setWaterLogs(updatedLogs);
      try {
        localStorage.setItem('mementomori_logged_water', JSON.stringify(updatedLogs));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleLogWaterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const glasses = parseFloat(waterLogGlasses) || 1;
    const ml = Math.round(glasses * 250);
    const newEntry = {
      id: `w-${Date.now()}`,
      amountMl: ml,
      glasses,
      type: waterLogType,
      timestamp: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      notes: waterLogNotes.trim() || undefined
    };
    const updatedLogs = [newEntry, ...waterLogs];
    setWaterLogs(updatedLogs);
    try {
      localStorage.setItem('mementomori_logged_water', JSON.stringify(updatedLogs));
    } catch (err) {
      console.error(err);
    }
    const updatedTotal = todayWaterMl + ml;
    setTodayWaterMl(updatedTotal);
    handleChange('dailyWaterLiters', parseFloat((updatedTotal / 1000).toFixed(2)));
    setIsAddingWater(false);
    setWaterLogNotes('');
  };

  const handleDeleteWaterLog = (id: string) => {
    const target = waterLogs.find(w => w.id === id);
    const updatedLogs = waterLogs.filter(w => w.id !== id);
    setWaterLogs(updatedLogs);
    try {
      localStorage.setItem('mementomori_logged_water', JSON.stringify(updatedLogs));
    } catch (err) {
      console.error(err);
    }
    if (target) {
      const updatedTotal = Math.max(0, todayWaterMl - target.amountMl);
      setTodayWaterMl(updatedTotal);
      handleChange('dailyWaterLiters', parseFloat((updatedTotal / 1000).toFixed(2)));
    }
  };

  const handleClearAllWater = () => {
    setTodayWaterMl(0);
    setWaterLogs([]);
    try {
      localStorage.removeItem('mementomori_logged_water');
    } catch (err) {
      console.error(err);
    }
    handleChange('dailyWaterLiters', 0);
  };

  const handleSetExactWater = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(exactWaterInput, 10);
    if (!isNaN(val) && val >= 0) {
      setTodayWaterMl(val);
      const inLiters = parseFloat((val / 1000).toFixed(2));
      handleChange('dailyWaterLiters', inLiters);
      setExactWaterInput('');
    }
  };

  const handleResetWater = () => {
    handleClearAllWater();
  };

  // Meal log add with optional advanced nutrition details
  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMealName.trim()) return;

    const hasNutrition = Boolean(
      (nutritionForm.calories && nutritionForm.calories > 0) ||
      (nutritionForm.proteinGrams && nutritionForm.proteinGrams > 0) ||
      (nutritionForm.fiberGrams && nutritionForm.fiberGrams > 0) ||
      (nutritionForm.carbsGrams && nutritionForm.carbsGrams > 0) ||
      (nutritionForm.fatGrams && nutritionForm.fatGrams > 0) ||
      (nutritionForm.notes && nutritionForm.notes.trim().length > 0)
    );

    const newEntry: MealEntry = {
      id: `m-${Date.now()}`,
      name: newMealName.trim(),
      type: newMealType,
      score: newMealScore,
      timestamp: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      nutrition: hasNutrition ? {
        ...(nutritionForm.calories ? { calories: Number(nutritionForm.calories) } : {}),
        ...(nutritionForm.proteinGrams ? { proteinGrams: Number(nutritionForm.proteinGrams) } : {}),
        ...(nutritionForm.fiberGrams ? { fiberGrams: Number(nutritionForm.fiberGrams) } : {}),
        ...(nutritionForm.carbsGrams ? { carbsGrams: Number(nutritionForm.carbsGrams) } : {}),
        ...(nutritionForm.fatGrams ? { fatGrams: Number(nutritionForm.fatGrams) } : {}),
        ...(nutritionForm.notes?.trim() ? { notes: nutritionForm.notes.trim() } : {})
      } : undefined
    };

    const updated = [newEntry, ...meals];
    setMeals(updated);
    try {
      localStorage.setItem('mementomori_logged_meals', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    // Adjust nutrition score from meals average
    const avgScore = Math.round(updated.reduce((sum, m) => sum + m.score, 0) / updated.length);
    handleChange('nutritionScore', avgScore);

    // Reset form
    setNewMealName('');
    setNutritionForm({
      calories: undefined,
      proteinGrams: undefined,
      fiberGrams: undefined,
      carbsGrams: undefined,
      fatGrams: undefined,
      notes: ''
    });
    setShowAdvancedNutrition(false);
    setIsAddingMeal(false);
  };

  const handleDeleteMeal = (id: string) => {
    const updated = meals.filter(m => m.id !== id);
    setMeals(updated);
    try {
      localStorage.setItem('mementomori_logged_meals', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    if (updated.length > 0) {
      const avgScore = Math.round(updated.reduce((sum, m) => sum + m.score, 0) / updated.length);
      handleChange('nutritionScore', avgScore);
    } else {
      handleChange('nutritionScore', 5);
    }
  };

  const handleClearAllMeals = () => {
    setMeals([]);
    try {
      localStorage.removeItem('mementomori_logged_meals');
    } catch (err) {
      console.error(err);
    }
    handleChange('nutritionScore', 5);
    setIsConfirmingClearMeals(false);
  };

  const loadPreset = (preset: 'bluezone' | 'athlete' | 'sedentary' | 'balanced') => {
    let presetData: typeof formData;
    if (preset === 'bluezone') {
      presetData = {
        heightCm: 175,
        weightKg: 68,
        restingHeartRate: 54,
        vo2Max: 48,
        dailyWaterLiters: 2.8,
        nutritionScore: 10,
        sleepHours: 8.0,
        exerciseMinutesPerWeek: 300,
        smoking: 'never',
        alcoholDrinksPerWeek: 1
      };
    } else if (preset === 'athlete') {
      presetData = {
        heightCm: 180,
        weightKg: 75,
        restingHeartRate: 48,
        vo2Max: 56,
        dailyWaterLiters: 3.5,
        nutritionScore: 9,
        sleepHours: 8.5,
        exerciseMinutesPerWeek: 450,
        smoking: 'never',
        alcoholDrinksPerWeek: 0
      };
    } else if (preset === 'sedentary') {
      presetData = {
        heightCm: 172,
        weightKg: 88,
        restingHeartRate: 78,
        vo2Max: 28,
        dailyWaterLiters: 1.2,
        nutritionScore: 4,
        sleepHours: 6.0,
        exerciseMinutesPerWeek: 45,
        smoking: 'current',
        alcoholDrinksPerWeek: 12
      };
    } else {
      presetData = {
        heightCm: 178,
        weightKg: 73,
        restingHeartRate: 64,
        vo2Max: 42,
        dailyWaterLiters: 2.4,
        nutritionScore: 8,
        sleepHours: 7.5,
        exerciseMinutesPerWeek: 180,
        smoking: 'never',
        alcoholDrinksPerWeek: 2
      };
    }
    setFormData(presetData);
    setTodayWaterMl(Math.round(presetData.dailyWaterLiters * 1000));
    const result = calculateAdjustedHealth(profile.expectedAge, chronologicalAge, presetData);
    onUpdateHealthMetrics({
      ...presetData,
      ...result,
      isEnabled: isDevVipActive ? healthMetrics.isEnabled : false
    });
  };

  // LOCKED STATE: THE ENTIRE HEALTH SECTION IS LOCKED BEHIND PREMIUM
  if (!isDevVipActive) {
    return (
      <section id="health" className="w-full py-12 border-b border-neutral-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Advanced Health & Longevity Section</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-400" /> Premium Required
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 tracking-tight">
                Biological Age & Lifespan Adjustments
              </h2>
              <p className="text-sm text-neutral-400 max-w-2xl mt-1">
                Advanced clinical longevity modeling, whole-foods nutrition & hydration intake tracking, and biological age calculations.
              </p>
            </div>

            <button
              onClick={onToggleDevVip}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-lg shadow-amber-400/20 transition-all cursor-pointer shrink-0"
            >
              <Crown className="w-3.5 h-3.5 fill-neutral-950" />
              <span>⚡ Activate Premium</span>
            </button>
          </div>

          {/* Premium Lock Screen Panel */}
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/60 border border-neutral-800 text-center max-w-3xl mx-auto relative overflow-hidden backdrop-blur-md shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto mb-5 text-amber-400">
              <Lock className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold mb-3">
              <Crown className="w-3.5 h-3.5" />
              <span>PREMIUM EXCLUSIVE</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-100 font-bold mb-3">
              The Health Section is Locked Behind Premium
            </h3>
            
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl mx-auto">
              Unlock the complete longevity laboratory to calibrate your biological age against your calendar age, track nutrition and water intake with full mistake undoing, and dynamically alter your 4,000 weeks horizon.
            </p>

            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 text-left max-w-md mx-auto mb-6 space-y-2 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2 text-amber-300 font-semibold mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Protected Features:</span>
              </div>
              <ul className="space-y-1.5 pl-5 list-disc text-neutral-400">
                <li>Biological age vs. chronological age modeling</li>
                <li>Daily hydration tracker with mistake removal & undo</li>
                <li>Meal logger with optional advanced nutrition & macros</li>
                <li>Factor-by-factor breakdown of years gained or lost</li>
                <li>Mifflin-St Jeor Basal Metabolic Rate (BMR) & TDEE</li>
              </ul>
            </div>

            <button
              onClick={onToggleDevVip}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm font-mono transition-transform active:scale-95 cursor-pointer shadow-lg shadow-amber-400/20 inline-flex items-center gap-2"
            >
              <Crown className="w-4 h-4 fill-neutral-950" />
              <span>⚡ Enter Developer Code to Unlock</span>
            </button>
            
            <p className="text-[11px] text-neutral-500 font-mono mt-4">
              Access is gated for the developer (mattnich247@gmail.com). Enter your clearance passcode to unlock.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // UNLOCKED STATE: PREMIUM ACTIVE
  return (
    <section id="health" className="w-full py-12 border-b border-neutral-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Advanced Health & Longevity Section</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Biological Age Modeling
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 tracking-tight">
              Biological Age & Lifespan Adjustments
            </h2>
            <p className="text-sm text-neutral-400 max-w-2xl mt-1">
              Combines your weight, height, resting BPM, VO2 Max, meals, and hydration data to show how each factor adjusts your lifespan and biological age.
            </p>
          </div>

          {/* Action Button: Premium Badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onToggleDevVip}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/20 ring-2 ring-amber-300 transition-all cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 fill-neutral-950 text-neutral-950" />
              <span>⚡ PREMIUM: UNLOCKED</span>
            </button>
          </div>
        </div>

        {/* TOP SUMMARY CARDS: BIOLOGICAL AGE VS CHRONOLOGICAL HORIZON */}
        <div className="p-6 mb-8 bg-gradient-to-br from-emerald-950/30 via-neutral-900 to-neutral-950 border border-emerald-500/30 rounded-2xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            
            {/* Card 1: Chronological Age */}
            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                Chronological Age
              </span>
              <div className="text-3xl font-serif text-neutral-100 font-bold">
                {chronologicalAge} <span className="text-sm font-sans font-normal text-neutral-400">Years</span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                Calendar years since {profile.birthDate}
              </p>
            </div>

            {/* Card 2: Biological Age */}
            <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  Biological Age
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                  {computed.biologicalAge < chronologicalAge ? 'Cellular Advantage' : 'Elevated'}
                </span>
              </div>
              <div className="text-3xl font-serif text-emerald-300 font-bold">
                {computed.biologicalAge} <span className="text-sm font-sans font-normal text-emerald-400/80">Years</span>
              </div>
              <p className="text-[11px] text-emerald-300/80 mt-1">
                {computed.biologicalAge < chronologicalAge
                  ? `${(chronologicalAge - computed.biologicalAge).toFixed(1)} years younger cellularly`
                  : `${(computed.biologicalAge - chronologicalAge).toFixed(1)} years older than calendar age`}
              </p>
            </div>

            {/* Card 3: Longevity Dividend (Gained/Lost) */}
            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                Net Time Gained / Lost
              </span>
              <div className={`text-3xl font-serif font-bold ${computed.yearsGainedOrLost >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {computed.yearsGainedOrLost >= 0 ? `+${computed.yearsGainedOrLost}` : computed.yearsGainedOrLost} <span className="text-sm font-sans font-normal text-neutral-400">Years</span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                ~{Math.round(Math.abs(computed.yearsGainedOrLost) * 365.25).toLocaleString()} days of life impacted
              </p>
            </div>

            {/* Card 4: Adjusted Lifespan & Apply Button */}
            <div className="p-4 rounded-xl bg-neutral-950/80 border border-amber-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
                  Adjusted Lifespan
                </span>
                <div className="text-3xl font-serif text-amber-300 font-bold">
                  {computed.adjustedLifespan} <span className="text-sm font-sans font-normal text-neutral-400">Years</span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5 font-mono">
                  Baseline: {profile.expectedAge} years
                </div>
              </div>

              <div className="mt-3">
                <button
                  onClick={handleToggleApply}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    healthMetrics.isEnabled
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{healthMetrics.isEnabled ? '✓ Applied to Countdown & Matrix' : 'Apply to Countdown & Matrix'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* INTERACTIVE DAILY NUTRITION & WATER INPUT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Hydration Tracker & Mistake Correction Logger */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                <Droplet className="w-4 h-4 text-sky-400" />
                <span>Daily Water & Hydration Logger</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-sky-950 border border-sky-800/60 text-sky-300 font-bold">
                  {todayWaterMl.toLocaleString()} / 2,000 ml ({Math.min(100, Math.round((todayWaterMl / 2000) * 100))}%)
                </span>
                <button
                  type="button"
                  onClick={() => setIsAddingWater(!isAddingWater)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-300 hover:bg-sky-500/25 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAddingWater ? 'Cancel' : 'Log Water'}</span>
                </button>
              </div>
            </div>

            {/* Daily Totals in Liters & Glasses of Water */}
            <div>
              <div className="flex justify-between items-baseline text-xs font-mono text-neutral-300 mb-1.5">
                <span className="font-semibold text-sky-200">
                  Today's Total: {formData.dailyWaterLiters.toFixed(2)} Liters (~{(todayWaterMl / 250).toFixed(1)} glasses of water)
                </span>
                <span className="text-neutral-400 text-[11px]">
                  Target: 2.0 L (8 glasses of water)
                </span>
              </div>
              <div className="w-full h-3 bg-neutral-950 rounded-full border border-neutral-800 overflow-hidden flex">
                <div
                  className="h-full bg-gradient-to-r from-sky-600 via-sky-400 to-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (todayWaterMl / 2000) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                <span>0 Glasses</span>
                <span>4 Glasses (1.0 L)</span>
                <span className="text-sky-300 font-semibold">Goal: 8 Glasses (2.0 L)</span>
              </div>
            </div>

            {/* Log Water Form (Matches Log Meal Form) */}
            {isAddingWater && (
              <form onSubmit={handleLogWaterSubmit} className="p-4 rounded-xl bg-neutral-950 border border-sky-500/30 space-y-3 animate-in fade-in">
                <h4 className="text-xs font-mono font-semibold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5" />
                  <span>Log Water Intake</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-neutral-400 font-mono block mb-1">Quantity (Glasses of Water)</label>
                    <div className="flex gap-1.5 mb-1.5">
                      {['1', '2', '3', '4'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setWaterLogGlasses(g)}
                          className={`flex-1 py-1 px-2 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                            waterLogGlasses === g
                              ? 'bg-sky-500/20 border-sky-400 text-sky-200 font-bold'
                              : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {g} {g === '1' ? 'glass' : 'glasses'}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      max="20"
                      value={waterLogGlasses}
                      onChange={(e) => setWaterLogGlasses(e.target.value)}
                      placeholder="e.g. 1.5 glasses"
                      className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-100 focus:outline-none focus:border-sky-500"
                    />
                    <span className="text-[10px] text-neutral-500 mt-0.5 block font-mono">
                      ~{Math.round((parseFloat(waterLogGlasses) || 0) * 250)} ml (1 glass = 250 ml / 8.45 oz)
                    </span>
                  </div>

                  <div>
                    <label className="text-neutral-400 font-mono block mb-1">Beverage / Hydration Type</label>
                    <select
                      value={waterLogType}
                      onChange={(e) => setWaterLogType(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-200"
                    >
                      <option value="Filtered Water">Filtered Water (100% water)</option>
                      <option value="Mineral Spring Water">Mineral Spring Water (100% water)</option>
                      <option value="Sparkling Water">Sparkling Water / Seltzer (100% water)</option>
                      <option value="Pop / Soda">Pop / Soda (~89% water · ~220ml/glass)</option>
                      <option value="Fruit Juice">Fruit Juice (100% juice · ~88% water)</option>
                      <option value="Herbal Tea">Herbal Tea (Caffeine-Free · 100% water)</option>
                      <option value="Coffee & Tea">Coffee & Tea (~98% water · ~245ml/cup)</option>
                      <option value="Electrolyte Hydration">Electrolyte Hydration (~95% water)</option>
                      <option value="Lemon Infused Water">Lemon Infused Water (100% water)</option>
                      <option value="Milk / Plant Milk">Milk / Plant Milk (~88% water)</option>
                    </select>

                    <div className="mt-1 text-[10px] text-sky-300 font-mono">
                      Tip: 1 can of pop (355ml) ≈ 315ml water; 1 glass of juice (250ml) ≈ 220ml water.
                    </div>

                    <label className="text-neutral-400 font-mono block mt-2 mb-1">Notes (Optional)</label>
                    <input
                      type="text"
                      value={waterLogNotes}
                      onChange={(e) => setWaterLogNotes(e.target.value)}
                      placeholder="e.g. Can of ginger ale, fresh OJ, post-workout"
                      className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-200"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsAddingWater(false)}
                    className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-sky-500 hover:bg-sky-400 text-neutral-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Confirm & Log Water
                  </button>
                </div>
              </form>
            )}

            {/* Pop & Juice Water Content Reference Guide Note (Requirement 4) */}
            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-sky-300">
                <Info className="w-4 h-4 text-sky-400 shrink-0" />
                <span>How Much Water is in Pop, Juice & Other Beverages?</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
                You can accurately include common beverages toward your daily hydration goal based on their true water content:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-lg bg-neutral-950/80 border border-neutral-800/80">
                  <div className="flex items-center justify-between text-amber-300 font-bold mb-0.5">
                    <span>🥤 Pop / Soda</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-200">~89% Water</span>
                  </div>
                  <span className="text-neutral-400 text-[10px] leading-tight block">
                    A standard 355 ml (12 oz) can contains <strong>~315 ml</strong> water (~1.25 glasses).
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-neutral-950/80 border border-neutral-800/80">
                  <div className="flex items-center justify-between text-orange-300 font-bold mb-0.5">
                    <span>🧃 100% Fruit Juice</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-200">~88% Water</span>
                  </div>
                  <span className="text-neutral-400 text-[10px] leading-tight block">
                    A standard 250 ml (8.5 oz) glass contains <strong>~220 ml</strong> water (~0.9 glass).
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-neutral-950/80 border border-neutral-800/80">
                  <div className="flex items-center justify-between text-emerald-300 font-bold mb-0.5">
                    <span>☕ Coffee & Tea</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-200">~98% Water</span>
                  </div>
                  <span className="text-neutral-400 text-[10px] leading-tight block">
                    A 250 ml mug provides <strong>~245 ml</strong> water (mild caffeine doesn't negate hydration).
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-neutral-950/80 border border-neutral-800/80">
                  <div className="flex items-center justify-between text-sky-300 font-bold mb-0.5">
                    <span>💧 Sparkling & Seltzer</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-200">100% Water</span>
                  </div>
                  <span className="text-neutral-400 text-[10px] leading-tight block">
                    Plain seltzer or sparkling spring water hydrates 1:1 identical to still water.
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Add Buttons in Glasses & Specific Drinks */}
            <div>
              <span className="text-xs font-mono text-neutral-400 block mb-2">Quick Add Intake:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handleAddWater(250)}
                  className="py-2 px-2.5 rounded-xl bg-neutral-950 hover:bg-sky-950/40 border border-neutral-800 hover:border-sky-500/40 text-xs font-mono text-sky-300 transition-colors cursor-pointer text-center"
                >
                  +1 Glass (250 ml)
                </button>
                <button
                  type="button"
                  onClick={() => handleAddWater(315)}
                  title="355 ml can of pop contains ~315 ml water"
                  className="py-2 px-2.5 rounded-xl bg-neutral-950 hover:bg-amber-950/40 border border-neutral-800 hover:border-amber-500/40 text-xs font-mono text-amber-300 transition-colors cursor-pointer text-center"
                >
                  +Can of Pop (315 ml)
                </button>
                <button
                  type="button"
                  onClick={() => handleAddWater(220)}
                  title="250 ml glass of fruit juice contains ~220 ml water"
                  className="py-2 px-2.5 rounded-xl bg-neutral-950 hover:bg-orange-950/40 border border-neutral-800 hover:border-orange-500/40 text-xs font-mono text-orange-300 transition-colors cursor-pointer text-center"
                >
                  +Juice Glass (220 ml)
                </button>
                <button
                  type="button"
                  onClick={() => handleAddWater(500)}
                  className="py-2 px-2.5 rounded-xl bg-neutral-950 hover:bg-sky-950/40 border border-neutral-800 hover:border-sky-500/40 text-xs font-mono text-sky-300 transition-colors cursor-pointer text-center"
                >
                  +2 Glasses (500 ml)
                </button>
              </div>
            </div>

            {/* Mistake Correction & Removal Options with CLEAR BUTTON FOR WATER INTAKE */}
            <div className="pt-2 border-t border-neutral-800/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-amber-400/90">Fix Mistake / Clear Water Intake:</span>
                <button
                  type="button"
                  onClick={handleClearAllWater}
                  disabled={todayWaterMl === 0 && waterLogs.length === 0}
                  className="px-2.5 py-1 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-[11px] font-mono text-rose-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1.5"
                  title="Clear all water intake logged today"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear All Water Logged</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleAddWater(-250)}
                  disabled={todayWaterMl <= 0}
                  className="py-1.5 px-2.5 rounded-xl bg-neutral-950 hover:bg-rose-950/30 border border-neutral-800 hover:border-rose-500/40 text-[11px] font-mono text-rose-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
                >
                  <Minus className="w-3 h-3" />
                  <span>-1 Glass / 250 ml (Undo)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAddWater(-500)}
                  disabled={todayWaterMl < 500}
                  className="py-1.5 px-2.5 rounded-xl bg-neutral-950 hover:bg-rose-950/30 border border-neutral-800 hover:border-rose-500/40 text-[11px] font-mono text-rose-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
                >
                  <Minus className="w-3 h-3" />
                  <span>-2 Glasses / 500 ml (Undo)</span>
                </button>
              </div>

              {/* Set Exact Manual Amount without prepended 0 */}
              <form onSubmit={handleSetExactWater} className="mt-3 flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="10000"
                  step="50"
                  placeholder="Set exact amount in ml"
                  value={exactWaterInput}
                  onChange={(e) => setExactWaterInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  disabled={!exactWaterInput}
                  className="px-3 py-1.5 bg-sky-950 hover:bg-sky-900 border border-sky-800 text-sky-200 text-xs font-mono rounded-lg disabled:opacity-40 transition-colors cursor-pointer"
                >
                  Set Exact
                </button>
              </form>
            </div>

            {/* Today's Logged Water Entries List */}
            {waterLogs.length > 0 && (
              <div className="pt-2 border-t border-neutral-800/60 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Today's Logged Drinks ({waterLogs.length})</span>
                  <span>{(todayWaterMl / 250).toFixed(1)} glasses total</span>
                </div>
                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                  {waterLogs.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-2 rounded-lg bg-neutral-950/80 border border-neutral-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Droplet className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <div>
                          <div className="font-medium text-neutral-200 text-[11px] flex items-center gap-1.5">
                            <span>{entry.type}</span>
                            <span className="text-neutral-500">·</span>
                            <span className="text-sky-300 font-mono font-semibold">
                              {entry.glasses} {entry.glasses === 1 ? 'glass' : 'glasses'} ({entry.amountMl} ml)
                            </span>
                          </div>
                          <div className="text-[10px] text-neutral-500 font-mono">
                            {entry.timestamp} {entry.notes ? `— ${entry.notes}` : ''}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteWaterLog(entry.id)}
                        className="p-1 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Delete this water entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="text-[11px] text-neutral-400">
              Optimal daily hydration (2.0 L or 8 glasses) reduces cardiovascular strain, lowers blood viscosity, and adds ~0.4 years of cellular longevity.
            </p>
          </div>

          {/* Meals & Whole-Foods Logger with Advanced Nutrition Details */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                <Utensils className="w-4 h-4 text-emerald-400" />
                <span>Meals & Whole-Foods Intake Logger</span>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingMeal(!isAddingMeal)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAddingMeal ? 'Cancel' : 'Log Meal'}</span>
              </button>
            </div>

            {/* Add Meal Form */}
            {isAddingMeal && (
              <form onSubmit={handleAddMeal} className="p-4 rounded-xl bg-neutral-950 border border-emerald-500/30 space-y-3 animate-in fade-in">
                <div>
                  <label className="text-xs font-mono text-neutral-400 block mb-1">Meal Description & Foods</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Grilled salmon, avocado salad, olive oil, berries"
                    value={newMealName}
                    onChange={(e) => setNewMealName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-neutral-400 font-mono block mb-1">Meal Type</label>
                    <select
                      value={newMealType}
                      onChange={(e) => setNewMealType(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-200"
                    >
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dinner">Dinner</option>
                      <option value="Snack">Snack</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-neutral-400 font-mono block mb-1">Quality Score (1-10)</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={newMealScore}
                      onChange={(e) => setNewMealScore(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-200"
                    />
                  </div>
                </div>

                {/* Advanced Nutrition Details (Optional Toggle) */}
                <div className="pt-2 border-t border-neutral-900">
                  <button
                    type="button"
                    onClick={() => setShowAdvancedNutrition(!showAdvancedNutrition)}
                    className="w-full py-1 px-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-emerald-400 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Advanced Nutrition Details (Optional)</span>
                    {showAdvancedNutrition ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {showAdvancedNutrition && (
                    <div className="mt-3 space-y-3 p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 text-xs animate-in fade-in">
                      <p className="text-[11px] text-neutral-400">
                        Optional: Fill in any known nutritional figures. Leave blank if you don't have them.
                      </p>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-neutral-400 font-mono text-[10px] block mb-0.5">Calories (kcal)</label>
                          <input
                            type="number"
                            min="0"
                            placeholder="e.g. 520"
                            value={nutritionForm.calories ?? ''}
                            onChange={(e) => setNutritionForm({ ...nutritionForm, calories: e.target.value ? Number(e.target.value) : undefined })}
                            className="w-full px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-neutral-200 font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-neutral-400 font-mono text-[10px] block mb-0.5">Protein (g)</label>
                          <input
                            type="number"
                            min="0"
                            placeholder="e.g. 35"
                            value={nutritionForm.proteinGrams ?? ''}
                            onChange={(e) => setNutritionForm({ ...nutritionForm, proteinGrams: e.target.value ? Number(e.target.value) : undefined })}
                            className="w-full px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-neutral-200 font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-neutral-400 font-mono text-[10px] block mb-0.5">Fiber (g)</label>
                          <input
                            type="number"
                            min="0"
                            placeholder="e.g. 8"
                            value={nutritionForm.fiberGrams ?? ''}
                            onChange={(e) => setNutritionForm({ ...nutritionForm, fiberGrams: e.target.value ? Number(e.target.value) : undefined })}
                            className="w-full px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-neutral-200 font-mono text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-neutral-400 font-mono text-[10px] block mb-0.5">Carbs (g)</label>
                          <input
                            type="number"
                            min="0"
                            placeholder="e.g. 45"
                            value={nutritionForm.carbsGrams ?? ''}
                            onChange={(e) => setNutritionForm({ ...nutritionForm, carbsGrams: e.target.value ? Number(e.target.value) : undefined })}
                            className="w-full px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-neutral-200 font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-neutral-400 font-mono text-[10px] block mb-0.5">Healthy Fats (g)</label>
                          <input
                            type="number"
                            min="0"
                            placeholder="e.g. 18"
                            value={nutritionForm.fatGrams ?? ''}
                            onChange={(e) => setNutritionForm({ ...nutritionForm, fatGrams: e.target.value ? Number(e.target.value) : undefined })}
                            className="w-full px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-neutral-200 font-mono text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-neutral-400 font-mono text-[10px] block mb-0.5">Micronutrients & Sourcing Notes</label>
                        <input
                          type="text"
                          placeholder="e.g. High polyphenols, wild-caught omega-3s, fermented kefir"
                          value={nutritionForm.notes ?? ''}
                          onChange={(e) => setNutritionForm({ ...nutritionForm, notes: e.target.value })}
                          className="w-full px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-neutral-200 text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Save Logged Meal
                </button>
              </form>
            )}

            {/* Logged Meals List with mistake removal button */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {meals.length === 0 ? (
                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/60 text-center text-xs text-neutral-500 font-mono">
                  No meals logged yet today. Tap "Log Meal" to add one.
                </div>
              ) : (
                meals.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-200 truncate">{m.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-900 text-neutral-400">
                          {m.type}
                        </span>
                      </div>
                      
                      {/* Optional Nutrition tags if provided */}
                      {m.nutrition && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-1 font-mono text-[10px] text-neutral-400">
                          {m.nutrition.calories !== undefined && (
                            <span className="px-1.5 py-0.2 rounded bg-neutral-900 text-amber-300">
                              {m.nutrition.calories} kcal
                            </span>
                          )}
                          {m.nutrition.proteinGrams !== undefined && (
                            <span className="px-1.5 py-0.2 rounded bg-neutral-900 text-rose-300">
                              {m.nutrition.proteinGrams}g pro
                            </span>
                          )}
                          {m.nutrition.fiberGrams !== undefined && (
                            <span className="px-1.5 py-0.2 rounded bg-neutral-900 text-emerald-300">
                              {m.nutrition.fiberGrams}g fiber
                            </span>
                          )}
                          {m.nutrition.notes && (
                            <span className="text-neutral-500 truncate max-w-xs italic">
                              · {m.nutrition.notes}
                            </span>
                          )}
                        </div>
                      )}

                      <span className="text-[10px] text-neutral-500 font-mono block mt-0.5">{m.timestamp}</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <span className="font-mono text-emerald-400 font-bold">{m.score}/10</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteMeal(m.id)}
                        title="Delete meal (fix mistake)"
                        className="p-1 rounded hover:bg-rose-500/10 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-neutral-850">
              <p className="text-[11px] text-neutral-400">
                Logged meals calibrate your whole-foods Mediterranean score ({formData.nutritionScore}/10).
              </p>
              {meals.length > 0 && (
                isConfirmingClearMeals ? (
                  <div className="flex items-center gap-2 bg-rose-950/40 border border-rose-500/30 px-2 py-1 rounded-lg">
                    <span className="text-[10px] font-mono text-rose-300">Clear all {meals.length} meals?</span>
                    <button
                      type="button"
                      onClick={handleClearAllMeals}
                      className="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-mono text-[10px] font-semibold transition-colors cursor-pointer"
                    >
                      Yes, Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsConfirmingClearMeals(false)}
                      className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-mono text-[10px] transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsConfirmingClearMeals(true)}
                    className="text-[10px] font-mono text-neutral-400 hover:text-rose-400 underline transition-colors cursor-pointer"
                  >
                    Clear all meals
                  </button>
                )
              )}
            </div>
          </div>

        </div>

        {/* DRINKS PER WEEK ADJUSTER (REQUIREMENT 3) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-rose-950/20 border border-neutral-800 space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <Wine className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-neutral-100 flex items-center gap-2">
                  <span>Weekly Alcohol Intake (Drinks / Week)</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    formData.alcoholDrinksPerWeek <= 2
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : formData.alcoholDrinksPerWeek <= 7
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {formData.alcoholDrinksPerWeek <= 2 ? '+0.4y Longevity Reserve' : formData.alcoholDrinksPerWeek <= 7 ? 'Neutral Impact (0.0y)' : `-${(0.2 * (formData.alcoholDrinksPerWeek - 7)).toFixed(1)}y Longevity Impact`}
                  </span>
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Adjust standard drinks consumed per week (1 drink = 12 oz beer, 5 oz wine, or 1.5 oz spirits).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-2xl font-serif font-bold text-neutral-100 tabular-nums">
                {formData.alcoholDrinksPerWeek} <span className="text-xs font-sans text-neutral-400 font-normal">drinks/wk</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Quick preset chips */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              <span className="text-xs font-mono text-neutral-400 mr-1">Presets:</span>
              {[
                { label: '0 (Non-Drinker)', val: 0 },
                { label: '1–2 (Light / Blue Zone)', val: 2 },
                { label: '4–5 (Moderate)', val: 5 },
                { label: '7 (Upper Moderate)', val: 7 },
                { label: '12+ (Heavy)', val: 12 }
              ].map((p) => (
                <button
                  key={p.val}
                  type="button"
                  onClick={() => handleChange('alcoholDrinksPerWeek', p.val)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                    formData.alcoholDrinksPerWeek === p.val
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Stepper buttons and numeric input */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={() => handleChange('alcoholDrinksPerWeek', Math.max(0, formData.alcoholDrinksPerWeek - 1))}
                disabled={formData.alcoholDrinksPerWeek <= 0}
                className="w-8 h-8 rounded-lg bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 flex items-center justify-center font-bold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Decrease 1 drink/week"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <input
                type="number"
                min="0"
                max="40"
                value={formData.alcoholDrinksPerWeek}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (!isNaN(val) && val >= 0) {
                    handleChange('alcoholDrinksPerWeek', val);
                  }
                }}
                className="w-16 px-2 py-1.5 text-center bg-neutral-950 border border-neutral-800 rounded-lg text-sm font-mono text-neutral-100 focus:outline-none focus:border-amber-400"
              />

              <button
                type="button"
                onClick={() => handleChange('alcoholDrinksPerWeek', Math.min(40, formData.alcoholDrinksPerWeek + 1))}
                className="w-8 h-8 rounded-lg bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 flex items-center justify-center font-bold cursor-pointer transition-colors"
                title="Increase 1 drink/week"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* FACTOR-BY-FACTOR LIFESPAN DECOMPOSITION TABLE */}
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4 mb-8">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold block">
                Factor-By-Factor Lifespan Impact
              </span>
              <p className="text-xs text-neutral-400 mt-0.5">
                Shows exactly how each health metric gains or costs you years relative to baseline.
              </p>
            </div>
            <span className="text-xs font-mono text-neutral-400">8 Biomarkers Calibrated</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {factorBreakdown.map((f, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-neutral-400 truncate pr-1">{f.name}</span>
                    <span className={`font-bold shrink-0 ${f.impact >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {f.impact >= 0 ? `+${f.impact.toFixed(1)}y` : `${f.impact.toFixed(1)}y`}
                    </span>
                  </div>
                  <div className="text-lg font-serif text-neutral-100 font-semibold my-1">
                    {f.value}
                  </div>
                </div>
                <p className="text-[10px] text-neutral-500 mt-2 pt-1.5 border-t border-neutral-900 leading-tight">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* DERIVED CLINICAL METRICS (BMR, TDEE, CARDIO RESERVE) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="text-[11px] font-mono text-neutral-400 uppercase">Basal Metabolic Rate (BMR)</span>
            <div className="text-2xl font-serif text-neutral-100 font-bold mt-1">
              {bmr.toLocaleString()} <span className="text-xs font-sans text-neutral-400">kcal/day</span>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">Resting cellular consumption</span>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <span className="text-[11px] font-mono text-neutral-400 uppercase">Total Energy Expenditure (TDEE)</span>
            <div className="text-2xl font-serif text-neutral-100 font-bold mt-1">
              {tdee.toLocaleString()} <span className="text-xs font-sans text-neutral-400">kcal/day</span>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">Calibrated to {formData.exerciseMinutesPerWeek}m weekly exercise</span>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-neutral-400 uppercase">Body Mass Index (BMI)</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                computed.bmi >= 18.5 && computed.bmi <= 24.9
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                  : computed.bmi < 18.5
                  ? 'bg-sky-500/20 text-sky-300 font-semibold'
                  : 'bg-amber-500/20 text-amber-300 font-semibold'
              }`}>
                {computed.bmi >= 18.5 && computed.bmi <= 24.9 ? 'Healthy Range' : computed.bmi < 18.5 ? 'Underweight' : computed.bmi < 30 ? 'Overweight' : 'Obese'}
              </span>
            </div>
            <div className="text-2xl font-serif text-neutral-100 font-bold">
              {computed.bmi}
            </div>
            <div className="text-[10px] text-neutral-400 font-mono">
              <strong>{formData.weightKg} kg</strong> ({Math.round(formData.weightKg * 2.20462)} lbs) / {formData.heightCm} cm
            </div>
            {/* Underweight and Overweight Reference Ranges for Input Height */}
            {(() => {
              const hM = formData.heightCm / 100;
              const underKg = parseFloat((18.5 * hM * hM).toFixed(1));
              const underLbs = Math.round(underKg * 2.20462);
              const overKg = parseFloat((25.0 * hM * hM).toFixed(1));
              const overLbs = Math.round(overKg * 2.20462);
              return (
                <div className="pt-2 border-t border-neutral-900 grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                  <div className="text-sky-300/90">
                    <span className="block font-semibold">Underweight:</span>
                    <span>&lt;18.5 (&lt;{underKg} kg / {underLbs} lbs)</span>
                  </div>
                  <div className="text-amber-300/90">
                    <span className="block font-semibold">Overweight:</span>
                    <span>≥25.0 (&gt;{overKg} kg / {overLbs} lbs)</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Simulation Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider mr-2">Quick Presets:</span>
          <button
            onClick={() => loadPreset('bluezone')}
            className="px-3 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-emerald-300 rounded-lg text-xs font-mono transition-colors cursor-pointer"
          >
            Blue Zone Centenarian
          </button>
          <button
            onClick={() => loadPreset('athlete')}
            className="px-3 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-sky-300 rounded-lg text-xs font-mono transition-colors cursor-pointer"
          >
            Endurance Athlete
          </button>
          <button
            onClick={() => loadPreset('balanced')}
            className="px-3 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-amber-300 rounded-lg text-xs font-mono transition-colors cursor-pointer"
          >
            Balanced Healthy Adult
          </button>
          <button
            onClick={() => loadPreset('sedentary')}
            className="px-3 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-rose-300 rounded-lg text-xs font-mono transition-colors cursor-pointer"
          >
            High-Stress / Sedentary
          </button>
        </div>

      </div>
    </section>
  );
};
