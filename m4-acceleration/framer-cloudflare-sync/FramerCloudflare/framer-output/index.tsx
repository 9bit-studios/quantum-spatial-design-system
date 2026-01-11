// Export all components for easy import in Framer
import { QuantumSpatialProvider, useQuantumSpatial } from "./QuantumSpatialProvider"
import { Button } from "./Button"
import { Card } from "./Card"
import { DashboardLayout } from "./DashboardLayout"
import { DemoPage } from "./DemoPage"

// Re-export everything
export { QuantumSpatialProvider, useQuantumSpatial }
export { Button }
export { Card }
export { DashboardLayout }
export { DemoPage }

// Export a default for Framer to use
export default {
  QuantumSpatialProvider,
  useQuantumSpatial,
  Button,
  Card,
  DashboardLayout,
  DemoPage
}