import React, { useContext } from 'react';
import FilterBarMobile from '@/FilterBarMobile/FilterBarMobile';
import 'swiper/css/effect-cards';
import FilterBar from 'src/components/FilterBar';
import { CardContext } from '~/context/CardContext';
import CardCarouselMobile from '@/CardCarouselMobile';
import { CardDocument } from '~/models/Card';
import classNames from 'classnames';
import CardCarousel from '@/CardCarousel';
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
const CardPage = () => {
  const { localCards } = useContext(CardContext);
  console.log(localCards[0]);
  const headerText = localCards[0] ? formatHeaderText(localCards[0]) : '';

  return (
    <>
      <div
        className={classNames('mb-8 text-lg text-white', {
          invisible: !headerText
        })}
      >
        {headerText}
      </div>
      <div className="gap-4 h-full hidden items-center mt-12 w-full md:flex">
        <FilterBar />
        <CardCarousel />
      </div>
      <div className="flex flex-col h-full items-center mt-12 md:hidden">
        <CardCarouselMobile />
        <FilterBarMobile />
      </div>
    </>
  );
};

export default CardPage;
