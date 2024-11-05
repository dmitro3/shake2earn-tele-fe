import { getWithToken, postWithToken } from 'utils/request';

export const getShakeCount = () => {
  return getWithToken<{ shakeCount: number }>('/shake');
};

export const updateShakeCount = () => {
  return postWithToken('/shake');
};

export const getPoint = () => {
  return getWithToken<{ point: number }>('/point');
};

export const updatePoint = () => {
  return postWithToken('/point');
};
