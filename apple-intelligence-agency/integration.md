# Apple Intelligence Agency Integration

**Status:** Integrated into Design System
**Date:** 2025-11-18
**Location:** `/design-system/apple-intelligence-agency/`

---

## 🎯 Overview

The Apple Intelligence Agency provides multi-agent orchestration, M4 Neural Engine workflows, and design automation skills for the Quantum Spatial Design System.

## 📁 Structure

```
apple-intelligence-agency/
├── quantum-leap-suite/              # Design generation suite
│   ├── agents/                      # Multi-agent system
│   ├── api-clients/                 # API integrations
│   ├── brand-voice-validation/      # Brand consistency
│   ├── config/                      # Configuration files
│   ├── design-system-automation/    # Figma-to-code automation
│   ├── foundation-resources/        # Reusable resources
│   ├── hexecute-game/               # Game development skill
│   ├── m4-code-generator/           # M4-optimized code gen
│   ├── strategic-planning/          # Roadmap generation
│   ├── svg-generation/              # SVG component generation
│   └── vision-pro-ui-kit/           # Vision Pro components
│
├── agent-skill-registry.ts          # Skill execution framework
├── quantum-leap-orchestrator.ts     # Workflow orchestrator
├── AppleIntelligenceStrategicDirectorCoordinator.js
└── README.quantum.md                # Original documentation
```

## 🚀 Quick Start

### Using Quantum Leap Suite

```bash
cd apple-intelligence-agency/quantum-leap-suite

# Generate SVG components
npx tsx quantum-leap-orchestrator.ts --svg-only

# Generate Vision Pro UI Kit
npx tsx quantum-leap-orchestrator.ts --vision-pro-only

# Generate everything
npx tsx quantum-leap-orchestrator.ts --full-suite
```

### Using Individual Skills

```bash
# List available skills (No SDK required)
./list-skills.sh

# OR view skill documentation directly
cat svg-generation/SKILL.md
cat vision-pro-ui-kit/SKILL.md
```

**Note:** The `agent-skill-registry.ts` requires Claude Agent SDK installation. Use `list-skills.sh` for immediate, SDK-free skill browsing.

## 🔗 Integration Points

### With Design System

**Tokens:**
- Skills use design tokens from: `../tokens/source/brand/`
- Color system: `../tokens/source/brand/colors.ts`
- Typography: `../tokens/source/core/apple-hig.ts`

**Components:**
- Generated components go to: `../components/`
- Vision Pro components: `../m4-acceleration/vision-pro/`

**Assets:**
- SVG deliverables: `../asset-pipeline/validated/`
- Vision Pro assets: `../m4-acceleration/vision-pro/assets/`

### With M4 Acceleration

**Vision Pro UI Kit:**
- Source: `quantum-leap-suite/vision-pro-ui-kit/`
- Integration: `../m4-acceleration/vision-pro/`

**M4 Pathways:**
- Strategic Intelligence: Planning and validation
- Creative Intelligence: Brand voice and content
- Quantum Spatial: Visual design and generation

## 🛠️ Skills Overview

### Design-Focused Skills

1. **SVG Generation** - 45 quantum-spatial + heritage SVG components
2. **Vision Pro UI Kit** - 40 spatial components for visionOS
3. **Design System Automation** - Figma extraction, code generation
4. **Hexecute Game** - Metal rendering, quantum visuals
5. **Brand Voice Validation** - Content quality and tone
6. **Strategic Planning** - Product roadmaps and workflows

### Skill Execution Options

**Option 1: With Claude Agent SDK** (requires installation)
```bash
npm install @anthropic-ai/claude-agent-sdk
npx tsx agent-skill-registry.ts execute <skill> <task>
```

**Option 2: Pseudo-Skills** (no SDK required)
- Use TypeScript implementations directly
- No API calls
- Faster execution
- See: `../creative-services/` (if created)

## 📝 Configuration

### Environment Variables

```bash
# Optional - for Claude Agent SDK
export ANTHROPIC_API_KEY="your-key"

# M4 Optimization
export M4_STRATEGIC_INTELLIGENCE_PATHWAY=active
export M4_CREATIVE_INTELLIGENCE_PATHWAY=active
export M4_QUANTUM_SPATIAL_PATHWAY=active

# Optional - for deployments
export CLOUDINARY_CLOUD_NAME="your-cloud"
export CLOUDINARY_API_KEY="your-key"
export NOTION_API_KEY="your-notion-key"
```

### Agent Registry

Configuration: `quantum-leap-suite/config/agent-registry.json`

Defines:
- Available agents (strategic-director, oksana-creative, figma-visual)
- Agent capabilities and tools
- M4 pathway assignments
- Skill associations

## 🎨 Vision Pro Components

**Location:** `quantum-leap-suite/vision-pro-ui-kit/`

**Assets:**
- `Vision.heic` - Vision Pro interface previews
- `HerestoVision.heic` - Component showcase
- `QuantumVision.heic` - Quantum spatial examples

**Integration:**
```bash
# Copy to M4 acceleration
cp -r quantum-leap-suite/vision-pro-ui-kit/components/* \
      ../m4-acceleration/vision-pro/components/

# Copy assets
cp quantum-leap-suite/vision-pro-ui-kit/*.heic \
   ../m4-acceleration/vision-pro/assets/
```

## 🔧 Development

### Adding New Skills

1. Create skill directory in `quantum-leap-suite/`
2. Add `SKILL.md` documentation
3. Register in `config/agent-registry.json`
4. Add to `agent-skill-registry.ts`

### Testing Skills

```bash
# Test skill execution
npx tsx agent-skill-registry.ts execute <skill-name> "test task"

# Validate skill output
ls -la ../components/  # Check generated components
```

## 📚 Documentation

- **Quantum Leap Suite:** `README.quantum.md`
- **Agent System:** `CLAUDE.md`
- **Skills:** Individual `SKILL.md` files in each skill directory
- **Design System:** `../README.md`

## 🚦 Status

- ✅ Integrated into design system
- ✅ All files preserved
- ✅ Ready to use with or without SDK
- ✅ M4 optimization active

---

© 2025 9Bit Studios
**Integration Status:** COMPLETE
