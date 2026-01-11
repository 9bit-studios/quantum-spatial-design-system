import React from 'react';
declare const AppleNavigation: React.FC<{
    isMobile: boolean;
    currentTime: string;
    showInternalNav?: boolean;
    sections?: Array<{
        id: string;
        label: string;
    }>;
    onSectionChange?: (section: string) => void;
    title?: string;
    subtitle?: string;
}>;
interface VimeoModuleProps {
    videoId: string;
    title: string;
    description?: string;
    autoplay?: boolean;
    loop?: boolean;
    width?: number;
    height?: number;
    isMobile?: boolean;
}
declare const VimeoModule: React.FC<VimeoModuleProps>;
interface ArtworkSpaceProps {
    title: string;
    width: number;
    height: number;
    description: string;
    placement: 'header' | 'sidebar' | 'feature' | 'background';
    format: string;
    isMobile?: boolean;
}
declare const ArtworkSpace: React.FC<ArtworkSpaceProps>;
interface EnhancedPetersenGamesDashboardProps {
    isMobile?: boolean;
    showInternalNav?: boolean;
    sections?: Array<{
        id: string;
        label: string;
    }>;
    onSectionChange?: (section: string) => void;
    title?: string;
    subtitle?: string;
}
declare const EnhancedPetersenGamesDashboard: React.FC<EnhancedPetersenGamesDashboardProps>;
export default EnhancedPetersenGamesDashboard;
export { AppleNavigation, VimeoModule, ArtworkSpace };
//# sourceMappingURL=EnhancedDashboard.d.ts.map