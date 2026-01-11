import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { unifiedDesignTokens, designUtils } from '../../layouts/UnifiedDesignSystem';

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

const VimeoModule: React.FC<VimeoModuleProps> = ({
  videoId,
  title,
  description,
  autoplay = false,
  loop = false,
  width = 640,
  height = 360,
  isMobile = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(!autoplay);

  const aspectRatio = (height / width) * 100;
  const finalWidth = isMobile ? '100%' : `${width}px`;
  const finalHeight = isMobile ? 'auto' : `${height}px`;

  const vimeoUrl = `https://player.vimeo.com/video/${videoId}?h=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479${autoplay ? '&amp;autoplay=1' : ''}${loop ? '&amp;loop=1' : ''}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        ...designUtils.getGlassCard('medium'),
        padding: unifiedDesignTokens.spacing.large,
        width: '100%',
        maxWidth: isMobile ? '100%' : `${width + 40}px`,
      }}
    >
      <div style={{
        marginBottom: unifiedDesignTokens.spacing.medium,
      }}>
        <h3 style={{
          ...unifiedDesignTokens.typography.title3,
          color: unifiedDesignTokens.colors.label,
          margin: `0 0 ${unifiedDesignTokens.spacing.small}`,
          textShadow: unifiedDesignTokens.typography.title3.textShadow,
        }}>
          {title}
        </h3>
        {description && (
          <p style={{
            ...unifiedDesignTokens.typography.subheadline,
            color: unifiedDesignTokens.colors.secondaryLabel,
            margin: 0,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
          }}>
            {description}
          </p>
        )}
      </div>

      <div style={{
        position: 'relative',
        paddingBottom: isMobile ? `${aspectRatio}%` : '0',
        height: isMobile ? '0' : finalHeight,
        width: finalWidth,
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        {showPlayButton && !isLoaded && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsLoaded(true);
              setShowPlayButton(false);
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(8px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '4px' }}>
              <path d="M8 5v14l11-7z"/>
            </svg>
          </motion.button>
        )}

        {(isLoaded || autoplay) && (
          <iframe
            src={vimeoUrl}
            style={{
              position: isMobile ? 'absolute' : 'relative',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title}
          />
        )}

        {!isLoaded && !autoplay && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, rgba(79, 195, 247, 0.1), rgba(171, 71, 188, 0.1))`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? '14px' : '16px',
            color: 'rgba(255, 255, 255, 0.6)',
            textAlign: 'center',
            padding: '20px',
          }}>
            Click play to load video
          </div>
        )}
      </div>

      {/* Video Controls Info */}
      <div style={{
        marginTop: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
        color: 'rgba(255, 255, 255, 0.5)',
      }}>
        <span>Vimeo Player</span>
        <span>{width} × {height}</span>
      </div>
    </motion.div>
  );
};

export default VimeoModule;