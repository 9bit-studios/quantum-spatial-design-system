/**
 * QuantumSpatial_7 Usage Examples
 * Comprehensive integration patterns for 9Bit Studios projects
 */

import React from 'react';
import { QuantumSpatial_7 } from './QuantumSpatial_7';

// ============================================================================
// Example 1: Hero Section
// ============================================================================

export function HeroWithQuantum() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0E27]">
      {/* Background quantum animation */}
      <div className="absolute inset-0 opacity-30">
        <QuantumSpatial_7 size={1200} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <QuantumSpatial_7 size={300} className="mx-auto mb-8" />

        <h1
          className="text-6xl font-bold text-white mb-4"
          style={{ fontFamily: 'SF Pro Display, -apple-system, system-ui, sans-serif' }}
        >
          9Bit Studios
        </h1>

        <p
          className="text-xl text-white/70 max-w-2xl mx-auto"
          style={{ fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif' }}
        >
          M4-Accelerated Quantum Spatial Intelligence
        </p>

        <button
          className="mt-8 px-8 py-4 bg-gradient-to-r from-[#E85D75] to-[#4ECDC4] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          Explore the Ecosystem
        </button>
      </div>
    </section>
  );
}

// ============================================================================
// Example 2: Loading State
// ============================================================================

export function QuantumLoadingState({ message = 'Initializing...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0E27]">
      <QuantumSpatial_7 size={200} />

      <p
        className="mt-6 text-white/70 text-lg animate-pulse"
        style={{ fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif' }}
      >
        {message}
      </p>
    </div>
  );
}

// ============================================================================
// Example 3: Card Decoration
// ============================================================================

export function QuantumFeatureCard({
  title,
  description,
  icon
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="relative group">
      {/* Glassmorphism container */}
      <div
        className="relative overflow-hidden rounded-2xl p-8"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Background quantum decoration */}
        <div className="absolute -top-20 -right-20 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <QuantumSpatial_7 size={300} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="mb-4">{icon}</div>

          <h3
            className="text-2xl font-semibold text-white mb-3"
            style={{ fontFamily: 'SF Pro Display, -apple-system, system-ui, sans-serif' }}
          >
            {title}
          </h3>

          <p
            className="text-white/70 leading-relaxed"
            style={{ fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif' }}
          >
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

// ============================================================================
// Example 4: Responsive Grid Layout
// ============================================================================

export function QuantumGrid() {
  const features = [
    { title: 'M4 Acceleration', description: 'Neural Engine optimization' },
    { title: 'Spatial Design', description: 'Quantum-spatial aesthetics' },
    { title: 'Privacy First', description: 'On-device processing' }
  ];

  return (
    <section className="py-20 px-4 bg-[#0A0E27]">
      {/* Header with quantum branding */}
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-center mb-16">
          <QuantumSpatial_7 size={150} />
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <QuantumFeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={<QuantumSpatial_7 size={60} />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Example 5: Navigation Logo
// ============================================================================

export function QuantumNavigation() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(10, 14, 39, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          style={{ minWidth: '44px', minHeight: '44px' }}
          aria-label="9Bit Studios Home"
        >
          <QuantumSpatial_7 size={40} />
          <span
            className="text-white font-semibold text-lg"
            style={{ fontFamily: 'SF Pro Display, -apple-system, system-ui, sans-serif' }}
          >
            9Bit Studios
          </span>
        </a>

        {/* Navigation links */}
        <div className="flex gap-6">
          {['Products', 'Services', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/70 hover:text-white transition-colors"
              style={{
                fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ============================================================================
// Example 6: Modal/Dialog with Quantum Background
// ============================================================================

export function QuantumModal({
  isOpen,
  onClose,
  title,
  children
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative max-w-2xl w-full rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(10, 14, 39, 0.95)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 20px 80px rgba(0, 0, 0, 0.5)'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 opacity-20 pointer-events-none">
          <QuantumSpatial_7 size={400} />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2
              id="modal-title"
              className="text-3xl font-bold text-white"
              style={{ fontFamily: 'SF Pro Display, -apple-system, system-ui, sans-serif' }}
            >
              {title}
            </h2>

            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors"
              style={{ minWidth: '44px', minHeight: '44px' }}
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 6L18 18M6 18L18 6" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="text-white/70">{children}</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Example 7: 404 Error Page
// ============================================================================

export function Quantum404Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0A0E27] px-4">
      <div className="text-center">
        {/* Quantum "7" as visual metaphor for error */}
        <QuantumSpatial_7 size={300} className="mx-auto mb-8 opacity-50" />

        <h1
          className="text-6xl font-bold text-white mb-4"
          style={{ fontFamily: 'SF Pro Display, -apple-system, system-ui, sans-serif' }}
        >
          404
        </h1>

        <p
          className="text-xl text-white/70 mb-8"
          style={{ fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif' }}
        >
          Quantum state not found
        </p>

        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#E85D75] to-[#4ECDC4] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          style={{ minWidth: '44px', minHeight: '44px' }}
        >
          Return to Reality
        </a>
      </div>
    </main>
  );
}

// ============================================================================
// Example 8: Animated Section Divider
// ============================================================================

export function QuantumDivider() {
  return (
    <div className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <QuantumSpatial_7 size={600} />
      </div>

      <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent max-w-4xl mx-auto" />
    </div>
  );
}

// ============================================================================
// Example 9: Testimonial Card with Quantum Accent
// ============================================================================

export function QuantumTestimonial({
  quote,
  author,
  role
}: {
  quote: string;
  author: string;
  role: string;
}) {
  return (
    <blockquote
      className="relative p-8 rounded-2xl"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.18)'
      }}
    >
      {/* Quantum accent */}
      <div className="absolute -top-10 -left-10 opacity-30">
        <QuantumSpatial_7 size={120} />
      </div>

      {/* Quote */}
      <p
        className="text-white/90 text-lg leading-relaxed mb-6 relative z-10"
        style={{ fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif' }}
      >
        "{quote}"
      </p>

      {/* Attribution */}
      <footer className="relative z-10">
        <cite
          className="text-white font-semibold not-italic"
          style={{ fontFamily: 'SF Pro Display, -apple-system, system-ui, sans-serif' }}
        >
          {author}
        </cite>
        <p className="text-white/60 text-sm">{role}</p>
      </footer>
    </blockquote>
  );
}

// ============================================================================
// Example 10: Full Page Layout
// ============================================================================

export function QuantumFullPageLayout() {
  return (
    <div className="min-h-screen bg-[#0A0E27]">
      {/* Navigation */}
      <QuantumNavigation />

      {/* Hero */}
      <HeroWithQuantum />

      {/* Divider */}
      <QuantumDivider />

      {/* Features */}
      <QuantumGrid />

      {/* Divider */}
      <QuantumDivider />

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <QuantumTestimonial
            quote="The quantum-spatial design system transformed our product experience. M4 acceleration delivers unmatched performance."
            author="Jane Doe"
            role="Design Director, Tech Corp"
          />
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// Export all examples
// ============================================================================

export const examples = {
  HeroWithQuantum,
  QuantumLoadingState,
  QuantumFeatureCard,
  QuantumGrid,
  QuantumNavigation,
  QuantumModal,
  Quantum404Page,
  QuantumDivider,
  QuantumTestimonial,
  QuantumFullPageLayout
};

export default examples;
