import { VNode, StateHook, EffectHook } from './types';

let currentVNode: VNode | null = null;
let currentHookIndex = 0;

export function useState<T>(initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  if (!currentVNode) {
    throw new Error('useState must be called within a component render');
  }

  if (!currentVNode.hooks) {
    currentVNode.hooks = [];
  }

  const hookIndex = currentHookIndex++;
  let hook = currentVNode.hooks[hookIndex] as StateHook;

  if (!hook) {
    hook = {
      type: 'state',
      value: initialValue,
      setter: (newValue: T | ((prev: T) => T)) => {
        const nextValue = typeof newValue === 'function' 
          ? (newValue as (prev: T) => T)(hook.value)
          : newValue;
        
        if (hook.value !== nextValue) {
          hook.value = nextValue;
          // Trigger re-render
          if (currentVNode?.component?.setState) {
            currentVNode.component.setState({});
          }
        }
      }
    };
    currentVNode.hooks[hookIndex] = hook;
  }

  return [hook.value, hook.setter];
}

export function useEffect(
  effect: () => void | (() => void),
  deps?: any[]
): void {
  if (!currentVNode) {
    throw new Error('useEffect must be called within a component render');
  }

  if (!currentVNode.hooks) {
    currentVNode.hooks = [];
  }

  const hookIndex = currentHookIndex++;
  let hook = currentVNode.hooks[hookIndex] as EffectHook;

  const hasChangedDeps = !hook || !deps || !hook.deps || 
    deps.length !== hook.deps.length ||
    hook.deps.some((dep: any, index: number) => dep !== deps[index]);

  if (!hook || hasChangedDeps) {
    // Cleanup previous effect
    if (hook?.cleanup) {
      hook.cleanup();
    }

    hook = {
      type: 'effect',
      effect,
      deps: deps || [],
      cleanup: undefined
    };

    currentVNode.hooks[hookIndex] = hook;

    // Schedule effect to run after render
    queueMicrotask(() => {
      const cleanup = effect();
      if (typeof cleanup === 'function') {
        hook.cleanup = cleanup;
      }
    });
  }
}

export function setCurrentVNode(vnode: VNode | null): void {
  currentVNode = vnode;
  currentHookIndex = 0;
}

export function getCurrentVNode(): VNode | null {
  return currentVNode;
} 