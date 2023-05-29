import classNames from 'classnames';
import { useState, useContext } from 'react';
import { Filters } from '@/FilterBarMobile/FilterBarMobile';
import { CardContext } from '~/context/CardContext';
import { CardType } from '~/models/Card';
import { Container, Wrapper } from './Filters.styles';

const FilterBar = () => {
  const { cards, setLocalCards, localCards } = useContext(CardContext);
  const [selected, setSelected] = useState<CardType>('');
  const [subFilters, setSubFilters] = useState<string[]>([]);
  const [selectedSubFilter, setSubSelected] = useState('');

  const handleFilterClick = filter => {
    setSelected(filter);
    setSubSelected('');
    if (!Filters[filter]) {
      setLocalCards(cards.filter(card => card.type === filter));
      setSubFilters([]);
    } else {
      setLocalCards([]);
      setSubFilters(Filters[filter]);
    }
  };
  const handleSubFilterClick = subFilter => {
    setSubSelected(subFilter);
    if (selected === 'foundation') {
      setLocalCards(cards.filter(card => card.foundation?.includes(subFilter)));
    }

    if (selected === 'champion') {
      setLocalCards(cards.filter(card => card.class?.includes(subFilter)));
    }
  };

  return (
    <Container className="h-full p-20 w-[250px]">
      {Object.keys(Filters).map(filter => (
        <div key={filter}>
          <div
            className={classNames(
              'border border-black capitalize font-bold px-8 py-4',
              {
                'bg-blue-800 text-white': selected === filter,
                'bg-white': selected !== filter
              }
            )}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </div>
          {selected === filter && subFilters.length > 0 && (
            <div
              className={classNames(
                'duration-700 ease-in-out flex flex-wrap gap-4 justify-evenly transition-all',
                {
                  'opacity-0 h-0': !subFilters.length,
                  'opacity-100 h-auto': subFilters.length > 0
                }
              )}
            >
              {subFilters.map(subFilter => (
                <div
                  key={subFilter}
                  className={classNames(
                    'border border-black capitalize font-bold hover:bg-blue-800 px-8 py-4 rounded-full',
                    {
                      'bg-blue-800 text-white': selectedSubFilter === subFilter,
                      'bg-white': selectedSubFilter !== subFilter
                    }
                  )}
                  onClick={() => handleSubFilterClick(subFilter)}
                >
                  {subFilter}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </Container>
  );
};
export default FilterBar;
