#!/usr/bin/env node

import { inspect } from './inspector.js';

async function main() {
  const skillsDir = process.argv[2] || '.claude/skills';

  console.log(`gem2-skill-inspector — scanning ${skillsDir}\n`);

  const report = await inspect(skillsDir);

  console.log(`Skills found: ${report.totalSkills}`);
  console.log(`Total tokens: ${report.totalTokens}`);
  console.log(`Trigger collisions: ${report.collisions.length}`);
  console.log(`Duplicates: ${report.duplicates.length}`);

  if (report.recommendations.length > 0) {
    console.log('\nRecommendations:');
    report.recommendations.forEach((r, i) => console.log(`  ${i + 1}. ${r}`));
  }
}

main().catch(console.error);
