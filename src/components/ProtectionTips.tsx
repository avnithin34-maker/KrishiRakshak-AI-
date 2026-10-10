import React from 'react';
import { 
  Sprout, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FlaskConical, 
  Bug, 
  PhoneCall, 
  Leaf,
  Info
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { IPM_BIO_RECIPES, SAFETY_RULES } from '../data/cropAdvisories';

interface ProtectionTipsProps {
  language: Language;
}

export const ProtectionTips: React.FC<ProtectionTipsProps> = ({ language }) => {
  const t = translations[language];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <Sprout className="w-3.5 h-3.5" />
          <span>{language === 'kn' ? 'ಸಮಗ್ರ ಬೆಳೆ ರಕ್ಷಣೆ' : 'Integrated Pest Management (IPM)'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
          {t.tipsTitle}
        </h1>

        <p className="text-sm text-stone-600 max-w-2xl">
          {t.tipsSubtitle}
        </p>

        {/* Essential Safety Principle */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-green-950 text-white text-xs space-y-2 shadow-md">
          <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>
              {language === 'kn' ? 'ಮೂಲ ಕೃಷಿ ರಕ್ಷಣಾ ತತ್ವ:' : 'Core Crop Protection Rule:'}
            </span>
          </div>
          <p className="text-emerald-100/90 leading-relaxed">
            {language === 'kn'
              ? 'ಪ್ರತಿಯೊಂದು ಕೀಟ ಅಥವಾ ಮಚ್ಚೆಗೂ ದುಬಾರಿ ರಾಸಾಯನಿಕ ಸಿಂಪಡಣೆ ಅಗತ್ಯವಿಲ್ಲ. ಮೊದಲು ನೈಸರ್ಗಿಕ ಮಿತ್ರಕೀಟಗಳನ್ನು ರಕ್ಷಿಸಿ, ಹೊಲದ ನೈರ್ಮಲ್ಯ ಪಾಲಿಸಿ ಹಾಗೂ ಜೈವಿಕ ಕಷಾಯಗಳನ್ನು ಬಳಸಿ. ರಾಸಾಯನಿಕ ಔಷಧಗಳನ್ನು ಕೇವಲ ತೀವ್ರ ಸಂದರ್ಭದಲ್ಲಿ ಕೃಷಿ ಅಧಿಕಾರಿಗಳ ಶಿಫಾರಸು ಮೇರೆಗೆ ಮಾತ್ರವೇ ಬಳಸಿ.'
              : 'Never rush to apply chemical pesticides on unverified image predictions. Prioritize biological agents, neem formulations, and beneficial predatory insects. Follow the official University Package of Practices.'}
          </p>
        </div>
      </div>

      {/* Bio-control Recipes */}
      <div className="space-y-4">
        <div className="border-b border-stone-200 pb-2">
          <h2 className="text-xl font-bold text-stone-900 font-serif flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-emerald-700" />
            <span>{language === 'kn' ? 'ಪರೀಕ್ಷಿತ ಸಾವಯವ ಮತ್ತು ಜೈವಿಕ ಕಷಾಯಗಳು' : 'Validated Bio-Control Preparations'}</span>
          </h2>
          <p className="text-xs text-stone-500">
            {language === 'kn'
              ? 'ಕೃಷಿ ವಿಶ್ವವಿದ್ಯಾನಿಲಯಗಳು ಶಿಫಾರಸು ಮಾಡಿದ ಕಡಿಮೆ ವೆಚ್ಚದ ನೈಸರ್ಗಿಕ ವಿಧಾನಗಳು'
              : 'Low-cost, eco-friendly field solutions recommended by Karnataka Agricultural Universities.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {IPM_BIO_RECIPES.map((recipe, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>

                <h3 className="font-bold text-base text-stone-900">
                  {language === 'kn' ? recipe.titleKn : recipe.titleEn}
                </h3>

                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                  <span className="font-bold block text-[11px] uppercase tracking-wider text-amber-950">
                    {language === 'kn' ? 'ಉದ್ದೇಶಿತ ಕೀಟ/ರೋಗ:' : 'Target Pests/Pathogens:'}
                  </span>
                  <p>{language === 'kn' ? recipe.targetPestKn : recipe.targetPestEn}</p>
                </div>

                <div className="text-xs text-stone-700 space-y-1">
                  <span className="font-bold text-stone-900 block uppercase tracking-wider text-[11px]">
                    {language === 'kn' ? 'ತಯಾರಿಸುವ ವಿಧಾನ:' : 'Preparation & Application:'}
                  </span>
                  <p className="leading-relaxed">
                    {language === 'kn' ? recipe.preparationKn : recipe.preparationEn}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 text-[11px] text-emerald-800 font-medium flex items-start gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{language === 'kn' ? recipe.safetyNoteKn : recipe.safetyNoteEn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Rules for Agricultural Chemicals */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-serif">
            {language === 'kn' ? 'ರಾಸಾಯನಿಕ ಕೀಟನಾಶಕಗಳ ಕಡ್ಡಾಯ ಸುರಕ್ಷತಾ ನಿಯಮಗಳು' : 'Mandatory Chemical Handling & Safety Regulations'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
          {(language === 'kn' ? SAFETY_RULES.kn : SAFETY_RULES.en).map((rule, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="leading-relaxed">{rule}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Where to get verified help */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <h3 className="text-xl font-bold font-serif text-amber-300">
          {language === 'kn' ? 'ತಜ್ಞರ ದೃಢೀಕರಣ ಎಲ್ಲಿ ಪಡೆಯಬೇಕು?' : 'Official Government Field Contact Directory'}
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
          {language === 'kn'
            ? 'ಕರ್ನಾಟಕದ ಪ್ರತಿ ಹೋಬಳಿಯಲ್ಲೂ ಸರಕಾರದ "ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ" (RSK) ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ. ಅನುಮಾನಾಸ್ಪದ ಎಲೆ ಮಾದರಿಯನ್ನು ಕಾಗದದ ಹೊದಿಕೆಯಲ್ಲಿ ಕೊಂಡೊಯ್ದು ಕೃಷಿ ಅಧಿಕಾರಿಗಳಿಗೆ ತೋರಿಸಿ.'
            : 'Every Hobli in Karnataka is served by a Raitha Samparka Kendra (RSK) staffed by Agriculture Officers and Krishi Sakhi workers. Take diseased leaf samples in a breathable paper envelope for certified spore diagnosis.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-700 space-y-1">
            <span className="font-bold text-amber-300 block">Kisan Call Centre (KCC)</span>
            <p className="text-emerald-100">Toll Free: 1800-180-1551</p>
            <p className="text-[11px] text-emerald-300">Kannada language assistance available 6 AM to 10 PM</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-700 space-y-1">
            <span className="font-bold text-amber-300 block">Karnataka Agri Helpline</span>
            <p className="text-emerald-100">Helpline: 155251 / 080-22212861</p>
            <p className="text-[11px] text-emerald-300">Department of Agriculture, Sheshadri Road, Bengaluru</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-700 space-y-1">
            <span className="font-bold text-amber-300 block">University Clinics</span>
            <p className="text-emerald-100">UAS Bengaluru: 080-23330153</p>
            <p className="text-emerald-100">UAS Dharwad: 0836-2447783</p>
            <p className="text-[11px] text-emerald-300">Plant Pathology Clinics & KVKs</p>
          </div>
        </div>
      </div>
    </div>
  );
};
