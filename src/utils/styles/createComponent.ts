/**
 * createComponent is a helper function that accepts an element (HTML element
 * as a string or React component) and returns a React component with a
 * base-level of props to it. So if you want to create a named component that
 * always includes a specific class name, you pass the element in and define
 * the `className`.
 *
 * For example:
 * ```
 * const Loud = createComponent('p', { className: 'text-uppercase' });
 * const LoudAndBold = createComponent(Loud, { className: 'font-weight-bold' });
 * ...
 * <LoudAndBold>I love front-end development!</LoudAndBold>
 * ```
 *
 * will produce:
 *
 * ```
 * <p class="font-weight-bold text-uppercase">I love front-end development!</p>
 * ```
 *
 * It is a helpful tool when you employ CSS utility classes because it hides the
 * styling and lets you work with sanely named components.
 */

import isPropValid from '@emotion/is-prop-valid';
import React, { createElement } from 'react';

const getDisplayName = (
  tag: React.ElementType,
  defaultDisplayName = String(tag)
) => {
  if (typeof tag === 'object') {
    const { displayName = '', name = '' } = tag;

    return displayName || name || defaultDisplayName;
  }

  return defaultDisplayName;
};

type OwnProps = {
  className?: string;
  'data-qa'?: string;
};

type Statics = {
  defaultProps?: {};
  displayName?: string;
  propTypes?: {};
};

const isFunction = (v): v is Function => typeof v === 'function';

const createComponent = <
  Instance = React.PropsWithRef<React.HTMLProps<HTMLElement>>,
  Base = Instance
>(
  Element: React.ElementType,
  basePropsOrFunction:
    | (OwnProps & Base)
    | ((_: OwnProps & Instance) => OwnProps),
  statics: Statics = { displayName: getDisplayName(Element) }
) => {
  const Component = React.forwardRef<HTMLElement, OwnProps & Instance>(
    (props, ref) => {
      const { className: instanceClassName = '', ...instanceProps } = props;
      const { className: baseClassName = '', ...baseProps } = isFunction(
        basePropsOrFunction
      )
        ? basePropsOrFunction(props)
        : basePropsOrFunction;

      const propsForElement = {
        ...baseProps,
        ...instanceProps
      };

      if (typeof Element === 'string') {
        Object.keys(propsForElement).forEach(key => {
          if (!isPropValid(key)) {
            delete propsForElement[key];
          }
        });
      }

      return createElement(Element, {
        ...propsForElement,
        className: `${baseClassName} ${instanceClassName}`.trim(),
        ref
      });
    }
  );

  return Object.assign(Component, statics);
};

export default createComponent;
