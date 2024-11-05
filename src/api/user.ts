import axios from 'axios';

import { User } from 'types/user';
import { getWithToken } from 'utils/request';

const userApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1/users',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUser = async () => {
  const response = await getWithToken<User>(`/users`);
  return response.data;
};

export const createUser = async (
  telegramId: string,
  referBy: string | null,
) => {
  await userApi
    .post('/', {
      telegramId,
      referBy,
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
};
