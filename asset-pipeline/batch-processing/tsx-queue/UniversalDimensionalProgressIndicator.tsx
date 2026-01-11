import React from 'react';
import { motion } from 'framer-motion';

export default function DimensionalProgressIndicator({
  steps = [
    { id: "explore", label: "Explore", state: "complete", realm: "spirit" },
    { id: "create", label: "Create", state: "active", realm: "mortal" },
    { id: "transform", label: "Transform", state: "upcoming", realm: "quantum" },
    { id: "materialize", label: "Materialize", state: "upcoming", realm: "spirit" }
  ],
  orientation = "horizontal" // horizontal, vertical
}) {
  // Realm color mapping
  const realmColors = {
    spirit: { primary: "#BF4080", secondary: "#FF2D55" },
    mortal: { primary: "#5AC8FA", secondary: "#29B6F6" },
    quantum: { primary: "#6A3093", secondary: "#331F4A" }
  };

  // State styling
  const stateStyles = {
    complete: {
      circle: { border: "none", opacity: 1 },
      line: { opacity: 1 }
    },
    active: {
      circle: { border: "2px", opacity: 1 },
      line: { opacity: 0.6 }
    },
    upcoming: {
      circle: { border: "1px", opacity: 0.5 },
      line: { opacity: 0.3 }
    }
  };

  return (
    <div className={`w-full flex ${orientation === "horizontal" ? "flex-row" : "flex-col h-full"} items-center gap-2 py-4`}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {/* Step indicator */}
          <div className="relative flex flex-col items-center">
            {/* Circle */}
            <motion.div
              className={`relative z-10 flex items-center justify-center rounded-full ${step.state === "complete" ? "" : "border"}`}
              style={{
                width: step.state === "active" ? "24px" : "20px",
                height: step.state === "active" ? "24px" : "20px",
                backgroundColor: step.state === "complete"
                  ? realmColors[step.realm].primary
                  : "transparent",
                borderColor: realmColors[step.realm].primary,
                borderWidth: stateStyles[step.state].circle.border,
                opacity: stateStyles[step.state].circle.opacity
              }}
              animate={{
                scale: step.state === "active" ? [1, 1.1, 1] : 1
              }}
              transition={{
                duration: 2,
                repeat: step.state === "active" ? Infinity : 0,
                repeatType: "reverse"
              }}
            >
              {step.state === "complete" && (
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}

              {/* Pulse effect for active step */}
              {step.state === "active" && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: `2px solid ${realmColors[step.realm].primary}`
                  }}
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0.7, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              )}
            </motion.div>

            {/* Label */}
            <span
              className={`mt-2 text-xs ${orientation === "vertical" ? "ml-6" : ""}`}
              style={{
                color: step.state === "upcoming" ? "#9CA3AF" : "#FFFFFF",
                opacity: stateStyles[step.state].circle.opacity
              }}
            >
              {step.label}
            </span>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 ${orientation === "horizontal" ? "h-0.5" : "w-0.5 h-8"}`}
              style={{
                background: `linear-gradient(${orientation === "horizontal" ? "90deg" : "180deg"}, ${realmColors[step.realm].primary}, ${realmColors[steps[index + 1].realm].primary})`,
                opacity: stateStyles[step.state].line.opacity
              }}
            >
              {/* Energy flow particles for complete and active states */}
              {(step.state === "complete" || step.state === "active") && (
                <EnergyFlow
                  startColor={realmColors[step.realm].secondary}
                  endColor={realmColors[steps[index + 1].realm].secondary}
                  orientation={orientation}
                />
              )}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

const EnergyFlow = ({ startColor, endColor, orientation }) => {
  const particles = Array(3).fill(0);

  return (
    <>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: i % 2 === 0 ? startColor : endColor,
            width: "4px",
            height: "4px",
            top: orientation === "horizontal" ? "-1.5px" : "0",
            left: orientation === "horizontal" ? "0" : "-1.5px"
          }}
          animate={{
            [orientation === "horizontal" ? "x" : "y"]: ["0%", "100%"],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.7
          }}
        />
      ))}
    </>
  );
};
