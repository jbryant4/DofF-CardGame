import React, { useContext } from 'react';
import FilterBarMobile from '@/FilterBarMobile/FilterBarMobile';
import 'swiper/css/effect-cards';
import FilterBar from 'src/components/FilterBar';
import { CardContext } from '~/context/CardContext';
import CardCarouselMobile from '@/CardCarouselMobile';
import { GlobalContext } from '~/context/GlobalContext';
import { CardDocument } from '~/models/Card';
import classNames from 'classnames';
import CardCarousel from '@/CardCarousel';
import createComponent from '~/utils/styles/createComponent';
const formatHeaderText = (firstCard: CardDocument) => {
  if (firstCard.type === 'resource' || firstCard.type === 'army') {
    return `${firstCard.type} cards`;
  }

  if (firstCard.type === 'foundation') {
    return `${firstCard.foundation} foundation cards`;
  }

  if (firstCard.type === 'champion') {
    return `${firstCard.class} champion cards`;
  }
};

const PageContainer = createComponent('div', { className: '' });

const CardPage = () => {
  const { localCards } = useContext(CardContext);
  const headerText = localCards[0] ? formatHeaderText(localCards[0]) : '';
  const { isMobile } = useContext(GlobalContext);

  return (
    <div className="grid grid-rows-[1fr_auto] h-full mt-24 md:grid-cols-[250px_1fr] md:grid-rows-none">
      <FilterBar />
      {isMobile ? <CardCarouselMobile /> : <CardCarousel />}
      {/*<CardCarousel />*/}
    </div>
  );
};

export default CardPage;
