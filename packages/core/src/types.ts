export interface VNode {
  type: string | Function | Symbol;
  props: Record<string, any>;
  children: VNode[];
  key?: string | number;
  ref?: any;
  dom?: HTMLElement | Text;
  component?: Component;
  hooks?: Hook[];
  hookIndex?: number;
}

export interface Component {
  render: () => VNode;
  setState?: (newState: any) => void;
  state?: any;
  props?: any;
  _vnode?: VNode;
  _dom?: HTMLElement | Text;
}

export interface Hook {
  type: 'state' | 'effect';
  value?: any;
  deps?: any[];
  cleanup?: () => void;
}

export interface StateHook extends Hook {
  type: 'state';
  setter: (value: any) => void;
}

export interface EffectHook extends Hook {
  type: 'effect';
  effect: () => void | (() => void);
  deps: any[];
  value?: any;
}

export type CreateElementFunction = (
  type: string | Function | Symbol,
  props: Record<string, any> | null,
  ...children: any[]
) => VNode;

export interface RenderOptions {
  container: HTMLElement;
  hydrate?: boolean;
}

export interface RouterContext {
  pathname: string;
  params: Record<string, string>;
  query: Record<string, string>;
  push: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
  forward: () => void;
}

export interface SSRContext {
  url: string;
  headers: Record<string, string>;
  cookies: Record<string, string>;
  userAgent?: string;
}

export interface GetServerSidePropsContext {
  params: Record<string, string>;
  query: Record<string, string>;
  req: any;
  res: any;
}

export interface GetServerSidePropsResult {
  props?: Record<string, any>;
  redirect?: {
    destination: string;
    permanent?: boolean;
  };
  notFound?: boolean;
} 