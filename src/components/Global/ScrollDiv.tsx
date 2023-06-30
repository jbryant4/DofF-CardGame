import React, { useEffect, useRef, useState } from 'react';

type ScrollDivProps = {
  children: React.ReactNode;
  heightBreakPoint?: number;
};

//SIBLINGS CAN NOT HAVE MARGIN ON THEIR OUTTER DIV!!!!!!!!!!!!

const ScrollDiv: React.FC<ScrollDivProps> = ({
  children,
  heightBreakPoint = 0
}) => {
  const scrollDivRef = useRef<HTMLDivElement>(null);
  const [heightCalculated, setCalculated] = useState(false);

  useEffect(() => {
    if (scrollDivRef.current && !heightCalculated) {
      const parentHeight =
        (scrollDivRef.current.parentNode as HTMLElement)?.clientHeight ?? 0;
      const siblingHeights = Array.from(
        scrollDivRef.current.parentNode?.childNodes ?? []
      )
        .filter(
          node =>
            node.nodeType === Node.ELEMENT_NODE && node !== scrollDivRef.current
        )
        .reduce(
          (totalHeight, sibling) =>
            totalHeight + (sibling as HTMLElement).clientHeight,
          0
        );

      const scrollDivHeight = parentHeight - siblingHeights;

      scrollDivRef.current.style.height =
        scrollDivHeight < heightBreakPoint
          ? `${scrollDivHeight}px`
          : 'fit-content';
      setCalculated(true);
    }
  }, []);

  return (
    <div ref={scrollDivRef} className="h-full max-h-fit overflow-auto">
      {heightCalculated ? children : null}
    </div>
  );
};

export default ScrollDiv;
