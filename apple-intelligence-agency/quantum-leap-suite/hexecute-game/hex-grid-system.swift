import Foundation
import SwiftUI

// Hex coordinates using cube coordinate system (x, y, z where x + y + z = 0)
struct HexCoord: Hashable, Equatable, Codable {
    let x: Int
    let y: Int
    let z: Int
    
    init(x: Int, y: Int, z: Int) {
        assert(x + y + z == 0, "Invalid hex coordinates: x + y + z must equal 0")
        self.x = x
        self.y = y
        self.z = z
    }
    
    // Convenience initializer using axial coordinates (q, r)
    init(q: Int, r: Int) {
        self.x = q
        self.z = r
        self.y = -q - r
    }
    
    // Get all adjacent hex coordinates
    func neighbors() -> [HexCoord] {
        let directions = [
            HexCoord(x: 1, y: -1, z: 0),
            HexCoord(x: 1, y: 0, z: -1),
            HexCoord(x: 0, y: 1, z: -1),
            HexCoord(x: -1, y: 1, z: 0),
            HexCoord(x: -1, y: 0, z: 1),
            HexCoord(x: 0, y: -1, z: 1)
        ]
        
        return directions.map { dir in
            HexCoord(x: self.x + dir.x, y: self.y + dir.y, z: self.z + dir.z)
        }
    }
    
    // Calculate distance between two hex coordinates
    func distance(to other: HexCoord) -> Int {
        return (abs(self.x - other.x) + abs(self.y - other.y) + abs(self.z - other.z)) / 2
    }
}

// The game board
class HexGrid {
    private let size: Int
    private var cells: [HexCoord: HexCell] = [:]
    
    init(size: Int) {
        self.size = size
        setupGrid()
    }
    
    private func setupGrid() {
        // Create a hexagonal grid with radius = size
        for q in -size...size {
            let r1 = max(-size, -q - size)
            let r2 = min(size, -q + size)
            
            for r in r1...r2 {
                let coord = HexCoord(q: q, r: r)
                cells[coord] = HexCell(coord: coord)
            }
        }
    }
    
    // Get all valid coordinates on the grid
    func getAllCoordinates() -> [HexCoord] {
        return Array(cells.keys)
    }
    
    // Check if a coordinate is valid on this grid
    func isValidCoordinate(_ coord: HexCoord) -> Bool {
        return cells[coord] != nil
    }
    
    // Get a cell at a specific coordinate
    func getCell(at coord: HexCoord) -> HexCell? {
        return cells[coord]
    }
    
    // Update a cell on the grid
    func setCell(_ cell: HexCell) {
        cells[cell.coord] = cell
    }
    
    // Find all reachable coordinates from a starting point with a given movement range
    func findReachableCoordinates(from start: HexCoord, movementPoints: Int, occupiedCoords: [HexCoord]) -> [HexCoord] {
        var visited: Set<HexCoord> = []
        var result: [HexCoord] = []
        
        // Using breadth-first search to find all reachable coordinates
        var queue: [(coord: HexCoord, distance: Int)] = [(start, 0)]
        visited.insert(start)
        
        while !queue.isEmpty {
            let current = queue.removeFirst()
            
            // Skip the starting coordinate in the result
            if current.coord != start {
                result.append(current.coord)
            }
            
            // If we've reached our movement limit, don't explore further from this node
            if current.distance == movementPoints {
                continue
            }
            
            // Check all neighbors
            for neighbor in current.coord.neighbors() {
                // Skip if not on grid, already visited, or occupied by a ship
                if !isValidCoordinate(neighbor) || visited.contains(neighbor) || occupiedCoords.contains(neighbor) {
                    continue
                }
                
                visited.insert(neighbor)
                queue.append((neighbor, current.distance + 1))
            }
        }
        
        return result
    }
    
    // Find the shortest path between two coordinates
    func findPath(from start: HexCoord, to end: HexCoord, occupiedCoords: [HexCoord]) -> [HexCoord]? {
        // Skip calculation if the end is occupied or not valid
        if occupiedCoords.contains(end) || !isValidCoordinate(end) {
            return nil
        }
        
        var visited: Set<HexCoord> = []
        var queue: [(coord: HexCoord, path: [HexCoord])] = [(start, [start])]
        visited.insert(start)
        
        while !queue.isEmpty {
            let current = queue.removeFirst()
            
            // If we've reached the destination, return the path
            if current.coord == end {
                return current.path
            }
            
            for neighbor in current.coord.neighbors() {
                if !isValidCoordinate(neighbor) || visited.contains(neighbor) || occupiedCoords.contains(neighbor) {
                    continue
                }
                
                visited.insert(neighbor)
                var newPath = current.path
                newPath.append(neighbor)
                queue.append((neighbor, newPath))
            }
        }
        
        return nil
    }
}

// A single cell in the hex grid
struct HexCell {
    let coord: HexCoord
    var ship: Ship? = nil
    var obstacle: Obstacle? = nil
    
    // Check if this cell is occupied by any game object
    var isOccupied: Bool {
        return ship != nil || obstacle != nil
    }
}

// Types of obstacles that can be placed on the grid (for Squadron Leader variant)
enum Obstacle {
    case planet
    case asteroid
    case blackHole
    
    var canMoveTo: Bool {
        switch self {
        case .planet, .asteroid:
            return false
        case .blackHole:
            return true // Can move into black hole but ship is destroyed
        }
    }
    
    var damagesShips: Bool {
        switch self {
        case .asteroid:
            return true
        case .planet, .blackHole:
            return false
        }
    }
}

// Convert hex coordinates to screen coordinates
struct HexRenderer {
    let hexSize: CGFloat // Distance from center to any corner
    let orientation: HexOrientation
    
    enum HexOrientation {
        case pointyTop // Hexagons point up/down
        case flatTop // Hexagons have flat tops
    }
    
    init(hexSize: CGFloat, orientation: HexOrientation = .pointyTop) {
        self.hexSize = hexSize
        self.orientation = orientation
    }
    
    // Get the center position of a hex on the screen
    func hexToPixel(coord: HexCoord) -> CGPoint {
        switch orientation {
        case .pointyTop:
            let x = hexSize * (3.0/2.0 * CGFloat(coord.x))
            let y = hexSize * (sqrt(3)/2.0 * CGFloat(coord.x) + sqrt(3) * CGFloat(coord.z))
            return CGPoint(x: x, y: y)
        case .flatTop:
            let x = hexSize * (sqrt(3) * CGFloat(coord.x) + sqrt(3)/2.0 * CGFloat(coord.z))
            let y = hexSize * (3.0/2.0 * CGFloat(coord.z))
            return CGPoint(x: x, y: y)
        }
    }
    
    // Convert a screen position to the nearest hex coordinate
    func pixelToHex(point: CGPoint) -> HexCoord {
        switch orientation {
        case .pointyTop:
            let q = (2.0/3.0 * point.x) / hexSize
            let r = (-1.0/3.0 * point.x + sqrt(3)/3.0 * point.y) / hexSize
            return cubeRound(q: q, r: r)
        case .flatTop:
            let q = (sqrt(3)/3.0 * point.x - 1.0/3.0 * point.y) / hexSize
            let r = (2.0/3.0 * point.y) / hexSize
            return cubeRound(q: q, r: r)
        }
    }
    
    // Get the corner points of a hexagon for drawing
    func hexCornerPoints(center: CGPoint) -> [CGPoint] {
        var corners: [CGPoint] = []
        
        for i in 0..<6 {
            let angle = CGFloat(i) * CGFloat.pi / 3.0 + (orientation == .pointyTop ? 0 : CGFloat.pi / 6.0)
            let x = center.x + hexSize * cos(angle)
            let y = center.y + hexSize * sin(angle)
            corners.append(CGPoint(x: x, y: y))
        }
        
        return corners
    }
    
    // Helper function to convert fractional hex coordinates to nearest hex
    private func cubeRound(q: CGFloat, r: CGFloat) -> HexCoord {
        var x = q
        var z = r
        var y = -x - z
        
        var rx = round(x)
        var ry = round(y)
        var rz = round(z)
        
        let xDiff = abs(rx - x)
        let yDiff = abs(ry - y)
        let zDiff = abs(rz - z)
        
        if xDiff > yDiff && xDiff > zDiff {
            rx = -ry - rz
        } else if yDiff > zDiff {
            ry = -rx - rz
        } else {
            rz = -rx - ry
        }
        
        return HexCoord(x: Int(rx), y: Int(ry), z: Int(rz))
    }
}