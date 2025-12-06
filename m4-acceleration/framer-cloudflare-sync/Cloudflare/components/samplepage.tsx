/**
 * Sample Framer Page using Quantum-Spatial Design System
 * Enhanced Cloud Implementation (May 19, 2025)
 * 
 * This page demonstrates the usage of the cloud-based design system in Framer,
 * showcasing different states and components with live updates from the Cloudflare Worker.
 */

import * as React from "react";
import { DesignSystemProvider, useDesignSystem, DesignSystemStateSwitcher } from "./DesignSystemProvider";
import { useState } from "react";
import { motion } from "framer-motion";

/**
 * Sample Page Component
 */
export default function SamplePage() {
  return (
    <DesignSystemProvider initialState="transitional" showLoadingState={true}>
      <DesignSystemContent />
    </DesignSystemProvider>
  );
}

/**
 * Content Component that uses the Cloud-Based Design System
 */
function DesignSystemContent() {
  const { state, tokens, isLoading } = useDesignSystem();
  
  if (isLoading) {
    return <div>Loading design system...</div>;
  }
  
  // For cloud implementation, we access tokens directly from CSS variables
  // rather than from the token structure, which may differ
  const colors = [
    { name: 'primary', value: 'var(--color-primary, #131A36)' },
    { name: 'secondary', value: 'var(--color-secondary, #331F4A)' },
    { name: 'accent', value: 'var(--color-accent, #5AC8FA)' },
    { name: 'background', value: 'var(--color-background, #FFFFFF)' },
    { name: 'text', value: 'var(--color-text, #121212)' },
    { name: 'surface', value: 'var(--color-surface, #F8F9FA)' },
    { name: 'border', value: 'var(--color-border, #E4E7EB)' },
    { name: 'success', value: 'var(--color-success, #00C170)' },
    { name: 'warning', value: 'var(--color-warning, #FFC400)' },
    { name: 'error', value: 'var(--color-error, #FF4C4C)' }
  ];
  
  const spacing = [
    { name: 'xs', value: 'var(--spacing-xs, 4px)' },
    { name: 'sm', value: 'var(--spacing-sm, 8px)' },
    { name: 'md', value: 'var(--spacing-md, 16px)' },
    { name: 'lg', value: 'var(--spacing-lg, 32px)' },
    { name: 'xl', value: 'var(--spacing-xl, 48px)' },
    { name: 'xxl', value: 'var(--spacing-xxl, 64px)' }
  ];
  
  const typography = [
    { name: 'h1', value: 'var(--font-size-h1, 3.157rem)' },
    { name: 'h2', value: 'var(--font-size-h2, 2.369rem)' },
    { name: 'h3', value: 'var(--font-size-h3, 1.777rem)' },
    { name: 'body-regular', value: 'var(--font-size-body-regular, 1rem)' }
  ];
  
  return (
    <div className="design-system-demo" style={{ 
      padding: "24px",
      fontFamily: "SF Pro, system-ui, sans-serif",
    }}>
      <header style={{ marginBottom: "48px" }}>
        <h1 style={{ fontWeight: 700, fontSize: "32px", marginBottom: "8px" }}>
          Quantum-Spatial Design System
        </h1>
        <p style={{ fontSize: "18px", color: "#666" }}>
          Current State: <strong>{state}</strong>
        </p>
        <DesignSystemStateSwitcher />
      </header>
      
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ fontWeight: 600, fontSize: "24px", marginBottom: "16px" }}>
          Color Tokens
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "16px" }}>
          {colors.slice(0, 10).map(color => (
            <div key={color.name} style={{ 
              padding: "16px", 
              backgroundColor: color.value, 
              borderRadius: "8px",
              color: isLight(color.value) ? "#000" : "#fff",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              flexDirection: "column",
              height: "120px"
            }}>
              <div style={{ marginBottom: "8px", fontWeight: 600 }}>{color.name.split('-').pop()}</div>
              <div style={{ fontSize: "12px" }}>{color.value}</div>
            </div>
          ))}
        </div>
      </section>
      
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ fontWeight: 600, fontSize: "24px", marginBottom: "16px" }}>
          Spacing Tokens
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {spacing.slice(0, 6).map(space => (
            <div key={space.name} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "180px", fontWeight: 500 }}>{space.name}</div>
              <div style={{ 
                width: space.value, 
                height: "24px", 
                backgroundColor: colors[0]?.value || "#5AC8FA", 
                borderRadius: "4px"
              }}></div>
              <div style={{ marginLeft: "16px", color: "#666" }}>{space.value}</div>
            </div>
          ))}
        </div>
      </section>
      
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ fontWeight: 600, fontSize: "24px", marginBottom: "16px" }}>
          Typography Tokens
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {typography.slice(0, 4).map(typo => (
            <div key={typo.name} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "180px", fontWeight: 500 }}>{typo.name}</div>
              <div style={{ 
                fontSize: typo.value,
                fontWeight: typo.name.includes('bold') ? 700 : typo.name.includes('medium') ? 500 : 400
              }}>
                Quantum-Spatial Text Example
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 style={{ fontWeight: 600, fontSize: "24px", marginBottom: "16px" }}>
          Interactive Elements
        </h2>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: colors.find(c => c.name === 'primary')?.value,
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Primary Button
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: colors.find(c => c.name === 'secondary')?.value,
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Secondary Button
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: colors.find(c => c.name === 'accent')?.value,
              color: "#131A36",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Accent Button
          </motion.button>
        </div>
      </section>
      
      <section style={{ marginTop: "48px" }}>
        <h2 style={{ fontWeight: 600, fontSize: "24px", marginBottom: "16px" }}>
          Cloud Powered Design System
        </h2>
        <div style={{ 
          padding: "16px",
          backgroundColor: "var(--color-surface, #F8F9FA)",
          borderRadius: "var(--radius-medium, 8px)",
          boxShadow: "var(--shadow-medium, 0 6px 12px rgba(19, 26, 54, 0.08))"
        }}>
          <p>
            This design system is powered by the Cloudflare Worker API at:
          </p>
          <code style={{ 
            display: "block", 
            padding: "12px", 
            margin: "12px 0", 
            backgroundColor: "#131A36", 
            color: "#5AC8FA",
            borderRadius: "4px",
            fontFamily: "monospace"
          }}>
            GET https://quantum-spatial-design-system-staging.rnrb2ynd5z.workers.dev/design-system/tokens?state={state}
          </code>
          <p>
            The design tokens are fetched in real-time and applied as CSS variables.
            Try changing the design system state using the switcher above to see instant updates!
          </p>
        </div>
      </section>
    </div>
  );
}

// Helper to determine if a color is light or dark
function isLight(color) {
  // Remove # if present
  color = color.replace('#', '');
  
  // Parse the color
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5;
}