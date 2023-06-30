import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Header = () => {
  // const { isLoggedIn } = useContext(CollectorContext);
  const [url, setUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    const pathname = router.pathname;

    if (pathname.includes('admin')) {
      setUrl('admin');

      return;
    } else if (pathname.includes('cards')) {
      setUrl('cards');

      return;
    }

    setUrl('');
  }, [router.pathname]);

  return (
    <div className="bg-blue-500 flex min-h-36 px-12 py-16 w-full">
      {/*{isLoggedIn ? (*/}
      {/*  <a href="/api/auth/logout">Logout</a>*/}
      {/*) : (*/}
      {/*  <a href="/api/auth/login">Login</a>*/}
      {/*)}*/}
      {!url ? null : (
        <Link
          href={url === 'admin' ? '/cards' : '/admin/cards'}
          className="bg-gray-300 duration-300 font-bold hover:bg-blue-500 hover:border-blue-500 hover:text-white inline-block px-12 py-4 rounded-full text-gray-700 transition"
        >
          {url === 'admin' ? 'Cards' : 'Admin'}
        </Link>
      )}
    </div>
  );
};

export default Header;
