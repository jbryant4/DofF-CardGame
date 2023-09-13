import React from 'react';
import {
  cardTypeArray,
  foundationArray,
  preReqArray,
  traitArray
} from '~/constants/cardEnumArrays';
import { CardDocument } from '~/models/Card';

type OwnProps = {
  cardValues: Partial<CardDocument>;
  setCardValues: React.Dispatch<React.SetStateAction<Partial<CardDocument>>>;
};

const CardForm = ({ cardValues, setCardValues }: OwnProps) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
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

  return (
    <div className="border border-white card-form flex flex-col gap-12 h-fit overflow-y-auto p-4 w-[550px]">
      <div className="font-bold mb-24 text-24">Card Form</div>
      <div className="flex justify-around">
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
          Type
          <select
            required
            name="type"
            value={cardValues.type}
            onChange={e => handleChange(e)}
          >
            <option value={undefined}>Select a type</option>
            {cardTypeArray.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Blank Url
        <textarea
          name="blankUrl"
          value={cardValues.blankUrl}
          onChange={e => handleChange(e)}
        />
      </label>

      <label>
        Card Url
        <textarea
          name="cardUrl"
          value={cardValues.cardUrl}
          onChange={e => handleChange(e)}
        />
      </label>

      <div className="flex justify-around">
        <div className="card-form flex flex-col">
          <div>
            <label>
              Class Prim
              <select
                name="primaryClass"
                value={cardValues.primaryClass}
                onChange={e => handleChange(e)}
              >
                <option key="no-class" value={undefined}>
                  No Primary
                </option>
                {traitArray.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Class Second
              <select
                name="secondaryClass"
                value={cardValues.secondaryClass}
                onChange={e => handleChange(e)}
              >
                <option key="no-class" value={undefined}>
                  No Secondary
                </option>
                {traitArray.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

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
          Pre Reqs
          <select
            name="preReqs"
            onChange={e => handleSelectChange(e)}
            value={cardValues.preReqs}
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

      <div className="card-form flex justify-around">
        <div className="flex flex-col">
          <label>
            HP
            <input
              type="number"
              name="hp"
              min={0}
              value={cardValues.hp}
              onChange={e => handleChange(e)}
              className="w-64"
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
              className="w-64"
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
              className="w-64"
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label>
            Year Start
            <input
              type="number"
              name="yearStart"
              min={0}
              value={cardValues.yearStart}
              onChange={e => handleChange(e)}
              className="w-64"
            />
          </label>
          <label>
            Year End
            <input
              type="number"
              name="yearEnd"
              min={0}
              value={cardValues.yearEnd}
              onChange={e => handleChange(e)}
              className="w-64"
            />
          </label>
          <label>
            Location
            <input
              type="text"
              name="location"
              min={0}
              value={cardValues.location}
              onChange={e => handleChange(e)}
              className="w-64"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CardForm;
