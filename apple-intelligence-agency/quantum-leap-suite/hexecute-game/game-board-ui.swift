import SwiftUI

struct GameBoardView: View {
    @ObservedObject var gameManager: GameManager
    @State private var scale: CGFloat = 1.0
    @State private var offset: CGSize = .zero
    @State private var lastOffset: CGSize = .zero
    
    // Constants for board rendering
    private let hexSize: CGFloat = 30
    private let renderer: HexRenderer
    
    init(gameManager: GameManager) {
        self.gameManager = gameManager
        self.renderer = HexRenderer(hexSize: hexSize)
    }
    
    var body: some View {
        GeometryReader { geometry in
            ZStack {
                // Background
                Color.black
                    .ignoresSafeArea()
                
                // Stars (random dots for space background)
                ForEach(0..<100, id: \.self) { i in
                    Circle()
                        .fill(Color.white.opacity(Double.random(in: 0.3...0.8)))
                        .frame(width: Double.random(in: 1...3), height: Double.random(in: 1...3))
                        .position(
                            x: Double.random(in: 0...geometry.size.width),
                            y: Double.random(in: 0...geometry.size.height)
                        )
                }
                
                // Game board
                ZStack {
                    // Draw highlighted reachable hexes
                    ForEach(gameManager.reachableCoordinates, id: \.self) { coord in
                        HexagonShape()
                            .stroke(Color.green, lineWidth: 2)
                            .background(HexagonShape().fill(Color.green.opacity(0.2)))
                            .frame(width: hexSize * 2, height: hexSize * 2)
                            .position(coordToPosition(coord))
                    }
                    
                    // Draw movement path
                    if gameManager.movementPath.count > 1 {
                        MovementPathView(
                            path: gameManager.movementPath,
                            renderer: renderer,
                            centerOffset: getOriginOffset(geometry: geometry)
                        )
                    }
                    
                    // Draw ships
                    ForEach(gameManager.ships) { ship in
                        if !ship.isDestroyed {
                            ShipView(ship: ship)
                                .frame(width: hexSize * 1.8, height: hexSize * 1.8)
                                .position(coordToPosition(ship.position))
                                .onTapGesture {
                                    gameManager.selectShip(ship)
                                }
                        }
                    }
                    
                    // Draw combat effects when in combat state
                    if case .animatingCombat = gameManager.state {
                        CombatEffectsView(
                            attacks: gameManager.combatAttacks,
                            animations: gameManager.combatAnimations,
                            renderer: renderer,
                            centerOffset: getOriginOffset(geometry: geometry)
                        )
                    }
                }
                .scaleEffect(scale)
                .offset(offset)
                .gesture(
                    DragGesture()
                        .onChanged { value in
                            offset = CGSize(
                                width: lastOffset.width + value.translation.width,
                                height: lastOffset.height + value.translation.height
                            )
                        }
                        .onEnded { value in
                            lastOffset = offset
                        }
                )
                .gesture(
                    MagnificationGesture()
                        .onChanged { value in
                            scale = min(max(value, 0.5), 2.0)
                        }
                )
                
                // Game status overlay
                VStack {
                    GameStatusView(gameManager: gameManager)
                    Spacer()
                    if case .playerTurn = gameManager.state {
                        GameControlsView(gameManager: gameManager)
                    }
                }
                .padding()
                
                // Game end overlay
                if case .gameOver(let winner) = gameManager.state {
                    GameOverView(winner: winner, redScore: gameManager.scores[.red] ?? 0, blueScore: gameManager.scores[.blue] ?? 0) {
                        gameManager.resetGame()
                    }
                }
            }
            .contentShape(Rectangle())
            .onTapGesture { location in
                handleBoardTap(at: location, geometry: geometry)
            }
        }
    }
    
    // Convert hex coordinates to screen position
    private func coordToPosition(_ coord: HexCoord) -> CGPoint {
        let originOffset = getOriginOffset(geometry: UIScreen.main.bounds.size)
        let hexPosition = renderer.hexToPixel(coord: coord)
        return CGPoint(
            x: hexPosition.x + originOffset.x,
            y: hexPosition.y + originOffset.y
        )
    }
    
    // Get the center offset for rendering
    private func getOriginOffset(geometry: CGSize) -> CGPoint {
        return CGPoint(x: geometry.width / 2, y: geometry.height / 2)
    }
    
    // Handle tap on the game board
    private func handleBoardTap(at position: CGPoint, geometry: GeometryProxy) {
        guard case .playerTurn = gameManager.state, gameManager.selectedShip != nil else {
            return
        }
        
        // Adjust position for scale and offset
        let adjustedPosition = CGPoint(
            x: (position.x - offset.width) / scale,
            y: (position.y - offset.height) / scale
        )
        
        // Convert to hex coordinates
        let originOffset = getOriginOffset(geometry: geometry.size)
        let adjustedPositionFromOrigin = CGPoint(
            x: adjustedPosition.x - originOffset.x,
            y: adjustedPosition.y - originOffset.y
        )
        
        let hexCoord = renderer.pixelToHex(point: adjustedPositionFromOrigin)
        
        // Check if this is a valid move
        if gameManager.reachableCoordinates.contains(hexCoord) {
            // Calculate path first to show the movement visualization
            gameManager.calculatePath(to: hexCoord)
            
            // Then actually move (could add a delay here for animation)
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                gameManager.processAction(.moveShip(gameManager.selectedShip!, to: hexCoord))
            }
        }
    }
}

// Hexagon shape for drawing hexes
struct HexagonShape: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        let center = CGPoint(x: rect.midX, y: rect.midY)
        let radius = min(rect.width, rect.height) / 2
        
        // Create a regular hexagon
        for i in 0..<6 {
            let angle = CGFloat(i) * CGFloat.pi / 3
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

// View for displaying a ship
struct ShipView: View {
    @ObservedObject var ship: Ship
    
    var body: some View {
        ZStack {
            // Ship body
            HexagonShape()
                .fill(ship.team.color)
            
            // Ship interior details
            HexagonShape()
                .stroke(Color.white, lineWidth: 1)
                .padding(4)
            
            // Ship hit number
            Text("\(ship.hitNumber)")
                .font(.system(size: 18, weight: .bold))
                .foregroundColor(.white)
        }
    }
}

// View for drawing the movement path
struct MovementPathView: View {
    let path: [HexCoord]
    let renderer: HexRenderer
    let centerOffset: CGPoint
    
    var body: some View {
        Path { path in
            guard self.path.count > 1 else { return }
            
            let startCoord = self.path[0]
            let startPosition = hexToScreenPosition(startCoord)
            
            path.move(to: startPosition)
            
            for i in 1..<self.path.count {
                let coord = self.path[i]
                let position = hexToScreenPosition(coord)
                path.addLine(to: position)
            }
        }
        .stroke(Color.green, style: StrokeStyle(lineWidth: 3, lineCap: .round, lineJoin: .round, dash: [5, 3]))
    }
    
    private func hexToScreenPosition(_ coord: HexCoord) -> CGPoint {
        let hexPosition = renderer.hexToPixel(coord: coord)
        return CGPoint(
            x: hexPosition.x + centerOffset.x,
            y: hexPosition.y + centerOffset.y
        )
    }
}

// View for showing combat effects
struct CombatEffectsView: View {
    let attacks: [CombatAttack]
    let animations: [CombatAnimation]
    let renderer: HexRenderer
    let centerOffset: CGPoint
    
    var body: some View {
        ZStack {
            // Draw attack beams
            ForEach(attacks) { attack in
                AttackBeamView(
                    from: hexToScreenPosition(attack.fromPosition),
                    to: hexToScreenPosition(attack.toPosition),
                    attackerTeam: attack.attacker.team
                )
            }
            
            // Draw explosions and shield effects
            ForEach(0..<animations.count, id: \.self) { index in
                let animation = animations[index]
                
                switch animation {
                case .explosion(let ship):
                    ExplosionEffectView()
                        .position(hexToScreenPosition(ship.position))
                
                case .shieldRegeneration(let ship):
                    ShieldRegenerationView()
                        .position(hexToScreenPosition(ship.position))
                
                case .attack:
                    // Attacks are already handled by AttackBeamView
                    EmptyView()
                }
            }
        }
    }
    
    private func hexToScreenPosition(_ coord: HexCoord) -> CGPoint {
        let hexPosition = renderer.hexToPixel(coord: coord)
        return CGPoint(
            x: hexPosition.x + centerOffset.x,
            y: hexPosition.y + centerOffset.y
        )
    }
}

// View for an attack beam between ships
struct AttackBeamView: View {
    let from: CGPoint
    let to: CGPoint
    let attackerTeam: PlayerTeam
    
    @State private var phase: CGFloat = 0
    
    var body: some View {
        Path { path in
            path.move(to: from)
            path.addLine(to: to)
        }
        .stroke(
            attackerTeam.color,
            style: StrokeStyle(
                lineWidth: 2,
                lineCap: .round,
                lineJoin: .round,
                dash: [4, 4],
                dashPhase: phase
            )
        )
        .onAppear {
            withAnimation(Animation.linear(duration: 0.5).repeatForever(autoreverses: false)) {
                phase = 8
            }
        }
    }
}

// Explosion effect for destroyed ships
struct ExplosionEffectView: View {
    @State private var scale: CGFloat = 0.1
    @State private var opacity: Double = 1.0
    
    var body: some View {
        ZStack {
            Circle()
                .fill(Color.orange)
                .frame(width: 40, height: 40)
                .scaleEffect(scale)
                .opacity(opacity)
            
            Circle()
                .fill(Color.yellow)
                .frame(width: 25, height: 25)
                .scaleEffect(scale)
                .opacity(opacity)
        }
        .onAppear {
            withAnimation(.easeOut(duration: 0.7)) {
                scale = 1.5
                opacity = 0
            }
        }
    }
}

// Shield regeneration effect
struct ShieldRegenerationView: View {
    @State private var scale: CGFloat = 0.8
    @State private var opacity: Double = 0.7
    
    var body: some View {
        Circle()
            .stroke(Color.cyan, lineWidth: 3)
            .frame(width: 50, height: 50)
            .scaleEffect(scale)
            .opacity(opacity)
            .onAppear {
                withAnimation(Animation.easeInOut(duration: 0.7).repeatCount(1, autoreverses: true)) {
                    scale = 1.1
                    opacity = 0
                }
            }
    }
}

// Game status overlay
struct GameStatusView: View {
    @ObservedObject var gameManager: GameManager
    
    var body: some View {
        HStack {
            VStack(alignment: .leading) {
                Text("TURN: \(gameManager.currentTurn)/\(gameManager.config.maxTurns)")
                    .font(.headline)
                
                if case .playerTurn(let team) = gameManager.state {
                    Text("\(team.rawValue.uppercased())'S TURN")
                        .font(.headline)
                        .foregroundColor(team.color)
                }
            }
            
            Spacer()
            
            VStack(alignment: .trailing) {
                HStack {
                    Text("RED:")
                        .foregroundColor(.red)
                    Text("\(gameManager.scores[.red] ?? 0)")
                        .bold()
                }
                
                HStack {
                    Text("BLUE:")
                        .foregroundColor(.blue)
                    Text("\(gameManager.scores[.blue] ?? 0)")
                        .bold()
                }
            }
        }
        .padding()
        .background(Color.black.opacity(0.7))
        .cornerRadius(10)
    }
}

// Game controls
struct GameControlsView: View {
    @ObservedObject var gameManager: GameManager
    
    var body: some View {
        HStack {
            Text("MOVES: \(gameManager.currentPlayerMovementPoints)")
                .font(.headline)
            
            Spacer()
            
            Button(action: {
                gameManager.processAction(.undoLastMove)
            }) {
                Text("UNDO")
                    .padding(.horizontal)
                    .padding(.vertical, 8)
                    .background(Color.gray)
                    .cornerRadius(8)
            }
            
            Button(action: {
                gameManager.processAction(.undoAllMoves)
            }) {
                Text("RESET")
                    .padding(.horizontal)
                    .padding(.vertical, 8)
                    .background(Color.gray)
                    .cornerRadius(8)
            }
            
            Button(action: {
                gameManager.processAction(.endTurn)
            }) {
                Text("END TURN")
                    .padding(.horizontal)
                    .padding(.vertical, 8)
                    .background(Color.green)
                    .cornerRadius(8)
            }
        }
        .padding()
        .background(Color.black.opacity(0.7))
        .cornerRadius(10)
    }
}

// Game over view
struct GameOverView: View {
    let winner: PlayerTeam?
    let redScore: Int
    let blueScore: Int
    let onRestart: () -> Void
    
    var body: some View {
        VStack(spacing: 20) {
            Text("GAME OVER")
                .font(.largeTitle)
                .bold()
            
            if let winner = winner {
                Text("\(winner.rawValue.uppercased()) WINS!")
                    .font(.title)
                    .foregroundColor(winner.color)
            } else {
                Text("IT'S A TIE!")
                    .font(.title)
            }
            
            VStack {
                Text("FINAL SCORE")
                    .font(.headline)
                
                HStack(spacing: 30) {
                    VStack {
                        Text("RED")
                            .foregroundColor(.red)
                        Text("\(redScore)")
                            .font(.title)
                            .bold()
                    }
                    
                    VStack {
                        Text("BLUE")
                            .foregroundColor(.blue)
                        Text("\(blueScore)")
                            .font(.title)
                            .bold()
                    }
                }
            }
            .padding()
            
            Button(action: onRestart) {
                Text("PLAY AGAIN")
                    .font(.headline)
                    .padding()
                    .background(Color.green)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
        }
        .padding(40)
        .background(Color.black.opacity(0.8))
        .cornerRadius(20)
        .shadow(radius: 10)
    }
}