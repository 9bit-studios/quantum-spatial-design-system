/**
 * APPLE HIG TOKENS
 * Human Interface Guidelines Compliance
 */
export const appleHIG = {
    // Minimum Touch Targets (iOS/iPadOS)
    touchTargets: {
        minimum: 44, // 44pt minimum
        comfortable: 48, // Comfortable touch target
        large: 56, // Large touch target
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
};
export default appleHIG;
//# sourceMappingURL=apple-hig.js.map