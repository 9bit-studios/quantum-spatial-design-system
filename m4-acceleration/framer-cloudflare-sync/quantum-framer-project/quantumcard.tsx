import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { palette, spacing, typography } from "./quantum-tokens";

export default function QuantumCard(props) {
  const { 
    title = "Card Title", 
    children, 
    elevated = false,
    interactive = true,
    variant = "default"
  } = props;
  
  const variants = {
    default: {
      background: palette.dimensionalEggplant,
      border: `1px solid ${palette.subtleCyan}30`
    },
    highlight: {
      background: `linear-gradient(135deg, ${palette.dimensionalEggplant}, ${palette.deepSpaceIndigo})`,
      border: `1px solid ${palette.subtleCyan}60`
    },
    minimal: {
      background: "transparent",
      border: `1px solid ${palette.subtleCyan}20`
    }
  };
  
  return (
    <motion.div
      style={{
        ...variants[variant],
        borderRadius: "12px",
        padding: spacing.lg,
        boxShadow: elevated ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
        fontFamily: typography.body.fontFamily,
        color: "white",
        cursor: interactive ? "pointer" : "default"
      }}
      whileHover={interactive ? { 
        y: -2,
        boxShadow: "0 12px 40px rgba(0,0,0,0.4)"
      } : {}}
      transition={{ duration: 0.2 }}
    >
      {title && (
        <h3 style={{ 
          ...typography.h2,
          fontSize: "1.25rem",
          margin: `0 0 ${spacing.md} 0`,
          color: palette.subtleCyan
        }}>
          {title}
        </h3>
      )}
      <div>{children}</div>
    </motion.div>
  );
}

addPropertyControls(QuantumCard, {
  title: { type: ControlType.String, defaultValue: "Card Title" },
  elevated: { type: ControlType.Boolean, defaultValue: false },
  interactive: { type: ControlType.Boolean, defaultValue: true },
  variant: {
    type: ControlType.Enum,
    options: ["default", "highlight", "minimal"],
    defaultValue: "default"
  }
});