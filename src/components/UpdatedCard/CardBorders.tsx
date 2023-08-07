import createComponent from '~/utils/styles/createComponent';

const LeftBorder = createComponent('div', {
  className: 'absolute bg-black h-full left-0 top-0'
});

const RightBorder = createComponent('div', {
  className: 'absolute bg-black h-full right-0 top-0'
});

type OwnProps = {
  borderThickness: number;
  showBottomBorder: boolean;
  innerCardWidth: number;
};

const CardBorders = ({
  borderThickness,
  showBottomBorder,
  innerCardWidth
}: OwnProps) => {
  return (
    <>
      <LeftBorder
        style={{
          width: borderThickness
        }}
      />
      <RightBorder
        style={{
          width: borderThickness
        }}
      />
      {showBottomBorder && (
        <div
          className="absolute bg-black bottom-0 z-[1]"
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
