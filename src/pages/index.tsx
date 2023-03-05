import createComponent from '~/utils/styles/createComponent';

const DefaultWrapper = createComponent('div', {
  className: 'flex flex-col h-screen items-center justify-center w-screen'
});
export default function Home() {
  return (
    <DefaultWrapper>
      <p>Fresh Next Template</p>
      <p>Including: Typescript, Tailwind, Prettier, Eslint</p>
    </DefaultWrapper>
  );
}
