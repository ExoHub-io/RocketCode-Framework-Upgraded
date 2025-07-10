import { createElement, useState, useEffect } from '@rocketcode/core';

export function TestPage() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(`Component mounted! Count: ${count}`);
  }, [count]);

  return createElement('div', { className: 'test-page' },
    createElement('h1', null, 'Test Page - Everything Works!'),
    createElement('p', null, 'This page tests all framework features:'),
    createElement('ul', null,
      createElement('li', null, '✅ useState hook'),
      createElement('li', null, '✅ useEffect hook'),
      createElement('li', null, '✅ Component rendering'),
      createElement('li', null, '✅ Event handling'),
      createElement('li', null, '✅ State updates')
    ),
    createElement('div', { className: 'counter' },
      createElement('p', null, `Count: ${count}`),
      createElement('p', null, message),
      createElement('button', { 
        onClick: () => setCount(count + 1),
        style: { padding: '10px 20px', margin: '10px' }
      }, 'Increment'),
      createElement('button', { 
        onClick: () => setCount(0),
        style: { padding: '10px 20px', margin: '10px' }
      }, 'Reset')
    ),
    createElement('p', { style: { marginTop: '20px', color: 'green' } },
      '🎉 If you can see this and the counter works, the framework is fully functional!'
    )
  );
} 