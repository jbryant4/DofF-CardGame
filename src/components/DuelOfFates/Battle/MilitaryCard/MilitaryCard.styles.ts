import cx from 'classnames';
import createComponent, {
  ElementWithProps
} from '~/utils/styles/createComponent';

export const MilitaryCardWrapper = createComponent<
  ElementWithProps & {
    isPlaceHolder: boolean;
    type: 'army' | 'champ';
    isEnemy: boolean;
    inDefense: boolean;
    oppositeSide: boolean;
  }
>('div', props => {
  const isArmy = props.type === 'army';
  const isChamp = props.type === 'champ';
  const inDefense = props.inDefense;
  const isEnemy = props.isEnemy;
  const oppositeSide = props.oppositeSide;

  return {
    className: cx(
      { 'border border-black': props.isPlaceHolder },
      { 'bg-cyan-200': props.isPlaceHolder && isArmy },
      { 'bg-cyan-400': props.isPlaceHolder && isChamp },
      {
        'self-end':
          (!isEnemy && isArmy && !oppositeSide) ||
          (isEnemy && isChamp) ||
          (isEnemy && oppositeSide && inDefense && isArmy) ||
          (!isEnemy && isChamp && inDefense && oppositeSide)
      },
      {
        'self-baseline':
          (isEnemy && oppositeSide && inDefense && isChamp) ||
          (isEnemy && inDefense && isArmy && !oppositeSide) ||
          (!isEnemy && isArmy && inDefense && oppositeSide) ||
          (!isEnemy && isChamp && inDefense && !oppositeSide)
      },
      { 'rotate-90': inDefense }
    )
  };
});
