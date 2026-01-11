# Foundational Glassmorphic Design System

## 🎨 Core Design Principles

### Background System
```css
/* Enhanced Glassmorphic Background - Fixed Position */
background: `
  radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
  radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.25) 0%, transparent 50%),
  radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
  linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 30, 0.95) 100%)
`
```

### Sidebar Glassmorphic Background
```css
background: `linear-gradient(180deg, 
  rgba(147, 51, 234, 0.15) 0%, 
  rgba(79, 70, 229, 0.12) 25%, 
  rgba(236, 72, 153, 0.08) 50%, 
  rgba(245, 158, 11, 0.10) 75%, 
  rgba(147, 51, 234, 0.15) 100%
), rgba(0, 0, 0, 0.9)`
backdropFilter: 'blur(20px)'
WebkitBackdropFilter: 'blur(20px)'
borderRight: '1px solid rgba(255, 255, 255, 0.1)'
```

## 🤓 Color Palette

### Primary Colors
- **Purple Primary**: `rgba(147, 51, 234, x)` - #9333ea
- **Indigo Secondary**: `rgba(79, 70, 229, x)` - #4f46e5  
- **Pink Accent**: `rgba(236, 72, 153, x)` - #ec4899
- **Amber Highlight**: `rgba(245, 158, 11, x)` - #f59e0b
- **Blue Interactive**: `rgba(0, 122, 255, x)` - #007AFF (Apple Blue)

### Opacity Levels
- **Background**: 0.05-0.15
- **Cards/Components**: 0.1-0.2
- **Overlays**: 0.3-0.5
- **Text**: 0.6-1.0

## 🧩 Component Patterns

### 1. Glassmorphic Cards
```css
background: `
  linear-gradient(135deg, 
    rgba(147, 51, 234, 0.15) 0%, 
    rgba(79, 70, 229, 0.12) 25%, 
    rgba(236, 72, 153, 0.10) 50%, 
    rgba(245, 158, 11, 0.12) 75%, 
    rgba(147, 51, 234, 0.15) 100%
  ),
  linear-gradient(45deg, 
    rgba(255, 255, 255, 0.05) 0%, 
    rgba(255, 255, 255, 0.02) 100%
  )
`
backdropFilter: 'blur(40px) saturate(180%)'
WebkitBackdropFilter: 'blur(40px) saturate(180%)'
border: '2px solid rgba(255, 255, 255, 0.2)'
borderRadius: '28px'
boxShadow: `
  inset 0 2px 0 rgba(255, 255, 255, 0.15),
  inset 0 -1px 0 rgba(255, 255, 255, 0.05),
  0 16px 64px rgba(147, 51, 234, 0.3),
  0 8px 32px rgba(236, 72, 153, 0.2),
  0 0 0 1px rgba(255, 255, 255, 0.1)
`
```

### 2. Interactive Elements
```css
/* Default State */
background: 'rgba(255, 255, 255, 0.05)'
border: '1px solid rgba(255, 255, 255, 0.1)'
borderRadius: '12px'
backdropFilter: 'blur(20px)'

/* Hover State */
background: 'rgba(255, 255, 255, 0.1)'
borderColor: 'rgba(255, 255, 255, 0.2)'
transform: 'translateY(-2px)'
```

### 3. Active/Selected States
```css
background: 'rgba(0, 122, 255, 0.2)'
borderColor: 'rgba(0, 122, 255, 0.3)'
color: '#007AFF'
```

## 📝 Typography System

### Font Stack
```css
fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
/* For body text: */
fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
```

### Text Colors
- **Primary White**: `#FFFFFF`
- **Secondary White**: `rgba(255, 255, 255, 0.8)`
- **Tertiary White**: `rgba(255, 255, 255, 0.7)`
- **Subdued White**: `rgba(255, 255, 255, 0.6)`
- **Interactive Blue**: `#007AFF`

### Gradient Text
```css
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
WebkitBackgroundClip: 'text'
WebkitTextFillColor: 'transparent'
backgroundClip: 'text'
```

## 🎭 Animation & Transitions

### Standard Transitions
```css
transition: 'all 0.3s ease'
/* For micro-interactions: */
transition: 'all 0.2s ease'
/* For complex animations: */
transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
```

### Hover Effects
```css
/* Card Hover */
transform: 'translateY(-16px) scale(1.02)'
boxShadow: `
  0 24px 80px rgba(147, 51, 234, 0.4),
  0 16px 48px rgba(236, 72, 153, 0.3),
  0 0 120px rgba(236, 72, 153, 0.25)
`

/* Button Hover */
transform: 'translateY(-3px)'
borderColor: 'rgba(236, 72, 153, 0.6)'
```

## 🤓 Button System

### Primary CTA Button
```css
background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(147, 51, 234, 0.2))'
backdropFilter: 'blur(20px)'
border: '1px solid rgba(236, 72, 153, 0.4)'
borderRadius: '12px'
color: 'white'
padding: '16px 32px'
```

### Secondary Button
```css
background: 'rgba(255, 255, 255, 0.05)'
backdropFilter: 'blur(20px)'
border: '1px solid rgba(255, 255, 255, 0.15)'
borderRadius: '12px'
color: 'white'
padding: '16px 32px'
```

### Accent Button (Gradient)
```css
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
borderRadius: '50px'
boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
```

## 📱 Responsive Behavior

### Sidebar Responsive
```css
/* Desktop */
width: '280px' /* expanded */ | '70px' /* collapsed */

/* Mobile */
width: '100vw'
transform: 'translateX(-100%)' /* hidden */
transform: 'translateX(0)' /* visible */
```

### Mobile Overlay
```css
background: 'rgba(0, 0, 0, 0.5)'
backdropFilter: 'blur(10px)'
zIndex: 999
```

## 🎨 Section Backgrounds

### Hero Sections
```css
background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(20,20,30,1) 50%, rgba(0,0,0,1) 100%)'
```

### Content Sections
```css
background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(30,15,50,1) 50%, rgba(0,0,0,1) 100%)'
```

### Philosophy Sections
```css
background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(30,20,60,1) 50%, rgba(0,0,0,1) 100%)'
```

## 🎭 Special Effects

### Image Overlays (Cthulhu backgrounds)
```css
opacity: 0.12-0.15
filter: 'blur(0.5px) brightness(0.8)'
borderRadius: '20px'
```

### Loading States
```css
background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 75%)'
backgroundSize: '200% 100%'
animation: 'loading 1.5s infinite'
```

## 🤓 Application Guidelines

### 1. Consistency Rules
- Always use the established color palette
- Maintain consistent border radius (12px standard, 28px for cards, 50px for buttons)
- Use backdrop-filter for all glassmorphic elements
- Apply consistent spacing (16px, 20px, 24px, 32px increments)

### 2. Accessibility
- Maintain minimum contrast ratios
- Use semantic HTML
- Provide focus states for interactive elements

### 3. Performance
- Use CSS transforms over position changes
- Implement backdrop-filter with webkit prefix
- Optimize gradient complexity

---

**Status**: Foundational Design System Documented  
**Version**: 1.0  
**Last Updated**: Phase 3 TypeScript Hygiene  
**Ready for**: Site-wide Application
