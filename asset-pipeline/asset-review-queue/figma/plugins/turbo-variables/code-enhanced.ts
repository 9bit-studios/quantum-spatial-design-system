// Enhanced Quantum-Spatial Figma Plugin
// Bidirectional Sync: Extract, Create, Validate, Import

interface ColorToken {
  name: string;
  value: string;
  category: 'foundation' | 'accent' | 'heritage' | 'functional' | 'semantic' | 'extracted';
  source?: string; // Component name where color was found
  usage?: number;  // Number of times used
}

interface StyleExtraction {
  colors: ColorToken[];
  timestamp: string;
  figmaFileKey: string;
  extractedFrom: string;
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'extract-styles') {
    await extractStylesFromSelection();
  } else if (msg.type === 'create-variables') {
    await createVariablesFromLocal();
  } else if (msg.type === 'import-json') {
    await importFromJSON(msg.data);
  } else if (msg.type === 'validate-styles') {
    await validateStyles();
  } else if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};

// ========== EXTRACT STYLES FROM SELECTION ==========

async function extractStylesFromSelection() {
  const selection = figma.currentPage.selection;

  if (selection.length === 0) {
    figma.notify('⚠️ Please select components to extract styles from', { error: true });
    return;
  }

  try {
    const colorMap = new Map<string, ColorToken>();
    let extractedFrom = '';

    // Extract from each selected node
    for (const node of selection) {
      if ('name' in node) {
        extractedFrom += node.name + ', ';
      }

      await extractColorsFromNode(node, colorMap);
    }

    // Convert map to array
    const colors = Array.from(colorMap.values());

    // Create extraction object
    const extraction: StyleExtraction = {
      colors,
      timestamp: new Date().toISOString(),
      figmaFileKey: figma.fileKey || 'unknown',
      extractedFrom: extractedFrom.slice(0, -2)
    };

    // Send to UI for download
    figma.ui.postMessage({
      type: 'export-extraction',
      data: extraction
    });

    figma.notify(`✅ Extracted ${colors.length} unique colors from ${selection.length} components`, { timeout: 3000 });

  } catch (error: unknown) {
    const err = error as Error;
    figma.notify(`❌ Error: ${err.message}`, { error: true });
    console.error('Error extracting styles:', error);
  }
}

// ========== EXTRACT COLORS FROM NODE (RECURSIVE) ==========

async function extractColorsFromNode(node: SceneNode, colorMap: Map<string, ColorToken>) {
  // Extract fills
  if ('fills' in node && Array.isArray(node.fills)) {
    for (const fill of node.fills) {
      if (fill.type === 'SOLID' && fill.visible !== false) {
        const hex = rgbToHex(fill.color, fill.opacity);
        const token = createToken(hex, node, 'fill');

        if (token) {
          const existing = colorMap.get(token.value);
          if (existing) {
            existing.usage! += 1;
          } else {
            colorMap.set(token.value, token);
          }
        }
      }
    }
  }

  // Extract strokes
  if ('strokes' in node && Array.isArray(node.strokes)) {
    for (const stroke of node.strokes) {
      if (stroke.type === 'SOLID' && stroke.visible !== false) {
        const hex = rgbToHex(stroke.color, stroke.opacity);
        const token = createToken(hex, node, 'stroke');

        if (token) {
          const existing = colorMap.get(token.value);
          if (existing) {
            existing.usage! += 1;
          } else {
            colorMap.set(token.value, token);
          }
        }
      }
    }
  }

  // Extract from effects (shadows, glows)
  if ('effects' in node && Array.isArray(node.effects)) {
    for (const effect of node.effects) {
      if (effect.visible !== false && 'color' in effect) {
        const hex = rgbToHex(effect.color, effect.color.a);
        const token = createToken(hex, node, 'effect');

        if (token) {
          const existing = colorMap.get(token.value);
          if (existing) {
            existing.usage! += 1;
          } else {
            colorMap.set(token.value, token);
          }
        }
      }
    }
  }

  // Recurse into children
  if ('children' in node) {
    for (const child of node.children) {
      await extractColorsFromNode(child, colorMap);
    }
  }
}

// ========== CREATE TOKEN FROM COLOR ==========

function createToken(hex: string, node: SceneNode, type: 'fill' | 'stroke' | 'effect'): ColorToken | null {
  // Skip fully transparent colors
  if (hex.endsWith('00')) return null;

  // Generate meaningful name from node and type
  let name = '';
  if ('name' in node) {
    const nodeName = node.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    name = `${nodeName}-${type}`;
  } else {
    name = `extracted-${type}-${hex.slice(1, 7)}`;
  }

  // Determine category based on color properties
  const category = categorizeColor(hex);

  return {
    name,
    value: hex,
    category,
    source: 'name' in node ? node.name : 'Unknown',
    usage: 1
  };
}

// ========== CATEGORIZE COLOR ==========

function categorizeColor(hex: string): ColorToken['category'] {
  // Simple heuristic based on color analysis
  const rgb = convertHexToRgb(hex);

  // Calculate brightness
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

  // Calculate saturation
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  const min = Math.min(rgb.r, rgb.g, rgb.b);
  const saturation = max === 0 ? 0 : (max - min) / max;

  // Dark, low saturation = foundation
  if (brightness < 0.2 && saturation < 0.3) {
    return 'foundation';
  }

  // Bright, high saturation = accent
  if (brightness > 0.4 && saturation > 0.5) {
    return 'accent';
  }

  // Green tones = heritage (gaming)
  if (rgb.g > rgb.r && rgb.g > rgb.b && saturation > 0.3) {
    return 'heritage';
  }

  // Default
  return 'extracted';
}

// ========== RGB TO HEX CONVERSION ==========

function rgbToHex(color: RGB, opacity?: number): string {
  const r = Math.round(color.r * 255).toString(16).padStart(2, '0');
  const g = Math.round(color.g * 255).toString(16).padStart(2, '0');
  const b = Math.round(color.b * 255).toString(16).padStart(2, '0');
  const a = opacity !== undefined ? Math.round(opacity * 255).toString(16).padStart(2, '0') : '';

  return `#${r}${g}${b}${a}`.toUpperCase();
}

// ========== HEX TO RGB CONVERSION ==========

function convertHexToRgb(hex: string): RGB {
  // Remove alpha if present
  const cleanHex = hex.slice(0, 7);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  if (!result) throw new Error(`Invalid hex color: ${hex}`);

  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  };
}

// ========== CREATE VARIABLES FROM LOCAL ==========

async function createVariablesFromLocal() {
  // This is the existing functionality from code.ts
  const QUANTUM_SPATIAL_COLORS: ColorToken[] = [
    // Foundation
    { name: 'void-black', value: '#0A0621', category: 'foundation' },
    { name: 'deep-space-indigo', value: '#131A36', category: 'foundation' },
    { name: 'ultra-indigo', value: '#1E1F5C', category: 'foundation' },
    { name: 'dimensional-eggplant', value: '#331F4A', category: 'foundation' },
    { name: 'midnight-richness', value: '#0D0D15', category: 'foundation' },
    { name: 'quantum-violet', value: '#6A3093', category: 'foundation' },
    { name: 'ultra-marine', value: '#405DE5', category: 'foundation' },
    { name: 'ultra-violet', value: '#613FE7', category: 'foundation' },

    // Accents
    { name: 'subtle-cyan', value: '#5AC8FA', category: 'accent' },
    { name: 'dimensional-teal', value: '#126D71', category: 'accent' },
    { name: 'rose-energy', value: '#BF4080', category: 'accent' },
    { name: 'quantum-pulse-pink', value: '#FF2D55', category: 'accent' },
    { name: 'dimensional-orange', value: '#FF6B6B', category: 'accent' },

    // Heritage
    { name: 'heritage-green', value: '#2C5F2D', category: 'heritage' },
    { name: 'heritage-green-light', value: '#3D8B40', category: 'heritage' },
    { name: 'heritage-green-dark', value: '#1B3D1A', category: 'heritage' },
    { name: 'heritage-pixel-green', value: '#3DFF74', category: 'heritage' },
    { name: 'heritage-pixel-aqua', value: '#00FFC8', category: 'heritage' },
    { name: 'ultra-heritage-pixel-green', value: '#94FE00', category: 'heritage' },

    // Functional
    { name: 'primary-action', value: '#5AC8FA', category: 'functional' },
    { name: 'secondary-action', value: '#126D71', category: 'functional' },
    { name: 'tertiary-action', value: '#613FE7', category: 'functional' },

    // Semantic
    { name: 'destructive', value: '#BF4080', category: 'semantic' },
    { name: 'success', value: '#2C5F2D', category: 'semantic' },
    { name: 'warning', value: '#FF6B6B', category: 'semantic' },
    { name: 'info', value: '#5AC8FA', category: 'semantic' },
  ];

  try {
    let collection = figma.variables.getLocalVariableCollections()
      .find(c => c.name === 'Quantum-Spatial');

    if (!collection) {
      collection = figma.variables.createVariableCollection('Quantum-Spatial');
    }

    const mode = collection.modes[0];
    let created = 0;
    let updated = 0;

    for (const colorDef of QUANTUM_SPATIAL_COLORS) {
      const existing = figma.variables.getLocalVariables('COLOR')
        .find(v => v.name === colorDef.name);

      const rgb = convertHexToRgb(colorDef.value);

      if (existing) {
        existing.setValueForMode(mode.modeId, rgb);
        updated++;
      } else {
        const variable = figma.variables.createVariable(
          colorDef.name,
          collection,
          'COLOR'
        );
        variable.setValueForMode(mode.modeId, rgb);

        const descriptions = {
          foundation: '🌌 Core foundation color',
          accent: '✨ Accent and highlight color',
          heritage: '🎮 Gaming heritage color',
          functional: '🎯 Functional UI color',
          semantic: '⚠️ Semantic state color',
          extracted: '📤 Extracted from design'
        };
        variable.description = descriptions[colorDef.category];

        created++;
      }
    }

    figma.notify(
      `✅ Quantum-Spatial: ${created} created, ${updated} updated`,
      { timeout: 3000 }
    );

  } catch (error: unknown) {
    const err = error as Error;
    figma.notify(`❌ Error: ${err.message}`, { error: true });
  }
}

// ========== IMPORT FROM JSON ==========

async function importFromJSON(jsonData: StyleExtraction) {
  try {
    let collection = figma.variables.getLocalVariableCollections()
      .find(c => c.name === 'Quantum-Spatial-Imported');

    if (!collection) {
      collection = figma.variables.createVariableCollection('Quantum-Spatial-Imported');
    }

    const mode = collection.modes[0];
    let created = 0;
    let updated = 0;

    for (const colorToken of jsonData.colors) {
      const existing = figma.variables.getLocalVariables('COLOR')
        .find(v => v.name === colorToken.name);

      const rgb = convertHexToRgb(colorToken.value);

      if (existing) {
        existing.setValueForMode(mode.modeId, rgb);
        updated++;
      } else {
        const variable = figma.variables.createVariable(
          colorToken.name,
          collection,
          'COLOR'
        );
        variable.setValueForMode(mode.modeId, rgb);
        variable.description = `Imported from: ${colorToken.source || 'Unknown'}`;
        created++;
      }
    }

    figma.notify(
      `✅ Imported: ${created} created, ${updated} updated`,
      { timeout: 3000 }
    );

  } catch (error: unknown) {
    const err = error as Error;
    figma.notify(`❌ Import Error: ${err.message}`, { error: true });
  }
}

// ========== VALIDATE STYLES ==========

async function validateStyles() {
  try {
    const localVariables = figma.variables.getLocalVariables('COLOR');
    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
      figma.notify('⚠️ Please select components to validate', { error: true });
      return;
    }

    const colorMap = new Map<string, ColorToken>();
    await extractColorsFromNode(selection[0], colorMap);
    const extractedColors = Array.from(colorMap.values());

    // Compare against local variables
    const matches: string[] = [];
    const mismatches: { name: string; figma: string; local: string }[] = [];
    const newInFigma: ColorToken[] = [];

    for (const extracted of extractedColors) {
      const variable = localVariables.find(v => v.name === extracted.name);

      if (!variable) {
        newInFigma.push(extracted);
      } else {
        // Check if color matches
        const collection = figma.variables.getVariableCollectionById(variable.variableCollectionId);
        if (collection) {
          const mode = collection.modes[0];
          const value = variable.valuesByMode[mode.modeId] as RGB;
          const localHex = rgbToHex(value);

          if (localHex.slice(0, 7) === extracted.value.slice(0, 7)) {
            matches.push(extracted.name);
          } else {
            mismatches.push({
              name: extracted.name,
              figma: extracted.value,
              local: localHex
            });
          }
        }
      }
    }

    // Send validation results to UI
    figma.ui.postMessage({
      type: 'validation-results',
      data: {
        matches,
        mismatches,
        newInFigma,
        total: extractedColors.length
      }
    });

  } catch (error: unknown) {
    const err = error as Error;
    figma.notify(`❌ Validation Error: ${err.message}`, { error: true });
  }
}

// ========== HTML UI ==========

const uiHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 16px;
      background: #131A36;
      color: #FFFFFF;
      margin: 0;
    }

    h1 {
      font-size: 18px;
      margin: 0 0 16px 0;
      color: #5AC8FA;
    }

    .mode-selector {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }

    .mode-button {
      padding: 16px;
      background: rgba(90, 200, 250, 0.1);
      border: 2px solid #5AC8FA;
      border-radius: 8px;
      color: #FFFFFF;
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
    }

    .mode-button:hover {
      background: rgba(90, 200, 250, 0.2);
      border-color: #6A3093;
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(90, 200, 250, 0.2);
    }

    .mode-button h3 {
      margin: 0 0 4px 0;
      font-size: 14px;
      color: #5AC8FA;
    }

    .mode-button p {
      margin: 0;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
    }

    #results {
      margin-top: 24px;
      padding: 16px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      display: none;
    }

    .color-swatch {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      margin-right: 8px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .cancel-button {
      margin-top: 16px;
      padding: 12px;
      background: rgba(191, 64, 128, 0.2);
      border: 1px solid #BF4080;
      border-radius: 8px;
      color: #FFFFFF;
      cursor: pointer;
      text-align: center;
    }

    .cancel-button:hover {
      background: rgba(191, 64, 128, 0.3);
    }
  </style>
</head>
<body>
  <h1>🌌 Quantum-Spatial Sync</h1>

  <div class="mode-selector">
    <button class="mode-button" onclick="extractStyles()">
      <h3>📤 Extract Styles from Figma</h3>
      <p>Select components → Extract colors → Export JSON</p>
    </button>

    <button class="mode-button" onclick="createVariables()">
      <h3>📥 Create Variables from Local</h3>
      <p>Import quantum-spatial colors into Figma variables</p>
    </button>

    <button class="mode-button" onclick="validateStyles()">
      <h3>🔍 Validate Figma vs Local</h3>
      <p>Compare selection against local token file</p>
    </button>
  </div>

  <div id="results"></div>

  <button class="cancel-button" onclick="cancel()">Cancel</button>

  <script>
    function extractStyles() {
      parent.postMessage({ pluginMessage: { type: 'extract-styles' } }, '*');
    }

    function createVariables() {
      parent.postMessage({ pluginMessage: { type: 'create-variables' } }, '*');
    }

    function validateStyles() {
      parent.postMessage({ pluginMessage: { type: 'validate-styles' } }, '*');
    }

    function cancel() {
      parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
    }

    // Handle messages from plugin
    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === 'export-extraction') {
        // Download JSON
        const json = JSON.stringify(msg.data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'figma-extracted-styles.json';
        a.click();

        document.getElementById('results').innerHTML =
          \`<p style="color: #5AC8FA;">✅ Exported \${msg.data.colors.length} colors!</p>
           <p style="font-size: 12px; color: rgba(255,255,255,0.6);">Saved to: figma-extracted-styles.json</p>\`;
        document.getElementById('results').style.display = 'block';
      }

      if (msg.type === 'validation-results') {
        const { matches, mismatches, newInFigma, total } = msg.data;

        let html = \`<h3 style="color: #5AC8FA;">Validation Results</h3>\`;
        html += \`<p>Total: \${total} | Matches: \${matches.length} | Mismatches: \${mismatches.length} | New: \${newInFigma.length}</p>\`;

        if (mismatches.length > 0) {
          html += \`<h4>Mismatches:</h4><ul>\`;
          mismatches.forEach(m => {
            html += \`<li>
              \${m.name}:
              <span class="color-swatch" style="background: \${m.figma};"></span>
              Figma: \${m.figma} vs
              <span class="color-swatch" style="background: \${m.local};"></span>
              Local: \${m.local}
            </li>\`;
          });
          html += \`</ul>\`;
        }

        document.getElementById('results').innerHTML = html;
        document.getElementById('results').style.display = 'block';
      }
    };
  </script>
</body>
</html>
`;

// ========== INITIALIZE UI ==========

figma.showUI(uiHtml, { width: 400, height: 600 });
