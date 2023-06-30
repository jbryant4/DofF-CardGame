import classNames from 'classnames';
import { useState, useContext } from 'react';
import { CardContext } from '~/context/CardContext';
import { CardType } from '~/models/Card';
import {
  Container,
  FilterTab,
  SubFilterWrapper,
  SubFilter
} from './FilterBar.styles';
import { Filters } from './Filters';

const FilterBar = () => {
  const { cards, setLocalCards } = useContext(CardContext);
  const [selected, setSelected] = useState<CardType>('');
  const [selectedSubFilter, setSubSelected] = useState('');

  const handleFilterClick = filter => {
    setSelected(filter);
    setSubSelected('');
    if (!Filters[filter]) {
      setLocalCards(cards.filter(card => card.type === filter));
    } else {
      setLocalCards([]);
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
    <Container className="bg-black flex flex-row flex-wrap gap-8 justify-center relative w-full md:flex-col md:gap-0 md:h-full md:justify-start md:p-20 md:w-[250px]">
      {Object.keys(Filters).map(filter => (
        <div key={filter} className="flex flex-col-reverse md:flex-col">
          <FilterTab
            className={classNames(
              'capitalize font-bold px-8 py-4 rounded-full text-center z-1 md:rounded-none md:text-left',
              {
                'bg-blue-800 text-white rounded-none': selected === filter,
                'bg-white border-b border-black': selected !== filter
              }
            )}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </FilterTab>
          {Filters[filter] ? (
            <SubFilterWrapper
              className={classNames(
                'absolute bg-blue-800 bottom-[33px] duration-500 ease-in-out flex flex-row flex-wrap gap-4 inset-x-0 max-h-0 overflow-hidden transition-all md:flex-col md:flex-nowrap md:static',
                {
                  'max-h-[100px] md:max-h-[260px] py-8 px-16 md:border-b md:border-black':
                    selected === filter
                }
              )}
            >
              {Filters[filter].map(subFilter => (
                <SubFilter
                  key={subFilter}
                  className={classNames(
                    'border border-black capitalize flex-1 font-bold hover:bg-white hover:text-black px-8 py-4 rounded-full text-center text-white',
                    {
                      'bg-white text-blue-800': selectedSubFilter === subFilter,
                      'bg-blue-800': selectedSubFilter !== subFilter
                    }
                  )}
                  onClick={() => handleSubFilterClick(subFilter)}
                >
                  {subFilter}
                </SubFilter>
              ))}
            </SubFilterWrapper>
          ) : null}
        </div>
      ))}
    </Container>
  );
};
export default FilterBar;
