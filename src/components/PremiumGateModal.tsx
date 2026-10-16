import React, { useState } from 'react';
import { Lock, Key, ShieldCheck, Sparkles, Check, AlertCircle, X, Terminal, Crown, Eye, EyeOff } from 'lucide-react';
import { DEV_PASSCODES } from '../utils/storage';

interface PremiumGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  isUnlocked: boolean;
  onUnlockSuccess: () => void;
  onLock: () => void;
  userEmail?: string;
}
export const PremiumGateModal: React.FC<PremiumGateModalProps> = ({
  isOpen,
  onClose,
  isUnlocked,
  onUnlockSuccess,
  onLock
}) => {
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [justUnlocked, setJustUnlocked] = useState(false);

  if (!isOpen) return null;

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passcode.trim().toLowerCase();

    const isValidCode =
      clean === 'apptester' ||
      clean === 'apptester' ||
      (Array.isArray(DEV_PASSCODES) && DEV_PASSCODES.some((c) => c.toLowerCase() === clean));

    if (isValidCode) {
      setErrorMsg(null);
      setJustUnlocked(true);
      setTimeout(() => {
        onUnlockSuccess();
        setJustUnlocked(false);
        onClose();
      }, 600);
    } else {
      setErrorMsg('Invalid access code. Please check your code and try again.');
    }
  };

  const handleDeactivate = () => {
    onLock();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-7 shadow-2xl overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            {isUnlocked ? <Crown className="w-5 h-5 fill-amber-400 text-amber-400" /> : <Lock className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              <Key className="w-3.5 h-3.5" />
              <span>Developer & VIP Clearance</span>
            </div>
            <h3 className="font-serif text-xl text-neutral-100 font-bold">
              {isUnlocked ? 'Premium Unlocked' : 'Developer Access Gate'}
            </h3>
          </div>
        </div>

          {/* Explanation / Access Notice */}
        <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 text-xs font-mono space-y-2 mb-5">
          <div className="flex items-center justify-between text-neutral-400">
            <span>Verification Method:</span>
            <span className="text-amber-300 font-semibold">Passcode Required</span>
          </div>
          <div className="flex items-center justify-between text-neutral-400">
            <span>Access Tier:</span>
            <span className="text-emerald-400 font-semibold">PREMIUM / VIP</span>
          </div>
          <p className="text-[11px] text-neutral-400 pt-1.5 border-t border-neutral-800/80 font-sans leading-relaxed">
            Premium Mode unlocks the complete clinical Health Section, historical actuarial data years (1960–2024), up to 100 Goals &amp; Loved Ones, and all 7 atmosphere palettes.
          </p>
        </div>

        {isUnlocked ? (
          <div className="space-y-4">
            <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center gap-2.5 text-xs text-emerald-300 font-mono">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Developer clearance active. All premium features are unlocked.</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDeactivate}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-950/40 hover:bg-rose-950/60 border border-rose-500/40 text-rose-300 font-mono text-xs font-semibold transition-colors cursor-pointer"
              >
                Relock Premium Mode
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleVerifyPasscode} className="space-y-4">
            <div>
               <label className="text-xs font-mono text-neutral-400 block mb-1.5">
                Enter Access Code:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  placeholder="Enter access code..."
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-100 placeholder-neutral-600 font-mono text-sm tracking-wider focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors p-1"
                  aria-label={showPassword ? 'Hide code' : 'Show code'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 mt-1 block">
                Enter your access code to unlock all Premium features.
              </span>

            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl flex items-center gap-2 text-xs text-rose-300 font-mono animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {justUnlocked && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center gap-2 text-xs text-emerald-300 font-mono animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Access Granted! Unlocking Premium...</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Verify & Unlock</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
