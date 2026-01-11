/**
 * Glass Card Component
 * Extracted from PetersenGamesWebsite.tsx
 * 
 * A reusable glass morphism card component with backdrop blur effect.
 */

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'purple';
  padding?: string;
}

// Glass card theme configuration
const glassTheme = {
  colors: {
    glass: 'rgba(255, 255, 255, 0.1)',
    glassBorder: 'rgba(255, 255, 255, 0.2)',
  },
  gradients: {
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    accent: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
    purple: 'linear-gradient(135deg, #AB47BC 0%, #8E24AA 100%)',
  },
  shadows: {
    glass: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  },
  radius: '12px',
  spacing: {
    lg: '24px',
    xl: '40px',
  },
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'default',
  padding = glassTheme.spacing.lg,
  style = {},
  ...motionProps
}) => {
  const getBackground = () => {
    switch (variant) {
      case 'accent':
        return glassTheme.gradients.accent;
      case 'purple':
        return glassTheme.gradients.purple;
      default:
        return glassTheme.gradients.glass;
    }
  };

  const cardStyle: React.CSSProperties = {
    background: getBackground(),
    borderRadius: glassTheme.radius,
    border: `1px solid ${glassTheme.colors.glassBorder}`,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: glassTheme.shadows.glass,
    padding,
    ...style,
  };

  return (
    <motion.div style={cardStyle} {...motionProps}>
      {children}
    </motion.div>
  );
};

// Static version without motion
export const StaticGlassCard: React.FC<Omit<GlassCardProps, keyof HTMLMotionProps<"div">>> = ({
  children,
  variant = 'default',
  padding = glassTheme.spacing.lg,
  style = {},
  ...props
}) => {
  const getBackground = () => {
    switch (variant) {
      case 'accent':
        return glassTheme.gradients.accent;
      case 'purple':
        return glassTheme.gradients.purple;
      default:
        return glassTheme.gradients.glass;
    }
  };

  const cardStyle: React.CSSProperties = {
    background: getBackground(),
    borderRadius: glassTheme.radius,
    border: `1px solid ${glassTheme.colors.glassBorder}`,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: glassTheme.shadows.glass,
    padding,
    ...style,
  };

  return (
    <div style={cardStyle} {...props}>
      {children}
    </div>
  );
};