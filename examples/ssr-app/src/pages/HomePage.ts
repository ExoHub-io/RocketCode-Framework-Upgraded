import { createElement } from '@rocketcode/core';

export function HomePage() {
  return createElement('div', { className: 'page' },
    createElement('h2', null, 'Welcome to SSR App'),
    createElement('p', null, 
      'This page is rendered on the server using RocketCode Framework\'s SSR capabilities.'
    ),
    createElement('div', { className: 'features' },
      createElement('h3', null, 'SSR Features:'),
      createElement('ul', null,
        createElement('li', null, 'Server-side rendering for better SEO'),
        createElement('li', null, 'getServerSideProps support'),
        createElement('li', null, 'Fast page loads'),
        createElement('li', null, 'Hydration on client-side')
      )
    )
  );
} 