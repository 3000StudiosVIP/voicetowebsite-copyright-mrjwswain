/**
 * VoiceToWebsite - Text-to-Speech API
 *
 * Copyright © 2024-2026 3000 Studios. All rights reserved.
 * Owner: 3000 Studios
 * Creator: Mr. JW Swain (mr.jwswain@gmail.com)
 *
 * This software is proprietary and confidential.
 * Unauthorized use, reproduction, or distribution is strictly prohibited.
 */

import { vertexAIService } from '../../src/lib/vertexAIService';

export interface Env {
  // Add your environment variables here
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  try {
    const { text, languageCode = 'en-US', voiceName = 'en-US-Neural2-D' } = await request.json();

    if (!text || typeof text !== 'string') {
      return new Response(JSON.stringify({ error: 'Text is required' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    // Generate speech
    const audioContent = await vertexAIService.generateSpeech(text, languageCode, voiceName);

    if (!audioContent) {
      return new Response(JSON.stringify({ error: 'Failed to generate speech' }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      });
    }

    // Return audio as MP3
    return new Response(audioContent, {
      headers: {
        'content-type': 'audio/mpeg',
        'content-disposition': 'attachment; filename="generated-speech.mp3"',
      },
    });

  } catch (error) {
    console.error('Text-to-speech API error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to generate speech',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}

export async function onRequestGet() {
  return new Response(JSON.stringify({
    message: 'Text-to-Speech API',
    endpoints: {
      POST: '/api/text-to-speech - Generate speech from text',
    },
    supportedLanguages: ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'pt-BR'],
    voices: {
      'en-US': ['en-US-Neural2-D', 'en-US-Neural2-F', 'en-US-Standard-C', 'en-US-Standard-D'],
      'es-ES': ['es-ES-Neural2-B', 'es-ES-Neural2-C'],
      'fr-FR': ['fr-FR-Neural2-B', 'fr-FR-Neural2-C'],
      'de-DE': ['de-DE-Neural2-B', 'de-DE-Neural2-C'],
      'it-IT': ['it-IT-Neural2-B', 'it-IT-Neural2-C'],
      'pt-BR': ['pt-BR-Neural2-B', 'pt-BR-Neural2-C'],
    },
  }), {
    headers: { 'content-type': 'application/json' },
  });
}
