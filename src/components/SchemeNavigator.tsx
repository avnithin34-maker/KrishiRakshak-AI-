import React, { useState, useMemo } from 'react';
import { 
  Landmark, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  FileText, 
  PhoneCall, 
  HelpCircle, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  ShieldCheck, 
  Calendar,
  X,
  MapPin,
  ClipboardList
} from 'lucide-react';
import { Language, Scheme, FarmerQuestionnaire, SchemeMatchResult } from '../types';
import { translations } from '../i18n/translations';
import { SCHEMES_DATA, KARNATAKA_DISTRICTS } from '../data/schemes';

interface SchemeNavigatorProps {
  language: Language;
}

export const SchemeNavigator: React.FC<SchemeNavigatorProps> = ({ language }) => {
  const t = translations[language];

  // Navigation tab: 'directory' or 'questionnaire'
  const [activeTab, setActiveTab] = useState<'directory' | 'questionnaire'>('directory');

  // Search & Filter state for directory
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'Central' | 'Karnataka State'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSchemeDetail, setSelectedSchemeDetail] = useState<Scheme | null>(null);

  // Questionnaire state
  const [questionnaire, setQuestionnaire] = useState<FarmerQuestionnaire>({
    district: 'Belagavi',
    taluk: '',
    cropType: 'Tomato',
    landHoldingSize: 'small_marginal',
    cropInsured: 'no',
    assistanceNeeded: 'crop_loss',
    currentDamageSituation: 'pest_disease',
  });

  const [matchResults, setMatchResults] = useState<SchemeMatchResult[] | null>(null);
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(SCHEMES_DATA.map((s) => s.category));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered schemes for directory
  const filteredSchemes = useMemo(() => {
    return SCHEMES_DATA.filter((scheme) => {
      const matchesLevel = selectedLevel === 'All' || scheme.level === selectedLevel;
      const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        scheme.officialNameEn.toLowerCase().includes(q) ||
        scheme.officialNameKn.toLowerCase().includes(q) ||
        scheme.purposeEn.toLowerCase().includes(q) ||
        scheme.purposeKn.toLowerCase().includes(q) ||
        scheme.applicableCrops.some((c) => c.toLowerCase().includes(q));

      return matchesLevel && matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedLevel, selectedCategory]);

  // Compute Scheme Matches based on documented criteria
  const handleRunQuestionnaire = (e: React.FormEvent) => {
    e.preventDefault();
    setHasEvaluated(true);

    const results: SchemeMatchResult[] = [];

    SCHEMES_DATA.forEach((scheme) => {
      let score = 0;
      let reasonsEn: string[] = [];
      let reasonsKn: string[] = [];
      let unverifiedEn: string[] = [];
      let unverifiedKn: string[] = [];
      let missingEn: string[] = [];
      let missingKn: string[] = [];

      // PM-KISAN
      if (scheme.id === 'pm-kisan') {
        if (questionnaire.landHoldingSize === 'small_marginal') {
          score += 60;
          reasonsEn.push('You are a small/marginal farmer with land records eligible for ₹6,000 yearly income support.');
          reasonsKn.push('ನೀವು ಸಣ್ಣ/ಅತಿ ಸಣ್ಣ ಹಿಡುವಳಿದಾರರಾಗಿದ್ದು ವಾರ್ಷಿಕ ₹೬,೦೦೦ ಆದಾಯ ನೆರವಿಗೆ ಅರ್ಹರಾಗಿರುತ್ತೀರಿ.');
        } else if (questionnaire.landHoldingSize === 'medium_large') {
          score += 45;
          reasonsEn.push('Landholding farmers with valid RTC can qualify provided no tax-exclusion applies.');
          reasonsKn.push('ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿಸದಿದ್ದಲ್ಲಿ ಪಹಣಿ ಹೊಂದಿರುವ ರೈತರಿಗೆ ಇದು ಅನ್ವಯಿಸಬಹುದು.');
        } else {
          score += 15;
          missingEn.push('Pure tenant farmers without recorded land title in Bhoomi portal may not qualify directly.');
          missingKn.push('ಭೂಮಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಸ್ವಂತ ಪಹಣಿ ಇಲ್ಲದ ಗೇಣಿದಾರರಿಗೆ ಇದು ನೇರವಾಗಿ ಅನ್ವಯಿಸುವುದಿಲ್ಲ.');
        }

        if (questionnaire.assistanceNeeded === 'income_support') {
          score += 30;
          reasonsEn.push('Matches your request for direct seasonal income support.');
          reasonsKn.push('ನಿಮ್ಮ ನೇರ ನಗದು ಆದಾಯ ಬೆಂಬಲದ ಅಗತ್ಯತೆಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.');
        }

        unverifiedEn.push('Aadhaar e-KYC status and FRUITS FID database linkage require verification.');
        unverifiedKn.push('ಆಧಾರ್ ಇ-ಕೆವೈಸಿ ಮತ್ತು ಕರ್ನಾಟಕ ಫ್ರೂಟ್ಸ್ FID ಲಿಂಕ್ ಆಗಿರುವುದನ್ನು ಪರಿಶೀಲಿಸಬೇಕು.');
      }

      // PMFBY / Samrakshane
      else if (scheme.id === 'pmfby-samrakshane') {
        if (questionnaire.currentDamageSituation !== 'none' || questionnaire.assistanceNeeded === 'crop_loss') {
          score += 45;
          reasonsEn.push('Provides risk coverage for crop damage due to weather, localized storms, or widespread pest outbreaks.');
          reasonsKn.push('ಹವಾಮಾನ ವ್ಯತ್ಯಾಸ, ಬಿರುಗಾಳಿ ಅಥವಾ ಕೀಟಬಾಧೆಯಿಂದ ಉಂಟಾದ ಬೆಳೆ ಹಾನಿಗೆ ವಿಮಾ ರಕ್ಷಣೆ ನೀಡುತ್ತದೆ.');
        }

        if (questionnaire.cropInsured === 'yes') {
          score += 45;
          reasonsEn.push('Your crop is already enrolled! You can file an intimation claim within 72 hours of damage.');
          reasonsKn.push('ನಿಮ್ಮ ಬೆಳೆ ಈಗಾಗಲೇ ವಿಮೆಗೆ ನೋಂದಾಯಿಸಲ್ಪಟ್ಟಿದೆ! ಹಾನಿಯಾದ ೭೨ ಗಂಟೆಗಳ ಒಳಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು.');
        } else if (questionnaire.cropInsured === 'no') {
          score += 20;
          missingEn.push('You are not currently enrolled for this season. You can enroll for the next notified cut-off cycle.');
          missingKn.push('ಪ್ರಸ್ತುತ ಹಂಗಾಮಿಗೆ ನೀವು ವಿಮೆ ಮಾಡಿಸಿಲ್ಲ. ಮುಂದಿನ ಅಧಿಸೂಚಿತ ಗಡುವಿಗೆ ನೋಂದಾಯಿಸಿಕೊಳ್ಳಬಹುದು.');
        }

        unverifiedEn.push('Verify whether your Hobli has notified your specific crop on samrakshane.karnataka.gov.in.');
        unverifiedKn.push('ನಿಮ್ಮ ಹೋಬಳಿಯಲ್ಲಿ ಈ ಬೆಳೆ ಅಧಿಸೂಚಿತವಾಗಿದೆಯೇ ಎಂದು ಸಂರಕ್ಷಣೆ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.');
      }

      // Karnataka Parihara
      else if (scheme.id === 'karnataka-parihara') {
        if (questionnaire.currentDamageSituation === 'drought' || questionnaire.currentDamageSituation === 'unseasonal_rain') {
          score += 70;
          reasonsEn.push('Karnataka government releases direct input subsidies for taluks officially declared drought or flood affected.');
          reasonsKn.push('ಸರ್ಕಾರವು ಬರ ಅಥವಾ ಪ್ರವಾಹಪೀಡಿತ ಎಂದು ಘೋಷಿಸಿದ ತಾಲೂಕುಗಳಿಗೆ ನೇರ ಪರಿಹಾರ ನೀಡಲಾಗುತ್ತದೆ.');
        } else if (questionnaire.currentDamageSituation === 'pest_disease') {
          score += 35;
          reasonsEn.push('Severe endemic pest devastation above 33% threshold may qualify under SDRF special state provisions.');
          reasonsKn.push('ಶೇ. ೩೩ ಕ್ಕಿಂತ ಹೆಚ್ಚು ತೀವ್ರ ಕೀಟಬಾಧೆ ಉಂಟಾದಲ್ಲಿ ವಿಶೇಷ ಪರಿಹಾರ ಪರಿಶೀಲನೆಗೆ ಒಳಪಡಬಹುದು.');
        }

        if (questionnaire.assistanceNeeded === 'crop_loss') {
          score += 20;
        }

        unverifiedEn.push(`Verify if ${questionnaire.district} - ${questionnaire.taluk || 'your taluk'} is included in the state disaster notification.`);
        unverifiedKn.push(`ಕಂದಾಯ ಇಲಾಖೆಯ ಬರಪೀಡಿತ ಪಟ್ಟಿಯಲ್ಲಿ ನಿಮ್ಮ ತಾಲೂಕು ಸೇರ್ಪಡೆಯಾಗಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.`);
        unverifiedEn.push('Farmer must have completed crop entry in Karnataka Bele Jarime (Crop Survey) app.');
        unverifiedKn.push('ಬೆಳೆ ಸಮೀಕ್ಷೆ (Bele Jarime) ಆ್ಯಪ್‌ನಲ್ಲಿ ಬೆಳೆ ಸಮೀಕ್ಷೆ ಪೂರ್ಣಗೊಂಡಿರಬೇಕು.');
      }

      // Krishi Bhagya
      else if (scheme.id === 'krishi-bhagya') {
        if (questionnaire.assistanceNeeded === 'irrigation_equipment') {
          score += 65;
          reasonsEn.push('Up to 80-90% subsidy for construction of rainwater farm ponds (Krishi Honda) and pump sets.');
          reasonsKn.push('ಕೃಷಿ ಹೊಂಡ ನಿರ್ಮಾಣ ಹಾಗೂ ಪಂಪ್‌ಸೆಟ್‌ಗಳಿಗೆ ಶೇ. ೮೦-೯೦ ರವರೆಗೆ ಭಾರಿ ಸಬ್ಸಿಡಿ ದೊರೆಯುತ್ತದೆ.');
        }
        if (questionnaire.landHoldingSize === 'small_marginal') {
          score += 25;
          reasonsEn.push('High priority allocation for small and marginal dryland farmers.');
          reasonsKn.push('ಒಣಭೂಮಿ ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರಿಗೆ ಮೊದಲ ಆದ್ಯತೆ.');
        }

        unverifiedEn.push('Check target allocation availability with your local Assistant Director of Agriculture (ADA) office.');
        unverifiedKn.push('ಸ್ಥಳೀಯ ಕೃಷಿ ಇಲಾಖೆ ಕಚೇರಿಯಲ್ಲಿ ಕೃಷಿ ಹೊಂಡದ ಗುರಿ ಲಭ್ಯತೆಯಿದೆಯೇ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.');
      }

      // PMKSY Micro-Irrigation
      else if (scheme.id === 'pmksy-micro-irrigation') {
        if (questionnaire.assistanceNeeded === 'irrigation_equipment') {
          score += 70;
          reasonsEn.push('Provides 75% to 90% subsidy for installing drip or sprinkler micro-irrigation systems in Karnataka.');
          reasonsKn.push('ಕರ್ನಾಟಕದಲ್ಲಿ ಹನಿ ಮತ್ತು ತುಂತುರು ನೀರಾವರಿ ಘಟಕಗಳಿಗೆ ಶೇ. ೭೫ ರಿಂದ ೯೦ ರವರೆಗೆ ಸಬ್ಸಿಡಿ ಲಭ್ಯ.');
        }

        if (['Tomato', 'Potato', 'Maize', 'Vegetables'].includes(questionnaire.cropType)) {
          score += 20;
          reasonsEn.push(`Eligible crop category (${questionnaire.cropType}) with high water-saving efficacy.`);
          reasonsKn.push(`ಹೆಚ್ಚಿನ ನೀರಿನ ಉಳಿತಾಯ ಸಾಮರ್ಥ್ಯವಿರುವ ಬೆಳೆ ವರ್ಗ (${questionnaire.cropType}).`);
        }

        missingEn.push('Requires certificate of assured water source (borewell/open well/pond) and soil test report.');
        missingKn.push('ಖಚಿತ ನೀರಿನ ಮೂಲ (ಕೊಳವೆಬಾವಿ/ಬಾವಿ) ಹಾಗೂ ಮಣ್ಣು ಪರೀಕ್ಷಾ ವರದಿ ಅಗತ್ಯವಿದೆ.');
      }

      // Kisan Credit Card
      else if (scheme.id === 'kisan-credit-card') {
        if (questionnaire.assistanceNeeded === 'credit_kcc') {
          score += 85;
          reasonsEn.push('Offers low-cost crop cultivation credit at 0% interest up to ₹3 lakh in Karnataka cooperative banks.');
          reasonsKn.push('ಕರ್ನಾಟಕದ ಸಹಕಾರಿ ಬ್ಯಾಂಕುಗಳಲ್ಲಿ ₹೩ ಲಕ್ಷದವರೆಗೆ ಶೂನ್ಯ ಬಡ್ಡಿದರದಲ್ಲಿ ಬೆಳೆ ಸಾಲ ದೊರೆಯುತ್ತದೆ.');
        } else {
          score += 30;
          reasonsEn.push('Essential working capital tool for seasonal seeds, fertilizer, and pest management inputs.');
          reasonsKn.push('ಬೀಜ, ಗೊಬ್ಬರ ಹಾಗೂ ಕೀಟನಾಶಕ ವೆಚ್ಚಗಳಿಗೆ ಅಗತ್ಯವಾದ ಬೆಳೆ ಸಾಲ ಸೌಲಭ್ಯ.');
        }

        unverifiedEn.push('Requires clear credit repayment record and no default with PACS or commercial banks.');
        unverifiedKn.push('ಸಹಕಾರಿ ಸಂಘ ಅಥವಾ ಇತರ ಬ್ಯಾಂಕುಗಳಲ್ಲಿ ಸುಸ್ತಿ ಸಾಲವಿಲ್ಲದಿರುವುದನ್ನು ದೃಢೀಕರಿಸಬೇಕು.');
      }

      // Raitha Siri
      else if (scheme.id === 'raitha-siri') {
        if (questionnaire.cropType.toLowerCase().includes('millet') || questionnaire.cropType.toLowerCase().includes('ragi')) {
          score += 85;
          reasonsEn.push('₹10,000 per hectare direct incentive for cultivating notified minor millets in Karnataka.');
          reasonsKn.push('ಕರ್ನಾಟಕದಲ್ಲಿ ಅಧಿಸೂಚಿತ ಸಿರಿಧಾನ್ಯ ಬೆಳೆಯುವುದಕ್ಕೆ ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ ₹೧೦,೦೦೦ ನೇರ ಪ್ರೋತ್ಸಾಹಧನ.');
        }
      }

      if (score >= 40) {
        results.push({
          scheme,
          matchScore: Math.min(score, 98),
          matchReasonEn: reasonsEn.join(' '),
          matchReasonKn: reasonsKn.join(' '),
          unverifiedConditionsEn: unverifiedEn,
          unverifiedConditionsKn: unverifiedKn,
          missingInformationEn: missingEn,
          missingInformationKn: missingKn,
        });
      }
    });

    results.sort((a, b) => b.matchScore - a.matchScore);
    setMatchResults(results);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <Landmark className="w-3.5 h-3.5" />
          <span>{language === 'kn' ? 'ಕರ್ನಾಟಕ ಕೃಷಿ ಯೋಜನೆಗಳು' : 'Karnataka Agricultural Schemes'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
          {t.schemeNavTitle}
        </h1>

        <p className="text-sm text-stone-600 max-w-3xl leading-relaxed">
          {t.schemeNavSubtitle}
        </p>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 pt-2 gap-4">
          <button
            onClick={() => setActiveTab('directory')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'directory'
                ? 'border-emerald-600 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>{t.tabAllSchemes}</span>
          </button>

          <button
            onClick={() => setActiveTab('questionnaire')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'questionnaire'
                ? 'border-emerald-600 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{t.tabEligibilityWizard}</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: QUESTIONNAIRE WIZARD */}
      {activeTab === 'questionnaire' && (
        <div className="space-y-8">
          <form 
            onSubmit={handleRunQuestionnaire}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6"
          >
            <div className="border-b border-stone-100 pb-4 space-y-1">
              <h2 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>{t.wizardTitle}</span>
              </h2>
              <p className="text-xs text-stone-500">{t.wizardSubtitle}</p>
            </div>

            {/* Privacy Reassurance Note */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                {language === 'kn'
                  ? 'ಖಾತರಿ: ನಾವು ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಗೌಪ್ಯ ದಾಖಲೆಗಳನ್ನು (ಆಧಾರ್, ಬ್ಯಾಂಕ್ ಖಾತೆ, ಒಟಿಪಿ) ಕೇಳುವುದಿಲ್ಲ. ನಿಮ್ಮ ಮಾಹಿತಿ ನಿಮ್ಮ ಸಾಧನದಲ್ಲೇ ಸುರಕ್ಷಿತವಾಗಿರುತ್ತದೆ.'
                  : 'Zero Confidential Data: We only ask non-sensitive farm parameters (district, crop, land size). No Aadhaar, Bank Details, or OTPs requested.'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* District */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t.labelDistrict}
                </label>
                <select
                  value={questionnaire.district}
                  onChange={(e) => setQuestionnaire({ ...questionnaire, district: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs text-stone-800 focus:ring-2 focus:ring-emerald-500"
                >
                  {KARNATAKA_DISTRICTS.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              {/* Taluk */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t.labelTaluk}
                </label>
                <input
                  type="text"
                  value={questionnaire.taluk}
                  onChange={(e) => setQuestionnaire({ ...questionnaire, taluk: e.target.value })}
                  placeholder="e.g. Chikkodi / Hukkeri / Malur"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs text-stone-800 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Crop */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t.labelCrop}
                </label>
                <select
                  value={questionnaire.cropType}
                  onChange={(e) => setQuestionnaire({ ...questionnaire, cropType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs text-stone-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Tomato">Tomato (ಟೊಮೇಟೊ)</option>
                  <option value="Potato">Potato (ಆಲೂಗಡ್ಡೆ)</option>
                  <option value="Maize">Maize (ಮೆಕ್ಕೆಜೋಳ)</option>
                  <option value="Ragi">Ragi / Millets (ರಾಗಿ / ಸಿರಿಧಾನ್ಯ)</option>
                  <option value="Paddy">Paddy / Rice (ಭತ್ತ)</option>
                  <option value="Pulses">Pulses / Grams (ದ್ವಿದಳ ಧಾನ್ಯ)</option>
                  <option value="Vegetables">Other Vegetables (ಇತರ ತರಕಾರಿಗಳು)</option>
                </select>
              </div>

              {/* Land Size */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t.labelLandSize}
                </label>
                <select
                  value={questionnaire.landHoldingSize}
                  onChange={(e) => setQuestionnaire({ ...questionnaire, landHoldingSize: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs text-stone-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="small_marginal">{t.optSmallMarginal}</option>
                  <option value="medium_large">{t.optMediumLarge}</option>
                  <option value="tenant">{t.optTenant}</option>
                </select>
              </div>

              {/* Crop Insured */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t.labelInsured}
                </label>
                <select
                  value={questionnaire.cropInsured}
                  onChange={(e) => setQuestionnaire({ ...questionnaire, cropInsured: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs text-stone-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="yes">{t.optYes}</option>
                  <option value="no">{t.optNo}</option>
                  <option value="unsure">{t.optUnsure}</option>
                </select>
              </div>

              {/* Assistance Needed */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t.labelAssistance}
                </label>
                <select
                  value={questionnaire.assistanceNeeded}
                  onChange={(e) => setQuestionnaire({ ...questionnaire, assistanceNeeded: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs text-stone-800 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="crop_loss">{t.optCropLoss}</option>
                  <option value="income_support">{t.optIncomeSupport}</option>
                  <option value="irrigation_equipment">{t.optIrrigation}</option>
                  <option value="credit_kcc">{t.optCredit}</option>
                  <option value="seeds_fertilizer">{t.optSeedsFertilizer}</option>
                </select>
              </div>

              {/* Damage Situation */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t.labelDamage}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'pest_disease', label: t.optPest, icon: '🐛' },
                    { id: 'drought', label: t.optDrought, icon: '☀️' },
                    { id: 'unseasonal_rain', label: t.optUnseasonal, icon: '🌧️' },
                    { id: 'none', label: t.optNone, icon: '🌾' },
                  ].map((sit) => (
                    <button
                      key={sit.id}
                      type="button"
                      onClick={() => setQuestionnaire({ ...questionnaire, currentDamageSituation: sit.id as any })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        questionnaire.currentDamageSituation === sit.id
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span className="text-base">{sit.icon}</span>
                      <p className="text-xs font-medium mt-1">{sit.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{t.btnCheckEligibility}</span>
              </button>
            </div>
          </form>

          {/* Questionnaire Results */}
          {hasEvaluated && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 font-serif">
                    {t.matchingSchemesTitle}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {language === 'kn'
                      ? 'ದಾಖಲಿತ ಮಾನದಂಡಗಳ ಆಧಾರದ ಮೇಲಿನ ಸಂಭವನೀಯ ಯೋಜನೆಗಳು'
                      : 'Evaluated against official government criteria without personal credentials.'}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                  {matchResults?.length || 0} Schemes Found
                </span>
              </div>

              {matchResults && matchResults.length > 0 ? (
                <div className="space-y-6">
                  {matchResults.map((result) => {
                    const s = result.scheme;
                    return (
                      <div
                        key={s.id}
                        className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4 hover:border-emerald-500 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                                {s.level}
                              </span>
                              <span className="text-xs text-stone-500">{s.category}</span>
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                                Match: {result.matchScore}%
                              </span>
                            </div>
                            <h4 className="text-lg font-bold text-stone-900">
                              {language === 'kn' ? s.officialNameKn : s.officialNameEn}
                            </h4>
                          </div>

                          <button
                            onClick={() => setSelectedSchemeDetail(s)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors shrink-0"
                          >
                            <FileText className="w-4 h-4 text-emerald-700" />
                            <span>{t.btnViewDetails}</span>
                          </button>
                        </div>

                        {/* Why this applies */}
                        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 space-y-1 text-xs text-emerald-950">
                          <span className="font-bold uppercase tracking-wider text-emerald-900">
                            {language === 'kn' ? 'ನಿಮ್ಮ ಜಮೀನಿಗೆ ಇದು ಏಕೆ ಅನ್ವಯಿಸಬಹುದು:' : 'Why this scheme may apply:'}
                          </span>
                          <p className="leading-relaxed">
                            {language === 'kn' ? result.matchReasonKn : result.matchReasonEn}
                          </p>
                        </div>

                        {/* Unverified Conditions & Missing Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          {result.unverifiedConditionsEn.length > 0 && (
                            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 space-y-1">
                              <span className="font-bold flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                                <span>{language === 'kn' ? 'ಸ್ಥಳೀಯ ಕಚೇರಿಯಲ್ಲಿ ಪರಿಶೀಲಿಸಬೇಕಾದ ಷರತ್ತುಗಳು:' : 'Conditions requiring official confirmation:'}</span>
                              </span>
                              <ul className="list-disc list-inside space-y-0.5 text-stone-700">
                                {(language === 'kn' ? result.unverifiedConditionsKn : result.unverifiedConditionsEn).map((cond, i) => (
                                  <li key={i}>{cond}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {result.missingInformationEn.length > 0 && (
                            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-700 space-y-1">
                              <span className="font-bold flex items-center gap-1 text-stone-900">
                                <HelpCircle className="w-3.5 h-3.5 text-stone-600" />
                                <span>{language === 'kn' ? 'ಗಮನಿಸಬೇಕಾದ ಅಂಶಗಳು:' : 'Missing factors or limitations:'}</span>
                              </span>
                              <ul className="list-disc list-inside space-y-0.5">
                                {(language === 'kn' ? result.missingInformationKn : result.missingInformationEn).map((m, i) => (
                                  <li key={i}>{m}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <span className="text-stone-500">
                            Helpline: <strong className="text-stone-800">{s.officialHelpline}</strong>
                          </span>
                          <a
                            href={s.applicationPortalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-bold underline"
                          >
                            <span>{t.btnApplyPortal} ({s.portalName})</span>
                            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-stone-50 p-8 rounded-2xl text-center border border-stone-200 space-y-3">
                  <p className="text-sm font-semibold text-stone-700">{t.noMatchNotice}</p>
                  <button
                    onClick={() => setActiveTab('directory')}
                    className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs"
                  >
                    {language === 'kn' ? 'ಪೂರ್ಣ ಪಟ್ಟಿಯನ್ನು ವೀಕ್ಷಿಸಿ' : 'Browse All Schemes'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: ALL SCHEMES DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Search & Filters Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value as any)}
                  className="px-3 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs text-stone-700"
                >
                  <option value="All">{t.filterLevel}</option>
                  <option value="Central">{t.filterCentral}</option>
                  <option value="Karnataka State">{t.filterKarnataka}</option>
                </select>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs text-stone-700"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Scheme Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-emerald-500 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                      {scheme.level}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-medium">
                      {scheme.verificationStatus}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-stone-900 leading-snug">
                    {language === 'kn' ? scheme.officialNameKn : scheme.officialNameEn}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {language === 'kn' ? scheme.purposeKn : scheme.purposeEn}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1">
                    {scheme.applicableCrops.map((crop, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-stone-50 border border-stone-200 text-stone-600">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setSelectedSchemeDetail(scheme)}
                    className="inline-flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-950"
                  >
                    <span>{t.btnViewDetails}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <a
                    href={scheme.applicationPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-800 text-[11px]"
                  >
                    <span>{scheme.portalName}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scheme Detail Modal */}
      {selectedSchemeDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-stone-200 space-y-6 my-8 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-stone-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                    {selectedSchemeDetail.level}
                  </span>
                  <span className="text-stone-500">{selectedSchemeDetail.category}</span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 font-serif">
                  {language === 'kn' ? selectedSchemeDetail.officialNameKn : selectedSchemeDetail.officialNameEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSchemeDetail(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Purpose */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-950 leading-relaxed">
              <span className="font-bold uppercase tracking-wider text-emerald-900 block mb-1">
                {language === 'kn' ? 'ಯೋಜನೆಯ ಉದ್ದೇಶ:' : 'Scheme Objective & Benefits:'}
              </span>
              <p>{language === 'kn' ? selectedSchemeDetail.purposeKn : selectedSchemeDetail.purposeEn}</p>
            </div>

            {/* Eligibility Criteria */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{language === 'kn' ? 'ಅರ್ಹತಾ ಮಾನದಂಡಗಳು:' : 'Documented Eligibility Criteria:'}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700 leading-relaxed">
                {(language === 'kn' ? selectedSchemeDetail.eligibilityKn : selectedSchemeDetail.eligibilityEn).map((crit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <ClipboardList className="w-4 h-4 text-amber-700" />
                <span>{language === 'kn' ? 'ಅಗತ್ಯ ದಾಖಲೆಗಳ ಪಟ್ಟಿ:' : 'Required Document Checklist:'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(language === 'kn' ? selectedSchemeDetail.requiredDocumentsKn : selectedSchemeDetail.requiredDocumentsEn).map((doc, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-stone-800">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Procedure Step-by-Step */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>{language === 'kn' ? 'ಅರ್ಜಿ ಸಲ್ಲಿಕೆಯ ಹಂತಗಳು:' : 'Application Procedure:'}</span>
              </h4>
              <ol className="space-y-2 text-xs text-stone-700">
                {(language === 'kn' ? selectedSchemeDetail.applicationProcedureKn : selectedSchemeDetail.applicationProcedureEn).map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Helpline and Portal Link */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-600">Official Helpline:</span>
                <span className="font-bold text-stone-900">{selectedSchemeDetail.officialHelpline}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-600">{t.lastVerifiedPrefix}</span>
                <span className="text-stone-800 font-medium">{selectedSchemeDetail.lastVerifiedDate}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={selectedSchemeDetail.applicationPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>{t.btnApplyPortal}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSelectedSchemeDetail(null)}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors"
              >
                {language === 'kn' ? 'ಮುಚ್ಚಿ' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
