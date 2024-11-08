import WebApp from '@twa-dev/sdk';
import { createUser, getUser } from 'api/user';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { User as TelegramUser } from 'types/telegram';
import { User } from 'types/user';
import createContext from 'utils/common/context';
import { DeviceMotion } from 'utils/device/DeviceMotion';

import { AppAssets } from './constants';
import useGetTelegramUser from './useGetTelegramUser';
import { loadAppAssets } from './utils';

interface AppContextType {
  initialized: boolean;
  started: boolean;
  starting: boolean;
  error: string | null;
  onStart: () => Promise<void>;
  deviceSupported: boolean;
  curUI: string;
  onUIChange: (newUI: string) => void;
  userData: User | null;
  telegramUserData: TelegramUser;
}

export const [useAppContext, AppContext] = createContext<
  AppContextType | undefined
>();

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [initialized, setInitialized] = useState(false);
  const [started, setStarted] = useState(false);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [curUI, setCurUI] = useState<string>('home');

  const deviceSupported = DeviceMotion.isDeviceSupported;

  const [userData, setUserData] = useState<User | null>(null);
  const { user: telegramUserData } = useGetTelegramUser();

  const createNewUser = useCallback(async () => {
    if (typeof telegramUserData?.id !== 'number') {
      return null;
    }

    const referBy = WebApp.initDataUnsafe.start_param;
    const result = await createUser(telegramUserData.id, referBy);
    if (result.success) {
      return result.response.data;
    } else {
      setError(
        result.error.response?.data.message || 'Failed to create user data',
      );
    }
    return null;
  }, [telegramUserData?.id]);

  const fetchUserData = useCallback(
    async ({ createFirstUser }: { createFirstUser?: boolean } = {}) => {
      const result = await getUser();
      if (result.success) {
        const userData = result.response.data;
        setUserData(userData);
        return;
      }

      if (
        result.error.response?.data.message === 'User not found' &&
        createFirstUser
      ) {
        const userData = await createNewUser();
        if (userData) {
          setUserData(userData);
        }
        return;
      } else {
        setError(
          result.error.response?.data.message || 'Failed to fetch user data',
        );
      }
    },
    [createNewUser],
  );

  const initData = useCallback(async () => {
    if (!deviceSupported) {
      return;
    }

    await Promise.all([
      fetchUserData({ createFirstUser: true }),
      loadAppAssets(AppAssets),
    ]);
    setInitialized(true);
  }, [deviceSupported, fetchUserData]);

  useEffect(() => {
    initData();
  }, [initData]);

  const requestHardwarePermissions = useCallback(async () => {
    const deviceMotionApprovalStatus = await DeviceMotion.approve();
    if (!deviceMotionApprovalStatus.success) {
      return {
        success: false,
        error: "We can't access your device motion. Please try again later.",
      };
    }
    return {
      success: true,
      error: null,
    };
  }, []);

  const onStart = useCallback(async () => {
    if (!deviceSupported) {
      return;
    }

    setStarting(true);
    const requestResult = await requestHardwarePermissions();
    setStarting(false);

    if (!requestResult.success) {
      setError(requestResult.error);
      return;
    }
    setStarted(true);
  }, [deviceSupported, requestHardwarePermissions]);

  const onUIChange = (newUI: string) => {
    setCurUI(newUI);
  };

  const value = useMemo(
    () => ({
      initialized,
      deviceSupported,
      error,
      onStart,
      started,
      starting,
      curUI,
      onUIChange,
      userData,
      telegramUserData,
    }),
    [
      curUI,
      deviceSupported,
      error,
      initialized,
      onStart,
      started,
      starting,
      userData,
      telegramUserData,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
