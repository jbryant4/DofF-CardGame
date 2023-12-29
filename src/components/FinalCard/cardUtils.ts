import DuelingCard from '~/constants/DuelingCard';
import { Foundation } from '~/models/Card';

export function getBorderToUse(canPlace: boolean, foundation: Foundation) {
  switch (true) {
    case foundation === 'desert':
      return canPlace ? 'border-desert' : 'border-desert-light';
    case foundation === 'ocean':
      return canPlace ? 'border-ocean' : 'border-ocean-light';
    case foundation === 'earth':
      return canPlace ? 'border-earth' : 'border-earth-light';
    default:
      return 'border-red';
  }
}

export function getBackGroundToUse(canPlace: boolean, foundation: Foundation) {
  switch (true) {
    case foundation === 'desert':
      return canPlace ? 'bg-desert' : 'bg-desert-light';
    case foundation === 'ocean':
      return canPlace ? 'bg-ocean' : 'bg-ocean-light';
    case foundation === 'earth':
      return canPlace ? 'bg-earth' : 'bg-earth-light';
    default:
      return 'bg-red';
  }
}

export function getHexIconKeys(card: DuelingCard) {
  const { primaryClass, secondaryClass, class: traits } = card;
  switch (card.type) {
    case 'army':
      return ['army'];
    case 'foundation':
      return card.foundation;
    case 'champion':
      return [
        primaryClass ? primaryClass : traits ? traits[0] : undefined,
        secondaryClass ? secondaryClass : traits ? traits[1] : undefined
      ];
    default:
      return ['resource'];
  }
}
