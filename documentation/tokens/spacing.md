/**
 * DESIGN TOKEN SYSTEM
 * Generated from learned patterns
 * Apple HIG Compliant
 */

export interface DesignTokens {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: Record<string, any>;
  effects: Record<string, string>;
}

export const tokens: DesignTokens = {
  colors: {
    // Apple System Colors
    systemBlue: '#007AFF',
    systemGreen: '#34C759',
    systemRed: '#FF3B30',

    // Brand Colors
    voidBlack: '#010005',
    quantumViolet: '#6A3093',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },

  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
    heading: { size: '24px', weight: '600', lineHeight: '1.2' },
    body: { size: '16px', weight: '400', lineHeight: '1.5' }
  },

  effects: {
    blur: 'blur(8px)',
    shadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
    glass: 'backdrop-filter: blur(10px) saturate(150%)'
  }
};

export default tokens;
