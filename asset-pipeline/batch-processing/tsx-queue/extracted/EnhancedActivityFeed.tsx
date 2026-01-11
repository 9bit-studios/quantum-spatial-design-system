import React from 'react';
import { motion } from 'framer-motion';

// Enhanced Design Tokens needed for this component
const enhancedDesignTokens = {
  colors: {
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
    textTertiary: 'rgba(255, 255, 255, 0.65)',
    textQuaternary: 'rgba(255, 255, 255, 0.45)',
    accent: '#4FC3F7',
  },
  gradients: {
    glassCard: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 15, 0.7) 100%)',
  },
  shadows: {
    glassSubtle: '0 4px 16px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.05)',
  },
  spacing: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  radius: {
    sm: '8px',
    lg: '16px',
    full: '50%',
  },
  blur: {
    medium: '16px',
  },
};

interface Activity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  color: string;
  priority: 'high' | 'medium' | 'low';
}

interface EnhancedActivityFeedProps {
  activities: Activity[];
  isMobile?: boolean;
}

const EnhancedActivityFeed: React.FC<EnhancedActivityFeedProps> = ({ 
  activities, 
  isMobile = false 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={{
      background: enhancedDesignTokens.gradients.glassCard,
      border: `1px solid rgba(255, 255, 255, 0.08)`,
      borderRadius: enhancedDesignTokens.radius.lg,
      padding: enhancedDesignTokens.spacing.xl,
      width: '100%',
      minHeight: isMobile ? '280px' : '360px',
      backdropFilter: `blur(${enhancedDesignTokens.blur.medium})`,
      WebkitBackdropFilter: `blur(${enhancedDesignTokens.blur.medium})`,
      boxShadow: enhancedDesignTokens.shadows.glassSubtle,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Header */}
    <div style={{ marginBottom: enhancedDesignTokens.spacing.xl }}>
      <h3 style={{
        color: enhancedDesignTokens.colors.text,
        fontSize: isMobile ? '18px' : '20px',
        fontWeight: 700,
        margin: 0,
        marginBottom: enhancedDesignTokens.spacing.sm,
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
      }}>
        Live Game Activity
      </h3>
      <p style={{
        color: enhancedDesignTokens.colors.textTertiary,
        fontSize: isMobile ? '13px' : '14px',
        margin: 0,
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
      }}>
        Real-time events across all game servers
      </p>
    </div>

    {/* Activity List */}
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: enhancedDesignTokens.spacing.lg,
      maxHeight: isMobile ? '200px' : '280px',
      overflowY: 'auto',
    }}>
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.02, x: 4 }}
          style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: enhancedDesignTokens.spacing.md,
            padding: enhancedDesignTokens.spacing.md,
            borderRadius: enhancedDesignTokens.radius.sm,
            background: 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${activity.color}20`,
            cursor: 'pointer',
          }}
        >
          {/* Priority Indicator */}
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${activity.color}, ${activity.color}CC)`,
            marginTop: '6px',
            flexShrink: 0,
            boxShadow: `0 0 12px ${activity.color}50, inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
            border: `1px solid ${activity.color}80`,
          }} />
          
          <div style={{ flex: 1 }}>
            <div style={{
              color: enhancedDesignTokens.colors.textSecondary,
              fontSize: isMobile ? '13px' : '14px',
              fontWeight: 600,
              marginBottom: '4px',
              lineHeight: 1.4,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
            }}>
              {activity.message}
            </div>
            <div style={{
              color: enhancedDesignTokens.colors.textQuaternary,
              fontSize: isMobile ? '11px' : '12px',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
            }}>
              {activity.timestamp}
            </div>
          </div>

          {/* Priority Badge */}
          {activity.priority === 'high' && (
            <div style={{
              background: `linear-gradient(135deg, ${activity.color}40, ${activity.color}20)`,
              color: enhancedDesignTokens.colors.text,
              borderRadius: enhancedDesignTokens.radius.full,
              padding: '2px 8px',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              border: `1px solid ${activity.color}50`,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.7)',
            }}>
              High
            </div>
          )}
        </motion.div>
      ))}
    </div>

    {/* Background Texture */}
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100px',
      height: '100px',
      background: `radial-gradient(circle, ${enhancedDesignTokens.colors.accent}10, transparent 70%)`,
      borderRadius: '50%',
      transform: 'translate(30px, -30px)',
    }} />
  </motion.div>
);

export default EnhancedActivityFeed;