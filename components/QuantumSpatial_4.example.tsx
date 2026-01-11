import React from 'react';
import { QuantumSpatial_4 } from './QuantumSpatial_4';
import styles from './QuantumSpatial_4.module.css';

/**
 * QuantumSpatial_4 Implementation Examples
 *
 * Demonstrates proper usage across different contexts:
 * - Hero sections with quantum-spatial branding
 * - Loading states with cosmic animations
 * - Interactive feature highlights
 * - Responsive layouts with accessibility support
 */

// Example 1: Hero Section with Quantum Branding
export const QuantumHeroExample: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.glassWrapper}>
          <QuantumSpatial_4 size={360} animated={true} />
        </div>
        <h1 className={styles.heroTitle}>
          M4-Accelerated Creative Workflows
        </h1>
        <p className={styles.heroDescription}>
          Seamless Apple ecosystem integration with privacy-first quantum spatial intelligence
        </p>
      </div>
    </section>
  );
};

// Example 2: Loading State Component
export const QuantumLoadingState: React.FC<{ message?: string }> = ({
  message = 'Processing with M4 Neural Engine...'
}) => {
  return (
    <div className={styles.loadingContainer} role="status" aria-live="polite">
      <QuantumSpatial_4 size={120} animated={true} />
      <p className={styles.loadingMessage}>{message}</p>
    </div>
  );
};

// Example 3: Feature Card with Quantum Icon
export const QuantumFeatureCard: React.FC<{
  title: string;
  description: string;
  icon?: React.ReactNode;
}> = ({ title, description, icon }) => {
  return (
    <article className={styles.featureCard}>
      <div className={styles.iconContainer}>
        {icon || <QuantumSpatial_4 size={80} animated={true} />}
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </article>
  );
};

// Example 4: Interactive Quantum Button
export const QuantumButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
}> = ({ children, onClick, loading = false }) => {
  return (
    <button
      className={styles.quantumButton}
      onClick={onClick}
      disabled={loading}
      aria-label={loading ? 'Processing...' : undefined}
    >
      {loading ? (
        <QuantumSpatial_4 size={24} animated={true} />
      ) : (
        children
      )}
    </button>
  );
};

// Example 5: Responsive Grid Layout
export const QuantumGridExample: React.FC = () => {
  const features = [
    {
      title: 'Privacy-First Processing',
      description: 'On-device M4 Neural Engine acceleration for quantum-secure workflows'
    },
    {
      title: 'Spatial Design Intelligence',
      description: 'Glassmorphism effects with liquid-glass quantum-spatial aesthetics'
    },
    {
      title: 'Apple Ecosystem Integration',
      description: 'Seamless integration from Siri to SwiftUI with HIG compliance'
    }
  ];

  return (
    <div className={styles.gridContainer}>
      {features.map((feature, index) => (
        <QuantumFeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

// Example 6: Accessibility-Focused Implementation
export const AccessibleQuantumComponent: React.FC = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className={styles.accessibleContainer}>
      <QuantumSpatial_4
        size={240}
        animated={!prefersReducedMotion}
        aria-label="Quantum spatial design visualization"
      />
      <p className={styles.srOnly}>
        Interactive quantum-spatial visualization representing 9Bit Studios' design philosophy
      </p>
    </div>
  );
};

// Example 7: Complete Page Implementation
export const QuantumSpatialShowcase: React.FC = () => {
  return (
    <main className={styles.showcase}>
      {/* Hero Section */}
      <QuantumHeroExample />

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>
          Quantum-Spatial Intelligence
        </h2>
        <QuantumGridExample />
      </section>

      {/* Interactive Demo */}
      <section className={styles.demoSection}>
        <div className={styles.glassWrapper}>
          <QuantumSpatial_4 size={280} animated={true} />
        </div>
        <div className={styles.demoContent}>
          <h3 className={styles.demoTitle}>
            Experience M4-Optimized Performance
          </h3>
          <p className={styles.demoDescription}>
            Sub-second design token processing with quantum-secure API integration
          </p>
          <QuantumButton onClick={() => console.log('Launch Quantum Workflow')}>
            Launch Quantum Workflow
          </QuantumButton>
        </div>
      </section>
    </main>
  );
};

// CSS for Examples (styles.module.css additions)
const exampleStyles = `
/* Hero Section */
.heroSection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: var(--space-xl, 32px);
  background: linear-gradient(180deg, #0A0E27 0%, #1A1E3F 100%);
}

.heroContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg, 24px);
  max-width: 800px;
  text-align: center;
}

.heroTitle {
  font-family: var(--font-display, 'SF Pro Display', -apple-system, system-ui, sans-serif);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-primary, #FFFFFF);
  margin: 0;
}

.heroDescription {
  font-family: var(--font-text, 'SF Pro Text', -apple-system, system-ui, sans-serif);
  font-size: 20px;
  line-height: 1.6;
  color: var(--text-secondary, rgba(255, 255, 255, 0.7));
  margin: 0;
}

/* Loading State */
.loadingContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md, 16px);
  padding: var(--space-xl, 32px);
}

.loadingMessage {
  font-family: var(--font-text, 'SF Pro Text', -apple-system, system-ui, sans-serif);
  font-size: 17px;
  color: var(--text-secondary, rgba(255, 255, 255, 0.7));
  margin: 0;
}

/* Feature Card */
.featureCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md, 16px);
  padding: var(--space-lg, 24px);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  text-align: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.featureCard:hover {
  transform: translateY(-4px);
  border-color: rgba(78, 205, 196, 0.4);
}

.iconContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
}

.featureTitle {
  font-family: var(--font-display, 'SF Pro Display', -apple-system, system-ui, sans-serif);
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-primary, #FFFFFF);
  margin: 0;
}

.featureDescription {
  font-family: var(--font-text, 'SF Pro Text', -apple-system, system-ui, sans-serif);
  font-size: 17px;
  line-height: 1.5;
  color: var(--text-secondary, rgba(255, 255, 255, 0.7));
  margin: 0;
}

/* Quantum Button */
.quantumButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--min-touch-target, 44px);
  min-height: var(--min-touch-target, 44px);
  padding: 12px 24px;
  font-family: var(--font-text, 'SF Pro Text', -apple-system, system-ui, sans-serif);
  font-size: 17px;
  font-weight: 600;
  color: #FFFFFF;
  background: linear-gradient(135deg, #E85D75 0%, #4ECDC4 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.quantumButton:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(78, 205, 196, 0.3);
}

.quantumButton:active:not(:disabled) {
  transform: translateY(0);
}

.quantumButton:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.quantumButton:focus-visible {
  outline: 2px solid #4ECDC4;
  outline-offset: 4px;
}

/* Grid Layout */
.gridContainer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg, 24px);
  padding: var(--space-xl, 32px);
}

/* Accessibility */
.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Responsive Breakpoints */
@media (max-width: 768px) {
  .heroTitle {
    font-size: 32px;
  }

  .heroDescription {
    font-size: 17px;
  }

  .gridContainer {
    grid-template-columns: 1fr;
    gap: var(--space-md, 16px);
    padding: var(--space-md, 16px);
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .featureCard,
  .quantumButton {
    transition: none;
  }

  .featureCard:hover {
    transform: none;
  }

  .quantumButton:hover:not(:disabled) {
    transform: none;
  }
}
`;

export { exampleStyles };
