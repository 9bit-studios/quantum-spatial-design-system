import { addPropertyControls, ControlType } from "framer"
import React from "react"

export default function PremiumQuantumSpatial(props) {
    const {
        layout = "foundation",
        showGrid = true,
        colorIntensity = "subtle",
        variant = "quantum",
    } = props

    const workerUrl = `https://design-system.9bitstudios.io`

    // Premium color system with reduced intensity
    const premiumColors = {
        heritage: {
            bg: "#0A0D0A",
            surface: "#1A1E1A",
            text: "#E8F4E8",
            accent: "#2C5F2D",
            border: "#1B3D1A",
        },
        transitional: {
            bg: "#0A0C15",
            surface: "#151825",
            text: "#E8EDF8",
            accent: "#405de5",
            border: "#1E1F3A",
        },
        quantum: {
            bg: "#0D0D15",
            surface: "#1A1A25",
            text: "#F0F0F5",
            accent: "#5A4B93",
            border: "#2A1F3A",
        },
    }

    const colors = premiumColors[variant]

    // Component grid loader
    const [components, setComponents] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        // Simulate loading components from queue directory
        fetch(`${workerUrl}/components?type=all`)
            .then((response) => response.json())
            .then((data) => {
                setComponents(data.components || mockComponents)
                setLoading(false)
            })
            .catch(() => {
                setComponents(mockComponents)
                setLoading(false)
            })
    }, [])

    // Mock components for demonstration
    const mockComponents = [
        {
            name: "QuantumPixel",
            category: "Foundation",
            description: "Core pixel system with state transitions",
        },
        {
            name: "DimensionalGrid",
            category: "Foundation",
            description: "Spatial grid with perspective",
        },
        {
            name: "QuantumButton",
            category: "UI",
            description: "Interactive button with state evolution",
        },
        {
            name: "QuantumCard",
            category: "UI",
            description: "Content card with depth",
        },
        {
            name: "QuantumNavigation",
            category: "Navigation",
            description: "Portal navigation system",
        },
        {
            name: "QuantumForm",
            category: "Input",
            description: "Form elements with transitions",
        },
        {
            name: "QuantumModal",
            category: "Overlay",
            description: "Modal with dimensional effects",
        },
        {
            name: "QuantumProgress",
            category: "Feedback",
            description: "Progress with energy flow",
        },
    ]

    const layoutComponents = {
        foundation: (
            <div style={{ padding: "24px" }}>
                <div style={{ marginBottom: "32px" }}>
                    <h1
                        style={{
                            fontSize: "32px",
                            fontWeight: "600",
                            color: colors.text,
                            marginBottom: "8px",
                            fontFamily: "SF Pro Display, system-ui",
                        }}
                    >
                        Quantum-Spatial Foundation System
                    </h1>
                    <p
                        style={{
                            color: colors.text + "CC",
                            fontSize: "16px",
                            marginBottom: "24px",
                        }}
                    >
                        Premium design system components with M4 optimization
                    </p>
                </div>

                {/* Component Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "16px",
                        marginBottom: "32px",
                    }}
                >
                    {components.map((component, index) => (
                        <div
                            key={index}
                            style={{
                                background: colors.surface,
                                border: `1px solid ${colors.border}`,
                                borderRadius: "8px",
                                padding: "20px",
                                transition: "transform 0.2s ease",
                            }}
                        >
                            <h3
                                style={{
                                    color: colors.accent,
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    marginBottom: "8px",
                                }}
                            >
                                {component.name}
                            </h3>
                            <div
                                style={{
                                    color: colors.text + "99",
                                    fontSize: "12px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                    marginBottom: "8px",
                                }}
                            >
                                {component.category}
                            </div>
                            <p
                                style={{
                                    color: colors.text + "CC",
                                    fontSize: "14px",
                                    lineHeight: "1.4",
                                }}
                            >
                                {component.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        ),

        dashboard: (
            <div style={{ padding: "24px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "32px",
                    }}
                >
                    <div>
                        <h1
                            style={{
                                fontSize: "28px",
                                fontWeight: "600",
                                color: colors.text,
                                marginBottom: "4px",
                            }}
                        >
                            Component Dashboard
                        </h1>
                        <p
                            style={{
                                color: colors.text + "99",
                                fontSize: "14px",
                            }}
                        >
                            {components.length} components ready for deployment
                        </p>
                    </div>
                    <button
                        style={{
                            background: colors.accent,
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "6px",
                            fontSize: "14px",
                            cursor: "pointer",
                        }}
                    >
                        Deploy All
                    </button>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: "16px",
                        marginBottom: "24px",
                    }}
                >
                    <div
                        style={{
                            background: colors.surface,
                            border: `1px solid ${colors.border}`,
                            borderRadius: "8px",
                            padding: "16px",
                        }}
                    >
                        <h4
                            style={{
                                color: colors.accent,
                                fontSize: "14px",
                                marginBottom: "8px",
                            }}
                        >
                            Foundation
                        </h4>
                        <div
                            style={{
                                color: colors.text,
                                fontSize: "24px",
                                fontWeight: "600",
                            }}
                        >
                            {
                                components.filter(
                                    (c) => c.category === "Foundation"
                                ).length
                            }
                        </div>
                    </div>
                    <div
                        style={{
                            background: colors.surface,
                            border: `1px solid ${colors.border}`,
                            borderRadius: "8px",
                            padding: "16px",
                        }}
                    >
                        <h4
                            style={{
                                color: colors.accent,
                                fontSize: "14px",
                                marginBottom: "8px",
                            }}
                        >
                            UI Components
                        </h4>
                        <div
                            style={{
                                color: colors.text,
                                fontSize: "24px",
                                fontWeight: "600",
                            }}
                        >
                            {
                                components.filter((c) => c.category === "UI")
                                    .length
                            }
                        </div>
                    </div>
                    <div
                        style={{
                            background: colors.surface,
                            border: `1px solid ${colors.border}`,
                            borderRadius: "8px",
                            padding: "16px",
                        }}
                    >
                        <h4
                            style={{
                                color: colors.accent,
                                fontSize: "14px",
                                marginBottom: "8px",
                            }}
                        >
                            Interactive
                        </h4>
                        <div
                            style={{
                                color: colors.text,
                                fontSize: "24px",
                                fontWeight: "600",
                            }}
                        >
                            {
                                components.filter((c) =>
                                    [
                                        "Navigation",
                                        "Input",
                                        "Overlay",
                                        "Feedback",
                                    ].includes(c.category)
                                ).length
                            }
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        background: colors.surface,
                        border: `1px solid ${colors.border}`,
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            padding: "16px",
                            borderBottom: `1px solid ${colors.border}`,
                        }}
                    >
                        <h3
                            style={{
                                color: colors.text,
                                fontSize: "16px",
                                fontWeight: "500",
                            }}
                        >
                            Component Queue
                        </h3>
                    </div>
                    {components.map((component, index) => (
                        <div
                            key={index}
                            style={{
                                padding: "12px 16px",
                                borderBottom:
                                    index < components.length - 1
                                        ? `1px solid ${colors.border}`
                                        : "none",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        color: colors.text,
                                        fontSize: "14px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {component.name}
                                </div>
                                <div
                                    style={{
                                        color: colors.text + "99",
                                        fontSize: "12px",
                                    }}
                                >
                                    {component.category} • Ready for staging
                                </div>
                            </div>
                            <div
                                style={{
                                    background: colors.accent + "20",
                                    color: colors.accent,
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    fontSize: "11px",
                                    textTransform: "uppercase",
                                    fontWeight: "500",
                                }}
                            >
                                Ready
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),

        components: (
            <div style={{ padding: "24px" }}>
                <div style={{ marginBottom: "24px" }}>
                    <h2
                        style={{
                            color: colors.text,
                            fontSize: "24px",
                            fontWeight: "600",
                            marginBottom: "8px",
                        }}
                    >
                        Component Library
                    </h2>
                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                            marginBottom: "16px",
                        }}
                    >
                        {["Foundation", "UI", "Navigation", "Input"].map(
                            (category) => (
                                <button
                                    key={category}
                                    style={{
                                        background: colors.surface,
                                        color: colors.text + "CC",
                                        border: `1px solid ${colors.border}`,
                                        padding: "6px 12px",
                                        borderRadius: "4px",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                    }}
                                >
                                    {category}
                                </button>
                            )
                        )}
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "16px",
                    }}
                >
                    {components.map((component, index) => (
                        <div
                            key={index}
                            style={{
                                background: colors.surface,
                                border: `1px solid ${colors.border}`,
                                borderRadius: "8px",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    height: "120px",
                                    background: `linear-gradient(135deg, ${colors.accent}20, ${colors.accent}10)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderBottom: `1px solid ${colors.border}`,
                                }}
                            >
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        background: colors.accent,
                                        borderRadius: "6px",
                                        opacity: "0.8",
                                    }}
                                />
                            </div>
                            <div style={{ padding: "16px" }}>
                                <h4
                                    style={{
                                        color: colors.text,
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        marginBottom: "4px",
                                    }}
                                >
                                    {component.name}
                                </h4>
                                <div
                                    style={{
                                        color: colors.accent,
                                        fontSize: "11px",
                                        textTransform: "uppercase",
                                        fontWeight: "500",
                                        marginBottom: "8px",
                                    }}
                                >
                                    {component.category}
                                </div>
                                <p
                                    style={{
                                        color: colors.text + "CC",
                                        fontSize: "13px",
                                        lineHeight: "1.4",
                                    }}
                                >
                                    {component.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
    }

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: colors.bg,
                color: colors.text,
                fontFamily: "SF Pro Text, system-ui, sans-serif",
                position: "relative",
                overflow: "auto",
            }}
        >
            {/* Optional Grid Background */}
            {showGrid && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundImage: `
                        linear-gradient(to right, ${colors.border}40 1px, transparent 1px),
                        linear-gradient(to bottom, ${colors.border}40 1px, transparent 1px)
                    `,
                        backgroundSize: "32px 32px",
                        opacity: "0.3",
                        pointerEvents: "none",
                    }}
                />
            )}

            {/* Content */}
            <div style={{ position: "relative", zIndex: 1 }}>
                {loading ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "400px",
                            color: colors.text + "99",
                        }}
                    >
                        Loading components...
                    </div>
                ) : (
                    layoutComponents[layout]
                )}
            </div>

            {/* Status indicator */}
            <div
                style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    background: colors.surface + "CC",
                    color: colors.accent,
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontWeight: "500",
                    backdropFilter: "blur(10px)",
                }}
            >
                {variant.toUpperCase()} • M4 Enhanced
            </div>
        </div>
    )
}

addPropertyControls(PremiumQuantumSpatial, {
    layout: {
        title: "Layout",
        type: ControlType.Enum,
        options: ["foundation", "dashboard", "components"],
        defaultValue: "foundation",
    },
    variant: {
        title: "Variant",
        type: ControlType.Enum,
        options: ["heritage", "transitional", "quantum"],
        defaultValue: "quantum",
    },
    showGrid: {
        title: "Show Grid",
        type: ControlType.Boolean,
        defaultValue: true,
    },
    colorIntensity: {
        title: "Color Intensity",
        type: ControlType.Enum,
        options: ["subtle", "medium", "bold"],
        defaultValue: "subtle",
    },
})
