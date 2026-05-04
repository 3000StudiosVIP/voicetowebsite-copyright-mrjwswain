#!/bin/bash
# Google Cloud SDK and Vertex AI Setup Script

echo "Google Cloud SDK and Vertex AI Setup"
echo "===================================="

# Add Google Cloud SDK to PATH
export PATH=$PATH:/home/codespace/google-cloud-sdk/bin

echo "1. Google Cloud SDK installed at: /home/codespace/google-cloud-sdk"
echo "2. Vertex AI Python SDK installed"
echo "3. ADK Tools extension installed in VS Code"

echo ""
echo "⚠️  IMPORTANT: To use Vertex AI, you need:"
echo "   - A Google Cloud account"
echo "   - A project with Vertex AI API enabled"
echo "   - Authentication (gcloud auth login)"
echo "   - Vertex AI may have usage costs"
echo ""

echo "To authenticate:"
echo "  gcloud auth login"
echo ""

echo "To set your project:"
echo "  gcloud config set project YOUR_PROJECT_ID"
echo ""

echo "To enable Vertex AI API:"
echo "  gcloud services enable aiplatform.googleapis.com"
echo ""

echo "Example Python code for Vertex AI:"
echo 'from vertexai.generative_models import GenerativeModel
import vertexai

vertexai.init(project="your-project-id", location="us-central1")
model = GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Hello, world!")
print(response.text)'