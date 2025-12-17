/**
 * Mobile Member App Initialization
 * Initializes all features for mobile member screens
 * RunSmart - Quantum Spatial Design System
 */

DOMReady.onReady(() => {
  // Initialize page entrance animation
  if (typeof PageTransitions !== 'undefined') {
    PageTransitions.initEntranceAnimation();
  }

  // Initialize navigation
  if (typeof Navigation !== 'undefined') {
    Navigation.init();
  }

  // Log successful initialization
  console.log('✅ Mobile Member App Initialized');
  console.log('Mode:', AppContext ? AppContext.getMode() : 'unknown');
  console.log('Device:', AppContext ? AppContext.getDevice() : 'unknown');
});
