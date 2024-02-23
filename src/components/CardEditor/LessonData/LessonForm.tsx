import React, { useState } from 'react';
import BlueBtn from '@/Global/BlueBtn';
import { Card } from '~/contracts/card';

type OwnProps = {
  stringArray: string[];
  setCardValues: React.Dispatch<React.SetStateAction<Card>>;
  isMediaLinks: boolean;
};
const LessonForm = ({ stringArray, setCardValues, isMediaLinks }: OwnProps) => {
  const [newEntry, setNewEntry] = useState('');
  const [localStringArray, setLocalStringArray] = useState(stringArray);

  const setState = (array: string[]) => {
    if (isMediaLinks) {
      setCardValues(prevState => ({
        ...prevState,
        lesson: {
          quickNotes: prevState.lesson?.quickNotes ?? [],
          mediaLinks: array
        }
      }));
    } else {
      setCardValues(prevState => ({
        ...prevState,
        lesson: {
          mediaLinks: prevState.lesson?.mediaLinks ?? [],
          quickNotes: array
        }
      }));
    }
  };
  const handleAddMediaLink = () => {
    if (newEntry.trim().length === 0) return;

    const updatedMediaLinks = [...localStringArray, newEntry];
    setLocalStringArray(updatedMediaLinks);

    setState(updatedMediaLinks);
    setNewEntry('');
  };

  const handleRemoveMediaLink = index => {
    const updatedMediaLinks = localStringArray.filter((_, i) => i !== index);
    setLocalStringArray(updatedMediaLinks);
    setState(updatedMediaLinks);
  };

  return (
    <div>
      <div className="border-blue-800 border-solid border-y-[4px] flex gap-8 justify-around my-8 py-8">
        <input
          type="text"
          value={newEntry}
          onChange={e => setNewEntry(e.target.value)}
          placeholder="Enter Data"
          className="w-full"
        />
        <BlueBtn onClick={handleAddMediaLink}>Add</BlueBtn>
      </div>
      <div className="flex flex-col gap-4 overflow-auto">
        {localStringArray.length > 0 ? (
          localStringArray.map((text, index) => (
            <div
              key={index}
              className="flex items-center justify-start mb-2 p-4"
            >
              <div className="flex-shrink-0 w-fit">{index}).</div>
              <div className="break-all flex-grow px-8">{text}</div>
              <div className="flex-shrink-0 w-fit">
                <BlueBtn onClick={() => handleRemoveMediaLink(index)}>
                  Delete
                </BlueBtn>
              </div>
            </div>
          ))
        ) : (
          <div>Currently have no Data</div>
        )}
      </div>
    </div>
  );
};

export default LessonForm;
