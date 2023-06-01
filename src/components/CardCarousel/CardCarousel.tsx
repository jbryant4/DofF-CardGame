import { useRouter } from 'next/router';
import { useState, useContext, useEffect, useRef } from 'react';
import { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import CarouselConfig from '@/CardCarousel/CarouselConfig';
import LoadingCard from '@/LoadingCard';
import LoadingCardCircle from '@/LoadingCardCircle';
import { CardContext } from '~/context/CardContext';
import { GlobalContext } from '~/context/GlobalContext';
import { Container, Wrapper } from './CardCarousel.styles';
const CardCarousel = () => {
  const [isLoading, setLoading] = useState(false);
  const [currentIndex, setIndex] = useState(0);
  const [carouselWidth, setWidth] = useState(0);
  const { localCards } = useContext(CardContext);
  const { isMobile } = useContext(GlobalContext);
  const router = useRouter();
  const carouselContainerRef = useRef<HTMLDivElement>(null);

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

  const LoaderToUse = isMobile ? <LoadingCard /> : <LoadingCardCircle />;
  const handleImageClicked = (e, cardId) => {
    e.preventDefault();
    router.push(`/cards/${cardId}`);
  };
  console.log(carouselWidth);
  useEffect(() => {
    if (carouselContainerRef.current) {
      setWidth(carouselContainerRef.current.offsetWidth);
    }
  }, []);

  //TODO dev only
  // useEffect(() => {
  //   function handleResize() {
  //     if (carouselContainerRef === null) return;
  //
  //     setWidth(carouselContainerRef.current.offsetWidth);
  //   }
  //
  //   window.addEventListener('resize', handleResize);
  //
  //   // Clean up function
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <Container ref={carouselContainerRef} className="h-full w-full">
      {isLoading ? (
        LoaderToUse
      ) : (
        <CarouselConfig
          setIndex={setIndex}
          isMobile={isMobile}
          maxWidth={carouselWidth}
        >
          {localCards.map((card, index) => (
            <SwiperSlide
              key={card._id}
              className="h-[450px] relative text-center md:w-fit"
            >
              <div className="mx-auto w-[300px]">
                <img
                  alt={card.title}
                  src={index <= currentIndex + 2 ? `${card.blankUrl}` : ''}
                  loading="lazy"
                  onClick={e => handleImageClicked(e, card._id)}
                  className="mx-auto"
                />
                <div className="swiper-lazy-preloader"></div>
              </div>
              <div className="absolute bg-black/75 bottom-32 font-bold mx-auto px-24 px-32 py-8 text-white w-fit">
                {card.title}
              </div>
            </SwiperSlide>
          ))}
        </CarouselConfig>
      )}
    </Container>
  );
};

export default CardCarousel;
