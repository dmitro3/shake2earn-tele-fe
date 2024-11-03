export const formatTime = (time: number, fullText = false) => {
  const timeUnits = [
    { short: 'y', full: 'year', divisor: 31536000 },
    { short: 'mo', full: 'month', divisor: 2592000 },
    { short: 'w', full: 'week', divisor: 604800 },
    { short: 'd', full: 'day', divisor: 86400 },
    { short: 'h', full: 'hour', divisor: 3600 },
    { short: 'm', full: 'minute', divisor: 60 },
    { short: 's', full: 'second', divisor: 1 },
  ];

  const arrTimes: string[] = [];
  for (const unitData of timeUnits) {
    const { short, full, divisor } = unitData;
    const unitValue = Math.floor(time / divisor);

    if (unitValue > 0) {
      if (fullText) {
        arrTimes.push(unitValue === 1 ? `1 ${full}` : `${unitValue} ${full}s`);
      } else {
        arrTimes.push(unitValue === 1 ? `1${short}` : `${unitValue}${short}`);
      }
      time -= unitValue * divisor;
    }
  }
  if (arrTimes.length >= 2) return arrTimes.slice(0, 2).join(' ');
  if (arrTimes.length === 1) return arrTimes[0];
  return fullText ? '0 seconds' : '0s';
};
