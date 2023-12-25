import { Dialog } from '@headlessui/react';
import cx from 'classnames';
import { useState } from 'react';
import {
  useGetBattleDetails,
  useGetCardOnBoard,
  useHandleCardAttack,
  useHandleFlipCard,
  useHandleSwitchStance
} from '@/Modals/BattleCardModal/hooks';
import useHandleDirectHit from '@/Modals/BattleCardModal/hooks/useHandleDirectHit';
import BattleCard from '@/UpdatedCard/BattleCard';
import { useBoardContext } from '~/context/BoardContext';
import { useModalContext } from '~/context/ModalContext';
import { ActionBtn, Container } from './BattleCardModal.styles';

export default function BattleCardModal() {
  const { modalInfo } = useModalContext();
  const [showCardsToAttack, setShow] = useState(false);
  const [hideButtons, setHideButtons] = useState(false);
  const cardToUse = useGetCardOnBoard(modalInfo);
  const {
    canFlip,
    canAttack,
    canAttackPlayer,
    canSwitch,
    cardsToAttack,
    showActions,
    hasDetailsToShow
  } = useGetBattleDetails(cardToUse, modalInfo.isEnemy);
  const handleFlipCard = useHandleFlipCard(cardToUse);
  const handleSwitchStance = useHandleSwitchStance(cardToUse);
  const handleDirectHit = useHandleDirectHit();
  const handleAttack = useHandleCardAttack();
  const [switchedThisOpen, setSwitchedThisTurn] = useState(false);
  const { setDirectHitThisRound, setAttackedThisRound } = useBoardContext();

  const handleSwitch = () => {
    handleSwitchStance();
    setSwitchedThisTurn(true);
  };
  const handleFlip = () => {
    handleFlipCard();
  };
  const handleDirect = () => {
    handleDirectHit();
    setDirectHitThisRound(true);
  };

  return cardToUse ? (
    <Container>
      <Dialog.Panel className="bg-white flex gap-24 items-center justify-between mx-auto p-24 rounded">
        {showActions && !showCardsToAttack && (
          <div className="flex flex-col gap-8 h-fit">
            <ActionBtn onClick={handleFlip} disabled={!canFlip}>
              flip
            </ActionBtn>
            <ActionBtn
              onClick={handleSwitch}
              disabled={!canSwitch || switchedThisOpen}
            >
              switch
            </ActionBtn>
            <ActionBtn
              onClick={() => setShow(v => (!canAttack ? false : !v))}
              disabled={!canAttack}
            >
              attack
            </ActionBtn>
            <ActionBtn onClick={handleDirect} disabled={!canAttackPlayer}>
              Direct Hit
            </ActionBtn>
          </div>
        )}

        <Dialog.Description as="div" className="flex flex-col my-16">
          <BattleCard card={cardToUse} />
        </Dialog.Description>

        {showCardsToAttack && (
          <Dialog.Description as="div" className="flex gap-16 items-center">
            {cardsToAttack.map(card =>
              card ? (
                <div key={card.id} className="flex flex-col gap-8 items-center">
                  <BattleCard card={card} width={200} />
                  <ActionBtn
                    disabled={(card?.hp ?? 99) <= 0 || hideButtons}
                    className={cx('w-fit', { invisible: hideButtons })}
                    onClick={() => {
                      setHideButtons(true);
                      handleAttack(
                        cardToUse.id,
                        card.id,
                        cardToUse.type === 'champion'
                      );
                      setAttackedThisRound(prevState => [
                        ...prevState,
                        cardToUse.id
                      ]);
                    }}
                  >
                    this guy
                  </ActionBtn>
                </div>
              ) : null
            )}
          </Dialog.Description>
        )}
      </Dialog.Panel>
    </Container>
  ) : null;
}
