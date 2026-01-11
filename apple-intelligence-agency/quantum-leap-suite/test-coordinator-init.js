#!/usr/bin/env node

console.log('🧪 Testing Apple Intelligence Strategic Director Coordinator Initialization');
console.log('='.repeat(80));

try {
  console.log('📦 Step 1: Importing coordinator module...');
  const { coordinator } = await import('./AppleIntelligenceStrategicDirectorCoordinator.js');
  console.log('✅ Import successful');

  console.log('🚀 Step 2: Initializing coordinator...');
  console.log('   This may take a moment as it loads validation frameworks...');

  const initResult = await coordinator.initialize();

  console.log('✅ INITIALIZATION SUCCESSFUL!');
  console.log('='.repeat(80));

  console.log('📊 Coordinator Status:');
  const status = coordinator.getStatus();
  console.log(JSON.stringify(status, null, 2));

  console.log('🎯 Test Complete - All Systems Operational');
  process.exit(0);

} catch (error) {
  console.error('❌ INITIALIZATION FAILED');
  console.error('='.repeat(80));
  console.error('Error:', error.message);
  console.error('Stack Trace:');
  console.error(error.stack);
  process.exit(1);
}
