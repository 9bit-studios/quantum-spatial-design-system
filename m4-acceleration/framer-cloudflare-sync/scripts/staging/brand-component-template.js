// Brand Component Template
module.exports = (componentName, svgContent, options) => {
  const { stateImplementation } = options;
  
  return `import React, { useState, useEffect } from 'react';
import { useDesignSystem } from '../../hooks/useDesignSystem';

export interface ${componentName}Props {
  /** Current quantum state, defaults to system state if not specified */
  state?: 'heritage' | 'transitional' | 'quantum' | 'superposition';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Controls the animation and hover effects */
  interactive?: boolean;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional className for styling */
  className?: string;
}

/**
 * ${componentName} - A brand visual component
 * 
 * This component displays brand imagery with quantum-spatial styling
 * and interactive capabilities.
 */
export const ${componentName}: React.FC<${componentName}Props> = ({
  state,
  size = 'md',
  interactive = true,
  onClick,
  className = '',
}) => {
  // Use design system context for state if not explicitly provided
  const { state: systemState } = useDesignSystem();
  const activeState = state || systemState;
  
  // Hover state for interactive elements
  const [isHovered, setIsHovered] = useState(false);
  
  // State for superposition animation
  const [animationPhase, setAnimationPhase] = useState(0);
  
  // Size mapping
  const sizeMap = {
    sm: 0.75,
    md: 1,
    lg: 1.5,
    xl: 2
  };
  
  const scale = sizeMap[size];
  
  // Handle superposition state animation
  useEffect(() => {
    if (activeState === 'superposition') {
      const interval = setInterval(() => {
        setAnimationPhase(prev => (prev + 1) % 3);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [activeState]);
  
  // Process SVG content based on state
  const processSvgContent = () => {
    let processed = ${JSON.stringify(svgContent)};
    
    if (stateImplementation) {
      // Apply state-specific colors and effects
      if (activeState === 'heritage') {
        processed = processed.replace(/fill="([^"]+)"/g, (match, fill) => {
          // Only replace non-transparent fills
          if (fill !== 'none' && fill !== 'transparent') {
            return 'fill="url(#heritage-gradient)"';
          }
          return match;
        });
      } else if (activeState === 'transitional') {
        processed = processed.replace(/fill="([^"]+)"/g, (match, fill) => {
          if (fill !== 'none' && fill !== 'transparent') {
            return 'fill="url(#transitional-gradient)"';
          }
          return match;
        });
      } else if (activeState === 'quantum') {
        processed = processed.replace(/fill="([^"]+)"/g, (match, fill) => {
          if (fill !== 'none' && fill !== 'transparent') {
            return 'fill="url(#quantum-gradient)"';
          }
          return match;
        });
      } else if (activeState === 'superposition') {
        // For superposition, we'll handle it in CSS since it's animated
        processed = processed.replace(/fill="([^"]+)"/g, (match, fill) => {
          if (fill !== 'none' && fill !== 'transparent') {
            return \`fill="url(#\${['heritage', 'transitional', 'quantum'][animationPhase]}-gradient)"\`;
          }
          return match;
        });
      }
    }
    
    return processed;
  };
  
  return (
    <div 
      className={\`quantum-brand-component \${className} \${isHovered ? 'hovered' : ''}\`}
      style={{ transform: \`scale(\${scale})\` }}
      data-quantum-state={activeState}
      onClick={interactive ? onClick : undefined}
      onMouseEnter={interactive ? () => setIsHovered(true) : undefined}
      onMouseLeave={interactive ? () => setIsHovered(false) : undefined}
    >
      <div 
        className="brand-visual-container"
        dangerouslySetInnerHTML={{ __html: processSvgContent() }}
      />
      
      <style jsx>{\`
        .quantum-brand-component {
          position: relative;
          transition: transform 0.3s ease-out, filter 0.3s ease-out;
        }
        
        .quantum-brand-component.hovered {
          transform: scale(\${scale * 1.05});
          filter: drop-shadow(0 0 10px var(--color-subtle-cyan));
        }
        
        @keyframes superpositionTransition {
          0%, 33% { filter: drop-shadow(0 0 5px #3DFF74); }
          33%, 66% { filter: drop-shadow(0 0 5px #5AC8FA); }
          66%, 100% { filter: drop-shadow(0 0 5px #FF2D55); }
        }
        
        .quantum-brand-component[data-quantum-state="superposition"] {
          animation: superpositionTransition 3s infinite;
        }
      \`}</style>
    </div>
  );
};

export default ${componentName};
`};
