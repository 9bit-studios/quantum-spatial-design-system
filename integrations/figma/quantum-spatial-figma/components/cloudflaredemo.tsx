/**
 * Quantum-Spatial Design System - Cloudflare Demo
 * Demo component showcasing the Cloudflare integration
 */
import * as React from "react";
import { Frame, Stack, addPropertyControls, ControlType } from "framer";
import { CloudflareProvider, useCloudflareDesignSystem } from "./CloudflareProvider";
import DashboardLayout from "./DashboardLayout";
import HeroLayout from "./HeroLayout";
import GridLayout from "./GridLayout";

export default function CloudflareDemo(props) {
  const {
    layout = "dashboard",
    state = "quantum",
    title = "Cloudflare Integration",
  } = props;
  
  return (
    <CloudflareProvider initialState={state} detectDevice={true}>
      <CloudflareDemoContent layout={layout} title={title} />
    </CloudflareProvider>
  );
}

// Content component that uses the design system context
function CloudflareDemoContent({ layout, title }) {
  const { tokens, state, setState, isLoading, deviceCapabilities } = useCloudflareDesignSystem();
  
  if (isLoading) {
    return (
      <Frame
        width="100%"
        height="100%"
        background="var(--color-background, #121212)"
        color="var(--color-text-light, white)"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-family, SF Pro Display, system-ui, sans-serif)",
          fontSize: "1.5rem"
        }}
      >
        Loading design system...
      </Frame>
    );
  }
  
  // Render different layouts
  switch(layout) {
    case "hero":
      return (
        <HeroLayout 
          title={title} 
          subtitle="Powered by Cloudflare Worker API"
          ctaText="Explore States"
          onCTAClick={() => {
            const states = ["heritage", "transitional", "quantum", "superposition"];
            const currentIndex = states.indexOf(state);
            const nextIndex = (currentIndex + 1) % states.length;
            setState(states[nextIndex]);
          }}
        >
          <DeviceInfo deviceCapabilities={deviceCapabilities} state={state} />
        </HeroLayout>
      );
      
    case "grid":
      return (
        <GridLayout 
          title={title}
          subtitle="Design States Showcase"
          columns={2}
          items={[
            { title: "Heritage", description: "Flat orthogonal design system" },
            { title: "Transitional", description: "Emerging dimensional design system" },
            { title: "Quantum", description: "Fully dimensional spatial design system" },
            { title: "Superposition", description: "M4-optimized quantum uncertainty" }
          ]}
          onItemClick={(index) => {
            const states = ["heritage", "transitional", "quantum", "superposition"];
            if (index < states.length) {
              setState(states[index]);
            }
          }}
        >
          <DeviceInfo deviceCapabilities={deviceCapabilities} state={state} />
        </GridLayout>
      );
      
    default: // dashboard
      return (
        <DashboardLayout title={title}>
          <Stack direction="vertical" gap={20} width="100%">
            <h2 style={{ fontFamily: "var(--font-family)" }}>
              Cloudflare Integration Demo
            </h2>
            
            <Stack direction="horizontal" gap={10} wrap="wrap">
              <StateButton
                current={state}
                target="heritage"
                onClick={() => setState("heritage")}
              />
              <StateButton
                current={state}
                target="transitional"
                onClick={() => setState("transitional")}
              />
              <StateButton
                current={state}
                target="quantum"
                onClick={() => setState("quantum")}
              />
              <StateButton
                current={state}
                target="superposition"
                onClick={() => setState("superposition")}
              />
            </Stack>
            
            <DeviceInfo deviceCapabilities={deviceCapabilities} state={state} />
          </Stack>
        </DashboardLayout>
      );
  }
}

// State button component
function StateButton({ current, target, onClick }) {
  const isActive = current === target;
  
  return (
    <button
      onClick={onClick}
      style={{
        background: isActive ? "var(--color-primary, #6A3093)" : "transparent",
        color: isActive ? "white" : "var(--color-accent, #5AC8FA)",
        border: "1px solid var(--color-accent, #5AC8FA)",
        borderRadius: "var(--radius-small, 8px)",
        padding: "8px 16px",
        fontFamily: "var(--font-family)",
        cursor: "pointer",
        textTransform: "capitalize"
      }}
    >
      {target}
    </button>
  );
}

// Device info component
function DeviceInfo({ deviceCapabilities, state }) {
  if (!deviceCapabilities) return null;
  
  return (
    <Frame
      background={deviceCapabilities.isM4Compatible ? "#00D26A" : deviceCapabilities.isAppleSilicon ? "#5AC8FA" : "#FFB800"}
      style={{
        padding: "16px",
        borderRadius: "8px",
        marginTop: "20px",
        color: "white",
        fontFamily: "var(--font-family)"
      }}
    >
      <h3 style={{ marginTop: 0 }}>Device Capabilities:</h3>
      <ul style={{ marginBottom: 0 }}>
        <li>M4 Compatible: {deviceCapabilities.isM4Compatible ? "Yes" : "No"}</li>
        <li>Apple Silicon: {deviceCapabilities.isAppleSilicon ? "Yes" : "No"}</li>
        <li>Rendering API: {deviceCapabilities.renderingAPI}</li>
        <li>Current State: {state}</li>
      </ul>
    </Frame>
  );
}

// Add property controls
addPropertyControls(CloudflareDemo, {
  layout: {
    type: ControlType.Enum,
    title: "Layout",
    options: ["dashboard", "hero", "grid"],
    defaultValue: "dashboard"
  },
  state: {
    type: ControlType.Enum,
    title: "Initial State",
    options: ["heritage", "transitional", "quantum", "superposition", "auto"],
    defaultValue: "quantum",
    description: "Set to 'auto' for device-based selection"
  },
  title: {
    type: ControlType.String,
    title: "Title",
    defaultValue: "Cloudflare Integration"
  }
});

// Set default size
CloudflareDemo.defaultProps = {
  width: 1200,
  height: 800
};