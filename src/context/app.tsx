import { useCallback, useMemo, useRef, useState } from 'react';

import createContext from 'utils/common/context';
import { DeviceMotion } from 'utils/device/DeviceMotion';

import useBackgroundAssets, {
  BackgroundAssetsValue,
} from './app/useBackgroundAssest';

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
  backgroundAssets: BackgroundAssetsValue;
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

  const deviceMotionRef = useRef<DeviceMotion>(new DeviceMotion());
  const backgroundAssets = useBackgroundAssets();

  const initialized = useMemo(() => {
    return backgroundAssets.imgLoaded && backgroundAssets.audioLoaded;
  }, [backgroundAssets]);
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
      backgroundAssets,
    }),
    [
      deviceSupported,
      error,
      initialized,
      onStart,
      started,
      starting,
      backgroundAssets,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
