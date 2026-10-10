import React from 'react';
import { 
  Stethoscope, 
  Landmark, 
  BellRing, 
  History, 
  Sprout, 
  ArrowRight, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  ShieldAlert, 
  ChevronRight,
  FlaskConical,
  HelpCircle,
  MapPin,
  Calendar
} from 'lucide-react';
import { Language, SampleDemoCase } from '../types';
import { translations } from '../i18n/translations';
import { SAMPLE_DEMOS } from '../data/sampleDemos';
import { CROP_ALERTS_DATA } from '../data/alerts';
import { SCHEMES_DATA } from '../data/schemes';
import { PWAInstallButton } from './PWAInstallButton';

interface HomeDashboardProps {
  language: Language;
  onNavigate: (tab: string) => void;
  onSelectSampleDemo: (demo: SampleDemoCase) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  language,
  onNavigate,
  onSelectSampleDemo,
}) => {
  const t = translations[language];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 text-white shadow-xl border border-emerald-700/50 p-6 sm:p-10 lg:p-12">
        {/* Subtle patterned backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a7f3d0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-700/80 border border-emerald-500/40 text-emerald-100 text-xs sm:text-sm font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>{t.karnatakaFocusBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-serif leading-tight">
            {t.heroWelcome}
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
            {t.heroSubtitle}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('doctor')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <Upload className="w-5 h-5 text-emerald-950" />
              <span>{t.btnUploadPhoto}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onNavigate('schemes')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-800/90 hover:bg-emerald-700 text-white font-semibold text-base border border-emerald-500/50 transition-all"
            >
              <Landmark className="w-5 h-5 text-amber-300" />
              <span>{t.btnExploreSchemes}</span>
            </button>

            <button
              onClick={() => onNavigate('maps')}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-950 text-emerald-200 hover:text-white text-sm font-semibold border border-emerald-700/60 transition-all"
            >
              <MapPin className="w-4 h-4 text-red-400" />
              <span>{language === 'kn' ? 'ನಕ್ಷೆ ಕೇಂದ್ರಗಳು' : 'RSK Locator'}</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('demo-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl text-emerald-200 hover:text-white text-sm font-medium transition-colors"
            >
              <FlaskConical className="w-4 h-4 text-emerald-400" />
              <span>{t.btnViewDemo}</span>
            </button>
          </div>

          {/* Supported crops indicator */}
          <div className="pt-4 flex flex-wrap items-center gap-2 text-xs text-emerald-200">
            <span className="font-semibold text-emerald-100">
              {language === 'kn' ? 'ಪ್ರಸ್ತುತ ಬೆಂಬಲಿತ ಬೆಳೆಗಳು:' : 'Active Tested Crops:'}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-700/60 text-emerald-100 font-medium">
              🍅 {language === 'kn' ? 'ಟೊಮೇಟೊ' : 'Tomato'}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-700/60 text-emerald-100 font-medium">
              🥔 {language === 'kn' ? 'ಆಲೂಗಡ್ಡೆ' : 'Potato'}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-700/60 text-emerald-100 font-medium">
              🌽 {language === 'kn' ? 'ಮೆಕ್ಕೆಜೋಳ' : 'Maize'}
            </span>
            <span className="text-emerald-300/80 italic text-[11px]">
              {language === 'kn' ? '(ಇತರ ಬೆಳೆಗಳು ಪರೀಕ್ಷೆಯ ಹಂತದಲ್ಲಿವೆ)' : '(Other crops in testing pipeline)'}
            </span>
          </div>
        </div>
      </section>

      {/* Offline Ready / Mobile PWA Installation Banner */}
      <PWAInstallButton language={language} variant="banner" />

      {/* Main Feature Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Crop Doctor */}
        <div 
          onClick={() => onNavigate('doctor')}
          className="group bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-emerald-500 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-emerald-700 transition-colors">
              {t.cardDoctorTitle}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t.cardDoctorDesc}
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
            <span>{language === 'kn' ? 'ಎಲೆ ಪರೀಕ್ಷಿಸಿ' : 'Diagnose Crop Leaf'}</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Card 2: Government Schemes */}
        <div 
          onClick={() => onNavigate('schemes')}
          className="group bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-emerald-500 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-emerald-700 transition-colors">
              {t.cardSchemeTitle}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t.cardSchemeDesc}
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
            <span>{language === 'kn' ? 'ಯೋಜನೆಗಳನ್ನು ನೋಡಿ' : 'Check Eligibility'}</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Card 3: Local Alerts */}
        <div 
          onClick={() => onNavigate('alerts')}
          className="group bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-emerald-500 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <BellRing className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-emerald-700 transition-colors">
              {t.cardAlertsTitle}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t.cardAlertsDesc}
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
            <span>{language === 'kn' ? 'ಎಚ್ಚರಿಕೆ ವೀಕ್ಷಿಸಿ' : 'View Advisories'}</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Card 4: My Crop History */}
        <div 
          onClick={() => onNavigate('history')}
          className="group bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-emerald-500 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-emerald-700 transition-colors">
              {t.cardHistoryTitle}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t.cardHistoryDesc}
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
            <span>{language === 'kn' ? 'ದಾಖಲೆಗಳನ್ನು ನೋಡಿ' : 'Review History'}</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </section>

      {/* Step by Step Explanation */}
      <section className="bg-emerald-50/60 rounded-3xl p-6 sm:p-10 border border-emerald-100">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-serif">
            {t.howItWorksTitle}
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            {language === 'kn'
              ? 'ಕಡಿಮೆ ಡಿಜಿಟಲ್ ಜ್ಞಾನವಿರುವ ಗ್ರಾಮೀಣ ರೈತರಿಗೂ ಸುಲಭವಾಗಿ ಅರ್ಥವಾಗುವಂತೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.'
              : 'Designed with high accessibility and clear visual cues for seamless field adoption.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-emerald-200/70 shadow-sm space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center">1</span>
            <h3 className="text-base font-bold text-stone-900">{t.step1Title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed">{t.step1Desc}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-emerald-200/70 shadow-sm space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center">2</span>
            <h3 className="text-base font-bold text-stone-900">{t.step2Title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed">{t.step2Desc}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-emerald-200/70 shadow-sm space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center">3</span>
            <h3 className="text-base font-bold text-stone-900">{t.step3Title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed">{t.step3Desc}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-emerald-200/70 shadow-sm space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center">4</span>
            <h3 className="text-base font-bold text-stone-900">{t.step4Title}</h3>
            <p className="text-xs text-stone-600 leading-relaxed">{t.step4Desc}</p>
          </div>
        </div>
      </section>

      {/* Illustrative Sample Demonstrations Section */}
      <section id="demo-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
              <FlaskConical className="w-3.5 h-3.5 text-amber-700" />
              <span>{language === 'kn' ? 'ಶೈಕ್ಷಣಿಕ ಡೆಮೊ ವಿಭಾಗ' : 'Educational Demo Suite'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              {t.sampleDemoTitle}
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              {t.sampleDemoSubtitle}
            </p>
          </div>
          <div className="text-xs text-stone-500 bg-stone-100 p-2.5 rounded-lg border border-stone-200 max-w-xs">
            <span className="font-semibold text-stone-700">Notice:</span> Sample data is strictly illustrative and never mixed with real farmer records.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_DEMOS.map((demo) => (
            <div 
              key={demo.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* SVG Leaf representation */}
                <div className="w-full h-44 bg-stone-900 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={demo.sampleSvg}
                    alt={language === 'kn' ? demo.titleKn : demo.titleEn}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] font-bold text-amber-300 border border-white/20">
                    Sample Specimen
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-emerald-800 font-bold uppercase tracking-wider">
                    <span>{demo.crop}</span>
                    <span className="text-[11px] font-normal text-stone-500">Karnataka Package</span>
                  </div>
                  <h4 className="font-bold text-base text-stone-900 line-clamp-2">
                    {language === 'kn' ? demo.titleKn : demo.titleEn}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {language === 'kn' ? demo.descriptionKn : demo.descriptionEn}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectSampleDemo(demo)}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200/80 transition-colors flex items-center justify-center gap-1.5"
                >
                  <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.btnTestSample}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal Alerts Snapshot */}
      <section className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <BellRing className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-bold font-serif">
                {language === 'kn' ? 'ಇತ್ತೀಚಿನ ಕರ್ನಾಟಕ ಬೆಳೆ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು' : 'Latest Karnataka Crop Advisories'}
              </h2>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              {language === 'kn'
                ? 'ವಿಶ್ವವಿದ್ಯಾಲಯಗಳ ಪ್ಯಾಕೇಜ್ ಆಧಾರಿತ ಶೈಕ್ಷಣಿಕ ಮಾಹಿತಿಗಳು'
                : 'Research-grounded pest surveillance advisories from Karnataka Agricultural Universities.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('alerts')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
          >
            <span>{language === 'kn' ? 'ಎಲ್ಲಾ ಎಚ್ಚರಿಕೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ' : 'View All Advisories'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CROP_ALERTS_DATA.map((alert) => (
            <div 
              key={alert.id}
              className="bg-stone-800/80 rounded-2xl p-5 border border-stone-700 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    alert.severity === 'high' ? 'bg-rose-900/60 text-rose-300 border border-rose-700' : 'bg-amber-900/60 text-amber-300 border border-amber-700'
                  }`}>
                    {alert.severity} priority
                  </span>
                  <span className="text-[11px] text-stone-400 capitalize">{alert.crop}</span>
                </div>
                <h4 className="font-bold text-sm text-stone-100">
                  {language === 'kn' ? alert.titleKn : alert.titleEn}
                </h4>
                <div className="flex items-start gap-1.5 text-xs text-stone-400">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{language === 'kn' ? alert.districtZoneKn : alert.districtZoneEn}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-700/60 text-[11px] text-stone-400 flex items-center justify-between">
                <span>{alert.lastUpdatedDate}</span>
                <span className="text-emerald-400 font-medium">Educational</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Government Schemes Snapshot */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              {language === 'kn' ? 'ಪ್ರಮುಖ ಸರಕಾರಿ ಕೃಷಿ ಸವಲತ್ತುಗಳು' : 'Highlighted Government Farmer Schemes'}
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              {language === 'kn'
                ? 'ಕರ್ನಾಟಕ ಮತ್ತು ಕೇಂದ್ರ ಸರಕಾರದ ಅಧಿಕೃತ ಪರಿಹಾರ ಮತ್ತು ಸಬ್ಸಿಡಿ ಯೋಜನೆಗಳು'
                : 'Verified programmes for crop loss compensation, input assistance, and farm pond subsidies.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('schemes')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-700"
          >
            <span>{language === 'kn' ? 'ಅರ್ಹತಾ ಪರೀಕ್ಷೆ ನಡೆಸಿ' : 'Check Your Eligibility'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SCHEMES_DATA.slice(0, 3).map((scheme) => (
            <div 
              key={scheme.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                    {scheme.level}
                  </span>
                  <span className="text-stone-500 font-medium">{scheme.category}</span>
                </div>
                <h4 className="font-bold text-base text-stone-900">
                  {language === 'kn' ? scheme.officialNameKn : scheme.officialNameEn}
                </h4>
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {language === 'kn' ? scheme.purposeKn : scheme.purposeEn}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-semibold">{scheme.portalName}</span>
                <button
                  onClick={() => onNavigate('schemes')}
                  className="font-bold text-emerald-800 hover:underline"
                >
                  {language === 'kn' ? 'ವಿವರ ನೋಡಿ' : 'Details'} &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
