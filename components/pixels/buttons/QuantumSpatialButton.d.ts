import React from 'react';
interface QuantumSpatialButtonProps {
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    quantum?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    'aria-label'?: string;
}
/**
 * Apple HIG Compliant Quantum-Spatial Button Component
 * - Minimum 44px touch target (Apple HIG requirement)
 * - Quantum-spatial design aesthetics for Petersen Games
 * - M4 Neural Engine optimized animations
 * - Full accessibility support
 */
export declare const QuantumSpatialButton: React.FC<QuantumSpatialButtonProps>;
export default QuantumSpatialButton;
//# sourceMappingURL=QuantumSpatialButton.d.ts.map