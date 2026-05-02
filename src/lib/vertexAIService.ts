import { SpeechClient } from '@google-cloud/speech';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
/**
 * VoiceToWebsite - Vertex AI Service
 *
 * Copyright © 2024-2026 3000 Studios. All rights reserved.
 * Owner: 3000 Studios
 * Creator: Mr. JW Swain (mr.jwswain@gmail.com)
 *
 * This software is proprietary and confidential.
 * Unauthorized use, reproduction, or distribution is strictly prohibited.
 */

import { VertexAI } from '@google-cloud/vertexai';

// Initialize Vertex AI client
const vertexAI = new VertexAI({
  project: process.env.VERTEX_AI_PROJECT || '3000-studios-project',
  location: process.env.VERTEX_AI_LOCATION || 'us-central1',
});

// Initialize Speech-to-Text client
const speechClient = new SpeechClient();

// Initialize Text-to-Speech client
const textToSpeechClient = new TextToSpeechClient();

export interface VertexAIOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  topK?: number;
}

export class VertexAIService {
  private static instance: VertexAIService;

  public static getInstance(): VertexAIService {
    if (!VertexAIService.instance) {
      VertexAIService.instance = new VertexAIService();
    }
    return VertexAIService.instance;
  }

  /**
   * Generate text using Vertex AI Gemini
   */
  async generateText(prompt: string, options: VertexAIOptions = {}) {
    try {
      const model = vertexAI.getGenerativeModel({
        model: options.model || process.env.VERTEX_AI_MODEL || 'gemini-1.5-pro',
        generationConfig: {
          temperature: options.temperature || 0.7,
          maxOutputTokens: options.maxTokens || 2048,
          topP: options.topP || 0.8,
          topK: options.topK || 40,
        },
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Vertex AI text generation error:', error);
      throw new Error('Failed to generate text with Vertex AI');
    }
  }

  /**
   * Transcribe audio using Google Cloud Speech-to-Text
   */
  async transcribeAudio(audioBuffer: Buffer, languageCode: string = 'en-US') {
    try {
      const request = {
        audio: {
          content: audioBuffer.toString('base64'),
        },
        config: {
          encoding: 'WEBM_OPUS' as const,
          sampleRateHertz: 48000,
          languageCode,
          model: 'latest_long',
          enableAutomaticPunctuation: true,
          enableWordTimeOffsets: false,
        },
      };

      const [response] = await speechClient.recognize(request);

      if (!response.results || response.results.length === 0) {
        return '';
      }

      return response.results
        .map(result => result.alternatives?.[0]?.transcript || '')
        .join(' ')
        .trim();
    } catch (error) {
      console.error('Speech-to-Text error:', error);
      throw new Error('Failed to transcribe audio');
    }
  }

  /**
   * Generate speech from text using Google Cloud Text-to-Speech
   */
  async generateSpeech(text: string, languageCode: string = 'en-US', voiceName: string = 'en-US-Neural2-D') {
    try {
      const request = {
        input: { text },
        voice: {
          languageCode,
          name: voiceName,
        },
        audioConfig: {
          audioEncoding: 'MP3' as const,
          speakingRate: 1.0,
          pitch: 0.0,
        },
      };

      const [response] = await textToSpeechClient.synthesizeSpeech(request);
      return response.audioContent;
    } catch (error) {
      console.error('Text-to-Speech error:', error);
      throw new Error('Failed to generate speech');
    }
  }

  /**
   * Generate website content with multimodal capabilities
   */
  async generateWebsiteContent(prompt: string, options: VertexAIOptions = {}) {
    const enhancedPrompt = `
You are an expert web developer and designer. Generate a complete website based on this voice description.

Requirements:
- Create modern, responsive HTML/CSS/JS
- Use Tailwind CSS classes
- Include proper semantic HTML
- Make it visually stunning and professional
- Optimize for conversions and user experience

Voice Description: ${prompt}

Please provide:
1. Complete HTML structure
2. Embedded CSS (using Tailwind)
3. Any necessary JavaScript
4. SEO-optimized content
5. Mobile-responsive design

Return only the HTML code, no explanations.
    `;

    return this.generateText(enhancedPrompt, {
      ...options,
      maxTokens: 8192,
      temperature: 0.8,
    });
  }
}

export const vertexAIService = VertexAIService.getInstance();
