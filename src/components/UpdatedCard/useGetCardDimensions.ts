const useGetCardDimensions = (width: number) => {
  const borderThickness = width * 0.03;
  const imageHeight = width * (4 / 3);
  const innerCardWidth = width - 2 * borderThickness;

  const combatCircleRadius = innerCardWidth / 4;

  return {
    borderThickness,
    innerCardWidth,
    combatCircleRadius,
    imageHeight
  };
};

export default useGetCardDimensions;
