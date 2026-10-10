import React from 'react';
import { ShieldCheck, PhoneCall, ExternalLink, HelpCircle, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface FooterProps {
  language: Language;
  onOpenPrivacy: () => void;
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenPrivacy, setCurrentTab }) => {
  const t = translations[language];

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-sm mt-16">
      {/* Helpline strip */}
      <div className="bg-emerald-950/80 border-b border-emerald-900/60 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-emerald-200">
            <PhoneCall className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white text-xs sm:text-sm">
                {language === 'kn' ? 'ಅಧಿಕೃತ ಕೃಷಿ ಸಹಾಯವಾಣಿಗಳು:' : 'Official Agricultural Helplines:'}
              </p>
              <p className="text-xs text-emerald-300">
                Kisan Call Centre: <span className="text-white font-bold">1800-180-1551</span> | Karnataka Raitha Helpline: <span className="text-white font-bold">155251</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <a
              href="https://fruits.karnataka.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-300 hover:text-white underline"
            >
              <span>FRUITS Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-stone-600">|</span>
            <a
              href="https://samrakshane.karnataka.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-300 hover:text-white underline"
            >
              <span>Samrakshane (PMFBY)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-stone-600">|</span>
            <a
              href="https://parihara.karnataka.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-300 hover:text-white underline"
            >
              <span>Parihara (Crop Loss)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white font-serif">{t.appTitle}</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              {language === 'kn'
                ? 'ಕರ್ನಾಟಕದ ರೈತರಿಗೆ ಟೊಮೇಟೊ, ಆಲೂಗಡ್ಡೆ ಹಾಗೂ ಮೆಕ್ಕೆಜೋಳದ ಎಲೆ ರೋಗಗಳನ್ನು ಪ್ರಾಥಮಿಕವಾಗಿ ಗುರುತಿಸಲು ಮತ್ತು ಅಧಿಕೃತ ಸರಕಾರಿ ಯೋಜನೆಗಳ ಪ್ರಯೋಜನಗಳನ್ನು ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಅಭಿವೃದ್ಧಿಪಡಿಸಲಾದ ತಂತ್ರಜ್ಞಾನ ವೇದಿಕೆ.'
                : 'An agricultural technology assistant built for Karnataka farmers to enable early visual leaf screening of Tomato, Potato, and Maize, alongside navigation of verified state and central schemes.'}
            </p>
            <div className="flex items-start space-x-2 p-3 rounded-lg bg-stone-800/80 border border-stone-700/60 text-xs text-amber-300">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <p>
                {language === 'kn'
                  ? 'ಗಮನಿಸಿ: ಕೃಷಿ ರಕ್ಷಕ AI ಸ್ವತಂತ್ರ ಸಲಹಾ ಸಾಧನವಾಗಿದೆ. ಇದು ಯಾವುದೇ ಸರಕಾರಿ ಇಲಾಖೆಯ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ಅಲ್ಲ. ರಾಸಾಯನಿಕ ಸಿಂಪಡಣೆ ಅಥವಾ ಧನಸಹಾಯಕ್ಕಾಗಿ ನಿಮ್ಮ ಹತ್ತಿರದ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರವನ್ನು (RSK) ಸಂಪರ್ಕಿಸಿ.'
                  : 'Notice: KrishiRakshak AI is an independent advisory tool, not an official government portal. Verify all diagnostic and chemical intervention advice with your local Raitha Samparka Kendra (RSK) before field application.'}
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              {language === 'kn' ? 'ವೇಗದ ಸಂಪರ್ಕಗಳು' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setCurrentTab('home')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('doctor')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t.navDoctor}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('schemes')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t.navSchemes}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('alerts')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t.navAlerts}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('history')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t.navHistory}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('tips')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t.navTips}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Privacy & Safety */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              {language === 'kn' ? 'ಸುರಕ್ಷತೆ ಮತ್ತು ಗೌಪ್ಯತೆ' : 'Farmer Privacy & Safety'}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              {language === 'kn'
                ? 'ನಾವು ಆಧಾರ್ ಸಂಖ್ಯೆ, ಬ್ಯಾಂಕ್ ಖಾತೆ ಅಥವಾ ಒಟಿಪಿ ಕೇಳುವುದಿಲ್ಲ. ಯಾವುದೇ ಗೌಪ್ಯ ಮಾಹಿತಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.'
                : 'No Aadhaar numbers, bank account credentials, or OTPs are requested. All history is strictly preserved in your local browser.'}
            </p>
            <button
              onClick={onOpenPrivacy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs border border-stone-700 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'kn' ? 'ಗೌಪ್ಯತಾ ನಿಯಮಗಳು ಓದಿ' : 'View Privacy Policy'}</span>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <p>© {new Date().getFullYear()} KrishiRakshak AI — Supporting Karnataka Farmers.</p>
          <p className="text-stone-400">
            {language === 'kn' ? 'ಕೃಷಿ ಜ್ಞಾನ ಮತ್ತು ರಕ್ಷಣೆ' : 'Grounded in ICAR & Karnataka University Agricultural Packages of Practices'}
          </p>
        </div>
      </div>
    </footer>
  );
};
