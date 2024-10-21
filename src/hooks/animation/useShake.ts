import { useCallback, useEffect, useRef, useState } from 'react';

import { Shake, ShakeEvent, ShakeOptions } from 'utils/animation/shake';

interface UseShakeProps extends Partial<ShakeOptions> {
  timeout?: number; // stop if user don't shake after timeout
  onShake?: (shaking: boolean, event?: ShakeEvent) => void;
}

export default function useShake({
  threshold,
  duration,
  timeout,
  onShake,
}: UseShakeProps = {}) {
  const shakeTimeoutRef = useRef<NodeJS.Timeout>();
  const shakeRef = useRef<Shake>(new Shake({ threshold, duration }));
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (!shakeRef.current.isDeviceSupported) {
      return;
    }

    const shakeListener = (event: ShakeEvent) => {
      if (shakeTimeoutRef.current) {
        clearTimeout(shakeTimeoutRef.current);
      }

      setIsShaking(true);
      onShake?.(true, event);

      shakeTimeoutRef.current = setTimeout(() => {
        setIsShaking(false);
        onShake?.(false);
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

  const onStartListenShake = useCallback(() => {
    if (!shakeRef.current.isDeviceSupported) {
      return;
    }
    shakeRef.current.start();
  }, []);

  const onStopListenShake = useCallback(() => {
    shakeRef.current.stop();
  }, []);

  const isDeviceSupport = shakeRef.current.isDeviceSupported;

  return {
    isDeviceSupport,
    isShaking,
    onStartListenShake,
    onStopListenShake,
  };
}
