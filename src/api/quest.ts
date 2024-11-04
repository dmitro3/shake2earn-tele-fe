import { getWithToken } from 'utils/request';

export const getQuests = async () => {
  const data = await getWithToken('quests/overview', { params: {} }).then(
    (res) => res.data,
  );

  return data;
};
