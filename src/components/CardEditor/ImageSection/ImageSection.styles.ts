import createComponent from '~/utils/styles/createComponent';

export const Container = createComponent('div', {
  className:
    'bg-white flex flex-col gap-4 overflow-y-auto items-center p-8 rounded'
});

export const ImageWrapper = createComponent('div', {
  className: 'bg-blue-400 h-[240px] w-[180px]'
});
