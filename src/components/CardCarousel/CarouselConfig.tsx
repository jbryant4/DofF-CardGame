import classnames from 'classnames';
import { EffectCoverflow, EffectFlip, Pagination } from 'swiper';
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
  const effectToUse = isMobile ? EffectFlip : EffectCoverflow;

  return (
    <Swiper
      key={isMobile ? 'mobile' : 'desktop'}
      centeredSlides={isMobile ? false : true}
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
      modules={[effectToUse, Pagination]}
      style={isMobile ? {} : { width: maxWidth }}
      className={classnames('bg-blue-400 mx-auto pb-20 w-full md:h-full', {
        'swiper-mobile': isMobile
      })}
      onActiveIndexChange={swiper => setIndex(swiper.activeIndex)}
      updateOnWindowResize={true}
    >
      {children}
    </Swiper>
  );
};

export default CarouselConfig;
