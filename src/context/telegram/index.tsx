import WebApp from '@twa-dev/sdk';
import { useCallback, useEffect, useMemo, useState } from 'react';

import createContext from 'utils/common/context';

interface TelegramContextType {
  webApp: typeof WebApp | null;
  loaded: boolean;
}

export const [useTelegramContext, TelegramContext] = createContext<
  TelegramContextType | undefined
>();

export const TelegramContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [webApp, setWebApp] = useState<typeof WebApp | null>(null);
  const [loaded, setLoaded] = useState(false);

  const loadWebApp = useCallback(() => {
    const app = window.Telegram;
    if (app && 'ready' in app && typeof app.ready === 'function') {
      app.ready();
      setWebApp(app);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    loadWebApp();
  }, [loadWebApp]);

  const value = useMemo(
    () => ({
      webApp,
      loaded,
    }),
    [webApp, loaded],
  );

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};
