import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { useState } from "react";

export default function QuantumInput(props) {
  const { placeholder = "Enter text...", label, ...rest } = props;
  const [focused, setFocused] = useState(false);
  
  return (
    <div style={{ width: "100%" }}>
      {label && (
        <label style={{
          display: "block",
          marginBottom: "8px",
          fontFamily: "SF Pro Display",
          fontSize: "14px",
          color: "#5AC8FA"
        }}>
          {label}
        </label>
      )}
      <motion.input
        style={{
          width: "100%",
          padding: "16px",
          background: "#0A0621",
          border: `2px solid ${focused ? "#5AC8FA" : "#331F4A"}`,
          borderRadius: "8px",
          fontFamily: "SF Pro Display",
          fontSize: "16px",
          color: "white",
          outline: "none",
          transition: "border-color 0.2s ease"
        }}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />
    </div>
  );
}

addPropertyControls(QuantumInput, {
  placeholder: { type: ControlType.String, defaultValue: "Enter text..." },
  label: { type: ControlType.String, defaultValue: "" }
});