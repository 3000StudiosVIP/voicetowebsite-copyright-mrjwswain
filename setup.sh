#!/bin/bash
# VoiceToWebsite - Development Setup Script
# This script configures your entire development environment
# Copyright © 2024-2026 3000 Studios. All rights reserved.

set -e

echo "🚀 VoiceToWebsite Development Setup"
echo "==================================="
echo ""

# Check Node version
echo "✓ Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "  Found: $NODE_VERSION"
echo ""

# Check npm version
echo "✓ Checking npm version..."
NPM_VERSION=$(npm -v)
echo "  Found: $NPM_VERSION"
echo ""

# Install dependencies
echo "✓ Installing dependencies..."
npm install --silent
echo "  Done!"
echo ""

# Setup environment
if [ ! -f .env.local ]; then
  echo "⚠️  .env.local not found. Copying from .env.local.example..."
  cp .env.local.example .env.local
  echo "  Created .env.local - please fill in your API keys"
  echo ""
else
  echo "✓ .env.local exists"
  echo ""
fi

# Build check
echo "✓ Testing build..."
npm run build --silent > /dev/null 2>&1
echo "  Build successful!"
echo ""

# Lint check
echo "✓ Running linter..."
npm run lint --silent > /dev/null 2>&1
echo "  No linting errors!"
echo ""

# Google Cloud ADC
if [ ! -d ~/.config/gcloud ]; then
  echo "⚠️  Google Cloud credentials not found"
  echo "  Run: bash <(curl -sSL https://storage.googleapis.com/cloud-samples-data/adc/setup_adc.sh)"
  echo ""
else
  echo "✓ Google Cloud credentials found"
  echo ""
fi

# VS Code extensions
echo "📦 Recommended VS Code Extensions:"
echo "  - GitHub Copilot (github.copilot)"
echo "  - ESLint (dbaeumer.vscode-eslint)"
echo "  - Prettier (esbenp.prettier-vscode)"
echo "  - Firebase (toba.vsfire)"
echo "  - Vitest (vitest.explorer)"
echo "  - GitLens (eamodio.gitlens)"
echo ""

# Final checks
echo "==================================="
echo "✅ Setup Complete!"
echo ""
echo "📝 Next Steps:"
echo "  1. Fill in your API keys in .env.local"
echo "  2. Run: npm run dev (to start development)"
echo "  3. Open: http://localhost:5173"
echo ""
echo "📊 Useful Commands:"
echo "  - npm run dev       → Development server"
echo "  - npm run build     → Production build"
echo "  - npm run lint      → Check code quality"
echo "  - npm run test      → Run tests"
echo "  - npm run lint:fix  → Auto-fix lint issues"
echo ""
echo "📚 Documentation:"
echo "  - AUDIT.md   → Full project audit"
echo "  - PROFILE.md → Optimization profile"
echo "  - GITHUB.md  → Team collaboration guide"
echo "  - COPYRIGHT.md → License & ownership"
echo ""
echo "🎉 Happy coding!"