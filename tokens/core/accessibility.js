/**
 * ACCESSIBILITY TOKENS
 * WCAG 2.1 AA Compliant
 */
export const accessibility = {
    // Contrast Ratios (WCAG AA)
    contrastRatios: {
        normalText: 4.5, // AA standard for normal text
        largeText: 3, // AA standard for large text (18pt+)
        AAA: 7, // AAA standard
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
};
export default accessibility;
//# sourceMappingURL=accessibility.js.map