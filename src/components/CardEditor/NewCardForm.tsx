import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import {
  cardTypeArray,
  foundationArray,
  preReqArray,
  traitArray
} from '~/constants/cardEnumArrays';
import { CardDocument } from '~/models/Card';
import { newCard, updateCard } from '~/services/cardServices';
import objectCleaner from '~/utils/objectCleaner';
import TestImageCard from './TestImageCard';

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
  preReqs: [],
  hp: 0,
  atk: 0,
  def: 0,
  title: '',
  type: ''
};
const NewCardForm = ({ initialState = blankCard, newCardForm }: Props) => {
  const [cardValues, setCardValues] =
    useState<Partial<CardDocument>>(blankCard);
  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => {
    setCardValues({
      ...cardValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.options);
    const selectedValues = options
      .filter(option => option.selected)
      .map(option => option.value);

    setCardValues({
      ...cardValues,
      [e.target.name]: selectedValues
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanData = objectCleaner(cardValues);
    console.log(cardValues, cleanData, cleanData._id);
    if (newCardForm) {
      await newCard(cleanData);
    } else {
      await updateCard(cleanData);
    }
  };

  useEffect(() => {
    if (initialState?._id === cardValues._id) return;
    setCardValues({ ...blankCard, ...initialState });
  });

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
    <div className="flex gap-12 h-fit justify-center my-auto w-full">
      <form
        className="border border-white card-form flex flex-col gap-12 p-4 w-[450px]"
        onSubmit={handleSubmit}
      >
        <div className="font-bold text-lg">Card Form</div>
        <label>
          Title
          <input
            required
            type="text"
            name="title"
            value={cardValues.title}
            onChange={e => handleChange(e)}
          />
        </label>

        <label>
          File Name
          <input
            required
            type="text"
            name="fileName"
            value={cardValues.fileName}
            onChange={e => handleChange(e)}
          />
        </label>

        <label>
          Blank Url
          <input
            type="text"
            name="blankUrl"
            value={cardValues.blankUrl}
            onChange={e => handleChange(e)}
            className="w-full"
          />
        </label>

        <label>
          Card Url
          <input
            type="text"
            name="cardUrl"
            value={cardValues.cardUrl}
            onChange={e => handleChange(e)}
            className="w-full"
          />
        </label>

        <label>
          Type
          <select
            required
            name="type"
            value={cardValues.type}
            onChange={e => handleChange(e)}
          >
            <option value="">Select a type</option>
            {cardTypeArray.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <div className="flex justify-around">
          <label>
            Class
            <select
              multiple
              name="class"
              value={cardValues.class || []}
              onChange={e => handleSelectChange(e)}
            >
              {traitArray.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            Foundation
            <select
              multiple
              size={3}
              name="foundation"
              value={cardValues.foundation || []}
              onChange={e => handleSelectChange(e)}
            >
              {foundationArray.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            Pre Requisites
            <select
              name="preReqs"
              value={cardValues.preReqs}
              onChange={e => handleSelectChange(e)}
              multiple
            >
              {preReqArray.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          Description
          <textarea
            name="description"
            value={cardValues.description}
            onChange={e => handleChange(e)}
          />
        </label>

        <label>
          Effect Text
          <textarea
            name="effectText"
            value={cardValues.effectText}
            onChange={e => handleChange(e)}
          />
        </label>
        <div className="flex justify-around">
          <label>
            HP
            <input
              type="number"
              name="hp"
              min={0}
              value={cardValues.hp}
              onChange={e => handleChange(e)}
              className="max-w-36"
            />
          </label>

          <label>
            ATK
            <input
              type="number"
              name="atk"
              min={0}
              value={cardValues.atk}
              onChange={e => handleChange(e)}
              className="max-w-36"
            />
          </label>

          <label>
            DEF
            <input
              type="number"
              name="def"
              min={0}
              value={cardValues.def}
              onChange={e => handleChange(e)}
              className="max-w-36"
            />
          </label>
        </div>

        <button
          type="submit"
          className="border border-black hover:text-green-600 mx-auto p-8 w-fit"
        >
          {newCardForm ? 'Create Card' : 'Update Card'}
        </button>
      </form>
      <TestImageCard
        blankUrl={cardValues.blankUrl ?? ''}
        cardUrl={cardValues.cardUrl ?? ''}
      />
    </div>
  );
};

export default NewCardForm;
