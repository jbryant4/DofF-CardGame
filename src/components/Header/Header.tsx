import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useCollectorContext } from '~/context/CollectorContext';
import links from './internalLinks';

const navStyles = 'w-fit capitalize font-serif font-bold underline';
const Header = () => {
  const router = useRouter();
  const { isLoggedIn, collector } = useCollectorContext();
  const [showAdminNav, setShowAdminNav] = useState(false);
  const showAdmin = collector ? collector.isAdmin : false;
  const { internalLinks, adminLinks } = links;

  useEffect(() => {
    setShowAdminNav(false);
  }, [router]);

  return (
    <div className="bg-blue-800 flex gap-24 items-center min-h-36 px-12 w-full">
      {isLoggedIn && (
        <div className="flex flex-grow gap-24 h-full items-center relative w-full">
          <Link href="/">
            <img alt="header logo" src="/logo.png" className="w-56" />
          </Link>
          <div className="bg-blue-800 flex gap-24 h-full items-center justify-start last:justify-between relative w-full z-[2]">
            {internalLinks.map(({ displayName, link }) => (
              <Link className={navStyles} key={displayName} href={link}>
                {displayName}
              </Link>
            ))}

            {showAdmin && (
              <div className="flex flex-grow items-center justify-end">
                <div
                  className={`${navStyles} cursor-pointer  w-fit `}
                  onClick={() => setShowAdminNav(prev => !prev)}
                >
                  admin
                </div>
              </div>
            )}
          </div>

          <div
            className={cx(
              '-:bottom-0 absolute bg-blue-800 duration-500 ease-in-out flex gap-24 h-fit px-8 py-4 right-0 rounded-b transition-all w-fit z-0',
              { '-bottom-[24px]': showAdminNav }
            )}
          >
            {adminLinks.map(({ displayName, link }) => (
              <Link className={navStyles} key={displayName} href={link}>
                {displayName}
              </Link>
            ))}
          </div>
        </div>
      )}

      {collector && <div>{collector.userName}</div>}
    </div>
  );
};

export default Header;
