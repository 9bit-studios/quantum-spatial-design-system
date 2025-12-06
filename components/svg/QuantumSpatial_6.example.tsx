/**
 * QuantumSpatial_6 Usage Examples
 * Demonstrates various implementations and configurations
 */

import React from 'react';
import { QuantumSpatial_6 } from './QuantumSpatial_6';
import styles from './QuantumSpatial_6.module.css';

// Example 1: Hero Section with Glassmorphism
export const HeroExample = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.glassContainer}>
        <QuantumSpatial_6
          width={600}
          height={600}
          animated={true}
          accentColor="#E85D75"
          className={styles.responsive}
        />
      </div>
    </section>
  );
};

// Example 2: Loading State with Animation
export const LoadingExample = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.quantumContainer}>
      {isLoading ? (
        <QuantumSpatial_6
          width={400}
          height={400}
          animated={true}
          className={styles.loading}
        />
      ) : (
        <div style={{ padding: '32px', color: '#FFFFFF' }}>
          <h2>Content Loaded</h2>
          <p>M4-accelerated quantum spatial processing complete</p>
        </div>
      )}
    </div>
  );
};

// Example 3: Interactive Card
export const InteractiveCardExample = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className={`${styles.glassContainer} ${styles.interactive}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label="Quantum spatial interactive visualization"
    >
      <QuantumSpatial_6
        width={300}
        height={300}
        animated={isHovered}
        accentColor={isHovered ? '#4ECDC4' : '#E85D75'}
        className={styles.responsive}
      />
    </div>
  );
};

// Example 4: Multiple Color Variants
export const ColorVariantsExample = () => {
  const variants = [
    { name: 'Primary', color: '#E85D75' },
    { name: 'Secondary', color: '#4ECDC4' },
    { name: 'Tertiary', color: '#9B59B6' },
    { name: 'Success', color: '#2ECC71' }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        padding: '32px'
      }}
    >
      {variants.map((variant) => (
        <div key={variant.name} className={styles.glassContainer}>
          <div style={{ textAlign: 'center' }}>
            <QuantumSpatial_6
              width={200}
              height={200}
              animated={true}
              accentColor={variant.color}
              className={styles.responsive}
            />
            <p
              style={{
                marginTop: '16px',
                fontFamily: 'SF Pro Text, -apple-system, system-ui',
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.9)'
              }}
            >
              {variant.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Example 5: Responsive Grid Layout
export const ResponsiveGridExample = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px',
        padding: '32px',
        background: 'linear-gradient(135deg, #0A0E27 0%, #1a1f3a 100%)'
      }}
    >
      {[1, 2, 3].map((item) => (
        <div key={item} className={styles.glassContainer}>
          <QuantumSpatial_6
            width={300}
            height={300}
            animated={true}
            className={styles.responsive}
          />
          <div
            style={{
              marginTop: '16px',
              fontFamily: 'SF Pro Text, -apple-system, system-ui',
              color: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
              Quantum Feature {item}
            </h3>
            <p style={{ fontSize: '14px', lineHeight: 1.6, opacity: 0.8 }}>
              M4-accelerated spatial intelligence with privacy-first quantum processing
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Example 6: Accessibility-First Implementation
export const AccessibleExample = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className={styles.glassContainer}>
      <QuantumSpatial_6
        width={400}
        height={400}
        animated={!prefersReducedMotion}
        className={styles.responsive}
      />
      <div
        style={{
          marginTop: '16px',
          fontFamily: 'SF Pro Text, -apple-system, system-ui',
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '14px'
        }}
      >
        <p>
          Animation Status: {prefersReducedMotion ? 'Disabled (Respecting User Preference)' : 'Active'}
        </p>
      </div>
    </div>
  );
};

// Example 7: Complete Product Feature Section
export const ProductFeatureExample = () => {
  return (
    <section
      style={{
        padding: '80px 32px',
        background: 'linear-gradient(135deg, #0A0E27 0%, #1a1f3a 100%)',
        textAlign: 'center'
      }}
    >
      <h2
        style={{
          fontFamily: 'SF Pro Display, -apple-system, system-ui',
          fontSize: '48px',
          fontWeight: 700,
          color: '#FFFFFF',
          marginBottom: '16px'
        }}
      >
        Quantum Spatial Intelligence
      </h2>
      <p
        style={{
          fontFamily: 'SF Pro Text, -apple-system, system-ui',
          fontSize: '20px',
          color: 'rgba(255, 255, 255, 0.7)',
          maxWidth: '600px',
          margin: '0 auto 48px',
          lineHeight: 1.6
        }}
      >
        M4-accelerated creative workflows with privacy-first quantum spatial processing
      </p>

      <div className={styles.glassContainer} style={{ display: 'inline-flex' }}>
        <QuantumSpatial_6
          width={500}
          height={500}
          animated={true}
          className={styles.responsive}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          marginTop: '64px',
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        {[
          {
            title: 'M4 Acceleration',
            description: 'Neural engine optimization for sub-second processing'
          },
          {
            title: 'Privacy First',
            description: 'On-device processing with quantum-secure APIs'
          },
          {
            title: 'Spatial Design',
            description: 'Glassmorphism and liquid-glass quantum aesthetics'
          }
        ].map((feature, index) => (
          <div
            key={index}
            style={{
              fontFamily: 'SF Pro Text, -apple-system, system-ui',
              color: '#FFFFFF'
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
              {feature.title}
            </h3>
            <p style={{ fontSize: '16px', opacity: 0.8, lineHeight: 1.6 }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Export all examples
export default {
  HeroExample,
  LoadingExample,
  InteractiveCardExample,
  ColorVariantsExample,
  ResponsiveGridExample,
  AccessibleExample,
  ProductFeatureExample
};
