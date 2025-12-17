/**
 * Quantum Spatial Design Tokens
 * Generated from RunSmart Design System
 * Auto-generated: 2025-12-16T03:45:31.672Z
 *
 * @module quantumSpatialTokens
 */

export interface QuantumSpatialTokens {
  colors: {
    brand: {
      primary: string;
      secondary: string;
      accent: string;
      accentSecondary: string;
    };
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    base: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    fontWeight: {
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  effects: {
    shadows: Record<string, string>;
    blur: Record<string, string>;
  };
}

export const quantumSpatialTokens: QuantumSpatialTokens = {
  colors: {
    brand: {
      primary: '#7B00FF',
      secondary: '#9747FF',
      accent: '#CDFF00',
      accentSecondary: '#A0CC00'
    },
    background: {
      primary: '#0A0014',
      secondary: '#1A0A2E',
      tertiary: '#2A1A3E'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B8B8D0',
      tertiary: '#8888A0'
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    base: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px'
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif',
    fontSize: {
      xs: '12px',
      sm: '13px',
      base: '14px',
      lg: '16px',
      xl: '20px',
      xxl: '24px'
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  effects: {
    shadows: {
      shadow-sm: "0 2px 8px rgba(0, 0, 0, 0.1)",
      shadow-md: "0 4px 16px rgba(0, 0, 0, 0.2)",
      shadow-lg: "0 8px 24px rgba(0, 0, 0, 0.3)",
      shadow-xl: "0 12px 32px rgba(0, 0, 0, 0.4)"
},
    blur: {}
  }
};
