import React from 'react';
import { EffectCoverflow, EffectFlip, Pagination, Navigation } from 'swiper';
import { Swiper } from 'swiper/react';

type OwnProps = {
  children: React.ReactNode;
  setIndex: React.Dispatch<number>;
  isMobile: boolean;
  maxWidth: number;
};
const CarouselConfig = ({
  children,
  setIndex,
  isMobile,
  maxWidth
}: OwnProps) => {
  const effectsToUse = isMobile
    ? [EffectFlip, Pagination]
    : [EffectCoverflow, Pagination, Navigation];

  return (
    <Swiper
      key={isMobile ? 'mobile' : 'desktop'}
      centeredSlides={!isMobile}
      effect={isMobile ? 'flip' : 'coverflow'}
      grabCursor={true}
      slidesPerView={isMobile ? 1 : 'auto'}
      coverflowEffect={
        isMobile
          ? {}
          : {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true
            }
      }
      pagination={
        isMobile
          ? {
              dynamicBullets: true,
              clickable: true
            }
          : {
              type: 'fraction'
            }
      }
      modules={effectsToUse}
      navigation={!isMobile}
      style={isMobile ? {} : { width: maxWidth }}
      className="bg-blue-400 mt-64 mx-auto pb-20 py-12 w-full md:h-fit md:py-24"
      onActiveIndexChange={swiper => setIndex(swiper.activeIndex)}
      updateOnWindowResize={true}
    >
      {children}
    </Swiper>
  );
};

export default CarouselConfig;
