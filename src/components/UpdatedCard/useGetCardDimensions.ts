const useGetCardDimensions = (width: number) => {
  //Container
  const containerWidth = width;

  //Card (diven by the image dimensions)
  const cardWrapperWidth = width - width / 8;
  const borderThickness = cardWrapperWidth * 0.03;
  const imageHeight = cardWrapperWidth * (4 / 3);
  const innerCardWidth = cardWrapperWidth - 2 * borderThickness;

  const combatCircleRadius = innerCardWidth / 4;

  return {
    containerWidth,
    cardWrapperWidth,
    imageHeight,
    borderThickness,
    innerCardWidth,
    combatCircleRadius
  };
};

export default useGetCardDimensions;
