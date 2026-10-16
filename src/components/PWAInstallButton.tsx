import React, { useState } from 'react';
import { Smartphone, Download } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { AndroidInstallModal } from './AndroidInstallModal';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'nav' | 'prominent';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ className = '', variant = 'nav' }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  // If already running inside standalone PWA mode, we don't need the prompt button
  if (isInstalled) {
    return null;
  }

  const handleClick = () => {
    setShowModal(true);
  };

  if (variant === 'prominent') {
    return (
      <>
        <button
          onClick={handleClick}
          className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/40 text-amber-300 rounded-xl font-medium text-xs shadow-sm hover:shadow-amber-500/10 transition-all cursor-pointer ${className}`}
        >
          <Smartphone className="w-4 h-4 text-amber-400" />
          <span>Install Android App (APK)</span>
        </button>

        <AndroidInstallModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleClick}
        title="Install Spark on Android or get APK"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer ${className}`}
      >
        <Smartphone className="w-3.5 h-3.5 text-amber-400" />
        <span className="hidden md:inline font-medium">Android / APK</span>
      </button>

      <AndroidInstallModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};
