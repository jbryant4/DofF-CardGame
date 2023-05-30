import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import { Navigation, Pagination } from 'swiper';
import { EffectFlip } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import LoadingCard from '@/LoadingCard';
import { CardContext } from '~/context/CardContext';
import Card from '~/models/Card';
import styles from './CardCarouselMobile.module.css';
import { Container, Wrapper } from './CardCarouselMobile.styles';
const CardCarouselMobile = () => {
  const [isLoading, setLoading] = useState(false);
  const [currentIndex, setIndex] = useState(0);
  const { localCards } = useContext(CardContext);
  const router = useRouter();

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

  const handleImageClicked = (e, cardId) => {
    e.preventDefault();
    router.push(`/cards/${cardId}`);
  };

  return (
    <Container className="flex flex-col items-center">
      {isLoading ? (
        <LoadingCard />
      ) : (
        <Swiper
          modules={[EffectFlip, Pagination]}
          effect="flip"
          className={styles.mySlider}
          pagination={{
            dynamicBullets: true,
            clickable: true
          }}
          style={{
            '--swiper-pagination-bottom': '-14px',
            '--swiper-pagination-bullet-size': '12px',
            '--swiper-pagination-bullet-width': '12px',
            '--swiper-pagination-bullet-height': '12px'
          }}
          lazyPreloadPrevNext={2}
          onActiveIndexChange={swiper => setIndex(swiper.activeIndex)}
        >
          {localCards.map((card, index) => (
            <SwiperSlide
              key={card._id}
              className="h-[450px] relative text-center"
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
        </Swiper>
      )}
    </Container>
  );
};

export default CardCarouselMobile;
