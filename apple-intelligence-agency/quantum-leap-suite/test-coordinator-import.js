#!/usr/bin/env node

console.log('Starting coordinator import test...');

try {
  console.log('Attempting to import coordinator...');
  const coordinatorModule = await import('./AppleIntelligenceStrategicDirectorCoordinator.js');
  console.log('✅ Coordinator module imported successfully!');
  console.log('Exported members:', Object.keys(coordinatorModule));

  console.log('Attempting to access coordinator singleton...');
  const { coordinator } = coordinatorModule;
  console.log('✅ Coordinator singleton accessed!');
  console.log('Coordinator status before init:', coordinator.initialized);

  process.exit(0);
} catch (error) {
  console.error('❌ Import failed:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}
