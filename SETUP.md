# Настройка и запуск RocketCode Framework

## Предварительные требования

- Node.js 18+ 
- npm или yarn

## Установка зависимостей

```bash
# Установка всех зависимостей
npm install

# Или с использованием yarn
yarn install
```

## Сборка пакетов

```bash
# Сборка всех пакетов
npm run build

# Сборка отдельных пакетов
npm run build:core
npm run build:router
npm run build:ssr
```

## Запуск примеров

### Базовое приложение

```bash
cd examples/basic-app
npm install
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

### SSR приложение

```bash
cd examples/ssr-app
npm install
npm run dev
```

SSR приложение будет доступно по адресу: http://localhost:3001

## Разработка

### Режим разработки для пакетов

```bash
# Ядро фреймворка
npm run dev:core

# Роутер
npm run dev:router

# SSR
npm run dev:ssr
```

### Тестирование

```bash
npm test
```

## Структура проекта

```
RocketCode-Framework-Upgraded/
├── packages/
│   ├── core/           # Ядро фреймворка
│   │   ├── src/
│   │   │   ├── types.ts
│   │   │   ├── createElement.ts
│   │   │   ├── hooks.ts
│   │   │   ├── Component.ts
│   │   │   ├── render.ts
│   │   │   ├── jsx-runtime.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   ├── router/         # Система роутинга
│   │   ├── src/
│   │   │   ├── types.ts
│   │   │   ├── Router.ts
│   │   │   ├── components.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   └── ssr/            # Server-Side Rendering
│       ├── src/
│       │   ├── types.ts
│       │   ├── server.ts
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── examples/
│   ├── basic-app/      # Базовое приложение
│   │   ├── src/
│   │   │   ├── index.html
│   │   │   ├── main.ts
│   │   │   └── pages/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   └── ssr-app/        # SSR приложение
│       ├── src/
│       │   ├── App.ts
│       │   └── pages/
│       ├── server.js
│       ├── package.json
│       └── tsconfig.json
├── package.json
├── tsconfig.json
├── README.md
└── SETUP.md
```

## Возможные проблемы

### Ошибки TypeScript

Если возникают ошибки TypeScript, убедитесь что:

1. Все зависимости установлены
2. Пакеты собраны (`npm run build`)
3. tsconfig.json настроен правильно

### Ошибки сборки

Если возникают ошибки сборки:

1. Очистите кэш: `npm run clean`
2. Переустановите зависимости: `rm -rf node_modules && npm install`
3. Пересоберите пакеты: `npm run build`

### Проблемы с роутингом

Убедитесь что:
1. Роутер инициализирован: `createRouter(routes)`
2. Компонент Router используется в приложении
3. Маршруты определены правильно

## Поддержка

Если у вас возникли проблемы, создайте Issue в репозитории с описанием:

1. Версия Node.js
2. Операционная система
3. Шаги для воспроизведения
4. Ожидаемое поведение
5. Фактическое поведение 