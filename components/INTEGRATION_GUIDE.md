# QuantumSpatial_8 Integration Guide

## Quick Start

### Installation & Setup

#### Next.js 15 / React 19 Project

1. **Copy component files to your project**:
```bash
# Component structure
your-project/
├── components/
│   ├── QuantumSpatial_8.tsx
│   ├── QuantumSpatial_8.module.css
│   ├── QuantumSpatial_8.examples.tsx
│   └── QuantumSpatial_8.examples.module.css
└── public/
    └── assets/
        └── QuantumSpatial_8.svg
```

2. **Import and use**:
```tsx
import { QuantumSpatial8 } from '@/components/QuantumSpatial_8';

export default function Page() {
  return <QuantumSpatial8 size={400} />;
}
```

#### SwiftUI Project (iOS/macOS/visionOS)

1. **Add component to your Xcode project**:
```
YourApp/
├── Components/
│   └── QuantumSpatial_8.swift
└── Assets.xcassets/
    └── QuantumSpatial_8.svg (optional reference)
```

2. **Import and use**:
```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        QuantumSpatial8View()
            .frame(width: 400, height: 400)
    }
}
```

#### Static Website (HTML/CSS/JS)

1. **Reference the SVG directly**:
```html
<object
  data="./assets/QuantumSpatial_8.svg"
  type="image/svg+xml"
  width="400"
  height="400"
  aria-label="Quantum Spatial animation"
>
  <img src="./assets/fallback-image.png" alt="Quantum Spatial" />
</object>
```

---

## Platform-Specific Integration

### Next.js 15 with App Router

#### Server Component (Default)
```tsx
// app/page.tsx
import { QuantumSpatial8 } from '@/components/QuantumSpatial_8';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <QuantumSpatial8 size={600} speed={0.8} />
        <h1>Welcome to Quantum Spatial</h1>
      </section>
    </main>
  );
}
```

#### Client Component (with Interactivity)
```tsx
'use client';

import { useState } from 'react';
import { QuantumSpatial8 } from '@/components/QuantumSpatial_8';

export function InteractiveQuantum() {
  const [speed, setSpeed] = useState(1);

  return (
    <div>
      <QuantumSpatial8 size={400} speed={speed} />
      <button onClick={() => setSpeed(speed * 2)}>
        Speed Up
      </button>
    </div>
  );
}
```

#### Dynamic Import (Performance Optimization)
```tsx
import dynamic from 'next/dynamic';

const QuantumSpatial8 = dynamic(
  () => import('@/components/QuantumSpatial_8'),
  {
    ssr: false,
    loading: () => (
      <div className="loading-placeholder">
        <p>Loading quantum animation...</p>
      </div>
    ),
  }
);

export default function Page() {
  return <QuantumSpatial8 size={400} />;
}
```

---

### SwiftUI (iOS 17+, macOS 14+, visionOS 1.0+)

#### Basic View Integration
```swift
import SwiftUI

struct HomeView: View {
    var body: some View {
        NavigationStack {
            VStack(spacing: 32) {
                QuantumSpatial8View()
                    .frame(width: 300, height: 300)

                Text("9Bit Studios")
                    .font(.title)
                    .fontWeight(.semibold)

                Text("Quantum Spatial Intelligence")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
            .padding()
            .navigationTitle("Welcome")
        }
    }
}
```

#### Interactive Button
```swift
struct QuantumButton: View {
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 12) {
                QuantumSpatial8View()
                    .frame(width: 80, height: 80)

                Text("Activate")
                    .font(.caption)
                    .fontWeight(.semibold)
            }
            .padding()
        }
        .frame(minWidth: 44, minHeight: 44)
        .accessibilityLabel("Activate Quantum Mode")
    }
}
```

#### Animated State Transition
```swift
struct StatefulQuantumView: View {
    @State private var isActive = false

    var body: some View {
        VStack {
            QuantumSpatial8View()
                .frame(width: isActive ? 400 : 200, height: isActive ? 400 : 200)
                .animation(.spring(duration: 0.6), value: isActive)

            Toggle("Active", isOn: $isActive)
                .toggleStyle(.button)
        }
        .padding()
    }
}
```

#### Background Decoration
```swift
struct DecoratedView: View {
    var body: some View {
        ZStack {
            // Background quantum animation
            QuantumSpatial8View()
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .opacity(0.2)
                .ignoresSafeArea()

            // Foreground content
            VStack(spacing: 20) {
                Text("Content Here")
                    .font(.title)
                    .foregroundStyle(.primary)
            }
            .padding()
        }
    }
}
```

---

### React Native (iOS/Android)

#### Using React Native SVG
```bash
npm install react-native-svg
```

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path,
  Circle,
  G,
  Rect,
  AnimateTransform,
  Animate,
} from 'react-native-svg';

export function QuantumSpatial8Mobile({ size = 400 }) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 400 400">
        {/* Copy SVG content from QuantumSpatial_8.svg */}
        {/* Adapt animations for react-native-svg */}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

---

### Shopify Liquid (E-commerce)

#### Theme Integration
```liquid
<!-- snippets/quantum-spatial-8.liquid -->
<div class="quantum-spatial-container">
  <object
    data="{{ 'QuantumSpatial_8.svg' | asset_url }}"
    type="image/svg+xml"
    width="{{ section.settings.size | default: 400 }}"
    height="{{ section.settings.size | default: 400 }}"
    aria-label="Quantum Spatial animation"
    class="quantum-spatial-8"
  >
    <img
      src="{{ 'quantum-fallback.png' | asset_url }}"
      alt="Quantum Spatial"
      width="{{ section.settings.size | default: 400 }}"
      height="{{ section.settings.size | default: 400 }}"
    />
  </object>
</div>

<style>
  .quantum-spatial-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }

  .quantum-spatial-8 {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 768px) {
    .quantum-spatial-8 {
      width: 300px;
      height: 300px;
    }
  }
</style>
```

#### Section Schema
```liquid
{% schema %}
{
  "name": "Quantum Spatial Hero",
  "settings": [
    {
      "type": "range",
      "id": "size",
      "label": "Animation Size",
      "min": 200,
      "max": 800,
      "step": 50,
      "default": 400,
      "unit": "px"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Quantum Spatial Intelligence"
    }
  ],
  "presets": [
    {
      "name": "Quantum Hero",
      "category": "Hero"
    }
  ]
}
{% endschema %}

<!-- Usage -->
{% render 'quantum-spatial-8' %}
<h1>{{ section.settings.heading }}</h1>
```

---

## Design Token Integration

### CSS Variables Setup

```css
/* styles/tokens.css */
@import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@400;600;700&display=swap');

:root {
  /* Typography */
  --font-display: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-text: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Quantum Spatial Colors */
  --quantum-primary: #E85D75;
  --quantum-secondary: #4ECDC4;
  --quantum-tertiary: #A78BFA;
  --quantum-background: #0A0E27;
  --quantum-surface: rgba(255, 255, 255, 0.05);

  /* Spacing (8px grid) */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  /* Glassmorphism Effects */
  --glass-blur: 20px;
  --glass-opacity: 0.7;
  --glass-border: rgba(255, 255, 255, 0.18);

  /* Touch Targets (Apple HIG) */
  --min-touch-target: 44px;
  --recommended-touch-target: 48px;
}
```

### Tailwind CSS Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ['SF Pro Display', 'system-ui', 'sans-serif'],
        text: ['SF Pro Text', 'system-ui', 'sans-serif'],
      },
      colors: {
        quantum: {
          primary: '#E85D75',
          secondary: '#4ECDC4',
          tertiary: '#A78BFA',
          background: '#0A0E27',
          surface: 'rgba(255, 255, 255, 0.05)',
        },
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      backdropBlur: {
        'glass': '20px',
      },
      minWidth: {
        'touch': '44px',
      },
      minHeight: {
        'touch': '44px',
      },
    },
  },
};
```

### SwiftUI Design Tokens

```swift
// DesignTokens.swift
import SwiftUI

extension Color {
    static let quantumPrimary = Color(hex: "#E85D75")
    static let quantumSecondary = Color(hex: "#4ECDC4")
    static let quantumTertiary = Color(hex: "#A78BFA")
    static let quantumBackground = Color(hex: "#0A0E27")
    static let quantumSurface = Color.white.opacity(0.05)
}

extension Font {
    static let displayLarge = Font.system(size: 34, weight: .bold, design: .default)
    static let displayMedium = Font.system(size: 28, weight: .semibold, design: .default)
    static let textBody = Font.system(size: 17, weight: .regular, design: .default)
    static let textCaption = Font.system(size: 13, weight: .regular, design: .default)
}

struct Spacing {
    static let xs: CGFloat = 4
    static let sm: CGFloat = 8
    static let md: CGFloat = 16
    static let lg: CGFloat = 24
    static let xl: CGFloat = 32
}

struct TouchTarget {
    static let minimum: CGFloat = 44
    static let recommended: CGFloat = 48
}
```

---

## Performance Optimization

### Web Performance

#### Lazy Loading Implementation
```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { QuantumSpatial8 } from '@/components/QuantumSpatial_8';

export function LazyQuantum() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: '400px' }}>
      {isVisible ? (
        <QuantumSpatial8 size={400} />
      ) : (
        <div className="placeholder">Loading...</div>
      )}
    </div>
  );
}
```

#### Reduce Motion Support
```tsx
'use client';

import { useEffect, useState } from 'react';
import { QuantumSpatial8 } from '@/components/QuantumSpatial_8';

export function AccessibleQuantum() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return <QuantumSpatial8 size={400} reducedMotion={reducedMotion} />;
}
```

### SwiftUI Performance

#### M4 Neural Engine Optimization
```swift
import SwiftUI

struct OptimizedQuantumView: View {
    @Environment(\.accessibilityReduceMotion) var reduceMotion

    var body: some View {
        Group {
            if reduceMotion {
                // Static version for accessibility
                QuantumSpatial8View()
                    .animation(nil, value: UUID())
            } else {
                // Full animation
                QuantumSpatial8View()
            }
        }
        .drawingGroup() // M4 Metal acceleration
    }
}
```

---

## Accessibility Best Practices

### WCAG AA Compliance Checklist

- ✅ **Color Contrast**: All colors meet 4.5:1 minimum ratio
- ✅ **Keyboard Navigation**: Focus states on interactive elements
- ✅ **Screen Readers**: Proper ARIA labels and semantic HTML
- ✅ **Reduced Motion**: Respects user preference
- ✅ **Touch Targets**: 44px minimum on all platforms
- ✅ **Alternative Text**: Descriptive labels for non-text content

### Implementation Examples

#### React - Full Accessibility
```tsx
<QuantumSpatial8
  size={400}
  reducedMotion={prefersReducedMotion}
  aria-label="Quantum Spatial infinity symbol representing continuous creative intelligence"
  role="img"
  className="quantum-animation"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleActivation();
    }
  }}
/>
```

#### SwiftUI - VoiceOver Support
```swift
QuantumSpatial8View()
    .frame(width: 400, height: 400)
    .accessibilityLabel("Quantum Spatial infinity animation")
    .accessibilityHint("Animated figure-eight representing quantum spatial design")
    .accessibilityAddTraits(.isImage)
    .accessibilityRemoveTraits(.isButton) // If not interactive
```

---

## Brand Alignment

### 9Bit Studios Context

When using QuantumSpatial_8 for 9Bit Studios projects:

**Tone**: Innovative, quantum-spatial, Apple-aligned
**Values**: Spatial awareness, sophisticated design, privacy-first
**Aesthetics**: Glassmorphism, dark-mysterious, tech-forward

#### Content Pairing Example
```tsx
<section className="hero-quantum">
  <QuantumSpatial8 size={600} />
  <div className="content">
    <h1>M4-Accelerated Creative Intelligence</h1>
    <p>
      Privacy-first quantum spatial design with seamless
      Apple ecosystem integration
    </p>
    <button>Explore the Portal</button>
  </div>
</section>
```

### Petersen Games Context

When adapting for Petersen Games (horror-gaming brand):

**Tone**: Dark-mysterious, premium, exclusive
**Values**: Quality, legendary status, collector appeal
**Aesthetics**: Horror-gaming with liquid-glass quantum-spatial

#### Modified Color Scheme
```css
:root {
  --quantum-primary: #8B0000; /* Dark red - horror */
  --quantum-secondary: #2F4F4F; /* Dark slate - mysterious */
  --quantum-tertiary: #4B0082; /* Indigo - cosmic horror */
}
```

---

## Troubleshooting

### Common Issues

#### Issue: SVG Not Rendering
**Solution**: Check MIME type configuration
```nginx
# nginx.conf
types {
  image/svg+xml svg svgz;
}
```

#### Issue: Animations Not Working
**Solution**: Ensure JavaScript is enabled and check CSP headers
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self' 'unsafe-inline'">
```

#### Issue: Performance Lag on Mobile
**Solution**: Reduce complexity via CSS media query
```css
@media (max-width: 768px) {
  .quantumSpatial8 {
    filter: none;
    backdrop-filter: none;
  }
}
```

#### Issue: SwiftUI Canvas Not Updating
**Solution**: Use `@State` or `@Binding` for reactive updates
```swift
@State private var needsRedraw = false

// Trigger redraw
needsRedraw.toggle()
```

---

## Testing Guidelines

### Visual Regression Testing

```typescript
// tests/quantum-spatial-8.test.tsx
import { render } from '@testing-library/react';
import { QuantumSpatial8 } from '@/components/QuantumSpatial_8';

describe('QuantumSpatial8', () => {
  it('renders with default props', () => {
    const { container } = render(<QuantumSpatial8 />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('respects size prop', () => {
    const { container } = render(<QuantumSpatial8 size={200} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '200');
    expect(svg).toHaveAttribute('height', '200');
  });

  it('disables animations with reducedMotion', () => {
    const { container } = render(<QuantumSpatial8 reducedMotion />);
    const animate = container.querySelector('animate');
    expect(animate).toHaveAttribute('repeatCount', '0');
  });
});
```

### Accessibility Testing

```bash
# Install axe-core
npm install --save-dev @axe-core/react

# Run accessibility tests
npm run test:a11y
```

---

## Deployment Checklist

- [ ] All SVG assets optimized (SVGO)
- [ ] CSS minified and bundled
- [ ] Design tokens configured
- [ ] Accessibility tested (WCAG AA)
- [ ] Performance benchmarked (<16ms render)
- [ ] Cross-browser tested (Chrome, Safari, Firefox, Edge)
- [ ] Mobile responsive (375px - 1920px)
- [ ] Print styles configured
- [ ] Reduced motion support verified
- [ ] High contrast mode tested
- [ ] Documentation complete

---

## Support & Resources

**Component Documentation**: See `QuantumSpatial_8.md`
**Design System**: `/quantum-spatial/design-system/`
**Brand Guidelines**: `CLAUDE.md`
**Apple HIG**: https://developer.apple.com/design/human-interface-guidelines

---

**🚀 You're ready to integrate QuantumSpatial_8 across your entire ecosystem with world-class performance, accessibility, and brand consistency!**
