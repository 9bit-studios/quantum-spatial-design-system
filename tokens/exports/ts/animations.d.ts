/**
 * ANIMATION TOKENS
 * Design System Animations - Apple-style Motion
 */
export declare const animationDurations: {
    readonly instant: "0ms";
    readonly fast: "150ms";
    readonly normal: "300ms";
    readonly slow: "500ms";
    readonly slower: "700ms";
};
export declare const animationEasings: {
    readonly linear: "linear";
    readonly easeIn: "cubic-bezier(0.4, 0, 1, 1)";
    readonly easeOut: "cubic-bezier(0, 0, 0.2, 1)";
    readonly easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)";
    readonly spring: "cubic-bezier(0.34, 1.56, 0.64, 1)";
    readonly appleEase: "cubic-bezier(0.25, 0.1, 0.25, 1)";
};
export declare const animations: {
    readonly fadeIn: {
        readonly keyframes: {
            readonly from: {
                readonly opacity: 0;
            };
            readonly to: {
                readonly opacity: 1;
            };
        };
        readonly duration: "300ms";
        readonly easing: "cubic-bezier(0, 0, 0.2, 1)";
    };
    readonly slideIn: {
        readonly keyframes: {
            readonly from: {
                readonly transform: "translateY(-20px)";
                readonly opacity: 0;
            };
            readonly to: {
                readonly transform: "translateY(0)";
                readonly opacity: 1;
            };
        };
        readonly duration: "300ms";
        readonly easing: "cubic-bezier(0.34, 1.56, 0.64, 1)";
    };
    readonly scaleIn: {
        readonly keyframes: {
            readonly from: {
                readonly transform: "scale(0.95)";
                readonly opacity: 0;
            };
            readonly to: {
                readonly transform: "scale(1)";
                readonly opacity: 1;
            };
        };
        readonly duration: "150ms";
        readonly easing: "cubic-bezier(0.34, 1.56, 0.64, 1)";
    };
};
declare const _default: {
    durations: {
        readonly instant: "0ms";
        readonly fast: "150ms";
        readonly normal: "300ms";
        readonly slow: "500ms";
        readonly slower: "700ms";
    };
    easings: {
        readonly linear: "linear";
        readonly easeIn: "cubic-bezier(0.4, 0, 1, 1)";
        readonly easeOut: "cubic-bezier(0, 0, 0.2, 1)";
        readonly easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)";
        readonly spring: "cubic-bezier(0.34, 1.56, 0.64, 1)";
        readonly appleEase: "cubic-bezier(0.25, 0.1, 0.25, 1)";
    };
    animations: {
        readonly fadeIn: {
            readonly keyframes: {
                readonly from: {
                    readonly opacity: 0;
                };
                readonly to: {
                    readonly opacity: 1;
                };
            };
            readonly duration: "300ms";
            readonly easing: "cubic-bezier(0, 0, 0.2, 1)";
        };
        readonly slideIn: {
            readonly keyframes: {
                readonly from: {
                    readonly transform: "translateY(-20px)";
                    readonly opacity: 0;
                };
                readonly to: {
                    readonly transform: "translateY(0)";
                    readonly opacity: 1;
                };
            };
            readonly duration: "300ms";
            readonly easing: "cubic-bezier(0.34, 1.56, 0.64, 1)";
        };
        readonly scaleIn: {
            readonly keyframes: {
                readonly from: {
                    readonly transform: "scale(0.95)";
                    readonly opacity: 0;
                };
                readonly to: {
                    readonly transform: "scale(1)";
                    readonly opacity: 1;
                };
            };
            readonly duration: "150ms";
            readonly easing: "cubic-bezier(0.34, 1.56, 0.64, 1)";
        };
    };
};
export default _default;
//# sourceMappingURL=animations.d.ts.map