  🔍 SYSTEMATIC EMBEDDED COMPONENT INVENTORY (Continued)

  /petersen-portal/Vercel/components/EcommerceDesignSystem

  ---
  4. CheckoutIntegration.tsx

  File Size: 308 lines
  Purpose: Checkout integration wrapper for product pages

  Embedded Components:

  1. CheckoutIntegration (Lines 14-74)
    - Wrapper component for checkout modal
    - Token Dependencies: unifiedDesignTokens, designUtils
    - Features: Fixed overlay, close button, modal management
  2. EnhancedBuyNowButton (Lines 85-139)
    - Standalone buy button with integrated checkout
    - Token Dependencies: unifiedDesignTokens
    - Features: Motion animations, gradient styling
  3. QuickCheckoutModal (Lines 150-253)
    - Modal overlay for checkout process
    - Token Dependencies: unifiedDesignTokens, designUtils
    - Features: Backdrop blur, modal animations, responsive sizing

  Inline Styles & Tokens:

  - CheckoutIntegrationStyles (Lines 256-306): CSS string for integration
    - Glass card enhancements
    - Button hover states
    - Unified design system integration

  ---
  5. UnifiedNavigation.tsx

  File Size: 226 lines
  Purpose: Unified navigation with auth integration

  Embedded Components:

  1. UnifiedNavigation (Lines 18-226)
    - Main navigation component
    - Dependencies: useAuth, useCart, auth components
    - Token Dependencies: unifiedDesignTokens
    - Features:
        - Transparent/scrolled states
      - Fixed positioning
      - Admin dashboard link
      - Cart integration with badge
      - Login modal trigger

  No Additional Embedded Components - Single component file

  Navigation Links Structure:

  const navLinks = [
    { label: 'Products', href: '/products' },
    { label: 'Games', href: '/games' },
    { label: 'Miniatures', href: '/miniatures' },
    { label: 'About', href: '/about' },
  ];

  ---
  6. UnifiedCheckoutProvider.tsx

  File Size: 346 lines
  Purpose: Context provider for unified checkout flow

  Embedded Components:

  1. CheckoutProvider (Lines 37-86)
    - Context provider component
    - Token Dependencies: None (logic only)
    - Features: State management, checkout flow control
  2. UnifiedCheckoutModal (Lines 89-346)
    - Private modal component for checkout
    - Token Dependencies: unifiedDesignTokens, designUtils
    - Features:
        - Progress steps visualization
      - Product display with pricing
      - Responsive modal design
      - Demo placeholder content

  Context Structure:

  interface CheckoutState {
    isOpen: boolean;
    product: any;
    variant: any;
    quantity: number;
    step: 'details' | 'shipping' | 'payment' | 'confirmation';
  }

  ---
  7. EcommerceSideMenu.tsx

  File Size: 542 lines
  Purpose: Apple HIG compliant side navigation menu

  Embedded Components:

  1. Icon Components (Lines 98-149)
    - DashboardIcon
    - OrdersIcon
    - ProductsIcon
    - CustomersIcon
    - AnalyticsIcon
    - InventoryIcon
    - PromotionsIcon
    - SettingsIcon
  2. LiquidGlassMenuItem (Lines 257-398)
    - Individual menu item component
    - Token Dependencies: liquidGlassTokens
    - Features: Category colors, badges, active states
  3. SectionHeader (Lines 401-422)
    - Section divider component
    - Token Dependencies: liquidGlassTokens
  4. EcommerceSideMenu (Lines 433-538)
    - Main side menu component
    - Token Dependencies: liquidGlassTokens
    - Features: Collapsible states, mobile responsive

  Custom Token System:

  const liquidGlassTokens = {
    colors: {
      primary: '#000000',
      systemBlue: '#007AFF',
      systemGreen: '#34C759',
      // ... extensive Apple HIG color system
    },
    spacing: { /* 8pt grid system */ },
    cornerRadius: { /* Apple's radius system */ },
    typography: { /* Apple's type system */ },
    animation: { /* Apple's animations */ },
    effects: { /* Liquid glass effects */ }
  }

  ---
  8. AnimatedFilterImplementation.tsx

  File Size: 562 lines
  Purpose: Animated product filtering interface

  Embedded Components:

  1. AnimatedCategoryFilter (Lines 72-391)
    - Main filter component
    - Mock useDesignSystem hook
    - Features: Search, category filters, view modes
  2. CategoryButton (Lines 401-440)
    - Category selection button
    - Features: Icon, count badge, active states
  3. ViewToggleButton (Lines 450-470)
    - Grid/list view toggle
    - Features: Active state styling
  4. ProductCard (Lines 480-560)
    - Product display card
    - Features: Grid/list layout adaptation, animations

  Mock Data Structures:

  const CATEGORIES = {
    miniatures: {
      id: 'miniatures',
      name: 'Miniatures',
      icon: '🎮',
      subcategories: ['Fantasy', 'Sci-Fi', 'Historical', 'Modern']
    },
    // ... other categories
  }

  ---
  Summary of Extraction Priorities

  High Priority Extractions:

  1. liquidGlassTokens from EcommerceSideMenu - Complete Apple HIG token system
  2. Icon Components - 8 reusable icon components
  3. UnifiedCheckoutModal - Can be extracted as standalone component
  4. CategoryButton, ViewToggleButton, ProductCard - Reusable UI components

  Token System Conflicts:

  - liquidGlassTokens (EcommerceSideMenu) vs unifiedDesignTokens (other files)
  - Mock useDesignSystem hook needs consolidation
  - Inline styling patterns need standardization

  Component Dependencies:

  - Most components depend on Framer Motion
  - Mixed usage of design token systems
  - Auth and cart context dependencies in navigation
  - Heavy reliance on inline styles with token references

  Recommended Actions:

  1. Consolidate token systems into single source
  2. Extract icon components to shared icon library
  3. Create shared button component library
  4. Standardize modal/overlay patterns
  5. Extract filter components for reuse across product pages

