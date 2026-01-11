/**
 * Mobile Coach App Initialization
 * Initializes all features for mobile coach screens
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
  console.log('✅ Mobile Coach App Initialized');
  console.log('Mode:', AppContext ? AppContext.getMode() : 'unknown');
  console.log('Device:', AppContext ? AppContext.getDevice() : 'unknown');
});
