import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.jsx';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const isLocal = import.meta.env.VITE_ENVIRONMENT === "local" || import.meta.env.MODE === 'development';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {!isLocal && <Analytics />}
    {!isLocal && <SpeedInsights />}
  </StrictMode>
);
