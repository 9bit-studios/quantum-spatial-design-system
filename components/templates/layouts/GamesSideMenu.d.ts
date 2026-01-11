import React from 'react';
interface PetersenMenuItem {
    id: string;
    label: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
    href?: string;
    isActive?: boolean;
    badge?: string | number;
    subItems?: PetersenMenuItem[];
    category: 'dashboard' | 'games' | 'players' | 'analytics' | 'admin' | 'tools';
}
declare const petersenMenuSections: ({
    id: string;
    label: string;
    items: ({
        id: string;
        label: string;
        icon: React.FC<{
            className?: string;
        }>;
        category: "dashboard";
        isActive: boolean;
        badge?: never;
    } | {
        id: string;
        label: string;
        icon: React.FC<{
            className?: string;
        }>;
        category: "analytics";
        badge: string;
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
        category: "games";
        badge: number;
        subItems?: never;
    } | {
        id: string;
        label: string;
        icon: React.FC<{
            className?: string;
        }>;
        category: "games";
        subItems: {
            id: string;
            label: string;
            icon: React.FC<{
                className?: string;
            }>;
            category: "games";
        }[];
        badge?: never;
    } | {
        id: string;
        label: string;
        icon: React.FC<{
            className?: string;
        }>;
        category: "games";
        badge?: never;
        subItems?: never;
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
        category: "players";
        badge: number;
    } | {
        id: string;
        label: string;
        icon: React.FC<{
            className?: string;
        }>;
        category: "tools";
        badge?: never;
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
        category: "admin";
        badge: string;
    } | {
        id: string;
        label: string;
        icon: React.FC<{
            className?: string;
        }>;
        category: "admin";
        badge?: never;
    })[];
})[];
interface PetersenGamesSideMenuProps {
    activeItem?: string;
    onItemClick?: (item: PetersenMenuItem) => void;
    collapsed?: boolean;
    isMobile?: boolean;
    className?: string;
}
declare const PetersenGamesSideMenu: React.FC<PetersenGamesSideMenuProps>;
export default PetersenGamesSideMenu;
export type { PetersenMenuItem, PetersenGamesSideMenuProps };
export { petersenMenuSections };
//# sourceMappingURL=GamesSideMenu.d.ts.map