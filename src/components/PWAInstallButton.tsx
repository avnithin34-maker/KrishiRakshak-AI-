import React, { useState } from 'react';
import { Download, Smartphone, X, Check, ShieldCheck } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface PWAInstallButtonProps {
  language: Language;
  className?: string;
  variant?: 'header' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  language,
  className = '',
  variant = 'header',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const t = translations[language];

  // If already running as an installed PWA in standalone mode, suppress
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    if (variant === 'banner') {
      return (
        <div className="bg-gradient-to-r from-emerald-800 to-green-900 border border-emerald-700/80 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm">
                {language === 'kn' ? 'ಮೊಬೈಲ್ ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ' : 'Install KrishiRakshak App'}
              </p>
              <p className="text-xs text-emerald-200">
                {language === 'kn'
                  ? 'ಇಂಟರ್ನೆಟ್ ಕಡಿಮೆ ಇದ್ದಾಗಲೂ ಸುಲಭವಾಗಿ ಬಳಸಲು ಹೋಮ್ ಸ್ಕ್ರೀನ್‌ಗೆ ಸೇರಿಸಿ'
                  : 'Works offline in rural areas with poor connectivity'}
              </p>
            </div>
          </div>
          <button
            onClick={install}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-black shadow-md transition-all shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>{t.installAppBtn}</span>
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={install}
        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 text-xs font-black shadow-md transition-all transform hover:scale-105 ${className}`}
        title="Install KrishiRakshak AI on your device"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{t.installAppBtn}</span>
        <span className="sm:hidden">{language === 'kn' ? 'ಆ್ಯಪ್' : 'Install'}</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-amber-300 border border-emerald-600 text-xs font-bold transition-all ${className}`}
          title="Install on iPhone / iPad"
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden sm:inline">{t.installOnIOSBtn}</span>
          <span className="sm:hidden">{language === 'kn' ? 'ಆ್ಯಪ್' : 'Install'}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-stone-200 text-stone-900">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-base font-bold text-emerald-950 font-serif">
                    {t.installIOSTitle}
                  </h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs sm:text-sm text-stone-600">
                <div className="flex items-start gap-2.5 bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </span>
                  <p>{t.installIOSStep1}</p>
                </div>
                <div className="flex items-start gap-2.5 bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </span>
                  <p>{t.installIOSStep2}</p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-emerald-900 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-emerald-800 transition"
              >
                {t.closeBtn}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
