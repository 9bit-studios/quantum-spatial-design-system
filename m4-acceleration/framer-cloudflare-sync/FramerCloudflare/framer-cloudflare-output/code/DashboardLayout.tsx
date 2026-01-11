import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { quantumTokens, palette, spacing, typography } from "./quantum-tokens";

export default function DashboardLayout(props) {
  const { 
    title = "Dashboard",
    showSidebar = true,
    sidebarWidth = 280,
    children 
  } = props;

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: palette.voidBlack,
      fontFamily: typography.body.fontFamily,
      color: 'white'
    }}>
      {showSidebar && (
        <motion.aside
          style={{
            width: sidebarWidth,
            background: palette.deepSpaceIndigo,
            borderRight: `1px solid ${palette.subtleCyan}30`,
            padding: spacing.lg,
            display: 'flex',
            flexDirection: 'column'
          }}
          initial={{ x: -sidebarWidth }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 style={{ ...typography.h2, marginBottom: spacing.xl }}>
            {title}
          </h2>
          <nav style={{ flex: 1 }}>
            <div style={{ marginBottom: spacing.md }}>
              <a href="#" style={{ 
                color: palette.subtleCyan, 
                textDecoration: 'none',
                display: 'block',
                padding: spacing.sm,
                borderRadius: '6px',
                transition: 'background 0.2s'
              }}>
                Overview
              </a>
            </div>
            <div style={{ marginBottom: spacing.md }}>
              <a href="#" style={{ 
                color: palette.subtleCyan, 
                textDecoration: 'none',
                display: 'block',
                padding: spacing.sm,
                borderRadius: '6px'
              }}>
                Projects
              </a>
            </div>
            <div style={{ marginBottom: spacing.md }}>
              <a href="#" style={{ 
                color: palette.subtleCyan, 
                textDecoration: 'none',
                display: 'block',
                padding: spacing.sm,
                borderRadius: '6px'
              }}>
                Analytics
              </a>
            </div>
          </nav>
        </motion.aside>
      )}
      
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <header style={{
          padding: spacing.lg,
          borderBottom: `1px solid ${palette.subtleCyan}30`,
          background: palette.dimensionalEggplant
        }}>
          <h1 style={typography.h1}>
            {title}
          </h1>
        </header>
        
        <div style={{
          flex: 1,
          padding: spacing.lg,
          overflow: 'auto'
        }}>
          {children}
        </div>
      </main>
    </div>
  );
}

addPropertyControls(DashboardLayout, {
  title: { type: ControlType.String, defaultValue: "Dashboard" },
  showSidebar: { type: ControlType.Boolean, defaultValue: true },
  sidebarWidth: { type: ControlType.Number, defaultValue: 280, min: 200, max: 400 }
});