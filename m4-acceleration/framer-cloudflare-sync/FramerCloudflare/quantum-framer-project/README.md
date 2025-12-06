# Quantum-Spatial Framer Project

## Complete Auto-Generated Project Structure

This project includes:
- ✅ **Design Tokens** (quantum-tokens.js)
- ✅ **Layout Components** (Dashboard, Hero, Grid)
- ✅ **UI Components** (Button, Card, Input)
- ✅ **Demo Page** (QuantumDesignSystemDemo.tsx)
- ✅ **Automation Tools** (quantum-automation.js)

## Quick Setup in Framer

1. **Drag all .tsx files** into your Framer project
2. **Install dependencies** in Framer Package Manager:
   - framer-motion@^10.0.0
3. **Add QuantumDesignSystemDemo** to your canvas

## Available Layouts

- **DashboardLayout** - Sidebar + main content area
- **HeroLayout** - Full-screen hero with animations  
- **GridLayout** - Responsive grid with items

## Available Components

- **QuantumButton** - Animated buttons (primary, secondary, ghost)
- **QuantumCard** - Interactive cards (default, highlight, minimal)

## Automation Features

Use the quantum-automation.js helper:

```jsx
import { generateLayout, createComponent } from './quantum-automation';

// Auto-generate layouts
const layout = generateLayout('dashboard', { title: 'My App' });

// Auto-create components
const button = createComponent('button', { text: 'Click me', variant: 'primary' });
```

## Next Steps

1. Customize layouts in the property panels
2. Create your own components using the design tokens
3. Build complete pages by combining layouts and components
