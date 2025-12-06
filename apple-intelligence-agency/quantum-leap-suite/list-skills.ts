/**
 * Simple Skill Lister (No SDK Required)
 * Lists available quantum-leap-suite skills without Claude Agent SDK
 *
 * Usage: npx tsx list-skills.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface SkillInfo {
  id: string;
  name: string;
  path: string;
  hasSkillDoc: boolean;
  description?: string;
}

const SKILL_DIRECTORIES = [
  'svg-generation',
  'vision-pro-ui-kit',
  'design-system-automation',
  'hexecute-game',
  'brand-voice-validation',
  'strategic-planning',
  'm4-code-generator',
  'agents',
  'api-clients',
  'config',
  'foundation-resources'
];

async function getSkillDescription(skillPath: string): Promise<string | undefined> {
  const skillMdPath = path.join(skillPath, 'SKILL.md');

  if (fs.existsSync(skillMdPath)) {
    try {
      const content = fs.readFileSync(skillMdPath, 'utf-8');
      // Extract first heading or first paragraph
      const lines = content.split('');
      for (const line of lines) {
        if (line.startsWith('# ')) {
          return line.replace('# ', '').trim();
        }
        if (line.trim() && !line.startsWith('#') && !line.startsWith('**')) {
          return line.trim();
        }
      }
    } catch (error) {
      return undefined;
    }
  }

  return undefined;
}

async function listSkills(): Promise<void> {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║   Quantum Leap Suite - Available Skills (No SDK)          ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  const skills: SkillInfo[] = [];

  for (const skillDir of SKILL_DIRECTORIES) {
    const skillPath = path.join(__dirname, skillDir);

    if (fs.existsSync(skillPath) && fs.statSync(skillPath).isDirectory()) {
      const hasSkillDoc = fs.existsSync(path.join(skillPath, 'SKILL.md'));
      const description = await getSkillDescription(skillPath);

      skills.push({
        id: skillDir,
        name: skillDir.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        path: skillPath,
        hasSkillDoc,
        description
      });
    }
  }

  // Sort by name
  skills.sort((a, b) => a.name.localeCompare(b.name));

  console.log(`Found ${skills.length} skills:`);

  skills.forEach((skill, index) => {
    console.log(`${index + 1}. ${skill.name}`);
    console.log(`   ID: ${skill.id}`);
    console.log(`   Path: ${skill.path}`);
    console.log(`   Documentation: ${skill.hasSkillDoc ? '✅ SKILL.md' : '❌ No SKILL.md'}`);
    if (skill.description) {
      console.log(`   Description: ${skill.description}`);
    }
    console.log('');
  });

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('💡 To view skill details:');
  console.log('   cat <skill-directory>/SKILL.md');
  console.log('💡 Integration Status:');
  console.log('   ✅ No Claude Agent SDK required');
  console.log('   ✅ Skills can be implemented as TypeScript pseudo-skills');
  console.log('   ✅ Direct access to design system tokens and components');
}

// Execute
const args = process.argv.slice(2);
const command = args[0] || 'list';

if (command === 'list' || args.length === 0) {
  listSkills().catch(console.error);
} else {
  console.error(`Unknown command: ${command}`);
  console.log('Usage: npx tsx list-skills.ts [list]');
  process.exit(1);
}
