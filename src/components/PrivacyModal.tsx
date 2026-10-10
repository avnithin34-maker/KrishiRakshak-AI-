import React from 'react';
import { ShieldCheck, X, Lock, Database, Info, FileCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface PrivacyModalProps {
  language: Language;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ language, onClose }) => {
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-stone-200 space-y-5 my-8 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-900 font-serif">
                {t.privacyTitle}
              </h3>
              <p className="text-xs text-stone-500">KrishiRakshak AI Safety Commitment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-stone-700 leading-relaxed">
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-950">
              <Lock className="w-4 h-4 text-emerald-700" />
              <span>{language === 'kn' ? 'ಗೌಪ್ಯ ಮಾಹಿತಿ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ' : 'No Sensitive Personal Data'}</span>
            </div>
            <p className="text-emerald-900">
              {language === 'kn'
                ? 'ನಾವು ಆಧಾರ್ ಸಂಖ್ಯೆಗಳು, ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರಗಳು, ಪಾಸ್‌ವರ್ಡ್‌ಗಳು ಅಥವಾ OTP ಗಳನ್ನು ಎಂದಿಗೂ ಕೇಳುವುದಿಲ್ಲ. ಅರ್ಹತಾ ಪರೀಕ್ಷೆಗೆ ಕೇವಲ ಜಿಲ್ಲೆ, ಬೆಳೆ ಮತ್ತು ಭೂಮಿಯ ವರ್ಗವನ್ನು ಮಾತ್ರ ಬಳಸಲಾಗುತ್ತದೆ.'
                : 'KrishiRakshak AI will never request your Aadhaar number, Bank account details, UPI PINs, or OTPs. Scheme questionnaires strictly evaluate non-confidential agricultural parameters (district, crop, land size).'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-stone-900">
              <Database className="w-4 h-4 text-stone-700" />
              <span>{language === 'kn' ? 'ಸ್ಥಳೀಯ ಬ್ರೌಸರ್ ಸಂಗ್ರಹಣೆ' : 'Local Browser-Only History'}</span>
            </div>
            <p>
              {language === 'kn'
                ? 'ನಿಮ್ಮ ಬೆಳೆ ಪರೀಕ್ಷೆಯ ದಾಖಲೆಗಳು ನಿಮ್ಮ ಮೊಬೈಲ್ ಅಥವಾ ಕಂಪ್ಯೂಟರ್‌ನ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮಾತ್ರ ಸಂಗ್ರಹವಾಗುತ್ತವೆ. ನೀವು ಯಾವುದೇ ಸಮಯದಲ್ಲಿ "ಇತಿಹಾಸ ಅಳಿಸಿಹಾಕಿ" ಗುಂಡಿಯನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ ಅಳಿಸಬಹುದು.'
                : 'Saved screenings reside strictly in your local device browser storage. They are never sent to external user databases or monetized. You have one-click control to clear all history.'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-950">
              <Info className="w-4 h-4 text-amber-700" />
              <span>{language === 'kn' ? 'ಸ್ವತಂತ್ರ ಸಲಹಾ ಸಾಧನದ ಹಕ್ಕುತ್ಯಾಗ' : 'Independent Tool Disclaimer'}</span>
            </div>
            <p className="text-amber-900">
              {language === 'kn'
                ? 'ಈ ಅಪ್ಲಿಕೇಶನ್ ಸ್ವತಂತ್ರ ಶೈಕ್ಷಣಿಕ ಮತ್ತು ರೈತ ಸಲಹಾ ಸಾಧನವಾಗಿದೆ. ಇದು ಯಾವುದೇ ಸರಕಾರಿ ಇಲಾಖೆಯ ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಅಲ್ಲ. ಯಾವುದೇ ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆ ಅಥವಾ ಧನಸಹಾಯಕ್ಕಾಗಿ ನಿಮ್ಮ ಸ್ಥಳೀಯ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ.'
                : 'This platform is an independent digital farming assistant and does not represent an official government department. Visual AI diagnoses are preliminary screening tools and cannot substitute for laboratory tissue testing or certified field agronomist verification.'}
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            {language === 'kn' ? 'ಸಮ್ಮತಿಸಿದೆ ಮತ್ತು ಅರ್ಥವಾಯಿತು' : 'I Understand & Agree'}
          </button>
        </div>
      </div>
    </div>
  );
};
