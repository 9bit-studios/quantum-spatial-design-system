# Quick Start: Claude Agent SDK Integration

## Installation (One-Time Setup)

### Step 1: Install Claude Agent SDK

```bash
cd ~/Documents/9BitStudios/Oksana
npm install @anthropic-ai/claude-agent-sdk
```

### Step 2: Verify Installation

```bash
tsx validation/enhanced-apple-native-init.ts
```

Expected output should include:
```
🤖 Claude Agent Coordinator: Enabled
  ✅ Agent Coordinator initialized with 3 agents
    • frontend-design
    • technical-development
    • brand-intelligence
```

## Configuration (Optional)

### Environment Variables

Create or update `.env.local`:

```bash
# Claude Agent Coordinator (default: enabled)
CLAUDE_AGENT_COORDINATOR_ENABLED=true

# Apple HIG Validator
APPLE_HIG_VALIDATOR_ENABLED=true
APPLE_HIG_MINIMUM_SCORE=95
APPLE_HIG_STRICT_MODE=true
APPLE_HIG_ZERO_TOLERANCE=false
```

## Usage

### Basic Initialization

```typescript
import UnifiedAppleIntelligenceFrameworks from './validation/enhanced-apple-native-init';
    
const frameworks = new UnifiedAppleIntelligenceFrameworks();
const result = await frameworks.initialize();

console.log(result.agentCoordinator);  // Agent status
console.log(result.environmentValidation);  // Validation results
```

### Command Line

```bash
# Run initialization
tsx validation/enhanced-apple-native-init.ts

# Or with ts-node
ts-node validation/enhanced-apple-native-init.ts
```

## What Gets Validated

The system automatically validates:

1. ✅ **Dependencies**: All required npm packages
2. ✅ **TypeScript**: Configuration and type definitions
3. ✅ **Node Modules**: Workspace strategy
4. ✅ **API Authentication**: Anthropic, Notion, Shopify, Vercel
5. ✅ **Bridge Health**: Swift-TypeScript bridges
6. ✅ **Environment Security**: File permissions and .gitignore
7. ✅ **Claude Agents**: Multi-agent coordinator initialization

## Multi-Agent Coordinator

### Available Agents

1. **Frontend Design Specialist**
   - SwiftUI & React components
   - Apple HIG compliance
   - Quantum-Spatial design system
   - Shopify Liquid themes

2. **Technical Development Specialist**
   - Full-stack TypeScript/Swift
   - Shopify GraphQL integration
   - M4 Neural Engine optimization
   - API architecture

3. **Brand Intelligence Specialist**
   - Brand strategy & content
   - Petersen Games expertise
   - 9Bit Studios aesthetic
   - Tone validation

### Task Coordination

Agents are automatically selected based on task keywords:
- `design`, `ui`, `component` → Frontend Design
- `api`, `integration`, `backend` → Technical Development
- `brand`, `content`, `copy` → Brand Intelligence

## Reports Generated

### 1. Validation Report
**Location**: `validation-report.json`
**Contains**: Environment validation results

### 2. Frameworks Report
**Location**: `validation/unified-frameworks-typescript-max-account-hig-agents-report.json`
**Contains**: Complete system status including agent coordination

## Troubleshooting

### Issue: Claude Agent SDK not found

**Solution**:
```bash
npm install @anthropic-ai/claude-agent-sdk
```

### Issue: Validation failures

**Solution**:
1. Review `validation-report.json`
2. Fix reported issues
3. Re-run initialization

### Issue: Agent initialization fails

**Solution**:
1. Ensure Claude Agent SDK is installed
2. Check API key in `.env.quantum-secure`
3. Verify network connectivity

## Next Steps

1. ✅ Install Claude Agent SDK
2. ✅ Run initialization
3. ✅ Review validation reports
4. ⬜ Configure CLAUDE.md for project context
5. ⬜ Test multi-agent workflows
6. ⬜ Implement agent-specific tools

## Resources

- **Integration Summary**: `validation/INTEGRATION-SUMMARY.md`
- **Strategic Analysis**: `foundation/creative-queue/Strategic-Analysis-Multi-Agent-SDK-Architecture.md`
- **Environment Validator**: `validation/unified-environment-validator.ts`

## Support

For detailed documentation, see:
- `INTEGRATION-SUMMARY.md` - Complete integration details
- `Strategic-Analysis-Multi-Agent-SDK-Architecture.md` - Agent architecture

---

**Version**: 2.1.0
**Last Updated**: October 22, 2025
