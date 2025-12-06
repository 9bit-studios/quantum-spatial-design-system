import React, { useState } from 'react';
import { QuantumSpatial5 } from './QuantumSpatial_5';
import styles from './QuantumSpatial_5.module.css';

/**
 * Demo page for QuantumSpatial_5 component
 *
 * Demonstrates:
 * - Light/Dark variants
 * - Animation toggle
 * - Responsive sizing
 * - Glassmorphism integration
 * - Accessibility features
 */
export default function QuantumSpatial5Demo() {
  const [animate, setAnimate] = useState(true);
  const [variant, setVariant] = useState<'light' | 'dark'>('dark');
  const [size, setSize] = useState(200);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: variant === 'dark' ? '#0A0E27' : '#F8FAFC',
        padding: '48px 24px',
        fontFamily: 'SF Pro Display, -apple-system, system-ui, sans-serif',
        color: variant === 'dark' ? '#FFFFFF' : '#0A0E27',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '48px',
              fontWeight: '700',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #E85D75, #4ECDC4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            QuantumSpatial_5
          </h1>
          <p
            style={{
              fontSize: '17px',
              color: variant === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(10, 14, 39, 0.7)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            M4-accelerated quantum-spatial orbital system with glassmorphism effects
            and animated particle dynamics
          </p>
        </header>

        {/* Controls Panel */}
        <div
          className={styles.glassWrapper}
          style={{ marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Animation Toggle */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={animate}
                  onChange={(e) => setAnimate(e.target.checked)}
                  style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    accentColor: '#E85D75',
                  }}
                />
                Enable Animation
              </label>
            </div>

            {/* Variant Toggle */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '15px',
                  fontWeight: '600',
                  marginBottom: '8px',
                }}
              >
                Variant
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setVariant('dark')}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    background: variant === 'dark' ? '#E85D75' : 'transparent',
                    border: '2px solid #E85D75',
                    borderRadius: '8px',
                    color: variant === 'dark' ? '#FFFFFF' : '#E85D75',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    minHeight: '44px',
                    minWidth: '44px',
                    transition: 'all 0.2s ease',
                  }}
                  aria-pressed={variant === 'dark'}
                >
                  Dark
                </button>
                <button
                  onClick={() => setVariant('light')}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    background: variant === 'light' ? '#4ECDC4' : 'transparent',
                    border: '2px solid #4ECDC4',
                    borderRadius: '8px',
                    color: variant === 'light' ? '#FFFFFF' : '#4ECDC4',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    minHeight: '44px',
                    minWidth: '44px',
                    transition: 'all 0.2s ease',
                  }}
                  aria-pressed={variant === 'light'}
                >
                  Light
                </button>
              </div>
            </div>

            {/* Size Slider */}
            <div>
              <label
                htmlFor="size-slider"
                style={{
                  display: 'block',
                  fontSize: '15px',
                  fontWeight: '600',
                  marginBottom: '8px',
                }}
              >
                Size: {size}px
              </label>
              <input
                id="size-slider"
                type="range"
                min="100"
                max="400"
                step="50"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: '44px',
                  cursor: 'pointer',
                  accentColor: '#E85D75',
                }}
              />
            </div>
          </div>
        </div>

        {/* Component Display */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '500px',
          }}
        >
          <div className={variant === 'dark' ? styles.darkTheme : styles.lightTheme}>
            <QuantumSpatial5
              size={size}
              animate={animate}
              variant={variant}
              className={styles.quantumContainer}
            />
          </div>
        </div>

        {/* Technical Specifications */}
        <div
          className={styles.glassWrapper}
          style={{ marginTop: '48px', maxWidth: '800px', margin: '48px auto 0' }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '24px',
            }}
          >
            Technical Specifications
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            <SpecRow label="Design System" value="Quantum Spatial" />
            <SpecRow label="Animation System" value="M4-accelerated SVG SMIL" />
            <SpecRow label="Performance Target" value="<2s render time" />
            <SpecRow label="Accessibility" value="WCAG AA compliant" />
            <SpecRow label="Touch Targets" value="44px minimum (HIG compliant)" />
            <SpecRow label="Reduced Motion" value="Respects user preferences" />
            <SpecRow label="Color Contrast" value="4.5:1 minimum" />
            <SpecRow label="Framework Support" value="React 19, Next.js 15" />
          </div>

          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h3
              style={{
                fontSize: '17px',
                fontWeight: '600',
                marginBottom: '12px',
              }}
            >
              Design Tokens Used
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
              <li><code>--primary: #E85D75</code></li>
              <li><code>--secondary: #4ECDC4</code></li>
              <li><code>--accent: #A78BFA</code></li>
              <li><code>--glass-blur: 20px</code></li>
              <li><code>--glass-opacity: 0.7</code></li>
              <li><code>--space-md: 16px</code></li>
            </ul>
          </div>
        </div>

        {/* Usage Example */}
        <div
          className={styles.glassWrapper}
          style={{ marginTop: '32px', maxWidth: '800px', margin: '32px auto 0' }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '16px',
            }}
          >
            Usage Example
          </h2>
          <pre
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '16px',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '14px',
              fontFamily: 'SF Mono, Monaco, monospace',
              lineHeight: '1.6',
            }}
          >
{`import { QuantumSpatial5 } from './QuantumSpatial_5';

function MyComponent() {
  return (
    <QuantumSpatial5
      size={200}
      animate={true}
      variant="dark"
    />
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// Helper component for specification rows
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <span style={{ fontSize: '15px', fontWeight: '600' }}>{label}</span>
      <span style={{ fontSize: '15px', opacity: 0.7 }}>{value}</span>
    </div>
  );
}
