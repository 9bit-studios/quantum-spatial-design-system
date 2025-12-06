import SwiftUI

/// QuantumSpatial_11 SwiftUI Component
///
/// Native SwiftUI implementation of the quantum-spatial animated design
/// with full Apple HIG compliance and M4 optimization.
///
/// Features:
/// - Liquid-glass morphing geometry
/// - Glassmorphism effects with depth layers
/// - M4-optimized animations (reduced motion support)
/// - Dark-mysterious quantum theme
/// - 9Bit Studios brand alignment
///
/// Example Usage:
/// ```swift
/// QuantumSpatial_11(
///     size: 400,
///     animated: true,
///     primaryColor: .quantumPink,
///     secondaryColor: .quantumTeal
/// )
/// ```
@available(iOS 17.0, macOS 14.0, *)
struct QuantumSpatial_11: View {
    // MARK: - Properties

    let size: CGFloat
    let animated: Bool
    let primaryColor: Color
    let secondaryColor: Color
    let accentColor: Color

    @Environment(\.colorScheme) private var colorScheme
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    // Animation state
    @State private var outerRingRotation: Double = 0
    @State private var hexagonalRingRotation: Double = 0
    @State private var particleRotation: Double = 0
    @State private var orbPulse: Double = 0.7
    @State private var morphRadius: CGFloat = 1.0

    // MARK: - Initialization

    init(
        size: CGFloat = 400,
        animated: Bool = true,
        primaryColor: Color = .quantumPink,
        secondaryColor: Color = .quantumTeal,
        accentColor: Color = .quantumPurple
    ) {
        self.size = size
        self.animated = animated
        self.primaryColor = primaryColor
        self.secondaryColor = secondaryColor
        self.accentColor = accentColor
    }

    // MARK: - Body

    var body: some View {
        ZStack {
            // Background gradient glow
            RadialGradient(
                gradient: Gradient(colors: [
                    primaryColor.opacity(0.15),
                    secondaryColor.opacity(0.08),
                    Color.quantumBackground.opacity(0)
                ]),
                center: .center,
                startRadius: 0,
                endRadius: size / 2
            )

            // Quantum spatial grid
            quantumGrid

            // Outer rotating ring
            outerGlassRing

            // Middle hexagonal ring
            hexagonalRing

            // Liquid-glass morphing geometry
            morphingGeometry

            // Central quantum orb
            centralOrb

            // Orbiting particles
            orbitingParticles

            // Connecting energy lines
            energyLines
        }
        .frame(width: size, height: size)
        .accessibilityLabel("Quantum Spatial Design 11")
        .accessibilityHint("Animated quantum-spatial geometric pattern")
        .onAppear {
            if animated && !reduceMotion {
                startAnimations()
            }
        }
    }

    // MARK: - Subviews

    /// Quantum spatial grid background
    private var quantumGrid: some View {
        Canvas { context, size in
            let gridSize: CGFloat = size.width / 8

            context.opacity = 0.15
            context.stroke(
                Path { path in
                    // Vertical lines
                    for i in 0...8 {
                        let x = gridSize * CGFloat(i)
                        path.move(to: CGPoint(x: x, y: 0))
                        path.addLine(to: CGPoint(x: x, y: size.height))
                    }

                    // Horizontal lines
                    for i in 0...8 {
                        let y = gridSize * CGFloat(i)
                        path.move(to: CGPoint(x: 0, y: y))
                        path.addLine(to: CGPoint(x: size.width, y: y))
                    }
                },
                with: .color(secondaryColor),
                lineWidth: 0.5
            )
        }
    }

    /// Outer rotating glass ring
    private var outerGlassRing: some View {
        Circle()
            .strokeBorder(
                LinearGradient(
                    colors: [
                        .white.opacity(0.18),
                        .white.opacity(0.05)
                    ],
                    startPoint: .top,
                    endPoint: .bottom
                ),
                lineWidth: 2
            )
            .frame(width: size * 0.75, height: size * 0.75)
            .blur(radius: 10)
            .opacity(0.7)
            .rotationEffect(.degrees(outerRingRotation))
    }

    /// Middle hexagonal ring
    private var hexagonalRing: some View {
        HexagonShape()
            .stroke(accentColor, lineWidth: 1.5)
            .frame(width: size * 0.5, height: size * 0.5)
            .opacity(0.6)
            .rotationEffect(.degrees(hexagonalRingRotation))
    }

    /// Liquid-glass morphing geometry layers
    private var morphingGeometry: some View {
        ZStack {
            // Outer morphing blob
            Ellipse()
                .fill(
                    LinearGradient(
                        colors: [
                            .white.opacity(0.18),
                            .white.opacity(0.05)
                        ],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )
                .frame(
                    width: size * 0.65 * morphRadius,
                    height: size * 0.55 * morphRadius
                )
                .blur(radius: 10)
                .opacity(0.3)

            // Inner morphing blob
            Ellipse()
                .fill(
                    LinearGradient(
                        colors: [
                            .white.opacity(0.18),
                            .white.opacity(0.05)
                        ],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )
                .frame(
                    width: size * 0.45 * morphRadius,
                    height: size * 0.5 * (2 - morphRadius)
                )
                .blur(radius: 10)
                .opacity(0.4)
        }
    }

    /// Central quantum orb with glow
    private var centralOrb: some View {
        ZStack {
            // Main orb
            Circle()
                .fill(
                    RadialGradient(
                        gradient: Gradient(colors: [
                            primaryColor.opacity(0.8),
                            accentColor.opacity(0.6),
                            secondaryColor.opacity(0.4)
                        ]),
                        center: .center,
                        startRadius: 0,
                        endRadius: size * 0.15
                    )
                )
                .frame(width: size * 0.3, height: size * 0.3)
                .shadow(color: primaryColor.opacity(0.6), radius: 20)
                .opacity(orbPulse)

            // Inner highlight
            Circle()
                .fill(.white.opacity(0.4))
                .frame(width: size * 0.1, height: size * 0.1)
                .blur(radius: 8)
                .offset(x: -size * 0.05, y: -size * 0.05)
        }
    }

    /// Orbiting quantum particles
    private var orbitingParticles: some View {
        ForEach(0..<3) { index in
            Circle()
                .fill(particleColor(for: index))
                .frame(width: 8, height: 8)
                .shadow(color: particleColor(for: index), radius: 8)
                .offset(y: -size * 0.225)
                .rotationEffect(.degrees(Double(index) * 120 + particleRotation))
        }
    }

    /// Connecting energy lines
    private var energyLines: some View {
        Canvas { context, canvasSize in
            let center = CGPoint(x: canvasSize.width / 2, y: canvasSize.height / 2)
            let innerRadius = size * 0.15
            let outerRadius = size * 0.275

            context.opacity = 0.4

            for angle in [30.0, 150.0, 270.0] {
                let radians = angle * .pi / 180
                let x1 = center.x + innerRadius * cos(radians)
                let y1 = center.y + innerRadius * sin(radians)
                let x2 = center.x + outerRadius * cos(radians)
                let y2 = center.y + outerRadius * sin(radians)

                var path = Path()
                path.move(to: CGPoint(x: x1, y: y1))
                path.addLine(to: CGPoint(x: x2, y: y2))

                context.stroke(path, with: .color(primaryColor), lineWidth: 1)
            }
        }
    }

    // MARK: - Helper Methods

    private func particleColor(for index: Int) -> Color {
        switch index {
        case 0: return primaryColor
        case 1: return secondaryColor
        default: return accentColor
        }
    }

    private func startAnimations() {
        // Outer ring rotation (20s)
        withAnimation(
            .linear(duration: 20)
            .repeatForever(autoreverses: false)
        ) {
            outerRingRotation = 360
        }

        // Hexagonal ring rotation (15s, counter-clockwise)
        withAnimation(
            .linear(duration: 15)
            .repeatForever(autoreverses: false)
        ) {
            hexagonalRingRotation = -360
        }

        // Particle orbit (8s)
        withAnimation(
            .linear(duration: 8)
            .repeatForever(autoreverses: false)
        ) {
            particleRotation = 360
        }

        // Orb pulse (3s)
        withAnimation(
            .easeInOut(duration: 3)
            .repeatForever(autoreverses: true)
        ) {
            orbPulse = 0.9
        }

        // Morph radius (6s)
        withAnimation(
            .easeInOut(duration: 6)
            .repeatForever(autoreverses: true)
        ) {
            morphRadius = 1.15
        }
    }
}

// MARK: - Hexagon Shape

@available(iOS 17.0, macOS 14.0, *)
struct HexagonShape: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        let center = CGPoint(x: rect.midX, y: rect.midY)
        let radius = min(rect.width, rect.height) / 2

        // Calculate hexagon points
        for i in 0..<6 {
            let angle = (CGFloat(i) * 60 - 30) * .pi / 180
            let x = center.x + radius * cos(angle)
            let y = center.y + radius * sin(angle)

            if i == 0 {
                path.move(to: CGPoint(x: x, y: y))
            } else {
                path.addLine(to: CGPoint(x: x, y: y))
            }
        }
        path.closeSubpath()

        return path
    }
}

// MARK: - Quantum Color Extensions

extension Color {
    /// 9Bit Studios quantum-spatial color palette
    static let quantumPink = Color(red: 0.91, green: 0.36, blue: 0.46)      // #E85D75
    static let quantumTeal = Color(red: 0.31, green: 0.80, blue: 0.77)      // #4ECDC4
    static let quantumPurple = Color(red: 0.65, green: 0.55, blue: 0.98)    // #A78BFA
    static let quantumBackground = Color(red: 0.04, green: 0.05, blue: 0.15) // #0A0E27
}

// MARK: - Preview Provider

@available(iOS 17.0, macOS 14.0, *)
#Preview("Default") {
    ZStack {
        Color.quantumBackground
            .ignoresSafeArea()

        QuantumSpatial_11(
            size: 400,
            animated: true
        )
    }
}

@available(iOS 17.0, macOS 14.0, *)
#Preview("Horror Gaming Theme") {
    ZStack {
        Color.black
            .ignoresSafeArea()

        QuantumSpatial_11(
            size: 400,
            animated: true,
            primaryColor: Color(red: 0.55, green: 0, blue: 0),         // Dark red
            secondaryColor: Color(red: 0.29, green: 0.05, blue: 0.31), // Deep purple
            accentColor: Color(red: 0.77, green: 0.12, blue: 0.23)     // Crimson
        )
    }
}

@available(iOS 17.0, macOS 14.0, *)
#Preview("Icon Size") {
    ZStack {
        Color.quantumBackground
            .ignoresSafeArea()

        QuantumSpatial_11(
            size: 64,
            animated: true
        )
    }
}

@available(iOS 17.0, macOS 14.0, *)
#Preview("Static (No Animation)") {
    ZStack {
        Color.quantumBackground
            .ignoresSafeArea()

        QuantumSpatial_11(
            size: 400,
            animated: false
        )
    }
}
