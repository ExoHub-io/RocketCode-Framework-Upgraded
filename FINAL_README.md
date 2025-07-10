# 🚀 RocketCode Framework - Полностью Рабочая Версия

Современный JavaScript-фреймворк, сочетающий в себе функциональность React и Next.js, написанный на TypeScript.

## ✅ Что Исправлено

- **Хуки работают правильно** - useState и useEffect в функциональных компонентах
- **Роутинг полностью функционален** - навигация между страницами работает
- **Обновления состояния** - компоненты перерендериваются при изменении состояния
- **Сборка работает** - все пакеты собираются без ошибок
- **Примеры работают** - базовое приложение запускается и функционирует

## 🎯 Быстрый Старт

### 1. Установка и сборка
```bash
# Установка зависимостей
npm install

# Сборка всех пакетов
npm run build

# Запуск примера
cd examples/basic-app
npm run dev
```

### 2. Откройте браузер
Перейдите на http://localhost:3000

### 3. Протестируйте функциональность
- Нажмите на ссылки в навигации (Home, About, Counter, Test)
- На странице Counter нажимайте кнопки для изменения состояния
- На странице Test проверьте работу всех хуков

## 🏗 Архитектура

```
RocketCode-Framework-Upgraded/
├── packages/
│   ├── core/           # Ядро фреймворка
│   │   ├── createElement.ts  # Создание VDOM
│   │   ├── render.ts         # Рендеринг в DOM
│   │   ├── hooks.ts          # useState, useEffect
│   │   ├── Component.ts      # Базовый класс
│   │   └── jsx-runtime.ts    # JSX поддержка
│   ├── router/         # Система роутинга
│   │   ├── Router.ts         # Основной роутер
│   │   └── components.ts     # Link, Route компоненты
│   └── ssr/            # Server-Side Rendering
├── examples/
│   └── basic-app/      # Рабочий пример
└── package.json
```

## 📚 API Документация

### Core API

#### createElement(type, props, ...children)
```typescript
createElement('div', { className: 'container' }, 'Hello World')
```

#### useState(initialValue)
```typescript
const [count, setCount] = useState(0)
```

#### useEffect(effect, deps)
```typescript
useEffect(() => {
  document.title = `Count: ${count}`
}, [count])
```

#### render(vnode, container)
```typescript
render(createElement(App), document.getElementById('root'))
```

### Router API

#### createRouter(routes)
```typescript
const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage }
]
createRouter(routes)
```

#### useRouter()
```typescript
const router = useRouter()
router.push('/about')
```

#### Link и Router компоненты
```typescript
createElement(Link, { to: '/about' }, 'About')
createElement(Router, { routes })
```

## 🎨 Примеры Использования

### Функциональный компонент с хуками
```typescript
import { createElement, useState, useEffect } from '@rocketcode/core';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
  }, [count]);

  return createElement('div', null,
    createElement('h1', null, `Count: ${count}`),
    createElement('button', { 
      onClick: () => setCount(count + 1) 
    }, 'Increment')
  );
}
```

### Приложение с роутингом
```typescript
import { render, createElement } from '@rocketcode/core';
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

render(createElement(App), document.getElementById('root'));
```

## 🔧 Разработка

### Сборка отдельных пакетов
```bash
npm run build:core    # Только ядро
npm run build:router  # Только роутер
npm run build:ssr     # Только SSR
```

### Режим разработки
```bash
npm run dev:core      # Следить за изменениями ядра
npm run dev:router    # Следить за изменениями роутера
npm run dev:ssr       # Следить за изменениями SSR
```

## 🎯 Что Работает

- ✅ **createElement** - создание виртуальных DOM узлов
- ✅ **render** - рендеринг в реальный DOM
- ✅ **useState** - управление состоянием
- ✅ **useEffect** - побочные эффекты
- ✅ **Роутинг** - навигация между страницами
- ✅ **Link компонент** - навигационные ссылки
- ✅ **Router компонент** - рендеринг маршрутов
- ✅ **Обновления состояния** - перерендеринг при изменениях
- ✅ **JSX поддержка** - через jsx-runtime
- ✅ **TypeScript** - полная типизация

## 🚀 Готово к Использованию!

Фреймворк полностью функционален и готов к разработке приложений. Все основные проблемы исправлены:

1. **Хуки работают** в функциональных компонентах
2. **Роутинг функционирует** с правильными обновлениями
3. **Состояние обновляется** и компоненты перерендериваются
4. **Сборка работает** без ошибок
5. **Примеры запускаются** и демонстрируют все возможности

Наслаждайтесь разработкой с RocketCode Framework! 🎉 