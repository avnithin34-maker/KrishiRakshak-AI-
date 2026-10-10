import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  Trash2, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  BookmarkPlus, 
  Check, 
  ShieldAlert, 
  Leaf, 
  RefreshCw,
  Eye,
  Microscope,
  Stethoscope,
  FlaskConical,
  ExternalLink
} from 'lucide-react';
import { Language, CropType, DiagnosisResult, SampleDemoCase } from '../types';
import { translations } from '../i18n/translations';
import { SUPPORTED_CROPS, OTHER_CROPS_LIST } from '../data/cropAdvisories';

interface CropDoctorProps {
  language: Language;
  preloadedDemo?: SampleDemoCase | null;
  onSaveToHistory: (result: DiagnosisResult) => void;
  onClearPreloadedDemo?: () => void;
  onNavigateToSchemes?: () => void;
}

export const CropDoctor: React.FC<CropDoctorProps> = ({
  language,
  preloadedDemo,
  onSaveToHistory,
  onClearPreloadedDemo,
  onNavigateToSchemes,
}) => {
  const t = translations[language];

  // Form State
  const [selectedCrop, setSelectedCrop] = useState<CropType>(preloadedDemo?.crop || 'tomato');
  const [imagePreview, setImagePreview] = useState<string | null>(preloadedDemo?.sampleSvg || null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [fileName, setFileName] = useState<string>(preloadedDemo ? 'sample_specimen.svg' : '');
  const [fileSizeBytes, setFileSizeBytes] = useState<number>(0);
  const [savePhotoConsent, setSavePhotoConsent] = useState<boolean>(true);

  // Execution & Results state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(
    preloadedDemo ? { ...preloadedDemo.mockResult, id: 'demo-' + Date.now(), timestamp: new Date().toISOString() } : null
  );
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [farmerNotes, setFarmerNotes] = useState<string>('');
  const [showUnsupportedModal, setShowUnsupportedModal] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Handle Crop Change
  const handleCropChange = (crop: string) => {
    if (crop === 'other') {
      setShowUnsupportedModal(true);
      return;
    }
    setSelectedCrop(crop as CropType);
    setDiagnosisResult(null);
    setIsSaved(false);
  };

  // Image upload handling with validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setIsSaved(false);
    setDiagnosisResult(null);

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage(t.errInvalidFormat);
      return;
    }

    // Validate size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage(t.errFileTooLarge);
      return;
    }

    setFileName(file.name);
    setFileSizeBytes(file.size);
    setImageMimeType(file.type);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read image file. Please try another photograph.');
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setImagePreview(null);
    setFileName('');
    setFileSizeBytes(0);
    setDiagnosisResult(null);
    setErrorMessage(null);
    setIsSaved(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    if (onClearPreloadedDemo) onClearPreloadedDemo();
  };

  // Perform AI Diagnosis Analysis
  const handleAnalyze = async (forceDemo: boolean = false) => {
    if (!imagePreview) {
      setErrorMessage(t.errNoImage);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setIsSaved(false);

    try {
      const response = await fetch('/api/analyze-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: selectedCrop,
          imageBase64: imagePreview,
          mimeType: imageMimeType,
          language,
          isDemoMode: forceDemo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete diagnosis screening.');
      }

      const newResult: DiagnosisResult = {
        id: 'diag-' + Date.now(),
        timestamp: new Date().toISOString(),
        crop: selectedCrop,
        imageQualityAssessment: data.imageQualityAssessment || 'Standard quality review completed.',
        isConclusive: data.isConclusive ?? true,
        possibleCondition: data.possibleCondition || 'No specific disease identified',
        conditionKannada: data.conditionKannada || data.possibleCondition,
        confidenceLevel: data.confidenceLevel,
        alternativePossibilities: data.alternativePossibilities || [],
        observedSymptoms: data.observedSymptoms || [],
        possibleCauses: data.possibleCauses || [],
        preventionAdvice: data.preventionAdvice || [],
        safeManagementSteps: data.safeManagementSteps || [],
        organicOptions: data.organicOptions || [],
        expertInspectionNeeded: data.expertInspectionNeeded ?? true,
        expertGuidance: data.expertGuidance || 'Consult your local Raitha Samparka Kendra.',
        limitations: data.limitations || 'Visual screening is not a laboratory diagnostic confirmation.',
        isDemoFallback: data.isDemoFallback || false,
        source: data.source || 'ai_service',
        imageDataUrl: savePhotoConsent ? imagePreview : undefined,
        farmerNotes: '',
      };

      setDiagnosisResult(newResult);
    } catch (err: any) {
      console.error('Diagnosis error:', err);
      setErrorMessage(err.message || 'Diagnosis service encountered an issue. You can try Offline Demo Mode.');
    } finally {
      setIsLoading(false);
    }
  };

  // Save to history
  const handleSaveResult = () => {
    if (!diagnosisResult) return;
    const finalResult: DiagnosisResult = {
      ...diagnosisResult,
      imageDataUrl: savePhotoConsent ? imagePreview || undefined : undefined,
      farmerNotes,
    };
    onSaveToHistory(finalResult);
    setIsSaved(true);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header & Subtitle */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{language === 'kn' ? 'AI ಬೆಳೆ ವೈದ್ಯ' : 'AI Crop Doctor'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              {t.doctorTitle}
            </h1>
            <p className="text-sm text-stone-600 max-w-2xl">
              {t.doctorSubtitle}
            </p>
          </div>

          {/* Calibrated crops indicator */}
          <div className="text-xs bg-stone-50 border border-stone-200 rounded-xl p-3 shrink-0">
            <div className="font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'kn' ? 'ಪರೀಕ್ಷಿತ ಬೆಳೆಗಳು:' : 'Calibrated Crops:'}</span>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">Tomato</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">Potato</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">Maize</span>
            </div>
          </div>
        </div>

        {/* Crop Selector Tabs */}
        <div className="pt-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
            {t.selectCropLabel}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {SUPPORTED_CROPS.map((crop) => (
              <button
                key={crop.id}
                type="button"
                onClick={() => handleCropChange(crop.id)}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                  selectedCrop === crop.id
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-emerald-300 hover:bg-stone-50'
                }`}
              >
                <span className="text-base">
                  {crop.id === 'tomato' ? '🍅' : crop.id === 'potato' ? '🥔' : '🌽'}
                </span>
                <span className="text-sm font-semibold mt-1">
                  {language === 'kn' ? crop.nameKn : crop.nameEn}
                </span>
                <span className="text-[11px] text-stone-500 font-normal line-clamp-1">
                  {crop.scientificName}
                </span>
              </button>
            ))}

            {/* Other Crops Option */}
            <button
              type="button"
              onClick={() => handleCropChange('other')}
              className="flex flex-col items-start p-3 rounded-xl border border-dashed border-stone-300 bg-stone-50 text-stone-500 hover:bg-stone-100 transition-all text-left"
            >
              <span className="text-base">🌾</span>
              <span className="text-sm font-semibold mt-1 text-stone-700">
                {language === 'kn' ? 'ಇತರ ಬೆಳೆಗಳು...' : 'Other Crops...'}
              </span>
              <span className="text-[10px] text-amber-700 font-medium">
                {language === 'kn' ? 'ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ' : 'Coming Soon'}
              </span>
            </button>
          </div>
        </div>

        {/* Crop Validation Pipeline Notice */}
        <div className="mt-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-stone-800 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-amber-950 font-serif">
                  {language === 'kn' ? 'ಬೆಳೆ ಮಾಪನಾಂಕ ನಿರ್ಣಯದ ಮಾಹಿತಿ' : 'Crop Validation Pipeline Notice'}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-200/80 text-amber-900">
                  {language === 'kn' ? 'ಅಧಿಕೃತ ಸೂಚನೆ' : 'Official Notice'}
                </span>
              </div>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                {t.cropOtherNotice}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-amber-200/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-amber-700" />
                {language === 'kn' ? 'ಪೈಪ್‌ಲೈನ್‌ನಲ್ಲಿರುವ ಇತರ ಕರ್ನಾಟಕ ಬೆಳೆಗಳು:' : 'Upcoming Karnataka Crops in Testing:'}
              </span>
              <span className="text-[11px] text-amber-800 font-medium">
                {language === 'kn' ? '೭ ಪ್ರಮುಖ ಬೆಳೆಗಳು ಪರೀಕ್ಷೆಯಲ್ಲಿವೆ' : '7 Karnataka staple crops'}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {OTHER_CROPS_LIST.map((crop, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1.5 rounded-lg bg-white/90 border border-amber-200 flex flex-col justify-between shadow-2xs hover:border-amber-400 transition-colors"
                >
                  <span className="text-xs font-semibold text-stone-900 leading-tight">
                    {language === 'kn' ? crop.nameKn : crop.nameEn}
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 mt-1 inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    Pipeline
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upload and Capture Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900 font-serif">
              {t.uploadBoxTitle}
            </h2>
            <p className="text-xs text-stone-500">
              {t.uploadBoxSubtitle}
            </p>
          </div>
          {imagePreview && (
            <button
              onClick={handleClearImage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.btnRemoveImage}</span>
            </button>
          )}
        </div>

        {/* Hidden inputs */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
        <input
          type="file"
          ref={cameraInputRef}
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Image Preview or Dropzone */}
        {!imagePreview ? (
          <div className="border-2 border-dashed border-stone-300 rounded-2xl p-8 sm:p-12 text-center hover:border-emerald-500 transition-colors bg-stone-50/50 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
              <Upload className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <p className="text-base font-semibold text-stone-800">
                {language === 'kn' ? 'ಎಲೆಯ ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಕ್ಯಾಮೆರಾದಿಂದ ತೆಗೆಯಿರಿ' : 'Select a leaf photo or snap directly with camera'}
              </p>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                {language === 'kn'
                  ? 'ರೋಗಗ್ರಸ್ತ ಭಾಗ ಸ್ಪಷ್ಟವಾಗಿ ಕಾಣುವಂತೆ ಹಗಲಿನ ನೈಸರ್ಗಿಕ ಬೆಳಕಿನಲ್ಲಿ ಹತ್ತಿರದಿಂದ ಫೋಟೋ ತೆಗೆಯಿರಿ.'
                  : 'Capture clear close-ups of single leaves displaying target symptoms in natural daylight.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>{language === 'kn' ? 'ಕ್ಯಾಮೆರಾ ಬಳಸಿ' : 'Take Camera Photo'}</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-bold text-sm border border-stone-300 transition-colors shadow-sm"
              >
                <Upload className="w-4 h-4 text-emerald-700" />
                <span>{language === 'kn' ? 'ಗ್ಯಾಲರಿಯಿಂದ ಆರಿಸಿ' : 'Browse Gallery / File'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 max-h-96 flex items-center justify-center">
              <img
                src={imagePreview}
                alt="Selected crop leaf preview"
                className="max-h-96 w-auto object-contain mx-auto"
              />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm text-[11px] text-white">
                <span className="truncate max-w-[200px]">{fileName || 'Leaf photograph'}</span>
                {fileSizeBytes > 0 && <span>{(fileSizeBytes / (1024 * 1024)).toFixed(2)} MB</span>}
              </div>
            </div>

            {/* Storage consent checkbox */}
            <div className="flex items-center space-x-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200">
              <input
                type="checkbox"
                id="consent-check"
                checked={savePhotoConsent}
                onChange={(e) => setSavePhotoConsent(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500"
              />
              <label htmlFor="consent-check" className="cursor-pointer select-none">
                {t.savePhotoConsent} (Saved only inside your local browser memory)
              </label>
            </div>
          </div>
        )}

        {/* Error message banner */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
            <div className="space-y-1">
              <p className="font-semibold">{language === 'kn' ? 'ದೋಷ ಕಂಡುಬಂದಿದೆ' : 'Notice / Error'}</p>
              <p className="text-xs">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            disabled={!imagePreview || isLoading}
            onClick={() => handleAnalyze(false)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-bold text-base shadow-md transition-all flex-1 sm:flex-initial justify-center"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>{t.btnAnalyzing}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>{t.btnAnalyze}</span>
              </>
            )}
          </button>

          <button
            type="button"
            disabled={!imagePreview || isLoading}
            onClick={() => handleAnalyze(true)}
            className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-50 text-stone-700 font-semibold text-xs border border-stone-300 transition-colors"
          >
            <FlaskConical className="w-4 h-4 text-stone-500" />
            <span>{t.btnUseDemoMode}</span>
          </button>
        </div>
      </div>

      {/* Diagnosis Results Section */}
      {diagnosisResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-md space-y-6 animate-in fade-in duration-300">
          {/* Result Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-5">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  diagnosisResult.isConclusive
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  {diagnosisResult.isConclusive ? t.badgeConclusive : t.badgeInconclusive}
                </span>

                {diagnosisResult.isDemoFallback && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-300 flex items-center gap-1">
                    <FlaskConical className="w-3 h-3" />
                    <span>{t.badgeDemo}</span>
                  </span>
                )}

                <span className="text-xs text-stone-500">
                  {new Date(diagnosisResult.timestamp).toLocaleString()}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif pt-1">
                {t.resultHeading}: <span className="text-emerald-900">{diagnosisResult.crop.toUpperCase()}</span>
              </h2>
            </div>

            {/* Save to History Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveResult}
                disabled={isSaved}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  isSaved
                    ? 'bg-green-100 text-green-900 border border-green-300 cursor-default'
                    : 'bg-emerald-800 hover:bg-emerald-700 text-white'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4 text-green-700" />
                    <span>{t.btnSavedSuccess}</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="w-4 h-4" />
                    <span>{t.btnSaveHistory}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Photo Quality Notice */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700 flex items-start space-x-2">
            <Eye className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-stone-900">{t.imageQualityLabel}: </span>
              <span>{diagnosisResult.imageQualityAssessment}</span>
            </div>
          </div>

          {/* Suspected Condition Highlight Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50/70 border border-emerald-200 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {t.possibleConditionLabel}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-950 font-serif">
                {language === 'kn' ? diagnosisResult.conditionKannada : diagnosisResult.possibleCondition}
              </h3>
              {language === 'kn' && diagnosisResult.possibleCondition !== diagnosisResult.conditionKannada && (
                <span className="text-xs text-emerald-800 font-medium">({diagnosisResult.possibleCondition})</span>
              )}
            </div>
            {diagnosisResult.confidenceLevel && (
              <p className="text-xs text-emerald-800/90 font-medium italic">
                {diagnosisResult.confidenceLevel}
              </p>
            )}
          </div>

          {/* Alternative Possibilities */}
          {diagnosisResult.alternativePossibilities && diagnosisResult.alternativePossibilities.length > 0 && (
            <div className="space-y-1.5 text-xs text-stone-600 bg-amber-50/60 p-4 rounded-xl border border-amber-200">
              <span className="font-bold text-amber-900 uppercase tracking-wide">
                {t.alternativePossibilitiesLabel}:
              </span>
              <ul className="list-disc list-inside space-y-0.5 text-stone-700">
                {diagnosisResult.alternativePossibilities.map((alt, idx) => (
                  <li key={idx}>{alt}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Observed Symptoms vs Inferred Causes (Scientific Rigor) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Directly Observed Symptoms */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3">
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <Microscope className="w-4 h-4 text-emerald-700" />
                <span>{t.observedSymptomsLabel}</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-700 leading-relaxed">
                {diagnosisResult.observedSymptoms.map((symptom, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Potential Causes */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3">
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-600" />
                <span>{t.possibleCausesLabel}</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-700 leading-relaxed">
                {diagnosisResult.possibleCauses.map((cause, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Field Management & Organic Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Safe Sanitation & Management */}
            <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 space-y-3">
              <h4 className="text-sm font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-700" />
                <span>{t.safeManagementLabel}</span>
              </h4>
              <ul className="space-y-2 text-xs text-emerald-900/90 leading-relaxed">
                {diagnosisResult.safeManagementSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organic & Bio-Control Options */}
            <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 space-y-3">
              <h4 className="text-sm font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-green-700" />
                <span>{t.organicOptionsLabel}</span>
              </h4>
              <ul className="space-y-2 text-xs text-emerald-900/90 leading-relaxed">
                {diagnosisResult.organicOptions.map((opt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Preventative Cultural Practices */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3">
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              {t.preventionAdviceLabel}
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-700 leading-relaxed">
              {diagnosisResult.preventionAdvice.map((advice, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-500 mt-1.5 shrink-0" />
                  <span>{advice}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expert Inspection Box & RSK Guidance */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs text-amber-900">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
              <Stethoscope className="w-4 h-4 text-amber-700" />
              <span>{t.expertGuidanceLabel}</span>
            </div>
            <p className="leading-relaxed">{diagnosisResult.expertGuidance}</p>
            {onNavigateToSchemes && (
              <div className="pt-2">
                <button
                  onClick={onNavigateToSchemes}
                  className="inline-flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-900 underline"
                >
                  <span>
                    {language === 'kn' ? 'ಬೆಳೆ ಹಾನಿಗೆ ಸರಕಾರಿ ಪರಿಹಾರ ಅಥವಾ ವಿಮೆ ಪರಿಶೀಲಿಸಿ' : 'Check if this damage qualifies for Parihara / PMFBY claim'}
                  </span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </button>
              </div>
            )}
          </div>

          {/* Limitations Disclaimer Box */}
          <div className="p-3.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-600 text-[11px] space-y-1">
            <span className="font-bold text-stone-800 uppercase tracking-wide">
              {t.limitationsLabel}:
            </span>
            <p>{diagnosisResult.limitations}</p>
          </div>

          {/* Optional Farmer Notes input */}
          <div className="pt-2 space-y-2">
            <label className="block text-xs font-bold uppercase text-stone-700">
              {language === 'kn' ? 'ರೈತರ ಸ್ಥಳೀಯ ಟಿಪ್ಪಣಿ (ಐಚ್ಛಿಕ)' : 'Farmer Field Notes (Optional)'}
            </label>
            <input
              type="text"
              value={farmerNotes}
              onChange={(e) => setFarmerNotes(e.target.value)}
              placeholder={t.notesPlaceholder}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      )}

      {/* Unsupported Crop Modal */}
      {showUnsupportedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-stone-900 font-serif">
                {language === 'kn' ? 'ಬೆಳೆ ಮಾಪನಾಂಕ ನಿರ್ಣಯದ ಮಾಹಿತಿ' : 'Crop Validation Pipeline Notice'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t.cropOtherNotice}
              </p>
            </div>

            <div className="space-y-2 py-2">
              <span className="text-xs font-bold text-stone-700 uppercase">
                {language === 'kn' ? 'ಪೈಪ್‌ಲೈನ್‌ನಲ್ಲಿರುವ ಇತರ ಕರ್ನಾಟಕ ಬೆಳೆಗಳು:' : 'Upcoming Karnataka Crops in Testing:'}
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {OTHER_CROPS_LIST.map((c, i) => (
                  <div key={i} className="p-2 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between">
                    <span className="font-semibold text-stone-800">{language === 'kn' ? c.nameKn : c.nameEn}</span>
                    <span className="text-[10px] text-amber-700 font-medium">Pipeline</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowUnsupportedModal(false)}
              className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm transition-colors"
            >
              {language === 'kn' ? 'ಅರ್ಥವಾಯಿತು' : 'Understood'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
