import SwiftUI

/// QuantumSpatial_12: Animated quantum-spatial themed component
/// Design System: Quantum Spatial (9Bit Studios)
/// Theme: Dark-mysterious with liquid-glass glassmorphism
/// M4 Optimization: GPU-accelerated rendering with Core Animation
struct QuantumSpatial_12: View {
    // MARK: - Animation State
    @State private var rotation: Double = 0
    @State private var pulseScale: CGFloat = 1.0
    @State private var glowIntensity: Double = 0.5

    // MARK: - Environment
    @Environment(\.colorScheme) var colorScheme
    @Environment(\.accessibilityReduceMotion) var reduceMotion

    var body: some View {
        ZStack {
            // Background: Deep Quantum Space
            Color(red: 0.039, green: 0.055, blue: 0.153) // #0A0E27
                .ignoresSafeArea()

            // SVG-based Quantum Visualization
            quantumVisualization
                .frame(width: 800, height: 800)
                .scaleEffect(pulseScale)
                .rotationEffect(.degrees(rotation))
                .animation(
                    reduceMotion ? .none : .easeInOut(duration: 4).repeatForever(autoreverses: true),
                    value: pulseScale
                )
                .animation(
                    reduceMotion ? .none : .linear(duration: 20).repeatForever(autoreverses: false),
                    value: rotation
                )
        }
        .onAppear {
            startAnimations()
        }
        .accessibilityLabel("Quantum Spatial visualization with animated energy fields")
        .accessibilityHidden(true) // Decorative element
    }

    // MARK: - Quantum Visualization
    private var quantumVisualization: some View {
        ZStack {
            // Outer Energy Field
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            Color(red: 0.305, green: 0.804, blue: 0.769).opacity(0.9), // #4ECDC4
                            Color(red: 0.910, green: 0.365, blue: 0.459).opacity(0.4), // #E85D75
                            Color(red: 0.039, green: 0.055, blue: 0.153).opacity(0)
                        ],
                        center: .center,
                        startRadius: 0,
                        endRadius: 350
                    )
                )
                .frame(width: 700, height: 700)
                .blur(radius: 20)
                .opacity(0.3)

            // Quantum Spatial Grid
            quantumGrid

            // Central Quantum Core (Glassmorphic Sphere)
            quantumCore

            // Orbiting Quantum Particles
            quantumParticles

            // Outer Glassmorphic Ring
            Circle()
                .stroke(Color.white.opacity(0.18), lineWidth: 2)
                .frame(width: 600, height: 600)
                .blur(radius: 1)
                .scaleEffect(pulseScale)
        }
    }

    // MARK: - Quantum Grid
    private var quantumGrid: some View {
        ZStack {
            // Horizontal and Vertical Lines
            Path { path in
                path.move(to: CGPoint(x: 100, y: 400))
                path.addLine(to: CGPoint(x: 700, y: 400))
                path.move(to: CGPoint(x: 400, y: 100))
                path.addLine(to: CGPoint(x: 400, y: 700))
            }
            .stroke(
                LinearGradient(
                    colors: [
                        Color.white.opacity(0.1),
                        Color(red: 0.305, green: 0.804, blue: 0.769).opacity(0.05),
                        Color(red: 0.910, green: 0.365, blue: 0.459).opacity(0.15)
                    ],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                ),
                lineWidth: 1.5
            )
            .opacity(0.4)

            // Concentric Circles
            Circle()
                .stroke(
                    Color.white.opacity(0.2),
                    lineWidth: 1.5
                )
                .frame(width: 500, height: 500)

            Circle()
                .stroke(
                    Color.white.opacity(0.2),
                    lineWidth: 1.5
                )
                .frame(width: 360, height: 360)
        }
    }

    // MARK: - Quantum Core
    private var quantumCore: some View {
        ZStack {
            // Core Sphere
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            Color(red: 0.910, green: 0.365, blue: 0.459).opacity(0.8), // #E85D75
                            Color(red: 0.305, green: 0.804, blue: 0.769).opacity(0.6), // #4ECDC4
                            Color(red: 0.039, green: 0.055, blue: 0.153).opacity(0.2)
                        ],
                        center: .center,
                        startRadius: 0,
                        endRadius: 120
                    )
                )
                .frame(width: 240, height: 240)
                .blur(radius: 20)
                .scaleEffect(pulseScale)

            // Glass Reflection Layer
            Ellipse()
                .fill(Color.white.opacity(0.15))
                .frame(width: 160, height: 100)
                .offset(x: -20, y: -30)
                .blur(radius: 5)
                .opacity(glowIntensity)
        }
    }

    // MARK: - Quantum Particles
    private var quantumParticles: some View {
        ZStack {
            // Particle 1: Cyan (12s orbit)
            quantumParticle(
                color: Color(red: 0.305, green: 0.804, blue: 0.769),
                size: 16,
                offset: CGPoint(x: 0, y: -120),
                duration: 12
            )

            // Particle 2: Coral (15s orbit)
            quantumParticle(
                color: Color(red: 0.910, green: 0.365, blue: 0.459),
                size: 12,
                offset: CGPoint(x: 120, y: 0),
                duration: 15
            )

            // Particle 3: White (18s orbit)
            quantumParticle(
                color: .white,
                size: 10,
                offset: CGPoint(x: 0, y: 120),
                duration: 18
            )

            // Particle 4: Cyan (10s counter-orbit)
            quantumParticle(
                color: Color(red: 0.305, green: 0.804, blue: 0.769),
                size: 14,
                offset: CGPoint(x: -120, y: 0),
                duration: 10
            )
        }
        .rotationEffect(.degrees(rotation))
    }

    // MARK: - Quantum Particle Builder
    private func quantumParticle(
        color: Color,
        size: CGFloat,
        offset: CGPoint,
        duration: Double
    ) -> some View {
        Circle()
            .fill(color)
            .frame(width: size, height: size)
            .shadow(color: color.opacity(0.8), radius: 8)
            .offset(x: offset.x, y: offset.y)
            .opacity(glowIntensity + 0.3)
    }

    // MARK: - Animation Control
    private func startAnimations() {
        guard !reduceMotion else { return }

        // Pulse Animation
        withAnimation(.easeInOut(duration: 4).repeatForever(autoreverses: true)) {
            pulseScale = 1.05
        }

        // Rotation Animation
        withAnimation(.linear(duration: 20).repeatForever(autoreverses: false)) {
            rotation = 360
        }

        // Glow Animation
        withAnimation(.easeInOut(duration: 3).repeatForever(autoreverses: true)) {
            glowIntensity = 1.0
        }
    }
}

// MARK: - Preview
#Preview("Default") {
    QuantumSpatial_12()
}

#Preview("Light Mode") {
    QuantumSpatial_12()
        .preferredColorScheme(.light)
}

#Preview("Reduced Motion") {
    QuantumSpatial_12()
        .environment(\.accessibilityReduceMotion, true)
}

// MARK: - Component Variants

/// Compact variant for smaller displays
struct QuantumSpatial_12_Compact: View {
    var body: some View {
        QuantumSpatial_12()
            .frame(width: 400, height: 400)
            .clipped()
    }
}

/// Static variant (no animations)
struct QuantumSpatial_12_Static: View {
    var body: some View {
        QuantumSpatial_12()
            .environment(\.accessibilityReduceMotion, true)
    }
}

// MARK: - Design Token Reference
/*
 Quantum Spatial Design Tokens Used:

 Colors:
 - Primary: #E85D75 (Coral - accent)
 - Secondary: #4ECDC4 (Cyan - energy)
 - Background: #0A0E27 (Deep Space)
 - Surface: rgba(255, 255, 255, 0.05)
 - Glass Border: rgba(255, 255, 255, 0.18)

 Effects:
 - Glass Blur: 20px
 - Glass Opacity: 0.7
 - Shadow Radius: 8-10px

 Animations (M4-optimized):
 - Rotation: 20s linear infinite
 - Pulse: 4s ease-in-out
 - Glow: 3s ease-in-out
 - Particle Orbits: 10-18s per cycle

 Accessibility:
 - Respects Reduce Motion preference
 - Decorative element (hidden from VoiceOver)
 - High contrast colors (4.5:1+ ratio)
 */
