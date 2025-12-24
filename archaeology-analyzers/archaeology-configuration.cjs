#!/usr/bin/env node

/**
 * Configuration Archaeology Tool
 * Analyzes the massive archive to find original, consistent configs
 *
 * Goal: Find the "before base service" working configuration
 */

const fs = require('fs');
const path = require('path');

class ConfigArchaeologist {
  constructor() {
    this.projectRoot = '/Users/pennyplatt/9bit-studios/Oksana';
    
    // Scan multiple locations for service files
    this.scanDirectories = [
      path.join(this.projectRoot, 'services'),
      path.join(this.projectRoot, 'scripts'),
      path.join(this.projectRoot, 'src'),
      path.join(this.projectRoot, 'lib'),
      path.join(this.projectRoot, 'utils'),
      path.join(this.projectRoot, 'config'),
      path.join(this.projectRoot, 'archive'),
      path.join(this.projectRoot, 'backup'),
      path.join(this.projectRoot, 'old'),
      // Add root level files too
      this.projectRoot
    ];
    
    // Also check current active directories
    this.currentDirs = [
      path.join(this.projectRoot, 'scripts'),
      path.join(this.projectRoot, 'services/frontend-design'),
      path.join(this.projectRoot, 'services/brand-aware-content')
    ];
    
    this.findings = {
      originalConfigs: [],
      baseServiceIntroduced: [],
      workingPairs: [],
      conflicts: [],
      recommendations: [],
      scannedDirectories: []
    };
  }

  async excavate() {
    console.log('🏛️  Configuration Archaeology: Finding Original Working Configs');
    console.log('=' .repeat(70));
    console.log('🔍 Analyzing archive for consistent configurations...');

    // Step 1: Find all service files and their dates
    await this.catalogServiceFiles();
    
    // Step 2: Identify when base-service was introduced
    await this.identifyBaseServiceIntroduction();
    
    // Step 3: Find working pairs that agree with each other
    await this.findWorkingPairs();
    
    // Step 4: Analyze import patterns for consistency
    await this.analyzeImportPatterns();
    
    // Step 5: Generate restoration recommendations
    await this.generateRecommendations();
    
    return this.findings;
  }

  async catalogServiceFiles() {
    console.log('📁 Step 1: Cataloging all service files...');
    
    const serviceTypes = [
      'service-manager.js',
      'start-services.js',
      'frontend-design-service.js',
      'frontend-design-service-shopify.js',
      'enhanced-petersen-qa-service.js',
      'content-acceleration-service.js'
    ];

    for (const serviceType of serviceTypes) {
      const matches = await this.findAllVersions(serviceType);
      console.log(`  📄 ${serviceType}: ${matches.length} versions found`);
      
      // Analyze each version for consistency markers
      for (const match of matches) {
        const analysis = await this.analyzeServiceFile(match);
        this.findings.originalConfigs.push({
          file: match,
          type: serviceType,
          ...analysis
        });
      }
    }
  }

  async findAllVersions(filename) {
    const matches = [];
    
    const searchRecursive = (dir) => {
      if (!fs.existsSync(dir)) return;
      
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          searchRecursive(fullPath);
        } else if (item === filename) {
          matches.push({
            path: fullPath,
            relativePath: path.relative(this.projectRoot, fullPath),
            modified: stat.mtime,
            size: stat.size
          });
        }
      }
    };

    searchRecursive(this.archiveRoot);
    
    // Also check current active directories
    for (const dir of this.currentDirs) {
      const currentPath = path.join(dir, filename);
      if (fs.existsSync(currentPath)) {
        const stat = fs.statSync(currentPath);
        matches.push({
          path: currentPath,
          relativePath: path.relative(this.projectRoot, currentPath),
          modified: stat.mtime,
          size: stat.size,
          current: true
        });
      }
    }

    return matches.sort((a, b) => a.modified - b.modified); // Oldest first
  }

  async analyzeServiceFile(fileInfo) {
    try {
      const content = fs.readFileSync(fileInfo.path, 'utf8');
      
      const analysis = {
        requiresBaseService: content.includes("require('./base-service')") || content.includes('require("./base-service")'),
        requiresServices: this.extractRequires(content),
        hasCircularRefs: this.detectCircularReferences(content),
        moduleOverride: content.includes('Module._nodeModulePaths'),
        complexity: this.calculateComplexity(content),
        errorHandling: content.includes('try {') && content.includes('catch'),
        hasAppleIntelligence: content.includes('Apple Intelligence') || content.includes('AppleIntelligence'),
        dateMarkers: this.extractDateMarkers(content)
      };

      return analysis;
    } catch (error) {
      return { error: error.message };
    }
  }

  extractRequires(content) {
    const requirePattern = /require\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g;
    const requires = [];
    let match;
    
    while ((match = requirePattern.exec(content)) !== null) {
      requires.push(match[1]);
    }
    
    return requires;
  }

  detectCircularReferences(content) {
    // Look for patterns that might cause circular references
    const patterns = [
      'require.*service.*require',
      'this\._nodeModulePaths.*this\._nodeModulePaths',
      'Module\._nodeModulePaths.*function.*this\._nodeModulePaths'
    ];
    
    return patterns.some(pattern => new RegExp(pattern, 'i').test(content));
  }

  calculateComplexity(content) {
    const lines = content.split('').length;
    const functions = (content.match(/function|async|=>/g) || []).length;
    const classes = (content.match(/class\s+\w+/g) || []).length;
    
    return {
      lines,
      functions,
      classes,
      score: lines + (functions * 2) + (classes * 5)
    };
  }

  extractDateMarkers(content) {
    const datePatterns = [
      /\d{4}-\d{2}-\d{2}/g,
      /@date\s+(\d{4}-\d{2}-\d{2})/g,
      /Last Updated.*(\d{4}-\d{2}-\d{2})/g,
      /Version.*(\d+\.\d+\.\d+)/g
    ];
    
    const dates = [];
    for (const pattern of datePatterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        dates.push(match[0]);
      }
    }
    
    return dates;
  }

  async identifyBaseServiceIntroduction() {
    console.log('🔍 Step 2: Identifying when base-service was introduced...');
    
    const withBaseService = this.findings.originalConfigs.filter(config => config.requiresBaseService);
    const withoutBaseService = this.findings.originalConfigs.filter(config => !config.requiresBaseService && !config.error);
    
    console.log(`  📊 Files requiring base-service: ${withBaseService.length}`);
    console.log(`  📊 Files WITHOUT base-service: ${withoutBaseService.length}`);
    
    // Show specific problematic files
    if (withBaseService.length > 0) {
      console.log('  🚨 Files currently requiring base-service:');
      withBaseService.forEach(config => {
        console.log(`     ${config.relativePath || config.file?.relativePath}`);
      });
    }
    
    // Find the transition point
    if (withoutBaseService.length > 0) {
      const latestWithout = withoutBaseService
        .filter(config => config.file?.modified)
        .sort((a, b) => b.file.modified - a.file.modified)[0];
      
      if (latestWithout) {
        console.log(`  📅 Latest config WITHOUT base-service:`);
        console.log(`     File: ${latestWithout.file.relativePath}`);
        console.log(`     Modified: ${latestWithout.file.modified.toISOString()}`);
        console.log(`     Size: ${latestWithout.file.size} bytes`);
        
        this.findings.recommendations.push({
          type: 'ROLLBACK_CANDIDATE',
          file: latestWithout.file.relativePath,
          reason: 'Latest working config before base-service introduction',
          confidence: 'HIGH',
          action: `Copy this file to replace current broken version`
        });
      }
    }
    
    this.findings.baseServiceIntroduced = withBaseService;
  }

  async findWorkingPairs() {
    console.log('🔗 Step 3: Finding working pairs that agree...');
    
    // Group configs by directory/date to find consistent sets
    const configGroups = {};
    
    for (const config of this.findings.originalConfigs) {
      if (config.error) continue;
      
      // Handle different path structures
      const relativePath = config.relativePath || config.file?.relativePath;
      if (!relativePath) {
        console.warn(`⚠️  Skipping config with no path: ${config.type}`);
        continue;
      }
      
      const dir = path.dirname(relativePath);
      if (!configGroups[dir]) {
        configGroups[dir] = [];
      }
      configGroups[dir].push(config);
    }
    
    // Analyze each group for consistency
    for (const [dir, configs] of Object.entries(configGroups)) {
      if (configs.length < 2) continue;
      
      const consistency = this.analyzeGroupConsistency(configs);
      if (consistency.score > 0.7) {
        console.log(`  ✅ Consistent group found: ${dir}`);
        console.log(`     Consistency score: ${(consistency.score * 100).toFixed(1)}%`);
        console.log(`     Files: ${configs.length}`);
        
        // Show which files are in this group
        configs.forEach(config => {
          const filePath = config.relativePath || config.file?.relativePath || 'unknown';
          const needsBase = config.requiresBaseService ? '❌ needs base-service' : '✅ standalone';
          console.log(`       ${config.type}: ${needsBase}`);
        });
        
        this.findings.workingPairs.push({
          directory: dir,
          configs: configs,
          consistency: consistency
        });
      }
    }
  }

  analyzeGroupConsistency(configs) {
    let score = 0;
    let checks = 0;
    
    // Check if all have same base-service requirement
    const baseServiceStates = configs.map(c => c.requiresBaseService);
    const baseServiceConsistent = baseServiceStates.every(state => state === baseServiceStates[0]);
    if (baseServiceConsistent) score += 0.3;
    checks += 1;
    
    // Check module override consistency
    const moduleOverrideStates = configs.map(c => c.moduleOverride);
    const moduleOverrideConsistent = moduleOverrideStates.every(state => state === moduleOverrideStates[0]);
    if (moduleOverrideConsistent) score += 0.2;
    checks += 1;
    
    // Check circular reference patterns
    const circularStates = configs.map(c => c.hasCircularRefs);
    const circularConsistent = circularStates.every(state => state === circularStates[0]);
    if (circularConsistent) score += 0.2;
    checks += 1;
    
    // Check if they avoid circular refs (preferred)
    const noCircularRefs = circularStates.every(state => !state);
    if (noCircularRefs) score += 0.3;
    checks += 1;
    
    return {
      score: score,
      checks: checks,
      details: {
        baseServiceConsistent,
        moduleOverrideConsistent,
        circularConsistent,
        noCircularRefs
      }
    };
  }

  async analyzeImportPatterns() {
    console.log('📦 Step 4: Analyzing import patterns...');
    
    const importPatterns = {};
    
    for (const config of this.findings.originalConfigs) {
      if (config.error || !config.requiresServices) continue;
      
      for (const req of config.requiresServices) {
        if (!importPatterns[req]) {
          importPatterns[req] = { count: 0, files: [] };
        }
        importPatterns[req].count++;
        
        const filePath = config.relativePath || config.file?.relativePath || 'unknown';
        importPatterns[req].files.push(filePath);
      }
    }
    
    // Find most common patterns
    const commonPatterns = Object.entries(importPatterns)
      .sort(([,a], [,b]) => b.count - a.count)
      .slice(0, 10);
    
    console.log('  📊 Most common import patterns:');
    for (const [pattern, data] of commonPatterns) {
      console.log(`    ${pattern}: ${data.count} files`);
    }
    
    // Identify problematic patterns
    const problematic = commonPatterns.filter(([pattern]) => 
      pattern.includes('./base-service') || pattern.includes('service-manager-bridge')
    );
    
    if (problematic.length > 0) {
      console.log('  ⚠️  Problematic patterns detected:');
      for (const [pattern, data] of problematic) {
        console.log(`    ${pattern}: ${data.count} files`);
      }
    }
  }

  async generateRecommendations() {
    console.log('🎯 Step 5: Generating restoration recommendations...');
    
    // Find the best candidate for restoration
    const candidates = this.findings.workingPairs
      .filter(group => group.configs.every(c => !c.requiresBaseService))
      .sort((a, b) => b.consistency.score - a.consistency.score);
    
    if (candidates.length > 0) {
      const bestCandidate = candidates[0];
      console.log(`  🏆 BEST RESTORATION CANDIDATE:`);
      console.log(`     Directory: ${bestCandidate.directory}`);
      console.log(`     Consistency: ${(bestCandidate.consistency.score * 100).toFixed(1)}%`);
      console.log(`     Files: ${bestCandidate.configs.length}`);
      
      this.findings.recommendations.push({
        type: 'RESTORE_FROM_ARCHIVE',
        directory: bestCandidate.directory,
        reason: 'Highest consistency score, no base-service dependency',
        confidence: 'VERY_HIGH',
        action: 'Copy these files to replace current broken ones'
      });
      
      // List specific files to restore
      console.log(`  📋 Files to restore:`);
      for (const config of bestCandidate.configs) {
        const filePath = config.relativePath || config.file?.relativePath || 'unknown';
        const fileType = config.type || 'unknown';
        console.log(`     ${fileType}: ${filePath}`);
      }
    }
    
    // Look for simple fixes
    const currentBroken = this.findings.originalConfigs.filter(c => c.current && c.requiresBaseService);
    if (currentBroken.length > 0) {
      this.findings.recommendations.push({
        type: 'CREATE_MISSING_BASE_SERVICE',
        reason: 'Current files expect base-service but it doesn\'t exist',
        confidence: 'HIGH',
        action: 'Create base-service.js or remove the dependency'
      });
    }
  }

  async generateReport() {
    const report = `
🏛️  CONFIGURATION ARCHAEOLOGY REPORT
${'='.repeat(50)}

📊 DISCOVERY SUMMARY:
• Original configs found: ${this.findings.originalConfigs.length}
• Working pairs identified: ${this.findings.workingPairs.length}
• Base-service dependent files: ${this.findings.baseServiceIntroduced.length}

🎯 TOP RECOMMENDATIONS:
${this.findings.recommendations.map(r => `
• ${r.type}: ${r.reason}
  Confidence: ${r.confidence}
  Action: ${r.action}
`).join('')}

📋 IMMEDIATE ACTIONS:
1. Create missing base-service.js (quick fix)
2. OR restore from best archive candidate
3. Test restored configuration
4. Clean up archive once working

🔍 ANALYSIS DETAILS:
${this.findings.workingPairs.map(group => `
Directory: ${group.directory}
Consistency: ${(group.consistency.score * 100).toFixed(1)}%
Files: ${group.configs.length}
`).join('')}
`;

    return report;
  }
}

// Export for use
module.exports = ConfigArchaeologist;

// Run if called directly
if (require.main === module) {
  const archaeologist = new ConfigArchaeologist();
  
  archaeologist.excavate()
    .then(async () => {
      const report = await archaeologist.generateReport();
      console.log(report);
      
      // Save findings to file
      const fs = require('fs');
      const outputPath = '/Users/pennyplatt/Documents/Oksana/AppleIntelligenceStrategicDirector/archaeology-findings.json';
      fs.writeFileSync(outputPath, JSON.stringify(archaeologist.findings, null, 2));
      console.log(`💾 Detailed findings saved to: archaeology-findings.json`);
    })
    .catch(console.error);
}
