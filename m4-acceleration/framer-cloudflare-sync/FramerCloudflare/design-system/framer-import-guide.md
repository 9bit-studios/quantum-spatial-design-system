# Quantum-Spatial Design System: Framer Import Guide

This guide provides step-by-step instructions for importing the Quantum-Spatial Design System components into your Framer project.

## Step 1: Import Design Tokens

1. In Framer, go to the **Code** panel
2. Click **+ New** → **File**
3. Name it `quantum-tokens.js`
4. Copy the contents from `quantum-tokens.js` in this directory
5. Click **Create**

The tokens file exports several helpful variables:
- `quantumTokens`: The complete token set
- `palette`: Color palette
- `typography`: Typography styles
- `spacing`: Spacing values
- `radius`: Border radius values
- `shadows`: Shadow values

## Step 2: Import Core Components

For each component, follow these steps:

1. In Framer, go to the **Code** panel
2. Click **+ New** → **Component**
3. Name it matching the original file name (e.g., `DesignSystemProvider`)
4. Copy the contents from the corresponding file in the `components` directory
5. Click **Create**

Required components:
- `DesignSystemProvider.tsx`
- `QuantumPixel.tsx` 
- `DimensionalGrid.tsx`
- `PixelViewer.tsx`

Additional UI components:
- `Button.tsx`: Quantum-styled button with animation
- `Card.tsx`: Card component with quantum styling
- `Input.tsx`: Form input component

## Step 3: Import the Demo Component

1. In Framer, go to the **Code** panel
2. Click **+ New** → **Component**
3. Name it `QuantumDesignSystemDemo`
4. Copy the contents from `QuantumDesignSystemDemo.jsx` in this directory
5. Click **Create**

## Step 4: Add Components to Canvas

1. Go to the Framer canvas
2. From the **Components** panel, drag `QuantumDesignSystemDemo` onto the canvas
3. Adjust the properties in the right sidebar as needed

## Step 5: Create Your Own Components

To create your own components using the design system:

```jsx
import * as React from "react";
import { Frame } from "framer";
import { DesignSystemProvider } from "./DesignSystemProvider";
import { QuantumPixel } from "./QuantumPixel";
import { palette, typography, spacing, radius } from "./quantum-tokens";

export default function MyComponent(props) {
  return (
    <DesignSystemProvider initialState="quantum" detectDevice={true}>
      <Frame
        background={palette.surface}
        radius={radius.medium}
        padding={spacing.md}
        style={{
          fontFamily: typography.body.fontFamily,
          color: palette.text,
        }}
      >
        <h1 style={typography.h1}>My Component</h1>
        <p style={typography.body}>
          Using the Quantum-Spatial Design System
        </p>
        <QuantumPixel state="quantum" size={48} interactive={true} />
      </Frame>
    </DesignSystemProvider>
  );
}
```

## Step 6: Create Design Variables (Optional)

For easier access to design tokens:

1. Go to the **Design** panel
2. Click **Variables**
3. Create new color variables for each color in the palette
4. Create new text style variables for each typography style

## Using the Design System States

The design system includes four states:

- **Heritage**: Flat orthogonal design (2D)
- **Transitional**: Emerging dimensional design (2.5D)
- **Quantum**: Fully dimensional spatial design (3D)
- **Superposition**: M4-optimized quantum state (3D+)

To change the state:

```jsx
<DesignSystemProvider initialState="quantum" detectDevice={true}>
  {/* Your components */}
</DesignSystemProvider>
```

Setting `detectDevice` to `true` enables automatic state selection based on device capabilities (recommended for M4 optimization).

## Troubleshooting

If components fail to render properly:

1. Check that all dependencies are properly imported
2. Verify that components are imported in the correct order (DesignSystemProvider must be imported first)
3. Ensure the quantum-tokens.js file is correctly loaded
4. Check browser console for any errors