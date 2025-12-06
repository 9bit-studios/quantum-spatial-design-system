---
name: hexecute-game-development
description: Develop Hexecute hexagonal space game using Metal, Accelerate, and M4 Neural Engine. Implements Arthur Petersen's game mechanics with GPU-accelerated rendering and physics. Converts design blueprints into playable Swift/Metal code.
---

# Hexecute Game Development Skill

## Purpose

Build playable Hexecute hexagonal space game from Arthur Petersen's blueprints using Apple's highest-performance frameworks (Metal, Accelerate, M4 Neural Engine, SwiftUI). Create GPU-accelerated gameplay with quantum-spatial visual effects.

## When to Use This Skill

- Converting game design documents to Swift/Metal code
- Implementing hexagonal grid mathematics
- Creating GPU-accelerated game rendering
- Optimizing game physics with M4 Neural Engine
- Building space-themed visual effects
- Generating game UI with SwiftUI

## Core Capabilities

### 1. Hexagonal Grid System

**Coordinate System** (Cube Coordinates):
```swift
struct HexCoordinate: Hashable {
    let q: Int  // column
    let r: Int  // row
    var s: Int { return -q - r }  // diagonal (axial → cube)
    
    // Distance between two hex tiles
    func distance(to other: HexCoordinate) -> Int {
        return (abs(q - other.q) + abs(r - other.r) + abs(s - other.s)) / 2
    }
    
    // Get all 6 neighbors
    func neighbors() -> [HexCoordinate] {
        let directions = [
            HexCoordinate(q: 1, r: 0),
            HexCoordinate(q: 1, r: -1),
            HexCoordinate(q: 0, r: -1),
            HexCoordinate(q: -1, r: 0),
            HexCoordinate(q: -1, r: 1),
            HexCoordinate(q: 0, r: 1)
        ]
        return directions.map { HexCoordinate(q: q + $0.q, r: r + $0.r) }
    }
}
```

**Layout Conversion** (Hex → Screen):
```swift
struct HexLayout {
    let orientation: HexOrientation  // flat-top or pointy-top
    let size: CGSize
    let origin: CGPoint
    
    func hexToPixel(_ hex: HexCoordinate) -> CGPoint {
        let M = orientation.forwardMatrix
        let x = (M.f0 * Double(hex.q) + M.f1 * Double(hex.r)) * size.width
        let y = (M.f2 * Double(hex.q) + M.f3 * Double(hex.r)) * size.height
        return CGPoint(x: x + origin.x, y: y + origin.y)
    }
    
    func pixelToHex(_ point: CGPoint) -> HexCoordinate {
        // Reverse transformation
        let M = orientation.backwardMatrix
        let pt = CGPoint(x: (point.x - origin.x) / size.width,
                        y: (point.y - origin.y) / size.height)
        let q = M.b0 * pt.x + M.b1 * pt.y
        let r = M.b2 * pt.x + M.b3 * pt.y
        return HexCoordinate.round(q: q, r: r)
    }
}
```

**Pathfinding** (A* for hexagons):
```swift
func findPath(from start: HexCoordinate, to goal: HexCoordinate, 
              blocked: Set<HexCoordinate>) -> [HexCoordinate] {
    var frontier = PriorityQueue<HexCoordinate>()
    frontier.insert(start, priority: 0)
    
    var cameFrom: [HexCoordinate: HexCoordinate] = [:]
    var costSoFar: [HexCoordinate: Int] = [start: 0]
    
    while let current = frontier.pop() {
        if current == goal { break }
        
        for next in current.neighbors() where !blocked.contains(next) {
            let newCost = costSoFar[current]! + 1
            
            if costSoFar[next] == nil || newCost < costSoFar[next]! {
                costSoFar[next] = newCost
                let priority = newCost + next.distance(to: goal)
                frontier.insert(next, priority: priority)
                cameFrom[next] = current
            }
        }
    }
    
    return reconstructPath(from: cameFrom, start: start, goal: goal)
}
```

### 2. Metal Rendering Pipeline

**Vertex Shader** (Hexagon Rendering):
```metal
#include <metal_stdlib>
using namespace metal;

struct HexVertex {
    float2 position [[attribute(0)]];
    float2 texCoord [[attribute(1)]];
    float4 color [[attribute(2)]];
};

struct VertexOut {
    float4 position [[position]];
    float2 texCoord;
    float4 color;
};

vertex VertexOut hexVertexShader(
    HexVertex in [[stage_in]],
    constant float4x4& mvpMatrix [[buffer(1)]]
) {
    VertexOut out;
    out.position = mvpMatrix * float4(in.position, 0.0, 1.0);
    out.texCoord = in.texCoord;
    out.color = in.color;
    return out;
}
```

**Fragment Shader** (Quantum-Spatial Effects):
```metal
fragment float4 hexFragmentShader(
    VertexOut in [[stage_in]],
    constant float& time [[buffer(0)]]
) {
    // Base color
    float4 color = in.color;
    
    // Quantum glow effect
    float glow = sin(time * 2.0 + in.texCoord.x * 10.0) * 0.5 + 0.5;
    color.rgb += float3(0.0, 0.8, 1.0) * glow * 0.3;
    
    // Edge highlight (glassmorphism)
    float edge = smoothstep(0.4, 0.5, length(in.texCoord - 0.5));
    color.rgb += float3(1.0) * edge * 0.2;
    
    return color;
}
```

**Compute Shader** (Particle System):
```metal
kernel void updateParticles(
    device Particle* particles [[buffer(0)]],
    constant float& deltaTime [[buffer(1)]],
    uint id [[thread_position_in_grid]]
) {
    Particle particle = particles[id];
    
    // Update position
    particle.position += particle.velocity * deltaTime;
    
    // Update velocity (space physics)
    particle.velocity *= 0.99; // friction
    
    // Quantum effect (particles slightly influenced by nearby hexagons)
    // ... M4 Neural Engine would optimize this calculation
    
    particles[id] = particle;
}
```

### 3. M4 Neural Engine Physics

**Collision Detection** (M4-Accelerated):
```swift
import Accelerate

class M4PhysicsEngine {
    private let neuralEngine = M4NeuralEngine()
    
    func detectCollisions(entities: [GameEntity], 
                         hexGrid: HexagonalGrid) -> [(GameEntity, GameEntity)] {
        // Use M4 for parallel collision detection
        let positions = entities.map { simd_float2($0.position) }
        let radii = entities.map { Float($0.radius) }
        
        // M4 Neural Engine processes spatial queries in parallel
        let collisionPairs = neuralEngine.spatialQuery(
            positions: positions,
            radii: radii,
            method: .broadPhase
        )
        
        // Narrow phase with precise hex coordinate checking
        return collisionPairs.filter { pair in
            let entity1 = entities[pair.0]
            let entity2 = entities[pair.1]
            return hexGrid.areAdjacent(entity1.hexPos, entity2.hexPos)
        }
    }
    
    func predictTrajectory(entity: GameEntity, 
                          steps: Int) -> [HexCoordinate] {
        // M4 Neural Engine predicts movement path
        var trajectory: [HexCoordinate] = [entity.hexPosition]
        var currentVelocity = entity.velocity
        var currentPos = entity.position
        
        for _ in 0..<steps {
            currentPos += currentVelocity * 0.016 // ~60fps
            let hexPos = hexGrid.pixelToHex(currentPos)
            
            if !hexGrid.isBlocked(hexPos) {
                trajectory.append(hexPos)
            } else {
                break // collision predicted
            }
        }
        
        return trajectory
    }
}
```

### 4. SwiftUI Game Interface

**Game View**:
```swift
import SwiftUI
import MetalKit

struct HexecuteGameView: View {
    @StateObject private var gameEngine = HexecuteGameEngine()
    @State private var metalView: MTKView?
    
    var body: some View {
        ZStack {
            // Metal rendering view
            MetalGameView(gameEngine: gameEngine)
                .ignoresSafeArea()
            
            // UI Overlay (SwiftUI)
            VStack {
                // Top HUD
                HStack {
                    ScoreView(score: gameEngine.score)
                    Spacer()
                    HealthView(health: gameEngine.playerHealth)
                }
                .padding()
                
                Spacer()
                
                // Bottom controls (if needed)
                if gameEngine.showControls {
                    GameControlsView(gameEngine: gameEngine)
                        .padding()
                }
            }
        }
        .onAppear {
            gameEngine.start()
        }
    }
}

struct MetalGameView: NSViewRepresentable { // macOS
    let gameEngine: HexecuteGameEngine
    
    func makeNSView(context: Context) -> MTKView {
        let metalView = MTKView()
        metalView.device = MTLCreateSystemDefaultDevice()
        metalView.delegate = context.coordinator
        gameEngine.configure(metalView: metalView)
        return metalView
    }
    
    func updateNSView(_ nsView: MTKView, context: Context) {}
    
    func makeCoordinator() -> Coordinator {
        Coordinator(gameEngine)
    }
    
    class Coordinator: NSObject, MTKViewDelegate {
        let gameEngine: HexecuteGameEngine
        
        init(_ gameEngine: HexecuteGameEngine) {
            self.gameEngine = gameEngine
        }
        
        func mtkView(_ view: MTKView, drawableSizeWillChange size: CGSize) {
            gameEngine.resize(size: size)
        }
        
        func draw(in view: MTKView) {
            gameEngine.update()
            gameEngine.render(view: view)
        }
    }
}
```

## Game Architecture

### Core Engine Structure

```swift
class HexecuteGameEngine: ObservableObject {
    // Metal rendering
    private var device: MTLDevice!
    private var commandQueue: MTLCommandQueue!
    private var pipelineState: MTLRenderPipelineState!
    
    // Game state
    @Published var score: Int = 0
    @Published var playerHealth: Int = 100
    @Published var showControls: Bool = true
    
    // Game objects
    private var hexGrid: HexagonalGrid
    private var player: PlayerShip
    private var enemies: [Enemy] = []
    private var projectiles: [Projectile] = []
    
    // Physics
    private var physicsEngine: M4PhysicsEngine
    
    // Timing
    private var lastUpdateTime: CFTimeInterval = 0
    
    init() {
        // Initialize systems
        hexGrid = HexagonalGrid(radius: 20)
        player = PlayerShip(position: hexGrid.center)
        physicsEngine = M4PhysicsEngine()
    }
    
    func configure(metalView: MTKView) {
        // Set up Metal pipeline
        device = metalView.device!
        commandQueue = device.makeCommandQueue()!
        
        // Create pipeline state
        let library = device.makeDefaultLibrary()!
        let pipelineDescriptor = MTLRenderPipelineDescriptor()
        pipelineDescriptor.vertexFunction = library.makeFunction(name: "hexVertexShader")
        pipelineDescriptor.fragmentFunction = library.makeFunction(name: "hexFragmentShader")
        pipelineDescriptor.colorAttachments[0].pixelFormat = metalView.colorPixelFormat
        
        pipelineState = try! device.makeRenderPipelineState(descriptor: pipelineDescriptor)
    }
    
    func start() {
        lastUpdateTime = CACurrentMediaTime()
    }
    
    func update() {
        let currentTime = CACurrentMediaTime()
        let deltaTime = currentTime - lastUpdateTime
        lastUpdateTime = currentTime
        
        // Update game objects
        player.update(deltaTime: deltaTime, input: getInput())
        enemies.forEach { $0.update(deltaTime: deltaTime, target: player) }
        projectiles.forEach { $0.update(deltaTime: deltaTime) }
        
        // Physics
        handleCollisions()
        
        // Remove dead entities
        cleanupEntities()
        
        // Spawn new enemies (Arthur's rules)
        spawnEnemiesIfNeeded()
    }
    
    func render(view: MTKView) {
        guard let drawable = view.currentDrawable,
              let descriptor = view.currentRenderPassDescriptor else { return }
        
        let commandBuffer = commandQueue.makeCommandBuffer()!
        let renderEncoder = commandBuffer.makeRenderCommandEncoder(descriptor: descriptor)!
        
        renderEncoder.setRenderPipelineState(pipelineState)
        
        // Render hexagonal grid
        hexGrid.render(encoder: renderEncoder)
        
        // Render game objects
        player.render(encoder: renderEncoder)
        enemies.forEach { $0.render(encoder: renderEncoder) }
        projectiles.forEach { $0.render(encoder: renderEncoder) }
        
        renderEncoder.endEncoding()
        
        commandBuffer.present(drawable)
        commandBuffer.commit()
    }
    
    private func handleCollisions() {
        let allEntities: [GameEntity] = [player] + enemies + projectiles
        let collisions = physicsEngine.detectCollisions(
            entities: allEntities,
            hexGrid: hexGrid
        )
        
        // Process collisions based on Arthur's rules
        for (entity1, entity2) in collisions {
            processCollision(entity1, entity2)
        }
    }
}
```

## Arthur's Game Mechanics Integration

### Phase 1: Core Rules Template

```swift
// PLACEHOLDER: Insert Arthur's actual rules here

protocol ArthurmechanicsRules {
    // Movement rules
    func canMoveTo(hex: HexCoordinate, from: HexCoordinate) -> Bool
    func movementCost(hex: HexCoordinate) -> Int
    
    // Combat rules
    func calculateDamage(attacker: GameEntity, defender: GameEntity) -> Int
    func canAttack(attacker: GameEntity, target: GameEntity) -> Bool
    
    // Scoring rules
    func scoreForAction(_ action: GameAction) -> Int
    func checkWinCondition() -> Bool
}

class HexecuteRules: ArthurmechanicsRules {
    // Implement Arthur's specific mechanics
    
    func canMoveTo(hex: HexCoordinate, from: HexCoordinate) -> Bool {
        // Arthur's movement rules
        let distance = from.distance(to: hex)
        return distance <= maxMovementRange
    }
    
    // ... implement other rules
}
```

### Phase 2: Game Entities

```swift
protocol GameEntity {
    var position: CGPoint { get set }
    var hexPosition: HexCoordinate { get set }
    var velocity: CGVector { get set }
    var radius: CGFloat { get }
    var health: Int { get set }
    
    func update(deltaTime: TimeInterval)
    func render(encoder: MTLRenderCommandEncoder)
}

class PlayerShip: GameEntity {
    var position: CGPoint
    var hexPosition: HexCoordinate
    var velocity: CGVector = .zero
    let radius: CGFloat = 20
    var health: Int = 100
    
    // Player-specific
    var shield: Int = 50
    var weaponCooldown: TimeInterval = 0
    
    init(position: HexCoordinate) {
        self.hexPosition = position
        self.position = .zero // Calculate from hex
    }
    
    func update(deltaTime: TimeInterval, input: GameInput) {
        // Handle input
        if input.moveDirection != .zero {
            let targetHex = calculateTargetHex(input.moveDirection)
            moveTowards(targetHex, deltaTime: deltaTime)
        }
        
        // Update weapon cooldown
        weaponCooldown = max(0, weaponCooldown - deltaTime)
        
        // Fire weapon
        if input.fire && weaponCooldown == 0 {
            fireWeapon()
            weaponCooldown = 0.5 // Arthur's fire rate
        }
    }
    
    func render(encoder: MTLRenderCommandEncoder) {
        // Render ship with quantum-spatial effects
    }
}

class Enemy: GameEntity {
    var position: CGPoint
    var hexPosition: HexCoordinate
    var velocity: CGVector = .zero
    let radius: CGFloat = 15
    var health: Int
    
    let type: EnemyType
    let aiStrategy: AIStrategy
    
    func update(deltaTime: TimeInterval, target: PlayerShip) {
        // AI behavior (Arthur's enemy patterns)
        let action = aiStrategy.decide(enemy: self, target: target)
        execute(action: action, deltaTime: deltaTime)
    }
    
    func render(encoder: MTLRenderCommandEncoder) {
        // Render enemy ship
    }
}
```

## Visual Effects (Quantum-Spatial Theme)

### Space Background with Stars

```swift
class SpaceBackground {
    private var stars: [Star] = []
    
    struct Star {
        var position: CGPoint
        var brightness: Float
        var twinklePhase: Float
    }
    
    init(count: Int, bounds: CGRect) {
        for _ in 0..<count {
            stars.append(Star(
                position: CGPoint(
                    x: CGFloat.random(in: 0...bounds.width),
                    y: CGFloat.random(in: 0...bounds.height)
                ),
                brightness: Float.random(in: 0.3...1.0),
                twinklePhase: Float.random(in: 0...2 * .pi)
            ))
        }
    }
    
    func render(encoder: MTLRenderCommandEncoder, time: Float) {
        // Render twinkling stars with quantum effects
    }
}
```

### Explosion Effects

```swift
class ExplosionSystem {
    private var particles: [Particle] = []
    
    func createExplosion(at position: CGPoint) {
        for _ in 0..<50 {
            let angle = Float.random(in: 0...(2 * .pi))
            let speed = Float.random(in: 50...200)
            
            particles.append(Particle(
                position: position,
                velocity: CGVector(
                    dx: cos(angle) * CGFloat(speed),
                    dy: sin(angle) * CGFloat(speed)
                ),
                life: 1.0,
                color: quantumExplosionColor()
            ))
        }
    }
    
    func quantumExplosionColor() -> simd_float4 {
        // Cyan/Purple quantum colors
        return simd_float4(
            Float.random(in: 0...0.3),
            Float.random(in: 0.7...1.0),
            Float.random(in: 0.8...1.0),
            1.0
        )
    }
}
```

## Performance Optimization

### M4 Neural Engine Targets
- Physics calculations: <1ms per frame
- Collision detection: <0.5ms per frame
- AI decisions: <2ms per frame
- Rendering: 16.6ms (60fps) budget
  - Grid: <3ms
  - Entities: <5ms
  - Effects: <3ms
  - UI: <2ms

### Memory Management
```swift
class GameMemoryPool {
    // Reuse objects instead of allocating
    private var particlePool: [Particle] = []
    private var projectilePool: [Projectile] = []
    
    func getParticle() -> Particle {
        return particlePool.popLast() ?? Particle()
    }
    
    func returnParticle(_ particle: Particle) {
        particle.reset()
        particlePool.append(particle)
    }
}
```

## Development Phases

### Phase 1: Foundation (2 hours)
- [ ] Set up Xcode project
- [ ] Implement hexagonal grid system
- [ ] Create Metal rendering pipeline
- [ ] Basic camera/view management
- [ ] Test hexagon rendering

### Phase 2: Core Gameplay (3 hours)
- [ ] Implement player ship movement
- [ ] Add input handling (keyboard/touch)
- [ ] Create projectile system
- [ ] Add enemy spawning
- [ ] Implement collision detection
- [ ] Integrate Arthur's core rules

### Phase 3: Polish (3 hours)
- [ ] Quantum-spatial visual effects
- [ ] Sound effects
- [ ] UI/HUD (score, health)
- [ ] Menu system
- [ ] Particle effects (explosions)
- [ ] Background starfield

### Phase 4: Testing & Refinement (2 hours)
- [ ] Performance profiling
- [ ] Balance gameplay (Arthur's feedback)
- [ ] Bug fixes
- [ ] Build testable demo

## Integration Points

### With SVG Generation Skill
- Use quantum-spatial SVG assets for UI
- Game icon generation
- Menu backgrounds

### With Strategic Director
- Validate game architecture
- Performance benchmarking
- Deployment approval

### With M4 Content Accelerator
- Batch generate visual assets
- Optimize shaders
- Deploy to TestFlight

## References

- Metal Programming Guide: https://developer.apple.com/metal/
- Hexagonal Grids: https://www.redblobgames.com/grids/hexagons/
- Accelerate Framework: https://developer.apple.com/documentation/accelerate
- SwiftUI Game Development: Apple sample code

---

**Use this skill to transform Arthur's Hexecute blueprints into a playable, visually stunning space game with M4-accelerated physics and quantum-spatial aesthetics.**
