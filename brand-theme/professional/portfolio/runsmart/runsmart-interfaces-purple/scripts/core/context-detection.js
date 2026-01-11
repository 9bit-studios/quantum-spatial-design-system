/**
 * Context Detection
 * Determines current app context (coach/member, mobile/desktop)
 * RunSmart - Quantum Spatial Design System
 */

const AppContext = {
  // Detect if current page is coach or member
  getMode() {
    const path = window.location.pathname;

    if (path.includes('/coach/')) return 'coach';
    if (path.includes('/members/')) return 'member';
    if (path.includes('mobile-app-')) return 'member';
    if (path.includes('mobile-coach-')) return 'coach';

    return 'unknown';
  },

  // Detect device type
  getDevice() {
    const path = window.location.pathname;
    const width = window.innerWidth;

    if (path.includes('/mobile/')) return 'mobile';
    if (path.includes('/dashboard/')) return 'desktop';
    if (width < 768) return 'mobile';

    return 'desktop';
  },

  // Get previous page from session storage
  getPreviousPage() {
    return sessionStorage.getItem('previousPage') || null;
  },

  // Store current page for back button context
  storePage() {
    sessionStorage.setItem('previousPage', window.location.pathname);
  },

  // Get appropriate back destination
  getBackDestination() {
    const mode = this.getMode();
    const device = this.getDevice();
    const previous = this.getPreviousPage();

    // If we have a stored previous page, use it
    if (previous) return previous;

    // Otherwise, use defaults based on context
    if (device === 'mobile') {
      if (mode === 'coach') {
        return 'mobile-coach-dashboard.html';
      } else if (mode === 'member') {
        return 'mobile-app-today.html';
      }
    }

    // Default fallback
    return 'mobile-coach-dashboard.html';
  }
};

window.AppContext = AppContext;
