---
name: svg-generation
description: Generate quantum-spatial and heritage-themed SVG components with brand consistency and technical optimization. Creates animated and static SVGs for Notion, web, and Vision Pro interfaces with M4-accelerated processing.
---

# SVG Generation Skill

## Purpose

Generate sophisticated, brand-aligned SVG components in Quantum Spatial and Heritage themes with optimal performance and aesthetic excellence. Integrates with Cloudinary for automatic deployment and Notion for gallery management.

## When to Use This Skill

- Creating Notion dashboard visual elements
- Generating workflow visualization graphics
- Building Vision Pro spatial UI components
- Designing animated brand elements
- Producing icon sets, dividers, and backgrounds
- Batch generating component libraries

## Core Capabilities

### 1. Quantum Spatial Theme

**Visual Language**:
- **Grid Systems**: Hexagonal, triangular, dimensional grids with perfect mathematical precision
- **Glassmorphism**: 10-20px blur, 0.6-0.8 opacity, subtle depth layering
- **Particle Effects**: Flow patterns, quantum states, dimensional shifts
- **Colors**: 
  - Deep Space Indigo (#0A0E27)
  - Subtle Cyan (#00D9FF)
  - Quantum Purple (#8B5CF6)
  - Cosmic Magenta (#E85D75)
  - Glassmorphic White (rgba(255, 255, 255, 0.1))

**Animation Styles**:
- `pulse-wave-3s`: Gentle pulsing at 3-second intervals
- `quantum-breathe-4s`: Organic breathing effect
- `flow-particles-2s`: Directional particle movement
- `dimensional-shift-8s`: Subtle spatial transformation
- `grid-activate-1s`: Grid cells lighting up sequentially

### 2. Heritage Theme

**Visual Language**:
- **Classic Geometry**: Clean lines, timeless proportions
- **Intentional Imperfection**: "One pixel off" philosophy for human touch
- **Subtle Movement**: Gentle shifts, soft transitions
- **Colors**:
  - Rich Heritage Navy (#1A237E)
  - Classic Cream (#F5F5DC)
  - Subtle Gold accent (#FFD700)
  - Charcoal (#2C2C2C)

**Animation Styles**:
- `heritage-shift-8s`: One element subtly out of place
- `classic-fade-2s`: Elegant opacity transitions
- `timeless-rotate-6s`: Very slow rotation

### 3. Technical Optimization

**Performance Targets**:
- File size: <5KB per SVG (minified)
- Animation: 60fps smooth
- Load time: <100ms
- Scalability: Crisp at all sizes (16px to 2048px)

**Compatibility**:
- ✅ Notion inline SVG
- ✅ Cloudinary CDN hosting
- ✅ Vision Pro spatial depth
- ✅ Dark/Light mode adaptive
- ✅ Web (all browsers)
- ✅ iOS/macOS native

## Component Categories

### Category 1: Dashboard Backgrounds

**Animated Grid Background** (Quantum Spatial):
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
  <defs>
    <linearGradient id="quantumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0A0E27;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1A237E;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0A0E27;stop-opacity:1" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <rect width="1000" height="1000" fill="url(#quantumGrad)"/>
  
  <!-- Hexagonal grid pattern -->
  <g id="hexGrid" opacity="0.3" filter="url(#glow)">
    <!-- Generate hexagons programmatically -->
    <animate attributeName="opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite"/>
  </g>
</svg>
```

**Use Cases**:
- Notion page headers
- Dashboard section backgrounds
- Full-screen experience backgrounds

### Category 2: Status Indicators

**Quantum State Indicator**:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" fill="none" stroke="#00D9FF" stroke-width="2" opacity="0.3"/>
  <circle cx="12" cy="12" r="6" fill="#8B5CF6" opacity="0.6">
    <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="12" cy="12" r="3" fill="#00D9FF">
    <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
  </circle>
</svg>
```

**Variations**:
- Active state (pulsing cyan)
- Processing state (rotating purple)
- Complete state (solid cyan)
- Error state (pulsing red)

### Category 3: Dividers & Separators

**Quantum Flow Divider**:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 4" preserveAspectRatio="none">
  <line x1="0" y1="2" x2="800" y2="2" stroke="url(#flowGrad)" stroke-width="2" opacity="0.5"/>
  <defs>
    <linearGradient id="flowGrad">
      <stop offset="0%" stop-color="#00D9FF" stop-opacity="0"/>
      <stop offset="50%" stop-color="#8B5CF6" stop-opacity="1"/>
      <stop offset="100%" stop-color="#00D9FF" stop-opacity="0"/>
      <animate attributeName="x1" values="-800;0" dur="3s" repeatCount="indefinite"/>
    </linearGradient>
  </defs>
</svg>
```

### Category 4: Icons & Emblems

**Hexecute Game Icon**:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <!-- Hexagonal frame -->
  <polygon points="32,4 56,18 56,46 32,60 8,46 8,18" 
           fill="none" stroke="#00D9FF" stroke-width="2"/>
  
  <!-- Inner hexagonal ship -->
  <polygon points="32,20 42,26 42,38 32,44 22,38 22,26" 
           fill="#8B5CF6" opacity="0.6"/>
  
  <!-- Glow effect -->
  <circle cx="32" cy="32" r="24" fill="none" stroke="#00D9FF" 
          stroke-width="1" opacity="0.2">
    <animate attributeName="r" values="24;28;24" dur="2s" repeatCount="indefinite"/>
  </circle>
</svg>
```

### Category 5: Oksana Avatar States

**Creative Intelligence Orb** (Multiple States):

**State 1: Thinking**
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="url(#thinkingGrad)" opacity="0.8"/>
  <defs>
    <radialGradient id="thinkingGrad">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#00D9FF"/>
      <animateTransform attributeName="gradientTransform" type="rotate" 
                        from="0 50 50" to="360 50 50" dur="4s" repeatCount="indefinite"/>
    </radialGradient>
  </defs>
  
  <!-- Orbiting particles -->
  <circle cx="50" cy="20" r="3" fill="#00D9FF">
    <animateTransform attributeName="transform" type="rotate" 
                      from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite"/>
  </circle>
</svg>
```

**State 2: Generating** (faster pulse)
**State 3: Complete** (stable glow)

## Generation Workflow

### Step 1: Define Component Requirements

```typescript
interface SVGComponentSpec {
  name: string;
  theme: 'quantum-spatial' | 'heritage';
  type: 'background' | 'icon' | 'divider' | 'indicator' | 'avatar';
  animated: boolean;
  animationDuration?: string;
  colors: string[];
  sizes: number[]; // [16, 24, 32, 48, 64, 128, 256, 512]
  useCase: string;
  notionCompatible: boolean;
  visionProDepth?: boolean;
}
```

### Step 2: Generate Base SVG

Use Claude Agent to generate optimized SVG:

**Prompt Template**:
```markdown
Generate an SVG component with these specifications:

**Theme**: [Quantum Spatial / Heritage]
**Type**: [background / icon / divider / indicator]
**Animation**: [pulse-wave-3s / quantum-breathe-4s / none]

**Design Requirements**:
- ViewBox: 0 0 [width] [height]
- Colors: [list specific hex codes]
- Style: [glassmorphism / geometric / organic]
- Performance: <5KB minified, 60fps animation

**Brand Alignment**:
- Sophisticated, not busy
- Minimal but impactful
- Works in light/dark mode
- Notion-compatible

**Output**: Optimized SVG code only, no markdown wrapper.
```

### Step 3: Optimize & Validate

```typescript
async function optimizeSVG(svgCode: string): Promise<string> {
  // 1. Minify (remove whitespace, comments)
  // 2. Simplify paths (reduce precision)
  // 3. Merge similar elements
  // 4. Validate animations (60fps check)
  // 5. Test cross-browser compatibility
  
  return optimizedSVG;
}
```

### Step 4: Deploy to Cloudinary

```typescript
async function deployToCloudinary(svg: string, metadata: SVGComponentSpec) {
  const cloudinary = new CloudinaryAPI({
    folder: 'quantum-spatial-components',
    tags: [metadata.theme, metadata.type],
    context: {
      name: metadata.name,
      useCase: metadata.useCase
    }
  });
  
  const result = await cloudinary.upload(svg);
  return result.secure_url;
}
```

### Step 5: Update Notion Gallery

```typescript
async function addToNotionGallery(cloudinaryUrl: string, metadata: SVGComponentSpec) {
  const notion = new NotionAPI();
  
  await notion.pages.create({
    parent: { database_id: 'svg-components-gallery' },
    properties: {
      Name: { title: [{ text: { content: metadata.name }}]},
      Theme: { select: { name: metadata.theme }},
      Type: { select: { name: metadata.type }},
      Preview: { files: [{ external: { url: cloudinaryUrl }}]},
      Animated: { checkbox: metadata.animated },
      'Use Case': { rich_text: [{ text: { content: metadata.useCase }}]}
    }
  });
}
```

## Component Library Structure

### Quantum Spatial Set (30 components)

**Animated** (15):
- 3 Background grids (subtle, medium, intense)
- 3 Oksana avatar states (thinking, generating, complete)
- 3 Flow dividers (horizontal, vertical, circular)
- 3 Status indicators (active, processing, complete)
- 3 Particle systems (cosmic, dimensional, quantum)

**Static** (15):
- 5 Hexagonal icons (various sizes)
- 5 Grid patterns (different densities)
- 5 Geometric emblems (brand marks)

### Heritage Set (15 components)

**Animated** (5):
- 2 "One pixel off" variations
- 2 Classic fades
- 1 Timeless rotation

**Static** (10):
- 5 Classic dividers
- 5 Heritage emblems

## Quality Checklist

Before deploying any SVG component:

- [ ] **File size**: <5KB (check with `ls -lh`)
- [ ] **Animation smooth**: 60fps (test in browser)
- [ ] **Colors accurate**: Match brand palette exactly
- [ ] **Scalability**: Test at 16px and 512px
- [ ] **Dark mode**: Looks good on dark backgrounds
- [ ] **Light mode**: Looks good on light backgrounds
- [ ] **Notion compatible**: Renders inline correctly
- [ ] **Cloudinary deployed**: CDN URL active
- [ ] **Notion gallery updated**: Preview visible
- [ ] **Documentation added**: Use case described

## M4 Optimization

**Performance Targets** (with Neural Engine):
- Generation time: <3 seconds per component
- Batch generation: 15 components in <45 seconds
- Optimization: <1 second per component
- Deployment: <2 seconds to Cloudinary
- Total workflow: <10 seconds per component

**M4 Pathways**:
- `quantum_spatial`: For geometric calculations
- `creative_intelligence`: For aesthetic decisions
- `strategic_intelligence`: For batch coordination

## Integration with Other Skills

### With Figma Visual Agent
- Extract design tokens for color consistency
- Validate against Apple HIG
- Generate component variations

### With Oksana Creative Agent
- Generate component names and descriptions
- Validate brand alignment
- Create use case documentation

### With Strategic Director Agent
- Coordinate batch generation workflow
- Validate deployment readiness
- Approve for production use

## Example Usage

```typescript
import { SVGGenerationAgent } from './svg-generation-agent';

const agent = new SVGGenerationAgent();

// Generate single component
const component = await agent.generate({
  name: 'QuantumPulseBackground',
  theme: 'quantum-spatial',
  type: 'background',
  animated: true,
  animationDuration: '3s',
  colors: ['#0A0E27', '#00D9FF', '#8B5CF6'],
  sizes: [1920, 1080],
  useCase: 'Notion page header background',
  notionCompatible: true
});

// Generate complete set
const library = await agent.generateSet('quantum-spatial', {
  animated: 15,
  static: 15,
  deploy: true,
  updateNotion: true
});

console.log(`✅ Generated ${library.length} components`);
console.log(`☁️ Deployed to Cloudinary`);
console.log(`📓 Notion gallery updated`);
```

## Troubleshooting

**Issue**: SVG doesn't animate smoothly
**Solution**: Reduce complexity, use CSS animations instead of SMIL

**Issue**: File size too large (>5KB)
**Solution**: Simplify paths, reduce decimal precision, merge similar elements

**Issue**: Doesn't render in Notion
**Solution**: Use inline SVG format, avoid external references

**Issue**: Colors look different in dark mode
**Solution**: Use `opacity` and `mix-blend-mode` for better adaptation

## References

- Quantum Spatial Design System: `/quantum-spatial/design-system/`
- SVG Optimization Tools: SVGO, SVGOMGimize
- Animation Performance: MDN Web Docs
- Cloudinary API: https://cloudinary.com/documentation

---

**Use this skill when you need to generate brand-aligned, technically optimized SVG components at scale with M4-accelerated processing and automatic deployment.**
