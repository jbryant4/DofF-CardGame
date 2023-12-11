import cx from 'classnames';
import createComponent, {
  ElementWithProps
} from '~/utils/styles/createComponent';

export const ResourceCardWrapper = createComponent<
  ElementWithProps & {
    isTopCard: boolean;
    isPlaceHolder: boolean;
    h: number;
    w: number;
  }
>('div', props => ({
  className: cx(
    `absolute`,
    { 'bg-green-200 border-2 border-gray-600': props.isPlaceHolder },
    { 'z-[2] right-[8px] bottom-[8px]': props.isTopCard },
    { 'z-1 left-[8px] top-[8px]': !props.isTopCard }
  ),
  style: {
    width: props.w,
    height: props.h
  }
}));
