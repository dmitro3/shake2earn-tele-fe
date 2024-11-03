export const defaultIntlOptions = {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
};

export const getIntlNumberFormatter = (options: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat(undefined, {
    ...defaultIntlOptions,
    ...options,
  });
};

export const formatNumber = (
  number: number,
  options: Intl.NumberFormatOptions = {},
) => {
  return getIntlNumberFormatter(options).format(number);
};
