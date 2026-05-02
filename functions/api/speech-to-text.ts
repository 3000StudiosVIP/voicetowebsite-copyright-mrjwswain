/**
 * VoiceToWebsite - Speech-to-Text API
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

function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...(init.headers || {}),
    },
  });
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  try {
    // Check content type
    const contentType = request.headers.get('content-type') || '';

    if (!contentType.includes('multipart/form-data') && !contentType.includes('audio/')) {
      return json({ error: 'Invalid content type. Expected audio data.' }, { status: 400 });
    }

    let audioBuffer: Buffer;

    if (contentType.includes('multipart/form-data')) {
      // Handle multipart form data
      const formData = await request.formData();
      const audioFile = formData.get('audio') as File;

      if (!audioFile) {
        return json({ error: 'No audio file provided' }, { status: 400 });
      }

      audioBuffer = Buffer.from(await audioFile.arrayBuffer());
    } else {
      // Handle raw audio data
      audioBuffer = Buffer.from(await request.arrayBuffer());
    }

    // Get language code from query params or default to English
    const url = new URL(request.url);
    const languageCode = url.searchParams.get('lang') || 'en-US';

    // Transcribe the audio
    const transcription = await vertexAIService.transcribeAudio(audioBuffer, languageCode);

    return json({
      success: true,
      transcription,
      language: languageCode,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Speech-to-text API error:', error);
    return json({
      error: 'Failed to process audio',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function onRequestGet() {
  return json({
    message: 'Voice-to-Text API',
    endpoints: {
      POST: '/api/speech-to-text - Upload audio file for transcription',
    },
    supportedFormats: ['WEBM', 'MP3', 'WAV', 'FLAC'],
    supportedLanguages: ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'pt-BR', 'ja-JP', 'ko-KR', 'zh-CN'],
  });
}
