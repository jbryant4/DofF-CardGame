import React, { createContext, useEffect, useMemo } from 'react';
import useWindowSize from '~/hooks/useWindowSize';

type DimensionsContextType = {
  canFullBoard: boolean;
  cardWidth: number;
  cardHeight: number;
  iconWidth: number;
  handCardWidth: number;
  handCardHeight: number;
  handCardTransitionLength: number;
  gridRowLayout: string;
  playerBoardMin: number;
  playerBoardMax: number;
};

const defaultDimensionsContext: DimensionsContextType = {
  canFullBoard: false,
  cardWidth: 0,
  cardHeight: 0,
  iconWidth: 0,
  handCardWidth: 0,
  handCardHeight: 0,
  handCardTransitionLength: 0,
  gridRowLayout: '1fr 1fr 10vh',
  playerBoardMin: 0,
  playerBoardMax: 0
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
  const handCardWidth = borderWidth / 9;
  const handCardHeight = (handCardWidth * 4) / 3;

  //board values
  const playerBoardMin = cardHeight * 1.5;
  const playerBoardMax = 1.75 * cardHeight;

  const toShort = playerBoardMin * 2 + height * 0.15 > height;
  const canFullBoard = height > playerBoardMax * 2 + handCardHeight;

  const handCardTransitionLength = canFullBoard
    ? 0
    : toShort
    ? handCardHeight - height * 0.15
    : handCardHeight - (height - 2 * playerBoardMin);

  const gridRowLayout = toShort
    ? '1fr 1fr 15vh'
    : canFullBoard
    ? `repeat(2, ${playerBoardMax}px) ${1.2 * handCardHeight}px`
    : `repeat(2, ${playerBoardMin}px) 1fr`;

  useEffect(() => {
    if (!toShort) return;
    console.warn('window is too short to play optimally');
  }, [toShort]);

  const value = useMemo(
    () => ({
      canFullBoard,
      cardWidth,
      cardHeight,
      iconWidth,
      handCardWidth,
      handCardTransitionLength,
      gridRowLayout,
      handCardHeight,
      playerBoardMin,
      playerBoardMax
    }),
    [
      canFullBoard,
      cardHeight,
      cardWidth,
      gridRowLayout,
      handCardHeight,
      handCardTransitionLength,
      handCardWidth,
      iconWidth,
      playerBoardMax,
      playerBoardMin
    ]
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
