import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { palette, spacing, typography } from "./quantum-tokens";

export default function QuantumButton(props) {
  const { text = "Button", variant = "primary", size = "medium", ...rest } = props;
  
  const variants = {
    primary: {
      background: `linear-gradient(45deg, ${palette.roseEnergy}, ${palette.dimensionalTeal})`,
      color: "white",
      border: "none"
    },
    secondary: {
      background: "transparent", 
      color: palette.subtleCyan,
      border: `1px solid ${palette.subtleCyan}`
    },
    ghost: {
      background: "transparent",
      color: palette.subtleCyan,
      border: "none"
    }
  };

  const sizes = {
    small: { padding: `${spacing.sm} ${spacing.md}`, fontSize: '14px' },
    medium: { padding: `${spacing.md} ${spacing.lg}`, fontSize: '16px' },
    large: { padding: `${spacing.lg} ${spacing.xl}`, fontSize: '18px' }
  };

  return (
    <motion.button
      style={{
        ...variants[variant],
        ...sizes[size],
        borderRadius: "8px",
        fontFamily: typography.body.fontFamily,
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s ease",
        position: "relative",
        overflow: "hidden"
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...rest}
    >
      <span style={{ position: "relative", zIndex: 1 }}>{text}</span>
    </motion.button>
  );
}

addPropertyControls(QuantumButton, {
  text: { type: ControlType.String, defaultValue: "Button" },
  variant: { 
    type: ControlType.Enum,
    options: ["primary", "secondary", "ghost"],
    defaultValue: "primary"
  },
  size: {
    type: ControlType.Enum,
    options: ["small", "medium", "large"],
    defaultValue: "medium"
  }
});