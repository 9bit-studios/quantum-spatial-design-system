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
// Re-export all core tokens
export * from './core';
// Re-export all brand tokens
export * from './brand';
// Re-export theme tokens
export * from './themes';
// Convenience direct exports for commonly used tokens
export { enhancedGamingTokens } from './brand/enhancedGamingTokens';
export { quantumSpatialTokens } from './brand/quantumSpatialTokens';
export { appleHIGTokens } from './brand/appleHIGTokens';
export { unifiedTokens } from './brand/unifiedTokens';
export { M4Tokens } from './brand/M4Tokens';
// Default export with token metadata
export default {
    version: '3.0.0',
    sourceOfTruth: '@quantum-spatial/design-system/tokens',
    appleHIGCompliant: true,
    m4Optimized: true,
    platforms: ['web', 'shopify', 'nextjs', 'react'],
};
//# sourceMappingURL=index.js.map