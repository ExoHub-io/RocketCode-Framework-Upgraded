import { createElement, useState, useEffect } from '@rocketcode/core';

export function CounterPage() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (count > 10) {
      setMessage('Great job! You\'ve clicked more than 10 times!');
    } else if (count > 5) {
      setMessage('Keep going! You\'re doing great!');
    } else {
      setMessage('');
    }
  }, [count]);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return createElement('div', { className: 'counter' },
    createElement('h1', null, 'Counter Example'),
    createElement('p', null, 'This demonstrates the useState and useEffect hooks.'),
    createElement('div', { style: { fontSize: '2em', margin: '20px 0' } }, count),
    createElement('div', null,
      createElement('button', { onClick: decrement }, 'Decrease'),
      createElement('button', { onClick: reset }, 'Reset'),
      createElement('button', { onClick: increment }, 'Increase')
    ),
    message && createElement('p', { style: { color: '#007bff', marginTop: '20px' } }, message),
    createElement('p', { style: { fontSize: '0.9em', color: '#666', marginTop: '30px' } },
      'Try clicking the buttons to see the counter change and the message update!'
    )
  );
} 