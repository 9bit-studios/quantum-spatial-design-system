import SwiftUI

/// Quantum Spatial Figure-8 Component
/// Animated infinity symbol with liquid-glass aesthetics
/// Optimized for M4 Neural Engine rendering
struct QuantumSpatial8View: View {
    @State private var rotationAngle: Double = 0
    @State private var pulseScale: CGFloat = 1.0
    @Environment(\.colorScheme) var colorScheme

    var body: some View {
        ZStack {
            // Background - Dark Mysterious
            Color(hex: "#0A0E27")
                .ignoresSafeArea()

            // Main Figure-8 Structure
            Canvas { context, size in
                let center = CGPoint(x: size.width / 2, y: size.height / 2)

                // Outer glow ring
                drawFigureEight(
                    in: &context,
                    center: center,
                    scale: 1.2,
                    strokeWidth: 3,
                    opacity: 0.3
                )

                // Main structure with glassmorphism
                drawFigureEight(
                    in: &context,
                    center: center,
                    scale: 1.0,
                    strokeWidth: 4,
                    opacity: 0.8
                )

                // Inner glass layer
                drawFigureEight(
                    in: &context,
                    center: center,
                    scale: 0.7,
                    strokeWidth: 2,
                    opacity: 0.5
                )

                // Center nexus point
                let nexusPath = Circle()
                    .path(in: CGRect(
                        x: center.x - 8 * pulseScale,
                        y: center.y - 8 * pulseScale,
                        width: 16 * pulseScale,
                        height: 16 * pulseScale
                    ))

                context.fill(
                    nexusPath,
                    with: .color(.white.opacity(0.9))
                )
            }
            .frame(width: 400, height: 400)
            .rotationEffect(.degrees(rotationAngle))

            // Quantum particles overlay
            QuantumParticlesView()
                .frame(width: 400, height: 400)
        }
        .onAppear {
            // Continuous rotation animation
            withAnimation(
                .linear(duration: 20)
                .repeatForever(autoreverses: false)
            ) {
                rotationAngle = 360
            }

            // Pulse animation for center
            withAnimation(
                .easeInOut(duration: 2)
                .repeatForever(autoreverses: true)
            ) {
                pulseScale = 1.5
            }
        }
        .accessibilityLabel("Quantum Spatial infinity symbol animation")
        .accessibilityHint("Animated figure-8 representing quantum spatial design")
    }

    /// Draws a figure-8 path with quantum-spatial styling
    private func drawFigureEight(
        in context: inout GraphicsContext,
        center: CGPoint,
        scale: CGFloat,
        strokeWidth: CGFloat,
        opacity: Double
    ) {
        var path = Path()

        let radius: CGFloat = 80 * scale
        let offset: CGFloat = 60 * scale

        // Upper loop
        path.addArc(
            center: CGPoint(x: center.x, y: center.y - offset),
            radius: radius,
            startAngle: .degrees(0),
            endAngle: .degrees(360),
            clockwise: false
        )

        // Lower loop
        path.addArc(
            center: CGPoint(x: center.x, y: center.y + offset),
            radius: radius,
            startAngle: .degrees(0),
            endAngle: .degrees(360),
            clockwise: false
        )

        // Apply quantum gradient
        let gradient = LinearGradient(
            colors: [
                Color(hex: "#E85D75").opacity(opacity),
                Color(hex: "#4ECDC4").opacity(opacity),
                Color(hex: "#A78BFA").opacity(opacity)
            ],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )

        context.stroke(
            path,
            with: .linearGradient(
                gradient,
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            ),
            style: StrokeStyle(
                lineWidth: strokeWidth,
                lineCap: .round,
                lineJoin: .round
            )
        )
    }
}

/// Orbiting quantum particles component
struct QuantumParticlesView: View {
    @State private var animate = false

    var body: some View {
        ZStack {
            // Particle 1 - Cyan
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            Color(hex: "#4ECDC4"),
                            Color(hex: "#4ECDC4").opacity(0)
                        ],
                        center: .center,
                        startRadius: 0,
                        endRadius: 8
                    )
                )
                .frame(width: 8, height: 8)
                .offset(x: animate ? 100 : -100, y: animate ? -80 : 80)
                .animation(
                    .linear(duration: 8).repeatForever(autoreverses: false),
                    value: animate
                )

            // Particle 2 - Pink
            Circle()
                .fill(Color(hex: "#E85D75"))
                .frame(width: 6, height: 6)
                .offset(x: animate ? -80 : 80, y: animate ? 100 : -100)
                .animation(
                    .linear(duration: 10).repeatForever(autoreverses: false),
                    value: animate
                )

            // Particle 3 - Purple
            Circle()
                .fill(Color(hex: "#A78BFA"))
                .frame(width: 10, height: 10)
                .offset(x: animate ? 60 : -60, y: animate ? -60 : 60)
                .opacity(0.6)
                .animation(
                    .linear(duration: 12).repeatForever(autoreverses: false),
                    value: animate
                )
        }
        .onAppear {
            animate = true
        }
    }
}

// MARK: - Color Extension for Hex Support
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
#Preview("Quantum Spatial 8") {
    QuantumSpatial8View()
}

#Preview("Dark Mode") {
    QuantumSpatial8View()
        .preferredColorScheme(.dark)
}

#Preview("Light Mode - Adapts Background") {
    QuantumSpatial8View()
        .preferredColorScheme(.light)
}
