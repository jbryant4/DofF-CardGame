import classNames from 'classnames';
import { useContext } from 'react';
import { Container } from '@/Card/Card.styles';
import CardType from '~/constants/CardType';
import { GlobalContext } from '~/context/GlobalContext';
import AttackIcon from '~/icons/AttackIcon';
import CornerStatIcon from '~/icons/CornerStatIcon';
import HealthBarIcon from '~/icons/HealthBarIcon';
import HeartIcon from '~/icons/HeartIcon';
import Hex from '~/icons/Hex';
import PreReqIcon from '~/icons/PreReqIcon';
import RevolutionistIcon from '~/icons/RevolutionistIcon';
import ShieldIcon from '~/icons/ShieldIcon';

function getHexIconKey(card: CardType) {
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
type OwnProps = {
  card: CardType;
};
const Card = ({ card }: OwnProps) => {
  const { isMobile } = useContext(GlobalContext);

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
    <Container className="">
      <div
        className={classNames(
          'mx-auto relative',
          { 'w-[255px] h-[340px]': isMobile },
          { 'w-[255px] h-[340px] ': !isMobile }
        )}
      >
        <img src={blankUrl} className="absolute h-full left-0 top-0 w-full" />
        <Hex
          size={60}
          stroke="black"
          icon={hexIconKey}
          className="absolute left-[-30px] stroke-blue-600 top-[-42px] z-20"
        />
        <div className="absolute bg-black border-blue-600 border-solid border-t border-x pl-32 text-white top-[-25px] w-full">
          {title}
        </div>
        {!preReqs ? null : (
          <div className="absolute left-[-29px] top-36 z-20">
            {preReqs.map(req => (
              <PreReqIcon key={req} preReq={req} />
            ))}
          </div>
        )}
        <div className="absolute bg-black border-b border-blue-600 border-l border-solid h-full left-0 w-16 z-10" />
        <div className="absolute bg-black border-b border-blue-600 border-r border-solid h-full right-0 w-16 z-10" />
        <div className="absolute bg-black border-b border-blue-600 border-solid bottom-0 h-40 left-0 w-full z-[8]" />
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
