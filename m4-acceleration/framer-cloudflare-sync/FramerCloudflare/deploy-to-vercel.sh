#!/bin/bash
# Modified version of the enhanced Vercel deployment script
# This script automatically deploys to Vercel without requiring interaction

# Configuration
PROJECT_DIR="/Users/pennyplatt//oksana-creator-portal"
PROJECT_NAME="oksana-creator-portal"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}9Bit Studios Vercel Deployment (Non-Interactive)${NC}"
echo "---------------------------------------------------"

# Check if VERCEL_TOKEN exists in keychain
if security find-generic-password -s "vercel-cli-token" 2>&1 >/dev/null; then
  echo -e "${BLUE}Found token in keychain, retrieving...${NC}"
  export VERCEL_TOKEN=$(security find-generic-password -s "vercel-cli-token" -w)
  echo -e "${GREEN}Token loaded from keychain.${NC}"
else
  echo -e "${RED}Vercel token not found in keychain.${NC}"
  echo -e "${YELLOW}Please run: security add-generic-password -s \"vercel-cli-token\" -a \"$USER\" -w \"your-token\"${NC}"
  exit 1
fi

# Check that Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
  npm install -g vercel
  echo -e "${GREEN}Vercel CLI installed.${NC}"
fi

# Deploy to Vercel
echo -e "${BLUE}Deploying to Vercel...${NC}"
cd "$PROJECT_DIR" || { echo "Project directory not found"; exit 1; }

# Run deployment with Vercel
vercel --token "$VERCEL_TOKEN" --yes --prod

echo -e "${GREEN}Deployment complete.${NC}"