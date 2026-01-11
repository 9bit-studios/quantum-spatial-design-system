import React from "react"
import { addPropertyControls, ControlType } from "framer"
import type {
    PetersenShopifyProps,
    ResponsiveNumber,
    ResponsiveBoolean,
} from "./framer-types"

addPropertyControls({
    clientName: {
        type: ControlType.String,
        title: "Client Name",
        defaultValue: "Petersen Games",
    },
    // Responsive Typography
    headerFontSize: {
        type: ControlType.ResponsiveNumber,
        title: "Header Font Size",
        defaultValue: {
            default: 56,
            tablet: 40,
            mobile: 32,
        },
        min: 20,
        max: 80,
        unit: "px",
    },
    taglineFontSize: {
        type: ControlType.ResponsiveNumber,
        title: "Tagline Font Size",
        defaultValue: {
            default: 22,
            tablet: 18,
            mobile: 16,
        },
        min: 12,
        max: 30,
        unit: "px",
    },
    packageTitleFontSize: {
        type: ControlType.ResponsiveNumber,
        title: "Package Title Font Size",
        defaultValue: {
            default: 35,
            tablet: 28,
            mobile: 24,
        },
        min: 16,
        max: 50,
        unit: "px",
    },
    // Responsive Spacing
    containerPadding: {
        type: ControlType.ResponsiveNumber,
        title: "Container Padding",
        defaultValue: {
            default: 32,
            tablet: 24,
            mobile: 16,
        },
        min: 8,
        max: 60,
        unit: "px",
    },
    cardPadding: {
        type: ControlType.ResponsiveNumber,
        title: "Card Padding",
        defaultValue: {
            default: 48,
            tablet: 32,
            mobile: 24,
        },
        min: 16,
        max: 80,
        unit: "px",
    },
    // Responsive Layout
    showNavSubtitle: {
        type: ControlType.ResponsiveBoolean,
        title: "Show Nav Subtitle",
        defaultValue: {
            default: true,
            tablet: true,
            mobile: false,
        },
    },
    gridColumns: {
        type: ControlType.ResponsiveNumber,
        title: "Deliverables Grid Columns",
        defaultValue: {
            default: 2,
            tablet: 2,
            mobile: 1,
        },
        min: 1,
        max: 3,
        step: 1,
    },
    // Responsive Colors
    mobileBackgroundIntensity: {
        type: ControlType.Number,
        title: "Mobile Background Intensity",
        defaultValue: 0.8,
        min: 0.3,
        max: 1,
        step: 0.1,
    },
})
export default function PetersenShopifyPackage({
    clientName = "Petersen Games",
    projectType = "Shopify Premium Store",
    deliveryDate = "Monday",
    corePackagePrice = "$4,000",
    phase2Price = "$6,000",
    phase3Price = "$3,000",
    primaryColor = "#5AC8FA",
    accentColor = "#6A3093",
    // Responsive props
    headerFontSize = { default: 56, tablet: 40, mobile: 32 },
    taglineFontSize = { default: 22, tablet: 18, mobile: 16 },
    packageTitleFontSize = { default: 35, tablet: 28, mobile: 24 },
    containerPadding = { default: 32, tablet: 24, mobile: 16 },
    cardPadding = { default: 48, tablet: 32, mobile: 24 },
    showNavSubtitle = { default: true, tablet: true, mobile: false },
    gridColumns = { default: 2, tablet: 2, mobile: 1 },
    mobileBackgroundIntensity = 0.8,
}: PetersenShopifyProps) {
    return (
        <div className="quantum-presentation">
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .quantum-presentation {
                    font-family: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif';
                    background: radial-gradient(ellipse at center, #0B0C1A 0%, #000000 100%);
                    color: #FCFDF2;
                    min-height: 100vh;
                    cursor: none;
                    position: relative;
                    overflow-x: hidden;
                }

                /* Custom Cursor */
                .quantum-presentation::before {
                    content: '';
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    background: radial-gradient(circle, ${primaryColor} 0%, ${accentColor} 50%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 10000;
                    mix-blend-mode: screen;
                    transition: transform 0.1s ease;
                }

                /* Animated Background */
                .cosmic-background {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                    background: 
                        radial-gradient(2px 2px at 20px 30px, ${primaryColor}, transparent),
                        radial-gradient(2px 2px at 40px 70px, ${accentColor}, transparent),
                        radial-gradient(1px 1px at 90px 40px, #BF4080, transparent),
                        radial-gradient(1px 1px at 130px 80px, ${primaryColor}, transparent);
                    background-size: 200px 200px;
                    animation: cosmicDrift 20s linear infinite;
                }

                @keyframes cosmicDrift {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(-200px, -200px); }
                }

                /* Navigation */
                .nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    padding: 20px 40px;
                    background: rgba(11, 12, 26, 0.8);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(90, 200, 250, 0.2);
                }

                .nav-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .logo {
                    font-size: 1.5rem;
                    font-weight: 700;
                    background: linear-gradient(135deg, ${primaryColor}, ${accentColor});
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 0 20px rgba(90, 200, 250, 0.3);
                }

                .nav-subtitle {
                    color: rgba(252, 253, 242, 0.7);
                    font-size: 0.9rem;
                    font-weight: 300;
                }

                /* Container */
                .container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 100px ${containerPadding.default}px 2rem;
                }

                .header {
                    text-align: center;
                    margin-bottom: 4rem;
                }

                .header h1 {
                    font-size: ${headerFontSize.default}px;
                    font-weight: 500;
                    margin-bottom: 1rem;
                    background: linear-gradient(135deg, ${primaryColor}, ${accentColor}, #BF4080);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 0 30px rgba(90, 200, 250, 0.3);
                    line-height: 1.2;
                }

                .header .tagline {
                    font-size: ${taglineFontSize.default}px;
                    color: rgba(252, 253, 242, 0.8);
                    font-weight: 400;
                    margin-bottom: 0.5rem;
                }

                .header .subtitle {
                    font-size: 1rem;
                    color: rgba(252, 253, 242, 0.6);
                    font-weight: 500;
                    max-width: 800px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                /* Glass Cards */
                .glass-card {
                    background: rgba(13, 13, 21, 0.7);
                    border: 1px solid rgba(90, 200, 250, 0.2);
                    border-radius: 24px;
                    padding: 3rem;
                    backdrop-filter: blur(20px);
                    box-shadow: 
                        0 8px 32px rgba(0, 0, 0, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
                    margin: 20px 0;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .glass-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(90, 200, 250, 0.1), transparent);
                    transition: left 0.8s;
                }

                .glass-card:hover::before {
                    left: 100%;
                }

                .glass-card::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 6px;
                    background: linear-gradient(90deg, ${primaryColor}, ${accentColor}, #BF4080);
                }

                /* Package Headers */
                .package-type {
                    color: ${primaryColor};
                    font-size: 0.9rem;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 0.5rem;
                }

                .package-title {
                    font-size: ${packageTitleFontSize.default}px;
                    font-weight: 600;
                    color: #FCFDF2;
                    margin-bottom: 1rem;
                }

                .package-description {
                    font-size: 1.1rem;
                    color: rgba(252, 253, 242, 0.7);
                    line-height: 1.5;
                    margin-bottom: 2rem;
                }

                /* Pricing */
                .pricing-section {
                    background: linear-gradient(135deg, rgba(10, 6, 33, 0.6), rgba(106, 48, 147, 0.3));
                    padding: 2rem;
                    border-radius: 16px;
                    margin: 2rem 0;
                    text-align: center;
                    border: 1px solid rgba(90, 200, 250, 0.2);
                }

                .price-main {
                    font-size: 3rem;
                    font-weight: 600;
                    color: ${primaryColor};
                    margin-bottom: 0.5rem;
                    text-shadow: 0 0 20px rgba(90, 200, 250, 0.3);
                }

                .price-timeline {
                    color: ${accentColor};
                    font-weight: 500;
                    margin-bottom: 1rem;
                }

                .delivery-date {
                    background: linear-gradient(45deg, #10b981, #3b82f6);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 50px;
                    font-weight: bold;
                    margin: 0.5rem;
                    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
                    display: inline-block;
                }

                /* Phases */
                .phases-container {
                    margin: 2.5rem 0;
                }

                .phase {
                    margin-bottom: var(--foundation-lg, 32px);
                    padding: var(--foundation-lg, 32px);
                    background: var(--ultradimensional-bg, rgba(10, 6, 33, 0.95));
                    border-radius: var(--foundation-md, 24px);
                    border-left: 4px solid var(--apple-blue-bright, #007AFF);
                    backdrop-filter: var(--glass-effect, blur(20px) saturate(150%));
                    border: 1px solid var(--border-primary, rgba(252, 253, 242, 0.1));
                }

                .phase-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .phase-number {
                    background: linear-gradient(45deg, ${primaryColor}, ${accentColor});
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    margin-right: 1rem;
                    box-shadow: 0 0 20px rgba(90, 200, 250, 0.3);
                }

                .phase-title {
                    font-size: 1.3rem;
                    font-weight: 600;
                    color: #FCFDF2;
                }

                .phase-timeline {
                    margin-left: auto;
                    background: rgba(90, 200, 250, 0.1);
                    color: ${primaryColor};
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    border: 1px solid rgba(90, 200, 250, 0.3);
                }

                /* Value Highlight */
                .value-highlight {
                    background: linear-gradient(135deg, rgba(90, 200, 250, 0.1), rgba(106, 48, 147, 0.1));
                    padding: 2rem;
                    border-radius: 16px;
                    margin: 2rem 0;
                    text-align: center;
                    border: 1px solid rgba(90, 200, 250, 0.2);
                    backdrop-filter: blur(16px);
                }

                .value-highlight h3 {
                    color: #FCFDF2;
                    margin-bottom: 1rem;
                    font-size: 1.4rem;
                    font-weight: 600;
                }

                .value-highlight p {
                    color: rgba(252, 253, 242, 0.8);
                    font-size: 1.1rem;
                    line-height: 1.6;
                }

                /* Deliverables Grid */
                .deliverables-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.5rem;
                    margin-top: 1.5rem;
                }

                .deliverable-item {
                    background: var(--quantum-card-background, rgba(10, 10, 15, 0.85));
                    padding: var(--foundation-lg, 32px);
                    border-radius: var(--foundation-md, 24px);
                    border-left: 4px solid var(--apple-blue-bright, #007AFF);
                    backdrop-filter: var(--glass-effect, blur(20px) saturate(150%));
                    transition: all var(--animation-medium, 250ms) var(--apple-ease, cubic-bezier(0.25, 0.1, 0.25, 1));
                    border: 1px solid var(--border-primary, rgba(252, 253, 242, 0.1));
                }

                .deliverable-item:hover {
                    transform: translateY(-4px);
                    box-shadow: var(--quantum-shadow, 0 8px 32px rgba(99, 102, 241, 0.3));
                    border-color: var(--border-active, rgba(99, 102, 241, 0.6));
                }

                .deliverable-item h4 {
                    color: var(--text-primary, #FCFDF2);
                    margin-bottom: var(--foundation-sm, 16px);
                    font-size: var(--foundation-headline-size, 17px);
                    font-weight: var(--foundation-headline-weight, 600);
                    line-height: var(--foundation-headline-line-height, 1.3);
                }

                .deliverable-item p {
                    color: var(--text-tertiary, rgba(252, 253, 242, 0.7));
                    font-size: var(--foundation-callout-size, 16px);
                    line-height: var(--foundation-callout-line-height, 1.31);
                    letter-spacing: var(--letter-spacing, -0.022em);
                }

                /* Security Badges */
                .security-badge {
                    display: inline-block;
                    background: var(--glass-electric-indigo, rgba(79, 70, 229, 0.8));
                    color: var(--text-primary, #FCFDF2);
                    padding: var(--foundation-xs, 8px) var(--foundation-sm, 16px);
                    border-radius: var(--foundation-md, 24px);
                    font-size: var(--foundation-caption1-size, 12px);
                    font-weight: var(--foundation-caption1-weight, 600);
                    margin: var(--foundation-tiny, 4px);
                    border: 1px solid var(--border-active, rgba(99, 102, 241, 0.6));
                }

                /* Tech Stack */
                .tech-stack {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 1.5rem;
                }

                .tech-item {
                    background: linear-gradient(45deg, ${primaryColor}, ${accentColor});
                    color: white;
                    padding: 0.4rem 1rem;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 500;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                }

                /* Timeline */
                .timeline {
                    display: flex;
                    justify-content: space-between;
                    margin: 2rem 0;
                    position: relative;
                }

                .timeline::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, ${primaryColor}, ${accentColor}, #BF4080);
                    z-index: 1;
                }

                .timeline-item {
                    background: rgba(13, 13, 21, 0.8);
                    padding: 1rem;
                    border-radius: 10px;
                    text-align: center;
                    z-index: 2;
                    position: relative;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                    flex: 1;
                    margin: 0 0.5rem;
                    border: 1px solid rgba(90, 200, 250, 0.2);
                }

                .timeline-item.completed {
                    background: linear-gradient(45deg, #10b981, #3b82f6);
                    color: white;
                }

                .timeline-item h4 {
                    margin-bottom: 0.5rem;
                    font-size: 0.9rem;
                    font-weight: 600;
                }

                .timeline-item p {
                    font-size: 0.8rem;
                    opacity: 0.9;
                }

                /* CTA Section */
                .cta-section {
                    text-align: center;
                    margin-top: 4rem;
                    padding: 3rem 2rem;
                    background: rgba(10, 6, 33, 0.4);
                    border-radius: 24px;
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(90, 200, 250, 0.2);
                }

                .cta-section h2 {
                    font-size: var(--foundation-large-title-size, 34px);
                    margin-bottom: var(--foundation-md, 24px);
                    font-weight: var(--foundation-large-title-weight, 700);
                    background: linear-gradient(135deg, var(--subtle-violet, #6366F1), var(--electric-indigo, #4F46E5));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    letter-spacing: var(--foundation-h1-letter-spacing, -0.5px);
                }

                .cta-section p {
                    font-size: var(--foundation-title3-size, 20px);
                    margin-bottom: var(--foundation-lg, 32px);
                    color: var(--text-secondary, rgba(252, 253, 242, 0.85));
                    letter-spacing: var(--letter-spacing, -0.022em);
                }

                .cta-button {
                    background: var(--button-primary-bg, linear-gradient(135deg, var(--electric-indigo), var(--apple-blue-bright)));
                    color: var(--text-primary, #FCFDF2);
                    padding: var(--foundation-sm, 16px) var(--foundation-xl, 40px);
                    border: 1px solid var(--border-active, rgba(99, 102, 241, 0.6));
                    border-radius: var(--foundation-touch-target, 44px);
                    font-size: var(--foundation-headline-size, 17px);
                    font-weight: var(--foundation-headline-weight, 600);
                    cursor: pointer;
                    transition: all var(--animation-medium, 250ms) var(--apple-ease, cubic-bezier(0.25, 0.1, 0.25, 1));
                    margin: 0.5rem;
                    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
                    min-height: 44px;
                    min-width: 44px;
                }

                .cta-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 32px rgba(16, 185, 129, 0.4);
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .container {
                        padding: 80px 1rem 1rem;
                    }
                    
                    .header h1 {
                        font-size: 2.5rem;
                    }
                    
                    .glass-card {
                        padding: 2rem;
                        margin: 10px 0;
                    }
                    
                    .deliverables-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .timeline {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    
                    .timeline::before {
                        display: none;
                    }

                    .phase-header {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    
                    .phase-timeline {
                        margin-left: 0;
                        margin-top: 0.5rem;
                    }

                    .cta-button {
                        min-height: 56px;
                        min-width: 56px;
                    }
                }

                /* Entrance Animations */
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-in {
                    animation: fadeInUp 0.8s ease forwards;
                }

                /* Pulse Animation */
                .pulse {
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(90, 200, 250, 0.7);
                    }
                    70% {
                        box-shadow: 0 0 0 10px rgba(90, 200, 250, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(90, 200, 250, 0);
                                         }
                 }
                `,
                }}
            />

            <div className="cosmic-background"></div>

            <div className="container">
                {/* PHASE 1: IMMEDIATE DELIVERY */}
                <div className="glass-card animate-in">
                    <div className="package-type">Cosmic Horror Excellence</div>
                    <h2 className="package-title">
                        Phase 1: Core Store Launch
                    </h2>
                    <p className="package-description">
                        A fully functional, security-hardened Shopify store with
                        advanced navigation and filtering that your cosmic
                        horror gaming customers will love.
                    </p>

                    <div className="pricing-section">
                        <div className="price-main">{corePackagePrice}</div>
                        <div className="price-timeline">
                            DELIVERING {deliveryDate.toUpperCase()}
                        </div>
                    </div>

                    <div className="value-highlight">
                        <h3>What You're Getting {deliveryDate}</h3>
                        <p>
                            <strong>
                                A fully functional, security-hardened Shopify
                                store with advanced navigation and filtering
                                that your customers will love.
                            </strong>{" "}
                            This isn't just another basic theme—it's a
                            sophisticated ecommerce platform built specifically
                            for your cosmic horror miniatures empire.
                        </p>
                    </div>

                    <div className="phases-container">
                        <div className="phase">
                            <div className="phase-header">
                                <div className="phase-number">1</div>
                                <div className="phase-title">
                                    Core Store Development
                                </div>
                                <div className="phase-timeline">Week 1-3</div>
                            </div>
                            <div className="deliverables-grid">
                                <div className="deliverable-item">
                                    <h4>Enterprise-Level Security</h4>
                                    <p>
                                        Type-safe code architecture with
                                        vulnerability scanning. No data theft
                                        risks—every component has been secured
                                        and validated against cosmic intrusions.
                                    </p>
                                    <div style={{ marginTop: "1rem" }}>
                                        <span className="security-badge">
                                            SQL Injection Protection
                                        </span>
                                        <span className="security-badge">
                                            XSS Prevention
                                        </span>
                                        <span className="security-badge">
                                            CSRF Guards
                                        </span>
                                        <span className="security-badge">
                                            Eldritch Protections
                                        </span>
                                    </div>
                                </div>

                                <div className="deliverable-item">
                                    <h4>Quantum Spatial Navigation</h4>
                                    <p>
                                        Dynamic, intelligent navigation that
                                        adapts to your game inventory. Customers
                                        find their desired Old Ones and
                                        expansions 3x faster with our tag-based
                                        filtering system.
                                    </p>
                                </div>

                                <div className="deliverable-item">
                                    <h4>Cosmic Horror Design System</h4>
                                    <p>
                                        Dark, immersive design following Apple
                                        HIG guidelines but themed for the
                                        Cthulhu Mythos. Optimized for
                                        mobile-first shopping experiences in the
                                        cosmic darkness.
                                    </p>
                                </div>

                                <div className="deliverable-item">
                                    <h4>⚡ Sanity-Preserving Performance</h4>
                                    <p>
                                        Lightning-fast loading, SEO-optimized
                                        product pages, and Core Web Vitals
                                        scoring in the green. Your customers
                                        won't lose their minds waiting for pages
                                        to load.
                                    </p>
                                </div>

                                <div className="deliverable-item">
                                    <h4>🎮 Game-Specific Features</h4>
                                    <p>
                                        Custom meta displays for game stats,
                                        faction power levels, collection feeds,
                                        and dedicated landing pages for Cthulhu
                                        Wars, Planet Apocalypse, and each game
                                        line.
                                    </p>
                                </div>

                                <div className="deliverable-item">
                                    <h4>Analytics-Ready Foundation</h4>
                                    <p>
                                        Pre-configured for Klaviyo and Grid API
                                        integration. Clean data structure for
                                        maximum automation potential—track every
                                        cultist conversion.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tech-stack">
                        <span className="tech-item">Shopify Plus Ready</span>
                        <span className="tech-item">Mobile Optimized</span>
                        <span className="tech-item">SEO Configured</span>
                        <span className="tech-item">Type Safety</span>
                        <span className="tech-item">Progressive Web App</span>
                        <span className="tech-item">Cosmic Horror Themed</span>
                    </div>
                </div>

                {/* PHASE 2: AUTOMATION & GROWTH */}
                <div className="glass-card">
                    <div className="package-type">Automation Excellence</div>
                    <h2 className="package-title">
                        Phase 2: Automation & Growth Engine
                    </h2>
                    <p className="package-description">
                        Intelligent email automation that works while you dream
                        of R'lyeh. We're building a system that identifies your
                        best customers and automatically nurtures them.
                    </p>

                    <div className="pricing-section">
                        <div className="price-main">{phase2Price}</div>
                        <div className="price-timeline">NEXT 4 WEEKS</div>
                    </div>

                    <div className="value-highlight">
                        <h3>Transform Visitors Into Loyal Cultists</h3>
                        <p>
                            <strong>
                                Intelligent email automation that works while
                                you dream of R'lyeh.
                            </strong>{" "}
                            We're building a system that identifies your best
                            customers and automatically nurtures them through
                            personalized campaigns featuring exclusive
                            miniatures and lore.
                        </p>
                    </div>

                    <div className="phases-container">
                        <div className="phase">
                            <div className="phase-header">
                                <div className="phase-number">2</div>
                                <div className="phase-title">
                                    Automation & Growth
                                </div>
                                <div className="phase-timeline">Week 4-6</div>
                            </div>
                            <div className="deliverables-grid">
                                <div className="deliverable-item">
                                    <h4>Klaviyo Email Automation</h4>
                                    <p>
                                        Welcome series for new cultists,
                                        abandoned cart recovery with cosmic
                                        urgency, post-purchase upsells, and
                                        game-specific campaigns. Expect 20-30%
                                        revenue increase from email alone.
                                    </p>
                                </div>

                                <div className="deliverable-item">
                                    <h4>Lead Magnets & Cult Recruitment</h4>
                                    <p>
                                        Exit-intent popups with eldritch
                                        warnings, game-specific lead magnets
                                        (free STL files of lesser beings), and
                                        progressive profiling to build your
                                        email congregation organically.
                                    </p>
                                </div>

                                <div className="deliverable-item">
                                    <h4>Grid API Analytics</h4>
                                    <p>
                                        Real-time performance tracking, customer
                                        behavior analysis, and conversion
                                        optimization insights. Data-driven
                                        decisions guided by cosmic intelligence,
                                        not mere mortal guesswork.
                                    </p>
                                </div>

                                <div className="deliverable-item">
                                    <h4>5 Game Landing Pages</h4>
                                    <p>
                                        Dedicated, conversion-optimized pages
                                        for Cthulhu Wars, Planet Apocalypse,
                                        Hyperspace, Evil High Priest, and Orcs
                                        Must Die with custom lore displays and
                                        targeted messaging.
                                    </p>
                                </div>

                                <div className="deliverable-item">
                                    <h4>Smart Product Features</h4>
                                    <p>
                                        Category feeds for each faction,
                                        collection sliders showcasing Old Ones,
                                        and recommendation engines that increase
                                        average order value by 25% through
                                        strategic upsells.
                                    </p>
                                </div>

                                <div className="deliverable-item">
                                    <h4>Social Media Integration</h4>
                                    <p>
                                        Link-in-bio optimization for Sandy's
                                        content, social proof integration
                                        showing community engagement, and
                                        branded presence across platforms
                                        spreading the cosmic word.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PHASE 3: PATREON & MEMBERSHIP */}
                <div className="glass-card">
                    <div className="package-type">Community Excellence</div>
                    <h2 className="package-title">
                        Phase 3: Community & STL Membership
                    </h2>
                    <p className="package-description">
                        Cosmic horror media kit design, professional eldritch
                        branding, and optimized tier structure to increase
                        monthly revenue from the faithful.
                    </p>

                    <div className="pricing-section">
                        <div className="price-main">{phase3Price}</div>
                        <div className="price-timeline">MONTH 2</div>
                    </div>

                    <div className="phases-container">
                        <div className="phase">
                            <div className="phase-header">
                                <div className="phase-number">3</div>
                                <div className="phase-title">
                                    Community Platform
                                </div>
                                <div className="phase-timeline">Month 2</div>
                            </div>
                            <div className="deliverables-grid">
                                <div className="deliverable-item">
                                    <h4>Patreon Professional Upgrade</h4>
                                    <p>
                                        Cosmic horror media kit design,
                                        professional eldritch branding, and
                                        optimized tier structure to increase
                                        monthly revenue from the faithful.
                                    </p>
                                </div>

                                <div className="deliverable-item">
                                    <h4>STL Membership Platform</h4>
                                    <p>
                                        Integrated with Shopify, offering
                                        exclusive digital miniatures and
                                        creating recurring revenue stream from
                                        3D printing cultists worldwide.
                                    </p>
                                </div>

                                <div className="deliverable-item">
                                    <h4>Content Strategy</h4>
                                    <p>
                                        Social media templates featuring Sandy's
                                        cosmic wisdom, email announcement
                                        systems for new releases, and community
                                        engagement tools for the growing cult.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TIMELINE */}
                <div className="glass-card">
                    <h2
                        style={{
                            textAlign: "center",
                            marginBottom: "2rem",
                            color: "#FCFDF2",
                        }}
                    >
                        Project Timeline
                    </h2>
                    <div className="timeline">
                        <div className="timeline-item completed">
                            <h4>Week 1-3</h4>
                            <p>Core Development</p>
                            <small>COMPLETE</small>
                        </div>
                        <div className="timeline-item completed">
                            <h4>{deliveryDate}</h4>
                            <p>Store Launch</p>
                            <small>DELIVERING</small>
                        </div>
                        <div className="timeline-item">
                            <h4>Week 4-6</h4>
                            <p>Automation Setup</p>
                            <small>EMAIL FLOWS</small>
                        </div>
                        <div className="timeline-item">
                            <h4>Month 2</h4>
                            <p>Membership Platform</p>
                            <small>COMMUNITY</small>
                        </div>
                    </div>
                </div>

                {/* VALUE PROPOSITION */}
                <div className="glass-card">
                    <h2
                        style={{
                            textAlign: "center",
                            marginBottom: "2rem",
                            color: "#FCFDF2",
                        }}
                    >
                        Why This Investment Pays For Itself
                    </h2>

                    <div className="deliverables-grid">
                        <div className="deliverable-item">
                            <h4>Immediate Impact</h4>
                            <p>
                                Professional cosmic horror store increases
                                conversion rates by 40-60%. Better UX = more
                                miniature sales from day one.
                            </p>
                        </div>

                        <div className="deliverable-item">
                            <h4>Automation ROI</h4>
                            <p>
                                Email automation typically generates $40 for
                                every $1 invested. Pay for itself in the first
                                month of cultist conversions.
                            </p>
                        </div>

                        <div className="deliverable-item">
                            <h4>Risk Elimination</h4>
                            <p>
                                Security vulnerabilities can cost thousands in
                                lost sales and reputation. We prevent eldritch
                                intrusions and data breaches.
                            </p>
                        </div>

                        <div className="deliverable-item">
                            <h4>Scalability</h4>
                            <p>
                                Built to handle growth as your cosmic empire
                                expands. No rebuilding needed as you venture
                                into new realms and markets.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="value-highlight">
                    <h3>Why Choose Cosmic Horror Expertise?</h3>
                    <p>
                        <strong>Eldritch Ecommerce Mastery:</strong> We build
                        with the same principles the Old Ones
                        use—security-first, performance-optimized, and
                        madness-inducing user experiences. Your project benefits
                        from our deep understanding of cosmic horror aesthetics
                        and development best practices.
                    </p>
                </div>

                {/* CTA */}
                <div className="cta-section">
                    <h2>Ready to Launch Your Cosmic Empire?</h2>
                    <p>
                        Your custom Shopify store with advanced security and
                        automation is ready to awaken {deliveryDate}.
                    </p>

                    <button className="cta-button">
                        Launch Phase 1 - {corePackagePrice}
                    </button>
                    <button className="cta-button">
                        Add Automation - {phase2Price}
                    </button>
                    <button className="cta-button">
                        Full Package - $13,000
                    </button>

                    <p style={{ marginTop: "2rem", opacity: 0.9 }}>
                        <strong>Next Steps:</strong> Schedule your store
                        walkthrough and finalize {deliveryDate}'s deployment
                        timeline.
                    </p>
                </div>
            </div>
        </div>
    )
}
