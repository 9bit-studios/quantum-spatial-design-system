import React from 'react';
import { motion } from 'framer-motion';

// Enhanced Design Tokens needed for this component
const enhancedDesignTokens = {
  colors: {
    text: '#FFFFFF',
  },
  gradients: {
    glassCard: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 15, 0.7) 100%)',
  },
  shadows: {
    glassSubtle: '0 4px 16px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.05)',
  },
  spacing: {
    lg: '16px',
  },
  radius: {
    md: '12px',
  },
  blur: {
    medium: '16px',
  },
};

interface MobileMenuToggleProps {
  onClick: () => void;
}

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({ onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        position: 'fixed',
        top: enhancedDesignTokens.spacing.lg,
        left: enhancedDesignTokens.spacing.lg,
        width: '48px',
        height: '48px',
        borderRadius: enhancedDesignTokens.radius.md,
        background: enhancedDesignTokens.gradients.glassCard,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: `blur(${enhancedDesignTokens.blur.medium})`,
        zIndex: 1000,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: enhancedDesignTokens.shadows.glassSubtle,
      }}
    >
      <div style={{ color: enhancedDesignTokens.colors.text }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
        </svg>
      </div>
    </motion.button>
  );
};

export default MobileMenuToggle;