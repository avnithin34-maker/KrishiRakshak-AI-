import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  Printer, 
  Leaf, 
  Calendar, 
  AlertCircle, 
  Edit3, 
  Check, 
  Stethoscope,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldAlert,
  Cloud,
  LogIn
} from 'lucide-react';
import { Language, DiagnosisResult } from '../types';
import { translations } from '../i18n/translations';
import { useAuth } from '../context/AuthContext';

interface CropHistoryProps {
  language: Language;
  historyList: DiagnosisResult[];
  onDeleteRecord: (id: string) => void;
  onClearAll: () => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onNavigateToDoctor: () => void;
}

export const CropHistory: React.FC<CropHistoryProps> = ({
  language,
  historyList,
  onDeleteRecord,
  onClearAll,
  onUpdateNotes,
  onNavigateToDoctor,
}) => {
  const t = translations[language];
  const { user, signInWithGoogle } = useAuth();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleStartEdit = (record: DiagnosisResult) => {
    setEditingId(record.id);
    setTempNotes(record.farmerNotes || '');
  };

  const handleSaveNotes = (id: string) => {
    onUpdateNotes(id, tempNotes);
    setEditingId(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-bold">
                <History className="w-3.5 h-3.5" />
                <span>{language === 'kn' ? 'ಬೆಳೆ ದಾಖಲೆಗಳು' : 'Crop Screening Logs'}</span>
              </span>
              {user ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-300">
                  <Cloud className="w-3 h-3 text-emerald-600" />
                  <span>{t.cloudSynced}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-xs font-medium">
                  {t.localMode}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              {t.historyTitle}
            </h1>
            <p className="text-sm text-stone-600 max-w-2xl">
              {t.historySubtitle}
            </p>
          </div>

          {/* Action buttons */}
          {historyList.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs border border-stone-300 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>{t.btnPrintHistory}</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm(t.confirmClearHistory)) {
                    onClearAll();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs border border-rose-200 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t.btnClearAllHistory}</span>
              </button>
            </div>
          )}
        </div>

        {/* Sync or Storage notice banner */}
        {!user ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <Cloud className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>{t.signInToSyncMsg}</span>
            </div>
            <button
              onClick={signInWithGoogle}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.signInBtn}</span>
            </button>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Signed in as <strong>{user.displayName || user.email}</strong>. Records are securely stored in your Firestore user account.</span>
            </span>
          </div>
        )}
      </div>

      {/* History List or Empty State */}
      {historyList.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 sm:p-16 border border-stone-200 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
            <History className="w-8 h-8 text-emerald-700" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 font-serif">
            {t.emptyHistoryTitle}
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
            {t.emptyHistoryDesc}
          </p>
          <button
            onClick={onNavigateToDoctor}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
          >
            <Stethoscope className="w-4 h-4" />
            <span>{language === 'kn' ? 'ಬೆಳೆ ವೈದ್ಯರಿಗೆ ಭೇಟಿ ನೀಡಿ' : 'Go to Crop Doctor'}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {historyList.map((record) => {
            const isExpanded = expandedId === record.id;
            const isEditing = editingId === record.id;

            return (
              <div
                key={record.id}
                className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden transition-all"
              >
                {/* Collapsed Header Bar */}
                <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    {/* Thumbnail if user chose to save photo */}
                    {record.imageDataUrl ? (
                      <div className="w-16 h-16 rounded-xl bg-stone-900 overflow-hidden shrink-0 border border-stone-200">
                        <img
                          src={record.imageDataUrl}
                          alt={record.crop}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        <Leaf className="w-6 h-6" />
                      </div>
                    )}

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {record.crop}
                        </span>
                        <span className="text-xs text-stone-400">
                          {new Date(record.timestamp).toLocaleDateString()} at{' '}
                          {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-stone-900">
                        {language === 'kn' ? record.conditionKannada : record.possibleCondition}
                      </h3>

                      {record.farmerNotes && (
                        <p className="text-xs text-stone-600 italic line-clamp-1">
                          Note: {record.farmerNotes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleStartEdit(record)}
                      className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                      title="Edit field notes"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onDeleteRecord(record.id)}
                      className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleExpand(record.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
                    >
                      <span>{isExpanded ? (language === 'kn' ? 'ಮರೆಮಾಡಿ' : 'Hide') : (language === 'kn' ? 'ವಿವರ' : 'Details')}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Inline Editing Notes */}
                {isEditing && (
                  <div className="px-6 pb-4 pt-2 border-t border-stone-100 bg-stone-50/70 space-y-2">
                    <label className="block text-xs font-bold uppercase text-stone-700">
                      {language === 'kn' ? 'ರೈತರ ಟಿಪ್ಪಣಿ ಸಂಪಾದಿಸಿ:' : 'Edit Farmer Notes:'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                        placeholder="e.g. Sprayed NSKE on 12th; Plot 4..."
                        className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800 focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        onClick={() => handleSaveNotes(record.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs"
                      >
                        {t.btnSaveNotes}
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-2 rounded-xl bg-stone-200 text-stone-700 text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Expanded Detailed Accordion */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-4 border-t border-stone-100 space-y-4 text-xs bg-stone-50/40">
                    {/* Symptoms & Causes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-1.5">
                        <span className="font-bold text-stone-900 block uppercase tracking-wide">
                          {t.observedSymptomsLabel}
                        </span>
                        <ul className="space-y-1 text-stone-700 list-disc list-inside">
                          {record.observedSymptoms.map((symp, idx) => (
                            <li key={idx}>{symp}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-1.5">
                        <span className="font-bold text-stone-900 block uppercase tracking-wide">
                          {t.safeManagementLabel}
                        </span>
                        <ul className="space-y-1 text-stone-700 list-disc list-inside">
                          {record.safeManagementSteps.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Expert Advice & Limitations */}
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                      <span className="font-bold block">{t.expertGuidanceLabel}:</span>
                      <p>{record.expertGuidance}</p>
                    </div>

                    <div className="text-[11px] text-stone-500 italic">
                      Disclaimer: {record.limitations}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
