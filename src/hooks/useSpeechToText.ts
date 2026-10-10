import { useState, useEffect, useRef, useCallback } from 'react';

// TypeScript declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: ((this: SpeechRecognitionInstance, ev: Event) => any) | null;
  onend: ((this: SpeechRecognitionInstance, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionErrorEvent) => any) | null;
  onresult: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => any) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export type SpeechLanguage = 'kn-IN' | 'en-IN' | 'en-US';

export interface UseSpeechToTextOptions {
  language?: SpeechLanguage;
  onTranscriptChange?: (text: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
}

export function useSpeechToText(options?: UseSpeechToTextOptions) {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [speechLanguage, setSpeechLanguage] = useState<SpeechLanguage>(options?.language || 'kn-IN');
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const isManuallyStoppedRef = useRef<boolean>(false);

  // Check Web Speech API availability
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      setIsSupported(Boolean(SpeechRecognition));
    }
  }, []);

  // Update speech language if passed from props
  useEffect(() => {
    if (options?.language) {
      setSpeechLanguage(options.language);
    }
  }, [options?.language]);

  const stopListening = useCallback(() => {
    isManuallyStoppedRef.current = true;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore stop error if already stopped
      }
    }
    setIsListening(false);
  }, []);

  const startListening = useCallback(
    (langOverride?: SpeechLanguage) => {
      setErrorMessage(null);
      isManuallyStoppedRef.current = false;

      if (typeof window === 'undefined') return;

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setErrorMessage('not-supported');
        options?.onError?.('not-supported');
        return;
      }

      // Stop previous instance if running
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }

      const activeLang = langOverride || speechLanguage;
      if (langOverride) {
        setSpeechLanguage(langOverride);
      }

      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = activeLang;

        recognition.onstart = () => {
          setIsListening(true);
          setInterimTranscript('');
          setErrorMessage(null);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let currentFinal = '';
          let currentInterim = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const res = event.results[i];
            const text = res[0].transcript;
            if (res.isFinal) {
              currentFinal += text + ' ';
            } else {
              currentInterim += text;
            }
          }

          if (currentFinal) {
            setTranscript((prev) => {
              const updated = (prev ? prev.trim() + ' ' : '') + currentFinal.trim();
              options?.onTranscriptChange?.(updated, true);
              return updated;
            });
          }

          setInterimTranscript(currentInterim);
          if (currentInterim) {
            options?.onTranscriptChange?.(currentInterim, false);
          }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.warn('Speech recognition error event:', event.error);
          if (event.error === 'no-speech') {
            // User did not speak, benign warning
            return;
          }
          if (event.error === 'not-allowed' || event.error === 'permission-denied') {
            setErrorMessage('permission-denied');
            options?.onError?.('permission-denied');
          } else if (event.error === 'network') {
            setErrorMessage('network-error');
            options?.onError?.('network-error');
          } else {
            setErrorMessage(event.error);
            options?.onError?.(event.error);
          }
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
          setInterimTranscript('');
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (err: any) {
        console.error('Failed to start speech recognition:', err);
        setErrorMessage(err.message || 'audio-capture-error');
        options?.onError?.(err.message || 'audio-capture-error');
        setIsListening(false);
      }
    },
    [speechLanguage, options]
  );

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    speechLanguage,
    setSpeechLanguage,
    isSupported,
    errorMessage,
    startListening,
    stopListening,
    resetTranscript,
  };
}
