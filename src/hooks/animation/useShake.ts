import { useCallback, useEffect, useRef, useState } from 'react';

import { DeviceMotion, DeviceMotionOptions } from 'utils/device/DeviceMotion';

interface UseShakeProps extends Partial<DeviceMotionOptions> {
  timeout?: number;
  onShake?: (data: { shaking: boolean; event?: DeviceMotionEvent }) => void;
  deviceMotion?: DeviceMotion;
}

export default function useShake({
  deviceMotion,
  threshold,
  duration,
  timeout = 500,
  onShake,
}: UseShakeProps = {}) {
  const shakeTimeoutRef = useRef<NodeJS.Timeout>();
  const shakeRef = useRef<DeviceMotion>(
    deviceMotion ?? new DeviceMotion({ threshold, duration }),
  );
  const [isShaking, setIsShaking] = useState(false);

  const onShaked = useCallback(
    (event: DeviceMotionEvent) => {
      setIsShaking(true);
      onShake?.({ shaking: true, event });
    },
    [onShake],
  );

  const onResetShaking = useCallback(() => {
    setIsShaking(false);
    onShake?.({ shaking: false });
  }, [onShake]);

  useEffect(() => {
    if (!DeviceMotion.isDeviceSupported) {
      return;
    }

    const shakeListener = (event: DeviceMotionEvent) => {
      if (shakeTimeoutRef.current) {
        clearTimeout(shakeTimeoutRef.current);
      }
      onShaked(event);
      shakeTimeoutRef.current = setTimeout(onResetShaking, timeout);
    };
    const shakeInstance = shakeRef.current;
    shakeInstance.addListener(shakeListener);

    return () => {
      setIsShaking(false);
      if (shakeTimeoutRef.current) {
        clearTimeout(shakeTimeoutRef.current);
      }
      shakeInstance.removeListener(shakeListener);
    };
  }, [onShaked, onResetShaking, timeout]);

  const onStartListenShake = useCallback(() => {
    if (!DeviceMotion.isDeviceSupported) {
      return;
    }
    return shakeRef.current.start();
  }, []);

  const onStopListenShake = useCallback(() => {
    shakeRef.current.stop();
  }, []);

  return {
    shakeRef,
    isShaking,
    onStartListenShake,
    onStopListenShake,
  };
}
