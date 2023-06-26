import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { AppProps } from 'next/app';
import Header from '@/Header/Header';
import { CardProvider } from '~/context/CardContext';
import { CollectorProvider } from '~/context/CollectorContext';
import { GlobalProvider } from '~/context/GlobalContext';
import createComponent from '~/utils/styles/createComponent';
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import '../styles/globals.css';

const AppWrapper = createComponent('div', {
  className:
    'max-w-[1800px] bg-gray-500 mx-auto overflow-hidden h-screen flex flex-col'
});

const ComponentWrapper = createComponent('div', {
  className: 'w-full  mx-auto  h-full'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <CollectorProvider>
        <CardProvider>
          <GlobalProvider>
            <AppWrapper>
              <Header />
              <ComponentWrapper>
                <Component {...pageProps} />
              </ComponentWrapper>
            </AppWrapper>
          </GlobalProvider>
        </CardProvider>
      </CollectorProvider>
    </UserProvider>
  );
}
