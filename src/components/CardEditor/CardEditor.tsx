import classNames from 'classnames';
import React, { useState } from 'react';
import { useAdminCardContext } from '@/CardEditor/AdminCardContext';
import EditCardForm from '@/CardEditor/EditCardForm';
import { useCollectorContext } from '~/context/CollectorContext';
import NewCardForm from './NewCardForm';

const CardEditor = () => {
  const {
    task,
    setTask,
    apiMessage: { data: apiMessage }
  } = useAdminCardContext();

  return (
    <div className="flex flex-col gap-4 h-full items-center text-center w-full">
      <div className={classNames('mr-16 mt-8 self-end', { hidden: !task })}>
        <div
          className="bg-blue-800 hover:bg-white hover:text-blue-800 px-8 py-4 rounded-2xl text-lg text-white"
          onClick={() => setTask(task === 'edit' ? 'create' : 'edit')}
        >
          {task === 'edit' ? 'Create' : 'Edit'}
        </div>
      </div>
      <div
        className={classNames('flex gap-16 items-center justify-center', {
          hidden: Boolean(task)
        })}
      >
        <div className="text-24 w-fit">
          HI Admin
          <br /> What would you like to do today?
        </div>
        <div
          className="border border-white hover:bg-white hover:text-green-600 py-4 text-24 w-[230px]"
          onClick={() => setTask('create')}
        >
          Create a Card
        </div>
        <div
          className="border border-white hover:bg-white hover:text-green-600 py-4 text-24 w-[230px]"
          onClick={() => setTask('edit')}
        >
          Edit a Card
        </div>
      </div>

      {task && <EditCardForm />}

      {!task && (
        <div className={apiMessage ? 'font-bold text-green-600' : 'hidden'}>
          {apiMessage}
        </div>
      )}
    </div>
  );
};

export default CardEditor;
