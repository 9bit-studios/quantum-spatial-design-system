/**
 * Test Framer API Connection
 * 
 * This script tests the connection to the Framer API using the configured credentials.
 * It verifies that the API credentials are valid and that the necessary projects and 
 * component libraries are accessible.
 * 
 * Usage:
 *   node test-framer-connection.js
 */

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const config = require('./framer-sync-config');

async function testFramerConnection() {
  console.log('🔗 Testing connection to Framer API...');
  
  // Check if API credentials are set
  if (config.apiKey === 'your-framer-access-token' || !config.apiKey) {
    console.error('❌ API key not configured. Please set your Framer Access Token in framer-sync-config.js or as FRAMER_ACCESS_TOKEN=
FRAMER_REFRESH_TOKEN= environment variable.');
    process.exit(1);
  }
  
  if (config.teamId === 'your-framer-team-id' || !config.teamId) {
    console.error('❌ Team ID not configured. Please set your Framer team ID in framer-sync-config.js or as FRAMER_TEAM_ID environment variable.');
    process.exit(1);
  }
  
  try {
    // Test API connection by getting current user
    console.log('🔍 Verifying API credentials...');
    const userResponse = await fetch(`${config.apBaseUrl}/user/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!userResponse.ok) {
      throw new Error(`Failed to verify user: ${userResponse.status} ${userResponse.statusText}`);
    }
    
    const user = await userResponse.json();
    console.log(`✅ Successfully authenticated as ${user.name || user.email}`);
    
    // Check if team is accessible
    console.log(`🔍 Verifying access to team ID: ${config.teamId}...`);
    const teamResponse = await fetch(`${config.apBaseUrl}/teams/${config.teamId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!teamResponse.ok) {
      throw new Error(`Failed to access team: ${teamResponse.status} ${teamResponse.statusText}`);
    }
    
    const team = await teamResponse.json();
    console.log(`✅ Successfully accessed team: ${team.name}`);
    
    // Check if project is accessible (if project ID is provided)
    if (config.projectId && config.projectId !== 'your-framer-project-id') {
      console.log(`🔍 Verifying access to project ID: ${config.projectId}...`);
      const projectResponse = await fetch(`${config.apBaseUrl}/teams/${config.teamId}/projects/${config.projectId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!projectResponse.ok) {
        throw new Error(`Failed to access project: ${projectResponse.status} ${projectResponse.statusText}`);
      }
      
      const project = await projectResponse.json();
      console.log(`✅ Successfully accessed project: ${project.name}`);
    } else {
      console.log('ℹ️ No project ID configured. Skipping project verification.');
      
      // List available projects
      console.log('📋 Listing available projects...');
      const projectsResponse = await fetch(`${config.apBaseUrl}/teams/${config.teamId}/projects`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!projectsResponse.ok) {
        throw new Error(`Failed to list projects: ${projectsResponse.status} ${projectsResponse.statusText}`);
      }
      
      const projects = await projectsResponse.json();
      
      if (projects && projects.length > 0) {
        console.log('Available projects:');
        projects.forEach((project, index) => {
          console.log(`  ${index + 1}. ${project.name} (ID: ${project.id})`);
        });
        console.log('Add one of these project IDs to your framer-sync-config.js file.');
      } else {
        console.log('No projects found in this team.');
      }
    }
    
    // Check access to component libraries
    console.log('🔍 Checking component libraries...');
    const librariesResponse = await fetch(`${config.apBaseUrl}/teams/${config.teamId}/component-libraries`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!librariesResponse.ok) {
      throw new Error(`Failed to access component libraries: ${librariesResponse.status} ${librariesResponse.statusText}`);
    }
    
    const libraries = await librariesResponse.json();
    
    // Look for the Quantum-Spatial Design System library
    const quantumSpatialLibrary = libraries.find(lib => lib.name === config.componentLibrary.name);
    
    if (quantumSpatialLibrary) {
      console.log(`✅ Found existing Quantum-Spatial Design System library (ID: ${quantumSpatialLibrary.id})`);
    } else {
      console.log('ℹ️ Quantum-Spatial Design System library not found. It will be created when syncing components.');
    }
    
    // Verify access to Cloudflare API if enabled
    if (config.cloudflareApBaseUrl) {
      console.log(`🔍 Testing connection to Cloudflare API at ${config.cloudflareApBaseUrl}...`);
      try {
        const cloudflareResponse = await fetch(`${config.cloudflareApBaseUrl}/design-system/tokens?state=transitional`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!cloudflareResponse.ok) {
          console.warn(`⚠️ Could not access Cloudflare API: ${cloudflareResponse.status} ${cloudflareResponse.statusText}`);
        } else {
          console.log('✅ Successfully connected to Cloudflare API');
        }
      } catch (error) {
        console.warn(`⚠️ Could not access Cloudflare API: ${error.message}`);
      }
    }
    
    // Verify access to token and component files
    console.log('🔍 Checking local token and component files...');
    
    if (fs.existsSync(config.tokensPath)) {
      const tokenFiles = fs.readdirSync(config.tokensPath).filter(file => file.endsWith('.json'));
      console.log(`✅ Found ${tokenFiles.length} token files in ${config.tokensPath}`);
    } else {
      console.warn(`⚠️ Token path not found: ${config.tokensPath}`);
    }
    
    if (fs.existsSync(config.componentsPath)) {
      const componentFiles = fs.readdirSync(config.componentsPath).filter(file => file.endsWith('.tsx') || file.endsWith('.jsx'));
      console.log(`✅ Found ${componentFiles.length} component files in ${config.componentsPath}`);
    } else {
      console.warn(`⚠️ Component path not found: ${config.componentsPath}`);
    }
    
    console.log('✅ Framer API connection test completed successfully!');
    console.log('You can now use the sync tools to synchronize your design system with Framer.');
    
  } catch (error) {
    console.error(`❌ Error testing Framer API connection: ${error.message}`);
    process.exit(1);
  }
}

// Run the test
testFramerConnection().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});