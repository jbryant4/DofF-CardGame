import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { Container, Wrapper } from './BattleCardModal.styles';

type OwnProps = {};

const BattleCardModal = ({}: OwnProps) => {
  const [value, setValue] = useState();

  return (
    <Container>
      <Wrapper>BattleCardModal</Wrapper>
      <Dialog.Panel className="bg-white h-[400px] mx-auto w-[400px]">
        <Dialog.Title>Deactivate account</Dialog.Title>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>

        <p>BreakDown</p>
      </Dialog.Panel>
    </Container>
  );
};

export default BattleCardModal;
