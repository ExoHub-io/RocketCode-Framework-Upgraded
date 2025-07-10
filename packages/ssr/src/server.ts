import { VNode, render } from '@rocketcode/core';
import { createRouter } from '@rocketcode/router';
import { SSRContext, SSRResult, ServerOptions, ExpressRequest, ExpressResponse, PageConfig } from './types';

export class SSRServer {
  private routes: any[];
  private config: any;

  constructor(routes: any[], config: any = {}) {
    this.routes = routes;
    this.config = config;
  }

  async renderToString(
    url: string,
    context: SSRContext,
    App: any
  ): Promise<SSRResult> {
    // Create router for SSR
    const router = createRouter(this.routes, url);
    
    // Create SSR context
    const ssrContext = {
      url,
      headers: context.headers || {},
      cookies: context.cookies || {},
      userAgent: context.userAgent,
      req: context.req,
      res: context.res
    };

    // Render the app
    const appVNode = this.createElement(App, { context: ssrContext });
    const html = this.vnodeToString(appVNode);

    return {
      html,
      initialState: {
        router: router.getState()
      }
    };
  }

  private createElement(type: any, props: any, ...children: any[]): VNode {
    if (typeof type === 'function') {
      return type({ ...props, children });
    }
    
    return {
      type,
      props: props || {},
      children: children.flat(),
      hooks: [],
      hookIndex: 0
    };
  }

  private vnodeToString(vnode: VNode): string {
    if (!vnode) return '';

    // Handle text nodes
    if (vnode.type === 'TEXT_ELEMENT') {
      return vnode.props.nodeValue || '';
    }

    // Handle functional components
    if (typeof vnode.type === 'function') {
      const component = new (vnode.type as any)(vnode.props);
      const childVNode = component.render();
      return this.vnodeToString(childVNode);
    }

    // Handle Fragment
    if (vnode.type === Symbol('Fragment')) {
      return vnode.children.map(child => this.vnodeToString(child)).join('');
    }

    // Handle regular DOM elements
    if (typeof vnode.type === 'string') {
      const tagName = vnode.type;
      const props = vnode.props;
      
      // Build attributes string
      const attributes = Object.keys(props)
        .filter(key => key !== 'children')
        .map(key => {
          if (key === 'className') {
            return `class="${props[key]}"`;
          }
          if (key === 'style' && typeof props[key] === 'object') {
            const styleString = Object.entries(props[key])
              .map(([k, v]) => `${k}: ${v}`)
              .join('; ');
            return `style="${styleString}"`;
          }
          if (typeof props[key] === 'string') {
            return `${key}="${props[key]}"`;
          }
          return '';
        })
        .filter(attr => attr)
        .join(' ');

      const children = vnode.children.map(child => this.vnodeToString(child)).join('');
      
      if (children || !this.isSelfClosing(tagName)) {
        return `<${tagName}${attributes ? ' ' + attributes : ''}>${children}</${tagName}>`;
      } else {
        return `<${tagName}${attributes ? ' ' + attributes : ''} />`;
      }
    }

    return '';
  }

  private isSelfClosing(tagName: string): boolean {
    const selfClosingTags = ['img', 'input', 'br', 'hr', 'meta', 'link'];
    return selfClosingTags.includes(tagName.toLowerCase());
  }

  async handleRequest(req: ExpressRequest, res: ExpressResponse, App: any): Promise<void> {
    try {
      const url = req.url;
      const context: SSRContext = {
        url,
        headers: req.headers,
        cookies: req.cookies,
        userAgent: req.headers['user-agent'],
        req,
        res
      };

      // Check if page has getServerSideProps
      const matchingRoute = this.findMatchingRoute(url);
      if (matchingRoute && matchingRoute.component.getServerSideProps) {
        const ssrContext = {
          params: req.params,
          query: req.query,
          req,
          res
        };

        const result = await matchingRoute.component.getServerSideProps(ssrContext);
        
        if (result.redirect) {
          res.status(result.redirect.permanent ? 308 : 307);
          res.set('Location', result.redirect.destination);
          res.end();
          return;
        }

        if (result.notFound) {
          res.status(404);
          res.send('Page not found');
          return;
        }

        // Add props to context
        context.props = result.props;
      }

      const ssrResult = await this.renderToString(url, context, App);
      
      // Send HTML response
      res.status(200);
      res.set('Content-Type', 'text/html');
      res.send(this.createHTMLDocument(ssrResult));
    } catch (error) {
      console.error('SSR Error:', error);
      res.status(500);
      res.send('Internal Server Error');
    }
  }

  private findMatchingRoute(url: string): any {
    // Simple route matching - in a real implementation, you'd use proper routing
    return this.routes.find(route => route.path === url);
  }

  private createHTMLDocument(ssrResult: SSRResult): string {
    const { html, initialState } = ssrResult;
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RocketCode App</title>
    ${ssrResult.head ? ssrResult.head.join('\n') : ''}
</head>
<body>
    <div id="root">${html}</div>
    ${initialState ? `<script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>` : ''}
    ${ssrResult.body ? ssrResult.body.join('\n') : ''}
</body>
</html>`;
  }
}

export function createSSRServer(routes: any[], config: any = {}): SSRServer {
  return new SSRServer(routes, config);
} 