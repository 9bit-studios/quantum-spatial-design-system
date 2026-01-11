export declare const corefoundation: {
    spacing: {
        micro: string;
        tiny: string;
        small: string;
        medium: string;
        large: string;
        xlarge: string;
        xxlarge: string;
        huge: string;
    };
    cornerRadius: {
        small: string;
        medium: string;
        large: string;
        xlarge: string;
        continuous: string;
    };
    typography: {
        largeTitle: {
            size: string;
            weight: string;
            lineHeight: string;
        };
        title1: {
            size: string;
            weight: string;
            lineHeight: string;
        };
    };
    accessibility: {
        minTouchTarget: string;
        contrastRatios: {
            AA: number;
            AAA: number;
        };
    };
};
export declare const brandColors: {
    voidBlack: string;
    deepSpaceIndigo: string;
    dimensionalEggplant: string;
    subtleCyan: string;
    quantumViolet: string;
    etherealPurple: string;
    systemBlue: string;
    systemGreen: string;
    systemRed: string;
    systemOrange: string;
    systemPurple: string;
    systemTeal: string;
};
export declare const liquidGlassEffects: {
    backgrounds: {
        subtle: string;
        medium: string;
        prominent: string;
    };
    blur: {
        subtle: string;
        medium: string;
        strong: string;
        ultra: string;
    };
    shadows: {
        glass: string;
        glassHover: string;
    };
    borders: {
        subtle: string;
        medium: string;
        prominent: string;
    };
};
export declare const petersenGamingTheme: {
    colors: {
        primary: string;
        secondary: string;
        tertiary: string;
        accent: string;
        accentSecondary: string;
        accentTertiary: string;
        systemBlue: string;
        systemGreen: string;
        systemRed: string;
        label: string;
        secondaryLabel: string;
        tertiaryLabel: string;
        quaternaryLabel: string;
        glass: string;
    };
    effects: {
        backgrounds: {
            subtle: string;
            medium: string;
            prominent: string;
        };
        blur: {
            subtle: string;
            medium: string;
            strong: string;
            ultra: string;
        };
        shadows: {
            glass: string;
            glassHover: string;
        };
        borders: {
            subtle: string;
            medium: string;
            prominent: string;
        };
    };
    gradients: {
        gaming: string;
        background: string;
    };
    animation: {
        duration: {
            fast: string;
            medium: string;
            slow: string;
        };
        easing: {
            quantum: string;
            apple: string;
        };
    };
    spacing: {
        micro: string;
        tiny: string;
        small: string;
        medium: string;
        large: string;
        xlarge: string;
        xxlarge: string;
        huge: string;
    };
    cornerRadius: {
        small: string;
        medium: string;
        large: string;
        xlarge: string;
        continuous: string;
    };
    typography: {
        largeTitle: {
            size: string;
            weight: string;
            lineHeight: string;
        };
        title1: {
            size: string;
            weight: string;
            lineHeight: string;
        };
    };
    accessibility: {
        minTouchTarget: string;
        contrastRatios: {
            AA: number;
            AAA: number;
        };
    };
};
export declare const ecommerceTheme: {
    colors: {
        primary: string;
        secondary: string;
        accent: string;
    };
    effects: {
        backgrounds: {
            subtle: string;
            medium: string;
            prominent: string;
        };
        blur: {
            subtle: string;
            medium: string;
            strong: string;
            ultra: string;
        };
        shadows: {
            glass: string;
            glassHover: string;
        };
        borders: {
            subtle: string;
            medium: string;
            prominent: string;
        };
    };
    spacing: {
        micro: string;
        tiny: string;
        small: string;
        medium: string;
        large: string;
        xlarge: string;
        xxlarge: string;
        huge: string;
    };
    cornerRadius: {
        small: string;
        medium: string;
        large: string;
        xlarge: string;
        continuous: string;
    };
    typography: {
        largeTitle: {
            size: string;
            weight: string;
            lineHeight: string;
        };
        title1: {
            size: string;
            weight: string;
            lineHeight: string;
        };
    };
    accessibility: {
        minTouchTarget: string;
        contrastRatios: {
            AA: number;
            AAA: number;
        };
    };
};
import React, { ReactNode } from 'react';
import { petersenGamingTheme } from '../themes/petersen-gaming-theme';
type ThemeName = 'petersen-gaming' | 'ecommerce';
type DesignTokens = typeof petersenGamingTheme;
interface DesignSystemContextType {
    tokens: DesignTokens;
    theme: ThemeName;
    setTheme: (theme: ThemeName) => void;
}
interface DesignSystemProviderProps {
    children: ReactNode;
    defaultTheme?: ThemeName;
}
export declare const DesignSystemProvider: React.FC<DesignSystemProviderProps>;
export declare const useDesignSystem: () => DesignSystemContextType;
export declare const migrationHelpers: {
    mapQuantumTokens: (oldTokens: any) => {
        primary: string;
        secondary: string;
        accent: string;
    };
    convertHardcodedColors: (styleObject: Record<string, any>) => ({
        property: string;
        oldValue: any;
        newValue: any;
    } | null)[];
};
export { DesignSystemProvider, useDesignSystem } from './providers/DesignSystemProvider';
export { petersenGamingTheme, ecommerceTheme } from './themes';
export { corefoundation, brandColors, liquidGlassEffects } from './tokens';
export { migrationHelpers } from './utils/token-migration';
export type { DesignTokens, ThemeName } from './providers/DesignSystemProvider';
//# sourceMappingURL=token_storage_organization.d.ts.map