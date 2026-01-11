#!/usr/bin/env node

/**
 * APPLE FONT CONVERTER
 * Batch convert all fonts to Apple SF Pro family
 * M4 + Apple Intelligence Optimized
 *
 * Usage:
 *   node convert-to-apple-fonts.mjs --svg         # Convert SVG files only
 *   node convert-to-apple-fonts.mjs --tsx         # Convert TSX/React files only
 *   node convert-to-apple-fonts.mjs --all         # Convert both (default)
 *   node convert-to-apple-fonts.mjs --path /path  # Custom directory
 *   node convert-to-apple-fonts.mjs --dry-run     # Preview without changes
 */

import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AppleFontConverter {
  constructor(options = {}) {
    this.basePath = options.path || path.resolve(__dirname, '..');
    this.dryRun = options.dryRun || false;
    this.convertSVG = options.svg || options.all || true;
    this.convertTSX = options.tsx || options.all || true;

    // Apple SF Pro font family mapping
    this.appleFont = {
      display: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      text: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      mono: 'SF Mono, Monaco, "Cascadia Code", "Courier New", monospace',
    };

    // Font weight mapping (preserve weights)
    this.weightMapping = {
      thin: { css: 100, svg: 'Thin' },
      ultralight: { css: 200, svg: 'Ultralight' },
      light: { css: 300, svg: 'Light' },
      regular: { css: 400, svg: 'Regular' },
      medium: { css: 500, svg: 'Medium' },
      semibold: { css: 600, svg: 'Semibold' },
      bold: { css: 700, svg: 'Bold' },
      heavy: { css: 800, svg: 'Heavy' },
      black: { css: 900, svg: 'Black' },
    };

    // Fonts to replace (common non-Apple fonts)
    this.fontsToReplace = [
      'ClashGrotesk',
      'SF Pro ',
      'Inter',
      'Roboto',
      'Helvetica',
      'Arial',
      'Open Sans',
      'Lato',
      'Montserrat',
      'Poppins',
      'Source Sans',
      'Nunito',
      'Raleway',
      'Ubuntu',
      'Work Sans',
    ];

    this.stats = {
      svgFilesScanned: 0,
      svgFilesModified: 0,
      tsxFilesScanned: 0,
      tsxFilesModified: 0,
      totalReplacements: 0,
      errors: [],
    };
  }

  async convert() {
    console.log('🍎 APPLE FONT CONVERTER');
    console.log('=' .repeat(70));
    console.log(`📁 Base Path: ${this.basePath}`);
    console.log(`🎨 Convert SVG: ${this.convertSVG ? '✅' : '❌'}`);
    console.log(`⚛️  Convert TSX/React: ${this.convertTSX ? '✅' : '❌'}`);
    console.log(`👀 Dry Run: ${this.dryRun ? '✅' : '❌'}`);
    console.log('');

    if (this.convertSVG) {
      console.log('📄 Converting SVG Files...');
      await this.convertSVGFiles(this.basePath);
    }

    if (this.convertTSX) {
      console.log('⚛️  Converting TSX/React Files...');
      await this.convertTSXFiles(this.basePath);
    }

    this.printSummary();
  }

  async convertSVGFiles(dirPath) {
    if (!fs.existsSync(dirPath)) return;

    try {
      const items = await fsPromises.readdir(dirPath, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(dirPath, item.name);

        // Skip common directories
        if (this.shouldSkipPath(item.name)) continue;

        if (item.isDirectory()) {
          await this.convertSVGFiles(fullPath);
        } else if (item.isFile() && item.name.endsWith('.svg')) {
          await this.processSVGFile(fullPath);
        }
      }
    } catch (error) {
      this.stats.errors.push({ file: dirPath, error: error.message });
    }
  }

  async convertTSXFiles(dirPath) {
    if (!fs.existsSync(dirPath)) return;

    try {
      const items = await fsPromises.readdir(dirPath, { withFileTypes: true });

      for (const item of items) {
        const fullPath = path.join(dirPath, item.name);

        if (this.shouldSkipPath(item.name)) continue;

        if (item.isDirectory()) {
          await this.convertTSXFiles(fullPath);
        } else if (item.isFile() && (item.name.endsWith('.tsx') || item.name.endsWith('.ts') || item.name.endsWith('.jsx'))) {
          await this.processTSXFile(fullPath);
        }
      }
    } catch (error) {
      this.stats.errors.push({ file: dirPath, error: error.message });
    }
  }

  async processSVGFile(filePath) {
    this.stats.svgFilesScanned++;

    try {
      let content = await fsPromises.readFile(filePath, 'utf8');
      const originalContent = content;
      let replacements = 0;

      // Replace font-family attributes in text elements
      // Pattern: font-family="SF Pro Medium, 'SF Pro '"
      const fontFamilyRegex = /font-family=["']([^"']+)["']/g;

      content = content.replace(fontFamilyRegex, (match, fontFamily) => {
        // Check if this font should be replaced
        const shouldReplace = this.fontsToReplace.some(font =>
          fontFamily.toLowerCase().includes(font.toLowerCase())
        );

        if (shouldReplace) {
          replacements++;

          // Determine font weight from font name
          const weight = this.extractWeightFromFontName(fontFamily);
          const isBold = fontFamily.toLowerCase().includes('bold') || weight >= 700;
          const isMono = fontFamily.toLowerCase().includes('mono') || fontFamily.toLowerCase().includes('code');

          // Choose appropriate SF Pro variant
          let sfProFamily;
          if (isMono) {
            sfProFamily = 'SF Mono';
          } else if (weight >= 600 || isBold) {
            sfProFamily = 'SF Pro Display'; // Display for headings/bold
          } else {
            sfProFamily = 'SF Pro Text'; // Text for body
          }

          return `font-family="${sfProFamily}, -apple-system, system-ui, sans-serif"`;
        }

        return match;
      });

      if (replacements > 0) {
        this.stats.svgFilesModified++;
        this.stats.totalReplacements += replacements;

        const relativePath = path.relative(this.basePath, filePath);
        console.log(`   ✅ ${relativePath} (${replacements} replacements)`);

        if (!this.dryRun) {
          await fsPromises.writeFile(filePath, content, 'utf8');
        }
      }
    } catch (error) {
      this.stats.errors.push({ file: filePath, error: error.message });
      console.log(`   ❌ ${path.relative(this.basePath, filePath)} - Error: ${error.message}`);
    }
  }

  async processTSXFile(filePath) {
    this.stats.tsxFilesScanned++;

    try {
      let content = await fsPromises.readFile(filePath, 'utf8');
      const originalContent = content;
      let replacements = 0;

      // Pattern 1: CSS-in-JS style objects
      // fontFamily: 'SF Pro Medium, "SF Pro "'
      const cssInJsRegex = /fontFamily\s*:\s*["']([^"']+)["']/g;

      content = content.replace(cssInJsRegex, (match, fontFamily) => {
        const shouldReplace = this.fontsToReplace.some(font =>
          fontFamily.toLowerCase().includes(font.toLowerCase())
        );

        if (shouldReplace) {
          replacements++;
          const isMono = fontFamily.toLowerCase().includes('mono') || fontFamily.toLowerCase().includes('code');
          const targetFont = isMono ? this.appleFont.mono : this.appleFont.display;
          return `fontFamily: '${targetFont}'`;
        }

        return match;
      });

      // Pattern 2: CSS template literals
      // font-family: 'SF Pro Medium, "SF Pro "';
      const cssTemplateRegex = /font-family\s*:\s*["']([^"']+)["']/g;

      content = content.replace(cssTemplateRegex, (match, fontFamily) => {
        const shouldReplace = this.fontsToReplace.some(font =>
          fontFamily.toLowerCase().includes(font.toLowerCase())
        );

        if (shouldReplace) {
          replacements++;
          const isMono = fontFamily.toLowerCase().includes('mono') || fontFamily.toLowerCase().includes('code');
          const targetFont = isMono ? this.appleFont.mono : this.appleFont.display;
          return `font-family: '${targetFont}'`;
        }

        return match;
      });

      // Pattern 3: Styled components
      // font-family: SF Pro Medium, 'SF Pro ';
      const styledComponentRegex = /font-family\s*:\s*([^;]+);/g;

      content = content.replace(styledComponentRegex, (match, fontFamily) => {
        // Remove quotes for comparison
        const cleanFont = fontFamily.replace(/["']/g, '');
        const shouldReplace = this.fontsToReplace.some(font =>
          cleanFont.toLowerCase().includes(font.toLowerCase())
        );

        if (shouldReplace) {
          replacements++;
          const isMono = cleanFont.toLowerCase().includes('mono') || cleanFont.toLowerCase().includes('code');
          const targetFont = isMono ? this.appleFont.mono : this.appleFont.display;
          return `font-family: '${targetFont}';`;
        }

        return match;
      });

      if (replacements > 0) {
        this.stats.tsxFilesModified++;
        this.stats.totalReplacements += replacements;

        const relativePath = path.relative(this.basePath, filePath);
        console.log(`   ✅ ${relativePath} (${replacements} replacements)`);

        if (!this.dryRun) {
          await fsPromises.writeFile(filePath, content, 'utf8');
        }
      }
    } catch (error) {
      this.stats.errors.push({ file: filePath, error: error.message });
      console.log(`   ❌ ${path.relative(this.basePath, filePath)} - Error: ${error.message}`);
    }
  }

  extractWeightFromFontName(fontName) {
    const lowerFont = fontName.toLowerCase();

    if (lowerFont.includes('thin')) return 100;
    if (lowerFont.includes('ultralight') || lowerFont.includes('extralight')) return 200;
    if (lowerFont.includes('light')) return 300;
    if (lowerFont.includes('regular') || lowerFont.includes('normal')) return 400;
    if (lowerFont.includes('medium')) return 500;
    if (lowerFont.includes('semibold') || lowerFont.includes('demibold')) return 600;
    if (lowerFont.includes('bold')) return 700;
    if (lowerFont.includes('heavy') || lowerFont.includes('extrabold')) return 800;
    if (lowerFont.includes('black')) return 900;

    return 400; // Default to regular
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
    ];
    return skipPatterns.some(pattern => name.includes(pattern)) || name.startsWith('.');
  }

  printSummary() {
    console.log('' + '='.repeat(70));
    console.log('📊 CONVERSION SUMMARY');
    console.log('='.repeat(70));

    if (this.convertSVG) {
      console.log(`📄 SVG Files:`);
      console.log(`   Scanned: ${this.stats.svgFilesScanned}`);
      console.log(`   Modified: ${this.stats.svgFilesModified}`);
    }

    if (this.convertTSX) {
      console.log(`⚛️  TSX/React Files:`);
      console.log(`   Scanned: ${this.stats.tsxFilesScanned}`);
      console.log(`   Modified: ${this.stats.tsxFilesModified}`);
    }

    console.log(`✨ Total Font Replacements: ${this.stats.totalReplacements}`);

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

    console.log('🍎 All fonts converted to Apple SF Pro family');
    console.log('   - SF Pro Display: Headings and bold text');
    console.log('   - SF Pro Text: Body text');
    console.log('   - SF Mono: Code and monospace');
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    svg: args.includes('--svg'),
    tsx: args.includes('--tsx'),
    all: args.includes('--all') || (!args.includes('--svg') && !args.includes('--tsx')),
    dryRun: args.includes('--dry-run'),
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
  const converter = new AppleFontConverter(options);

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

export { AppleFontConverter };
