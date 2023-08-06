import createComponent from '~/utils/styles/createComponent';

const LeftBorder = createComponent('div', {
  className: 'absolute bg-black h-full left-0 top-0'
});

const RightBorder = createComponent('div', {
  className: 'absolute bg-black h-full right-0 top-0'
});

type OwnProps = {
  borderThickness: number;
  hasBattleStats: boolean;
  innerCardWidth: number;
};

const CardBorders = ({
  borderThickness,
  hasBattleStats,
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
      {hasBattleStats && (
        <div
          className="absolute bg-black bottom-0"
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
