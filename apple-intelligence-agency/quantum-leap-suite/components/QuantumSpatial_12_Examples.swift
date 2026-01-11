import SwiftUI

// MARK: - Example 1: Hero Section with Quantum Background

struct QuantumHeroSection: View {
    var body: some View {
        ZStack {
            // Full-screen quantum background
            QuantumSpatial_12()
                .ignoresSafeArea()

            // Hero content overlay
            VStack(spacing: 32) {
                Text("9Bit Studios")
                    .font(.system(size: 72, weight: .bold, design: .default))
                    .foregroundStyle(.white)

                Text("Quantum Spatial Intelligence")
                    .font(.title2)
                    .foregroundStyle(.white.opacity(0.8))

                Button(action: {}) {
                    Text("Explore the Quantum Realm")
                        .font(.headline)
                        .foregroundStyle(.white)
                        .frame(minWidth: 280, minHeight: 56) // HIG: 44px minimum
                        .background(
                            RoundedRectangle(cornerRadius: 16)
                                .fill(.ultraThinMaterial)
                        )
                }
                .buttonStyle(.plain)
            }
            .padding()
        }
    }
}

// MARK: - Example 2: Loading State with Quantum Animation

struct QuantumLoadingView: View {
    @State private var isLoading = true

    var body: some View {
        ZStack {
            if isLoading {
                // Quantum loading animation
                QuantumSpatial_12_Compact()
                    .frame(width: 400, height: 400)
                    .transition(.opacity)

                Text("Initializing Quantum Pathways...")
                    .font(.headline)
                    .foregroundStyle(.white)
                    .offset(y: 250)
            } else {
                // Your main content
                ContentView()
            }
        }
        .animation(.easeInOut(duration: 0.5), value: isLoading)
        .task {
            // Simulate loading
            try? await Task.sleep(for: .seconds(3))
            isLoading = false
        }
    }
}

// MARK: - Example 3: Card Background with Quantum Theme

struct QuantumProductCard: View {
    let product: Product

    var body: some View {
        ZStack {
            // Quantum background (compact)
            QuantumSpatial_12_Static()
                .frame(width: 400, height: 400)
                .clipShape(RoundedRectangle(cornerRadius: 24))
                .blur(radius: 10) // Subtle depth

            // Product content
            VStack(alignment: .leading, spacing: 16) {
                AsyncImage(url: product.imageURL) { image in
                    image
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                } placeholder: {
                    ProgressView()
                }
                .frame(height: 200)
                .clipShape(RoundedRectangle(cornerRadius: 16))

                VStack(alignment: .leading, spacing: 8) {
                    Text(product.title)
                        .font(.title3)
                        .fontWeight(.semibold)
                        .foregroundStyle(.white)

                    Text(product.price)
                        .font(.headline)
                        .foregroundStyle(Color(red: 0.305, green: 0.804, blue: 0.769)) // Quantum cyan
                }
                .padding(16)
            }
            .padding(24)
        }
        .frame(width: 400, height: 500)
    }
}

// MARK: - Example 4: Settings Panel with Quantum Accent

struct QuantumSettingsPanel: View {
    @State private var notificationsEnabled = true
    @State private var darkModeEnabled = true

    var body: some View {
        ZStack {
            // Subtle quantum background
            QuantumSpatial_12_Static()
                .opacity(0.3)
                .blur(radius: 30)
                .ignoresSafeArea()

            VStack(spacing: 24) {
                // Header
                Text("Settings")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundStyle(.white)

                // Settings options
                VStack(spacing: 16) {
                    settingRow(
                        title: "Notifications",
                        icon: "bell.fill",
                        isOn: $notificationsEnabled
                    )

                    settingRow(
                        title: "Dark Mode",
                        icon: "moon.fill",
                        isOn: $darkModeEnabled
                    )
                }
                .padding(24)
                .background(
                    RoundedRectangle(cornerRadius: 24)
                        .fill(.ultraThinMaterial)
                )
            }
            .padding()
        }
    }

    private func settingRow(title: String, icon: String, isOn: Binding<Bool>) -> some View {
        HStack {
            Image(systemName: icon)
                .foregroundStyle(Color(red: 0.305, green: 0.804, blue: 0.769))
                .frame(width: 44, height: 44) // HIG compliance

            Text(title)
                .font(.headline)
                .foregroundStyle(.white)

            Spacer()

            Toggle("", isOn: isOn)
                .labelsHidden()
                .frame(minWidth: 44, minHeight: 44) // HIG compliance
        }
    }
}

// MARK: - Example 5: Animated Transition Between Views

struct QuantumTransitionExample: View {
    @State private var showDetailView = false

    var body: some View {
        ZStack {
            if showDetailView {
                DetailView(onBack: { showDetailView = false })
                    .transition(.move(edge: .trailing))
            } else {
                ListView(onSelect: { showDetailView = true })
                    .transition(.move(edge: .leading))
            }

            // Persistent quantum background
            QuantumSpatial_12()
                .ignoresSafeArea()
                .zIndex(-1) // Behind content
        }
        .animation(.easeInOut(duration: 0.4), value: showDetailView)
    }
}

struct ListView: View {
    let onSelect: () -> Void

    var body: some View {
        VStack {
            Text("Quantum Projects")
                .font(.largeTitle)
                .fontWeight(.bold)
                .foregroundStyle(.white)

            Button("View Details") {
                onSelect()
            }
            .frame(minWidth: 200, minHeight: 44)
            .buttonStyle(.borderedProminent)
        }
    }
}

struct DetailView: View {
    let onBack: () -> Void

    var body: some View {
        VStack {
            Text("Project Details")
                .font(.largeTitle)
                .fontWeight(.bold)
                .foregroundStyle(.white)

            Button("Back") {
                onBack()
            }
            .frame(minWidth: 200, minHeight: 44)
            .buttonStyle(.borderedProminent)
        }
    }
}

// MARK: - Example 6: VisionOS Spatial Experience

#if os(visionOS)
struct QuantumSpatialExperience: View {
    var body: some View {
        ZStack {
            // Quantum environment
            QuantumSpatial_12()
                .frame(depth: 1000) // Spatial depth
                .ignoresSafeArea()

            // Floating content
            VStack(spacing: 48) {
                Text("Welcome to Quantum Space")
                    .font(.system(size: 48, weight: .bold))
                    .foregroundStyle(.white)

                Model3D(named: "QuantumObject")
                    .frame(width: 500, height: 500, depth: 500)
            }
            .padding3D(100)
        }
    }
}
#endif

// MARK: - Example 7: Adaptive Layout (iPhone/iPad/Mac)

struct QuantumAdaptiveLayout: View {
    @Environment(\.horizontalSizeClass) var horizontalSizeClass

    var body: some View {
        ZStack {
            QuantumSpatial_12()
                .ignoresSafeArea()

            if horizontalSizeClass == .compact {
                // iPhone: Vertical layout
                VStack(spacing: 24) {
                    quantumContent
                }
                .padding()
            } else {
                // iPad/Mac: Horizontal layout
                HStack(spacing: 48) {
                    quantumContent
                }
                .padding(48)
            }
        }
    }

    private var quantumContent: some View {
        Group {
            VStack {
                Image(systemName: "cpu.fill")
                    .font(.system(size: 64))
                    .foregroundStyle(Color(red: 0.305, green: 0.804, blue: 0.769))

                Text("M4 Neural Engine")
                    .font(.title)
                    .foregroundStyle(.white)
            }

            VStack {
                Image(systemName: "brain.head.profile")
                    .font(.system(size: 64))
                    .foregroundStyle(Color(red: 0.910, green: 0.365, blue: 0.459))

                Text("Quantum Intelligence")
                    .font(.title)
                    .foregroundStyle(.white)
            }
        }
    }
}

// MARK: - Example 8: Interactive Quantum Dashboard

struct QuantumDashboard: View {
    @State private var selectedMetric: Metric?

    var body: some View {
        ZStack {
            // Quantum background
            QuantumSpatial_12()
                .ignoresSafeArea()

            ScrollView {
                VStack(spacing: 32) {
                    // Header
                    Text("Quantum Analytics")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .foregroundStyle(.white)

                    // Metrics grid
                    LazyVGrid(columns: [
                        GridItem(.flexible()),
                        GridItem(.flexible())
                    ], spacing: 24) {
                        ForEach(Metric.allCases) { metric in
                            metricCard(metric)
                        }
                    }
                }
                .padding()
            }
        }
    }

    private func metricCard(_ metric: Metric) -> some View {
        Button {
            selectedMetric = metric
        } label: {
            VStack(spacing: 12) {
                Image(systemName: metric.icon)
                    .font(.system(size: 32))
                    .foregroundStyle(metric.color)

                Text(metric.title)
                    .font(.headline)
                    .foregroundStyle(.white)

                Text(metric.value)
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundStyle(.white)
            }
            .frame(maxWidth: .infinity)
            .frame(height: 180)
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(.ultraThinMaterial)
            )
        }
        .buttonStyle(.plain)
        .frame(minWidth: 44, minHeight: 44) // HIG compliance
    }
}

// MARK: - Supporting Types

struct Product: Identifiable {
    let id = UUID()
    let title: String
    let price: String
    let imageURL: URL
}

enum Metric: String, CaseIterable, Identifiable {
    case performance, efficiency, intelligence, quantum

    var id: String { rawValue }

    var title: String {
        switch self {
        case .performance: return "Performance"
        case .efficiency: return "Efficiency"
        case .intelligence: return "Intelligence"
        case .quantum: return "Quantum State"
        }
    }

    var value: String {
        switch self {
        case .performance: return "99.8%"
        case .efficiency: return "M4 Active"
        case .intelligence: return "16 Cores"
        case .quantum: return "Coherent"
        }
    }

    var icon: String {
        switch self {
        case .performance: return "speedometer"
        case .efficiency: return "leaf.fill"
        case .intelligence: return "brain.head.profile"
        case .quantum: return "atom"
        }
    }

    var color: Color {
        switch self {
        case .performance: return Color(red: 0.305, green: 0.804, blue: 0.769) // Cyan
        case .efficiency: return Color(red: 0.910, green: 0.365, blue: 0.459) // Coral
        case .intelligence: return .white
        case .quantum: return Color(red: 0.305, green: 0.804, blue: 0.769) // Cyan
        }
    }
}

// MARK: - Previews

#Preview("Hero Section") {
    QuantumHeroSection()
}

#Preview("Loading View") {
    QuantumLoadingView()
}

#Preview("Product Card") {
    QuantumProductCard(
        product: Product(
            title: "Quantum Intelligence Portal",
            price: "$199.00",
            imageURL: URL(string: "https://example.com/image.jpg")!
        )
    )
    .padding()
    .background(Color.black)
}

#Preview("Settings Panel") {
    QuantumSettingsPanel()
}

#Preview("Adaptive Layout - iPhone") {
    QuantumAdaptiveLayout()
        .previewDevice("iPhone 15 Pro")
}

#Preview("Adaptive Layout - iPad") {
    QuantumAdaptiveLayout()
        .previewDevice("iPad Pro (12.9-inch)")
}

#Preview("Dashboard") {
    QuantumDashboard()
}
