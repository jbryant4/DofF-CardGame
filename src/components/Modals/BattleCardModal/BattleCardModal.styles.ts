import cx from 'classnames';
import createComponent, {
  ElementWithProps
} from '~/utils/styles/createComponent';

export const Container = createComponent('div', { className: '' });

export const Wrapper = createComponent('div', { className: '' });

export const ActionBtn = createComponent<
  ElementWithProps & { disabled: boolean }
>('button', props => ({
  className: cx(
    'bg-blue-500 capitalize font-bold px-4 py-2 rounded text-center text-white',
    { 'opacity-50 cursor-not-allowed': props.disabled },
    { 'hover:bg-blue-700 cursor-pointer': !props.disabled }
  )
}));
