import { StorageKey } from 'const/storage';
import { useEffect, useMemo } from 'react';

import { useTelegramContext } from 'context/telegram';
import { User as TelegramUser } from 'types/telegram';
import storage from 'utils/storage';

export default function useGetTelegramUser(): {
  user: TelegramUser;
  loaded: boolean;
} {
  const { webApp, loaded } = useTelegramContext();

  const user = useMemo(() => {
    const data =
      webApp?.initDataUnsafe.user ??
      storage.getJSON<TelegramUser>(StorageKey.USER) ??
      undefined;
    return data;
  }, [webApp?.initDataUnsafe.user]);

  useEffect(() => {
    if (user) {
      storage.setJSON(StorageKey.USER, user);
    }
  }, [user]);

  return { user, loaded };
}
