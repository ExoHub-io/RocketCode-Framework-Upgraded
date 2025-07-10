# 🚀 RocketCode Framework - Installation Guide

## Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Git

## Quick Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Framework

```bash
npm run build
```

### 3. Test the Build

```bash
npm test
```

## Development Setup

### 1. Install Development Dependencies

```bash
npm install
```

### 2. Start Development Mode

```bash
npm run dev
```

This will start the TypeScript compiler in watch mode and rebuild the project automatically when files change.

### 3. Linting and Formatting

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

## Publishing to npm

### 1. Build for Production

```bash
npm run build
```

### 2. Test the Package

```bash
npm pack
```

This creates a `.tgz` file that you can test locally.

### 3. Publish to npm

```bash
npm publish
```

## Using the CLI

### Install CLI Globally

```bash
npm install -g rocketcode-framework-upgraded
```

### Create a New Application

```bash
npx create-rocketcode-app my-app
cd my-app
npm install
npm run dev
```

### Use CLI Commands

```bash
# Generate a component
rocketcode generate component Button

# Generate a module
rocketcode generate module Auth

# Generate a page
rocketcode generate page About

# Show framework info
rocketcode info
```

## Environment Variables

Create a `.env` file in your project root:

```env
# Application
NODE_ENV=development
PORT=3000
APP_NAME=RocketCode App
APP_VERSION=1.0.0

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
DB_HOST=localhost
DB_PORT=5432
DB_NAME=rocketcode
DB_USERNAME=user
DB_PASSWORD=password

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Logging
LOG_LEVEL=info
LOG_ENABLE_COLORS=true
LOG_ENABLE_TIMESTAMP=true
```

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Make sure you have the latest version of TypeScript installed
2. **Build Failures**: Clear the `dist` directory and rebuild: `npm run clean && npm run build`
3. **CLI Not Found**: Make sure the package is installed globally or use `npx`

### Getting Help

- Check the [README.md](README.md) for detailed documentation
- Look at the [examples](examples/) directory for usage examples
- Open an issue on GitHub if you encounter problems

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 