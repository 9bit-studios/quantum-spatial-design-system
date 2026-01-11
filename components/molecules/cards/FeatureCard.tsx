/**
 * Feature Card Component
 * Extracted from PetersenGamesWebsite.tsx (Homepage component)
 * 
 * A card component for displaying features with icons.
 */

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface FeatureCardProps extends HTMLMotionProps<"div"> {
  title: string;
  description: string;
  icon: string | React.ReactNode;
  delay?: number;
}

const theme = {
  colors: {
    textTertiary: 'rgba(255, 255, 255, 0.65)',
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
  },
  radius: '12px',
  shadows: {
    glass: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  },
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  delay = 0,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { delay },
  style = {},
  ...motionProps
}) => {
  const cardStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    borderRadius: theme.radius,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: theme.shadows.glass,
    padding: theme.spacing.lg,
    textAlign: 'center',
    ...style,
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '48px',
    marginBottom: theme.spacing.md,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  };

  const descriptionStyle: React.CSSProperties = {
    color: theme.colors.textTertiary,
    lineHeight: 1.5,
  };

  return (
    <motion.div
      style={cardStyle}
      initial={initial}
      animate={animate}
      transition={transition}
      {...motionProps}
    >
      {typeof icon === 'string' ? (
        <div style={iconStyle}>{icon}</div>
      ) : (
        <div style={{ marginBottom: theme.spacing.md }}>{icon}</div>
      )}
      <h3 style={titleStyle}>{title}</h3>
      <p style={descriptionStyle}>{description}</p>
    </motion.div>
  );
};

// Static version without motion
export const StaticFeatureCard: React.FC<Omit<FeatureCardProps, keyof HTMLMotionProps<"div">>> = ({
  title,
  description,
  icon,
  style = {},
  ...props
}) => {
  const cardStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    borderRadius: theme.radius,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: theme.shadows.glass,
    padding: theme.spacing.lg,
    textAlign: 'center',
    ...style,
  };

  return (
    <div style={cardStyle} {...props}>
      {typeof icon === 'string' ? (
        <div style={{ fontSize: '48px', marginBottom: theme.spacing.md }}>{icon}</div>
      ) : (
        <div style={{ marginBottom: theme.spacing.md }}>{icon}</div>
      )}
      <h3 style={{
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: theme.spacing.sm,
      }}>
        {title}
      </h3>
      <p style={{
        color: theme.colors.textTertiary,
        lineHeight: 1.5,
      }}>
        {description}
      </p>
    </div>
  );
};