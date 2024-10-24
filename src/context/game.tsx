import React, { useCallback, useMemo } from 'react';

import useShake from 'hooks/animation/useShake';
import { Shake } from 'utils/animation/shake';
import createContext from 'utils/common/context';

interface GameContextType {
  started: boolean;
  starting: boolean;
  error: string | null;
  shakeRef: React.MutableRefObject<Shake>;
  onStart: () => Promise<void>;
  isShaking?: boolean;
}

export const [useGameContext, GameContext] = createContext<
  GameContextType | undefined
>(undefined);

/* TODO: shaking context */
export const GameContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [started, setStarted] = React.useState<boolean>(false);
  const [starting, setStarting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const { shakeRef, isDeviceSupport, isShaking, onStartListenShake } =
    useShake();

  const onStart = useCallback(async () => {
    setStarting(true);
    const approved = await onStartListenShake();
    setStarting(false);

    if (!approved && shakeRef.current.isPermissionRequired) {
      setError('Motion permission required. Please try again later.');
      return;
    }

    setStarted(true);
  }, [onStartListenShake, shakeRef]);

  const value = useMemo(
    () => ({
      error,
      isDeviceSupport,
      isShaking,
      onStart,
      shakeRef,
      started,
      starting,
    }),
    [error, isDeviceSupport, isShaking, onStart, shakeRef, started, starting],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
