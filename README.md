# VoiceToWebsite - AI-Powered Website Generator

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

**© 2024-2026 3000 Studios. All Rights Reserved.**

---

## ⚠️ **IMPORTANT NOTICE**

This software is **PROPRIETARY** and **COPYRIGHTED**. All rights, title, and interest belong exclusively to **3000 Studios**.

### **Unauthorized Use Prohibited**
- No cloning, copying, or distribution permitted
- No reverse engineering or modification allowed
- No commercial use without explicit written permission
- No sharing of code, credentials, or access

### **Owner Information**
- **Owner**: 3000 Studios
- **Creator**: Mr. JW Swain (mr.jwswain@gmail.com)
- **Repository**: https://github.com/3000Studios/voicetowebsite-copyright-mrjwswain

For licensing inquiries or permissions, contact: **mr.jwswain@gmail.com**

---

## 📋 **About This Project**

Transform your voice into stunning websites using cutting-edge AI technology. This project leverages Google Vertex AI for speech-to-text, text generation, and website creation.

### **Key Features**
- **Voice-to-Website Generation**: Speak your website vision and watch it come to life
- **Google Vertex AI Integration**: Advanced AI models for speech processing and content generation
- **Real-time Speech Recognition**: Browser-based or server-side speech processing
- **Multi-modal AI**: Text-to-speech, speech-to-text, and intelligent content generation
- **High-Performance Architecture**: Optimized for 64GB RAM systems
- **Cloud-Native Deployment**: Ready for Google Cloud Platform

### **Technology Stack**
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: Cloudflare Workers, Node.js
- **AI**: Google Vertex AI (Gemini, Speech-to-Text, Text-to-Speech)
- **Database**: Cloudflare D1, Firebase Firestore
- **Deployment**: Cloudflare Pages, Firebase Hosting

---

## 🔒 **Copyright Protection**

This software contains valuable intellectual property including:
- Proprietary AI algorithms and models
- Unique user interface designs
- Custom API implementations
- Database architectures
- Brand assets and trademarks

All code, documentation, and associated materials are protected under copyright law.

---

## 📞 **Contact**

For any inquiries regarding this software:
- **Email**: mr.jwswain@gmail.com
- **Organization**: 3000 Studios

---

**© 2024-2026 3000 Studios. All Rights Reserved.**  
*Unauthorized reproduction or distribution is strictly prohibited.*

2. **Enable Vertex AI APIs**:
   ```bash
   gcloud services enable aiplatform.googleapis.com
   gcloud services enable speech.googleapis.com
   gcloud services enable texttospeech.googleapis.com
   ```

3. **Create Service Account**:
   ```bash
   gcloud iam service-accounts create vertex-ai-service \
     --description="Service account for Vertex AI operations" \
     --display-name="Vertex AI Service"
   ```

4. **Grant Permissions**:
   ```bash
   gcloud projects add-iam-policy-binding 3000-studios-project \
     --member="serviceAccount:vertex-ai-service@3000-studios-project.iam.gserviceaccount.com" \
     --role="roles/aiplatform.user"
   ```

5. **Generate Service Account Key**:
   ```bash
   gcloud iam service-accounts keys create service-account-key.json \
     --iam-account=vertex-ai-service@3000-studios-project.iam.gserviceaccount.com
   ```

### 3. Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```bash
# Google Cloud Configuration
GOOGLE_CLOUD_PROJECT_ID=3000-studios-project
GOOGLE_CLOUD_LOCATION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json

# Vertex AI Configuration
VERTEX_AI_PROJECT=3000-studios-project
VERTEX_AI_LOCATION=us-central1
VERTEX_AI_MODEL=gemini-1.5-pro

# Speech Configuration
SPEECH_LANGUAGE_CODE=en-US
SPEECH_MODEL=latest_long

# Text-to-Speech Configuration
TTS_LANGUAGE_CODE=en-US
TTS_VOICE_NAME=en-US-Neural2-D

# Gemini API (fallback)
GEMINI_API_KEY=your_gemini_api_key

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
# ... other Firebase config

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 4. Development Server

```bash
# High-performance development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build for Production

```bash
# Optimized production build
npm run build:fast

# Deploy to Cloudflare Pages
npm run deploy:prod
```

## 🎯 Performance Optimization

This project is optimized for high-end systems (64GB RAM, 2TB storage):

- **Memory Allocation**: 16GB heap size for builds
- **Parallel Processing**: Multi-threaded bundling
- **Code Splitting**: Intelligent chunk optimization
- **Caching**: Aggressive caching strategies
- **TypeScript**: Optimized compilation settings

## 🔧 Available Scripts

```bash
npm run dev          # Development server with HMR
npm run build        # Production build
npm run build:fast   # Optimized production build
npm run preview      # Preview production build
npm run lint         # TypeScript/ESLint checking
npm run lint:fix     # Auto-fix linting issues
npm run test         # Run tests
npm run clean        # Clean build artifacts
npm run analyze      # Bundle analyzer
```

## 🌐 API Endpoints

### Speech-to-Text
```
POST /api/speech-to-text
Content-Type: multipart/form-data

# Transcribes audio to text using Vertex AI
```

### Text-to-Speech
```
POST /api/text-to-speech
Content-Type: application/json

{
  "text": "Hello, world!",
  "languageCode": "en-US",
  "voiceName": "en-US-Neural2-D"
}
```

### Website Generation
```
POST /api/generate
Content-Type: application/json

{
  "prompt": "Create a modern business website"
}
```

## 🔒 Security

- Service account keys are required for Google Cloud access
- API keys are environment-specific
- CORS configured for production domains
- Firebase security rules enforced

## 📊 Monitoring

- Firebase Analytics integration
- Performance monitoring
- Error tracking with Sentry
- AI usage metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

Copyright © 2024 3000 Studios. All rights reserved.

## 🆘 Support

For support, contact the development team at 3000 Studios.

---

**Built with ❤️ by 3000 Studios using Google Vertex AI**
