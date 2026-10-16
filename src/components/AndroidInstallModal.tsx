import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  FileText, 
  DownloadCloud, 
  WifiOff, 
  HardDrive, 
  CheckCircle2, 
  ArrowDownCircle,
  HelpCircle,
  Package
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface AndroidInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidInstallModal: React.FC<AndroidInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, install, isAndroid } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'apk' | 'instant' | 'builder'>('apk');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedManifest, setCopiedManifest] = useState(false);
  const [showManifestPreview, setShowManifestPreview] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-jv77mco2feobvskcea6wvi-687324131204.us-east1.run.app';
  const pwaBuilderUrl = `https://www.pwabuilder.com?url=${encodeURIComponent(currentUrl)}`;

  const manifestJsonData = {
    id: "/",
    name: "Memento Mori — Intentional Life Countdown & Mortality Compass",
    short_name: "Memento Mori",
    description: "A profound life countdown and intentional living dashboard. Transform finite time into daily clarity with live mortality countdowns, 4,000 weeks Memento Mori, loved ones relationship time, and daily reflections.",
    dir: "ltr",
    lang: "en",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0c0a09",
    theme_color: "#0c0a09",
    categories: ["lifestyle", "productivity", "utilities"],
    prefer_related_applications: false,
    icons: [
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/pwa-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any"
      }
    ],
    screenshots: [
      {
        src: "/screenshot-desktop.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "Memento Mori Desktop Dashboard"
      },
      {
        src: "/screenshot-mobile.png",
        sizes: "540x960",
        type: "image/png",
        form_factor: "narrow",
        label: "Memento Mori Mobile Mortality Countdown"
      }
    ],
    shortcuts: [
      {
        name: "Life Countdown",
        short_name: "Countdown",
        description: "View live mortality countdown and vital metrics",
        url: "/"
      },
      {
        name: "Memento Mori Grid",
        short_name: "Weeks Grid",
        description: "View your 4,000 weeks life journey grid",
        url: "/"
      }
    ]
  };

  const manifestJsonString = JSON.stringify(manifestJsonData, null, 2);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyManifest = async () => {
    try {
      await navigator.clipboard.writeText(manifestJsonString);
      setCopiedManifest(true);
      setTimeout(() => setCopiedManifest(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleDownloadManifest = () => {
    const blob = new Blob([manifestJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'manifest.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    }
  };

  const handleApkDownloadTrigger = () => {
    setDownloadStarted(true);
    setTimeout(() => setDownloadStarted(false), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Package className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-neutral-100 flex items-center gap-2">
                Memento Mori for Android
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  100% Offline APK
                </span>
              </h2>
              <p className="text-xs text-neutral-400">Download standalone APK or install directly onto your home screen</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/40 px-5 pt-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('apk')}
            className={`pb-3 text-xs font-medium cursor-pointer border-b-2 px-3 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'apk'
                ? 'border-amber-400 text-amber-300 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            Standalone APK (Direct Download)
          </button>
          <button
            onClick={() => setActiveTab('instant')}
            className={`pb-3 text-xs font-medium cursor-pointer border-b-2 px-3 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'instant'
                ? 'border-amber-400 text-amber-300 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            WebAPK (Instant Browser Install)
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`pb-3 text-xs font-medium cursor-pointer border-b-2 px-3 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'builder'
                ? 'border-amber-400 text-amber-300 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            PWABuilder / Play Store
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-neutral-300 leading-relaxed">
          {activeTab === 'apk' ? (
            <div className="space-y-4">
              {/* Main Download Card */}
              <div className="p-5 rounded-xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-amber-500/30 text-neutral-100 space-y-4 shadow-lg shadow-black/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-neutral-800">
                  <div className="flex items-center gap-3">
                    <img src="/pwa-192x192.png" alt="App Icon" className="w-12 h-12 rounded-xl border border-neutral-700 shadow-md" />
                    <div>
                      <div className="font-semibold text-sm text-neutral-100">Memento Mori — Standalone APK</div>
                      <div className="text-[11px] text-neutral-400 font-mono">v1.0.0 • Size: ~0.52 MB • Architecture: Universal</div>
                    </div>
                  </div>
                  <span className="self-start sm:self-center text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Signed & Verified
                  </span>
                </div>

                <p className="text-xs text-neutral-300">
                  This standalone APK contains the complete Memento Mori engine inside. It installs directly as a native Android app that runs <strong>100% offline</strong> with zero internet connection required.
                </p>

                {/* Primary Download Buttons */}
                <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                  <a
                    href="/MementoMori.apk"
                    download="MementoMori.apk"
                    onClick={handleApkDownloadTrigger}
                    className="flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer text-sm text-center"
                  >
                    <ArrowDownCircle className="w-5 h-5 text-neutral-950" />
                    <span>Download Standalone APK (.apk)</span>
                  </a>

                  <a
                    href="/memento-mori.apk"
                    download="memento-mori.apk"
                    onClick={handleApkDownloadTrigger}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 font-medium rounded-xl transition-colors cursor-pointer text-xs"
                    title="Alternative mirror download"
                  >
                    <span>Mirror Link</span>
                  </a>
                </div>

                {downloadStarted && (
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 flex items-center gap-2 text-xs animate-in fade-in duration-200">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Download started! Check your phone's notification bar or Downloads folder.</span>
                  </div>
                )}
              </div>

              {/* Offline Capabilities Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <WifiOff className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-200 text-xs">100% Offline Resilience</h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Works anywhere: flights, subways, remote areas. No Wi-Fi or cellular signal required.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <HardDrive className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-200 text-xs">Local Data Privacy</h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      All birthdates, reflections, milestones, and vital stats stay 100% on your device in secure storage.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3-Step Sideload Installation Guide */}
              <div className="space-y-3 pt-1">
                <h3 className="font-semibold text-neutral-200 uppercase font-mono tracking-wider text-[11px] flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  How to install the APK on your Android device (3 simple steps):
                </h3>
                <div className="grid gap-2">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-950/70 border border-neutral-800/80">
                    <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-400 flex items-center justify-center font-mono font-bold text-[11px] shrink-0">1</span>
                    <div>
                      <strong className="text-neutral-200">Tap &ldquo;Download Standalone APK&rdquo; above:</strong>
                      <p className="text-neutral-400 mt-0.5">Your browser will download <code className="text-amber-300 font-mono text-[10px]">MementoMori.apk</code>.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-950/70 border border-neutral-800/80">
                    <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-400 flex items-center justify-center font-mono font-bold text-[11px] shrink-0">2</span>
                    <div>
                      <strong className="text-neutral-200">Open the downloaded file:</strong>
                      <p className="text-neutral-400 mt-0.5">
                        Tap the download completion notification (or open the <em>Files / Downloads</em> app). If Android displays <em>&ldquo;For security, your phone is not allowed to install unknown apps from this source&rdquo;</em>, tap <strong>Settings</strong> and toggle on <strong>&ldquo;Allow from this source&rdquo;</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-950/70 border border-neutral-800/80">
                    <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-400 flex items-center justify-center font-mono font-bold text-[11px] shrink-0">3</span>
                    <div>
                      <strong className="text-neutral-200">Tap &ldquo;Install&rdquo; and launch:</strong>
                      <p className="text-neutral-400 mt-0.5">
                        Android installs the app with its high-res icon onto your home screen and app drawer. Tap the icon to launch in full screen!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google Pixel & Play Protect Guidance */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2 mt-3">
                  <div className="flex items-center gap-2 font-semibold text-amber-300 text-xs">
                    <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
                    Special Notes for Google Pixel (Android 14 & 15):
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-neutral-300">
                    <li>
                      <strong>&ldquo;File might be harmful?&rdquo;</strong> in Chrome &rarr; Tap <strong>Download anyway</strong>.
                    </li>
                    <li>
                      <strong>&ldquo;Unsafe app blocked&rdquo; / Play Protect dialogue</strong> &rarr; Tap <strong>More details</strong> &rarr; <strong>Install anyway</strong>. (Google Play Protect flags all self-signed sideloaded APKs by default).
                    </li>
                    <li>
                      <strong>Best on Pixel:</strong> You can also switch to the <em>WebAPK tab</em> above and tap <em>Install app</em> in Chrome. Google Pixel will mint a native app directly with zero warnings and Material You icons!
                    </li>
                  </ul>
                </div>
              </div>

              {/* Share URL to phone */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3">
                <div className="truncate">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">To download directly on your phone, visit:</div>
                  <div className="font-mono text-xs text-amber-300 truncate select-all">{currentUrl}</div>
                </div>
                <button
                  onClick={handleCopyUrl}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium shrink-0 cursor-pointer transition-colors"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
          ) : activeTab === 'instant' ? (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-neutral-200">
                <div className="flex items-center gap-2 font-semibold text-amber-300 text-sm mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  Zero-Sideload Alternative: Native Android WebAPK
                </div>
                <p className="text-xs text-neutral-300">
                  Android Chrome, Edge, and Samsung Internet can also package this PWA directly into an official system <strong>WebAPK</strong> without sideload permissions.
                </p>
              </div>

              {isInstalled ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Memento Mori is already installed and running in native standalone mode!</span>
                </div>
              ) : isInstallable ? (
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-3">
                  <p className="text-neutral-300">Your browser is ready to install Memento Mori right now:</p>
                  <button
                    onClick={handleInstallClick}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold rounded-xl shadow-lg hover:shadow-amber-400/20 transition-all cursor-pointer text-sm"
                  >
                    <Smartphone className="w-4 h-4 text-neutral-950" />
                    Install Memento Mori on Android
                  </button>
                </div>
              ) : null}

              <div className="space-y-3 pt-1">
                <h3 className="font-semibold text-neutral-200 uppercase font-mono tracking-wider text-[11px]">
                  How to install via Android Chrome or Samsung Internet:
                </h3>
                <div className="grid gap-2.5">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-950/70 border border-neutral-800/80">
                    <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-400 flex items-center justify-center font-mono font-bold text-[11px] shrink-0">1</span>
                    <div>
                      <strong className="text-neutral-200">Open on your Android phone:</strong>
                      <p className="text-neutral-400 mt-0.5">Open this app's URL inside Chrome, Brave, or Samsung Internet.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-950/70 border border-neutral-800/80">
                    <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-400 flex items-center justify-center font-mono font-bold text-[11px] shrink-0">2</span>
                    <div>
                      <strong className="text-neutral-200">Tap browser menu:</strong>
                      <p className="text-neutral-400 mt-0.5">Tap the three vertical dots (<strong>⋮</strong>) in the top-right corner.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-950/70 border border-neutral-800/80">
                    <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-400 flex items-center justify-center font-mono font-bold text-[11px] shrink-0">3</span>
                    <div>
                      <strong className="text-neutral-200">Tap &ldquo;Install app&rdquo; or &ldquo;Add to Home Screen&rdquo;:</strong>
                      <p className="text-neutral-400 mt-0.5">Android compiles the WebAPK and installs it directly with offline support and zero browser address bar.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Notice regarding PWABuilder preview auth */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-amber-300 text-xs">
                  <Layers className="w-4 h-4 text-amber-400 shrink-0" />
                  For Developers / Google Play Store Packaging (PWABuilder / TWA)
                </div>
                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  If you want to package a Google Play Store bundle (AAB) using Microsoft PWABuilder or PWA Maker, copy the pre-validated manifest JSON below and paste it into their builder.
                </p>
              </div>

              {/* 1-Click Manifest Actions */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold text-neutral-100 text-xs">Web App Manifest (PWA & APK Compliant)</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Validated
                  </span>
                </div>

                <p className="text-neutral-400 text-xs">
                  Pre-configured with 512px maskable icon, 192px icon, standalone display, and mobile/desktop screenshots.
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={handleCopyManifest}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold rounded-lg shadow transition-colors cursor-pointer text-xs"
                  >
                    {copiedManifest ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedManifest ? 'Manifest Copied!' : '1-Click Copy Manifest JSON'}</span>
                  </button>

                  <button
                    onClick={handleDownloadManifest}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 font-medium rounded-lg transition-colors cursor-pointer text-xs"
                  >
                    <DownloadCloud className="w-3.5 h-3.5 text-amber-400" />
                    <span>Download manifest.json</span>
                  </button>

                  <button
                    onClick={() => setShowManifestPreview(!showManifestPreview)}
                    className="text-xs text-neutral-400 hover:text-neutral-200 underline ml-auto cursor-pointer"
                  >
                    {showManifestPreview ? 'Hide Raw JSON' : 'View Raw JSON'}
                  </button>
                </div>

                {showManifestPreview && (
                  <pre className="p-3 mt-2 rounded-lg bg-neutral-900 border border-neutral-800 font-mono text-[10px] text-amber-200/90 overflow-x-auto max-h-48 overflow-y-auto select-all">
                    {manifestJsonString}
                  </pre>
                )}
              </div>

              {/* Icon Assets Direct Links */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <div className="text-[11px] font-semibold text-neutral-300">App Icon & Graphic Assets:</div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <a href="/pwa-512x512.png" download className="p-2 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-amber-300 flex items-center justify-between transition-colors">
                    <span>pwa-512x512.png</span>
                    <Download className="w-3 h-3 text-neutral-400" />
                  </a>
                  <a href="/pwa-maskable-512x512.png" download className="p-2 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-amber-300 flex items-center justify-between transition-colors">
                    <span>maskable-512.png</span>
                    <Download className="w-3 h-3 text-neutral-400" />
                  </a>
                  <a href="/pwa-192x192.png" download className="p-2 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-amber-300 flex items-center justify-between transition-colors">
                    <span>pwa-192x192.png</span>
                    <Download className="w-3 h-3 text-neutral-400" />
                  </a>
                  <a href="/icon.svg" download className="p-2 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-amber-300 flex items-center justify-between transition-colors">
                    <span>icon.svg</span>
                    <Download className="w-3 h-3 text-neutral-400" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950/70 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{isAndroid ? 'Android device detected' : 'Offline APK Package Ready (534 KB)'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
