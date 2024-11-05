import { getUser } from 'api/user';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { User } from 'types/user';
import createContext from 'utils/common/context';
import { DeviceMotion } from 'utils/device/DeviceMotion';

import { AppAssets } from './constants';
import { loadAppAssets, storeTelegramUserId } from './utils';

interface AppContextType {
  initialized: boolean;
  started: boolean;
  starting: boolean;
  error: string | null;
  onStart: () => Promise<void>;
  deviceSupported: boolean;
  device: {
    motionRef: React.RefObject<DeviceMotion>;
  };
  curUI: string;
  onUIChange: (newUI: string) => void;
  userData: User | null;
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

  const [userData, setUserData] = useState<User | null>(null);

  const deviceMotionRef = useRef<DeviceMotion>(new DeviceMotion());

  const deviceSupported = DeviceMotion.isDeviceSupported;

  const fetchUserData = useCallback(async () => {
    try {
      const user = await getUser();
      setUserData(user);
    } catch (error) {
      setError('Failed to fetch user data');
    }
  }, []);

  const initData = useCallback(async () => {
    if (!deviceSupported) {
      return;
    }
    const storeUserIdResult = storeTelegramUserId();
    if (!storeUserIdResult) {
      return;
    }
    await Promise.all([fetchUserData(), loadAppAssets(AppAssets)]);
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
      device: {
        motionRef: deviceMotionRef,
      },
      curUI,
      onUIChange,
      userData,
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
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
