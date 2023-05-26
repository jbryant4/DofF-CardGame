import '../styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { AppProps } from 'next/app';
import Header from '@/Header/Header';
import { CardProvider } from '~/context/CardContext';
import { CollectorProvider } from '~/context/CollectorContext';
import createComponent from '~/utils/styles/createComponent';
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const AppWrapper = createComponent('div', {
  className: 'max-w-[1800px] bg-gray-500 mx-auto h-screen'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <CollectorProvider>
        <CardProvider>
          <AppWrapper>
            <Header />
            <Component {...pageProps} />
          </AppWrapper>
        </CardProvider>
      </CollectorProvider>
    </UserProvider>
  );
}
