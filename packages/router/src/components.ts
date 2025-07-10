import { createElement } from '@rocketcode/core';
import { LinkProps, RouteProps, RouterProps } from './types';
import { getRouter, createRouter } from './Router';

export function Link(props: LinkProps) {
  const router = getRouter();

  const handleClick = (e: Event) => {
    e.preventDefault();
    if (router) {
      router.push(props.to);
    }
    
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return createElement('a', {
    href: props.to,
    onClick: handleClick,
    className: props.className,
    style: props.style
  }, props.children);
}

export function Route(props: RouteProps) {
  const router = getRouter();
  if (!router) return null;
  
  const state = router.getState();
  const match = state.pathname === props.path;

  if (!match) {
    return null;
  }

  return createElement(props.component, {
    ...router.getContext(),
    params: state.params,
    query: state.query
  });
}

export function Router(props: RouterProps) {
  const router = getRouter();
  
  if (!router) {
    // Initialize router if not already done
    createRouter(props.routes, props.initialPath);
  }

  // Find matching route
  const currentRouter = getRouter();
  if (!currentRouter) return null;

  const match = currentRouter.match(currentRouter.getState().pathname);
  
  if (!match) {
    // 404 - no route matched
    return createElement('div', null, 'Page not found');
  }

  const Component = match.route.component;
  const routerContext = currentRouter.getContext();

  return createElement(Component, {
    ...routerContext,
    params: match.params
  });
} 