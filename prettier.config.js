// eslint-disable-next-line import/no-extraneous-dependencies
const sortClassName = require('prettier-plugin-sort-class-names');

module.exports = {
  plugins: [sortClassName],
  bracketSameLine: false,
  bracketSpacing: true,
  semi: true,
  sortClassNamesSortFunction: 'attrs,classNames,createComponent',
  arrowParens: 'avoid',
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false
};
