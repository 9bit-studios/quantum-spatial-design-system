# Cloudflare Unified Worker - All Content Types

Version: 1
AI custom autofill: Resource Category: Integration Plan
Doc Type: Cloudflare Unified Worker Documentation
Resource Type: Technical Specification
Research Methods: Data Analysis
Social Platforms: TechBlog
Summary: A unified Cloudflare Worker can manage all content types for 9Bit Studios, featuring a single endpoint structure that handles design systems, websites, games, and apps, with built-in CORS support and fallback mechanisms for seamless content management.
Author: Penny Platt
Imported: No
Validated: No
Review Needed: No
Technical Debt: No
Overview: This document outlines the integration plan for a unified Cloudflare Worker, detailing its functionality, core endpoints, key benefits, and usage examples for various content types.
Status: In Development
Type: INTEGRATION PLAN
Created: May 29, 2025

## Overview

### Code

**One Cloudflare Worker can handle everything.** Here's the unified endpoint structure:

```jsx
// Unified Cloudflare Worker - Handles ALL 9Bit Studios content types
// One worker, all your products: Design System + Websites + Games + Apps

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json'
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Route to appropriate handler
      const response = await routeRequest(path, url, request, env);
      return new Response(JSON.stringify(response), { headers: corsHeaders });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }), 
        { status: 500, headers: corsHeaders }
      );
    }
  }
};

// Main router - handles all content types
async function routeRequest(path, url, request, env) {
  const segments = path.split('/').filter(Boolean);
  const [category, type, action] = segments;

  switch (category) {
    case 'design-system':
      return handleDesignSystem(type, url.searchParams, env);
    
    case 'website':
      return handleWebsites(type, url.searchParams, env);
    
    case 'game':
      return handleGames(type, url.searchParams, env);
    
    case 'app':
      return handleApps(type, url.searchParams, env);
    
    case 'content':
      return handleContent(type, url.searchParams, env);
    
    case 'api':
      return handleAPI(type, action, url.searchParams, request, env);
    
    default:
      return { error: 'Invalid endpoint', availableEndpoints: getEndpointList() };
  }
}

// Design System Handler
async function handleDesignSystem(type, params, env) {
  const state = params.get('state') || 'quantum';
  
  switch (type) {
    case 'tokens':
      return getDesignTokens(state);
    
    case 'components':
      return getComponentLibrary(state);
    
    case 'themes':
      return getAvailableThemes();
    
    default:
      return { error: 'Invalid design system type' };
  }
}

// Website Content Handler
async function handleWebsites(type, params, env) {
  const site = params.get('site') || '9bit-studios';
  const theme = params.get('theme') || 'quantum';
  const page = params.get('page');
  
  switch (type) {
    case 'content':
      return getWebsiteContent(site, theme, page);
    
    case 'templates':
      return getWebsiteTemplates(theme);
    
    case 'sitemap':
      return getSitemap(site);
    
    default:
      return { error: 'Invalid website type' };
  }
}

// Game Content Handler
async function handleGames(type, params, env) {
  const game = params.get('game') || 'jrotharke';
  const episode = params.get('episode');
  const chapter = params.get('chapter');
  
  switch (type) {
    case 'story':
      return getGameStory(game, episode, chapter);
    
    case 'characters':
      return getGameCharacters(game);
    
    case 'world':
      return getGameWorld(game);
    
    case 'puzzles':
      return getGamePuzzles(game, episode);
    
    case 'assets':
      return getGameAssets(game, params.get('type'));
    
    default:
      return { error: 'Invalid game type' };
  }
}

// App Content Handler
async function handleApps(type, params, env) {
  const app = params.get('app') || 'oksana';
  const version = params.get('version') || 'latest';
  
  switch (type) {
    case 'templates':
      return getAppTemplates(app, params.get('category'));
    
    case 'workflows':
      return getAppWorkflows(app);
    
    case 'ai-prompts':
      return getAIPrompts(app, params.get('task'));
    
    case 'assets':
      return getAppAssets(app, params.get('type'));
    
    default:
      return { error: 'Invalid app type' };
  }
}

// Generic Content Handler
async function handleContent(type, params, env) {
  const category = params.get('category');
  const format = params.get('format') || 'json';
  
  switch (type) {
    case 'blog':
      return getBlogContent(category, params.get('slug'));
    
    case 'documentation':
      return getDocumentation(params.get('product'), params.get('section'));
    
    case 'media':
      return getMediaAssets(category, params.get('tags'));
    
    default:
      return { error: 'Invalid content type' };
  }
}

// Dynamic API Handler
async function handleAPI(type, action, params, request, env) {
  switch (type) {
    case 'generate':
      return handleGeneration(action, params, request, env);
    
    case 'analyze':
      return handleAnalysis(action, params, request, env);
    
    case 'sync':
      return handleSync(action, params, request, env);
    
    default:
      return { error: 'Invalid API type' };
  }
}

// DESIGN SYSTEM IMPLEMENTATIONS
function getDesignTokens(state) {
  const tokens = {
    heritage: {
      colors: { primary: "#131A36", secondary: "#666666", accent: "#888888", surface: "#F5F5F5", text: "#333333", background: "#FFFFFF" },
      spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
      typography: { fontFamily: "SF Pro Display", sizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 24, xxl: 32 }},
      effects: { dimensional: false, animations: "minimal" }
    },
    quantum: {
      colors: { primary: "#131A36", secondary: "#331F4A", accent: "#5AC8FA", surface: "#0A0621", text: "#FFFFFF", background: "#0D0D15", rose: "#BF4080", teal: "#126D71" },
      spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
      typography: { fontFamily: "SF Pro Display", sizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 24, xxl: 32 }},
      effects: { dimensional: true, animations: "rich", particles: true }
    },
    superposition: {
      colors: { primary: "#131A36", secondary: "#331F4A", accent: "#5AC8FA", surface: "#0A0621", text: "#FFFFFF", background: "#0D0D15", rose: "#BF4080", teal: "#126D71", quantum: "#6A3093" },
      spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
      typography: { fontFamily: "SF Pro Display", sizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 24, xxl: 32 }},
      effects: { dimensional: "advanced", animations: "fluid", particles: "advanced", neuralEngine: true }
    }
  };
  
  return tokens[state] || tokens.quantum;
}

// WEBSITE IMPLEMENTATIONS
function getWebsiteContent(site, theme, page) {
  const siteContent = {
    '9bit-studios': {
      siteName: "9Bit Studios",
      tagline: "Quantum-Spatial Creative Experiences",
      pages: {
        home: {
          sections: [
            {
              type: "hero",
              title: "Welcome to 9Bit Studios",
              subtitle: "We create extraordinary digital experiences using quantum-spatial design principles that transcend conventional boundaries.",
              cta: "Explore Our Work"
            },
            {
              type: "features",
              title: "Our Expertise",
              items: [
                { icon: "🎮", title: "Narrative Games", description: "Immersive storytelling experiences for iOS and Vision Pro" },
                { icon: "🎨", title: "Creative AI Tools", description: "Privacy-first AI assistance for creative workflows" },
                { icon: "🦄", title: "SaaS Products", description: "Premium tools built with quantum-spatial design" }
              ]
            }
          ]
        },
        about: {
          sections: [
            {
              type: "content",
              title: "About 9Bit Studios",
              content: "Founded on the principle that technology should enhance creativity rather than replace it, 9Bit Studios develops premium digital experiences for the Apple ecosystem. Our quantum-spatial design philosophy creates interfaces that feel both familiar and transcendent."
            }
          ]
        },
        services: {
          sections: [
            {
              type: "features",
              title: "What We Build",
              items: [
                { icon: "📱", title: "iOS Applications", description: "Native apps optimized for Apple Silicon" },
                { icon: "🥽", title: "Vision Pro Experiences", description: "Spatial computing applications" },
                { icon: "🌐", title: "Web Platforms", description: "Framer-based SaaS solutions" },
                { icon: "🤓", title: "Brand Systems", description: "Complete design system development" }
              ]
            }
          ]
        },
        contact: {
          sections: [
            {
              type: "contact",
              title: "Start Your Project",
              subtitle: "Ready to create something extraordinary? Let's discuss your vision."
            }
          ]
        }
      }
    }
  };
  
  const content = siteContent[site] || siteContent['9bit-studios'];
  return page ? { page: content.pages[page] } : content;
}

// GAME IMPLEMENTATIONS
function getGameStory(game, episode, chapter) {
  const stories = {
    jrotharke: {
      episodes: {
        1: {
          title: "Mysteries of Aldoria",
          chapters: {
            1: {
              title: "The Shattered Mirror",
              content: "In the twilight realm where the spiritworld overlaps the mortal domain like oblique glass, you find yourself standing before an ancient mirror that reflects not your image, but fragments of possible futures...",
              choices: [
                { text: "Touch the mirror's surface", consequence: "vision", next: "1.2a" },
                { text: "Step away and examine the room", consequence: "caution", next: "1.2b" },
                { text: "Speak the name Vaclond", consequence: "invoke", next: "1.2c" }
              ]
            }
          }
        }
      }
    }
  };
  
  const gameData = stories[game];
  if (!gameData) return { error: 'Game not found' };
  
  if (episode && chapter) {
    return gameData.episodes[episode]?.chapters[chapter] || { error: 'Chapter not found' };
  }
  
  if (episode) {
    return gameData.episodes[episode] || { error: 'Episode not found' };
  }
  
  return gameData;
}

function getGameCharacters(game) {
  const characters = {
    jrotharke: [
      {
        name: "Vaclond",
        title: "The Shattered God of Lightning",
        description: "Once whole, now fractured across dimensions, Vaclond's essence sparks through reality in moments of revelation.",
        traits: ["lightning", "fractured", "divine", "mysterious"],
        relationships: { prothohar: "rivalry", cosmicMonster: "origin" }
      },
      {
        name: "The Oracle of Hacroth",
        title: "Keeper of Quantum Memories",
        description: "An ancient being who exists simultaneously across multiple timelines, offering guidance through cryptic visions.",
        traits: ["ancient", "wise", "temporal", "cryptic"],
        relationships: { vaclond: "advisor", player: "guide" }
      }
    ]
  };
  
  return characters[game] || [];
}

// APP IMPLEMENTATIONS
function getAppTemplates(app, category) {
  const templates = {
    oksana: {
      character: [
        {
          name: "Quantum Character Creator",
          description: "AI-enhanced character development with dimensional personality traits",
          fields: ["name", "archetype", "dimensionalOrigin", "quantumTraits", "relationships"],
          aiPrompt: "Create a character that exists across multiple dimensional states..."
        }
      ],
      brand: [
        {
          name: "Brand Identity Matrix",
          description: "Multi-dimensional brand development system",
          fields: ["brandEssence", "visualIdentity", "voiceSpectrum", "quantumPositioning"],
          aiPrompt: "Develop a brand identity that resonates across dimensional states..."
        }
      ]
    }
  };
  
  return templates[app]?.[category] || templates[app] || {};
}

// UTILITY FUNCTIONS
function getEndpointList() {
  return {
    designSystem: ['/design-system/tokens', '/design-system/components', '/design-system/themes'],
    website: ['/website/content', '/website/templates', '/website/sitemap'],
    game: ['/game/story', '/game/characters', '/game/world', '/game/puzzles', '/game/assets'],
    app: ['/app/templates', '/app/workflows', '/app/ai-prompts', '/app/assets'],
    content: ['/content/blog', '/content/documentation', '/content/media'],
    api: ['/api/generate/*', '/api/analyze/*', '/api/sync/*']
  };
}

// GENERATION & AI HANDLERS
async function handleGeneration(action, params, request, env) {
  switch (action) {
    case 'character':
      return generateCharacter(await request.json());
    case 'story':
      return generateStory(await request.json());
    case 'brand':
      return generateBrand(await request.json());
    default:
      return { error: 'Invalid generation type' };
  }
}

function generateCharacter(data) {
  // AI character generation logic
  return {
    character: {
      name: data.name || "Generated Character",
      personality: ["quantum-aware", "dimensionally-sensitive"],
      background: "Born in the overlap between realms...",
      generated: true,
      timestamp: new Date().toISOString()
    }
  };
}

// Example endpoint usage patterns:
/*
Design System:
- GET /design-system/tokens?state=quantum
- GET /design-system/components?state=superposition

Websites:
- GET /website/content?site=9bit-studios&theme=quantum
- GET /website/content?site=client-name&page=home

Games:
- GET /game/story?game=jrotharke&episode=1&chapter=1
- GET /game/characters?game=jrotharke

Apps:
- GET /app/templates?app=oksana&category=character
- GET /app/ai-prompts?app=oksana&task=character-creation

API:
- POST /api/generate/character (with JSON body)
- POST /api/analyze/brand (with JSON body)
*/
```

## **Core Endpoints:**

```markdown
/design-system/tokens?state=quantum
/website/content?site=9bit-studios&theme=quantum
/game/story?game=jrotharke&episode=1
/app/templates?app=oksana&category=character
/api/generate/character (POST)

```

## **Key Benefits:**

- **Single deployment** = all your products
- **Shared design tokens** across everything
- **Consistent theming** (heritage→quantum→superposition)
- **Easy content management** - update once, affects all products
- **Built-in fallbacks** - graceful degradation if endpoints fail

## **Usage Examples:**

**Framer Components:**

```jsx
fetch('/design-system/tokens?state=quantum')
fetch('/website/content?site=client-name')

```

**Game Content:**

```jsx
fetch('/game/story?game=jrotharke&episode=1&chapter=1')
fetch('/game/characters?game=jrotharke')

```

**App Templates:**

```jsx
fetch('/app/templates?app=oksana&category=brand')
fetch('/api/generate/character', { method: 'POST', body: characterData })

```

The worker auto-routes based on URL path, handles CORS, provides fallback content, and maintains your quantum-spatial theming across all products. **Deploy once, power everything.**

---

- **Document History**
    
    
    | Version | Date | Author | Changes |
    | --- | --- | --- | --- |
    | 0.1 |  | @Penny Platt  | Initial Creation |
    |  |  |  |  |
    
    *This document follows 9Bit Studios' quantum-spatial design principles and documentation standards.*
    

*© 2025 9Bit Studios. All rights reserved.*