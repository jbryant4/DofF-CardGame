import { Foundation } from '~/models/Card';
import createComponent from '~/utils/styles/createComponent';

const LeftBorder = createComponent('div', {
  className: 'absolute h-full left-0 top-0'
});

const RightBorder = createComponent('div', {
  className: 'absolute  h-full right-0 top-0'
});

type OwnProps = {
  borderThickness: number;
  showBottomBorder: boolean;
  innerCardWidth: number;
  isPlaceable?: boolean;
  foundation?: Foundation;
};

export const getBorderToUse = (canPlace: boolean, foundation: Foundation) => {
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
};

const CardBorders = ({
  borderThickness,
  showBottomBorder,
  innerCardWidth,
  isPlaceable = false,
  foundation
}: OwnProps) => {
  const borderToUse = foundation
    ? getBorderToUse(isPlaceable, foundation)
    : 'bg-black';

  return (
    <>
      <LeftBorder
        className={borderToUse}
        style={{
          width: borderThickness
        }}
      />
      <RightBorder
        className={borderToUse}
        style={{
          width: borderThickness
        }}
      />
      {showBottomBorder && (
        <div
          className={`${borderToUse} absolute bottom-0 z-[1]`}
          style={{
            width: innerCardWidth,
            height: borderThickness,
            left: borderThickness
          }}
        />
      )}
    </>
  );
};

export default CardBorders;
