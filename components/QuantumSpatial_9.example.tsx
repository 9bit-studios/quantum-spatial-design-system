import React from 'react';
import { QuantumSpatial_9 } from './QuantumSpatial_9';
import styles from './QuantumSpatial_9.module.css';

/**
 * QuantumSpatial_9 Usage Examples
 *
 * Demonstrates various implementations of the quantum-spatial component
 * across different contexts within the 9Bit Studios ecosystem.
 */

// Example 1: Hero Section Logo (Large, Animated)
export const HeroLogo: React.FC = () => {
  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A0E27 0%, #1a1f3a 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className={styles.quantumContainer}>
        <div className={styles.quantumGlow} />
        <div className={styles.glassmorphismPanel} />
        <QuantumSpatial_9
          size={400}
          animated={true}
          animationSpeed={1.2}
          ariaLabel="9Bit Studios - Quantum Spatial Intelligence"
        />
      </div>
    </section>
  );
};

// Example 2: Navigation Logo (Small, Static for Performance)
export const NavigationLogo: React.FC = () => {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px 24px',
        background: 'rgba(10, 14, 39, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <a
        href="/"
        style={{ display: 'flex', alignItems: 'center' }}
        aria-label="9Bit Studios Home"
      >
        <QuantumSpatial_9
          size={48}
          animated={false}
          ariaLabel="9Bit Studios Logo"
        />
        <span
          style={{
            marginLeft: '12px',
            fontFamily: 'SF Pro Display, -apple-system, system-ui, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            color: '#FFFFFF'
          }}
        >
          9Bit Studios
        </span>
      </a>
    </nav>
  );
};

// Example 3: Loading Spinner (Medium, Fast Animation)
export const LoadingSpinner: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        padding: '48px'
      }}
      role="status"
      aria-live="polite"
    >
      <QuantumSpatial_9
        size={120}
        animated={true}
        animationSpeed={2}
        ariaLabel="Loading content"
      />
      <p
        style={{
          fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
          fontSize: '17px',
          color: 'rgba(255, 255, 255, 0.7)',
          margin: 0
        }}
      >
        Initializing quantum workspace...
      </p>
    </div>
  );
};

// Example 4: Custom Color Scheme (Brand Variant)
export const BrandVariantLogo: React.FC = () => {
  return (
    <div className={styles.quantumContainer}>
      <QuantumSpatial_9
        size={200}
        animated={true}
        accentColor="#7C3AED" // Purple variant
        secondaryColor="#10B981" // Green variant
        ariaLabel="9Bit Studios Alternative Branding"
      />
    </div>
  );
};

// Example 5: Card Accent (Small, Subtle)
export const CardAccent: React.FC = () => {
  return (
    <article
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '400px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <QuantumSpatial_9
          size={64}
          animated={true}
          animationSpeed={0.5}
        />
        <div>
          <h3
            style={{
              fontFamily: 'SF Pro Display, -apple-system, system-ui, sans-serif',
              fontSize: '20px',
              fontWeight: 600,
              color: '#FFFFFF',
              margin: '0 0 8px 0'
            }}
          >
            Quantum Workspace
          </h3>
          <p
            style={{
              fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
              fontSize: '15px',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: 0
            }}
          >
            M4-accelerated creative intelligence powered by spatial design
          </p>
        </div>
      </div>
    </article>
  );
};

// Example 6: Responsive Implementation
export const ResponsiveLogo: React.FC = () => {
  const [logoSize, setLogoSize] = React.useState(200);

  React.useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) {
        setLogoSize(120); // Mobile
      } else if (window.innerWidth < 1024) {
        setLogoSize(160); // Tablet
      } else {
        setLogoSize(200); // Desktop
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className={styles.quantumContainer}>
      <QuantumSpatial_9
        size={logoSize}
        animated={true}
        ariaLabel="9Bit Studios Responsive Logo"
      />
    </div>
  );
};

// Example 7: Accessibility-Focused Implementation
export const AccessibleLogo: React.FC = () => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  return (
    <div className={styles.quantumContainer}>
      <QuantumSpatial_9
        size={200}
        animated={!prefersReducedMotion}
        ariaLabel="9Bit Studios - Privacy-first quantum spatial intelligence platform"
      />
    </div>
  );
};

// Storybook-style Demo Grid
export const DemoGrid: React.FC = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px',
        padding: '48px',
        background: '#0A0E27'
      }}
    >
      <div>
        <h4 style={{ color: '#FFFFFF', marginBottom: '16px' }}>Default</h4>
        <HeroLogo />
      </div>
      <div>
        <h4 style={{ color: '#FFFFFF', marginBottom: '16px' }}>Navigation</h4>
        <NavigationLogo />
      </div>
      <div>
        <h4 style={{ color: '#FFFFFF', marginBottom: '16px' }}>Loading</h4>
        <LoadingSpinner />
      </div>
      <div>
        <h4 style={{ color: '#FFFFFF', marginBottom: '16px' }}>Brand Variant</h4>
        <BrandVariantLogo />
      </div>
      <div>
        <h4 style={{ color: '#FFFFFF', marginBottom: '16px' }}>Card Accent</h4>
        <CardAccent />
      </div>
      <div>
        <h4 style={{ color: '#FFFFFF', marginBottom: '16px' }}>Responsive</h4>
        <ResponsiveLogo />
      </div>
    </div>
  );
};

export default DemoGrid;
