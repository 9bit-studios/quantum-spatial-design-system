#!/bin/bash
# Deploy standalone Quantum-Spatial Design System demo to Vercel

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
  npm install -g vercel
  echo -e "${GREEN}Vercel CLI installed.${NC}"
fi

# Create a temporary directory for the deployment
echo -e "${BLUE}Creating temporary project for demo deployment...${NC}"
TEMP_DIR=$(mktemp -d)
echo -e "Using temporary directory: $TEMP_DIR"

# Copy HTML demo file to the temp directory
cp "/Users/pennyplatt//quantum-spatial-design-demo.html" "$TEMP_DIR/index.html"

# Create a basic package.json for the demo
cat > "$TEMP_DIR/package.json" << EOF
{
  "name": "quantum-spatial-design-demo",
  "version": "1.0.0",
  "description": "Quantum-Spatial Design System Demo",
  "private": true,
  "scripts": {
    "start": "serve ."
  },
  "dependencies": {
    "serve": "^14.2.1"
  }
}
EOF

# Create a vercel.json configuration file
cat > "$TEMP_DIR/vercel.json" << EOF
{
  "version": 2,
  "name": "quantum-spatial-design-demo",
  "builds": [
    { "src": "index.html", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
EOF

# Navigate to the temporary directory
cd "$TEMP_DIR"

# Deploy to Vercel
echo -e "${BLUE}Deploying to Vercel...${NC}"
vercel --confirm --name quantum-spatial-design-demo

echo -e "${GREEN}Deployment complete!${NC}"
echo -e "${YELLOW}You can access your Quantum-Spatial Design System demo at the URL above.${NC}"
echo -e "${YELLOW}Note: This is a standalone demo without database dependencies.${NC}"