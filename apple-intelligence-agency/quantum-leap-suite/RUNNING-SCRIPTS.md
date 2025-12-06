# Running Quantum Leap Suite Scripts

## The Problem

Due to parent tsconfig path mappings in `/quantum-spatial/design-system/tsconfig.json`, running scripts with `npx tsx` directly causes module resolution errors. The tsx tool resolves paths relative to the parent directory instead of the quantum-leap-suite directory.

## The Solution

Use **absolute paths** with tsx, which bypasses the parent tsconfig pollution.

## Quick Start

### Method 1: Use the run.sh wrapper (RECOMMENDED)

```bash
./run.sh <script-name.ts>
```

Examples:
```bash
./run.sh list-skills.ts
./run.sh agents/agent-coordinator.ts
./run.sh AppleIntelligenceStrategicDirectorCoordinator.js
```

### Method 2: Use absolute paths directly

```bash
npx tsx /Users/pennyplatt/Documents/9BitStudios/Oksana/quantum-spatial/design-system/apple-intelligence-agency/quantum-leap-suite/<script-name.ts>
```

Example:
```bash
npx tsx /Users/pennyplatt/Documents/9BitStudios/Oksana/quantum-spatial/design-system/apple-intelligence-agency/quantum-leap-suite/list-skills.ts
```

### Method 3: Use node directly (for .js files)

```bash
node AppleIntelligenceStrategicDirectorCoordinator.js
```

## Available Scripts

### ✅ Working Scripts (No SDK Required)

- **list-skills.ts** - Lists all available skills in the suite
- **AppleIntelligenceStrategicDirectorCoordinator.js** - Main coordinator (fully operational!)

### ⚠️ Scripts Requiring Claude Agent SDK (Not Available)

These scripts were designed to use `@anthropic-ai/claude-agent-sdk` which is not currently installed:

- agents/agent-coordinator.ts
- agents/content-acceleration-workflow.ts
- agents/strategic-director-orchestrator.ts
- example-usage.ts
- agent-skill-registry.ts

## Testing the Coordinator

To test the Strategic Director Coordinator:

```bash
# Quick test (import only)
node test-coordinator-import.js

# Full initialization test
node test-coordinator-init.js
```

Expected output:
```
✅ INITIALIZATION SUCCESSFUL!
📊 Coordinator Status:
{
  "version": "2.0.0",
  "role": "EXECUTIVE_SUPERVISOR_AND_ADVISOR",
  "initialized": true,
  ...
  "frameworks": { "qaFramework": true, ... },
  "systems": { "m4NeuralEngine": true, ... }
}
```

## What Was Fixed

1. **Import paths in AppleIntelligenceStrategicDirectorCoordinator.js**:
   - Changed `../foundation-models/` → `../../../../foundation-models/`
   - Changed `../apple-intelligence/` → `../../../../apple-intelligence/`
   - Changed `./quantum-leap-suite/vision-pro-ui-kit/` → `../../../../strategic-director/`

2. **Added swiftPaths getter to UnifiedPathResolver**:
   - Provides backward compatibility for `sourcesOfTruth`, `foundation`, etc.

3. **Fixed SourcesOfTruthAuthenticator instantiation**:
   - Removed invalid config parameters

4. **Created run.sh wrapper**:
   - Uses absolute paths to bypass parent tsconfig issues
   - Works for all .ts and .js scripts in the suite

## Skills Available

Run `./run.sh list-skills.ts` to see all 11 available skills:

1. Agents
2. API Clients
3. **Brand Voice Validation** ✅ (with SKILL.md)
4. Config
5. **Design System Automation** ✅ (with SKILL.md)
6. Foundation Resources
7. **Hexecute Game** ✅ (with SKILL.md)
8. M4 Code Generator
9. **Strategic Planning** ✅ (with SKILL.md)
10. **SVG Generation** ✅ (with SKILL.md)
11. **Vision Pro UI Kit** ✅ (with SKILL.md)

## Next Steps

To use the Quantum Leap Suite:

1. **Review available skills**: `./run.sh list-skills.ts`
2. **Read skill documentation**: `cat <skill-directory>/SKILL.md`
3. **Use the coordinator**: Import and initialize `AppleIntelligenceStrategicDirectorCoordinator`
4. **Explore M4 workflows**: Check the skills with SKILL.md documentation

The coordinator is fully operational with:
- ✅ M4 Neural Engine (16 cores active)
- ✅ Validation frameworks (QA, Sources of Truth, Strategic Director)
- ✅ Foundation tools (Deployment, Framer, Vercel)
- ✅ Creative Intelligence MCP
- ✅ All systems ready for neural engine workflows

---

**Version**: 1.0.0
**Last Updated**: 2025-11-27
**Authority**: Apple Intelligence Strategic Director Framework
