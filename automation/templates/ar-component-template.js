// AR Interface Component Template
module.exports = (componentName, svgContent, options) => {
  const { stateImplementation } = options;
  
  return `import React, { useState, useEffect } from 'react';
import { useDesignSystem } from '../../hooks/useDesignSystem';

export interface ${componentName}Props {
  /** Size variant of the component */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Current quantum state, defaults to system state if not specified */
  state?: 'heritage' | 'transitional' | 'quantum' | 'superposition';
  /** Enable AR-specific optimizations for VisionOS */
  visionOSOptimized?: boolean;
  /** Distance from viewer in spatial UI (Vision Pro) */
  depthZ?: number;
  /** Animation speed multiplier */
  animationSpeed?: number;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional className for styling */
  className?: string;
}

/**
 * ${componentName} - An AR interface component
 * 
 * This component is optimized for AR interfaces in VisionOS and
 * implements the quantum-spatial design system states.
 */
export const ${componentName}: React.FC<${componentName}Props> = ({
  size = 'md',
  state,
  visionOSOptimized = true,
  depthZ = 0,
  animationSpeed = 1,
  onClick,
  className = '',
}) => {
  // Use design system context for state if not explicitly provided
  const { state: systemState } = useDesignSystem();
  const activeState = state || systemState;
  
  // State for superposition animation
  const [animationPhase, setAnimationPhase] = useState(0);
  
  // Handle superposition state animation
  useEffect(() => {
    if (activeState === 'superposition') {
      const interval = setInterval(() => {
        setAnimationPhase(prev => (prev + 1) % 3);
      }, 1000 / animationSpeed);
      
      return () => clearInterval(interval);
    }
  }, [activeState, animationSpeed]);
  
  // Size mapping
  const sizeMap = {
    sm: 0.75,
    md: 1,
    lg: 1.5,
    xl: 2
  };
  
  const scale = sizeMap[size];
  
  // Vision Pro optimization
  const visionOSStyles = visionOSOptimized ? {
    transform: \`translateZ(\${depthZ}px)\`,
  } : {};
  
  // Determine which gradient to use based on state
  const strokeGradient = activeState === 'superposition'
    ? ['url(#heritage-gradient)', 'url(#transitional-gradient)', 'url(#quantum-gradient)'][animationPhase]
    : activeState === 'heritage'
      ? 'url(#heritage-gradient)'
      : activeState === 'transitional'
        ? 'url(#transitional-gradient)'
        : 'url(#quantum-gradient)';
  
  return (
    <div 
      className={\`quantum-ar-component \${className}\`}
      onClick={onClick}
      style={{
        ...visionOSStyles,
        transform: \`scale(\${scale}) \${visionOSStyles.transform || ''}\`.trim(),
      }}
      data-quantum-state={activeState}
      role="img"
      aria-label="${componentName}"
    >
      ${stateImplementation 
        ? svgContent.replace(/stroke="([^"]+)"/g, `stroke={strokeGradient}`) 
        : svgContent}
    </div>
  );
};

export default ${componentName};
`};
