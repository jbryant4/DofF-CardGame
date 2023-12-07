import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Header from '@/Header/Header';
import Modals from '@/Modals';
import { CardProvider } from '~/context/CardContext';
import { CollectorProvider } from '~/context/CollectorContext';
import GameProviders from '~/context/GameProviders';
import { GlobalProvider } from '~/context/GlobalContext';
import { ModalProvider } from '~/context/ModalContext';
import { SocketProvider } from '~/context/SocketContext';
import createComponent from '~/utils/styles/createComponent';
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-cards';
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
  const router = useRouter();
  const isGameRoute = router.pathname.includes('game');

  return (
    <CollectorProvider>
      <CardProvider>
        <GlobalProvider>
          <ModalProvider>
            <AppWrapper>
              {!isGameRoute && <Header />}
              {isGameRoute ? (
                <GameProviders>
                  <ComponentWrapper>
                    <Component {...pageProps} />
                  </ComponentWrapper>
                </GameProviders>
              ) : (
                <ComponentWrapper>
                  <Component {...pageProps} />
                </ComponentWrapper>
              )}
              {!isGameRoute && (
                <div className="bg-blue-800 h-full max-h-[36px]" />
              )}
              <Modals />
            </AppWrapper>
          </ModalProvider>
        </GlobalProvider>
      </CardProvider>
    </CollectorProvider>
  );
}
