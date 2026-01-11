/**
 * GAMING THEME TOKENS
 * Design System Theme - Gaming
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
};
export default gamingTheme;
//# sourceMappingURL=gaming.js.map