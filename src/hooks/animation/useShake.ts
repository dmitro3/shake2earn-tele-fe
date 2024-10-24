import { useCallback, useEffect, useRef, useState } from 'react';

import { Shake, ShakeOptions } from 'utils/animation/shake';

interface UseShakeProps extends Partial<ShakeOptions> {
  timeout?: number; // stop if user don't shake after timeout
  onShake?: (data: { shaking: boolean; event?: DeviceMotionEvent }) => void;
}

export default function useShake({
  threshold,
  duration,
  timeout = 1000,
  onShake,
}: UseShakeProps = {}) {
  const shakeTimeoutRef = useRef<NodeJS.Timeout>();
  const shakeRef = useRef<Shake>(new Shake({ threshold, duration }));
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (!shakeRef.current.isDeviceSupported) {
      return;
    }

    const shakeListener = (event: DeviceMotionEvent) => {
      if (shakeTimeoutRef.current) {
        clearTimeout(shakeTimeoutRef.current);
      }

      setIsShaking(true);
      onShake?.({ shaking: true, event });

      shakeTimeoutRef.current = setTimeout(() => {
        setIsShaking(false);
        onShake?.({ shaking: false });
      }, timeout);
    };
    const shakeInstance = shakeRef.current;
    shakeInstance.addListener(shakeListener);

    return () => {
      if (shakeTimeoutRef.current) {
        clearTimeout(shakeTimeoutRef.current);
      }
      shakeInstance.removeListener(shakeListener);
    };
  }, [onShake, timeout]);

  useEffect(() => {
    const shakeInstance = shakeRef.current;
    return () => {
      shakeInstance.stop();
    };
  }, []);

  const onStartListenShake = useCallback(() => {
    if (!shakeRef.current.isDeviceSupported) {
      return;
    }
    return shakeRef.current.start();
  }, []);

  const onStopListenShake = useCallback(() => {
    shakeRef.current.stop();
  }, []);

  const isDeviceSupport = shakeRef.current.isDeviceSupported;

  return {
    shakeRef,
    isDeviceSupport,
    isShaking,
    onStartListenShake,
    onStopListenShake,
  };
}
