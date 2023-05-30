import { useState, useContext, useEffect } from 'react';
import { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import LoadingCard from '@/LoadingCard';
import LoadingCardCircle from '@/LoadingCardCircle';
import { CardContext } from '~/context/CardContext';
import { GlobalContext } from '~/context/GlobalContext';
import { Container, Wrapper } from './CardCarousel.styles';

const CardCarousel = () => {
  const [isLoading, setLoading] = useState(false);
  const [currentIndex, setIndex] = useState(0);
  const { localCards } = useContext(CardContext);
  const { isMobile } = useContext(GlobalContext);

  useEffect(() => {
    console.log(localCards);
    if (localCards.length === 0) {
      setLoading(true);

      return;
    }
    setLoading(true);
    setIndex(0);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [localCards]);

  return (
    <Container className="bg-blue-400 flex h-full justify-center row-start-1 w-full md:row-auto">
      {isLoading ? (
        isMobile ? (
          <LoadingCard />
        ) : (
          <LoadingCardCircle />
        )
      ) : (
        <Wrapper className="w-full">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true
            }}
            pagination={{
              type: 'fraction'
            }}
            modules={[EffectCoverflow, Pagination]}
            className="mx-auto pb-20 w-[600px] lg:w-[900px]"
            onActiveIndexChange={swiper => setIndex(swiper.activeIndex)}
          >
            {localCards.map((card, index) => (
              <SwiperSlide className="w-[300px]">
                <img
                  alt={card.title}
                  src={index <= currentIndex + 3 ? `${card.blankUrl}` : ''}
                  loading="lazy"
                  className="mx-auto w-[300px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Wrapper>
      )}
    </Container>
  );
};

export default CardCarousel;
