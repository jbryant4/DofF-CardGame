// import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { AppProps } from 'next/app';
import Header from '@/Header/Header';
import Modals from '@/Modals';
import { CardProvider } from '~/context/CardContext';
import { CollectorProvider } from '~/context/CollectorContext';
import { GlobalProvider } from '~/context/GlobalContext';
import { ModalProvider } from '~/context/ModalContext';
import createComponent from '~/utils/styles/createComponent';
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import '../styles/globals.css';

const AppWrapper = createComponent('div', {
  className:
    'max-w-[1800px] bg-gray-500 mx-auto overflow-hidden h-screen flex flex-col relative'
});

const ComponentWrapper = createComponent('div', {
  className: 'w-full  mx-auto  h-full overflow-auto'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CollectorProvider>
      <CardProvider>
        <GlobalProvider>
          <ModalProvider>
            <AppWrapper>
              <Header />
              <ComponentWrapper>
                <Component {...pageProps} />
              </ComponentWrapper>
              <div className="bg-blue-800 h-full max-h-[36px]" />
              <Modals />
            </AppWrapper>
          </ModalProvider>
        </GlobalProvider>
      </CardProvider>
    </CollectorProvider>
  );
}
