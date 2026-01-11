#!/bin/bash
# Script to deploy the Quantum-Spatial Design System Cloudflare Worker
# This deploys the worker to api.9bitstudios.io with proper configuration

# Set the environment
if [[ "$1" == "--production" ]]; then
  ENVIRONMENT="production"
elif [[ "$1" == "--staging" ]]; then
  ENVIRONMENT="staging"
else
  ENVIRONMENT="development"
fi

echo "=== Deploying Quantum-Spatial Design System Worker to $ENVIRONMENT ==="

# Set working directory
cd "$(dirname "$0")"
cd cloudflare-worker

# Make sure wrangler is installed
if ! command -v wrangler &> /dev/null; then
  echo "Wrangler not found. Installing..."
  npm install -g wrangler
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Configure environment-specific variables
if [[ "$ENVIRONMENT" == "production" ]]; then
  DOMAIN="api.9bitstudios.io"
  ZONE_ID="8769152ff63dcc8733ab1d18e33dd92c"
  echo "Setting up PRODUCTION environment for $DOMAIN"
elif [[ "$ENVIRONMENT" == "staging" ]]; then
  DOMAIN="api-staging.9bitstudios.io"
  ZONE_ID="8769152ff63dcc8733ab1d18e33dd92c"
  echo "Setting up STAGING environment for $DOMAIN"
else
  DOMAIN="api-dev.9bitstudios.io"
  ZONE_ID="8769152ff63dcc8733ab1d18e33dd92c"
  echo "Setting up DEVELOPMENT environment for $DOMAIN"
fi

# Update wrangler.toml configuration
cat > wrangler.toml << EOL
name = "quantum-spatial-design-system-${ENVIRONMENT}"
main = "src/worker.js"
compatibility_date = "2025-05-01"
account_id = "9bit-studios"
workers_dev = true
route = "${DOMAIN}/*"

[vars]
ENVIRONMENT = "${ENVIRONMENT}"
CLOUDINARY_CLOUD_NAME = "9bitstudios"

[env.${ENVIRONMENT}]
route = "${DOMAIN}/*"
vars = { ENVIRONMENT = "${ENVIRONMENT}", CLOUDINARY_CLOUD_NAME = "9bitstudios" }
EOL

echo "Wrangler configuration updated"

# Set up Cloudinary API secrets
if [[ -z "${CLOUDINARY_API_KEY}" ]]; then
  echo "WARNING: CLOUDINARY_API_KEY is not set in the environment"
  echo "Some design system assets may not be accessible"
  echo "Set this environment variable before deployment for full functionality"
  echo
else
  echo "Setting Cloudinary API key..."
  wrangler secret put CLOUDINARY_API_KEY -e ${ENVIRONMENT}
fi

if [[ -z "${CLOUDINARY_API_SECRET}" ]]; then
  echo "WARNING: CLOUDINARY_API_SECRET is not set in the environment"
  echo "Some design system assets may not be accessible"
  echo "Set this environment variable before deployment for full functionality"
  echo
else
  echo "Setting Cloudinary API secret..."
  wrangler secret put CLOUDINARY_API_SECRET -e ${ENVIRONMENT}
fi

# Deploy to Cloudflare
echo "Deploying to Cloudflare..."
wrangler deploy -e ${ENVIRONMENT}

if [ $? -eq 0 ]; then
  echo ""
  echo "=== Deployment Successful ==="
  echo "The Quantum-Spatial Design System Worker is now available at:"
  echo "https://${DOMAIN}/"
  echo ""
  echo "API endpoints:"
  echo "- Design Tokens: https://${DOMAIN}/design-system/tokens?state=transitional"
  echo "- QuantumPixel: https://${DOMAIN}/quantum-pixel?state=transitional"
  echo "- DimensionalGrid: https://${DOMAIN}/dimensional-grid?state=transitional"
  echo "- All Components: https://${DOMAIN}/components"
  echo "- M4 Optimization: https://${DOMAIN}/m4-optimization"
  echo ""
  echo "To sync with Framer, use:"
  echo "node scripts/framer-quantum-spatial-sync.js --framer-project=path/to/project"
else
  echo "Deployment failed. Check the error messages above."
  exit 1
fi