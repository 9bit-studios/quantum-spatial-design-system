/**
 * ACCESSIBILITY TOKENS
 * WCAG 2.1 AA Compliant
 */
export declare const accessibility: {
    readonly contrastRatios: {
        readonly normalText: 4.5;
        readonly largeText: 3;
        readonly AAA: 7;
    };
    readonly focusIndicators: {
        readonly outlineWidth: 2;
        readonly outlineStyle: "solid";
        readonly outlineColor: "#007AFF";
        readonly outlineOffset: 2;
    };
    readonly motion: {
        readonly reducedMotion: "prefers-reduced-motion: reduce";
        readonly noPreference: "prefers-reduced-motion: no-preference";
    };
    readonly ariaLabels: {
        readonly requiredField: "* Required field";
        readonly loading: "Loading content";
        readonly error: "Error message";
        readonly success: "Success message";
    };
    readonly keyboard: {
        readonly tabIndex: 0;
        readonly disabledTabIndex: -1;
        readonly skipLinkTabIndex: 1;
    };
};
export default accessibility;
//# sourceMappingURL=accessibility.d.ts.map