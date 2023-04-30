import classNames from 'classnames';
import { useContext, useState } from 'react';
import { UserContext } from '~/context/UserContext';
import createComponent from '~/utils/styles/createComponent';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoginForm, setForm] = useState(true);
  const { signUp, logIn, deleteUser, isLoggedIn } = useContext(UserContext);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(userName, email, password);
    if (!isLoginForm) {
      await signUp(userName, email, password);
    } else {
      await logIn(userName, password);
    }
  };

  return (
    <div className="h-screen w-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-1 items-center m-auto w-fit"
      >
        <label>
          User Name:
          <input
            type="text"
            value={userName}
            onChange={event => setUserName(event.target.value)}
          />
        </label>
        <label className={classNames({ hidden: isLoginForm })}>
          Email:
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">{isLoginForm ? 'Login' : 'Sign Up'}</button>
      </form>
      <div onClick={() => setForm(!isLoginForm)}>swap</div>
      {isLoggedIn ? 'logged in' : ''}
    </div>
  );
}
