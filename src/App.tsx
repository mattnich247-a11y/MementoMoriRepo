/**
 * Memento Mori — Intentional Life Countdown & Mortality Compass
 * Offline-first application with classic countdown, 2x2 category switcher directly under the quote,
 * biological age health modeling with meal/water tracking, star signs, calendar sync, and developer VIP mode.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile, LovedOne, Milestone, ThemePalette, LifeChapter, HealthMetrics } from './types';
import {
  loadProfile,
  saveProfile,
  loadLovedOnes,
  saveLovedOnes,
  loadMilestones,
  saveMilestones,
  loadPalette,
  savePalette,
  loadLifeChapters,
  saveLifeChapters,
  loadHealthMetrics,
  saveHealthMetrics,
  loadDevVipMode,
  saveDevVipMode,
  DEMO_PROFILES,
  DEFAULT_PROFILE,
  DEFAULT_HEALTH_METRICS,
  hasUserCompletedSetup,
  setUserCompletedSetup
} from './utils/storage';
import { calculateMetrics } from './utils/timeCalculations';

import { TopNav } from './components/TopNav';
import { HeroCountdown } from './components/HeroCountdown';
import { WeeksGrid } from './components/WeeksGrid';
import { HealthAdjusterSection } from './components/HealthAdjusterSection';
import { LovedOnesCompass } from './components/LovedOnesCompass';
import { MilestoneOdyssey } from './components/MilestoneOdyssey';
import { LifetimeChronicle } from './components/LifetimeChronicle';
import { ProfileModal } from './components/ProfileModal';
import { CalendarSyncModal } from './components/CalendarSyncModal';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PremiumGateModal } from './components/PremiumGateModal';
import { Sparkles, ArrowRight, Crown } from 'lucide-react';
import { AUTHORIZED_DEV_EMAIL } from './utils/storage';

export default function App() {
  const [palette, setPalette] = useState<ThemePalette>(() => loadPalette());
  const [profile, setProfile] = useState<UserProfile>(() => loadProfile());

  // Guarantee exactly 2 example loved ones and 3 example goals for initial demo
  const [lovedOnes, setLovedOnes] = useState<LovedOne[]>(() => {
    const loaded = loadLovedOnes();
    if (loaded.length > 2 && loaded[0]?.id?.startsWith('lo-')) {
      return loaded.slice(0, 2);
    }
    return loaded;
  });

  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    const loaded = loadMilestones();
    if (loaded.length > 3 && loaded[0]?.id?.startsWith('ms-')) {
      return loaded.slice(0, 3);
    }
    return loaded;
  });

  const [lifeChapters, setLifeChapters] = useState<LifeChapter[]>(() => loadLifeChapters());
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>(() => loadHealthMetrics());
  const [isDevVipActive, setIsDevVipActive] = useState<boolean>(() => loadDevVipMode());

  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('perspective');

  // The 4 core categories selected via the 2x2 grid right under the quote:
  // a. The Weekly Matrix, b. Health section, c. Loved ones, d. Goals
  const [activeCategory, setActiveCategory] = useState<'matrix' | 'health' | 'loved-ones' | 'goals'>('matrix');

  const [isCalendarSyncOpen, setIsCalendarSyncOpen] = useState<boolean>(false);
  const [hasCompletedSetup, setHasCompletedSetup] = useState<boolean>(() => hasUserCompletedSetup());
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(() => !hasUserCompletedSetup());
  const [isPremiumGateOpen, setIsPremiumGateOpen] = useState<boolean>(false);

  // Live timer tick for real-time second updates and biological heartbeat cadence
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 200);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Determine effective expected lifespan: baseline vs health-adjusted (defaults to non-health adjusted when not premium)
  const effectiveExpectedAge = (isDevVipActive && healthMetrics.isEnabled && healthMetrics.adjustedLifespan)
    ? healthMetrics.adjustedLifespan
    : profile.expectedAge;

  // Compute live metrics with effective lifespan
  const metrics = calculateMetrics(
    profile.birthDate,
    profile.birthTime,
    effectiveExpectedAge,
    currentTime
  );

  const [isNewUser, setIsNewUser] = useState<boolean>(() => {
    return !hasUserCompletedSetup() || localStorage.getItem('memento_explored_sections') !== 'true';
  });

  const handleDismissNewUserGuide = useCallback(() => {
    setIsNewUser(false);
    localStorage.setItem('memento_explored_sections', 'true');
  }, []);

  const handleUpdateProfile = useCallback((updated: UserProfile) => {
    setProfile(updated);
    saveProfile(updated);
    setUserCompletedSetup(true);
    setHasCompletedSetup(true);
  }, []);

  const handleUpdateLovedOnes = useCallback((updated: LovedOne[]) => {
    setLovedOnes(updated);
    saveLovedOnes(updated);
  }, []);

  const handleUpdateMilestones = useCallback((updated: Milestone[]) => {
    setMilestones(updated);
    saveMilestones(updated);
  }, []);

  const handleUpdateLifeChapters = useCallback((updated: LifeChapter[]) => {
    setLifeChapters(updated);
    saveLifeChapters(updated);
  }, []);

  const handleUpdateHealthMetrics = useCallback((updated: HealthMetrics) => {
    setHealthMetrics(updated);
    saveHealthMetrics(updated);
  }, []);

  // Gated Premium trigger: opens passcode verification gate
  const handleToggleDevVip = useCallback(() => {
    setIsPremiumGateOpen(true);
  }, []);

  const handleUnlockPremiumSuccess = useCallback(() => {
    setIsDevVipActive(true);
    saveDevVipMode(true);
  }, []);

  const handleRelockPremium = useCallback(() => {
    setIsDevVipActive(false);
    saveDevVipMode(false);
  }, []);

  const handleLoadDemo = useCallback((key: string) => {
    const demo = DEMO_PROFILES[key] || DEMO_PROFILES.vance;
    setProfile(demo.profile);
    saveProfile(demo.profile);
    const demoLoved = demo.lovedOnes.slice(0, 2);
    setLovedOnes(demoLoved);
    saveLovedOnes(demoLoved);
    setMilestones(demo.milestones);
    saveMilestones(demo.milestones);
    setUserCompletedSetup(true);
    setHasCompletedSetup(true);
  }, []);

  const handleResetData = useCallback(() => {
    localStorage.clear();
    setProfile(DEFAULT_PROFILE);
    setHealthMetrics(DEFAULT_HEALTH_METRICS);
    setLovedOnes(DEMO_PROFILES.vance.lovedOnes.slice(0, 2));
    setMilestones(DEMO_PROFILES.vance.milestones);
    setLifeChapters([]);
    setIsDevVipActive(false);
    setActiveCategory('matrix');
    setIsNewUser(true);
    setUserCompletedSetup(false);
    setHasCompletedSetup(false);
    setIsProfileOpen(true);
  }, []);

  const handleUpdatePalette = useCallback((newPal: ThemePalette) => {
    setPalette(newPal);
    savePalette(newPal);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat: 'matrix' | 'health' | 'loved-ones' | 'goals') => {
    setActiveCategory(cat);
    // Smoothly ensure the category area is in view
    const elem = document.getElementById('category-content');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      data-theme={palette}
      className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-200 transition-colors duration-300 overflow-x-hidden max-w-full w-full"
    >
      {/* Top Bar Header with Dark & Light Theme + Premium Support */}
      <TopNav
        activeSection={activeSection}
        currentPalette={palette}
        onChangePalette={handleUpdatePalette}
        onNavigate={handleNavigate}
        onOpenProfile={() => setIsProfileOpen(true)}
        isDevVipActive={isDevVipActive}
        onToggleDevVip={handleToggleDevVip}
        onOpenCalendarSync={() => setIsCalendarSyncOpen(true)}
      />

      {/* Welcome Prompt Banner if user hasn't configured details yet */}
      {!hasCompletedSetup && (
        <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-amber-500/15 border-b border-amber-500/20 py-3 px-4 text-center text-xs text-amber-200 flex flex-wrap items-center justify-center gap-3">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Enter your details to calibrate your personal life countdown and mortality compass. (We don't store any data)</span>
          </span>
          <button
            onClick={() => setIsProfileOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold rounded-md shadow-sm transition-all cursor-pointer"
          >
            <span>Enter Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Premium Indicator Banner when active */}
      {isDevVipActive && (
        <div className="bg-gradient-to-r from-amber-500/20 via-neutral-900 to-amber-500/20 border-b border-amber-500/30 py-2 px-4 text-center text-xs text-amber-300 flex items-center justify-center gap-3">
          <span className="flex items-center gap-1.5 font-semibold font-mono">
            <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Premium Active: Advanced Health Lab Inputs, Actuarial Data Year, Custom Matrix Shading & All 7 Atmosphere Themes Unlocked</span>
          </span>
          <button
            onClick={handleToggleDevVip}
            className="text-[11px] underline font-mono text-amber-400 hover:text-amber-200 cursor-pointer ml-2"
          >
            Turn Off
          </button>
        </div>
      )}

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* 1. HERO COUNTDOWN (CLASSIC COUNTDOWN + VITALITY 0.5-1 KISSES + SEASONS WITH STAR SIGN + QUOTE + 2x2 CATEGORY BUTTONS) */}
        <HeroCountdown
          profile={profile}
          metrics={metrics}
          isPaused={isPaused}
          onTogglePause={() => setIsPaused(!isPaused)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenHealthAdjuster={() => handleSelectCategory('health')}
          isAdjustedActive={healthMetrics.isEnabled}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          lovedOnesCount={lovedOnes.length}
          milestonesCount={milestones.length}
          isDevVipActive={isDevVipActive}
          isNewUser={isNewUser}
          onDismissNewUserGuide={handleDismissNewUserGuide}
        />

        {/* 2. DYNAMIC ACTIVE CATEGORY DISPLAY (INSTEAD OF SCROLLING DOWN TO FIND THEM) */}
        <div id="category-content" className="w-full transition-all duration-300">
          
          {/* Section A: The Weekly Matrix */}
          {activeCategory === 'matrix' && (
            <WeeksGrid
              profile={{
                ...profile,
                expectedAge: effectiveExpectedAge
              }}
              milestones={milestones}
              lifeChapters={lifeChapters}
              onUpdateLifeChapters={handleUpdateLifeChapters}
              isPremiumOrDev={isDevVipActive}
              onOpenHealthAdjuster={() => handleSelectCategory('health')}
            />
          )}

          {/* Section B: Health Section */}
          {activeCategory === 'health' && (
            <HealthAdjusterSection
              profile={profile}
              healthMetrics={healthMetrics}
              onUpdateHealthMetrics={handleUpdateHealthMetrics}
              isPremiumOrDev={isDevVipActive}
              onToggleDevVip={handleToggleDevVip}
              isDevVipActive={isDevVipActive}
            />
          )}

          {/* Section C: Loved Ones (Exactly 2 examples by default) */}
          {activeCategory === 'loved-ones' && (
            <LovedOnesCompass
              lovedOnes={lovedOnes}
              onUpdateLovedOnes={handleUpdateLovedOnes}
              isPremiumOrDev={isDevVipActive}
              onToggleDevVip={handleToggleDevVip}
            />
          )}

          {/* Section D: Goals (Exactly 3 example goals by default) */}
          {activeCategory === 'goals' && (
            <MilestoneOdyssey
              profile={profile}
              milestones={milestones}
              onUpdateMilestones={handleUpdateMilestones}
              isPremiumOrDev={isDevVipActive}
              onToggleDevVip={handleToggleDevVip}
            />
          )}

        </div>

        {/* 3. UNDER THE 4 SECTION BUTTONS: IMPORTANT EVENTS THAT HAVE OCCURRED AND WILL OCCUR IN YOUR LIFE */}
        <LifetimeChronicle
          profile={profile}
          metrics={metrics}
        />

      </main>

      {/* Clean Footer */}
      <Footer
        onOpenProfile={() => setIsProfileOpen(true)}
        onResetData={handleResetData}
      />

      {/* Profile & Life Details Entry Modal with Health Lab Tab */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onSaveProfile={handleUpdateProfile}
        healthMetrics={healthMetrics}
        onSaveHealthMetrics={handleUpdateHealthMetrics}
        isDevMode={isDevVipActive}
        onToggleDevMode={handleToggleDevVip}
        onLoadDemo={handleLoadDemo}
        isInitialSetup={!hasCompletedSetup}
      />

      {/* Daily & Weekly Calendar Sync Modal */}
      <CalendarSyncModal
        isOpen={isCalendarSyncOpen}
        onClose={() => setIsCalendarSyncOpen(false)}
        profile={profile}
        metrics={metrics}
      />

      {/* Developer Restricted Premium Gate Modal */}
      <PremiumGateModal
        isOpen={isPremiumGateOpen}
        onClose={() => setIsPremiumGateOpen(false)}
        isUnlocked={isDevVipActive}
        onUnlockSuccess={handleUnlockPremiumSuccess}
        onLock={handleRelockPremium}
        userEmail={AUTHORIZED_DEV_EMAIL}
      />

      {/* Network Connectivity Indicator */}
      <OfflineIndicator />
    </div>
  );
}
