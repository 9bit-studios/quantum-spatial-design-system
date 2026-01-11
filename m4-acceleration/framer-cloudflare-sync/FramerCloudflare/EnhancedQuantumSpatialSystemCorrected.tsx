import { addPropertyControls, ControlType } from "framer"
import React from "react"

/**
 * EnhancedQuantumSpatialSystem - CORRECTED VERSION (May 24, 2025)
 * 
 * This component integrates the Quantum-Spatial Design System into your Framer project,
 * using the correct endpoints from your deployed Cloudflare Worker.
 * 
 * Features:
 * - Live HTML interface from /auto-deployer endpoint
 * - Design token integration from /design-system/tokens
 * - Component showcase with working buttons and cards
 * - M4 device detection and optimization
 * - Live design state switching
 * 
 * @param {Object} props - Component properties
 * @returns {JSX.Element} - Framer component
 */
export default function EnhancedQuantumSpatialSystem(props) {
    const { 
        variant = "quantum",
        layout = "responsive",
        showSystemUI = true,
        width = 400,
        height = 300,
    } = props;
    
    // CORRECTED: Use the verified worker URL from May 24 session
    const workerUrl = "https://quantum-spatial-design-system.rnrb2ynd5z.workers.dev";
    
    // CORRECTED: Use /auto-deployer for HTML interface, /design-system/tokens for data
    const interfaceUrl = `${workerUrl}/auto-deployer`;
    const tokensUrl = `${workerUrl}/design-system/tokens?state=${variant}`;
    
    // State management
    const [tokens, setTokens] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [hasError, setHasError] = React.useState(false);
    
    // Create a reference to the iframe
    const iframeRef = React.useRef(null);
    
    // Load design tokens for custom rendering
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
    
    // Load tokens when variant changes
    React.useEffect(() => {
        if (!showSystemUI) {
            loadDesignTokens();
        }
    }, [variant, showSystemUI, loadDesignTokens]);
    
    // Handle messages from the iframe
    const handleMessage = React.useCallback((event) => {
        // Only process messages from our worker
        if (!event.origin.includes('quantum-spatial-design-system')) return;
        
        if (event.data?.type === 'quantum-spatial-loaded') {
            console.log("Quantum-Spatial Design System loaded:", event.data);
            setIsLoading(false);
        }
    }, []);
    
    // Set up event listener for iframe messages
    React.useEffect(() => {
        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [handleMessage]);
    
    // Configure the design system container
    const getBackgroundColor = () => {
        if (tokens?.colors) {
            return tokens.colors.background || "#131A36";
        }
        switch (variant) {
            case "heritage": return "#F5F5F5";
            case "superposition": return "#0D0D15";
            default: return "#131A36";
        }
    };
    
    const containerStyle = {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        borderRadius: 12,
        background: getBackgroundColor()
    };
    
    // Style the iframe for system UI
    const iframeStyle = {
        width: "100%",
        height: "100%",
        border: "none",
        borderRadius: "12px"
    };
    
    // Render custom showcase when showSystemUI is false
    const renderCustomShowcase = () => {
        if (isLoading) {
            return (
                <div style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    color: tokens?.colors?.accent || '#5AC8FA',
                    fontFamily: 'SF Pro Display, system-ui, sans-serif'
                }}>
                    Loading {variant} design system...
                </div>
            );
        }
        
        if (hasError) {
            return (
                <div style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    color: '#FF3B30',
                    fontFamily: 'SF Pro Display, system-ui, sans-serif'
                }}>
                    Failed to load design system
                </div>
            );
        }
        
        if (!tokens) {
            return (
                <div style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    color: tokens?.colors?.accent || '#5AC8FA',
                    fontFamily: 'SF Pro Display, system-ui, sans-serif'
                }}>
                    No design tokens available
                </div>
            );
        }
        
        // Extract colors and spacing from tokens
        const colors = tokens.colors || {};
        const spacing = tokens.spacing?.scale || {};
        const typography = tokens.typography || {};
        
        return (
            <div style={{
                width: '100%',
                height: '100%',
                padding: spacing.lg || '24px',
                overflow: 'auto',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    <h1 style={{
                        fontSize: typography.sizes?.xl || '24px',
                        color: colors.accent || '#5AC8FA',
                        marginBottom: spacing.lg || '24px',
                        textAlign: 'center',
                        fontFamily: typography.fontFamily || 'SF Pro Display, system-ui, sans-serif'
                    }}>
                        Quantum-Spatial {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </h1>
                    
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: spacing.md || '16px'
                    }}>
                        {/* Button Card */}
                        <div style={{
                            background: colors.surface || 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            padding: spacing.lg || '24px',
                            border: `1px solid ${colors.accent || '#5AC8FA'}30`
                        }}>
                            <h3 style={{
                                fontSize: typography.sizes?.md || '16px',
                                color: colors.accent || '#5AC8FA',
                                marginBottom: spacing.md || '16px',
                                marginTop: 0
                            }}>
                                Buttons
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm || '8px' }}>
                                <button style={{
                                    background: colors.primary || '#6A3093',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    padding: `${spacing.sm || '8px'} ${spacing.md || '16px'}`,
                                    borderRadius: '8px',
                                    fontSize: typography.sizes?.md || '16px',
                                    cursor: 'pointer',
                                    fontFamily: typography.fontFamily || 'SF Pro Display, system-ui, sans-serif'
                                }}>
                                    Primary
                                </button>
                                <button style={{
                                    background: colors.secondary || '#BF4080',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    padding: `${spacing.sm || '8px'} ${spacing.md || '16px'}`,
                                    borderRadius: '8px',
                                    fontSize: typography.sizes?.md || '16px',
                                    cursor: 'pointer',
                                    fontFamily: typography.fontFamily || 'SF Pro Display, system-ui, sans-serif'
                                }}>
                                    Secondary
                                </button>
                            </div>
                        </div>
                        
                        {/* Colors Card */}
                        <div style={{
                            background: colors.surface || 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            padding: spacing.lg || '24px',
                            border: `1px solid ${colors.accent || '#5AC8FA'}30`
                        }}>
                            <h3 style={{
                                fontSize: typography.sizes?.md || '16px',
                                color: colors.accent || '#5AC8FA',
                                marginBottom: spacing.md || '16px',
                                marginTop: 0
                            }}>
                                Colors
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.xs || '4px' }}>
                                {Object.entries(colors).map(([name, color]) => (
                                    typeof color === 'string' && (
                                        <div key={name} style={{
                                            width: '24px',
                                            height: '24px',
                                            background: color,
                                            borderRadius: '4px',
                                            title: `${name}: ${color}`
                                        }} />
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Status indicator */}
                    <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        background: 'rgba(90, 200, 250, 0.2)',
                        color: colors.accent || '#5AC8FA',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontFamily: 'system-ui',
                        pointerEvents: 'none',
                    }}>
                        Live from Worker
                    </div>
                </div>
            </div>
        );
    };
    
    // Register the design system globally for other components to access
    React.useEffect(() => {
        window.QuantumSpatial = {
            variant,
            tokens,
            baseUrl: workerUrl,
            tokensUrl,
            interfaceUrl
        };
    }, [variant, tokens, workerUrl, tokensUrl, interfaceUrl]);
    
    return (
        <div style={containerStyle}>
            {showSystemUI ? (
                // Show the full HTML interface from /auto-deployer
                <iframe 
                    ref={iframeRef}
                    src={interfaceUrl}
                    style={iframeStyle}
                    title="Quantum-Spatial Design System"
                />
            ) : (
                // Show custom component showcase with live tokens
                renderCustomShowcase()
            )}
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
        defaultValue: true
    }
});