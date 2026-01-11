---
name: framer-worldbuilding-intelligence  
description: Generative worldbuilding engine integration with Framer, Notion CMS, and ML-enhanced Ink narrative. Transforms Fantasy Worldbuilding Suite data into playable game experiences with branching narratives, dynamic NPC dialogue, and player-adaptive content.
---

# Framer Worldbuilding Intelligence Skill

## Purpose

Transform Notion Fantasy Worldbuilding Suite into interactive Framer game experiences with ML-enhanced Ink narratives, dynamic character generation, and player-adaptive storytelling.

## System Context (Auto-Load)

**What Exists:**
- Complete Fantasy Worldbuilding Suite (Notion databases)
- Narrative flow design documents
- UI narrative flow frameworks
- Ink script integration templates
- Character relationship networks
- Magic system visualizations
- World generation algorithms

**Core Documents (MUST READ FIRST):**
```
/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/m4-acceleration/m4-framer-game-ecosystem/integration-workflow-fantasy-worldbuilding-to-game.md

/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/m4-acceleration/m4-framer-game-ecosystem/enhanced-quantum-spatial-game-design-templates.md

/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/m4-acceleration/m4-framer-game-ecosystem/ui-narrative-flow-design-document.md

/Users/pennyplatt/Documents//Oksana/quantum-spatial/design-system/m4-acceleration/m4-framer-game-ecosystem/narrative-logic-testing-framework.md
```

## Worldbuilding to Game Pipeline

### Stage 1: Extract from Notion Fantasy Worldbuilding Suite

**Source Data:**
- Characters (NPCs, relationships, motivations, skills)
- Locations (regions, environments, connections)
- Items (props, artifacts, magical items)
- History (lore entries, timelines, events)
- Magic Systems (Jrotite, Hacrothite, Cholashite duration mechanics)
- Factions (alignments, conflicts, territories)

**Extraction Process:**
```typescript
// Grid API pulls structured data
interface WorldbuildingData {
  characters: Character[]
  locations: Location[]
  items: Item[]
  lore: LoreEntry[]
  magicSystems: MagicSystem[]
  relationships: RelationshipNetwork
}

async function extractWorldbuilding(): Promise<WorldbuildingData> {
  const gridAPI = new GridAPI()
  return await gridAPI.fetchFantasyWorldbuildingSuite()
}
```

### Stage 2: Transform to Game Assets

**Design Brief Generation:**
```typescript
interface CharacterDesignBrief {
  name: string
  role: string
  personality: string[]
  visualDescription: string
  relationships: Relationship[]
  dialoguePatterns: DialoguePattern[]
  questConnections: string[]
}

function generateCharacterBrief(notionCharacter: NotionCharacter): CharacterDesignBrief {
  // Transform Notion data into game-ready format
  // Add ML-enhanced dialogue generation parameters
  // Link to Ink script variables
}
```

### Stage 3: ML-Enhanced Ink Integration

**Narrative Engine Setup:**
```typescript
import { Story } from 'inkjs'

interface InkEngine {
  story: Story
  variables: Map<string, any>
  mlEnhancement: MLNarrativeEngine
}

class MLNarrativeEngine {
  generateDynamicDialogue(character: Character, context: GameState): string {
    // M4 Neural Engine processes:
    // - Player choices history
    // - Character personality from Notion
    // - Current relationship values
    // - Quest state
    
    // Returns contextually appropriate dialogue
  }
  
  branchNarrative(playerChoice: string, worldState: WorldState): InkKnot {
    // AI-generated branches based on:
    // - Player reputation
    // - Faction alignments
    // - Completed quests
    // - Character relationships
  }
}
```

**Ink Script Template:**
```ink
=== character_encounter(character_name, relationship_value) ===
VAR fear_level = 0
VAR player_reputation = 0

// ML-generated content marker
EXTERNAL generateResponse(character, reputation, fear_level)

~ relationship_value = getRelationshipValue(character_name)

{relationship_value > 50:
    {generateResponse(character_name, player_reputation, fear_level)}
    -> positive_interaction
}
{relationship_value < -20:
    {generateResponse(character_name, player_reputation, fear_level)}
    -> hostile_interaction
}
{generateResponse(character_name, player_reputation, fear_level)}
-> neutral_interaction
```

### Stage 4: Framer Game Component Integration

**Narrative Scene Component:**
```tsx
import { useState, useEffect } from 'react'
import { Story } from 'inkjs'
import { Canvas } from '@react-three/fiber'
import { CharacterModel } from './CharacterModel'
import { SceneBackground } from './SceneBackground'

export default function NarrativeScene({ storyData, worldState }) {
  const [inkStory, setInkStory] = useState<Story>()
  const [currentText, setCurrentText] = useState('')
  const [choices, setChoices] = useState<Choice[]>([])
  
  useEffect(() => {
    // Load Ink story from Notion-generated content
    const story = new Story(storyData.inkJSON)
    
    // Bind ML enhancement functions
    story.BindExternalFunction("generateResponse", (char, rep, fear) => {
      return mlEngine.generateDynamicDialogue(char, rep, fear)
    })
    
    setInkStory(story)
  }, [storyData])
  
  function continueStory() {
    if (!inkStory?.canContinue) return
    
    const text = inkStory.Continue()
    setCurrentText(text)
    setChoices(inkStory.currentChoices)
    
    // Sync state back to Notion
    syncPlayerProgress(inkStory.state)
  }
  
  return (
    <div className="narrative-container">
      <Canvas>
        <SceneBackground location={worldState.currentLocation} />
        <CharacterModel character={worldState.activeCharacter} />
      </Canvas>
      
      <DialogueBox text={currentText} />
      
      <ChoiceList choices={choices} onChoice={(choice) => {
        inkStory?.ChooseChoiceIndex(choice.index)
        continueStory()
      }} />
    </div>
  )
}
```

### Stage 5: Character Relationship Network Visualization

**Interactive Relationship Graph:**
```tsx
import { ForceGraph3D } from 'react-force-graph'

export function RelationshipNetwork({ characters, relationships }) {
  const graphData = {
    nodes: characters.map(char => ({
      id: char.id,
      name: char.name,
      faction: char.faction,
      color: getFactionColor(char.faction)
    })),
    links: relationships.map(rel => ({
      source: rel.characterA,
      target: rel.characterB,
      value: rel.strength, // -100 to +100
      type: rel.type // 'ally', 'rival', 'mentor', etc
    }))
  }
  
  return (
    <ForceGraph3D
      graphData={graphData}
      nodeLabel="name"
      linkWidth={link => Math.abs(link.value) / 20}
      linkColor={link => link.value > 0 ? '#00D9FF' : '#E85D75'}
      onNodeClick={node => showCharacterDetails(node.id)}
    />
  )
}
```

### Stage 6: Magic System Integration

**Quantum Pixel Magic Visualization:**
```tsx
export function MagicSystemDisplay({ magicType, duration }) {
  // Jrotite (heartbeat), Hacrothite (breath), Cholashite (steps)
  const pixelState = getMagicPixelState(magicType)
  
  return (
    <QuantumPixel
      state={pixelState}
      animationDuration={`${duration}s`}
      particleEffect={getMagicParticles(magicType)}
    />
  )
}

function getMagicPixelState(type: MagicType): PixelState {
  switch(type) {
    case 'jrotite': return 'heritage' // heartbeat rhythm
    case 'hacrothite': return 'transitional' // breath flow
    case 'cholashite': return 'quantum' // step intervals
    default: return 'superposition' // mixed magic
  }
}
```

## Narrative Branching Architecture

**Decision Tree Structure:**
```typescript
interface NarrativeBranch {
  id: string
  trigger: BranchCondition
  inkKnot: string
  consequences: GameStateChange[]
  mlEnhancement: boolean
}

interface BranchCondition {
  type: 'choice' | 'reputation' | 'item' | 'relationship' | 'quest'
  value: any
  comparison: 'equals' | 'greater' | 'less' | 'contains'
}

class NarrativeBranchingEngine {
  evaluateBranch(condition: BranchCondition, gameState: GameState): boolean {
    // Check if branch condition is met
  }
  
  applyConsequences(changes: GameStateChange[], gameState: GameState): GameState {
    // Update game state based on player choices
    // Sync changes back to Notion
  }
  
  generateDynamicBranch(context: GameContext): NarrativeBranch {
    // Use M4 Neural Engine to create new branches
    // Based on player behavior patterns
  }
}
```

## M4 Neural Engine Narrative Features

**Player-Adaptive Content:**
```typescript
interface PlayerProfile {
  playStyle: 'explorer' | 'fighter' | 'diplomat' | 'puzzle-solver'
  favoriteCharacters: string[]
  completedQuests: Quest[]
  reputations: Map<string, number>
  choiceHistory: Choice[]
}

class AdaptiveNarrativeEngine {
  analyzePlayerProfile(history: Choice[]): PlayerProfile {
    // M4 Neural Engine analyzes patterns
  }
  
  tailorContent(profile: PlayerProfile, worldState: WorldState): NarrativeContent {
    // Generate personalized quests
    // Adjust NPC dialogue
    // Modify challenge difficulty
    // Highlight preferred content types
  }
}
```

## Workspace Game Design Dashboard

**Narrative Design Tools:**
```tsx
export function NarrativeDesignWorkshop() {
  return (
    <div className="workshop-container">
      <CharacterManager />
      <BranchingMapVisualizer />
      <DialogueEditor />
      <QuestDesigner />
      <RelationshipNetworkEditor />
    </div>
  )
}
```

**Features:**
1. **Character Manager**: Create/edit NPCs with AI-generated dialogue
2. **Branching Map**: Visual Ink script flow with node editor
3. **Dialogue Editor**: ML-enhanced conversation trees
4. **Quest Designer**: Drag-and-drop quest creation synced to Notion
5. **Relationship Network**: Interactive graph of character connections

## Quality Standards

✅ **Narrative Quality:**
- Coherent story progression
- Character consistency
- Player agency respected
- Branching feels meaningful

✅ **Technical Performance:**
- Ink story loads <500ms
- ML dialogue generation <2s
- Smooth transitions (60fps)
- Notion sync <5s latency

✅ **Game Design:**
- Clear player objectives
- Satisfying feedback loops
- Accessible difficulty scaling
- Replayability through branches

## Deliverables

1. **Notion → Ink Transformer**: Converts worldbuilding data to Ink scripts
2. **ML Narrative Engine**: Dynamic dialogue + branching
3. **Framer Narrative Components**: Scene viewer, dialogue system, choice UI
4. **Character Relationship Visualizer**: Interactive 3D graph
5. **Magic System Integration**: Quantum pixel + particle effects
6. **Workspace Design Tools**: In-Framer narrative design suite
7. **Player Progress Sync**: Bi-directional Notion updates

## Example Workflow
```typescript
// 1. Extract worldbuilding from Notion
const worldData = await extractWorldbuilding()

// 2. Generate Ink script
const inkScript = await generateInkFromNotion(worldData)

// 3. Enhance with ML
const mlEngine = new MLNarrativeEngine(inkScript)

// 4. Deploy to Framer
const narrativeScene = (
  <NarrativeScene 
    storyData={inkScript}
    mlEngine={mlEngine}
    worldState={gameState}
  />
)

// 5. Player interacts
// 6. Choices sync back to Notion
await syncPlayerProgress(gameState, worldData)
```

---

**Use this skill when building narrative-driven game experiences powered by Notion worldbuilding data with ML-enhanced branching and player-adaptive content.**
