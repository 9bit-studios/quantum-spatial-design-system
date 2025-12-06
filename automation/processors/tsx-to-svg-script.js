#!/usr/bin/env node

/**
 * TSX to SVG Conversion Script
 * Extracts SVG content from React/Framer components and outputs optimized SVG files
 * 
 * Usage: node tsx-to-svg.js <input-file.tsx> [output-directory]
 */

const fs = require('fs');
const path = require('path');
const { transform } = require('@babel/core');
const parser = require('@babel/parser');
const generator = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const SVGO = require('svgo');

// Configure SVGO for optimization
const svgo = new SVGO({
  plugins: [
    { name: 'removeDoctype', active: true },
    { name: 'removeXMLProcInst', active: true },
    { name: 'removeComments', active: true },
    { name: 'removeMetadata', active: true },
    { name: 'removeEditorsNSData', active: true },
    { name: 'cleanupAttrs', active: true },
    { name: 'inlineStyles', active: true },
    { name: 'minifyStyles', active: true },
    { name: 'removeUselessDefs', active: true },
    { name: 'cleanupNumericValues', active: true },
    { name: 'convertColors', active: true },
    { name: 'removeUnknownsAndDefaults', active: true },
    { name: 'removeNonInheritableGroupAttrs', active: true },
    { name: 'removeUselessStrokeAndFill', active: true },
    { name: 'cleanupEnableBackground', active: true },
    { name: 'removeHiddenElems', active: true },
    { name: 'removeEmptyText', active: true },
    { name: 'convertShapeToPath', active: false }, // Keep shapes as is
    { name: 'moveElemsAttrsToGroup', active: true },
    { name: 'moveGroupAttrsToElems', active: true },
    { name: 'collapseGroups', active: false }, // Keep group structure
    { name: 'convertPathData', active: true },
    { name: 'convertTransform', active: true },
    { name: 'removeEmptyAttrs', active: true },
    { name: 'removeEmptyContainers', active: true },
    { name: 'mergePaths', active: false }, // Keep paths separate for animation
    { name: 'removeUnusedNS', active: true },
    { name: 'sortAttrs', active: true },
    { name: 'removeTitle', active: false }, // Keep titles for accessibility
    { name: 'removeDesc', active: false }, // Keep descriptions for accessibility
    { name: 'removeDimensions', active: false }, // Keep width/height
    { name: 'removeAttrs', active: false }, // Keep all attributes
    { name: 'removeAttributesBySelector', active: false },
    { name: 'removeElementsByAttr', active: false },
    { name: 'addClassesToSVGElement', active: false },
    { name: 'removeStyleElement', active: false }, // Keep style elements
    { name: 'removeScriptElement', active: false } // Keep script elements for animations
  ]
});

// Parse command line arguments
const args = process.argv.slice(2);
const inputFile = args[0];
const outputDir = args[1] || path.dirname(inputFile);

if (!inputFile) {
  console.error('Please provide an input TSX file');
  process.exit(1);
}

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Process the TSX file
async function processTsxFile(filePath) {
  try {
    // Read the file content
    const code = fs.readFileSync(filePath, 'utf8');
    const componentName = path.basename(filePath, path.extname(filePath));
    
    // Parse the TSX code
    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });
    
    // Find SVG elements in the React component
    const svgNodes = [];
    
    traverse(ast, {
      JSXElement(path) {
        const openingElement = path.node.openingElement;
        if (openingElement.name.name === 'svg') {
          svgNodes.push(path.node);
        }
      }
    });
    
    if (svgNodes.length === 0) {
      console.warn(`No SVG elements found in ${filePath}`);
      return;
    }
    
    // Process each SVG node
    for (let i = 0; i < svgNodes.length; i++) {
      const svgNode = svgNodes[i];
      
      // Handle dynamic props and conditional rendering
      transformDynamicProps(svgNode);
      
      // Extract the SVG code
      const { code: svgCode } = generator(svgNode);
      
      // Transform JSX to normal HTML/SVG syntax
      let transformedSvg = svgCode
        .replace(/className=/g, 'class=')
        .replace(/strokeWidth=/g, 'stroke-width=')
        .replace(/strokeLinecap=/g, 'stroke-linecap=')
        .replace(/strokeLinejoin=/g, 'stroke-linejoin=')
        .replace(/strokeDasharray=/g, 'stroke-dasharray=')
        .replace(/strokeDashoffset=/g, 'stroke-dashoffset=')
        .replace(/fillRule=/g, 'fill-rule=')
        .replace(/clipRule=/g, 'clip-rule=')
        .replace(/stopColor=/g, 'stop-color=')
        .replace(/stopOpacity=/g, 'stop-opacity=')
        .replace(/fillOpacity=/g, 'fill-opacity=')
        .replace(/strokeOpacity=/g, 'stroke-opacity=')
        .replace(/fontFamily=/g, 'font-family=')
        .replace(/fontSize=/g, 'font-size=')
        .replace(/textAnchor=/g, 'text-anchor=')
        .replace(/xmlSpace=/g, 'xml:space=')
        .replace(/viewBox=/g, 'viewBox=');
      
      // Fix self-closing tags
      transformedSvg = transformedSvg.replace(/<(\w+)([^>]*)><\/\1>/g, '<$1$2 />');
      
      // Replace JSX expressions
      transformedSvg = transformedSvg.replace(/\{([^{}]+)\}/g, (match, expr) => {
        // Try to evaluate simple expressions
        try {
          // Handle string concatenations
          if (expr.includes('+')) {
            const parts = expr.split('+').map(p => p.trim());
            const evaluatedParts = parts.map(p => {
              if (p.startsWith("'") || p.startsWith('"')) {
                return p.slice(1, -1);
              }
              return p;
            });
            return evaluatedParts.join('');
          }
          
          // Handle simple string expressions
          if (expr.startsWith("'") || expr.startsWith('"')) {
            return expr.slice(1, -1);
          }
          
          // Handle simple number expressions
          if (!isNaN(expr)) {
            return expr;
          }
          
          // Default values for complex expressions
          return "0";
        } catch (e) {
          console.warn(`Could not evaluate expression: ${expr}`);
          return "0";
        }
      });
      
      // Optimize the SVG
      const optimizedSvg = await svgo.optimize(transformedSvg);
      
      // Write the SVG file
      const outputFileName = i === 0 ? 
        `${componentName}.svg` : 
        `${componentName}-${i + 1}.svg`;
      const outputPath = path.join(outputDir, outputFileName);
      
      fs.writeFileSync(outputPath, optimizedSvg.data);
      console.log(`Created: ${outputPath}`);
    }
    
  } catch (error) {
    console.error(`Error processing ${inputFile}:`, error);
    process.exit(1);
  }
}

// Transform dynamic props into static values
function transformDynamicProps(node) {
  // Handle attributes
  node.openingElement.attributes.forEach(attr => {
    if (attr.type === 'JSXAttribute' && attr.value && attr.value.type === 'JSXExpressionContainer') {
      // Convert dynamic expressions to static values where possible
      if (attr.value.expression.type === 'ConditionalExpression') {
        attr.value = t.stringLiteral(transformConditional(attr.value.expression));
      } else if (attr.value.expression.type === 'LogicalExpression') {
        attr.value = t.stringLiteral(transformLogical(attr.value.expression));
      } else if (attr.value.expression.type === 'BinaryExpression') {
        attr.value = t.stringLiteral(transformBinary(attr.value.expression));
      } else if (attr.value.expression.type === 'MemberExpression') {
        attr.value = t.stringLiteral('prop.value');
      } else if (attr.value.expression.type === 'Identifier') {
        attr.value = t.stringLiteral('value');
      }
    }
  });
  
  // Process children recursively
  if (node.children) {
    node.children.forEach(child => {
      if (child.type === 'JSXElement') {
        transformDynamicProps(child);
      } else if (child.type === 'JSXExpressionContainer') {
        // Replace expression containers with text nodes where possible
        if (child.expression.type === 'ConditionalExpression') {
          child.type = 'JSXText';
          child.value = transformConditional(child.expression);
        }
      }
    });
  }
}

// Helper functions to transform expressions
function transformConditional(expr) {
  // Choose the consequent (true case) for conditional expressions
  return 'value';
}

function transformLogical(expr) {
  // For logical AND (&&), take the right side
  if (expr.operator === '&&') {
    return 'value';
  }
  // For logical OR (||), take the left side
  return 'value';
}

function transformBinary(expr) {
  // For simple binary expressions, return a placeholder
  return 'value';
}

// Main execution
processTsxFile(inputFile).then(() => {
  console.log('Conversion complete!');
}).catch(err => {
  console.error('Conversion failed:', err);
  process.exit(1);
});
