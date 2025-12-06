import { addPropertyControls, ControlType } from "framer"
import React from "react"

/**
 * EnhancedQuantumSpatialSystem - RESPONSIVE APPLE HIG COMPLIANT VERSION
 * 
 * This component provides a responsive layout showcasing the core design system components
 * following Apple Human Interface Guidelines principles.
 * 
 * Features:
 * - Responsive layout that adapts to container size
 * - Apple HIG compliant spacing (8-point grid system)
 * - Minimum 44x44pt touch targets
 * - SF Pro typography
 * - Live design tokens integration
 * - Core component showcase
 * 
 * @param {Object} props - Component properties
 * @returns {JSX.Element} - Framer component
 */
export default function EnhancedQuantumSpatialSystem(props) {
    const { 
        variant = "quantum",
        layout = "responsive",
        showSystemUI = false,
        showComponents = true,
        showTokens = true,
        minWidth = 320,
        maxWidth = 1200
    } = props;
    
    // Verified worker URL from May 24 session
    const workerUrl = "https://quantum-spatial-design-system.rnrb2ynd5z.workers.dev";
    const interfaceUrl = `${workerUrl}/auto-deployer`;
    const tokensUrl = `${workerUrl}/design-system/tokens?state=${variant}`;
    
    // State management
    const [tokens, setTokens] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [hasError, setHasError] = React.useState(false);
    const [containerSize, setContainerSize] = React.useState({ width: 400, height: 300 });
    
    // Container ref for size detection
    const containerRef = React.useRef(null);
    
    // Load design tokens
    const loadDesignTokens = React.useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch(tokensUrl);
            if (!response.ok) throw new Error(`Failed to fetch tokens: ${response.status}`);
            
            const tokenData = await response.json();
            setTokens(tokenData);
            setIsLoading(false);
            setHasError(false);
        } catch (error) {
            console.error("Error loading design tokens:", error);
            setHasError(true);
            setIsLoading(false);
        }
    }, [tokensUrl]);
    
    // Monitor container size for responsive layout
    React.useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setContainerSize({ width: rect.width, height: rect.height });
            }
        };
        
        updateSize();
        window.addEventListener('resize', updateSize);
        
        // Use ResizeObserver if available for better container monitoring
        let resizeObserver;
        if (window.ResizeObserver && containerRef.current) {
            resizeObserver = new ResizeObserver(updateSize);
            resizeObserver.observe(containerRef.current);
        }
        
        return () => {
            window.removeEventListener('resize', updateSize);
            if (resizeObserver) resizeObserver.disconnect();
        };
    }, []);
    
    // Load tokens when variant changes
    React.useEffect(() => {
        if (!showSystemUI) {
            loadDesignTokens();
        }
    }, [variant, showSystemUI, loadDesignTokens]);
    
    // Handle iframe messages
    const handleMessage = React.useCallback((event) => {
        if (!event.origin.includes('quantum-spatial-design-system')) return;
        
        if (event.data?.type === 'quantum-spatial-loaded') {
            console.log("Quantum-Spatial Design System loaded:", event.data);
            setIsLoading(false);
        }
    }, []);
    
    React.useEffect(() => {
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [handleMessage]);
    
    // Apple HIG spacing system (8-point grid)
    const spacing = {
        xs: 4,   // 0.5 * 8
        sm: 8,   // 1 * 8
        md: 16,  // 2 * 8
        lg: 24,  // 3 * 8
        xl: 32,  // 4 * 8
        xxl: 48  // 6 * 8
    };
    
    // Responsive breakpoints
    const isCompact = containerSize.width < 480;
    const isMedium = containerSize.width >= 480 && containerSize.width < 768;
    const isLarge = containerSize.width >= 768;
    
    // Get colors from tokens or fallback
    const getColors = () => {
        if (tokens?.colors) return tokens.colors;
        
        const fallbackColors = {
            quantum: {
                primary: "#6A3093",
                secondary: "#BF4080", 
                accent: "#5AC8FA",
                background: "#131A36",
                surface: "rgba(255, 255, 255, 0.1)",
                text: "#FFFFFF",
                border: "rgba(90, 200, 250, 0.3)"
            },
            heritage: {
                primary: "#007AFF",
                secondary: "#666666",
                accent: "#888888", 
                background: "#F5F5F5",
                surface: "#FFFFFF",
                text: "#000000",
                border: "rgba(0, 0, 0, 0.1)"
            },
            superposition: {
                primary: "#6A3093",
                secondary: "#BF4080",
                accent: "#5AC8FA",
                background: "#0D0D15", 
                surface: "rgba(255, 255, 255, 0.08)",
                text: "#FFFFFF",
                border: "rgba(90, 200, 250, 0.3)"
            }
        };
        
        return fallbackColors[variant] || fallbackColors.quantum;
    };
    
    const colors = getColors();
    
    // Main container style - Apple HIG compliant
    const containerStyle = {
        width: "100%",
        height: "100%",
        minWidth: `${minWidth}px`,
        maxWidth: `${maxWidth}px`,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        background: colors.background,
        borderRadius: spacing.md,
        overflow: "hidden",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif",
        color: colors.text,
        position: "relative",
        boxSizing: "border-box"
    };
    
    // Show full interface
    if (showSystemUI) {
        return (
            <div ref={containerRef} style={containerStyle}>
                <iframe 
                    src={interfaceUrl}
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        borderRadius: spacing.md
                    }}
                    title="Quantum-Spatial Design System"
                />
            </div>
        );
    }
    
    // Loading state
    if (isLoading) {
        return (
            <div ref={containerRef} style={{
                ...containerStyle,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{
                    color: colors.accent,
                    fontSize: isCompact ? 14 : 16,
                    textAlign: 'center'
                }}>
                    Loading {variant} design system...
                </div>
            </div>
        );
    }
    
    // Error state
    if (hasError) {
        return (
            <div ref={containerRef} style={{
                ...containerStyle,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{
                    color: '#FF3B30',
                    fontSize: isCompact ? 14 : 16,
                    textAlign: 'center'
                }}>
                    Failed to load design system
                </div>
            </div>
        );
    }
    
    // Component showcase layout
    return (
        <div ref={containerRef} style={containerStyle}>
            {/* Header */}
            <div style={{
                padding: `${spacing.md}px ${spacing.lg}px`,
                borderBottom: `1px solid ${colors.border}`,
                background: colors.surface
            }}>
                <h1 style={{
                    margin: 0,
                    fontSize: isCompact ? 20 : isLarge ? 28 : 24,
                    fontWeight: 700,
                    color: colors.accent,
                    lineHeight: 1.2
                }}>
                    Quantum-Spatial {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </h1>
                <p style={{
                    margin: `${spacing.xs}px 0 0 0`,
                    fontSize: isCompact ? 14 : 16,
                    opacity: 0.8,
                    lineHeight: 1.4
                }}>
                    Design System Components
                </p>
            </div>
            
            {/* Content area */}
            <div style={{
                flex: 1,
                padding: spacing.lg,
                overflow: "auto"
            }}>
                {/* Core Components Section */}
                {showComponents && (
                    <div style={{ marginBottom: spacing.xl }}>
                        <h2 style={{
                            margin: `0 0 ${spacing.md}px 0`,
                            fontSize: isCompact ? 18 : 20,
                            fontWeight: 600,
                            color: colors.accent
                        }}>
                            Core Components
                        </h2>
                        
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: isCompact 
                                ? "1fr" 
                                : isMedium 
                                    ? "repeat(2, 1fr)" 
                                    : "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: spacing.md
                        }}>
                            {/* Button Component */}
                            <div style={{
                                background: colors.surface,
                                borderRadius: spacing.md,
                                padding: spacing.lg,
                                border: `1px solid ${colors.border}`
                            }}>
                                <h3 style={{
                                    margin: `0 0 ${spacing.md}px 0`,
                                    fontSize: 16,
                                    fontWeight: 600,
                                    color: colors.accent
                                }}>
                                    Button
                                </h3>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: spacing.sm
                                }}>
                                    {/* Primary Button - Apple HIG compliant */}
                                    <button style={{
                                        background: colors.primary,
                                        color: "#FFFFFF",
                                        border: "none",
                                        borderRadius: spacing.sm,
                                        padding: `${spacing.sm}px ${spacing.md}px`,
                                        fontSize: 14,
                                        fontWeight: 600,
                                        fontFamily: "inherit",
                                        minHeight: 44, // Apple HIG minimum touch target
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        Primary Button
                                    </button>
                                    
                                    {/* Secondary Button */}
                                    <button style={{
                                        background: "transparent",
                                        color: colors.accent,
                                        border: `1px solid ${colors.accent}`,
                                        borderRadius: spacing.sm,
                                        padding: `${spacing.sm}px ${spacing.md}px`,
                                        fontSize: 14,
                                        fontWeight: 600,
                                        fontFamily: "inherit",
                                        minHeight: 44,
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        Secondary Button
                                    </button>
                                </div>
                            </div>
                            
                            {/* Card Component */}
                            <div style={{
                                background: colors.surface,
                                borderRadius: spacing.md,
                                padding: spacing.lg,
                                border: `1px solid ${colors.border}`
                            }}>
                                <h3 style={{
                                    margin: `0 0 ${spacing.md}px 0`,
                                    fontSize: 16,
                                    fontWeight: 600,
                                    color: colors.accent
                                }}>
                                    Card
                                </h3>
                                <div style={{
                                    background: colors.background,
                                    borderRadius: spacing.sm,
                                    padding: spacing.md,
                                    border: `1px solid ${colors.border}`
                                }}>
                                    <h4 style={{
                                        margin: `0 0 ${spacing.xs}px 0`,
                                        fontSize: 14,
                                        fontWeight: 600
                                    }}>
                                        Sample Card
                                    </h4>
                                    <p style={{
                                        margin: 0,
                                        fontSize: 13,
                                        opacity: 0.8,
                                        lineHeight: 1.4
                                    }}>
                                        This is a card component following Apple HIG guidelines.
                                    </p>
                                </div>
                            </div>
                            
                            {/* Color Palette */}
                            {showTokens && (
                                <div style={{
                                    background: colors.surface,
                                    borderRadius: spacing.md,
                                    padding: spacing.lg,
                                    border: `1px solid ${colors.border}`,
                                    gridColumn: isCompact ? "1" : isMedium ? "1 / -1" : "auto"
                                }}>
                                    <h3 style={{
                                        margin: `0 0 ${spacing.md}px 0`,
                                        fontSize: 16,
                                        fontWeight: 600,
                                        color: colors.accent
                                    }}>
                                        Color Palette
                                    </h3>
                                    <div style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: spacing.sm
                                    }}>
                                        {Object.entries(colors).map(([name, color]) => (
                                            typeof color === 'string' && !color.includes('rgba') && (
                                                <div key={name} style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    minWidth: 60
                                                }}>
                                                    <div style={{
                                                        width: 32,
                                                        height: 32,
                                                        background: color,
                                                        borderRadius: spacing.xs,
                                                        border: `1px solid ${colors.border}`,
                                                        marginBottom: spacing.xs
                                                    }} />
                                                    <span style={{
                                                        fontSize: 11,
                                                        opacity: 0.8,
                                                        textAlign: "center"
                                                    }}>
                                                        {name}
                                                    </span>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Status indicator */}
            <div style={{
                position: "absolute",
                bottom: spacing.sm,
                right: spacing.sm,
                background: "rgba(90, 200, 250, 0.2)",
                color: colors.accent,
                padding: `${spacing.xs}px ${spacing.sm}px`,
                borderRadius: spacing.xs,
                fontSize: 11,
                fontWeight: 500,
                pointerEvents: "none"
            }}>
                Live from Worker • {containerSize.width}×{containerSize.height}
            </div>
        </div>
    );
}

// Add property controls for Framer
addPropertyControls(EnhancedQuantumSpatialSystem, {
    variant: {
        title: "Variant",
        type: ControlType.Enum,
        options: ["quantum", "heritage", "superposition"],
        defaultValue: "quantum"
    },
    layout: {
        title: "Layout",
        type: ControlType.Enum,
        options: ["responsive", "fixed", "auto"],
        defaultValue: "responsive"
    },
    showSystemUI: {
        title: "Show System UI",
        type: ControlType.Boolean,
        defaultValue: false
    },
    showComponents: {
        title: "Show Components",
        type: ControlType.Boolean,
        defaultValue: true
    },
    showTokens: {
        title: "Show Tokens",
        type: ControlType.Boolean,
        defaultValue: true
    },
    minWidth: {
        title: "Min Width",
        type: ControlType.Number,
        defaultValue: 320,
        min: 280,
        max: 600,
        step: 20
    },
    maxWidth: {
        title: "Max Width", 
        type: ControlType.Number,
        defaultValue: 1200,
        min: 800,
        max: 1600,
        step: 50
    }
});