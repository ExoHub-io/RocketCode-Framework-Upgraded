import { createElement } from '@rocketcode/core';

export function AboutPage() {
  return createElement('div', { className: 'page' },
    createElement('h2', null, 'About SSR App'),
    createElement('p', null,
      'This is a server-side rendered application built with RocketCode Framework.'
    ),
    createElement('div', { className: 'info' },
      createElement('h3', null, 'Server-Side Rendering Benefits:'),
      createElement('ul', null,
        createElement('li', null, 'Better SEO performance'),
        createElement('li', null, 'Faster initial page load'),
        createElement('li', null, 'Better user experience'),
        createElement('li', null, 'Improved Core Web Vitals')
      )
    )
  );
} 