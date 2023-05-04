import { useUser } from '@auth0/nextjs-auth0/client';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { UserContext } from '~/context/UserContext';
import createComponent from '~/utils/styles/createComponent';

export default function Home() {
  const { user, error, isLoading } = useUser();
  console.log(user, error, isLoading);

  return (
    <div className="flex flex-col gap-16">
      <a href="/api/auth/login?returnTo=/admin/cards">Login</a>
      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}
