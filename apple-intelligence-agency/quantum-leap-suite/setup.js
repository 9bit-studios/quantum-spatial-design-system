#!/usr/bin/env node

/**
 * Quantum Leap Suite - Setup Script
 * 
 * Prepares your environment for the quantum leap:
 * - Checks prerequisites
 * - Creates directory structure
 * - Validates environment variables
 * - Offers to migrate existing tools
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Quantum Leap Suite - Setup');
console.log('═══════════════════════════════════════════════════════');

// Check Node version
console.log('📋 Checking prerequisites...');
const nodeVersion = process.version.match(/^v(\d+\.\d+)/)[1];
if (parseFloat(nodeVersion) < 18.0) {
  console.error('❌ Node.js >= 18.0.0 required');
  console.error(`   Current version: ${process.version}`);
  process.exit(1);
}
console.log(`✅ Node.js ${process.version}`);

// Check npm
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf-8' }).trim();
  console.log(`✅ npm ${npmVersion}`);
} catch {
  console.error('❌ npm not found');
  process.exit(1);
}

// Check for Xcode (optional)
try {
  execSync('xcodebuild -version', { encoding: 'utf-8', stdio: 'ignore' });
  console.log('✅ Xcode installed (game development ready)');
} catch {
  console.log('⚠️  Xcode not found (optional, needed for Hexecute game)');
}

console.log();

// Create directory structure
console.log('📁 Creating directory structure...');
const dirs = [
  'output',
  'output/svg-components',
  'output/hexecute-game',
  'output/vision-pro-ui-kit',
  'hexecute-game',
  'hexecute-game/templates',
  'vision-pro-ui-kit',
  'vision-pro-ui-kit/components',
  'tool-migration/templates'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`   Created: ${dir}`);
  } else {
    console.log(`   Exists: ${dir}`);
  }
});

console.log();

// Check environment variables
console.log('🔑 Checking environment variables...');
const requiredEnv = ['ANTHROPIC_API_KEY'];
const optionalEnv = [
  'M4_STRATEGIC_INTELLIGENCE_PATHWAY',
  'M4_CREATIVE_INTELLIGENCE_PATHWAY',
  'M4_QUANTUM_SPATIAL_PATHWAY',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'NOTION_API_KEY'
];

let envComplete = true;

requiredEnv.forEach(key => {
  if (process.env[key]) {
    console.log(`   ✅ ${key}`);
  } else {
    console.log(`   ❌ ${key} (required)`);
    envComplete = false;
  }
});

optionalEnv.forEach(key => {
  if (process.env[key]) {
    console.log(`   ✅ ${key}`);
  } else {
    console.log(`   ⚠️  ${key} (optional)`);
  }
});

if (!envComplete) {
  console.log('⚠️  Missing required environment variables!');
  console.log('   Add to your shell profile (~/.zshrc or ~/.bashrc):');
  console.log('   export ANTHROPIC_API_KEY="your-key-here"');
  console.log('   Then restart your terminal or run: source ~/.zshrc');
}

console.log();

// Create template files if they don't exist
console.log('📝 Checking template files...');

// Arthur's rules template
const arthurRulesPath = 'hexecute-game/ARTHUR-RULES.md';
if (!fs.existsSync(arthurRulesPath)) {
  const arthurTemplate = `# Arthur's Hexecute Game Mechanics

## Game Overview
[Paste Arthur's game description here]

## Core Mechanics
[Describe the core gameplay mechanics]

## Movement Rules
[How does movement work on the hexagonal grid?]

## Combat System
[How do attacks and damage work?]

## Victory Conditions
[How does a player win?]

## Special Abilities
[Any special powers or abilities?]

## Scoring
[How is the score calculated?]

---

**Note**: This is a placeholder. Replace with Arthur's actual game rules.
`;
  fs.writeFileSync(arthurRulesPath, arthurTemplate);
  console.log(`   Created: ${arthurRulesPath}`);
  console.log('   ⚠️  Remember to add Arthur\'s actual rules!');
} else {
  console.log(`   Exists: ${arthurRulesPath}`);
}

console.log();

// Create inventory template
const inventoryPath = 'inventory.md';
if (!fs.existsSync(inventoryPath)) {
  const inventoryTemplate = `# SVG Component Inventory

## Existing Components

### Quantum Spatial Theme
- [ ] Component 1: [description]
- [ ] Component 2: [description]

### Heritage Theme
- [ ] Component 1: [description]

## What's Missing

### Needed for Notion
- [ ] Dashboard backgrounds
- [ ] Status indicators
- [ ] Section dividers

### Needed for Vision Pro
- [ ] Spatial icons
- [ ] 3D visualizations

## Notes
[Add any notes about your existing components]
`;
  fs.writeFileSync(inventoryPath, inventoryTemplate);
  console.log(`   Created: ${inventoryPath}`);
} else {
  console.log(`   Exists: ${inventoryPath}`);
}

console.log();

// Installation complete
console.log('═══════════════════════════════════════════════════════');
console.log('✅ Setup Complete!');

console.log('📋 Next Steps:');
console.log('1. Add Arthurs game rules to: hexecute-game/ARTHUR-RULES.md');
console.log('2. Document your existing SVGs in: inventory.md');
console.log('3. Set environment variables (if not done)');
console.log('4. Migrate your existing tools:');
console.log('   npm run migrate-tools');

console.log('🚀 Ready to execute quantum leap:');
console.log('   npm run full-suite');

console.log('Or test individual phases:');
console.log('   npm run svg-only');
console.log('   npm run game-only');
console.log('   npm run vision-pro-only');

console.log('═══════════════════════════════════════════════════════');
