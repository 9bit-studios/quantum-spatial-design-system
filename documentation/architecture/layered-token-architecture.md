# Layered Token Architecture Documentation

## Overview

The Quantum-Spatial Design System implements a sophisticated layered token architecture where each layer extends and enhances the previous layer, creating a unified yet flexible design system.

## Token Hierarchy

### 1. Foundation Layer: `unifiedDesignTokens`
**Location**: `components/UnifiedDesignSystem.tsx`
**Purpose**: Core design foundation that establishes base values

```typescript
export const unifiedDesignTokens = {
  colors: {
    // Base color system
    label: 'rgba(255, 255, 255, 1.0)',
    secondaryLabel: 'rgba(255, 255, 255, 0.6)',
    // ... more base colors
  },
  typography: {
    // Base typography scale
    largeTitle: { size: '34px', weight: '700', lineHeight: '41px' },
    // ... more typography
  },
  spacing: {
    // Base spacing scale
    tiny: '4px',
    small: '8px',
    medium: '16px',
    // ... more spacing
  },
  components: {
    // Component-specific tokens
    navigation: { height: '48px' },
    // ... more components
  }
}
```

### 2. Glassmorphic Layer: `liquidGlassTokens`
**Location**: `components/EcommerceSideMenu.tsx`
**Purpose**: Adds glassmorphic effects and Apple HIG compliance

```typescript
export const liquidGlassTokens = {
  colors: {
    // Extended Apple HIG colors
    systemBlue: '#007AFF',
    systemGreen: '#34C759',
    // ... more system colors
    
    // Glassmorphic fills
    systemFill: 'rgba(120, 120, 128, 0.2)',
    secondarySystemFill: 'rgba(120, 120, 128, 0.16)',
    // ... more fills
  },
  effects: {
    // Glassmorphic-specific effects
    blur: '20px',
    backgroundBlur: '40px',
    thinMaterialBlur: '8px',
    thickMaterialBlur: '30px',
  },
  animation: {
    // Animation specifications
    duration: { short: '0.2s', medium: '0.35s', long: '0.5s' },
    easing: {
      standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      // ... more easing
    }
  }
}
```

### 3. Domain-Specific Layer: `ecommerceDesignTokens`
**Location**: `components/EcommerceDashboard.tsx`
**Purpose**: Extends both layers with ecommerce-specific tokens

```typescript
const ecommerceDesignTokens = {
  ...unifiedDesignTokens,
  ...liquidGlassTokens,
  
  // Ecommerce-specific extensions
  ecommerce: {
    success: '#34C759',     // Order completed
    warning: '#FF9500',     // Pending
    error: '#FF3B30',       // Failed
    info: '#007AFF',        // Information
    
    // Revenue colors
    revenue: '#30D158',
    expense: '#FF453A',
    profit: '#64D2FF',
    
    // Inventory states
    inStock: '#32D74B',
    lowStock: '#FF9F0A',
    outOfStock: '#FF453A',
    discontinued: '#8E8E93',
  }
}
```

## Token Extension Pattern

Each layer follows a consistent extension pattern:

1. **Import Previous Layer(s)**
   ```typescript
   import { unifiedDesignTokens } from './UnifiedDesignSystem';
   import { liquidGlassTokens } from './EcommerceSideMenu';
   ```

2. **Spread Previous Tokens**
   ```typescript
   const newTokens = {
     ...previousTokens,
     // New additions
   }
   ```

3. **Add Domain-Specific Values**
   ```typescript
   domainSpecific: {
     // New tokens for this domain
   }
   ```

## Usage Guidelines

### 1. Component Development
- Always start with `unifiedDesignTokens` for base styling
- Add `liquidGlassTokens` for glassmorphic effects
- Use `ecommerceDesignTokens` for commerce-specific components

### 2. Token Selection Priority
1. Check if token exists in domain-specific layer
2. Fall back to glassmorphic layer
3. Fall back to foundation layer
4. Never hardcode values

### 3. Creating New Layers
When creating a new domain layer:
```typescript
import { unifiedDesignTokens, designUtils } from './UnifiedDesignSystem';
import { liquidGlassTokens } from './EcommerceSideMenu';

export const newDomainTokens = {
  ...unifiedDesignTokens,
  ...liquidGlassTokens,
  
  newDomain: {
    // Domain-specific tokens
  }
};
```

## Validation Requirements

The validation system must check:

1. **Foundation Integrity**
   - `unifiedDesignTokens` exists and exports correctly
   - All base categories present (colors, typography, spacing, components)

2. **Layer Consistency**
   - `liquidGlassTokens` properly extends foundation
   - `ecommerceDesignTokens` includes both previous layers

3. **Import Chain**
   - Each layer imports from correct sources
   - No circular dependencies
   - Proper export statements

4. **Token Uniqueness**
   - Domain-specific tokens don't override critical base tokens
   - New tokens follow naming conventions

## Integration with Providers

The token layers integrate with the provider system:

1. **DesignSystemProvider** uses `unifiedDesignTokens` for CSS variables
2. **Components** can import any layer based on needs
3. **Providers** ensure tokens are available throughout the app

## Best Practices

1. **Don't Skip Layers** - Always include all previous layers
2. **Namespace New Tokens** - Use domain-specific namespaces
3. **Document Extensions** - Comment why tokens are added
4. **Maintain Type Safety** - Use TypeScript interfaces
5. **Test Token Access** - Ensure tokens resolve correctly

## Token Flow Diagram

```
UnifiedDesignSystem.tsx
    ↓ exports unifiedDesignTokens
EcommerceSideMenu.tsx
    ↓ imports unifiedDesignTokens
    ↓ exports liquidGlassTokens
EcommerceDashboard.tsx
    ↓ imports unifiedDesignTokens
    ↓ imports liquidGlassTokens
    ↓ creates ecommerceDesignTokens
Components
    ↓ import appropriate layer
    ↓ use tokens for styling
```

## Validation Checklist

- [ ] `unifiedDesignTokens` exported from UnifiedDesignSystem.tsx
- [ ] `liquidGlassTokens` exported from EcommerceSideMenu.tsx
- [ ] `ecommerceDesignTokens` created in EcommerceDashboard.tsx
- [ ] Each layer properly spreads previous layers
- [ ] No hardcoded values in components
- [ ] Proper TypeScript types for all tokens
- [ ] CSS variables applied by DesignSystemProvider
- [ ] Components can access all token layers

This architecture ensures consistency while allowing domain-specific customization.