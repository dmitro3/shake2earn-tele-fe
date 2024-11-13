import { ChestConfig } from 'types/chest';
import { User } from 'types/user';
import {
  getWithToken,
  postWithToken,
  withAxiosRequestWrapper,
} from 'utils/request';

export const getShakeConfig = () =>
  withAxiosRequestWrapper(getWithToken<ChestConfig>('/shake/config'));

export const getShaketurn = () =>
  withAxiosRequestWrapper(
    getWithToken<{ shakeCount: number; user: User }>('/shake'),
  );

export const updateShakeTurn = (turnCount: number) =>
  withAxiosRequestWrapper(
    postWithToken<{ user: User }>('/shake', { data: { count: turnCount } }),
  );

export const getPoint = () =>
  withAxiosRequestWrapper(
    getWithToken<{ point: number; user: User }>('/point'),
  );

export const updatePoint = (pointCount: number) =>
  withAxiosRequestWrapper(
    postWithToken<{ user: User }>('/point', { data: { point: pointCount } }),
  );
