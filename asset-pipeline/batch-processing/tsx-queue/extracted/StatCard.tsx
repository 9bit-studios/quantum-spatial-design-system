/**
 * Stat Card Component
 * Extracted from PetersenGamesWebsite.tsx (Dashboard component)
 * 
 * A card component for displaying statistics with gradient backgrounds.
 */

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface StatCardProps extends Omit<HTMLMotionProps<"div">, 'color'> {
  title: string;
  value: number | string;
  color?: string;
  isMobile?: boolean;
}

const defaultTheme = {
  colors: {
    accent: '#4FC3F7',
    textTertiary: 'rgba(255, 255, 255, 0.65)',
  },
  spacing: {
    sm: '8px',
    lg: '24px',
  },
  radius: '12px',
  shadows: {
    glass: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  },
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  color = defaultTheme.colors.accent,
  isMobile = false,
  style = {},
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition,
  ...motionProps
}) => {
  const cardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: defaultTheme.radius,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: defaultTheme.shadows.glass,
    padding: defaultTheme.spacing.lg,
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    ...style,
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: `linear-gradient(135deg, ${color}20, transparent)`,
  };

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: isMobile ? '24px' : '32px',
    fontWeight: '800',
    color: color,
    marginBottom: defaultTheme.spacing.sm,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: defaultTheme.colors.textTertiary,
    fontWeight: '600',
  };

  const formatValue = () => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  return (
    <motion.div
      style={cardStyle}
      initial={initial}
      animate={animate}
      transition={transition}
      {...motionProps}
    >
      <div style={overlayStyle} />
      <div style={contentStyle}>
        <div style={valueStyle}>
          {formatValue()}
        </div>
        <div style={titleStyle}>
          {title}
        </div>
      </div>
    </motion.div>
  );
};

// Static version without motion
export const StaticStatCard: React.FC<Omit<StatCardProps, keyof HTMLMotionProps<"div">>> = ({
  title,
  value,
  color = defaultTheme.colors.accent,
  isMobile = false,
  style = {},
  ...props
}) => {
  const cardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: defaultTheme.radius,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: defaultTheme.shadows.glass,
    padding: defaultTheme.spacing.lg,
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    ...style,
  };

  const formatValue = () => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  return (
    <div style={cardStyle} {...props}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        background: `linear-gradient(135deg, ${color}20, transparent)`,
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontSize: isMobile ? '24px' : '32px',
          fontWeight: '800',
          color: color,
          marginBottom: defaultTheme.spacing.sm,
        }}>
          {formatValue()}
        </div>
        <div style={{
          fontSize: '14px',
          color: defaultTheme.colors.textTertiary,
          fontWeight: '600',
        }}>
          {title}
        </div>
      </div>
    </div>
  );
};