/**
 * QuantumSpatial_2 Usage Examples
 * Demonstrates integration patterns for the Quantum Spatial background component
 */

import React from 'react';
import { QuantumSpatial_2 } from './QuantumSpatial_2';

// EXAMPLE 1: Hero Section with Quantum Background
export function HeroWithQuantumBackground() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Quantum Spatial Background */}
      <div className="absolute inset-0 -z-10">
        <QuantumSpatial_2
          width={1920}
          height={1080}
          animationSpeed={1}
          ariaLabel="Hero section quantum spatial background"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <h1
          className="text-7xl font-bold text-white mb-6 text-center"
          style={{ fontFamily: 'SF Pro Display, -apple-system, system-ui, sans-serif' }}
        >
          9Bit Studios
        </h1>

        <p
          className="text-2xl text-white/80 mb-12 text-center max-w-2xl"
          style={{ fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif' }}
        >
          M4-Accelerated Creative Workflows with Privacy-First Quantum Spatial Intelligence
        </p>

        <button
          className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-full text-white text-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          Explore Platform
        </button>
      </div>
    </section>
  );
}

// EXAMPLE 2: Product Card with Quantum Background
export function QuantumProductCard() {
  return (
    <article className="relative w-full max-w-md h-96 rounded-2xl overflow-hidden shadow-2xl">
      {/* Quantum Background (contained) */}
      <div className="absolute inset-0">
        <QuantumSpatial_2
          width={400}
          height={384}
          animationSpeed={0.7}
          ariaLabel="Product card background"
        />
      </div>

      {/* Glassmorphism Content Layer */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 via-transparent to-transparent">
        <h3
          className="text-3xl font-bold text-white mb-2"
          style={{ fontFamily: 'SF Pro Display, -apple-system, system-ui, sans-serif' }}
        >
          Oksana Creator Portal
        </h3>

        <p
          className="text-lg text-white/90 mb-4"
          style={{ fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif' }}
        >
          AI-powered creative intelligence for the Apple ecosystem
        </p>

        <button
          className="px-6 py-3 bg-white/20 backdrop-blur-lg rounded-full text-white font-semibold border border-white/30 hover:bg-white/30 transition-all"
          style={{ minWidth: '44px', minHeight: '44px' }}
          aria-label="Learn more about Oksana Creator Portal"
        >
          Learn More
        </button>
      </div>
    </article>
  );
}

// EXAMPLE 3: Full-Page Dashboard Background
export function DashboardWithQuantumBackground() {
  return (
    <div className="relative min-h-screen">
      {/* Quantum Background */}
      <QuantumSpatial_2
        width={1920}
        height={1080}
        animationSpeed={0.8}
        className="fixed inset-0 -z-10"
        ariaLabel="Dashboard quantum spatial background"
      />

      {/* Dashboard Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1
            className="text-5xl font-bold text-white mb-2"
            style={{ fontFamily: 'SF Pro Display, -apple-system, system-ui, sans-serif' }}
          >
            Creative Dashboard
          </h1>
          <p
            className="text-xl text-white/80"
            style={{ fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif' }}
          >
            M4-accelerated quantum spatial workflows
          </p>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10"
            >
              <h3
                className="text-xl font-semibold text-white mb-2"
                style={{ fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif' }}
              >
                Project {item}
              </h3>
              <p className="text-white/70">
                Quantum spatial component design
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// EXAMPLE 4: Modal with Quantum Background
export function QuantumModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with Quantum Background */}
      <div className="absolute inset-0" onClick={onClose}>
        <QuantumSpatial_2
          width={1920}
          height={1080}
          animationSpeed={0.5}
          className="blur-sm opacity-90"
          ariaLabel="Modal backdrop"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-2xl p-8 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
          style={{ minWidth: '44px', minHeight: '44px' }}
          aria-label="Close modal"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <h2
          className="text-4xl font-bold text-white mb-4"
          style={{ fontFamily: 'SF Pro Display, -apple-system, system-ui, sans-serif' }}
        >
          Quantum Spatial Modal
        </h2>

        <p
          className="text-lg text-white/90 mb-6"
          style={{ fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif' }}
        >
          Experience the future of creative intelligence with M4-accelerated quantum spatial design.
        </p>

        <button
          className="px-8 py-4 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold border border-white/30 hover:bg-white/30 transition-all"
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

// EXAMPLE 5: Responsive Hero with Device-Specific Animation Speed
export function ResponsiveQuantumHero() {
  const [animationSpeed, setAnimationSpeed] = React.useState(1);

  React.useEffect(() => {
    // Detect device capability and adjust animation speed
    const updateAnimationSpeed = () => {
      const width = window.innerWidth;
      const cores = navigator.hardwareConcurrency || 4;

      if (width < 768) {
        // Mobile: slower or disabled animations
        setAnimationSpeed(cores < 4 ? 0 : 0.5);
      } else if (width < 1024) {
        // Tablet: moderate animations
        setAnimationSpeed(0.8);
      } else {
        // Desktop: full animations
        setAnimationSpeed(1);
      }
    };

    updateAnimationSpeed();
    window.addEventListener('resize', updateAnimationSpeed);
    return () => window.removeEventListener('resize', updateAnimationSpeed);
  }, []);

  return (
    <section className="relative min-h-screen">
      {/* Responsive Quantum Background */}
      <div className="absolute inset-0 -z-10">
        <QuantumSpatial_2
          animationSpeed={animationSpeed}
          reducedMotion={animationSpeed === 0}
          ariaLabel="Responsive quantum spatial background"
        />
      </div>

      {/* Responsive Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            style={{ fontFamily: 'SF Pro Display, -apple-system, system-ui, sans-serif' }}
          >
            Adaptive Quantum Design
          </h1>

          <p
            className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto"
            style={{ fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif' }}
          >
            Performance-optimized for every device
          </p>
        </div>
      </div>
    </section>
  );
}

// EXAMPLE 6: Accessibility-First Implementation
export function AccessibleQuantumSection() {
  // Respect user's motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      className="relative min-h-screen"
      role="region"
      aria-label="Quantum spatial design showcase"
    >
      {/* Quantum Background with Accessibility */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true" // Decorative element
      >
        <QuantumSpatial_2
          reducedMotion={prefersReducedMotion}
          ariaLabel="Decorative quantum spatial background"
        />
      </div>

      {/* High-Contrast Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl text-center">
          <h1
            className="text-6xl font-bold text-white mb-6"
            style={{
              fontFamily: 'SF Pro Display, -apple-system, system-ui, sans-serif',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)' // Ensure 4.5:1 contrast
            }}
          >
            Accessibility-First Design
          </h1>

          <p
            className="text-2xl text-white mb-8"
            style={{
              fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
              textShadow: '0 1px 5px rgba(0,0,0,0.5)'
            }}
          >
            Quantum spatial aesthetics that respect every user's preferences
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-all focus:outline-none focus:ring-4 focus:ring-white/50"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              Primary Action
            </button>

            <button
              className="px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-full font-semibold border border-white/30 hover:bg-white/30 transition-all focus:outline-none focus:ring-4 focus:ring-white/50"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              Secondary Action
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export all examples
export default {
  HeroWithQuantumBackground,
  QuantumProductCard,
  DashboardWithQuantumBackground,
  QuantumModal,
  ResponsiveQuantumHero,
  AccessibleQuantumSection
};
