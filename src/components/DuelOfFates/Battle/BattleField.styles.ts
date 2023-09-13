import createComponent from '~/utils/styles/createComponent';

export const Container = createComponent('div', {
  className:
    'bg-green-50 grid grid-rows-[1fr_10vh_50vh] h-full overflow-hidden w-full'
});

export const Wrapper = createComponent('div', { className: '' });
