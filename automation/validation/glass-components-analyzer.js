/**
 * Glass Components Analyzer
 * Apple Intelligence Strategic Director Framework
 * 
 * Specialized analysis for glass headers, filters, and CSS hierarchy
 * Focuses on iterative identification before extraction
 */

const fs = require('fs').promises;
const path = require('path');

class GlassComponentsAnalyzer {
  constructor() {
    this.baseDir = '/Users/pennyplatt/9Bit_Studios/petersen-portal/fresh-glass-theme/petersen-glass-theme';
    this.glassComponents = new Map();
    this.cssHierarchy = new Map();
    this.inlineJavaScript = new Map();
    this.foundationMappings = new Map();
    this.hardcodedValues = new Map();
    
    // Glass component priorities - glass-top-header is foundation
    this.priorityComponents = [
      'sections/glass-top-header.liquid',     // FOUNDATION PRIORITY
      'sections/glass-filter-bar.liquid',
      'sections/glass-filter-sidebar.liquid',
      'sections/glass-filter.liquid',
      'sections/sliding-nav-tabs.liquid',
      'sections/facets.liquid'
    ];
    
    // CSS hierarchy order (load sequence)
    this.cssFiles = [
      'assets/QuantumFoundation.css',         // FOUNDATION VARIABLES
      'assets/quantumspatial-tokens.css',
      'assets/base.css',
      'assets/priority-foundation.css',
      'assets/global-glass-theme.css',
      'assets/glass-filter-integration.js'    // JS WITH EMBEDDED CSS
    ];
  }

  async analyze() {
    console.log('🔍 Glass Components Analysis - Iterative Discovery');
    console.log('===================================================');
    
    const analysis = {
      glassComponents: await this.analyzeGlassComponents(),
      cssHierarchy: await this.analyzeCSSHierarchy(),
      inlineJavaScript: await this.findInlineJavaScript(),
      foundationMappings: await this.analyzeFoundationMappings(),
      hardcodedValues: await this.findHardcodedValues(),
      recommendations: this.generateRecommendations()
    };

    await this.generateAnalysisReport(analysis);
    return analysis;
  }

  async analyzeGlassComponents() {
    console.log('📋 Phase 1: Glass Component Discovery');
    const components = new Map();

    for (const componentPath of this.priorityComponents) {
      try {
        const fullPath = path.join(this.baseDir, componentPath);
        const content = await fs.readFile(fullPath, 'utf8');
        
        const analysis = {
          path: componentPath,
          priority: componentPath.includes('glass-top-header') ? 'FOUNDATION' : 'HIGH',
          inlineCSS: this.extractInlineCSS(content),
          inlineJS: this.extractInlineJS(content),
          liquidLogic: this.extractLiquidLogic(content),
          glassEffects: this.identifyGlassEffects(content),
          foundationUsage: this.findFoundationVariables(content),
          hardcodedValues: this.findHardcodedInComponent(content)
        };

        components.set(componentPath, analysis);
        
        console.log(`  ✅ ${componentPath}:`);
        console.log(`     - Priority: ${analysis.priority}`);
        console.log(`     - Inline CSS: ${analysis.inlineCSS.lines} lines`);
        console.log(`     - Inline JS: ${analysis.inlineJS.lines} lines`);
        console.log(`     - Glass Effects: ${analysis.glassEffects.length} detected`);
        console.log(`     - Foundation Variables: ${analysis.foundationUsage.length} used`);
        
      } catch (error) {
        console.warn(`  ⚠️ Could not analyze ${componentPath}: ${error.message}`);
      }
    }

    return components;
  }

  async analyzeCSSHierarchy() {
    console.log('📋 Phase 2: CSS Hierarchy Analysis');
    const hierarchy = new Map();

    for (const cssFile of this.cssFiles) {
      try {
        const fullPath = path.join(this.baseDir, cssFile);
        const content = await fs.readFile(fullPath, 'utf8');
        
        const analysis = {
          file: cssFile,
          type: this.determineCSSType(cssFile, content),
          foundationVariables: this.findFoundationVariables(content),
          glassStyles: this.findGlassStyles(content),
          hardcodedValues: this.findHardcodedInCSS(content),
          dependencies: this.findCSSDependencies(content),
          size: content.length,
          glassPriority: this.assessGlassPriority(cssFile, content)
        };

        hierarchy.set(cssFile, analysis);
        
        console.log(`  📄 ${cssFile}:`);
        console.log(`     - Type: ${analysis.type}`);
        console.log(`     - Glass Priority: ${analysis.glassPriority}`);
        console.log(`     - Foundation Variables: ${analysis.foundationVariables.length}`);
        console.log(`     - Glass Styles: ${analysis.glassStyles.length}`);
        console.log(`     - Size: ${(analysis.size / 1024).toFixed(1)}KB`);
        
      } catch (error) {
        console.warn(`  ⚠️ Could not analyze ${cssFile}: ${error.message}`);
      }
    }

    return hierarchy;
  }

  async findInlineJavaScript() {
    console.log('📋 Phase 3: Inline JavaScript Detection');
    const inlineJS = new Map();

    // Check all liquid files for inline JS
    const liquidFiles = await this.findLiquidFiles();
    
    for (const file of liquidFiles) {
      try {
        const content = await fs.readFile(file, 'utf8');
        const jsBlocks = this.extractInlineJS(content);
        
        if (jsBlocks.lines > 0) {
          inlineJS.set(file, {
            lines: jsBlocks.lines,
            blocks: jsBlocks.blocks,
            functions: jsBlocks.functions,
            eventListeners: jsBlocks.eventListeners,
            shouldAvoid: this.shouldAvoidInlineJS(jsBlocks, file)
          });
          
          console.log(`  🔍 ${path.relative(this.baseDir, file)}:`);
          console.log(`     - Inline JS: ${jsBlocks.lines} lines in ${jsBlocks.blocks.length} blocks`);
          console.log(`     - Functions: ${jsBlocks.functions.length}`);
          console.log(`     - Event Listeners: ${jsBlocks.eventListeners.length}`);
          console.log(`     - Should Extract: ${this.shouldAvoidInlineJS(jsBlocks, file) ? 'YES' : 'NO'}`);
        }
      } catch (error) {
        // Silently skip files that can't be read
      }
    }

    return inlineJS;
  }

  async analyzeFoundationMappings() {
    console.log('📋 Phase 4: Foundation Variable Mapping');
    const mappings = new Map();

    // Analyze QuantumFoundation.css as the source of truth
    try {
      const foundationPath = path.join(this.baseDir, 'assets/QuantumFoundation.css');
      const foundationContent = await fs.readFile(foundationPath, 'utf8');
      
      const foundationVars = this.extractAllFoundationVariables(foundationContent);
      mappings.set('foundation-source', foundationVars);
      
      console.log(`  📚 QuantumFoundation.css: ${foundationVars.length} variables defined`);
      
      // Check usage across glass components
      for (const [componentPath, componentData] of this.glassComponents) {
        const usedVars = componentData.foundationUsage || [];
        const unmappedVars = this.findUnmappedVariables(componentData);
        
        mappings.set(componentPath, {
          used: usedVars,
          unmapped: unmappedVars,
          compliance: this.calculateFoundationCompliance(usedVars, unmappedVars)
        });
        
        console.log(`  🔗 ${componentPath}:`);
        console.log(`     - Uses: ${usedVars.length} foundation variables`);
        console.log(`     - Unmapped: ${unmappedVars.length} hardcoded values`);
        console.log(`     - Compliance: ${this.calculateFoundationCompliance(usedVars, unmappedVars)}%`);
      }
      
    } catch (error) {
      console.warn(`  ⚠️ Could not analyze foundation mappings: ${error.message}`);
    }

    return mappings;
  }

  async findHardcodedValues() {
    console.log('📋 Phase 5: Hardcoded Values Detection');
    const hardcoded = new Map();

    // Common hardcoded patterns that should use foundation variables
    const patterns = {
      spacing: /(\d+px|\d+rem|\d+em)(?=\s*[;}])/g,
      colors: /#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)/g,
      zIndex: /z-index:\s*(\d+)/g,
      borderRadius: /border-radius:\s*(\d+px)/g,
      fontSize: /font-size:\s*(\d+px|\d+rem)/g,
      transitions: /transition:\s*([^;]+)/g
    };

    for (const [componentPath, componentData] of this.glassComponents) {
      const violations = [];
      
      for (const [category, pattern] of Object.entries(patterns)) {
        const cssContent = componentData.inlineCSS?.content || '';
        const matches = cssContent.match(pattern) || [];
        
        if (matches.length > 0) {
          violations.push({
            category,
            matches: matches.slice(0, 10), // Limit to first 10
            count: matches.length
          });
        }
      }
      
      if (violations.length > 0) {
        hardcoded.set(componentPath, violations);
        
        console.log(`  ⚠️ ${componentPath}:`);
        violations.forEach(v => {
          console.log(`     - ${v.category}: ${v.count} hardcoded values`);
        });
      }
    }

    return hardcoded;
  }

  // Helper methods for extraction and analysis
  extractInlineCSS(content) {
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
    const matches = [];
    let match;
    let totalLines = 0;

    while ((match = styleRegex.exec(content)) !== null) {
      const cssContent = match[1].trim();
      const lines = cssContent.split('').length;
      totalLines += lines;
      matches.push({
        content: cssContent,
        lines,
        startIndex: match.index
      });
    }

    return {
      blocks: matches,
      lines: totalLines,
      content: matches.map(m => m.content).join('')
    };
  }

  extractInlineJS(content) {
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
    const matches = [];
    let match;
    let totalLines = 0;
    const functions = [];
    const eventListeners = [];

    while ((match = scriptRegex.exec(content)) !== null) {
      const jsContent = match[1].trim();
      const lines = jsContent.split('').length;
      totalLines += lines;
      
      // Extract functions
      const funcRegex = /function\s+(\w+)/g;
      let funcMatch;
      while ((funcMatch = funcRegex.exec(jsContent)) !== null) {
        functions.push(funcMatch[1]);
      }
      
      // Extract event listeners
      const eventRegex = /addEventListener\s*\(\s*['"]([^'"]+)['"]/g;
      let eventMatch;
      while ((eventMatch = eventRegex.exec(jsContent)) !== null) {
        eventListeners.push(eventMatch[1]);
      }

      matches.push({
        content: jsContent,
        lines,
        startIndex: match.index
      });
    }

    return {
      blocks: matches,
      lines: totalLines,
      functions,
      eventListeners
    };
  }

  extractLiquidLogic(content) {
    const liquidRegex = /{%[^%]*%}/g;
    const matches = content.match(liquidRegex) || [];
    return {
      count: matches.length,
      types: this.categorizeLiquidTags(matches)
    };
  }

  identifyGlassEffects(content) {
    const glassKeywords = [
      'backdrop-filter',
      'blur\\(',
      'glass',
      'rgba\\(',
      'opacity:',
      'background:.*rgba',
      'border:.*rgba'
    ];
    
    const effects = [];
    glassKeywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = content.match(regex);
      if (matches) {
        effects.push({
          effect: keyword,
          count: matches.length
        });
      }
    });
    
    return effects;
  }

  findFoundationVariables(content) {
    const varRegex = /var\((--foundation-[^)]+)\)/g;
    const variables = [];
    let match;
    
    while ((match = varRegex.exec(content)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }
    
    return variables;
  }

  findHardcodedInComponent(content) {
    // Look for common hardcoded values that should use foundation variables
    const patterns = [
      { type: 'spacing', regex: /\d+px(?=\s*[;}])/, should_use: '--foundation-space-*' },
      { type: 'colors', regex: /#[0-9a-fA-F]{6}/, should_use: '--foundation-*-color' },
      { type: 'z-index', regex: /z-index:\s*\d+/, should_use: '--foundation-z-*' }
    ];
    
    const violations = [];
    patterns.forEach(pattern => {
      const matches = content.match(pattern.regex);
      if (matches) {
        violations.push({
          type: pattern.type,
          count: matches.length,
          recommendation: pattern.should_use
        });
      }
    });
    
    return violations;
  }

  determineCSSType(filename, content) {
    if (filename.includes('QuantumFoundation')) return 'FOUNDATION_VARIABLES';
    if (filename.includes('base')) return 'BASE_STYLES';
    if (filename.includes('priority-foundation')) return 'PRIORITY_INTEGRATION';
    if (filename.includes('global-glass')) return 'GLASS_THEME';
    if (filename.includes('.js')) return 'JAVASCRIPT_WITH_CSS';
    return 'COMPONENT_STYLES';
  }

  assessGlassPriority(filename, content) {
    const glassKeywords = ['backdrop-filter', 'blur', 'glass', 'rgba'];
    const glassCount = glassKeywords.reduce((count, keyword) => {
      return count + (content.match(new RegExp(keyword, 'gi')) || []).length;
    }, 0);
    
    if (glassCount > 20) return 'CRITICAL';
    if (glassCount > 10) return 'HIGH';
    if (glassCount > 0) return 'MEDIUM';
    return 'LOW';
  }

  async findLiquidFiles() {
    const liquidFiles = [];
    
    async function searchDirectory(dir) {
      try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          
          if (entry.isDirectory()) {
            await searchDirectory(fullPath);
          } else if (entry.name.endsWith('.liquid')) {
            liquidFiles.push(fullPath);
          }
        }
      } catch (error) {
        // Skip directories that can't be read
      }
    }
    
    await searchDirectory(this.baseDir);
    return liquidFiles;
  }

  shouldAvoidInlineJS(jsBlocks, filePath) {
    // Criteria for extracting inline JS:
    // 1. More than 20 lines of JS
    // 2. Contains complex functions
    // 3. Has multiple event listeners
    // 4. Is in a critical component
    
    const isLarge = jsBlocks.lines > 20;
    const hasComplexFunctions = jsBlocks.functions.length > 2;
    const hasMultipleEvents = jsBlocks.eventListeners.length > 3;
    const isCriticalComponent = filePath.includes('glass-') || filePath.includes('filter');
    
    return isLarge || hasComplexFunctions || hasMultipleEvents || isCriticalComponent;
  }

  generateRecommendations() {
    return {
      priorities: [
        'Use glass-top-header.liquid as foundation style reference',
        'Extract large inline JavaScript blocks (>20 lines)',
        'Map hardcoded values to foundation variables',
        'Consolidate glass effects into reusable components',
        'Ensure TypeScript compliance for extracted JS'
      ],
      cssHierarchy: [
        'Maintain load order: QuantumFoundation → base → priority-foundation → global-glass',
        'Avoid CSS in JavaScript files where possible',
        'Use foundation variables consistently across all components'
      ],
      javascript: [
        'Extract complex inline JS to separate files',
        'Use TypeScript for better error catching',
        'Implement proper event delegation',
        'Ensure accessibility compliance'
      ]
    };
  }

  async generateAnalysisReport(analysis) {
    const report = `# Glass Components Analysis Report
Generated: ${new Date().toISOString()}

## Executive Summary
- Glass Components Analyzed: ${analysis.glassComponents.size}
- CSS Files in Hierarchy: ${analysis.cssHierarchy.size}  
- Files with Inline JavaScript: ${analysis.inlineJavaScript.size}
- Components with Hardcoded Values: ${analysis.hardcodedValues.size}

## Priority Component: glass-top-header.liquid
${this.generateComponentSummary(analysis.glassComponents.get('sections/glass-top-header.liquid'))}

## CSS Hierarchy Analysis
${this.generateCSSHierarchySummary(analysis.cssHierarchy)}

## Inline JavaScript Detection
${this.generateInlineJSSummary(analysis.inlineJavaScript)}

## Foundation Variable Compliance
${this.generateComplianceSummary(analysis.foundationMappings)}

## Recommendations
${this.formatRecommendations(analysis.recommendations)}
`;

    const reportPath = path.join(this.baseDir, 'glass-components-analysis-report.md');
    await fs.writeFile(reportPath, report);
    
    console.log(`📊 Analysis report generated: ${reportPath}`);
    return reportPath;
  }

  generateComponentSummary(component) {
    if (!component) return 'Component not found or analyzed.';
    
    return `- Priority: ${component.priority}
- Inline CSS: ${component.inlineCSS.lines} lines
- Glass Effects: ${component.glassEffects.length} detected
- Foundation Variables: ${component.foundationUsage.length} used
- Hardcoded Values: ${component.hardcodedValues.length} violations`;
  }

  generateCSSHierarchySummary(hierarchy) {
    let summary = '';
    for (const [file, data] of hierarchy) {
      summary += `### ${file}
- Type: ${data.type}
- Glass Priority: ${data.glassPriority}  
- Foundation Variables: ${data.foundationVariables.length}
- Size: ${(data.size / 1024).toFixed(1)}KB

`;
    }
    return summary;
  }

  generateInlineJSSummary(inlineJS) {
    let summary = '';
    for (const [file, data] of inlineJS) {
      const relativePath = path.relative(this.baseDir, file);
      summary += `### ${relativePath}
- Lines: ${data.lines}
- Functions: ${data.functions.length}
- Event Listeners: ${data.eventListeners.length}
- Should Extract: ${data.shouldAvoid ? 'YES' : 'NO'}

`;
    }
    return summary;
  }

  generateComplianceSummary(mappings) {
    const foundationVars = mappings.get('foundation-source')?.length || 0;
    let summary = `Total Foundation Variables Available: ${foundationVars}`;
    
    for (const [component, data] of mappings) {
      if (component !== 'foundation-source') {
        summary += `### ${component}
- Foundation Variables Used: ${data.used?.length || 0}
- Hardcoded Values: ${data.unmapped?.length || 0}
- Compliance Score: ${data.compliance || 0}%

`;
      }
    }
    return summary;
  }

  formatRecommendations(recommendations) {
    let formatted = '';
    for (const [category, items] of Object.entries(recommendations)) {
      formatted += `### ${category.charAt(0).toUpperCase() + category.slice(1)}`;
      items.forEach(item => {
        formatted += `- ${item}`;
      });
      formatted += '';
    }
    return formatted;
  }

  // Additional helper methods
  categorizeLiquidTags(tags) {
    const categories = {
      conditionals: 0,
      loops: 0,
      includes: 0,
      assignments: 0,
      other: 0
    };
    
    tags.forEach(tag => {
      if (tag.includes('if ') || tag.includes('unless ')) categories.conditionals++;
      else if (tag.includes('for ') || tag.includes('while ')) categories.loops++;
      else if (tag.includes('include ') || tag.includes('render ')) categories.includes++;
      else if (tag.includes('assign ') || tag.includes('capture ')) categories.assignments++;
      else categories.other++;
    });
    
    return categories;
  }

  extractAllFoundationVariables(content) {
    const varRegex = /--foundation-[^:;\s}]+/g;
    const variables = new Set();
    let match;
    
    while ((match = varRegex.exec(content)) !== null) {
      variables.add(match[0]);
    }
    
    return Array.from(variables);
  }

  findUnmappedVariables(componentData) {
    // This would identify hardcoded values that could use foundation variables
    return componentData.hardcodedValues || [];
  }

  calculateFoundationCompliance(usedVars, unmappedVars) {
    const total = usedVars.length + unmappedVars.length;
    if (total === 0) return 100;
    return Math.round((usedVars.length / total) * 100);
  }

  findGlassStyles(content) {
    const glassPatterns = [
      /backdrop-filter:[^;]+/gi,
      /background:[^;]*rgba\([^)]+\)/gi,
      /border:[^;]*rgba\([^)]+\)/gi,
      /box-shadow:[^;]*rgba\([^)]+\)/gi
    ];
    
    const styles = [];
    glassPatterns.forEach((pattern, index) => {
      const matches = content.match(pattern) || [];
      if (matches.length > 0) {
        styles.push({
          type: ['backdrop-filter', 'background-rgba', 'border-rgba', 'box-shadow-rgba'][index],
          count: matches.length,
          examples: matches.slice(0, 3)
        });
      }
    });
    
    return styles;
  }

  findCSSDependencies(content) {
    const dependencies = [];
    
    // Look for @import statements
    const importRegex = /@import\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      dependencies.push({
        type: 'import',
        target: match[1]
      });
    }
    
    // Look for var() references to other CSS files
    const varRegex = /var\((--[^)]+)\)/g;
    const variables = new Set();
    while ((match = varRegex.exec(content)) !== null) {
      variables.add(match[1]);
    }
    
    if (variables.size > 0) {
      dependencies.push({
        type: 'css-variables',
        count: variables.size
      });
    }
    
    return dependencies;
  }

  findHardcodedInCSS(content) {
    const patterns = {
      'pixel-values': /\d+px/g,
      'hex-colors': /#[0-9a-fA-F]{3,8}/g,
      'z-index-values': /z-index:\s*\d+/g,
      'rgba-colors': /rgba?\([^)]+\)/g
    };
    
    const hardcoded = [];
    for (const [type, pattern] of Object.entries(patterns)) {
      const matches = content.match(pattern) || [];
      if (matches.length > 0) {
        hardcoded.push({
          type,
          count: matches.length,
          examples: matches.slice(0, 5)
        });
      }
    }
    
    return hardcoded;
  }
}

// Export for use
module.exports = { GlassComponentsAnalyzer };

// CLI usage
if (require.main === module) {
  const analyzer = new GlassComponentsAnalyzer();
  
  analyzer.analyze()
    .then(results => {
      console.log('✅ Glass Components Analysis completed successfully!');
      console.log(`🎯 Key Findings:`);
      console.log(`   - Glass Components: ${results.glassComponents.size}`);
      console.log(`   - CSS Files: ${results.cssHierarchy.size}`);
      console.log(`   - Inline JS Files: ${results.inlineJavaScript.size}`);
      console.log(`   - Hardcoded Values Found: ${results.hardcodedValues.size}`);
    })
    .catch(error => {
      console.error('❌ Analysis failed:', error);
      process.exit(1);
    });
}