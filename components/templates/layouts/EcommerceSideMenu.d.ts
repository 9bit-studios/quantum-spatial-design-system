import React from 'react';
declare const liquidGlassTokens: {
    colors: {
        primary: string;
        secondary: string;
        tertiary: string;
        quaternary: string;
        systemBlue: string;
        systemGreen: string;
        systemOrange: string;
        systemRed: string;
        systemPurple: string;
        systemTeal: string;
        label: string;
        secondaryLabel: string;
        tertiaryLabel: string;
        quaternaryLabel: string;
        systemFill: string;
        secondarySystemFill: string;
        tertiarySystemFill: string;
        quaternarySystemFill: string;
        separator: string;
        opaqueSeparator: string;
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
        title2: {
            size: string;
            weight: string;
            lineHeight: string;
        };
        title3: {
            size: string;
            weight: string;
            lineHeight: string;
        };
        headline: {
            size: string;
            weight: string;
            lineHeight: string;
        };
        body: {
            size: string;
            weight: string;
            lineHeight: string;
        };
        callout: {
            size: string;
            weight: string;
            lineHeight: string;
        };
        subheadline: {
            size: string;
            weight: string;
            lineHeight: string;
        };
        footnote: {
            size: string;
            weight: string;
            lineHeight: string;
        };
        caption1: {
            size: string;
            weight: string;
            lineHeight: string;
        };
        caption2: {
            size: string;
            weight: string;
            lineHeight: string;
        };
    };
    animation: {
        duration: {
            short: string;
            medium: string;
            long: string;
        };
        easing: {
            standard: string;
            decelerated: string;
            accelerated: string;
        };
    };
    effects: {
        blur: string;
        backgroundBlur: string;
        thinMaterialBlur: string;
        thickMaterialBlur: string;
    };
};
interface EcommerceMenuItem {
    id: string;
    label: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
    href?: string;
    isActive?: boolean;
    badge?: string | number;
    category: 'overview' | 'commerce' | 'customers' | 'marketing' | 'settings';
}
declare const ecommerceMenuSections: ({
    id: string;
    label: string;
    items: ({
        id: string;
        label: string;
        icon: React.FC<{
            className?: string;
        }>;
        category: "overview";
        isActive: boolean;
    } | {
        id: string;
        label: string;
        icon: React.FC<{
            className?: string;
        }>;
        category: "overview";
        isActive?: never;
    })[];
} | {
    id: string;
    label: string;
    items: ({
        id: string;
        label: string;
        icon: React.FC<{
            className?: string;
        }>;
        category: "commerce";
        badge: number;
    } | {
        id: string;
        label: string;
        icon: React.FC<{
            className?: string;
        }>;
        category: "commerce";
        badge?: never;
    })[];
} | {
    id: string;
    label: string;
    items: {
        id: string;
        label: string;
        icon: React.FC<{
            className?: string;
        }>;
        category: "customers";
        badge: string;
    }[];
} | {
    id: string;
    label: string;
    items: {
        id: string;
        label: string;
        icon: React.FC<{
            className?: string;
        }>;
        category: "marketing";
        badge: number;
    }[];
} | {
    id: string;
    label: string;
    items: {
        id: string;
        label: string;
        icon: React.FC<{
            className?: string;
        }>;
        category: "settings";
    }[];
})[];
interface EcommerceSideMenuProps {
    activeItem?: string;
    onItemClick?: (item: EcommerceMenuItem) => void;
    collapsed?: boolean;
    isMobile?: boolean;
    className?: string;
}
declare const EcommerceSideMenu: React.FC<EcommerceSideMenuProps>;
export default EcommerceSideMenu;
export type { EcommerceMenuItem, EcommerceSideMenuProps };
export { ecommerceMenuSections, liquidGlassTokens };
//# sourceMappingURL=EcommerceSideMenu.d.ts.map