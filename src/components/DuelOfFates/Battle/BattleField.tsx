import { useState } from 'react';
import styles from '@/DuelOfFates/Battle/BattleField.module.css';
import ControlCenter from '@/DuelOfFates/Battle/ControlCenter';
import FoundationCards from '@/DuelOfFates/Battle/FoundationCard';
import Military from '@/DuelOfFates/Battle/Military';
import Overlays from '@/DuelOfFates/Battle/Overlays';
import { Overlay } from '@/DuelOfFates/Battle/Overlays/Overlays';
import Resources from '@/DuelOfFates/Battle/Resources';
import { useDimensionsContext } from '~/context/DimensionsContext';
import { Container } from './BattleField.styles';

type OwnProps = {};

const BattleField = ({}: OwnProps) => {
  const { handCardHeight, gridRowLayout, canFullBoard } =
    useDimensionsContext();

  const [overlayOpen, setOpenOverlay] = useState(Overlay.None);

  return (
    <div className="flex h-full items-center">
      <Container
        style={{
          gridTemplateRows: gridRowLayout
        }}
        useFullHeight={!canFullBoard}
      >
        {/*Enemy Board*/}
        <div className={styles.enemyLayout}>
          <div className={`${styles.perks} flex flex-col justify-around`}>
            <Resources isEnemy />
            <FoundationCards isEnemy />
          </div>
          <Military isEnemy />
          {/*<ControlCenter isEnemy={isEnemy} />*/}
        </div>

        {/*Local Board*/}
        <div className={styles.layout}>
          <div className={`${styles.perks} flex flex-col justify-around`}>
            <FoundationCards />
            <Resources />
          </div>
          <Military />
        </div>
        <ControlCenter
          overlayOpen={overlayOpen}
          setShowGraveYard={setOpenOverlay}
        />

        {/*Absolutely Positioned components*/}
        <Overlays overlayToShow={overlayOpen} setOverlay={setOpenOverlay} />
      </Container>
    </div>
  );
};

export default BattleField;
