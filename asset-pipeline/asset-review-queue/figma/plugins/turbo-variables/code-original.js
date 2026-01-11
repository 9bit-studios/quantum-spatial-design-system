"use strict";
// Quantum-Spatial Color System Creator for Figma
// Extracts from variables.css and creates Figma Variables
// Core Quantum-Spatial Color Palette
// Extracted from variables.css
const QUANTUM_SPATIAL_COLORS = [
    // === FOUNDATION ===
    { name: 'void-black', value: '#0A0621', category: 'foundation' },
    { name: 'deep-space-indigo', value: '#131A36', category: 'foundation' },
    { name: 'ultra-indigo', value: '#1E1F5C', category: 'foundation' },
    { name: 'dimensional-eggplant', value: '#331F4A', category: 'foundation' },
    { name: 'midnight-richness', value: '#0D0D15', category: 'foundation' },
    { name: 'quantum-violet', value: '#6A3093', category: 'foundation' },
    { name: 'ultra-marine', value: '#405DE5', category: 'foundation' },
    { name: 'ultra-violet', value: '#613FE7', category: 'foundation' },
    // === SECONDARY ACCENTS ===
    { name: 'subtle-cyan', value: '#5AC8FA', category: 'accent' },
    { name: 'dimensional-teal', value: '#126D71', category: 'accent' },
    { name: 'rose-energy', value: '#BF4080', category: 'accent' },
    { name: 'quantum-pulse-pink', value: '#FF2D55', category: 'accent' },
    { name: 'dimensional-orange', value: '#FF6B6B', category: 'accent' },
    // === HERITAGE SYSTEM ===
    { name: 'heritage-green', value: '#2C5F2D', category: 'heritage' },
    { name: 'heritage-green-light', value: '#3D8B40', category: 'heritage' },
    { name: 'heritage-green-dark', value: '#1B3D1A', category: 'heritage' },
    { name: 'heritage-pixel-green', value: '#3DFF74', category: 'heritage' },
    { name: 'heritage-pixel-aqua', value: '#00FFC8', category: 'heritage' },
    { name: 'ultra-heritage-pixel-green', value: '#94FE00', category: 'heritage' },
    // === FUNCTIONAL COLORS ===
    { name: 'primary-action', value: '#5AC8FA', category: 'functional' },
    { name: 'secondary-action', value: '#126D71', category: 'functional' },
    { name: 'tertiary-action', value: '#613FE7', category: 'functional' },
    // === SEMANTIC ===
    { name: 'destructive', value: '#BF4080', category: 'semantic' },
    { name: 'success', value: '#2C5F2D', category: 'semantic' },
    { name: 'warning', value: '#FF6B6B', category: 'semantic' },
    { name: 'info', value: '#5AC8FA', category: 'semantic' },
];
// Glassmorphism Material Colors
const GLASS_MATERIALS = [
    { name: 'glass-background-subtle', value: 'rgba(19, 26, 54, 0.4)', category: 'foundation' },
    { name: 'glass-background-medium', value: 'rgba(19, 26, 54, 0.6)', category: 'foundation' },
    { name: 'glass-background-prominent', value: 'rgba(19, 26, 54, 0.8)', category: 'foundation' },
    { name: 'glass-background-heritage', value: 'rgba(44, 95, 45, 0.4)', category: 'heritage' },
    { name: 'glass-background-quantum', value: 'rgba(106, 48, 147, 0.4)', category: 'foundation' },
    { name: 'glass-border-color', value: 'rgba(90, 200, 250, 0.2)', category: 'accent' },
    { name: 'glass-border-color-heritage', value: 'rgba(61, 255, 116, 0.2)', category: 'heritage' },
    { name: 'glass-border-color-quantum', value: 'rgba(191, 64, 128, 0.2)', category: 'accent' },
];
function hexToRgb(hex) {
    // Handle rgba() format
    if (hex.startsWith('rgba')) {
        const match = hex.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (match) {
            return {
                r: parseInt(match[1]) / 255,
                g: parseInt(match[2]) / 255,
                b: parseInt(match[3]) / 255,
            };
        }
    }
    // Handle hex format
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result)
        throw new Error(`Invalid color: ${hex}`);
    return {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
    };
}
async function createQuantumSpatialSystem() {
    try {
        // Create or get the collection
        let collection = figma.variables.getLocalVariableCollections()
            .find(c => c.name === 'Quantum-Spatial');
        if (!collection) {
            collection = figma.variables.createVariableCollection('Quantum-Spatial');
            figma.notify('✨ Created Quantum-Spatial collection');
        }
        else {
            figma.notify('♻️ Updating existing Quantum-Spatial collection');
        }
        const mode = collection.modes[0];
        // Statistics
        let created = 0;
        let updated = 0;
        let skipped = 0;
        // Combine all colors
        const allColors = [...QUANTUM_SPATIAL_COLORS, ...GLASS_MATERIALS];
        // Process each color
        for (const colorDef of allColors) {
            try {
                // Check if variable already exists
                const existing = figma.variables.getLocalVariables('COLOR')
                    .find(v => v.name === colorDef.name);
                // Convert color value
                let rgb;
                try {
                    rgb = hexToRgb(colorDef.value);
                }
                catch (e) {
                    console.warn(`Skipping ${colorDef.name}: ${e}`);
                    skipped++;
                    continue;
                }
                if (existing) {
                    // Update existing
                    existing.setValueForMode(mode.modeId, rgb);
                    updated++;
                }
                else {
                    // Create new
                    const variable = figma.variables.createVariable(colorDef.name, collection, 'COLOR');
                    variable.setValueForMode(mode.modeId, rgb);
                    // Add description based on category
                    const descriptions = {
                        foundation: '🌌 Core foundation color',
                        accent: '✨ Accent and highlight color',
                        heritage: '🎮 Gaming heritage color',
                        functional: '🎯 Functional UI color',
                        semantic: '⚠️ Semantic state color'
                    };
                    variable.description = descriptions[colorDef.category];
                    created++;
                }
            }
            catch (error) {
                console.error(`Error processing ${colorDef.name}:`, error);
                skipped++;
            }
        }
        // Summary
        const total = allColors.length;
        figma.notify(`✅ Quantum-Spatial System Ready!` +
            `Created: ${created} | Updated: ${updated} | Skipped: ${skipped} | Total: ${total}`, { timeout: 5000 });
        // Log summary to console
        console.log('=== QUANTUM-SPATIAL COLOR SYSTEM ===');
        console.log(`Total colors defined: ${total}`);
        console.log(`Created: ${created}`);
        console.log(`Updated: ${updated}`);
        console.log(`Skipped: ${skipped}`);
        console.log('Categories:');
        console.log(`  Foundation: ${allColors.filter(c => c.category === 'foundation').length}`);
        console.log(`  Accent: ${allColors.filter(c => c.category === 'accent').length}`);
        console.log(`  Heritage: ${allColors.filter(c => c.category === 'heritage').length}`);
        console.log(`  Functional: ${allColors.filter(c => c.category === 'functional').length}`);
        console.log(`  Semantic: ${allColors.filter(c => c.category === 'semantic').length}`);
    }
    catch (error) {
        const err = error;
        figma.notify(`❌ Error: ${err.message}`, { error: true });
        console.error('Error creating system:', error);
    }
}
// Run the plugin
createQuantumSpatialSystem().then(() => {
    figma.closePlugin();
});
