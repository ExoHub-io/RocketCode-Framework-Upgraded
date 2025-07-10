#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { LoggerService } from './logger/LoggerService';
import chalk from 'chalk';

interface CreateAppOptions {
  name: string;
  template?: string;
  typescript?: boolean;
  tailwind?: boolean;
  eslint?: boolean;
  prettier?: boolean;
}

export async function createApp(options: CreateAppOptions): Promise<void> {
  const logger = new LoggerService({ module: 'CreateApp' });
  const { name, template = 'default', typescript = true, tailwind = true, eslint = true, prettier = true } = options;
  
  const projectPath = path.join(process.cwd(), name);
  
  try {
    logger.info(`Creating RocketCode application: ${chalk.cyan(name)}`);
    
    // Check if directory already exists
    if (await fs.pathExists(projectPath)) {
      throw new Error(`Directory ${name} already exists`);
    }
    
    // Create project directory
    await fs.ensureDir(projectPath);
    
    // Generate project structure
    await generateProjectStructure(projectPath, { typescript, tailwind, eslint, prettier });
    
    // Generate package.json
    await generatePackageJson(projectPath, name, { typescript, tailwind, eslint, prettier });
    
    // Generate configuration files
    await generateConfigFiles(projectPath, { typescript, tailwind, eslint, prettier });
    
    // Generate source files
    await generateSourceFiles(projectPath, { typescript, tailwind });
    
    // Generate README
    await generateReadme(projectPath, name);
    
    logger.info(`✅ RocketCode application created successfully in ${chalk.green(projectPath)}`);
    logger.info(`\nNext steps:`);
    logger.info(`  ${chalk.cyan('cd')} ${name}`);
    logger.info(`  ${chalk.cyan('npm install')}`);
    logger.info(`  ${chalk.cyan('npm run dev')}`);
    
  } catch (error: any) {
    logger.error(`Failed to create application`, { error: error.message });
    throw error;
  }
}

async function generateProjectStructure(projectPath: string, options: any): Promise<void> {
  const dirs = [
    'src',
    'src/pages',
    'src/components',
    'src/modules',
    'src/services',
    'src/config',
    'src/utils',
    'public',
    'styles'
  ];
  
  for (const dir of dirs) {
    await fs.ensureDir(path.join(projectPath, dir));
  }
}

async function generatePackageJson(projectPath: string, name: string, options: any): Promise<void> {
  const packageJson = {
    name,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
      'rocket:generate': 'rocketcode generate',
      'rocket:component': 'rocketcode generate component',
      'rocket:module': 'rocketcode generate module',
      'rocket:page': 'rocketcode generate page'
    },
    dependencies: {
      next: '^14.0.0',
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'rocketcode-framework-upgraded': '^1.0.0'
    },
    devDependencies: {
      '@types/node': '^20.8.0',
      '@types/react': '^18.2.0',
      '@types/react-dom': '^18.2.0',
      typescript: '^5.2.0'
    }
  };
  
  if (options.typescript) {
    packageJson.devDependencies['@types/node'] = '^20.8.0';
    packageJson.devDependencies['@types/react'] = '^18.2.0';
    packageJson.devDependencies['@types/react-dom'] = '^18.2.0';
    packageJson.devDependencies['typescript'] = '^5.2.0';
  }
  
  if (options.tailwind) {
    packageJson.devDependencies['tailwindcss'] = '^3.3.0';
    packageJson.devDependencies['autoprefixer'] = '^10.4.16';
    packageJson.devDependencies['postcss'] = '^8.4.31';
  }
  
  if (options.eslint) {
    packageJson.devDependencies['eslint'] = '^8.51.0';
    packageJson.devDependencies['eslint-config-next'] = '^14.0.0';
  }
  
  if (options.prettier) {
    packageJson.devDependencies['prettier'] = '^3.0.3';
  }
  
  await fs.writeJson(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });
}

async function generateConfigFiles(projectPath: string, options: any): Promise<void> {
  // Next.js config
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
`;
  await fs.writeFile(path.join(projectPath, 'next.config.js'), nextConfig);
  
  // TypeScript config
  if (options.typescript) {
    const tsConfig = {
      compilerOptions: {
        target: 'ES2020',
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        noEmit: true,
        esModuleInterop: true,
        module: 'ESNext',
        moduleResolution: 'node',
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: 'preserve',
        incremental: true,
        plugins: [{ name: 'next' }],
        baseUrl: '.',
        paths: {
          '@/*': ['./src/*'],
          '@/components/*': ['./src/components/*'],
          '@/pages/*': ['./src/pages/*'],
          '@/modules/*': ['./src/modules/*'],
          '@/services/*': ['./src/services/*'],
          '@/config/*': ['./src/config/*'],
          '@/utils/*': ['./src/utils/*']
        }
      },
      include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      exclude: ['node_modules']
    };
    await fs.writeJson(path.join(projectPath, 'tsconfig.json'), tsConfig, { spaces: 2 });
  }
  
  // Tailwind config
  if (options.tailwind) {
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}
`;
    await fs.writeFile(path.join(projectPath, 'tailwind.config.js'), tailwindConfig);
    
    const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;
    await fs.writeFile(path.join(projectPath, 'postcss.config.js'), postcssConfig);
  }
  
  // ESLint config
  if (options.eslint) {
    const eslintConfig = {
      extends: ['next/core-web-vitals'],
      rules: {
        '@next/next/no-img-element': 'off',
      }
    };
    await fs.writeJson(path.join(projectPath, '.eslintrc.json'), eslintConfig, { spaces: 2 });
  }
  
  // Prettier config
  if (options.prettier) {
    const prettierConfig = {
      semi: true,
      trailingComma: 'es5',
      singleQuote: true,
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
    };
    await fs.writeJson(path.join(projectPath, '.prettierrc'), prettierConfig, { spaces: 2 });
  }
  
  // RocketCode config
  const rocketConfig = `import { AppConfig } from 'rocketcode-framework-upgraded';

const config: AppConfig = {
  app: {
    name: 'RocketCode App',
    version: '1.0.0',
    port: 3000,
    env: process.env.NODE_ENV || 'development',
  },
  database: {
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    name: process.env.DB_NAME || 'rocketcode',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    enableColors: process.env.LOG_ENABLE_COLORS !== 'false',
    enableTimestamp: process.env.LOG_ENABLE_TIMESTAMP !== 'false',
  },
};

export default config;
`;
  await fs.writeFile(path.join(projectPath, 'rocket.config.ts'), rocketConfig);
}

async function generateSourceFiles(projectPath: string, options: any): Promise<void> {
  const ext = options.typescript ? 'tsx' : 'jsx';
  
  // Main page
  const mainPage = `import React from 'react';
import Head from 'next/head';
import { LoggerService } from 'rocketcode-framework-upgraded';
${options.tailwind ? "import '../styles/globals.css';" : ''}

const logger = new LoggerService({ module: 'HomePage' });

export default function Home() {
  React.useEffect(() => {
    logger.info('Home page loaded');
  }, []);

  return (
    <>
      <Head>
        <title>RocketCode App</title>
        <meta name="description" content="Built with RocketCode Framework" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-8">
              🚀 RocketCode Framework
            </h1>
            <p className="text-xl mb-8">
              Modern Next.js and React meta-framework with built-in logging and CLI tools
            </p>
            <div className="space-y-4">
              <p className="text-lg">
                ✨ TypeScript Support
              </p>
              <p className="text-lg">
                🎨 Beautiful Logging
              </p>
              <p className="text-lg">
                🛠️ CLI Tools
              </p>
              <p className="text-lg">
                📦 Modular Architecture
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
`;
  await fs.writeFile(path.join(projectPath, `src/pages/index.${ext}`), mainPage);
  
  // Global styles
  if (options.tailwind) {
    const globalStyles = `@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
`;
    await fs.writeFile(path.join(projectPath, 'styles/globals.css'), globalStyles);
  }
  
  // _app file
  const appFile = `import type { AppProps } from 'next/app';
${options.tailwind ? "import '../styles/globals.css';" : ''}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
`;
  await fs.writeFile(path.join(projectPath, `src/pages/_app.${ext}`), appFile);
  
  // _document file
  const documentFile = `import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
`;
  await fs.writeFile(path.join(projectPath, `src/pages/_document.${ext}`), documentFile);
}

async function generateReadme(projectPath: string, name: string): Promise<void> {
  const readme = `# ${name}

This is a [RocketCode Framework](https://github.com/rocketcode/framework) application.

## Getting Started

First, install the dependencies:

\`\`\`bash
npm install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## RocketCode CLI

This project includes RocketCode CLI tools for generating components, modules, and pages:

\`\`\`bash
# Generate a component
npm run rocket:component Button

# Generate a module
npm run rocket:module Auth

# Generate a page
npm run rocket:page About
\`\`\`

## Learn More

To learn more about RocketCode Framework, take a look at the following resources:

- [RocketCode Documentation](https://rocketcode.dev) - learn about RocketCode features and API.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

## Deploy on Vercel

The easiest way to deploy your RocketCode app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [RocketCode deployment documentation](https://rocketcode.dev/docs/deployment) for more details.
`;
  await fs.writeFile(path.join(projectPath, 'README.md'), readme);
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const name = args[0];
  
  if (!name) {
    console.error('Please provide a project name');
    process.exit(1);
  }
  
  createApp({ name }).catch((error) => {
    console.error('Failed to create app:', error.message);
    process.exit(1);
  });
} 