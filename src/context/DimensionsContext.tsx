import React, { createContext, useMemo } from 'react';
import useWindowSize from '~/hooks/useWindowSize';

type DimensionsContextType = {
  cardWidth: number;
  cardHeight: number;
  iconWidth: number;
  handCardWidth: number;
};

const defaultDimensionsContext: DimensionsContextType = {
  cardWidth: 0,
  cardHeight: 0,
  iconWidth: 0,
  handCardWidth: 0
};

export const DimensionsContext = createContext<DimensionsContextType>(
  defaultDimensionsContext
);

type Props = {
  children: React.ReactNode;
};

export function DimensionsProvider({ children }: Props) {
  const { width, height } = useWindowSize();

  const borderWidth = width > 1800 ? 1800 : width;

  //card width values
  const cardWidth = borderWidth / 9;
  const cardHeight = (cardWidth * 4) / 3;
  const iconWidth = (borderWidth / 17) * 0.65;
  const handCardWidth = borderWidth / 8;

  //board values
  const value = useMemo(
    () => ({
      cardWidth,
      cardHeight,
      iconWidth,
      handCardWidth
    }),
    [cardHeight, cardWidth, iconWidth]
  );

  return (
    <DimensionsContext.Provider value={value}>
      {children}
    </DimensionsContext.Provider>
  );
}

export function useDimensionsContext() {
  return React.useContext(DimensionsContext);
}
