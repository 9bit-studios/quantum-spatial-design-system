/**
 * QuantumSpatial_8 Component - Usage Examples
 * Comprehensive integration patterns for React/Next.js
 */

import React, { useState } from 'react';
import { QuantumSpatial8 } from './QuantumSpatial_8';
import styles from './QuantumSpatial_8.examples.module.css';

// ============================================================================
// Example 1: Hero Section with Quantum Animation
// ============================================================================

export function HeroSectionExample() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        <QuantumSpatial8 size={800} speed={0.5} />
      </div>

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Quantum Spatial Intelligence
        </h1>
        <p className={styles.heroSubtitle}>
          M4-accelerated creative workflows with privacy-first quantum spatial design
        </p>
        <button className={styles.heroCTA}>
          Explore the Portal
        </button>
      </div>
    </section>
  );
}

// ============================================================================
// Example 2: Loading State Indicator
// ============================================================================

export function LoadingStateExample() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.loadingContainer}>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <QuantumSpatial8 size={200} speed={1.5} />
          <p className={styles.loadingText}>
            Initializing quantum pathways...
          </p>
          <div className={styles.loadingProgress}>
            <div className={styles.progressBar} />
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Example 3: Interactive Button with Quantum Effect
// ============================================================================

export function QuantumButtonExample() {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      className={`${styles.quantumButton} ${isActive ? styles.active : ''}`}
      onClick={() => setIsActive(!isActive)}
      aria-label="Activate quantum mode"
      aria-pressed={isActive}
    >
      <div className={styles.buttonIcon}>
        <QuantumSpatial8 size={64} speed={isActive ? 2 : 1} />
      </div>
      <span className={styles.buttonLabel}>
        {isActive ? 'Quantum Active' : 'Activate Quantum'}
      </span>
    </button>
  );
}

// ============================================================================
// Example 4: Brand Identity Card
// ============================================================================

export function BrandIdentityExample() {
  return (
    <article className={styles.brandCard}>
      <div className={styles.brandIcon}>
        <QuantumSpatial8 size={300} />
      </div>

      <div className={styles.brandContent}>
        <h2 className={styles.brandTitle}>9Bit Studios</h2>
        <p className={styles.brandTagline}>Quantum Spatial Design</p>

        <div className={styles.brandFeatures}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🧠</span>
            <span>M4 Accelerated</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🔒</span>
            <span>Privacy First</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>✨</span>
            <span>Quantum Spatial</span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ============================================================================
// Example 5: Background Decoration (Non-Interactive)
// ============================================================================

export function BackgroundDecorationExample() {
  return (
    <div className={styles.decoratedSection}>
      <div className={styles.backgroundDecoration} aria-hidden="true">
        <QuantumSpatial8 size={1200} speed={0.3} />
      </div>

      <div className={styles.decoratedContent}>
        <h2>Privacy-First AI Intelligence</h2>
        <p>
          Experience the power of M4 Neural Engine acceleration with
          quantum-spatial design principles that prioritize your privacy.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Example 6: Feature Showcase with Multiple Instances
// ============================================================================

export function FeatureShowcaseExample() {
  const features = [
    {
      title: 'Strategic Intelligence',
      description: 'Executive-level planning and coordination',
      speed: 1.0,
    },
    {
      title: 'Creative Intelligence',
      description: 'Brand-aware content generation',
      speed: 1.2,
    },
    {
      title: 'Visual Intelligence',
      description: 'Design-to-code automation',
      speed: 0.8,
    },
  ];

  return (
    <section className={styles.featureGrid}>
      {features.map((feature, index) => (
        <article key={index} className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <QuantumSpatial8 size={150} speed={feature.speed} />
          </div>
          <h3 className={styles.featureTitle}>{feature.title}</h3>
          <p className={styles.featureDescription}>{feature.description}</p>
        </article>
      ))}
    </section>
  );
}

// ============================================================================
// Example 7: Modal/Dialog with Quantum Theme
// ============================================================================

export function QuantumModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={styles.openModalButton}>
        Open Quantum Portal
      </button>

      {isOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalIcon}>
              <QuantumSpatial8 size={200} speed={1.5} />
            </div>

            <h2 id="modal-title" className={styles.modalTitle}>
              Quantum Portal Activated
            </h2>

            <p className={styles.modalDescription}>
              You've entered the quantum-spatial intelligence realm. All systems
              are M4-accelerated and privacy-secured.
            </p>

            <div className={styles.modalActions}>
              <button
                className={styles.modalButtonPrimary}
                onClick={() => setIsOpen(false)}
              >
                Continue
              </button>
              <button
                className={styles.modalButtonSecondary}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================================
// Example 8: Status Indicator with Animation Control
// ============================================================================

type StatusType = 'idle' | 'processing' | 'success' | 'error';

export function StatusIndicatorExample() {
  const [status, setStatus] = useState<StatusType>('idle');

  const statusConfig = {
    idle: { speed: 0.5, label: 'Ready' },
    processing: { speed: 2, label: 'Processing...' },
    success: { speed: 1, label: 'Complete' },
    error: { speed: 0.3, label: 'Error' },
  };

  return (
    <div className={styles.statusContainer}>
      <div className={styles.statusIndicator}>
        <QuantumSpatial8
          size={100}
          speed={statusConfig[status].speed}
          className={styles[`status-${status}`]}
        />
      </div>

      <p className={styles.statusLabel}>{statusConfig[status].label}</p>

      <div className={styles.statusControls}>
        <button onClick={() => setStatus('idle')}>Idle</button>
        <button onClick={() => setStatus('processing')}>Processing</button>
        <button onClick={() => setStatus('success')}>Success</button>
        <button onClick={() => setStatus('error')}>Error</button>
      </div>
    </div>
  );
}

// ============================================================================
// Example 9: Responsive Sizing Demonstration
// ============================================================================

export function ResponsiveSizingExample() {
  return (
    <div className={styles.responsiveDemo}>
      <div className={styles.sizeVariant}>
        <h3>Small (200px)</h3>
        <QuantumSpatial8 size={200} className="quantumSpatial8--small" />
      </div>

      <div className={styles.sizeVariant}>
        <h3>Medium (400px)</h3>
        <QuantumSpatial8 size={400} className="quantumSpatial8--medium" />
      </div>

      <div className={styles.sizeVariant}>
        <h3>Large (600px)</h3>
        <QuantumSpatial8 size={600} className="quantumSpatial8--large" />
      </div>
    </div>
  );
}

// ============================================================================
// Example 10: Accessibility-First Implementation
// ============================================================================

export function AccessibleQuantumExample() {
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect user's motion preference
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <section className={styles.accessibleSection}>
      <div className={styles.accessibilityControls}>
        <label className={styles.controlLabel}>
          <input
            type="checkbox"
            checked={reducedMotion}
            onChange={(e) => setReducedMotion(e.target.checked)}
            className={styles.checkbox}
          />
          <span>Reduce Motion (Accessibility)</span>
        </label>
      </div>

      <div className={styles.accessibleContent}>
        <QuantumSpatial8
          size={300}
          reducedMotion={reducedMotion}
          className={reducedMotion ? styles.staticVersion : ''}
        />

        <div className={styles.accessibilityInfo}>
          <h3>Accessibility Features</h3>
          <ul>
            <li>✅ Respects prefers-reduced-motion</li>
            <li>✅ WCAG AA color contrast</li>
            <li>✅ Screen reader labels</li>
            <li>✅ Keyboard navigation (when interactive)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Example 11: Performance-Optimized Lazy Loading
// ============================================================================

export function LazyLoadedQuantumExample() {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.lazyContainer}>
      {isVisible ? (
        <QuantumSpatial8 size={400} className="quantumSpatial8Loading" />
      ) : (
        <div className={styles.placeholder}>
          <p>Loading quantum animation...</p>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Example 12: Complete Page Layout
// ============================================================================

export function CompletePageExample() {
  return (
    <main className={styles.completePage}>
      {/* Hero Section */}
      <HeroSectionExample />

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>
          Multi-Agent Intelligence System
        </h2>
        <FeatureShowcaseExample />
      </section>

      {/* Brand Identity */}
      <section className={styles.brandSection}>
        <BrandIdentityExample />
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBackground}>
          <QuantumSpatial8 size={600} speed={0.5} />
        </div>
        <div className={styles.ctaContent}>
          <h2>Ready to Experience Quantum Spatial Intelligence?</h2>
          <QuantumButtonExample />
        </div>
      </section>
    </main>
  );
}

// Export all examples
export const examples = {
  HeroSectionExample,
  LoadingStateExample,
  QuantumButtonExample,
  BrandIdentityExample,
  BackgroundDecorationExample,
  FeatureShowcaseExample,
  QuantumModalExample,
  StatusIndicatorExample,
  ResponsiveSizingExample,
  AccessibleQuantumExample,
  LazyLoadedQuantumExample,
  CompletePageExample,
};

export default examples;
