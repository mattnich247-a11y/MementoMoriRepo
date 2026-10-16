import React, { useState } from 'react';
import { Compass, RotateCcw, AlertTriangle, ArrowUp, Sparkles, X } from 'lucide-react';

interface FooterProps {
  onOpenProfile: () => void;
  onResetData: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenProfile, onResetData }) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleConfirmReset = () => {
    setShowConfirmReset(false);
    onResetData();
  };

  return (
    <footer className="w-full py-12 border-t border-neutral-900 bg-neutral-950 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Explore More Sections & Features Guide Note */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/70 to-neutral-900 border border-neutral-800 text-neutral-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-neutral-100 flex items-center gap-2">
                <span>Explore More Sections & Features Above</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 font-bold">
                  Pro-Tip
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 max-w-3xl leading-relaxed">
                Take a moment to explore every section: shade your <strong>Weekly Life Matrix</strong> by years, months, or weeks; log water intake in glasses and meals in the <strong>Vitality & Health Lab</strong>; calculate finite remaining visits in <strong>Loved Ones Compass</strong>; and edit your bucket list goals in <strong>Milestone Odyssey</strong>.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 text-xs font-mono transition-colors shrink-0 cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Standard Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-neutral-900">
          
          {/* Brand & Philosophy */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="font-display uppercase tracking-widest text-sm text-neutral-200 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Spark Life Countdown
            </div>
            <p className="text-neutral-500 font-serif italic text-xs">
              A mortal compass for intentional living. All data remains exclusively on your device.
            </p>
          </div>

          {/* Links & Controls */}
          <div className="flex items-center gap-6 font-medium text-neutral-400">
            <button
              onClick={onOpenProfile}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Update Details
            </button>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Back to Top
            </button>
            <button
              onClick={() => setShowConfirmReset(true)}
              className="hover:text-rose-400 transition-colors cursor-pointer text-neutral-500 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3 text-neutral-500" />
              <span>Reset Data</span>
            </button>
          </div>

        </div>

      </div>

      {/* Confirmation Modal for Reset Data */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-neutral-950 border border-rose-500/40 rounded-2xl p-6 shadow-2xl text-left space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg text-neutral-100 font-semibold">
                  Confirm Complete Data Reset
                </h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Are you sure you want to completely reset all data? This will clear all stored profile information, custom chapters, logged water, meals, loved ones, and goals, acting as if you are completely new to the site.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 text-[11px] text-rose-300 font-mono">
              ⚠️ This action is irreversible and restores brand-new initial onboarding.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs font-mono rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Yes, Reset All Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
