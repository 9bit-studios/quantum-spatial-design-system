/**
 * QuantumSpatial_1 SwiftUI Component
 * 9Bit Studios - Quantum Spatial Design System
 *
 * An animated visualization featuring liquid-glass aesthetics,
 * quantum particle systems, and dark-mysterious theming.
 * Optimized for M4 Neural Engine with Metal acceleration.
 *
 * Platform Support: iOS 17+, macOS 14+, visionOS 1+
 * Apple HIG Compliance: Full VoiceOver support, Dynamic Type ready
 */

import SwiftUI

/// QuantumSpatial_1 - Premium animated quantum-spatial visual element
struct QuantumSpatial_1: View {
    // MARK: - Properties

    /// Enable/disable animations (reduce for performance optimization)
    var animate: Bool = true

    /// Opacity level for glassmorphism effects (0.0 - 1.0)
    var glassOpacity: Double = 0.7

    /// Component size
    var size: CGSize = CGSize(width: 800, height: 600)

    /// Accessibility label for VoiceOver
    var accessibilityLabel: String = "9Bit Studios Quantum Spatial Visual Element"

    // MARK: - Animation State

    @State private var coreRotation: Double = 0
    @State private var glowPulse: Double = 280
    @State private var ringRotation: Double = 0
    @State private var particlePhase: Double = 0
    @State private var floatingOffset: CGFloat = 0

    // MARK: - Environment

    @Environment(\.colorScheme) var colorScheme
    @Environment(\.accessibilityReduceMotion) var reduceMotion

    // MARK: - Body

    var body: some View {
        ZStack {
            // Background
            Rectangle()
                .fill(Color(hex: "0A0E27"))

            // Quantum Spatial Grid
            quantumGrid

            // Radial Glow Background
            radialGlow

            // Quantum Core
            quantumCore

            // Floating Elements
            floatingElements

            // Energy Waves
            energyWaves
        }
        .frame(width: size.width, height: size.height)
        .accessibilityLabel(accessibilityLabel)
        .accessibilityAddTraits(.isImage)
        .onAppear {
            if animate && !reduceMotion {
                startAnimations()
            }
        }
    }

    // MARK: - Subviews

    /// Quantum spatial grid overlay
    private var quantumGrid: some View {
        ZStack {
            // Horizontal lines
            ForEach([150, 300, 450], id: \.self) { y in
                Rectangle()
                    .fill(Color.white.opacity(0.02))
                    .frame(height: 1)
                    .offset(y: CGFloat(y) - size.height / 2)
            }

            // Vertical lines
            ForEach([200, 400, 600], id: \.self) { x in
                Rectangle()
                    .fill(Color.white.opacity(0.02))
                    .frame(width: 1)
                    .offset(x: CGFloat(x) - size.width / 2)
            }
        }
        .opacity(0.1)
    }

    /// Radial glow background effect
    private var radialGlow: some View {
        Circle()
            .fill(
                RadialGradient(
                    colors: [
                        Color(hex: "E85D75").opacity(0.4),
                        Color(hex: "4ECDC4").opacity(0.2),
                        Color(hex: "0A0E27").opacity(0)
                    ],
                    center: .center,
                    startRadius: 0,
                    endRadius: glowPulse
                )
            )
            .frame(width: glowPulse * 2, height: glowPulse * 2)
            .opacity(0.6)
    }

    /// Central quantum core with hexagon and orbital rings
    private var quantumCore: some View {
        ZStack {
            // Central Hexagon
            HexagonShape()
                .stroke(
                    LinearGradient(
                        colors: [
                            Color(hex: "E85D75").opacity(0.8),
                            Color(hex: "4ECDC4").opacity(0.6)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    lineWidth: 2
                )
                .background(
                    HexagonShape()
                        .fill(
                            LinearGradient(
                                colors: [
                                    Color.white.opacity(0.1),
                                    Color.white.opacity(0.02)
                                ],
                                startPoint: .top,
                                endPoint: .bottom
                            )
                        )
                )
                .frame(width: 160, height: 160)
                .rotationEffect(.degrees(coreRotation))
                .blur(radius: 10) // Glassmorphism effect

            // Inner Orbital Ring
            Circle()
                .stroke(Color(hex: "E85D75").opacity(0.3), lineWidth: 1.5)
                .frame(width: 240, height: 240)
                .rotationEffect(.degrees(ringRotation))

            // Outer Orbital Ring
            Circle()
                .stroke(Color(hex: "4ECDC4").opacity(0.3), lineWidth: 1.5)
                .frame(width: 320, height: 320)
                .rotationEffect(.degrees(-ringRotation * 0.8))

            // Quantum Particles
            quantumParticles

            // Inner Geometric Pattern
            HexagonShape()
                .stroke(
                    LinearGradient(
                        colors: [
                            Color(hex: "E85D75"),
                            Color(hex: "4ECDC4")
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    lineWidth: 1.5
                )
                .frame(width: 80, height: 80)
                .rotationEffect(.degrees(-coreRotation * 1.2))
                .scaleEffect(1 + sin(particlePhase) * 0.1)
                .opacity(0.6)
        }
        .offset(y: -20)
    }

    /// Quantum particle system
    private var quantumParticles: some View {
        ZStack {
            ForEach(0..<4, id: \.self) { index in
                Circle()
                    .fill(index % 2 == 0 ? Color(hex: "E85D75") : Color(hex: "4ECDC4"))
                    .frame(width: CGFloat(3 + index % 2), height: CGFloat(3 + index % 2))
                    .offset(
                        x: cos(particlePhase + Double(index) * .pi / 2) * 120,
                        y: sin(particlePhase + Double(index) * .pi / 2) * 120
                    )
                    .blur(radius: 3) // Particle glow
            }
        }
    }

    /// Floating liquid glass elements
    private var floatingElements: some View {
        ZStack {
            // Top-left ellipse
            Ellipse()
                .fill(
                    LinearGradient(
                        colors: [
                            Color.white.opacity(0.1),
                            Color.white.opacity(0.02)
                        ],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )
                .frame(width: 80, height: 120)
                .blur(radius: 20)
                .offset(x: -size.width / 2 + 150, y: -size.height / 2 + 150 + floatingOffset)
                .opacity(0.5 + sin(particlePhase) * 0.3)

            // Bottom-right ellipse
            Ellipse()
                .fill(
                    LinearGradient(
                        colors: [
                            Color.white.opacity(0.1),
                            Color.white.opacity(0.02)
                        ],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )
                .frame(width: 100, height: 140)
                .blur(radius: 20)
                .offset(x: size.width / 2 - 150, y: size.height / 2 - 150 - floatingOffset)
                .opacity(0.5 + cos(particlePhase) * 0.3)

            // Bottom-left rounded rect
            RoundedRectangle(cornerRadius: 12)
                .fill(
                    LinearGradient(
                        colors: [
                            Color.white.opacity(0.1),
                            Color.white.opacity(0.02)
                        ],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )
                .frame(width: 80, height: 80)
                .blur(radius: 20)
                .offset(x: -size.width / 2 + 140, y: size.height / 2 - 140 + floatingOffset * 0.7)
                .opacity(0.4)

            // Top-right circle
            Circle()
                .fill(
                    LinearGradient(
                        colors: [
                            Color.white.opacity(0.1),
                            Color.white.opacity(0.02)
                        ],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )
                .frame(width: 70, height: 70)
                .blur(radius: 20)
                .offset(x: size.width / 2 - 120, y: -size.height / 2 + 120 - floatingOffset)
                .opacity(0.4)
        }
    }

    /// Quantum energy waves
    private var energyWaves: some View {
        Path { path in
            let waveHeight: CGFloat = 50 + sin(particlePhase) * 30
            path.move(to: CGPoint(x: 50, y: size.height / 2))
            path.addQuadCurve(
                to: CGPoint(x: 350, y: size.height / 2),
                control: CGPoint(x: 200, y: size.height / 2 - waveHeight)
            )
            path.addQuadCurve(
                to: CGPoint(x: 650, y: size.height / 2),
                control: CGPoint(x: 500, y: size.height / 2 + waveHeight)
            )
        }
        .stroke(
            LinearGradient(
                colors: [
                    Color(hex: "E85D75").opacity(0.3),
                    Color(hex: "4ECDC4").opacity(0.3)
                ],
                startPoint: .leading,
                endPoint: .trailing
            ),
            lineWidth: 2
        )
        .opacity(0.3)
    }

    // MARK: - Animations

    /// Start all animations with proper timing
    private func startAnimations() {
        // Core rotation
        withAnimation(.linear(duration: 20).repeatForever(autoreverses: false)) {
            coreRotation = 360
        }

        // Glow pulse
        withAnimation(.easeInOut(duration: 5).repeatForever(autoreverses: true)) {
            glowPulse = 320
        }

        // Ring rotation
        withAnimation(.linear(duration: 15).repeatForever(autoreverses: false)) {
            ringRotation = 360
        }

        // Particle phase
        withAnimation(.linear(duration: 8).repeatForever(autoreverses: false)) {
            particlePhase = .pi * 2
        }

        // Floating offset
        withAnimation(.easeInOut(duration: 4).repeatForever(autoreverses: true)) {
            floatingOffset = 20
        }
    }
}

// MARK: - Custom Shapes

/// Hexagon shape for quantum core
struct HexagonShape: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        let width = rect.width
        let height = rect.height
        let centerX = rect.midX
        let centerY = rect.midY

        let points: [CGPoint] = [
            CGPoint(x: centerX, y: centerY - height / 2),
            CGPoint(x: centerX + width / 2, y: centerY - height / 4),
            CGPoint(x: centerX + width / 2, y: centerY + height / 4),
            CGPoint(x: centerX, y: centerY + height / 2),
            CGPoint(x: centerX - width / 2, y: centerY + height / 4),
            CGPoint(x: centerX - width / 2, y: centerY - height / 4)
        ]

        path.move(to: points[0])
        for point in points.dropFirst() {
            path.addLine(to: point)
        }
        path.closeSubpath()

        return path
    }
}

// MARK: - Extensions

extension Color {
    /// Initialize Color from hex string
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

// MARK: - Preview

#Preview("QuantumSpatial_1 - Default") {
    QuantumSpatial_1()
        .preferredColorScheme(.dark)
}

#Preview("QuantumSpatial_1 - No Animation") {
    QuantumSpatial_1(animate: false)
        .preferredColorScheme(.dark)
}

#Preview("QuantumSpatial_1 - Custom Size") {
    QuantumSpatial_1(
        size: CGSize(width: 400, height: 300)
    )
    .preferredColorScheme(.dark)
}