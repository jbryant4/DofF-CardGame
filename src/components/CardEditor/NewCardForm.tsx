import { doc, addDoc, collection, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAdminCardContext } from '@/CardEditor/AdminCardContext';
import CardForm from '@/CardEditor/CardForm';
import ImageSection from '@/CardEditor/ImageSection';
import ScrollDiv from '@/Global/ScrollDiv';

import LessonData from './LessonData';
import { Collections, db } from '../../../firebase';

export default function NewCardForm() {
  const {
    cardValues,
    setCardValues,
    task,
    setTask,
    apiMessage: { setData, setLoading }
  } = useAdminCardContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(cardValues.id, 'in handle submit');
    try {
      setLoading();

      if (cardValues.id) {
        const docRef = doc(db, Collections.Cards, cardValues.id);
        await updateDoc(docRef, { ...cardValues });
        setData(
          `Card Has been Updated Refresh page and go to ${cardValues.title} to see updates`
        );
      } else {
        const docRef = await addDoc(
          collection(db, Collections.Cards),
          cardValues
        );
        await updateDoc(docRef, { id: docRef.id });
        setData(`Document added with ID: ${docRef.id}`);
      }

      setTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  const show = task === 'create' || (task === 'edit' && cardValues.id);

  return show ? (
    <form
      onSubmit={handleSubmit}
      className="flex-grow h-fit overflow-auto w-full"
      key="cardForm"
    >
      <ScrollDiv heightBreakPoint={800}>
        <div className="flex gap-12 h-fit justify-center overflow-auto overflow-y-hidden w-full">
          <CardForm cardValues={cardValues} setCardValues={setCardValues} />
          <LessonData />
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
          {task === 'edit' ? 'Update Card' : 'Create Card'}
        </button>
      </div>
    </form>
  ) : null;
}
