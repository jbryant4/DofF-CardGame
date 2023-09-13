import CardCarousel from '@/CardCarousel';
import FilterBar from 'src/components/FilterBar';

const CardPage = () => {
  return (
    <div className="flex flex-col-reverse h-full w-full md:flex-row">
      <FilterBar />
      <CardCarousel />
    </div>
  );
};

export default CardPage;
