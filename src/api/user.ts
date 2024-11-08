import { User } from 'types/user';
import { getWithToken, postWithoutToken } from 'utils/request';

export const getUser = async () => {
  const response = await getWithToken<User>(`/users`);
  return response.data;
};

export const createUser = async (
  telegramId: string,
  referBy: string | null,
) => {
  await postWithoutToken<User>('/users', {
    data: {
      telegramId,
      referBy,
    },
  });
};
