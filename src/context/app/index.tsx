import WebApp from '@twa-dev/sdk';
import {
  updatePoint as requestUpdatePoint,
  updateShakeTurn as requestUpdateShakeTurn,
} from 'api/chest';
import { createUser, getUser } from 'api/user';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { usePlayAudio } from 'hooks/common/usePlayAudio';
import { User as TelegramUser } from 'types/telegram';
import { User } from 'types/user';
import createContext from 'utils/common/context';
import { DeviceMotion } from 'utils/device/DeviceMotion';

import { AppAssetSrc, AppAssets } from './constants';
import useGetTelegramUser from './useGetTelegramUser';
import { getDefaultUserData, loadAppAssets } from './utils';

interface AppContextType {
  initialized: boolean;
  started: boolean;
  starting: boolean;
  error: string | null;
  onStart: () => Promise<void>;
  deviceSupported: boolean;
  curUI: string;
  onUIChange: (newUI: string) => void;
  userData: User;
  telegramUserData: TelegramUser;
  updatePoint: (shakeCount: number) => Promise<boolean>;
  updateTurn: (pointCount: number) => Promise<boolean>;
  isPlayingAudio: boolean;
  changePlayAudio: (play: boolean) => void;
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

  const [userData, setUserData] = useState<User>(getDefaultUserData);
  const { user: telegramUserData } = useGetTelegramUser();

  const { isPlaying: isPlayingAudio, changePlayAudio } = usePlayAudio(
    initialized ? AppAssetSrc.SOUNDTRACK : undefined,
  );

  const deviceSupported = DeviceMotion.isDeviceSupported;
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
    if (deviceSupported) {
      await Promise.all([
        fetchUserData({ createFirstUser: true }),
        loadAppAssets(AppAssets),
      ]);
    }

    setInitialized(true);
  }, [deviceSupported, fetchUserData]);

  const updateTurn = useCallback(async (shakeCount: number) => {
    const result = await requestUpdateShakeTurn(shakeCount);
    if (result.success) {
      setUserData(result.response.data.user);
    }
    return result.success;
  }, []);

  const updatePoint = useCallback(async (pointCount: number) => {
    const result = await requestUpdatePoint(pointCount);
    if (result.success) {
      setUserData(result.response.data.user);
    }
    return result.success;
  }, []);

  useEffect(() => {
    initData();
  }, [initData]);

  const requestHardwarePermissions = useCallback(async () => {
    const deviceMotionApprovalStatus = await DeviceMotion.approve();
    if (!deviceMotionApprovalStatus.success) {
      return {
        success: false,
        error:
          'Device motion access denied. Please restart Telegram and try again.',
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
    // support iOS (ref: https://dev.to/li/how-to-requestpermission-for-devicemotion-and-deviceorientation-events-in-ios-13-46g2)
    const requestResult = await requestHardwarePermissions();
    if (!requestResult.success) {
      setError(requestResult.error);
      return;
    }
    // play app sound
    changePlayAudio(true);

    setStarting(false);
    setStarted(true);
  }, [changePlayAudio, deviceSupported, requestHardwarePermissions]);

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
      updatePoint,
      updateTurn,
      isPlayingAudio,
      changePlayAudio,
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
      updatePoint,
      updateTurn,
      isPlayingAudio,
      changePlayAudio,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
