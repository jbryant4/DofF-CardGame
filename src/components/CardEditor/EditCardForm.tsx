import { useState, useEffect, useContext } from 'react';
import { blankCard, useAdminCardContext } from '@/CardEditor/AdminCardContext';
import NewCardForm from '@/CardEditor/NewCardForm';
import FilterBar from '@/FilterBar';
import { CardContext } from '~/context/CardContext';
import { Card } from '~/contracts/card';

const EditCardForm = () => {
  const { cardValues, setCardValues, task } = useAdminCardContext();
  const { displayCards } = useContext(CardContext);
  const [search, setSearch] = useState('');
  const [cardList, setCardList] = useState<Card[]>([]);

  useEffect(() => {
    if (search.trim() === '') {
      setCardList(displayCards);
    } else {
      const filtered = displayCards.filter(card =>
        card.title.toLowerCase().includes(search.toLowerCase())
      );
      setCardList(filtered);
    }
  }, [displayCards, search]);

  return (
    <div className="flex flex-col gap-4 h-full items-center justify-start overflow-hidden w-full">
      {task === 'edit' && (
        <>
          {cardValues.title ? (
            <div
              className="bg-black h-fit ml-8 px-12 py-4 rounded-full text-white w-fit"
              onClick={() => setCardValues({ ...blankCard })}
            >
              Select Different UpdatedCard
            </div>
          ) : (
            <div className="bg-white flex flex-col font-bold h-full overflow-hidden px-16 w-fit">
              <FilterBar />
              <input
                type="text"
                name="fileName"
                value={search}
                placeholder="Search Card Title"
                onChange={e => setSearch(e.target.value)}
                className="bg-gray-700 my-12 p-8 text-white w-fit"
              />
              <div className="flex flex-col gap-8 h-[600px] overflow-y-auto pb-24">
                {cardList.map(card => (
                  <div
                    key={card.title}
                    className="border-[3px] border-blue-700 hover:bg-blue-700 hover:text-white p-8 rounded text-sm w-[200px]"
                    onClick={() => setCardValues(card)}
                  >
                    {card.title}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      <NewCardForm />
    </div>
  );
};

export default EditCardForm;
