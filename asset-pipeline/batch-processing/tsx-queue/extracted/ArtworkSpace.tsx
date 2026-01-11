import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ArtworkSpaceProps {
  title: string;
  width: number;
  height: number;
  description: string;
  placement: 'header' | 'sidebar' | 'feature' | 'background';
  format: string;
  isMobile?: boolean;
}

const ArtworkSpace: React.FC<ArtworkSpaceProps> = ({
  title,
  width,
  height,
  description,
  placement,
  format,
  isMobile = false
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file drop logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        background: isDragOver 
          ? 'linear-gradient(135deg, rgba(79, 195, 247, 0.2), rgba(171, 71, 188, 0.15))'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04))',
        borderRadius: '12px',
        padding: '16px',
        border: `2px dashed ${isDragOver ? '#4FC3F7' : 'rgba(255, 255, 255, 0.2)'}`,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        minHeight: isMobile ? '120px' : '160px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '8px',
        background: 'rgba(79, 195, 247, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '8px',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4FC3F7" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21,15 16,10 5,21"/>
        </svg>
      </div>

      <h4 style={{
        color: '#FFFFFF',
        fontSize: isMobile ? '14px' : '16px',
        fontWeight: '600',
        margin: '0 0 4px',
      }}>
        {title}
      </h4>

      <p style={{
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: isMobile ? '11px' : '12px',
        margin: '0 0 8px',
        lineHeight: 1.4,
      }}>
        {description}
      </p>

      <div style={{
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '6px',
        padding: '6px 10px',
        fontSize: '10px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontFamily: 'monospace',
      }}>
        {width} × {height}px • {format}
      </div>

      <div style={{
        fontSize: '9px',
        color: 'rgba(255, 255, 255, 0.4)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginTop: '4px',
      }}>
        {placement} placement
      </div>
    </motion.div>
  );
};

export default ArtworkSpace;