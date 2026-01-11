#!/bin/bash
# Script to securely store your Vercel token in Mac's keychain

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}9Bit Studios Vercel Token Setup${NC}"
echo "---------------------------------------"
echo -e "${YELLOW}This script will store your Vercel token securely in your Mac's keychain.${NC}"
echo "You can create a token at: https://vercel.com/account/tokens"
echo ""

# Prompt for token
read -p "Enter your Vercel token: " VERCEL_TOKEN

# Store in keychain
if [ -n "$VERCEL_TOKEN" ]; then
  security add-generic-password -s "vercel-cli-token" -a "$USER" -w "$VERCEL_TOKEN"
  echo -e "${GREEN}Token successfully stored in keychain!${NC}"
  echo "You can now run ./deploy-vercel.sh"
else
  echo -e "${YELLOW}No token entered. Keychain not updated.${NC}"
  echo "Please run this script again when you have your token ready."
fi