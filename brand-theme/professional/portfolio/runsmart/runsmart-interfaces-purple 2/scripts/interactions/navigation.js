/**
 * Navigation Interactions
 * Active states, highlighting, transitions
 * RunSmart - Quantum Spatial Design System
 */

const Navigation = {
  // Initialize navigation highlighting
  init() {
    this.highlightActiveNav();
    this.setupNavListeners();
    this.setupSettingsButton();
    this.setupBackButton();
  },

  // Highlight current page in navigation
  highlightActiveNav() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop();
    const navItems = document.querySelectorAll('.nav-item, .tab-item');

    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href && href === currentFile) {
        item.classList.add('active');
      }
    });
  },

  // Setup navigation click listeners
  setupNavListeners() {
    document.querySelectorAll('.nav-item, .tab-item').forEach(item => {
      item.addEventListener('click', function(e) {
        // Let href handle navigation
        // Add active state immediately for instant feedback
        document.querySelectorAll('.nav-item, .tab-item').forEach(i => {
          i.classList.remove('active');
        });
        this.classList.add('active');
      });
    });
  },

  // Setup settings button with slide transition
  setupSettingsButton() {
    // Only target the actual settings icon, not all links with "settings" in URL
    const settingsButtons = document.querySelectorAll('.settings-icon');

    settingsButtons.forEach(button => {
      // Skip if it's a nav item (let normal nav handle it)
      if (button.classList.contains('nav-item') || button.classList.contains('tab-item')) {
        return;
      }

      button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetUrl = this.getAttribute('href');

        if (typeof PageTransitions !== 'undefined') {
          PageTransitions.slideInFromRight(targetUrl);
        } else {
          // Fallback if transitions not loaded
          window.location.href = targetUrl;
        }
      });
    });
  },

  // Setup back button with slide transition
  setupBackButton() {
    const backButtons = document.querySelectorAll('.back-button');

    backButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();

        // Get target URL from href or use context-aware default
        let targetUrl = this.getAttribute('href');

        if (!targetUrl || targetUrl === '#') {
          if (typeof AppContext !== 'undefined') {
            targetUrl = AppContext.getBackDestination();
          } else {
            // Fallback - try to go back in history
            window.history.back();
            return;
          }
        }

        if (typeof PageTransitions !== 'undefined') {
          PageTransitions.slideOutToRight(targetUrl);
        } else {
          // Fallback if transitions not loaded
          window.location.href = targetUrl;
        }
      });
    });
  }
};

window.Navigation = Navigation;
