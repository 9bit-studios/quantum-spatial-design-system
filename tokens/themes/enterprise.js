/**
 * ENTERPRISE THEME TOKENS
 * Design System Theme - Enterprise/Professional
 */
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
};
export default enterpriseTheme;
//# sourceMappingURL=enterprise.js.map