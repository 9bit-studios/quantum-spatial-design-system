import UIKit
import CoreML
import Vision
import Foundation
import NaturalLanguage
import SwiftUI

// MARK: - Ship Asset Generation

class ShipAssetGenerator {
    // The ML model would be trained on spaceship designs
    private let shipStyleModel: MLModel
    
    init() {
        // Load the ML model
        let modelConfig = MLModelConfiguration()
        modelConfig.computeUnits = .all // Use all available compute units
        
        self.shipStyleModel = try! ShipStyleTransfer(configuration: modelConfig).model
    }
    
    // Generate ship designs for each hit number with team-specific colors
    func generateShipAssets() async throws {
        let hitNumbers = 1...5
        let teams: [PlayerTeam] = [.red, .blue]
        
        // Base shapes for different ship types
        let baseShapes = [
            1: "ship_base_fighter", // Fast, small ships
            2: "ship_base_corvette", // Medium ships  
            3: "ship_base_cruiser", // Larger ships
            4: "ship_base_battleship", // Heavy ships
            5: "ship_base_mothership" // The flagship
        ]
        
        for hitNumber in hitNumbers {
            for team in teams {
                // Load base shape
                guard let baseImage = UIImage(named: baseShapes[hitNumber]!) else {
                    continue
                }
                
                // Apply team colors and styling
                let styledShip = try await applyTeamStyle(to: baseImage, team: team)
                
                // Add hit number visual indicators
                let finalShip = addHitNumberIndicators(to: styledShip, hitNumber: hitNumber)
                
                // Save to asset catalog
                let assetName = "ship_\(team.rawValue)_\(hitNumber)"
                try saveAsset(finalShip, name: assetName)
            }
        }
    }
    
    // Apply team-specific styling to base ship image
    private func applyTeamStyle(to baseImage: UIImage, team: PlayerTeam) async throws -> UIImage {
        // Create input for the model
        guard let cgImage = baseImage.cgImage else {
            throw NSError(domain: "ShipAssetGenerator", code: 1, userInfo: [NSLocalizedDescriptionKey: "Failed to get CGImage"])
        }
        
        // Team-specific style parameters
        let styleParameters: [String: Any] = [
            "team": team.rawValue,
            "primaryColor": team == .red ? [0.9, 0.2, 0.2] : [0.2, 0.2, 0.9],
            "secondaryColor": team == .red ? [0.7, 0.1, 0.1] : [0.1, 0.1, 0.7],
            "glowColor": team == .red ? [1.0, 0.3, 0.3] : [0.3, 0.3, 1.0],
            "styleIntensity": 0.85
        ]
        
        // Prepare Core ML input
        let input = try? MLFeatureValue(cgImage: cgImage)
        let styleInput = try? MLDictionaryFeatureProvider(dictionary: styleParameters)
        
        // Run style transfer
        let inputFeatures = try MLDictionaryFeatureProvider(dictionary: [
            "image": input!,
            "styleParameters": styleInput!
        ])
        
        let outputFeatures = try shipStyleModel.prediction(from: inputFeatures)
        let outputImage = outputFeatures.featureValue(for: "styledImage")?.cgImage
        
        return UIImage(cgImage: outputImage!)
    }
    
    // Add visual indicators of hit number
    private func addHitNumberIndicators(to shipImage: UIImage, hitNumber: Int) -> UIImage {
        UIGraphicsBeginImageContextWithOptions(shipImage.size, false, 0.0)
        shipImage.draw(in: CGRect(origin: .zero, size: shipImage.size))
        
        // Add visual elements that indicate the ship's hit number
        // This could be engine lights, weapon hardpoints, armor plates, etc.
        
        let context = UIGraphicsGetCurrentContext()!
        
        // Draw hit number indicators
        for i in 0..<hitNumber {
            // Position indicators in a circle or pattern around the ship
            let angle = CGFloat(i) * (2 * .pi / CGFloat(hitNumber))
            let radius = min(shipImage.size.width, shipImage.size.height) * 0.3
            let x = shipImage.size.width / 2 + radius * cos(angle)
            let y = shipImage.size.height / 2 + radius * sin(angle)
            
            // Draw a small circle indicator
            context.setFillColor(UIColor.white.cgColor)
            context.fillEllipse(in: CGRect(x: x - 5, y: y - 5, width: 10, height: 10))
        }
        
        let resultImage = UIGraphicsGetImageFromCurrentImageContext()!
        UIGraphicsEndImageContext()
        
        return resultImage
    }
    
    // Save generated asset to the app's documents directory
    private func saveAsset(_ image: UIImage, name: String) throws {
        guard let data = image.pngData() else {
            throw NSError(domain: "ShipAssetGenerator", code: 2, userInfo: [NSLocalizedDescriptionKey: "Failed to convert image to PNG data"])
        }
        
        let fileManager = FileManager.default
        let documentsDirectory = try fileManager.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
        let fileURL = documentsDirectory.appendingPathComponent("\(name).png")
        
        try data.write(to: fileURL)
    }
}

// MARK: - Hex Grid Layout Optimization

class HexPathfindingOptimizer {
    private let optimizerModel: MLModel
    private var cachedResults: [String: [HexCoord]] = [:]
    
    init() {
        // Load the optimized pathfinding model
        let modelConfig = MLModelConfiguration()
        modelConfig.computeUnits = .all
        
        self.optimizerModel = try! HexPathfindingModel(configuration: modelConfig).model
    }
    
    // Calculate optimized paths between coordinates
    func calculateOptimizedPath(from start: HexCoord, to end: HexCoord, obstacles: [HexCoord]) -> [HexCoord] {
        // Check if we have a cached result
        let cacheKey = "\(start)-\(end)-\(obstacles.hashValue)"
        if let cachedPath = cachedResults[cacheKey] {
            return cachedPath
        }
        
        // Convert to flat arrays for ML model input
        let startArray = [Float(start.x), Float(start.y), Float(start.z)]
        let endArray = [Float(end.x), Float(end.y), Float(end.z)]
        
        // Flatten obstacles into a single array
        let obstacleArray = obstacles.flatMap { [Float($0.x), Float($0.y), Float($0.z)] }
        
        // Create ML input
        let input: [String: MLFeatureValue] = [
            "start": MLFeatureValue(multiArray: try! MLMultiArray(shape: [3], dataType: .float32, data: Data(bytes: startArray, count: 3 * MemoryLayout<Float>.size))),
            "end": MLFeatureValue(multiArray: try! MLMultiArray(shape: [3], dataType: .float32, data: Data(bytes: endArray, count: 3 * MemoryLayout<Float>.size))),
            "obstacles": MLFeatureValue(multiArray: try! MLMultiArray(shape: [obstacles.count * 3], dataType: .float32, data: Data(bytes: obstacleArray, count: obstacles.count * 3 * MemoryLayout<Float>.size)))
        ]
        
        // Run prediction
        guard let outputFeatures = try? optimizerModel.prediction(from: MLDictionaryFeatureProvider(dictionary: input)),
              let outputPath = outputFeatures.featureValue(for: "path")?.multiArrayValue else {
            // Fall back to traditional algorithm if ML fails
            return calculateTraditionalPath(from: start, to: end, obstacles: obstacles)
        }
        
        // Convert output to path
        var path: [HexCoord] = []
        let pathLength = outputPath.shape[0].intValue / 3
        
        for i in 0..<pathLength {
            let x = outputPath[i * 3].intValue
            let y = outputPath[i * 3 + 1].intValue
            let z = outputPath[i * 3 + 2].intValue
            path.append(HexCoord(x: x, y: y, z: z))
        }
        
        // Cache result
        cachedResults[cacheKey] = path
        
        return path
    }
    
    // Fallback to traditional A* pathfinding if ML fails
    private func calculateTraditionalPath(from start: HexCoord, to end: HexCoord, obstacles: [HexCoord]) -> [HexCoord] {
        // A* implementation would go here
        // This ensures we always have a fallback if the ML model fails
        return []
    }
    
    // Pre-calculate common paths for the current board state
    func precalculateCommonPaths(ships: [Ship], grid: HexGrid) {
        // Identify frequently queried paths
        let activeShips = ships.filter { !$0.isDestroyed }
        let obstacles = activeShips.map { $0.position }
        
        // Run calculations in background
        DispatchQueue.global(qos: .utility).async {
            for ship in activeShips {
                let potentialTargets = activeShips.filter { $0.team != ship.team }.map { $0.position }
                
                for target in potentialTargets {
                    // Only precalculate if within reasonable distance
                    if ship.position.distance(to: target) <= 10 {
                        let _ = self.calculateOptimizedPath(
                            from: ship.position,
                            to: target,
                            obstacles: obstacles.filter { $0 != ship.position }
                        )
                    }
                }
            }
        }
    }
}

// MARK: - AI Opponent System

// Strategic objectives for the AI
enum AIObjective: Int {
    case aggressive = 0
    case defensive = 1
    case balanced = 2
    case targeting = 3
}

// Represents a planned AI move
struct AIMove {
    let ship: Ship
    let destination: HexCoord
    let path: [HexCoord]
    let movementCost: Int
}

class AIOpponentSystem {
    private let difficultyLevel: AIDifficulty
    private let decisionModel: MLModel
    private var gameManager: GameManager
    private var playerTeam: PlayerTeam
    private var aiTeam: PlayerTeam
    
    enum AIDifficulty: Int {
        case easy = 0
        case medium = 1
        case hard = 2
        case adaptive = 3
    }
    
    init(difficulty: AIDifficulty, gameManager: GameManager, aiTeam: PlayerTeam) {
        self.difficultyLevel = difficulty
        self.gameManager = gameManager
        self.aiTeam = aiTeam
        self.playerTeam = aiTeam == .red ? .blue : .red
        
        // Load the appropriate model based on difficulty
        let modelName: String
        switch difficulty {
        case .easy:
            modelName = "HexecuteAI_Easy"
        case .medium:
            modelName = "HexecuteAI_Medium"
        case .hard:
            modelName = "HexecuteAI_Hard"
        case .adaptive:
            modelName = "HexecuteAI_Adaptive"
        }
        
        let modelConfig = MLModelConfiguration()
        modelConfig.computeUnits = .all
        
        let modelURL = Bundle.main.url(forResource: modelName, withExtension: "mlmodelc")!
        self.decisionModel = try! MLModel(contentsOf: modelURL, configuration: modelConfig)
    }
    
    // Take the AI turn when it's the AI's turn to play
    func takeTurn() {
        // 1. Analyze current board state
        let boardState = analyzeCurrentBoardState()
        
        // 2. Determine strategic objective for this turn
        let objective = determineStrategicObjective(boardState: boardState)
        
        // 3. Plan moves based on objective
        let moves = planMoves(objective: objective)
        
        // 4. Execute moves
        executeMoves(moves)
        
        // 5. End turn
        gameManager.processAction(.endTurn)
    }
    
    // Analyze the current state of the game board
    private func analyzeCurrentBoardState() -> [String: Any] {
        // Get all ships and their states
        let aiShips = gameManager.ships.filter { $0.team == aiTeam && !$0.isDestroyed }
        let playerShips = gameManager.ships.filter { $0.team == playerTeam && !$0.isDestroyed }
        
        // Calculate various metrics about the game state
        let aiFleetValue = aiShips.reduce(0) { $0 + $1.hitNumber }
        let playerFleetValue = playerShips.reduce(0) { $0 + $1.hitNumber }
        
        // Analyze positional advantages
        var aiPositionalAdvantage = 0
        var playerPositionalAdvantage = 0
        
        for aiShip in aiShips {
            // Count how many enemy ships this ship can attack
            let attackableEnemies = playerShips.filter {
                aiShip.position.neighbors().contains($0.position)
            }.count
            
            aiPositionalAdvantage += attackableEnemies
        }
        
        for playerShip in playerShips {
            let attackableEnemies = aiShips.filter {
                playerShip.position.neighbors().contains($0.position)
            }.count
            
            playerPositionalAdvantage += attackableEnemies
        }
        
        // Analyze vulnerable ships
        let vulnerableAiShips = aiShips.filter { aiShip in
            let adjacentEnemies = playerShips.filter {
                aiShip.position.neighbors().contains($0.position)
            }.count
            
            return adjacentEnemies >= aiShip.hitNumber - 1 // Within 1 hit of being destroyed
        }
        
        // Return the analyzed state
        return [
            "aiShips": aiShips,
            "playerShips": playerShips,
            "aiFleetValue": aiFleetValue,
            "playerFleetValue": playerFleetValue,
            "aiPositionalAdvantage": aiPositionalAdvantage,
            "playerPositionalAdvantage": playerPositionalAdvantage,
            "vulnerableAiShips": vulnerableAiShips,
            "currentTurn": gameManager.currentTurn,
            "movementPoints": gameManager.currentPlayerMovementPoints
        ]
    }
    
    // Determine strategic objective based on the current board state
    private func determineStrategicObjective(boardState: [String: Any]) -> AIObjective {
        // Extract key information
        let aiShips = boardState["aiShips"] as! [Ship]
        let playerShips = boardState["playerShips"] as! [Ship]
        let aiFleetValue = boardState["aiFleetValue"] as! Int
        let playerFleetValue = boardState["playerFleetValue"] as! Int
        let aiPositionalAdvantage = boardState["aiPositionalAdvantage"] as! Int
        let playerPositionalAdvantage = boardState["playerPositionalAdvantage"] as! Int
        let vulnerableAiShips = boardState["vulnerableAiShips"] as! [Ship]
        let currentTurn = boardState["currentTurn"] as! Int
        
        // Prepare input for the ML model
        let input: [String: MLFeatureValue] = [
            "aiFleetValue": MLFeatureValue(double: Double(aiFleetValue)),
            "playerFleetValue": MLFeatureValue(double: Double(playerFleetValue)),
            "aiPositionalAdvantage": MLFeatureValue(double: Double(aiPositionalAdvantage)),
            "playerPositionalAdvantage": MLFeatureValue(double: Double(playerPositionalAdvantage)),
            "vulnerableAiShipsCount": MLFeatureValue(double: Double(vulnerableAiShips.count)),
            "aiShipsCount": MLFeatureValue(double: Double(aiShips.count)),
            "playerShipsCount": MLFeatureValue(double: Double(playerShips.count)),
            "currentTurn": MLFeatureValue(double: Double(currentTurn)),
            "difficultyLevel": MLFeatureValue(double: Double(difficultyLevel.rawValue))
        ]
        
        // Get prediction from the model
        guard let outputFeatures = try? decisionModel.prediction(from: MLDictionaryFeatureProvider(dictionary: input)),
              let objectiveValue = outputFeatures.featureValue(for: "objective")?.int64Value else {
            // Fallback to a balanced strategy if ML fails
            return .balanced
        }
        
        // Convert the output to an objective
        return AIObjective(rawValue: Int(objectiveValue)) ?? .balanced
    }
    
    // Plan the actual moves based on the strategic objective
    private func planMoves(objective: AIObjective) -> [AIMove] {
        var plannedMoves: [AIMove] = []
        let availableMovementPoints = gameManager.currentPlayerMovementPoints
        var remainingPoints = availableMovementPoints
        
        // Get AI ships that can be moved
        let aiShips = gameManager.ships.filter { $0.team == aiTeam && !$0.isDestroyed }
        let playerShips = gameManager.ships.filter { $0.team == playerTeam && !$0.isDestroyed }
        
        // Prioritize ships based on objective
        var prioritizedShips: [(ship: Ship, priority: Int)] = []
        
        switch objective {
        case .aggressive:
            // Prioritize ships that can attack enemy ships
            for ship in aiShips {
                let potentialAttackPositions = findPositionsToAttackEnemies(ship: ship, playerShips: playerShips)
                prioritizedShips.append((ship, potentialAttackPositions.count * 10))
            }
            
        case .defensive:
            // Prioritize vulnerable ships that need to retreat
            for ship in aiShips {
                let adjacentEnemies = playerShips.filter {
                    ship.position.neighbors().contains($0.position)
                }.count
                
                let vulnerability = adjacentEnemies >= ship.hitNumber - 1 ? 20 : 0
                prioritizedShips.append((ship, vulnerability))
            }
            
        case .balanced:
            // Mix of attack and defense
            for ship in aiShips {
                let potentialAttackPositions = findPositionsToAttackEnemies(ship: ship, playerShips: playerShips)
                let adjacentEnemies = playerShips.filter {
                    ship.position.neighbors().contains($0.position)
                }.count
                
                let attackPriority = potentialAttackPositions.count * 5
                let defensePriority = adjacentEnemies >= ship.hitNumber - 1 ? 15 : 0
                
                prioritizedShips.append((ship, attackPriority + defensePriority))
            }
            
        case .targeting:
            // Focus on destroying specific high-value enemy ships
            let highValueTargets = playerShips.filter { $0.hitNumber >= 4 }
            
            for ship in aiShips {
                var priority = 0
                
                for target in highValueTargets {
                    let distance = ship.position.distance(to: target.position)
                    if distance <= 3 { // Close enough to potentially reach
                        priority += (6 - distance) * 10
                    }
                }
                
                prioritizedShips.append((ship, priority))
            }
        }
        
        // Sort ships by priority (highest first)
        prioritizedShips.sort { $0.priority > $1.priority }
        
        // Allocate movement points to ships based on priority
        for (ship, _) in prioritizedShips {
            // Skip if no more movement points
            if remainingPoints <= 0 {
                break
            }
            
            // Determine best destination for this ship
            if let bestMove = determineBestMove(for: ship, objective: objective, remainingPoints: remainingPoints) {
                plannedMoves.append(bestMove)
                remainingPoints -= bestMove.movementCost
            }
        }
        
        return plannedMoves
    }
    
    // Find positions from which the ship can attack enemy ships
    private func findPositionsToAttackEnemies(ship: Ship, playerShips: [Ship]) -> [HexCoord] {
        var attackPositions: [HexCoord] = []
        
        // Get all potential positions this ship could move to
        let reachableCoords = gameManager.grid.findReachableCoordinates(
            from: ship.position,
            movementPoints: gameManager.currentPlayerMovementPoints,
            occupiedCoords: gameManager.ships.filter { !$0.isDestroyed && $0 != ship }.map { $0.position }
        )
        
        // Check each position to see if it's adjacent to an enemy ship
        for coord in reachableCoords {
            let neighbors = coord.neighbors()
            
            // If any enemy ship is in the neighboring positions, this is an attack position
            if playerShips.contains(where: { neighbors.contains($0.position) }) {
                attackPositions.append(coord)
            }
        }
        
        return attackPositions
    }
    
    // Determine the best move for a specific ship
    private func determineBestMove(for ship: Ship, objective: AIObjective, remainingPoints: Int) -> AIMove? {
        // Get all reachable coordinates for this ship
        let reachableCoords = gameManager.grid.findReachableCoordinates(
            from: ship.position,
            movementPoints: remainingPoints,
            occupiedCoords: gameManager.ships.filter { !$0.isDestroyed && $0 != ship }.map { $0.position }
        )
        
        if reachableCoords.isEmpty {
            return nil
        }
        
        // Score each potential destination based on the objective
        var scoredDestinations: [(coord: HexCoord, score: Int)] = []
        
        for coord in reachableCoords {
            var score = 0
            
            // Calculate path and movement cost
            guard let path = gameManager.grid.findPath(
                from: ship.position,
                to: coord,
                occupiedCoords: gameManager.ships.filter { !$0.isDestroyed && $0 != ship }.map { $0.position }
            ) else {
                continue
            }
            
            let movementCost = path.count - 1
            if movementCost > remainingPoints {
                continue
            }
            
            // Score the position based on objective
            switch objective {
            case .aggressive:
                // Count adjacent enemy ships
                let adjacentEnemies = gameManager.ships.filter { 
                    $0.team == playerTeam && 
                    !$0.isDestroyed && 
                    coord.neighbors().contains($0.position)
                }.count
                
                score += adjacentEnemies * 100
                
                // Prefer positions that don't put our ship at risk
                let enemiesAttackingUs = gameManager.ships.filter {
                    $0.team == playerTeam &&
                    !$0.isDestroyed &&
                    $0.position.neighbors().contains(coord)
                }.count
                
                if enemiesAttackingUs >= ship.hitNumber {
                    score -= 200 // Avoid suicide moves
                }
                
            case .defensive:
                // Count adjacent enemy ships (fewer is better)
                let adjacentEnemies = gameManager.ships.filter { 
                    $0.team == playerTeam && 
                    !$0.isDestroyed && 
                    coord.neighbors().contains($0.position)
                }.count
                
                score -= adjacentEnemies * 50
                
                // Prefer positions far from enemy ships
                let minDistanceToEnemy = gameManager.ships.filter { $0.team == playerTeam && !$0.isDestroyed }
                    .map { coord.distance(to: $0.position) }
                    .min() ?? 0
                
                score += minDistanceToEnemy * 20
                
            case .balanced:
                // Mix of aggressive and defensive scoring
                let adjacentEnemies = gameManager.ships.filter { 
                    $0.team == playerTeam && 
                    !$0.isDestroyed && 
                    coord.neighbors().contains($0.position)
                }.count
                
                // We want to attack, but not if we'll be destroyed
                if adjacentEnemies >= ship.hitNumber {
                    score -= 150 // Avoid suicide moves
                } else {
                    score += adjacentEnemies * 50 // Otherwise attack is good
                }
                
            case .targeting:
                // Focus on getting close to high-value targets
                let highValueTargets = gameManager.ships.filter { 
                    $0.team == playerTeam && 
                    !$0.isDestroyed && 
                    $0.hitNumber >= 4
                }
                
                for target in highValueTargets {
                    let distance = coord.distance(to: target.position)
                    score += (10 - distance) * 30 // Higher score for closer positions
                    
                    // Extra bonus for being adjacent to attack
                    if distance == 1 {
                        score += 100
                    }
                }
            }
            
            // Penalize for higher movement cost
            score -= movementCost * 10
            
            scoredDestinations.append((coord, score))
        }
        
        // Find the highest scoring destination
        guard let bestDestination = scoredDestinations.max(by: { $0.score < $1.score }) else {
            return nil
        }
        
        // Calculate path and movement cost
        guard let path = gameManager.grid.findPath(
            from: ship.position,
            to: bestDestination.coord,
            occupiedCoords: gameManager.ships.filter { !$0.isDestroyed && $0 != ship }.map { $0.position }
        ) else {
            return nil
        }
        
        return AIMove(ship: ship, destination: bestDestination.coord, path: path, movementCost: path.count - 1)
    }
    
    // Execute the planned moves
    private func executeMoves(_ moves: [AIMove]) {
        for move in moves {
            gameManager.processAction(.moveShip(move.ship, to: move.destination))
            
            // Add a small delay to make the moves visible to the player
            Thread.sleep(forTimeInterval: 0.5)
        }
    }
}

// MARK: - Automated Tutorial System

// Element to highlight in tutorial
enum TutorialHighlight {
    case none
    case statusBar
    case playerShip(hitNumber: Int)
    case reachableHexes
    case movementCounter
    case endTurnButton
    case scoreDisplay
}

// A step in the tutorial
struct TutorialStep {
    let id: String
    let title: String
    let message: String
    let highlightedElement: TutorialHighlight
    let triggerCondition: (GameManager) -> Bool
}

// Game state pattern matching for contextual hints
enum GameStatePattern {
    case lowMovementPointsUsed
    case shipsInDanger
    case offensiveOpportunity
    case defensiveClustering
    
    func matches(_ state: GameStateAnalysis) -> Bool {
        switch self {
        case .lowMovementPointsUsed:
            // If the player has used less than half their movement points
            return state.usedMovementPoints < state.totalMovementPoints / 2
            
        case .shipsInDanger:
            // If any player ships are at risk of being destroyed
            return !state.endangeredShips.isEmpty
            
        case .offensiveOpportunity:
            // If the player can destroy enemy ships
            return !state.attackOpportunities.isEmpty
            
        case .defensiveClustering:
            // If player ships are too clustered
            return state.shipClustering > 0.7 // Threshold for clustering
        }
    }
}

// Analysis of the current game state
struct GameStateAnalysis {
    let usedMovementPoints: Int
    let totalMovementPoints: Int
    let endangeredShips: [Ship]
    let attackOpportunities: [(attackerPositions: [HexCoord], targetShip: Ship)]
    let shipClustering: Double // 0.0 = spread out, 1.0 = all ships adjacent
}

// Analyzer that extracts meaningful patterns from game state
class GameStateAnalyzer {
    static func analyzeState(gameManager: GameManager) -> GameStateAnalysis {
        // This would extract relevant state information
        return GameStateAnalysis(
            usedMovementPoints: 0,
            totalMovementPoints: 15,
            endangeredShips: [],
            attackOpportunities: [],
            shipClustering: 0.5
        )
    }
}

class TutorialGenerator {
    private let gameManager: GameManager
    private var tutorialSteps: [TutorialStep] = []
    private var currentStepIndex = 0
    
    init(gameManager: GameManager) {
        self.gameManager = gameManager
        generateTutorialSteps()
    }
    
    // Generate tutorial steps based on game mechanics
    private func generateTutorialSteps() {
        tutorialSteps = [
            TutorialStep(
                id: "welcome",
                title: "Welcome to Hexecute",
                message: "This tutorial will guide you through your first space battle!",
                highlightedElement: .statusBar,
                triggerCondition: { _ in true }
            ),
            TutorialStep(
                id: "select_ship",
                title: "Select a Ship",
                message: "Tap on one of your ships to see where it can move.",
                highlightedElement: .playerShip(hitNumber: 1),
                triggerCondition: { gameState in
                    gameState.selectedShip == nil
                }
            ),
            TutorialStep(
                id: "movement",
                title: "Movement",
                message: "Green hexes show where you can move. Tap a destination to move your ship there.",
                highlightedElement: .reachableHexes,
                triggerCondition: { gameState in
                    gameState.selectedShip != nil && !gameState.reachableCoordinates.isEmpty
                }
            ),
            TutorialStep(
                id: "movement_points",
                title: "Movement Points",
                message: "You have 15 movement points per turn. Each hex moved costs 1 point.",
                highlightedElement: .movementCounter,
                triggerCondition: { gameState in
                    gameState.currentPlayerMovementPoints < gameManager.config.movementPointsPerTurn
                }
            ),
            TutorialStep(
                id: "end_turn",
                title: "End Your Turn",
                message: "When you're done moving ships, tap 'End Turn' to begin combat.",
                