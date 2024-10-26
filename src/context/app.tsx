import { useCallback, useMemo, useRef, useState } from 'react';

import createContext from 'utils/common/context';
import { DeviceMotion } from 'utils/device/DeviceMotion';

interface AppContextType {
  started: boolean;
  starting: boolean;
  error: string | null;
  onStart: () => Promise<void>;
  deviceSupported: boolean;
  device: {
    motionRef: React.RefObject<DeviceMotion>;
  };
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
    setStarting(true);
    const requestResult = await requestHardwarePermissions();
    setStarting(false);

    if (!requestResult.success) {
      setError(requestResult.error);
      return;
    }
    setStarted(true);
  }, [requestHardwarePermissions]);

  const value = useMemo(
    () => ({
      deviceSupported,
      error,
      onStart,
      started,
      starting,
      device: {
        motionRef: deviceMotionRef,
      },
    }),
    [deviceSupported, error, onStart, started, starting],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
