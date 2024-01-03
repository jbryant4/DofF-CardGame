import cx from 'classnames';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import FinalCard from '@/FinalCard';
import LoadingCardCircle from '@/LoadingCardCircle';
import { CardContext } from '~/context/CardContext';
import useSubsequantEffect from '~/utils/useSubsequantEffect';

type OwnProps = {};

const CardGrid = ({}: OwnProps) => {
  const { cards, localCards } = useContext(CardContext);
  const [showPhysicalCard, setPhysical] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const handleClick = (cardId: string) => {
    void router.push(`/card/${cardId}`);
  };

  // Fake Loading State
  useSubsequantEffect(() => {
    if (localCards.length !== 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [localCards.length]);

  return (
    <div className="flex flex-col h-full overflow-hidden pt-24 w-full">
      {isLoading ? (
        <LoadingCardCircle />
      ) : (
        <>
          <div className="border border-black flex font-bold mb-24 mr-12 relative rounded-full self-end w-fit z-[1]">
            <div
              onClick={() => setPhysical(false)}
              className="relative text-center w-[125px] z-[1]"
            >
              Game Card{' '}
            </div>
            <div
              onClick={() => setPhysical(true)}
              className="flex-shrink-0 relative text-center w-[125px] z-[1]"
            >
              Physical Card
            </div>
            <div
              className={cx(
                'absolute bg-blue-800 duration-500 h-full left-0 rounded-full transition-all w-1/2 z-0 ',
                {
                  'left-1/2': showPhysicalCard
                }
              )}
            />
          </div>
          <div className="flex flex-wrap gap-x-64 gap-y-64 h-full justify-center overflow-scroll pb-24 px-24">
            {localCards.map(card => (
              <div
                key={card._id}
                className="h-fit"
                onClick={() => handleClick(card._id)}
              >
                {showPhysicalCard ? (
                  <img
                    src={card.cardUrl}
                    className="rounded-[12px]"
                    alt="physical-card"
                    loading="lazy"
                    width={225}
                    height={(225 * 4) / 3}
                  />
                ) : (
                  <FinalCard
                    card={{
                      ...card,
                      id: card._id,
                      faceUp: true,
                      position: 'attack'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardGrid;
