import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"
import { QuantumSpatialProvider, useQuantumSpatial } from "./QuantumSpatialProvider"
import { Button } from "./Button"
import { Card } from "./Card"
import { DashboardLayout } from "./DashboardLayout"

/**
 * Demo Page showcasing the Quantum-Spatial Design System
 */
export function DemoPage() {
  return (
    <QuantumSpatialProvider
      autoDetect={true}
      initialState="quantum"
      workerUrl="https://design-system.9bitstudios.io"
      fallbackUrl="https://quantum-spatial-design-system.9bitstudios.workers.dev"
    >
      <DemoContent />
    </QuantumSpatialProvider>
  )
}

function DemoContent() {
  const { tokens, designState, setDesignState, deviceInfo, isLoading } = useQuantumSpatial();
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  return (
    <DashboardLayout title="Quantum-Spatial Demo">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <DesignStateSelector 
          currentState={designState} 
          onChange={setDesignState} 
        />
        
        <DeviceInfo deviceInfo={deviceInfo} />
        
        <ComponentSection tokens={tokens} />
      </div>
    </DashboardLayout>
  );
}

function LoadingState() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "2rem",
      background: "#0D0D15",
      color: "white"
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "24px",
          border: "4px solid rgba(90, 200, 250, 0.2)",
          borderTopColor: "#5AC8FA",
          marginBottom: "1rem"
        }}
      />
      <h2>Loading Quantum-Spatial Design System...</h2>
    </div>
  );
}

function DesignStateSelector({ currentState, onChange }) {
  const states = ["heritage", "transitional", "quantum", "superposition"];
  
  return (
    <div style={{
      marginBottom: "2rem",
      padding: "1rem",
      borderRadius: "8px",
      background: "rgba(0,0,0,0.2)"
    }}>
      <h2>Design State</h2>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {states.map(state => (
          <Button
            key={state}
            text={state.charAt(0).toUpperCase() + state.slice(1)}
            variant={state === currentState ? "primary" : "secondary"}
            onClick={() => onChange(state)}
          />
        ))}
      </div>
    </div>
  );
}

function DeviceInfo({ deviceInfo }) {
  return (
    <Card
      title="Device Information"
      padding="md"
      elevated={true}
      style={{ marginBottom: "2rem" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        <InfoItem label="Platform" value={deviceInfo.platform || "Unknown"} />
        <InfoItem label="Apple Silicon" value={deviceInfo.isAppleSilicon ? "Yes" : "No"} />
        <InfoItem label="CPU Cores" value={deviceInfo.cpuCores || "Unknown"} />
        <InfoItem label="M4 Detected" value={deviceInfo.isM4Detected ? "Yes" : "No"} />
        <InfoItem label="Recommended State" value={deviceInfo.recommendedState || "quantum"} />
        <InfoItem label="Render Quality" value={deviceInfo.renderQuality || "standard"} />
      </div>
    </Card>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <div style={{ fontWeight: "bold", fontSize: "14px", opacity: 0.7 }}>{label}</div>
      <div>{value}</div>
    </div>
  );
}

function ComponentSection({ tokens }) {
  return (
    <div>
      <h2>Components</h2>
      
      <h3>Buttons</h3>
      <div style={{ 
        display: "flex", 
        gap: "1rem", 
        flexWrap: "wrap",
        marginBottom: "2rem" 
      }}>
        <Button text="Primary" variant="primary" />
        <Button text="Secondary" variant="secondary" />
        <Button text="Accent" variant="accent" />
        <Button text="Disabled" variant="primary" disabled={true} />
      </div>
      
      <h3>Button Sizes</h3>
      <div style={{ 
        display: "flex", 
        gap: "1rem", 
        alignItems: "center",
        marginBottom: "2rem" 
      }}>
        <Button text="XS" variant="primary" size="xs" />
        <Button text="Small" variant="primary" size="sm" />
        <Button text="Medium" variant="primary" size="md" />
        <Button text="Large" variant="primary" size="lg" />
        <Button text="XL" variant="primary" size="xl" />
      </div>
      
      <h3>Cards</h3>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
        gap: "1rem",
        marginBottom: "2rem"
      }}>
        <Card title="Standard Card" padding="md">
          <p>This is a standard card component with default styling.</p>
          <Button text="Learn More" variant="primary" />
        </Card>
        
        <Card title="Elevated Card" padding="md" elevated={true}>
          <p>This card has elevation enabled for a more prominent appearance.</p>
          <Button text="Learn More" variant="secondary" />
        </Card>
        
        <Card title="Custom Padding" padding="lg" elevated={true}>
          <p>You can customize the padding of cards to fit your content needs.</p>
          <Button text="Learn More" variant="accent" />
        </Card>
      </div>
      
      <h3>Current Design Tokens</h3>
      <Card padding="md" elevated={false}>
        <pre style={{ 
          overflowX: "auto", 
          padding: "1rem", 
          background: "rgba(0,0,0,0.2)",
          borderRadius: "4px",
          fontSize: "14px"
        }}>
          {JSON.stringify(tokens, null, 2)}
        </pre>
      </Card>
    </div>
  );
}

// Property controls
addPropertyControls(DemoPage, {});

export default DemoPage