/**
 * Quantum Glass QA Service
 * Comprehensive QA validation for Petersen Games Glass Theme
 * Integrates Apple Intelligence Strategic Director patterns
 * Version: 1.0.0
 */

class QuantumGlassQAService {
  constructor() {
    this.report = {
      phase: null,
      timestamp: new Date().toISOString(),
      issues: [],
      warnings: [],
      validations: [],
      recommendations: []
    };
    
    this.phases = {
      FOUNDATION: 'foundation',
      TYPOGRAPHY: 'typography',
      GLASS_EFFECTS: 'glass-effects',
      LAYOUT: 'layout',
      MOBILE: 'mobile',
      JAVASCRIPT: 'javascript',
      PERFORMANCE: 'performance'
    };
    
    this.initializeService();
  }

  initializeService() {
    console.log('🔮 Quantum Glass QA Service Initialized');
    console.log('📱 Apple Intelligence Strategic Director Integration Active');
  }

  /**
   * Phase 1: Foundation Token Validation
   */
  async validateFoundationTokens() {
    this.report.phase = this.phases.FOUNDATION;
    console.log('🏗️ PHASE 1: Foundation Token Validation');
    
    const validations = [
      this.checkCSSLoadingOrder(),
      this.validateQuantumFoundationTokens(),
      this.checkVariableFallbacks(),
      this.validateColorSystem(),
      this.checkSpacingScale()
    ];
    
    await Promise.all(validations);
    return this.generatePhaseReport();
  }

  checkCSSLoadingOrder() {
    const expectedOrder = [
      'QuantumFoundation.css',
      'priority-foundation.css',
      'base.css',
      'global-glass-theme.css',
      'glass-foundation.css'
    ];
    
    const stylesheets = Array.from(document.styleSheets);
    const loadedOrder = stylesheets
      .map(sheet => sheet.href)
      .filter(href => href)
      .map(href => href.split('/').pop());
    
    expectedOrder.forEach((file, index) => {
      if (!loadedOrder.includes(file)) {
        this.addIssue('CRITICAL', `Missing required CSS file: ${file}`);
      } else {
        const actualIndex = loadedOrder.indexOf(file);
        if (actualIndex > index + 2) {
          this.addWarning(`${file} loaded later than expected (position ${actualIndex})`);
        }
      }
    });
    
    this.addValidation('CSS Loading Order', loadedOrder.join(' → '));
  }

  validateQuantumFoundationTokens() {
    const requiredTokens = [
      // Typography
      '--font-paragraph--family',
      '--font-h1--family',
      '--font-h2--family',
      '--font-h3--family',
      '--font-h4--family',
      '--font-h5--family',
      '--font-h6--family',
      
      // Spacing
      '--foundation-space-xs',
      '--foundation-space-sm',
      '--foundation-space-md',
      '--foundation-space-lg',
      '--foundation-space-xl',
      
      // Glass Effects
      '--glass-surface',
      '--glass-surface-hover',
      '--glass-border',
      '--glass-blur',
      '--glass-effect',
      
      // Colors
      '--foundation-background-primary',
      '--foundation-foreground-primary',
      '--foundation-accent-primary',
      '--foundation-interactive-primary'
    ];
    
    const computedStyle = getComputedStyle(document.documentElement);
    
    requiredTokens.forEach(token => {
      const value = computedStyle.getPropertyValue(token).trim();
      if (!value) {
        this.addIssue('HIGH', `Missing foundation token: ${token}`);
      } else {
        this.addValidation(token, value);
      }
    });
  }

  checkVariableFallbacks() {
    // Scan for problematic fallback patterns
    const stylesheets = Array.from(document.styleSheets);
    
    stylesheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach(rule => {
          if (rule.style) {
            const cssText = rule.style.cssText;
            // Check for var() with fallbacks
            const fallbackPattern = /var\([^,)]+,\s*[^)]+\)/g;
            const matches = cssText.match(fallbackPattern);
            
            if (matches) {
              matches.forEach(match => {
                if (!match.includes('glass') && !match.includes('foundation')) {
                  this.addWarning(`Fallback value found: ${match} in ${rule.selectorText}`);
                }
              });
            }
          }
        });
      } catch (e) {
        // Cross-origin stylesheets will throw
      }
    });
  }

  /**
   * Phase 2: Typography Validation
   */
  async validateTypography() {
    this.report.phase = this.phases.TYPOGRAPHY;
    console.log('✏️ PHASE 2: Typography Validation');
    
    const validations = [
      this.checkAppleFonts(),
      this.validateFontHierarchy(),
      this.checkFontOverrides(),
      this.validateDynamicType()
    ];
    
    await Promise.all(validations);
    return this.generatePhaseReport();
  }

  checkAppleFonts() {
    const appleFont = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif';
    const elements = document.querySelectorAll('*');
    const nonAppleFonts = new Set();
    
    elements.forEach(el => {
      const computed = getComputedStyle(el);
      const fontFamily = computed.fontFamily;
      
      if (fontFamily && !fontFamily.includes('-apple-system') && !fontFamily.includes('SF Pro')) {
        nonAppleFonts.add({
          element: el.tagName + (el.className ? `.${el.className.split(' ')[0]}` : ''),
          font: fontFamily
        });
      }
    });
    
    if (nonAppleFonts.size > 0) {
      nonAppleFonts.forEach(item => {
        this.addIssue('MEDIUM', `Non-Apple font detected on ${item.element}: ${item.font}`);
      });
    } else {
      this.addValidation('Apple Fonts', 'All elements using Apple native fonts ✅');
    }
  }

  checkFontOverrides() {
    // Check for !important font overrides
    const inlineStyles = document.querySelectorAll('[style*="font-family"]');
    inlineStyles.forEach(el => {
      if (el.style.cssText.includes('!important')) {
        this.addIssue('HIGH', `Font override with !important on ${el.tagName}: ${el.style.fontFamily}`);
      }
    });
    
    // Check for JavaScript font injections
    const styleElements = document.querySelectorAll('style');
    styleElements.forEach(style => {
      if (style.textContent.includes('font-family') && style.textContent.includes('!important')) {
        this.addWarning('JavaScript font injection detected with !important');
      }
    });
  }

  /**
   * Phase 3: Glass Effects Validation
   */
  async validateGlassEffects() {
    this.report.phase = this.phases.GLASS_EFFECTS;
    console.log('🫧 PHASE 3: Glass Effects Validation');
    
    const validations = [
      this.checkGlassComponents(),
      this.validateBackdropFilters(),
      this.checkGlassConsistency(),
      this.validateDarkMode()
    ];
    
    await Promise.all(validations);
    return this.generatePhaseReport();
  }

  checkGlassComponents() {
    const glassComponents = [
      '.glass-top-header',
      '.glass-filter-bar',
      '.glass-filter-sidebar',
      '.glass-card',
      '.glass-button',
      '.glass-input'
    ];
    
    glassComponents.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        this.addWarning(`No ${selector} components found`);
        return;
      }
      
      elements.forEach(el => {
        const computed = getComputedStyle(el);
        
        // Check backdrop filter
        const backdropFilter = computed.backdropFilter || computed.webkitBackdropFilter;
        if (!backdropFilter || backdropFilter === 'none') {
          this.addIssue('HIGH', `Missing backdrop-filter on ${selector}`);
        }
        
        // Check background transparency
        const bgColor = computed.backgroundColor;
        if (!bgColor.includes('rgba') && !bgColor.includes('transparent')) {
          this.addWarning(`Opaque background on ${selector} - should be transparent`);
        }
      });
    });
  }

  /**
   * Phase 4: Layout Validation
   */
  async validateLayout() {
    this.report.phase = this.phases.LAYOUT;
    console.log('📐 PHASE 4: Layout Validation');
    
    const validations = [
      this.checkLayoutStructure(),
      this.validateSpacing(),
      this.checkOverflows(),
      this.validateTouchTargets()
    ];
    
    await Promise.all(validations);
    return this.generatePhaseReport();
  }

  checkLayoutStructure() {
    // Check for proper header heights
    const header = document.querySelector('.glass-top-header');
    if (header) {
      const height = header.offsetHeight;
      if (height !== 80 && window.innerWidth > 768) {
        this.addWarning(`Desktop header height is ${height}px, expected 80px`);
      }
    }
    
    // Check main content padding
    const mainContent = document.querySelector('#MainContent');
    if (mainContent) {
      const computed = getComputedStyle(mainContent);
      if (computed.paddingTop !== '0px') {
        this.addIssue('MEDIUM', `MainContent has top padding: ${computed.paddingTop}`);
      }
    }
  }

  validateTouchTargets() {
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [role="button"]');
    const minSize = 44; // Apple HIG minimum
    
    interactiveElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width < minSize || rect.height < minSize) {
        this.addIssue('HIGH', `Touch target too small: ${el.tagName} (${rect.width}x${rect.height}px)`);
      }
    });
  }

  /**
   * Phase 5: Mobile Validation
   */
  async validateMobile() {
    this.report.phase = this.phases.MOBILE;
    console.log('📱 PHASE 5: Mobile Validation');
    
    if (window.innerWidth > 768) {
      this.addWarning('Mobile validation requires viewport width <= 768px');
      return this.generatePhaseReport();
    }
    
    const validations = [
      this.checkMobileLayout(),
      this.validateMobileTypography(),
      this.checkMobilePerformance()
    ];
    
    await Promise.all(validations);
    return this.generatePhaseReport();
  }

  /**
   * Phase 6: JavaScript Validation
   */
  async validateJavaScript() {
    this.report.phase = this.phases.JAVASCRIPT;
    console.log('⚡ PHASE 6: JavaScript Validation');
    
    const validations = [
      this.checkJSOverrides(),
      this.validateEventListeners(),
      this.checkGlobalPollution()
    ];
    
    await Promise.all(validations);
    return this.generatePhaseReport();
  }

  checkJSOverrides() {
    // Check for filter-enhancements.js overrides
    const appleFont = document.getElementById('apple-font-override');
    if (appleFont) {
      this.addIssue('HIGH', 'filter-enhancements.js font override detected');
    }
    
    // Check for inline event handlers
    const inlineHandlers = document.querySelectorAll('[onclick], [onchange], [onsubmit]');
    if (inlineHandlers.length > 0) {
      this.addWarning(`${inlineHandlers.length} inline event handlers found - consider using addEventListener`);
    }
  }

  /**
   * Phase 7: Performance Validation
   */
  async validatePerformance() {
    this.report.phase = this.phases.PERFORMANCE;
    console.log('🦄 PHASE 7: Performance Validation');
    
    const validations = [
      this.checkCSSSize(),
      this.validateAnimations(),
      this.checkImageOptimization()
    ];
    
    await Promise.all(validations);
    return this.generatePhaseReport();
  }

  // Helper Methods
  addIssue(severity, message) {
    this.report.issues.push({ severity, message, phase: this.report.phase });
  }

  addWarning(message) {
    this.report.warnings.push({ message, phase: this.report.phase });
  }

  addValidation(key, value) {
    this.report.validations.push({ key, value, phase: this.report.phase });
  }

  addRecommendation(message) {
    this.report.recommendations.push({ message, phase: this.report.phase });
  }

  generatePhaseReport() {
    const phase = this.report.phase;
    const phaseIssues = this.report.issues.filter(i => i.phase === phase);
    const phaseWarnings = this.report.warnings.filter(w => w.phase === phase);
    
    console.log(`📊 ${phase.toUpperCase()} Phase Results:`);
    console.log(`✅ Validations: ${this.report.validations.filter(v => v.phase === phase).length}`);
    console.log(`⚠️  Warnings: ${phaseWarnings.length}`);
    console.log(`❌ Issues: ${phaseIssues.length}`);
    
    return {
      phase,
      issues: phaseIssues,
      warnings: phaseWarnings,
      validations: this.report.validations.filter(v => v.phase === phase)
    };
  }

  /**
   * Run Complete QA Suite
   */
  async runCompleteQA() {
    console.log('🦄 Starting Complete Quantum Glass QA Service');
    console.log('================================================');
    
    const phases = [
      () => this.validateFoundationTokens(),
      () => this.validateTypography(),
      () => this.validateGlassEffects(),
      () => this.validateLayout(),
      () => this.validateMobile(),
      () => this.validateJavaScript(),
      () => this.validatePerformance()
    ];
    
    for (const phase of phases) {
      await phase();
      await this.delay(100); // Brief pause between phases
    }
    
    return this.generateFinalReport();
  }

  generateFinalReport() {
    const totalIssues = this.report.issues.length;
    const criticalIssues = this.report.issues.filter(i => i.severity === 'CRITICAL').length;
    const highIssues = this.report.issues.filter(i => i.severity === 'HIGH').length;
    
    console.log('🤓 FINAL QA REPORT');
    console.log('==========================================');
    console.log(`Total Issues: ${totalIssues}`);
    console.log(`- Critical: ${criticalIssues}`);
    console.log(`- High: ${highIssues}`);
    console.log(`- Medium: ${totalIssues - criticalIssues - highIssues}`);
    console.log(`Warnings: ${this.report.warnings.length}`);
    console.log(`Successful Validations: ${this.report.validations.length}`);
    console.log('==========================================');
    
    // Priority recommendations
    if (criticalIssues > 0) {
      console.log('🚨 PRIORITY ACTIONS:');
      this.report.issues
        .filter(i => i.severity === 'CRITICAL')
        .forEach(issue => console.log(`  - ${issue.message}`));
    }
    
    return this.report;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Run Specific Phase
   */
  async runPhase(phaseName) {
    const phaseMap = {
      [this.phases.FOUNDATION]: () => this.validateFoundationTokens(),
      [this.phases.TYPOGRAPHY]: () => this.validateTypography(),
      [this.phases.GLASS_EFFECTS]: () => this.validateGlassEffects(),
      [this.phases.LAYOUT]: () => this.validateLayout(),
      [this.phases.MOBILE]: () => this.validateMobile(),
      [this.phases.JAVASCRIPT]: () => this.validateJavaScript(),
      [this.phases.PERFORMANCE]: () => this.validatePerformance()
    };
    
    if (phaseMap[phaseName]) {
      return await phaseMap[phaseName]();
    } else {
      console.error(`Unknown phase: ${phaseName}`);
      console.log('Available phases:', Object.values(this.phases));
    }
  }
}

// Initialize and export
const qaService = new QuantumGlassQAService();

// Auto-run foundation check on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('🔍 Running automatic foundation check...');
    qaService.runPhase('foundation');
  });
} else {
  qaService.runPhase('foundation');
}

// Export for global use
window.QuantumGlassQA = qaService;

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  export default QuantumGlassQAService;
}