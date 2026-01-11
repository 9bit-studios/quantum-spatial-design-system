import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";

export default function QuantumCard(props) {
  const { title = "Card Title", children, elevated = false, ...rest } = props;
  
  return (
    <motion.div
      style={{
        background: "#331F4A",
        border: "1px solid #5AC8FA20",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: elevated ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
        fontFamily: "SF Pro Display",
        color: "white"
      }}
      whileHover={{ y: elevated ? -2 : 0 }}
      {...rest}
    >
      {title && (
        <h3 style={{ 
          margin: "0 0 16px 0",
          fontSize: "18px",
          fontWeight: "600"
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
  elevated: { type: ControlType.Boolean, defaultValue: false }
});