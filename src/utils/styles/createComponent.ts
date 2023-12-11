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
 *
 * You can also pass in a function as the second argument to createComponent.
 * The function will be called with the props passed to the component. These
 * props may be defined using a generic type parameter. To preserve the default
 * HTMLElement behavior, you should use the `ElementWithProps` type to wrap your
 * prop definition.
 *
 * For example:
 * ```
 * type OwnProps = ElementWithProps<{ show: boolean }>;
 *
 * const Button = createComponent<OwnProps>('button', props => ({
 *   className: props.show ? undefined : 'hidden'
 * }));
 * ```
 * or more concisely:
 * ```
 * const Button = createComponent<
 *   ElementWithProps<{ show: boolean }>
 * >('button', props => ({
 *   className: props.show ? undefined : 'hidden'
 * }));
 * ```
 *
 * If you need to specify the type of the element, you can use the second
 * type parameter of ElementWithProps.
 *
 * For example:
 * ```
 * const Button = createComponent<
 *   ElementWithProps<{ show: boolean }, HTMLButtonElement>
 * >('button', props => ({
 *   className: props.show ? undefined : 'hidden'
 * }));
 * ```
 *
 * If you are using an SVG, you should wrap your type definition in
 * React.PropsWithoutRef to avoid a type error with the ref.
 *
 * For example:
 * ```
 * type OwnProps = React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>;
 *
 * const Svg = createComponent<OwnProps>('svg', {
 *   className: 'text-blue-2'
 * });
 *
 * const Icon = forwardRef<SVGSVGElement, OwnProps>((props, ref) => (
 *   <Svg ref={ref} {...props}>
 *     ...
 *   </Svg>
 * ));
 * ```
 */

import isPropValid from '@emotion/is-prop-valid';
import React, { createElement } from 'react';

function getDisplayName(
  tag: React.ElementType,
  defaultDisplayName = String(tag)
) {
  if (typeof tag === 'object') {
    const { displayName = '', name = '' } = tag;

    return displayName || name || defaultDisplayName;
  }

  return defaultDisplayName;
}

const isFunction = (v: unknown): v is Function => typeof v === 'function';

type OwnProps = {
  className?: string;
  'data-qa'?: string;
};

type Statics = {
  defaultProps?: {};
  displayName?: string;
  propTypes?: {};
};

export type ElementWithProps<
  Props extends Record<string, any> = {},
  Element extends HTMLElement = HTMLElement
> = React.PropsWithRef<React.HTMLProps<Element>> & Props;

export default function createComponent<
  Instance = ElementWithProps,
  Base = Instance
>(
  Element: React.ElementType,
  basePropsOrFunction:
    | (OwnProps & Base)
    | ((_: OwnProps & Instance) => OwnProps),
  statics: Statics = { displayName: getDisplayName(Element) }
) {
  const Component = React.forwardRef<
    HTMLElement | SVGSVGElement,
    OwnProps & Instance
  >((props, ref) => {
    const { className: instanceClassName = '', ...instanceProps } = props;
    const { className: baseClassName = '', ...baseProps } = isFunction(
      basePropsOrFunction
    )
      ? basePropsOrFunction(props)
      : basePropsOrFunction;

    const propsToCheck = {
      ...baseProps,
      ...instanceProps
    };

    const propsForElement =
      typeof Element === 'string'
        ? Object.entries(propsToCheck).reduce((acc, [key, value]) => {
            if (isPropValid(key)) acc[key] = value;

            return acc;
          }, {} as Record<string, any>)
        : propsToCheck;

    return createElement(Element, {
      ...propsForElement,
      className: `${baseClassName} ${instanceClassName}`.trim(),
      ref
    });
  });

  return Object.assign(Component, statics);
}
