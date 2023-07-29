const useGetCardDimensions = (width: number) => {
  const borderDimension = width * 0.05;
  const imageHeight = width * (4 / 3);
  const bottomBorderWidth = width - 2 * borderDimension;

  return { borderDimension, bottomBorderWidth, imageHeight };
};

export default useGetCardDimensions;
