import { VNode, CreateElementFunction } from './types';

const Fragment = Symbol('Fragment');

export function createElement(
  type: string | Function | Symbol,
  props: Record<string, any> | null,
  ...children: any[]
): VNode {
  // Normalize children
  const normalizedChildren = children.flat().filter(child => 
    child != null && child !== false && child !== undefined
  ).map(child => {
    if (typeof child === 'string' || typeof child === 'number') {
      return {
        type: 'TEXT_ELEMENT',
        props: { nodeValue: child },
        children: [],
        dom: document.createTextNode(child.toString())
      } as VNode;
    }
    return child;
  });

  // Handle props
  const normalizedProps = props || {};
  
  // Extract key and ref from props
  const { key, ref, ...restProps } = normalizedProps;

  return {
    type,
    props: restProps,
    children: normalizedChildren,
    key,
    ref,
    hooks: [],
    hookIndex: 0
  };
}

// Fragment component
export { Fragment };

// Default export for JSX
export default createElement as CreateElementFunction; 