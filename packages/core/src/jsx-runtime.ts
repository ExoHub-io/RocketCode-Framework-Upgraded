import { createElement, Fragment } from './createElement';

// JSX Runtime exports
export { jsx, jsxs, Fragment };

function jsx(
  type: any,
  props: any,
  key?: string | number
) {
  return createElement(type, { ...props, key }, ...(props.children || []));
}

function jsxs(
  type: any,
  props: any,
  key?: string | number
) {
  return createElement(type, { ...props, key }, ...(props.children || []));
} 