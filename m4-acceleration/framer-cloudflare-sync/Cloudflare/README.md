# Quantum-Spatial Design System: Cloudflare Integration

## Overview

This package provides complete integration between Framer and the Quantum-Spatial Design System via Cloudflare Worker. It features:

- Live design token fetching from the Cloudflare Worker API
- Device capability detection for M4 optimization
- Ready-to-use layout components with Cloudflare integration
- Demo component showcasing the integration

## Quick Setup in Framer

1. **Import files to your Framer project**
   - Copy all files from the `code` directory to your Framer project

2. **Install dependencies in Framer Package Manager**
   - framer-motion@^10.0.0

3. **Add CloudflareDemo component to your canvas**

## Components

### CloudflareProvider

The CloudflareProvider connects to the Cloudflare Worker to fetch design tokens:

```jsx
<CloudflareProvider
  initialState="quantum"  // heritage, transitional, quantum, superposition, auto
  detectDevice={true}     // Automatically detect device capabilities
>
  {children}
</CloudflareProvider>
```

### Layout Components

Three layout components ready to use with Cloudflare integration:

- **DashboardLayout**: Admin dashboard with sidebar
- **HeroLayout**: Full-screen hero section
- **GridLayout**: Responsive grid for collections

### Token Files

Pre-generated token files for offline use:

- `heritage-tokens.js`
- `transitional-tokens.js`
- `quantum-tokens.js`
- `superposition-tokens.js`

## Using Cloudflare Integration

### Accessing Design Tokens

```jsx
import { useCloudflareDesignSystem } from "./CloudflareProvider";

function MyComponent() {
  const { tokens, state, setState } = useCloudflareDesignSystem();
  
  return (
    <div>
      <h1 style={{ color: tokens.colors.primary }}>
        My Heading
      </h1>
      <button onClick={() => setState("quantum")}>
        Switch to Quantum
      </button>
    </div>
  );
}
```

### CSS Variables

The provider automatically sets CSS variables that you can use:

```jsx
<div style={{ 
  color: "var(--color-text)",
  background: "var(--color-background)",
  padding: "var(--spacing-md)"
}}>
  Content
</div>
```

## Troubleshooting

If the Cloudflare Worker is unreachable, the system will automatically fall back to local token files.

## Cloudflare Worker Endpoints

- Design Tokens: `https://design-system-staging.9bitstudios.io/design-system/tokens?state=[state]`
- M4 Optimization: `https://design-system-staging.9bitstudios.io/m4-optimization`
- Components: `https://design-system-staging.9bitstudios.io/framer-components`
