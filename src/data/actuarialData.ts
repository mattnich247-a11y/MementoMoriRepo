import { LifestyleFactors } from '../types';
import { getCountryLifeExpectancy } from './worldBankData';

export function calculateEstimatedLifespan(
  countryCode: string,
  gender: 'female' | 'male' | 'other',
  lifestyle: LifestyleFactors,
  dataYear: number = 2024
): number {
  const baseCountryExpectancy = getCountryLifeExpectancy(countryCode, dataYear);
  
  let estimate = baseCountryExpectancy;

  // Gender baseline adjustment (actuarial reality)
  if (gender === 'female') {
    estimate += 2.5;
  } else if (gender === 'male') {
    estimate -= 2.5;
  }

  // Lifestyle factor adjustments (computed under the hood)
  if (lifestyle.exercise === 'athlete') estimate += 3.5;
  else if (lifestyle.exercise === 'active') estimate += 2.2;
  else if (lifestyle.exercise === 'moderate') estimate += 0.8;
  else if (lifestyle.exercise === 'sedentary') estimate -= 2.5;

  if (lifestyle.sleep === 'optimal') estimate += 2.0;
  else if (lifestyle.sleep === 'poor') estimate -= 2.5;

  if (lifestyle.smoking === 'current') estimate -= 6.0;
  else if (lifestyle.smoking === 'former') estimate -= 1.5;

  if (lifestyle.stress === 'high') estimate -= 2.5;
  else if (lifestyle.stress === 'low') estimate += 1.5;

  if (lifestyle.diet === 'exceptional') estimate += 2.5;
  else if (lifestyle.diet === 'balanced') estimate += 1.0;
  else if (lifestyle.diet === 'standard') estimate -= 1.0;

  // Clamp within realistic biological human bounds
  return Math.min(105, Math.max(45, Math.round(estimate * 10) / 10));
}
