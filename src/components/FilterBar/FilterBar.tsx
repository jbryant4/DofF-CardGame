import classNames from 'classnames';
import { useContext } from 'react';
import { CardContext, useCardContext } from '~/context/CardContext';
import {
  Container,
  FilterTab,
  SubFilterWrapper,
  SubFilter
} from './FilterBar.styles';
import { Filters } from './Filters';

const FilterBar = () => {
  const { cards, setLocalCards } = useContext(CardContext);
  const { filter, setFilter, subFilter, setSubFilter } = useCardContext();

  const handleFilterClick = value => {
    setFilter(value);
    setSubFilter('');
    if (!Filters[value]) {
      setLocalCards(cards.filter(card => card.type === value));
    }
  };

  const handleSubFilterClick = value => {
    setSubFilter(value);
    if (filter === 'foundation') {
      setLocalCards(cards.filter(card => card.foundation?.includes(value)));
    }

    if (filter === 'champion') {
      setLocalCards(cards.filter(card => card.class?.includes(value)));
    }
  };

  return (
    <Container className="bg-black flex flex-row flex-shrink-0 flex-wrap gap-8 justify-center relative w-full md:flex-col md:gap-0 md:h-full md:justify-start md:p-20 md:w-[250px]">
      {Object.keys(Filters).map(f => (
        <div key={f} className="flex flex-col-reverse md:flex-col">
          <FilterTab
            className={classNames(
              'capitalize font-bold px-8 py-4 rounded-full text-center z-1 md:rounded-none md:text-left',
              {
                'bg-blue-800 text-white rounded-none border-b border-white':
                  filter === f,
                'bg-white border-b border-black': filter !== f
              }
            )}
            onClick={() => handleFilterClick(f)}
          >
            {f}
          </FilterTab>
          {Filters[f] ? (
            <SubFilterWrapper
              className={classNames(
                'absolute bg-blue-800 bottom-[33px] duration-500 ease-in-out flex flex-row flex-wrap gap-4 inset-x-0 max-h-0 overflow-hidden transition-all md:flex-col md:flex-nowrap md:static',
                {
                  'max-h-[100px] md:max-h-[260px] py-8 px-16 md:border-b md:border-black':
                    filter === f
                }
              )}
            >
              {Filters[f].map(subF => (
                <SubFilter
                  key={subF}
                  className={classNames(
                    'border border-black capitalize flex-1 font-bold hover:bg-white hover:text-black px-8 py-4 rounded-full text-center ',
                    {
                      'bg-white text-blue-800': subFilter === subF,
                      'bg-blue-800 text-white': subFilter !== subF
                    }
                  )}
                  onClick={() => handleSubFilterClick(subF)}
                >
                  {subF}
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
