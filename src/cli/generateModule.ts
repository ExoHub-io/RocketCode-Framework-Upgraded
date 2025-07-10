import fs from 'fs-extra';
import path from 'path';
import { LoggerService } from '../logger/LoggerService';

interface ModuleOptions {
  components?: string;
  path?: string;
}

export async function generateModule(name: string, options: ModuleOptions = {}): Promise<void> {
  const logger = new LoggerService({ module: 'ModuleGenerator' });
  const modulePath = options.path || 'src/modules';
  const components = options.components ? options.components.split(',') : [];
  
  const moduleDir = path.join(process.cwd(), modulePath, name);
  const moduleFile = path.join(moduleDir, `${name}.module.ts`);
  const indexFile = path.join(moduleDir, 'index.ts');
  const componentsDir = path.join(moduleDir, 'components');
  
  try {
    // Create module directory
    await fs.ensureDir(moduleDir);
    await fs.ensureDir(componentsDir);
    
    // Generate module file
    const moduleContent = generateModuleContent(name, components);
    await fs.writeFile(moduleFile, moduleContent);
    
    // Generate index file
    const indexContent = generateModuleIndexContent(name);
    await fs.writeFile(indexFile, indexContent);
    
    // Generate component files if specified
    for (const componentName of components) {
      const componentFile = path.join(componentsDir, `${componentName}.tsx`);
      const componentContent = generateModuleComponentContent(componentName, name);
      await fs.writeFile(componentFile, componentContent);
    }
    
    logger.info(`Module files created in ${moduleDir}`);
  } catch (error: any) {
    logger.error(`Failed to generate module files`, { error: error.message });
    throw error;
  }
}

function generateModuleContent(name: string, components: string[]): string {
  const componentImports = components.map(comp => `import ${comp} from './components/${comp}';`).join('\n');
  const componentExports = components.map(comp => `  ${comp},`).join('\n');
  
  return `import { createModule } from 'rocketcode-framework-upgraded';
${componentImports}

export class ${name}Module {
  private module: any;

  constructor() {
    this.module = createModule({
      name: '${name}',
      version: '1.0.0',
      components: [${components.map(comp => `'${comp}'`).join(', ')}]
    });
  }

  async init(): Promise<void> {
    await this.module.init();
  }

  async destroy(): Promise<void> {
    await this.module.destroy();
  }

  getModule() {
    return this.module;
  }
}

export default ${name}Module;
`;
}

function generateModuleIndexContent(name: string): string {
  return `export { default, ${name}Module } from './${name}.module';
`;
}

function generateModuleComponentContent(componentName: string, moduleName: string): string {
  return `import React from 'react';

interface ${componentName}Props {
  // Add your props here
}

const ${componentName}: React.FC<${componentName}Props> = (props) => {
  return (
    <div className="${componentName.toLowerCase()}-component">
      <h2>${componentName} Component</h2>
      <p>This component belongs to the ${moduleName} module.</p>
      {/* Add your component content here */}
    </div>
  );
};

export default ${componentName};
`;
} 