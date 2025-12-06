/**
 * Framer Type Safety Framework for Petersen Glass Theme
 * TypeScript interfaces for ResponsiveNumber and ResponsiveBoolean controls
 * 
 * Based on analysis of:
 * - PetersenShopify.tsx (excellent responsive controls, missing types)
 * - PremiumShopify.tsx (limited responsive controls, missing types)
 */

// Core Framer responsive types
export interface ResponsiveValue<T> {
  default: T
  tablet?: T
  mobile?: T
}

export interface ResponsiveNumber extends ResponsiveValue<number> {}
export interface ResponsiveBoolean extends ResponsiveValue<boolean> {}
export interface ResponsiveString extends ResponsiveValue<string> {}

// Framer Control Type definitions
export interface ResponsiveNumberControl {
  type: 'ResponsiveNumber'
  title: string
  defaultValue: ResponsiveNumber
  min?: number
  max?: number
  step?: number
  unit?: string
}

export interface ResponsiveBooleanControl {
  type: 'ResponsiveBoolean'
  title: string
  defaultValue: ResponsiveBoolean
}

export interface StringControl {
  type: 'String'
  title: string
  defaultValue: string
}

export interface NumberControl {
  type: 'Number'
  title: string
  defaultValue: number
  min?: number
  max?: number
  step?: number
}

// Component Props Interfaces

/**
 * PetersenShopify Component Props
 * Enhanced component with full responsive controls and type safety
 */
export interface PetersenShopifyProps {
  // Basic Props
  clientName?: string
  projectType?: string
  deliveryDate?: string
  corePackagePrice?: string
  phase2Price?: string
  phase3Price?: string
  
  // Color Theme
  primaryColor?: string
  accentColor?: string
  
  // Responsive Typography
  headerFontSize?: ResponsiveNumber
  taglineFontSize?: ResponsiveNumber
  packageTitleFontSize?: ResponsiveNumber
  
  // Responsive Spacing
  containerPadding?: ResponsiveNumber
  cardPadding?: ResponsiveNumber
  
  // Responsive Layout
  showNavSubtitle?: ResponsiveBoolean
  gridColumns?: ResponsiveNumber
  
  // Visual Controls
  mobileBackgroundIntensity?: number
  
  // Additional responsive props (from full component analysis)
  buttonFontSize?: ResponsiveNumber
  cardBorderRadius?: ResponsiveNumber
  headerSpacing?: ResponsiveNumber
  deliverableItemPadding?: ResponsiveNumber
  timelineItemWidth?: ResponsiveNumber
  ctaButtonPadding?: ResponsiveNumber
  
  // Layout Controls
  enableGlassEffects?: ResponsiveBoolean
  showDeliverableIcons?: ResponsiveBoolean
  enableAnimations?: ResponsiveBoolean
  
  // Additional Theme Colors
  secondaryColor?: string
  backgroundOpacity?: number
}

/**
 * PremiumShopify Component Props
 * Enhanced component with full responsive controls and type safety
 */
export interface PremiumShopifyProps {
  // Basic Props
  clientName?: string
  projectType?: string
  deliveryDate?: string
  corePackagePrice?: string
  phase2Price?: string
  phase3Price?: string
  
  // Responsive Typography
  headerFontSize?: ResponsiveNumber
  taglineFontSize?: ResponsiveNumber
  packageTitleFontSize?: ResponsiveNumber
  
  // Responsive Spacing
  containerPadding?: ResponsiveNumber
  cardPadding?: ResponsiveNumber
  
  // Responsive Layout
  gridColumns?: ResponsiveNumber
  showNavSubtitle?: ResponsiveBoolean
  enableGlassEffects?: ResponsiveBoolean
  enableAnimations?: ResponsiveBoolean
  
  // Apple HIG Compliance
  buttonMinHeight?: ResponsiveNumber
  
  // Visual Controls
  mobileBackgroundIntensity?: number
  
  // Additional enhancement props
  timelineLayout?: ResponsiveString
  primaryColor?: string
  accentColor?: string
}

// Property Control Type Maps
export type PropertyControls<T> = {
  [K in keyof T]: T[K] extends ResponsiveNumber
    ? ResponsiveNumberControl
    : T[K] extends ResponsiveBoolean
    ? ResponsiveBooleanControl
    : T[K] extends string
    ? StringControl
    : T[K] extends number
    ? NumberControl
    : any
}

// Utility Types
export type FramerComponent<P = any> = React.ComponentType<P> & {
  propertyControls?: PropertyControls<P>
}

// Responsive CSS Generator Types
export interface ResponsiveCSSConfig {
  property: string
  values: ResponsiveNumber | ResponsiveBoolean | ResponsiveString
  unit?: string
  selector?: string
}

// Apple HIG Compliance Types
export interface AppleHIGCompliantProps {
  // Touch target requirements
  minTouchTarget: ResponsiveNumber // Default: 44px desktop, 56px mobile
  
  // Typography scale
  fontSizeScale: ResponsiveNumber // Follows Apple's Dynamic Type
  
  // Spacing system
  spacingMultiplier: ResponsiveNumber // 8px base grid
  
  // Color contrast
  contrastRatio: number // WCAG AA: 4.5:1, AAA: 7:1
}

// Component Enhancement Status
export interface ComponentStatus {
  hasResponsiveControls: boolean
  hasTypeDefinitions: boolean
  hasAppleHIGCompliance: boolean
  missingFeatures: string[]
  enhancementsPending: string[]
}

// Analysis Results
export const COMPONENT_ANALYSIS = {
  PetersenShopify: {
    hasResponsiveControls: true,
    hasTypeDefinitions: false,
    hasAppleHIGCompliance: true,
    missingFeatures: ['TypeScript interfaces', 'Prop type validation'],
    enhancementsPending: ['Add proper type definitions', 'Export prop interfaces']
  } as ComponentStatus,
  
  PremiumShopify: {
    hasResponsiveControls: false,
    hasTypeDefinitions: false,
    hasAppleHIGCompliance: false,
    missingFeatures: [
      'ResponsiveNumber controls',
      'ResponsiveBoolean controls', 
      'TypeScript interfaces',
      'Apple HIG touch targets',
      'Responsive layout system'
    ],
    enhancementsPending: [
      'Add ResponsiveNumber/ResponsiveBoolean controls',
      'Implement type definitions',
      'Update touch target compliance',
      'Create responsive grid system'
    ]
  } as ComponentStatus
}

// CSS-in-JS Responsive Helper
export const generateResponsiveCSS = (config: ResponsiveCSSConfig): string => {
  const { property, values, unit = '', selector = '' } = config
  
  if (typeof values === 'object' && 'default' in values) {
    const responsive = values as ResponsiveValue<any>
    
    return `
      ${selector} {
        ${property}: ${responsive.default}${unit};
      }
      
      @media (max-width: 1024px) {
        ${selector} {
          ${property}: ${responsive.tablet || responsive.default}${unit};
        }
      }
      
      @media (max-width: 768px) {
        ${selector} {
          ${property}: ${responsive.mobile || responsive.tablet || responsive.default}${unit};
        }
      }
    `
  }
  
  return `${selector} { ${property}: ${values}${unit}; }`
}

export default {
  ResponsiveNumber,
  ResponsiveBoolean,
  ResponsiveString,
  PetersenShopifyProps,
  PremiumShopifyProps,
  PropertyControls,
  generateResponsiveCSS,
  COMPONENT_ANALYSIS
}