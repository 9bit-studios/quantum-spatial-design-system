# QuantumSpatial Auto-Deployer Guide

This guide explains how to use the Quantum-Spatial Auto-Deployer to integrate your design system directly into Framer without any manual imports or package installations.

## Overview

The Quantum-Spatial Auto-Deployer provides a seamless way to inject your design system into Framer projects using the Web Page component. This approach eliminates the need for manual imports, package installations, or code writing.

## How It Works

1. The Cloudflare Worker serves a fully functional, HTML-based implementation of your design system
2. In Framer, you add a Web Page component and point it to the auto-deployer URL
3. The design system automatically loads and renders in your Framer project
4. All components, layouts, and styles are immediately available for use

## Step-by-Step Instructions

### Step 1: Add Web Page Component to Framer

1. Open your Framer project
2. In the **Assets panel** (left sidebar), search for "Web Page" 
3. Drag the **Web Page** component onto your canvas

### Step 2: Configure the Web Page

1. Select the Web Page component on your canvas
2. In the **Properties panel** (right sidebar), find the **URL** field
3. Enter your Cloudflare Worker auto-deployer URL:
   ```
   https://quantum-spatial-design-system.rnrb2ynd5z.workers.dev/auto-deployer
   ```

### Step 3: Design System Now Available

The design system will immediately load in the Web Page component, including:
- All components with proper styling
- Layouts with M4 optimizations
- Design tokens applying the correct visual appearance

### Alternative Method - Using Embed Component

If you prefer more control over the integration:

1. Search for "Embed" in the Assets panel
2. Drag the **Embed** component to your canvas
3. In Properties, paste the following HTML code directly into the **Code** field:
   ```html
   <iframe 
     src="https://quantum-spatial-design-system.rnrb2ynd5z.workers.dev/auto-deployer?auto-deploy=true" 
     style="width:100%;height:100%;border:none;"
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
   ></iframe>
   ```

## Design States

The auto-deployer allows you to switch between different design states:

1. **Heritage**: Flat, traditional UI with minimal effects
2. **Quantum**: Spatial UI with dimensional effects (default)
3. **Superposition**: Advanced spatial UI with M4-specific optimizations

Click on the state buttons in the auto-deployer to switch between states and see the design system update in real-time.

## M4 Optimization

The auto-deployer automatically detects Apple Silicon M4 devices and enables additional optimizations:

- Enhanced visual effects and animations
- Improved performance through Metal API usage
- Advanced styling for components
- Automatically switches to Superposition state

## Available Components

The following components are automatically available in the design system:

- **QuantumSpatialProvider**: Core provider component
- **Button**: Multi-variant button with M4 optimizations
- **Card**: Versatile container with elevation variants
- **DashboardLayout**: Application dashboard layout
- **GridLayout**: Flexible grid layout system
- **HeroLayout**: Hero section for landing pages
- **Input**: Form input component
- **DimensionalGrid**: Grid component with volumetric effects
- **QuantumPixel**: Foundational pixel component

## Troubleshooting

### Web Page Not Loading

If the Web Page component shows a blank screen:

1. Check that your Cloudflare Worker is properly deployed
2. Ensure the URL is correctly entered: `https://quantum-spatial-design-system.rnrb2ynd5z.workers.dev/auto-deployer`
3. Try refreshing the Framer preview

### Components Not Styled Correctly

If components appear but aren't styled correctly:

1. Check that the design system has loaded completely
2. Try switching design states to trigger a refresh
3. Ensure your browser supports modern CSS features

### Performance Issues

If you experience performance issues:

1. For non-M4 devices, use the "Heritage" or "Quantum" states instead of "Superposition"
2. Reduce the number of components on a single page
3. Use the Framer optimization features to improve performance

## Advanced Usage

### Customizing the Auto-Deployer

You can customize the auto-deployer by adding URL parameters:

- `?state=heritage`: Start with a specific design state
- `?auto-deploy=true`: Automatically deploy the design system on load
- `?m4=true`: Force M4 optimizations even on non-M4 devices

Example:
```
https://quantum-spatial-design-system.rnrb2ynd5z.workers.dev/auto-deployer?state=superposition&auto-deploy=true
```

### Integration with Code Components

If you need to combine the auto-deployer with custom code:

1. Use the auto-deployer for visual components and design tokens
2. Create code components that match the design system's aesthetic
3. Use CSS variables matching the design system's naming convention

---

**© 2025 9Bit Studios. All rights reserved.**
