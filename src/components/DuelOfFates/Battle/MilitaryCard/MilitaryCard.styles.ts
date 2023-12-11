import cx from 'classnames';
import createComponent, {
  ElementWithProps
} from '~/utils/styles/createComponent';

export const MilitaryCardWrapper = createComponent<
  ElementWithProps & {
    isPlaceHolder: boolean;
    h: number;
    w: number;
    type: 'army' | 'champ';
    isEnemy: boolean;
  }
>('div', props => ({
  className: cx(
    { 'border border-black': props.isPlaceHolder },
    { 'bg-cyan-200': props.isPlaceHolder && props.type === 'army' },
    { 'bg-cyan-400': props.isPlaceHolder && props.type === 'champ' },
    { 'self-end': !props.isEnemy && props.type === 'army' },
    { 'self-end': props.isEnemy && props.type === 'champ' }
  ),
  style: {
    width: props.w,
    height: props.h
  }
}));
