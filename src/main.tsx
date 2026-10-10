import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register service worker immediately to enable offline caching for rural Karnataka farmers
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('KrishiRakshak AI update available');
  },
  onOfflineReady() {
    console.log('KrishiRakshak AI is ready to work offline');
  },
});

createRoot(document.getElementById('root')!).render(<App />);
