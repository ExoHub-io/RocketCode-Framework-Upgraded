import { VNode, RenderOptions } from './types';
import { setCurrentVNode } from './hooks';

let currentContainer: HTMLElement | null = null;
let currentRootVNode: VNode | null = null;

export function render(vnode: VNode, container: HTMLElement, options: RenderOptions = { container }): void {
  currentContainer = container;
  currentRootVNode = vnode;

  // Clear container
  if (!options.hydrate) {
    container.innerHTML = '';
  }

  // Set current vnode for hooks
  setCurrentVNode(vnode);

  // Create DOM element
  const dom = createDOMElement(vnode);

  // Append to container
  if (dom) {
    container.appendChild(dom);
  }

  // Clear current vnode
  setCurrentVNode(null);
}

function createDOMElement(vnode: VNode): HTMLElement | Text | null {
  if (!vnode) return null;

  // Handle text nodes
  if (vnode.type === 'TEXT_ELEMENT') {
    const textNode = document.createTextNode(vnode.props.nodeValue || '');
    vnode.dom = textNode;
    return textNode;
  }

  // Handle components
  if (typeof vnode.type === 'function') {
    let childVNode;
    
    // Set current vnode for hooks before calling component
    setCurrentVNode(vnode);
    
    if (vnode.type.prototype && typeof vnode.type.prototype.render === 'function') {
      // Class component
      const component = new (vnode.type as any)(vnode.props);
      vnode.component = component;
      component._vnode = vnode;
      childVNode = component.render();
    } else {
      // Functional component
      childVNode = (vnode.type as any)(vnode.props);
    }
    
    const dom = createDOMElement(childVNode);
    vnode.dom = dom || undefined;
    
    // Clear current vnode after component execution and DOM creation
    setCurrentVNode(null);
    
    return dom;
  }

  // Handle Fragment
  if (vnode.type === Symbol('Fragment')) {
    const fragment = document.createDocumentFragment();
    vnode.children.forEach(child => {
      const childDom = createDOMElement(child);
      if (childDom) {
        fragment.appendChild(childDom);
      }
    });
    return fragment as any;
  }

  // Handle regular DOM elements
  if (typeof vnode.type === 'string') {
    const element = document.createElement(vnode.type);
    
    // Set properties
    Object.keys(vnode.props).forEach(key => {
      if (key.startsWith('on') && typeof vnode.props[key] === 'function') {
        // Event handlers
        const eventName = key.toLowerCase().substring(2);
        element.addEventListener(eventName, vnode.props[key]);
      } else if (key === 'className') {
        // Class name
        element.className = vnode.props[key];
      } else if (key === 'style' && typeof vnode.props[key] === 'object') {
        // Style object
        Object.assign(element.style, vnode.props[key]);
      } else if (key !== 'children') {
        // Regular attributes
        element.setAttribute(key, vnode.props[key]);
      }
    });

    // Render children
    vnode.children.forEach(child => {
      const childDom = createDOMElement(child);
      if (childDom) {
        element.appendChild(childDom);
      }
    });

    vnode.dom = element;
    return element;
  }

  return null;
}

// Helper function to update DOM
export function updateDOM(oldVNode: VNode, newVNode: VNode): void {
  if (!oldVNode.dom) return;

  // Simple update - in a real implementation, you would do proper diffing
  if (oldVNode.type !== newVNode.type) {
    // Different types, replace the element
    const parent = oldVNode.dom.parentNode;
    if (parent) {
      const newDom = createDOMElement(newVNode);
      if (newDom) {
        parent.replaceChild(newDom, oldVNode.dom);
      }
    }
  } else if (typeof newVNode.type === 'string') {
    // Same type, update properties
    const dom = oldVNode.dom as HTMLElement;
    
    // Update properties
    Object.keys(newVNode.props).forEach(key => {
      if (key !== 'children') {
        if (key.startsWith('on')) {
          // Event handlers would need more sophisticated handling
        } else if (key === 'className') {
          dom.className = newVNode.props[key];
        } else if (key === 'style' && typeof newVNode.props[key] === 'object') {
          Object.assign(dom.style, newVNode.props[key]);
        } else {
          dom.setAttribute(key, newVNode.props[key]);
        }
      }
    });

    // Update children (simplified)
    // In a real implementation, you would diff children properly
  }
}

// Function to trigger re-render
export function forceUpdate(): void {
  if (currentRootVNode && currentContainer) {
    render(currentRootVNode, currentContainer);
  }
} 