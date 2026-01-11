/**
 * Design Tokens Index
 * Central export point for all design token systems
 */
// Core unified tokens
export { coreTokens, computedStyles, designUtils, petersenTheme } from '../components/extracted/coreDesignTokens';
// Enhanced gaming tokens
export { enhancedGamingTokens } from './enhancedGamingTokens';
// Quantum-spatial tokens
export { quantumSpatialTokens } from './quantumSpatialTokens';
// Apple HIG tokens
export { appleHIGTokens, liquidGlassTokens } from './appleHIGTokens';
// Unified design tokens
export { unifiedTokens, unifiedDesignTokens } from './unifiedTokens';
// Re-export existing token files if they exist and are properly structured
// export * from './enhancedDesignTokens';
// export * from './liquidGlassTokens';
// export * from './quantumTokens';
// Unified token merger utility
export const mergeTokens = (...tokenSets) => {
    return tokenSets.reduce((merged, tokens) => ({
        ...merged,
        ...tokens,
        // Deep merge for nested objects
        colors: { ...merged.colors, ...tokens.colors },
        spacing: { ...merged.spacing, ...tokens.spacing },
        typography: { ...merged.typography, ...tokens.typography },
        gradients: { ...merged.gradients, ...tokens.gradients },
        shadows: { ...merged.shadows, ...tokens.shadows },
        animation: { ...merged.animation, ...tokens.animation },
    }), {});
};
// Token selection utility
export const selectTokenSystem = (theme) => {
    switch (theme) {
        case 'core':
            return coreTokens;
        case 'gaming':
            return enhancedGamingTokens;
        case 'quantum':
            return quantumSpatialTokens;
        case 'apple':
            return appleHIGTokens;
        case 'petersen':
            return petersenTheme;
        default:
            return coreTokens;
    }
};
//# sourceMappingURL=index.js.map