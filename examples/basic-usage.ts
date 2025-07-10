import { 
  createApp, 
  createModule, 
  createComponent,
  LoggerService,
  LogLevel 
} from '../src/index';

// Example: Creating a RocketCode application
async function exampleApp() {
  console.log('🚀 RocketCode Framework Example\n');

  // Create the main application
  const app = createApp({
    name: 'Example App',
    version: '1.0.0',
    logLevel: 'debug',
    enableDatabase: true,
  });

  // Create a module
  const authModule = createModule({
    name: 'Auth',
    version: '1.0.0',
    components: ['LoginForm', 'RegisterForm'],
  });

  // Create components
  const loginComponent = createComponent({
    name: 'LoginForm',
    type: 'component',
  });

  const registerComponent = createComponent({
    name: 'RegisterForm',
    type: 'component',
  });

  // Add components to module
  authModule.components.push(loginComponent, registerComponent);

  // Add module to app
  app.modules.push(authModule);

  // Start the application
  await app.start();

  // Simulate some work
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Stop the application
  await app.stop();
}

// Example: Using the logger
function exampleLogger() {
  console.log('\n📝 Logger Example\n');

  const logger = new LoggerService({ 
    module: 'ExampleService',
    level: LogLevel.DEBUG 
  });

  // Basic logging
  logger.info('Application started');
  logger.debug('Processing user data', { userId: '123', action: 'login' });
  logger.warn('Rate limit approaching', { current: 95, limit: 100 });
  logger.error('Database connection failed', { error: 'Connection timeout' });

  // Request logging
  logger.logRequest('GET', '/api/users', 200, 150, { userId: '123' });
  logger.logRequest('POST', '/api/users', 201, 200, { userId: '456' });

  // Database logging
  logger.logDatabase('SELECT * FROM users WHERE id = ?', 25, { userId: '123' });
  logger.logDatabase('INSERT INTO users (name, email) VALUES (?, ?)', 50, { userId: '456' });

  // Child logger with additional context
  const childLogger = logger.child({ requestId: 'req-789', sessionId: 'sess-123' });
  childLogger.info('Processing request with additional context');
  childLogger.debug('Request details', { method: 'POST', path: '/api/data' });
}

// Example: Framework utilities
async function exampleFramework() {
  console.log('\n🏗️ Framework Example\n');

  // Create application with custom configuration
  const app = createApp({
    name: 'Custom App',
    version: '2.0.0',
    logLevel: 'info',
    enableDatabase: false,
  });

  // Create a custom module
  const dashboardModule = createModule({
    name: 'Dashboard',
    version: '1.0.0',
    components: ['Header', 'Sidebar', 'Content'],
  });

  // Create dashboard components
  const headerComponent = createComponent({
    name: 'Header',
    type: 'component',
  });

  const sidebarComponent = createComponent({
    name: 'Sidebar',
    type: 'component',
  });

  const contentComponent = createComponent({
    name: 'Content',
    type: 'component',
  });

  // Add components to module
  dashboardModule.components.push(headerComponent, sidebarComponent, contentComponent);

  // Add module to app
  app.modules.push(dashboardModule);

  // Start application
  await app.start();

  // Simulate module operations
  console.log(`Module '${dashboardModule.name}' has ${dashboardModule.components.length} components`);

  // Stop application
  await app.stop();
}

// Run examples
async function runExamples() {
  try {
    await exampleApp();
    exampleLogger();
    await exampleFramework();
    
    console.log('\n✅ All examples completed successfully!');
  } catch (error: any) {
    console.error('❌ Example failed:', error.message);
  }
}

// Export for use in other files
export { exampleApp, exampleLogger, exampleFramework, runExamples };

// Run if this file is executed directly
if (require.main === module) {
  runExamples();
} 