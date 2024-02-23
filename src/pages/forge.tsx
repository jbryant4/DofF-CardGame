import cx from 'classnames';
import FilterBar from '@/FilterBar';
import DeckEditor from '@/Forge/DeckEditor';
import DeckList from '@/Forge/DeckList';

import { ForgeProvider, useForgeContext } from '~/context/ForgeContext';

function FilterWrapper() {
  const { deckInForge } = useForgeContext();

  return (
    <div
      className={cx(
        deckInForge.title ? 'bg-black h-full overflow-y-auto' : 'invisible'
      )}
    >
      {deckInForge.title ? <FilterBar /> : null}
    </div>
  );
}

const Forge = () => {
  return (
    <ForgeProvider>
      <div className="flex gap-16 h-full overflow-hidden px-12 py-8">
        <div className="gap-16 grid grid-rows-2">
          <FilterWrapper />
          <div className="h-full overflow-auto">
            <DeckList />
          </div>
        </div>
        <DeckEditor />
      </div>
    </ForgeProvider>
  );
};

export default Forge;
