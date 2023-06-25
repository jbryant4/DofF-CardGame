import { CardContext } from '~/context/CardContext';
import { GlobalContext } from '~/context/GlobalContext';
import classNames from 'classnames';
import { useContext } from 'react';
import { Container } from '@/Card/Card.styles';
import Hex from '~/icons/Hex';
import RevolutionistIcon from '~/icons/RevolutionistIcon';
import { useRouter } from 'next/router';
import PreReqIcon from '~/icons/PreReqIcon';
import CornerStatIcon from '~/icons/CornerStatIcon';
import HealthBarIcon from '~/icons/HealthBarIcon';
import HeartIcon from '~/icons/HeartIcon';
import ShieldIcon from '~/icons/ShieldIcon';
import AttackIcon from '~/icons/AttackIcon';
import { CardDocument } from '~/models/Card';

function getHexIconKey(card: CardDocument) {
  switch (card.type) {
    case 'army':
      return ['army'];
    case 'foundation':
      return card.foundation;
    case 'champion':
      return card.class;
    default:
      return ['resource'];
  }
}
const Card = () => {
  const router = useRouter();
  const { id } = router.query;
  const { cards } = useContext(CardContext);
  const { isMobile } = useContext(GlobalContext);
  const card = cards.find(card => card._id === id);
  if (!card) return <div>no card</div>;

  const {
    title,
    preReqs,
    effectText,
    foundation,
    hp,
    def,
    atk,
    class: traits,
    blankUrl,
    type
  } = card;

  const hexIconKey = getHexIconKey(card);

  return (
    <Container className="h-full w-full">
      <div
        className={classNames(
          'mt-56 mx-auto relative',
          { 'w-[250px] h-[375px]': isMobile },
          { 'w-[250px] h-[375px] ': !isMobile }
        )}
      >
        <img src={blankUrl} className="absolute h-full left-0 top-0 w-full" />
        <Hex
          size={60}
          stroke="black"
          icon={hexIconKey}
          className="absolute left-[-30px] stroke-blue-600 top-[-42px] z-20"
        >
          <RevolutionistIcon size={55} x={25} y={25} fill="black" />
        </Hex>
        <div className="absolute bg-black border-blue-600 border-solid border-t border-x px-32 text-white top-[-25px] w-full">
          {title}
        </div>
        {!preReqs ? null : (
          <div className="absolute left-[-29px] top-36 z-20">
            {preReqs.map(req => (
              <PreReqIcon preReq={req} />
            ))}
          </div>
        )}
        <div className="absolute bg-black border-b border-blue-600 border-l border-solid h-full left-0 w-16 z-10" />
        <div className="absolute bg-black border-b border-blue-600 border-r border-solid h-full right-0 w-16 z-10" />
        <div className="absolute bg-black border-b border-blue-600 border-solid bottom-0 h-40 h-full left-0 w-full z-[8]" />
        {!effectText ? null : (
          <div className="absolute bg-gray-700/90 bottom-0 h-1/2 left-0py-5 pt-8 px-20 text-center text-sm w-full">
            {effectText}
          </div>
        )}
        {hp === undefined ? null : (
          <>
            <div className="-bottom-28 absolute flex items-center left-60 z-20">
              <HeartIcon size={40} hp={hp} className="-mx-4" />
              <HealthBarIcon size={100} hp={hp} className="-mx-4" />
            </div>
          </>
        )}
        {def === undefined ? null : (
          <>
            <CornerStatIcon
              size={100}
              className="-rotate-90 absolute bottom-[-6px] right-[-7px]"
            />
            <ShieldIcon
              size={55}
              def={def}
              className="absolute bottom-8 fill-blue-600 right-4 z-20"
            />
          </>
        )}
        {atk === undefined ? null : (
          <>
            <CornerStatIcon
              size={100}
              className="absolute bottom-[-6px] left-[-7px]"
            />
            <AttackIcon
              size={55}
              atk={atk}
              className="absolute bottom-8 fill-blue-600 left-4 z-20"
            />
          </>
        )}
      </div>
    </Container>
  );
};

export default Card;
