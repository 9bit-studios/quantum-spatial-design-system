import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Workflow data structure for UX patterns
const UX_PATTERNS = {
  animatedFiltering: {
    id: 'animated-filtering',
    title: 'Animated Category Filtering',
    complexity: 'Medium',
    description: 'Shows animated category views without full page navigation',
    implementation: {
      components: ['FilterPanel', 'ProductGrid', 'CategoryTabs'],
      animations: ['slideTransition', 'staggeredResults', 'morphTransition'],
      tokens: ['spacing.lg', 'animation.medium', 'colors.accent']
    },
    examples: [
      'Category sidebar with expanding subcategories',
      'Horizontal filter tabs with animated indicators',
      'Grid morphing between different product layouts'
    ]
  },
  spatialNavigation: {
    id: 'spatial-navigation',
    title: 'Spatial Navigation Patterns',
    complexity: 'High',
    description: 'Navigate through 3D space or layered content',
    implementation: {
      components: ['SpatialGrid', 'DepthIndicator', 'NavigationCube'],
      animations: ['perspectiveShift', 'depthTransition', 'parallaxScroll'],
      tokens: ['depth.level1', 'depth.level2', 'animation.quantum']
    },
    examples: [
      'Product showcase with depth layers',
      'Category exploration in 3D space',
      'Multi-dimensional filter interfaces'
    ]
  },
  glassomorphicUI: {
    id: 'glassmorphic-ui',
    title: 'Glassmorphic Interface Elements',
    complexity: 'Low',
    description: 'Transparent, blurred interface elements',
    implementation: {
      components: ['GlassCard', 'GlassButton', 'GlassModal'],
      animations: ['backdropTransition', 'glassRipple', 'surfaceElevation'],
      tokens: ['backdrop.gaming', 'glass.hover', 'depth.shadows']
    },
    examples: [
      'Product cards with glass effect',
      'Navigation overlays',
      'Modal dialogs with backdrop blur'
    ]
  }
};

const WORKFLOW_STEPS = [
  {
    id: 'analyze',
    title: 'Pattern Analysis',
    description: 'Identify and categorize the UX pattern',
    actions: ['Extract visual elements', 'Map user interactions', 'Define success metrics']
  },
  {
    id: 'design-tokens',
    title: 'Token Mapping',
    description: 'Map pattern to your Quantum-Spatial design tokens',
    actions: ['Identify token requirements', 'Check token availability', 'Define custom tokens if needed']
  },
  {
    id: 'component-architecture',
    title: 'Component Strategy',
    description: 'Plan component structure and relationships',
    actions: ['Define component hierarchy', 'Plan state management', 'Design prop interfaces']
  },
  {
    id: 'animation-design',
    title: 'Motion Design',
    description: 'Create fluid, meaningful animations',
    actions: ['Define transition timing', 'Plan easing curves', 'Design interaction feedback']
  },
  {
    id: 'implementation',
    title: 'Build & Test',
    description: 'Implement with your existing system',
    actions: ['Build components', 'Integrate with useDesignSystem', 'Test across devices']
  },
  {
    id: 'optimization',
    title: 'Performance & Polish',
    description: 'Optimize and refine the implementation',
    actions: ['Performance testing', 'Accessibility audit', 'Cross-browser testing']
  }
];

// Main workflow component
const UXWorkflowSystem: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [analysisData, setAnalysisData] = useState<any>(null);

  // Mock design tokens (using your actual system structure)
  const designTokens = {
    colors: {
      primary: '#8B5CF6',
      secondary: '#6366F1',
      accent: '#4FC3F7',
      background: '#000000',
      surface: 'rgba(255, 255, 255, 0.1)',
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      xxl: '48px',
    },
    animation: {
      fast: '150ms',
      medium: '250ms',
      slow: '350ms',
      quantum: 'cubic-bezier(0.16, 1, 0.3, 1)',
    },
    depth: {
      level1: '0 4px 16px rgba(139, 92, 246, 0.2)',
      level2: '0 8px 24px rgba(139, 92, 246, 0.3)',
      backdrop: 'blur(20px) saturate(150%)',
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1C1C1E 50%, #2C2C2E 100%)',
      color: '#F5F5F7',
      fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      padding: designTokens.spacing.lg,
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          textAlign: 'center',
          marginBottom: designTokens.spacing.xxl,
        }}
      >
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #8B5CF6, #4FC3F7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: designTokens.spacing.sm,
        }}>
          UX/UI Pattern Workflow
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: 'rgba(245, 245, 247, 0.7)',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          Intelligent acceleration for complex UX patterns in your Quantum-Spatial Design System
        </p>
      </motion.div>

      {/* Pattern Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: designTokens.spacing.lg,
          marginBottom: designTokens.spacing.xxl,
        }}
      >
        {Object.values(UX_PATTERNS).map((pattern) => (
          <motion.div
            key={pattern.id}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedPattern(pattern.id)}
            style={{
              background: selectedPattern === pattern.id 
                ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(79, 195, 247, 0.2))'
                : 'rgba(255, 255, 255, 0.08)',
              border: `2px solid ${selectedPattern === pattern.id 
                ? designTokens.colors.primary 
                : 'rgba(255, 255, 255, 0.1)'}`,
              borderRadius: '16px',
              padding: designTokens.spacing.lg,
              cursor: 'pointer',
              backdropFilter: designTokens.depth.backdrop,
              transition: `all ${designTokens.animation.medium} ${designTokens.animation.quantum}`,
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: designTokens.spacing.md,
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                margin: 0,
              }}>
                {pattern.title}
              </h3>
              <span style={{
                background: pattern.complexity === 'High' 
                  ? 'rgba(255, 59, 48, 0.2)' 
                  : pattern.complexity === 'Medium'
                  ? 'rgba(255, 149, 0, 0.2)'
                  : 'rgba(52, 199, 89, 0.2)',
                color: pattern.complexity === 'High' 
                  ? '#FF3B30' 
                  : pattern.complexity === 'Medium'
                  ? '#FF9500'
                  : '#34C759',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '500',
              }}>
                {pattern.complexity}
              </span>
            </div>
            <p style={{
              color: 'rgba(245, 245, 247, 0.7)',
              fontSize: '0.9rem',
              lineHeight: '1.5',
              marginBottom: designTokens.spacing.md,
            }}>
              {pattern.description}
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: designTokens.spacing.xs,
            }}>
              {pattern.examples.slice(0, 2).map((example, index) => (
                <span
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(245, 245, 247, 0.8)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                  }}
                >
                  {example}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Workflow Steps */}
      {selectedPattern && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            padding: designTokens.spacing.xl,
            backdropFilter: designTokens.depth.backdrop,
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: designTokens.spacing.lg,
            textAlign: 'center',
          }}>
            Implementation Workflow: {UX_PATTERNS[selectedPattern as keyof typeof UX_PATTERNS]?.title}
          </h2>

          {/* Step Progress */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: designTokens.spacing.xl,
            overflowX: 'auto',
            gap: designTokens.spacing.md,
          }}>
            {WORKFLOW_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveStep(index)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  minWidth: '120px',
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: index <= activeStep 
                    ? 'linear-gradient(135deg, #8B5CF6, #4FC3F7)'
                    : 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  marginBottom: designTokens.spacing.sm,
                  transition: `all ${designTokens.animation.medium} ${designTokens.animation.quantum}`,
                }}>
                  {index + 1}
                </div>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  textAlign: 'center',
                  color: index <= activeStep 
                    ? '#F5F5F7' 
                    : 'rgba(245, 245, 247, 0.6)',
                }}>
                  {step.title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Active Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: designTokens.spacing.lg,
              }}
            >
              <StepContent 
                step={WORKFLOW_STEPS[activeStep]} 
                pattern={UX_PATTERNS[selectedPattern as keyof typeof UX_PATTERNS]}
                designTokens={designTokens}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: designTokens.spacing.lg,
          }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={activeStep === 0}
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              style={{
                background: activeStep === 0 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                color: activeStep === 0 
                  ? 'rgba(245, 245, 247, 0.5)' 
                  : '#F5F5F7',
                fontWeight: '500',
                cursor: activeStep === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              Previous
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={activeStep === WORKFLOW_STEPS.length - 1}
              onClick={() => setActiveStep(Math.min(WORKFLOW_STEPS.length - 1, activeStep + 1))}
              style={{
                background: activeStep === WORKFLOW_STEPS.length - 1
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'linear-gradient(135deg, #8B5CF6, #4FC3F7)',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                color: '#F5F5F7',
                fontWeight: '500',
                cursor: activeStep === WORKFLOW_STEPS.length - 1 ? 'not-allowed' : 'pointer',
              }}
            >
              {activeStep === WORKFLOW_STEPS.length - 1 ? 'Complete' : 'Next'}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Step content component
interface StepContentProps {
  step: any;
  pattern: any;
  designTokens: any;
}

const StepContent: React.FC<StepContentProps> = ({ step, pattern, designTokens }) => {
  return (
    <div>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: designTokens.spacing.md,
      }}>
        {step.title}
      </h3>
      
      <p style={{
        color: 'rgba(245, 245, 247, 0.8)',
        lineHeight: '1.6',
        marginBottom: designTokens.spacing.lg,
      }}>
        {step.description}
      </p>

      {/* Actions Checklist */}
      <div style={{
        marginBottom: designTokens.spacing.lg,
      }}>
        <h4 style={{
          fontSize: '1rem',
          fontWeight: '500',
          marginBottom: designTokens.spacing.md,
          color: 'rgba(245, 245, 247, 0.9)',
        }}>
          Action Items:
        </h4>
        
        {step.actions.map((action: string, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: designTokens.spacing.sm,
              marginBottom: designTokens.spacing.sm,
              padding: designTokens.spacing.sm,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
            }}
          >
            <div style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              border: '2px solid rgba(139, 92, 246, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: designTokens.colors.primary,
              }} />
            </div>
            <span style={{
              fontSize: '0.9rem',
              color: 'rgba(245, 245, 247, 0.8)',
            }}>
              {action}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Pattern-specific Implementation Details */}
      {pattern && (
        <div style={{
          background: 'rgba(139, 92, 246, 0.1)',
          borderRadius: '8px',
          padding: designTokens.spacing.md,
          border: '1px solid rgba(139, 92, 246, 0.2)',
        }}>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '500',
            marginBottom: designTokens.spacing.sm,
            color: designTokens.colors.primary,
          }}>
            Pattern Implementation:
          </h4>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: designTokens.spacing.sm,
            marginTop: designTokens.spacing.sm,
          }}>
            <div>
              <strong style={{ fontSize: '0.8rem', color: 'rgba(245, 245, 247, 0.9)' }}>
                Components:
              </strong>
              <div style={{ marginTop: '4px' }}>
                {pattern.implementation.components.map((comp: string, i: number) => (
                  <div key={i} style={{
                    fontSize: '0.75rem',
                    color: 'rgba(245, 245, 247, 0.7)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    display: 'inline-block',
                    margin: '2px',
                  }}>
                    {comp}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <strong style={{ fontSize: '0.8rem', color: 'rgba(245, 245, 247, 0.9)' }}>
                Animations:
              </strong>
              <div style={{ marginTop: '4px' }}>
                {pattern.implementation.animations.map((anim: string, i: number) => (
                  <div key={i} style={{
                    fontSize: '0.75rem',
                    color: 'rgba(245, 245, 247, 0.7)',
                    background: 'rgba(79, 195, 247, 0.2)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    display: 'inline-block',
                    margin: '2px',
                  }}>
                    {anim}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <strong style={{ fontSize: '0.8rem', color: 'rgba(245, 245, 247, 0.9)' }}>
                Design Tokens:
              </strong>
              <div style={{ marginTop: '4px' }}>
                {pattern.implementation.tokens.map((token: string, i: number) => (
                  <div key={i} style={{
                    fontSize: '0.75rem',
                    color: 'rgba(245, 245, 247, 0.7)',
                    background: 'rgba(52, 199, 89, 0.2)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    display: 'inline-block',
                    margin: '2px',
                  }}>
                    {token}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UXWorkflowSystem;