/**
 * Page Transitions
 * Slide-in/out animations for page navigation with overlay effect
 * RunSmart - Quantum Spatial Design System
 */

const PageTransitions = {
  // Transition duration (matches CSS) - slowed down slightly
  duration: 350,

  // Current overlay element
  overlay: null,

  // Slide page in from right (opening settings) - OVERLAY STYLE
  slideInFromRight(targetUrl) {
    // Fetch the target page
    fetch(targetUrl)
      .then(response => response.text())
      .then(html => {
        // Parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Get the screen content from target page
        const targetScreen = doc.querySelector('.screen');
        if (!targetScreen) {
          console.error('No .screen found in target page');
          window.location.href = targetUrl;
          return;
        }

        // Get inline styles from target page
        const targetStyles = doc.querySelectorAll('style');

        // Get current phone frame to position overlay exactly on top
        const currentPhoneFrame = document.querySelector('.phone-frame');
        if (!currentPhoneFrame) {
          window.location.href = targetUrl;
          return;
        }

        // Create overlay container that will clip content
        const overlay = document.createElement('div');
        overlay.className = 'page-overlay';

        // Inject inline styles into overlay
        targetStyles.forEach(styleEl => {
          const styleClone = styleEl.cloneNode(true);
          overlay.appendChild(styleClone);
        });

        // Create a phone frame clone for the overlay
        const overlayPhoneFrame = currentPhoneFrame.cloneNode(false);
        const overlayScreen = targetScreen.cloneNode(true);

        // Build overlay structure
        overlayPhoneFrame.appendChild(overlayScreen);
        overlay.appendChild(overlayPhoneFrame);

        // Remove bottom-nav from overlay (main app's nav should stay on top)
        const overlayBottomNav = overlayScreen.querySelector('.bottom-nav, .tab-bar');
        if (overlayBottomNav) {
          overlayBottomNav.remove();
        }

        // Position overlay container to match phone frame exactly with overflow hidden
        const rect = currentPhoneFrame.getBoundingClientRect();
        overlay.style.cssText = `
          position: fixed;
          top: ${rect.top}px;
          left: ${rect.left}px;
          width: ${rect.width}px;
          height: ${rect.height}px;
          z-index: 500;
          pointer-events: auto;
          overflow: hidden;
          border-radius: 55px;
        `;

        // Position the phone frame inside to start off-screen right
        overlayPhoneFrame.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform: translateX(100%);
          transition: none;
        `;

        // Add to body
        document.body.appendChild(overlay);
        this.overlay = overlay;

        // Force reflow
        overlayPhoneFrame.offsetHeight;

        // Slide phone frame in from right (within the clipped overlay container)
        overlayPhoneFrame.style.transition = `transform ${this.duration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;
        overlayPhoneFrame.style.transform = 'translateX(0)';

        // Initialize scripts in the overlay
        setTimeout(() => {
          this.initOverlayScripts(overlay);
        }, this.duration);
      })
      .catch(error => {
        console.error('Failed to load page:', error);
        window.location.href = targetUrl;
      });
  },

  // Slide page out to right (back button) - REMOVE OVERLAY OR SLIDE CURRENT SCREEN
  slideOutToRight(targetUrl) {
    if (this.overlay) {
      // If there's an overlay, slide it out
      const overlayPhoneFrame = this.overlay.querySelector('.phone-frame');
      if (overlayPhoneFrame) {
        overlayPhoneFrame.style.transform = 'translateX(100%)';
      }

      // Remove overlay after animation
      setTimeout(() => {
        if (this.overlay && this.overlay.parentNode) {
          this.overlay.parentNode.removeChild(this.overlay);
        }
        this.overlay = null;
      }, this.duration);
    } else {
      // No overlay - fetch target page and slide current screen out to reveal it
      fetch(targetUrl)
        .then(response => response.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');

          const targetScreen = doc.querySelector('.screen');
          const targetStyles = doc.querySelectorAll('style');

          if (!targetScreen) {
            window.location.href = targetUrl;
            return;
          }

          const currentPhoneFrame = document.querySelector('.phone-frame');
          const currentScreen = document.querySelector('.screen');

          if (!currentPhoneFrame || !currentScreen) {
            window.location.href = targetUrl;
            return;
          }

          // Create underlay with target page positioned underneath
          const underlay = document.createElement('div');
          underlay.className = 'page-underlay';

          const rect = currentPhoneFrame.getBoundingClientRect();
          underlay.style.cssText = `
            position: fixed;
            top: ${rect.top}px;
            left: ${rect.left}px;
            width: ${rect.width}px;
            height: ${rect.height}px;
            z-index: 400;
            overflow: hidden;
            border-radius: 55px;
          `;

          // Inject inline styles into underlay
          targetStyles.forEach(styleEl => {
            const styleClone = styleEl.cloneNode(true);
            underlay.appendChild(styleClone);
          });

          // Clone target screen into underlay
          const underlayScreen = targetScreen.cloneNode(true);
          underlay.appendChild(underlayScreen);

          // Insert underlay before phone frame (so it's underneath)
          document.body.insertBefore(underlay, currentPhoneFrame);

          // Position current screen to slide over the underlay
          currentScreen.style.position = 'relative';
          currentScreen.style.zIndex = '500';
          currentScreen.style.background = '#000';

          // Force reflow
          currentScreen.offsetHeight;

          // Slide current screen out to the right
          currentScreen.style.transition = `transform ${this.duration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;
          currentScreen.style.transform = 'translateX(100%)';

          // After animation, clean up and update URL without reloading
          setTimeout(() => {
            // Remove the old phone frame
            if (currentPhoneFrame.parentNode) {
              currentPhoneFrame.parentNode.removeChild(currentPhoneFrame);
            }

            // Update URL without page reload
            const newPath = targetUrl.includes('/') ? targetUrl : window.location.pathname.replace(/[^/]+$/, targetUrl);
            history.replaceState(null, '', newPath);

            // Initialize scripts on the underlay (settings icon, nav, etc.)
            this.initUnderlayScripts(underlay);
          }, this.duration);
        })
        .catch(error => {
          console.error('Failed to load page:', error);
          window.location.href = targetUrl;
        });
    }
  },

  // Initialize scripts in the overlay (for back button, etc.)
  initOverlayScripts(overlay) {
    // Find back button in overlay
    const backButton = overlay.querySelector('.back-button');
    if (backButton) {
      backButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.slideOutToRight(backButton.getAttribute('href'));
      });
    }

    // Find any settings icons in overlay (in case there are nested settings)
    const settingsIcons = overlay.querySelectorAll('.settings-icon');
    settingsIcons.forEach(icon => {
      icon.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUrl = icon.getAttribute('href');
        if (targetUrl && !targetUrl.includes('settings')) {
          this.slideOutToRight(targetUrl);
        }
      });
    });
  },

  // Initialize scripts in the underlay (after back button reveals main page)
  initUnderlayScripts(underlay) {
    // Find settings icons and attach slide-in listeners
    const settingsIcons = underlay.querySelectorAll('.settings-icon');
    settingsIcons.forEach(icon => {
      icon.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUrl = icon.getAttribute('href') || 'mobile-app-settings.html';
        this.slideInFromRight(targetUrl);
      });
    });

    // Find nav items and highlight active
    const navItems = underlay.querySelectorAll('.nav-item, .tab-item');
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      const currentFile = window.location.pathname.split('/').pop();
      if (href && href === currentFile) {
        item.classList.add('active');
      }
    });
  },

  // Initialize page entrance animation (not needed for overlay approach, but keeping for compatibility)
  initEntranceAnimation() {
    // Not used in overlay approach, but kept for compatibility
  }
};

window.PageTransitions = PageTransitions;
