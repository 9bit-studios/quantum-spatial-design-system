// ===================================================================
// COMPONENT CATALOGING SCRIPT + CLAUDE PROMPTS
// ===================================================================

// design-system/tools/scripts/catalog-components.js
const fs = require('fs').promises;
const path = require('path');

class ComponentCatalogger {
  constructor(options = {}) {
    this.sourceDirectories = options.sourceDirectories || [
      './components',
      './src/components', 
      './pages',
      './src/pages',
      './app',
      './quantum-spatial',
      './Foundation',
      './Ecommerce-design-system'
    ];
    this.outputDirectory = options.outputDirectory || './design-system/catalog';
    this.patterns = {
      component: /(?:export\s+(?:default\s+)?(?:const|function|class)\s+(\w+)|const\s+(\w+):\s*React\.FC)/g,
      import: /import\s+(?:{[^}]*}|\w+|\*\s+as\s+\w+)?\s*(?:,\s*(?:{[^}]*}|\w+))?\s*from\s+['"]([^'"]+)['"]/g,
      tokens: /(unifiedDesignTokens|liquidGlassTokens|quantumTokens|enhancedDesignTokens|designUtils|theme)\.([\w.]+)/g,
      props: /interface\s+(\w+Props)\s*{([^}]*)}/g,
      jsx: /<([A-Z]\w*)[^>]*>/g,
      styling: /(style|className)=\s*{([^}]+)}/g,
      appleHIG: /(systemBlue|systemRed|systemGreen|systemTeal|systemPurple|systemOrange|SF\s*Pro|-apple-system|blur\(\d+px\)|backdrop-filter|44px|touch-action)/gi,
      liquidGlass: /(backdropFilter|backdrop-filter|rgba\(\d+,\s*\d+,\s*\d+,\s*0\.\d+\)|linear-gradient.*rgba|blur\(\d+px\)|glassmorphic|glass)/gi,
      responsive: /(useEffect.*resize|window\.innerWidth|@media|breakpoint|isMobile|responsive)/gi
    };
  }

  async catalogAllComponents() {
    console.log('🔍 Starting comprehensive component cataloging...');
    
    const catalog = {
      metadata: {
        timestamp: new Date().toISOString(),
        totalFiles: 0,
        totalComponents: 0,
        directories: this.sourceDirectories
      },
      components: [],
      tokens: {},
      patterns: {},
      recommendations: [],
      applehig: [],
      liquidglass: [],
      summary: {}
    };

    // Scan all source directories
    for (const directory of this.sourceDirectories) {
      try {
        await this.scanDirectory(directory, catalog);
      } catch (error) {
        console.log(`⚠️  Directory ${directory} not found, skipping...`);
      }
    }

    // Analyze patterns and generate recommendations
    this.analyzePatterns(catalog);
    this.generateRecommendations(catalog);
    
    // Save catalog
    await this.saveCatalog(catalog);
    
    console.log(`✅ Cataloging complete! Found ${catalog.components.length} components across ${catalog.metadata.totalFiles} files`);
    return catalog;
  }

  async scanDirectory(directory, catalog) {
    const files = await this.getFilesRecursively(directory);
    
    for (const filePath of files) {
      if (this.isReactFile(filePath)) {
        try {
          const analysis = await this.analyzeFile(filePath);
          if (analysis.components.length > 0) {
            catalog.components.push(...analysis.components);
            catalog.metadata.totalFiles++;
            
            // Track token usage
            Object.assign(catalog.tokens, analysis.tokens);
            
            // Track patterns
            this.mergePatterns(catalog.patterns, analysis.patterns);
            
            // Track Apple HIG compliance
            if (analysis.appleHIG.length > 0) {
              catalog.applehig.push({
                file: filePath,
                patterns: analysis.appleHIG
              });
            }
            
            // Track Liquid Glass usage
            if (analysis.liquidGlass.length > 0) {
              catalog.liquidglass.push({
                file: filePath,
                patterns: analysis.liquidGlass
              });
            }
          }
        } catch (error) {
          console.log(`⚠️  Error analyzing ${filePath}:`, error.message);
        }
      }
    }
  }

  async analyzeFile(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const analysis = {
      components: [],
      tokens: {},
      patterns: {},
      appleHIG: [],
      liquidGlass: [],
      responsive: []
    };

    // Extract components
    const components = this.extractComponents(content, filePath);
    analysis.components = components;

    // Extract token usage
    analysis.tokens = this.extractTokenUsage(content);

    // Extract patterns
    analysis.patterns = this.extractPatterns(content);

    // Check Apple HIG compliance
    analysis.appleHIG = this.extractAppleHIGPatterns(content);

    // Check Liquid Glass usage
    analysis.liquidGlass = this.extractLiquidGlassPatterns(content);

    // Check responsive patterns
    analysis.responsive = this.extractResponsivePatterns(content);

    return analysis;
  }

  extractComponents(content, filePath) {
    const components = [];
    const lines = content.split('');
    
    // Find component definitions
    let match;
    this.patterns.component.lastIndex = 0;
    
    while ((match = this.patterns.component.exec(content)) !== null) {
      const componentName = match[1] || match[2];
      if (componentName) {
        const component = {
          name: componentName,
          filePath: filePath,
          lineCount: lines.length,
          type: this.categorizeComponent(content, componentName),
          complexity: this.calculateComplexity(content),
          imports: this.extractImports(content),
          props: this.extractProps(content),
          styling: this.extractStyling(content),
          tokens: this.extractComponentTokens(content),
          appleHIG: this.hasAppleHIGPatterns(content),
          liquidGlass: this.hasLiquidGlassPatterns(content),
          responsive: this.hasResponsivePatterns(content),
          dependencies: this.extractDependencies(content),
          exports: this.extractExports(content)
        };
        
        components.push(component);
      }
    }

    return components;
  }

  extractTokenUsage(content) {
    const tokens = {};
    let match;
    this.patterns.tokens.lastIndex = 0;
    
    while ((match = this.patterns.tokens.exec(content)) !== null) {
      const tokenSystem = match[1];
      const tokenPath = match[2];
      
      if (!tokens[tokenSystem]) {
        tokens[tokenSystem] = [];
      }
      
      if (!tokens[tokenSystem].includes(tokenPath)) {
        tokens[tokenSystem].push(tokenPath);
      }
    }
    
    return tokens;
  }

  extractAppleHIGPatterns(content) {
    const patterns = [];
    let match;
    this.patterns.appleHIG.lastIndex = 0;
    
    while ((match = this.patterns.appleHIG.exec(content)) !== null) {
      patterns.push({
        pattern: match[0],
        type: this.categorizeHIGPattern(match[0])
      });
    }
    
    return patterns;
  }

  extractLiquidGlassPatterns(content) {
    const patterns = [];
    let match;
    this.patterns.liquidGlass.lastIndex = 0;
    
    while ((match = this.patterns.liquidGlass.exec(content)) !== null) {
      patterns.push({
        pattern: match[0],
        type: this.categorizeGlassPattern(match[0])
      });
    }
    
    return patterns;
  }

  categorizeComponent(content, name) {
    const nameLower = name.toLowerCase();
    
    if (nameLower.includes('page') || nameLower.includes('layout')) return 'page';
    if (nameLower.includes('button') || nameLower.includes('input') || nameLower.includes('icon')) return devicePixelRatio'pixel';
    if (nameLower.includes('card') || nameLower.includes('form') || nameLower.includes('navigation')) return 'molecule';
    if (nameLower.includes('header') || nameLower.includes('sidebar') || nameLower.includes('dashboard')) return 'organism';
    if (nameLower.includes('provider') || nameLower.includes('context')) return 'provider';
    if (nameLower.includes('hook') || nameLower.includes('use')) return 'hook';
    
    // Check content for patterns
    if (content.includes('createContext') || content.includes('Provider')) return 'provider';
    if (content.includes('useState') && content.includes('useEffect')) return 'component';
    if (content.includes('interface') && content.includes('Props')) return 'component';
    
    return 'component';
  }

  calculateComplexity(content) {
    let complexity = 0;
    
    // Lines of code
    complexity += Math.floor(content.split('').length / 10);
    
    // Number of useState hooks
    complexity += (content.match(/useState/g) || []).length * 2;
    
    // Number of useEffect hooks
    complexity += (content.match(/useEffect/g) || []).length * 3;
    
    // Number of conditional renders
    complexity += (content.match(/{\s*\w+\s*&&/g) || []).length;
    
    // Number of ternary operators
    complexity += (content.match(/\?[^:]*:/g) || []).length;
    
    // Number of nested components
    complexity += (content.match(/<[A-Z]\w*[^>]*>/g) || []).length;
    
    return Math.min(complexity, 100); // Cap at 100
  }

  async saveCatalog(catalog) {
    // Ensure output directory exists
    await fs.mkdir(this.outputDirectory, { recursive: true });
    await fs.mkdir(path.join(this.outputDirectory, 'inventory'), { recursive: true });
    await fs.mkdir(path.join(this.outputDirectory, 'analysis'), { recursive: true });
    await fs.mkdir(path.join(this.outputDirectory, 'reports'), { recursive: true });

    // Save main catalog
    await fs.writeFile(
      path.join(this.outputDirectory, 'inventory', 'components.json'),
      JSON.stringify(catalog, null, 2)
    );

    // Save component summary
    const summary = this.generateSummary(catalog);
    await fs.writeFile(
      path.join(this.outputDirectory, 'reports', 'component-summary.md'),
      this.generateMarkdownReport(catalog, summary)
    );

    // Save token analysis
    await fs.writeFile(
      path.join(this.outputDirectory, 'analysis', 'token-usage.json'),
      JSON.stringify(catalog.tokens, null, 2)
    );

    // Save Apple HIG analysis
    await fs.writeFile(
      path.join(this.outputDirectory, 'analysis', 'apple-hig.json'),
      JSON.stringify(catalog.applehig, null, 2)
    );

    // Save Liquid Glass analysis
    await fs.writeFile(
      path.join(this.outputDirectory, 'analysis', 'liquid-glass.json'),
      JSON.stringify(catalog.liquidglass, null, 2)
    );
  }

  generateMarkdownReport(catalog, summary) {
    return `# Component Catalog Report

Generated: ${catalog.metadata.timestamp}

## Summary
- **Total Files Analyzed**: ${catalog.metadata.totalFiles}
- **Total Components Found**: ${catalog.components.length}
- **Component Types**: ${Object.keys(summary.byType).join(', ')}
- **Token Systems Used**: ${Object.keys(catalog.tokens).join(', ')}

## Components by Type
${Object.entries(summary.byType).map(([type, count]) => `- **${type}**: ${count} components`).join('')}

## Token Usage Analysis
${Object.entries(catalog.tokens).map(([system, tokens]) => `- **${system}**: ${tokens.length} unique tokens`).join('')}

## Apple HIG Compliance
- **Files with HIG patterns**: ${catalog.applehig.length}
- **Common patterns**: Touch targets, SF Pro font, system colors, backdrop filters

## Liquid Glass Usage
- **Files with glass effects**: ${catalog.liquidglass.length}
- **Common patterns**: Backdrop filters, RGBA overlays, blur effects, gradients

## Recommendations
${catalog.recommendations.map(rec => `- ${rec}`).join('')}

## Detailed Component List
${catalog.components.map(comp => `
### ${comp.name}
- **File**: ${comp.filePath}
- **Type**: ${comp.type}
- **Complexity**: ${comp.complexity}
- **Lines**: ${comp.lineCount}
- **Apple HIG**: ${comp.appleHIG ? '✅' : '❌'}
- **Liquid Glass**: ${comp.liquidGlass ? '✅' : '❌'}
- **Responsive**: ${comp.responsive ? '✅' : '❌'}
`).join('')}
`;
  }

  // Utility methods
  async getFilesRecursively(directory) {
    let files = [];
    try {
      const entries = await fs.readdir(directory, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);
        
        if (entry.isDirectory() && !this.shouldSkipDirectory(entry.name)) {
          const subFiles = await this.getFilesRecursively(fullPath);
          files = files.concat(subFiles);
        } else if (entry.isFile()) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Directory doesn't exist, skip
    }
    
    return files;
  }

  isReactFile(filePath) {
    return /\.(tsx|jsx|ts|js)$/.test(filePath) && 
           !filePath.includes('node_modules') &&
           !filePath.includes('.test.') &&
           !filePath.includes('.spec.');
  }

  shouldSkipDirectory(name) {
    return ['node_modules', '.git', '.next', 'dist', 'build', '.cache'].includes(name);
  }

  // Additional extraction methods would go here...
  extractImports(content) {
    const imports = [];
    let match;
    this.patterns.import.lastIndex = 0;
    
    while ((match = this.patterns.import.exec(content)) !== null) {
      imports.push(match[1]);
    }
    
    return imports;
  }

  extractProps(content) {
    const props = [];
    let match;
    this.patterns.props.lastIndex = 0;
    
    while ((match = this.patterns.props.exec(content)) !== null) {
      props.push({
        interface: match[1],
        definition: match[2].trim()
      });
    }
    
    return props;
  }

  // More methods...
}

// ===================================================================
// CLAUDE PROMPTS FOR COMPONENT ANALYSIS
// ===================================================================

const CLAUDE_PROMPTS = {
  
  // 1. COMPREHENSIVE COMPONENT ANALYSIS PROMPT
  componentAnalysis: `
# Component Analysis & Cataloging Request

I need you to analyze my React/TypeScript components comprehensively. Please examine the provided component files and create a detailed analysis including:

## Analysis Requirements:

### 1. Component Classification
- Identify component type (pixel, molecule, organism, template, page)
- Determine primary purpose and functionality
- Assess complexity level (1-10 scale)

### 2. Design Token Usage
- List all design tokens being used (unifiedDesignTokens, liquidGlassTokens, etc.)
- Identify hardcoded values that should use tokens
- Note token patterns and consistency

### 3. Apple HIG Compliance
- Check for Apple Human Interface Guidelines compliance
- Identify HIG-compliant patterns (44px touch targets, SF Pro font, system colors)
- Note any HIG violations

### 4. Liquid Glass Implementation
- Identify glassmorphic effects (backdrop-filter, blur, rgba overlays)
- Assess quality of glass implementation
- Note sophisticated vs basic glass effects

### 5. Responsive Design
- Check for responsive patterns and breakpoint handling
- Identify mobile-first design approaches
- Note responsive utilities and patterns

### 6. Code Quality
- Assess component structure and organization
- Check for proper TypeScript typing
- Identify potential improvements

### 7. Dependencies & Imports
- List all imports and dependencies
- Identify internal vs external dependencies
- Note any circular dependencies or issues

### 8. Styling Approach
- Categorize styling method (inline, CSS-in-JS, classes)
- Assess consistency with design system
- Identify styling patterns

## Output Format:

Please provide analysis in this structured format:

\`\`\`json
{
  "componentName": "ExampleComponent",
  "filePath": "./path/to/component.tsx",
  "classification": {
    "type": "molecule",
    "category": "navigation", 
    "complexity": 7,
    "purpose": "Primary navigation with dropdown functionality"
  },
  "tokens": {
    "used": ["unifiedDesignTokens.colors.primary", "unifiedDesignTokens.spacing.large"],
    "missing": ["Hard-coded #000000 should use tokens.colors.primary"],
    "consistency": "good"
  },
  "appleHIG": {
    "compliant": true,
    "patterns": ["44px touch targets", "SF Pro font", "backdrop-filter"],
    "violations": []
  },
  "liquidGlass": {
    "implemented": true,
    "quality": "sophisticated",
    "patterns": ["backdrop-filter: blur(16px)", "rgba overlays", "inset highlights"]
  },
  "responsive": {
    "implemented": true,
    "approach": "mobile-first",
    "breakpoints": ["768px", "1024px"]
  },
  "codeQuality": {
    "structure": "well-organized",
    "typing": "complete",
    "improvements": ["Could extract custom hook for state logic"]
  },
  "styling": {
    "approach": "inline-styles",
    "systemConsistency": "excellent",
    "patterns": ["Design token usage", "Consistent spacing"]
  },
  "recommendations": [
    "Extract state logic to custom hook",
    "Add error boundary",
    "Consider memoization for performance"
  ]
}
\`\`\`

## Focus Areas:
- Prioritize identifying Apple HIG signature elements
- Look for sophisticated liquid glass implementations  
- Note components that could serve as foundation for other components
- Identify patterns that should be standardized across the system

Please analyze each component file I provide using this framework.
`,

  // 2. TOKEN USAGE ANALYSIS PROMPT
  tokenAnalysis: `
# Design Token Usage Analysis

Please analyze the design token usage across my components and provide recommendations for standardization.

## Analysis Focus:

### 1. Token Systems Inventory
- List all token systems found (unifiedDesignTokens, liquidGlassTokens, quantumTokens, etc.)
- Identify token categories (colors, spacing, typography, effects)
- Note embedded vs imported token patterns

### 2. Usage Patterns
- Map which components use which token systems
- Identify inconsistent token usage
- Find hardcoded values that should use tokens

### 3. Hierarchy Analysis
- Determine token system hierarchy and relationships
- Identify conflicts between token systems
- Recommend consolidation opportunities

### 4. Apple HIG Compliance
- Check token values against Apple HIG standards
- Verify touch target sizes (44px minimum)
- Validate color contrast ratios
- Confirm spacing follows 8pt grid

### 5. Liquid Glass Implementation
- Analyze glass effect tokens and utilities
- Check backdrop-filter implementations
- Verify consistent glass patterns

## Output Format:

Provide analysis as:

1. **Token Systems Summary** - Overview of all systems found
2. **Usage Mapping** - Which components use which tokens
3. **Standardization Recommendations** - How to consolidate and improve
4. **Migration Plan** - Steps to unify token usage
5. **Quality Assessment** - Current state and target improvements

Focus on preserving sophisticated effects while creating consistency.
`,

  // 3. APPLE HIG COMPLIANCE AUDIT PROMPT
  appleHIGAudit: `
# Apple HIG Compliance Audit

Please audit my components for Apple Human Interface Guidelines compliance and identify signature Apple design patterns.

## Audit Criteria:

### 1. Typography
- SF Pro font family usage
- Apple's type scale implementation
- Proper text hierarchy
- Dynamic Type support consideration

### 2. Layout & Spacing
- 8pt grid system adherence
- Consistent margin and padding patterns
- Proper alignment and spacing

### 3. Touch Targets
- Minimum 44pt touch targets
- Proper spacing between interactive elements
- Accessibility considerations

### 4. Color Usage
- System color implementation
- Proper contrast ratios (WCAG AA)
- Dark/light mode considerations
- Semantic color usage

### 5. Effects & Materials
- Backdrop filter usage
- Blur effects and glassmorphism
- Shadow implementations
- Material layering

### 6. Navigation Patterns
- Standard navigation implementations
- Breadcrumb patterns
- Tab navigation compliance

### 7. Animation & Motion
- Apple's timing curves
- Appropriate animation durations
- Meaningful motion patterns

## Output Requirements:

Rate each component's HIG compliance (1-10) and provide:
- ✅ Compliant patterns found
- ⚠️ Areas needing improvement  
- ❌ Clear violations
- 🔧 Specific fixes needed
- 🌟 Exemplary implementations

Prioritize identifying components that could serve as HIG-compliant foundation for the design system.
`,

  // 4. FOUNDATION COMPONENT IDENTIFICATION PROMPT
  foundationIdentification: `
# Foundation Component Identification

Help me identify which components should serve as foundation for my design system.

## Evaluation Criteria:

### 1. Quality Assessment
- Code quality and organization
- Design sophistication
- Performance optimization
- Accessibility implementation

### 2. Reusability Potential
- Generic vs specific implementation
- Prop flexibility
- Styling customization options
- Composability

### 3. Design System Alignment
- Consistent token usage
- Apple HIG compliance
- Liquid glass implementation quality
- Responsive design patterns

### 4. Complexity Appropriateness
- Right level of complexity for its type
- Clear separation of concerns
- Maintainable structure

### 5. Pattern Completeness
- All necessary states implemented
- Proper error handling
- Loading states
- Interactive feedback

## Classification Request:

For each component, classify as:

- 🏆 **Foundation-Ready**: Perfect as-is for design system
- ⭐ **Near-Foundation**: Minor improvements needed
- 🔧 **Needs-Work**: Significant improvements required
- 📦 **Specialized**: Good for specific use cases
- 🗑️ **Redundant**: Covered by other components

## Focus Areas:

1. Identify your "winner" components (like EnhancedPetersenGamesDashboard)
2. Find Apple HIG signature implementations
3. Locate sophisticated liquid glass patterns
4. Discover responsive layout patterns
5. Note excellent token usage examples

Provide specific recommendations for elevating components to foundation status.
`,

  // 5. DESIGN SYSTEM ORGANIZATION PROMPT
  organizationStrategy: `
# Design System Organization Strategy

Based on my component analysis, help me organize components into a coherent design system structure.

## Organization Goals:

### 1. quantum-pixel Design Structure
- Categorize components into pixels, molecules, organisms, templates
- Identify dependencies and hierarchies
- Plan component composition strategies

### 2. Token System Consolidation
- Recommend unified token architecture
- Plan migration from multiple token systems
- Preserve sophisticated effects while standardizing

### 3. Foundation Layer Definition
- Identify core layout components
- Plan responsive system integration
- Define page template patterns

### 4. Theme System Design
- Plan multi-theme architecture (gaming, e-commerce, enterprise)
- Design theme switching mechanisms
- Ensure consistent behavior across themes

### 5. Provider Architecture
- Design context provider structure
- Plan state management approach
- Integrate responsive and theme providers

## Deliverables Needed:

1. **Component Hierarchy Map** - Show relationships and dependencies
2. **Migration Roadmap** - Step-by-step improvement plan
3. **Architecture Recommendations** - File structure and organization
4. **Implementation Priority** - Which components to tackle first
5. **Quality Standards** - Criteria for design system inclusion

Focus on preserving the sophisticated liquid glass effects and Apple HIG compliance while creating a scalable, maintainable system.
`
};

// ===================================================================
// USAGE SCRIPT
// ===================================================================

// Run the cataloger
async function runCatalogger() {
  const cataloger = new ComponentCatalogger({
    sourceDirectories: [
      './components',
      './src/components',
      './quantum-spatial', 
      './Foundation',
      './Ecommerce-design-system',
      // Add your specific directories
    ],
    outputDirectory: './design-system/catalog'
  });

  try {
    const catalog = await cataloger.catalogAllComponents();
    
    console.log('📋 CATALOGING COMPLETE!');
    console.log(`Results saved to: ./design-system/catalog/`);
    console.log(`📊 Summary:`);
    console.log(`- ${catalog.components.length} components found`);
    console.log(`- ${catalog.metadata.totalFiles} files analyzed`);
    console.log(`- ${Object.keys(catalog.tokens).length} token systems detected`);
    console.log(`- ${catalog.applehig.length} files with Apple HIG patterns`);
    console.log(`- ${catalog.liquidglass.length} files with Liquid Glass effects`);
    
    return catalog;
  } catch (error) {
    console.error('❌ Cataloging failed:', error);
  }
}

// Export for use
module.exports = {
  ComponentCatalogger,
  CLAUDE_PROMPTS,
  runCatalogger
};

// ===================================================================
// PACKAGE.JSON SCRIPTS TO ADD
// ===================================================================

/*
Add these scripts to your package.json:

{
  "scripts": {
    "catalog:components": "node design-system/tools/scripts/catalog-components.js",
    "analyze:tokens": "node design-system/tools/scripts/analyze-tokens.js", 
    "validate:hig": "node design-system/tools/scripts/validate-apple-hig.js",
    "build:design-system": "npm run catalog:components && npm run build:tokens",
    "audit:design-system": "npm run catalog:components && npm run analyze:tokens && npm run validate:hig"
  }
}
*/

// ===================================================================
// USAGE WITH CLAUDE
// ===================================================================

/*
1. Run the cataloger script:
   npm run catalog:components

2. Use the generated files with Claude prompts:
   - Send component files + CLAUDE_PROMPTS.componentAnalysis
   - Send token analysis + CLAUDE_PROMPTS.tokenAnalysis  
   - Send specific components + CLAUDE_PROMPTS.appleHIGAudit
   - Use foundationIdentification prompt for component selection
   - Use organizationStrategy for overall design system planning

3. Iterate based on Claude's recommendations:
   - Extract foundation components
   - Consolidate token systems
   - Implement recommended improvements
   - Re-run cataloger to track progress
*/