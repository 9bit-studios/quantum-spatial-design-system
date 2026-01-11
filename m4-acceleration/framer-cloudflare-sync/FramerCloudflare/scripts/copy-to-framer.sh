#!/bin/bash
# Copy Quantum-Spatial Design System components to a Framer project

# Set colors for output
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script usage
function show_usage {
  echo -e "${YELLOW}Usage:${NC} $0 [target_directory]"
  echo -e "  target_directory: The Framer project directory to copy files to"
  echo -e "${YELLOW}Example:${NC} $0 ~/framer-projects/my-project"
}

# Check if target directory is provided
if [ -z "$1" ]; then
  echo -e "${RED}Error:${NC} Target directory is required"
  show_usage
  exit 1
fi

TARGET_DIR="$1"

# Verify target directory exists
if [ ! -d "$TARGET_DIR" ]; then
  echo -e "${RED}Error:${NC} Target directory does not exist: $TARGET_DIR"
  exit 1
fi

# Source directories
SOURCE_DIR="/Users/pennyplatt//framer-project-test/design-system"
COMPONENTS_DIR="$SOURCE_DIR/components"
TOKENS_DIR="$SOURCE_DIR/tokens"

# Create target subdirectories
FRAMER_COMPONENTS_DIR="$TARGET_DIR/code"
mkdir -p "$FRAMER_COMPONENTS_DIR"

# Print header
echo -e "${BLUE}=====================================================${NC}"
echo -e "${BLUE} Quantum-Spatial Design System - Framer Import Tool ${NC}"
echo -e "${BLUE}=====================================================${NC}"
echo -e "${YELLOW}Source:${NC} $SOURCE_DIR"
echo -e "${YELLOW}Target:${NC} $TARGET_DIR"
echo

# Copy components
echo -e "${BLUE}Copying components...${NC}"

# Copy main components
cp "$COMPONENTS_DIR"/*.tsx "$FRAMER_COMPONENTS_DIR/"
cp "$COMPONENTS_DIR"/*.ts "$FRAMER_COMPONENTS_DIR/" 2>/dev/null || echo -e "${YELLOW}No .ts files to copy${NC}"
echo -e "${GREEN}✅ Core components copied${NC}"

# Copy tokens
echo -e "${BLUE}Copying design tokens...${NC}"
cp "$SOURCE_DIR/quantum-tokens.js" "$FRAMER_COMPONENTS_DIR/"
echo -e "${GREEN}✅ Design tokens copied${NC}"

# Copy demo component
echo -e "${BLUE}Copying demo component...${NC}"
cp "$SOURCE_DIR/QuantumDesignSystemDemo.jsx" "$FRAMER_COMPONENTS_DIR/"
echo -e "${GREEN}✅ Demo component copied${NC}"

# Success message
echo
echo -e "${GREEN}=====================================================${NC}"
echo -e "${GREEN} Quantum-Spatial Design System imported successfully! ${NC}"
echo -e "${GREEN}=====================================================${NC}"
echo
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Open your Framer project"
echo -e "2. In the Framer Code panel, you should see all the components"
echo -e "3. Drag the QuantumDesignSystemDemo component onto your canvas"
echo -e "4. Use the property controls to experiment with different states"
echo
echo -e "${YELLOW}Note:${NC} If you see any errors about missing dependencies, install 'framer-motion' in Framer's package manager"