import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { CollectorContext } from '~/context/CollectorContext';

export default function Home() {
  const { isLoggedIn, needCreation } = useContext(CollectorContext);
  const router = useRouter();
  console.log('in index', { needCreation, isLoggedIn });
  // route to different pages based on states
  useEffect(() => {
    if (needCreation) {
      router.push('/creation');
    } else if (isLoggedIn && !needCreation) {
      router.push('/collection');
    } else {
      router.push('/cards');
    }
  }, [isLoggedIn, needCreation, router]);

  return null; // this will not render anything on the page
}
