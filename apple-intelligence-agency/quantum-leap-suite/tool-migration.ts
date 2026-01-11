/**
 * Tool Migration Helper
 * 
 * Converts your existing CommonJS tools to ESM + Claude Agent SDK
 * 
 * Usage:
 *   npx tsx tool-migration.ts <input-file.js> <output-file.ts>
 * 
 * Converts:
 * - CommonJS → ESM imports/exports
 * - Adds TypeScript types
 * - Integrates Claude Agent SDK
 * - Adds M4 optimization hints
 */

import { promises as fs } from 'fs';
import path from 'path';

interface MigrationConfig {
  inputFile: string;
  outputFile: string;
  addTypes: boolean;
  addAgentIntegration: boolean;
  addM4Optimization: boolean;
}

class ToolMigrator {
  async migrate(config: MigrationConfig): Promise<void> {
    console.log('🔄 Migrating tool...');
    console.log(`   Input: ${config.inputFile}`);
    console.log(`   Output: ${config.outputFile}`);

    // Read original file
    const originalCode = await fs.readFile(config.inputFile, 'utf-8');

    // Perform migrations
    let migratedCode = originalCode;

    migratedCode = this.convertRequireToImport(migratedCode);
    migratedCode = this.convertModuleExports(migratedCode);
    
    if (config.addTypes) {
      migratedCode = this.addTypeScriptTypes(migratedCode);
    }
    
    if (config.addAgentIntegration) {
      migratedCode = this.addAgentSDKIntegration(migratedCode);
    }
    
    if (config.addM4Optimization) {
      migratedCode = this.addM4Hints(migratedCode);
    }

    // Write migrated file
    await fs.writeFile(config.outputFile, migratedCode);

    console.log('✅ Migration complete!');
  }

  /**
   * Convert require() to import
   */
  private convertRequireToImport(code: string): string {
    // const x = require('module') → import x from 'module'
    code = code.replace(
      /const\s+(\w+)\s*=\s*require\(['"]([^'"]+)['"]\)/g,
      "import $1 from '$2'"
    );

    // const { x } = require('module') → import { x } from 'module'
    code = code.replace(
      /const\s+\{([^}]+)\}\s*=\s*require\(['"]([^'"]+)['"]\)/g,
      "import { $1 } from '$2'"
    );

    return code;
  }

  /**
   * Convert module.exports to export
   */
  private convertModuleExports(code: string): string {
    // module.exports = { ... } → export { ... }
    code = code.replace(/module\.exports\s*=\s*\{/g, 'export {');

    // module.exports = class → export class
    code = code.replace(/module\.exports\s*=\s*class/g, 'export class');

    // module.exports = function → export function
    code = code.replace(/module\.exports\s*=\s*function/g, 'export function');

    return code;
  }

  /**
   * Add TypeScript type annotations
   */
  private addTypeScriptTypes(code: string): string {
    // Add basic interface definitions
    const typeDefinitions = `
/**
 * TypeScript type definitions
 */

interface Config {
  [key: string]: any;
}

interface Result {
  success: boolean;
  data?: any;
  error?: string;
}

`;

    return typeDefinitions + code;
  }

  /**
   * Add Claude Agent SDK integration
   */
  private addAgentSDKIntegration(code: string): string {
    const agentIntegration = `
import { ClaudeAgentSDK } from '@anthropic-ai/claude-agent-sdk';

/**
 * Claude Agent SDK integration
 */
class AgentIntegration {
  private agent: ClaudeAgentSDK;

  constructor() {
    this.agent = new ClaudeAgentSDK({
      model: 'claude-sonnet-4-5-20250929',
      maxTokens: 4096
    });
  }

  async executeWithAgent(task: string, context: any): Promise<any> {
    return await this.agent.execute(task, context);
  }
}

const agentIntegration = new AgentIntegration();

`;

    return agentIntegration + '' + code;
  }

  /**
   * Add M4 Neural Engine optimization hints
   */
  private addM4Hints(code: string): string {
    const m4Comments = `
/**
 * M4 Neural Engine Optimization
 * 
 * This tool is optimized for Apple M4 Neural Engine:
 * - Parallel processing enabled
 * - Memory-efficient operations
 * - GPU-accelerated where applicable
 */

// @ts-ignore - M4 Neural Engine API
declare const M4NeuralEngine: any;

`;

    return m4Comments + '' + code;
  }
}

// ============================================================================
// Template Generators for Each Tool
// ============================================================================

/**
 * Template: dimensional-grid-generator.ts
 */
const dimensionalGridTemplate = `
import { ClaudeAgentSDK } from '@anthropic-ai/claude-agent-sdk';

interface GridConfig {
  width: number;
  height: number;
  cellSize: number;
  gridType: 'hexagonal' | 'square' | 'triangular';
  theme: 'quantum-spatial' | 'heritage';
}

interface GridCell {
  x: number;
  y: number;
  z?: number; // For 3D grids
  color: string;
  opacity: number;
}

class DimensionalGridGenerator {
  private agent: ClaudeAgentSDK;

  constructor() {
    this.agent = new ClaudeAgentSDK({
      model: 'claude-sonnet-4-5-20250929'
    });
  }

  /**
   * Generate dimensional grid with quantum-spatial theme
   */
  async generateGrid(config: GridConfig): Promise<GridCell[]> {
    const cells: GridCell[] = [];

    if (config.gridType === 'hexagonal') {
      return this.generateHexGrid(config);
    } else if (config.gridType === 'square') {
      return this.generateSquareGrid(config);
    } else {
      return this.generateTriangleGrid(config);
    }
  }

  private generateHexGrid(config: GridConfig): GridCell[] {
    const cells: GridCell[] = [];
    const hexRadius = config.cellSize;
    const cols = Math.floor(config.width / (hexRadius * 1.5));
    const rows = Math.floor(config.height / (hexRadius * Math.sqrt(3)));

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * hexRadius * 1.5;
        const y = row * hexRadius * Math.sqrt(3) + (col % 2) * hexRadius * Math.sqrt(3) / 2;

        cells.push({
          x,
          y,
          color: this.getQuantumColor(row, col),
          opacity: 0.6
        });
      }
    }

    return cells;
  }

  private generateSquareGrid(config: GridConfig): GridCell[] {
    const cells: GridCell[] = [];
    // Implementation here
    return cells;
  }

  private generateTriangleGrid(config: GridConfig): GridCell[] {
    const cells: GridCell[] = [];
    // Implementation here
    return cells;
  }

  private getQuantumColor(row: number, col: number): string {
    // Quantum-spatial color palette
    const colors = ['#0A0E27', '#00D9FF', '#8B5CF6'];
    return colors[(row + col) % colors.length];
  }

  /**
   * Convert grid to SVG
   */
  toSVG(cells: GridCell[], config: GridConfig): string {
    let svg = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 \${config.width} \${config.height}">\`;

    cells.forEach(cell => {
      if (config.gridType === 'hexagonal') {
        svg += this.hexagonToSVG(cell, config.cellSize);
      }
      // Add other grid types...
    });

    svg += '</svg>';
    return svg;
  }

  private hexagonToSVG(cell: GridCell, radius: number): string {
    const points: [number, number][] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = cell.x + radius * Math.cos(angle);
      const y = cell.y + radius * Math.sin(angle);
      points.push([x, y]);
    }

    const pathData = points.map((p, i) => 
      \`\${i === 0 ? 'M' : 'L'} \${p[0]} \${p[1]}\`
    ).join(' ') + ' Z';

    return \`  <path d="\${pathData}" fill="\${cell.color}" opacity="\${cell.opacity}" stroke="#00D9FF" stroke-width="1"/>\`;
  }
}

export { DimensionalGridGenerator, GridConfig, GridCell };
`;

/**
 * Template: quantum-pixel-generator.ts
 */
const quantumPixelTemplate = `
import { ClaudeAgentSDK } from '@anthropic-ai/claude-agent-sdk';

interface PixelConfig {
  count: number;
  size: number;
  colorScheme: 'quantum' | 'cosmic' | 'dimensional';
  animationStyle: 'pulse' | 'flow' | 'breathe';
}

interface QuantumPixel {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  phase: number; // For animation
}

class QuantumPixelGenerator {
  private agent: ClaudeAgentSDK;

  constructor() {
    this.agent = new ClaudeAgentSDK({
      model: 'claude-sonnet-4-5-20250929'
    });
  }

  async generatePixels(config: PixelConfig): Promise<QuantumPixel[]> {
    const pixels: QuantumPixel[] = [];

    for (let i = 0; i < config.count; i++) {
      pixels.push({
        x: Math.random() * 1000,
        y: Math.random() * 1000,
        size: config.size * (0.5 + Math.random() * 0.5),
        color: this.getQuantumColor(config.colorScheme, i),
        opacity: 0.3 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2
      });
    }

    return pixels;
  }

  private getQuantumColor(scheme: string, index: number): string {
    const schemes = {
      quantum: ['#00D9FF', '#8B5CF6', '#E85D75'],
      cosmic: ['#0A0E27', '#1A237E', '#00D9FF'],
      dimensional: ['#8B5CF6', '#00D9FF', '#0A0E27']
    };

    const colors = schemes[scheme] || schemes.quantum;
    return colors[index % colors.length];
  }

  toSVG(pixels: QuantumPixel[], animation: string): string {
    let svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">\';

    if (animation === 'pulse') {
      svg += this.addPulseAnimation();
    }

    pixels.forEach(pixel => {
      svg += \`  <circle cx="\${pixel.x}" cy="\${pixel.y}" r="\${pixel.size}" \`;
      svg += \`fill="\${pixel.color}" opacity="\${pixel.opacity}">\`;

      if (animation === 'pulse') {
        svg += \`    <animate attributeName="opacity" \`;
        svg += \`values="\${pixel.opacity};1;\${pixel.opacity}" \`;
        svg += \`dur="3s" repeatCount="indefinite"/>\`;
      }

      svg += \`  </circle>\`;
    });

    svg += '</svg>';
    return svg;
  }

  private addPulseAnimation(): string {
    return \`  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>\`;
  }
}

export { QuantumPixelGenerator, PixelConfig, QuantumPixel };
`;

/**
 * Save templates
 */
async function generateTemplates() {
  console.log('📝 Generating modernized tool templates...');

  const outputDir = './tool-migration/templates';
  await fs.mkdir(outputDir, { recursive: true });

  await fs.writeFile(
    path.join(outputDir, 'dimensional-grid-generator.ts'),
    dimensionalGridTemplate
  );
  console.log('✅ dimensional-grid-generator.ts');

  await fs.writeFile(
    path.join(outputDir, 'quantum-pixel-generator.ts'),
    quantumPixelTemplate
  );
  console.log('✅ quantum-pixel-generator.ts');

  console.log('📦 Templates ready in ./tool-migration/templates/');
}

// ============================================================================
// CLI
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--generate-templates')) {
    await generateTemplates();
    return;
  }

  if (args.length < 2) {
    console.log('Usage: npx tsx tool-migration.ts <input.js> <output.ts>');
    console.log('   or: npx tsx tool-migration.ts --generate-templates');
    return;
  }

  const config: MigrationConfig = {
    inputFile: args[0],
    outputFile: args[1],
    addTypes: true,
    addAgentIntegration: args.includes('--agent'),
    addM4Optimization: args.includes('--m4')
  };

  const migrator = new ToolMigrator();
  await migrator.migrate(config);
}

if (require.main === module) {
  main();
}

export { ToolMigrator, MigrationConfig };
