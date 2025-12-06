#!/bin/bash

# ===================================================================
# Asset Pipeline Setup Script
# ===================================================================
# Creates the asset pipeline directory structure for Figma/Framer workflow
# Version: 1.0
# Date: 2025-11-18
# ===================================================================

set -e  # Exit on error

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Asset Pipeline Setup Script v1.0                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Get directories
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DESIGN_SYSTEM_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"

echo -e "${YELLOW}📍 Setting up asset pipeline in: $DESIGN_SYSTEM_DIR${NC}"
echo ""

# ===================================================================
# Create Asset Pipeline Structure
# ===================================================================

echo -e "${BLUE}[1/3] Creating asset pipeline directories...${NC}"

# Asset Review Queue
mkdir -p "$DESIGN_SYSTEM_DIR/asset-pipeline/asset-review-queue/figma/components"
mkdir -p "$DESIGN_SYSTEM_DIR/asset-pipeline/asset-review-queue/figma/icons"
mkdir -p "$DESIGN_SYSTEM_DIR/asset-pipeline/asset-review-queue/figma/illustrations"
mkdir -p "$DESIGN_SYSTEM_DIR/asset-pipeline/asset-review-queue/framer/components"
mkdir -p "$DESIGN_SYSTEM_DIR/asset-pipeline/asset-review-queue/framer/prototypes"
mkdir -p "$DESIGN_SYSTEM_DIR/asset-pipeline/asset-review-queue/design-tokens"

# Validated Assets
mkdir -p "$DESIGN_SYSTEM_DIR/asset-pipeline/validated/figma"
mkdir -p "$DESIGN_SYSTEM_DIR/asset-pipeline/validated/framer"
mkdir -p "$DESIGN_SYSTEM_DIR/asset-pipeline/validated/tokens"

# Integration Scripts
mkdir -p "$DESIGN_SYSTEM_DIR/asset-pipeline/integration/figma-to-tokens"
mkdir -p "$DESIGN_SYSTEM_DIR/asset-pipeline/integration/framer-to-components"
mkdir -p "$DESIGN_SYSTEM_DIR/asset-pipeline/integration/validation-reports"

echo -e "${GREEN}✓ Asset pipeline directories created${NC}"
echo ""

# ===================================================================
# Create Integration Structures
# ===================================================================

echo -e "${BLUE}[2/3] Creating integration directories...${NC}"

# Figma Integration
mkdir -p "$DESIGN_SYSTEM_DIR/integrations/figma/plugins/turbo-variables"
mkdir -p "$DESIGN_SYSTEM_DIR/integrations/figma/exported-components/buttons"
mkdir -p "$DESIGN_SYSTEM_DIR/integrations/figma/exported-components/cards"
mkdir -p "$DESIGN_SYSTEM_DIR/integrations/figma/exported-components/layouts"
mkdir -p "$DESIGN_SYSTEM_DIR/integrations/figma/exported-components/icons"
mkdir -p "$DESIGN_SYSTEM_DIR/integrations/figma/styles"
mkdir -p "$DESIGN_SYSTEM_DIR/integrations/figma/sync"

# Framer Integration
mkdir -p "$DESIGN_SYSTEM_DIR/integrations/framer/components/quantum-buttons"
mkdir -p "$DESIGN_SYSTEM_DIR/integrations/framer/components/quantum-cards"
mkdir -p "$DESIGN_SYSTEM_DIR/integrations/framer/components/quantum-layouts"
mkdir -p "$DESIGN_SYSTEM_DIR/integrations/framer/code-overrides"
mkdir -p "$DESIGN_SYSTEM_DIR/integrations/framer/packages"
mkdir -p "$DESIGN_SYSTEM_DIR/integrations/framer/sync"

echo -e "${GREEN}✓ Integration directories created${NC}"
echo ""

# ===================================================================
# Create README Files
# ===================================================================

echo -e "${BLUE}[3/3] Creating documentation...${NC}"

# Asset Pipeline README
cat > "$DESIGN_SYSTEM_DIR/asset-pipeline/README.md" << 'EOF'
# Asset Pipeline

Workflow for validating and integrating design assets from Figma and Framer.

## Directory Structure

```
asset-pipeline/
├── asset-review-queue/    # Assets awaiting validation
│   ├── figma/             # Figma exports
│   ├── framer/            # Framer exports
│   └── design-tokens/     # Token candidates
├── validated/             # Approved assets ready for integration
│   ├── figma/
│   ├── framer/
│   └── tokens/
└── integration/           # Integration scripts and reports
    ├── figma-to-tokens/
    ├── framer-to-components/
    └── validation-reports/
```

## Workflow

### 1. Review Queue
New assets from Figma/Framer land in `asset-review-queue/`

**What goes here:**
- Raw Figma exports (.svg, .png, .fig)
- Framer component exports
- Design token candidates

### 2. Validation
Review each asset for:
- ✅ Apple HIG compliance
- ✅ Color accuracy (source of truth)
- ✅ Accessibility (WCAG 2.1 AA)
- ✅ Responsive design
- ✅ Performance optimization

### 3. Validated
Approved assets move to `validated/`

### 4. Integration
Scripts extract and integrate into design system:
- `figma-to-tokens/` - Extract colors, typography, spacing
- `framer-to-components/` - Extract React components
- `validation-reports/` - QA documentation

## Usage

### Add Assets to Review Queue

```bash
# From Figma
cp exported-component.svg asset-pipeline/asset-review-queue/figma/components/

# From Framer
cp MyComponent.tsx asset-pipeline/asset-review-queue/framer/components/
```

### Validate Assets

1. Open asset in review queue
2. Check against validation criteria
3. Document issues in validation-reports/
4. Fix issues or reject asset
5. Move approved assets to validated/

### Integrate Validated Assets

```bash
# Run integration script
npm run integrate:figma
npm run integrate:framer
```

## Integration with Design System

Once validated, assets move to:
- **Figma components** → `integrations/figma/exported-components/`
- **Framer components** → `integrations/framer/components/`
- **Design tokens** → `tokens/source/`

EOF

# Figma Integration README
cat > "$DESIGN_SYSTEM_DIR/integrations/figma/README.md" << 'EOF'
# Figma Integration

Integration point for Figma designs and the Quantum Spatial Design System.

## Directory Structure

```
integrations/figma/
├── plugins/               # Figma plugins
│   └── turbo-variables/   # Color unification plugin
├── exported-components/   # Validated Figma exports
├── styles/                # Figma style exports
└── sync/                  # Sync scripts
```

## Turbo Variables Plugin

Color unification plugin that:
- Scans Figma files for all colors
- Matches colors to source of truth tokens
- Batch replaces similar colors
- Unifies gradient variations

Location: `plugins/turbo-variables/`

## Workflow

1. **Export from Figma** → `asset-pipeline/asset-review-queue/figma/`
2. **Validate** → Check colors, HIG compliance
3. **Approve** → Move to `asset-pipeline/validated/figma/`
4. **Integrate** → Extract to `exported-components/`

## Sync Commands

```bash
# Import from Figma
npm run figma:import

# Export to Figma
npm run figma:export
```

EOF

# Framer Integration README
cat > "$DESIGN_SYSTEM_DIR/integrations/framer/README.md" << 'EOF'
# Framer Integration

Integration point for Framer prototypes and the Quantum Spatial Design System.

## Directory Structure

```
integrations/framer/
├── components/            # Validated Framer components
├── code-overrides/        # Framer code overrides
├── packages/              # NPM packages for Framer
└── sync/                  # Sync scripts
```

## Safety Protocol

⚠️ **READ-ONLY SOURCE:**
- Original Framer files remain in `asset-pipeline/asset-review-queue/framer/`
- DO NOT modify original Framer project files
- Extract validated components here ONLY

✅ **SAFE WORKFLOW:**
1. Review Framer component in asset-review-queue
2. Extract component logic
3. Create NEW file in integrations/framer/components/
4. Apply source of truth colors
5. Test independently
6. Move to components/ when validated

## Components

Validated Framer components with source of truth colors:
- Quantum Buttons
- Quantum Cards
- Quantum Layouts

## Sync Commands

```bash
# Import from Framer
npm run framer:import

# Export to Framer
npm run framer:export
```

EOF

echo -e "${GREEN}✓ Documentation created${NC}"
echo ""

# ===================================================================
# Summary
# ===================================================================

echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✅ Asset Pipeline Setup Complete!                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}📊 Created Structure:${NC}"
echo ""
echo -e "  asset-pipeline/"
echo -e "  ├── asset-review-queue/   ${GREEN}← New assets land here${NC}"
echo -e "  │   ├── figma/"
echo -e "  │   ├── framer/"
echo -e "  │   └── design-tokens/"
echo -e "  ├── validated/            ${GREEN}← Approved assets${NC}"
echo -e "  └── integration/          ${GREEN}← Integration scripts${NC}"
echo ""
echo -e "  integrations/"
echo -e "  ├── figma/                ${GREEN}← Figma sync & exports${NC}"
echo -e "  │   ├── plugins/"
echo -e "  │   ├── exported-components/"
echo -e "  │   └── sync/"
echo -e "  └── framer/               ${GREEN}← Framer components${NC}"
echo -e "      ├── components/"
echo -e "      ├── code-overrides/"
echo -e "      └── sync/"
echo ""

echo -e "${YELLOW}📋 Next Steps:${NC}"
echo ""
echo -e "  1. Move Figma exports to: ${BLUE}asset-pipeline/asset-review-queue/figma/${NC}"
echo -e "  2. Move Framer exports to: ${BLUE}asset-pipeline/asset-review-queue/framer/${NC}"
echo -e "  3. Move Turbo Variables plugin to: ${BLUE}integrations/figma/plugins/turbo-variables/${NC}"
echo -e "  4. Create validation checklist"
echo -e "  5. Set up sync scripts"
echo ""

echo -e "${GREEN}🎉 Ready to manage design assets!${NC}"
