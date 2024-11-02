import '@twa-dev/sdk';
import { useEffect, useState } from 'react';

import { useAppContext } from 'context/app';

import DeviceNotSupported from './Initialization/DeviceNotSupported';
import Loading from './Initialization/Loading';
import Welcome from './Initialization/Welcome';
import Main from './Main';

const WELCOME_SCREEN_DELAY = 1000;

export default function Home() {
  const { initialized, deviceSupported, error, onStart, started, starting } =
    useAppContext();
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowWelcomeScreen(false), WELCOME_SCREEN_DELAY);
  }, []);

  if (!deviceSupported) {
    return <DeviceNotSupported />;
  }

  if (showWelcomeScreen || !initialized) {
    return <Loading />;
  }

  if (!started) {
    return (
      <Welcome
        onStart={onStart}
        starting={starting}
        error={error}
      />
    );
  }

  return <Main />;
}
