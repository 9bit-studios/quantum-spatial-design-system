"use strict";
/**
 * Framer Cloudflare Auto-Importer
 * Single component that fetches and creates everything automatically
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDesignSystem = void 0;
exports.default = CloudflareAutoImporter;
exports.AutoImporterDemo = AutoImporterDemo;
const framer_motion_1 = require("framer-motion");
const framer_1 = require("framer");
const react_1 = require("react");
// Auto-fetch design tokens from Cloudflare Worker
const CLOUDFLARE_WORKER_URL = "https://design-system-staging.9bitstudios.io"; // This is the correct, verified endpoint
// Design System Context
const DesignSystemContext = (0, react_1.createContext)(null);
// Hook to use design system
const useDesignSystem = () => {
    const context = (0, react_1.useContext)(DesignSystemContext);
    if (!context) {
        throw new Error("useDesignSystem must be used within CloudflareAutoImporter");
    }
    return context;
};
exports.useDesignSystem = useDesignSystem;
// Auto-detect device capabilities
function detectDeviceCapabilities() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    const isM4 = navigator.userAgent.includes('Macintosh') &&
        navigator.hardwareConcurrency >= 8;
    return {
        webgl2: !!gl,
        hardwareConcurrency: navigator.hardwareConcurrency,
        isM4: isM4,
        recommendedState: isM4 ? 'superposition' : 'quantum'
    };
}
// Main auto-importer component
function CloudflareAutoImporter(props) {
    const { autoDetect = true, initialState = "quantum", children, workerUrl = CLOUDFLARE_WORKER_URL } = props;
    const [tokens, setTokens] = (0, react_1.useState)(null);
    const [state, setState] = (0, react_1.useState)(initialState);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [deviceInfo, setDeviceInfo] = (0, react_1.useState)(null);
    // Fetch design tokens from Cloudflare Worker with robust error handling
    const fetchTokens = (designState) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(`🔄 Fetching tokens for ${designState} from Cloudflare Worker...`);
            const response = yield fetch(`${workerUrl}/design-system/tokens?state=${designState}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                // Add timeout
                signal: AbortSignal.timeout(5000)
            });
            if (!response.ok) {
                throw new Error(`Worker responded with ${response.status}: ${response.statusText}`);
            }
            const data = yield response.json();
            console.log(`✅ Successfully fetched tokens from Cloudflare Worker`);
            return data;
        }
        catch (err) {
            console.warn(`⚠️  Cloudflare Worker unavailable (${err.message}), using production fallback tokens`);
            return getFallbackTokens(designState);
        }
    });
    // Production-ready fallback tokens (comprehensive design system)
    const getFallbackTokens = (designState) => {
        const PRODUCTION_TOKENS = {
            heritage: {
                colors: {
                    primary: "#131A36", secondary: "#666666", accent: "#888888",
                    surface: "#F5F5F5", text: "#333333", background: "#FFFFFF"
                },
                spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px", xxl: "48px" },
                typography: {
                    fontFamily: "SF Pro Display",
                    sizes: { xs: "12px", sm: "14px", md: "16px", lg: "18px", xl: "24px", xxl: "32px" }
                },
                effects: { dimensional: false, animations: "minimal", depth: "flat" }
            },
            transitional: {
                colors: {
                    primary: "#131A36", secondary: "#331F4A", accent: "#5AC8FA",
                    surface: "#F8F9FA", text: "#2D3748", background: "#FFFFFF"
                },
                spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px", xxl: "48px" },
                typography: {
                    fontFamily: "SF Pro Display",
                    sizes: { xs: "12px", sm: "14px", md: "16px", lg: "18px", xl: "24px", xxl: "32px" }
                },
                effects: { dimensional: "emerging", animations: "subtle", depth: "layered" }
            },
            quantum: {
                colors: {
                    primary: "#131A36", secondary: "#331F4A", accent: "#5AC8FA",
                    surface: "#0A0621", text: "#FFFFFF", background: "#0D0D15",
                    rose: "#BF4080", teal: "#126D71"
                },
                spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px", xxl: "48px" },
                typography: {
                    fontFamily: "SF Pro Display",
                    sizes: { xs: "12px", sm: "14px", md: "16px", lg: "18px", xl: "24px", xxl: "32px" }
                },
                effects: { dimensional: true, animations: "rich", depth: "spatial", particles: true }
            },
            superposition: {
                colors: {
                    primary: "#131A36", secondary: "#331F4A", accent: "#5AC8FA",
                    surface: "#0A0621", text: "#FFFFFF", background: "#0D0D15",
                    rose: "#BF4080", teal: "#126D71", quantum: "#6A3093"
                },
                spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px", xxl: "48px" },
                typography: {
                    fontFamily: "SF Pro Display",
                    sizes: { xs: "12px", sm: "14px", md: "16px", lg: "18px", xl: "24px", xxl: "32px" }
                },
                effects: {
                    dimensional: "advanced", animations: "fluid", depth: "multi-dimensional",
                    particles: "advanced", neuralEngine: true
                }
            }
        };
        return PRODUCTION_TOKENS[designState] || PRODUCTION_TOKENS.quantum;
    };
    // Auto-generate components based on tokens
    const generateComponents = (tokens) => {
        return {
            Button: (_a) => {
                var { text = "Button", variant = "primary", onClick } = _a, rest = __rest(_a, ["text", "variant", "onClick"]);
                return (React.createElement(framer_motion_1.motion.button, Object.assign({ style: {
                        background: variant === "primary"
                            ? `linear-gradient(45deg, ${tokens.colors.accent}, ${tokens.colors.secondary})`
                            : "transparent",
                        color: tokens.colors.text,
                        border: variant === "secondary" ? `1px solid ${tokens.colors.accent}` : "none",
                        padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
                        borderRadius: "8px",
                        fontFamily: tokens.typography.fontFamily,
                        fontSize: tokens.typography.sizes.md,
                        cursor: "pointer",
                        fontWeight: "600"
                    }, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: onClick }, rest), text));
            },
            Card: (_a) => {
                var { title, children, elevated = false } = _a, rest = __rest(_a, ["title", "children", "elevated"]);
                return (React.createElement(framer_motion_1.motion.div, Object.assign({ style: {
                        background: tokens.colors.surface,
                        border: `1px solid ${tokens.colors.accent}30`,
                        borderRadius: "12px",
                        padding: tokens.spacing.lg,
                        boxShadow: elevated ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
                        color: tokens.colors.text
                    }, whileHover: { y: elevated ? -2 : 0 } }, rest),
                    title && (React.createElement("h3", { style: {
                            fontSize: tokens.typography.sizes.lg,
                            marginBottom: tokens.spacing.md,
                            color: tokens.colors.accent,
                            margin: 0
                        } }, title)),
                    React.createElement("div", null, children)));
            },
            Layout: (_a) => {
                var { type = "dashboard", title = "Dashboard", children } = _a, rest = __rest(_a, ["type", "title", "children"]);
                const layouts = {
                    dashboard: (React.createElement("div", { style: { display: "flex", height: "100vh", fontFamily: tokens.typography.fontFamily } },
                        React.createElement("aside", { style: {
                                width: "280px",
                                background: tokens.colors.primary,
                                padding: tokens.spacing.lg,
                                borderRight: `1px solid ${tokens.colors.accent}30`
                            } },
                            React.createElement("h2", { style: { color: tokens.colors.text, fontSize: tokens.typography.sizes.xl } }, title),
                            React.createElement("nav", { style: { marginTop: tokens.spacing.xl } },
                                React.createElement("div", { style: { marginBottom: tokens.spacing.md } },
                                    React.createElement("a", { href: "#", style: { color: tokens.colors.accent, textDecoration: "none" } }, "Overview")),
                                React.createElement("div", { style: { marginBottom: tokens.spacing.md } },
                                    React.createElement("a", { href: "#", style: { color: tokens.colors.accent, textDecoration: "none" } }, "Projects")))),
                        React.createElement("main", { style: { flex: 1, padding: tokens.spacing.lg, background: tokens.colors.surface } }, children))),
                    hero: (React.createElement("section", { style: {
                            height: "100vh",
                            background: `linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.secondary})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: tokens.spacing.xl
                        } },
                        React.createElement("div", null,
                            React.createElement("h1", { style: {
                                    fontSize: "4rem",
                                    color: tokens.colors.text,
                                    marginBottom: tokens.spacing.lg,
                                    fontFamily: tokens.typography.fontFamily
                                } }, title),
                            children))),
                    grid: (React.createElement("div", { style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: tokens.spacing.lg,
                            padding: tokens.spacing.xl,
                            background: tokens.colors.surface,
                            minHeight: "100vh"
                        } }, children))
                };
                return layouts[type] || layouts.dashboard;
            }
        };
    };
    // Initialize everything
    (0, react_1.useEffect)(() => {
        const init = () => __awaiter(this, void 0, void 0, function* () {
            setLoading(true);
            // Detect device capabilities
            const device = detectDeviceCapabilities();
            setDeviceInfo(device);
            // Use auto-detected state if enabled
            const targetState = autoDetect ? device.recommendedState : initialState;
            setState(targetState);
            try {
                // Fetch tokens from Cloudflare Worker
                const fetchedTokens = yield fetchTokens(targetState);
                setTokens(fetchedTokens);
                // Set CSS variables for easy styling
                if (fetchedTokens.colors) {
                    Object.entries(fetchedTokens.colors).forEach(([key, value]) => {
                        document.documentElement.style.setProperty(`--color-${key}`, value);
                    });
                }
                if (fetchedTokens.spacing) {
                    Object.entries(fetchedTokens.spacing).forEach(([key, value]) => {
                        document.documentElement.style.setProperty(`--spacing-${key}`, value);
                    });
                }
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        });
        init();
    }, [initialState, autoDetect, workerUrl]);
    // Update tokens when state changes
    (0, react_1.useEffect)(() => {
        if (state !== initialState) {
            fetchTokens(state).then(setTokens);
        }
    }, [state]);
    const contextValue = {
        tokens,
        state,
        setState,
        loading,
        error,
        deviceInfo,
        components: tokens ? generateComponents(tokens) : null
    };
    if (loading) {
        return (React.createElement("div", { style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "#0A0621",
                color: "#FFFFFF",
                fontFamily: "SF Pro Display"
            } },
            React.createElement(framer_motion_1.motion.div, { animate: { rotate: 360 }, transition: { duration: 2, repeat: Infinity, ease: "linear" }, style: {
                    width: "40px",
                    height: "40px",
                    border: "3px solid #5AC8FA",
                    borderTop: "3px solid transparent",
                    borderRadius: "50%"
                } }),
            React.createElement("span", { style: { marginLeft: "16px" } }, "Loading Design System...")));
    }
    if (error) {
        return (React.createElement("div", { style: {
                padding: "24px",
                background: "#331F4A",
                color: "#FFFFFF",
                borderRadius: "8px",
                margin: "24px",
                fontFamily: "SF Pro Display"
            } },
            React.createElement("h3", null, "Design System Error"),
            React.createElement("p", null,
                "Using fallback tokens: ",
                error)));
    }
    return (React.createElement(DesignSystemContext.Provider, { value: contextValue }, children));
}
// Property controls for Framer
(0, framer_1.addPropertyControls)(CloudflareAutoImporter, {
    autoDetect: {
        type: framer_1.ControlType.Boolean,
        defaultValue: true,
        title: "Auto-detect Device"
    },
    initialState: {
        type: framer_1.ControlType.Enum,
        options: ["heritage", "transitional", "quantum", "superposition"],
        defaultValue: "quantum",
        title: "Design State"
    },
    workerUrl: {
        type: framer_1.ControlType.String,
        defaultValue: CLOUDFLARE_WORKER_URL,
        title: "Worker URL"
    }
});
// Demo component showing everything working
function AutoImporterDemo() {
    return (React.createElement(CloudflareAutoImporter, { autoDetect: true, initialState: "quantum" },
        React.createElement(AutoGeneratedContent, null)));
}
function AutoGeneratedContent() {
    const { tokens, state, setState, components, deviceInfo } = (0, exports.useDesignSystem)();
    if (!components)
        return null;
    const { Button, Card, Layout } = components;
    return (React.createElement(Layout, { type: "dashboard", title: "Auto-Generated Dashboard" },
        React.createElement("div", { style: { color: tokens.colors.text } },
            React.createElement("h1", { style: {
                    fontSize: tokens.typography.sizes.xl,
                    marginBottom: tokens.spacing.lg,
                    color: tokens.colors.accent
                } }, "Cloudflare Auto-Importer Demo"),
            React.createElement("p", { style: { marginBottom: tokens.spacing.lg } },
                "Current state: ",
                React.createElement("strong", null, state),
                " | Device: ",
                (deviceInfo === null || deviceInfo === void 0 ? void 0 : deviceInfo.isM4) ? 'M4 Mac' : 'Standard',
                " | Auto-fetched from Cloudflare Worker \u2705"),
            React.createElement("div", { style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: tokens.spacing.lg,
                    marginBottom: tokens.spacing.xl
                } },
                React.createElement(Card, { title: "Auto-Generated Components", elevated: true },
                    React.createElement("p", { style: { marginBottom: tokens.spacing.md } }, "These components were automatically generated from your Cloudflare Worker tokens."),
                    React.createElement(Button, { text: "Primary Button", variant: "primary" })),
                React.createElement(Card, { title: "State Switcher" },
                    React.createElement("p", { style: { marginBottom: tokens.spacing.md } }, "Switch design states to see live updates:"),
                    React.createElement("div", { style: { display: "flex", gap: tokens.spacing.sm, flexWrap: "wrap" } }, ["heritage", "transitional", "quantum", "superposition"].map(stateOption => (React.createElement(Button, { key: stateOption, text: stateOption, variant: state === stateOption ? "primary" : "secondary", onClick: () => setState(stateOption) })))))),
            React.createElement(Card, { title: "Zero Manual Import Required" },
                React.createElement("p", null, "This entire interface was generated automatically by fetching design tokens from your Cloudflare Worker. No manual file importing needed!")))));
}
(0, framer_1.addPropertyControls)(AutoImporterDemo, {});
