import { useCallback, useMemo, useRef, useState } from 'react';

import useLoadAssets, { AssetData } from 'hooks/common/useLoadAssets';
import createContext from 'utils/common/context';
import { DeviceMotion } from 'utils/device/DeviceMotion';

import { AppAssets } from './constants';

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
  assetsRef: React.RefObject<AssetData[]>;
}

export const [useAppContext, AppContext] = createContext<
  AppContextType | undefined
>();

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [started, setStarted] = useState(false);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [curUI, setCurUI] = useState<string>('home');

  const deviceMotionRef = useRef<DeviceMotion>(new DeviceMotion());
  const { loaded: assetsLoaded, assetsRef } = useLoadAssets(AppAssets);

  const initialized = useMemo(() => {
    // TODO: fetch user data
    return assetsLoaded;
  }, [assetsLoaded]);
  const deviceSupported = DeviceMotion.isDeviceSupported;

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
      assetsRef,
    }),
    [
      assetsRef,
      curUI,
      deviceSupported,
      error,
      initialized,
      onStart,
      started,
      starting,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
