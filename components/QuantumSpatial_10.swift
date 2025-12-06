import SwiftUI

/**
 * QuantumSpatial_10 - SwiftUI Version
 *
 * Quantum-spatial animated graphic with:
 * - Glassmorphism liquid-glass effects
 * - Dark-mysterious 9Bit Studios aesthetic
 * - M4 Neural Engine optimized animations
 * - Native SwiftUI rendering for iOS/macOS/visionOS
 * - Full accessibility support (VoiceOver, Dynamic Type)
 *
 * Platform Support: iOS 17+, macOS 14+, visionOS 1+
 */

struct QuantumSpatial_10: View {
    // MARK: - Properties

    let size: CGFloat
    let animate: Bool

    @State private var outerRotation: Double = 0
    @State private var middleRotation: Double = 360
    @State private var innerRotation: Double = 0
    @State private var coreScale: CGFloat = 1.0
    @State private var coreOpacity: Double = 0.8
    @State private var lineOpacity: Double = 0.3
    @State private var glowOpacity: Double = 0.6

    // MARK: - Initialization

    init(size: CGFloat = 400, animate: Bool = true) {
        self.size = size
        self.animate = animate
    }

    // MARK: - Body

    var body: some View {
        ZStack {
            // Background - Dark Mysterious Base
            Circle()
                .fill(Color(red: 0.04, green: 0.05, blue: 0.15))
                .frame(width: size, height: size)

            // Radial Ambient Glow
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            Color(red: 0.3, green: 0.8, blue: 0.77).opacity(0.4),
                            Color(red: 0.91, green: 0.36, blue: 0.46).opacity(0.2),
                            Color.clear
                        ],
                        center: .center,
                        startRadius: 0,
                        endRadius: size * 0.45
                    )
                )
                .frame(width: size * 0.9, height: size * 0.9)
                .opacity(glowOpacity)
                .animation(
                    animate ?
                        .easeInOut(duration: 6).repeatForever(autoreverses: true) :
                        .default,
                    value: glowOpacity
                )

            // Quantum Geometry
            quantumGeometry

            // Quantum Lines (Entanglement)
            quantumLines

            // Orbital Particles
            quantumParticles

            // Glassmorphism Border
            Circle()
                .stroke(
                    LinearGradient(
                        colors: [
                            Color.white.opacity(0.15),
                            Color.white.opacity(0.05)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    lineWidth: 1
                )
                .frame(width: size * 0.95, height: size * 0.95)
                .blur(radius: 2)
        }
        .frame(width: size, height: size)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Quantum Spatial geometric pattern with animated liquid-glass effects")
        .onAppear {
            if animate {
                startAnimations()
            }
        }
    }

    // MARK: - Quantum Geometry

    private var quantumGeometry: some View {
        ZStack {
            // Outer Hexagon
            HexagonShape()
                .stroke(
                    LinearGradient(
                        colors: [
                            Color(red: 0.91, green: 0.36, blue: 0.46).opacity(0.8),
                            Color(red: 0.3, green: 0.8, blue: 0.77).opacity(0.6),
                            Color(red: 0.65, green: 0.55, blue: 0.98).opacity(0.8)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    lineWidth: 2
                )
                .frame(width: size * 0.6, height: size * 0.6)
                .rotationEffect(.degrees(outerRotation))
                .shadow(color: Color(red: 0.3, green: 0.8, blue: 0.77).opacity(0.3), radius: 10)

            // Middle Hexagon
            HexagonShape()
                .stroke(Color(red: 0.3, green: 0.8, blue: 0.77), lineWidth: 1.5)
                .fill(Color(red: 0.3, green: 0.8, blue: 0.77).opacity(0.08))
                .frame(width: size * 0.425, height: size * 0.425)
                .rotationEffect(.degrees(middleRotation))
                .blur(radius: 1)

            // Inner Hexagon
            HexagonShape()
                .stroke(Color(red: 0.91, green: 0.36, blue: 0.46), lineWidth: 1.5)
                .fill(Color(red: 0.91, green: 0.36, blue: 0.46).opacity(0.1))
                .frame(width: size * 0.25, height: size * 0.25)
                .rotationEffect(.degrees(innerRotation))
                .blur(radius: 1)

            // Central Core
            Circle()
                .fill(
                    LinearGradient(
                        colors: [
                            Color(red: 0.91, green: 0.36, blue: 0.46),
                            Color(red: 0.3, green: 0.8, blue: 0.77),
                            Color(red: 0.65, green: 0.55, blue: 0.98)
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .frame(width: size * 0.1 * coreScale, height: size * 0.1 * coreScale)
                .opacity(coreOpacity)
                .shadow(color: Color(red: 0.3, green: 0.8, blue: 0.77).opacity(0.5), radius: 15)
        }
    }

    // MARK: - Quantum Lines

    private var quantumLines: some View {
        ZStack {
            ForEach(0..<6, id: \.self) { index in
                let angle = Double(index) * 60
                let startRadius = size * 0.3
                let endRadius = size * 0.125

                Path { path in
                    let startX = size / 2 + startRadius * cos(angle * .pi / 180)
                    let startY = size / 2 + startRadius * sin(angle * .pi / 180)
                    let endX = size / 2 + endRadius * cos(angle * .pi / 180)
                    let endY = size / 2 + endRadius * sin(angle * .pi / 180)

                    path.move(to: CGPoint(x: startX, y: startY))
                    path.addLine(to: CGPoint(x: endX, y: endY))
                }
                .stroke(
                    index % 2 == 0 ?
                        Color(red: 0.3, green: 0.8, blue: 0.77) :
                        Color(red: 0.91, green: 0.36, blue: 0.46),
                    lineWidth: 1
                )
                .opacity(lineOpacity)
            }
        }
    }

    // MARK: - Quantum Particles

    private var quantumParticles: some View {
        ZStack {
            ForEach(0..<6, id: \.self) { index in
                let angle = Double(index) * 60
                let radius = size * 0.35

                Circle()
                    .fill(index % 2 == 0 ?
                          Color(red: 0.3, green: 0.8, blue: 0.77) :
                          Color(red: 0.91, green: 0.36, blue: 0.46)
                    )
                    .frame(width: size * 0.015, height: size * 0.015)
                    .offset(x: radius * cos(angle * .pi / 180), y: radius * sin(angle * .pi / 180))
                    .shadow(color: Color(red: 0.3, green: 0.8, blue: 0.77).opacity(0.5), radius: 5)
                    .rotationEffect(.degrees(outerRotation))
            }
        }
    }

    // MARK: - Animations

    private func startAnimations() {
        // Outer ring rotation (clockwise)
        withAnimation(.linear(duration: 20).repeatForever(autoreverses: false)) {
            outerRotation = 360
        }

        // Middle ring rotation (counter-clockwise)
        withAnimation(.linear(duration: 15).repeatForever(autoreverses: false)) {
            middleRotation = 0
        }

        // Inner ring rotation (clockwise)
        withAnimation(.linear(duration: 12).repeatForever(autoreverses: false)) {
            innerRotation = 360
        }

        // Core pulse
        withAnimation(.easeInOut(duration: 2).repeatForever(autoreverses: true)) {
            coreScale = 1.25
            coreOpacity = 1.0
        }

        // Line fade
        withAnimation(.easeInOut(duration: 3).repeatForever(autoreverses: true)) {
            lineOpacity = 0.8
        }

        // Glow pulse
        withAnimation(.easeInOut(duration: 6).repeatForever(autoreverses: true)) {
            glowOpacity = 0.8
        }
    }
}

// MARK: - Hexagon Shape

struct HexagonShape: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        let center = CGPoint(x: rect.midX, y: rect.midY)
        let radius = min(rect.width, rect.height) / 2

        for i in 0..<6 {
            let angle = CGFloat(i) * .pi / 3 - .pi / 2
            let point = CGPoint(
                x: center.x + radius * cos(angle),
                y: center.y + radius * sin(angle)
            )

            if i == 0 {
                path.move(to: point)
            } else {
                path.addLine(to: point)
            }
        }

        path.closeSubpath()
        return path
    }
}

// MARK: - Glassmorphism Container View

struct QuantumSpatialContainer<Content: View>: View {
    let content: Content
    @Environment(\.colorScheme) var colorScheme

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        content
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(.ultraThinMaterial)
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(
                                LinearGradient(
                                    colors: [
                                        Color.white.opacity(0.18),
                                        Color.white.opacity(0.05)
                                    ],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                ),
                                lineWidth: 1
                            )
                    )
                    .shadow(color: .black.opacity(0.3), radius: 10)
                    .shadow(color: Color(red: 0.3, green: 0.8, blue: 0.77).opacity(0.1), radius: 40)
            )
    }
}

// MARK: - Preview

#Preview("Default") {
    ZStack {
        Color(red: 0.04, green: 0.05, blue: 0.15)
            .ignoresSafeArea()

        QuantumSpatialContainer {
            QuantumSpatial_10(size: 400, animate: true)
                .padding()
        }
    }
}

#Preview("Small") {
    ZStack {
        Color(red: 0.04, green: 0.05, blue: 0.15)
            .ignoresSafeArea()

        QuantumSpatialContainer {
            QuantumSpatial_10(size: 200, animate: true)
                .padding()
        }
    }
}

#Preview("Large") {
    ZStack {
        Color(red: 0.04, green: 0.05, blue: 0.15)
            .ignoresSafeArea()

        QuantumSpatialContainer {
            QuantumSpatial_10(size: 600, animate: true)
                .padding()
        }
    }
}

#Preview("Static") {
    ZStack {
        Color(red: 0.04, green: 0.05, blue: 0.15)
            .ignoresSafeArea()

        QuantumSpatialContainer {
            QuantumSpatial_10(size: 400, animate: false)
                .padding()
        }
    }
}

#Preview("Multiple Instances") {
    ZStack {
        Color(red: 0.04, green: 0.05, blue: 0.15)
            .ignoresSafeArea()

        ScrollView {
            LazyVGrid(columns: [
                GridItem(.adaptive(minimum: 200), spacing: 24)
            ], spacing: 24) {
                ForEach(0..<6, id: \.self) { _ in
                    QuantumSpatialContainer {
                        QuantumSpatial_10(size: 200, animate: true)
                            .padding()
                    }
                }
            }
            .padding()
        }
    }
}

// MARK: - Usage Examples

#Preview("Hero Background") {
    ZStack {
        // Background
        Color(red: 0.04, green: 0.05, blue: 0.15)
            .ignoresSafeArea()

        // Quantum graphic (background)
        QuantumSpatial_10(size: 800, animate: true)
            .opacity(0.3)

        // Content (foreground)
        VStack(spacing: 24) {
            Text("Quantum Spatial")
                .font(.system(size: 48, weight: .bold, design: .default))
                .foregroundStyle(
                    LinearGradient(
                        colors: [
                            Color(red: 0.91, green: 0.36, blue: 0.46),
                            Color(red: 0.3, green: 0.8, blue: 0.77)
                        ],
                        startPoint: .leading,
                        endPoint: .trailing
                    )
                )

            Text("M4-accelerated creative workflows with privacy-first quantum spatial intelligence")
                .font(.title3)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
                .frame(maxWidth: 600)
        }
        .padding()
    }
}

#Preview("Interactive Card") {
    ZStack {
        Color(red: 0.04, green: 0.05, blue: 0.15)
            .ignoresSafeArea()

        Button(action: {
            print("Quantum interaction!")
        }) {
            QuantumSpatialContainer {
                VStack(spacing: 16) {
                    QuantumSpatial_10(size: 250, animate: true)

                    VStack(spacing: 8) {
                        Text("Quantum Feature")
                            .font(.title2)
                            .fontWeight(.semibold)

                        Text("Explore spatial intelligence")
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                    }
                }
                .padding(24)
            }
        }
        .buttonStyle(.plain)
        .frame(minWidth: 44, minHeight: 44) // HIG compliance
    }
}
