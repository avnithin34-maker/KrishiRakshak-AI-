import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Stethoscope, 
  Landmark, 
  BellRing, 
  History, 
  Sprout, 
  Menu, 
  X, 
  Languages, 
  Info,
  Home,
  MessageSquare,
  MapPin,
  LogIn,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { useAuth } from '../context/AuthContext';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenPrivacy: () => void;
  onOpenChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onOpenPrivacy,
  onOpenChat,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, signInWithGoogle, signOutUser } = useAuth();
  const t = translations[language];

  const navItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'doctor', label: t.navDoctor, icon: Stethoscope },
    { id: 'schemes', label: t.navSchemes, icon: Landmark },
    { id: 'maps', label: t.navMaps, icon: MapPin },
    { id: 'alerts', label: t.navAlerts, icon: BellRing },
    { id: 'history', label: t.navHistory, icon: History },
    { id: 'tips', label: t.navTips, icon: Sprout },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'kn' : 'en';
    setLanguage(nextLang);
  };

  return (
    <header className="sticky top-0 z-40 bg-emerald-900 text-white shadow-md border-b border-emerald-800">
      {/* Top Advisory Banner */}
      <div className="bg-emerald-950 px-4 py-1.5 text-xs font-medium text-emerald-200 border-b border-emerald-800/60 flex items-center justify-between">
        <div className="flex items-center space-x-2 truncate">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="truncate">{t.disclaimerBanner}</span>
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <span className="text-[11px] text-emerald-300 hidden md:inline-flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
              {t.cloudSynced}
            </span>
          )}
          <button
            onClick={onOpenPrivacy}
            className="text-emerald-300 hover:text-white underline text-xs shrink-0 flex items-center gap-1"
          >
            <Info className="w-3 h-3" />
            <span>Notice</span>
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Branding */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg border border-emerald-400/30 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-white font-serif">
                  {t.appTitle}
                </span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-700/80 text-emerald-100 border border-emerald-600 hidden sm:inline-block">
                  Karnataka
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-emerald-200 line-clamp-1 max-w-[200px] sm:max-w-md">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-inner border border-emerald-600 font-semibold'
                      : 'text-emerald-100 hover:bg-emerald-800/60 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-emerald-300'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Chatbot button, Auth, Language Switcher & Mobile Hamburger */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* PWA Install Button */}
            <PWAInstallButton language={language} />

            {/* Krishi Mitra Chatbot Button */}
            <button
              onClick={onOpenChat}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 text-xs sm:text-sm font-extrabold shadow-md transition-all transform hover:scale-105"
              title="Chat with Krishi Mitra AI (Gemini + Maps)"
            >
              <MessageSquare className="w-4 h-4 fill-emerald-950 text-emerald-950" />
              <span className="hidden sm:inline">ಕೃಷಿ ಮಿತ್ರ</span>
              <span className="text-[10px] font-bold uppercase bg-emerald-950 text-amber-300 px-1.5 py-0.2 rounded ml-0.5">AI</span>
            </button>

            {/* Language Switch Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold border border-emerald-600 transition-colors shadow-sm focus:outline-none"
              title="Toggle Kannada / English"
            >
              <Languages className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'en' ? 'ಕನ್ನಡ' : 'EN'}</span>
            </button>

            {/* Auth Button / Profile Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-1.5 p-1 rounded-xl bg-emerald-800 border border-emerald-600 hover:bg-emerald-700 transition-colors"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-7 h-7 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                      {user.displayName?.[0] || 'F'}
                    </div>
                  )}
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white text-stone-900 shadow-2xl border border-stone-200 py-2 z-50 text-xs animate-in zoom-in-95 duration-100">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="font-bold text-stone-900 truncate">{user.displayName || 'Farmer'}</p>
                      <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {t.cloudSynced}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        signOutUser();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-rose-700 hover:bg-rose-50 flex items-center gap-2 font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t.signOutBtn}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-emerald-950 text-xs font-bold shadow-sm transition-colors"
                title="Sign in with Google to sync crop records"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-800" />
                <span className="hidden sm:inline">{t.signInBtn}</span>
                <span className="sm:hidden">Login</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-emerald-800 text-emerald-100 hover:text-white hover:bg-emerald-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-emerald-950 border-t border-emerald-800 px-4 pt-3 pb-5 space-y-1 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="pb-2 mb-2 border-b border-emerald-800 text-xs font-semibold text-emerald-300 uppercase tracking-wider flex items-center justify-between">
            <span>Navigation Menu</span>
            {user ? (
              <span className="text-[10px] text-emerald-400 font-normal">Signed in as {user.displayName}</span>
            ) : (
              <button onClick={signInWithGoogle} className="text-amber-300 underline font-bold">
                {t.signInBtn}
              </button>
            )}
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-800 text-white font-bold border-l-4 border-amber-400'
                    : 'text-emerald-100 hover:bg-emerald-800/60 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-emerald-300'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
