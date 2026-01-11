// Animation Component Template
module.exports = (componentName, svgContent, options) => {
  const { stateImplementation } = options;
  
  return `import React, { useState, useEffect, useRef } from 'react';
import { useDesignSystem } from '../../hooks/useDesignSystem';

export interface ${componentName}Props {
  /** Animation playback state */
  playing?: boolean;
  /** Animation speed multiplier */
  speed?: number;
  /** Loop the animation */
  loop?: boolean;
  /** Autoplay on mount */
  autoPlay?: boolean;
  /** Animation direction */
  direction?: 'forward' | 'reverse';
  /** Current quantum state, defaults to system state if not specified */
  state?: 'heritage' | 'transitional' | 'quantum' | 'superposition';
  /** Size of the animation */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Optional callback when animation completes */
  onComplete?: () => void;
  /** Optional className for styling */
  className?: string;
}

/**
 * ${componentName} - An animated quantum-spatial component
 * 
 * This component features animated elements and supports playback controls.
 * It implements the quantum-spatial design system states.
 */
export const ${componentName}: React.FC<${componentName}Props> = ({
  playing = true,
  speed = 1,
  loop = true,
  autoPlay = true,
  direction = 'forward',
  state,
  size = 'md',
  onComplete,
  className = '',
}) => {
  // Reference to the SVG element
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Use design system context for state if not explicitly provided
  const { state: systemState } = useDesignSystem();
  const activeState = state || systemState;
  
  // Animation control states
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentDirection, setCurrentDirection] = useState(direction);
  
  // Size mapping
  const sizeMap = {
    sm: 0.75,
    md: 1,
    lg: 1.5,
    xl: 2
  };
  
  const scale = sizeMap[size];
  
  // Update playing state when prop changes
  useEffect(() => {
    setIsPlaying(playing);
  }, [playing]);
  
  // Update direction when prop changes
  useEffect(() => {
    setCurrentDirection(direction);
  }, [direction]);
  
  // Handle animation control
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    const animations = svg.querySelectorAll('animate, animateTransform, animateMotion');
    
    const updateAnimations = () => {
      animations.forEach((anim: SVGAnimateElement) => {
        // Update animation speed
        if (anim.getAttribute('dur')) {
          const origDur = parseFloat(anim.getAttribute('data-orig-dur') || anim.getAttribute('dur') || '0');
          if (!anim.getAttribute('data-orig-dur')) {
            anim.setAttribute('data-orig-dur', anim.getAttribute('dur') || '0');
          }
          anim.setAttribute('dur', \`\${origDur / speed}s\`);
        }
        
        // Set animation loop
        if (loop) {
          anim.setAttribute('repeatCount', 'indefinite');
        } else {
          anim.setAttribute('repeatCount', '1');
        }
        
        // Set animation direction
        if (currentDirection === 'reverse') {
          if (!anim.getAttribute('data-orig-values')) {
            anim.setAttribute('data-orig-values', anim.getAttribute('values') || '');
          }
          const values = anim.getAttribute('data-orig-values')?.split(';') || [];
          if (values.length > 1) {
            anim.setAttribute('values', values.reverse().join(';'));
          }
        } else if (anim.getAttribute('data-orig-values')) {
          anim.setAttribute('values', anim.getAttribute('data-orig-values') || '');
        }
        
        // Control playback
        try {
          if (isPlaying) {
            anim.beginElement();
          } else {
            anim.endElement();
          }
        } catch (e) {
          // Some browsers don't support these methods
          console.warn('Animation control not fully supported in this browser');
        }
      });
    };
    
    // Initialize animations
    updateAnimations();
    
    // Handle animation finish
    const handleAnimationEnd = () => {
      if (!loop && onComplete) {
        onComplete();
      }
    };
    
    animations.forEach(anim => {
      anim.addEventListener('endEvent', handleAnimationEnd);
    });
    
    return () => {
      animations.forEach(anim => {
        anim.removeEventListener('endEvent', handleAnimationEnd);
      });
    };
  }, [isPlaying, speed, loop, currentDirection, onComplete]);
  
  // Apply quantum state
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    
    // Apply state-specific styling
    if (activeState === 'heritage') {
      // Apply heritage state styling
      const paths = svg.querySelectorAll('path');
      paths.forEach(path => {
        if (path.getAttribute('stroke')) {
          path.setAttribute('stroke', 'url(#heritage-gradient)');
        }
      });
    } else if (activeState === 'transitional') {
      // Apply transitional state styling
      const paths = svg.querySelectorAll('path');
      paths.forEach(path => {
        if (path.getAttribute('stroke')) {
          path.setAttribute('stroke', 'url(#transitional-gradient)');
        }
      });
    } else if (activeState === 'quantum') {
      // Apply quantum state styling
      const paths = svg.querySelectorAll('path');
      paths.forEach(path => {
        if (path.getAttribute('stroke')) {
          path.setAttribute('stroke', 'url(#quantum-gradient)');
        }
      });
    } else if (activeState === 'superposition') {
      // Cycle through states for superposition
      let phase = 0;
      const interval = setInterval(() => {
        const paths = svg.querySelectorAll('path');
        const gradients = ['url(#heritage-gradient)', 'url(#transitional-gradient)', 'url(#quantum-gradient)'];
        
        paths.forEach(path => {
          if (path.getAttribute('stroke')) {
            path.setAttribute('stroke', gradients[phase]);
          }
        });
        
        phase = (phase + 1) % 3;
      
}, 1000 / speed);
      
      return () => clearInterval(interval);
    }
  }, [activeState, speed]);
  
  return (
    <div 
      className={\`quantum-animation-component \${className}\`}
      style={{ transform: \`scale(\${scale})\` }}
      data-quantum-state={activeState}
    >
      <div 
        dangerouslySetInnerHTML={{ 
          __html: ${JSON.stringify(svgContent)} 
        }}
        ref={svgRef as any}
      />
      
      {/* Playback controls can be added here if needed */}
      {false && (
        <div className="animation-controls">
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button onClick={() => setCurrentDirection(currentDirection === 'forward' ? 'reverse' : 'forward')}>
            {currentDirection === 'forward' ? 'Reverse' : 'Forward'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ${componentName};
`};
