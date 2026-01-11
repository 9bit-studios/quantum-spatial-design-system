#!/usr/bin/env node

/**
 * COMMONJS → ES MODULE CONVERTER
 * Batch convert JavaScript files from CommonJS to ES Modules
 * M4 + Apple Intelligence Optimized
 *
 * Usage:
 *   node convert-to-esm.mjs                    # Convert current directory
 *   node convert-to-esm.mjs --path /path       # Convert specific directory
 *   node convert-to-esm.mjs --dry-run          # Preview without changes
 *   node convert-to-esm.mjs --rename           # Rename .js → .mjs
 */

import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CommonJSToESMConverter {
  constructor(options = {}) {
    this.basePath = options.path || process.cwd();
    this.dryRun = options.dryRun || false;
    this.rename = options.rename || false; // Rename .js to .mjs

    this.stats = {
      filesScanned: 0,
      filesConverted: 0,
      filesRenamed: 0,
      requireReplacements: 0,
      exportsReplacements: 0,
      moduleExportsReplacements: 0,
      errors: [],
    };

    // Patterns to detect and convert
    this.patterns = {
      // require() patterns
      requireDefault: /const\s+(\w+)\s+=\s+require\(['"]([^'"]+)['"]\);?/g,
      requireDestructure: /const\s+{([^}]+)}\s+=\s+require\(['"]([^'"]+)['"]\);?/g,
      requireVar: /(?:var|let)\s+(\w+)\s+=\s+require\(['"]([^'"]+)['"]\);?/g,

      // module.exports patterns
      moduleExportsObject: /module\.exports\s+=\s+{([^}]+)}/g,
      moduleExportsSingle: /module\.exports\s+=\s+(\w+);?/g,
      moduleExportsProperty: /module\.exports\.(\w+)\s+=\s+/g,

      // exports patterns
      exportsProperty: /exports\.(\w+)\s+=\s+/g,

      // Dynamic require (needs special handling)
      dynamicRequire: /require\s*\(/g,
    };
  }

  async convert() {
    console.log('🔄 COMMONJS → ES MODULE CONVERTER');
    console.log('=' .repeat(70));
    console.log(`📁 Base Path: ${this.basePath}`);
    console.log(`🔄 Rename .js → .mjs: ${this.rename ? '✅' : '❌'}`);
    console.log(`👀 Dry Run: ${this.dryRun ? '✅' : '❌'}`);
    console.log('');

    await this.scanAndConvert(this.basePath);
    this.printSummary();
  }

  async scanAndConvert(dirPath) {
    if (!fs.existsSync(dirPath)) return;

    try {
      const items = await fsPromises.readdir(dirPath, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(dirPath, item.name);

        if (this.shouldSkipPath(item.name)) continue;

        if (item.isDirectory()) {
          await this.scanAndConvert(fullPath);
        } else if (item.isFile() && (item.name.endsWith('.js') || item.name.endsWith('.cjs'))) {
          await this.convertFile(fullPath);
        }
      }
    } catch (error) {
      this.stats.errors.push({ file: dirPath, error: error.message });
    }
  }

  async convertFile(filePath) {
    this.stats.filesScanned++;

    try {
      let content = await fsPromises.readFile(filePath, 'utf8');
      const originalContent = content;

      // Check if already ES module
      if (this.isAlreadyESM(content)) {
        console.log(`   ⏭️  ${path.relative(this.basePath, filePath)} - Already ES Module`);
        return;
      }

      // Check if has dynamic require (warn but try to convert)
      const hasDynamicRequire = this.hasDynamicRequire(content);

      let conversions = {
        require: 0,
        exports: 0,
        moduleExports: 0,
      };

      // Convert require() statements
      content = this.convertRequires(content, conversions);

      // Convert module.exports and exports
      content = this.convertExports(content, conversions);

      // Add __filename and __dirname polyfill if needed
      if (content.includes('__filename') || content.includes('__dirname')) {
        content = this.addFilenameDirnamePolyfill(content);
      }

      const totalConversions = conversions.require + conversions.exports + conversions.moduleExports;

      if (totalConversions > 0) {
        this.stats.filesConverted++;
        this.stats.requireReplacements += conversions.require;
        this.stats.exportsReplacements += conversions.exports;
        this.stats.moduleExportsReplacements += conversions.moduleExports;

        const relativePath = path.relative(this.basePath, filePath);
        console.log(`   ✅ ${relativePath} (${totalConversions} conversions${hasDynamicRequire ? ' ⚠️  has dynamic require' : ''})`);

        if (!this.dryRun) {
          await fsPromises.writeFile(filePath, content, 'utf8');

          // Rename .js to .mjs if requested
          if (this.rename && filePath.endsWith('.js')) {
            const newPath = filePath.replace(/\.js$/, '.mjs');
            await fsPromises.rename(filePath, newPath);
            this.stats.filesRenamed++;
            console.log(`      📝 Renamed to ${path.basename(newPath)}`);
          }
        }
      }
    } catch (error) {
      this.stats.errors.push({ file: filePath, error: error.message });
      console.log(`   ❌ ${path.relative(this.basePath, filePath)} - Error: ${error.message}`);
    }
  }

  isAlreadyESM(content) {
    return (
      content.includes('import ') ||
      content.includes('export default') ||
      content.includes('export {') ||
      content.includes('export const')
    );
  }

  hasDynamicRequire(content) {
    // Check for require() that's not at the start of a line (dynamic)
    const lines = content.split('');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.includes('require(') &&
          !trimmed.startsWith('const ') &&
          !trimmed.startsWith('let ') &&
          !trimmed.startsWith('var ') &&
          !trimmed.startsWith('//')) {
        return true;
      }
    }
    return false;
  }

  convertRequires(content, conversions) {
    // Convert: const module = require('module');
    // To: import module from 'module';
    content = content.replace(this.patterns.requireDefault, (match, varName, modulePath) => {
      conversions.require++;
      // Add .js extension for relative imports
      const finalPath = this.addJsExtension(modulePath);
      return `import ${varName} from '${finalPath}';`;
    });

    // Convert: const { thing1, thing2 } = require('module');
    // To: import { thing1, thing2 } from 'module';
    content = content.replace(this.patterns.requireDestructure, (match, destructured, modulePath) => {
      conversions.require++;
      const finalPath = this.addJsExtension(modulePath);
      return `import {${destructured}} from '${finalPath}';`;
    });

    // Convert var/let require statements
    content = content.replace(this.patterns.requireVar, (match, varName, modulePath) => {
      conversions.require++;
      const finalPath = this.addJsExtension(modulePath);
      return `import ${varName} from '${finalPath}';`;
    });

    return content;
  }

  convertExports(content, conversions) {
    // Convert: module.exports = { a, b, c }
    // To: export { a, b, c }; or export default { a, b, c };
    content = content.replace(this.patterns.moduleExportsObject, (match, objectContent) => {
      conversions.moduleExports++;
      // Check if it looks like named exports
      if (objectContent.includes(':')) {
        return `export default {${objectContent}}`;
      } else {
        return `export {${objectContent}};`;
      }
    });

    // Convert: module.exports = Something;
    // To: export default Something;
    content = content.replace(this.patterns.moduleExportsSingle, (match, varName) => {
      conversions.moduleExports++;
      return `export default ${varName};`;
    });

    // Convert: module.exports.thing =
    // To: export const thing =
    content = content.replace(this.patterns.moduleExportsProperty, (match, propName) => {
      conversions.moduleExports++;
      return `export const ${propName} = `;
    });

    // Convert: exports.thing =
    // To: export const thing =
    content = content.replace(this.patterns.exportsProperty, (match, propName) => {
      conversions.exports++;
      return `export const ${propName} = `;
    });

    return content;
  }

  addJsExtension(modulePath) {
    // Only add .js to relative imports that don't have an extension
    if (modulePath.startsWith('.') && !modulePath.includes('.')) {
      return modulePath + '.js';
    }
    // If it's a relative path without extension, add .js
    if (modulePath.startsWith('./') || modulePath.startsWith('../')) {
      if (!path.extname(modulePath)) {
        return modulePath + '.js';
      }
    }
    return modulePath;
  }

  addFilenameDirnamePolyfill(content) {
    // Check if already has the polyfill
    if (content.includes('fileURLToPath')) {
      return content;
    }

    const polyfill = `import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

`;

    // Add after the last import or at the beginning
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const nextNewline = content.indexOf('', lastImportIndex);
      return content.slice(0, nextNewline + 1) + '' + polyfill + content.slice(nextNewline + 1);
    } else {
      return polyfill + content;
    }
  }

  shouldSkipPath(name) {
    const skipPatterns = [
      'node_modules',
      '.git',
      'dist',
      'build',
      '.next',
      '.DS_Store',
      'coverage',
      '.cache',
      'vendor',
      'bundle',
    ];
    return skipPatterns.some(pattern => name.includes(pattern)) || name.startsWith('.');
  }

  printSummary() {
    console.log('' + '='.repeat(70));
    console.log('📊 CONVERSION SUMMARY');
    console.log('='.repeat(70));

    console.log(`📄 Files:`);
    console.log(`   Scanned: ${this.stats.filesScanned}`);
    console.log(`   Converted: ${this.stats.filesConverted}`);
    if (this.rename) {
      console.log(`   Renamed to .mjs: ${this.stats.filesRenamed}`);
    }

    console.log(`🔄 Conversions:`);
    console.log(`   require() → import: ${this.stats.requireReplacements}`);
    console.log(`   exports.* → export const: ${this.stats.exportsReplacements}`);
    console.log(`   module.exports → export: ${this.stats.moduleExportsReplacements}`);
    console.log(`   Total: ${this.stats.requireReplacements + this.stats.exportsReplacements + this.stats.moduleExportsReplacements}`);

    if (this.stats.errors.length > 0) {
      console.log(`❌ Errors: ${this.stats.errors.length}`);
      this.stats.errors.slice(0, 10).forEach(({ file, error }) => {
        console.log(`   - ${path.relative(this.basePath, file)}: ${error}`);
      });
      if (this.stats.errors.length > 10) {
        console.log(`   ... and ${this.stats.errors.length - 10} more`);
      }
    }

    if (this.dryRun) {
      console.log('👀 DRY RUN - No files were actually modified');
      console.log('   Remove --dry-run flag to apply changes');
    } else {
      console.log('✅ Conversion complete!');
    }

    console.log('📝 Note: Review converted files for:');
    console.log('   - Dynamic require() calls (may need manual conversion)');
    console.log('   - Circular dependencies');
    console.log('   - Named vs default exports');
    console.log('   - Add "type": "module" to package.json if using .js files');
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: args.includes('--dry-run'),
    rename: args.includes('--rename'),
    path: null,
  };

  const pathIndex = args.indexOf('--path');
  if (pathIndex !== -1 && args[pathIndex + 1]) {
    options.path = args[pathIndex + 1];
  }

  return options;
}

// Main execution
async function main() {
  const options = parseArgs();
  const converter = new CommonJSToESMConverter(options);

  try {
    await converter.convert();
  } catch (error) {
    console.error('❌ Conversion failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { CommonJSToESMConverter };
