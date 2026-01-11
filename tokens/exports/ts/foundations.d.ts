/**
 * Core Design Tokens
 * Extracted from DesignSystemDemo.tsx
 *
 * This is a simplified, unified design token system that provides
 * a single source of truth for all styling across components.
 */
export declare const coreTokens: {
    colors: {
        background: string;
        surface: string;
        card: string;
        text: string;
        textSecondary: string;
        textTertiary: string;
        primary: string;
        secondary: string;
        accent: string;
        success: string;
        warning: string;
        error: string;
        glass: string;
        glassBorder: string;
        glassHover: string;
    };
    spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
    };
    typography: {
        h1: {
            size: string;
            weight: string;
            lineHeight: string;
        };
        h2: {
            size: string;
            weight: string;
            lineHeight: string;
        };
        h3: {
            size: string;
            weight: string;
            lineHeight: string;
        };
        body: {
            size: string;
            weight: string;
            lineHeight: string;
        };
        small: {
            size: string;
            weight: string;
            lineHeight: string;
        };
        caption: {
            size: string;
            weight: string;
            lineHeight: string;
        };
    };
    radius: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        full: string;
    };
    shadows: {
        sm: string;
        md: string;
        lg: string;
        glass: string;
    };
    animation: {
        fast: string;
        medium: string;
        slow: string;
        easing: string;
    };
};
export declare const computedStyles: {
    button: {
        primary: {
            background: string;
            color: string;
            padding: string;
            borderRadius: string;
            border: string;
            fontWeight: string;
            cursor: string;
            boxShadow: string;
            transition: string;
        };
        secondary: {
            background: string;
            color: string;
            padding: string;
            borderRadius: string;
            border: string;
            fontWeight: string;
            cursor: string;
            backdropFilter: string;
            transition: string;
        };
    };
    card: {
        default: {
            background: string;
            borderRadius: string;
            padding: string;
            border: string;
            backdropFilter: string;
            WebkitBackdropFilter: string;
            boxShadow: string;
        };
        elevated: {
            background: string;
            borderRadius: string;
            padding: string;
            boxShadow: string;
        };
    };
    layout: {
        container: {
            maxWidth: string;
            margin: string;
            padding: string;
        };
        grid: {
            display: string;
            gap: string;
        };
        flex: {
            display: string;
            gap: string;
        };
    };
};
export declare const designUtils: {
    space: (size: keyof typeof coreTokens.spacing | string) => string;
    color: (colorKey: keyof typeof coreTokens.colors, opacity?: number) => string;
    glass: (opacity?: number) => {
        background: string;
        backdropFilter: string;
        WebkitBackdropFilter: string;
        border: string;
    };
    gradient: (color1: string, color2: string) => string;
};
export declare const petersenTheme: {
    colors: {
        primary: string;
        secondary: string;
        tertiary: string;
        accent: string;
        accentPurple: string;
        accentRose: string;
        text: string;
        textSecondary: string;
        textTertiary: string;
        glass: string;
        glassBorder: string;
    };
    gradients: {
        background: string;
        glass: string;
        accent: string;
        purple: string;
    };
    shadows: {
        glass: string;
        button: string;
        hover: string;
    };
    radius: string;
    spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
};
export type CoreTokens = typeof coreTokens;
export type ComputedStyles = typeof computedStyles;
export type DesignUtils = typeof designUtils;
export type PetersenTheme = typeof petersenTheme;
//# sourceMappingURL=foundations.d.ts.map