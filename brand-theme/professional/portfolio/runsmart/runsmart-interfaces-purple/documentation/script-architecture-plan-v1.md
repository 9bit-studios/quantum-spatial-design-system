# RunSmart Script Architecture Plan

**Date**: December 11, 2025
**Status**: Implementation Plan
**Goal**: Modular, maintainable script architecture for mobile + desktop apps

---

## 🎯 Architecture Goals

1. **Separation of Concerns**: One script per feature/responsibility
2. **Reusability**: Share code between mobile/desktop where possible
3. **Context Awareness**: Scripts detect environment (mobile/desktop, coach/member)
4. **Performance**: Lazy load scripts only when needed
5. **Maintainability**: Clear naming, single responsibility principle
6. **Future-Proof**: Easy to add desktop member view and unification

---

## 📁 Proposed Directory Structure

```
/scripts/
  /core/
    dom-ready.js              # DOM loading utilities
    device-detection.js       # Mobile vs Desktop detection
    context-detection.js      # Coach vs Member mode detection

  /transitions/
    page-transitions.js       # Slide animations, fade effects
    navigation-transitions.js # Nav-specific transitions

  /interactions/
    navigation.js             # Nav highlighting, active states
    search.js                 # Search functionality
    filters.js                # Filter buttons, time selectors

  /animations/
    card-animations.js        # Stagger effects, card reveals
    loading-animations.js     # Page loaders, spinners

  /mobile/
    mobile-nav.js             # Mobile-specific nav behavior
    mobile-gestures.js        # Swipe, pull-to-refresh (future)

  /desktop/
    desktop-nav.js            # Desktop-specific nav behavior
    desktop-interactions.js   # Hover effects, tooltips

  /init/
    mobile-coach-init.js      # Initialize mobile coach app
    mobile-member-init.js     # Initialize mobile member app
    desktop-coach-init.js     # Initialize desktop coach app
    desktop-member-init.js    # Initialize desktop member app (future)
```

---

## 🔧 Core Script Specifications

### 1. `dom-ready.js` - DOM Loading Utilities

```javascript
/**
 * DOM Ready Utilities
 * Ensures scripts run after DOM is loaded
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
```

**Usage in HTML**:
```html
<script src="/scripts/core/dom-ready.js"></script>
<script src="/scripts/init/mobile-coach-init.js"></script>
```

---

### 2. `context-detection.js` - Detect Coach vs Member Mode

```javascript
/**
 * Context Detection
 * Determines current app context (coach/member, mobile/desktop)
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
        return '/mobile/coach/mobile-coach-dashboard.html';
      } else if (mode === 'member') {
        return '/mobile/members/mobile-app-today.html';
      }
    }

    // Default fallback
    return '/mobile/coach/mobile-coach-dashboard.html';
  }
};

window.AppContext = AppContext;
```

---

### 3. `page-transitions.js` - Slide Animations

```javascript
/**
 * Page Transitions
 * Slide-in/out animations for page navigation
 */

const PageTransitions = {
  // Transition duration (matches CSS)
  duration: 300,

  // Slide page in from right (opening settings)
  slideInFromRight(targetUrl) {
    const body = document.body;

    // Store current page before navigating
    AppContext.storePage();

    // Add exit animation class
    body.classList.add('page-exit-left');

    // Navigate after animation completes
    setTimeout(() => {
      window.location.href = targetUrl;
    }, this.duration);
  },

  // Slide page out to right (back button)
  slideOutToRight(targetUrl) {
    const body = document.body;

    // Add exit animation class
    body.classList.add('page-exit-right');

    // Navigate after animation completes
    setTimeout(() => {
      window.location.href = targetUrl;
    }, this.duration);
  },

  // Initialize page entrance animation
  initEntranceAnimation() {
    const body = document.body;
    const referrer = document.referrer;

    // Determine entrance direction based on referrer
    if (referrer.includes('settings')) {
      // Coming back from settings - slide in from left
      body.classList.add('page-enter-from-left');
    } else {
      // Opening settings - slide in from right
      body.classList.add('page-enter-from-right');
    }

    // Remove animation class after completion
    setTimeout(() => {
      body.classList.remove('page-enter-from-left', 'page-enter-from-right');
    }, this.duration);
  }
};

window.PageTransitions = PageTransitions;
```

**CSS for Transitions** (add to each page):
```css
/* Page Transition Animations */
body {
  transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

/* Exit Animations */
.page-exit-left {
  transform: translateX(-100%);
}

.page-exit-right {
  transform: translateX(100%);
}

/* Entrance Animations */
.page-enter-from-right {
  animation: slideInFromRight 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.page-enter-from-left {
  animation: slideInFromLeft 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
```

---

### 4. `navigation.js` - Nav Highlighting & Interactions

```javascript
/**
 * Navigation Interactions
 * Active states, highlighting, transitions
 */

const Navigation = {
  // Initialize navigation highlighting
  init() {
    this.highlightActiveNav();
    this.setupNavListeners();
  },

  // Highlight current page in navigation
  highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item, .tab-item');

    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href && currentPath.includes(href)) {
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
    const settingsButton = document.querySelector('.settings-icon, a[href*="settings"]');

    if (settingsButton) {
      settingsButton.addEventListener('click', function(e) {
        e.preventDefault();
        const targetUrl = this.getAttribute('href');
        PageTransitions.slideInFromRight(targetUrl);
      });
    }
  },

  // Setup back button with slide transition
  setupBackButton() {
    const backButton = document.querySelector('.back-button');

    if (backButton) {
      backButton.addEventListener('click', function(e) {
        e.preventDefault();
        const targetUrl = this.getAttribute('href') || AppContext.getBackDestination();
        PageTransitions.slideOutToRight(targetUrl);
      });
    }
  }
};

window.Navigation = Navigation;
```

---

### 5. Init Scripts - Tie Everything Together

#### `mobile-coach-init.js`
```javascript
/**
 * Mobile Coach App Initialization
 * Initializes all features for mobile coach screens
 */

DOMReady.onReady(() => {
  // Initialize page entrance animation
  PageTransitions.initEntranceAnimation();

  // Initialize navigation
  Navigation.init();
  Navigation.setupSettingsButton();
  Navigation.setupBackButton();

  // Initialize any mobile-specific features
  if (typeof MobileCoach !== 'undefined') {
    MobileCoach.init();
  }
});
```

#### `mobile-member-init.js`
```javascript
/**
 * Mobile Member App Initialization
 * Initializes all features for mobile member screens
 */

DOMReady.onReady(() => {
  // Initialize page entrance animation
  PageTransitions.initEntranceAnimation();

  // Initialize navigation
  Navigation.init();
  Navigation.setupSettingsButton();
  Navigation.setupBackButton();

  // Initialize any member-specific features
  if (typeof MobileMember !== 'undefined') {
    MobileMember.init();
  }
});
```

---

## 📝 HTML Integration Pattern

### For Mobile Coach Pages:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>RunSmart Coach - Page Name</title>
    <link rel="stylesheet" href="../../assets/runsmart-design-system.css">
    <style>
        /* Page-specific styles */
        /* Include page transition CSS */
    </style>
</head>
<body>
    <!-- Page content -->

    <!-- Core Scripts (load first) -->
    <script src="../../../scripts/core/dom-ready.js"></script>
    <script src="../../../scripts/core/context-detection.js"></script>

    <!-- Feature Scripts -->
    <script src="../../../scripts/transitions/page-transitions.js"></script>
    <script src="../../../scripts/interactions/navigation.js"></script>

    <!-- Init Script (load last) -->
    <script src="../../../scripts/init/mobile-coach-init.js"></script>
</body>
</html>
```

### For Mobile Member Pages:
```html
<!-- Same pattern but use mobile-member-init.js -->
<script src="../../../scripts/init/mobile-member-init.js"></script>
```

---

## 🎨 Back Button Design

### HTML Structure:
```html
<div class="header">
    <a href="#" class="back-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
    </a>
    <div class="header-title">Settings</div>
    <div class="header-spacer"></div> <!-- Balance layout -->
</div>
```

### CSS:
```css
.back-button {
    width: 36px;
    height: 36px;
    background: #0A0A0A;
    border: 1px solid #1A1A1A;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
}

.back-button:active {
    background: #151515;
    transform: scale(0.95);
}

.header-spacer {
    width: 36px; /* Same as back button for centered title */
}
```

---

## 🔄 Migration Strategy

### Phase 1: Core Infrastructure (This PR)
1. ✅ Create `/scripts/` directory structure
2. ✅ Implement core scripts (dom-ready, context-detection, page-transitions)
3. ✅ Add back buttons to settings pages
4. ✅ Integrate slide transitions
5. ✅ Test mobile coach app

### Phase 2: Extract Inline Scripts (Next PR)
1. Move desktop inline scripts to `/scripts/desktop/`
2. Extract search, filter, time selector logic
3. Create `desktop-coach-init.js`
4. Test desktop coach dashboard

### Phase 3: Unify CSS (Future PR)
1. Extract common styles to `/styles/core/`
2. Create modular CSS files
3. Use CSS custom properties for theming
4. Maintain separation for mobile/desktop specifics

### Phase 4: Desktop Member View (Future)
1. Create desktop member screens
2. Implement `desktop-member-init.js`
3. Add view toggle feature
4. Test unified navigation

---

## ⚡ Performance Considerations

### Script Loading Order:
1. **Core** (dom-ready, context) - Always load first
2. **Transitions** - Load before init
3. **Interactions** - Load before init
4. **Init** - Load last

### Lazy Loading Strategy:
```javascript
// Only load scripts needed for current page
if (AppContext.getDevice() === 'mobile') {
  // Load mobile-specific scripts
} else {
  // Load desktop-specific scripts
}
```

### Caching:
- All scripts should be cacheable (versioned filenames)
- Use Cloudflare CDN caching headers
- Consider bundling for production (future)

---

## 🧪 Testing Checklist

### Transitions:
- [ ] Settings gear icon triggers slide-in-from-right
- [ ] Back button triggers slide-out-to-right
- [ ] Animations are smooth (300ms cubic-bezier)
- [ ] No layout shift during transitions
- [ ] Works on different screen sizes

### Context Awareness:
- [ ] Coach mode back button → coach dashboard
- [ ] Member mode back button → member today screen
- [ ] Previous page detection works correctly
- [ ] Session storage persists during navigation

### Navigation:
- [ ] Active states highlight correctly
- [ ] Nav items respond to clicks
- [ ] Bottom nav and top nav both work
- [ ] Settings accessible from all pages

### Performance:
- [ ] Scripts load without blocking render
- [ ] No JavaScript errors in console
- [ ] Smooth 60fps animations
- [ ] Works offline after first load

---

## 📚 Future Enhancements

### Gestures (Phase 5):
- Swipe right to go back (iOS pattern)
- Pull-to-refresh on member screens
- Long-press for quick actions

### Advanced Transitions (Phase 6):
- Shared element transitions
- Page stack management (history)
- Deep linking support

### Offline Support (Phase 7):
- Service worker for caching
- Offline-first architecture
- Background sync

---

## ✅ Implementation Checklist

- [ ] Create `/scripts/` directory structure
- [ ] Write core scripts (dom-ready, context, transitions, navigation)
- [ ] Add page transition CSS to all mobile pages
- [ ] Add back button to mobile-coach-settings.html
- [ ] Update mobile-app-settings.html back button logic
- [ ] Create init scripts (mobile-coach, mobile-member)
- [ ] Update all mobile coach HTML files with script tags
- [ ] Test transitions on all pages
- [ ] Deploy to Cloudflare and verify
- [ ] Document any issues or refinements needed

---

**This architecture provides a solid foundation for the RunSmart app that will scale from mobile prototype → unified desktop/mobile app without requiring major refactoring.**
