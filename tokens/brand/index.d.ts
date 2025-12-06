/**
 * Design Tokens Index
 * Central export point for all design token systems
 */
export { coreTokens, computedStyles, designUtils, petersenTheme, type CoreTokens, type ComputedStyles, type DesignUtils, type PetersenTheme } from '../components/extracted/coreDesignTokens';
export { enhancedGamingTokens, type EnhancedGamingTokens } from './enhancedGamingTokens';
export { quantumSpatialTokens, type QuantumSpatialTokens } from './quantumSpatialTokens';
export { appleHIGTokens, liquidGlassTokens, type AppleHIGTokens, type LiquidGlassTokens } from './appleHIGTokens';
export { unifiedTokens, unifiedDesignTokens, type UnifiedTokens, type UnifiedDesignTokens } from './unifiedTokens';
export declare const mergeTokens: <T extends Record<string, any>>(...tokenSets: T[]) => T;
export declare const selectTokenSystem: (theme: "core" | "gaming" | "quantum" | "apple" | "petersen") => any;
//# sourceMappingURL=index.d.ts.map