import Foundation
import SwiftUI
import Combine

// Game states for controlling flow
enum GameState: Equatable {
    case setup
    case playerTurn(PlayerTeam)
    case animatingMovement
    case animatingCombat
    case gameOver(winner: PlayerTeam?)
}

// Actions a player can take during their turn
enum GameAction {
    case moveShip(Ship, to: HexCoord)
    case undoLastMove
    case undoAllMoves
    case endTurn
}

// Main game manager class
class GameManager: ObservableObject {
    // Game state
    @Published private(set) var state: GameState = .setup
    @Published private(set) var currentTurn: Int = 1
    @Published private(set) var grid: HexGrid
    @Published private(set) var ships: [Ship] = []
    @Published private(set) var selectedShip: Ship? = nil
    @Published private(set) var reachableCoordinates: [HexCoord] = []
    @Published private(set) var movementPath: [HexCoord] = []
    @Published private(set) var currentPlayerMovementPoints: Int = 0
    @Published private(set) var combatAnimations: [CombatAnimation] = []
    @Published private(set) var combatAttacks: [CombatAttack] = []
    @Published private(set) var scores: [PlayerTeam: Int] = [.red: 0, .blue: 0]
    
    // Game configuration
    private let config: GameConfig
    private let combatSystem = CombatSystem()
    private let combatAnimator = CombatAnimator()
    
    // Movement tracking
    private var movementHistory: [(ship: Ship, from: HexCoord)] = []
    private var occupiedCoordinates: [HexCoord] {
        ships.filter { !$0.isDestroyed }.map { $0.position }
    }
    
    private var cancellables = Set<AnyCancellable>()
    
    init(config: GameConfig = GameConfig()) {
        self.config = config
        self.grid = HexGrid(size: config.boardSize)
        
        // Setup game when initializing
        setupGame()
    }
    
    // Set up the initial game state
    private func setupGame() {
        // Clear any existing state
        ships.removeAll()
        movementHistory.removeAll()
        currentTurn = 1
        
        // Reset scores
        scores = [.red: 0, .blue: 0]
        
        // Create ships for both teams
        for team in [PlayerTeam.red, PlayerTeam.blue] {
            let startingLayout = config.getStartingLayout(team: team)
            
            for layout in startingLayout {
                let ship = Ship(hitNumber: layout.hitNumber, team: team, position: layout.position)
                ships.append(ship)
                
                // Update scores - each ship's value is its hit number
                scores[team]! += layout.hitNumber
            }
        }
        
        // Initialize the game state
        state = .playerTurn(.red)
        currentPlayerMovementPoints = config.movementPointsPerTurn
    }
    
    // Process player actions
    func processAction(_ action: GameAction) {
        guard case .playerTurn(let currentTeam) = state else { return }
        
        switch action {
        case .moveShip(let ship, to: let destination):
            moveShip(ship, to: destination)
            
        case .undoLastMove:
            undoLastMove()
            
        case .undoAllMoves:
            undoAllMoves()
            
        case .endTurn:
            endTurn()
        }
    }
    
    // Select a ship to show its movement options
    func selectShip(_ ship: Ship?) {
        // Only allow selecting ships during a player's turn
        guard case .playerTurn(let currentTeam) = state else {
            selectedShip = nil
            reachableCoordinates = []
            movementPath = []
            return
        }
        
        // Can only select ships from current player's team
        guard let ship = ship, !ship.isDestroyed, ship.team == currentTeam else {
            selectedShip = nil
            reachableCoordinates = []
            movementPath = []
            return
        }
        
        selectedShip = ship
        
        // Calculate reachable coordinates
        reachableCoordinates = grid.findReachableCoordinates(
            from: ship.position,
            movementPoints: min(currentPlayerMovementPoints, config.movementPointsPerTurn),
            occupiedCoords: occupiedCoordinates.filter { $0 != ship.position }
        )
    }
    
    // Calculate path when selecting a destination
    func calculatePath(to destination: HexCoord) {
        guard let ship = selectedShip, reachableCoordinates.contains(destination) else {
            movementPath = []
            return
        }
        
        // Find path to destination
        if let path = grid.findPath(
            from: ship.position,
            to: destination,
            occupiedCoords: occupiedCoordinates.filter { $0 != ship.position }
        ) {
            // Path should include start position, so we don't need to add it
            movementPath = path
        } else {
            movementPath = []
        }
    }
    
    // Move a ship to a new position
    private func moveShip(_ ship: Ship, to destination: HexCoord) {
        guard case .playerTurn(let currentTeam) = state,
              ship.team == currentTeam,
              !ship.isDestroyed,
              let path = grid.findPath(
                from: ship.position,
                to: destination,
                occupiedCoords: occupiedCoordinates.filter { $0 != ship.position }
              ),
              path.count - 1 <= currentPlayerMovementPoints else {
            return
        }
        
        // Record current position for undo
        movementHistory.append((ship: ship, from: ship.position))
        
        // Update movement points
        currentPlayerMovementPoints -= (path.count - 1)
        
        // Move ship to new position
        ship.position = destination
        
        // Clear selection
        selectedShip = nil
        reachableCoordinates = []
        movementPath = []
    }
    
    // Undo the last move
    private func undoLastMove() {
        guard !movementHistory.isEmpty else { return }
        
        let lastMove = movementHistory.removeLast()
        
        // Restore the ship's position
        lastMove.ship.position = lastMove.from
        
        // Calculate movement points to restore
        // We need to find the path length that was used
        if let path = grid.findPath(
            from: lastMove.from,
            to: lastMove.ship.position,
            occupiedCoords: occupiedCoordinates.filter { $0 != lastMove.ship.position }
        ) {
            currentPlayerMovementPoints += (path.count - 1)
        }
        
        // Clear any current selection
        selectedShip = nil
        reachableCoordinates = []
        movementPath = []
    }
    
    // Undo all moves this turn
    private func undoAllMoves() {
        while !movementHistory.isEmpty {
            undoLastMove()
        }
    }
    
    // End current player's turn
    private func endTurn() {
        guard case .playerTurn(let currentTeam) = state else { return }
        
        // Clear selection
        selectedShip = nil
        reachableCoordinates = []
        movementPath = []
        
        // Process combat phase
        processCombat()
    }
    
    // Process the combat phase
    private func processCombat() {
        state = .animatingCombat
        
        // Calculate all attacks
        combatAttacks = combatSystem.calculateAttacks(ships: ships)
        
        // Determine which ships are destroyed
        let shipsToDestroy = combatSystem.processCombat(grid: grid, ships: ships)
        
        // Obstacle damage (if Squadron Leader variant is enabled)
        if config.hasObstacles {
            let obstacleDestroyedShips = combatSystem.processObstacleDamage(grid: grid, ships: ships)
            shipsToDestroy.append(contentsOf: obstacleDestroyedShips)
        }
        
        // Generate animations
        combatAnimations = combatAnimator.generateCombatAnimations(attacks: combatAttacks, shipsToDestroy: shipsToDestroy)
        
        // Schedule actual destruction after animations
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) { [weak self] in
            self?.finishCombat(shipsToDestroy: shipsToDestroy)
        }
    }
    
    // Finish combat phase and update game state
    private func finishCombat(shipsToDestroy: [Ship]) {
        // Update scores and mark ships as destroyed
        for ship in shipsToDestroy {
            guard !ship.isDestroyed else { continue }
            
            ship.isDestroyed = true
            
            // Update score for the opposing team
            let opposingTeam: PlayerTeam = ship.team == .red ? .blue : .red
            scores[opposingTeam]! += ship.hitNumber
        }
        
        // Clear combat state
        combatAttacks = []
        combatAnimations = []
        
        // Check for game end conditions
        if checkGameEnd() {
            return
        }
        
        // Move to next turn or player
        advanceTurn()
    }
    
    // Check if the game should end
    private func checkGameEnd() -> Bool {
        // Check if all ships of one team are destroyed
        let redShipsRemaining = ships.contains { $0.team == .red && !$0.isDestroyed }
        let blueShipsRemaining = ships.contains { $0.team == .blue && !$0.isDestroyed }
        
        if !redShipsRemaining || !blueShipsRemaining {
            // Game over by elimination
            let winner: PlayerTeam? = !redShipsRemaining ? .blue : .red
            state = .gameOver(winner: winner)
            return true
        }
        
        // Check if maximum turns reached
        if currentTurn >= config.maxTurns {
            // Game over by turn limit
            let redScore = scores[.red] ?? 0
            let blueScore = scores[.blue] ?? 0
            
            let winner: PlayerTeam? = redScore > blueScore ? .red : (blueScore > redScore ? .blue : nil)
            state = .gameOver(winner: winner)
            return true
        }
        
        return false
    }
    
    // Advance to next turn
    private func advanceTurn() {
        // Clear movement history
        movementHistory.removeAll()
        
        // Toggle current player
        if case .playerTurn(let currentTeam) = state {
            let nextTeam: PlayerTeam = currentTeam == .red ? .blue : .red
            
            // If we've gone through both players, advance the turn counter
            if nextTeam == .red {
                currentTurn += 1
            }
            
            // Reset movement points
            currentPlayerMovementPoints = config.movementPointsPerTurn
            
            // Set next player's turn
            state = .playerTurn(nextTeam)
        }
    }
    
    // Reset the game
    func resetGame() {
        setupGame()
    }
}