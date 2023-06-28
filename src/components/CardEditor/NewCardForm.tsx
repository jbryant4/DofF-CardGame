import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import CardForm from '@/CardEditor/CardForm';
import ImageSection from '@/CardEditor/ImageSection';
import ScrollDiv from '@/Global/ScrollDiv';
import {
  cardTypeArray,
  foundationArray,
  preReqArray,
  traitArray
} from '~/constants/cardEnumArrays';
import { CardContext } from '~/context/CardContext';
import { CardDocument, LessonType } from '~/models/Card';
import { newCard, updateCard } from '~/services/cardServices';
import objectCleaner from '~/utils/objectCleaner';
import LessonData from './LessonData';

//TODO keep this somewhere better like local env file
const blankImageUrl = process.env.NEXT_PUBLIC_BLANK_IMAGE_URL;
const cardImageUrl = process.env.NEXT_PUBLIC_CARD_IMAGE_URL;
interface Props {
  initialState?: Partial<CardDocument>;
  newCardForm: boolean;
}
const blankCard: Partial<CardDocument> = {
  _id: '',
  class: [],
  blankUrl: '',
  cardUrl: '',
  description: '',
  effectText: '',
  fileName: '',
  foundation: [],
  lesson: {
    mediaLinks: [],
    quickNotes: []
  },
  location: '',
  primaryClass: undefined,
  secondaryClass: undefined,
  preReqs: [],
  quiz: [],
  hp: 0,
  atk: 0,
  def: 0,
  title: '',
  type: '',
  yearEnd: 0,
  yearStart: 0
};
const NewCardForm = ({ initialState = blankCard, newCardForm }: Props) => {
  const [cardValues, setCardValues] =
    useState<Partial<CardDocument>>(blankCard);
  const [callComplete, setComplete] = useState(false);
  const { setFetchTrigger } = useContext(CardContext);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComplete(false);
    // console.log(cardValues);
    // const cleanData = objectCleaner(cardValues);
    // console.log(cardValues, cleanData, cleanData._id);
    if (newCardForm) {
      await newCard(cardValues);
    } else {
      await updateCard(cardValues);
    }
    setFetchTrigger(Date.now());
    setComplete(true);
  };

  useEffect(() => {
    if (initialState?._id === cardValues._id) return;
    setCardValues({ ...blankCard, ...initialState });
  }, []);

  useEffect(() => {
    if (
      !cardValues.fileName ||
      (initialState.blankUrl && initialState.blankUrl.length > 0)
    )
      return;

    setCardValues({
      ...cardValues,
      blankUrl: `${blankImageUrl}${cardValues.fileName}.jpg`,
      cardUrl: `${cardImageUrl}${cardValues.fileName}.png`
    });
  }, [cardValues.fileName]);

  return (
    <form onSubmit={handleSubmit} className="flex-grow h-fit w-full">
      <ScrollDiv heightBreakPoint={800}>
        <div className="flex gap-12 h-fit justify-center overflow-y-hidden w-full">
          <CardForm cardValues={cardValues} setCardValues={setCardValues} />
          <LessonData
            mediaLinks={cardValues.lesson?.mediaLinks ?? []}
            setCardValues={setCardValues}
            quickNotes={cardValues.lesson?.quickNotes}
            quiz={cardValues.quiz}
          />
          <ImageSection
            blankUrl={cardValues.blankUrl ?? ''}
            cardUrl={cardValues.cardUrl ?? ''}
          />
        </div>
      </ScrollDiv>
      <div className="flex flex-shrink-0 gap-8 items-center justify-center">
        <button
          type="submit"
          className="border border-black hover:text-green-600 my-8 p-8 w-fit"
        >
          {newCardForm ? 'Create Card' : 'Update Card'}
        </button>
        <div className={callComplete ? 'font-bold text-green-600' : 'hidden'}>
          {newCardForm
            ? 'Card Created Successfully'
            : 'Card Updated Successfully'}
        </div>
      </div>
    </form>
  );
};

export default NewCardForm;
