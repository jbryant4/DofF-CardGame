import { useContext } from 'react';
import { CollectorContext } from '~/context/CollectorContext';

const Header = () => {
  const { isLoggedIn } = useContext(CollectorContext);

  return (
    <div className="bg-blue-500 flex flex-col justify-end px-12 py-4">
      {isLoggedIn ? (
        <a href="/api/auth/logout">Logout</a>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </div>
  );
};

export default Header;
