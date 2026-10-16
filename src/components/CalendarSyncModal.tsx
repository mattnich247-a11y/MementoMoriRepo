import React, { useState, useEffect } from 'react';
import { UserProfile, CountdownMetrics } from '../types';
import { 
  X, 
  Calendar, 
  Bell, 
  Download, 
  Check, 
  Clock, 
  Sparkles, 
  Smartphone, 
  AlertCircle,
  Copy,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface CalendarSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  metrics: CountdownMetrics;
}

export const CalendarSyncModal: React.FC<CalendarSyncModalProps> = ({
  isOpen,
  onClose,
  profile,
  metrics
}) => {
  const [notificationType, setNotificationType] = useState<'daily_days' | 'weekly_weeks'>('daily_days');
  const [reminderTime, setReminderTime] = useState('08:00');
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [testSent, setTestSent] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    try {
      const perm = await Notification.requestPermission();
      setNotificationPermission(perm);
      if (perm === 'granted') {
        sendTestNotification();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const sendTestNotification = () => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    if (Notification.permission === 'granted') {
      const title = notificationType === 'daily_days'
        ? `Memento Mori — ${metrics.remainingDays.toLocaleString()} Days Left`
        : `Memento Mori — ${metrics.weeks.toLocaleString()} Weeks Remaining`;

      const body = notificationType === 'daily_days'
        ? `You have lived ${metrics.elapsedDays.toLocaleString()} days. Today is an unwritten gift.`
        : `Week ${metrics.weeks.toLocaleString()} of your journey. Walk with presence and purpose.`;

      new Notification(title, {
        body,
        icon: '/pwa-192x192.png',
        tag: 'memento-mori-reminder',
      });

      setTestSent(true);
      setTimeout(() => setTestSent(false), 4000);
    }
  };

  // Generate .ics Calendar Subscription file with day-by-day countdown
  const handleDownloadICS = () => {
    const isDaily = notificationType === 'daily_days';
    const now = new Date();
    const [hours, mins] = reminderTime.split(':').map(Number);
    const pad = (n: number) => String(n).padStart(2, '0');
    const formatDateToICS = (d: Date) =>
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

    const events: string[] = [];
    const count = isDaily ? 365 : 104; // 1 year of daily countdown or 2 years of weekly countdown
    const stepDays = isDaily ? 1 : 7;

    for (let i = 0; i < count; i++) {
      const eventDate = new Date(now.getTime() + i * stepDays * 86400000);
      eventDate.setHours(hours, mins, 0, 0);
      const endDate = new Date(eventDate.getTime() + 15 * 60000);

      const daysRemainingOnDate = Math.max(0, metrics.remainingDays - (i * stepDays));
      const weeksRemainingOnDate = Math.max(0, metrics.weeks - (isDaily ? Math.floor(i / 7) : i));
      const daysLivedOnDate = metrics.elapsedDays + (i * stepDays);

      const summary = isDaily
        ? `Memento Mori: ${daysRemainingOnDate.toLocaleString()} Days Left`
        : `Memento Mori: ${weeksRemainingOnDate.toLocaleString()} Weeks Remaining (${daysRemainingOnDate.toLocaleString()} Days Left)`;

      const description = isDaily
        ? `${daysRemainingOnDate.toLocaleString()} days remaining in your mortal horizon. Lived ${daysLivedOnDate.toLocaleString()} days. Treat every conversation, breath, and action as finite and precious.`
        : `Weekly Memento Mori reminder: ${weeksRemainingOnDate.toLocaleString()} weeks remaining. Review your week and live with intention.`;

      events.push(
        [
          'BEGIN:VEVENT',
          `UID:mementomori-${i}-${eventDate.getTime()}@mementomori.app`,
          `DTSTAMP:${formatDateToICS(new Date())}Z`,
          `DTSTART:${formatDateToICS(eventDate)}`,
          `DTEND:${formatDateToICS(endDate)}`,
          `SUMMARY:${summary}`,
          `DESCRIPTION:${description}`,
          'BEGIN:VALARM',
          'TRIGGER:-PT0M',
          'ACTION:DISPLAY',
          'DESCRIPTION:Reminder',
          'END:VALARM',
          'END:VEVENT'
        ].join('\r\n')
      );
    }

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Memento Mori//Mortality Compass//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      ...events,
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isDaily ? 'memento-mori-daily-countdown.ics' : 'memento-mori-weekly-countdown.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-100 text-base">
                Calendar Sync & Daily Notifications
              </h3>
              <p className="text-xs text-neutral-400">Receive reminders with your exact days or weeks remaining</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-neutral-300">
          
          {/* Notification Format Selection */}
          <div className="space-y-2.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
              1. Choose Compass Cadence:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setNotificationType('daily_days')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  notificationType === 'daily_days'
                    ? 'bg-amber-500/10 border-amber-400 text-amber-200 ring-1 ring-amber-400/30'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <div className="font-semibold text-xs text-neutral-100 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Daily Countdown
                </div>
                <div className="text-[11px] text-neutral-400 font-mono">
                  "{metrics.remainingDays.toLocaleString()} Days Left"
                </div>
                <p className="text-[10px] text-neutral-500 mt-1">Every morning reflection</p>
              </button>

              <button
                type="button"
                onClick={() => setNotificationType('weekly_weeks')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  notificationType === 'weekly_weeks'
                    ? 'bg-amber-500/10 border-amber-400 text-amber-200 ring-1 ring-amber-400/30'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <div className="font-semibold text-xs text-neutral-100 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  Weekly Compass
                </div>
                <div className="text-[11px] text-neutral-400 font-mono">
                  "{metrics.weeks.toLocaleString()} Weeks Remaining"
                </div>
                <p className="text-[10px] text-neutral-500 mt-1">Every Sunday morning check-in</p>
              </button>
            </div>
          </div>

          {/* Time Picker */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-neutral-200 text-xs">Preferred Notification Time</div>
              <div className="text-[11px] text-neutral-500">Local time on your phone or computer</div>
            </div>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-neutral-100 font-mono text-xs focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Method A: Direct Calendar (.ics) Import for Google Calendar / Apple Calendar */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-neutral-100 text-xs flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                Sync with Phone Calendar (.ics File)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                Google / Apple / Outlook
              </span>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed">
              Downloads a recurring reminder file compatible with Google Calendar, Apple iCal, Samsung Calendar, and Outlook. Tap open to add to your calendar in 1 second.
            </p>

            <button
              onClick={handleDownloadICS}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold rounded-xl shadow-md transition-all cursor-pointer text-xs"
            >
              <Download className="w-4 h-4 text-neutral-950" />
              <span>Download Calendar Sync (.ics)</span>
            </button>

            {downloadSuccess && (
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 flex items-center gap-2 text-xs">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Calendar file downloaded! Tap it to add to your phone's calendar.</span>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950/70 flex justify-end">
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
