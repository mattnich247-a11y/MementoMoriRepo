import React, { useState } from 'react';
import { UserProfile, LifestyleFactors, HealthMetrics } from '../types';
import { WORLD_BANK_COUNTRIES, AVAILABLE_DATA_YEARS } from '../data/worldBankData';
import { calculateEstimatedLifespan } from '../data/actuarialData';
import { calculateAdjustedHealth } from '../utils/timeCalculations';
import { DEMO_PROFILES } from '../utils/storage';
import { 
  X, 
  Check, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Heart, 
  Lock, 
  Crown, 
  RefreshCw, 
  CheckCircle2,
  Droplet,
  Moon,
  Scale,
  Dumbbell,
  Wine
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
  healthMetrics: HealthMetrics;
  onSaveHealthMetrics: (updated: HealthMetrics) => void;
  isDevMode: boolean;
  onToggleDevMode: () => void;
  onLoadDemo: (key: string) => void;
  isInitialSetup?: boolean;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  healthMetrics,
  onSaveHealthMetrics,
  isDevMode,
  onToggleDevMode,
  onLoadDemo,
  isInitialSetup = false
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'basic' | 'health'>('basic');
  const [formData, setFormData] = useState<UserProfile>({ 
    ...profile,
    dataYear: profile.dataYear || 2024
  });

  // Health data state in modal
  const [healthForm, setHealthForm] = useState<HealthMetrics>({
    ...healthMetrics
  });

  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft_in'>('cm');
  const [heightFtStr, setHeightFtStr] = useState<string>(() => String(Math.floor(healthMetrics.heightCm / 30.48)));
  const [heightInStr, setHeightInStr] = useState<string>(() => String(Math.round((healthMetrics.heightCm % 30.48) / 2.54)));
  const [heightCmStr, setHeightCmStr] = useState<string>(() => String(healthMetrics.heightCm));
  const [weightKgStr, setWeightKgStr] = useState<string>(() => String(healthMetrics.weightKg));
  const [hasVo2Max, setHasVo2Max] = useState<boolean>(() => typeof healthMetrics.vo2Max === 'number' && healthMetrics.vo2Max > 0);
  const [vo2MaxStr, setVo2MaxStr] = useState<string>(() => typeof healthMetrics.vo2Max === 'number' && healthMetrics.vo2Max > 0 ? String(healthMetrics.vo2Max) : '42');
  const [rhrStr, setRhrStr] = useState<string>(() => String(healthMetrics.restingHeartRate));
  const [waterLitersStr, setWaterLitersStr] = useState<string>(() => String(healthMetrics.dailyWaterLiters));
  const [sleepHoursStr, setSleepHoursStr] = useState<string>(() => String(healthMetrics.sleepHours));
  const [exerciseMinsStr, setExerciseMinsStr] = useState<string>(() => String(healthMetrics.exerciseMinutesPerWeek));
  const [nutritionScoreStr, setNutritionScoreStr] = useState<string>(() => String(healthMetrics.nutritionScore));
  const [drinksPerWeekStr, setDrinksPerWeekStr] = useState<string>(() => String(healthMetrics.alcoholDrinksPerWeek ?? 2));

  const [copiedJson, setCopiedJson] = useState(false);

  const handleLifestyleChange = <K extends keyof LifestyleFactors>(
    key: K,
    val: LifestyleFactors[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      lifestyle: {
        ...prev.lifestyle,
        [key]: val
      }
    }));
  };

  const handleHealthFieldChange = (field: keyof HealthMetrics, val: any) => {
    setHealthForm((prev) => ({
      ...prev,
      [field]: val
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenYear = formData.dataYear || 2024;
    const computedExpectedAge = calculateEstimatedLifespan(
      formData.country,
      formData.gender,
      formData.lifestyle,
      chosenYear
    );

    const updatedProfile: UserProfile = {
      ...formData,
      dataYear: chosenYear,
      expectedAge: computedExpectedAge
    };

    onSaveProfile(updatedProfile);

    // Also save health metrics
    if (isDevMode) {
      const birthDate = new Date(formData.birthDate);
      const now = new Date();
      const chronoAge = parseFloat(((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1));
      const computed = calculateAdjustedHealth(computedExpectedAge, chronoAge, healthForm);

      onSaveHealthMetrics({
        ...healthForm,
        ...computed,
        isEnabled: healthForm.isEnabled
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isInitialSetup ? 'Welcome to Memento Mori' : 'Personal Calibration & Details'}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-100">
              {isInitialSetup ? 'Enter Your Details to Begin' : 'Personal Details & Health Lab'}
            </h2>
          </div>
          {!isInitialSetup && (
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Tab Switcher: Basic Details vs Advanced Health Metrics */}
        <div className="flex items-center gap-2 mb-5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('basic')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'basic'
                ? 'bg-neutral-800 text-amber-300 font-semibold shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span>Basic Identity & Lifestyle</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('health')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'health'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-semibold shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Advanced Health Metrics</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Premium
            </span>
          </button>
        </div>

        {/* Privacy Note */}
        <div className="p-3 mb-5 bg-emerald-950/25 border border-emerald-900/50 rounded-xl flex items-center gap-2.5 text-xs text-emerald-300 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong className="text-emerald-200 font-semibold">Privacy note:</strong> We don't store any data on servers. All calculations remain 100% private in your device's browser memory.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TAB 1: BASIC IDENTITY & LIFESTYLE */}
          {activeTab === 'basic' && (
            <div className="space-y-5">
              {/* Quick Sample Profiles */}
              <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-mono text-neutral-400">Or start with a sample profile:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onLoadDemo('vance');
                      onClose();
                    }}
                    className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-md font-medium cursor-pointer transition-colors"
                  >
                    Alex (Age 29, United States)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onLoadDemo('marcus');
                      onClose();
                    }}
                    className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-md font-medium cursor-pointer transition-colors"
                  >
                    Marcus (Age 45, United Kingdom)
                  </button>
                </div>
              </div>

              {/* Identity & Birth Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena, Marcus, Sarah"
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5">Date of Birth</label>
                  <input
                    type="date"
                    required
                    max="2026-12-31"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as UserProfile['gender'] })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other / Non-binary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5">Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {WORLD_BANK_COUNTRIES.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono text-neutral-400">Actuarial Data Year</label>
                    {!isDevMode ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/25">
                        <Lock className="w-2.5 h-2.5 text-amber-400" /> Premium Required
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold">Premium Active</span>
                    )}
                  </div>
                  {!isDevMode ? (
                    <div className="space-y-1.5">
                      <div className="w-full px-3 py-2 bg-neutral-900/60 border border-neutral-800 rounded-lg text-sm text-neutral-300 flex items-center justify-between">
                        <span>{formData.dataYear || 2024} (Default Latest Baseline)</span>
                        <Lock className="w-3.5 h-3.5 text-neutral-500" />
                      </div>
                      <button
                        type="button"
                        onClick={onToggleDevMode}
                        className="text-[11px] font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Crown className="w-3 h-3 fill-amber-400/30 text-amber-400" />
                        <span>Unlock Premium to choose historical dataset year (2020–2024)</span>
                      </button>
                    </div>
                  ) : (
                    <select
                      value={formData.dataYear || 2024}
                      onChange={(e) => setFormData({ ...formData, dataYear: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-neutral-100 focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      {AVAILABLE_DATA_YEARS.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr} Actuarial Dataset {yr === 2024 ? '(Latest Baseline)' : ''}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Lifestyle Assessment Block */}
              <div className="p-4 sm:p-5 bg-neutral-900/40 rounded-xl border border-neutral-800">
                <div className="mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-0.5">
                    Lifestyle Factors
                  </span>
                  <p className="text-xs text-neutral-400">
                    Select the habits that best reflect your regular routine.
                  </p>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">Physical Exercise</label>
                    <select
                      value={formData.lifestyle.exercise}
                      onChange={(e) => handleLifestyleChange('exercise', e.target.value as any)}
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 cursor-pointer"
                    >
                      <option value="sedentary">Sedentary (Little or no regular physical activity)</option>
                      <option value="moderate">Moderate (Light movement or walking 1–2 days per week)</option>
                      <option value="active">Active (Cardio or strength training 3–5 days per week)</option>
                      <option value="athlete">Athletic (Daily high-intensity training or demanding physical labor)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Sleep Pattern</label>
                      <select
                        value={formData.lifestyle.sleep}
                        onChange={(e) => handleLifestyleChange('sleep', e.target.value as any)}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 cursor-pointer"
                      >
                        <option value="poor">Poor (Under 6 hours or frequent sleep disruption)</option>
                        <option value="fair">Fair (6 to 7 hours of sleep)</option>
                        <option value="optimal">Optimal (7 to 9 hours of restorative sleep)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Tobacco & Nicotine</label>
                      <select
                        value={formData.lifestyle.smoking}
                        onChange={(e) => handleLifestyleChange('smoking', e.target.value as any)}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 cursor-pointer"
                      >
                        <option value="never">Never (Non-smoker)</option>
                        <option value="former">Former (Quit over 12 months ago)</option>
                        <option value="current">Current (Active smoker or regular nicotine use)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Chronic Stress</label>
                      <select
                        value={formData.lifestyle.stress}
                        onChange={(e) => handleLifestyleChange('stress', e.target.value as any)}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 cursor-pointer"
                      >
                        <option value="low">Low (Balanced routine, high recovery)</option>
                        <option value="moderate">Moderate (Standard work and life demands)</option>
                        <option value="high">High (Persistent deadline pressure, burnout)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Nutritional Quality</label>
                      <select
                        value={formData.lifestyle.diet}
                        onChange={(e) => handleLifestyleChange('diet', e.target.value as any)}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 cursor-pointer"
                      >
                        <option value="standard">Standard (Processed foods common)</option>
                        <option value="balanced">Balanced (Mix of whole foods, vegetables)</option>
                        <option value="exceptional">Exceptional (Mediterranean, nutrient-rich)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ADVANCED HEALTH METRICS (REQUIRES PREMIUM) */}
          {activeTab === 'health' && (
            <div className="space-y-5">
              {!isDevMode ? (
                /* Premium Lock Screen */
                <div className="p-6 text-center rounded-2xl bg-gradient-to-b from-amber-500/10 via-neutral-900 to-neutral-950 border border-amber-500/30 space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-neutral-100 font-semibold">
                      Premium Required
                    </h3>
                    <p className="text-xs text-neutral-400 max-w-md mx-auto mt-1 leading-relaxed">
                      Detailed clinical health inputs (VO2 Max, Resting Heart Rate, hydration, and nutrition modeling) are enabled for Premium members and VIP testers.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onToggleDevMode}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs font-mono rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer"
                  >
                    <Crown className="w-4 h-4 fill-neutral-950" />
                    <span>Enable Premium to Unlock & Input Health Data</span>
                  </button>
                </div>
              ) : (
                /* Premium Unlocked: Comprehensive Biometric Fields */
                <div className="space-y-5 animate-in fade-in duration-200">
                  
                  {/* Comprehensive Biometric Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    
                    {/* Height with cm vs ft/in option */}
                    <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-neutral-300 font-semibold">Height</label>
                        <div className="flex rounded-lg border border-neutral-800 bg-neutral-950 p-0.5 text-[10px]">
                          <button
                            type="button"
                            onClick={() => setHeightUnit('cm')}
                            className={`px-2 py-0.5 rounded cursor-pointer ${
                              heightUnit === 'cm' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
                            }`}
                          >
                            cm
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setHeightUnit('ft_in');
                              const ft = Math.floor(healthForm.heightCm / 30.48);
                              const inch = Math.round((healthForm.heightCm % 30.48) / 2.54);
                              setHeightFtStr(String(ft));
                              setHeightInStr(String(inch));
                            }}
                            className={`px-2 py-0.5 rounded cursor-pointer ${
                              heightUnit === 'ft_in' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
                            }`}
                          >
                            ft / in
                          </button>
                        </div>
                      </div>

                      {heightUnit === 'cm' ? (
                        <div>
                          <input
                            type="number"
                            min="100"
                            max="240"
                            value={heightCmStr}
                            onFocus={() => {
                              if (heightCmStr === '0') setHeightCmStr('');
                            }}
                            onBlur={() => {
                              if (heightCmStr.trim() === '') {
                                setHeightCmStr('175');
                                handleHealthFieldChange('heightCm', 175);
                              }
                            }}
                            onChange={(e) => {
                              setHeightCmStr(e.target.value);
                              const val = Number(e.target.value);
                              if (val > 0) handleHealthFieldChange('heightCm', val);
                            }}
                            placeholder="e.g. 175"
                            className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-100 font-sans"
                          />
                          <span className="text-[10px] text-neutral-500 mt-1 block">
                            ~{Math.floor(healthForm.heightCm / 30.48)} ft {Math.round((healthForm.heightCm % 30.48) / 2.54)} in
                          </span>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <label className="text-[10px] text-neutral-500 block">Feet</label>
                            <input
                              type="number"
                              min="3"
                              max="8"
                              value={heightFtStr}
                              onFocus={() => {
                                if (heightFtStr === '0') setHeightFtStr('');
                              }}
                              onBlur={() => {
                                if (heightFtStr.trim() === '') setHeightFtStr('5');
                              }}
                              onChange={(e) => {
                                setHeightFtStr(e.target.value);
                                const ft = Number(e.target.value) || 0;
                                const inch = Number(heightInStr) || 0;
                                const totalCm = Math.round(ft * 30.48 + inch * 2.54);
                                setHeightCmStr(String(totalCm));
                                handleHealthFieldChange('heightCm', totalCm);
                              }}
                              className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-100 font-sans"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="text-[10px] text-neutral-500 block">Inches</label>
                            <input
                              type="number"
                              min="0"
                              max="11"
                              value={heightInStr}
                              onFocus={() => {
                                if (heightInStr === '0') setHeightInStr('');
                              }}
                              onBlur={() => {
                                if (heightInStr.trim() === '') setHeightInStr('0');
                              }}
                              onChange={(e) => {
                                setHeightInStr(e.target.value);
                                const ft = Number(heightFtStr) || 0;
                                const inch = Number(e.target.value) || 0;
                                const totalCm = Math.round(ft * 30.48 + inch * 2.54);
                                setHeightCmStr(String(totalCm));
                                handleHealthFieldChange('heightCm', totalCm);
                              }}
                              className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-100 font-sans"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Weight */}
                    <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-neutral-300 font-semibold">Weight (kg)</label>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {Math.round(healthForm.weightKg * 2.20462)} lbs
                        </span>
                      </div>
                      <input
                        type="number"
                        min="30"
                        max="250"
                        step="0.1"
                        value={weightKgStr}
                        onFocus={() => {
                          if (weightKgStr === '0') setWeightKgStr('');
                        }}
                        onBlur={() => {
                          if (weightKgStr.trim() === '') {
                            setWeightKgStr('70');
                            handleHealthFieldChange('weightKg', 70);
                          }
                        }}
                        onChange={(e) => {
                          setWeightKgStr(e.target.value);
                          const val = parseFloat(e.target.value);
                          if (val > 0) handleHealthFieldChange('weightKg', val);
                        }}
                        placeholder="e.g. 70"
                        className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-100 font-sans"
                      />
                      <span className="text-[10px] text-neutral-500 mt-1 block">
                        Calibrates BMI & metabolic expenditure
                      </span>
                    </div>

                    {/* Calculated BMI & Reference Ranges (Underweight vs Overweight) */}
                    <div className="sm:col-span-2 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                      {(() => {
                        const heightM = healthForm.heightCm / 100;
                        const bmiVal = heightM > 0 ? parseFloat((healthForm.weightKg / (heightM * heightM)).toFixed(1)) : 22.0;
                        const underweightMaxKg = parseFloat((18.5 * heightM * heightM).toFixed(1));
                        const underweightMaxLbs = Math.round(underweightMaxKg * 2.20462);
                        const normalMaxKg = parseFloat((24.9 * heightM * heightM).toFixed(1));
                        const normalMaxLbs = Math.round(normalMaxKg * 2.20462);
                        const overweightMinKg = parseFloat((25.0 * heightM * heightM).toFixed(1));
                        const overweightMinLbs = Math.round(overweightMinKg * 2.20462);

                        const isUnderweight = bmiVal < 18.5;
                        const isNormal = bmiVal >= 18.5 && bmiVal <= 24.9;
                        const isOverweight = bmiVal >= 25.0 && bmiVal < 30.0;
                        const isObese = bmiVal >= 30.0;

                        return (
                          <div>
                            <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800/80">
                              <span className="text-[11px] font-mono text-neutral-400 uppercase">
                                Calculated BMI for {healthForm.heightCm} cm & {healthForm.weightKg} kg:
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-base font-bold text-neutral-100">{bmiVal}</span>
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                                  isNormal
                                    ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                                    : isUnderweight
                                    ? 'bg-sky-500/20 text-sky-300 font-semibold'
                                    : 'bg-amber-500/20 text-amber-300 font-semibold'
                                }`}>
                                  {isNormal ? '✓ Healthy Range' : isUnderweight ? 'Underweight' : isOverweight ? 'Overweight' : 'Obese'}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] font-mono">
                              <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                                <span className="text-sky-300 block font-semibold mb-0.5">Underweight:</span>
                                <span className="text-neutral-400">BMI &lt; 18.5</span>
                                <div className="text-[10px] text-neutral-500 mt-0.5">
                                  Under {underweightMaxKg} kg ({underweightMaxLbs} lbs)
                                </div>
                              </div>

                              <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                                <span className="text-emerald-300 block font-semibold mb-0.5">Healthy Weight:</span>
                                <span className="text-neutral-400">BMI 18.5 – 24.9</span>
                                <div className="text-[10px] text-neutral-500 mt-0.5">
                                  {underweightMaxKg} – {normalMaxKg} kg ({underweightMaxLbs} – {normalMaxLbs} lbs)
                                </div>
                              </div>

                              <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                                <span className="text-amber-300 block font-semibold mb-0.5">Overweight:</span>
                                <span className="text-neutral-400">BMI ≥ 25.0</span>
                                <div className="text-[10px] text-neutral-500 mt-0.5">
                                  Over {overweightMinKg} kg ({overweightMinLbs} lbs)
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Resting Heart Rate */}
                    <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                      <label className="text-rose-400 block mb-1.5 flex items-center gap-1.5 font-semibold">
                        <Heart className="w-3.5 h-3.5 text-rose-400" />
                        Resting Heart Rate (BPM)
                      </label>
                      <input
                        type="number"
                        min="40"
                        max="110"
                        value={rhrStr}
                        onFocus={() => {
                          if (rhrStr === '0') setRhrStr('');
                        }}
                        onBlur={() => {
                          if (rhrStr.trim() === '') {
                            setRhrStr('60');
                            handleHealthFieldChange('restingHeartRate', 60);
                          }
                        }}
                        onChange={(e) => {
                          setRhrStr(e.target.value);
                          const val = Number(e.target.value);
                          if (val > 0) handleHealthFieldChange('restingHeartRate', val);
                        }}
                        placeholder="e.g. 60"
                        className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-100 font-sans"
                      />
                      <span className="text-[10px] text-neutral-500 mt-1 block">Optimal: 48–64 BPM</span>
                    </div>

                    {/* VO2 Max (Optional: can be excluded if user doesn't have it) */}
                    <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sky-400 flex items-center gap-1.5 font-semibold">
                          <Dumbbell className="w-3.5 h-3.5 text-sky-400" />
                          VO2 Max
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const next = !hasVo2Max;
                            setHasVo2Max(next);
                            if (next) {
                              const val = Number(vo2MaxStr) || 42;
                              handleHealthFieldChange('vo2Max', val);
                            } else {
                              handleHealthFieldChange('vo2Max', undefined);
                            }
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                            hasVo2Max ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-neutral-800 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {hasVo2Max ? '✓ Included' : 'Excluded (Skip)'}
                        </button>
                      </div>

                      {hasVo2Max ? (
                        <div>
                          <input
                            type="number"
                            min="20"
                            max="75"
                            value={vo2MaxStr}
                            onFocus={() => {
                              if (vo2MaxStr === '0') setVo2MaxStr('');
                            }}
                            onBlur={() => {
                              if (vo2MaxStr.trim() === '') {
                                setVo2MaxStr('42');
                                handleHealthFieldChange('vo2Max', 42);
                              }
                            }}
                            onChange={(e) => {
                              setVo2MaxStr(e.target.value);
                              const val = Number(e.target.value);
                              if (val > 0) handleHealthFieldChange('vo2Max', val);
                            }}
                            placeholder="e.g. 42"
                            className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-100 font-sans"
                          />
                          <span className="text-[10px] text-neutral-500 mt-1 block">
                            Cardio reserve biomarker (Top quartile: ≥48)
                          </span>
                        </div>
                      ) : (
                        <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800/80 text-[11px] text-neutral-400">
                          <span>VO2 Max excluded from health modeling. Lifespan will calibrate using all other clinical habits.</span>
                        </div>
                      )}
                    </div>

                    {/* Daily Water with Glasses of Water */}
                    <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sky-300 flex items-center gap-1.5 font-semibold">
                          <Droplet className="w-3.5 h-3.5 text-sky-400" />
                          Daily Water (Liters)
                        </label>
                        <span className="text-[11px] font-mono text-sky-300 font-bold">
                          ~{Math.round((healthForm.dailyWaterLiters * 1000) / 250)} glasses
                        </span>
                      </div>
                      <input
                        type="number"
                        step="0.1"
                        min="0.5"
                        max="6.0"
                        value={waterLitersStr}
                        onBlur={() => {
                          if (waterLitersStr.trim() === '') {
                            setWaterLitersStr('2.0');
                            handleHealthFieldChange('dailyWaterLiters', 2.0);
                          }
                        }}
                        onChange={(e) => {
                          setWaterLitersStr(e.target.value);
                          const val = parseFloat(e.target.value);
                          if (val > 0) handleHealthFieldChange('dailyWaterLiters', val);
                        }}
                        placeholder="e.g. 2.0"
                        className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-100 font-sans"
                      />
                      <span className="text-[10px] text-neutral-400 mt-1 block">
                        Target: 2.0 L · ~8 standard glasses of water (250 ml each)
                      </span>
                    </div>

                    {/* Nutrition Score */}
                    <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                      <label className="text-emerald-400 block mb-1.5 font-semibold">Nutrition Score (1–10)</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={nutritionScoreStr}
                        onBlur={() => {
                          if (nutritionScoreStr.trim() === '') {
                            setNutritionScoreStr('8');
                            handleHealthFieldChange('nutritionScore', 8);
                          }
                        }}
                        onChange={(e) => {
                          setNutritionScoreStr(e.target.value);
                          const val = Number(e.target.value);
                          if (val > 0) handleHealthFieldChange('nutritionScore', val);
                        }}
                        placeholder="e.g. 8"
                        className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-100 font-sans"
                      />
                      <span className="text-[10px] text-neutral-500 mt-1 block">Whole foods & Mediterranean quality</span>
                    </div>

                    {/* Sleep Hours */}
                    <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                      <label className="text-purple-300 block mb-1.5 flex items-center gap-1.5 font-semibold">
                        <Moon className="w-3.5 h-3.5 text-purple-400" />
                        Sleep Duration (Hours)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="4.0"
                        max="11.0"
                        value={sleepHoursStr}
                        onBlur={() => {
                          if (sleepHoursStr.trim() === '') {
                            setSleepHoursStr('7.5');
                            handleHealthFieldChange('sleepHours', 7.5);
                          }
                        }}
                        onChange={(e) => {
                          setSleepHoursStr(e.target.value);
                          const val = parseFloat(e.target.value);
                          if (val > 0) handleHealthFieldChange('sleepHours', val);
                        }}
                        placeholder="e.g. 7.5"
                        className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-100 font-sans"
                      />
                      <span className="text-[10px] text-neutral-500 mt-1 block">Restorative circadian recovery</span>
                    </div>

                    {/* Weekly Exercise */}
                    <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                      <label className="text-amber-400 block mb-1.5 font-semibold">Weekly Exercise (Mins)</label>
                      <input
                        type="number"
                        step="15"
                        min="0"
                        max="700"
                        value={exerciseMinsStr}
                        onBlur={() => {
                          if (exerciseMinsStr.trim() === '') {
                            setExerciseMinsStr('150');
                            handleHealthFieldChange('exerciseMinutesPerWeek', 150);
                          }
                        }}
                        onChange={(e) => {
                          setExerciseMinsStr(e.target.value);
                          const val = Number(e.target.value);
                          if (!isNaN(val)) handleHealthFieldChange('exerciseMinutesPerWeek', val);
                        }}
                        placeholder="e.g. 150"
                        className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-100 font-sans"
                      />
                      <span className="text-[10px] text-neutral-500 mt-1 block">Cardio and resistance movement</span>
                    </div>

                    {/* Drinks Per Week (Alcohol Moderation) */}
                    <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-rose-300 flex items-center gap-1.5 font-semibold">
                          <Wine className="w-3.5 h-3.5 text-rose-400" />
                          Drinks Per Week (Alcohol)
                        </label>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          (Number(drinksPerWeekStr) || 0) <= 2
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : (Number(drinksPerWeekStr) || 0) <= 7
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {(Number(drinksPerWeekStr) || 0) <= 2 ? '+0.4y reserve' : (Number(drinksPerWeekStr) || 0) <= 7 ? 'Neutral' : `-${(0.2 * ((Number(drinksPerWeekStr) || 0) - 7)).toFixed(1)}y`}
                        </span>
                      </div>

                      {/* Quick preset chips */}
                      <div className="grid grid-cols-4 gap-1 mb-2">
                        {[
                          { label: '0 (None)', val: 0 },
                          { label: '2 (Light)', val: 2 },
                          { label: '5 (Mod)', val: 5 },
                          { label: '10+ (High)', val: 10 }
                        ].map((chip) => (
                          <button
                            key={chip.val}
                            type="button"
                            onClick={() => {
                              setDrinksPerWeekStr(String(chip.val));
                              handleHealthFieldChange('alcoholDrinksPerWeek', chip.val);
                            }}
                            className={`py-1 text-[10px] font-mono rounded border transition-colors cursor-pointer ${
                              (Number(drinksPerWeekStr) || 0) === chip.val
                                ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>

                      <input
                        type="number"
                        min="0"
                        max="35"
                        step="1"
                        value={drinksPerWeekStr}
                        onFocus={() => {
                          if (drinksPerWeekStr === '0') setDrinksPerWeekStr('');
                        }}
                        onBlur={() => {
                          if (drinksPerWeekStr.trim() === '') {
                            setDrinksPerWeekStr('0');
                            handleHealthFieldChange('alcoholDrinksPerWeek', 0);
                          }
                        }}
                        onChange={(e) => {
                          setDrinksPerWeekStr(e.target.value);
                          const val = Number(e.target.value);
                          if (!isNaN(val) && val >= 0) {
                            handleHealthFieldChange('alcoholDrinksPerWeek', val);
                          }
                        }}
                        placeholder="e.g. 2"
                        className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded text-neutral-100 font-sans"
                      />
                      <span className="text-[10px] text-neutral-400 mt-1 block">
                        Standard drinks/week (1 drink = 12 oz beer, 5 oz wine, or 1.5 oz spirits)
                      </span>
                    </div>

                  </div>

                  <div className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-center justify-between text-xs">
                    <span className="text-neutral-400 font-mono">Apply Health-Adjusted Lifespan to Main Countdown:</span>
                    <button
                      type="button"
                      onClick={() => handleHealthFieldChange('isEnabled', !healthForm.isEnabled)}
                      className={`px-3 py-1 rounded-lg font-mono font-semibold transition-colors cursor-pointer ${
                        healthForm.isEnabled
                          ? 'bg-emerald-400 text-neutral-950'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      {healthForm.isEnabled ? '✓ Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Form Actions */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
            {!isInitialSetup && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              className="ml-auto px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-sm rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Save Details & Calibrate</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
