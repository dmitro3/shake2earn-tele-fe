import {
  getWithToken,
  postWithToken,
  withAxiosRequestWrapper,
} from 'utils/request';

export const getShakeCount = () =>
  withAxiosRequestWrapper(getWithToken<{ shakeCount: number }>('/shake'));

export const updateShakeCount = () =>
  withAxiosRequestWrapper(postWithToken('/shake'));

export const getPoint = () =>
  withAxiosRequestWrapper(getWithToken<{ point: number }>('/point'));

export const updatePoint = () =>
  withAxiosRequestWrapper(postWithToken('/point'));
