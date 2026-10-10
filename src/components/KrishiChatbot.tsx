import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User as UserIcon, 
  MapPin, 
  Sparkles, 
  Trash2, 
  X, 
  Maximize2, 
  Minimize2, 
  ExternalLink,
  MessageSquare,
  Compass,
  Cpu,
  RefreshCw,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  groundingMetadata?: any;
  modelUsed?: string;
}

interface KrishiChatbotProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const KrishiChatbot: React.FC<KrishiChatbotProps> = ({ language, isOpen, onClose }) => {
  const t = translations[language];

  // Conversation history state
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome-msg',
        role: 'model',
        content: language === 'kn'
          ? 'ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ! ನಾನು ನಿಮ್ಮ "ಕೃಷಿ ಮಿತ್ರ AI" ಸಹಾಯಕ. ಬೆಳೆ ರಕ್ಷಣೆ, ರೋಗ ನಿಯಂತ್ರಣ, ಸಮಗ್ರ ಕೀಟ ನಿರ್ವಹಣೆ (IPM), ಸರಕಾರಿ ಯೋಜನೆಗಳು ಅಥವಾ ನಿಮ್ಮ ಹತ್ತಿರದ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರಗಳನ್ನು (RSK) ಹುಡುಕಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ನೀವು ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಪ್ರಶ್ನೆ ಕೇಳಬಹುದು.'
          : 'Namaskara! I am your "Krishi Mitra AI" farming companion. Ask me anything about crop diseases, organic IPM solutions, Karnataka government schemes (PM-KISAN, Parihara, Samrakshane), or finding nearby Raitha Samparka Kendras (RSK) using Google Maps data.',
        timestamp: new Date().toISOString(),
      },
    ];
  });

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modelPreference, setModelPreference] = useState<string>('gemini-3.8-flash');
  const [enableMaps, setEnableMaps] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputPrompt('');
    setIsLoading(true);

    try {
      // Auto-detect if user is asking for location/maps to enable maps grounding
      const isLocationQuery = /near|where|rsk|kendra|mandi|market|kvk|location|district|taluk|ಹತ್ತಿರ|ಕೇಂದ್ರ|ಮಾರುಕಟ್ಟೆ|ತಾಲೂಕು/i.test(textToSend);
      const shouldEnableMaps = enableMaps || isLocationQuery;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          modelPreference: modelPreference || 'gemini-3.8-flash',
          enableMaps: shouldEnableMaps,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get AI response.');
      }

      const botMessage: ChatMessage = {
        id: 'msg-bot-' + Date.now(),
        role: 'model',
        content: data.reply,
        timestamp: new Date().toISOString(),
        groundingMetadata: data.groundingMetadata,
        modelUsed: data.modelUsed,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: 'msg-err-' + Date.now(),
        role: 'model',
        content: language === 'kn'
          ? 'ಕ್ಷಮಿಸಿ, ಸಂದೇಶ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುವಲ್ಲಿ ದೋಷ ಉಂಟಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.'
          : 'Sorry, I encountered an issue reaching the AI engine. Please try asking again.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset-' + Date.now(),
        role: 'model',
        content: language === 'kn'
          ? 'ಸಂಭಾಷಣೆಯನ್ನು ಮರುಹೊಂದಿಸಲಾಗಿದೆ. ನಿಮ್ಮ ಹೊಸ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ.'
          : 'Conversation cleared. How can I assist your farm today?',
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const quickQuestions = language === 'kn' ? [
    'ನನ್ನ ಹತ್ತಿರದ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ (RSK) ಎಲ್ಲಿದೆ?',
    'ಟೊಮೇಟೊ ಎಲೆ ಮುದುರು ರೋಗಕ್ಕೆ ಬೇವಿನ ಕಷಾಯ ಹೇಗೆ ಸಿಂಪಡಿಸಬೇಕು?',
    'ಮೆಕ್ಕೆಜೋಳದ ಸೈನಿಕ ಹುಳು ನಿಯಂತ್ರಣ ಕ್ರಮಗಳು ಯಾವುವು?',
    'ಪಿಎಂ-ಕಿಸಾನ್ ಇ-ಕೆವೈಸಿ (e-KYC) ಹೇಗೆ ಮಾಡುವುದು?',
    'ಆಲೂಗಡ್ಡೆ ತಡವಾದ ಅಂಗಮಾರಿ ರೋಗದ ಮುನ್ನೆಚ್ಚರಿಕೆ ಏನು?'
  ] : [
    'Find nearest Raitha Samparka Kendra in Dharwad',
    'How to prepare 5% Neem Seed Kernel Extract (NSKE)?',
    'Safe organic management for Maize Fall Armyworm',
    'How do I check Karnataka Parihara drought compensation?',
    'Potato Late Blight prevention rules'
  ];

  if (!isOpen) return null;

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isMinimized 
        ? 'bottom-4 right-4 w-72 h-14' 
        : 'bottom-0 right-0 sm:bottom-4 sm:right-4 w-full sm:w-[480px] h-[92vh] sm:h-[650px] max-h-[95vh]'
    }`}>
      <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-300/80 flex flex-col h-full overflow-hidden">
        {/* Chatbot Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-green-950 text-white p-3.5 sm:p-4 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-400 flex items-center justify-center text-white shadow-inner">
              <Bot className="w-5 h-5 text-emerald-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight font-serif text-white">
                  Krishi Mitra AI
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-800 text-amber-300 font-semibold border border-emerald-600">
                  ಕನ್ನಡ / EN
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">Karnataka Agricultural Assistant</p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800/60"
              title={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleClearHistory}
              className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800/60"
              title="Clear conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800/60"
              title="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Model & Grounding Controls Bar */}
            <div className="bg-stone-50 border-b border-stone-200 px-3.5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600 shrink-0">
              <div className="flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-700" />
                <select
                  value={modelPreference}
                  onChange={(e) => setModelPreference(e.target.value)}
                  className="bg-white border border-stone-300 rounded-lg px-2 py-1 text-[11px] text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                >
                  <option value="gemini-3.8-flash">gemini-3.8-flash (Recommended)</option>
                  <option value="gemini-3.5-flash">gemini-3.5-flash (General + Maps)</option>
                  <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Fast Q&A)</option>
                  <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Complex Agronomy)</option>
                </select>
              </div>

              {/* Maps Grounding Toggle */}
              <button
                onClick={() => setEnableMaps(!enableMaps)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                  enableMaps
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                    : 'bg-white border-stone-300 text-stone-500 hover:text-stone-800'
                }`}
                title="Ground answers with Google Maps data for verified locations"
              >
                <MapPin className={`w-3 h-3 ${enableMaps ? 'text-emerald-700' : 'text-stone-400'}`} />
                <span>Maps Grounding</span>
              </button>
            </div>

            {/* Scrollable Message Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/40">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm ${
                      isUser 
                        ? 'bg-emerald-800 text-white' 
                        : 'bg-gradient-to-tr from-emerald-600 to-green-700 text-white'
                    }`}>
                      {isUser ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-emerald-800 text-white rounded-tr-none'
                        : 'bg-white text-stone-800 border border-stone-200/90 rounded-tl-none space-y-2'
                    }`}>
                      <div className="whitespace-pre-wrap">{msg.content}</div>

                      {/* Render Google Maps Grounding Metadata if present */}
                      {!isUser && msg.groundingMetadata?.groundingChunks && msg.groundingMetadata.groundingChunks.length > 0 && (
                        <div className="pt-2 border-t border-stone-100 space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-red-500" />
                            <span>Google Maps Grounded Locations:</span>
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.groundingMetadata.groundingChunks.map((chunk: any, i: number) => {
                              const title = chunk?.web?.title || chunk?.maps?.title || `Verified Place ${i + 1}`;
                              const uri = chunk?.web?.uri || chunk?.maps?.uri || '#';
                              return (
                                <a
                                  key={i}
                                  href={uri}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 hover:bg-emerald-50 text-[10px] text-emerald-800 font-medium border border-stone-200 hover:border-emerald-300"
                                >
                                  <span>{title}</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className={`text-[10px] text-right pt-0.5 ${isUser ? 'text-emerald-200' : 'text-stone-400'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {msg.modelUsed && <span className="ml-1 opacity-75">({msg.modelUsed})</span>}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-none p-3.5 shadow-sm text-xs text-stone-600 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] text-stone-400 pl-1">
                      {enableMaps ? 'Searching Google Maps & Karnataka advisory...' : 'Consulting agricultural models...'}
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick question pill prompts */}
            <div className="p-2 bg-stone-100/90 border-t border-stone-200 overflow-x-auto whitespace-nowrap shrink-0 flex gap-1.5 scrollbar-none">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 text-[11px] font-medium text-stone-700 hover:text-emerald-900 border border-stone-200 hover:border-emerald-300 transition-colors shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Message Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder={language === 'kn' ? 'ಕೃಷಿ ಪ್ರಶ್ನೆ ಕೇಳಿ (ಕನ್ನಡ ಅಥವಾ English)...' : 'Ask agricultural question or locate RSK/Mandi...'}
                disabled={isLoading}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!inputPrompt.trim() || isLoading}
                className="p-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 disabled:bg-stone-300 text-white transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
