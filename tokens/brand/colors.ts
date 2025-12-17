/**
 * Color Tokens
 * Generated from RunSmart Design System
 * Auto-generated: 2025-12-16T03:45:31.673Z
 *
 * @module colors
 */

export const colors = {
  // Brand Colors - RunSmart Purple & Lime
  purple: {
    primary: '#7B00FF',
    secondary: '#9747FF',
    50: '#F5E6FF',
    100: '#E6CCFF',
    200: '#CC99FF',
    300: '#B366FF',
    400: '#9933FF',
    500: '#7B00FF',
    600: '#6200CC',
    700: '#4A0099',
    800: '#310066',
    900: '#190033'
  },
  lime: {
    primary: '#CDFF00',
    secondary: '#A0CC00',
    50: '#F9FFCC',
    100: '#F4FF99',
    200: '#EEFF66',
    300: '#E9FF33',
    400: '#CDFF00',
    500: '#A0CC00',
    600: '#809900',
    700: '#607300',
    800: '#404D00',
    900: '#202600'
  },
  // Background Colors
  background: {
    primary: '#0A0014',
    secondary: '#1A0A2E',
    tertiary: '#2A1A3E'
  },
  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#B8B8D0',
    tertiary: '#8888A0',
    inverse: '#0A0014'
  }
} as const;

export type ColorToken = keyof typeof colors;
