import { VNode } from '@rocketcode/core';

export interface Route {
  path: string;
  component: any;
  exact?: boolean;
  children?: Route[];
}

export interface RouterState {
  pathname: string;
  params: Record<string, string>;
  query: Record<string, string>;
  history: string[];
  currentIndex: number;
}

export interface RouterContext {
  pathname: string;
  params: Record<string, string>;
  query: Record<string, string>;
  push: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
  forward: () => void;
  go: (n: number) => void;
}

export interface LinkProps {
  to: string;
  children: VNode | string;
  className?: string;
  style?: Record<string, any>;
  onClick?: (e: Event) => void;
}

export interface RouteProps {
  path: string;
  component: any;
  exact?: boolean;
  children?: Route[];
}

export interface RouterProps {
  routes: Route[];
  initialPath?: string;
  children?: VNode[];
}

export interface MatchResult {
  route: Route;
  params: Record<string, string>;
  isExact: boolean;
} 