import fs from 'fs-extra';
import path from 'path';
import { LoggerService } from '../logger/LoggerService';

interface ComponentOptions {
  type?: string;
  style?: string;
  path?: string;
}

export async function generateComponent(name: string, options: ComponentOptions = {}): Promise<void> {
  const logger = new LoggerService({ module: 'ComponentGenerator' });
  const componentType = options.type || 'functional';
  const styleType = options.style || 'css';
  const componentPath = options.path || 'src/components';
  
  const componentDir = path.join(process.cwd(), componentPath, name);
  const componentFile = path.join(componentDir, `${name}.tsx`);
  const styleFile = path.join(componentDir, `${name}.${styleType}`);
  const indexFile = path.join(componentDir, 'index.ts');
  
  try {
    // Create component directory
    await fs.ensureDir(componentDir);
    
    // Generate component file
    const componentContent = generateComponentContent(name, componentType, styleType);
    await fs.writeFile(componentFile, componentContent);
    
    // Generate style file
    const styleContent = generateStyleContent(name, styleType);
    await fs.writeFile(styleFile, styleContent);
    
    // Generate index file
    const indexContent = generateIndexContent(name);
    await fs.writeFile(indexFile, indexContent);
    
    logger.info(`Component files created in ${componentDir}`);
  } catch (error: any) {
    logger.error(`Failed to generate component files`, { error: error.message });
    throw error;
  }
}

function generateComponentContent(name: string, type: string, style: string): string {
  const className = `${name.toLowerCase()}-component`;
  const importStyle = style === 'css' || style === 'scss' ? `import './${name}.${style}';` : '';
  
  if (type === 'class') {
    return `import React, { Component } from 'react';
${importStyle}

interface ${name}Props {
  // Add your props here
}

interface ${name}State {
  // Add your state here
}

class ${name} extends Component<${name}Props, ${name}State> {
  constructor(props: ${name}Props) {
    super(props);
    this.state = {
      // Initialize your state here
    };
  }

  render() {
    return (
      <div className="${className}">
        <h1>${name} Component</h1>
        {/* Add your component content here */}
      </div>
    );
  }
}

export default ${name};
`;
  }
  
  return `import React from 'react';
${importStyle}

interface ${name}Props {
  // Add your props here
}

const ${name}: React.FC<${name}Props> = (props) => {
  return (
    <div className="${className}">
      <h1>${name} Component</h1>
      {/* Add your component content here */}
    </div>
  );
};

export default ${name};
`;
}

function generateStyleContent(name: string, style: string): string {
  const className = `${name.toLowerCase()}-component`;
  
  if (style === 'scss') {
    return `.${className} {
  // Add your SCSS styles here
  
  h1 {
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}
`;
  }
  
  return `.${className} {
  /* Add your CSS styles here */
}

.${className} h1 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
`;
}

function generateIndexContent(name: string): string {
  return `export { default } from './${name}';
export type { ${name}Props } from './${name}';
`;
} 