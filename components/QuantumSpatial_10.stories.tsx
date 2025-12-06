import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QuantumSpatial_10 } from './QuantumSpatial_10';
import styles from './QuantumSpatial_10.module.css';

/**
 * QuantumSpatial_10 Component Stories
 *
 * Interactive examples demonstrating the quantum-spatial animated SVG component
 * with various configurations and use cases.
 */
const meta: Meta<typeof QuantumSpatial_10> = {
  title: 'Quantum Spatial/Graphics/QuantumSpatial_10',
  component: QuantumSpatial_10,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0A0E27' },
        { name: 'light', value: '#F5F5F7' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'range', min: 100, max: 800, step: 50 },
      description: 'Width of the SVG in pixels',
    },
    height: {
      control: { type: 'range', min: 100, max: 800, step: 50 },
      description: 'Height of the SVG in pixels',
    },
    animate: {
      control: 'boolean',
      description: 'Enable M4-optimized animations',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuantumSpatial_10>;

/**
 * Default quantum-spatial configuration
 * Medium size with animations enabled
 */
export const Default: Story = {
  args: {
    width: 400,
    height: 400,
    animate: true,
  },
};

/**
 * Small size variant
 * Optimized for mobile displays and thumbnail contexts
 */
export const Small: Story = {
  args: {
    width: 200,
    height: 200,
    animate: true,
  },
  decorators: [
    (Story) => (
      <div className={styles.quantumContainer}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Large size variant
 * Hero section or full-screen background usage
 */
export const Large: Story = {
  args: {
    width: 600,
    height: 600,
    animate: true,
  },
  decorators: [
    (Story) => (
      <div className={styles.quantumContainer}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Static variant (animations disabled)
 * Optimized for performance in resource-constrained environments
 * or when user prefers reduced motion
 */
export const Static: Story = {
  args: {
    width: 400,
    height: 400,
    animate: false,
  },
};

/**
 * With glassmorphism container
 * Full quantum-spatial aesthetic with liquid-glass effects
 */
export const WithGlassmorphism: Story = {
  args: {
    width: 400,
    height: 400,
    animate: true,
  },
  decorators: [
    (Story) => (
      <div className={styles.quantumContainer}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Interactive variant
 * Demonstrates hover states and interactive behaviors
 */
export const Interactive: Story = {
  args: {
    width: 400,
    height: 400,
    animate: true,
  },
  decorators: [
    (Story) => (
      <div
        className={`${styles.quantumContainer} ${styles.quantumInteractive}`}
        onClick={() => alert('Quantum interaction triggered!')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            alert('Quantum interaction triggered!');
          }
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Loading state
 * Shows pulsing animation for loading contexts
 */
export const Loading: Story = {
  args: {
    width: 400,
    height: 400,
    animate: true,
  },
  decorators: [
    (Story) => (
      <div className={`${styles.quantumContainer} ${styles.quantumLoading}`}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Multiple instances
 * Demonstrates scalability and M4 optimization
 */
export const MultipleInstances: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <div className={styles.quantumContainer}>
        <QuantumSpatial_10 width={200} height={200} animate={true} />
      </div>
      <div className={styles.quantumContainer}>
        <QuantumSpatial_10 width={200} height={200} animate={true} />
      </div>
      <div className={styles.quantumContainer}>
        <QuantumSpatial_10 width={200} height={200} animate={true} />
      </div>
      <div className={styles.quantumContainer}>
        <QuantumSpatial_10 width={200} height={200} animate={true} />
      </div>
    </div>
  ),
};

/**
 * Responsive grid layout
 * Shows how component adapts to different container sizes
 */
export const ResponsiveGrid: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        width: '100%',
        maxWidth: '1200px',
      }}
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className={styles.quantumContainer}>
          <QuantumSpatial_10 width={250} height={250} animate={true} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

/**
 * Dark mode optimized (default)
 * Shows component in primary dark-mysterious aesthetic
 */
export const DarkMode: Story = {
  args: {
    width: 400,
    height: 400,
    animate: true,
  },
  decorators: [
    (Story) => (
      <div className={styles.quantumContainer}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Light background variant
 * Tests visibility on non-standard backgrounds
 */
export const LightBackground: Story = {
  args: {
    width: 400,
    height: 400,
    animate: true,
  },
  decorators: [
    (Story) => (
      <div className={styles.quantumContainer}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: { default: 'light' },
  },
};

/**
 * Accessibility focus demo
 * Shows focus ring for keyboard navigation
 */
export const AccessibilityFocus: Story = {
  args: {
    width: 400,
    height: 400,
    animate: true,
  },
  decorators: [
    (Story) => (
      <div
        className={`${styles.quantumContainer} ${styles.quantumInteractive}`}
        tabIndex={0}
        role="img"
        aria-label="Quantum Spatial geometric pattern - press Enter to interact"
      >
        <Story />
      </div>
    ),
  ],
};
