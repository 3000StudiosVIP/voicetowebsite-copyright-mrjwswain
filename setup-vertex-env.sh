#!/bin/bash
# Set up Vertex AI environment variables

echo "🔧 Setting up Vertex AI Environment..."
echo ""

# Set Google Cloud credentials
export GOOGLE_APPLICATION_CREDENTIALS="/workspaces/voicetowebsite-copyright-mrjwswain/service-account-key.json"
echo "✅ GOOGLE_APPLICATION_CREDENTIALS set to: $GOOGLE_APPLICATION_CREDENTIALS"

# Add Google Cloud SDK to PATH
export PATH="$PATH:/home/codespace/google-cloud-sdk/bin"
echo "✅ Google Cloud SDK added to PATH"

# Set project
export GOOGLE_CLOUD_PROJECT="3000-studios-project"
echo "✅ Project set to: $GOOGLE_CLOUD_PROJECT"

echo ""
echo "💡 Environment variables set for this session."
echo "   Run './test-vertex-ai.sh' to test the setup."
echo ""
echo "📝 To make these permanent, add to your ~/.bashrc:"
echo "   export GOOGLE_APPLICATION_CREDENTIALS=\"/workspaces/voicetowebsite-copyright-mrjwswain/service-account-key.json\""
echo "   export PATH=\"\$PATH:/home/codespace/google-cloud-sdk/bin\""
echo "   export GOOGLE_CLOUD_PROJECT=\"3000-studios-project\""