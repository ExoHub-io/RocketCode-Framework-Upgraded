import { render, createElement } from '@rocketcode/core';
import { createRouter, Router, Link } from '@rocketcode/router';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CounterPage } from './pages/CounterPage';

// Define routes
const routes = [
  { path: '/', component: HomePage, exact: true },
  { path: '/about', component: AboutPage },
  { path: '/counter', component: CounterPage }
];

// Create router
createRouter(routes);

// Main App component
function App() {
  return createElement('div', { className: 'container' },
    createElement('nav', null,
      createElement(Link, { to: '/', className: 'nav-link' }, 'Home'),
      createElement(Link, { to: '/about', className: 'nav-link' }, 'About'),
      createElement(Link, { to: '/counter', className: 'nav-link' }, 'Counter')
    ),
    createElement(Router, { routes })
  );
}

// Render the app
const rootElement = document.getElementById('root');
if (rootElement) {
  render(createElement(App), rootElement);
} 