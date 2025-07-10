import { createElement } from '@rocketcode/core';

export function AboutPage() {
  return createElement('div', null,
    createElement('h1', null, 'About RocketCode Framework'),
    createElement('p', null,
      'RocketCode Framework is a modern JavaScript framework that combines the best features of React and Next.js.'
    ),
    createElement('h2', null, 'Key Features'),
    createElement('ul', null,
      createElement('li', null, 'Virtual DOM with custom renderer'),
      createElement('li', null, 'Functional components with hooks'),
      createElement('li', null, 'Client-side routing'),
      createElement('li', null, 'Server-side rendering (SSR)'),
      createElement('li', null, 'TypeScript support'),
      createElement('li', null, 'Fast build system with Vite')
    ),
    createElement('h2', null, 'Architecture'),
    createElement('p', null,
      'The framework is built with a modular architecture:',
      createElement('ul', null,
        createElement('li', null, '@rocketcode/core - Core rendering engine'),
        createElement('li', null, '@rocketcode/router - Routing system'),
        createElement('li', null, '@rocketcode/ssr - Server-side rendering')
      )
    )
  );
} 