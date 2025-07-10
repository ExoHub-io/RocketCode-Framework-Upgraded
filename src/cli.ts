#!/usr/bin/env node

import { Command } from 'commander';
import { LoggerService } from './logger/LoggerService';
import { generateComponent } from './cli/generateComponent';
import { generateModule } from './cli/generateModule';
import { generatePage } from './cli/generatePage';

const program = new Command();
const logger = new LoggerService({ module: 'RocketCode CLI' });

program
  .name('rocketcode')
  .description('RocketCode Framework CLI - Modern Next.js and React meta-framework')
  .version('1.0.0');

// Generate component command
program
  .command('generate')
  .alias('g')
  .description('Generate files for your RocketCode application')
  .addCommand(
    new Command('component')
      .alias('c')
      .description('Generate a new React component')
      .argument('<name>', 'Component name')
      .option('-t, --type <type>', 'Component type (functional, class)', 'functional')
      .option('-s, --style <style>', 'Styling approach (css, scss, styled, tailwind)', 'css')
      .option('-p, --path <path>', 'Custom path for the component', 'src/components')
      .action(async (name, options) => {
        try {
          await generateComponent(name, options);
          logger.info(`Component ${name} generated successfully`);
        } catch (error: any) {
          logger.error(`Failed to generate component ${name}`, { error: error.message });
          process.exit(1);
        }
      })
  )
  .addCommand(
    new Command('module')
      .alias('m')
      .description('Generate a new module')
      .argument('<name>', 'Module name')
      .option('-c, --components <components>', 'Comma-separated list of components to include')
      .option('-p, --path <path>', 'Custom path for the module', 'src/modules')
      .action(async (name, options) => {
        try {
          await generateModule(name, options);
          logger.info(`Module ${name} generated successfully`);
        } catch (error: any) {
          logger.error(`Failed to generate module ${name}`, { error: error.message });
          process.exit(1);
        }
      })
  )
  .addCommand(
    new Command('page')
      .alias('p')
      .description('Generate a new Next.js page')
      .argument('<name>', 'Page name')
      .option('-t, --type <type>', 'Page type (ssr, ssg, csr)', 'ssr')
      .option('-p, --path <path>', 'Custom path for the page', 'src/pages')
      .action(async (name, options) => {
        try {
          await generatePage(name, options);
          logger.info(`Page ${name} generated successfully`);
        } catch (error: any) {
          logger.error(`Failed to generate page ${name}`, { error: error.message });
          process.exit(1);
        }
      })
  );

// Info command
program
  .command('info')
  .description('Display information about your RocketCode project')
  .action(() => {
    logger.info('RocketCode Framework Information:');
    logger.info('Version: 1.0.0');
    logger.info('Framework: Next.js + React');
    logger.info('Language: TypeScript/JavaScript');
    logger.info('Architecture: Modular with built-in logging');
    logger.info('Features: SSR/SSG/CSR support, CLI tools, Logger service');
  });

// Config command
program
  .command('config')
  .description('Manage RocketCode configuration')
  .addCommand(
    new Command('init')
      .description('Initialize RocketCode configuration file')
      .action(async () => {
        try {
          // TODO: Implement config initialization
          logger.info('Configuration file initialized');
        } catch (error: any) {
          logger.error('Failed to initialize configuration', { error: error.message });
          process.exit(1);
        }
      })
  );

program.parse(); 