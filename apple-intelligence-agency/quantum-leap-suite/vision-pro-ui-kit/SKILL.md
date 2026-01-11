---
name: vision-pro-ui-kit
description: Design and implement spatial UI components for Apple Vision Pro using RealityKit, SwiftUI, and quantum-spatial design system. Creates dimensional interfaces with depth, glassmorphism, and volumetric interactions optimized for M4 processing.
---

# Vision Pro UI Kit Skill

## Purpose

Create sophisticated spatial UI components for Apple Vision Pro that leverage the quantum-spatial design system, RealityKit volumetric rendering, and M4 Neural Engine optimization. Build immersive 3D interfaces with glassmorphism, dimensional depth, and natural interactions.

## When to Use This Skill

- Designing spatial UI for Vision Pro applications
- Converting 2D components to 3D spatial equivalents
- Creating volumetric visualizations
- Implementing glassmorphic spatial effects
- Building depth-aware navigation systems
- Generating immersive dashboard experiences

## Core Capabilities

### 1. Spatial Component Architecture

**Depth Layers**:
- **Z-Axis Organization**: Components at different depths
- **Focal Planes**: Near (0.3m), Mid (1.0m), Far (2.5m)
- **Parallax Effects**: Movement creates depth perception
- **Occlusion**: Proper layering with transparency

**Spatial Sizing**:
```swift
struct SpatialSize {
    let width: Float   // meters in world space
    let height: Float  // meters in world space
    let depth: Float   // volumetric depth
    
    static let small = SpatialSize(width: 0.1, height: 0.1, depth: 0.05)
    static let medium = SpatialSize(width: 0.3, height: 0.3, depth: 0.1)
    static let large = SpatialSize(width: 0.6, height: 0.6, depth: 0.2)
    static let fullscreen = SpatialSize(width: 1.5, height: 1.0, depth: 0.3)
}
```

### 2. Quantum-Spatial Design System for Vision Pro

**Material System**:
```swift
import RealityKit

enum QuantumSpatialMaterial {
    case deepSpaceGlass    // Semi-transparent with star field
    case quantumFrosted    // Frosted glass with quantum effects
    case dimensionalGrid   // 3D hexagonal grid pattern
    case holographicGlow   // Emissive quantum colors
    
    func createMaterial() -> Material {
        switch self {
        case .deepSpaceGlass:
            var material = PhysicallyBasedMaterial()
            material.baseColor = .init(tint: .init(red: 0.04, green: 0.05, blue: 0.15, alpha: 0.7))
            material.roughness = 0.1
            material.metallic = 0.0
            material.clearcoat = 0.9
            return material
            
        case .quantumFrosted:
            var material = PhysicallyBasedMaterial()
            material.baseColor = .init(tint: .init(white: 0.95, alpha: 0.3))
            material.roughness = 0.3
            material.metallic = 0.0
            material.blending = .transparent(opacity: 0.8)
            return material
            
        case .dimensionalGrid:
            // Custom shader material with hexagonal grid
            return createGridMaterial()
            
        case .holographicGlow:
            var material = UnlitMaterial()
            material.color = .init(tint: .cyan, texture: .init(.none))
            material.blending = .transparent(opacity: .init(floatLiteral: 0.9))
            return material
        }
    }
}
```

**Color System** (Spatial-Aware):
```swift
struct QuantumSpatialColors {
    // Base colors with spatial depth adjustment
    static func deepSpaceIndigo(depth: Float) -> UIColor {
        let alpha = 1.0 - (depth * 0.3) // Fade with distance
        return UIColor(red: 0.04, green: 0.05, blue: 0.15, alpha: alpha)
    }
    
    static func subtleCyan(depth: Float, intensity: Float = 1.0) -> UIColor {
        let brightness = intensity * (1.0 - depth * 0.2)
        return UIColor(red: 0.0, green: 0.85 * brightness, blue: 1.0 * brightness, alpha: 1.0)
    }
    
    static func quantumPurple(depth: Float) -> UIColor {
        let alpha = 0.8 - (depth * 0.2)
        return UIColor(red: 0.54, green: 0.36, blue: 0.96, alpha: alpha)
    }
}
```

### 3. Core Spatial Components

#### Spatial Button

```swift
import SwiftUI
import RealityKit

struct QuantumSpatialButton: View {
    let title: String
    let action: () -> Void
    
    @State private var isHovered: Bool = false
    @State private var isPressed: Bool = false
    
    var body: some View {
        RealityView { content in
            // Create 3D button entity
            let buttonEntity = createButtonEntity()
            content.add(buttonEntity)
        } update: { content in
            // Update on state change
            updateButtonState(content, hovered: isHovered, pressed: isPressed)
        }
        .frame(width: 300, height: 100, depth: 50)
        .hoverEffect()
        .onTapGesture {
            withAnimation(.spring(duration: 0.2)) {
                isPressed = true
            }
            action()
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
                isPressed = false
            }
        }
    }
    
    private func createButtonEntity() -> Entity {
        let mesh = MeshResource.generateBox(
            width: 0.3,
            height: 0.1,
            depth: 0.05,
            cornerRadius: 0.02
        )
        
        let material = QuantumSpatialMaterial.quantumFrosted.createMaterial()
        let modelComponent = ModelComponent(mesh: mesh, materials: [material])
        
        let entity = Entity()
        entity.components.set(modelComponent)
        
        // Add glow effect
        addQuantumGlow(to: entity)
        
        // Add text
        addSpatialText(title, to: entity)
        
        return entity
    }
    
    private func addQuantumGlow(to entity: Entity) {
        // Particle system for quantum glow effect
        var particles = ParticleEmitterComponent()
        particles.emitterShape = .box
        particles.birthRate = 50
        particles.lifeSpan = 1.0
        particles.speed = 0.05
        particles.color = .evolving(start: .cyan, end: .purple)
        particles.size = 0.002
        
        entity.components.set(particles)
    }
}
```

#### Spatial Card (Dashboard Component)

```swift
struct QuantumSpatialCard: View {
    let title: String
    let content: String
    let depth: Float
    
    var body: some View {
        RealityView { content in
            let cardEntity = createCardEntity()
            content.add(cardEntity)
        }
        .frame(width: 600, height: 400, depth: 100)
    }
    
    private func createCardEntity() -> Entity {
        let entity = Entity()
        
        // Glass background
        let backgroundMesh = MeshResource.generatePlane(
            width: 0.6,
            height: 0.4,
            cornerRadius: 0.03
        )
        let glassMaterial = QuantumSpatialMaterial.deepSpaceGlass.createMaterial()
        let background = ModelComponent(mesh: backgroundMesh, materials: [glassMaterial])
        entity.components.set(background)
        
        // Dimensional grid overlay
        let gridEntity = createDimensionalGrid(size: simd_float2(0.6, 0.4))
        gridEntity.position = [0, 0, 0.01] // Slightly in front
        entity.addChild(gridEntity)
        
        // Content text
        let textEntity = createSpatialText(content)
        textEntity.position = [0, 0, 0.02]
        entity.addChild(textEntity)
        
        // Edge glow
        addEdgeGlow(to: entity)
        
        return entity
    }
    
    private func createDimensionalGrid(size: simd_float2) -> Entity {
        // Use your dimensional-grid-generator logic here
        // Convert 2D grid to 3D volumetric representation
        let gridEntity = Entity()
        
        // Generate hexagonal grid pattern
        let hexRadius: Float = 0.02
        let cols = Int(size.x / (hexRadius * 1.5))
        let rows = Int(size.y / (hexRadius * sqrt(3)))
        
        for row in 0..<rows {
            for col in 0..<cols {
                let hex = createHexagon(radius: hexRadius)
                let x = Float(col) * hexRadius * 1.5 - size.x / 2
                let y = Float(row) * hexRadius * sqrt(3) - size.y / 2
                hex.position = [x, y, 0]
                gridEntity.addChild(hex)
            }
        }
        
        return gridEntity
    }
    
    private func createHexagon(radius: Float) -> Entity {
        // Create hexagonal wireframe
        let entity = Entity()
        
        // Use MeshResource to create hexagon geometry
        // ... hexagon vertex calculations
        
        let material = QuantumSpatialMaterial.holographicGlow.createMaterial()
        entity.components.set(ModelComponent(mesh: hexMesh, materials: [material]))
        
        return entity
    }
}
```

#### Spatial Navigation Menu

```swift
struct QuantumSpatialMenu: View {
    let items: [MenuItem]
    @State private var selectedIndex: Int = 0
    
    var body: some View {
        RealityView { content in
            let menuEntity = createCircularMenu()
            content.add(menuEntity)
        }
        .gesture(
            DragGesture()
                .onChanged { value in
                    rotateMenu(by: value.translation.width)
                }
        )
    }
    
    private func createCircularMenu() -> Entity {
        let menuEntity = Entity()
        let radius: Float = 0.5
        let angleStep = (2 * Float.pi) / Float(items.count)
        
        for (index, item) in items.enumerated() {
            let angle = Float(index) * angleStep
            let x = cos(angle) * radius
            let y = sin(angle) * radius
            
            let itemEntity = createMenuItem(item)
            itemEntity.position = [x, y, 0]
            menuEntity.addChild(itemEntity)
        }
        
        return menuEntity
    }
}
```

### 4. Volumetric Visualizations

#### Quantum Pixel Volume

```swift
class QuantumPixelVolume {
    // Integrates with your quantum-pixel-generator.js
    
    func createVolumetricVisualization(data: [Float], size: simd_int3) -> Entity {
        let volumeEntity = Entity()
        
        // Create voxel grid
        for z in 0..<size.z {
            for y in 0..<size.y {
                for x in 0..<size.x {
                    let index = x + y * size.x + z * size.x * size.y
                    let value = data[index]
                    
                    if value > 0.5 { // Threshold for visibility
                        let voxel = createVoxel(
                            position: simd_float3(Float(x), Float(y), Float(z)) * 0.02,
                            intensity: value
                        )
                        volumeEntity.addChild(voxel)
                    }
                }
            }
        }
        
        return volumeEntity
    }
    
    private func createVoxel(position: simd_float3, intensity: Float) -> Entity {
        let voxel = Entity()
        
        let mesh = MeshResource.generateBox(size: 0.015)
        var material = PhysicallyBasedMaterial()
        
        // Quantum color based on intensity
        let color = quantumColorForIntensity(intensity)
        material.baseColor = .init(tint: color)
        material.emissiveColor = .init(color: color)
        material.emissiveIntensity = intensity * 2.0
        material.blending = .transparent(opacity: .init(floatLiteral: Double(intensity)))
        
        voxel.components.set(ModelComponent(mesh: mesh, materials: [material]))
        voxel.position = position
        
        return voxel
    }
    
    private func quantumColorForIntensity(_ intensity: Float) -> UIColor {
        // Gradient from cyan to purple based on intensity
        return UIColor(
            red: CGFloat(intensity * 0.54),
            green: CGFloat((1.0 - intensity) * 0.85),
            blue: 1.0,
            alpha: 1.0
        )
    }
}
```

#### Dimensional Grid Projection

```swift
class DimensionalGridProjection {
    // Integrates with your dimensional-grid-generator.js
    
    func createSpatialGrid(bounds: SIMD3<Float>, cellSize: Float) -> Entity {
        let gridEntity = Entity()
        
        // Generate 3D hexagonal grid
        let hexRadius = cellSize
        let cols = Int(bounds.x / (hexRadius * 1.5))
        let rows = Int(bounds.y / (hexRadius * sqrt(3)))
        let layers = Int(bounds.z / (hexRadius * 2))
        
        for layer in 0..<layers {
            for row in 0..<rows {
                for col in 0..<cols {
                    let hex = createSpatialHexagon(radius: hexRadius, layer: layer)
                    let x = Float(col) * hexRadius * 1.5
                    let y = Float(row) * hexRadius * sqrt(3)
                    let z = Float(layer) * hexRadius * 2
                    hex.position = [x, y, z]
                    gridEntity.addChild(hex)
                }
            }
        }
        
        // Animate grid (quantum pulse effect)
        addQuantumPulseAnimation(to: gridEntity)
        
        return gridEntity
    }
    
    private func createSpatialHexagon(radius: Float, layer: Int) -> Entity {
        // Create wireframe hexagon
        let hex = Entity()
        
        // Generate hexagon edges
        for i in 0..<6 {
            let angle1 = Float(i) * (Float.pi / 3)
            let angle2 = Float(i + 1) * (Float.pi / 3)
            
            let edge = createEdgeLine(
                from: simd_float3(cos(angle1) * radius, sin(angle1) * radius, 0),
                to: simd_float3(cos(angle2) * radius, sin(angle2) * radius, 0),
                color: quantumColorForLayer(layer)
            )
            hex.addChild(edge)
        }
        
        return hex
    }
    
    private func quantumColorForLayer(_ layer: Int) -> UIColor {
        let hue = CGFloat(layer) * 0.1
        return UIColor(hue: hue, saturation: 0.8, brightness: 1.0, alpha: 0.6)
    }
}
```

### 5. Oksana Portal for Vision Pro

**Immersive Dashboard**:
```swift
struct OksanaVisionProPortal: View {
    @State private var selectedView: PortalView = .home
    
    var body: some View {
        RealityView { content in
            let portalEntity = createPortalEnvironment()
            content.add(portalEntity)
        }
        .ornament(attachmentAnchor: .scene(.bottom)) {
            PortalNavigation(selectedView: $selectedView)
        }
    }
    
    private func createPortalEnvironment() -> Entity {
        let environment = Entity()
        
        // Background space with stars
        let background = createQuantumStarfield()
        environment.addChild(background)
        
        // Central dashboard cards (floating in space)
        let dashboardRadius: Float = 1.5
        let cards = createDashboardCards()
        
        for (index, card) in cards.enumerated() {
            let angle = Float(index) * (2 * Float.pi / Float(cards.count))
            card.position = [
                cos(angle) * dashboardRadius,
                0,
                sin(angle) * dashboardRadius
            ]
            card.look(at: [0, 0, 0], from: card.position, relativeTo: environment)
            environment.addChild(card)
        }
        
        // Center Oksana avatar (3D orb)
        let avatarOrb = createOksanaAvatar()
        environment.addChild(avatarOrb)
        
        return environment
    }
    
    private func createOksanaAvatar() -> Entity {
        let orb = Entity()
        
        // Sphere with quantum shader
        let sphere = MeshResource.generateSphere(radius: 0.2)
        var material = PhysicallyBasedMaterial()
        material.baseColor = .init(tint: .init(red: 0.54, green: 0.36, blue: 0.96, alpha: 0.8))
        material.roughness = 0.1
        material.metallic = 0.9
        material.emissiveColor = .init(color: .cyan)
        material.emissiveIntensity = 1.5
        
        orb.components.set(ModelComponent(mesh: sphere, materials: [material]))
        
        // Particle system (quantum breathe effect)
        addQuantumBreathingEffect(to: orb)
        
        // Rotation animation
        let rotation = RotationComponent(
            axis: [0, 1, 0],
            speed: 0.1,
            duration: .infinity
        )
        orb.components.set(rotation)
        
        return orb
    }
}
```

### 6. Integration with Your Existing Tools

#### Dimensional Grid Generator Integration

```swift
// Bridge to your dimensional-grid-generator.js
class DimensionalGridBridge {
    func generateSpatialGrid(config: GridConfig) -> Entity {
        // Call your JS generator
        let gridData = executeJSGridGenerator(config)
        
        // Convert to RealityKit entities
        return convertToSpatialEntities(gridData)
    }
    
    private func executeJSGridGenerator(_ config: GridConfig) -> GridData {
        // Use JavaScriptCore or similar to run your generator
        // Or convert the logic to Swift
        return GridData() // placeholder
    }
}
```

#### Quantum Pixel Generator Integration

```swift
class QuantumPixelBridge {
    func generateVolumetricPixels(params: PixelParams) -> Entity {
        // Use your quantum-pixel-generator.js logic
        let pixelData = generatePixelData(params)
        return createVolumetricRepresentation(pixelData)
    }
}
```

### 7. M4 Neural Engine Optimization

**Spatial Query Acceleration**:
```swift
import Accelerate

class SpatialQueryEngine {
    private let m4Engine = M4NeuralEngine()
    
    func findVisibleEntities(
        from viewpoint: simd_float3,
        direction: simd_float3,
        entities: [Entity]
    ) -> [Entity] {
        // Use M4 for parallel spatial queries
        let positions = entities.map { $0.position }
        
        let visible = m4Engine.spatialQuery(
            viewpoint: viewpoint,
            direction: direction,
            positions: positions,
            method: .frustumCulling
        )
        
        return visible.map { entities[$0] }
    }
    
    func optimizeRenderOrder(entities: [Entity], camera: simd_float3) -> [Entity] {
        // M4-accelerated depth sorting
        let distances = entities.map { 
            simd_distance($0.position, camera)
        }
        
        // Neural Engine sorts in parallel
        let sorted = m4Engine.parallelSort(distances)
        return sorted.map { entities[$0] }
    }
}
```

## Component Library Structure

### Level 1: Primitives (20 components)
- Spatial buttons (5 variants)
- Cards (4 sizes)
- Text labels (3 depths)
- Icons (8 quantum-spatial icons)

### Level 2: Compositions (15 components)
- Navigation menus (3 layouts)
- Dashboard cards (4 types)
- Data visualizations (5 chart types)
- Modal dialogs (3 styles)

### Level 3: Experiences (5 scenes)
- Oksana Portal dashboard
- Hexecute game interface
- Content creation workspace
- Analytics visualization
- Settings environment

## Development Workflow

### Phase 1: Setup (1 hour)
```bash
# Create Xcode project
xcodebuild -createWorkspace -workspace VisionProUIKit
# Add RealityKit, SwiftUI frameworks
# Set up project structure
```

### Phase 2: Primitives (3 hours)
- Create base component classes
- Implement quantum-spatial materials
- Build button, card, text primitives
- Test in Vision Pro simulator

### Phase 3: Compositions (4 hours)
- Assemble complex components
- Integrate dimensional grid
- Add volumetric visualizations
- Implement animations

### Phase 4: Experiences (4 hours)
- Build Oksana Portal
- Create dashboard scenes
- Add interaction handlers
- Polish transitions

## Performance Targets

- Frame rate: 90fps (Vision Pro requirement)
- Entity count: <10,000 visible
- Draw calls: <500 per frame
- Memory: <2GB for UI kit
- Latency: <20ms gesture → response

## Quality Checklist

- [ ] All components use quantum-spatial design tokens
- [ ] Glassmorphism effects render correctly
- [ ] Depth hierarchy feels natural
- [ ] Animations are smooth (90fps)
- [ ] M4 optimization active
- [ ] Hand tracking works seamlessly
- [ ] Eye tracking integration tested
- [ ] Accessibility support (VoiceOver)
- [ ] Works in light and dark environments

## References

- Vision Pro HIG: https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos
- RealityKit Documentation: https://developer.apple.com/documentation/realitykit
- Spatial Design Principles: Apple WWDC sessions
- Your existing tools:
  - dimensional-grid-generator.js
  - quantum-pixel-generator.js
  - volumetric-pixel-generator.js

---

**Use this skill to create stunning spatial interfaces for Vision Pro that bring the quantum-spatial design system into three dimensions with depth, glassmorphism, and immersive interactions.**
