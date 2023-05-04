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
    <div className="flex gap-4 h-full justify-center mt-20 overflow-hidden">
      <div>
        <input
          type="text"
          name="fileName"
          value={search}
          placeholder="Search Card Title"
          onChange={e => setSearch(e.target.value)}
          className="my-12"
        />
        <div className="flex flex-col gap-8 h-3/4 overflow-scroll">
          {cardList.map(card => (
            <div
              key={card.title}
              className="border border-blue-700 hover:bg-blue-700 hover:text-white p-8 text-sm"
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
