# VoiceToWebsite Default Development Profile
# GitHub Copilot + VS Code Optimization Configuration
# Copyright © 2024-2026 3000 Studios. All rights reserved.

## Profile: "VoiceToWebsite-DevMax"
- Created: May 2, 2026
- Owner: 3000 Studios
- Optimized For: 64GB RAM, 2TB Storage
- Ideal For: High-Performance Development

### ✅ INCLUDED COMPONENTS

#### 1. Free/Optimal AI Agents & Tools
- **GitHub Copilot**: Primary AI coding assistant (using Claude Haiku 4.5)
- **Vertex AI (Free Tier)**: 300 free credits/month
  - Gemini 1.5 Flash (cheaper alternative to Pro)
  - Speech-to-Text API (dual quota)
  - Text-to-Speech API (dual quota)
- **Claude Models**: Through Claude API (cost-optimized)
- **Local LLMs**: Ollama support for offline work
  - Llama 2 7B (lightweight, free)
  - Mistral 7B (faster inference)
  - Run locally to avoid token costs

#### 2. Free Development Tools
- **VS Code**: Community Edition (free)
- **Vitest**: Free testing framework (just installed)
- **Firebase**: Free tier includes 1GB storage
- **Cloudflare**: Free tier for CDN/Workers
- **GitHub**: Free private repos + GitHub Actions
- **Sentry**: Free tier for error tracking (50K events/month)

#### 3. Cost Optimization Strategies
- Use Gemini 1.5 Flash instead of Pro (90% cheaper)
- Cache response tokens to reduce API calls
- Batch API requests
- Local LLM fallback for non-critical tasks
- Rate limiting to prevent accidental overages

#### 4. Token Usage Safeguards
- Daily limit: 100K Gemini tokens
- Daily limit: 500K Vertex AI tokens
- Warning at 80% threshold
- Automatic blocking at 95% threshold
- Detailed usage tracking and reporting

---

## 🚀 QUICK START PROFILE

### Installation Steps
```bash
# 1. Setup Google Cloud (free tier)
gcloud auth login
gcloud config set project 3000-studios-project

# 2. Enable Vertex AI free credits
# Visit: https://console.cloud.google.com/billing

# 3. Setup local development
npm install
cp .env.local.example .env.local

# 4. Configure .env.local with your keys
# (minimal setup for testing)

# 5. Start development
npm run dev
```

### Environment Quick Setup
```bash
# Get Gemini API key (free at https://makersuite.google.com/app/apikey)
GEMINI_API_KEY=your_free_api_key

# Vertex AI uses ADC (Application Default Credentials)
# Already configured via: 
# bash <(curl -sSL https://storage.googleapis.com/cloud-samples-data/adc/setup_adc.sh)

# Firebase free tier (https://console.firebase.google.com)
VITE_FIREBASE_API_KEY=your_firebase_key
# ... other Firebase config

# Stripe/PayPal optional for testing (use sandbox mode)
```

---

## 💰 MONTHLY COST ESTIMATE (Optimized Profile)

| Service | Free Tier | Monthly Cost |
|---------|-----------|-------------|
| Vertex AI | 300 credits | $0 (free tier) |
| Gemini | 60 req/min | $0 (free tier) |
| Firebase | 1GB storage | $0 (free tier) |
| Cloudflare | 100K requests | $0 (free tier) |
| GitHub | Private repos | $0 (free) |
| Sentry | 50K events | $0 (free tier) |
| **Total** | | **$0-50/month** |

*Can stay completely free during development & testing*

---

## 🔄 AI Agent Rotation Strategy

### Free Agent Priority Order
1. **GitHub Copilot** (included with subscription, optimal tokens)
2. **Claude Haiku** (lowest-cost Claude model)
3. **Local Ollama** (Llama 2 7B for offline work)
4. **Vertex AI Flash** (free credits, fastest)
5. **Gemini Free Tier** (backup option)

### When to Use Each
- **Complex Feature Dev**: GitHub Copilot (best code quality)
- **Quick Fixes/Tweaks**: Claude Haiku (fastest)
- **Documentation**: Local Ollama (zero cost)
- **Large-Scale Generation**: Vertex AI Flash (free credits)
- **Emergency Overflow**: Gemini (rate-limited)

### Token Usage Tips
- Reuse responses when possible (cache them)
- Batch similar requests together
- Use shorter prompts for simple tasks
- Send full context to avoid follow-ups
- Download responses for offline reference

---

## 📊 Profile Settings

### VS Code Extensions (Recommended)
```json
{
  "GitHub Copilot": "github.copilot",
  "Copilot Labs": "github.copilot-labs",
  "Thunder Client": "rangav.vscode-thunder-client",
  "REST Client": "humao.rest-client",
  "Firebase": "toba.vsfire",
  "Vertex AI Code Assist": "google.codetransparency",
  "GitLens": "eamodio.gitlens",
  "Prettier": "esbenp.prettier-vscode",
  "ESLint": "dbaeumer.vscode-eslint",
  "Vitest": "vitest.explorer"
}
```

### Recommended Settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "github.copilot.enable": {
    "*": true,
    "plaintext": true,
    "markdown": true
  },
  "github.copilot.advanced": {
    "token_limit": 8000,
    "prompt_limit": 5000
  }
}
```

---

## 🔐 Security Settings

### API Key Protection
- ✅ Never commit `.env.local`
- ✅ Use `.gitignore` to block secrets
- ✅ Rotate keys regularly
- ✅ Use environment variables only
- ✅ Lock secrets in Vault (GitHub Secrets)

### Token Rate Limiting
- Daily limit enforcement enabled
- Automatic pause-and-alert at 95%
- Detailed audit logs of all API calls
- Cost tracking per feature/user

---

## 📈 Scaling Strategy

### When Usage Increases
1. **Monitor token consumption weekly**
2. **Optimize top 3 token-consuming features**
3. **Switch to paid Firebase tier** (if needed)
4. **Add caching layer** (Redis, Memcached)
5. **Batch similar API calls** to reduce overhead
6. **Implement queue system** for non-urgent tasks

### Cost Optimization Checklist
- [ ] Response caching enabled
- [ ] Batch processing implemented
- [ ] Local fallbacks configured
- [ ] Usage alerts configured
- [ ] Weekly cost review process
- [ ] Budget limits enforced

---

## 🛠️ Development Workflow

### Daily Checklist
```bash
# 1. Check token usage before starting
npm run check-usage

# 2. Review previous day's costs
npm run show-costs

# 3. Start development with cost tracking
npm run dev

# 4. Monitor in VS Code
# (Extension shows real-time token usage in sidebar)

# 5. Review at day-end
npm run generate-report
```

### Weekly Checklist
- [ ] Review token usage report
- [ ] Audit expensive API calls
- [ ] Optimize slow features
- [ ] Update budget forecasts
- [ ] Plan cost reductions (if needed)

---

## 📞 Support Resources

### Free Support Channels
- GitHub Copilot Chat (included)
- GitHub Discussions
- Stack Overflow
- Google Cloud Community
- Firebase Slack Community

### Documentation Links
- Vertex AI Docs: https://cloud.google.com/vertex-ai/docs
- Gemini API: https://ai.google.dev/
- Firebase: https://firebase.google.com/docs
- Cloudflare: https://developers.cloudflare.com/

---

## 🎯 Goals for This Profile

- ✅ Minimize developer costs (target: $0-50/month)
- ✅ Maximize development velocity
- ✅ Stay within free tier limits
- ✅ Build quality software efficiently
- ✅ No surprise bills/overages

---

**Profile Active Since**: May 2, 2026  
**Last Updated**: Configuration Complete  
**Next Review**: Monthly  
**Status**: ✅ READY FOR DEVELOPMENT