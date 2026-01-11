/**
 * Quantum Glass QA Browser Validation Script
 * Copy and paste this into the browser console to run comprehensive validation
 */

(function() {
  console.clear();
  console.log('%c🔍 QUANTUM GLASS QA VALIDATION', 'font-size: 20px; font-weight: bold; color: #19bcfe;');
  console.log('%c=================================', 'color: #6366F1;');

  const results = {
    cssLoading: { passed: 0, failed: 0, issues: [] },
    typography: { passed: 0, failed: 0, issues: [] },
    glassEffects: { passed: 0, failed: 0, issues: [] },
    variables: { passed: 0, failed: 0, issues: [] },
    layout: { passed: 0, failed: 0, issues: [] },
    mobile: { passed: 0, failed: 0, issues: [] }
  };

  // Phase 1: CSS Loading Order Validation
  console.log('%c📦 Phase 1: CSS Loading Order', 'font-size: 16px; font-weight: bold; color: #6366F1;');
  const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  const expectedOrder = ['QuantumFoundation.css', 'priority-foundation.css', 'base.css'];
  
  stylesheets.forEach((sheet, index) => {
    const href = sheet.getAttribute('href') || '';
    const filename = href.split('/').pop()?.split('?')[0] || '';
    
    if (expectedOrder.includes(filename)) {
      const expectedIndex = expectedOrder.indexOf(filename);
      if (index === expectedIndex) {
        console.log(`✅ ${filename} loaded in correct position (${index})`);
        results.cssLoading.passed++;
      } else {
        console.log(`❌ ${filename} loaded at position ${index}, expected ${expectedIndex}`);
        results.cssLoading.failed++;
        results.cssLoading.issues.push(`${filename} in wrong position`);
      }
    }
  });

  // Phase 2: Typography Validation
  console.log('%c✏️ Phase 2: Typography Validation', 'font-size: 16px; font-weight: bold; color: #6366F1;');
  const testElements = [
    { selector: 'body', expected: 'SF Pro Text' },
    { selector: 'h1, h2, h3', expected: 'SF Pro Display' },
    { selector: '.product-title', expected: 'SF Pro' },
    { selector: 'button', expected: 'SF Pro' }
  ];

  testElements.forEach(({ selector, expected }) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      const computedFont = window.getComputedStyle(elements[0]).fontFamily;
      const isAppleFont = computedFont.includes('-apple-system') || 
                         computedFont.includes('BlinkMacSystemFont') ||
                         computedFont.includes('SF Pro');
      
      if (isAppleFont) {
        console.log(`✅ ${selector}: ${computedFont.substring(0, 50)}...`);
        results.typography.passed++;
      } else {
        console.log(`❌ ${selector}: ${computedFont} (Not Apple font)`);
        results.typography.failed++;
        results.typography.issues.push(`${selector} not using Apple fonts`);
      }
    }
  });

  // Phase 3: Glass Effects Validation
  console.log('%c🔮 Phase 3: Glass Effects Validation', 'font-size: 16px; font-weight: bold; color: #6366F1;');
  const glassElements = [
    '.glass-top-header',
    '.glass-filter-bar-container',
    '.product-card',
    '.glass-surface'
  ];

  glassElements.forEach(selector => {
    const element = document.querySelector(selector);
    if (element) {
      const styles = window.getComputedStyle(element);
      const hasBackdropFilter = styles.backdropFilter !== 'none';
      const hasGlassBackground = styles.backgroundColor.includes('rgba') && 
                                parseFloat(styles.backgroundColor.match(/[\d.]+(?=\))/)?.[0] || '1') < 0.3;
      
      if (hasBackdropFilter || hasGlassBackground) {
        console.log(`✅ ${selector}: Glass effect detected`);
        results.glassEffects.passed++;
      } else {
        console.log(`❌ ${selector}: No glass effect found`);
        results.glassEffects.failed++;
        results.glassEffects.issues.push(`${selector} missing glass effect`);
      }
    }
  });

  // Phase 4: CSS Variables Validation
  console.log('%c🎨 Phase 4: CSS Variables Validation', 'font-size: 16px; font-weight: bold; color: #6366F1;');
  const criticalVars = [
    '--foundation-font-family',
    '--font-body--family',
    '--font-heading--family',
    '--glass-surface',
    '--glass-blur',
    '--foundation-background-primary',
    '--foundation-foreground-primary'
  ];

  const computedStyles = getComputedStyle(document.documentElement);
  criticalVars.forEach(varName => {
    const value = computedStyles.getPropertyValue(varName).trim();
    if (value) {
      console.log(`✅ ${varName}: ${value.substring(0, 50)}...`);
      results.variables.passed++;
    } else {
      console.log(`❌ ${varName}: Not defined`);
      results.variables.failed++;
      results.variables.issues.push(`${varName} not defined`);
    }
  });

  // Phase 5: Layout Validation
  console.log('%c📐 Phase 5: Layout Validation', 'font-size: 16px; font-weight: bold; color: #6366F1;');
  const layoutChecks = [
    { 
      name: 'Header sticky positioning',
      test: () => {
        const header = document.querySelector('.glass-top-header');
        return header && getComputedStyle(header).position === 'sticky';
      }
    },
    {
      name: 'Product grid structure',
      test: () => {
        const grid = document.querySelector('.product-grid-container');
        return grid && getComputedStyle(grid).display === 'grid';
      }
    },
    {
      name: 'Touch target compliance (44px)',
      test: () => {
        const buttons = document.querySelectorAll('button, .button');
        if (buttons.length === 0) return true;
        const firstButton = buttons[0];
        const height = firstButton.offsetHeight;
        return height >= 44;
      }
    }
  ];

  layoutChecks.forEach(check => {
    if (check.test()) {
      console.log(`✅ ${check.name}`);
      results.layout.passed++;
    } else {
      console.log(`❌ ${check.name}`);
      results.layout.failed++;
      results.layout.issues.push(check.name);
    }
  });

  // Phase 6: Mobile Responsiveness
  console.log('%c📱 Phase 6: Mobile Responsiveness', 'font-size: 16px; font-weight: bold; color: #6366F1;');
  const viewportWidth = window.innerWidth;
  const isMobile = viewportWidth <= 768;
  
  console.log(`Current viewport: ${viewportWidth}px (${isMobile ? 'Mobile' : 'Desktop'})`);
  
  if (isMobile) {
    const mobileChecks = [
      {
        name: 'Body font size 16px (iOS zoom prevention)',
        test: () => {
          const bodyFontSize = parseFloat(getComputedStyle(document.body).fontSize);
          return bodyFontSize >= 16;
        }
      },
      {
        name: 'Filter bar mobile toggle visible',
        test: () => {
          const toggle = document.querySelector('.mobile-filter-toggle');
          return toggle && getComputedStyle(toggle).display !== 'none';
        }
      }
    ];

    mobileChecks.forEach(check => {
      if (check.test()) {
        console.log(`✅ ${check.name}`);
        results.mobile.passed++;
      } else {
        console.log(`❌ ${check.name}`);
        results.mobile.failed++;
        results.mobile.issues.push(check.name);
      }
    });
  } else {
    console.log('ℹ️ Switch to mobile view to test mobile-specific features');
  }

  // Summary Report
  console.log('%c📊 VALIDATION SUMMARY', 'font-size: 18px; font-weight: bold; color: #19bcfe;');
  console.log('%c=====================', 'color: #6366F1;');
  
  let totalPassed = 0;
  let totalFailed = 0;
  
  Object.entries(results).forEach(([phase, data]) => {
    totalPassed += data.passed;
    totalFailed += data.failed;
    
    const status = data.failed === 0 ? '✅' : '❌';
    console.log(`${status} ${phase}: ${data.passed} passed, ${data.failed} failed`);
    
    if (data.issues.length > 0) {
      data.issues.forEach(issue => {
        console.log(`   ⚠️ ${issue}`);
      });
    }
  });
  
  console.log('%c📈 Total Score:', 'font-weight: bold;', 
    `${totalPassed}/${totalPassed + totalFailed} tests passed (${Math.round(totalPassed / (totalPassed + totalFailed) * 100)}%)`
  );

  // Recommendations
  if (totalFailed > 0) {
    console.log('%c💡 RECOMMENDATIONS', 'font-size: 16px; font-weight: bold; color: #FF9500;');
    
    if (results.cssLoading.failed > 0) {
      console.log('• Fix CSS loading order in theme.liquid');
    }
    if (results.typography.failed > 0) {
      console.log('• Check priority-foundation.css font overrides');
    }
    if (results.glassEffects.failed > 0) {
      console.log('• Add backdrop-filter and rgba backgrounds to glass elements');
    }
    if (results.variables.failed > 0) {
      console.log('• Define missing CSS variables in QuantumFoundation.css');
    }
  } else {
    console.log('%c🎉 All validations passed!', 'font-size: 16px; font-weight: bold; color: #34C759;');
  }

  // Export results for further analysis
  window.QuantumGlassQAResults = results;
  console.log('💾 Results saved to window.QuantumGlassQAResults');
})();