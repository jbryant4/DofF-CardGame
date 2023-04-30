import { useRouter } from 'next/router';
import { createContext, useContext, useState } from 'react';
import {
  createUser,
  deleteUser,
  editUser,
  getUser
} from '~/services/userService';
import User from '../types/user';

type UserContextType = {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  signUp: (userName: string, email: string, password: string) => Promise<void>;
  logIn: (userName: string, password: string) => Promise<void>;
  logOut: () => void;
  forgotPassword: (email: string) => Promise<void>;
  deleteUser: () => Promise<void>;
};

const defaultUserContext: UserContextType = {
  user: null,
  accessToken: null,
  isLoggedIn: false,
  signUp: async (userName: string, email: string, password: string) => {},
  logIn: async (userName: string, password: string) => {},
  logOut: () => {},
  forgotPassword: async (email: string) => {},
  deleteUser: async () => {}
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

type UserProviderProps = {
  children: React.ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  async function signUp(userName: string, email: string, password: string) {
    try {
      // Create the user
      const newUser = await createUser({
        userName,
        email,
        password,
        cards: [''],
        decks: [['']]
      });

      // Log in the user
      await logIn(userName, password);
    } catch (error) {
      console.error(error);
    }
  }

  async function logIn(userName: string, password: string) {
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName, password })
      });
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
      const { token, user } = await response.json();
      setAccessToken(token);
      setUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  }

  function logOut() {
    setAccessToken(null);
    setUser(null);
    setIsLoggedIn(false);
  }

  async function forgotPassword(email: string) {
    // implementation for forgot password
  }

  async function userDelete() {
    try {
      await deleteUser(user._id);
      setAccessToken(null);
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        accessToken,
        isLoggedIn,
        signUp,
        logIn,
        logOut,
        forgotPassword,
        userDelete
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
