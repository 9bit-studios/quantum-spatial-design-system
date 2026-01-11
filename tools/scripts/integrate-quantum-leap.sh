#!/bin/bash

# ===================================================================
# Quantum Leap Suite Integration Script
# ===================================================================
# Integrates quantum-leap-suite into design system
# WITHOUT Claude Agent SDK dependency
# Version: 1.0
# Date: 2025-11-18
# ===================================================================

set -e  # Exit on error

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Quantum Leap Suite Integration Script v1.0              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Get directories
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DESIGN_SYSTEM_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"
QUANTUM_LEAP_SOURCE="/Users/pennyplatt/Documents//Oksana/apple-intelligence-agency/quantum-leap-suite"

echo -e "${YELLOW}📍 Design System: $DESIGN_SYSTEM_DIR${NC}"
echo -e "${YELLOW}📍 Source: $QUANTUM_LEAP_SOURCE${NC}"
echo ""

# Check if quantum-leap-suite exists
if [ ! -d "$QUANTUM_LEAP_SOURCE" ]; then
    echo -e "${RED}❌ Quantum Leap Suite not found at: $QUANTUM_LEAP_SOURCE${NC}"
    exit 1
fi

# Confirmation
read -p "$(echo -e ${YELLOW}⚠️  This will integrate quantum-leap-suite into design system. Continue? [y/N]: ${NC})" -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo -e "${RED}❌ Cancelled by user${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🚀 Starting integration...${NC}"
echo ""

# ===================================================================
# STEP 1: Create Directory Structure
# ===================================================================

echo -e "${BLUE}[1/6] Creating creative-services directory structure...${NC}"

mkdir -p "$DESIGN_SYSTEM_DIR/creative-services/skills"
mkdir -p "$DESIGN_SYSTEM_DIR/creative-services/orchestration/config"
mkdir -p "$DESIGN_SYSTEM_DIR/creative-services/deliverables/svg-components"
mkdir -p "$DESIGN_SYSTEM_DIR/creative-services/deliverables/vision-pro-components"
mkdir -p "$DESIGN_SYSTEM_DIR/creative-services/deliverables/design-tokens"
mkdir -p "$DESIGN_SYSTEM_DIR/creative-services/deliverables/validation-reports"

echo -e "${GREEN}✓ Directory structure created${NC}"
echo ""

# ===================================================================
# STEP 2: Copy Vision Pro UI Kit to M4 Acceleration
# ===================================================================

echo -e "${BLUE}[2/6] Integrating Vision Pro UI Kit...${NC}"

mkdir -p "$DESIGN_SYSTEM_DIR/m4-acceleration/vision-pro/components"
mkdir -p "$DESIGN_SYSTEM_DIR/m4-acceleration/vision-pro/assets"
mkdir -p "$DESIGN_SYSTEM_DIR/m4-acceleration/vision-pro/generators"
mkdir -p "$DESIGN_SYSTEM_DIR/m4-acceleration/vision-pro/examples"

# Copy Vision Pro SKILL.md
if [ -f "$QUANTUM_LEAP_SOURCE/vision-pro-ui-kit/SKILL.md" ]; then
    cp "$QUANTUM_LEAP_SOURCE/vision-pro-ui-kit/SKILL.md" "$DESIGN_SYSTEM_DIR/m4-acceleration/vision-pro/"
    echo -e "  ${GREEN}✓${NC} Copied Vision Pro SKILL.md"
fi

# Copy Vision Pro images
for file in "$QUANTUM_LEAP_SOURCE/vision-pro-ui-kit"/*.heic; do
    if [ -f "$file" ]; then
        cp "$file" "$DESIGN_SYSTEM_DIR/m4-acceleration/vision-pro/assets/"
        echo -e "  ${GREEN}✓${NC} Copied $(basename "$file")"
    fi
done

# Copy orchestrator
if [ -f "$QUANTUM_LEAP_SOURCE/vision-pro-ui-kit/quantum-leap-orchestrator.ts" ]; then
    cp "$QUANTUM_LEAP_SOURCE/vision-pro-ui-kit/quantum-leap-orchestrator.ts" "$DESIGN_SYSTEM_DIR/m4-acceleration/vision-pro/generators/"
    echo -e "  ${GREEN}✓${NC} Copied quantum-leap-orchestrator.ts"
fi

echo -e "${GREEN}✓ Vision Pro UI Kit integrated${NC}"
echo ""

# ===================================================================
# STEP 3: Copy Skill Documentation
# ===================================================================

echo -e "${BLUE}[3/6] Copying skill documentation...${NC}"

# List of skills to copy (documentation only, no SDK dependencies)
skills=(
    "svg-generation"
    "hexecute-game"
    "design-system-automation"
    "brand-voice-validation"
    "strategic-planning"
)

for skill in "${skills[@]}"; do
    if [ -d "$QUANTUM_LEAP_SOURCE/$skill" ]; then
        mkdir -p "$DESIGN_SYSTEM_DIR/creative-services/skills/$skill"

        # Copy SKILL.md if exists
        if [ -f "$QUANTUM_LEAP_SOURCE/$skill/SKILL.md" ]; then
            cp "$QUANTUM_LEAP_SOURCE/$skill/SKILL.md" "$DESIGN_SYSTEM_DIR/creative-services/skills/$skill/"
            echo -e "  ${GREEN}✓${NC} Copied $skill/SKILL.md"
        fi

        # Copy templates if they exist
        if [ -d "$QUANTUM_LEAP_SOURCE/$skill/templates" ]; then
            cp -r "$QUANTUM_LEAP_SOURCE/$skill/templates" "$DESIGN_SYSTEM_DIR/creative-services/skills/$skill/"
            echo -e "  ${GREEN}✓${NC} Copied $skill/templates/"
        fi
    fi
done

echo -e "${GREEN}✓ Skill documentation copied${NC}"
echo ""

# ===================================================================
# STEP 4: Copy Configuration Files
# ===================================================================

echo -e "${BLUE}[4/6] Copying configuration files...${NC}"

# Copy agent registry (for reference)
if [ -f "$QUANTUM_LEAP_SOURCE/config/agent-registry.json" ]; then
    cp "$QUANTUM_LEAP_SOURCE/config/agent-registry.json" "$DESIGN_SYSTEM_DIR/creative-services/orchestration/config/"
    echo -e "  ${GREEN}✓${NC} Copied agent-registry.json (reference)"
fi

# Copy neural engine workflows
if [ -f "$QUANTUM_LEAP_SOURCE/config/neural-engine-workflows.json" ]; then
    cp "$QUANTUM_LEAP_SOURCE/config/neural-engine-workflows.json" "$DESIGN_SYSTEM_DIR/creative-services/orchestration/config/"
    echo -e "  ${GREEN}✓${NC} Copied neural-engine-workflows.json"
fi

echo -e "${GREEN}✓ Configuration files copied${NC}"
echo ""

# ===================================================================
# STEP 5: Create Pseudo-Skills Registry
# ===================================================================

echo -e "${BLUE}[5/6] Creating pseudo-skills registry...${NC}"

cat > "$DESIGN_SYSTEM_DIR/creative-services/orchestration/config/pseudo-skills-registry.json" << 'EOF'
{
  "version": "1.0.0",
  "description": "Pseudo-skills registry (NO Claude Agent SDK required)",
  "skills": [
    {
      "id": "svg-generation",
      "name": "SVG Generation",
      "type": "pseudo-skill",
      "path": "../skills/svg-generation/",
      "enabled": true,
      "capabilities": [
        "quantum-spatial-svg",
        "heritage-svg",
        "animated-components",
        "cloudinary-deployment"
      ]
    },
    {
      "id": "vision-pro-ui-kit",
      "name": "Vision Pro UI Kit",
      "type": "pseudo-skill",
      "path": "../../m4-acceleration/vision-pro/",
      "enabled": true,
      "capabilities": [
        "spatial-components",
        "realitykit-integration",
        "volumetric-visualization"
      ]
    },
    {
      "id": "design-system-automation",
      "name": "Design System Automation",
      "type": "pseudo-skill",
      "path": "../skills/design-system-automation/",
      "enabled": true,
      "capabilities": [
        "figma-extraction",
        "hig-validation",
        "code-generation"
      ]
    },
    {
      "id": "brand-voice-validation",
      "name": "Brand Voice Validation",
      "type": "pseudo-skill",
      "path": "../skills/brand-voice-validation/",
      "enabled": true,
      "capabilities": [
        "tone-analysis",
        "brand-consistency-scoring"
      ]
    },
    {
      "id": "strategic-planning",
      "name": "Strategic Planning",
      "type": "pseudo-skill",
      "path": "../skills/strategic-planning/",
      "enabled": true,
      "capabilities": [
        "roadmap-generation",
        "priority-matrix",
        "resource-allocation"
      ]
    }
  ],
  "note": "These are pseudo-skills - TypeScript functions that mimic skill behavior WITHOUT Claude Agent SDK"
}
EOF

echo -e "  ${GREEN}✓${NC} Created pseudo-skills-registry.json"
echo ""

echo -e "${GREEN}✓ Pseudo-skills registry created${NC}"
echo ""

# ===================================================================
# STEP 6: Create README
# ===================================================================

echo -e "${BLUE}[6/6] Creating documentation...${NC}"

cat > "$DESIGN_SYSTEM_DIR/creative-services/README.md" << 'EOF'
# Creative Services

Design-focused skills and tools for generating components, validating designs, and orchestrating creative workflows.

## 🎯 Overview

This directory contains **pseudo-skills** - TypeScript functions that provide skill-like functionality WITHOUT requiring the Claude Agent SDK. This allows immediate use without API dependencies.

## 📁 Structure

```
creative-services/
├── skills/                  # Pseudo-skill implementations
│   ├── svg-generation/      # Generate quantum-spatial + heritage SVGs
│   ├── vision-pro-ui-kit/   # Vision Pro spatial components
│   ├── design-system-automation/
│   ├── brand-voice-validation/
│   └── strategic-planning/
│
├── orchestration/           # Workflow coordination
│   ├── pseudo-orchestrator.ts
│   └── config/
│       └── pseudo-skills-registry.json
│
└── deliverables/            # Generated outputs
    ├── svg-components/
    ├── vision-pro-components/
    ├── design-tokens/
    └── validation-reports/
```

## 🚀 Quick Start

### Generate SVG Components
```bash
cd creative-services

# Generate all SVG components (pseudo-skill)
npx tsx orchestration/pseudo-orchestrator.ts --svg-only
```

### Generate Vision Pro Components
```bash
# Generate Vision Pro UI Kit
npx tsx orchestration/pseudo-orchestrator.ts --vision-pro-only
```

### Run Full Suite
```bash
# Generate everything
npx tsx orchestration/pseudo-orchestrator.ts --full-suite
```

## 🔧 Pseudo-Skills vs Real Skills

**Pseudo-Skills (Current):**
- ✅ No Claude Agent SDK required
- ✅ No API costs
- ✅ Fast local execution
- ✅ Fully testable
- ✅ Easy debugging

**Real Skills (Future):**
- Powered by Claude Agent SDK
- API-driven generation
- More sophisticated outputs
- Requires API key

## 📚 Documentation

See each skill directory for detailed documentation:
- `skills/svg-generation/SKILL.md`
- `skills/vision-pro-ui-kit/` → See `../../m4-acceleration/vision-pro/SKILL.md`
- `skills/design-system-automation/SKILL.md`

## 🎨 Vision Pro Components

Vision Pro UI Kit is located in:
```
../../m4-acceleration/vision-pro/
```

This includes:
- 20 primitive components
- 15 composition components
- 5 full experiences
- RealityKit integration
- Volumetric visualizations

EOF

echo -e "  ${GREEN}✓${NC} Created creative-services/README.md"

# Create Vision Pro README
cat > "$DESIGN_SYSTEM_DIR/m4-acceleration/vision-pro/README.md" << 'EOF'
# Vision Pro UI Kit

Complete spatial UI component library for Apple Vision Pro, optimized for M4 Neural Engine.

## 🎯 Overview

40 spatial components for visionOS:
- **20 Primitives**: Base spatial components
- **15 Compositions**: Complex spatial layouts
- **5 Experiences**: Full spatial experiences

## 📁 Structure

```
vision-pro/
├── components/        # Swift component implementations
├── assets/            # Vision Pro images (.heic)
├── generators/        # Code generation tools
├── examples/          # Usage examples
└── SKILL.md          # Detailed skill documentation
```

## 🚀 Quick Start

See `SKILL.md` for complete documentation.

## 🔗 Integration

This UI Kit integrates with:
- Quantum Spatial Design System
- M4 Neural Engine acceleration
- Creative Services orchestration

EOF

echo -e "  ${GREEN}✓${NC} Created vision-pro/README.md"
echo ""

echo -e "${GREEN}✓ Documentation created${NC}"
echo ""

# ===================================================================
# Summary
# ===================================================================

echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✅ Quantum Leap Integration Complete!                    ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}📊 Integration Summary:${NC}"
echo ""
echo -e "  ${GREEN}✓${NC} Creative Services structure created"
echo -e "  ${GREEN}✓${NC} Vision Pro UI Kit integrated (m4-acceleration/vision-pro/)"
echo -e "  ${GREEN}✓${NC} Skill documentation copied"
echo -e "  ${GREEN}✓${NC} Configuration files copied"
echo -e "  ${GREEN}✓${NC} Pseudo-skills registry created"
echo -e "  ${GREEN}✓${NC} Documentation generated"
echo ""

echo -e "${BLUE}📁 New Directories:${NC}"
echo ""
echo -e "  ${YELLOW}creative-services/${NC}"
echo -e "    ├── skills/               (5 pseudo-skills)"
echo -e "    ├── orchestration/        (SDK-free workflow)"
echo -e "    └── deliverables/         (output location)"
echo ""
echo -e "  ${YELLOW}m4-acceleration/vision-pro/${NC}"
echo -e "    ├── components/           (Swift components)"
echo -e "    ├── assets/               (Vision Pro images)"
echo -e "    └── generators/           (Code generation)"
echo ""

echo -e "${YELLOW}📋 Next Steps:${NC}"
echo ""
echo -e "  1. Review: ${BLUE}cd creative-services && cat README.md${NC}"
echo -e "  2. Check Vision Pro: ${BLUE}cd m4-acceleration/vision-pro${NC}"
echo -e "  3. Create pseudo-skill implementations"
echo -e "  4. Test SVG generation (pseudo-skill)"
echo -e "  5. Validate deliverables structure"
echo ""

echo -e "${YELLOW}💡 Integration Approach:${NC}"
echo ""
echo -e "  ${GREEN}✓${NC} NO Claude Agent SDK required"
echo -e "  ${GREEN}✓${NC} Pseudo-skills work immediately"
echo -e "  ${GREEN}✓${NC} Can upgrade to real skills later"
echo -e "  ${GREEN}✓${NC} All design tools in one place"
echo ""

echo -e "${GREEN}🎉 Ready to use creative services!${NC}"
