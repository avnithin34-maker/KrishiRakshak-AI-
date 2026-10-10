import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, CheckCircle2 } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface OfflineIndicatorProps {
  language: Language;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ language }) => {
  const isOnline = useOnlineStatus();
  const [showReconnected, setShowReconnected] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);
  const t = translations[language];

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
      setShowReconnected(false);
    } else if (wasOffline && isOnline) {
      // Just came back online
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
        setWasOffline(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (!isOnline) {
    return (
      <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-start gap-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 px-4 py-3 text-white shadow-2xl border border-amber-400/40">
          <div className="w-8 h-8 rounded-xl bg-amber-500/50 flex items-center justify-center shrink-0 mt-0.5">
            <WifiOff className="w-4 h-4 text-amber-100" />
          </div>
          <div className="flex-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-100 text-xs sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              <span>{t.offlineStatusBadge}</span>
            </div>
            <p className="mt-0.5 text-amber-50 leading-relaxed text-[11px] sm:text-xs">
              {t.offlineStatusMessage}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showReconnected) {
    return (
      <div className="fixed bottom-4 left-4 z-50 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center gap-2 rounded-2xl bg-emerald-800 px-4 py-2.5 text-white shadow-2xl border border-emerald-600 text-xs font-bold">
          <Wifi className="w-4 h-4 text-emerald-300" />
          <span>{t.onlineRestoredMessage}</span>
        </div>
      </div>
    );
  }

  return null;
};
