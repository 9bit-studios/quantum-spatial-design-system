import SwiftUI

/// QuantumSpatial_7: Animated quantum-spatial "7" component
/// Brand: 9Bit Studios
/// Design System: Quantum Spatial with glassmorphism aesthetic
/// Apple HIG Compliance: Optimized for M4 Neural Engine
struct QuantumSpatial_7: View {
    // MARK: - Animation State
    @State private var isAnimating = false
    @State private var particleOffset: CGFloat = 0
    @State private var glowIntensity: Double = 0.85

    // MARK: - Configuration
    var size: CGFloat = 800
    var enableReducedMotion: Bool = false

    @Environment(\.colorScheme) var colorScheme
    @Environment(\.accessibilityReduceMotion) var reduceMotion

    var body: some View {
        ZStack {
            // Background Layer
            quantumBackground

            // Ambient Glow Orbs
            ambientGlowOrbs

            // Central "7" Figure
            centralSevenFigure

            // Quantum Particles
            quantumParticles

            // Spatial Grid
            spatialGrid

            // Energy Rings
            energyRings
        }
        .frame(width: size, height: size)
        .background(Color(hex: "#0A0E27"))
        .onAppear {
            startAnimations()
        }
        .accessibilityLabel("Quantum Spatial Seven Animation")
        .accessibilityHint("Animated decorative element with quantum aesthetic")
    }

    // MARK: - Component Layers

    private var quantumBackground: some View {
        Rectangle()
            .fill(Color(hex: "#0A0E27"))
            .frame(width: size, height: size)
    }

    private var ambientGlowOrbs: some View {
        ZStack {
            // Top-left orb
            Circle()
                .fill(
                    RadialGradient(
                        gradient: Gradient(colors: [
                            Color(hex: "#E85D75").opacity(0.8),
                            Color(hex: "#4ECDC4").opacity(0.4),
                            Color(hex: "#0A0E27").opacity(0)
                        ]),
                        center: .center,
                        startRadius: 0,
                        endRadius: 150
                    )
                )
                .frame(width: 300, height: 300)
                .blur(radius: 20)
                .opacity(0.3)
                .offset(x: isAnimating ? 50 : 0, y: isAnimating ? -50 : 0)
                .position(x: size * 0.25, y: size * 0.25)

            // Bottom-right orb
            Circle()
                .fill(
                    RadialGradient(
                        gradient: Gradient(colors: [
                            Color(hex: "#4ECDC4").opacity(0.7),
                            Color(hex: "#E85D75").opacity(0.3),
                            Color(hex: "#0A0E27").opacity(0)
                        ]),
                        center: .center,
                        startRadius: 0,
                        endRadius: 180
                    )
                )
                .frame(width: 360, height: 360)
                .blur(radius: 20)
                .opacity(0.25)
                .offset(x: isAnimating ? -50 : 0, y: isAnimating ? 50 : 0)
                .position(x: size * 0.75, y: size * 0.75)
        }
    }

    private var centralSevenFigure: some View {
        ZStack {
            // Main "7" shape with glassmorphism
            SevenShape()
                .fill(
                    LinearGradient(
                        gradient: Gradient(colors: [
                            Color(hex: "#E85D75").opacity(0.8),
                            Color(hex: "#4ECDC4").opacity(0.6),
                            Color(hex: "#A076F9").opacity(0.8)
                        ]),
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .overlay(
                    SevenShape()
                        .stroke(Color.white.opacity(0.18), lineWidth: 2)
                )
                .shadow(color: .black.opacity(0.3), radius: 15, y: 10)
                .opacity(glowIntensity)

            // Liquid glass overlay
            SevenShape()
                .fill(Color.white.opacity(0.05))
                .blur(radius: 10)
                .opacity(0.7)

            // Inner glow
            SevenShape()
                .inset(by: 10)
                .fill(
                    LinearGradient(
                        gradient: Gradient(colors: [
                            Color(hex: "#E85D75").opacity(0.6),
                            Color(hex: "#4ECDC4").opacity(0.5),
                            Color(hex: "#A076F9").opacity(0.6)
                        ]),
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .opacity(glowIntensity * 0.7)
        }
        .frame(width: size, height: size)
    }

    private var quantumParticles: some View {
        ZStack {
            // Particle array
            ForEach(0..<5) { index in
                Circle()
                    .fill(particleColor(for: index))
                    .frame(width: particleSize(for: index), height: particleSize(for: index))
                    .position(particlePosition(for: index))
                    .offset(y: particleOffset)
                    .opacity(isAnimating ? 1 : 0.5)
            }
        }
        .opacity(0.7)
    }

    private var spatialGrid: some View {
        ZStack {
            // Horizontal lines
            ForEach([0.25, 0.5, 0.75], id: \.self) { ratio in
                Rectangle()
                    .fill(Color.white.opacity(0.03))
                    .frame(height: 1)
                    .position(x: size / 2, y: size * ratio)
            }

            // Vertical lines
            ForEach([0.25, 0.5, 0.75], id: \.self) { ratio in
                Rectangle()
                    .fill(Color.white.opacity(0.03))
                    .frame(width: 1)
                    .position(x: size * ratio, y: size / 2)
            }
        }
        .opacity(0.1)
    }

    private var energyRings: some View {
        ZStack {
            // Inner ring
            Circle()
                .stroke(
                    LinearGradient(
                        gradient: Gradient(colors: [
                            Color(hex: "#E85D75").opacity(0.6),
                            Color(hex: "#4ECDC4").opacity(0.4),
                            Color(hex: "#A076F9").opacity(0.6)
                        ]),
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    lineWidth: 1.5
                )
                .frame(width: size * 0.7, height: size * 0.7)
                .opacity(isAnimating ? 0.6 : 0.4)
                .scaleEffect(isAnimating ? 1.05 : 1.0)

            // Outer ring
            Circle()
                .stroke(
                    LinearGradient(
                        gradient: Gradient(colors: [
                            Color(hex: "#4ECDC4").opacity(0.5),
                            Color(hex: "#A076F9").opacity(0.3),
                            Color(hex: "#E85D75").opacity(0.5)
                        ]),
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    lineWidth: 1.5
                )
                .frame(width: size * 0.8, height: size * 0.8)
                .opacity(isAnimating ? 0.5 : 0.3)
                .scaleEffect(isAnimating ? 1.05 : 1.0)
        }
        .opacity(0.4)
    }

    // MARK: - Helper Functions

    private func startAnimations() {
        guard !reduceMotion && !enableReducedMotion else { return }

        // Main glow animation
        withAnimation(.easeInOut(duration: 4).repeatForever(autoreverses: true)) {
            glowIntensity = 0.95
        }

        // Particle float animation
        withAnimation(.easeInOut(duration: 3).repeatForever(autoreverses: true)) {
            particleOffset = -20
        }

        // General animation state
        withAnimation(.easeInOut(duration: 6).repeatForever(autoreverses: true)) {
            isAnimating = true
        }
    }

    private func particleColor(for index: Int) -> Color {
        let colors = [
            Color(hex: "#E85D75"),
            Color(hex: "#4ECDC4"),
            Color(hex: "#A076F9")
        ]
        return colors[index % colors.count]
    }

    private func particleSize(for index: Int) -> CGFloat {
        let sizes: [CGFloat] = [4, 3, 5, 3, 4]
        return sizes[index] * (size / 800)
    }

    private func particlePosition(for index: Int) -> CGPoint {
        let positions: [(CGFloat, CGFloat)] = [
            (0.375, 0.375),
            (0.625, 0.3125),
            (0.4375, 0.5625),
            (0.6, 0.475),
            (0.525, 0.65)
        ]
        return CGPoint(
            x: positions[index].0 * size,
            y: positions[index].1 * size
        )
    }
}

// MARK: - Custom Seven Shape

struct SevenShape: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()

        let scale = rect.width / 800

        // Top horizontal bar
        path.move(to: CGPoint(x: 250 * scale, y: 150 * scale))
        path.addLine(to: CGPoint(x: 550 * scale, y: 150 * scale))
        path.addLine(to: CGPoint(x: 550 * scale, y: 200 * scale))
        path.addLine(to: CGPoint(x: 350 * scale, y: 200 * scale))

        // Diagonal stroke
        path.addLine(to: CGPoint(x: 450 * scale, y: 650 * scale))
        path.addLine(to: CGPoint(x: 380 * scale, y: 650 * scale))
        path.addLine(to: CGPoint(x: 250 * scale, y: 200 * scale))

        path.closeSubpath()

        return path
    }
}

// MARK: - Color Extension

extension Color {
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

#Preview {
    QuantumSpatial_7()
        .preferredColorScheme(.dark)
}

#Preview("Reduced Motion") {
    QuantumSpatial_7(enableReducedMotion: true)
        .preferredColorScheme(.dark)
}

#Preview("Small Size") {
    QuantumSpatial_7(size: 200)
        .preferredColorScheme(.dark)
}
