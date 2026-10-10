import React, { useState, useEffect } from 'react';
import { Language, DiagnosisResult, SampleDemoCase } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeDashboard } from './components/HomeDashboard';
import { CropDoctor } from './components/CropDoctor';
import { SchemeNavigator } from './components/SchemeNavigator';
import { CropAlerts } from './components/CropAlerts';
import { CropHistory } from './components/CropHistory';
import { ProtectionTips } from './components/ProtectionTips';
import { AgriMapsLocator } from './components/AgriMapsLocator';
import { KrishiChatbot } from './components/KrishiChatbot';
import { PrivacyModal } from './components/PrivacyModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { MessageSquare } from 'lucide-react';
import { 
  saveCropHistoryToFirestore, 
  fetchCropHistoryFromFirestore, 
  deleteCropHistoryFromFirestore, 
  updateFarmerNotesInFirestore 
} from './services/firestoreService';

const HISTORY_STORAGE_KEY = 'krishirakshak_crop_history_v1';
const LANG_STORAGE_KEY = 'krishirakshak_lang_preference';

function AppContent() {
  const { user } = useAuth();

  // Language state with local persistence (default Kannada if previously chosen, or English)
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
      if (savedLang === 'kn' || savedLang === 'en') {
        return savedLang;
      }
    } catch (e) {
      // Fallback
    }
    return 'kn'; // Default to Kannada for Karnataka farmers, one click to toggle to English
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {
      console.warn('Could not save language preference:', e);
    }
  };

  // Active navigation tab ('home', 'doctor', 'schemes', 'maps', 'alerts', 'history', 'tips')
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Chatbot drawer toggle
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Preloaded demo sample state
  const [preloadedDemo, setPreloadedDemo] = useState<SampleDemoCase | null>(null);

  // Privacy modal toggle
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);

  // Saved diagnosis history state
  const [historyList, setHistoryList] = useState<DiagnosisResult[]>(() => {
    try {
      const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Could not load history from storage:', e);
    }
    return [];
  });

  // Sync with Firestore when user logs in
  useEffect(() => {
    if (user) {
      fetchCropHistoryFromFirestore(user.uid)
        .then((remoteRecords) => {
          if (remoteRecords.length > 0) {
            // Merge remote records with any local records
            setHistoryList((localRecords) => {
              const combined = [...remoteRecords];
              localRecords.forEach((local) => {
                if (!combined.some((r) => r.id === local.id)) {
                  combined.push(local);
                  // Upload local record to Firestore
                  saveCropHistoryToFirestore(user.uid, local).catch(console.warn);
                }
              });
              return combined;
            });
          } else if (historyList.length > 0) {
            // First time sign-in: push existing local records to Firestore
            historyList.forEach((record) => {
              saveCropHistoryToFirestore(user.uid, record).catch(console.warn);
            });
          }
        })
        .catch((err) => {
          console.warn('Error fetching Firestore history:', err);
        });
    }
  }, [user]);

  // Sync history to local storage as offline cache
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(historyList));
    } catch (e) {
      console.warn('Could not persist crop history to localStorage:', e);
    }
  }, [historyList]);

  // Handlers for history
  const handleSaveToHistory = async (result: DiagnosisResult) => {
    setHistoryList((prev) => [result, ...prev]);

    // If authenticated, persist to Firestore
    if (user) {
      try {
        await saveCropHistoryToFirestore(user.uid, result);
      } catch (err) {
        console.warn('Could not save to Firestore:', err);
      }
    }
  };

  const handleDeleteRecord = async (id: string) => {
    setHistoryList((prev) => prev.filter((item) => item.id !== id));

    // If authenticated, delete from Firestore
    if (user) {
      try {
        await deleteCropHistoryFromFirestore(user.uid, id);
      } catch (err) {
        console.warn('Could not delete from Firestore:', err);
      }
    }
  };

  const handleClearAllHistory = async () => {
    setHistoryList([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch (e) {}

    // Delete all from Firestore if user is authenticated
    if (user) {
      try {
        for (const item of historyList) {
          await deleteCropHistoryFromFirestore(user.uid, item.id);
        }
      } catch (err) {
        console.warn('Could not clear Firestore records:', err);
      }
    }
  };

  const handleUpdateNotes = async (id: string, notes: string) => {
    setHistoryList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, farmerNotes: notes } : item))
    );

    // If authenticated, update in Firestore
    if (user) {
      try {
        await updateFarmerNotesInFirestore(user.uid, id, notes);
      } catch (err) {
        console.warn('Could not update notes in Firestore:', err);
      }
    }
  };

  // Handler when a user selects a sample demo case from the home dashboard
  const handleSelectSampleDemo = (demo: SampleDemoCase) => {
    setPreloadedDemo(demo);
    setCurrentTab('doctor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearPreloadedDemo = () => {
    setPreloadedDemo(null);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-stone-50 text-stone-900 ${language === 'kn' ? 'font-kannada' : ''}`}>
      {/* Global Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        onOpenPrivacy={() => setShowPrivacyModal(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {currentTab === 'home' && (
          <HomeDashboard
            language={language}
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectSampleDemo={handleSelectSampleDemo}
          />
        )}

        {currentTab === 'doctor' && (
          <CropDoctor
            language={language}
            preloadedDemo={preloadedDemo}
            onSaveToHistory={handleSaveToHistory}
            onClearPreloadedDemo={handleClearPreloadedDemo}
            onNavigateToSchemes={() => {
              setCurrentTab('schemes');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'schemes' && (
          <SchemeNavigator language={language} />
        )}

        {currentTab === 'maps' && (
          <AgriMapsLocator language={language} />
        )}

        {currentTab === 'alerts' && (
          <CropAlerts language={language} />
        )}

        {currentTab === 'history' && (
          <CropHistory
            language={language}
            historyList={historyList}
            onDeleteRecord={handleDeleteRecord}
            onClearAll={handleClearAllHistory}
            onUpdateNotes={handleUpdateNotes}
            onNavigateToDoctor={() => {
              setCurrentTab('doctor');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'tips' && (
          <ProtectionTips language={language} />
        )}
      </main>

      {/* Floating Krishi Mitra AI Chat Trigger */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-800 to-green-900 hover:from-emerald-700 hover:to-green-800 text-white font-bold text-xs sm:text-sm shadow-2xl border-2 border-amber-400 transition-all transform hover:scale-105 group"
          title="Open Krishi Mitra AI Chatbot"
        >
          <div className="w-6 h-6 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-black text-xs">
            AI
          </div>
          <span className="font-serif">
            {language === 'kn' ? 'ಕೃಷಿ ಮಿತ್ರ AI ಚಾಟ್' : 'Chat with Krishi Mitra'}
          </span>
          <MessageSquare className="w-4 h-4 text-amber-300" />
        </button>
      )}

      {/* Gemini Chatbot Drawer */}
      <KrishiChatbot
        language={language}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Global Footer */}
      <Footer
        language={language}
        onOpenPrivacy={() => setShowPrivacyModal(true)}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Privacy Notice Modal */}
      {showPrivacyModal && (
        <PrivacyModal
          language={language}
          onClose={() => setShowPrivacyModal(false)}
        />
      )}

      {/* Offline Connectivity Status Indicator */}
      <OfflineIndicator language={language} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
