#!/bin/bash

#
# Design System → Notion Registry Setup
# Adapted for: quantum-spatial-design-system repo
# Integrates with: Existing Notion Workspace Automation Orchestrator
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Configuration
REPO_PATH="/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system"
AUTOMATION_PATH="${REPO_PATH}/automation/siri-automation-orchestrator"
GITHUB_REMOTE="https://github.com/9bit-studios/quantum-spatial-design-system"

# Notion Database IDs (from your workspace mapping)
DESIGN_SYSTEM_DB_ID="2c39456fb22d8140acb7e6d55e8473d0}"  # Set this after database setup
AUTOMATION_ORCHESTRATOR_DB_ID="2c39456f-b22d-81e8-be17-e43cc52cb6bd"  # Siri Automation Orchestrator

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${PURPLE}🎯 Quantum-Spatial Design System → Notion Sync${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Helper functions
print_step() {
    echo -e "${BLUE}▸ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_action() {
    echo -e "${PURPLE}→ $1${NC}"
}

# Step 1: Verify repository
print_step "Step 1: Verifying quantum-spatial-design-system repository..."

if [ ! -d "$REPO_PATH" ]; then
    print_error "Repository not found at: $REPO_PATH"
    print_action "Please update REPO_PATH in this script or clone the repo first"
    exit 1
fi

cd "$REPO_PATH"

if [ ! -d ".git" ]; then
    print_error "Not a git repository: $REPO_PATH"
    exit 1
fi

# Check remote
CURRENT_REMOTE=$(git remote get-url origin 2>/dev/null || echo "none")
if [ "$CURRENT_REMOTE" = "none" ]; then
    print_warning "No remote configured. Setting up GitHub remote..."
    git remote add origin "$GITHUB_REMOTE"
    print_success "GitHub remote added"
elif [[ "$CURRENT_REMOTE" != *"quantum-spatial-design-system"* ]]; then
    print_warning "Unexpected remote: $CURRENT_REMOTE"
    print_action "Expected: $GITHUB_REMOTE"
fi

print_success "Repository verified: quantum-spatial-design-system"
echo ""

# Step 2: Check automation infrastructure
print_step "Step 2: Checking existing automation infrastructure..."

if [ -d "$AUTOMATION_PATH" ]; then
    print_success "Found existing automation: $AUTOMATION_PATH"
    
    # Check for orchestrator
    if [ -f "$AUTOMATION_PATH/notion-workspace-automation-orchestrator.js" ]; then
        print_success "Found Notion Workspace Automation Orchestrator"
    fi
    
    # Check for database mappings
    if [ -f "$AUTOMATION_PATH/config/updated-notion-database-mappings.json" ]; then
        print_success "Found database mappings configuration"
    fi
else
    print_warning "Automation directory not found, will create it"
    mkdir -p "$AUTOMATION_PATH/config"
    mkdir -p "$AUTOMATION_PATH/scripts"
fi

echo ""

# Step 3: Create Notion database schema file
print_step "Step 3: Creating Notion database schema..."

cat > "$AUTOMATION_PATH/config/design-system-registry-schema.json" << 'EOF'
{
  "database_name": "Design System Master Registry",
  "description": "Quantum-Spatial Design System component registry with automated GitHub sync",
  "properties": {
    "Component": {
      "type": "title",
      "description": "Component name (e.g., Button, Card, Modal)"
    },
    "Platforms": {
      "type": "multi_select",
      "options": [
        { "name": "React/TSX", "color": "blue" },
        { "name": "SwiftUI", "color": "purple" },
        { "name": "Shopify Liquid", "color": "green" },
        { "name": "Vision Pro", "color": "pink" },
        { "name": "HTML/CSS", "color": "gray" }
      ],
      "description": "Platforms where component is implemented"
    },
    "Category": {
      "type": "select",
      "options": [
        { "name": "Buttons", "color": "blue" },
        { "name": "Forms", "color": "green" },
        { "name": "Navigation", "color": "purple" },
        { "name": "Cards", "color": "pink" },
        { "name": "Overlays", "color": "orange" },
        { "name": "Typography", "color": "gray" },
        { "name": "Layout", "color": "brown" },
        { "name": "Data Display", "color": "red" },
        { "name": "Feedback", "color": "yellow" }
      ],
      "description": "Component category"
    },
    "Status": {
      "type": "select",
      "options": [
        { "name": "✅ Approved", "color": "green" },
        { "name": "🚧 Review", "color": "yellow" },
        { "name": "🔄 Draft", "color": "orange" },
        { "name": "🗑️ Deprecated", "color": "red" },
        { "name": "🎨 Design Only", "color": "purple" }
      ],
      "description": "Component approval status"
    },
    "GitHub - React": {
      "type": "url",
      "description": "Link to React/TSX component in GitHub"
    },
    "GitHub - Swift": {
      "type": "url",
      "description": "Link to SwiftUI component in GitHub"
    },
    "GitHub - Liquid": {
      "type": "url",
      "description": "Link to Shopify Liquid component in GitHub"
    },
    "Figma": {
      "type": "url",
      "description": "Link to Figma component design"
    },
    "Live Demo": {
      "type": "url",
      "description": "Link to interactive demo (Artifact or Vercel)"
    },
    "HIG Compliance": {
      "type": "select",
      "options": [
        { "name": "✅ Validated", "color": "green" },
        { "name": "⚠️ Warnings", "color": "yellow" },
        { "name": "❌ Fails", "color": "red" },
        { "name": "🔄 Pending", "color": "gray" }
      ],
      "description": "Apple Human Interface Guidelines validation status"
    },
    "Tokens Used": {
      "type": "multi_select",
      "description": "Design tokens referenced by this component"
    },
    "Last Synced": {
      "type": "date",
      "description": "Last sync from GitHub"
    },
    "Last Updated": {
      "type": "date",
      "description": "Last component modification date"
    },
    "M4 Optimized": {
      "type": "checkbox",
      "description": "Optimized for M4 Neural Engine"
    },
    "Vision Pro Ready": {
      "type": "checkbox",
      "description": "Compatible with Vision Pro spatial UI"
    },
    "Glassmorphism": {
      "type": "checkbox",
      "description": "Uses liquid glass effects"
    }
  },
  "views": [
    {
      "name": "All Components",
      "type": "table",
      "filter": null,
      "sort": { "property": "Component", "direction": "ascending" }
    },
    {
      "name": "By Platform",
      "type": "gallery",
      "group_by": "Platforms"
    },
    {
      "name": "By Category",
      "type": "table",
      "group_by": "Category"
    },
    {
      "name": "Needs Review",
      "type": "table",
      "filter": { "property": "Status", "select": { "equals": "🚧 Review" } }
    },
    {
      "name": "HIG Validated",
      "type": "table",
      "filter": { "property": "HIG Compliance", "select": { "equals": "✅ Validated" } }
    }
  ]
}
EOF

print_success "Created database schema: design-system-registry-schema.json"
echo ""

# Step 4: Create component sync script
print_step "Step 4: Creating component sync automation..."

cat > "$AUTOMATION_PATH/scripts/sync-components-to-notion.js" << 'SYNCSCRIPT'
#!/usr/bin/env node

/**
 * Quantum-Spatial Design System → Notion Sync
 * Integrates with existing Notion Workspace Automation Orchestrator
 * Syncs component changes from GitHub to Notion registry
 */

import { Client } from '@notionhq/client';
import chokidar from 'chokidar';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DESIGN_SYSTEM_DB_ID = process.env.DESIGN_SYSTEM_DB_ID;
const REPO_PATH = process.env.REPO_PATH || '/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system';
const GITHUB_BASE = 'https://github.com/9bit-studios/quantum-spatial-design-system/blob/main';

if (!NOTION_API_KEY || !DESIGN_SYSTEM_DB_ID) {
  console.error('❌ Missing required environment variables:');
  console.error('   - NOTION_API_KEY');
  console.error('   - DESIGN_SYSTEM_DB_ID');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_API_KEY });

// Component metadata extraction
async function extractComponentMetadata(filePath) {
  const code = await fs.readFile(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  const componentName = fileName.replace(/\.(tsx|swift|liquid|html|css)$/, '');
  
  // Extract usage example (first 20 lines or first component/function)
  const lines = code.split('\n');
  let snippet = '';
  let inExample = false;
  let exampleLines = [];
  
  for (let i = 0; i < Math.min(lines.length, 50); i++) {
    const line = lines[i];
    
    // Look for usage examples in comments
    if (line.includes('Usage:') || line.includes('Example:') || line.includes('@example')) {
      inExample = true;
      continue;
    }
    
    if (inExample && exampleLines.length < 15) {
      if (line.trim() === '' || line.includes('*/')) {
        break;
      }
      exampleLines.push(line);
    }
  }
  
  // If no example found, extract component interface
  if (exampleLines.length === 0) {
    exampleLines = lines.slice(0, 20);
  }
  
  snippet = exampleLines.join('\n');
  
  // Determine platform and category
  let platform = 'Unknown';
  let category = 'Unknown';
  
  if (filePath.endsWith('.tsx')) {
    platform = 'React/TSX';
    category = detectCategory(componentName, code);
  } else if (filePath.endsWith('.swift')) {
    platform = 'SwiftUI';
    category = detectCategory(componentName, code);
  } else if (filePath.endsWith('.liquid')) {
    platform = 'Shopify Liquid';
    category = detectCategory(componentName, code);
  }
  
  // Extract design tokens used
  const tokens = extractTokens(code);
  
  // Check for M4/Vision Pro features
  const m4Optimized = code.includes('M4') || code.includes('Neural Engine') || code.includes('Accelerate');
  const visionProReady = code.includes('Vision Pro') || code.includes('RealityKit') || code.includes('volumetric');
  const glassmorphism = code.includes('glass') || code.includes('backdrop') || code.includes('blur');
  
  return {
    name: componentName,
    platform,
    category,
    snippet,
    filePath: path.relative(REPO_PATH, filePath),
    tokens,
    m4Optimized,
    visionProReady,
    glassmorphism,
    lastModified: new Date().toISOString()
  };
}

function detectCategory(name, code) {
  const lowerName = name.toLowerCase();
  const lowerCode = code.toLowerCase();
  
  if (lowerName.includes('button') || lowerCode.includes('button')) return 'Buttons';
  if (lowerName.includes('input') || lowerName.includes('form') || lowerName.includes('select')) return 'Forms';
  if (lowerName.includes('nav') || lowerName.includes('menu') || lowerName.includes('tab')) return 'Navigation';
  if (lowerName.includes('card') || lowerName.includes('panel')) return 'Cards';
  if (lowerName.includes('modal') || lowerName.includes('dialog') || lowerName.includes('toast')) return 'Overlays';
  if (lowerName.includes('text') || lowerName.includes('heading') || lowerName.includes('title')) return 'Typography';
  if (lowerName.includes('grid') || lowerName.includes('layout') || lowerName.includes('container')) return 'Layout';
  if (lowerName.includes('table') || lowerName.includes('list') || lowerName.includes('chart')) return 'Data Display';
  if (lowerName.includes('spinner') || lowerName.includes('loading') || lowerName.includes('alert')) return 'Feedback';
  
  return 'Unknown';
}

function extractTokens(code) {
  const tokenPattern = /--[\w-]+/g;
  const matches = code.match(tokenPattern) || [];
  return [...new Set(matches)].slice(0, 10); // Max 10 unique tokens
}

// Find or create Notion page
async function findComponentPage(componentName) {
  const response = await notion.databases.query({
    database_id: DESIGN_SYSTEM_DB_ID,
    filter: {
      property: 'Component',
      title: {
        equals: componentName
      }
    }
  });
  
  return response.results[0] || null;
}

async function syncToNotion(component) {
  const githubUrl = `${GITHUB_BASE}/${component.filePath}`;
  const existingPage = await findComponentPage(component.name);
  
  const properties = {
    'Component': {
      title: [{ text: { content: component.name } }]
    },
    'Platforms': {
      multi_select: [{ name: component.platform }]
    },
    'Category': {
      select: { name: component.category }
    },
    'Status': {
      select: { name: '✅ Approved' }
    },
    'HIG Compliance': {
      select: { name: '🔄 Pending' }
    },
    'Last Synced': {
      date: { start: new Date().toISOString() }
    },
    'Last Updated': {
      date: { start: component.lastModified }
    },
    'M4 Optimized': {
      checkbox: component.m4Optimized
    },
    'Vision Pro Ready': {
      checkbox: component.visionProReady
    },
    'Glassmorphism': {
      checkbox: component.glassmorphism
    }
  };
  
  // Add GitHub URL for specific platform
  if (component.platform === 'React/TSX') {
    properties['GitHub - React'] = { url: githubUrl };
  } else if (component.platform === 'SwiftUI') {
    properties['GitHub - Swift'] = { url: githubUrl };
  } else if (component.platform === 'Shopify Liquid') {
    properties['GitHub - Liquid'] = { url: githubUrl };
  }
  
  // Add tokens if found
  if (component.tokens.length > 0) {
    properties['Tokens Used'] = {
      multi_select: component.tokens.slice(0, 5).map(token => ({ name: token }))
    };
  }
  
  if (existingPage) {
    // Update existing page
    await notion.pages.update({
      page_id: existingPage.id,
      properties
    });
    
    console.log(`✅ Updated: ${component.name} (${component.platform})`);
  } else {
    // Create new page with code snippet
    const page = await notion.pages.create({
      parent: { database_id: DESIGN_SYSTEM_DB_ID },
      properties,
      children: [
        {
          type: 'heading_2',
          heading_2: {
            rich_text: [{ text: { content: `${component.platform} Implementation` } }]
          }
        },
        {
          type: 'code',
          code: {
            language: component.platform === 'React/TSX' ? 'typescript' :
                     component.platform === 'SwiftUI' ? 'swift' : 
                     component.platform === 'Shopify Liquid' ? 'liquid' : 'javascript',
            rich_text: [{ text: { content: component.snippet.slice(0, 2000) } }]
          }
        },
        {
          type: 'paragraph',
          paragraph: {
            rich_text: [
              { text: { content: 'Full source: ' } },
              { 
                text: { content: githubUrl, link: { url: githubUrl } },
                annotations: { code: true }
              }
            ]
          }
        }
      ]
    });
    
    console.log(`✅ Created: ${component.name} (${component.platform})`);
  }
}

// Watch for component changes
console.log('🎯 Quantum-Spatial Design System → Notion Sync');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('👀 Watching for component changes...\n');
console.log(`📂 Repository: ${REPO_PATH}`);
console.log(`🔗 GitHub: ${GITHUB_BASE}`);
console.log(`📊 Notion DB: ${DESIGN_SYSTEM_DB_ID}\n`);

const watchPatterns = [
  'components/**/*.tsx',
  'components/**/*.swift',
  'components/**/*.liquid',
  'creative-control-panel/**/*.html'
];

chokidar.watch(watchPatterns, {
  cwd: REPO_PATH,
  ignoreInitial: false,
  awaitWriteFinish: {
    stabilityThreshold: 1000,
    pollInterval: 200
  }
}).on('change', async (relPath) => {
  const fullPath = path.join(REPO_PATH, relPath);
  console.log(`\n📝 Changed: ${relPath}`);
  
  try {
    const component = await extractComponentMetadata(fullPath);
    await syncToNotion(component);
  } catch (error) {
    console.error(`❌ Error syncing ${relPath}:`, error.message);
  }
});

console.log('Press Ctrl+C to stop watching\n');
SYNCSCRIPT

chmod +x "$AUTOMATION_PATH/scripts/sync-components-to-notion.js"
print_success "Created sync script: sync-components-to-notion.js"
echo ""

# Step 5: Update package.json
print_step "Step 5: Adding npm scripts to package.json..."

if [ -f "package.json" ]; then
    # Create backup
    cp package.json package.json.backup
    
    # Add scripts using node (safer than jq for complex operations)
    node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    if (!pkg.scripts) pkg.scripts = {};
    
    pkg.scripts['sync:notion'] = 'node automation/siri-automation-orchestrator/scripts/sync-components-to-notion.js';
    pkg.scripts['sync:notion:install'] = 'npm install @notionhq/client chokidar dotenv';
    
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
    console.log('✅ npm scripts added');
    "
    
    print_success "Added npm scripts to package.json"
else
    print_warning "No package.json found, creating one..."
    
    cat > package.json << 'EOF'
{
  "name": "quantum-spatial-design-system",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "sync:notion": "node automation/siri-automation-orchestrator/scripts/sync-components-to-notion.js",
    "sync:notion:install": "npm install @notionhq/client chokidar dotenv"
  },
  "dependencies": {
    "@notionhq/client": "^2.2.15",
    "chokidar": "^3.5.3",
    "dotenv": "^16.3.1"
  }
}
EOF
    
    print_success "Created package.json with sync scripts"
fi

echo ""

# Step 6: Create environment configuration
print_step "Step 6: Setting up environment configuration..."

if [ ! -f "$AUTOMATION_PATH/.env" ]; then
    cat > "$AUTOMATION_PATH/.env" << 'EOF'
# Notion API Configuration
NOTION_API_KEY=your-notion-api-key-here
DESIGN_SYSTEM_DB_ID=your-database-id-here

# Repository Configuration
REPO_PATH=/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system

# Quantum-Secure Protocol (existing)
QUANTUM_SECURE_PROTOCOL=enabled
OKSANA_FOUNDATION_MODEL_ACTIVE=true
APPLE_INTELLIGENCE_M4_OPTIMIZATION=true
EOF
    
    print_success "Created .env configuration template"
    print_warning "Edit $AUTOMATION_PATH/.env with your Notion credentials"
else
    print_success "Environment file already exists"
fi

echo ""

# Step 7: Create setup guide
print_step "Step 7: Creating setup guide..."

cat > "$AUTOMATION_PATH/SETUP-GUIDE.md" << 'EOF'
# Design System → Notion Registry Setup Guide

## What This Does

Automatically syncs your quantum-spatial-design-system components to Notion:
- **Watches** components in GitHub for changes
- **Extracts** metadata, tokens, platform info
- **Syncs** to Notion registry with code snippets + links
- **Validates** Apple HIG compliance (future)

## Quick Start (3 steps)

### 1. Set Up Notion Database

**Option A: Use Existing "Design System Master Registry"**
1. Go to: https://www.notion.so/oksana-intelligence/2c39456fb22d81f68f55c0836bf37ed6
2. Get database ID from URL (the long UUID)
3. Skip to Step 2

**Option B: Create New Database**
1. In Notion, create new database: "Design System Master Registry"
2. Copy schema from `config/design-system-registry-schema.json`
3. Add properties manually or import via Notion API
4. Get database ID from URL

### 2. Configure Environment

Edit `.env` file:
```bash
NOTION_API_KEY=secret_xxxxxxxxxxxx
DESIGN_SYSTEM_DB_ID=2c39456fb22d81xxxxxxxxxxxxxx
```

Get Notion API key:
1. Visit: https://www.notion.so/my-integrations
2. Create new integration: "Design System Sync"
3. Copy integration token
4. Share your database with the integration

### 3. Start Syncing

```bash
# Install dependencies
npm run sync:notion:install

# Start file watcher
npm run sync:notion
```

Now edit any component in `components/` → auto-syncs to Notion! ✨

## What Gets Synced

### From GitHub:
- Component name
- Platform (React/Swift/Liquid)
- Code snippet (first 20 lines or usage example)
- Design tokens used
- GitHub link to full source
- M4/Vision Pro/Glassmorphism flags

### To Notion:
- Component page with all metadata
- Code snippet in proper language
- Links to GitHub source
- Platform tags
- Category classification
- HIG compliance status (pending)

## Database Properties

Here's what properties to add to your Notion database:

| Property | Type | Options/Description |
|----------|------|---------------------|
| **Component** | Title | Component name |
| **Platforms** | Multi-select | React/TSX, SwiftUI, Shopify Liquid, Vision Pro, HTML/CSS |
| **Category** | Select | Buttons, Forms, Navigation, Cards, Overlays, etc. |
| **Status** | Select | ✅ Approved, 🚧 Review, 🔄 Draft, 🗑️ Deprecated |
| **GitHub - React** | URL | Link to .tsx file |
| **GitHub - Swift** | URL | Link to .swift file |
| **GitHub - Liquid** | URL | Link to .liquid file |
| **Figma** | URL | Link to Figma design |
| **Live Demo** | URL | Link to demo (Artifact/Vercel) |
| **HIG Compliance** | Select | ✅ Validated, ⚠️ Warnings, ❌ Fails, 🔄 Pending |
| **Tokens Used** | Multi-select | Design tokens referenced |
| **Last Synced** | Date | Auto-updated by sync script |
| **Last Updated** | Date | Component modification date |
| **M4 Optimized** | Checkbox | Neural Engine optimized |
| **Vision Pro Ready** | Checkbox | Spatial UI compatible |
| **Glassmorphism** | Checkbox | Uses glass effects |

## Integration with Existing Orchestrator

This sync integrates with your existing:
- `notion-workspace-automation-orchestrator.js`
- `notion-workspace-analyzer.js`
- Database mapping system

The sync script is standalone but can be called from the orchestrator for:
- Scheduled syncs
- Batch operations
- Cross-database updates
- Apple Intelligence validation

## Workflow

```
Component changed in VSCode
         ↓
File watcher detects change
         ↓
Extract metadata + snippet
         ↓
Validate tokens/HIG (optional)
         ↓
Update/Create Notion page
         ↓
✅ Synced!
```

## Advanced Usage

### Sync Specific Platform

```bash
# Only React components
chokidar 'components/**/*.tsx' --command 'node scripts/sync-components-to-notion.js'

# Only Swift components
chokidar 'components/**/*.swift' --command 'node scripts/sync-components-to-notion.js'
```

### Manual Sync (one-time)

```javascript
// sync-all-components.js
import { syncToNotion, extractComponentMetadata } from './sync-components-to-notion.js';
import glob from 'glob';

const files = glob.sync('components/**/*.{tsx,swift,liquid}');
for (const file of files) {
  const metadata = await extractComponentMetadata(file);
  await syncToNotion(metadata);
}
```

### Integrate with Orchestrator

In `notion-workspace-automation-orchestrator.js`:

```javascript
import { syncToNotion } from './scripts/sync-components-to-notion.js';

// Add to automation workflows
this.registerAutomationWorkflow('design-system-sync', {
  trigger: 'file-change',
  handler: async (filePath) => {
    const metadata = await extractComponentMetadata(filePath);
    return await syncToNotion(metadata);
  }
});
```

## Troubleshooting

**"Missing environment variables"**
→ Edit `.env` with your Notion API key and database ID

**"Permission denied"**
→ Share your Notion database with the integration

**"Component not syncing"**
→ Check file watcher is running (`npm run sync:notion`)
→ Check file matches patterns (*.tsx, *.swift, *.liquid)

**"Can't find database"**
→ Verify DESIGN_SYSTEM_DB_ID is correct
→ Database must be shared with integration

## Next Steps

1. ✅ Complete this setup
2. Test with 5 components manually
3. Let file watcher auto-sync going forward
4. Add HIG validation (connect apple-hig-validator.ts)
5. Generate artifacts for demos
6. Deploy to Vercel for public showcase

## Files Created

- `config/design-system-registry-schema.json` - Database schema
- `scripts/sync-components-to-notion.js` - Sync automation
- `.env` - Environment configuration
- `SETUP-GUIDE.md` - This guide

## Resources

- Notion API: https://developers.notion.com/
- Your workspace mapping: `notion-workspace-mapping-report-2025-12-15.json`
- Existing orchestrator: `notion-workspace-automation-orchestrator.js`
- GitHub repo: https://github.com/9bit-studios/quantum-spatial-design-system
EOF

print_success "Created setup guide: SETUP-GUIDE.md"
echo ""

# Final summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1️⃣  Set up Notion database:"
echo "   → Use existing: Design System Master Registry"
echo "   → Or create new with schema from config/design-system-registry-schema.json"
echo ""
echo "2️⃣  Get Notion credentials:"
echo "   → API key: https://www.notion.so/my-integrations"
echo "   → Database ID: From your database URL"
echo ""
echo "3️⃣  Configure environment:"
echo "   → Edit: $AUTOMATION_PATH/.env"
echo "   → Add: NOTION_API_KEY and DESIGN_SYSTEM_DB_ID"
echo ""
echo "4️⃣  Install dependencies:"
echo "   cd $REPO_PATH"
echo "   npm run sync:notion:install"
echo ""
echo "5️⃣  Start syncing:"
echo "   npm run sync:notion"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📂 Files Created:"
echo "   • config/design-system-registry-schema.json"
echo "   • scripts/sync-components-to-notion.js"
echo "   • .env (template)"
echo "   • SETUP-GUIDE.md"
echo ""
echo "📍 Location: $AUTOMATION_PATH"
echo ""
echo -e "${PURPLE}🎯 Ready to sync quantum-spatial components to Notion!${NC}"
echo ""
