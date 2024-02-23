import { useContext } from 'react';
import CardCarousel from '@/CardCarousel';
import CardGrid from '@/CardGrid';

import FilterBar from 'src/components/FilterBar';
import { GlobalContext } from '~/context/GlobalContext';

const CardPage = () => {
  const { isMobile } = useContext(GlobalContext);

  return (
    <div className="flex flex-col-reverse h-full w-full md:flex-row">
      <FilterBar />

      {isMobile ? <CardCarousel /> : <CardGrid />}
    </div>
  );
};

export default CardPage;
