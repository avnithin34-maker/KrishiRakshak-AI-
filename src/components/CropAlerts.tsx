import React, { useState } from 'react';
import { 
  BellRing, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Info,
  ExternalLink,
  Filter
} from 'lucide-react';
import { Language, CropAlert } from '../types';
import { translations } from '../i18n/translations';
import { CROP_ALERTS_DATA } from '../data/alerts';

interface CropAlertsProps {
  language: Language;
}

export const CropAlerts: React.FC<CropAlertsProps> = ({ language }) => {
  const t = translations[language];
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('all');

  const filteredAlerts = CROP_ALERTS_DATA.filter((alert) => {
    if (selectedCropFilter === 'all') return true;
    return alert.crop === selectedCropFilter;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold">
          <BellRing className="w-3.5 h-3.5" />
          <span>{language === 'kn' ? 'ಬೆಳೆ ರಕ್ಷಣಾ ಎಚ್ಚರಿಕೆಗಳು' : 'Vigilance & Pest Advisories'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
          {t.alertsTitle}
        </h1>

        <p className="text-sm text-stone-600 max-w-2xl">
          {t.alertsSubtitle}
        </p>

        {/* Educational Note */}
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>{t.alertEducationalNote}</span>
        </div>

        {/* Crop Filter Tabs */}
        <div className="pt-2 flex flex-wrap gap-2">
          {[
            { id: 'all', label: language === 'kn' ? 'ಎಲ್ಲಾ ಬೆಳೆಗಳು' : 'All Crops' },
            { id: 'tomato', label: 'Tomato (ಟೊಮೇಟೊ)' },
            { id: 'potato', label: 'Potato (ಆಲೂಗಡ್ಡೆ)' },
            { id: 'maize', label: 'Maize (ಮೆಕ್ಕೆಜೋಳ)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCropFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCropFilter === tab.id
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-6">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5 hover:border-emerald-500 transition-colors"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    alert.severity === 'high'
                      ? 'bg-rose-100 text-rose-900 border border-rose-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    {alert.severity} priority
                  </span>
                  <span className="font-semibold text-emerald-800 uppercase text-[11px] bg-emerald-50 px-2 py-0.5 rounded">
                    {alert.crop}
                  </span>
                  <span className="text-stone-400 text-xs">Updated: {alert.lastUpdatedDate}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                  {language === 'kn' ? alert.titleKn : alert.titleEn}
                </h3>
              </div>
            </div>

            {/* Geographical Zones & Season */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-800 block">
                    {language === 'kn' ? 'ಅನ್ವಯಿಸುವ ಕರ್ನಾಟಕ ವಲಯ/ಜಿಲ್ಲೆಗಳು:' : 'Target Agro-Climatic Zone / Districts:'}
                  </span>
                  <span className="text-stone-600">
                    {language === 'kn' ? alert.districtZoneKn : alert.districtZoneEn}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2">
                <Calendar className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-800 block">
                    {language === 'kn' ? 'ಋತು / ಹಂಗಾಮು:' : 'Season & Growth Stage:'}
                  </span>
                  <span className="text-stone-600">
                    {language === 'kn' ? alert.seasonKarnatakaKn : alert.seasonKarnatakaEn}
                  </span>
                </div>
              </div>
            </div>

            {/* Symptoms & Pest Risks */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 space-y-1">
              <span className="font-bold uppercase tracking-wider text-amber-900 block">
                {language === 'kn' ? 'ಲಕ್ಷಣಗಳು ಮತ್ತು ಅಪಾಯ:' : 'Identified Symptoms & Damage Risk:'}
              </span>
              <p className="leading-relaxed">
                {language === 'kn' ? alert.symptomsAndRiskKn : alert.symptomsAndRiskEn}
              </p>
            </div>

            {/* Immediate Action Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{language === 'kn' ? 'ರೈತರು ಕೈಗೊಳ್ಳಬೇಕಾದ ತಕ್ಷಣದ ಕ್ರಮಗಳು:' : 'Recommended Farmer Field Actions:'}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700 leading-relaxed">
                {(language === 'kn' ? alert.actionRequiredKn : alert.actionRequiredEn).map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Source Reference Footer */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span className="truncate max-w-md">Source: {alert.source}</span>
              <span className="font-medium text-emerald-800">UAS Package of Practices</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
