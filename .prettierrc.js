import prettierPluginSortImports from '@trivago/prettier-plugin-sort-imports';

export default {
  plugins: [prettierPluginSortImports],
  quoteProps: 'consistent',
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  singleAttributePerLine: true,
  importOrder: [
    '^(context|utils|hooks|types|constants|components)/(.*)$',
    '^assets/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
