import React, { useContext } from 'react';
import FilterBarMobile from '@/FilterBarMobile/FilterBarMobile';
import 'swiper/css/effect-cards';
import { CardContext } from '~/context/CardContext';
import CardCarouselMobile from '@/CardCarouselMobile';

const CardPage = () => (
    <div className="flex flex-col h-full items-center mt-36 lg:hidden">
      <CardCarouselMobile />
      <FilterBarMobile />
    </div>
  );

export default CardPage;
