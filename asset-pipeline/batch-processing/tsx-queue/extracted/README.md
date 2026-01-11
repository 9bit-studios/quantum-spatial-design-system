# Extracted Apple HIG Compliant Components

This directory contains all Apple Human Interface Guidelines (HIG) compliant components extracted from the Enhanced Petersen Games Dashboard and related layouts. These components follow Apple's design standards while incorporating quantum-spatial design elements for gaming applications.

## Component Overview

### 🍎 Apple HIG Navigation Components

#### AppleNavigation
- **Purpose**: Primary navigation bar with Apple dark mode styling
- **Features**:
  - Sticky positioning with backdrop blur
  - Support for internal navigation sections
  - Responsive design with mobile optimization
  - Time display integration
  - Search functionality
- **Props**: `isMobile`, `currentTime`, `showInternalNav`, `sections`, `onSectionChange`, `title`, `subtitle`

#### MobileMenuToggle
- **Purpose**: Hamburger menu button for mobile navigation
- **Features**:
  - 48px touch target (Apple HIG compliant)
  - Glassmorphic styling
  - Tap animation feedback
- **Props**: `onClick`

### 📺 Content Display Components

#### VimeoModule
- **Purpose**: Embedded video player with quantum-spatial styling
- **Features**:
  - Lazy loading with play button
  - Responsive sizing
  - Glassmorphic card design
  - Autoplay and loop options
- **Props**: `videoId`, `title`, `description`, `autoplay`, `loop`, `width`, `height`, `isMobile`

#### ArtworkSpace
- **Purpose**: Drag-and-drop artwork upload zones
- **Features**:
  - Visual drag state feedback
  - Dimension specifications
  - Format indicators
  - Placement context
- **Props**: `title`, `width`, `height`, `description`, `placement`, `format`, `isMobile`

### 📊 Data Visualization Components

#### EnhancedStatCard
- **Purpose**: Statistical data display with gaming aesthetics
- **Features**:
  - Gradient backgrounds
  - Animated hover effects
  - 3D transform on interaction
  - Icon integration
  - Trend indicators
- **Props**: `title`, `value`, `change`, `trend`, `icon`, `gradient`, `accentColor`, `isMobile`, `extraInfo`

#### EnhancedActivityFeed
- **Purpose**: Real-time activity display for gaming events
- **Features**:
  - Priority indicators
  - Animated entry transitions
  - Color-coded activities
  - Scrollable content area
- **Props**: `activities`, `isMobile`

### 🗂️ Navigation Components

#### EcommerceSideMenu
- **Purpose**: Liquid glass style e-commerce navigation menu
- **Features**:
  - Collapsible design
  - Category color coding
  - Badge support
  - Section headers
  - Smooth animations
- **Props**: `activeItem`, `onItemClick`, `collapsed`, `isMobile`, `className`

### 🌌 Quantum-Spatial Components

#### QuantumSpatialButton
- **Purpose**: Gaming-themed button with quantum effects
- **Features**:
  - Multiple variants (primary, secondary, accent, ghost)
  - Quantum particle animations
  - Apple HIG touch targets (44px minimum)
  - Spring animations
  - Accessibility support
- **Props**: `variant`, `size`, `disabled`, `quantum`, `children`, `onClick`, `className`, `aria-label`

## Design Tokens

These components use two main design token systems:

### 1. Unified Design Tokens
Located in `../../layouts/UnifiedDesignSystem.tsx`, providing:
- Apple HIG compliant typography
- Color system with proper contrast ratios
- Spacing based on 8pt grid
- Corner radius system
- Animation timings and easings

### 2. Enhanced Design Tokens
Embedded within components for gaming-specific styling:
- Quantum color palette
- Glassmorphic effects
- Gaming-themed gradients
- Enhanced shadows and blurs

## Usage Examples

### Basic Navigation Setup
```tsx
import { AppleNavigation } from './components/extracted';

<AppleNavigation
  isMobile={false}
  currentTime="2:30 PM"
  showInternalNav={true}
  sections={[
    { id: 'overview', label: 'Overview' },
    { id: 'stats', label: 'Statistics' }
  ]}
  onSectionChange={(section) => console.log(section)}
  title="Gaming Dashboard"
  subtitle="Manage your cosmic empire"
/>
```

### Stat Card Implementation
```tsx
import { EnhancedStatCard } from './components/extracted';

<EnhancedStatCard
  title="Active Players"
  value={2847}
  change="+12.5% from yesterday"
  trend="up"
  icon={<UserIcon />}
  gradient="linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)"
  accentColor="#4FC3F7"
  extraInfo="Peak: 3250"
/>
```

### Quantum Button Usage
```tsx
import { QuantumSpatialButton } from './components/extracted';

<QuantumSpatialButton
  variant="primary"
  size="lg"
  quantum={true}
  onClick={() => console.log('Quantum click!')}
>
  Launch Game
</QuantumSpatialButton>
```

## Component Dependencies

All components require:
- React 18+
- Framer Motion for animations
- TypeScript for type safety

Some components have additional dependencies:
- `unifiedDesignTokens` from the design system
- Custom utility functions (like `cn` for classnames)

## Apple HIG Compliance

These components follow Apple's Human Interface Guidelines:
- ✅ Minimum 44px touch targets
- ✅ Proper contrast ratios for accessibility
- ✅ Consistent spacing using 8pt grid
- ✅ SF Pro Display font family
- ✅ Dark mode optimized
- ✅ Semantic color usage
- ✅ Smooth, meaningful animations

## Performance Considerations

- Components use React.memo where appropriate
- Animations are GPU-accelerated via Framer Motion
- Lazy loading for media content
- Debounced search inputs
- Optimized re-renders with proper dependency arrays

## Future Enhancements

- [ ] Additional quantum-spatial components (Cards, Inputs, Navigation)
- [ ] Theme customization support
- [ ] Extended animation presets
- [ ] Storybook documentation
- [ ] Unit test coverage
- [ ] Performance benchmarks