import classNames from 'classnames';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Container } from '@/Card/Card.styles';
import CardType from '~/constants/CardType';
import { GlobalContext } from '~/context/GlobalContext';
import AttackIcon from '~/icons/AttackIcon';
import CornerStatIcon from '~/icons/CornerStatIcon';
import HealthBarIcon from '~/icons/HealthBarIcon';
import HeartIcon from '~/icons/HeartIcon';
import Hex from '~/icons/Hex';
import PreReqIcon from '~/icons/PreReqIcon';
import ShieldIcon from '~/icons/ShieldIcon';
import useGetCardDimensions from './useGetCardDimensions';
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
  width?: number;
};
const UpdatedCard = ({ card, width = 255 }: OwnProps) => {
  const {
    title,
    preReqs,
    effectText,
    foundation,
    hp = 0,
    def,
    atk,
    class: traits,
    blankUrl,
    type
  } = card;
  const [maxHp, setMaxHp] = useState(hp);
  const [currentHp, setHp] = useState(hp);
  const { isMobile } = useContext(GlobalContext);
  const { borderDimension, bottomBorderWidth, imageHeight } =
    useGetCardDimensions(width);
  console.log(imageHeight);

  const hasBattleStats = atk && def && hp;
  const healthOrbs = currentHp > maxHp ? currentHp : maxHp;

  const hexIconKey = getHexIconKey(card);

  return (
    <div
      style={{
        width: `${width}px`
      }}
    >
      <div className="relative">
        <Hex
          size={60}
          stroke="black"
          icon={hexIconKey}
          className="-top-[18px] absolute left-[-30px] z-20"
        />
        <div className="bg-black overflow-ellipsis overflow-x-hidden pl-32 text-16 text-white top-[-25px] w-full whitespace-nowrap">
          {title}
        </div>
      </div>
      <div className="relative">
        <div
          className="absolute bg-black h-full left-0 top-0"
          style={{
            width: `${borderDimension}px`
          }}
        />
        <img
          src={blankUrl}
          className="object-cover"
          style={{
            width: `${width}px`,
            height: `${imageHeight}px`
          }}
        />
        <div
          className="absolute bg-black h-full right-0 top-0"
          style={{
            width: `${borderDimension}px`
          }}
        />
        <div
          className="absolute bg-black bottom-0"
          style={{
            width: `${bottomBorderWidth}px`,
            height: `${borderDimension}px`,
            left: `${borderDimension}px`
          }}
        />
        {hasBattleStats && (
          <div
            className="absolute bg-gray-500/90 flex flex-col h-2/5"
            style={{
              width: `${bottomBorderWidth}px`,
              bottom: `${borderDimension}px`,
              left: `${borderDimension}px`
            }}
          >
            <div>other div</div>
            <div className="bg-black relative w-full">
              <div className="flex mx-auto w-fit">
                {Array.from({ length: healthOrbs }).map((_, index) => (
                  <div
                    key={index}
                    className={classNames(
                      'health-circle',
                      {
                        empty: index + 1 <= maxHp && index + 1 >= currentHp
                      },
                      {
                        'bonus-health':
                          index + 1 > maxHp && index + 1 <= currentHp
                      }
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/*{!preReqs ? null : (*/}
      {/*  <div className="absolute left-[-29px] top-36 z-20">*/}
      {/*    {preReqs.map(req => (*/}
      {/*      <PreReqIcon key={req} preReq={req} />*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*<div className="absolute bg-black border-b border-blue-600 border-l border-solid h-full left-0 w-16 z-10" />*/}
      {/*<div className="absolute bg-black border-b border-blue-600 border-r border-solid h-full right-0 w-16 z-10" />*/}
      {/*<div className="absolute bg-black border-b border-blue-600 border-solid bottom-0 h-40 left-0 w-full z-[8]" />*/}
      {/*{!effectText ? null : (*/}
      {/*  <div className="absolute bg-gray-700/90 bottom-0 h-1/2 left-0py-5 pt-8 px-20 text-center text-sm w-full">*/}
      {/*    {effectText}*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{hp === undefined ? null : (*/}
      {/*  <>*/}
      {/*    <div className="-bottom-28 absolute flex items-center left-60 z-20">*/}
      {/*      <HeartIcon size={40} hp={hp} className="-mx-4" />*/}
      {/*      <HealthBarIcon size={100} hp={hp} className="-mx-4" />*/}
      {/*    </div>*/}
      {/*  </>*/}
      {/*)}*/}
      {/*{def === undefined ? null : (*/}
      {/*  <>*/}
      {/*    <CornerStatIcon*/}
      {/*      size={100}*/}
      {/*      className="-rotate-90 absolute bottom-[-6px] right-[-7px]"*/}
      {/*    />*/}
      {/*    <ShieldIcon*/}
      {/*      size={55}*/}
      {/*      def={def}*/}
      {/*      className="absolute bottom-8 fill-blue-600 right-4 z-20"*/}
      {/*    />*/}
      {/*  </>*/}
      {/*)}*/}
      {/*{atk === undefined ? null : (*/}
      {/*  <>*/}
      {/*    <CornerStatIcon*/}
      {/*      size={100}*/}
      {/*      className="absolute bottom-[-6px] left-[-7px]"*/}
      {/*    />*/}
      {/*    <AttackIcon*/}
      {/*      size={55}*/}
      {/*      atk={atk}*/}
      {/*      className="absolute bottom-8 fill-blue-600 left-4 z-20"*/}
      {/*    />*/}
      {/*  </>*/}
      {/*)}*/}
      <div onClick={() => setHp(prevState => prevState + 1)}>up</div>
      <div onClick={() => setHp(prevState => prevState - 1)}>down</div>
    </div>
  );
};

export default UpdatedCard;
