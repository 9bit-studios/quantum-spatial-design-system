/**
 * Type definitions for extracted Apple HIG compliant components
 */

import React from 'react';

// AppleNavigation component types
export interface AppleNavigationProps {
  isMobile: boolean;
  currentTime: string;
  showInternalNav?: boolean;
  sections?: Array<{ id: string; label: string }>;
  onSectionChange?: (section: string) => void;
  title?: string;
  subtitle?: string;
}

// VimeoModule component types
export interface VimeoModuleProps {
  videoId: string;
  title: string;
  description?: string;
  autoplay?: boolean;
  loop?: boolean;
  width?: number;
  height?: number;
  isMobile?: boolean;
}

// ArtworkSpace component types
export interface ArtworkSpaceProps {
  title: string;
  width: number;
  height: number;
  description: string;
  placement: 'header' | 'sidebar' | 'feature' | 'background';
  format: string;
  isMobile?: boolean;
}

// EnhancedStatCard component types
export interface EnhancedStatCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
  isMobile?: boolean;
  extraInfo?: string;
}

// EnhancedActivityFeed component types
export interface Activity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  color: string;
  priority: 'high' | 'medium' | 'low';
}

export interface EnhancedActivityFeedProps {
  activities: Activity[];
  isMobile?: boolean;
}

// MobileMenuToggle component types
export interface MobileMenuToggleProps {
  onClick: () => void;
}

// QuantumSpatialButton component types
export interface QuantumSpatialButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  quantum?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
}