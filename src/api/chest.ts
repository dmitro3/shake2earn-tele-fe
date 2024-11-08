import { User } from 'types/user';
import {
  getWithToken,
  postWithToken,
  withAxiosRequestWrapper,
} from 'utils/request';

export const getShaketurn = () =>
  withAxiosRequestWrapper(
    getWithToken<{ shakeCount: number; user: User }>('/shake'),
  );

export const updateShakeTurn = (turnCount: number) =>
  withAxiosRequestWrapper(
    postWithToken<{ user: User }>('/shake', { data: { turnCount } }),
  );

export const getPoint = () =>
  withAxiosRequestWrapper(
    getWithToken<{ point: number; user: User }>('/point'),
  );

export const updatePoint = (pointCount: number) =>
  withAxiosRequestWrapper(
    postWithToken<{ user: User }>('/point', { data: { pointCount } }),
  );
