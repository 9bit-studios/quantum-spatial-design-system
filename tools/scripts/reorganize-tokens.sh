#!/bin/bash

# ===================================================================
# Quantum Spatial Token Reorganization Script
# ===================================================================
# Safely reorganizes token directory structure
# Version: 1.0
# Date: 2025-11-18
# ===================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Quantum Spatial Token Reorganization Script v1.0        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DESIGN_SYSTEM_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"
TOKENS_DIR="$DESIGN_SYSTEM_DIR/tokens"

echo -e "${YELLOW}📍 Working directory: $DESIGN_SYSTEM_DIR${NC}"
echo ""

# Confirmation prompt
read -p "$(echo -e ${YELLOW}⚠️  This will reorganize your token directory. Continue? [y/N]: ${NC})" -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo -e "${RED}❌ Cancelled by user${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🚀 Starting token reorganization...${NC}"
echo ""

# ===================================================================
# STEP 1: Create New Directory Structure
# ===================================================================

echo -e "${BLUE}[1/7] Creating new directory structure...${NC}"

mkdir -p "$TOKENS_DIR/source/brand"
mkdir -p "$TOKENS_DIR/source/core"
mkdir -p "$TOKENS_DIR/source/themes"
mkdir -p "$TOKENS_DIR/exports/css"
mkdir -p "$TOKENS_DIR/exports/scss"
mkdir -p "$TOKENS_DIR/exports/json"
mkdir -p "$TOKENS_DIR/exports/js"
mkdir -p "$TOKENS_DIR/exports/ts"
mkdir -p "$TOKENS_DIR/exports/figma"
mkdir -p "$TOKENS_DIR/exports/swift"
mkdir -p "$TOKENS_DIR/docs"

echo -e "${GREEN}✓ Directory structure created${NC}"
echo ""

# ===================================================================
# STEP 2: Move TypeScript Source Files
# ===================================================================

echo -e "${BLUE}[2/7] Moving TypeScript source files...${NC}"

# Move brand TypeScript files (excluding .d.ts)
if [ -d "$TOKENS_DIR/brand" ]; then
    for file in "$TOKENS_DIR/brand"/*.ts; do
        if [[ -f "$file" && ! "$file" =~ \.d\.ts$ ]]; then
            filename=$(basename "$file")
            if [ ! -f "$TOKENS_DIR/source/brand/$filename" ]; then
                mv "$file" "$TOKENS_DIR/source/brand/"
                echo -e "  ${GREEN}✓${NC} Moved $filename to source/brand/"
            fi
        fi
    done
fi

# Move core TypeScript files
if [ -d "$TOKENS_DIR/core" ]; then
    for file in "$TOKENS_DIR/core"/*.ts; do
        if [[ -f "$file" && ! "$file" =~ \.d\.ts$ ]]; then
            filename=$(basename "$file")
            if [ ! -f "$TOKENS_DIR/source/core/$filename" ]; then
                mv "$file" "$TOKENS_DIR/source/core/"
                echo -e "  ${GREEN}✓${NC} Moved $filename to source/core/"
            fi
        fi
    done
fi

# Move theme TypeScript files
if [ -d "$TOKENS_DIR/themes" ]; then
    for file in "$TOKENS_DIR/themes"/*.ts; do
        if [[ -f "$file" && ! "$file" =~ \.d\.ts$ ]]; then
            filename=$(basename "$file")
            if [ ! -f "$TOKENS_DIR/source/themes/$filename" ]; then
                mv "$file" "$TOKENS_DIR/source/themes/"
                echo -e "  ${GREEN}✓${NC} Moved $filename to source/themes/"
            fi
        fi
    done
fi

echo -e "${GREEN}✓ TypeScript source files moved${NC}"
echo ""

# ===================================================================
# STEP 3: Move CSS/SCSS Files
# ===================================================================

echo -e "${BLUE}[3/7] Moving CSS/SCSS files...${NC}"

# Move CSS files to source/brand
if [ -d "$TOKENS_DIR/brand" ]; then
    for file in "$TOKENS_DIR/brand"/*.css; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            if [ ! -f "$TOKENS_DIR/source/brand/$filename" ]; then
                mv "$file" "$TOKENS_DIR/source/brand/"
                echo -e "  ${GREEN}✓${NC} Moved $filename to source/brand/"
            fi
        fi
    done
fi

# Move SCSS files to source/brand
if [ -d "$TOKENS_DIR/brand" ]; then
    for file in "$TOKENS_DIR/brand"/*.scss; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            if [ ! -f "$TOKENS_DIR/source/brand/$filename" ]; then
                mv "$file" "$TOKENS_DIR/source/brand/"
                echo -e "  ${GREEN}✓${NC} Moved $filename to source/brand/"
            fi
        fi
    done
fi

echo -e "${GREEN}✓ CSS/SCSS files moved${NC}"
echo ""

# ===================================================================
# STEP 4: Move Compiled TypeScript Definition Files
# ===================================================================

echo -e "${BLUE}[4/7] Moving compiled TypeScript definition files...${NC}"

# Move .d.ts files
find "$TOKENS_DIR" -name "*.d.ts" -type f 2>/dev/null | while read -r file; do
    filename=$(basename "$file")
    if [ ! -f "$TOKENS_DIR/exports/ts/$filename" ]; then
        mv "$file" "$TOKENS_DIR/exports/ts/"
        echo -e "  ${GREEN}✓${NC} Moved $filename to exports/ts/"
    fi
done

echo -e "${GREEN}✓ TypeScript definition files moved${NC}"
echo ""

# ===================================================================
# STEP 5: Clean Up Map Files
# ===================================================================

echo -e "${BLUE}[5/7] Cleaning up source map files...${NC}"

# Count map files
map_count=$(find "$TOKENS_DIR" -name "*.map" -type f 2>/dev/null | wc -l | tr -d ' ')

if [ "$map_count" -gt 0 ]; then
    echo -e "  ${YELLOW}Found $map_count source map files${NC}"
    read -p "$(echo -e ${YELLOW}  Delete all .map files? [y/N]: ${NC})" -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        find "$TOKENS_DIR" -name "*.map" -type f -delete
        echo -e "  ${GREEN}✓${NC} Source map files deleted"
    else
        echo -e "  ${YELLOW}⊘${NC} Keeping source map files"
    fi
else
    echo -e "  ${YELLOW}⊘${NC} No source map files found"
fi

echo ""

# ===================================================================
# STEP 6: Handle TSX Component Files
# ===================================================================

echo -e "${BLUE}[6/7] Handling TSX component files...${NC}"

tsx_count=$(find "$TOKENS_DIR/brand" -name "*.tsx" -type f 2>/dev/null | wc -l | tr -d ' ')

if [ "$tsx_count" -gt 0 ]; then
    echo -e "  ${YELLOW}Found $tsx_count TSX component files in tokens/brand/${NC}"
    echo -e "  ${YELLOW}TSX files are components, not tokens.${NC}"
    echo ""
    echo -e "  ${YELLOW}Options:${NC}"
    echo -e "  ${YELLOW}  1) Move to components/token-preview-components/${NC}"
    echo -e "  ${YELLOW}  2) Move to integrations/framer/components/${NC}"
    echo -e "  ${YELLOW}  3) Keep in tokens/source/brand/ (not recommended)${NC}"
    echo -e "  ${YELLOW}  4) Skip (decide later)${NC}"
    echo ""
    read -p "$(echo -e ${YELLOW}  Choose option [1-4]: ${NC})" -n 1 -r
    echo
    case $REPLY in
        1)
            mkdir -p "$DESIGN_SYSTEM_DIR/components/token-preview-components"
            find "$TOKENS_DIR/brand" -name "*.tsx" -type f -exec mv {} "$DESIGN_SYSTEM_DIR/components/token-preview-components/" \;
            echo -e "  ${GREEN}✓${NC} TSX files moved to components/token-preview-components/"
            ;;
        2)
            mkdir -p "$DESIGN_SYSTEM_DIR/integrations/framer/components"
            find "$TOKENS_DIR/brand" -name "*.tsx" -type f -exec mv {} "$DESIGN_SYSTEM_DIR/integrations/framer/components/" \;
            echo -e "  ${GREEN}✓${NC} TSX files moved to integrations/framer/components/"
            ;;
        3)
            find "$TOKENS_DIR/brand" -name "*.tsx" -type f -exec mv {} "$TOKENS_DIR/source/brand/" \;
            echo -e "  ${YELLOW}⊘${NC} TSX files kept in tokens/source/brand/ (not recommended)"
            ;;
        *)
            echo -e "  ${YELLOW}⊘${NC} Skipped TSX file handling"
            ;;
    esac
else
    echo -e "  ${YELLOW}⊘${NC} No TSX files found"
fi

echo ""

# ===================================================================
# STEP 7: Clean Up Empty Directories
# ===================================================================

echo -e "${BLUE}[7/7] Cleaning up empty directories...${NC}"

# Remove empty directories
find "$TOKENS_DIR" -type d -empty -delete 2>/dev/null || true

echo -e "${GREEN}✓ Empty directories cleaned${NC}"
echo ""

# ===================================================================
# Summary
# ===================================================================

echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✅ Token Reorganization Complete!                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}📊 New Structure:${NC}"
echo ""
echo -e "  tokens/"
echo -e "  ├── source/           ${GREEN}← Human-authored source files${NC}"
echo -e "  │   ├── brand/"
echo -e "  │   ├── core/"
echo -e "  │   └── themes/"
echo -e "  └── exports/          ${GREEN}← Generated/compiled tokens${NC}"
echo -e "      ├── css/"
echo -e "      ├── json/"
echo -e "      └── ts/"
echo ""

echo -e "${YELLOW}📋 Next Steps:${NC}"
echo ""
echo -e "  1. Review the new structure: ${BLUE}cd $TOKENS_DIR${NC}"
echo -e "  2. Build token exports: ${BLUE}npm run build:tokens${NC}"
echo -e "  3. Update imports in components"
echo -e "  4. Test the design system"
echo ""

echo -e "${GREEN}🎉 All done!${NC}"
