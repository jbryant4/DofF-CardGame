const useGetCardDimensions = (width: number) => {
  //Container

  //Card (diven by the image dimensions)

  //For Final Card
  const borderThickness = width * 0.035;
  const innerWidth = width - 2 * borderThickness;
  const combatCircleRadius = innerWidth / 4;
  const cardHeight = (width * 4) / 3;
  const titleWidth = width - (width * 0.25) / 2;
  const bottomIconTop = -width * 0.25 * 0.16 + (width < 200 ? -1 : 0);
  const titleHeight = width * 0.25 * 0.4;
  const combatHeight = (((width * 4) / 3) * 3.5) / 10 - borderThickness;
  const overlayHeight =
    cardHeight - 2 * borderThickness - titleHeight - combatHeight + 1;

  return {
    combatHeight,
    borderThickness,
    overlayHeight,
    combatCircleRadius,
    titleWidth,
    titleHeight,
    cardHeight,
    bottomIconTop,
    innerWidth
  };
};

export default useGetCardDimensions;
