import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Navigation, 
  Building2, 
  Store, 
  FlaskConical, 
  ExternalLink, 
  Sparkles, 
  RefreshCw,
  PhoneCall,
  Clock,
  Info
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { KARNATAKA_DISTRICTS } from '../data/schemes';

interface AgriMapsLocatorProps {
  language: Language;
}

export const AgriMapsLocator: React.FC<AgriMapsLocatorProps> = ({ language }) => {
  const t = translations[language];

  const [selectedDistrict, setSelectedDistrict] = useState<string>('Dharwad');
  const [centerCategory, setCenterCategory] = useState<string>('rsk');
  const [customTaluk, setCustomTaluk] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<{
    reply: string;
    groundingMetadata?: any;
  } | null>(null);

  const categories = [
    { id: 'rsk', labelEn: 'Raitha Samparka Kendra (RSK)', labelKn: 'ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ (RSK)', icon: Building2 },
    { id: 'kvk', labelEn: 'Krishi Vigyan Kendra (KVK)', labelKn: 'ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರ (KVK)', icon: FlaskConical },
    { id: 'mandi', labelEn: 'APMC Market Yard / Mandi', labelKn: 'ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ (APMC)', icon: Store },
    { id: 'soil_lab', labelEn: 'Soil & Water Testing Lab', labelKn: 'ಮಣ್ಣು ಮತ್ತು ನೀರು ಪರೀಕ್ಷಾ ಕೇಂದ್ರ', icon: Navigation },
  ];

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    const activeCat = categories.find((c) => c.id === centerCategory);
    const categoryName = activeCat ? activeCat.labelEn : 'Raitha Samparka Kendra';
    const query = `${categoryName} in ${customTaluk ? customTaluk + ', ' : ''}${selectedDistrict}, Karnataka`;

    try {
      const response = await fetch('/api/find-agri-centers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          district: selectedDistrict,
        }),
      });

      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.error('Maps locator error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-bold">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>Google Maps Grounding & gemini-3.5-flash</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              {language === 'kn'
                ? 'ಕರ್ನಾಟಕ ಕೃಷಿ ಕೇಂದ್ರಗಳ ನಕ್ಷೆ (ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ & APMC)'
                : 'Karnataka Agricultural Center & Mandi Locator'}
            </h1>
            <p className="text-sm text-stone-600 max-w-2xl">
              {language === 'kn'
                ? 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ (Google Maps) ದತ್ತಾಂಶದ ಮೂಲಕ ನಿಮ್ಮ ಜಿಲ್ಲೆ ಅಥವಾ ತಾಲೂಕಿನ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರಗಳು, ಕೆವಿಕೆ ಮತ್ತು ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ಹುಡುಕಿ.'
                : 'Locate official Raitha Samparka Kendras (RSK), KVK university clinics, and APMC Mandis across Karnataka grounded in live Google Maps data.'}
            </p>
          </div>
        </div>

        {/* Filter / Search Form */}
        <form onSubmit={handleSearch} className="space-y-4 pt-2">
          {/* Category selection */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = centerCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCenterCategory(cat.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-emerald-700' : 'text-stone-500'}`} />
                  <p className="text-xs font-semibold leading-tight">
                    {language === 'kn' ? cat.labelKn : cat.labelEn}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                {language === 'kn' ? 'ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ:' : 'Select District:'}
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs text-stone-800 focus:ring-2 focus:ring-emerald-500"
              >
                {KARNATAKA_DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                {language === 'kn' ? 'ತಾಲೂಕು / ಪಟ್ಟಣ (ಐಚ್ಛಿಕ):' : 'Taluk / Town (Optional):'}
              </label>
              <input
                type="text"
                value={customTaluk}
                onChange={(e) => setCustomTaluk(e.target.value)}
                placeholder="e.g. Navalgund / Bailhongal / Hosakote"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs text-stone-800 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 disabled:bg-stone-300 text-white font-bold text-xs shadow-sm transition-colors"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{language === 'kn' ? 'ಹುಡುಕಲಾಗುತ್ತಿದೆ...' : 'Searching Maps...'}</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>{language === 'kn' ? 'ಕೇಂದ್ರಗಳನ್ನು ಹುಡುಕಿ' : 'Search Centers on Maps'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Results View */}
      {searchResults && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-600" />
              <span>{language === 'kn' ? 'ದೃಢೀಕೃತ ಕೇಂದ್ರಗಳ ವಿವರಗಳು' : 'Grounded Agricultural Center Results'}</span>
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              {selectedDistrict} District
            </span>
          </div>

          {/* Formatted Reply */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-wrap">
            {searchResults.reply}
          </div>

          {/* Google Maps Grounded Places Chips */}
          {searchResults.groundingMetadata?.groundingChunks && searchResults.groundingMetadata.groundingChunks.length > 0 && (
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-emerald-700" />
                <span>Verified Google Maps Navigation Links:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {searchResults.groundingMetadata.groundingChunks.map((chunk: any, idx: number) => {
                  const title = chunk?.web?.title || chunk?.maps?.title || `Google Maps Place ${idx + 1}`;
                  const uri = chunk?.web?.uri || chunk?.maps?.uri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title + ' ' + selectedDistrict)}`;
                  return (
                    <a
                      key={idx}
                      href={uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-emerald-50/60 hover:bg-emerald-100/70 border border-emerald-200/80 text-emerald-950 font-medium flex items-center justify-between transition-colors"
                    >
                      <span className="truncate max-w-[300px]">{title}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-700 shrink-0 ml-2" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
