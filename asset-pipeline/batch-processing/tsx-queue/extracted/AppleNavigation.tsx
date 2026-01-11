import React from 'react';
import { motion } from 'framer-motion';
import { unifiedDesignTokens } from '../../layouts/UnifiedDesignSystem';

interface AppleNavigationProps {
  isMobile: boolean;
  currentTime: string;
  showInternalNav?: boolean;
  sections?: Array<{ id: string; label: string }>;
  onSectionChange?: (section: string) => void;
  title?: string;
  subtitle?: string;
}

// Apple Dark Mode Navigation Component with Unified Design
const AppleNavigation: React.FC<AppleNavigationProps> = ({ 
  isMobile, 
  currentTime, 
  showInternalNav = false,
  sections = [],
  onSectionChange,
  title,
  subtitle
}) => (
  <nav style={{
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(10, 10, 15, 0.9) 50%, rgba(15, 15, 20, 0.95) 100%)',
    backdropFilter: 'blur(40px) saturate(200%) brightness(60%)',
    borderBottom: `1px solid rgba(76, 29, 149, 0.15)`,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
  }}>
    <div style={{
      width: '100%',
      margin: '0',
      padding: `0 ${unifiedDesignTokens.spacing.medium}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: unifiedDesignTokens.components.navigation.height,
    }}>
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}
      >
        <div style={{
          ...unifiedDesignTokens.typography.title3,
          color: unifiedDesignTokens.colors.label,
          letterSpacing: unifiedDesignTokens.typography.title3.letterSpacing,
        }}>
          {showInternalNav && title ? title : 'Petersen Games'}
        </div>
        {showInternalNav && subtitle && (
          <div style={{
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '300px',
            lineHeight: '1.3'
          }}>
            {subtitle}
          </div>
        )}
      </motion.div>
      
      {!isMobile && showInternalNav && sections.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => onSectionChange?.(section.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                padding: '6px 12px',
                color: '#f5f5f7',
                textDecoration: 'none',
                fontSize: '11px',
                fontWeight: '500',
                opacity: 0.9,
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
              }}
            >
              {section.label}
            </motion.button>
          ))}
        </motion.div>
      )}
      
      {!isMobile && !showInternalNav && (
        <motion.ul 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: '32px',
            alignItems: 'center',
            margin: 0,
            padding: 0,
          }}
        >
          {['Dashboard', 'Games', 'Community', 'Analytics', 'Settings'].map((item, index) => (
            <motion.li key={item}>
              <motion.a
                href="#"
                whileHover={{ opacity: 1 }}
                style={{
                  color: '#f5f5f7',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: '400',
                  opacity: index === 0 ? 1 : 0.8,
                  transition: 'opacity 0.3s ease',
                  letterSpacing: '-0.01em',
                }}
              >
                {item}
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>
      )}
      
      <motion.div 
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {!isMobile && (
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search"
              style={{
                background: unifiedDesignTokens.components.input.background,
                border: `${unifiedDesignTokens.components.input.borderWidth} solid ${unifiedDesignTokens.components.input.borderColor}`,
                borderRadius: unifiedDesignTokens.cornerRadius.small,
                padding: `6px ${unifiedDesignTokens.spacing.small} 6px 32px`,
                fontSize: unifiedDesignTokens.typography.caption1.size,
                color: unifiedDesignTokens.colors.label,
                width: '200px',
                outline: 'none',
                transition: `all ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard}`,
              }}
            />
            <svg style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '14px',
              height: '14px',
              opacity: 0.6,
            }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
        )}
        
        <div style={{
          fontSize: '11px',
          color: 'rgba(245, 245, 247, 0.6)',
          letterSpacing: '-0.01em',
        }}>
          {currentTime}
        </div>
      </motion.div>
    </div>
  </nav>
);

export default AppleNavigation;