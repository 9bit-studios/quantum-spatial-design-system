# Quantum Leap Suite - Usage Guide

**Status:** Integrated into Design System
**Location:** `/design-system/apple-intelligence-agency/quantum-leap-suite/`
**SDK Required:** No (for skill browsing)

---

## 🚀 Quick Start

### List Available Skills

```bash
# From quantum-leap-suite directory
./list-skills.sh
```

**Output:**
- 7 design & generation skills
- 4 support directories
- Documentation status for each skill

### View Skill Documentation

```bash
# View specific skill details
cat svg-generation/SKILL.md
cat vision-pro-ui-kit/SKILL.md
cat design-system-automation/SKILL.md
```

---

## 📚 Available Skills

### 1. SVG Generation
**Location:** `svg-generation/`
**Documentation:** `SKILL.md`
**Purpose:** Generate 45 quantum-spatial + heritage SVG components

### 2. Vision Pro UI Kit
**Location:** `vision-pro-ui-kit/`
**Documentation:** `SKILL.md`
**Purpose:** 40 spatial components for visionOS (20 primitives, 15 compositions, 5 experiences)

### 3. Design System Automation
**Location:** `design-system-automation/`
**Documentation:** `SKILL.md`
**Purpose:** Figma extraction, code generation, HIG validation

### 4. Hexecute Game
**Location:** `hexecute-game/`
**Documentation:** `SKILL.md`
**Purpose:** Metal rendering, quantum visual game development

### 5. Brand Voice Validation
**Location:** `brand-voice-validation/`
**Documentation:** `SKILL.md`
**Purpose:** Content tone analysis, brand consistency scoring (Petersen Games + 9Bit Studios)

### 6. Strategic Planning
**Location:** `strategic-planning/`
**Documentation:** `SKILL.md`
**Purpose:** Product roadmap generation, priority matrices

### 7. M4 Code Generator
**Location:** `m4-code-generator/`
**Documentation:** Not yet documented
**Purpose:** M4-optimized code generation

---

## 🔗 Integration with Design System

### Design Tokens
Skills reference tokens from:
```
../../tokens/source/brand/colors.ts
../../tokens/source/core/apple-hig.ts
```

### Component Output
Generated components go to:
```
../../components/
```

### Vision Pro Components
Spatial components go to:
```
../../m4-acceleration/vision-pro/
```

### Assets
SVG deliverables go to:
```
../../asset-pipeline/validated/
```

---

## 🛠️ Skill Execution Options

### Option 1: Pseudo-Skills (Current - No SDK)
- ✅ TypeScript implementations without API calls
- ✅ Fast local execution
- ✅ No Claude Agent SDK required
- ✅ No API costs

**Status:** Ready for implementation

### Option 2: With Claude Agent SDK (Future)
- Requires: `npm install @anthropic-ai/claude-agent-sdk`
- Requires: `ANTHROPIC_API_KEY` environment variable
- API-driven generation
- More sophisticated outputs

**Status:** Available but not required

---

## 🧠 Multi-Agent System

See `CLAUDE.md` for complete documentation on:
- **Strategic Director Agent** - Product design, validation, QA
- **Oksana Creative Agent** - Brand voice, content, copywriting
- **Figma Visual Agent** - Design-to-code automation, HIG compliance

**Configuration:** `config/agent-registry.json`

---

## 🎨 Vision Pro Assets

**Location:** `vision-pro-ui-kit/`

**Assets:**
- `Vision.heic` - Vision Pro interface previews
- `HerestoVision.heic` - Component showcase
- `QuantumVision.heic` - Quantum spatial examples

**To view:**
```bash
cd vision-pro-ui-kit
open Vision.heic
open HerestoVision.heic
open QuantumVision.heic
```

---

## ⚡ M4 Neural Engine Optimization

### Environment Variables

```bash
# M4 Optimization (optional)
export M4_STRATEGIC_INTELLIGENCE_PATHWAY=active
export M4_CREATIVE_INTELLIGENCE_PATHWAY=active
export M4_QUANTUM_SPATIAL_PATHWAY=active
```

### Performance Targets
- Design parsing: <2 seconds (M4-accelerated)
- Code generation: <30 seconds
- Token processing: <1 second
- Brand validation: <5 seconds

---

## 📝 Next Steps

1. **Explore Skills:** Run `./list-skills.sh` to see all available skills
2. **Read Documentation:** View `SKILL.md` files for detailed instructions
3. **Review Agent System:** Read `CLAUDE.md` for multi-agent architecture
4. **Integration Guide:** See `../integration.md` for design system integration
5. **Implement Pseudo-Skills:** (Optional) Create TypeScript implementations

---

## 🚦 Status

- ✅ Integrated into design system
- ✅ All skills documented (except m4-code-generator)
- ✅ No SDK required for browsing and documentation
- ✅ Ready for pseudo-skill implementation
- ✅ Vision Pro assets accessible
- ✅ M4 optimization ready

---

## 📚 Additional Documentation

- **Integration:** `../integration.md`
- **Multi-Agent System:** `CLAUDE.md`
- **Original README:** `README.quantum.md`
- **Individual Skills:** `<skill-directory>/SKILL.md`

---

© 2025 9Bit Studios
**Quantum Leap Suite Status:** OPERATIONAL (No SDK Required)
