import createComponent from '~/utils/styles/createComponent';

export const Container = createComponent('div', {
  className:
    'bg-green-50 grid grid-rows-[1fr_50vh] gap-24 h-full overflow-hidden w-full relative board-container'
});

export const Wrapper = createComponent('div', { className: '' });
