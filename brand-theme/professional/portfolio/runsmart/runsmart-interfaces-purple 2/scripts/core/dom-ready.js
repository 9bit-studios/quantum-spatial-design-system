/**
 * DOM Ready Utilities
 * Ensures scripts run after DOM is loaded
 * RunSmart - Quantum Spatial Design System
 */

const DOMReady = {
  // Check if DOM is already loaded
  isReady() {
    return document.readyState === 'complete' ||
           document.readyState === 'interactive';
  },

  // Execute callback when DOM is ready
  onReady(callback) {
    if (this.isReady()) {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  },

  // Execute callback after full page load (including images)
  onLoad(callback) {
    if (document.readyState === 'complete') {
      callback();
    } else {
      window.addEventListener('load', callback);
    }
  }
};

// Export for use in other scripts
window.DOMReady = DOMReady;
