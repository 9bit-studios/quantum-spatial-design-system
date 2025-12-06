#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option('input', {
    alias: 'i',
    description: 'Input SVG file',
    type: 'string',
    demandOption: true
  })
  .option('output', {
    alias: 'o',
    description: 'Output TSX file',
    type: 'string',
    demandOption: true
  })
  .option('name', {
    alias: 'n',
    description: 'Component name',
    type: 'string'
  })
  .option('template', {
    alias: 't',
    description: 'Component template file',
    type: 'string',
    default: 'default-component-template.js'
  })
  .option('stateImplementation', {
    alias: 's',
    description: 'Implement quantum states',
    type: 'boolean',
    default: false
  })
  .help()
  .alias('help', 'h')
  .argv;

// Function to sanitize component name
function sanitizeComponentName(name) {
  // Remove file extension
  name = path.basename(name, path.extname(name));
  
  // Convert kebab-case to PascalCase
  const pascalCase = name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  
  // Ensure name starts with a letter
  if (!/^[A-Za-z]/.test(pascalCase)) {
    return 'Component' + pascalCase;
  }
  
  return pascalCase;
}

// Main function
async function convertSvgToTsx() {
  try {
    // Get component name
    const componentName = argv.name || sanitizeComponentName(argv.input);
    
    // Read SVG file
    const svgContent = fs.readFileSync(argv.input, 'utf8');
    
    // Parse SVG
    const dom = new JSDOM(svgContent);
    const document = dom.window.document;
    const svgElement = document.querySelector('svg');
    
    if (!svgElement) {
      throw new Error('No SVG element found in file');
    }
    
    // Extract SVG attributes
    const attributes = Array.from(svgElement.attributes).reduce((obj, attr) => {
      obj[attr.name] = attr.value;
      return obj;
    }, {});
    
    // Extract SVG content (innerHTML)
    const innerSvgContent = svgElement.innerHTML;
    
    // Rebuild SVG with React-friendly attributes
    let processedSvg = '<svg';
    
    // Add SVG attributes
    for (const [name, value] of Object.entries(attributes)) {
      // Convert kebab-case attributes to camelCase for React
      if (name === 'class') {
        processedSvg += ` className="${value}"`;
      } else if (name === 'viewbox') {
        processedSvg += ` viewBox="${value}"`;
      } else if (name.includes('-')) {
        const camelCase = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        processedSvg += ` ${camelCase}="${value}"`;
      } else {
        processedSvg += ` ${name}="${value}"`;
      }
    }
    
    // Close opening tag and add content
    processedSvg += '>';
    processedSvg += innerSvgContent;
    processedSvg += '</svg>';
    
    // Load template
    let templatePath = argv.template;
    if (!path.isAbsolute(templatePath)) {
      // Try script directory
      let localPath = path.join(__dirname, templatePath);
      if (!fs.existsSync(localPath)) {
        // Try templates directory in script directory
        localPath = path.join(__dirname, 'templates', templatePath);
        if (!fs.existsSync(localPath)) {
          // Default to using default template
          localPath = path.join(__dirname, 'default-component-template.js');
          if (!fs.existsSync(localPath)) {
            // Create default template on the fly
            const defaultTemplate = `// Default Component Template
module.exports = (componentName, svgContent, options) => {
  return \`import React from 'react';

export interface \${componentName}Props {
  /** Width of the SVG */
  width?: number | string;
  /** Height of the SVG */
  height?: number | string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional className for styling */
  className?: string;
}

/**
 * \${componentName} - A component generated from SVG
 */
export const \${componentName}: React.FC<\${componentName}Props> = ({
  width,
  height,
  onClick,
  className = '',
}) => {
  return (
    <div 
      className={\\\`quantum-svg-component \\\${className}\\\`}
      onClick={onClick}
    >
      \${svgContent.replace(/width="([^"]+)"/, 'width={width || "$1"}')
                    .replace(/height="([^"]+)"/, 'height={height || "$1"}')}
    </div>
  );
};

export default \${componentName};
\`};`;
            
            fs.writeFileSync(path.join(__dirname, 'default-component-template.js'), defaultTemplate);
            localPath = path.join(__dirname, 'default-component-template.js');
          }
        }
      }
      templatePath = localPath;
    }
    
    const templateFn = require(templatePath);
    
    // Generate component code
    const componentCode = templateFn(componentName, processedSvg, {
      stateImplementation: argv.stateImplementation
    });
    
    // Write output file
    fs.writeFileSync(argv.output, componentCode);
    
    console.log(`Successfully converted ${argv.input} to ${argv.output}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
convertSvgToTsx();
