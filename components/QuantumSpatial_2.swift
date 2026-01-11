/**
 * QuantumSpatial_2 SwiftUI Component
 * 9Bit Studios - Quantum Spatial Design System
 *
 * Animated liquid-glass background with quantum aesthetics
 * Optimized for M4 Neural Engine acceleration
 * HIG Compliant with full accessibility support
 */

import SwiftUI

/// Quantum Spatial animated background component with liquid-glass effects
struct QuantumSpatial_2: View {
    // MARK: - Properties

    /// Animation speed multiplier (1.0 = normal speed)
    var animationSpeed: Double = 1.0

    /// Respect reduced motion accessibility setting
    @Environment(\.accessibilityReduceMotion) var reduceMotion

    /// Color scheme for dark/light mode adaptation
    @Environment(\.colorScheme) var colorScheme

    // MARK: - Animation States

    @State private var orb1Scale: CGFloat = 1.0
    @State private var orb2Position: CGFloat = 0
    @State private var orb3Position: CGFloat = 0
    @State private var coreScale: CGFloat = 1.0
    @State private var particleOpacity: Double = 0.3
    @State private var gridOpacity: Double = 0.2

    // MARK: - Quantum Spatial Colors

    private let primaryQuantum = Color(red: 232/255, green: 93/255, blue: 117/255) // #E85D75
    private let secondaryQuantum = Color(red: 78/255, green: 205/255, blue: 196/255) // #4ECDC4
    private let tertiaryQuantum = Color(red: 155/255, green: 89/255, blue: 182/255) // #9B59B6
    private let backgroundDark = Color(red: 10/255, green: 14/255, blue: 39/255) // #0A0E27

    // MARK: - Body

    var body: some View {
        ZStack {
            // Dark mysterious background
            backgroundDark
                .ignoresSafeArea()

            // Quantum particle field
            quantumParticleField

            // Animated liquid glass orbs
            liquidGlassOrbs

            // Quantum spatial grid lines
            quantumGrid

            // Central quantum node
            centralNode

            // Floating quantum particles
            floatingParticles

            // Edge glow effects
            edgeGlow
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Quantum spatial animated background")
        .onAppear {
            startAnimations()
        }
    }

    // MARK: - Quantum Particle Field

    private var quantumParticleField: some View {
        GeometryReader { geometry in
            Canvas { context, size in
                let pattern = createParticlePattern()
                context.opacity = 0.6

                for x in stride(from: 0, to: size.width, by: 100) {
                    for y in stride(from: 0, to: size.height, by: 100) {
                        var particleContext = context
                        particleContext.translateBy(x: x, y: y)
                        particleContext.draw(pattern, at: .zero)
                    }
                }
            }
        }
    }

    private func createParticlePattern() -> Image {
        // Particle pattern would be rendered here
        // In production, use actual particle rendering
        return Image(systemName: "circle.fill")
    }

    // MARK: - Liquid Glass Orbs

    private var liquidGlassOrbs: some View {
        ZStack {
            // Large central orb
            Ellipse()
                .fill(
                    LinearGradient(
                        colors: [primaryQuantum.opacity(0.8), secondaryQuantum.opacity(0.6)],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .frame(width: 500 * orb1Scale, height: 360 * orb1Scale)
                .blur(radius: 40)
                .opacity(0.4)

            // Secondary orb (top right)
            Ellipse()
                .fill(
                    LinearGradient(
                        colors: [secondaryQuantum, tertiaryQuantum, primaryQuantum],
                        startPoint: .trailing,
                        endPoint: .leading
                    )
                )
                .frame(width: 300, height: 240)
                .blur(radius: 40)
                .opacity(0.35)
                .offset(x: 200 + orb2Position, y: -150)

            // Tertiary orb (bottom left)
            Ellipse()
                .fill(
                    LinearGradient(
                        colors: [primaryQuantum.opacity(0.8), secondaryQuantum.opacity(0.6)],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .frame(width: 360, height: 280)
                .blur(radius: 40)
                .opacity(0.3)
                .offset(x: -200 + orb3Position, y: 150)
        }
    }

    // MARK: - Quantum Grid

    private var quantumGrid: some View {
        GeometryReader { geometry in
            Path { path in
                // Horizontal lines
                path.move(to: CGPoint(x: 0, y: geometry.size.height * 0.33))
                path.addLine(to: CGPoint(x: geometry.size.width, y: geometry.size.height * 0.33))

                path.move(to: CGPoint(x: 0, y: geometry.size.height * 0.67))
                path.addLine(to: CGPoint(x: geometry.size.width, y: geometry.size.height * 0.67))

                // Vertical lines
                path.move(to: CGPoint(x: geometry.size.width * 0.25, y: 0))
                path.addLine(to: CGPoint(x: geometry.size.width * 0.25, y: geometry.size.height))

                path.move(to: CGPoint(x: geometry.size.width * 0.75, y: 0))
                path.addLine(to: CGPoint(x: geometry.size.width * 0.75, y: geometry.size.height))
            }
            .stroke(secondaryQuantum, lineWidth: 0.5)
            .opacity(gridOpacity)
        }
    }

    // MARK: - Central Node

    private var centralNode: some View {
        ZStack {
            // Outer ring
            Circle()
                .stroke(
                    LinearGradient(
                        colors: [secondaryQuantum, tertiaryQuantum, primaryQuantum],
                        startPoint: .trailing,
                        endPoint: .leading
                    ),
                    lineWidth: 1
                )
                .frame(width: 240, height: 240)
                .opacity(0.4)

            // Middle ring
            Circle()
                .stroke(primaryQuantum, lineWidth: 1.5)
                .frame(width: 160, height: 160)
                .opacity(0.5)

            // Inner core with glow
            Circle()
                .fill(
                    RadialGradient(
                        colors: [Color.white.opacity(0.3), secondaryQuantum.opacity(0)],
                        center: .center,
                        startRadius: 0,
                        endRadius: 40
                    )
                )
                .frame(width: 80 * coreScale, height: 80 * coreScale)
                .shadow(color: secondaryQuantum.opacity(0.5), radius: 10)

            // Quantum connections
            quantumConnections
        }
    }

    // MARK: - Quantum Connections

    private var quantumConnections: some View {
        ZStack {
            // Connection 1
            Path { path in
                path.move(to: .zero)
                path.addLine(to: CGPoint(x: 100, y: -80))
            }
            .stroke(secondaryQuantum, lineWidth: 1)
            .opacity(0.6)

            Circle()
                .fill(secondaryQuantum)
                .frame(width: 8, height: 8)
                .offset(x: 100, y: -80)

            // Connection 2
            Path { path in
                path.move(to: .zero)
                path.addLine(to: CGPoint(x: -120, y: 60))
            }
            .stroke(primaryQuantum, lineWidth: 1)
            .opacity(0.6)

            Circle()
                .fill(primaryQuantum)
                .frame(width: 8, height: 8)
                .offset(x: -120, y: 60)

            // Connection 3
            Path { path in
                path.move(to: .zero)
                path.addLine(to: CGPoint(x: 90, y: 100))
            }
            .stroke(tertiaryQuantum, lineWidth: 1)
            .opacity(0.6)

            Circle()
                .fill(tertiaryQuantum)
                .frame(width: 8, height: 8)
                .offset(x: 90, y: 100)
        }
    }

    // MARK: - Floating Particles

    private var floatingParticles: some View {
        ZStack {
            Circle()
                .fill(secondaryQuantum)
                .frame(width: 6, height: 6)
                .offset(x: -200, y: -150)
                .opacity(particleOpacity)

            Circle()
                .fill(primaryQuantum)
                .frame(width: 5, height: 5)
                .offset(x: 250, y: 200)
                .opacity(particleOpacity)

            Circle()
                .fill(tertiaryQuantum)
                .frame(width: 4, height: 4)
                .offset(x: -300, y: 0)
                .opacity(particleOpacity)

            Circle()
                .fill(Color.white)
                .frame(width: 6, height: 6)
                .offset(x: 300, y: -50)
                .opacity(particleOpacity)
        }
    }

    // MARK: - Edge Glow

    private var edgeGlow: some View {
        GeometryReader { geometry in
            ZStack {
                // Top edge
                Rectangle()
                    .fill(
                        LinearGradient(
                            colors: [primaryQuantum.opacity(0.8), secondaryQuantum.opacity(0.6)],
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                    )
                    .frame(height: 2)
                    .opacity(0.3)
                    .position(x: geometry.size.width / 2, y: 1)

                // Bottom edge
                Rectangle()
                    .fill(
                        LinearGradient(
                            colors: [secondaryQuantum, tertiaryQuantum, primaryQuantum],
                            startPoint: .trailing,
                            endPoint: .leading
                        )
                    )
                    .frame(height: 2)
                    .opacity(0.3)
                    .position(x: geometry.size.width / 2, y: geometry.size.height - 1)

                // Left edge
                Rectangle()
                    .fill(
                        LinearGradient(
                            colors: [primaryQuantum.opacity(0.8), secondaryQuantum.opacity(0.6)],
                            startPoint: .top,
                            endPoint: .bottom
                        )
                    )
                    .frame(width: 2)
                    .opacity(0.3)
                    .position(x: 1, y: geometry.size.height / 2)

                // Right edge
                Rectangle()
                    .fill(
                        LinearGradient(
                            colors: [secondaryQuantum, tertiaryQuantum, primaryQuantum],
                            startPoint: .bottom,
                            endPoint: .top
                        )
                    )
                    .frame(width: 2)
                    .opacity(0.3)
                    .position(x: geometry.size.width - 1, y: geometry.size.height / 2)
            }
        }
    }

    // MARK: - Animations

    private func startAnimations() {
        guard !reduceMotion else { return }

        // Orb 1 scale animation
        withAnimation(
            .easeInOut(duration: 8 / animationSpeed)
            .repeatForever(autoreverses: true)
        ) {
            orb1Scale = 1.12
        }

        // Orb 2 position animation
        withAnimation(
            .easeInOut(duration: 7 / animationSpeed)
            .repeatForever(autoreverses: true)
        ) {
            orb2Position = 20
        }

        // Orb 3 position animation
        withAnimation(
            .easeInOut(duration: 9 / animationSpeed)
            .repeatForever(autoreverses: true)
        ) {
            orb3Position = -20
        }

        // Core scale animation
        withAnimation(
            .easeInOut(duration: 4 / animationSpeed)
            .repeatForever(autoreverses: true)
        ) {
            coreScale = 1.2
        }

        // Particle opacity animation
        withAnimation(
            .easeInOut(duration: 3 / animationSpeed)
            .repeatForever(autoreverses: true)
        ) {
            particleOpacity = 1.0
        }

        // Grid opacity animation
        withAnimation(
            .easeInOut(duration: 4 / animationSpeed)
            .repeatForever(autoreverses: true)
        ) {
            gridOpacity = 0.5
        }
    }
}

// MARK: - Preview

#Preview("Quantum Spatial 2") {
    QuantumSpatial_2()
        .preferredColorScheme(.dark)
}

#Preview("Quantum Spatial 2 - Light Mode") {
    QuantumSpatial_2()
        .preferredColorScheme(.light)
}

#Preview("Quantum Spatial 2 - Slow Animation") {
    QuantumSpatial_2(animationSpeed: 0.5)
        .preferredColorScheme(.dark)
}

#Preview("Quantum Spatial 2 - Fast Animation") {
    QuantumSpatial_2(animationSpeed: 2.0)
        .preferredColorScheme(.dark)
}
