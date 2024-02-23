import { useContext } from 'react';

import { CollectorContext } from '~/context/CollectorContext';

const Collection = () => {
  const { collector } = useContext(CollectorContext);
  console.log(collector);

  return <div>Welcome Collector</div>;
};

export default Collection;
