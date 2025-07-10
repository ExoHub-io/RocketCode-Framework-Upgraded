import { createElement } from '@rocketcode/core';
import { Router, Link } from '@rocketcode/router';

export function App() {
  return createElement('div', { className: 'app' },
    createElement('header', { className: 'header' },
      createElement('h1', null, 'RocketCode SSR App'),
      createElement('nav', null,
        createElement(Link, { to: '/' }, 'Home'),
        createElement(Link, { to: '/about' }, 'About'),
        createElement(Link, { to: '/users/1' }, 'User 1'),
        createElement(Link, { to: '/users/2' }, 'User 2')
      )
    ),
    createElement('main', { className: 'main' },
      createElement(Router, { routes: [] })
    ),
    createElement('footer', { className: 'footer' },
      createElement('p', null, 'Rendered with Server-Side Rendering')
    )
  );
} 