const useGetCardDimensions = (width: number) => {
  //Container
  const containerWidth = width;

  //Card (diven by the image dimensions)
  const cardWrapperWidth = width - width / 8;
  const borderThickness = cardWrapperWidth * 0.03;
  const imageHeight = cardWrapperWidth * (4 / 3);
  const innerCardWidth = cardWrapperWidth - 2 * borderThickness;

  const combatCircleRadius = innerCardWidth / 4;

  //For Final Card
  const cardHeight = (width * 4) / 3;
  const titleWidth = width - (width * 0.25) / 2;
  const topIconTop = borderThickness / 2;
  const bottomIconTop = -width * 0.25 * 0.16 + (width < 200 ? -1 : 0);
  const titleHeight = width * 0.25 * 0.4;
  const innerWidth = width - 2 * borderThickness;
  const combatHeight = (((width * 4) / 3) * 3.5) / 10 - borderThickness;
  const overlayHeight =
    cardHeight - 2 * borderThickness - titleHeight - combatHeight;

  return {
    containerWidth,
    combatHeight,
    cardWrapperWidth,
    imageHeight,
    borderThickness,
    innerCardWidth,
    overlayHeight,
    combatCircleRadius,
    titleWidth,
    titleHeight,
    cardHeight,
    topIconTop,
    bottomIconTop,
    innerWidth
  };
};

export default useGetCardDimensions;
