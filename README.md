# RocketCode Framework Upgraded

Современный JavaScript-фреймворк, сочетающий в себе функциональность React и Next.js, написанный на TypeScript.

## 🚀 Особенности

- **Собственная реализация React-подобного API**: createElement, render, Component
- **Хуки**: useState, useEffect с полной поддержкой TypeScript
- **JSX поддержка**: Настроенный tsconfig.json для работы с JSX
- **Роутинг**: useRouter, Link, Route компоненты
- **Server-Side Rendering (SSR)**: Поддержка getServerSideProps
- **Сборка**: Vite и esbuild для быстрой разработки
- **TypeScript**: Полная типизация всех компонентов

## 📦 Архитектура

Фреймворк построен с модульной архитектурой:

- **@rocketcode/core** - Ядро фреймворка (createElement, render, хуки)
- **@rocketcode/router** - Система роутинга
- **@rocketcode/ssr** - Server-Side Rendering

## 🛠 Установка

```bash
git clone <repository>
cd RocketCode-Framework-Upgraded
npm install
```

## 📚 Использование

### Базовое приложение

```typescript
import { render, createElement, useState } from '@rocketcode/core';

function Counter() {
  const [count, setCount] = useState(0);
  
  return createElement('div', null,
    createElement('h1', null, `Count: ${count}`),
    createElement('button', { onClick: () => setCount(count + 1) }, 'Increment')
  );
}

render(createElement(Counter), document.getElementById('root'));
```

### Роутинг

```typescript
import { createRouter, Router, Link } from '@rocketcode/router';

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage }
];

createRouter(routes);

function App() {
  return createElement('div', null,
    createElement('nav', null,
      createElement(Link, { to: '/' }, 'Home'),
      createElement(Link, { to: '/about' }, 'About')
    ),
    createElement(Router, { routes })
  );
}
```

### Server-Side Rendering

```typescript
import { createSSRServer } from '@rocketcode/ssr';

const routes = [
  { 
    path: '/users/:id', 
    component: UserPage,
    getServerSideProps: async (context) => {
      const user = await fetchUser(context.params.id);
      return { props: { user } };
    }
  }
];

const ssrServer = createSSRServer(routes);
```

## 🎯 Примеры

### Базовое приложение
```bash
cd examples/basic-app
npm run dev
```

### SSR приложение
```bash
cd examples/ssr-app
npm run dev
```

## 🔧 Разработка

### Сборка пакетов

```bash
# Сборка всех пакетов
npm run build

# Сборка отдельных пакетов
npm run build:core
npm run build:router
npm run build:ssr
```

### Разработка

```bash
# Режим разработки для ядра
npm run dev:core

# Режим разработки для роутера
npm run dev:router

# Режим разработки для SSR
npm run dev:ssr
```

## 📖 API Документация

### Core API

#### createElement(type, props, ...children)
Создает виртуальный DOM узел.

```typescript
createElement('div', { className: 'container' }, 'Hello World')
```

#### render(vnode, container)
Рендерит виртуальный DOM в реальный DOM.

```typescript
render(createElement(App), document.getElementById('root'))
```

#### useState(initialValue)
Хук для управления состоянием.

```typescript
const [count, setCount] = useState(0)
```

#### useEffect(effect, deps)
Хук для побочных эффектов.

```typescript
useEffect(() => {
  document.title = `Count: ${count}`
}, [count])
```

### Router API

#### createRouter(routes, initialPath?)
Создает экземпляр роутера.

#### useRouter()
Хук для доступа к роутеру в компонентах.

#### Link
Компонент для навигации.

```typescript
createElement(Link, { to: '/about' }, 'About')
```

#### Router
Компонент для рендеринга маршрутов.

### SSR API

#### createSSRServer(routes, config)
Создает SSR сервер.

#### getServerSideProps(context)
Функция для получения данных на сервере.

## 🏗 Структура проекта

```
RocketCode-Framework-Upgraded/
├── packages/
│   ├── core/           # Ядро фреймворка
│   ├── router/         # Система роутинга
│   └── ssr/            # Server-Side Rendering
├── examples/
│   ├── basic-app/      # Базовое приложение
│   └── ssr-app/        # SSR приложение
├── package.json
└── tsconfig.json
```

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте ветку для новой функции
3. Внесите изменения
4. Добавьте тесты
5. Создайте Pull Request

## 📄 Лицензия

MIT License

## 🆘 Поддержка

Если у вас есть вопросы или проблемы, создайте Issue в репозитории.