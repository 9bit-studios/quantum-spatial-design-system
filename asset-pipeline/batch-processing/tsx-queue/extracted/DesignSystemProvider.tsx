/**
 * Design System Provider & Hook
 * Extracted from DesignSystemDemo.tsx
 * 
 * Provides a unified design system context that can be used
 * throughout the application for consistent styling.
 */

import React, { createContext, useContext } from 'react';
import { coreTokens, computedStyles, designUtils } from './coreDesignTokens';

// Define types
interface DesignSystemContextType {
  tokens: typeof coreTokens & Record<string, any>;
  styles: typeof computedStyles;
  utils: typeof designUtils;
}

// 3. DESIGN SYSTEM CONTEXT
const DesignSystemContext = createContext<DesignSystemContextType | null>(null);

// 4. DESIGN SYSTEM PROVIDER
export const DesignSystemProvider: React.FC<{
  children: React.ReactNode;
  customTokens?: Partial<typeof coreTokens>;
}> = ({ children, customTokens = {} }) => {
  // Merge custom tokens with core tokens
  const tokens = {
    ...coreTokens,
    ...customTokens,
    colors: { ...coreTokens.colors, ...customTokens.colors },
  };

  const designSystem: DesignSystemContextType = {
    tokens,
    styles: computedStyles,
    utils: designUtils,
  };

  return (
    <DesignSystemContext.Provider value={designSystem}>
      {children}
    </DesignSystemContext.Provider>
  );
};

// 5. DESIGN SYSTEM HOOK
export const useDesignSystem = () => {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within DesignSystemProvider');
  }
  return context;
};

// Export type for external use
export type { DesignSystemContextType };