#!/bin/bash
# Test Vertex AI Setup

echo "🧪 Testing Vertex AI Setup..."
echo ""

# Check if credentials are set
if [ -z "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
    echo "❌ GOOGLE_APPLICATION_CREDENTIALS not set"
    echo "Please set: export GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/service-account-key.json"
    exit 1
fi

if [ ! -f "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
    echo "❌ Credentials file not found: $GOOGLE_APPLICATION_CREDENTIALS"
    exit 1
fi

echo "✅ Credentials file found"

# Test Python import and basic functionality
python3 -c "
import os
import sys

# Set credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '$GOOGLE_APPLICATION_CREDENTIALS'

try:
    from vertexai.generative_models import GenerativeModel
    import vertexai
    print('✅ Vertex AI SDK imported successfully')

    # Try to initialize with your project
    vertexai.init(project='3000-studios-project', location='us-central1')
    print('✅ Vertex AI initialized successfully')

    # Test with a simple model call
    model = GenerativeModel('gemini-1.5-flash')
    response = model.generate_content('Hello from Vertex AI!')
    print('✅ Model response:', response.text[:100] + '...')
    
    print('')
    print('🎉 Vertex AI is fully working!')
    print('You can now use Vertex AI in your Python code.')

except ImportError as e:
    print('❌ Import error:', str(e))
    sys.exit(1)
except Exception as e:
    print('⚠️  Error during testing:', str(e))
    print('This might be due to:')
    print('  - Invalid credentials')
    print('  - Vertex AI API not enabled')
    print('  - Insufficient permissions')
    print('  - Network connectivity issues')
    sys.exit(1)
"