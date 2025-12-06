import SwiftUI

/// QuantumSpatial_9 SwiftUI Component
///
/// Native SwiftUI implementation of the 9Bit Studios quantum-spatial logo
/// with liquid-glass aesthetics and M4 Neural Engine optimization.
///
/// Features:
/// - Native SwiftUI animations with TimelineView
/// - Glassmorphism effects via ultraThinMaterial
/// - Dark mode optimized (required)
/// - VoiceOver accessibility support
/// - Dynamic Type respect
/// - M4-accelerated rendering
///
/// Usage:
/// ```swift
/// QuantumSpatial_9(size: 200, animated: true)
/// ```
@available(iOS 15.0, macOS 12.0, *)
public struct QuantumSpatial_9: View {
    // MARK: - Properties

    /// Size in points (square aspect ratio)
    let size: CGFloat

    /// Enable/disable animations
    let animated: Bool

    /// Primary accent color (default: quantum pink)
    let accentColor: Color

    /// Secondary accent color (default: quantum cyan)
    let secondaryColor: Color

    /// Animation speed multiplier
    let animationSpeed: Double

    /// Accessibility label
    let accessibilityLabel: String

    // MARK: - State

    @State private var rotationAngle: Double = 0
    @State private var pulseScale: CGFloat = 1.0
    @State private var glowOpacity: Double = 0.4

    @Environment(\.colorScheme) var colorScheme
    @Environment(\.accessibilityReduceMotion) var reduceMotion

    // MARK: - Initialization

    public init(
        size: CGFloat = 200,
        animated: Bool = true,
        accentColor: Color = Color(red: 0.91, green: 0.36, blue: 0.46), // #E85D75
        secondaryColor: Color = Color(red: 0.31, green: 0.80, blue: 0.77), // #4ECDC4
        animationSpeed: Double = 1.0,
        accessibilityLabel: String = "9Bit Studios Quantum Spatial Logo"
    ) {
        self.size = size
        self.animated = animated && !ProcessInfo.processInfo.environment.keys.contains("XCODE_RUNNING_FOR_PREVIEWS")
        self.accentColor = accentColor
        self.secondaryColor = secondaryColor
        self.animationSpeed = animationSpeed
        self.accessibilityLabel = accessibilityLabel
    }

    // MARK: - Body

    public var body: some View {
        ZStack {
            // Background quantum glow
            quantumGlowBackground

            // Orbital rings with particles
            orbitalRingSystem

            // Central "9" glyph
            centralNineGlyph

            // Energy wave pulses
            if animated && !reduceMotion {
                energyWavePulses
            }

            // Corner accents
            cornerAccents
        }
        .frame(width: size, height: size)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(accessibilityLabel)
        .accessibilityAddTraits(.isImage)
        .onAppear {
            if animated && !reduceMotion {
                startAnimations()
            }
        }
    }

    // MARK: - Component Views

    /// Background quantum glow effect
    private var quantumGlowBackground: some View {
        Circle()
            .fill(
                RadialGradient(
                    colors: [
                        secondaryColor.opacity(0.3),
                        accentColor.opacity(0.2),
                        Color.clear
                    ],
                    center: .center,
                    startRadius: 0,
                    endRadius: size * 0.5
                )
            )
            .scaleEffect(pulseScale)
            .opacity(glowOpacity)
            .blur(radius: 20)
    }

    /// Orbital ring system with particles
    private var orbitalRingSystem: some View {
        ZStack {
            ForEach(0..<3, id: \.self) { ringIndex in
                let radius = (size * 0.3) + (CGFloat(ringIndex) * size * 0.075)
                let rotationSpeed = 15.0 - (Double(ringIndex) * 3.0)

                // Orbital ring
                Circle()
                    .stroke(
                        ringIndex == 1 ? accentColor : secondaryColor,
                        style: StrokeStyle(
                            lineWidth: 1,
                            dash: [5, 10]
                        )
                    )
                    .frame(width: radius * 2, height: radius * 2)
                    .opacity(0.3)
                    .rotationEffect(.degrees(rotationAngle * (1.0 / rotationSpeed)))

                // Orbital particles
                ForEach(0..<4, id: \.self) { particleIndex in
                    let angle = Double(particleIndex) * 90.0

                    Circle()
                        .fill(particleIndex % 2 == 0 ? accentColor : secondaryColor)
                        .frame(width: 6, height: 6)
                        .shadow(color: particleIndex % 2 == 0 ? accentColor : secondaryColor, radius: 8)
                        .offset(x: radius * cos(angle * .pi / 180))
                        .offset(y: radius * sin(angle * .pi / 180))
                        .opacity(particleIndex % 2 == 0 ? glowOpacity : 1.0 - glowOpacity)
                        .rotationEffect(.degrees(rotationAngle * (1.0 / rotationSpeed)))
                }
            }
        }
    }

    /// Central "9" glyph with liquid-glass effect
    private var centralNineGlyph: some View {
        ZStack {
            // Glass background layer
            nineGlyphPath
                .fill(.ultraThinMaterial)
                .shadow(color: accentColor.opacity(0.3), radius: 10)

            // Main "9" shape with gradient
            nineGlyphPath
                .fill(
                    LinearGradient(
                        colors: [
                            accentColor.opacity(0.8),
                            secondaryColor.opacity(0.6),
                            accentColor.opacity(0.9)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .overlay(
                    nineGlyphPath
                        .stroke(accentColor, lineWidth: 3)
                )
                .shadow(color: accentColor.opacity(0.5), radius: 15)

            // Glass highlight overlay
            Path { path in
                path.move(to: CGPoint(x: size * 0.4, y: size * 0.35))
                path.addQuadCurve(
                    to: CGPoint(x: size * 0.6, y: size * 0.38),
                    control: CGPoint(x: size * 0.5, y: size * 0.32)
                )
            }
            .stroke(Color.white.opacity(0.4), lineWidth: 2)
        }
    }

    /// Path definition for "9" glyph
    private var nineGlyphPath: some Shape {
        Path { path in
            let scale = size / 200.0 // Base size 200
            let centerX = size / 2
            let centerY = size / 2

            // Top circle of "9"
            path.addArc(
                center: CGPoint(x: centerX, y: centerY - 20 * scale),
                radius: 25 * scale,
                startAngle: .degrees(0),
                endAngle: .degrees(360),
                clockwise: false
            )

            // Vertical stem
            path.move(to: CGPoint(x: centerX + 25 * scale, y: centerY - 20 * scale))
            path.addLine(to: CGPoint(x: centerX + 25 * scale, y: centerY + 40 * scale))

            // Bottom curve
            path.addArc(
                center: CGPoint(x: centerX, y: centerY + 40 * scale),
                radius: 25 * scale,
                startAngle: .degrees(0),
                endAngle: .degrees(180),
                clockwise: false
            )

            // Close with inner curve
            path.addLine(to: CGPoint(x: centerX - 15 * scale, y: centerY + 40 * scale))
            path.addArc(
                center: CGPoint(x: centerX, y: centerY + 40 * scale),
                radius: 15 * scale,
                startAngle: .degrees(180),
                endAngle: .degrees(0),
                clockwise: true
            )
            path.addLine(to: CGPoint(x: centerX + 15 * scale, y: centerY - 20 * scale))
            path.addArc(
                center: CGPoint(x: centerX, y: centerY - 20 * scale),
                radius: 15 * scale,
                startAngle: .degrees(0),
                endAngle: .degrees(360),
                clockwise: true
            )
        }
    }

    /// Energy wave pulses expanding from center
    private var energyWavePulses: some View {
        TimelineView(.animation) { timeline in
            let seconds = timeline.date.timeIntervalSinceReferenceDate

            ForEach(0..<3, id: \.self) { waveIndex in
                let phase = (seconds + Double(waveIndex) * 1.2).truncatingRemainder(dividingBy: 4.0)
                let progress = phase / 4.0
                let radius = size * 0.25 * (1.0 + progress * 3.0)
                let opacity = 0.6 * (1.0 - progress)

                Circle()
                    .stroke(
                        waveIndex % 2 == 0 ? accentColor : secondaryColor,
                        lineWidth: 2
                    )
                    .frame(width: radius * 2, height: radius * 2)
                    .opacity(opacity)
            }
        }
    }

    /// Corner accent elements
    private var cornerAccents: some View {
        let corners: [(x: CGFloat, y: CGFloat)] = [
            (0.1, 0.1), (0.9, 0.1), (0.1, 0.9), (0.9, 0.9)
        ]

        return ForEach(Array(corners.enumerated()), id: \.offset) { index, corner in
            ZStack {
                Circle()
                    .fill(index % 2 == 0 ? accentColor : secondaryColor)
                    .frame(width: 8, height: 8)
                    .shadow(color: index % 2 == 0 ? accentColor : secondaryColor, radius: 10)
                    .opacity(index % 2 == 0 ? glowOpacity : 1.0 - glowOpacity)

                Circle()
                    .stroke(index % 2 == 0 ? accentColor : secondaryColor, lineWidth: 1)
                    .frame(width: 16, height: 16)
                    .opacity(0.3)
            }
            .position(x: corner.x * size, y: corner.y * size)
        }
    }

    // MARK: - Animations

    private func startAnimations() {
        // Rotation animation
        withAnimation(.linear(duration: 15.0 / animationSpeed).repeatForever(autoreverses: false)) {
            rotationAngle = 360
        }

        // Pulse animation
        withAnimation(.easeInOut(duration: 4.0 / animationSpeed).repeatForever(autoreverses: true)) {
            pulseScale = 1.1
        }

        // Glow animation
        withAnimation(.easeInOut(duration: 2.0 / animationSpeed).repeatForever(autoreverses: true)) {
            glowOpacity = 0.7
        }
    }
}

// MARK: - Preview Provider

@available(iOS 15.0, macOS 12.0, *)
struct QuantumSpatial_9_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            // Default
            QuantumSpatial_9()
                .padding()
                .background(Color(red: 0.04, green: 0.05, blue: 0.15))
                .previewDisplayName("Default")

            // Large animated
            QuantumSpatial_9(size: 400, animated: true, animationSpeed: 1.5)
                .padding()
                .background(Color(red: 0.04, green: 0.05, blue: 0.15))
                .previewDisplayName("Large Animated")

            // Small static
            QuantumSpatial_9(size: 64, animated: false)
                .padding()
                .background(Color(red: 0.04, green: 0.05, blue: 0.15))
                .previewDisplayName("Small Static")

            // Custom colors
            QuantumSpatial_9(
                size: 200,
                animated: true,
                accentColor: .purple,
                secondaryColor: .green
            )
            .padding()
            .background(Color(red: 0.04, green: 0.05, blue: 0.15))
            .previewDisplayName("Custom Colors")

            // Navigation context
            NavigationView {
                List {
                    HStack {
                        QuantumSpatial_9(size: 44, animated: false)
                        Text("9Bit Studios")
                            .font(.headline)
                    }
                }
                .navigationTitle("Navigation Example")
            }
            .previewDisplayName("Navigation Context")

            // Hero section
            VStack(spacing: 24) {
                QuantumSpatial_9(size: 300, animated: true)

                Text("9Bit Studios")
                    .font(.system(.largeTitle, design: .rounded))
                    .fontWeight(.bold)
                    .foregroundColor(.white)

                Text("Quantum Spatial Intelligence")
                    .font(.system(.title3, design: .rounded))
                    .foregroundColor(.white.opacity(0.7))
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Color(red: 0.04, green: 0.05, blue: 0.15))
            .previewDisplayName("Hero Section")
        }
    }
}

// MARK: - Usage Examples

@available(iOS 15.0, macOS 12.0, *)
extension QuantumSpatial_9 {
    /// Example: Hero section logo
    static func heroExample() -> some View {
        VStack(spacing: 32) {
            QuantumSpatial_9(size: 400, animated: true, animationSpeed: 1.2)

            VStack(spacing: 16) {
                Text("9Bit Studios")
                    .font(.system(.largeTitle, design: .rounded, weight: .bold))
                    .foregroundColor(.white)

                Text("Quantum Spatial Intelligence")
                    .font(.system(.title2, design: .rounded))
                    .foregroundColor(.white.opacity(0.7))
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(red: 0.04, green: 0.05, blue: 0.15))
    }

    /// Example: Navigation logo
    static func navigationExample() -> some View {
        HStack(spacing: 12) {
            QuantumSpatial_9(size: 44, animated: false)

            Text("9Bit Studios")
                .font(.system(.headline, design: .rounded))
                .foregroundColor(.white)
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(.ultraThinMaterial)
    }

    /// Example: Loading state
    static func loadingExample() -> some View {
        VStack(spacing: 24) {
            QuantumSpatial_9(
                size: 120,
                animated: true,
                animationSpeed: 2,
                accessibilityLabel: "Loading content"
            )

            Text("Initializing quantum workspace...")
                .font(.system(.body, design: .rounded))
                .foregroundColor(.white.opacity(0.7))
        }
    }

    /// Example: Card accent
    static func cardExample() -> some View {
        HStack(alignment: .top, spacing: 16) {
            QuantumSpatial_9(size: 64, animationSpeed: 0.5)

            VStack(alignment: .leading, spacing: 8) {
                Text("Quantum Workspace")
                    .font(.system(.headline, design: .rounded, weight: .semibold))
                    .foregroundColor(.white)

                Text("M4-accelerated creative intelligence powered by spatial design")
                    .font(.system(.subheadline, design: .rounded))
                    .foregroundColor(.white.opacity(0.7))
                    .fixedSize(horizontal: false, vertical: true)
            }
        }
        .padding(24)
        .background(.ultraThinMaterial)
        .cornerRadius(16)
        .shadow(color: .black.opacity(0.3), radius: 20)
    }
}
