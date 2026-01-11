import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Enhanced Design Tokens needed for this component
const enhancedDesignTokens = {
  colors: {
    primary: '#0A0D1C',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    textTertiary: 'rgba(255, 255, 255, 0.65)',
    textQuaternary: 'rgba(255, 255, 255, 0.45)',
    accentSuccess: '#66BB6A',
    accentTertiary: '#EC407A',
  },
  gradients: {
    glassCard: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 15, 0.7) 100%)',
  },
  shadows: {
    glassSubtle: '0 4px 16px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.05)',
    glassMedium: '0 8px 32px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 2px 0 rgba(255, 255, 255, 0.08)',
  },
  spacing: {
    sm: '8px',
    xl: '20px',
  },
  radius: {
    lg: '16px',
    md: '12px',
  },
  blur: {
    medium: '16px',
    subtle: '8px',
  },
  animation: {
    fast: '200ms',
    medium: '300ms',
    easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  }
};

interface EnhancedStatCardProps {
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

const EnhancedStatCard: React.FC<EnhancedStatCardProps> = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  gradient, 
  accentColor,
  isMobile = false,
  extraInfo 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants: any = {
    idle: { 
      scale: 1, 
      y: 0,
      rotateX: 0,
      rotateY: 0,
    },
    hover: { 
      scale: 1.03, 
      y: -4,
      rotateX: 2,
      rotateY: 2,
      transition: { 
        duration: 0.3, 
        ease: [0.175, 0.885, 0.32, 1.275] // Elastic easing
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="idle"
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        height: isMobile ? '120px' : '140px',
        background: enhancedDesignTokens.gradients.glassCard,
        borderRadius: enhancedDesignTokens.radius.lg,
        padding: enhancedDesignTokens.spacing.xl,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: `1px solid rgba(255, 255, 255, 0.1)`,
        backdropFilter: `blur(${enhancedDesignTokens.blur.medium})`,
        WebkitBackdropFilter: `blur(${enhancedDesignTokens.blur.medium})`,
        boxShadow: isHovered ? enhancedDesignTokens.shadows.glassMedium : enhancedDesignTokens.shadows.glassSubtle,
        overflow: 'hidden',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Background Accent Gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        background: gradient,
        opacity: isHovered ? 0.15 : 0.08,
        transition: `opacity ${enhancedDesignTokens.animation.medium} ${enhancedDesignTokens.animation.easing}`,
      }} />

      {/* Top Glossy Highlight */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '40%',
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.15), transparent)',
        borderRadius: `${enhancedDesignTokens.radius.lg} ${enhancedDesignTokens.radius.lg} 0 0`,
        opacity: isHovered ? 1 : 0.7,
        transition: `opacity ${enhancedDesignTokens.animation.fast} ${enhancedDesignTokens.animation.easing}`,
      }} />

      {/* Header Row */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        position: 'relative',
        zIndex: 2,
      }}>
        <div>
          <div style={{
            color: enhancedDesignTokens.colors.textTertiary,
            fontSize: isMobile ? '13px' : '14px',
            fontWeight: 600,
            marginBottom: enhancedDesignTokens.spacing.sm,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            letterSpacing: '0.5px',
          }}>
            {title}
          </div>
          <div style={{
            color: enhancedDesignTokens.colors.text,
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: 800,
            lineHeight: 1,
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            background: `linear-gradient(135deg, ${enhancedDesignTokens.colors.text}, ${accentColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
        </div>

        {/* Enhanced Icon Container */}
        <motion.div
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.2 }}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: enhancedDesignTokens.radius.md,
            background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}15)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${accentColor}40`,
            boxShadow: `0 4px 16px ${accentColor}25, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
            backdropFilter: `blur(${enhancedDesignTokens.blur.subtle})`,
          }}
        >
          <div style={{ color: accentColor, filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}>
            {icon}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}>
        <div style={{
          color: trend === 'up' ? enhancedDesignTokens.colors.accentSuccess : enhancedDesignTokens.colors.accentTertiary,
          fontSize: isMobile ? '12px' : '14px',
          fontWeight: 700,
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
        }}>
          {change}
        </div>
        
        {extraInfo && (
          <div style={{
            color: enhancedDesignTokens.colors.textQuaternary,
            fontSize: isMobile ? '11px' : '12px',
            fontWeight: 500,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
          }}>
            {extraInfo}
          </div>
        )}
      </div>

      {/* Corner Accent */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '60px',
        height: '60px',
        background: `radial-gradient(circle at center, ${accentColor}20, transparent 70%)`,
        borderRadius: `50% 0 ${enhancedDesignTokens.radius.lg} 0`,
      }} />
    </motion.div>
  );
};

export default EnhancedStatCard;