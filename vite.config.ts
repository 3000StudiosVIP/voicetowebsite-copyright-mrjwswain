/**
 * VoiceToWebsite - Vite Configuration
 *
 * Copyright © 2024-2026 3000 Studios. All rights reserved.
 * Owner: 3000 Studios
 * Creator: Mr. JW Swain (mr.jwswain@gmail.com)
 *
 * This software is proprietary and confidential.
 * Unauthorized use, reproduction, or distribution is strictly prohibited.
 */

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.VERTEX_AI_PROJECT': JSON.stringify(env.VERTEX_AI_PROJECT),
      'process.env.VERTEX_AI_LOCATION': JSON.stringify(env.VERTEX_AI_LOCATION),
      'process.env.VERTEX_AI_MODEL': JSON.stringify(env.VERTEX_AI_MODEL),
      'process.env.SPEECH_LANGUAGE_CODE': JSON.stringify(env.SPEECH_LANGUAGE_CODE),
      'process.env.TTS_LANGUAGE_CODE': JSON.stringify(env.TTS_LANGUAGE_CODE),
      'process.env.TTS_VOICE_NAME': JSON.stringify(env.TTS_VOICE_NAME),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      host: true,
      port: 5173,
      // Optimize for high-performance system
      fs: {
        strict: false,
      },
      watch: {
        ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**'],
        usePolling: false,
        interval: 100,
      },
    },
    build: {
      // Optimize for high-performance build
      target: 'esnext',
      minify: 'esbuild',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['lucide-react', 'motion'],
            firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
            ai: ['@google/genai'],
          },
        },
      },
      // Increase chunk size limits for better performance
      chunkSizeWarningLimit: 1000,
      // Use more workers for parallel processing
      reportCompressedSize: false,
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@google/genai',
        'firebase/app',
        'firebase/auth',
        'firebase/firestore',
        'lucide-react',
        'motion',
      ],
      // Pre-bundle dependencies for faster dev server
      force: true,
    },
    esbuild: {
      // Optimize ESBuild for speed
      target: 'esnext',
      minify: true,
      treeShaking: true,
    },
  };
});
