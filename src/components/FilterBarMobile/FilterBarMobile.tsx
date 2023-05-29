import classNames from 'classnames';
import { useContext, useState, useEffect } from 'react';
import { CardContext } from '~/context/CardContext';
import { CardDocument, CardType, Foundation } from '~/models/Card';
import { Container, Wrapper } from './FilterBarMobile.styles';

export const Filters = {
  champion: [
    'divine',
    'explorer',
    'fighter',
    'nobility',
    'revolutionist',
    'scholar'
  ],
  army: null,
  foundation: ['desert', 'earth', 'ocean'],
  resource: null
};

const FilterBarMobile = () => {
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
    <Container className="bg-red bottom-0 fixed pb-24 w-full">
      <div
        className={classNames('duration-700 ease-in-out transition-all', {
          'opacity-0 h-0': !subFilters.length,
          'opacity-100 h-auto': subFilters.length > 0
        })}
      >
        <div className="flex flex-wrap gap-4 justify-evenly">
          {subFilters.map(subFilter => (
            <div
              className={classNames(
                ' border border-black capitalize font-bold hover:bg-blue-800 px-8 py-4 rounded-full',
                { 'bg-blue-800 text-white': selectedSubFilter === subFilter },
                { 'bg-white': selectedSubFilter !== subFilter }
              )}
              onClick={() => handleSubFilterClick(subFilter)}
            >
              {subFilter}
            </div>
          ))}
        </div>
      </div>
      <Wrapper className="bg-black flex justify-around mt-8">
        {Object.keys(Filters).map(filter => (
          <div
            className={classNames(
              'border border-black capitalize font-bold px-8 py-4 rounded-full',
              { 'bg-blue-800 text-white': selected === filter },
              { 'bg-white': selected !== filter }
            )}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </div>
        ))}
      </Wrapper>
    </Container>
  );
};

export default FilterBarMobile;
