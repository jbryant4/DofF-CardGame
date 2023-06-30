import React, { useContext } from 'react';
import 'swiper/css/effect-cards';
import CardCarousel from '@/CardCarousel';
import FilterBar from 'src/components/FilterBar';
import { CardContext } from '~/context/CardContext';
import { CardDocument } from '~/models/Card';
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

  return (
    <div className="flex flex-col-reverse h-full w-full md:flex-row">
      <FilterBar />
      <CardCarousel />
    </div>
  );
};

export default CardPage;
