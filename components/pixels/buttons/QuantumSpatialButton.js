'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
// Utility function for className concatenation
const cn = (...classes) => {
    return classes.filter(Boolean).join(' ');
};
/**
 * Apple HIG Compliant Quantum-Spatial Button Component
 * - Minimum 44px touch target (Apple HIG requirement)
 * - Quantum-spatial design aesthetics for Petersen Games
 * - M4 Neural Engine optimized animations
 * - Full accessibility support
 */
export const QuantumSpatialButton = ({ variant = 'primary', size = 'md', disabled = false, quantum = true, children, onClick, className, 'aria-label': ariaLabel, ...props }) => {
    const baseStyles = "relative inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 border border-blue-500/30",
        secondary: "bg-white/5 text-white border border-white/20 hover:bg-white/10 hover:border-white/30",
        accent: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 border border-purple-400/30",
        ghost: "text-white/80 hover:text-white hover:bg-white/5"
    };
    const sizes = {
        sm: "px-4 py-2 text-sm min-h-[44px] rounded-lg", // Apple HIG minimum touch target
        md: "px-6 py-3 text-base min-h-[44px] rounded-xl",
        lg: "px-8 py-4 text-lg min-h-[48px] rounded-xl"
    };
    const quantumEffects = quantum ? {
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(90, 200, 250, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
    } : {};
    return (_jsxs(motion.button, { className: cn(baseStyles, variants[variant], sizes[size], className), style: quantumEffects, onClick: onClick, disabled: disabled, "aria-label": ariaLabel, whileHover: disabled ? {} : {
            scale: 1.02,
            y: -2,
            boxShadow: quantum ? "0 12px 40px rgba(90, 200, 250, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)" : undefined
        }, whileTap: disabled ? {} : {
            scale: 0.98,
            y: 0
        }, transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
        }, ...props, children: [quantum && (_jsx(motion.div, { className: "absolute inset-0 rounded-inherit opacity-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20", whileHover: { opacity: 1 }, transition: { duration: 0.3 } })), _jsx("span", { className: "relative z-10 flex items-center gap-2", children: children }), quantum && !disabled && (_jsxs(motion.div, { className: "absolute inset-0 rounded-inherit pointer-events-none", initial: { opacity: 0 }, whileHover: { opacity: 1 }, children: [_jsx("div", { className: "absolute top-1/2 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse" }), _jsx("div", { className: "absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-75" }), _jsx("div", { className: "absolute bottom-1/3 left-1/2 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-150" })] }))] }));
};
export default QuantumSpatialButton;
//# sourceMappingURL=QuantumSpatialButton.js.map