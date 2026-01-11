import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";

export default function QuantumButton(props) {
  const { text = "Button", variant = "primary", ...rest } = props;
  
  const variants = {
    primary: {
      background: "#131A36",
      color: "white",
      border: "1px solid #5AC8FA"
    },
    secondary: {
      background: "transparent", 
      color: "#5AC8FA",
      border: "1px solid #5AC8FA"
    }
  };

  return (
    <motion.button
      style={{
        ...variants[variant],
        padding: "16px 24px",
        borderRadius: "6px",
        fontFamily: "SF Pro Display",
        fontSize: "16px",
        cursor: "pointer",
        transition: "all 0.2s ease"
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...rest}
    >
      {text}
    </motion.button>
  );
}

// Framer property controls
addPropertyControls(QuantumButton, {
  text: { type: ControlType.String, defaultValue: "Button" },
  variant: { 
    type: ControlType.Enum,
    options: ["primary", "secondary"],
    defaultValue: "primary"
  }
});