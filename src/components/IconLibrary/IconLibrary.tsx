import { useState } from 'react';
import DesertFoundationIcon from '~/icons/DesertFoundationIcon';
import EarthFoundationIcon from '~/icons/EarthFoundationIcon';
import OceanFoundationIcon from '~/icons/OceanFoundationIcon';
import OneArmyIcon from '~/icons/OneArmyIcon';
import TwoArmyIcon from '~/icons/TwoArmyIcon';
import { Container, Wrapper } from './IconLibrary.styles';

type OwnProps = {};

const IconLibrary = ({}: OwnProps) => {
  const [value, setValue] = useState();

  return (
    <Container className="h-full w-full">
      <Wrapper className="flex flex-row flex-wrap justify-evenly">
        <EarthFoundationIcon />
        <DesertFoundationIcon />
        <OceanFoundationIcon />
        <OneArmyIcon />
        <TwoArmyIcon />
      </Wrapper>
    </Container>
  );
};

export default IconLibrary;
