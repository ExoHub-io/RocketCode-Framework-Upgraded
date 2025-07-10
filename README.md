# 🚀 RocketCode Framework Upgraded

A modern meta-framework built on Next.js and React with built-in TypeScript support, beautiful logging, CLI tools, and modular architecture.

## ✨ Features

- **🔄 Full Next.js Support**: SSR, SSG, and CSR rendering modes
- **📝 TypeScript & JavaScript**: Complete support for both languages
- **🎨 Beautiful Logging**: NestJS-style logger with color coding and context
- **🛠️ CLI Tools**: Generate components, modules, and pages with ease
- **📦 Modular Architecture**: Organized project structure with modules and services
- **⚡ Modern Build Tools**: tsup for fast builds with ESM and CJS support
- **🎯 Ready-to-Use**: Pre-configured with all necessary tools and settings

## 🚀 Quick Start

### Create a new RocketCode application

```bash
npx create-rocketcode-app my-app
cd my-app
npm install
npm run dev
```

### Install in existing project

```bash
npm install rocketcode-framework-upgraded
```

## 📦 Installation

```bash
npm install rocketcode-framework-upgraded
```

## 🛠️ CLI Usage

RocketCode Framework includes powerful CLI tools for generating components, modules, and pages:

### Generate Components

```bash
# Generate a functional component
rocketcode generate component Button

# Generate a class component with SCSS
rocketcode generate component UserCard --type class --style scss

# Generate with custom path
rocketcode generate component Modal --path src/shared/components
```

### Generate Modules

```bash
# Generate a module
rocketcode generate module Auth

# Generate module with components
rocketcode generate module Dashboard --components Header,Sidebar,Content

# Generate with custom path
rocketcode generate module Admin --path src/modules/admin
```

### Generate Pages

```bash
# Generate SSR page
rocketcode generate page About

# Generate SSG page
rocketcode generate page Blog --type ssg

# Generate CSR page
rocketcode generate page Dashboard --type csr
```

### CLI Commands

```bash
# Show framework information
rocketcode info

# Initialize configuration
rocketcode config init
```

## 📁 Project Structure

```
src/
├── pages/          # Next.js pages
├── components/     # Reusable React components
├── modules/        # Feature modules
├── services/       # Business logic services
├── config/         # Configuration files
└── utils/          # Utility functions
```

## 🔧 Configuration

Create a `rocket.config.ts` file in your project root:

```typescript
import { AppConfig } from 'rocketcode-framework-upgraded';

const config: AppConfig = {
  app: {
    name: 'My RocketCode App',
    version: '1.0.0',
    port: 3000,
    env: process.env.NODE_ENV || 'development',
  },
  database: {
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    name: process.env.DB_NAME || 'myapp',
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
```

## 📝 Logger Usage

The built-in logger provides beautiful, structured logging:

```typescript
import { LoggerService, LogLevel } from 'rocketcode-framework-upgraded';

// Create logger instance
const logger = new LoggerService({ 
  module: 'UserService',
  level: LogLevel.DEBUG 
});

// Basic logging
logger.info('User logged in successfully');
logger.debug('Processing user data', { userId: '123' });
logger.warn('Rate limit approaching');
logger.error('Database connection failed', { error: 'Connection timeout' });

// Request logging
logger.logRequest('GET', '/api/users', 200, 150, { userId: '123' });

// Database logging
logger.logDatabase('SELECT * FROM users WHERE id = ?', 25, { userId: '123' });

// Child logger with additional context
const childLogger = logger.child({ requestId: 'req-456' });
childLogger.info('Processing request');
```

## 🏗️ Framework Usage

### Create Application

```typescript
import { createApp } from 'rocketcode-framework-upgraded';

const app = createApp({
  name: 'My App',
  version: '1.0.0',
  logLevel: 'debug',
  enableDatabase: true,
});

await app.start();
```

### Create Module

```typescript
import { createModule } from 'rocketcode-framework-upgraded';

const authModule = createModule({
  name: 'Auth',
  version: '1.0.0',
  components: ['LoginForm', 'RegisterForm'],
});

await authModule.init();
```

### Create Component

```typescript
import { createComponent } from 'rocketcode-framework-upgraded';

const buttonComponent = createComponent({
  name: 'Button',
  type: 'component',
});

await buttonComponent.init();
```

## 🔌 Services

### Environment Service

```typescript
import { EnvService } from 'rocketcode-framework-upgraded';

const env = new EnvService();

// Get environment variables
const port = env.getNumber('PORT', 3000);
const isDev = env.isDevelopment();
const dbUrl = env.getDatabaseUrl();

// Validate required variables
env.validateRequired(['DATABASE_URL', 'JWT_SECRET']);
```

### Config Service

```typescript
import { ConfigService } from 'rocketcode-framework-upgraded';

const config = new ConfigService();

// Get configuration sections
const appConfig = config.getApp();
const dbConfig = config.getDatabase();
const authConfig = config.getAuth();

// Validate configuration
config.validate();
```

### Database Service

```typescript
import { DatabaseService } from 'rocketcode-framework-upgraded';

const db = new DatabaseService();

// Connect to database
await db.connect();

// Execute queries
const result = await db.query('SELECT * FROM users WHERE id = ?', [123]);

// Disconnect
await db.disconnect();
```

## 🎨 Styling

RocketCode Framework supports multiple styling approaches:

### CSS/SCSS
```bash
rocketcode generate component Button --style css
rocketcode generate component Card --style scss
```

### Tailwind CSS
```bash
rocketcode generate component Button --style tailwind
```

### Styled Components
```bash
rocketcode generate component Button --style styled
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 📚 Examples

### Basic Component

```typescript
import React from 'react';
import { LoggerService } from 'rocketcode-framework-upgraded';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary' 
}) => {
  const logger = new LoggerService({ module: 'Button' });

  const handleClick = () => {
    logger.debug('Button clicked', { variant });
    onClick?.();
  };

  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
```

### API Route with Logging

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { LoggerService } from 'rocketcode-framework-upgraded';

const logger = new LoggerService({ module: 'API' });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const startTime = Date.now();
  
  try {
    logger.logRequest(req.method!, req.url!);
    
    // Your API logic here
    const data = await fetchData();
    
    const duration = Date.now() - startTime;
    logger.info('API request completed', { duration });
    
    res.status(200).json(data);
  } catch (error: any) {
    const duration = Date.now() - startTime;
    logger.error('API request failed', { 
      error: error.message, 
      duration 
    });
    
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 [Documentation](https://rocketcode.dev)
- 💬 [Discord Community](https://discord.gg/rocketcode)
- 🐛 [Issue Tracker](https://github.com/rocketcode/framework/issues)
- 📧 [Email Support](mailto:support@rocketcode.dev)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [React](https://reactjs.org/) - The UI library
- [TypeScript](https://www.typescriptlang.org/) - The programming language
- [Chalk](https://github.com/chalk/chalk) - Terminal string styling

---

Made with ❤️ by the RocketCode Team 