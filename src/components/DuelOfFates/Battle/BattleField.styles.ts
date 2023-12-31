import cx from 'classnames';
import createComponent, {
  ElementWithProps
} from '~/utils/styles/createComponent';

export const Container = createComponent<
  ElementWithProps & { useFullHeight: boolean }
>('div', props => ({
  className: cx(
    'bg-green-100 board-container grid h-auto overflow-hidden relative w-full',
    { 'h-full': props.useFullHeight },
    { 'h-fit': !props.useFullHeight }
  )
}));

export const Wrapper = createComponent('div', { className: '' });
