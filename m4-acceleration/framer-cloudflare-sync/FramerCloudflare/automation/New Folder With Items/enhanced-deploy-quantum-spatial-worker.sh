#!/bin/bash
# Enhanced Deploy Script for Quantum-Spatial Design System Cloudflare Worker
# Incorporates features from the Design System Implementation Automation Toolkit
# With configurations adapted for custom domains

set -e  # Exit on any error

# Configuration
CONFIG_FILE=".cf-config.json"
WORKER_DIR="./cloudflare-worker"
TOKENS_DIR="./cloudflare-worker/src/services"
COMPONENTS_DIR="./cloudflare-worker/components"  # Path may need adjustment

# Color outputs
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Default environment
ENVIRONMENT="staging"

# Parse arguments
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --production) ENVIRONMENT="production"; shift ;;
    --staging) ENVIRONMENT="staging"; shift ;;
    --config=*) CONFIG_FILE="${1#*=}"; shift ;;
    --help) 
      echo -e "${BLUE}Usage: ./enhanced-deploy-quantum-spatial-worker.sh [options]${NC}"
      echo "Options:"
      echo "  --production         Deploy to production environment"
      echo "  --staging            Deploy to staging environment (default)"
      echo "  --config=FILE        Specify config file (default: .cf-config.json)"
      echo "  --help               Show this help message"
      exit 0
      ;;
    *) echo -e "${RED}Unknown parameter: $1${NC}"; exit 1 ;;
  esac
done

# Create config file if it doesn't exist
if [ ! -f "$CONFIG_FILE" ]; then
  echo -e "${YELLOW}Config file $CONFIG_FILE not found. Creating default config...${NC}"
  cat > "$CONFIG_FILE" << EOF
{
  "environments": {
    "production": {
      "name": "quantum-spatial-design-system",
      "account_id": "7082db633f378f09d2706f247a1a721d",
      "zone_id": "8769152ff63dcc8733ab1d18e33dd92c",
      "routes": ["design-system.9bitstudios.io/*"]
    },
    "staging": {
      "name": "quantum-spatial-design-system-staging",
      "account_id": "7082db633f378f09d2706f247a1a721d",
      "zone_id": "8769152ff63dcc8733ab1d18e33dd92c",
      "routes": ["design-system-staging.9bitstudios.io/*"]
    }
  }
}
EOF
  echo -e "${GREEN}Default config file created. You may need to adjust values.${NC}"
fi

# Load configuration
CONFIG=$(cat "$CONFIG_FILE")
NAME=$(echo "$CONFIG" | jq -r ".environments.$ENVIRONMENT.name")
ACCOUNT_ID=$(echo "$CONFIG" | jq -r ".environments.$ENVIRONMENT.account_id")
ZONE_ID=$(echo "$CONFIG" | jq -r ".environments.$ENVIRONMENT.zone_id")
ROUTES=$(echo "$CONFIG" | jq -r ".environments.$ENVIRONMENT.routes[]")

echo -e "${BLUE}🚀 Deploying Quantum-Spatial Design System to $ENVIRONMENT environment${NC}"
echo -e "${BLUE}Worker: $NAME${NC}"
echo -e "${BLUE}Routes: $ROUTES${NC}"

# Check for required directories
if [ ! -d "$WORKER_DIR" ]; then
  echo -e "${RED}Error: Worker directory $WORKER_DIR not found${NC}"
  exit 1
fi

# Navigate to worker directory
cd "$WORKER_DIR"

# Update wrangler.toml configuration
echo -e "${BLUE}Updating wrangler.toml configuration...${NC}"
cat > wrangler.toml << EOF
name = "$NAME"
main = "src/simple-worker.js"
compatibility_date = "2025-05-01"
account_id = "$ACCOUNT_ID"
workers_dev = true

# Enable custom domain routes
routes = [
  { pattern = "$ROUTES", zone_id = "$ZONE_ID" }
]

[vars]
ENVIRONMENT = "$ENVIRONMENT"
CLOUDINARY_CLOUD_NAME = "9bitstudios"

# Enable worker logs for debugging
[observability.logs]
enabled = true

[env.$ENVIRONMENT]
name = "$NAME"
# Custom domains for the environment
routes = [
  { pattern = "$ROUTES", zone_id = "$ZONE_ID" }
]
workers_dev = true
vars = { ENVIRONMENT = "$ENVIRONMENT", CLOUDINARY_CLOUD_NAME = "9bitstudios" }
EOF

echo -e "${GREEN}✅ wrangler.toml updated${NC}"

# Set up Cloudinary API secrets
if [[ -z "${CLOUDINARY_API_KEY}" ]]; then
  echo -e "${YELLOW}WARNING: CLOUDINARY_API_KEY is not set in the environment${NC}"
  echo "Some design system assets may not be accessible"
  echo "Set this environment variable before deployment for full functionality"
  echo
else
  echo -e "${BLUE}Setting Cloudinary API key...${NC}"
  wrangler secret put CLOUDINARY_API_KEY --env $ENVIRONMENT --name "$NAME"
fi

if [[ -z "${CLOUDINARY_API_SECRET}" ]]; then
  echo -e "${YELLOW}WARNING: CLOUDINARY_API_SECRET is not set in the environment${NC}"
  echo "Some design system assets may not be accessible"
  echo "Set this environment variable before deployment for full functionality"
  echo
else
  echo -e "${BLUE}Setting Cloudinary API secret...${NC}"
  wrangler secret put CLOUDINARY_API_SECRET --env $ENVIRONMENT --name "$NAME"
fi

# Deploy the worker
echo -e "${BLUE}Deploying to Cloudflare...${NC}"
wrangler deploy --env $ENVIRONMENT

# Check deployment status
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Deployment successful!${NC}"
  
  # Get the deployed URL
  WORKER_URL="https://$ROUTES"
  echo -e "${GREEN}Worker deployed to: $WORKER_URL${NC}"
  
  # Test the deployment
  echo -e "${BLUE}Testing deployment...${NC}"
  
  # Test health endpoint
  echo -e "${BLUE}Testing health endpoint...${NC}"
  curl -s "$WORKER_URL/health" | jq .
  
  # Test design system endpoint
  echo -e "${BLUE}Testing design system endpoint...${NC}"
  curl -s "$WORKER_URL/design-system/tokens?state=transitional" | jq '._meta'
  
  echo -e "${GREEN}✅ Deployment and testing complete!${NC}"
  echo -e "${BLUE}Next steps:${NC}"
  echo "1. Sync design system with Framer using:"
  echo "   cd ${WORKER_DIR}/scripts && ./framer-sync.sh -p ./framer-test -e $ENVIRONMENT"
  echo ""
  echo "2. Import design tokens into Framer"
  echo ""
  echo "3. Test components in Framer"
else
  echo -e "${RED}❌ Deployment failed. Please check the error messages above.${NC}"
  exit 1
fi

# Create/update ACTIVE.md
ACTIVE_MD_PATH="../ACTIVE.md"
if [ -f "$ACTIVE_MD_PATH" ]; then
  echo -e "${BLUE}Updating ACTIVE.md with latest deployment status...${NC}"
  
  # Extract just the version line using sed
  VERSION_LINE=$(sed -n 's/.*Version | Date.*/&/p' "$ACTIVE_MD_PATH")
  CURRENT_DATE=$(date +"%B %d, %Y")
  
  # Update timestamp in ACTIVE.md
  sed -i '' "s/\*\*Last Updated:\*\*.*/\*\*Last Updated:\*\* $CURRENT_DATE/g" "$ACTIVE_MD_PATH"
  
  # Update environment in ACTIVE.md
  sed -i '' "s/\*\*Environment:\*\*.*/\*\*Environment:\*\* ${ENVIRONMENT^}/g" "$ACTIVE_MD_PATH"
  
  echo -e "${GREEN}✅ ACTIVE.md updated${NC}"
fi

echo -e "${GREEN}✅ Enhanced deployment completed successfully!${NC}"