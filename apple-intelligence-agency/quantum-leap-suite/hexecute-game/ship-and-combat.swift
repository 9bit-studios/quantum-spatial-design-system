import Foundation
import SwiftUI

// Team/Side in the game
enum PlayerTeam: String, Codable {
    case red
    case blue
    
    var color: Color {
        switch self {
        case .red:
            return Color.red
        case .blue:
            return Color.blue
        }
    }
}

// Ship model representing a spaceship in the game
class Ship: Identifiable, ObservableObject {
    let id = UUID()
    let hitNumber: Int // 1-5, determines ship durability
    let team: PlayerTeam
    
    @Published var position: HexCoord
    @Published var isDestroyed = false
    
    init(hitNumber: Int, team: PlayerTeam, position: HexCoord) {
        self.hitNumber = hitNumber
        self.team = team
        self.position = position
    }
    
    // Visual properties based on ship type
    var shipType: String {
        "ship_type_\(hitNumber)"
    }
    
    // Check if this ship can be damaged by the specified number of attacking ships
    func willBeDestroyed(byAttackCount attackCount: Int) -> Bool {
        return attackCount >= hitNumber
    }
}

// Combat system that handles ship attacks and destruction
class CombatSystem {
    // Process combat for all ships on the board
    func processCombat(grid: HexGrid, ships: [Ship]) -> [Ship] {
        var shipsToDestroy: [Ship] = []
        var attackCounts: [UUID: Int] = [:]
        
        // Initialize attack counts
        for ship in ships where !ship.isDestroyed {
            attackCounts[ship.id] = 0
        }
        
        // Calculate attacks for each ship
        for attacker in ships where !attacker.isDestroyed {
            // Get all adjacent coordinates
            let adjacentCoords = attacker.position.neighbors()
            
            // Check each adjacent coordinate for enemy ships
            for coord in adjacentCoords {
                // Find if there's a ship at this coordinate
                if let targetHexCell = grid.getCell(at: coord),
                   let targetShip = targetHexCell.ship,
                   !targetShip.isDestroyed,
                   targetShip.team != attacker.team {
                    // Increment attack count for the target ship
                    attackCounts[targetShip.id, default: 0] += 1
                }
            }
        }
        
        // Identify ships to destroy
        for ship in ships where !ship.isDestroyed {
            let attackCount = attackCounts[ship.id] ?? 0
            if ship.willBeDestroyed(byAttackCount: attackCount) {
                shipsToDestroy.append(ship)
            }
        }
        
        return shipsToDestroy
    }
    
    // Calculate attack relationships for visualization
    func calculateAttacks(ships: [Ship]) -> [CombatAttack] {
        var attacks: [CombatAttack] = []
        
        for attacker in ships where !attacker.isDestroyed {
            // Get all adjacent coordinates
            let adjacentCoords = attacker.position.neighbors()
            
            // Check each adjacent coordinate for enemy ships
            for coord in adjacentCoords {
                // Find if there's a ship at this position
                if let defender = ships.first(where: { $0.position == coord && !$0.isDestroyed && $0.team != attacker.team }) {
                    attacks.append(CombatAttack(attacker: attacker, defender: defender))
                }
            }
        }
        
        return attacks
    }
    
    // Process obstacles that can damage ships (asteroid fields, etc.)
    func processObstacleDamage(grid: HexGrid, ships: [Ship]) -> [Ship] {
        var shipsToDestroy: [Ship] = []
        var attackCounts: [UUID: Int] = [:]
        
        // Initialize attack counts
        for ship in ships where !ship.isDestroyed {
            attackCounts[ship.id] = 0
        }
        
        // Check each ship for adjacent damaging obstacles
        for ship in ships where !ship.isDestroyed {
            // Get all adjacent coordinates
            let adjacentCoords = ship.position.neighbors()
            
            // Count adjacent damaging obstacles
            for coord in adjacentCoords {
                if let cell = grid.getCell(at: coord), 
                   let obstacle = cell.obstacle,
                   obstacle.damagesShips {
                    attackCounts[ship.id, default: 0] += 1
                }
            }
        }
        
        // Identify ships to destroy
        for ship in ships where !ship.isDestroyed {
            let attackCount = attackCounts[ship.id] ?? 0
            if ship.willBeDestroyed(byAttackCount: attackCount) {
                shipsToDestroy.append(ship)
            }
        }
        
        return shipsToDestroy
    }
    
    // Process black hole effects (ships that move into black holes are destroyed)
    func processBlackHoles(grid: HexGrid, ships: [Ship]) -> [Ship] {
        return ships.filter { ship in
            !ship.isDestroyed && 
                grid.getCell(at: ship.position)?.obstacle == .blackHole
        }
    }
}

// Represents an attack between two ships for visualization
struct CombatAttack: Identifiable {
    let id = UUID()
    let attacker: Ship
    let defender: Ship
    
    var fromPosition: HexCoord {
        attacker.position
    }
    
    var toPosition: HexCoord {
        defender.position
    }
}

// Animator for combat effects
class CombatAnimator {
    // Generate the sequence of animations for a combat round
    func generateCombatAnimations(attacks: [CombatAttack], shipsToDestroy: [Ship]) -> [CombatAnimation] {
        var animations: [CombatAnimation] = []
        
        // First add all attack animations
        for attack in attacks {
            animations.append(.attack(fromShip: attack.attacker, toShip: attack.defender))
        }
        
        // Then add all explosion animations for destroyed ships
        for ship in shipsToDestroy {
            animations.append(.explosion(ship: ship))
        }
        
        // Finally add shield regeneration for surviving ships
        // This would be ships that were attacked but not destroyed
        let attackedShipIds = Set(attacks.map { $0.defender.id })
        let destroyedShipIds = Set(shipsToDestroy.map { $0.id })
        let survivingAttackedShipIds = attackedShipIds.subtracting(destroyedShipIds)
        
        for attackId in survivingAttackedShipIds {
            if let ship = (attacks.first { $0.defender.id == attackId })?.defender {
                animations.append(.shieldRegeneration(ship: ship))
            }
        }
        
        return animations
    }
}

// Types of combat animations
enum CombatAnimation {
    case attack(fromShip: Ship, toShip: Ship)
    case explosion(ship: Ship)
    case shieldRegeneration(ship: Ship)
}

// Game configuration for different variants
struct GameConfig {
    // Base game parameters
    let boardSize: Int = 5
    let movementPointsPerTurn: Int = 15
    let maxTurns: Int = 15
    
    // Game variants
    var hasObstacles: Bool = false // Squadron Leader variant
    var friendlyFire: Bool = false // Wing Commander variant
    var beamWeapons: Bool = false // Supreme Commander variant
    
    // Number of ships of each type
    func shipCounts() -> [Int: Int] {
        [
            1: 5, // 5 ships of hit number 1
            2: 4, // 4 ships of hit number 2
            3: 3, // 3 ships of hit number 3
            4: 2, // 2 ships of hit number 4
            5: 1  // 1 ship of hit number 5
        ]
    }
    
    // Get the pyramid layout for a player's starting ships
    func getStartingLayout(team: PlayerTeam) -> [(hitNumber: Int, position: HexCoord)] {
        var layout: [(hitNumber: Int, position: HexCoord)] = []
        
        // Determine the starting position offset based on team
        let rowOffset = team == .red ? -boardSize : boardSize
        
        // Create pyramid formation
        var currentRow = 0
        var currentShip = 5 // Start with the highest hit number
        
        while currentShip > 0 {
            for i in 0..<currentShip {
                // Calculate position in pyramid
                let q = rowOffset + currentRow
                let r = -currentRow/2 + i
                let position = HexCoord(q: q, r: r)
                
                layout.append((hitNumber: 6 - currentShip, position: position))
            }
            
            currentRow += 1
            currentShip -= 1
        }
        
        return layout
    }
}