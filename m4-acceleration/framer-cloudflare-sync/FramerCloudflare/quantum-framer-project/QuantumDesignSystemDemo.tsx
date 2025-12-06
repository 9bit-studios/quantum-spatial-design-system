import { motion } from "framer-motion";
import { palette, spacing, typography } from "./quantum-tokens";
import DashboardLayout from "./DashboardLayout";
import HeroLayout from "./HeroLayout";
import GridLayout from "./GridLayout";
import QuantumButton from "./QuantumButton";
import QuantumCard from "./QuantumCard";

export default function QuantumDesignSystemDemo() {
  return (
    <div style={{
      background: palette.voidBlack,
      minHeight: "100vh",
      fontFamily: typography.body.fontFamily
    }}>
      {/* Hero Section */}
      <HeroLayout 
        title="Quantum-Spatial Design System"
        subtitle="Experience the future of spatial computing interfaces"
        ctaText="Explore Components"
      />
      
      {/* Components Showcase */}
      <section style={{
        padding: `${spacing.xl} ${spacing.lg}`,
        textAlign: "center"
      }}>
        <h2 style={{
          ...typography.h1,
          color: "white",
          marginBottom: spacing.xl
        }}>
          Component Library
        </h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: spacing.lg,
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <QuantumCard title="Buttons" variant="highlight">
            <div style={{ display: "flex", gap: spacing.md, flexWrap: "wrap" }}>
              <QuantumButton text="Primary" variant="primary" size="medium" />
              <QuantumButton text="Secondary" variant="secondary" size="medium" />
              <QuantumButton text="Ghost" variant="ghost" size="medium" />
            </div>
          </QuantumCard>
          
          <QuantumCard title="Cards" variant="default">
            <p style={{ ...typography.body, opacity: 0.8, margin: 0 }}>
              Interactive cards with hover effects and multiple variants
            </p>
          </QuantumCard>
          
          <QuantumCard title="Layouts" variant="minimal">
            <p style={{ ...typography.body, opacity: 0.8, margin: 0 }}>
              Dashboard, Hero, and Grid layouts ready to use
            </p>
          </QuantumCard>
        </div>
      </section>
      
      {/* Grid Layout Demo */}
      <GridLayout 
        title="Grid Layout Example"
        columns={3}
        items={6}
      />
    </div>
  );
}