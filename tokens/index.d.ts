/**
 * Quantum Spatial Design Tokens - Unified Export Hub
 * Central export point for all design token systems
 *
 * Architecture:
 * - Core: Foundation tokens (Apple HIG, spacing, typography, accessibility)
 * - Brand: Brand-specific tokens (colors, effects, M4 optimizations)
 * - Themes: Theme variations and configurations
 *
 * @module @quantum-spatial/design-system/tokens
 * @version 3.0.0
 */
export * from './core';
export * from './brand';
export * from './themes';
export { enhancedGamingTokens } from './brand/enhancedGamingTokens';
export { quantumSpatialTokens } from './brand/quantumSpatialTokens';
export { appleHIGTokens } from './brand/appleHIGTokens';
export { unifiedTokens } from './brand/unifiedTokens';
export { M4Tokens } from './brand/M4Tokens';
declare const _default: {
    version: string;
    sourceOfTruth: string;
    appleHIGCompliant: boolean;
    m4Optimized: boolean;
    platforms: string[];
};
export default _default;
//# sourceMappingURL=index.d.ts.map