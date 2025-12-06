#!/bin/bash
# Quantum-Spatial Design System - Framer Sync Script
# This script extracts design tokens and syncs them to Framer

# Set error handling
set -e

# Print colored output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR=$(dirname "$0")
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo -e "${BLUE}Quantum-Spatial Design System - Framer Sync${NC}"
echo -e "${BLUE}==============================================${NC}"

# Check for required tools
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is required but not installed.${NC}"
    exit 1
fi

# Check for .env file
if [ ! -f "$PROJECT_ROOT/.env" ]; then
    echo -e "${RED}Warning: .env file not found. Creating from example...${NC}"
    
    if [ -f "$SCRIPT_DIR/.env.example" ]; then
        cp "$SCRIPT_DIR/.env.example" "$PROJECT_ROOT/.env"
        echo -e "${BLUE}Created .env file from example. Please edit with your Framer API credentials.${NC}"
        exit 1
    else
        echo -e "${RED}Error: .env.example file not found. Please create a .env file with your Framer API credentials.${NC}"
        exit 1
    fi
fi

# Install required packages if not already installed
echo -e "${BLUE}Checking required npm packages...${NC}"
if ! npm list --depth=0 --prefix "$PROJECT_ROOT" | grep -q sass; then
    echo -e "${BLUE}Installing required packages...${NC}"
    npm install --prefix "$PROJECT_ROOT" sass node-fetch dotenv
fi

# Extract design tokens
echo -e "${BLUE}Extracting design tokens...${NC}"
node "$SCRIPT_DIR/extract-design-tokens.js"

# Ask if user wants to sync with Framer
read -p "Do you want to sync tokens with Framer? (y/n): " SYNC_CHOICE

if [[ $SYNC_CHOICE =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Syncing tokens with Framer API...${NC}"
    node "$SCRIPT_DIR/sync-framer-tokens.js"
    echo -e "${GREEN}✓ Complete! Tokens have been extracted and synced with Framer.${NC}"
else
    echo -e "${GREEN}✓ Complete! Tokens have been extracted. Run 'node scripts/sync-framer-tokens.js' to sync with Framer.${NC}"
fi