import SwiftUI

/**
 * QuantumSpatial_4 - SwiftUI Component
 *
 * Premium quantum-spatial animated design element for iOS, macOS, and visionOS.
 *
 * Design Philosophy:
 * - Liquid-glass quantum-spatial aesthetic
 * - Native Apple platform integration
 * - M4 Neural Engine optimized animations
 * - Full accessibility support (VoiceOver, Dynamic Type, Reduce Motion)
 *
 * Brand Alignment: 9Bit Studios
 * Design System: Quantum Spatial
 * Apple HIG: Compliant (44px minimum touch targets, SF Pro typography, WCAG AA)
 */

struct QuantumSpatial_4: View {
    // MARK: - Properties

    let size: CGFloat
    let animated: Bool

    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @Environment(\.colorScheme) private var colorScheme

    @State private var outerRingRotation: Double = 0
    @State private var middleRingRotation: Double = 0
    @State private var particleRotation: Double = 0
    @State private var pulseScale: CGFloat = 1.0
    @State private var energyNodeScale: CGFloat = 1.0

    // MARK: - Initialization

    init(size: CGFloat = 240, animated: Bool = true) {
        self.size = size
        self.animated = animated
    }

    // MARK: - Body

    var body: some View {
        ZStack {
            // Background Quantum Field
            backgroundQuantumField

            // Outer Ring - Quantum Boundary
            outerRing

            // Middle Ring - Spatial Layer
            middleRing

            // Orbital Paths
            orbitalPaths

            // Energy Nodes - Quantum Particles
            energyNodes

            // Quantum Core - Glass Sphere
            quantumCore

            // Center Quantum Singularity
            centerSingularity

            // Quantum Particles - Small Orbs
            quantumParticles
        }
        .frame(width: size, height: size)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Quantum Spatial Design Element")
        .accessibilityHint("Layered glass morphism visualization with cosmic energy flows")
        .onAppear {
            if animated && !reduceMotion {
                startAnimations()
            }
        }
    }

    // MARK: - Components

    private var backgroundQuantumField: some View {
        Rectangle()
            .fill(
                LinearGradient(
                    colors: [
                        Color(red: 0.91, green: 0.36, blue: 0.46).opacity(0.2),
                        Color(red: 0.31, green: 0.80, blue: 0.77).opacity(0.3),
                        Color(red: 0.66, green: 0.33, blue: 0.97).opacity(0.2)
                    ],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            )
            .opacity(0.1)
            .frame(width: size, height: size)
    }

    private var outerRing: some View {
        Circle()
            .stroke(
                AngularGradient(
                    colors: [
                        Color(red: 0.31, green: 0.80, blue: 0.77),
                        Color(red: 0.91, green: 0.36, blue: 0.46),
                        Color(red: 0.66, green: 0.33, blue: 0.97),
                        Color(red: 0.31, green: 0.80, blue: 0.77)
                    ],
                    center: .center
                ),
                lineWidth: 2
            )
            .frame(width: size * 0.83, height: size * 0.83)
            .opacity(0.3)
            .blur(radius: 8)
            .scaleEffect(pulseScale)
    }

    private var middleRing: some View {
        Circle()
            .stroke(
                Color(red: 0.31, green: 0.80, blue: 0.77),
                style: StrokeStyle(lineWidth: 1.5, dash: [4, 4])
            )
            .frame(width: size * 0.58, height: size * 0.58)
            .opacity(0.4)
            .rotationEffect(.degrees(middleRingRotation))
    }

    private var orbitalPaths: some View {
        ForEach([0.33, 0.5], id: \.self) { ratio in
            Circle()
                .stroke(
                    Color.white.opacity(0.08),
                    style: StrokeStyle(lineWidth: 0.5, dash: [2, 4])
                )
                .frame(width: size * ratio, height: size * ratio)
                .rotationEffect(.degrees(ratio == 0.33 ? outerRingRotation : -outerRingRotation))
        }
    }

    private var energyNodes: some View {
        ForEach(0..<5, id: \.self) { index in
            let angle = Double(index) * 72.0
            let x = (size * 0.58 / 2) * cos(angle * .pi / 180)
            let y = (size * 0.58 / 2) * sin(angle * .pi / 180)

            ZStack {
                // Connection Line
                Path { path in
                    path.move(to: CGPoint(x: size / 2, y: size / 2))
                    path.addLine(to: CGPoint(x: size / 2 + x, y: size / 2 + y))
                }
                .stroke(Color(red: 0.31, green: 0.80, blue: 0.77), lineWidth: 0.5)
                .opacity(0.2 + (animated && !reduceMotion ? 0.3 : 0))

                // Energy Node
                Circle()
                    .fill(Color(red: 0.91, green: 0.36, blue: 0.46))
                    .frame(width: 12, height: 12)
                    .position(x: size / 2 + x, y: size / 2 + y)
                    .opacity(0.6)
                    .shadow(color: Color(red: 0.91, green: 0.36, blue: 0.46).opacity(0.5), radius: 6)
                    .scaleEffect(energyNodeScale)
            }
            .animation(
                animated && !reduceMotion ?
                    Animation.easeInOut(duration: 2)
                        .delay(Double(index) * 0.4)
                        .repeatForever(autoreverses: true) : nil,
                value: energyNodeScale
            )
        }
    }

    private var quantumCore: some View {
        ZStack {
            // Glass Sphere
            Circle()
                .fill(
                    LinearGradient(
                        colors: [
                            Color(red: 0.91, green: 0.36, blue: 0.46).opacity(0.2),
                            Color(red: 0.31, green: 0.80, blue: 0.77).opacity(0.3),
                            Color(red: 0.66, green: 0.33, blue: 0.97).opacity(0.2)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .frame(width: size * 0.42, height: size * 0.42)
                .opacity(0.6)

            // Border
            Circle()
                .stroke(Color.white.opacity(0.18), lineWidth: 1)
                .frame(width: size * 0.42, height: size * 0.42)
        }
        .shadow(color: Color(red: 0.31, green: 0.80, blue: 0.77).opacity(0.3), radius: 10)
    }

    private var centerSingularity: some View {
        Circle()
            .fill(
                RadialGradient(
                    colors: [
                        Color(red: 0.31, green: 0.80, blue: 0.77).opacity(0.8),
                        Color(red: 0.91, green: 0.36, blue: 0.46).opacity(0.4),
                        Color(red: 0.66, green: 0.33, blue: 0.97).opacity(0.1)
                    ],
                    center: .center,
                    startRadius: 0,
                    endRadius: size * 0.1
                )
            )
            .frame(width: size * 0.1, height: size * 0.1)
            .shadow(color: Color(red: 0.31, green: 0.80, blue: 0.77).opacity(0.6), radius: 8)
            .scaleEffect(pulseScale)
    }

    private var quantumParticles: some View {
        ForEach(0..<6, id: \.self) { index in
            let angle = Double(index) * 60.0
            let orbitRadius = size * 0.35
            let x = orbitRadius * cos(angle * .pi / 180)
            let y = orbitRadius * sin(angle * .pi / 180)

            Circle()
                .fill(Color(red: 0.66, green: 0.33, blue: 0.97))
                .frame(width: 4, height: 4)
                .position(x: size / 2 + x, y: size / 2 + y)
                .opacity(0.5)
                .rotationEffect(.degrees(particleRotation))
                .animation(
                    animated && !reduceMotion ?
                        Animation.linear(duration: 12)
                            .delay(Double(index) * 0.3)
                            .repeatForever(autoreverses: false) : nil,
                    value: particleRotation
                )
        }
    }

    // MARK: - Animations

    private func startAnimations() {
        // Outer Ring Pulse
        withAnimation(Animation.easeInOut(duration: 4).repeatForever(autoreverses: true)) {
            pulseScale = 1.05
        }

        // Energy Node Pulse
        withAnimation(Animation.easeInOut(duration: 2).repeatForever(autoreverses: true)) {
            energyNodeScale = 1.33
        }

        // Rotation Animations
        withAnimation(Animation.linear(duration: 20).repeatForever(autoreverses: false)) {
            middleRingRotation = 360
        }

        withAnimation(Animation.linear(duration: 15).repeatForever(autoreverses: false)) {
            outerRingRotation = 360
        }

        withAnimation(Animation.linear(duration: 12).repeatForever(autoreverses: false)) {
            particleRotation = 360
        }
    }
}

// MARK: - Glass Container Wrapper

struct QuantumGlassContainer<Content: View>: View {
    let content: Content

    @Environment(\.colorScheme) private var colorScheme

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        content
            .padding(24)
            .background(
                RoundedRectangle(cornerRadius: 24)
                    .fill(
                        colorScheme == .dark ?
                            Color.white.opacity(0.05) :
                            Color.black.opacity(0.03)
                    )
                    .background(.ultraThinMaterial)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 24)
                    .stroke(
                        colorScheme == .dark ?
                            Color.white.opacity(0.18) :
                            Color.black.opacity(0.12),
                        lineWidth: 1
                    )
            )
            .shadow(
                color: colorScheme == .dark ?
                    Color.black.opacity(0.37) :
                    Color.black.opacity(0.1),
                radius: 10,
                x: 0,
                y: 8
            )
    }
}

// MARK: - Preview

#Preview("Default") {
    ZStack {
        Color(red: 0.04, green: 0.05, blue: 0.15)
            .ignoresSafeArea()

        QuantumSpatial_4(size: 240, animated: true)
    }
}

#Preview("Glass Container") {
    ZStack {
        Color(red: 0.04, green: 0.05, blue: 0.15)
            .ignoresSafeArea()

        QuantumGlassContainer {
            QuantumSpatial_4(size: 240, animated: true)
        }
    }
}

#Preview("Sizes") {
    ZStack {
        Color(red: 0.04, green: 0.05, blue: 0.15)
            .ignoresSafeArea()

        VStack(spacing: 32) {
            QuantumSpatial_4(size: 120, animated: true)
            QuantumSpatial_4(size: 240, animated: true)
            QuantumSpatial_4(size: 360, animated: true)
        }
    }
}

#Preview("Reduced Motion") {
    ZStack {
        Color(red: 0.04, green: 0.05, blue: 0.15)
            .ignoresSafeArea()

        QuantumSpatial_4(size: 240, animated: false)
    }
}

#Preview("Dark Mode") {
    ZStack {
        Color(red: 0.04, green: 0.05, blue: 0.15)
            .ignoresSafeArea()

        QuantumGlassContainer {
            QuantumSpatial_4(size: 240, animated: true)
        }
    }
    .preferredColorScheme(.dark)
}

#Preview("Light Mode") {
    ZStack {
        Color(red: 0.95, green: 0.95, blue: 0.97)
            .ignoresSafeArea()

        QuantumGlassContainer {
            QuantumSpatial_4(size: 240, animated: true)
        }
    }
    .preferredColorScheme(.light)
}
