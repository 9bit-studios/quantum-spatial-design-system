# Creatrix Vercel Project - Design System Integration Strategy

**Date**: October 22, 2025
**Project**: Creatrix Creator Portal (Vercel Deployment)
**Design System**: Quantum-Spatial Design System (SDS)
**Status**: INTEGRATION PLANNING

---

## Executive Summary

This guide establishes a **dynamic, iterative workflow** for integrating the Quantum-Spatial Design System into the live Creatrix Vercel project, enabling rapid token/component iteration while building production user flows for:

1. **Interactive Fiction Platform** (`/fiction`)
2. **Branding Quiz** (`/branding-quiz`)
3. **Content Intelligence System** (`/content-intelligence`)

**Key Goals**:
- Try out components in real Vercel deployment
- Iterate on tokens and styles dynamically
- Plan and implement complete user flows
- Set up templates for production apps
- Keep design system and Creatrix project in sync

---

## Current State Analysis

### Creatrix Project Structure

```
Creative-intelligence-portal/vercel/
├── pages/
│   ├── index.js                          # Landing page
│   ├── branding-quiz/
│   │   ├── index.js                      # Quiz flow (5 steps, React state)
│   │   └── checkout/                     # Payment integration
│   ├── fiction/
│   │   └── index.js                      # Story selection + branching narrative
│   ├── content-intelligence/
│   │   └── index.js                      # AI content management
│   ├── cosmic-outlaws/
│   │   └── index.js                      # Game dashboard
│   ├── design-system-demo.js             # ✅ Existing demo page
│   └── api/
│       ├── analyze/brand.js              # Branding quiz API
│       ├── content-intelligence/         # Content AI endpoints
│       └── sync/                         # Notion/Shopify webhooks
├── components/
│   ├── design-system/                    # ✅ Existing design system components
│   ├── navigation/                       # MainNav
│   └── dimensional-narrative-dashboard/  # Game components
├── lib/
│   ├── grid-api-client.js                # Grid API integration
│   └── [other utilities]
└── scripts/
    ├── notion-intelligence-sync.js
    └── [deployment scripts]
```

### Existing Design System Components

From `design-system-demo.js`, you already have:
- ✅ `useDesignSystem` hook
- ✅ `useM4Detection` hook
- ✅ `DimensionalGrid` component
- ✅ `QuantumStateButton` component
- ✅ `M4OptimizedImage` component
- ✅ `DESIGN_STATES` (HERITAGE, TRANSITIONAL, QUANTUM)

### Current Page Implementations

**Branding Quiz** (`pages/branding-quiz/index.js`):
- 5-step wizard flow
- React state management
- Slider inputs for brand personality
- Color palette selection
- API integration at `/api/analyze/brand`
- **Status**: ⚠️ Basic UI, no design system integration

**Fiction Platform** (`pages/fiction/index.js`):
- Story catalog (Quantum Drift, Celestial Shadows, Verdant Enigma)
- Branching narrative engine
- Scene-based content with choices
- **Status**: ⚠️ Hardcoded stories, no design system styling

**Content Intelligence** (`pages/content-intelligence/index.js`):
- AI-powered content management
- Strategic Director integration
- M4 Neural Engine acceleration
- **Status**: ⚠️ Unknown current implementation

---

## Integration Strategy: Three-Phase Approach

### Phase 1: Design System Foundation (Immediate)
**Goal**: Enable dynamic component iteration in Vercel
**Timeline**: 1-2 days

### Phase 2: User Flow Templates (Near-term)
**Goal**: Build production-ready templates for fiction and branding quiz
**Timeline**: 3-5 days

### Phase 3: Full App Integration (Future)
**Goal**: Complete integration across all Creatrix apps
**Timeline**: After design system unification

---

## Phase 1: Design System Foundation Setup

### Step 1.1: Install Design System as Local Package

**Option A: Symlink (Fastest for iteration)**
```bash
cd /Users/pennyplatt/Documents/9BitStudios/Oksana/quantum-spatial/creative-intelligence-portal/vercel
npm link ../../QuantumSpatialDesignSystem/QuantumSpatial

# Add to package.json
{
  "dependencies": {
    "@9bit/quantum-spatial-design-system": "link:../../QuantumSpatialDesignSystem/QuantumSpatial"
  }
}
```

**Option B: Git Submodule (More stable)**
```bash
cd /Users/pennyplatt/Documents/9BitStudios/Oksana/quantum-spatial/creative-intelligence-portal/vercel
git submodule add ../../QuantumSpatialDesignSystem design-system
```

**Option C: Direct Import (Current approach - continue using)**
```javascript
// Current structure works if design system components are already in:
// /quantum-spatial/creative-intelligence-portal/vercel/components/design-system/
```

**Recommendation**: Continue with **Option C** (current approach) for now, since components are already in place. We'll just enhance them.

### Step 1.2: Create Design System Provider

**File**: `components/design-system/DesignSystemProvider.tsx`

```tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { DESIGN_STATES, loadTokens, detectM4 } from './core';

interface DesignSystemContextType {
  state: string;
  setState: (state: string) => void;
  tokens: any;
  isM4Capable: boolean;
  loading: boolean;
}

const DesignSystemContext = createContext<DesignSystemContextType | null>(null);

export function DesignSystemProvider({ children, initialState = DESIGN_STATES.HERITAGE }) {
  const [state, setState] = useState(initialState);
  const [tokens, setTokens] = useState(null);
  const [isM4Capable, setIsM4Capable] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load tokens on mount or state change
  useEffect(() => {
    async function loadDesignTokens() {
      setLoading(true);
      const loadedTokens = await loadTokens(state);
      setTokens(loadedTokens);
      setLoading(false);
    }
    loadDesignTokens();
  }, [state]);

  // Detect M4 capabilities
  useEffect(() => {
    async function detectCapabilities() {
      const m4Detected = await detectM4();
      setIsM4Capable(m4Detected);
    }
    detectCapabilities();
  }, []);

  const value = {
    state,
    setState,
    tokens,
    isM4Capable,
    loading
  };

  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  );
}

export function useDesignSystem() {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within DesignSystemProvider');
  }
  return context;
}
```

### Step 1.3: Wrap Vercel App with Provider

**File**: `pages/_app.js` (modify existing)

```javascript
import { DesignSystemProvider } from '../components/design-system/DesignSystemProvider';

export default function App({ Component, pageProps }) {
  return (
    <DesignSystemProvider initialState="heritage">
      <Component {...pageProps} />
    </DesignSystemProvider>
  );
}
```

### Step 1.4: Create Component Playground Page

**File**: `pages/design-system-playground.js`

```javascript
import { useState } from 'react';
import { useDesignSystem } from '../components/design-system/DesignSystemProvider';
import {
  Button,
  Card,
  Input,
  Select,
  Modal,
  DimensionalGrid,
  QuantumStateButton,
  DESIGN_STATES
} from '../components/design-system';

export default function DesignSystemPlayground() {
  const { state, setState, tokens, isM4Capable } = useDesignSystem();
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: tokens?.colors?.background?.deep || '#000' }}>
      <DimensionalGrid type="background" animated={true} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1>Design System Playground</h1>
          <p>Try out components and iterate on styles in real-time</p>
          <p>M4 Capabilities: {isM4Capable ? '✓ Detected' : '✗ Not Available'}</p>
        </header>

        {/* State Switcher */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>Design States</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <QuantumStateButton
              state={DESIGN_STATES.HERITAGE}
              onClick={() => setState(DESIGN_STATES.HERITAGE)}
              variant={state === DESIGN_STATES.HERITAGE ? 'primary' : 'secondary'}
            >
              Heritage
            </QuantumStateButton>
            <QuantumStateButton
              state={DESIGN_STATES.TRANSITIONAL}
              onClick={() => setState(DESIGN_STATES.TRANSITIONAL)}
              variant={state === DESIGN_STATES.TRANSITIONAL ? 'primary' : 'secondary'}
            >
              Transitional
            </QuantumStateButton>
            <QuantumStateButton
              state={DESIGN_STATES.QUANTUM}
              onClick={() => setState(DESIGN_STATES.QUANTUM)}
              variant={state === DESIGN_STATES.QUANTUM ? 'primary' : 'secondary'}
            >
              Quantum
            </QuantumStateButton>
          </div>
        </section>

        {/* Component Showcase */}
        <section style={{ marginBottom: '3rem' }}>
          <h2>Components</h2>

          <div style={{ display: 'grid', gap: '2rem' }}>
            {/* Buttons */}
            <Card title="Buttons">
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button disabled>Disabled Button</Button>
              </div>
            </Card>

            {/* Inputs */}
            <Card title="Form Inputs">
              <div style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
                <Input placeholder="Text input" />
                <Input type="email" placeholder="Email input" />
                <Select options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' }
                ]} />
              </div>
            </Card>

            {/* Modal */}
            <Card title="Modal">
              <Button onClick={() => setShowModal(true)}>Open Modal</Button>
              {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <h3>Modal Title</h3>
                  <p>This is modal content. Try different design states to see styling changes.</p>
                  <Button onClick={() => setShowModal(false)}>Close</Button>
                </Modal>
              )}
            </Card>
          </div>
        </section>

        {/* Token Inspector */}
        <section>
          <h2>Token Inspector</h2>
          <Card>
            <pre style={{
              background: '#000',
              padding: '1rem',
              borderRadius: '8px',
              overflow: 'auto',
              maxHeight: '400px'
            }}>
              {JSON.stringify(tokens, null, 2)}
            </pre>
          </Card>
        </section>
      </div>
    </div>
  );
}
```

### Step 1.5: Hot Module Replacement for Tokens

**File**: `components/design-system/tokenLoader.ts`

```typescript
/**
 * Dynamic token loader with hot reload support
 * Watches Figma token files and reloads on change
 */

import fs from 'fs';
import path from 'path';

const TOKEN_PATHS = {
  heritage: '/QuantumSpatialDesignSystem/tokens/heritage.json',
  transitional: '/QuantumSpatialDesignSystem/tokens/transitional.json',
  quantum: '/QuantumSpatialDesignSystem/tokens/quantum.json'
};

let tokenCache = new Map();

export async function loadTokens(state: string) {
  const tokenPath = TOKEN_PATHS[state];

  // In development, always reload (no cache)
  if (process.env.NODE_ENV === 'development') {
    const tokens = await fs.promises.readFile(tokenPath, 'utf-8');
    return JSON.parse(tokens);
  }

  // In production, use cache
  if (tokenCache.has(state)) {
    return tokenCache.get(state);
  }

  const tokens = await fs.promises.readFile(tokenPath, 'utf-8');
  const parsed = JSON.parse(tokens);
  tokenCache.set(state, parsed);

  return parsed;
}

// Watch for token file changes in development
if (process.env.NODE_ENV === 'development') {
  Object.values(TOKEN_PATHS).forEach(tokenPath => {
    fs.watch(tokenPath, (eventType) => {
      if (eventType === 'change') {
        console.log(`[Design System] Token file changed: ${tokenPath}`);
        tokenCache.clear();
        // Trigger hot reload if possible
        if (typeof window !== 'undefined' && window.location) {
          window.location.reload();
        }
      }
    });
  });
}
```

### Step 1.6: Vercel Development Workflow

**Add to `package.json` scripts**:

```json
{
  "scripts": {
    "dev": "next dev",
    "dev:design": "next dev --turbo",
    "design:playground": "open http://localhost:3000/design-system-playground",
    "design:tokens": "npm run design:tokens --prefix ../../QuantumSpatialDesignSystem",
    "design:sync": "rsync -av ../../QuantumSpatialDesignSystem/tokens/ ./public/tokens/"
  }
}
```

**Usage**:
```bash
# Start Vercel dev server with turbo mode for faster HMR
npm run dev:design

# In another terminal, open playground
npm run design:playground

# Sync tokens from design system
npm run design:sync
```

---

## Phase 2: User Flow Templates

### Template 1: Interactive Fiction Reader

**Goal**: Production-ready fiction reading experience with branching narratives

**Features**:
- Story catalog with cards
- Episode/chapter navigation
- Choice-driven branching
- Progress saving (localStorage + Notion sync)
- Quantum state transitions based on story mood

**File Structure**:
```
pages/fiction/
├── index.js                    # Story catalog
├── [storyId]/
│   ├── index.js                # Story overview + episode list
│   └── [episodeId]/
│       └── index.js            # Episode reader with choices

components/fiction/
├── StoryCard.tsx               # Card component for catalog
├── EpisodeReader.tsx           # Main reader component
├── ChoiceButton.tsx            # Narrative choice button
├── ProgressBar.tsx             # Reading progress
└── SaveManager.tsx             # Save/load progress
```

**Component**: `components/fiction/StoryCard.tsx`

```tsx
import { Card, Button } from '../design-system';
import { useDesignSystem } from '../design-system/DesignSystemProvider';

interface StoryCardProps {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  tags: string[];
  rating: number;
  episodeCount: number;
  price: number;
  firstEpisodeFree: boolean;
  onSelect: () => void;
}

export function StoryCard({
  title,
  author,
  description,
  cover,
  tags,
  rating,
  episodeCount,
  price,
  firstEpisodeFree,
  onSelect
}: StoryCardProps) {
  const { tokens } = useDesignSystem();

  return (
    <Card
      style={{
        background: `linear-gradient(135deg, ${tokens.colors.surface.primary}, ${tokens.colors.surface.secondary})`,
        border: `1px solid ${tokens.colors.border.subtle}`,
        borderRadius: tokens.radii.lg,
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer'
      }}
      onClick={onSelect}
    >
      <div style={{
        height: '200px',
        background: `url(${cover}) center/cover`,
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: tokens.colors.accent.primary,
          color: tokens.colors.text.inverse,
          padding: '0.25rem 0.75rem',
          borderRadius: tokens.radii.full,
          fontSize: tokens.fontSizes.sm,
          fontWeight: tokens.fontWeights.bold
        }}>
          ⭐ {rating}
        </div>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <h3 style={{
          fontSize: tokens.fontSizes.xl,
          fontWeight: tokens.fontWeights.bold,
          marginBottom: '0.5rem',
          color: tokens.colors.text.primary
        }}>
          {title}
        </h3>

        <p style={{
          fontSize: tokens.fontSizes.sm,
          color: tokens.colors.text.secondary,
          marginBottom: '1rem'
        }}>
          by {author}
        </p>

        <p style={{
          fontSize: tokens.fontSizes.md,
          color: tokens.colors.text.primary,
          lineHeight: 1.6,
          marginBottom: '1rem'
        }}>
          {description}
        </p>

        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1rem'
        }}>
          {tags.map(tag => (
            <span
              key={tag}
              style={{
                background: tokens.colors.surface.tertiary,
                color: tokens.colors.text.secondary,
                padding: '0.25rem 0.75rem',
                borderRadius: tokens.radii.full,
                fontSize: tokens.fontSizes.xs
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <p style={{ fontSize: tokens.fontSizes.sm, color: tokens.colors.text.secondary }}>
              {episodeCount} episodes
            </p>
            {firstEpisodeFree && (
              <p style={{
                fontSize: tokens.fontSizes.xs,
                color: tokens.colors.accent.secondary,
                fontWeight: tokens.fontWeights.semibold
              }}>
                First episode free
              </p>
            )}
          </div>

          <Button variant="primary">
            ${price.toFixed(2)}
          </Button>
        </div>
      </div>
    </Card>
  );
}
```

**Component**: `components/fiction/EpisodeReader.tsx`

```tsx
import { useState, useEffect } from 'react';
import { Button, Card } from '../design-system';
import { useDesignSystem } from '../design-system/DesignSystemProvider';
import { ChoiceButton } from './ChoiceButton';

interface Scene {
  title: string;
  content: string;
  choices: Array<{
    text: string;
    nextScene: string;
  }>;
}

interface EpisodeReaderProps {
  storyId: string;
  episodeId: string;
  scenes: Record<string, Scene>;
  initialScene: string;
}

export function EpisodeReader({ storyId, episodeId, scenes, initialScene }: EpisodeReaderProps) {
  const { tokens, setState, state } = useDesignSystem();
  const [currentSceneId, setCurrentSceneId] = useState(initialScene);
  const [sceneHistory, setSceneHistory] = useState<string[]>([initialScene]);

  const currentScene = scenes[currentSceneId];

  // Change design state based on story mood (optional)
  useEffect(() => {
    // Example: Quantum Drift uses quantum state
    if (storyId === 'quantum-drift') {
      setState('quantum');
    } else if (storyId === 'celestial-shadows') {
      setState('transitional');
    } else {
      setState('heritage');
    }
  }, [storyId, setState]);

  const handleChoice = (nextSceneId: string) => {
    setCurrentSceneId(nextSceneId);
    setSceneHistory([...sceneHistory, nextSceneId]);

    // Save progress
    saveProgress(storyId, episodeId, nextSceneId, sceneHistory);
  };

  const goBack = () => {
    if (sceneHistory.length > 1) {
      const newHistory = [...sceneHistory];
      newHistory.pop();
      const previousScene = newHistory[newHistory.length - 1];
      setCurrentSceneId(previousScene);
      setSceneHistory(newHistory);
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      {sceneHistory.length > 1 && (
        <Button
          variant="ghost"
          onClick={goBack}
          style={{ marginBottom: '1rem' }}
        >
          ← Go Back
        </Button>
      )}

      <Card style={{
        background: tokens.colors.surface.primary,
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: tokens.fontSizes['2xl'],
          fontWeight: tokens.fontWeights.bold,
          marginBottom: '1.5rem',
          color: tokens.colors.text.primary
        }}>
          {currentScene.title}
        </h2>

        <div
          style={{
            fontSize: tokens.fontSizes.lg,
            lineHeight: 1.8,
            color: tokens.colors.text.primary
          }}
          dangerouslySetInnerHTML={{ __html: currentScene.content }}
        />
      </Card>

      {currentScene.choices && (
        <div style={{
          display: 'grid',
          gap: '1rem'
        }}>
          <h3 style={{
            fontSize: tokens.fontSizes.xl,
            fontWeight: tokens.fontWeights.semibold,
            color: tokens.colors.text.primary,
            marginBottom: '0.5rem'
          }}>
            What do you do?
          </h3>

          {currentScene.choices.map((choice, index) => (
            <ChoiceButton
              key={index}
              text={choice.text}
              onClick={() => handleChoice(choice.nextScene)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function saveProgress(storyId: string, episodeId: string, sceneId: string, history: string[]) {
  const progressKey = `fiction_progress_${storyId}_${episodeId}`;
  localStorage.setItem(progressKey, JSON.stringify({
    currentScene: sceneId,
    history,
    timestamp: Date.now()
  }));
}
```

### Template 2: Branding Quiz Flow

**Goal**: Multi-step brand discovery with token generation

**Features**:
- 5-step wizard with validation
- Personality sliders
- Color palette selection (uses design system colors)
- Generates custom design tokens for user's brand
- Saves to Notion + downloads token JSON

**File Structure**:
```
pages/branding-quiz/
├── index.js                    # Main quiz flow
└── results/
    └── [resultId].js           # Results page with token download

components/branding-quiz/
├── QuizStep.tsx                # Wrapper for each step
├── PersonalitySlider.tsx       # Brand personality slider
├── ColorPaletteSelector.tsx    # Color selection with SDS colors
├── ProgressIndicator.tsx       # Step progress
└── ResultsView.tsx             # Generated tokens + download
```

**Component**: `components/branding-quiz/ColorPaletteSelector.tsx`

```tsx
import { useDesignSystem } from '../design-system/DesignSystemProvider';

interface ColorPaletteSelectorProps {
  selected: string | null;
  onSelect: (paletteId: string) => void;
}

export function ColorPaletteSelector({ selected, onSelect }: ColorPaletteSelectorProps) {
  const { tokens } = useDesignSystem();

  const palettes = [
    {
      id: 'heritage',
      name: 'Heritage',
      colors: [
        tokens.colors.heritage.primary,
        tokens.colors.heritage.secondary,
        tokens.colors.heritage.accent
      ]
    },
    {
      id: 'quantum',
      name: 'Quantum',
      colors: [
        tokens.colors.quantum.primary,
        tokens.colors.quantum.secondary,
        tokens.colors.quantum.accent
      ]
    },
    {
      id: 'transitional',
      name: 'Transitional',
      colors: [
        tokens.colors.transitional.primary,
        tokens.colors.transitional.secondary,
        tokens.colors.transitional.accent
      ]
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem'
    }}>
      {palettes.map(palette => (
        <div
          key={palette.id}
          onClick={() => onSelect(palette.id)}
          style={{
            padding: '1.5rem',
            borderRadius: tokens.radii.lg,
            border: `2px solid ${selected === palette.id ? tokens.colors.accent.primary : tokens.colors.border.subtle}`,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: tokens.colors.surface.primary
          }}
        >
          <h4 style={{
            fontSize: tokens.fontSizes.lg,
            fontWeight: tokens.fontWeights.semibold,
            marginBottom: '1rem',
            color: tokens.colors.text.primary
          }}>
            {palette.name}
          </h4>

          <div style={{
            display: 'flex',
            gap: '0.5rem'
          }}>
            {palette.colors.map((color, index) => (
              <div
                key={index}
                style={{
                  width: '50px',
                  height: '50px',
                  background: color,
                  borderRadius: tokens.radii.md,
                  border: `1px solid ${tokens.colors.border.subtle}`
                }}
              />
            ))}
          </div>

          {selected === palette.id && (
            <div style={{
              marginTop: '1rem',
              color: tokens.colors.accent.primary,
              fontSize: tokens.fontSizes.sm,
              fontWeight: tokens.fontWeights.semibold
            }}>
              ✓ Selected
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## Dynamic Iteration Workflow

### Workflow: Figma → Tokens → Vercel

```
1. Update design in Figma
   ↓
2. Export tokens (Code Connect or manual)
   ↓
3. Tokens saved to QuantumSpatialDesignSystem/tokens/
   ↓
4. Vercel dev server detects change (file watcher)
   ↓
5. Hot reload triggers (HMR)
   ↓
6. Components update in playground immediately
   ↓
7. Test in playground, iterate on Figma
   ↓
8. Repeat until satisfied
   ↓
9. Copy refined components to production pages
```

### Script: Watch & Sync Tokens

**File**: `scripts/watch-tokens.js`

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const DESIGN_SYSTEM_PATH = path.join(__dirname, '../../QuantumSpatialDesignSystem/tokens');
const VERCEL_TOKENS_PATH = path.join(__dirname, '../public/tokens');

console.log('🎨 Watching design system tokens for changes...');
console.log(`Source: ${DESIGN_SYSTEM_PATH}`);
console.log(`Destination: ${VERCEL_TOKENS_PATH}`);

// Ensure destination exists
if (!fs.existsSync(VERCEL_TOKENS_PATH)) {
  fs.mkdirSync(VERCEL_TOKENS_PATH, { recursive: true });
}

// Initial sync
syncTokens();

// Watch for changes
fs.watch(DESIGN_SYSTEM_PATH, { recursive: true }, (eventType, filename) => {
  if (filename && filename.endsWith('.json')) {
    console.log(`🔄 Token file changed: ${filename}`);
    syncTokens();
  }
});

function syncTokens() {
  exec(`rsync -av ${DESIGN_SYSTEM_PATH}/ ${VERCEL_TOKENS_PATH}/`, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Sync failed:', error);
      return;
    }
    console.log('✅ Tokens synced successfully');
    console.log(stdout);
  });
}
```

**Usage**:
```bash
# In one terminal: Run token watcher
node scripts/watch-tokens.js

# In another terminal: Run Vercel dev
npm run dev

# In Figma: Update designs, export tokens
# → Watcher syncs automatically
# → Vercel HMR updates components
```

---

## Component Library Organization

### Core Components (Generic)
```
components/design-system/
├── core/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Modal.tsx
│   ├── Tooltip.tsx
│   └── Grid.tsx
├── quantum/
│   ├── DimensionalGrid.tsx
│   ├── QuantumStateButton.tsx
│   ├── M4OptimizedImage.tsx
│   └── SpatialContainer.tsx
└── hooks/
    ├── useDesignSystem.ts
    ├── useM4Detection.ts
    └── useTokens.ts
```

### App-Specific Components
```
components/fiction/
├── StoryCard.tsx
├── EpisodeReader.tsx
├── ChoiceButton.tsx
├── ProgressBar.tsx
└── SaveManager.tsx

components/branding-quiz/
├── QuizStep.tsx
├── PersonalitySlider.tsx
├── ColorPaletteSelector.tsx
├── ProgressIndicator.tsx
└── ResultsView.tsx

components/content-intelligence/
├── ContentEditor.tsx
├── AIAssistant.tsx
├── NotionSync.tsx
└── AnalyticsDashboard.tsx
```

---

## Testing & Validation

### Visual Regression Testing

**File**: `tests/visual-regression.spec.ts` (Playwright)

```typescript
import { test, expect } from '@playwright/test';

test.describe('Design System Components', () => {
  test('StoryCard in heritage state', async ({ page }) => {
    await page.goto('/design-system-playground');
    await page.click('text=Heritage');
    await expect(page.locator('.story-card')).toHaveScreenshot('story-card-heritage.png');
  });

  test('StoryCard in quantum state', async ({ page }) => {
    await page.goto('/design-system-playground');
    await page.click('text=Quantum');
    await expect(page.locator('.story-card')).toHaveScreenshot('story-card-quantum.png');
  });

  test('Branding Quiz flow', async ({ page }) => {
    await page.goto('/branding-quiz');
    await expect(page).toHaveScreenshot('quiz-step-1.png');

    await page.fill('input[name="industry"]', 'Technology');
    await page.click('text=Next');
    await expect(page).toHaveScreenshot('quiz-step-2.png');
  });
});
```

### Component Storybook

**Option**: Set up Storybook for isolated component development

```bash
npx sb init

# Add stories
# components/fiction/StoryCard.stories.tsx
```

---

## Deployment Strategy

### Development
```bash
# Local development with token sync
npm run dev:design

# Open playground
open http://localhost:3000/design-system-playground

# Watch tokens in separate terminal
node scripts/watch-tokens.js
```

### Staging
```bash
# Deploy to Vercel staging
npm run deploy:staging

# Test in staging environment
# https://quantum-spatial/creative-intelligence-portal-staging.vercel.app
```

### Production
```bash
# Deploy to production
npm run deploy

# Production URL
# https://quantum-spatial/creative-intelligence-portal.9bitstudios.com
```

---

## Integration Checklist

### Phase 1: Foundation (Immediate)
- [ ] Create DesignSystemProvider
- [ ] Wrap _app.js with provider
- [ ] Create design-system-playground page
- [ ] Set up token watcher script
- [ ] Test HMR with token changes
- [ ] Document component API in playground

### Phase 2: Fiction Template (Week 1)
- [ ] Create StoryCard component
- [ ] Create EpisodeReader component
- [ ] Create ChoiceButton component
- [ ] Implement progress saving
- [ ] Integrate with existing fiction page
- [ ] Add quantum state transitions
- [ ] Test full user flow

### Phase 3: Branding Quiz Template (Week 1-2)
- [ ] Create QuizStep wrapper
- [ ] Create PersonalitySlider component
- [ ] Create ColorPaletteSelector (use SDS colors)
- [ ] Create ProgressIndicator
- [ ] Create ResultsView with token export
- [ ] Integrate with existing quiz flow
- [ ] Test Notion sync

### Phase 4: Content Intelligence (Week 2-3)
- [ ] Plan content editor UI
- [ ] Create AI assistant interface
- [ ] Implement Strategic Director integration
- [ ] Add M4 acceleration indicators
- [ ] Test with Foundation Models

---

## Success Metrics

**Iteration Speed**:
- Token change → Component update: < 2 seconds (HMR)
- Figma export → Vercel preview: < 5 minutes

**Component Reusability**:
- Core components used across 3+ pages
- App-specific components built on core foundation
- Zero duplicate styling code

**User Flow Completion**:
- Fiction: Full story reading experience
- Branding Quiz: Complete flow with token generation
- Content Intelligence: Basic editor + AI assistant

**Design Consistency**:
- All components use design system tokens
- No hardcoded colors/spacing
- Quantum state transitions work across all pages

---

## Next Steps

### Immediate Actions
1. Review this integration strategy
2. Decide on token sync approach (symlink vs. file watcher)
3. Create playground page for component iteration
4. Start with one template (Fiction or Branding Quiz?)

### Questions to Answer
- Do you want to start with Fiction or Branding Quiz template first?
- Should token sync be automatic (file watcher) or manual (npm script)?
- Do you need Storybook or is the playground page sufficient?
- Timeline expectations for Phase 2 templates?

---

**Date**: October 22, 2025
**Purpose**: Dynamic design system integration for Creatrix Vercel project
**Status**: READY FOR REVIEW - Awaiting user direction on priorities
