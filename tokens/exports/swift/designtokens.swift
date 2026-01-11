//
// DesignTokens.swift
// Auto-generated from unified design tokens
// Generated: 2025-08-19T03:40:27.672Z
//

import SwiftUI
import UIKit

public enum DesignTokens {
    
    // MARK: - Colors
    public enum Colors {
        public enum Primary {
            public static let quantum = Color(hex: "#BF4080")
            public static let ultraMarine = Color(hex: "#5AC8FA")
            public static let violet = Color(hex: "#6A3093")
        }
        public enum Foundation {
            public static let heritage = Color(hex: "#331F4A")
            public static let darkMatter = Color(hex: "#131A36")
            public static let cosmicDust = Color(hex: "#1A0D26")
        }
        public enum Glass {
            public static let frosted = Color(red: 1, green: 1, blue: 1, opacity: 0.1)
            public static let shimmer = Color(red: 0.7490196078431373, green: 0.25098039215686274, blue: 0.5019607843137255, opacity: 0.2)
            public static let glow = Color(red: 0.35294117647058826, green: 0.7843137254901961, blue: 0.9803921568627451, opacity: 0.3)
        }
        public enum Semantic {
            public static let success = Color(hex: "#34C759")
            public static let warning = Color(hex: "#FF9500")
            public static let error = Color(hex: "#FF3B30")
            public static let info = Color(hex: "#007AFF")
        }
    }
    
    // MARK: - Spacing
    public enum Spacing {
        public static let base: CGFloat = 8
        public static let xs: CGFloat = 4
        public static let sm: CGFloat = 8
        public static let md: CGFloat = 16
        public static let lg: CGFloat = 24
        public static let xl: CGFloat = 32
        public static let xxl: CGFloat = 48
        public static let xxxl: CGFloat = 64
    }
    
    // MARK: - Typography
    public enum Typography {
        public enum Sizes {
            public static let xs: CGFloat = 11
            public static let sm: CGFloat = 13
            public static let body: CGFloat = 15
            public static let md: CGFloat = 17
            public static let lg: CGFloat = 20
            public static let xl: CGFloat = 24
            public static let xxl: CGFloat = 28
            public static let display: CGFloat = 34
            public static let hero: CGFloat = 48
        }
        public enum Weights {
            public static let light = Font.Weight.light
            public static let regular = Font.Weight.regular
            public static let medium = Font.Weight.medium
            public static let semibold = Font.Weight.semibold
            public static let bold = Font.Weight.bold
            public static let heavy = Font.Weight.heavy
        }
    }
    
    // MARK: - Glassmorphism
    public enum Glass {
        public enum Blur {
            public static let subtle: CGFloat = 8
            public static let medium: CGFloat = 16
            public static let strong: CGFloat = 24
            public static let intense: CGFloat = 32
        }
    }
}

// MARK: - Color Extension
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
