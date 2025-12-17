/**
 * RunSmart Theme Configuration
 * Generated from RunSmart Design System
 * Auto-generated: 2025-12-16T03:45:31.673Z
 *
 * @module runsmartTheme
 */

import { quantumSpatialTokens } from '../brand/quantumSpatialTokens.js';

export interface ThemeConfig {
  name: string;
  colors: typeof quantumSpatialTokens.colors;
  spacing: typeof quantumSpatialTokens.spacing;
  typography: typeof quantumSpatialTokens.typography;
  effects: typeof quantumSpatialTokens.effects;
}

export const runsmartTheme: ThemeConfig = {
  name: 'RunSmart',
  colors: quantumSpatialTokens.colors,
  spacing: quantumSpatialTokens.spacing,
  typography: quantumSpatialTokens.typography,
  effects: quantumSpatialTokens.effects
};

export default runsmartTheme;
