/**
 * SKELETON FILE TEMPLATES
 * Comprehensive template library for intelligent skeleton completion
 * M4 + Apple Intelligence Optimized
 */

export const templates = {
  // ============================================================================
  // TOKEN TEMPLATES
  // ============================================================================

  tokenColors: () => `/**
 * BRAND COLOR TOKENS
 * Design System Colors - Apple HIG Compliant
 */

export const brandColors = {
  // Primary Brand Colors
  voidBlack: '#010005',
  deepSpaceIndigo: '#331F4A',
  quantumViolet: '#6A3093',
  stellarCyan: '#5AC8FA',
  nebulaPink: '#BF4080',
  energyGold: '#FFD700',
  cosmicRose: '#CC5AA8',

  // Apple System Colors
  systemBlue: '#007AFF',
  systemGreen: '#34C759',
  systemOrange: '#FF9500',
  systemRed: '#FF3B30',
  systemPurple: '#AF52DE',
  systemTeal: '#5AC8FA',

  // Semantic Colors
  primary: '#007AFF',
  secondary: '#5AC8FA',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#5AC8FA',

  // Background Colors
  backgroundPrimary: '#000000',
  backgroundSecondary: '#1C1C1E',
  backgroundTertiary: '#2C2C2E',

  // Text Colors
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.6)',
  textTertiary: 'rgba(255, 255, 255, 0.3)',
  textDisabled: 'rgba(255, 255, 255, 0.18)',
} as const;

export type BrandColors = typeof brandColors;
export default brandColors;
`,

  tokenAnimations: () => `/**
 * ANIMATION TOKENS
 * Design System Animations - Apple-style Motion
 */

export const animationDurations = {
  instant: '0ms',
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '700ms',
} as const;

export const animationEasings = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  appleEase: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
} as const;

export const animations = {
  fadeIn: {
    keyframes: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    duration: animationDurations.normal,
    easing: animationEasings.easeOut,
  },
  slideIn: {
    keyframes: {
      from: { transform: 'translateY(-20px)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    duration: animationDurations.normal,
    easing: animationEasings.spring,
  },
  scaleIn: {
    keyframes: {
      from: { transform: 'scale(0.95)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 },
    },
    duration: animationDurations.fast,
    easing: animationEasings.spring,
  },
} as const;

export default { durations: animationDurations, easings: animationEasings, animations };
`,

  tokenEffects: () => `/**
 * VISUAL EFFECTS TOKENS
 * Shadows, Blur, Glow Effects - Apple HIG Compliant
 */

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
} as const;

export const blur = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '24px',
  '2xl': '40px',
} as const;

export const glowEffects = {
  quantum: '0 0 20px rgba(0, 212, 255, 0.5)',
  energy: '0 0 30px rgba(255, 215, 0, 0.4)',
  nebula: '0 0 25px rgba(191, 64, 128, 0.45)',
  apple: '0 0 15px rgba(0, 122, 255, 0.6)',
} as const;

export const backdropFilters = {
  glass: 'blur(10px) saturate(150%)',
  frost: 'blur(16px) saturate(180%) contrast(110%)',
  deep: 'blur(20px) saturate(200%) brightness(80%)',
  liquid: 'blur(12px) saturate(160%) brightness(95%)',
} as const;

export const effects = {
  shadows,
  blur,
  glow: glowEffects,
  backdrop: backdropFilters,
} as const;

export default effects;
`,

  tokenGradients: () => `/**
 * GRADIENT TOKENS
 * Design System Gradients - Quantum-Spatial Enhanced
 */

export const gradients = {
  // Brand Gradients
  quantum: 'linear-gradient(135deg, #6A3093 0%, #5AC8FA 100%)',
  cosmic: 'linear-gradient(135deg, #331F4A 0%, #BF4080 100%)',
  stellar: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',

  // Glass Gradients
  liquidGlass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  frostGlass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
  deepGlass: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%)',

  // Functional Gradients
  primary: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
  secondary: 'linear-gradient(135deg, #AF52DE 0%, #FF2D55 100%)',
  success: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)',
  warning: 'linear-gradient(135deg, #FF9500 0%, #FFCC00 100%)',
  error: 'linear-gradient(135deg, #FF3B30 0%, #FF2D55 100%)',

  // Radial Gradients
  radialGlow: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.2) 0%, transparent 70%)',
  radialEnergy: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
} as const;

export type Gradients = typeof gradients;
export default gradients;
`,

  tokenAppleHIG: () => `/**
 * APPLE HIG TOKENS
 * Human Interface Guidelines Compliance
 */

export const appleHIG = {
  // Minimum Touch Targets (iOS/iPadOS)
  touchTargets: {
    minimum: 44,        // 44pt minimum
    comfortable: 48,    // Comfortable touch target
    large: 56,          // Large touch target
  },

  // Typography Scale (Apple Dynamic Type)
  typography: {
    largeTitle: { size: 34, lineHeight: 41, weight: 400 },
    title1: { size: 28, lineHeight: 34, weight: 400 },
    title2: { size: 22, lineHeight: 28, weight: 400 },
    title3: { size: 20, lineHeight: 25, weight: 400 },
    headline: { size: 17, lineHeight: 22, weight: 600 },
    body: { size: 17, lineHeight: 22, weight: 400 },
    callout: { size: 16, lineHeight: 21, weight: 400 },
    subhead: { size: 15, lineHeight: 20, weight: 400 },
    footnote: { size: 13, lineHeight: 18, weight: 400 },
    caption1: { size: 12, lineHeight: 16, weight: 400 },
    caption2: { size: 11, lineHeight: 13, weight: 400 },
  },

  // Spacing System (Based on 8pt grid)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  // Corner Radius
  cornerRadius: {
    small: 8,
    medium: 12,
    large: 16,
    extraLarge: 20,
  },

  // Animation Durations
  animations: {
    instant: 0,
    fast: 200,
    normal: 300,
    slow: 500,
  },
} as const;

export default appleHIG;
`,

  tokenAccessibility: () => `/**
 * ACCESSIBILITY TOKENS
 * WCAG 2.1 AA Compliant
 */

export const accessibility = {
  // Contrast Ratios (WCAG AA)
  contrastRatios: {
    normalText: 4.5,      // AA standard for normal text
    largeText: 3,         // AA standard for large text (18pt+)
    AAA: 7,               // AAA standard
  },

  // Focus Indicators
  focusIndicators: {
    outlineWidth: 2,
    outlineStyle: 'solid',
    outlineColor: '#007AFF',
    outlineOffset: 2,
  },

  // Motion Preferences
  motion: {
    reducedMotion: 'prefers-reduced-motion: reduce',
    noPreference: 'prefers-reduced-motion: no-preference',
  },

  // Screen Reader Labels
  ariaLabels: {
    requiredField: '* Required field',
    loading: 'Loading content',
    error: 'Error message',
    success: 'Success message',
  },

  // Keyboard Navigation
  keyboard: {
    tabIndex: 0,
    disabledTabIndex: -1,
    skipLinkTabIndex: 1,
  },
} as const;

export default accessibility;
`,

  tokenResponsive: () => `/**
 * RESPONSIVE TOKENS
 * Breakpoints and Container Queries
 */

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const containerSizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  full: '100%',
} as const;

export const mediaQueries = {
  xs: \`@media (min-width: \${breakpoints.xs}px)\`,
  sm: \`@media (min-width: \${breakpoints.sm}px)\`,
  md: \`@media (min-width: \${breakpoints.md}px)\`,
  lg: \`@media (min-width: \${breakpoints.lg}px)\`,
  xl: \`@media (min-width: \${breakpoints.xl}px)\`,
  '2xl': \`@media (min-width: \${breakpoints['2xl']}px)\`,

  // Device-specific
  mobile: '@media (max-width: 767px)',
  tablet: '@media (min-width: 768px) and (max-width: 1023px)',
  desktop: '@media (min-width: 1024px)',

  // Orientation
  portrait: '@media (orientation: portrait)',
  landscape: '@media (orientation: landscape)',

  // Feature queries
  touch: '@media (hover: none) and (pointer: coarse)',
  mouse: '@media (hover: hover) and (pointer: fine)',
} as const;

export default { breakpoints, containerSizes, mediaQueries };
`,

  tokenThemeEcommerce: () => `/**
 * ECOMMERCE THEME TOKENS
 * Design System Theme - E-commerce Optimized
 */

import { brandColors } from '../brand/colors.js';
import { appleHIG } from '../core/apple-hig.js';

export const ecommerceTheme = {
  name: 'ecommerce',
  colors: {
    primary: brandColors.systemBlue,
    secondary: brandColors.stellarCyan,
    accent: brandColors.quantumViolet,
    success: brandColors.systemGreen,
    warning: brandColors.systemOrange,
    error: brandColors.systemRed,

    // Product-specific
    productCardBackground: brandColors.backgroundSecondary,
    productCardBorder: 'rgba(255, 255, 255, 0.1)',
    priceText: brandColors.energyGold,
    discountBadge: brandColors.systemRed,
    stockStatus: brandColors.systemGreen,
  },

  typography: {
    productTitle: { size: 18, weight: 600, lineHeight: 1.3 },
    productPrice: { size: 24, weight: 700, lineHeight: 1.2 },
    productDescription: { size: 14, weight: 400, lineHeight: 1.6 },
  },

  spacing: {
    productCardPadding: appleHIG.spacing.md,
    productCardGap: appleHIG.spacing.lg,
    gridGap: appleHIG.spacing.md,
  },

  effects: {
    productCardShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    productCardHoverShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
  },
} as const;

export default ecommerceTheme;
`,

  tokenThemeEnterprise: () => `/**
 * ENTERPRISE THEME TOKENS
 * Design System Theme - Enterprise/Professional
 */

import { brandColors } from '../brand/colors.js';
import { appleHIG } from '../core/apple-hig.js';

export const enterpriseTheme = {
  name: 'enterprise',
  colors: {
    primary: '#0066CC',
    secondary: '#5856D6',
    accent: '#007AFF',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',

    // Enterprise-specific
    dashboardBackground: '#F2F2F7',
    cardBackground: '#FFFFFF',
    border: '#C7C7CC',
    text: '#1C1C1E',
    textSecondary: '#8E8E93',
  },

  typography: {
    dashboardTitle: { size: 28, weight: 700, lineHeight: 1.2 },
    cardTitle: { size: 18, weight: 600, lineHeight: 1.3 },
    bodyText: { size: 15, weight: 400, lineHeight: 1.5 },
    caption: { size: 13, weight: 400, lineHeight: 1.4 },
  },

  spacing: {
    dashboardPadding: appleHIG.spacing.xl,
    cardPadding: appleHIG.spacing.lg,
    sectionGap: appleHIG.spacing.xxl,
  },

  effects: {
    cardShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    cardHoverShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
  },
} as const;

export default enterpriseTheme;
`,

  tokenThemeGaming: () => `/**
 * GAMING THEME TOKENS
 * Design System Theme - Gaming/Petersen Games
 */

import { brandColors } from '../brand/colors.js';
import { gradients } from '../brand/gradients.js';

export const gamingTheme = {
  name: 'petersen-gaming',
  colors: {
    primary: brandColors.quantumViolet,
    secondary: brandColors.stellarCyan,
    accent: brandColors.nebulaPink,
    success: brandColors.energyGold,
    warning: brandColors.systemOrange,
    error: brandColors.systemRed,

    // Gaming-specific
    heroBackground: brandColors.voidBlack,
    cardBackground: brandColors.deepSpaceIndigo,
    glowPrimary: brandColors.quantumViolet,
    glowSecondary: brandColors.stellarCyan,
  },

  gradients: {
    hero: gradients.quantum,
    card: gradients.cosmic,
    cta: gradients.stellar,
  },

  typography: {
    heroTitle: { size: 48, weight: 900, lineHeight: 1.1 },
    gameTitle: { size: 24, weight: 700, lineHeight: 1.2 },
    bodyText: { size: 16, weight: 400, lineHeight: 1.6 },
  },

  effects: {
    cardShadow: '0 8px 24px rgba(106, 48, 147, 0.3)',
    cardHoverShadow: '0 12px 32px rgba(106, 48, 147, 0.5)',
    glowEffect: '0 0 30px rgba(106, 48, 147, 0.6)',
  },
} as const;

export default gamingTheme;
`,

  // ============================================================================
  // COMPONENT TEMPLATES
  // ============================================================================

  componentNavigation: () => `/**
 * NAVIGATION COMPONENT
 * Apple HIG Compliant Navigation
 */

import React from 'react';

export interface NavigationProps {
  items: NavigationItem[];
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  variant?: 'default' | 'transparent' | 'solid';
  sticky?: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
  active?: boolean;
  icon?: React.ReactNode;
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  logo,
  actions,
  variant = 'default',
  sticky = false,
}) => {
  return (
    <nav
      className={\`navigation navigation--\${variant} \${sticky ? 'navigation--sticky' : ''}\`}
      style={{
        minHeight: '44px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        backgroundColor: variant === 'transparent' ? 'transparent' : 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        position: sticky ? 'sticky' : 'relative',
        top: sticky ? 0 : 'auto',
        zIndex: 1000,
      }}
    >
      {logo && <div className="navigation__logo">{logo}</div>}

      <ul
        className="navigation__items"
        style={{
          display: 'flex',
          gap: '32px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          flex: 1,
        }}
      >
        {items.map((item, index) => (
          <li key={index} className="navigation__item">
            <a
              href={item.href}
              className={\`navigation__link \${item.active ? 'navigation__link--active' : ''}\`}
              style={{
                color: item.active ? '#007AFF' : '#FFFFFF',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: item.active ? 600 : 400,
                transition: 'color 0.2s',
              }}
            >
              {item.icon && <span className="navigation__icon">{item.icon}</span>}
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {actions && <div className="navigation__actions">{actions}</div>}
    </nav>
  );
};

export default Navigation;
`,

  componentGrid: () => `/**
 * GRID COMPONENT
 * Responsive Grid System - 8pt Base
 */

import React from 'react';

export interface GridProps {
  children: React.ReactNode;
  columns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 12,
  gap = 16,
  rowGap,
  columnGap,
  className = '',
}) => {
  const getGridTemplateColumns = () => {
    if (typeof columns === 'number') {
      return \`repeat(\${columns}, 1fr)\`;
    }
    // Responsive columns handled via CSS
    return \`repeat(\${columns.md || 12}, 1fr)\`;
  };

  return (
    <div
      className={\`grid \${className}\`}
      style={{
        display: 'grid',
        gridTemplateColumns: getGridTemplateColumns(),
        gap: typeof gap === 'number' ? \`\${gap}px\` : gap,
        rowGap: rowGap ? (typeof rowGap === 'number' ? \`\${rowGap}px\` : rowGap) : undefined,
        columnGap: columnGap ? (typeof columnGap === 'number' ? \`\${columnGap}px\` : columnGap) : undefined,
      }}
    >
      {children}
    </div>
  );
};

export interface GridItemProps {
  children: React.ReactNode;
  span?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  className?: string;
}

export const GridItem: React.FC<GridItemProps> = ({
  children,
  span = 1,
  className = '',
}) => {
  const gridColumn = typeof span === 'number' ? \`span \${span}\` : \`span \${span.md || 1}\`;

  return (
    <div
      className={\`grid-item \${className}\`}
      style={{
        gridColumn,
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
`,

  componentContainer: () => `/**
 * CONTAINER COMPONENT
 * Responsive Container with Max-Width
 */

import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
  padding?: boolean;
  className?: string;
}

const CONTAINER_SIZES = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  full: '100%',
} as const;

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  centered = true,
  padding = true,
  className = '',
}) => {
  return (
    <div
      className={\`container container--\${size} \${className}\`}
      style={{
        maxWidth: typeof CONTAINER_SIZES[size] === 'number' ? \`\${CONTAINER_SIZES[size]}px\` : CONTAINER_SIZES[size],
        marginLeft: centered ? 'auto' : undefined,
        marginRight: centered ? 'auto' : undefined,
        paddingLeft: padding ? '24px' : undefined,
        paddingRight: padding ? '24px' : undefined,
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};

export default Container;
`,

  // I'll create a simpler approach - let me add just the key template generator methods to the main file

};

export default templates;
