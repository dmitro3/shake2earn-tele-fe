// [iOS issue] Browser support limited (ref: https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API#browser_compatibility)
export const vibrate = (pattern: number | number[]) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};
