⏺ 🔍 SYSTEMATIC EMBEDDED COMPONENT INVENTORY

  Detailed Analysis for Component Extraction

  ---
  📊 DASHBOARD & LAYOUT ANALYSIS SUMMARY

  Files Analyzed:

  1. EnhancedPetersenGamesDashboard.tsx (1,466 lines)
  2. PetersenGamesWebsite.tsx (607 lines)
  3. animated-filter-implementation.tsx (150+ lines)
  4. PetersenGamesHomepage.tsx (100+ lines)
  5. EcommerceDashboard.tsx (100+ lines)
  6. EnhancedPetersenHomepage.tsx (100+ lines)
  7. ModernPetersenHomepage.tsx (100+ lines)
  8. SimplifiedHomepage.tsx (100+ lines)

  ---
  🧩 EMBEDDED COMPONENTS BY LAYOUT

  1. EnhancedPetersenGamesDashboard.tsx

  🔹 Embedded Navigation Components

  | Component             | Lines     | Dependencies            | Token Usage                                                                          |
  |-----------------------|-----------|-------------------------|--------------------------------------------------------------------------------------|
  | AppleNavigation       | 5-187     | motion, AnimatePresence | unifiedDesignTokens.spacing.medium, unifiedDesignTokens.components.navigation.height |
  | Mobile Menu Toggle    | 1047-1075 | motion.button           | enhancedDesignTokens.spacing.lg, enhancedDesignTokens.radius.md                      |
  | Side Menu Integration | 1078-1099 | PetersenGamesSideMenu   | Position/animation props                                                             |

  🔹 Embedded Content Components

  | Component            | Lines   | Dependencies          | Token Usage                                                   |
  |----------------------|---------|-----------------------|---------------------------------------------------------------|
  | VimeoModule          | 190-346 | motion, React state   | designUtils.getGlassCard(), unifiedDesignTokens.spacing.large |
  | ArtworkSpace         | 349-468 | motion, drag handlers | Glassmorphic backgrounds, spacing tokens                      |
  | EnhancedStatCard     | 596-792 | motion, hover states  | enhancedDesignTokens.gradients.glassCard, shadow system       |
  | EnhancedActivityFeed | 795-929 | motion, animations    | enhancedDesignTokens.blur.medium, color system                |

  🔹 Embedded Form Components

  | Component       | Lines   | Dependencies        | Token Usage                                     |
  |-----------------|---------|---------------------|-------------------------------------------------|
  | Search Input    | 147-174 | Inline styling      | unifiedDesignTokens.components.input.background |
  | Filter Sections | 61-96   | motion.button array | Section-based styling                           |

  2. PetersenGamesWebsite.tsx

  🔹 Embedded Navigation

  | Component    | Lines   | Dependencies          | Token Usage                           |
  |--------------|---------|-----------------------|---------------------------------------|
  | Navigation   | 100-180 | Fixed positioning     | theme.gradients.glass, theme.radius   |
  | Auth Buttons | 132-176 | Conditional rendering | theme.gradients.accent, button styles |

  🔹 Embedded Page Components

  | Component | Lines   | Dependencies          | Token Usage                             |
  |-----------|---------|-----------------------|-----------------------------------------|
  | Homepage  | 183-336 | motion animations     | theme.gradients.background, card grid   |
  | LoginPage | 339-454 | Form state management | theme.colors.glassBorder, input styling |
  | Dashboard | 457-593 | Stats visualization   | theme.colors.accent* variants           |

  3. animated-filter-implementation.tsx

  🔹 Embedded Filter Components

  | Component      | Lines    | Dependencies          | Token Usage                              |
  |----------------|----------|-----------------------|------------------------------------------|
  | FilterTabs     | 89-150+  | Tab management logic  | tokens.animation.quantum, surface colors |
  | CategoryFilter | 111-134  | State-based filtering | Glassmorphic backdrop effects            |
  | SearchInput    | Embedded | Real-time search      | Design system typography                 |

  4. Homepage Variants Analysis

  🔹 EnhancedPetersenHomepage.tsx

  | Component                | Dependencies               | Token Usage            |
  |--------------------------|----------------------------|------------------------|
  | QuantumSpatialNavigation | quantum-spatial components | Apple HIG compliance   |
  | Product Grid             | PetersenProductCard        | Shopify integration    |
  | Search & Filter          | QuantumSpatialInput        | Debounced search logic |

  🔹 ModernPetersenHomepage.tsx

  | Component           | Dependencies        | Token Usage              |
  |---------------------|---------------------|--------------------------|
  | CartSidebar         | cart/CartSidebar    | Cart context integration |
  | Product Filter Hook | useProductFilter    | Advanced filtering logic |
  | Design Tokens       | quantum.json inline | Direct token consumption |

  🔹 SimplifiedHomepage.tsx

  | Component             | Dependencies             | Token Usage               |
  |-----------------------|--------------------------|---------------------------|
  | Foundation Components | Foundation/*             | CSS-only styling approach |
  | EcommerceFlow         | Foundation/EcommerceFlow | No inline styles policy   |

  ---
  🤓 NAVIGATION ELEMENTS CATALOG

  Primary Navigation Systems

  1. AppleNavigation (Main System)

  // Location: EnhancedPetersenGamesDashboard.tsx:5-187
  interface AppleNavigationProps {
    isMobile: boolean;
    currentTime: string;
    showInternalNav?: boolean;
    sections?: Array<{ id: string; label: string }>;
    onSectionChange?: (section: string) => void;
    title?: string;
    subtitle?: string;
  }

  // Embedded Components:
  - Brand Title (dynamic text)
  - Navigation Pills (conditional sections)
  - Search Input (with SVG icon)
  - Time Display
  - Glassmorphic backdrop

  2. PetersenGamesSideMenu (Imported)

  // Location: Multiple files via import
  // Import: '../Ecommerce-design-system/PetersenGamesSideMenu'
  // Props: activeItem, onItemClick, collapsed, isMobile

  3. Website Navigation

  // Location: PetersenGamesWebsite.tsx:100-180
  // Features:
  - Fixed positioning
  - Auth state switching
  - Page routing buttons
  - Logo with gradient text

  Secondary Navigation Elements

  4. Filter Navigation

  // Locations: Multiple files
  // Types:
  - CategoryFilter: Product category selection
  - FilterTabs: Tab-based filtering
  - Mobile Filter Toggle: Hamburger menu
  - Breadcrumb Navigation: Category hierarchy

  5. Mobile Navigation Patterns

  // Features:
  - Slide-out menus with overlay
  - Touch-optimized buttons (44px minimum)
  - Swipe gestures support
  - Responsive breakpoint switching

  ---
  📦 TOKEN DEPENDENCY MAPPING

  Critical Token Dependencies

  1. Enhanced Design Tokens

  // Location: EnhancedPetersenGamesDashboard.tsx:471-570
  const enhancedDesignTokens = {
    colors: { primary, secondary, tertiary, accent, text hierarchy },
    gradients: { background, glass effects, accent variations },
    shadows: { glass system with multiple layers },
    spacing: { xs: '4px' → xxxxl: '40px' },
    radius: { xs: '4px' → full: '50%' },
    blur: { subtle: '8px' → ultra: '40px' },
    animation: { durations + easings }
  }

  2. Unified Design Tokens (Import)

  // Import: './UnifiedDesignSystem'
  // Usage: Typography, colors, spacing, navigation height
  // File: components/core/UnifiedDesignSystem.tsx

  3. Quantum Tokens (Inline)

  // Location: Multiple homepage files
  // Direct consumption of quantum.json token structure
  // Features: Purple/cyan color schemes, spacing system

  4. Theme Objects (Local)

  // Location: PetersenGamesWebsite.tsx:5-38
  // Simple theme object with gradients and spacing
  // Self-contained styling approach

  ---
  🔗 IMPORT DEPENDENCY ANALYSIS

  External Dependencies

  Motion & Animation

  import { motion, AnimatePresence, useInView } from 'framer-motion';
  // Usage: 90% of all interactive components
  // Critical for: Transitions, hover states, page animations

  Shopify Integration

  import { getAllProducts, PetersenProduct } from '../lib/shopify';
  // Usage: Product data fetching
  // Components: Product grids, cards, filters

  Context & Hooks

  import { useCart } from '../contexts/CartContext';
  import { useProductFilter } from '../hooks/useProductFilter';
  // Usage: State management across components

  Internal Component Dependencies

  Quantum-Spatial System

  import {
    QuantumSpatialButton,
    QuantumSpatialCard,
    QuantumSpatialNavigation,
    QuantumSpatialInput,
    PetersenProductCard
  } from './quantum-spatial';

  Foundation System

  import {
    Container, Grid, Flex, Card, Typography,
    ProductGrid, CategoryFilter, SearchBar, HeroSection
  } from './Foundation';

  Ecommerce System

  import EcommerceSideMenu from './EcommerceSideMenu';
  import EnhancedProductSidebar from './EnhancedProductSidebar';

  ---
  ⚡ EXTRACTABLE COMPONENT PRIORITIES

  🔴 High Priority (Immediate Extraction)

  1. AppleNavigation - Universal nav system (187 lines)
  2. EnhancedStatCard - Reusable stat display (196 lines)
  3. VimeoModule - Media embedding component (156 lines)
  4. ArtworkSpace - File upload/display (119 lines)
  5. Mobile Menu Toggle - Touch navigation (28 lines)

  🟡 Medium Priority (Next Phase)

  1. EnhancedActivityFeed - Live data display (134 lines)
  2. FilterTabs - Category filtering (60+ lines)
  3. Search Input - Universal search (30+ lines)
  4. Auth Buttons - Login/logout (45 lines)
  5. Product Grid - E-commerce display (embedded)

  🟢 Low Priority (Optimization Phase)

  1. Theme Switcher - Currently missing
  2. Breadcrumb Navigation - Currently basic
  3. Loading States - Inconsistent implementations
  4. Error Boundaries - Missing in most layouts

  ---
  📋 EXTRACTION RECOMMENDATIONS
