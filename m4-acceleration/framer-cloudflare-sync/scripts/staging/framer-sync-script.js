/**
 * Framer Synchronization Tool
 * Syncs design tokens and components with Framer
 */

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');

class FramerSync {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.teamId = config.teamId;
    this.projectId = config.projectId;
    this.tokensPath = config.tokensPath;
    this.componentsPath = config.componentsPath;
    this.apBaseUrl = 'https://api.framer.com/v1';
  }

  /**
   * Sync design tokens with Framer
   */
  async syncTokens() {
    console.log('📊 Syncing design tokens with Framer...');
    
    // Load design tokens
    const tokenFiles = fs.readdirSync(this.tokensPath)
      .filter(file => file.endsWith('.json'));
    
    if (tokenFiles.length === 0) {
      throw new Error('No token files found in ' + this.tokensPath);
    }
    
    // Process each token file
    for (const file of tokenFiles) {
      const state = file.replace('.json', '');
      console.log(`Processing tokens for state: ${state}`);
      
      const tokenData = JSON.parse(fs.readFileSync(path.join(this.tokensPath, file), 'utf8'));
      
      // Transform tokens to Framer format
      const framerTokens = this.transformTokensForFramer(tokenData, state);
      
      // Upload to Framer
      await this.uploadTokensToFramer(framerTokens, state);
    }
    
    console.log('✅ Design tokens synchronized successfully');
  }
  
  /**
   * Transform tokens to Framer format
   */
  transformTokensForFramer(tokenData, state) {
    // Framer expects a specific format for variables
    const framerTokens = {
      colors: {},
      spacing: {},
      typography: {},
      shadows: {},
      borders: {},
      opacities: {},
      easing: {},
      durations: {}
    };
    
    // Process color tokens
    if (tokenData.colors) {
      Object.entries(tokenData.colors).forEach(([category, colors]) => {
        Object.entries(colors).forEach(([name, value]) => {
          framerTokens.colors[`${state}-${category}-${name}`] = value;
        });
      });
    }
    
    // Process spacing tokens
    if (tokenData.spacing) {
      Object.entries(tokenData.spacing).forEach(([name, value]) => {
        framerTokens.spacing[`${state}-${name}`] = value;
      });
    }
    
    // Process typography tokens
    if (tokenData.typography) {
      Object.entries(tokenData.typography).forEach(([category, values]) => {
        Object.entries(values).forEach(([name, value]) => {
          framerTokens.typography[`${state}-${category}-${name}`] = value;
        });
      });
    }
    
    // Process shadow tokens
    if (tokenData.shadows) {
      Object.entries(tokenData.shadows).forEach(([name, value]) => {
        framerTokens.shadows[`${state}-${name}`] = value;
      });
    }
    
    // Process border tokens
    if (tokenData.borders) {
      Object.entries(tokenData.borders).forEach(([name, value]) => {
        framerTokens.borders[`${state}-${name}`] = value;
      });
    }
    
    // Process opacity tokens
    if (tokenData.opacities) {
      Object.entries(tokenData.opacities).forEach(([name, value]) => {
        framerTokens.opacities[`${state}-${name}`] = value;
      });
    }
    
    // Process animation tokens
    if (tokenData.animation) {
      // Easing
      if (tokenData.animation.easings) {
        Object.entries(tokenData.animation.easings).forEach(([name, value]) => {
          framerTokens.easing[`${state}-${name}`] = value;
        });
      }
      
      // Durations
      if (tokenData.animation.durations) {
        Object.entries(tokenData.animation.durations).forEach(([name, value]) => {
          framerTokens.durations[`${state}-${name}`] = value;
        });
      }
    }
    
    return framerTokens;
  }
  
  /**
   * Upload tokens to Framer
   */
  async uploadTokensToFramer(tokens, state) {
    console.log(`Uploading ${state} tokens to Framer...`);
    
    try {
      const response = await fetch(
        `${this.apBaseUrl}/teams/${this.teamId}/projects/${this.projectId}/variables`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tokens)
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to upload tokens: ${response.status} ${response.statusText}${errorText}`);
      }
      
      console.log(`✅ Successfully uploaded ${state} tokens to Framer`);
    } catch (error) {
      console.error(`Failed to upload tokens: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Sync components with Framer
   */
  async syncComponents() {
    console.log('🧩 Syncing components with Framer...');
    
    // Check if components directory exists
    if (!fs.existsSync(this.componentsPath)) {
      throw new Error('Components directory not found: ' + this.componentsPath);
    }
    
    // Get all component files
    const componentFiles = fs.readdirSync(this.componentsPath)
      .filter(file => file.endsWith('.tsx') || file.endsWith('.jsx'));
    
    if (componentFiles.length === 0) {
      throw new Error('No component files found in ' + this.componentsPath);
    }
    
    // Get existing component library or create a new one
    const libraryId = await this.getOrCreateComponentLibrary();
    
    // Process each component
    for (const file of componentFiles) {
      const componentName = path.basename(file, path.extname(file));
      console.log(`Processing component: ${componentName}`);
      
      const componentCode = fs.readFileSync(path.join(this.componentsPath, file), 'utf8');
      
      // Upload component to Framer
      await this.uploadComponentToFramer(libraryId, componentName, componentCode);
    }
    
    console.log('✅ Components synchronized successfully');
  }
  
  /**
   * Get existing component library or create a new one
   */
  async getOrCreateComponentLibrary() {
    console.log('Checking for existing component library...');
    
    try {
      // Get all component libraries
      const response = await fetch(
        `${this.apBaseUrl}/teams/${this.teamId}/component-libraries`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to get component libraries: ${response.status} ${response.statusText}`);
      }
      
      const libraries = await response.json();
      
      // Look for "Quantum-Spatial Design System" library
      const existingLibrary = libraries.find(lib => lib.name === 'Quantum-Spatial Design System');
      
      if (existingLibrary) {
        console.log(`Found existing library: ${existingLibrary.name} (ID: ${existingLibrary.id})`);
        return existingLibrary.id;
      }
      
      // Create a new library
      console.log('Creating new component library...');
      
      const createResponse = await fetch(
        `${this.apBaseUrl}/teams/${this.teamId}/component-libraries`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: 'Quantum-Spatial Design System',
            description: 'Official component library for the 9Bit Studios Quantum-Spatial design system'
          })
        }
      );
      
      if (!createResponse.ok) {
        throw new Error(`Failed to create library: ${createResponse.status} ${createResponse.statusText}`);
      }
      
      const newLibrary = await createResponse.json();
      console.log(`Created new library: ${newLibrary.name} (ID: ${newLibrary.id})`);
      
      return newLibrary.id;
    } catch (error) {
      console.error(`Failed to get or create component library: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Upload component to Framer
   */
  async uploadComponentToFramer(libraryId, componentName, componentCode) {
    console.log(`Uploading component: ${componentName}`);
    
    try {
      // Generate a preview image for the component
      const previewImagePath = await this.generateComponentPreview(componentName);
      
      // Create form data
      const formData = new FormData();
      formData.append('name', componentName);
      formData.append('code', componentCode);
      
      // Add preview image if available
      if (previewImagePath && fs.existsSync(previewImagePath)) {
        formData.append('preview', fs.createReadStream(previewImagePath));
      }
      
      // Add properties metadata
      const properties = this.extractComponentProps(componentCode);
      formData.append('properties', JSON.stringify(properties));
      
      // Upload component
      const response = await fetch(
        `${this.apBaseUrl}/teams/${this.teamId}/component-libraries/${libraryId}/components`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: formData
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to upload component: ${response.status} ${response.statusText}${errorText}`);
      }
      
      console.log(`✅ Successfully uploaded component: ${componentName}`);
    } catch (error) {
      console.error(`Failed to upload component ${componentName}: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Generate a preview image for a component
   */
  async generateComponentPreview(componentName) {
    console.log(`Generating preview for: ${componentName}`);
    
    const previewsDir = path.join(process.cwd(), 'previews');
    
    // Ensure previews directory exists
    if (!fs.existsSync(previewsDir)) {
      fs.mkdirSync(previewsDir, { recursive: true });
    }
    
    const previewPath = path.join(previewsDir, `${componentName}.png`);
    
    // If preview already exists, return the path
    if (fs.existsSync(previewPath)) {
      return previewPath;
    }
    
    try {
      // Here we could implement an actual rendering process using Puppeteer
      // For now, we'll use a placeholder generator
      await this.generatePlaceholderPreview(componentName, previewPath);
      return previewPath;
    } catch (error) {
      console.warn(`Failed to generate preview for ${componentName}: ${error.message}`);
      return null; // Continue without a preview
    }
  }
  
  /**
   * Generate a placeholder preview image
   * In a production system, this would be replaced with an actual rendering
   */
  async generatePlaceholderPreview(componentName, outputPath) {
    // This is a placeholder implementation
    // In a real system, you would use something like Puppeteer to render the component
    console.log(`Creating placeholder preview for ${componentName}`);
    
    // For now, we'll create a simple placeholder using the Canvas API
    // In production, use a proper rendering solution
    const { createCanvas } = require('canvas');
    
    // Create a 600x400 canvas
    const canvas = createCanvas(600, 400);
    const ctx = canvas.getContext('2d');
    
    // Fill with deep space indigo background
    ctx.fillStyle = '#131A36';
    ctx.fillRect(0, 0, 600, 400);
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(90, 200, 250, 0.1)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let y = 0; y < 400; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(600, y);
      ctx.stroke();
    }
    
    // Vertical grid lines
    for (let x = 0; x < 600; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 400);
      ctx.stroke();
    }
    
    // Draw component name
    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(componentName, 300, 180);
    
    // Draw quantum-spatial design system text
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#5AC8FA';
    ctx.fillText('Quantum-Spatial Design System', 300, 220);
    
    // Save to file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    
    return outputPath;
  }
  
  /**
   * Extract component props from code
   */
  extractComponentProps(componentCode) {
    try {
      // This is a simple implementation
      // In a real system, you would use a proper TS/JS parser
      const propTypesMatch = componentCode.match(/interface\s+(\w+)Props\s*{([^}]*)}/s);
      
      if (!propTypesMatch) {
        return []; // No props found
      }
      
      const propsBlock = propTypesMatch[2];
      const propLines = propsBlock.split('');
      
      const props = propLines.map(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('//')) return null;
        
        // Extract prop name, type, and optional flag
        const propMatch = trimmed.match(/(\w+)(\?)?:\s*(.*?)(;|$)/);
        if (!propMatch) return null;
        
        const [_, name, optional, type] = propMatch;
        
        return {
          name,
          type: type.trim(),
          optional: Boolean(optional)
        };
      }).filter(Boolean); // Remove null values
      
      return props;
    } catch (error) {
      console.warn(`Failed to extract props: ${error.message}`);
      return []; // Return empty array on error
    }
  }
}

module.exports = FramerSync;