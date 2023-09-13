import { useState } from 'react';
import DesertFoundationIcon from '~/icons/DesertFoundationIcon';
import DivineIcon from '~/icons/DivineIcon';
import EarthFoundationIcon from '~/icons/EarthFoundationIcon';
import ExplorerIcon from '~/icons/ExplorerIcon';
import FighterIcon from '~/icons/FighterIcon';
import NobleIcon from '~/icons/NobleIcon';
import OceanFoundationIcon from '~/icons/OceanFoundationIcon';
import OneArmyIcon from '~/icons/OneArmyIcon';
import OneChampionIcon from '~/icons/OneChampionIcon';
import RevolutionistIcon from '~/icons/RevolutionistIcon';
import ScholarIcon from '~/icons/ScholarIcon';
import ThreeArmyIcon from '~/icons/ThreeArmyIcon';
import TwoArmyIcon from '~/icons/TwoArmyIcon';
import TwoChampionIcon from '~/icons/TwoChampionIcon';
import { Container, Wrapper } from './IconLibrary.styles';

type OwnProps = {};

const IconLibrary = ({}: OwnProps) => {
  return (
    <Container className="h-full overflow-hidden w-full">
      <Wrapper className="flex flex-row flex-wrap gap-24 h-full justify-evenly overflow-y-scroll pb-20">
        <DesertFoundationIcon />
        <EarthFoundationIcon />
        <OceanFoundationIcon />
        <OneArmyIcon />
        <TwoArmyIcon />
        <ThreeArmyIcon />
        <OneChampionIcon className="w-1/2" />
        <TwoChampionIcon className="w-1/2" />
        <DivineIcon />
        <ScholarIcon />
        <ExplorerIcon />
        <NobleIcon />
        <FighterIcon />
        <RevolutionistIcon />
      </Wrapper>
    </Container>
  );
};

export default IconLibrary;
