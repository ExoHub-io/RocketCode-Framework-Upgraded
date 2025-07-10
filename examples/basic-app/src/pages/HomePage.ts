import { createElement } from '@rocketcode/core';

export function HomePage() {
  return createElement('div', null,
    createElement('h1', null, 'Welcome to RocketCode Framework'),
    createElement('p', null, 
      'This is a basic example of the RocketCode Framework, combining React and Next.js functionality.'
    ),
    createElement('p', null,
      'Features demonstrated:',
      createElement('ul', null,
        createElement('li', null, 'Custom createElement and render functions'),
        createElement('li', null, 'useState and useEffect hooks'),
        createElement('li', null, 'JSX support'),
        createElement('li', null, 'Client-side routing'),
        createElement('li', null, 'Component-based architecture')
      )
    ),
    createElement('p', null,
      'Navigate using the links above to explore different pages.'
    )
  );
} 