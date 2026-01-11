/**
 * Apple Intelligence Strategic Director: Example Usage
 *
 * This file demonstrates how to use the multi-agent coordinator
 * for various tasks across product planning, brand content, and design.
 */

import AppleIntelligenceStrategicDirectorCoordinator from './agents/agent-coordinator';

/**
 * Example 1: Create a Branded Product Card Component
 */
async function example1_BrandedProductCard() {
  console.log('=== Example 1: Branded Product Card ===');

  const coordinator = new AppleIntelligenceStrategicDirectorCoordinator();

  const result = await coordinator.coordinateTask(
    "Create a premium Petersen Games product card component for Cthulhu Wars expansion",
    {
      brand: "petersen-games",
      productName: "Cthulhu Wars: Onslaught Four",
      platforms: ["swiftui", "react"],
      designSystem: "quantum-spatial"
    }
  );

  console.log('Agents Used:', result.agentsUsed);
  console.log('Unified Recommendations:');
  result.unifiedRecommendations.forEach(rec => console.log(`  - ${rec}`));
  console.log('Next Steps:');
  result.nextSteps.forEach(step => console.log(`  - ${step}`));
}

/**
 * Example 2: Plan a New Feature
 */
async function example2_FeaturePlanning() {
  console.log('=== Example 2: Feature Planning ===');

  const coordinator = new AppleIntelligenceStrategicDirectorCoordinator();

  const result = await coordinator.coordinateTask(
    "Plan Apple Pay checkout integration for Petersen Games e-commerce store",
    {
      scope: "full-feature",
      timeline: "4-week sprint",
      platforms: ["ios", "web"],
      integration: ["shopify", "apple-pay"]
    }
  );

  console.log('Agents Used:', result.agentsUsed);
  console.log('Unified Recommendations:');
  result.unifiedRecommendations.forEach(rec => console.log(`  - ${rec}`));
}

/**
 * Example 3: Validate Brand Content
 */
async function example3_BrandValidation() {
  console.log('=== Example 3: Brand Content Validation ===');

  const coordinator = new AppleIntelligenceStrategicDirectorCoordinator();

  const contentToValidate = `
    Unleash cosmic terror upon an unsuspecting world. This meticulously crafted
    collector's edition brings the Cthulhu mythos to life with stunning miniatures,
    premium components, and gameplay that rewards strategic mastery.
  `;

  const result = await coordinator.coordinateTask(
    "Validate this product description for Petersen Games brand alignment",
    {
      brand: "petersen-games",
      contentType: "product-description",
      content: contentToValidate
    }
  );

  console.log('Agents Used:', result.agentsUsed);
  console.log('Brand Validation Results:');
  result.results.forEach(r => {
    if (r.agent === 'oksana-creative') {
      console.log('Brand Alignment Analysis:');
      console.log(r.summary);
    }
  });
}

/**
 * Example 4: Generate Component Variations
 */
async function example4_ComponentVariations() {
  console.log('=== Example 4: Component Variations ===');

  const coordinator = new AppleIntelligenceStrategicDirectorCoordinator();

  const result = await coordinator.coordinateTask(
    "Generate dark mode, light mode, and mobile variations of the navigation header component",
    {
      baseComponent: "navigation-header",
      variations: ["dark", "light", "mobile", "tablet", "desktop"],
      designSystem: "quantum-spatial",
      platform: "swiftui"
    }
  );

  console.log('Agents Used:', result.agentsUsed);
  console.log('Component Variations Generated:');
  result.unifiedRecommendations.forEach(rec => console.log(`  - ${rec}`));
}

/**
 * Example 5: Multi-Agent Product Launch
 */
async function example5_ProductLaunch() {
  console.log('=== Example 5: Complete Product Launch ===');

  const coordinator = new AppleIntelligenceStrategicDirectorCoordinator();

  const result = await coordinator.coordinateTask(
    "Prepare complete product launch for Cthulhu Wars new expansion including technical architecture, brand-aligned marketing copy, and e-commerce UI components",
    {
      product: "Cthulhu Wars: Onslaught Four",
      scope: "full-launch",
      deliverables: [
        "technical-architecture",
        "product-descriptions",
        "landing-page-copy",
        "checkout-flow-ui",
        "email-campaign"
      ],
      timeline: "6 weeks",
      brand: "petersen-games"
    }
  );

  console.log('Agents Used:', result.agentsUsed);
  console.log('Product Launch Plan:');
  result.unifiedRecommendations.forEach(rec => console.log(`  - ${rec}`));
  console.log('Deployment Checklist:');
  result.nextSteps.forEach(step => console.log(`  - ${step}`));
}

/**
 * Example 6: Query Specific Agent
 */
async function example6_QuerySpecificAgent() {
  console.log('=== Example 6: Query Specific Agent ===');

  const coordinator = new AppleIntelligenceStrategicDirectorCoordinator();

  // Get agent details
  const strategicDirector = coordinator.getAgent('strategic-director');
  console.log('Strategic Director Agent:');
  console.log('  Name:', strategicDirector?.name);
  console.log('  Skills:', strategicDirector?.skills);
  console.log('  M4 Pathway:', strategicDirector?.m4Pathway);

  // List all agents
  const allAgents = coordinator.listAgents();
  console.log('All Available Agents:');
  allAgents.forEach(agent => {
    console.log(`  - ${agent.name} (${agent.id})`);
    console.log(`    Priority: ${agent.priority}`);
    console.log(`    M4 Pathway: ${agent.m4Pathway}`);
  });
}

/**
 * Run all examples
 */
async function runAllExamples() {
  try {
    await example1_BrandedProductCard();
    await example2_FeaturePlanning();
    await example3_BrandValidation();
    await example4_ComponentVariations();
    await example5_ProductLaunch();
    await example6_QuerySpecificAgent();

    console.log('✅ All examples completed successfully!');
  } catch (error) {
    console.error('❌ Error running examples:', error);
  }
}

// Uncomment to run examples:
// runAllExamples();

export {
  example1_BrandedProductCard,
  example2_FeaturePlanning,
  example3_BrandValidation,
  example4_ComponentVariations,
  example5_ProductLaunch,
  example6_QuerySpecificAgent,
  runAllExamples
};
