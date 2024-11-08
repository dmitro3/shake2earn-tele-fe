import WebApp from '@twa-dev/sdk';
import { StorageKey } from 'const/storage';
import { useEffect, useMemo } from 'react';

import { User as TelegramUser } from 'types/telegram';
import storage from 'utils/storage';

export default function useGetTelegramUser(): {
  user: TelegramUser;
} {
  const user = useMemo(() => {
    const data =
      WebApp.initDataUnsafe.user ??
      storage.getJSON<TelegramUser>(StorageKey.USER) ??
      undefined;
    return data;
  }, []);

  useEffect(() => {
    if (user) {
      storage.setJSON(StorageKey.USER, user);
    }
  }, [user]);

  return { user };
}
