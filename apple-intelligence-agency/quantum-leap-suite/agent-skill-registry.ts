 /**
 * Agent Skill Registry
 * Maps quantum-leap-suite skills to Claude agents for execution
 *
 * @version 1.0.0
 * @authority Apple Intelligence Strategic Director
 */

import { query, ClaudeAgentOptions } from "@anthropic-ai/claude-agent-sdk";
import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Skill Configuration
 */
interface SkillConfig {
  skillPath: string;
  agent: 'strategic-director' | 'oksana-creative' | 'figma-visual';
  systemPromptEnhancement: string;
  allowedTools: string[];
  m4Pathway: string;
  capabilities: string[];
  examples?: string[];
}

/**
 * Skill Execution Result
 */
interface SkillExecutionResult {
  skill: string;
  agent: string;
  timestamp: string;
  messages: any[];
  summary: string;
  recommendations: string[];
  artifactsGenerated?: string[];
  performanceMetrics?: {
    executionTime: number;
    tokensUsed?: number;
    m4Accelerated: boolean;
  };
}

/**
 * Agent Skill Registry
 * Central registry for all quantum-leap-suite skills
 */
class AgentSkillRegistry {
  private skills: Map<string, SkillConfig>;
  private oksanaRoot: string;

  constructor() {
    this.skills = new Map();
    this.oksanaRoot = path.resolve(__dirname, '../..');
    this.registerAllSkills();
  }

  /**
   * Register all available skills
   */
  private registerAllSkills(): void {
    // 1. Strategic Planning Skill
    this.skills.set('strategic-planning', {
      skillPath: path.join(__dirname, 'strategic-planning/SKILL.md'),
      agent: 'strategic-director',
      systemPromptEnhancement: `You are executing the **Strategic Planning Skill** from the quantum-leap-suite.

This skill provides executive-level product roadmap generation capabilities:
- Multi-project roadmap creation
- Priority matrix (impact vs effort)
- Resource allocation analysis
- Technical feasibility assessment
- Risk identification and mitigation planning

Use the M4_STRATEGIC_INTELLIGENCE_PATHWAY for all planning operations.
`,
      allowedTools: ['Read', 'Write', 'Edit', 'Grep', 'Glob', 'Bash', 'Task'],
      m4Pathway: 'M4_STRATEGIC_INTELLIGENCE_PATHWAY',
      capabilities: [
        'roadmap-generation',
        'priority-matrix',
        'resource-allocation',
        'feasibility-assessment',
        'risk-management'
      ],
      examples: [
        'Plan implementation of Apple Pay checkout',
        'Create roadmap for Shopify theme redesign',
        'Assess feasibility of Vision Pro app'
      ]
    });

    // 2. Brand Voice Validation Skill
    this.skills.set('brand-voice-validation', {
      skillPath: path.join(__dirname, 'brand-voice-validation/SKILL.md'),
      agent: 'oksana-creative',
      systemPromptEnhancement: `You are executing the **Brand Voice Validation Skill** from the quantum-leap-suite.

This skill provides brand consistency scoring and validation:
- Petersen Games voice (horror-gaming, collector-focused)
- 9Bit Studios voice (quantum-spatial, Apple-aligned)
- Brand alignment scoring (0-100)
- Tone analysis and recommendations
- SEO keyword integration

Use the M4_CREATIVE_INTELLIGENCE_PATHWAY for all brand analysis.
`,
      allowedTools: ['Read', 'Grep', 'Search', 'Task'],
      m4Pathway: 'M4_CREATIVE_INTELLIGENCE_PATHWAY',
      capabilities: [
        'brand-alignment-scoring',
        'tone-analysis',
        'voice-consistency',
        'seo-optimization',
        'competitive-positioning'
      ],
      examples: [
        'Validate product description for Cthulhu Wars',
        'Score brand alignment of landing page copy',
        'Generate SEO-optimized content for 9Bit Studios'
      ]
    });

    // 3. Design System Automation Skill
    this.skills.set('design-system-automation', {
      skillPath: path.join(__dirname, 'design-system-automation/SKILL.md'),
      agent: 'figma-visual',
      systemPromptEnhancement: `You are executing the **Design System Automation Skill** from the quantum-leap-suite.

This skill provides Quantum Spatial component generation at scale:
- Figma design extraction and parsing
- SwiftUI/React/Liquid code generation
- Design token application
- Component variant generation (dark/light, mobile/desktop)
- Apple HIG compliance validation (44px targets, SF Pro, WCAG AA)

Use the M4_QUANTUM_SPATIAL_PATHWAY for all design operations.
`,
      allowedTools: ['Read', 'Write', 'Edit', 'Grep', 'Glob', 'Bash'],
      m4Pathway: 'M4_QUANTUM_SPATIAL_PATHWAY',
      capabilities: [
        'figma-extraction',
        'code-generation',
        'design-token-application',
        'variant-generation',
        'hig-compliance-validation'
      ],
      examples: [
        'Generate product card component with Quantum Spatial tokens',
        'Create responsive navigation with SwiftUI',
        'Extract Figma design and generate React components'
      ]
    });

    // 4. SVG Generation Skill
    this.skills.set('svg-generation', {
      skillPath: path.join(__dirname, 'svg-generation/SKILL.md'),
      agent: 'figma-visual',
      systemPromptEnhancement: `You are executing the **SVG Generation Skill** from the quantum-leap-suite.

This skill generates quantum-spatial and heritage-themed SVG components:
- 45 SVG components (quantum-spatial + heritage themes)
- Animated (pulse, breathe, flow) and static variants
- Cloudinary deployment automation
- Notion gallery integration
- M4-accelerated rendering

Use the M4_QUANTUM_SPATIAL_PATHWAY for visual generation and the M4_CREATIVE_INTELLIGENCE_PATHWAY for thematic consistency.
`,
      allowedTools: ['Read', 'Write', 'Edit', 'Bash'],
      m4Pathway: 'M4_QUANTUM_SPATIAL_PATHWAY',
      capabilities: [
        'svg-component-generation',
        'animation-creation',
        'cloudinary-deployment',
        'notion-integration',
        'theme-consistency'
      ],
      examples: [
        'Generate quantum-spatial pulsing grid background',
        'Create heritage theme classic divider',
        'Generate 45 SVG components and deploy to Cloudinary'
      ]
    });

    // 5. Hexecute Game Development Skill
    this.skills.set('hexecute-game', {
      skillPath: path.join(__dirname, 'hexecute-game/SKILL.md'),
      agent: 'figma-visual',
      systemPromptEnhancement: `You are executing the **Hexecute Game Development Skill** from the quantum-leap-suite.

This skill creates Swift/Metal games with M4 Neural Engine physics:
- Hexagonal grid mathematics (cube coordinates)
- Metal rendering pipeline (vertex/fragment/compute shaders)
- M4 Neural Engine physics (collision, trajectory)
- SwiftUI game interface
- 60fps performance optimization

Use the M4_QUANTUM_SPATIAL_PATHWAY for rendering and physics acceleration.
`,
      allowedTools: ['Read', 'Write', 'Edit', 'Bash'],
      m4Pathway: 'M4_QUANTUM_SPATIAL_PATHWAY',
      capabilities: [
        'hexagonal-grid-system',
        'metal-rendering',
        'm4-physics-engine',
        'swiftui-interface',
        'performance-optimization'
      ],
      examples: [
        'Create Hexecute game engine with Arthur\'s rules',
        'Generate Metal shaders for quantum-spatial effects',
        'Implement M4-accelerated collision detection'
      ]
    });

    // 6. Vision Pro UI Kit Skill
    this.skills.set('vision-pro-ui-kit', {
      skillPath: path.join(__dirname, 'vision-pro-ui-kit/SKILL.md'),
      agent: 'figma-visual',
      systemPromptEnhancement: `You are executing the **Vision Pro UI Kit Skill** from the quantum-leap-suite.

This skill creates spatial UI components for Apple Vision Pro:
- 40 Vision Pro components (20 primitives, 15 compositions, 5 experiences)
- Spatial depth awareness
- Glassmorphic 3D materials
- RealityKit integration
- Volumetric visualizations
- Hand/eye tracking ready

Use the M4_QUANTUM_SPATIAL_PATHWAY for spatial computing and visual effects.
`,
      allowedTools: ['Read', 'Write', 'Edit', 'Bash'],
      m4Pathway: 'M4_QUANTUM_SPATIAL_PATHWAY',
      capabilities: [
        'spatial-component-creation',
        'depth-layer-management',
        'realitykit-integration',
        'volumetric-visualization',
        'hand-eye-tracking'
      ],
      examples: [
        'Create Oksana Portal for Vision Pro',
        'Generate spatial product card with depth layers',
        'Implement volumetric data visualization'
      ]
    });
  }

  /**
   * Execute a skill with the appropriate Claude agent
   */
  async executeSkill(
    skillName: string,
    task: string,
    context?: any
  ): Promise<SkillExecutionResult> {
    const skillConfig = this.skills.get(skillName);
    if (!skillConfig) {
      throw new Error(`Unknown skill: ${skillName}. Available skills: ${Array.from(this.skills.keys()).join(', ')}`);
    }

    console.log(`🎯 Executing Skill: ${skillName}`);
    console.log(`🤖 Agent: ${skillConfig.agent}`);
    console.log(`⚡ M4 Pathway: ${skillConfig.m4Pathway}`);
    console.log(`📋 Task: ${task}`);

    const startTime = Date.now();

    // Load skill content
    let skillContent = '';
    try {
      skillContent = await fs.readFile(skillConfig.skillPath, 'utf-8');
    } catch (error) {
      console.warn(`⚠️  Could not load skill file: ${skillConfig.skillPath}`);
    }

    // Prepare system prompt with skill enhancement
    const systemPrompt = `${this.getAgentBasePrompt(skillConfig.agent)}

${skillConfig.systemPromptEnhancement}

${skillContent ? `## Skill Documentation${skillContent}` : ''}

Execute the task with precision, following all skill guidelines and best practices.
`;

    // Configure agent options
    const options: ClaudeAgentOptions = {
      model: "claude-sonnet-4-5-20250929",
      systemPrompt,
      allowedTools: skillConfig.allowedTools,
      maxTurns: 15,
      settingSources: ['project']
    };

    const messages: any[] = [];

    // Create message generator
    async function* generateMessages() {
      yield {
        type: "user" as const,
        message: {
          role: "user" as const,
          content: context
            ? `${task}Context:${JSON.stringify(context, null, 2)}`
            : task
        }
      };
    }

    // Execute agent with actual Claude API calls
    try {
      for await (const message of query({
        prompt: generateMessages(),
        options
      })) {
        if (message.type === "result") {
          messages.push(message);
          console.log(`📝 ${message.result?.substring(0, 100)}...`);
        }
      }
    } catch (error) {
      console.error(`❌ Error executing skill ${skillName}:`, error);
      throw error;
    }

    const executionTime = Date.now() - startTime;

    const result: SkillExecutionResult = {
      skill: skillName,
      agent: skillConfig.agent,
      timestamp: new Date().toISOString(),
      messages,
      summary: this.summarizeMessages(messages),
      recommendations: this.extractRecommendations(messages),
      performanceMetrics: {
        executionTime,
        m4Accelerated: true
      }
    };

    console.log(`✅ Skill execution complete (${executionTime}ms)`);

    return result;
  }

  /**
   * Get base system prompt for agent
   */
  private getAgentBasePrompt(agent: string): string {
    // Load from CLAUDE.md agent definitions
    // For now, return simplified version
    switch (agent) {
      case 'strategic-director':
        return 'You are the Strategic Director Agent for the Apple Intelligence Strategic Director system. Your expertise is in executive-level planning, technical validation, and workflow orchestration.';
      case 'oksana-creative':
        return 'You are the Oksana Creative Intelligence Agent for the Apple Intelligence Strategic Director system. Your expertise is in brand voice mastery, agency-level copywriting, and thematic consistency.';
      case 'figma-visual':
        return 'You are the Figma Visual Intelligence Agent for the Apple Intelligence Strategic Director system. Your expertise is in design-to-code automation, Apple HIG compliance, and visual excellence.';
      default:
        return '';
    }
  }

  /**
   * Summarize agent messages
   */
  private summarizeMessages(messages: any[]): string {
    return messages
      .filter(m => m.type === 'result')
      .map(m => m.result)
      .join('');
  }

  /**
   * Extract recommendations from messages
   */
  private extractRecommendations(messages: any[]): string[] {
    const recommendations: string[] = [];

    for (const message of messages) {
      if (message.type === 'result' && message.result) {
        const lines = message.result.split('');
        for (const line of lines) {
          if (
            line.includes('recommend') ||
            line.includes('should') ||
            line.includes('next step') ||
            line.includes('consider')
          ) {
            recommendations.push(line.trim());
          }
        }
      }
    }

    return recommendations;
  }

  /**
   * List all available skills
   */
  listSkills(): Array<{ name: string; config: SkillConfig }> {
    return Array.from(this.skills.entries()).map(([name, config]) => ({
      name,
      config
    }));
  }

  /**
   * Get skill configuration
   */
  getSkill(skillName: string): SkillConfig | undefined {
    return this.skills.get(skillName);
  }

  /**
   * Get skills by agent
   */
  getSkillsByAgent(agent: string): Array<{ name: string; config: SkillConfig }> {
    return this.listSkills().filter(skill => skill.config.agent === agent);
  }

  /**
   * Get skills by capability
   */
  getSkillsByCapability(capability: string): Array<{ name: string; config: SkillConfig }> {
    return this.listSkills().filter(skill =>
      skill.config.capabilities.includes(capability)
    );
  }
}

// CLI Interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const registry = new AgentSkillRegistry();

  const command = process.argv[2];
  const skillName = process.argv[3];
  const task = process.argv.slice(4).join(' ');

  (async () => {
    switch (command) {
      case 'list':
        console.log('📚 Available Skills:');
        const skills = registry.listSkills();
        skills.forEach(({ name, config }) => {
          console.log(`  ${name}`);
          console.log(`    Agent: ${config.agent}`);
          console.log(`    M4 Pathway: ${config.m4Pathway}`);
          console.log(`    Capabilities: ${config.capabilities.join(', ')}`);
          console.log('');
        });
        break;

      case 'execute':
        if (!skillName || !task) {
          console.error('Usage: node agent-skill-registry.ts execute <skill-name> <task>');
          process.exit(1);
        }

        const result = await registry.executeSkill(skillName, task);
        console.log('📊 Execution Result:');
        console.log(`Skill: ${result.skill}`);
        console.log(`Agent: ${result.agent}`);
        console.log(`Time: ${result.performanceMetrics?.executionTime}ms`);
        console.log(`Summary:${result.summary}`);
        if (result.recommendations.length > 0) {
          console.log(`Recommendations:`);
          result.recommendations.forEach(rec => console.log(`  - ${rec}`));
        }
        break;

      case 'info':
        if (!skillName) {
          console.error('Usage: node agent-skill-registry.ts info <skill-name>');
          process.exit(1);
        }

        const skill = registry.getSkill(skillName);
        if (!skill) {
          console.error(`Unknown skill: ${skillName}`);
          process.exit(1);
        }

        console.log(`📖 Skill Information: ${skillName}`);
        console.log(`Agent: ${skill.agent}`);
        console.log(`M4 Pathway: ${skill.m4Pathway}`);
        console.log(`Capabilities: ${skill.capabilities.join(', ')}`);
        console.log(`Tools: ${skill.allowedTools.join(', ')}`);
        if (skill.examples) {
          console.log(`Examples:`);
          skill.examples.forEach(ex => console.log(`  - ${ex}`));
        }
        break;

      default:
        console.log(`
📚 Agent Skill Registry

Usage:
  node agent-skill-registry.ts list
    List all available skills

  node agent-skill-registry.ts execute <skill-name> <task>
    Execute a skill with Claude agent

  node agent-skill-registry.ts info <skill-name>
    Get detailed information about a skill

Examples:
  node agent-skill-registry.ts list
  node agent-skill-registry.ts execute strategic-planning "Plan Shopify checkout redesign"
  node agent-skill-registry.ts execute brand-voice-validation "Validate product description"
  node agent-skill-registry.ts info design-system-automation
`);
    }
  })();
}

export default AgentSkillRegistry;
export { AgentSkillRegistry, SkillConfig, SkillExecutionResult };
