#!/bin/bash
# Vertex AI Authentication Setup Guide

echo "🔐 Vertex AI Authentication Setup"
echo "=================================="
echo ""
echo "✅ DETECTED: Your project is configured for Vertex AI!"
echo "   - Project ID: 3000-studios-project"
echo "   - Service Account: vertex-ai-service@3000-studios-project.iam.gserviceaccount.com"
echo "   - Credentials file: ./service-account-key.json (currently has placeholder values)"
echo ""

echo "📋 QUICK SETUP (Replace placeholder credentials):"
echo "-------------------------------------------------"
echo "1. Go to Google Cloud Console: https://console.cloud.google.com/"
echo "2. Select project: 3000-studios-project"
echo "3. Go to 'IAM & Admin' > 'Service Accounts'"
echo "4. Find or create: vertex-ai-service@3000-studios-project.iam.gserviceaccount.com"
echo "5. Add 'Vertex AI User' role if not present"
echo "6. Create JSON key and download it"
echo "7. Replace the placeholder ./service-account-key.json with the real file"
echo "8. Run: ./test-vertex-ai.sh"
echo ""

echo "📋 Since you're in a containerized environment, standard browser-based authentication won't work."
echo "Here are the recommended authentication methods:"
echo ""

echo "📋 METHOD 1: Service Account Key (Recommended for containers)"
echo "------------------------------------------------------------"
echo "1. Go to Google Cloud Console: https://console.cloud.google.com/"
echo "2. Create a new project or select existing project"
echo "3. Go to 'IAM & Admin' > 'Service Accounts'"
echo "4. Create a new service account with 'Vertex AI User' role"
echo "5. Create and download a JSON key for the service account"
echo "6. Save the JSON file as 'service-account-key.json' in your workspace"
echo "7. Run: export GOOGLE_APPLICATION_CREDENTIALS=/workspaces/voicetowebsite-copyright-mrjwswain/service-account-key.json"
echo ""

echo "📋 METHOD 2: Application Default Credentials"
echo "--------------------------------------------"
echo "1. On your local machine (not in container), run: gcloud auth application-default login"
echo "2. This creates credentials at ~/.config/gcloud/application_default_credentials.json"
echo "3. Copy that file to your workspace and set: export GOOGLE_APPLICATION_CREDENTIALS=path/to/credentials.json"
echo ""

echo "📋 METHOD 3: Manual Token Authentication"
echo "----------------------------------------"
echo "1. On your local machine, run: gcloud auth login"
echo "2. Get access token: gcloud auth print-access-token"
echo "3. Set environment variable: export GOOGLE_ACCESS_TOKEN=your_token_here"
echo ""

echo "🔧 After Authentication - Enable Vertex AI API:"
echo "-----------------------------------------------"
echo "export PATH=\$PATH:/home/codespace/google-cloud-sdk/bin"
echo "gcloud config set project 3000-studios-project"
echo "gcloud services enable aiplatform.googleapis.com"
echo ""

echo "🧪 Test Vertex AI Setup:"
echo "-----------------------"
echo "python3 -c \"
import os
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/workspaces/voicetowebsite-copyright-mrjwswain/service-account-key.json'
from vertexai.generative_models import GenerativeModel
import vertexai

vertexai.init(project='3000-studios-project', location='us-central1')
model = GenerativeModel('gemini-1.5-flash')
response = model.generate_content('Hello from Vertex AI!')
print('✅ Success:', response.text)
\""
echo ""

echo "💡 Current Status:"
echo "- Google Cloud SDK: ✅ Installed"
echo "- Vertex AI Python SDK: ✅ Installed"
echo "- Authentication: ❌ Not configured (placeholder credentials)"
echo "- Project: 3000-studios-project (configured)"
echo ""

echo "🚀 Quick Setup Commands (after getting credentials):"
echo "export GOOGLE_APPLICATION_CREDENTIALS=/workspaces/voicetowebsite-copyright-mrjwswain/service-account-key.json"
echo "export PATH=\$PATH:/home/codespace/google-cloud-sdk/bin"
echo "gcloud config set project 3000-studios-project"
echo "gcloud services enable aiplatform.googleapis.com"