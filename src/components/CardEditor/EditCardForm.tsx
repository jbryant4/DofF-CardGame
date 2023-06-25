import { useState } from 'react';
import { useEffect } from 'react';
import NewCardForm from '@/CardEditor/NewCardForm';
import { useGetAllCards } from '~/hooks';
import { CardDocument } from '~/models/Card';

const EditCardForm = () => {
  const [editCard, setEditCard] = useState<Partial<CardDocument>>({});
  const { cards, isLoading, error } = useGetAllCards();
  const [search, setSearch] = useState('');
  const [cardList, setCardList] = useState<CardDocument[]>([]);

  useEffect(() => {
    if (search.trim() === '') {
      setCardList(cards);
    } else {
      const filtered = cards.filter(card =>
        card.title.toLowerCase().includes(search.toLowerCase())
      );
      setCardList(filtered);
    }
  }, [cards, search]);

  if (error) {
    throw Error(`Error getting Cards : ${error}`);
  }

  return isLoading ? (
    <div>Grabbing Cards</div>
  ) : (
    <div className="flex gap-4 h-full justify-center mt-20 overflow-hidden w-full">
      <div
        className={
          editCard.title === undefined
            ? 'hidden'
            : 'rounded-full py-4 px-12 bg-black text-white h-fit ml-8 '
        }
        onClick={() => setEditCard({})}
      >
        Select Different Card
      </div>
      <div
        className={
          editCard.title !== undefined
            ? 'hidden'
            : 'bg-white font-bold h-3/4 overflow-hidden px-16'
        }
      >
        <input
          type="text"
          name="fileName"
          value={search}
          placeholder="Search Card Title"
          onChange={e => setSearch(e.target.value)}
          className="bg-gray-700 my-12 p-8 text-white"
        />
        <div className="flex flex-col gap-8 max-h-[85%] overflow-y-auto">
          {cardList.map(card => (
            <div
              key={card.title}
              className="border-[3px] border-blue-700 hover:bg-blue-700 hover:text-white p-8 rounded text-sm w-[200px]"
              onClick={() => setEditCard(card)}
            >
              {card.title}
            </div>
          ))}
        </div>
      </div>

      {editCard.title !== undefined ? (
        <NewCardForm initialState={editCard} newCardForm={false} />
      ) : null}
    </div>
  );
};

export default EditCardForm;
