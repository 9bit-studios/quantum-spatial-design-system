import React, { useState, useEffect } from 'react';

// Embedded design tokens (copied from your UnifiedDesignSystem.tsx)
const unifiedDesignTokens = {
  typography: {
    largeTitle: { size: '34px', weight: '700', lineHeight: '41px', letterSpacing: '-0.5px' },
    title1: { size: '28px', weight: '600', lineHeight: '34px', letterSpacing: '-0.3px' },
    title2: { size: '22px', weight: '600', lineHeight: '28px', letterSpacing: '-0.2px' },
    title3: { size: '20px', weight: '600', lineHeight: '25px', letterSpacing: '-0.1px' },
    headline: { size: '17px', weight: '600', lineHeight: '22px', letterSpacing: '-0.05em' },
    body: { size: '17px', weight: '400', lineHeight: '22px', letterSpacing: '-0.022em' },
    callout: { size: '16px', weight: '400', lineHeight: '21px' },
    footnote: { size: '13px', weight: '400', lineHeight: '18px' },
    caption1: { size: '12px', weight: '400', lineHeight: '16px' },
    caption2: { size: '11px', weight: '400', lineHeight: '13px' },
  },
  colors: {
    primary: '#000000',
    secondary: '#1C1C1E',
    tertiary: '#2C2C2E',
    quaternary: '#3A3A3C',
    systemBlue: '#007AFF',
    systemGreen: '#34C759',
    systemOrange: '#FF9500',
    systemRed: '#FF3B30',
    systemPurple: '#AF52DE',
    label: '#FFFFFF',
    secondaryLabel: 'rgba(255, 255, 255, 0.6)',
    tertiaryLabel: 'rgba(255, 255, 255, 0.3)',
    quaternaryLabel: 'rgba(255, 255, 255, 0.18)',
    systemFill: 'rgba(120, 120, 128, 0.2)',
    secondarySystemFill: 'rgba(120, 120, 128, 0.16)',
    tertiarySystemFill: 'rgba(120, 120, 128, 0.12)',
    quaternarySystemFill: 'rgba(120, 120, 128, 0.08)',
    separator: 'rgba(84, 84, 88, 0.6)',
  },
  spacing: {
    micro: '2px',
    tiny: '4px',
    small: '8px',
    medium: '16px',
    large: '24px',
    xlarge: '32px',
    xxlarge: '48px',
    huge: '64px',
  },
  cornerRadius: {
    micro: '2px',
    small: '6px',
    medium: '10px',
    large: '14px',
    xlarge: '20px',
    xxlarge: '24px',
  },
  gradients: {
    gamingBackground: 'linear-gradient(135deg, #0A0D1C 0%, #1A2332 25%, #2A334A 50%, #1A2332 75%, #0A0D1C 100%)',
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
  },
  animation: {
    duration: { fast: '150ms', medium: '250ms', slow: '350ms' },
    easing: { standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }
  }
};

const designUtils = {
  getGlassCard: (variant = 'medium') => ({
    background: unifiedDesignTokens.gradients.glass,
    borderRadius: unifiedDesignTokens.cornerRadius.large,
    border: `0.5px solid ${unifiedDesignTokens.colors.separator}`,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
  })
};

// Design System Validation Tool
const DesignSystemValidator = () => {
  const [validationResults, setValidationResults] = useState([]);
  const [cssAnalysis, setCssAnalysis] = useState(null);
  const [componentCompliance, setComponentCompliance] = useState({});

  // Simulate CSS analysis (in real implementation, this would scan actual CSS)
  const analyzeCSSCompliance = () => {
    const analysis = {
      inlineStyles: 0,
      hardcodedValues: [
        'Found hardcoded #FF0000 in component',
        'Found hardcoded 12px margin',
        'Found hardcoded rgba(255,255,255,0.5)'
      ],
      missingTokens: [
        'Button using hardcoded border-radius instead of cornerRadius.medium',
        'Card using inline shadow instead of depth.shadows.medium'
      ],
      compliance: 85
    };

    setCssAnalysis(analysis);
  };

  // Token Coverage Analysis
  const validateTokenCoverage = () => {
    const coverage = {
      typography: {
        provided: Object.keys(unifiedDesignTokens.typography).length,
        recommended: 11,
        missing: []
      },
      colors: {
        provided: Object.keys(unifiedDesignTokens.colors).length,
        recommended: 25,
        missing: []
      },
      spacing: {
        provided: Object.keys(unifiedDesignTokens.spacing).length,
        recommended: 9,
        missing: []
      },
      components: {
        provided: 4, // navigation, card, button, input from your system
        recommended: 8,
        missing: ['modal', 'dropdown', 'tooltip', 'badge']
      }
    };

    return coverage;
  };

  const coverage = validateTokenCoverage();

  // Component compliance checker
  const checkComponentCompliance = (componentType) => {
    const rules = {
      button: {
        requiredTokens: ['cornerRadius', 'spacing', 'typography', 'colors'],
        commonIssues: ['Hardcoded padding', 'Missing hover states', 'Inconsistent border radius']
      },
      card: {
        requiredTokens: ['cornerRadius', 'depth.shadows', 'gradients', 'lineWeights'],
        commonIssues: ['Hardcoded shadows', 'Missing glassmorphic effect', 'Inconsistent borders']
      },
      navigation: {
        requiredTokens: ['navigation.height', 'navigation.background', 'depth.backdrop'],
        commonIssues: ['Hardcoded height', 'Missing backdrop filter', 'Inconsistent z-index']
      }
    };

    return rules[componentType] || { requiredTokens: [], commonIssues: [] };
  };

  useEffect(() => {
    analyzeCSSCompliance();
  }, []);

  return (
    <div style={{
      background: unifiedDesignTokens.gradients.gamingBackground,
      minHeight: '100vh',
      padding: unifiedDesignTokens.spacing.large,
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      color: unifiedDesignTokens.colors.label
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          ...designUtils.getGlassCard('prominent'),
          padding: unifiedDesignTokens.spacing.xlarge,
          marginBottom: unifiedDesignTokens.spacing.large
        }}>
          <h1 style={{
            fontSize: unifiedDesignTokens.typography.largeTitle.size,
            fontWeight: unifiedDesignTokens.typography.largeTitle.weight,
            lineHeight: unifiedDesignTokens.typography.largeTitle.lineHeight,
            letterSpacing: unifiedDesignTokens.typography.largeTitle.letterSpacing,
            margin: 0,
            marginBottom: unifiedDesignTokens.spacing.small
          }}>
            🤓 Design System Validation Dashboard
          </h1>
          <p style={{
            fontSize: unifiedDesignTokens.typography.body.size,
            fontWeight: unifiedDesignTokens.typography.body.weight,
            lineHeight: unifiedDesignTokens.typography.body.lineHeight,
            color: unifiedDesignTokens.colors.secondaryLabel,
            margin: 0
          }}>
            Ensure consistent implementation of your Unified Design System across all components
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: unifiedDesignTokens.spacing.large
        }}>
          
          {/* Token Coverage */}
          <div style={designUtils.getGlassCard('medium')}>
            <div style={{ padding: unifiedDesignTokens.spacing.large }}>
              <h2 style={{
                fontSize: unifiedDesignTokens.typography.title2.size,
                fontWeight: unifiedDesignTokens.typography.title2.weight,
                margin: 0,
                marginBottom: unifiedDesignTokens.spacing.medium
              }}>
                📊 Token Coverage Analysis
              </h2>
              
              {Object.entries(coverage).map(([category, data]) => (
                <div key={category} style={{ marginBottom: unifiedDesignTokens.spacing.medium }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: unifiedDesignTokens.spacing.tiny
                  }}>
                    <span style={{
                      fontSize: unifiedDesignTokens.typography.headline.size,
                      fontWeight: unifiedDesignTokens.typography.headline.weight,
                      textTransform: 'capitalize'
                    }}>
                      {category}
                    </span>
                    <span style={{
                      fontSize: unifiedDesignTokens.typography.callout.size,
                      color: data.provided >= data.recommended ? 
                        unifiedDesignTokens.colors.systemGreen : 
                        unifiedDesignTokens.colors.systemOrange
                    }}>
                      {data.provided}/{data.recommended}
                    </span>
                  </div>
                  
                  <div style={{
                    height: '6px',
                    background: unifiedDesignTokens.colors.quaternarySystemFill,
                    borderRadius: unifiedDesignTokens.cornerRadius.small,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${(data.provided / data.recommended) * 100}%`,
                      background: data.provided >= data.recommended ? 
                        unifiedDesignTokens.colors.systemGreen : 
                        unifiedDesignTokens.colors.systemOrange,
                      transition: `width ${unifiedDesignTokens.animation.duration.medium} ${unifiedDesignTokens.animation.easing.standard}`
                    }} />
                  </div>
                  
                  {data.missing && data.missing.length > 0 && (
                    <div style={{ marginTop: unifiedDesignTokens.spacing.tiny }}>
                      {data.missing.map((item, index) => (
                        <span key={index} style={{
                          fontSize: unifiedDesignTokens.typography.caption1.size,
                          color: unifiedDesignTokens.colors.tertiaryLabel,
                          display: 'inline-block',
                          marginRight: unifiedDesignTokens.spacing.small,
                          marginBottom: unifiedDesignTokens.spacing.micro
                        }}>
                          • {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CSS Compliance */}
          <div style={designUtils.getGlassCard('medium')}>
            <div style={{ padding: unifiedDesignTokens.spacing.large }}>
              <h2 style={{
                fontSize: unifiedDesignTokens.typography.title2.size,
                fontWeight: unifiedDesignTokens.typography.title2.weight,
                margin: 0,
                marginBottom: unifiedDesignTokens.spacing.medium
              }}>
                🔍 CSS Compliance Check
              </h2>
              
              {cssAnalysis && (
                <>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: unifiedDesignTokens.spacing.medium
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: `conic-gradient(${unifiedDesignTokens.colors.systemGreen} ${cssAnalysis.compliance * 3.6}deg, ${unifiedDesignTokens.colors.quaternarySystemFill} 0deg)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: unifiedDesignTokens.spacing.medium
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: unifiedDesignTokens.colors.secondary,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{
                          fontSize: unifiedDesignTokens.typography.title3.size,
                          fontWeight: '700'
                        }}>
                          {cssAnalysis.compliance}%
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p style={{
                        fontSize: unifiedDesignTokens.typography.headline.size,
                        fontWeight: unifiedDesignTokens.typography.headline.weight,
                        margin: 0,
                        marginBottom: unifiedDesignTokens.spacing.micro
                      }}>
                        Design System Compliance
                      </p>
                      <p style={{
                        fontSize: unifiedDesignTokens.typography.footnote.size,
                        color: unifiedDesignTokens.colors.secondaryLabel,
                        margin: 0
                      }}>
                        {cssAnalysis.compliance >= 90 ? 'Excellent' : 
                         cssAnalysis.compliance >= 75 ? 'Good' : 'Needs Improvement'}
                      </p>
                    </div>
                  </div>

                  <div style={{ marginBottom: unifiedDesignTokens.spacing.medium }}>
                    <h3 style={{
                      fontSize: unifiedDesignTokens.typography.headline.size,
                      fontWeight: unifiedDesignTokens.typography.headline.weight,
                      margin: 0,
                      marginBottom: unifiedDesignTokens.spacing.small,
                      color: unifiedDesignTokens.colors.systemRed
                    }}>
                      Issues Found:
                    </h3>
                    {cssAnalysis.hardcodedValues.map((issue, index) => (
                      <div key={index} style={{
                        fontSize: unifiedDesignTokens.typography.footnote.size,
                        color: unifiedDesignTokens.colors.tertiaryLabel,
                        marginBottom: unifiedDesignTokens.spacing.micro,
                        paddingLeft: unifiedDesignTokens.spacing.small
                      }}>
                        • {issue}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Component Guidelines */}
          <div style={designUtils.getGlassCard('medium')}>
            <div style={{ padding: unifiedDesignTokens.spacing.large }}>
              <h2 style={{
                fontSize: unifiedDesignTokens.typography.title2.size,
                fontWeight: unifiedDesignTokens.typography.title2.weight,
                margin: 0,
                marginBottom: unifiedDesignTokens.spacing.medium
              }}>
                🧩 Component Implementation Guide
              </h2>
              
              {['button', 'card', 'navigation'].map(componentType => {
                const compliance = checkComponentCompliance(componentType);
                return (
                  <div key={componentType} style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: unifiedDesignTokens.cornerRadius.medium,
                    border: `0.5px solid ${unifiedDesignTokens.colors.separator}`,
                    padding: unifiedDesignTokens.spacing.medium,
                    marginBottom: unifiedDesignTokens.spacing.small
                  }}>
                    <h3 style={{
                      fontSize: unifiedDesignTokens.typography.headline.size,
                      fontWeight: unifiedDesignTokens.typography.headline.weight,
                      margin: 0,
                      marginBottom: unifiedDesignTokens.spacing.small,
                      textTransform: 'capitalize'
                    }}>
                      {componentType}
                    </h3>
                    
                    <div style={{ marginBottom: unifiedDesignTokens.spacing.small }}>
                      <p style={{
                        fontSize: unifiedDesignTokens.typography.footnote.size,
                        color: unifiedDesignTokens.colors.secondaryLabel,
                        margin: 0,
                        marginBottom: unifiedDesignTokens.spacing.micro
                      }}>
                        Required tokens:
                      </p>
                      {compliance.requiredTokens.map((token, index) => (
                        <span key={index} style={{
                          fontSize: unifiedDesignTokens.typography.caption2.size,
                          background: unifiedDesignTokens.colors.systemFill,
                          padding: `${unifiedDesignTokens.spacing.micro} ${unifiedDesignTokens.spacing.tiny}`,
                          borderRadius: unifiedDesignTokens.cornerRadius.micro,
                          marginRight: unifiedDesignTokens.spacing.tiny,
                          display: 'inline-block',
                          marginBottom: unifiedDesignTokens.spacing.micro
                        }}>
                          {token}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Implementation Checklist */}
          <div style={designUtils.getGlassCard('medium')}>
            <div style={{ padding: unifiedDesignTokens.spacing.large }}>
              <h2 style={{
                fontSize: unifiedDesignTokens.typography.title2.size,
                fontWeight: unifiedDesignTokens.typography.title2.weight,
                margin: 0,
                marginBottom: unifiedDesignTokens.spacing.medium
              }}>
                ✅ Implementation Checklist
              </h2>
              
              {[
                { task: 'Import UnifiedDesignSystem.tsx', status: true, critical: true },
                { task: 'Use designUtils.getGlassCard()', status: true, critical: true },
                { task: 'Apply typography tokens', status: false, critical: true },
                { task: 'Use spacing tokens only', status: false, critical: true },
                { task: 'Implement color system', status: true, critical: false },
                { task: 'Add animation tokens', status: false, critical: false },
                { task: 'Validate mobile breakpoints', status: false, critical: true },
                { task: 'Test accessibility compliance', status: false, critical: true }
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: unifiedDesignTokens.spacing.small,
                  padding: unifiedDesignTokens.spacing.small,
                  background: item.status ? 
                    'rgba(52, 199, 89, 0.1)' : 
                    (item.critical ? 'rgba(255, 59, 48, 0.1)' : unifiedDesignTokens.colors.quaternarySystemFill),
                  borderRadius: unifiedDesignTokens.cornerRadius.small,
                  border: `0.5px solid ${
                    item.status ? 
                      unifiedDesignTokens.colors.systemGreen : 
                      (item.critical ? unifiedDesignTokens.colors.systemRed : unifiedDesignTokens.colors.separator)
                  }`
                }}>
                  <span style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: item.status ? unifiedDesignTokens.colors.systemGreen : 'transparent',
                    border: `2px solid ${item.status ? unifiedDesignTokens.colors.systemGreen : unifiedDesignTokens.colors.separator}`,
                    marginRight: unifiedDesignTokens.spacing.small,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px'
                  }}>
                    {item.status && '✓'}
                  </span>
                  
                  <span style={{
                    fontSize: unifiedDesignTokens.typography.callout.size,
                    flex: 1
                  }}>
                    {item.task}
                  </span>
                  
                  {item.critical && (
                    <span style={{
                      fontSize: unifiedDesignTokens.typography.caption2.size,
                      background: unifiedDesignTokens.colors.systemRed,
                      color: 'white',
                      padding: `${unifiedDesignTokens.spacing.micro} ${unifiedDesignTokens.spacing.tiny}`,
                      borderRadius: unifiedDesignTokens.cornerRadius.micro,
                      marginLeft: unifiedDesignTokens.spacing.small
                    }}>
                      Critical
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Code Example */}
        <div style={{
          ...designUtils.getGlassCard('prominent'),
          padding: unifiedDesignTokens.spacing.xlarge,
          marginTop: unifiedDesignTokens.spacing.large
        }}>
          <h2 style={{
            fontSize: unifiedDesignTokens.typography.title2.size,
            fontWeight: unifiedDesignTokens.typography.title2.weight,
            margin: 0,
            marginBottom: unifiedDesignTokens.spacing.medium
          }}>
            💻 Correct Implementation Example
          </h2>
          
          <div style={{
            background: unifiedDesignTokens.colors.primary,
            borderRadius: unifiedDesignTokens.cornerRadius.medium,
            padding: unifiedDesignTokens.spacing.medium,
            fontFamily: 'Monaco, Consolas, monospace',
            fontSize: '14px',
            lineHeight: '1.5',
            overflow: 'auto'
          }}>
            <pre style={{ margin: 0, color: unifiedDesignTokens.colors.label }}>
{`// ✅ CORRECT - Using design tokens
import { unifiedDesignTokens, designUtils } from './UnifiedDesignSystem';

const ProductCard = ({ product }) => (
  <div style={{
    ...designUtils.getGlassCard('medium'),
    padding: unifiedDesignTokens.spacing.large,
    borderRadius: unifiedDesignTokens.cornerRadius.large
  }}>
    <h3 style={unifiedDesignTokens.typography.title3}>
      {product.title}
    </h3>
    <button style={designUtils.getButton('primary')}>
      Add to Cart
    </button>
  </div>
);

// ❌ WRONG - Hardcoded values
const ProductCard = ({ product }) => (
  <div style={{
    background: 'rgba(255,255,255,0.1)',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
  }}>
    <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>
      {product.title}
    </h3>
    <button style={{
      background: '#007AFF',
      padding: '12px 24px',
      borderRadius: '8px'
    }}>
      Add to Cart
    </button>
  </div>
);`}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DesignSystemValidator;