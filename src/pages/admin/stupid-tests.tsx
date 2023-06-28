import { useState } from 'react';
import ScrollDiv from '@/Global/ScrollDiv';

type OwnProps = {};

const StupidTest = () => {
  const [value, setValue] = useState();

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full">
        <ScrollDiv>
          <div className="flex">
            <div className="bg-green-300">
              div2
              <div className="h-[800px]" />
            </div>
            <div className="bg-red-200 h-1/2">div2</div>
            <div className="bg-red-300 h-56">div3</div>
          </div>
        </ScrollDiv>
        <div>button</div>
      </div>
    </div>
  );
};

export default StupidTest;
