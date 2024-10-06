import axios from 'axios';

const userApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1/users',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUser = async (id: string) => {
  const response = await userApi.get(`/${id}`);
  return response.data;
};

export const createUser = async (telegramId: string, referBy: string | null) => {
  await userApi.post('/', {
    telegramId,
    referBy,
  }).then((response) => {
    console.log(response.data);
    return response.data;
  }).catch((error) => {
    console.error(error);
    return error;
  });  
};