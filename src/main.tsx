/**
 * VoiceToWebsite - AI-Powered Website Generator
 *
 * Copyright © 2024-2026 3000 Studios. All rights reserved.
 * Owner: 3000 Studios
 * Creator: Mr. JW Swain (mr.jwswain@gmail.com)
 *
 * This software is proprietary and confidential.
 * Unauthorized use, reproduction, or distribution is strictly prohibited.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './lib/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
