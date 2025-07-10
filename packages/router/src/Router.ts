import { useState, useEffect } from '@rocketcode/core';
import { Route, RouterState, RouterContext, MatchResult } from './types';

class Router {
  private state: RouterState;
  private listeners: Set<() => void> = new Set();
  private routes: Route[] = [];

  constructor(routes: Route[], initialPath?: string) {
    this.routes = routes;
    this.state = {
      pathname: initialPath || window.location.pathname,
      params: {},
      query: this.parseQuery(window.location.search),
      history: [initialPath || window.location.pathname],
      currentIndex: 0
    };

    // Listen to browser history changes
    window.addEventListener('popstate', this.handlePopState.bind(this));
  }

  private parseQuery(search: string): Record<string, string> {
    const params = new URLSearchParams(search);
    const query: Record<string, string> = {};
    for (const [key, value] of params.entries()) {
      query[key] = value;
    }
    return query;
  }

  private handlePopState = (event: PopStateEvent) => {
    this.state.pathname = window.location.pathname;
    this.state.query = this.parseQuery(window.location.search);
    this.notifyListeners();
  };

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public push(path: string): void {
    window.history.pushState({}, '', path);
    this.state.pathname = path;
    this.state.query = this.parseQuery(window.location.search);
    this.state.history.push(path);
    this.state.currentIndex = this.state.history.length - 1;
    this.notifyListeners();
  }

  public replace(path: string): void {
    window.history.replaceState({}, '', path);
    this.state.pathname = path;
    this.state.query = this.parseQuery(window.location.search);
    this.state.history[this.state.currentIndex] = path;
    this.notifyListeners();
  }

  public back(): void {
    if (this.state.currentIndex > 0) {
      this.state.currentIndex--;
      const path = this.state.history[this.state.currentIndex];
      window.history.back();
    }
  }

  public forward(): void {
    if (this.state.currentIndex < this.state.history.length - 1) {
      this.state.currentIndex++;
      const path = this.state.history[this.state.currentIndex];
      window.history.forward();
    }
  }

  public go(n: number): void {
    const newIndex = this.state.currentIndex + n;
    if (newIndex >= 0 && newIndex < this.state.history.length) {
      this.state.currentIndex = newIndex;
      window.history.go(n);
    }
  }

  public match(pathname: string): MatchResult | null {
    for (const route of this.routes) {
      const match = this.matchRoute(route, pathname);
      if (match) {
        return match;
      }
    }
    return null;
  }

  private matchRoute(route: Route, pathname: string): MatchResult | null {
    const pattern = this.pathToRegex(route.path);
    const match = pathname.match(pattern);
    
    if (!match) return null;

    const params: Record<string, string> = {};
    const paramNames = this.extractParamNames(route.path);
    
    paramNames.forEach((name, index) => {
      params[name] = match[index + 1];
    });

    return {
      route,
      params,
      isExact: route.exact ? pathname === route.path : true
    };
  }

  private pathToRegex(path: string): RegExp {
    const pattern = path
      .replace(/:[^/]+/g, '([^/]+)')
      .replace(/\*/g, '.*');
    return new RegExp(`^${pattern}$`);
  }

  private extractParamNames(path: string): string[] {
    const matches = path.match(/:[^/]+/g);
    return matches ? matches.map(match => match.slice(1)) : [];
  }

  public getState(): RouterState {
    return { ...this.state };
  }

  public getContext(): RouterContext {
    return {
      pathname: this.state.pathname,
      params: this.state.params,
      query: this.state.query,
      push: this.push.bind(this),
      replace: this.replace.bind(this),
      back: this.back.bind(this),
      forward: this.forward.bind(this),
      go: this.go.bind(this)
    };
  }
}

// Global router instance
let globalRouter: Router | null = null;

export function createRouter(routes: Route[], initialPath?: string): Router {
  globalRouter = new Router(routes, initialPath);
  return globalRouter;
}

export function getRouter(): Router | null {
  return globalRouter;
}

export function useRouter(): RouterContext {
  const router = getRouter();
  if (!router) {
    throw new Error('Router not initialized. Use createRouter first.');
  }

  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = router.subscribe(() => {
      forceUpdate({});
    });
    return unsubscribe;
  }, []);

  return router.getContext();
} 