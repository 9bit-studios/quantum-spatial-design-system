/**
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
};
export default ecommerceTheme;
//# sourceMappingURL=ecommerce.js.map