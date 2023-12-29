import createComponent from '~/utils/styles/createComponent';

const LeftBorder = createComponent('div', {
  className: 'absolute left-0  bottom-0 rounded-l'
});

const RightBorder = createComponent('div', {
  className: 'absolute right-0 bottom-0 rounded-r'
});

const BottomBorder = createComponent('div', {
  className: 'absolute bottom-0 z-[1] rounded-b'
});

const TopBorder = createComponent('div', {
  className: 'absolute top-0 z-[1] rounded-t'
});

type OwnProps = {
  borderThickness: number;
  innerCardWidth: number;
  isPlaceable?: boolean;
  borderToUse: string;
  sideHeight: number;
};

const CardBorders = ({
  borderThickness,
  innerCardWidth,
  isPlaceable = false,
  borderToUse,
  sideHeight
}: OwnProps) => {
  return (
    <>
      <TopBorder
        className={borderToUse}
        style={{
          width: innerCardWidth,
          height: borderThickness,
          left: borderThickness
        }}
      />
      <LeftBorder
        className={borderToUse}
        style={{
          width: borderThickness,
          height: sideHeight
        }}
      />
      <RightBorder
        className={borderToUse}
        style={{
          width: borderThickness,
          height: sideHeight
        }}
      />
      <BottomBorder
        className={borderToUse}
        style={{
          width: innerCardWidth,
          height: borderThickness,
          left: borderThickness
        }}
      />
    </>
  );
};

export default CardBorders;
