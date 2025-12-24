#!/bin/bash
# 9Bit Studios Vercel Deployment Automation
# This script automates the deployment of your Oksana Creator Portal Accelerator to Vercel

# Configuration
PROJECT_DIR="/Users/pennyplatt//oksana-creator-portal"
GITHUB_REPO="9-bit-studios/oksana-creator-portal"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if VERCEL_TOKEN exists
check_token() {
  if [ -z "$VERCEL_TOKEN" ]; then
    echo -e "${YELLOW}Vercel token not found in environment.${NC}"
    
    # Check if token exists in keychain
    if security find-generic-password -s "vercel-cli-token" 2>&1 >/dev/null; then
      echo -e "${BLUE}Found token in keychain, retrieving...${NC}"
      export VERCEL_TOKEN=$(security find-generic-password -s "vercel-cli-token" -w)
      echo -e "${GREEN}Token loaded from keychain.${NC}"
    else
      echo -e "${YELLOW}Please create a Vercel token at https://vercel.com/account/tokens${NC}"
      echo -e "${YELLOW}Then run: security add-generic-password -s \"vercel-cli-token\" -a \"$USER\" -w \"your-token\"${NC}"
      echo "Or set it temporarily with: export VERCEL_TOKEN=your-token"
      exit 1
    fi
  fi
}

# Function to ensure vercel CLI is installed
check_vercel_cli() {
  if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
    echo -e "${GREEN}Vercel CLI installed.${NC}"
  fi
}

# Function to deploy to Vercel
deploy() {
  echo -e "${BLUE}Deploying to Vercel...${NC}"
  cd "$PROJECT_DIR" || { echo "Project directory not found"; exit 1; }
  
  vercel --token "$VERCEL_TOKEN" --prod
  
  echo -e "${GREEN}Deployment complete.${NC}"
}

# Setup GitHub Actions (optional)
setup_github_actions() {
  echo -e "${BLUE}Setting up GitHub Actions for automated deployments...${NC}"
  
  # Create GitHub Actions directory if it doesn't exist
  mkdir -p "$PROJECT_DIR/.github/workflows"
  
  # Create workflow file
  cat > "$PROJECT_DIR/.github/workflows/vercel-deploy.yml" << EOF
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install Vercel CLI
        run: npm install -g vercel
        
      - name: Deploy to Vercel
        run: vercel --token \${{ secrets.VERCEL_TOKEN }} --prod
        env:
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}
EOF

  echo -e "${GREEN}GitHub Actions workflow created at .github/workflows/vercel-deploy.yml${NC}"
  echo -e "${YELLOW}You'll need to add these secrets to your GitHub repository:${NC}"
  echo -e "  - VERCEL_TOKEN"
  echo -e "  - VERCEL_ORG_ID"
  echo -e "  - VERCEL_PROJECT_ID"
  
  # Get the IDs for the user
  echo -e "${BLUE}Getting your Vercel project information...${NC}"
  vercel --token "$VERCEL_TOKEN" inspect | grep -E "orgId|projectId"
}

# Main script
echo -e "${BLUE}9Bit Studios Vercel Deployment Automation${NC}"
echo "-------------------------------------------"

# Run prerequisite checks
check_vercel_cli
check_token

# Main menu
echo "Select an option:"
echo "1) Deploy to Vercel"
echo "2) Setup GitHub Actions for automated deployments"
echo "3) Exit"
read -p "Option: " option

case $option in
  1)
    deploy
    ;;
  2)
    setup_github_actions
    ;;
  3)
    echo "Exiting..."
    exit 0
    ;;
  *)
    echo "Invalid option. Exiting."
    exit 1
    ;;
esac

echo -e "${GREEN}Done!${NC}"