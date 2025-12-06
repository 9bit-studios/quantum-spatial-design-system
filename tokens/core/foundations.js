/**
 * Core Design Tokens
 * Extracted from DesignSystemDemo.tsx
 *
 * This is a simplified, unified design token system that provides
 * a single source of truth for all styling across components.
 */
// 1. CORE TOKEN DEFINITIONS
export const coreTokens = {
    // Color Palette (reduced to essentials)
    colors: {
        // Base colors
        background: '#000000',
        surface: '#1A1A1A',
        card: '#2A2A2A',
        // Text hierarchy
        text: '#FFFFFF',
        textSecondary: '#B3B3B3',
        textTertiary: '#666666',
        // Interactive colors
        primary: '#4FC3F7',
        secondary: '#AB47BC',
        accent: '#EC407A',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        // Glass effects
        glass: 'rgba(255, 255, 255, 0.1)',
        glassBorder: 'rgba(255, 255, 255, 0.2)',
        glassHover: 'rgba(255, 255, 255, 0.15)',
    },
    // Spacing Scale (8px base)
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
    },
    // Typography Scale
    typography: {
        h1: { size: '48px', weight: '800', lineHeight: '1.2' },
        h2: { size: '36px', weight: '700', lineHeight: '1.3' },
        h3: { size: '24px', weight: '600', lineHeight: '1.4' },
        body: { size: '16px', weight: '400', lineHeight: '1.6' },
        small: { size: '14px', weight: '400', lineHeight: '1.5' },
        caption: { size: '12px', weight: '500', lineHeight: '1.4' },
    },
    // Border Radius
    radius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
    },
    // Shadows
    shadows: {
        sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
        md: '0 4px 16px rgba(0, 0, 0, 0.2)',
        lg: '0 8px 32px rgba(0, 0, 0, 0.3)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    },
    // Animation Duration
    animation: {
        fast: '0.15s',
        medium: '0.3s',
        slow: '0.5s',
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    },
};
// 2. COMPUTED STYLES (generated from core tokens)
export const computedStyles = {
    // Pre-built component styles
    button: {
        primary: {
            background: `linear-gradient(135deg, ${coreTokens.colors.primary}, #29B6F6)`,
            color: coreTokens.colors.text,
            padding: `${coreTokens.spacing.md} ${coreTokens.spacing.lg}`,
            borderRadius: coreTokens.radius.md,
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: coreTokens.shadows.md,
            transition: `all ${coreTokens.animation.medium} ${coreTokens.animation.easing}`,
        },
        secondary: {
            background: coreTokens.colors.glass,
            color: coreTokens.colors.text,
            padding: `${coreTokens.spacing.md} ${coreTokens.spacing.lg}`,
            borderRadius: coreTokens.radius.md,
            border: `1px solid ${coreTokens.colors.glassBorder}`,
            fontWeight: '600',
            cursor: 'pointer',
            backdropFilter: 'blur(20px)',
            transition: `all ${coreTokens.animation.medium} ${coreTokens.animation.easing}`,
        },
    },
    card: {
        default: {
            background: coreTokens.colors.glass,
            borderRadius: coreTokens.radius.lg,
            padding: coreTokens.spacing.lg,
            border: `1px solid ${coreTokens.colors.glassBorder}`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: coreTokens.shadows.glass,
        },
        elevated: {
            background: coreTokens.colors.surface,
            borderRadius: coreTokens.radius.lg,
            padding: coreTokens.spacing.xl,
            boxShadow: coreTokens.shadows.lg,
        },
    },
    layout: {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: `0 ${coreTokens.spacing.lg}`,
        },
        grid: {
            display: 'grid',
            gap: coreTokens.spacing.lg,
        },
        flex: {
            display: 'flex',
            gap: coreTokens.spacing.md,
        },
    },
};
// 3. UTILITY FUNCTIONS
export const designUtils = {
    // Get responsive spacing
    space: (size) => coreTokens.spacing[size] || size,
    // Get color with opacity
    color: (colorKey, opacity = 1) => {
        const color = coreTokens.colors[colorKey];
        if (opacity < 1 && color.startsWith('#')) {
            const hex = color.replace('#', '');
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        return color;
    },
    // Get glass effect
    glass: (opacity = 0.1) => ({
        background: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid rgba(255, 255, 255, ${opacity * 2})`,
    }),
    // Get gradient
    gradient: (color1, color2) => `linear-gradient(135deg, ${color1}, ${color2})`,
};
// 4. THEME COMPATIBILITY (from PetersenGamesWebsite.tsx)
export const petersenTheme = {
    colors: {
        primary: '#0A0D1C',
        secondary: '#1A2332',
        tertiary: '#2A334A',
        accent: '#4FC3F7',
        accentPurple: '#AB47BC',
        accentRose: '#EC407A',
        text: '#FFFFFF',
        textSecondary: 'rgba(255, 255, 255, 0.85)',
        textTertiary: 'rgba(255, 255, 255, 0.65)',
        glass: 'rgba(255, 255, 255, 0.1)',
        glassBorder: 'rgba(255, 255, 255, 0.2)',
    },
    gradients: {
        background: 'linear-gradient(135deg, #000000 0%, #0A0A0F 25%, #0F0F14 50%, #0A0A0F 75%, #000000 100%)',
        glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        accent: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
        purple: 'linear-gradient(135deg, #AB47BC 0%, #8E24AA 100%)',
    },
    shadows: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        button: '0 4px 16px rgba(0, 0, 0, 0.2)',
        hover: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
    radius: '12px',
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '40px',
    },
};
//# sourceMappingURL=foundations.js.map