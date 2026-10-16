import { CountdownMetrics, HealthMetrics } from '../types';

export function calculateMetrics(
  birthDateStr: string,
  birthTimeStr: string | undefined,
  expectedAge: number,
  now: Date = new Date()
): CountdownMetrics {
  const [bYear, bMonth, bDay] = birthDateStr.split('-').map(Number);
  const [bHour, bMin] = (birthTimeStr || '00:00').split(':').map(Number);

  const birthDate = new Date(bYear, bMonth - 1, bDay, bHour, bMin, 0);
  
  // Target lifespan end date
  const endDate = new Date(birthDate);
  endDate.setFullYear(birthDate.getFullYear() + expectedAge);

  const nowMs = now.getTime();
  const birthMs = birthDate.getTime();
  const endMs = endDate.getTime();

  const totalLifespanMs = Math.max(1, endMs - birthMs);
  const elapsedMs = Math.max(0, Math.min(totalLifespanMs, nowMs - birthMs));
  const remainingMs = Math.max(0, endMs - nowMs);

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const totalLifespanDays = Math.round(totalLifespanMs / MS_PER_DAY);
  const elapsedDays = Math.floor(elapsedMs / MS_PER_DAY);
  const remainingDays = Math.floor(remainingMs / MS_PER_DAY);

  const percentElapsed = Math.min(100, Math.max(0, (elapsedMs / totalLifespanMs) * 100));
  const percentRemaining = Math.max(0, 100 - percentElapsed);

  // Time components
  const remainingSecTotal = Math.floor(remainingMs / 1000);
  const totalDays = Math.floor(remainingSecTotal / (3600 * 24));
  const hours = Math.floor((remainingSecTotal % (3600 * 24)) / 3600);
  const minutes = Math.floor((remainingSecTotal % 3600) / 60);
  const seconds = remainingSecTotal % 60;
  const milliseconds = remainingMs % 1000;

  const years = Math.floor(totalDays / 365.25);
  const daysRemainderYear = totalDays - Math.floor(years * 365.25);
  const months = Math.floor(daysRemainderYear / 30.4375);
  // Days as an item related to the months (e.g. 0-30 days remaining in current month)
  const days = Math.floor(daysRemainderYear - Math.floor(months * 30.4375));
  const weeks = Math.floor(totalDays / 7);

  // Vitality & Biological Cadence
  // Heartbeats: ~72 BPM = 1.2 per sec
  const heartbeatsRemaining = Math.max(0, Math.floor((remainingMs / 1000) * 1.2));
  // Breaths: ~16 BPM = 16/60 per sec
  const breathsRemaining = Math.max(0, Math.floor((remainingMs / 1000) * (16 / 60)));
  const sunrisesRemaining = remainingDays;
  const weekendsRemaining = Math.round(weeks * 2);

  // New Moving Relational Metrics (Being with others)
  // Assumed ~0.75 warm kisses & hugs per day (0.5 - 1.0 per day range)
  const kissesRemaining = Math.max(0, Math.floor((remainingMs / 1000) * (0.75 / 86400)));
  // Average ~1.2 shared meals & deep conversations per day with family, partner, friends
  const sharedMealsRemaining = Math.max(0, Math.floor((remainingMs / 1000) * (1.2 / 86400)));

  // Next Dawn / Sunrise real-time countdown (targeting 6:00 AM)
  const nextDawn = new Date(now);
  nextDawn.setHours(6, 0, 0, 0);
  if (now.getTime() >= nextDawn.getTime()) {
    nextDawn.setDate(nextDawn.getDate() + 1);
  }
  const nextDawnMs = Math.max(0, nextDawn.getTime() - nowMs);
  const nextDawnHours = Math.floor(nextDawnMs / (1000 * 60 * 60));
  const nextDawnMinutes = Math.floor((nextDawnMs % (1000 * 60 * 60)) / (1000 * 60));
  const nextDawnSeconds = Math.floor((nextDawnMs % (1000 * 60)) / 1000);

  // Next Weekend countdown (Saturday 00:00)
  const dayOfWeek = now.getDay();
  const nextSaturday = new Date(now);
  let daysUntilSat = (6 - dayOfWeek + 7) % 7;
  if (daysUntilSat === 0 && dayOfWeek !== 6) daysUntilSat = 7;
  nextSaturday.setDate(now.getDate() + daysUntilSat);
  nextSaturday.setHours(0, 0, 0, 0);
  const nextWeekendMs = Math.max(0, nextSaturday.getTime() - nowMs);
  const nextWeekendDays = Math.floor(nextWeekendMs / (1000 * 60 * 60 * 24));
  const nextWeekendHours = Math.floor((nextWeekendMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const nextWeekendMinutes = Math.floor((nextWeekendMs % (1000 * 60 * 60)) / (1000 * 60));
  const nextWeekendSeconds = Math.floor((nextWeekendMs % (1000 * 60)) / 1000);

  // Current year progress
  const startOfYear = new Date(now.getFullYear(), 0, 1).getTime();
  const endOfYear = new Date(now.getFullYear() + 1, 0, 1).getTime();
  const yearProgressPercent = Math.min(100, Math.max(0, ((nowMs - startOfYear) / (endOfYear - startOfYear)) * 100));

  // Current Season
  const month = now.getMonth();
  let seasonName = 'Spring';
  let nextSeasonStart = new Date(now.getFullYear(), 5, 21);

  if (month >= 2 && month <= 4) {
    seasonName = 'Spring';
    nextSeasonStart = new Date(now.getFullYear(), 5, 21);
  } else if (month >= 5 && month <= 7) {
    seasonName = 'Summer';
    nextSeasonStart = new Date(now.getFullYear(), 8, 22);
  } else if (month >= 8 && month <= 10) {
    seasonName = 'Autumn';
    nextSeasonStart = new Date(now.getFullYear(), 11, 21);
  } else {
    seasonName = 'Winter';
    nextSeasonStart = month === 11 ? new Date(now.getFullYear() + 1, 2, 20) : new Date(now.getFullYear(), 2, 20);
  }
  const seasonDaysRemaining = Math.max(0, Math.ceil((nextSeasonStart.getTime() - nowMs) / MS_PER_DAY));

  // Next Equinox / Solstice astronomical calculation
  const curYear = now.getFullYear();
  const solarEvents = [
    { name: 'Vernal (Spring) Equinox', date: new Date(curYear, 2, 20, 9, 30) },
    { name: 'Summer Solstice', date: new Date(curYear, 5, 21, 3, 20) },
    { name: 'Autumnal Equinox', date: new Date(curYear, 8, 22, 19, 15) },
    { name: 'Winter Solstice', date: new Date(curYear, 11, 21, 15, 45) },
    { name: 'Vernal (Spring) Equinox', date: new Date(curYear + 1, 2, 20, 9, 30) },
  ];

  const upcomingSolarEvent = solarEvents.find(e => e.date.getTime() > nowMs) || solarEvents[0];
  const equinoxDiffMs = Math.max(0, upcomingSolarEvent.date.getTime() - nowMs);
  const daysToNextEquinox = Math.floor(equinoxDiffMs / MS_PER_DAY);
  const hoursToNextEquinox = Math.floor((equinoxDiffMs % MS_PER_DAY) / (1000 * 60 * 60));
  const minutesToNextEquinox = Math.floor((equinoxDiffMs % (1000 * 60 * 60)) / (1000 * 60));
  const nextEquinoxName = upcomingSolarEvent.name;
  const nextEquinoxDate = upcomingSolarEvent.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Full Moons remaining (Synodic month = 29.53059 days)
  const fullMoonsRemaining = Math.max(0, Math.floor(remainingDays / 29.53059));

  // Seasons remaining in user's lifetime
  const seasonsRemaining = {
    spring: Math.max(0, years + (month <= 4 ? 1 : 0)),
    summer: Math.max(0, years + (month <= 7 ? 1 : 0)),
    autumn: Math.max(0, years + (month <= 10 ? 1 : 0)),
    winter: Math.max(0, years + 1),
  };

  return {
    totalLifespanDays,
    elapsedDays,
    remainingDays,
    percentElapsed,
    percentRemaining,
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    heartbeatsRemaining,
    breathsRemaining,
    sunrisesRemaining,
    weekendsRemaining,
    kissesRemaining,
    sharedMealsRemaining,
    nextDawnHours,
    nextDawnMinutes,
    nextDawnSeconds,
    nextWeekendDays,
    nextWeekendHours,
    nextWeekendMinutes,
    nextWeekendSeconds,
    yearProgressPercent,
    seasonName,
    seasonDaysRemaining,
    daysToNextEquinox,
    hoursToNextEquinox,
    minutesToNextEquinox,
    nextEquinoxName,
    nextEquinoxDate,
    fullMoonsRemaining,
    seasonsRemaining,
  };
}

// Calculate adjusted longevity from health parameters
export function calculateAdjustedHealth(
  baseExpectedAge: number,
  chronologicalAge: number,
  health: Omit<HealthMetrics, 'bmi' | 'biologicalAge' | 'yearsGainedOrLost' | 'adjustedLifespan' | 'isEnabled'>
): { bmi: number; biologicalAge: number; yearsGainedOrLost: number; adjustedLifespan: number } {
  // BMI calculation
  const heightM = health.heightCm / 100;
  const bmi = heightM > 0 ? parseFloat((health.weightKg / (heightM * heightM)).toFixed(1)) : 22.0;

  let deltaYears = 0;

  // 1. BMI Impact (optimal 20-24.9)
  if (bmi >= 20 && bmi <= 25) {
    deltaYears += 1.5;
  } else if (bmi < 18.5) {
    deltaYears -= 1.0;
  } else if (bmi > 30) {
    deltaYears -= 2.5;
  } else if (bmi > 25) {
    deltaYears -= 0.8;
  }

  // 2. Resting Heart Rate
  if (health.restingHeartRate < 60) {
    deltaYears += 2.0; // Athletic heart
  } else if (health.restingHeartRate <= 70) {
    deltaYears += 1.0;
  } else if (health.restingHeartRate > 80) {
    deltaYears -= 1.8;
  }

  // 3. VO2 Max (Optional: only included if user provides value > 0)
  if (typeof health.vo2Max === 'number' && health.vo2Max > 0) {
    if (health.vo2Max >= 48) {
      deltaYears += 3.2; // Top quartile cardio fitness
    } else if (health.vo2Max >= 38) {
      deltaYears += 1.5;
    } else if (health.vo2Max < 30) {
      deltaYears -= 2.2;
    }
  }

  // 4. Daily Hydration (Target: 2.0 Liters)
  if (health.dailyWaterLiters >= 2.0) {
    deltaYears += 0.8;
  } else if (health.dailyWaterLiters < 1.0) {
    deltaYears -= 0.6;
  }

  // 5. Nutrition Score (1-10)
  if (health.nutritionScore >= 8) {
    deltaYears += 2.2;
  } else if (health.nutritionScore >= 6) {
    deltaYears += 0.8;
  } else if (health.nutritionScore <= 3) {
    deltaYears -= 2.0;
  }

  // 6. Sleep Duration
  if (health.sleepHours >= 7 && health.sleepHours <= 8.5) {
    deltaYears += 1.4;
  } else if (health.sleepHours < 6) {
    deltaYears -= 2.0;
  }

  // 7. Exercise Minutes / week
  if (health.exerciseMinutesPerWeek >= 250) {
    deltaYears += 2.5;
  } else if (health.exerciseMinutesPerWeek >= 150) {
    deltaYears += 1.6;
  } else if (health.exerciseMinutesPerWeek < 60) {
    deltaYears -= 1.8;
  }

  // 8. Smoking
  if (health.smoking === 'current') {
    deltaYears -= 6.0;
  } else if (health.smoking === 'former') {
    deltaYears -= 1.0;
  } else {
    deltaYears += 1.5;
  }

  // 9. Alcohol
  if (health.alcoholDrinksPerWeek <= 3) {
    deltaYears += 0.5;
  } else if (health.alcoholDrinksPerWeek > 14) {
    deltaYears -= 2.5;
  }

  deltaYears = parseFloat(deltaYears.toFixed(1));
  const adjustedLifespan = Math.max(50, Math.min(115, Math.round(baseExpectedAge + deltaYears)));
  const biologicalAge = parseFloat(Math.max(10, chronologicalAge - deltaYears * 0.75).toFixed(1));

  return {
    bmi,
    biologicalAge,
    yearsGainedOrLost: deltaYears,
    adjustedLifespan
  };
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}
