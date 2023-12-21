import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import BlueBtn from '@/Global/BlueBtn';
import {
  useGetBattleDetails,
  useGetCardOnBoard,
  useHandleCardAttack,
  useHandleFlipCard,
  useHandleSwitchStance
} from '@/Modals/BattleCardModal/hooks';
import useHandleDirectHit from '@/Modals/BattleCardModal/hooks/useHandleDirectHit';
import BattleCard from '@/UpdatedCard/BattleCard';
import DuelingCard from '~/constants/DuelingCard';
import { useModalContext } from '~/context/ModalContext';
import { ActionBtn, Container } from './BattleCardModal.styles';

export default function BattleCardModal() {
  const { modalCard } = useModalContext();
  const [showCardsToAttack, setShow] = useState(false);
  const [cardBeingAttacked, setCard] = useState<DuelingCard | null>(null);
  const cardToUse = useGetCardOnBoard(modalCard);
  const {
    canFlip,
    canAttack,
    canAttackPlayer,
    canSwitch,
    cardsToAttack,
    showActions,
    hasDetailsToShow
  } = useGetBattleDetails(modalCard);
  const handleFlipCard = useHandleFlipCard(modalCard);
  const handleSwitchStance = useHandleSwitchStance(modalCard);
  const handleDirectHit = useHandleDirectHit();
  const handleAttack = useHandleCardAttack();
  const [switchedThisOpen, setSwitchedThisTurn] = useState(false);

  const handleSwitch = () => {
    if (!canSwitch || switchedThisOpen) return;
    handleSwitchStance();
    setSwitchedThisTurn(true);
  };
  const handleFlip = () => {
    if (!canFlip) return;
    handleFlipCard();
  };
  const handleDirect = () => {
    if (!canAttackPlayer) return;
    handleDirectHit();
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

        <Dialog.Description className="flex flex-col my-16">
          <BattleCard card={cardToUse} />
        </Dialog.Description>

        {showCardsToAttack && !cardBeingAttacked && (
          <Dialog.Description as="div" className="flex gap-16 items-center">
            {cardsToAttack.map(card =>
              card ? (
                <div key={card.id} className="flex flex-col gap-8 items-center">
                  <BattleCard card={card} width={200} />
                  <ActionBtn
                    disabled={(card?.hp ?? 99) <= 0}
                    className="w-fit"
                    onClick={() => {
                      setCard(card);
                      handleAttack(
                        cardToUse.id,
                        card.id,
                        cardToUse.type === 'champ'
                      );
                    }}
                  >
                    this guy
                  </ActionBtn>
                </div>
              ) : null
            )}
          </Dialog.Description>
        )}

        {cardBeingAttacked && (
          <Dialog.Description as="div" className="flex gap-8 items-center">
            <BattleCard card={cardBeingAttacked} width={200} />
          </Dialog.Description>
        )}
      </Dialog.Panel>
    </Container>
  ) : null;
}
