---
name: design-system-automation
description: Quantum Spatial design system automation with Figma-to-code generation. Use when creating UI components, generating design variations, applying design tokens, or ensuring Apple HIG compliance. Provides SwiftUI, React, and Shopify Liquid code generation at scale.
---

# Design System Automation Skill

## Purpose

Automate component generation from the Quantum Spatial design system with Apple HIG compliance. Generate production-ready SwiftUI, React, and Shopify Liquid code from Figma designs with M4-accelerated processing.

## When to Use This Skill

- Creating new UI components from Figma designs
- Generating component variations (dark/light, mobile/desktop)
- Applying Quantum Spatial design tokens at scale
- Validating Apple HIG compliance automatically
- Converting designs to production code
- Batch processing multiple components

## Core Capabilities

### 1. Figma Design Extraction
- Parse Figma components via MCP server
- Extract design tokens (colors, spacing, typography)
- Identify component structure and hierarchy
- Map Figma styles to Quantum Spatial tokens

### 2. Multi-Platform Code Generation
- **SwiftUI**: iOS, macOS, visionOS components
- **React/Next.js**: Web applications
- **Shopify Liquid**: E-commerce themes

### 3. Apple HIG Validation
- Enforce 44px × 44px minimum touch targets
- Validate SF Pro typography usage
- Check WCAG AA contrast ratios (4.5:1)
- Ensure accessibility support

### 4. Design Token Application
- Apply Quantum Spatial color palette
- Use 8px grid spacing system
- Implement glassmorphism effects
- Support dark mode automatically

## Quantum Spatial Design System

### Design Tokens Structure

```typescript
// Color Tokens
const colors = {
  // Primary Palette
  primary: '#E85D75',        // Petersen Games accent
  secondary: '#4ECDC4',      // Quantum spatial blue

  // Backgrounds (Dark Mode)
  background: '#0A0E27',     // Deep space
  surface: 'rgba(255, 255, 255, 0.05)',  // Frosted glass

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textTertiary: 'rgba(255, 255, 255, 0.5)',

  // Semantic Colors
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',

  // Glassmorphism
  glassBorder: 'rgba(255, 255, 255, 0.18)',
  glassBackground: 'rgba(255, 255, 255, 0.1)',
};

// Spacing Tokens (8px grid)
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Typography Tokens
const typography = {
  fontFamily: {
    display: 'SF Pro Display, -apple-system, system-ui, sans-serif',
    text: 'SF Pro Text, -apple-system, system-ui, sans-serif',
    mono: 'SF Mono, Menlo, Monaco, monospace',
  },
  fontSize: {
    xs: 11,
    sm: 13,
    base: 17,    // Apple HIG recommended
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Touch Targets (Apple HIG)
const touchTargets = {
  minimum: 44,     // Mandatory minimum
  recommended: 48, // Recommended size
  spacing: 8,      // Minimum between targets
};

// Glassmorphism Effects
const glassmorphism = {
  blur: 20,
  opacity: 0.7,
  border: 'rgba(255, 255, 255, 0.18)',
  shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
};
```

### Component Generation Template

```markdown
## Component: [Name]

### Platforms
- [x] SwiftUI (iOS/macOS/visionOS)
- [x] React/Next.js (Web)
- [ ] Shopify Liquid (if e-commerce)

### Design Tokens Used
- Colors: [primary, surface, textPrimary]
- Spacing: [md, lg]
- Typography: [fontFamily.display, fontSize.lg]
- Effects: [glassmorphism.blur]

### Variants
- [x] Dark mode (primary)
- [ ] Light mode (if needed)
- [x] Mobile (320-767px)
- [x] Tablet (768-1023px)
- [x] Desktop (1024px+)

### States
- [x] Default
- [x] Hover
- [x] Active
- [x] Disabled
- [x] Loading

### Implementation
[Generated code below]
```

## SwiftUI Component Generation

### Standard Component Structure

```swift
import SwiftUI

struct QuantumSpatialCard: View {
    // MARK: - Properties
    let title: String
    let description: String
    let action: () -> Void

    @Environment(\.colorScheme) var colorScheme
    @State private var isHovered = false

    // MARK: - Design Tokens
    private let spacing = QuantumTokens.Spacing.self
    private let colors = QuantumTokens.Colors.self
    private let typography = QuantumTokens.Typography.self

    // MARK: - Body
    var body: some View {
        VStack(alignment: .leading, spacing: spacing.md) {
            // Title
            Text(title)
                .font(typography.display(.large))
                .foregroundStyle(colors.textPrimary)

            // Description
            Text(description)
                .font(typography.text(.base))
                .foregroundStyle(colors.textSecondary)
                .lineLimit(3)

            // Action Button
            Button(action: action) {
                Label("Learn More", systemImage: "arrow.right")
                    .font(typography.text(.base))
            }
            .buttonStyle(.borderedProminent)
            .tint(colors.primary)
            .frame(minWidth: QuantumTokens.TouchTarget.recommended,
                   minHeight: QuantumTokens.TouchTarget.recommended)
        }
        .padding(spacing.lg)
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(.ultraThinMaterial)
                .overlay(
                    RoundedRectangle(cornerRadius: 16)
                        .stroke(colors.glassBorder, lineWidth: 1)
                )
        )
        .shadow(color: .black.opacity(0.2), radius: 10, y: 4)
        .scaleEffect(isHovered ? 1.02 : 1.0)
        .animation(.spring(response: 0.3), value: isHovered)
        .onHover { hovering in
            isHovered = hovering
        }
    }
}

// MARK: - Design Tokens
enum QuantumTokens {
    enum Spacing {
        static let xs: CGFloat = 4
        static let sm: CGFloat = 8
        static let md: CGFloat = 16
        static let lg: CGFloat = 24
        static let xl: CGFloat = 32
    }

    enum Colors {
        static let primary = Color(red: 0.91, green: 0.36, blue: 0.46)
        static let textPrimary = Color.white
        static let textSecondary = Color.white.opacity(0.7)
        static let glassBorder = Color.white.opacity(0.18)
    }

    enum Typography {
        static func display(_ size: DisplaySize) -> Font {
            switch size {
            case .small: return .system(size: 20, weight: .semibold, design: .default)
            case .medium: return .system(size: 24, weight: .semibold, design: .default)
            case .large: return .system(size: 32, weight: .bold, design: .default)
            }
        }

        static func text(_ size: TextSize) -> Font {
            switch size {
            case .small: return .system(size: 13, weight: .regular, design: .default)
            case .base: return .system(size: 17, weight: .regular, design: .default)
            case .large: return .system(size: 20, weight: .regular, design: .default)
            }
        }

        enum DisplaySize { case small, medium, large }
        enum TextSize { case small, base, large }
    }

    enum TouchTarget {
        static let minimum: CGFloat = 44
        static let recommended: CGFloat = 48
        static let spacing: CGFloat = 8
    }
}

// MARK: - Preview
#Preview {
    QuantumSpatialCard(
        title: "Quantum Spatial Design",
        description: "Create stunning interfaces with glassmorphism effects and M4-accelerated rendering.",
        action: { print("Action triggered") }
    )
    .padding()
    .frame(width: 350)
    .background(Color(red: 0.04, green: 0.05, blue: 0.15))
}
```

### SwiftUI HIG Compliance Checklist

```swift
// Before generating any SwiftUI component, verify:

// ✅ Touch Targets
// - All Button, NavigationLink ≥ 44x44pt
// - Spacing between interactive elements ≥ 8pt

// ✅ Typography
// - Use .system() fonts (maps to SF Pro)
// - Minimum 11pt, 17pt recommended
// - Support Dynamic Type with .font(.body) etc

// ✅ Accessibility
// - Add accessibility labels: .accessibilityLabel()
// - Provide hints: .accessibilityHint()
// - Group related elements: .accessibilityElement(children: .combine)

// ✅ Colors
// - Use semantic colors: .primary, .secondary
// - Support color schemes: @Environment(\.colorScheme)
// - Verify contrast with ColorContrastAnalyzer

// ✅ Spacing
// - Use 8pt grid system
// - Consistent padding and margins
// - Respect safe areas: .ignoresSafeArea() only when needed
```

## React/Next.js Component Generation

### Standard Component Structure

```typescript
import React from 'react';
import styles from './QuantumSpatialCard.module.css';

interface QuantumSpatialCardProps {
  title: string;
  description: string;
  onAction: () => void;
  className?: string;
}

export const QuantumSpatialCard: React.FC<QuantumSpatialCardProps> = ({
  title,
  description,
  onAction,
  className = ''
}) => {
  return (
    <article className={`${styles.card} ${className}`}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <button
          className={styles.actionButton}
          onClick={onAction}
          aria-label={`Learn more about ${title}`}
        >
          <span>Learn More</span>
          <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </article>
  );
};
```

### CSS Module with Design Tokens

```css
/* QuantumSpatialCard.module.css */

.card {
  /* Spacing (8px grid) */
  padding: var(--space-lg, 24px);

  /* Glassmorphism */
  background: var(--glass-background, rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(var(--glass-blur, 20px));
  border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.18));
  border-radius: 16px;

  /* Shadow */
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

  /* Transitions */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px 0 rgba(31, 38, 135, 0.5);
}

.content {
  display: flex;
  flex-direction: column;
  gap: var(--space-md, 16px);
}

.title {
  /* Typography */
  font-family: var(--font-display, 'SF Pro Display', -apple-system, system-ui, sans-serif);
  font-size: var(--font-size-xl, 24px);
  font-weight: 600;
  line-height: 1.2;

  /* Colors */
  color: var(--text-primary, #FFFFFF);

  /* Margins */
  margin: 0;
}

.description {
  /* Typography */
  font-family: var(--font-text, 'SF Pro Text', -apple-system, system-ui, sans-serif);
  font-size: var(--font-size-base, 17px);
  line-height: 1.5;

  /* Colors */
  color: var(--text-secondary, rgba(255, 255, 255, 0.7));

  /* Text overflow */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  /* Margins */
  margin: 0;
}

.actionButton {
  /* Touch target (Apple HIG) */
  min-width: var(--min-touch-target, 44px);
  min-height: var(--min-touch-target, 44px);
  padding: var(--space-sm, 8px) var(--space-lg, 24px);

  /* Styling */
  background: var(--primary, #E85D75);
  border: none;
  border-radius: 8px;

  /* Typography */
  font-family: var(--font-text, 'SF Pro Text', -apple-system, system-ui, sans-serif);
  font-size: var(--font-size-base, 17px);
  font-weight: 500;
  color: white;

  /* Layout */
  display: flex;
  align-items: center;
  gap: var(--space-sm, 8px);
  justify-content: center;

  /* Cursor */
  cursor: pointer;

  /* Transitions */
  transition: all 0.2s ease;
}

.actionButton:hover {
  background: color-mix(in srgb, var(--primary, #E85D75) 80%, white);
  transform: translateX(2px);
}

.actionButton:active {
  transform: scale(0.98);
}

.actionButton:focus-visible {
  outline: 2px solid var(--primary, #E85D75);
  outline-offset: 2px;
}

.icon {
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;
}

.actionButton:hover .icon {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 767px) {
  .card {
    padding: var(--space-md, 16px);
  }

  .title {
    font-size: var(--font-size-lg, 20px);
  }

  .description {
    font-size: var(--font-size-sm, 15px);
  }
}
```

### Design Token CSS Variables

```css
/* quantum-tokens.css */
:root {
  /* Typography */
  --font-display: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-text: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'SF Mono', 'Monaco', 'Menlo', monospace;

  --font-size-xs: 11px;
  --font-size-sm: 13px;
  --font-size-base: 17px;
  --font-size-lg: 20px;
  --font-size-xl: 24px;
  --font-size-xxl: 32px;

  /* Spacing (8px grid) */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-xxl: 48px;

  /* Touch Targets */
  --min-touch-target: 44px;
  --recommended-touch-target: 48px;
  --touch-spacing: 8px;

  /* Colors */
  --primary: #E85D75;
  --secondary: #4ECDC4;
  --background: #0A0E27;
  --surface: rgba(255, 255, 255, 0.05);
  --text-primary: #FFFFFF;
  --text-secondary: rgba(255, 255, 255, 0.7);

  /* Glassmorphism */
  --glass-blur: 20px;
  --glass-opacity: 0.7;
  --glass-background: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.18);
}
```

## Apple HIG Compliance Validation

### Automated Validation Script

```typescript
// hig-validator.ts

interface HIGValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
  score: number; // 0-100
}

export function validateComponent(component: HTMLElement): HIGValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check touch targets
  const interactiveElements = component.querySelectorAll('button, a, input, select, textarea');
  interactiveElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.width < 44 || rect.height < 44) {
      errors.push(`Touch target too small: ${element.tagName} (${rect.width}x${rect.height}px)`);
    }
  });

  // Check typography
  const textElements = component.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, label');
  textElements.forEach((element) => {
    const fontSize = parseFloat(window.getComputedStyle(element).fontSize);
    if (fontSize < 11) {
      errors.push(`Font size too small: ${element.tagName} (${fontSize}px)`);
    }
  });

  // Check color contrast
  // (Simplified - use actual contrast checker in production)
  const foregroundElements = component.querySelectorAll('[style*="color"]');
  foregroundElements.forEach((element) => {
    const style = window.getComputedStyle(element);
    const color = style.color;
    const backgroundColor = style.backgroundColor;

    // Calculate contrast ratio (simplified)
    const ratio = calculateContrastRatio(color, backgroundColor);
    if (ratio < 4.5) {
      warnings.push(`Low contrast ratio: ${ratio.toFixed(2)}:1 (need 4.5:1)`);
    }
  });

  const score = 100 - (errors.length * 10) - (warnings.length * 5);
  const passed = errors.length === 0;

  return { passed, errors, warnings, score: Math.max(0, score) };
}

function calculateContrastRatio(color1: string, color2: string): number {
  // Implement WCAG contrast ratio calculation
  // This is a placeholder - use actual implementation
  return 4.5;
}
```

## Shopify Liquid Components

### Liquid Product Card Template

```liquid
{% comment %}
  Quantum Spatial Product Card
  Petersen Games branded component
{% endcomment %}

<article class="quantum-product-card" data-product-id="{{ product.id }}">
  {% comment %} Product Image {% endcomment %}
  <div class="quantum-product-card__image">
    {% if product.featured_image %}
      <img
        src="{{ product.featured_image | img_url: 'large' }}"
        alt="{{ product.featured_image.alt | escape }}"
        loading="lazy"
        width="600"
        height="600"
      >
    {% else %}
      <div class="quantum-product-card__placeholder">
        {% render 'icon-placeholder' %}
      </div>
    {% endif %}

    {% if product.tags contains 'limited-edition' %}
      <span class="quantum-badge quantum-badge--exclusive">
        Limited Collector's Edition
      </span>
    {% endif %}
  </div>

  {% comment %} Product Info {% endcomment %}
  <div class="quantum-product-card__content">
    <h3 class="quantum-product-card__title">
      <a href="{{ product.url }}">{{ product.title }}</a>
    </h3>

    <p class="quantum-product-card__description">
      {{ product.description | strip_html | truncatewords: 20 }}
    </p>

    <div class="quantum-product-card__footer">
      <span class="quantum-product-card__price">
        {% if product.compare_at_price > product.price %}
          <span class="quantum-price--compare">{{ product.compare_at_price | money }}</span>
        {% endif %}
        <span class="quantum-price--current">{{ product.price | money }}</span>
      </span>

      <button
        class="quantum-button quantum-button--primary"
        data-add-to-cart="{{ product.id }}"
        aria-label="Add {{ product.title }} to cart"
      >
        <span>Add to Collection</span>
        <svg class="quantum-icon" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
        </svg>
      </button>
    </div>
  </div>
</article>

<style>
  .quantum-product-card {
    /* Spacing */
    padding: var(--space-lg, 24px);

    /* Glassmorphism */
    background: var(--glass-background, rgba(255, 255, 255, 0.1));
    backdrop-filter: blur(var(--glass-blur, 20px));
    border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.18));
    border-radius: 16px;

    /* Shadow */
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);

    /* Transition */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .quantum-product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 48px rgba(31, 38, 135, 0.5);
  }

  .quantum-product-card__image {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    aspect-ratio: 1;
    margin-bottom: var(--space-md, 16px);
  }

  .quantum-product-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .quantum-badge {
    position: absolute;
    top: var(--space-sm, 8px);
    right: var(--space-sm, 8px);
    padding: var(--space-xs, 4px) var(--space-sm, 8px);
    background: var(--primary, #E85D75);
    color: white;
    font-size: var(--font-size-xs, 11px);
    font-weight: 600;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: -0.5px;
  }

  .quantum-product-card__title {
    font-family: var(--font-display);
    font-size: var(--font-size-lg, 20px);
    font-weight: 600;
    color: var(--text-primary, white);
    margin: 0 0 var(--space-sm, 8px);
  }

  .quantum-product-card__title a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .quantum-product-card__title a:hover {
    color: var(--primary, #E85D75);
  }

  .quantum-product-card__description {
    font-family: var(--font-text);
    font-size: var(--font-size-base, 17px);
    color: var(--text-secondary, rgba(255, 255, 255, 0.7));
    line-height: 1.5;
    margin: 0 0 var(--space-md, 16px);
  }

  .quantum-product-card__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-md, 16px);
  }

  .quantum-product-card__price {
    display: flex;
    align-items: baseline;
    gap: var(--space-sm, 8px);
  }

  .quantum-price--compare {
    font-size: var(--font-size-sm, 13px);
    color: var(--text-tertiary, rgba(255, 255, 255, 0.5));
    text-decoration: line-through;
  }

  .quantum-price--current {
    font-size: var(--font-size-xl, 24px);
    font-weight: 600;
    color: var(--text-primary, white);
  }

  .quantum-button {
    /* Touch target (Apple HIG) */
    min-width: 44px;
    min-height: 44px;
    padding: var(--space-sm, 8px) var(--space-lg, 24px);

    /* Styling */
    background: var(--primary, #E85D75);
    border: none;
    border-radius: 8px;

    /* Typography */
    font-family: var(--font-text);
    font-size: var(--font-size-base, 17px);
    font-weight: 500;
    color: white;

    /* Layout */
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm, 8px);

    /* Cursor */
    cursor: pointer;

    /* Transitions */
    transition: all 0.2s ease;
  }

  .quantum-button:hover {
    background: color-mix(in srgb, var(--primary) 80%, white);
    transform: translateX(2px);
  }

  .quantum-icon {
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease;
  }

  .quantum-button:hover .quantum-icon {
    transform: translateX(4px);
  }

  /* Responsive */
  @media (max-width: 767px) {
    .quantum-product-card {
      padding: var(--space-md, 16px);
    }

    .quantum-product-card__footer {
      flex-direction: column;
      align-items: stretch;
    }

    .quantum-button {
      width: 100%;
      justify-content: center;
    }
  }
</style>
```

## Batch Component Generation Workflow

```bash
# Generate multiple components from Figma

1. Extract designs via Figma MCP:
   - Parse all components in Figma file
   - Identify design tokens
   - Map to Quantum Spatial system

2. Generate code for each platform:
   - SwiftUI: iOS/macOS/visionOS
   - React: Web application
   - Liquid: Shopify theme (if e-commerce)

3. Validate all outputs:
   - Apple HIG compliance check
   - Type safety verification
   - Accessibility audit
   - Performance analysis

4. Package for delivery:
   - Organize by platform
   - Include usage documentation
   - Add integration examples
```

## Performance Optimization

### M4-Accelerated Rendering

```swift
// SwiftUI: Use M4 Neural Engine for image processing
import CoreML

struct OptimizedImageView: View {
    let imageURL: URL
    @State private var processedImage: UIImage?

    var body: some View {
        if let image = processedImage {
            Image(uiImage: image)
                .resizable()
                .aspectRatio(contentMode: .fill)
        } else {
            ProgressView()
                .task {
                    processedImage = await processImage(from: imageURL)
                }
        }
    }

    @MainActor
    private func processImage(from url: URL) async -> UIImage? {
        // M4 Neural Engine handles image processing
        // Much faster than CPU-based processing
        return await ImageProcessor.shared.process(url: url)
    }
}
```

### Reduced Glassmorphism on Mobile

```css
/* Automatically reduce effects on mobile for performance */

@media (max-width: 767px) {
  .quantum-card {
    /* Reduce blur on mobile devices */
    backdrop-filter: blur(10px); /* Was 20px on desktop */

    /* Simplify shadows */
    box-shadow: 0 4px 16px rgba(31, 38, 135, 0.2); /* Lighter */
  }
}

/* Respect user preference for reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Tips for Effective Component Generation

1. **Start with Design Tokens**: Always apply Quantum Spatial tokens first
2. **Validate Early**: Check HIG compliance before adding features
3. **Think Responsive**: Design mobile-first, enhance for larger screens
4. **Optimize Performance**: Use M4 acceleration, reduce complexity on mobile
5. **Document Variants**: Include dark/light mode and all states
6. **Test Accessibility**: Run VoiceOver tests and contrast checks

## Collaboration with Other Agents

### With Strategic Director
- Get HIG validation approval before deployment
- Coordinate performance optimization strategy
- Align component roadmap with product priorities

### With Oksana Creative
- Integrate brand-aligned copy into components
- Ensure visual design matches brand aesthetic
- Coordinate component naming conventions

## References

- Quantum Spatial Design System: `/quantum-spatial/design-system/`
- Figma MCP Server: `/strategic-director/enhanced-figma-mcp-server.js`
- Component Library: `/quantum-spatial/creative-intelligence-portal/components/`
- Apple HIG Guidelines: `/apple-intelligence/foundation/sources-of-truth/`

---

**Use this skill when you need pixel-perfect, HIG-compliant, brand-consistent components that leverage M4 acceleration and quantum-spatial aesthetics at scale.**
