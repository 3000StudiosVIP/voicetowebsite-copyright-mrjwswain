#!/bin/bash
set -e

HOOK_URL="https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/2213644c-8931-45a6-a708-6648405b5425"
TOKEN="${CLOUDFLARE_BUILD_TOKEN:-$1}"

if [ -z "$TOKEN" ]; then
  echo "ERROR: Cloudflare build token not provided."
  echo "Set CLOUDFLARE_BUILD_TOKEN in your environment or pass it as the first argument."
  exit 1
fi

echo "Building production assets..."
npm run build:fast

echo "Triggering Cloudflare Pages deploy webhook..."
response=$(curl -s -o /tmp/cloudflare-deploy-response.txt -w "%{http_code}" \
  -X POST "$HOOK_URL" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}')

cat /tmp/cloudflare-deploy-response.txt

echo "Webhook HTTP status: $response"

if [ "$response" != "200" ] && [ "$response" != "201" ]; then
  echo "Cloudflare deploy webhook failed."
  exit 1
fi

echo "Cloudflare deployment triggered successfully."

echo "If the webhook is configured correctly, your site should now start building on Cloudflare Pages."
