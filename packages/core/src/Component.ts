import { Component as ComponentType, VNode } from './types';
import { setCurrentVNode } from './hooks';

export abstract class Component implements ComponentType {
  public state: any = {};
  public props: any = {};
  public _vnode?: VNode;
  public _dom?: HTMLElement | Text;

  constructor(props: any = {}) {
    this.props = props;
  }

  abstract render(): VNode;

  setState(newState: any): void {
    this.state = { ...this.state, ...newState };
    this.forceUpdate();
  }

  forceUpdate(): void {
    if (this._vnode && this._dom) {
      // Re-render the component
      const newVNode = this.render();
      this._vnode = newVNode;
      // In a real implementation, you would diff and update the DOM
      // For now, we'll just mark that a re-render is needed
    }
  }

  // Helper method for functional components
  static createElement(type: any, props: any, ...children: any[]): VNode {
    if (typeof type === 'function') {
      // Functional component
      const component = new (type as any)(props);
      setCurrentVNode(component._vnode);
      const vnode = component.render();
      setCurrentVNode(null);
      return vnode;
    }
    
    // Regular element
    return {
      type,
      props: props || {},
      children: children.flat(),
      hooks: [],
      hookIndex: 0
    };
  }
} 