/**
 * QuantumSpatial_11 Integration Examples
 *
 * Comprehensive usage examples for different contexts:
 * - Landing pages
 * - Product cards
 * - Loading states
 * - Brand sections
 * - Hero sections
 */

import React from 'react';
import { QuantumSpatial_11 } from './QuantumSpatial_11';
import styles from './QuantumSpatial_11.module.css';

// ============================================================================
// EXAMPLE 1: Hero Section (Landing Page)
// ============================================================================

export function HeroWithQuantumVisual() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#1a1e3f] to-[#0A0E27]" />

      {/* Quantum Visual */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        <div className={styles.glassCard}>
          <QuantumSpatial_11
            width={500}
            height={500}
            animated={true}
            className="w-full h-auto max-w-lg"
          />
        </div>

        {/* Content */}
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            M4-Accelerated Creative Workflows
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Privacy-first quantum spatial intelligence powered by Apple Intelligence
          </p>
          <button className="px-8 py-4 bg-[#E85D75] hover:bg-[#d54a65] text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-[#E85D75]/50 min-h-[44px]">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// EXAMPLE 2: Premium Product Card (Petersen Games)
// ============================================================================

interface ProductCardProps {
  product: {
    title: string;
    description: string;
    price: string;
    imageUrl: string;
  };
}

export function PetersenProductCard({ product }: ProductCardProps) {
  return (
    <article className="relative group">
      <div className={styles.glassCard}>
        {/* Quantum Visual Background */}
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
          <QuantumSpatial_11
            width={400}
            height={400}
            animated={true}
            primaryColor="#8B0000"
            secondaryColor="#4A0E4E"
            accentColor="#C41E3A"
          />
        </div>

        {/* Product Content */}
        <div className="relative z-10 p-6">
          <div className="aspect-square mb-4 rounded-lg overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <h3 className="text-2xl font-semibold text-white mb-2">
            {product.title}
          </h3>

          <p className="text-white/70 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-[#E85D75]">
              {product.price}
            </span>
            <button
              className="px-6 py-3 bg-[#E85D75] hover:bg-[#d54a65] text-white rounded-lg font-semibold transition-all duration-300 min-h-[44px] min-w-[44px]"
              aria-label={`Add ${product.title} to cart`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// ============================================================================
// EXAMPLE 3: Loading State (Animated Spinner)
// ============================================================================

export function QuantumLoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="relative">
        <QuantumSpatial_11
          width={120}
          height={120}
          animated={true}
        />
        <p className="text-center mt-4 text-white/70 text-sm">
          Loading quantum intelligence...
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE 4: Feature Section with Icons
// ============================================================================

const features = [
  {
    id: 1,
    title: 'M4 Neural Engine',
    description: '16-core acceleration for instant AI processing',
    color: { primary: '#E85D75', secondary: '#4ECDC4', accent: '#A78BFA' }
  },
  {
    id: 2,
    title: 'Privacy-First',
    description: 'On-device processing with quantum-secure APIs',
    color: { primary: '#4ECDC4', secondary: '#A78BFA', accent: '#E85D75' }
  },
  {
    id: 3,
    title: 'Spatial Design',
    description: 'Glassmorphism and liquid-glass aesthetics',
    color: { primary: '#A78BFA', secondary: '#E85D75', accent: '#4ECDC4' }
  }
];

export function QuantumFeatureGrid() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Quantum-Powered Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className={styles.glassCard}>
              <div className="flex flex-col items-center text-center">
                <div className={styles.iconSize}>
                  <QuantumSpatial_11
                    width={64}
                    height={64}
                    animated={true}
                    primaryColor={feature.color.primary}
                    secondaryColor={feature.color.secondary}
                    accentColor={feature.color.accent}
                  />
                </div>

                <h3 className="text-xl font-semibold text-white mt-4 mb-2">
                  {feature.title}
                </h3>

                <p className="text-white/70 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// EXAMPLE 5: About Section (Brand Story)
// ============================================================================

export function QuantumBrandSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Quantum Visual */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <QuantumSpatial_11
          width={800}
          height={800}
          animated={true}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className={styles.glassCard}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <QuantumSpatial_11
                width={400}
                height={400}
                animated={true}
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Quantum Spatial Intelligence
              </h2>
              <p className="text-white/80 mb-4">
                Powered by M4 Neural Engine acceleration, our quantum-spatial design
                system combines glassmorphism aesthetics with privacy-first AI processing.
              </p>
              <p className="text-white/80 mb-6">
                Seamlessly integrated with the Apple ecosystem, from Siri to SwiftUI,
                delivering sub-second creative workflows with on-device intelligence.
              </p>
              <button className="px-6 py-3 bg-[#E85D75] hover:bg-[#d54a65] text-white rounded-lg font-semibold transition-all duration-300 min-h-[44px]">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// EXAMPLE 6: Modal/Dialog with Quantum Visual
// ============================================================================

interface QuantumModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function QuantumModal({ isOpen, onClose, title, children }: QuantumModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`${styles.glassCard} max-w-2xl w-full relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Quantum Visual Header */}
        <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden opacity-20">
          <QuantumSpatial_11
            width={600}
            height={200}
            animated={true}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 id="modal-title" className="text-2xl font-bold text-white">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="text-white/80">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE 7: Status/Progress Indicator
// ============================================================================

interface QuantumStatusProps {
  status: 'processing' | 'success' | 'error';
  message: string;
}

export function QuantumStatusIndicator({ status, message }: QuantumStatusProps) {
  const statusColors = {
    processing: { primary: '#E85D75', secondary: '#4ECDC4', accent: '#A78BFA' },
    success: { primary: '#10B981', secondary: '#34D399', accent: '#6EE7B7' },
    error: { primary: '#EF4444', secondary: '#F87171', accent: '#FCA5A5' }
  };

  const colors = statusColors[status];

  return (
    <div className="flex items-center gap-4 p-4 bg-black/20 rounded-lg backdrop-blur-sm">
      <div className={styles.iconSize}>
        <QuantumSpatial_11
          width={48}
          height={48}
          animated={status === 'processing'}
          primaryColor={colors.primary}
          secondaryColor={colors.secondary}
          accentColor={colors.accent}
        />
      </div>
      <p className="text-white font-medium">{message}</p>
    </div>
  );
}

// ============================================================================
// EXAMPLE 8: Next.js Page Implementation
// ============================================================================

export default function QuantumLandingPage() {
  return (
    <main className="min-h-screen bg-[#0A0E27]">
      <HeroWithQuantumVisual />
      <QuantumFeatureGrid />
      <QuantumBrandSection />
    </main>
  );
}

// ============================================================================
// EXAMPLE 9: Responsive Grid Gallery
// ============================================================================

const quantumVariants = [
  { primary: '#E85D75', secondary: '#4ECDC4', accent: '#A78BFA', name: 'Quantum Pink' },
  { primary: '#4ECDC4', secondary: '#A78BFA', accent: '#E85D75', name: 'Quantum Teal' },
  { primary: '#A78BFA', secondary: '#E85D75', accent: '#4ECDC4', name: 'Quantum Purple' },
  { primary: '#8B0000', secondary: '#4A0E4E', accent: '#C41E3A', name: 'Horror Gaming' }
];

export function QuantumGallery() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Quantum Color Variants
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quantumVariants.map((variant) => (
            <div key={variant.name} className={styles.glassCard}>
              <QuantumSpatial_11
                width={300}
                height={300}
                animated={true}
                primaryColor={variant.primary}
                secondaryColor={variant.secondary}
                accentColor={variant.accent}
                className="w-full h-auto"
              />
              <p className="text-white text-center mt-4 font-medium">
                {variant.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// EXAMPLE 10: Email Signature (Static)
// ============================================================================

export function QuantumEmailSignature() {
  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif' }}>
      <table cellPadding="0" cellSpacing="0" border={0}>
        <tr>
          <td style={{ paddingRight: '16px' }}>
            <QuantumSpatial_11
              width={80}
              height={80}
              animated={false}
            />
          </td>
          <td>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#FFFFFF' }}>
              Oksana Creative Intelligence
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              9Bit Studios
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>
              Quantum-Spatial Design Intelligence
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}
