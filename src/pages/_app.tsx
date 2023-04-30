import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { UserProvider } from '~/context/UserContext';
import createComponent from '~/utils/styles/createComponent';

const AppWrapper = createComponent('div', {
  className: 'max-w-[1800px] bg-gray-500 mx-auto h-full'
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </UserProvider>
  );
}
