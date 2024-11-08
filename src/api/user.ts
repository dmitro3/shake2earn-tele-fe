import { User } from 'types/user';
import {
  getWithToken,
  postWithoutToken,
  withAxiosRequestWrapper,
} from 'utils/request';

export const createUser = async (telegramId: number, referBy?: string) =>
  withAxiosRequestWrapper(
    postWithoutToken<User>('/users', {
      data: {
        telegramId: telegramId.toString(),
        referBy,
      },
    }),
  );

export const getUser = async () =>
  withAxiosRequestWrapper(getWithToken<User>(`/users`));
